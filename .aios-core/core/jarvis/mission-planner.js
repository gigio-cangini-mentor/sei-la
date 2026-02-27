#!/usr/bin/env node

/**
 * JARVIS Mission Planner
 *
 * Decomposes a StructuredIntent (from intent-engine.js) into an ExecutionPlan
 * with ordered, dependency-aware steps. Each step specifies the agent, task/command,
 * dependencies, estimated duration, parallelizability, and rollback action.
 *
 * Key design decisions:
 *   - Uses "steps" (not "phases") as the domain term in JARVIS, mapping to
 *     architecture's "phases" concept (see ARCHITECTURE-JARVIS.md#4.2.1).
 *   - Derives step ordering from workflow-chains.yaml, never hardcoded.
 *   - Uses executor-assignment.js `assignExecutor(storyType)` for agent selection,
 *     with intent-patterns.yaml intentMapping as the primary source.
 *   - Intent-to-chain mapping bridges intent names (e.g., "story.full_cycle")
 *     to workflow chain IDs (e.g., "sdc").
 *
 * @module mission-planner
 * @story 1.3
 * @architecture docs/stories/jarvis/ARCHITECTURE-JARVIS.md#4.2.3
 */

'use strict';

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maximum concurrent delegations per architecture spec (NFR11) */
const MAX_PARALLEL_CONCURRENCY = 3;

/** Default mission persistence directory */
const DEFAULT_MISSIONS_DIR = path.join(process.cwd(), '.aios', 'jarvis', 'missions');

/**
 * Maps intent names to workflow chain IDs in workflow-chains.yaml.
 * This bridges the gap between intent-engine output (e.g., "story.full_cycle")
 * and workflow-chains.yaml IDs (e.g., "sdc").
 *
 * @see SF-3 from PO validation notes
 */
const INTENT_TO_CHAIN_MAP = {
  'story.full_cycle': 'sdc',
  'spec.pipeline': 'spec-pipeline',
  'qa.loop': 'qa-loop',
  'brownfield.discover': 'brownfield',
};

/**
 * Estimated durations per agent/command type.
 * Used when workflow-chains.yaml does not specify duration.
 */
const DURATION_ESTIMATES = {
  '@sm': '5m',
  '@po': '5m',
  '@dev': '15m',
  '@qa': '10m',
  '@devops': '5m',
  '@architect': '10m',
  '@analyst': '15m',
  '@pm': '10m',
  '@data-engineer': '10m',
  '@ux-design-expert': '10m',
  'internal': '1m',
  'default': '5m',
};

/**
 * Rollback actions per step type.
 * Keyed by agent or command pattern.
 */
const ROLLBACK_ACTIONS = {
  '@sm.*draft': 'Delete story file {storyPath}',
  '@po.*validate': 'No file changes, no rollback needed',
  '@dev.*develop': 'git revert {commitHash}',
  '@qa.*review': 'No file changes, no rollback needed',
  '@devops.*push': 'Cannot auto-rollback pushed commits',
  '@architect': 'Remove generated architecture document',
  '@analyst': 'Remove research output',
  '@pm': 'Revert spec/requirements changes',
  'internal': 'No rollback needed for internal operations',
  'default': 'Manual rollback required',
};

// ---------------------------------------------------------------------------
// Error Classes
// ---------------------------------------------------------------------------

/**
 * Thrown when a circular dependency is detected in the plan.
 */
class CircularDependencyError extends Error {
  /**
   * @param {string[]} cycle - The cycle of step IDs
   */
  constructor(cycle) {
    super(`Circular dependency detected: ${cycle.join(' -> ')}`);
    this.name = 'CircularDependencyError';
    this.cycle = cycle;
  }
}

// ---------------------------------------------------------------------------
// PlanStep factory
// ---------------------------------------------------------------------------

/**
 * Create a PlanStep with all required fields.
 *
 * @param {object} [overrides] - Fields to override
 * @returns {object} A complete PlanStep
 */
function createPlanStep(overrides = {}) {
  return {
    id: overrides.id || 'step-1',
    agent: overrides.agent || '',
    task: overrides.task || '',
    command: overrides.command || '',
    dependencies: overrides.dependencies || [],
    estimatedDuration: overrides.estimatedDuration || '5m',
    parallel: overrides.parallel || false,
    rollbackAction: overrides.rollbackAction || 'Manual rollback required',
    inputs: overrides.inputs || {},
  };
}

// ---------------------------------------------------------------------------
// ExecutionPlan factory
// ---------------------------------------------------------------------------

/**
 * Create an ExecutionPlan with all required fields.
 *
 * @param {object} [overrides] - Fields to override
 * @returns {object} A complete ExecutionPlan
 */
function createExecutionPlan(overrides = {}) {
  const id = overrides.id || _generateMissionId();
  return {
    id,
    intent: overrides.intent || null,
    description: overrides.description || '',
    steps: overrides.steps || [],
    createdAt: overrides.createdAt || new Date().toISOString(),
    estimatedTotalDuration: overrides.estimatedTotalDuration || '0m',
    parallelGroups: overrides.parallelGroups || [],
  };
}

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------

/**
 * Generate a unique mission ID: "mission-{timestamp}-{hex4}"
 * @returns {string}
 */
function _generateMissionId() {
  const hex = crypto.randomBytes(2).toString('hex');
  return `mission-${Date.now()}-${hex}`;
}

/**
 * Parse a duration string (e.g., "5m", "2h", "30s") into minutes.
 * @param {string} dur
 * @returns {number} minutes
 */
function parseDuration(dur) {
  if (!dur || typeof dur !== 'string') return 0;
  const match = dur.match(/^(\d+)(s|m|h)$/);
  if (!match) return 0;
  const value = parseInt(match[1], 10);
  switch (match[2]) {
    case 's': return value / 60;
    case 'm': return value;
    case 'h': return value * 60;
    default: return 0;
  }
}

/**
 * Format minutes into a human-readable duration string.
 * @param {number} minutes
 * @returns {string}
 */
function formatDuration(minutes) {
  if (minutes <= 0) return '0m';
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return m > 0 ? `${h}h${m}m` : `${h}h`;
  }
  return `${Math.round(minutes)}m`;
}

/**
 * Resolve rollback action for a given agent + command pair.
 * @param {string} agent - e.g., "@sm", "@dev"
 * @param {string} command - e.g., "*draft", "*develop"
 * @returns {string}
 */
function resolveRollbackAction(agent, command) {
  // Normalize: strip @ and * for matching
  const normAgent = (agent || '').replace('@', '');
  const normCommand = (command || '').replace('*', '');

  // Try compound match: keys like "@sm.*draft" match against "sm" + "draft"
  for (const [pattern, action] of Object.entries(ROLLBACK_ACTIONS)) {
    if (pattern.startsWith('@') && pattern.includes('*')) {
      // Compound key: "@agent.*command"
      const parts = pattern.split('.');
      const patAgent = (parts[0] || '').replace('@', '');
      const patCommand = (parts[1] || '').replace('*', '');
      if (normAgent === patAgent && normCommand.includes(patCommand)) {
        return action;
      }
    }
  }
  // Try agent-only match
  if (ROLLBACK_ACTIONS[agent]) {
    return ROLLBACK_ACTIONS[agent];
  }
  return ROLLBACK_ACTIONS.default;
}

// ---------------------------------------------------------------------------
// Topological Sort
// ---------------------------------------------------------------------------

/**
 * Perform a topological sort on steps based on their dependencies.
 * Uses Kahn's algorithm.
 *
 * @param {object[]} steps - Array of PlanStep objects
 * @returns {object[]} Topologically sorted steps
 * @throws {CircularDependencyError} If a cycle is detected
 */
function topologicalSort(steps) {
  if (!steps || steps.length === 0) return [];
  if (steps.length === 1) return [...steps];

  // Build adjacency list and in-degree map
  const stepMap = new Map();
  const inDegree = new Map();
  const adjacency = new Map();

  for (const step of steps) {
    stepMap.set(step.id, step);
    inDegree.set(step.id, 0);
    adjacency.set(step.id, []);
  }

  // Build edges: dependency -> step (dependency must come before step)
  for (const step of steps) {
    for (const dep of step.dependencies) {
      if (stepMap.has(dep)) {
        adjacency.get(dep).push(step.id);
        inDegree.set(step.id, inDegree.get(step.id) + 1);
      }
    }
  }

  // Initialize queue with nodes having in-degree 0
  const queue = [];
  for (const [id, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(id);
    }
  }

  const sorted = [];
  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(stepMap.get(current));

    for (const neighbor of adjacency.get(current)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // If not all steps were sorted, there is a cycle
  if (sorted.length !== steps.length) {
    // Find the cycle for error reporting
    const remaining = steps.filter((s) => !sorted.find((r) => r.id === s.id));
    const cycle = remaining.map((s) => s.id);
    cycle.push(cycle[0]); // close the cycle for display
    throw new CircularDependencyError(cycle);
  }

  return sorted;
}

// ---------------------------------------------------------------------------
// Parallel Group Detection
// ---------------------------------------------------------------------------

/**
 * Identify groups of steps that can execute concurrently.
 * Steps are parallelizable if they share no dependencies with each other
 * and are at the same "level" in the dependency graph.
 *
 * @param {object[]} sortedSteps - Topologically sorted steps
 * @returns {string[][]} Array of groups, each group is an array of step IDs
 */
function identifyParallelGroups(sortedSteps) {
  if (!sortedSteps || sortedSteps.length === 0) return [];

  // Compute the "level" of each step (longest path from a root)
  const levels = new Map();

  for (const step of sortedSteps) {
    if (step.dependencies.length === 0) {
      levels.set(step.id, 0);
    } else {
      let maxDepLevel = -1;
      for (const dep of step.dependencies) {
        const depLevel = levels.get(dep);
        if (depLevel !== undefined && depLevel > maxDepLevel) {
          maxDepLevel = depLevel;
        }
      }
      levels.set(step.id, maxDepLevel + 1);
    }
  }

  // Group by level
  const groupsByLevel = new Map();
  for (const [id, level] of levels.entries()) {
    if (!groupsByLevel.has(level)) {
      groupsByLevel.set(level, []);
    }
    groupsByLevel.get(level).push(id);
  }

  // Filter: only groups with 2+ steps are parallel groups
  // Cap each group at MAX_PARALLEL_CONCURRENCY
  const parallelGroups = [];
  const sortedLevels = [...groupsByLevel.keys()].sort((a, b) => a - b);

  for (const level of sortedLevels) {
    const group = groupsByLevel.get(level);
    if (group.length > 1) {
      // Split into chunks of MAX_PARALLEL_CONCURRENCY
      for (let i = 0; i < group.length; i += MAX_PARALLEL_CONCURRENCY) {
        const chunk = group.slice(i, i + MAX_PARALLEL_CONCURRENCY);
        if (chunk.length > 1) {
          parallelGroups.push(chunk);
        }
      }
    }
  }

  return parallelGroups;
}

/**
 * Mark steps as parallel based on identified parallel groups.
 *
 * @param {object[]} steps - PlanStep array
 * @param {string[][]} parallelGroups - Groups of parallel step IDs
 * @returns {object[]} Steps with `parallel` flag updated
 */
function markParallelSteps(steps, parallelGroups) {
  const parallelIds = new Set();
  for (const group of parallelGroups) {
    for (const id of group) {
      parallelIds.add(id);
    }
  }

  return steps.map((step) => ({
    ...step,
    parallel: parallelIds.has(step.id),
  }));
}

// ---------------------------------------------------------------------------
// MissionPlanner class
// ---------------------------------------------------------------------------

class MissionPlanner {
  /**
   * @param {object} [options]
   * @param {string} [options.workflowChainsPath] - Override path to workflow-chains.yaml
   * @param {string} [options.intentPatternsPath] - Override path to intent-patterns.yaml
   * @param {string} [options.missionsDir] - Override persistence directory
   * @param {object} [options.executorAssignment] - Injected executor-assignment module (for testing)
   */
  constructor(options = {}) {
    this._workflowChainsPath = options.workflowChainsPath ||
      path.join(__dirname, '..', '..', 'data', 'workflow-chains.yaml');
    this._intentPatternsPath = options.intentPatternsPath ||
      path.join(__dirname, 'intent-patterns.yaml');
    this._missionsDir = options.missionsDir || DEFAULT_MISSIONS_DIR;
    this._executorAssignment = options.executorAssignment || null;
    this._workflowChains = null;
    this._intentMapping = null;
    this._loaded = false;
  }

  // -------------------------------------------------------------------------
  // Data Loading
  // -------------------------------------------------------------------------

  /**
   * Load workflow chains and intent mapping from YAML files.
   * Called once at initialization.
   */
  loadData() {
    let yaml;
    try {
      yaml = require('js-yaml');
    } catch {
      throw new Error('js-yaml is required: npm install js-yaml');
    }

    // Load workflow chains
    try {
      const chainsRaw = fs.readFileSync(this._workflowChainsPath, 'utf8');
      const chainsParsed = yaml.load(chainsRaw);
      this._workflowChains = {};
      if (chainsParsed && chainsParsed.workflows) {
        for (const wf of chainsParsed.workflows) {
          this._workflowChains[wf.id] = wf;
        }
      }
    } catch (err) {
      if (process.env.AIOS_DEBUG) {
        console.warn(`[MissionPlanner] Failed to load workflow chains: ${err.message}`);
      }
      this._workflowChains = {};
    }

    // Load intent mapping from intent-patterns.yaml
    try {
      const patternsRaw = fs.readFileSync(this._intentPatternsPath, 'utf8');
      const patternsParsed = yaml.load(patternsRaw);
      this._intentMapping = patternsParsed.intentMapping || {};
    } catch (err) {
      if (process.env.AIOS_DEBUG) {
        console.warn(`[MissionPlanner] Failed to load intent patterns: ${err.message}`);
      }
      this._intentMapping = {};
    }

    // Load executor-assignment if not injected
    if (!this._executorAssignment) {
      try {
        this._executorAssignment = require(
          path.join(__dirname, '..', '..', 'core', 'orchestration', 'executor-assignment'),
        );
      } catch (err) {
        if (process.env.AIOS_DEBUG) {
          console.warn(`[MissionPlanner] Failed to load executor-assignment: ${err.message}`);
        }
        this._executorAssignment = null;
      }
    }

    this._loaded = true;
  }

  /**
   * Ensure data is loaded.
   * @private
   */
  _ensureLoaded() {
    if (!this._loaded) {
      this.loadData();
    }
  }

  // -------------------------------------------------------------------------
  // Main Entry Point
  // -------------------------------------------------------------------------

  /**
   * Generate an ExecutionPlan from a StructuredIntent.
   *
   * @param {object} structuredIntent - Output from intent-engine.js classify()
   * @returns {object} ExecutionPlan
   * @throws {CircularDependencyError} If dependency cycle is detected
   */
  plan(structuredIntent) {
    this._ensureLoaded();

    if (!structuredIntent || !structuredIntent.intent) {
      return this._buildTrivialPlan(structuredIntent, {
        handler: 'unknown',
        description: 'Unknown or empty intent',
      });
    }

    const intentName = structuredIntent.intent;
    const mapping = this._intentMapping[intentName];

    // Case 1: Internal handler (status, help, mode toggle) -> trivial plan
    if (mapping && mapping.internal) {
      return this._buildTrivialPlan(structuredIntent, mapping);
    }

    // Case 2: Agent passthrough (@agent direct command) -> trivial plan
    if (mapping && mapping.passthrough) {
      return this._buildPassthroughPlan(structuredIntent, mapping);
    }

    // Case 3: Workflow-based intent -> multi-step plan
    const chainId = INTENT_TO_CHAIN_MAP[intentName];
    if (chainId || (mapping && mapping.workflow)) {
      const resolvedChainId = chainId || mapping.workflow;
      return this._buildWorkflowPlan(structuredIntent, resolvedChainId);
    }

    // Case 4: Single-agent intent -> single-step plan
    if (mapping && mapping.agent) {
      return this._buildSingleAgentPlan(structuredIntent, mapping);
    }

    // Case 5: Unknown intent -> trivial fallback
    return this._buildTrivialPlan(structuredIntent, {
      handler: 'unknown',
      description: `No plan available for intent: ${intentName}`,
    });
  }

  // -------------------------------------------------------------------------
  // Plan Builders
  // -------------------------------------------------------------------------

  /**
   * Build a trivial 1-step plan for internal handlers.
   * @private
   */
  _buildTrivialPlan(intent, mapping) {
    const handler = mapping.handler || 'unknown';
    const step = createPlanStep({
      id: 'step-1',
      agent: 'jarvis',
      task: handler,
      command: handler,
      dependencies: [],
      estimatedDuration: DURATION_ESTIMATES.internal,
      parallel: false,
      rollbackAction: ROLLBACK_ACTIONS.internal,
      inputs: intent ? { rawInput: intent.rawInput } : {},
    });

    const description = mapping.description ||
      (intent ? `Internal handler: ${handler} for "${intent.rawInput || ''}"` : 'Unknown intent');

    return createExecutionPlan({
      intent,
      description,
      steps: [step],
      estimatedTotalDuration: DURATION_ESTIMATES.internal,
      parallelGroups: [],
    });
  }

  /**
   * Build a 1-step plan for agent passthrough (@agent direct).
   * @private
   */
  _buildPassthroughPlan(intent, _mapping) {
    const agentHint = intent.entities && intent.entities.agentHint
      ? `@${intent.entities.agentHint}`
      : '@dev';

    const step = createPlanStep({
      id: 'step-1',
      agent: agentHint,
      task: 'passthrough',
      command: intent.rawInput || '',
      dependencies: [],
      estimatedDuration: DURATION_ESTIMATES[agentHint] || DURATION_ESTIMATES.default,
      parallel: false,
      rollbackAction: resolveRollbackAction(agentHint, 'passthrough'),
      inputs: {
        rawInput: intent.rawInput,
        entities: intent.entities,
      },
    });

    return createExecutionPlan({
      intent,
      description: `Direct passthrough to ${agentHint}`,
      steps: [step],
      estimatedTotalDuration: step.estimatedDuration,
      parallelGroups: [],
    });
  }

  /**
   * Build a single-agent plan for non-workflow intents.
   * @private
   */
  _buildSingleAgentPlan(intent, mapping) {
    const agent = mapping.agent;
    const command = mapping.command || '';

    // Use executor-assignment to confirm agent if available
    const confirmedAgent = this._confirmAgent(agent, intent);

    const step = createPlanStep({
      id: 'step-1',
      agent: confirmedAgent,
      task: mapping.task || command,
      command: command,
      dependencies: [],
      estimatedDuration: DURATION_ESTIMATES[confirmedAgent] || DURATION_ESTIMATES.default,
      parallel: false,
      rollbackAction: resolveRollbackAction(confirmedAgent, command),
      inputs: {
        entities: intent.entities,
        rawInput: intent.rawInput,
      },
    });

    const entityDesc = this._buildEntityDescription(intent);
    const description = `${command} via ${confirmedAgent}${entityDesc}`;

    return createExecutionPlan({
      intent,
      description,
      steps: [step],
      estimatedTotalDuration: step.estimatedDuration,
      parallelGroups: [],
    });
  }

  /**
   * Build a multi-step plan from workflow-chains.yaml.
   * @private
   */
  _buildWorkflowPlan(intent, chainId) {
    const chain = this._workflowChains[chainId];
    if (!chain || !chain.chain || chain.chain.length === 0) {
      // Workflow chain not found, fall back to trivial
      return this._buildTrivialPlan(intent, {
        handler: 'unknown',
        description: `Workflow chain "${chainId}" not found`,
      });
    }

    // Build steps from chain
    const steps = [];
    for (let i = 0; i < chain.chain.length; i++) {
      const chainStep = chain.chain[i];
      const stepId = `step-${i + 1}`;

      // Dependencies: each step depends on the previous (sequential chain)
      const dependencies = i > 0 ? [`step-${i}`] : [];

      const agent = chainStep.agent;
      const command = chainStep.command || '';
      const task = chainStep.task || command;

      // Confirm agent via executor-assignment
      const confirmedAgent = this._confirmAgent(agent, intent);

      steps.push(createPlanStep({
        id: stepId,
        agent: confirmedAgent,
        task: task,
        command: this._interpolateCommand(command, intent),
        dependencies,
        estimatedDuration: DURATION_ESTIMATES[confirmedAgent] || DURATION_ESTIMATES.default,
        parallel: false,
        rollbackAction: resolveRollbackAction(confirmedAgent, command),
        inputs: {
          entities: intent.entities,
          condition: chainStep.condition || null,
          output: chainStep.output || null,
        },
      }));
    }

    // Topological sort (validates no cycles)
    const sortedSteps = topologicalSort(steps);

    // Identify parallel groups
    const parallelGroups = identifyParallelGroups(sortedSteps);

    // Mark parallel flags on steps
    const finalSteps = markParallelSteps(sortedSteps, parallelGroups);

    // Calculate total duration
    const totalMinutes = this._calculateTotalDuration(finalSteps, parallelGroups);

    const entityDesc = this._buildEntityDescription(intent);
    const description = `${chain.name || chainId}${entityDesc}`;

    return createExecutionPlan({
      intent,
      description,
      steps: finalSteps,
      estimatedTotalDuration: formatDuration(totalMinutes),
      parallelGroups,
    });
  }

  // -------------------------------------------------------------------------
  // Agent Confirmation
  // -------------------------------------------------------------------------

  /**
   * Confirm agent selection using executor-assignment.js if available.
   * Falls back to the provided agent if executor-assignment is unavailable
   * or if the resolved agent does not match.
   *
   * @private
   * @param {string} suggestedAgent - Agent from intent mapping or workflow chain
   * @param {object} intent - The StructuredIntent
   * @returns {string} Confirmed agent
   */
  _confirmAgent(suggestedAgent, intent) {
    if (!this._executorAssignment) {
      return suggestedAgent;
    }

    // Only confirm for development-related intents where content-based
    // assignment makes sense
    if (intent && intent.category === 'development' && intent.rawInput) {
      try {
        const assignment = this._executorAssignment.assignExecutorFromContent(intent.rawInput);
        if (assignment && assignment.executor) {
          // Prefer the workflow chain / intent mapping agent,
          // but log if executor-assignment disagrees
          if (assignment.executor !== suggestedAgent && process.env.AIOS_DEBUG) {
            console.warn(
              `[MissionPlanner] executor-assignment suggests ${assignment.executor} ` +
              `but workflow/mapping specifies ${suggestedAgent}. Using workflow agent.`,
            );
          }
        }
      } catch {
        // Silently ignore executor-assignment failures
      }
    }

    return suggestedAgent;
  }

  // -------------------------------------------------------------------------
  // Command Interpolation
  // -------------------------------------------------------------------------

  /**
   * Interpolate entity values into command strings.
   * E.g., "*draft" stays as-is, "*develop {story-id}" becomes "*develop 3.2"
   *
   * @private
   * @param {string} command
   * @param {object} intent
   * @returns {string}
   */
  _interpolateCommand(command, intent) {
    if (!command || !intent || !intent.entities) return command;
    let result = command;
    if (intent.entities.storyId) {
      result = result.replace('{story-id}', intent.entities.storyId);
    }
    if (intent.entities.epicId) {
      result = result.replace('{epic-id}', intent.entities.epicId);
    }
    if (intent.entities.topic) {
      result = result.replace('{topic}', intent.entities.topic);
    }
    return result;
  }

  // -------------------------------------------------------------------------
  // Duration Calculation
  // -------------------------------------------------------------------------

  /**
   * Calculate total estimated duration considering parallel groups.
   * Parallel groups overlap, so only the longest step in each group counts.
   *
   * @private
   * @param {object[]} steps
   * @param {string[][]} parallelGroups
   * @returns {number} Total minutes
   */
  _calculateTotalDuration(steps, parallelGroups) {
    const stepDurations = new Map();
    for (const step of steps) {
      stepDurations.set(step.id, parseDuration(step.estimatedDuration));
    }

    // Identify which steps are in parallel groups
    const parallelStepIds = new Set();
    let parallelSavings = 0;

    for (const group of parallelGroups) {
      const groupDurations = group.map((id) => stepDurations.get(id) || 0);
      const maxDuration = Math.max(...groupDurations);
      const totalDuration = groupDurations.reduce((sum, d) => sum + d, 0);
      parallelSavings += totalDuration - maxDuration;
      for (const id of group) {
        parallelStepIds.add(id);
      }
    }

    const totalSequential = steps.reduce((sum, s) => sum + parseDuration(s.estimatedDuration), 0);
    return totalSequential - parallelSavings;
  }

  // -------------------------------------------------------------------------
  // Description Helpers
  // -------------------------------------------------------------------------

  /**
   * Build a human-readable entity description suffix.
   * @private
   * @param {object} intent
   * @returns {string}
   */
  _buildEntityDescription(intent) {
    if (!intent || !intent.entities) return '';
    const parts = [];
    if (intent.entities.storyId) parts.push(`Story ${intent.entities.storyId}`);
    if (intent.entities.epicId) parts.push(`Epic ${intent.entities.epicId}`);
    if (intent.entities.featureName) parts.push(`"${intent.entities.featureName}"`);
    return parts.length > 0 ? ` for ${parts.join(', ')}` : '';
  }

  // -------------------------------------------------------------------------
  // YAML Serialization
  // -------------------------------------------------------------------------

  /**
   * Serialize an ExecutionPlan to YAML string.
   *
   * @param {object} executionPlan
   * @returns {string} YAML representation
   */
  serializePlan(executionPlan) {
    const yaml = require('js-yaml');
    return yaml.dump(executionPlan, {
      indent: 2,
      lineWidth: 120,
      noRefs: true,
      sortKeys: false,
    });
  }

  /**
   * Deserialize a YAML string into an ExecutionPlan object.
   *
   * @param {string} yamlString
   * @returns {object} Deserialized ExecutionPlan
   */
  deserializePlan(yamlString) {
    const yaml = require('js-yaml');
    return yaml.load(yamlString);
  }

  // -------------------------------------------------------------------------
  // Persistence
  // -------------------------------------------------------------------------

  /**
   * Persist an ExecutionPlan to .aios/jarvis/missions/.
   *
   * @param {object} executionPlan
   * @returns {string} File path of the persisted plan
   */
  persistPlan(executionPlan) {
    // Create directory if it does not exist
    if (!fs.existsSync(this._missionsDir)) {
      fs.mkdirSync(this._missionsDir, { recursive: true });
    }

    const filename = `mission-${executionPlan.id}.yaml`;
    const filePath = path.join(this._missionsDir, filename);
    const yamlContent = this.serializePlan(executionPlan);
    fs.writeFileSync(filePath, yamlContent, 'utf8');

    return filePath;
  }

  /**
   * Load a persisted plan from .aios/jarvis/missions/.
   *
   * @param {string} missionId - The mission ID (or full filename)
   * @returns {object|null} Deserialized ExecutionPlan or null if not found
   */
  loadPlan(missionId) {
    const filename = missionId.endsWith('.yaml')
      ? missionId
      : `mission-${missionId}.yaml`;
    const filePath = path.join(this._missionsDir, filename);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return this.deserializePlan(content);
    } catch (err) {
      if (process.env.AIOS_DEBUG) {
        console.warn(`[MissionPlanner] Failed to load plan ${missionId}: ${err.message}`);
      }
      return null;
    }
  }
}

// ---------------------------------------------------------------------------
// Module Exports
// ---------------------------------------------------------------------------

module.exports = {
  MissionPlanner,
  CircularDependencyError,
  createPlanStep,
  createExecutionPlan,
  topologicalSort,
  identifyParallelGroups,
  markParallelSteps,
  parseDuration,
  formatDuration,
  resolveRollbackAction,

  // Constants exported for testing
  MAX_PARALLEL_CONCURRENCY,
  INTENT_TO_CHAIN_MAP,
  DURATION_ESTIMATES,
  ROLLBACK_ACTIONS,
};
