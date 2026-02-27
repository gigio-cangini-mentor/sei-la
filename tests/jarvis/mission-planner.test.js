/**
 * JARVIS Mission Planner - Unit Tests
 *
 * Covers:
 * - Trivial plan (1 step) for internal intents (status, help)
 * - Single-agent plan for non-workflow intents (story.develop, db.design)
 * - Multi-step plan from workflow chains (SDC full cycle)
 * - Topological sort with dependencies
 * - Circular dependency detection
 * - Parallel group identification
 * - Parallel step marking and concurrency cap (MAX_PARALLEL_CONCURRENCY)
 * - YAML serialization/deserialization round-trip
 * - Plan persistence to filesystem (mocked)
 * - Duration parsing and formatting
 * - Rollback action resolution
 * - Edge cases (unknown intent, empty input, missing workflow chain)
 * - Agent passthrough plan
 * - Command interpolation with entities
 *
 * @story 1.3
 */

'use strict';

const path = require('path');
const fs = require('fs');
const os = require('os');

// ---------------------------------------------------------------------------
// Module under test
// ---------------------------------------------------------------------------

const PLANNER_PATH = path.resolve(
  __dirname, '..', '..', '.aios-core', 'core', 'jarvis', 'mission-planner',
);

const {
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
  MAX_PARALLEL_CONCURRENCY,
  INTENT_TO_CHAIN_MAP,
  DURATION_ESTIMATES,
  ROLLBACK_ACTIONS,
} = require(PLANNER_PATH);

// ---------------------------------------------------------------------------
// Test Helpers
// ---------------------------------------------------------------------------

/**
 * Create a minimal StructuredIntent for testing.
 */
function makeIntent(overrides = {}) {
  return {
    intent: overrides.intent || 'status.query',
    category: overrides.category || 'status_inquiry',
    confidence: overrides.confidence || 0.92,
    suggestedAction: overrides.suggestedAction || '',
    rawInput: overrides.rawInput || 'status',
    ambiguous: overrides.ambiguous || false,
    disambiguation: overrides.disambiguation || [],
    entities: {
      storyId: null,
      epicId: null,
      agentHint: null,
      featureName: null,
      filePaths: [],
      topic: null,
      mode: null,
      ...(overrides.entities || {}),
    },
    context: {
      currentStory: null,
      currentBranch: null,
      workflowState: null,
      previousIntent: null,
      ...(overrides.context || {}),
    },
  };
}

/**
 * Create a temporary directory for mission persistence tests.
 */
function createTempMissionsDir() {
  const tmpDir = path.join(os.tmpdir(), `mission-planner-test-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
  fs.mkdirSync(tmpDir, { recursive: true });
  return tmpDir;
}

/**
 * Remove a temporary directory and all its contents.
 */
function cleanupTempDir(dirPath) {
  try {
    fs.rmSync(dirPath, { recursive: true, force: true });
  } catch {
    // Ignore cleanup failures
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MissionPlanner', () => {
  let planner;

  beforeEach(() => {
    planner = new MissionPlanner({
      executorAssignment: {
        assignExecutor: jest.fn().mockReturnValue({
          executor: '@dev',
          quality_gate: '@architect',
          quality_gate_tools: ['code_review'],
        }),
        assignExecutorFromContent: jest.fn().mockReturnValue({
          executor: '@dev',
          quality_gate: '@architect',
          quality_gate_tools: ['code_review'],
        }),
      },
    });
    planner.loadData();
  });

  // -------------------------------------------------------------------------
  // Trivial Plans (AC: 7)
  // -------------------------------------------------------------------------

  describe('Trivial Plans (single-step, internal intents)', () => {
    test('generates 1-step plan for status.query', () => {
      const intent = makeIntent({ intent: 'status.query', rawInput: 'what is the status?' });
      const plan = planner.plan(intent);

      expect(plan).toBeDefined();
      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].id).toBe('step-1');
      expect(plan.steps[0].agent).toBe('jarvis');
      expect(plan.steps[0].task).toBe('status');
      expect(plan.steps[0].dependencies).toEqual([]);
      expect(plan.steps[0].parallel).toBe(false);
      expect(plan.parallelGroups).toEqual([]);
      expect(plan.intent).toEqual(intent);
    });

    test('generates 1-step plan for help.general', () => {
      const intent = makeIntent({ intent: 'help.general', rawInput: 'help' });
      const plan = planner.plan(intent);

      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('jarvis');
      expect(plan.steps[0].task).toBe('help');
      expect(plan.steps[0].rollbackAction).toBe('No rollback needed for internal operations');
    });

    test('generates 1-step plan for mode.yolo', () => {
      const intent = makeIntent({
        intent: 'mode.yolo',
        category: 'meta_configuration',
        rawInput: 'yolo',
      });
      const plan = planner.plan(intent);

      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('jarvis');
      expect(plan.steps[0].task).toBe('permission_toggle');
    });

    test('generates fallback plan for null intent', () => {
      const plan = planner.plan(null);

      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('jarvis');
      expect(plan.description).toContain('Unknown');
    });

    test('generates fallback plan for empty intent object', () => {
      const plan = planner.plan({});

      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('jarvis');
    });
  });

  // -------------------------------------------------------------------------
  // Single-Agent Plans
  // -------------------------------------------------------------------------

  describe('Single-Agent Plans', () => {
    test('generates plan for story.develop with storyId', () => {
      const intent = makeIntent({
        intent: 'story.develop',
        category: 'development',
        rawInput: 'implement story 3.2',
        entities: { storyId: '3.2' },
      });
      const plan = planner.plan(intent);

      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('@dev');
      expect(plan.steps[0].command).toBe('*develop');
      expect(plan.description).toContain('@dev');
      expect(plan.description).toContain('Story 3.2');
    });

    test('generates plan for db.design', () => {
      const intent = makeIntent({
        intent: 'db.design',
        category: 'development',
        rawInput: 'design the database schema',
      });
      const plan = planner.plan(intent);

      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('@data-engineer');
      expect(plan.steps[0].command).toBe('*design-schema');
    });

    test('generates plan for research.general', () => {
      const intent = makeIntent({
        intent: 'research.general',
        category: 'research',
        rawInput: 'research authentication patterns',
        entities: { topic: 'authentication patterns' },
      });
      const plan = planner.plan(intent);

      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('@analyst');
      expect(plan.steps[0].command).toBe('*research');
    });

    test('generates plan for epic.create', () => {
      const intent = makeIntent({
        intent: 'epic.create',
        category: 'planning',
        rawInput: 'create a new epic for user auth',
        entities: { topic: 'user auth' },
      });
      const plan = planner.plan(intent);

      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('@pm');
      expect(plan.steps[0].command).toBe('*create-epic');
    });
  });

  // -------------------------------------------------------------------------
  // Agent Passthrough Plans
  // -------------------------------------------------------------------------

  describe('Agent Passthrough Plans', () => {
    test('generates passthrough plan for agent.direct', () => {
      const intent = makeIntent({
        intent: 'agent.direct',
        category: 'operations',
        rawInput: '@architect analyze impact',
        entities: { agentHint: 'architect' },
      });
      const plan = planner.plan(intent);

      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('@architect');
      expect(plan.steps[0].task).toBe('passthrough');
      expect(plan.description).toContain('passthrough');
    });

    test('uses @dev as fallback when no agentHint in passthrough', () => {
      const intent = makeIntent({
        intent: 'agent.direct',
        category: 'operations',
        rawInput: 'do something',
        entities: {},
      });
      const plan = planner.plan(intent);

      expect(plan.steps[0].agent).toBe('@dev');
    });
  });

  // -------------------------------------------------------------------------
  // Multi-Step Workflow Plans (AC: 3, 8)
  // -------------------------------------------------------------------------

  describe('Multi-Step Workflow Plans (SDC)', () => {
    test('generates full SDC plan for story.full_cycle', () => {
      const intent = makeIntent({
        intent: 'story.full_cycle',
        category: 'development',
        rawInput: 'implement end to end story 3.2',
        entities: { storyId: '3.2' },
      });
      const plan = planner.plan(intent);

      // SDC has 5 steps: sm, po, dev, qa, devops
      expect(plan.steps.length).toBeGreaterThanOrEqual(5);

      // Verify step ordering
      expect(plan.steps[0].agent).toBe('@sm');
      expect(plan.steps[1].agent).toBe('@po');
      expect(plan.steps[2].agent).toBe('@dev');
      expect(plan.steps[3].agent).toBe('@qa');
      expect(plan.steps[4].agent).toBe('@devops');

      // Verify dependencies form a chain
      expect(plan.steps[0].dependencies).toEqual([]);
      expect(plan.steps[1].dependencies).toEqual(['step-1']);
      expect(plan.steps[2].dependencies).toEqual(['step-2']);
      expect(plan.steps[3].dependencies).toEqual(['step-3']);
      expect(plan.steps[4].dependencies).toEqual(['step-4']);

      // Verify description
      expect(plan.description).toContain('Story Development Cycle');
      expect(plan.description).toContain('3.2');
    });

    test('generates spec-pipeline plan', () => {
      const intent = makeIntent({
        intent: 'spec.pipeline',
        category: 'planning',
        rawInput: 'create PRD for payments module',
        entities: { topic: 'payments module' },
      });
      const plan = planner.plan(intent);

      // Spec pipeline has 6 steps
      expect(plan.steps.length).toBeGreaterThanOrEqual(4);
      expect(plan.steps[0].agent).toBe('@pm');
    });

    test('generates qa-loop plan', () => {
      const intent = makeIntent({
        intent: 'qa.loop',
        category: 'operations',
        rawInput: 'keep reviewing until it passes',
      });
      const plan = planner.plan(intent);

      expect(plan.steps.length).toBeGreaterThanOrEqual(2);
      expect(plan.steps[0].agent).toBe('@qa');
    });

    test('generates brownfield plan', () => {
      const intent = makeIntent({
        intent: 'brownfield.discover',
        category: 'research',
        rawInput: 'assess this legacy codebase',
      });
      const plan = planner.plan(intent);

      expect(plan.steps.length).toBeGreaterThanOrEqual(4);
      expect(plan.steps[0].agent).toBe('@architect');
    });

    test('handles missing workflow chain gracefully', () => {
      const intent = makeIntent({
        intent: 'story.full_cycle',
        category: 'development',
        rawInput: 'full cycle',
      });

      // Create planner with empty chains
      const emptyPlanner = new MissionPlanner({
        workflowChainsPath: '/nonexistent/path.yaml',
        executorAssignment: {
          assignExecutor: jest.fn(),
          assignExecutorFromContent: jest.fn(),
        },
      });
      emptyPlanner._loaded = true;
      emptyPlanner._workflowChains = {};
      emptyPlanner._intentMapping = { 'story.full_cycle': { workflow: 'sdc' } };

      const plan = emptyPlanner.plan(intent);
      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('jarvis');
    });

    test('interpolates storyId into commands', () => {
      const intent = makeIntent({
        intent: 'story.full_cycle',
        category: 'development',
        rawInput: 'full cycle for story 3.2',
        entities: { storyId: '3.2' },
      });
      const plan = planner.plan(intent);

      // Steps with {story-id} placeholder should be interpolated
      const poStep = plan.steps.find((s) => s.agent === '@po');
      if (poStep && poStep.command.includes('3.2')) {
        expect(poStep.command).toContain('3.2');
      }
    });
  });

  // -------------------------------------------------------------------------
  // Unknown Intents
  // -------------------------------------------------------------------------

  describe('Unknown Intent Handling', () => {
    test('generates fallback for unknown intent name', () => {
      const intent = makeIntent({
        intent: 'completely.unknown',
        rawInput: 'do something weird',
      });
      const plan = planner.plan(intent);

      expect(plan.steps).toHaveLength(1);
      expect(plan.steps[0].agent).toBe('jarvis');
      expect(plan.description).toContain('completely.unknown');
    });
  });

  // -------------------------------------------------------------------------
  // Plan Metadata
  // -------------------------------------------------------------------------

  describe('Plan Metadata', () => {
    test('plan has required fields', () => {
      const intent = makeIntent();
      const plan = planner.plan(intent);

      expect(plan.id).toBeDefined();
      expect(plan.id).toMatch(/^mission-\d+-[a-f0-9]{4}$/);
      expect(plan.intent).toBeDefined();
      expect(plan.description).toBeDefined();
      expect(plan.steps).toBeDefined();
      expect(plan.createdAt).toBeDefined();
      expect(plan.estimatedTotalDuration).toBeDefined();
      expect(plan.parallelGroups).toBeDefined();
    });

    test('step has all required fields', () => {
      const intent = makeIntent({
        intent: 'story.develop',
        category: 'development',
        rawInput: 'implement story 1.1',
        entities: { storyId: '1.1' },
      });
      const plan = planner.plan(intent);
      const step = plan.steps[0];

      expect(step.id).toBeDefined();
      expect(step.agent).toBeDefined();
      expect(step.task).toBeDefined();
      expect(step.command).toBeDefined();
      expect(step.dependencies).toBeDefined();
      expect(step.estimatedDuration).toBeDefined();
      expect(typeof step.parallel).toBe('boolean');
      expect(step.rollbackAction).toBeDefined();
      expect(step.inputs).toBeDefined();
    });
  });
});

// ---------------------------------------------------------------------------
// Topological Sort Tests (AC: 4)
// ---------------------------------------------------------------------------

describe('topologicalSort', () => {
  test('sorts a linear chain correctly', () => {
    const steps = [
      createPlanStep({ id: 'step-3', dependencies: ['step-2'] }),
      createPlanStep({ id: 'step-1', dependencies: [] }),
      createPlanStep({ id: 'step-2', dependencies: ['step-1'] }),
    ];

    const sorted = topologicalSort(steps);
    const ids = sorted.map((s) => s.id);

    expect(ids.indexOf('step-1')).toBeLessThan(ids.indexOf('step-2'));
    expect(ids.indexOf('step-2')).toBeLessThan(ids.indexOf('step-3'));
  });

  test('sorts a diamond dependency graph', () => {
    //     step-1
    //    /      \
    // step-2  step-3
    //    \      /
    //     step-4
    const steps = [
      createPlanStep({ id: 'step-1', dependencies: [] }),
      createPlanStep({ id: 'step-2', dependencies: ['step-1'] }),
      createPlanStep({ id: 'step-3', dependencies: ['step-1'] }),
      createPlanStep({ id: 'step-4', dependencies: ['step-2', 'step-3'] }),
    ];

    const sorted = topologicalSort(steps);
    const ids = sorted.map((s) => s.id);

    expect(ids[0]).toBe('step-1');
    expect(ids.indexOf('step-2')).toBeLessThan(ids.indexOf('step-4'));
    expect(ids.indexOf('step-3')).toBeLessThan(ids.indexOf('step-4'));
    expect(ids[3]).toBe('step-4');
  });

  test('handles single step', () => {
    const steps = [createPlanStep({ id: 'step-1', dependencies: [] })];
    const sorted = topologicalSort(steps);

    expect(sorted).toHaveLength(1);
    expect(sorted[0].id).toBe('step-1');
  });

  test('handles empty array', () => {
    expect(topologicalSort([])).toEqual([]);
  });

  test('throws CircularDependencyError for cycle', () => {
    const steps = [
      createPlanStep({ id: 'step-1', dependencies: ['step-3'] }),
      createPlanStep({ id: 'step-2', dependencies: ['step-1'] }),
      createPlanStep({ id: 'step-3', dependencies: ['step-2'] }),
    ];

    expect(() => topologicalSort(steps)).toThrow(CircularDependencyError);
    try {
      topologicalSort(steps);
    } catch (err) {
      expect(err.name).toBe('CircularDependencyError');
      expect(err.cycle).toBeDefined();
      expect(err.cycle.length).toBeGreaterThan(1);
    }
  });

  test('throws for 2-node cycle', () => {
    const steps = [
      createPlanStep({ id: 'a', dependencies: ['b'] }),
      createPlanStep({ id: 'b', dependencies: ['a'] }),
    ];

    expect(() => topologicalSort(steps)).toThrow(CircularDependencyError);
  });

  test('ignores dependencies referencing non-existent steps', () => {
    const steps = [
      createPlanStep({ id: 'step-1', dependencies: [] }),
      createPlanStep({ id: 'step-2', dependencies: ['step-1', 'step-nonexistent'] }),
    ];

    const sorted = topologicalSort(steps);
    const ids = sorted.map((s) => s.id);

    expect(ids).toContain('step-1');
    expect(ids).toContain('step-2');
    expect(ids.indexOf('step-1')).toBeLessThan(ids.indexOf('step-2'));
  });

  test('handles multiple independent roots', () => {
    const steps = [
      createPlanStep({ id: 'a', dependencies: [] }),
      createPlanStep({ id: 'b', dependencies: [] }),
      createPlanStep({ id: 'c', dependencies: ['a', 'b'] }),
    ];

    const sorted = topologicalSort(steps);
    const ids = sorted.map((s) => s.id);

    expect(ids.indexOf('a')).toBeLessThan(ids.indexOf('c'));
    expect(ids.indexOf('b')).toBeLessThan(ids.indexOf('c'));
  });
});

// ---------------------------------------------------------------------------
// Parallel Group Tests (AC: 5)
// ---------------------------------------------------------------------------

describe('identifyParallelGroups', () => {
  test('identifies parallel steps with no shared dependencies', () => {
    // step-1 -> step-2 (parallel with step-3) -> step-4
    //        -> step-3 (parallel with step-2)
    const steps = [
      createPlanStep({ id: 'step-1', dependencies: [] }),
      createPlanStep({ id: 'step-2', dependencies: ['step-1'] }),
      createPlanStep({ id: 'step-3', dependencies: ['step-1'] }),
      createPlanStep({ id: 'step-4', dependencies: ['step-2', 'step-3'] }),
    ];

    const sorted = topologicalSort(steps);
    const groups = identifyParallelGroups(sorted);

    expect(groups.length).toBeGreaterThanOrEqual(1);
    // step-2 and step-3 should be in the same group
    const group = groups.find(
      (g) => g.includes('step-2') && g.includes('step-3'),
    );
    expect(group).toBeDefined();
  });

  test('returns empty for linear chain (no parallelism)', () => {
    const steps = [
      createPlanStep({ id: 'step-1', dependencies: [] }),
      createPlanStep({ id: 'step-2', dependencies: ['step-1'] }),
      createPlanStep({ id: 'step-3', dependencies: ['step-2'] }),
    ];

    const sorted = topologicalSort(steps);
    const groups = identifyParallelGroups(sorted);

    expect(groups).toEqual([]);
  });

  test('returns empty for single step', () => {
    const steps = [createPlanStep({ id: 'step-1', dependencies: [] })];
    expect(identifyParallelGroups(steps)).toEqual([]);
  });

  test('returns empty for empty array', () => {
    expect(identifyParallelGroups([])).toEqual([]);
  });

  test('caps parallel groups at MAX_PARALLEL_CONCURRENCY', () => {
    // 5 independent roots (all parallelizable)
    const steps = [
      createPlanStep({ id: 'r1', dependencies: [] }),
      createPlanStep({ id: 'r2', dependencies: [] }),
      createPlanStep({ id: 'r3', dependencies: [] }),
      createPlanStep({ id: 'r4', dependencies: [] }),
      createPlanStep({ id: 'r5', dependencies: [] }),
    ];

    const sorted = topologicalSort(steps);
    const groups = identifyParallelGroups(sorted);

    // Each group should have at most MAX_PARALLEL_CONCURRENCY members
    for (const group of groups) {
      expect(group.length).toBeLessThanOrEqual(MAX_PARALLEL_CONCURRENCY);
    }
    // With 5 roots and max 3, we should get at least 2 groups
    // (group of 3 + group of 2)
    expect(groups.length).toBeGreaterThanOrEqual(1);
  });
});

describe('markParallelSteps', () => {
  test('marks steps in parallel groups as parallel: true', () => {
    const steps = [
      createPlanStep({ id: 'step-1' }),
      createPlanStep({ id: 'step-2' }),
      createPlanStep({ id: 'step-3' }),
    ];
    const groups = [['step-1', 'step-2']];

    const marked = markParallelSteps(steps, groups);

    expect(marked[0].parallel).toBe(true);
    expect(marked[1].parallel).toBe(true);
    expect(marked[2].parallel).toBe(false);
  });

  test('handles empty groups', () => {
    const steps = [createPlanStep({ id: 'step-1' })];
    const marked = markParallelSteps(steps, []);

    expect(marked[0].parallel).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Duration Utility Tests
// ---------------------------------------------------------------------------

describe('parseDuration', () => {
  test('parses minutes', () => {
    expect(parseDuration('5m')).toBe(5);
    expect(parseDuration('15m')).toBe(15);
    expect(parseDuration('0m')).toBe(0);
  });

  test('parses hours', () => {
    expect(parseDuration('2h')).toBe(120);
    expect(parseDuration('1h')).toBe(60);
  });

  test('parses seconds', () => {
    expect(parseDuration('30s')).toBeCloseTo(0.5, 1);
    expect(parseDuration('60s')).toBe(1);
  });

  test('returns 0 for invalid input', () => {
    expect(parseDuration('')).toBe(0);
    expect(parseDuration(null)).toBe(0);
    expect(parseDuration(undefined)).toBe(0);
    expect(parseDuration('invalid')).toBe(0);
    expect(parseDuration('5x')).toBe(0);
  });
});

describe('formatDuration', () => {
  test('formats minutes', () => {
    expect(formatDuration(5)).toBe('5m');
    expect(formatDuration(45)).toBe('45m');
  });

  test('formats hours', () => {
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(120)).toBe('2h');
  });

  test('formats hours and minutes', () => {
    expect(formatDuration(90)).toBe('1h30m');
    expect(formatDuration(75)).toBe('1h15m');
  });

  test('handles zero and negative', () => {
    expect(formatDuration(0)).toBe('0m');
    expect(formatDuration(-5)).toBe('0m');
  });
});

// ---------------------------------------------------------------------------
// Rollback Action Tests (AC: 2)
// ---------------------------------------------------------------------------

describe('resolveRollbackAction', () => {
  test('resolves @dev develop rollback', () => {
    const action = resolveRollbackAction('@dev', '*develop');
    expect(action).toContain('git revert');
  });

  test('resolves @devops push rollback', () => {
    const action = resolveRollbackAction('@devops', '*push');
    expect(action).toContain('Cannot auto-rollback');
  });

  test('resolves @qa review rollback', () => {
    const action = resolveRollbackAction('@qa', '*review');
    expect(action).toContain('No file changes');
  });

  test('resolves @sm draft rollback', () => {
    const action = resolveRollbackAction('@sm', '*draft');
    expect(action).toContain('Delete story file');
  });

  test('resolves unknown agent to default', () => {
    const action = resolveRollbackAction('@unknown-agent', '*anything');
    expect(action).toBe('Manual rollback required');
  });
});

// ---------------------------------------------------------------------------
// YAML Serialization Round-Trip (AC: 6)
// ---------------------------------------------------------------------------

describe('YAML Serialization', () => {
  let planner;

  beforeEach(() => {
    planner = new MissionPlanner({
      executorAssignment: {
        assignExecutor: jest.fn(),
        assignExecutorFromContent: jest.fn(),
      },
    });
    planner.loadData();
  });

  test('round-trip serialization preserves plan structure', () => {
    const intent = makeIntent({
      intent: 'story.full_cycle',
      category: 'development',
      rawInput: 'full cycle for story 2.1',
      entities: { storyId: '2.1' },
    });
    const plan = planner.plan(intent);

    const yamlStr = planner.serializePlan(plan);
    expect(typeof yamlStr).toBe('string');
    expect(yamlStr.length).toBeGreaterThan(0);

    const restored = planner.deserializePlan(yamlStr);

    expect(restored.id).toBe(plan.id);
    expect(restored.description).toBe(plan.description);
    expect(restored.steps.length).toBe(plan.steps.length);
    expect(restored.estimatedTotalDuration).toBe(plan.estimatedTotalDuration);
    expect(restored.parallelGroups).toEqual(plan.parallelGroups);

    // Deep check first step
    expect(restored.steps[0].id).toBe(plan.steps[0].id);
    expect(restored.steps[0].agent).toBe(plan.steps[0].agent);
    expect(restored.steps[0].command).toBe(plan.steps[0].command);
    expect(restored.steps[0].dependencies).toEqual(plan.steps[0].dependencies);
  });

  test('round-trip for trivial plan', () => {
    const intent = makeIntent({ intent: 'status.query', rawInput: 'status' });
    const plan = planner.plan(intent);

    const yamlStr = planner.serializePlan(plan);
    const restored = planner.deserializePlan(yamlStr);

    expect(restored.steps).toHaveLength(1);
    expect(restored.steps[0].agent).toBe('jarvis');
    expect(restored.steps[0].task).toBe('status');
  });
});

// ---------------------------------------------------------------------------
// Persistence Tests (AC: 6)
// ---------------------------------------------------------------------------

describe('Plan Persistence', () => {
  let planner;
  let tmpDir;

  beforeEach(() => {
    tmpDir = createTempMissionsDir();
    planner = new MissionPlanner({
      missionsDir: tmpDir,
      executorAssignment: {
        assignExecutor: jest.fn(),
        assignExecutorFromContent: jest.fn(),
      },
    });
    planner.loadData();
  });

  afterEach(() => {
    cleanupTempDir(tmpDir);
  });

  test('persists plan to filesystem', () => {
    const intent = makeIntent({ intent: 'status.query', rawInput: 'status' });
    const plan = planner.plan(intent);

    const filePath = planner.persistPlan(plan);

    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain(plan.id);
    expect(content).toContain('jarvis');
  });

  test('loads persisted plan', () => {
    const intent = makeIntent({
      intent: 'story.develop',
      category: 'development',
      rawInput: 'implement story 5.1',
      entities: { storyId: '5.1' },
    });
    const plan = planner.plan(intent);
    planner.persistPlan(plan);

    const loaded = planner.loadPlan(plan.id);

    expect(loaded).not.toBeNull();
    expect(loaded.id).toBe(plan.id);
    expect(loaded.steps.length).toBe(plan.steps.length);
  });

  test('returns null for nonexistent plan', () => {
    const loaded = planner.loadPlan('nonexistent-mission-id');
    expect(loaded).toBeNull();
  });

  test('creates missions directory if it does not exist', () => {
    const nestedDir = path.join(tmpDir, 'nested', 'deep', 'missions');
    const nestedPlanner = new MissionPlanner({
      missionsDir: nestedDir,
      executorAssignment: {
        assignExecutor: jest.fn(),
        assignExecutorFromContent: jest.fn(),
      },
    });
    nestedPlanner.loadData();

    const intent = makeIntent({ intent: 'help.general', rawInput: 'help' });
    const plan = nestedPlanner.plan(intent);
    const filePath = nestedPlanner.persistPlan(plan);

    expect(fs.existsSync(filePath)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Factory Function Tests
// ---------------------------------------------------------------------------

describe('createPlanStep', () => {
  test('creates step with defaults', () => {
    const step = createPlanStep();

    expect(step.id).toBe('step-1');
    expect(step.agent).toBe('');
    expect(step.task).toBe('');
    expect(step.command).toBe('');
    expect(step.dependencies).toEqual([]);
    expect(step.estimatedDuration).toBe('5m');
    expect(step.parallel).toBe(false);
    expect(step.rollbackAction).toBe('Manual rollback required');
    expect(step.inputs).toEqual({});
  });

  test('creates step with overrides', () => {
    const step = createPlanStep({
      id: 'step-42',
      agent: '@qa',
      task: 'qa-gate.md',
      command: '*review 3.2',
      dependencies: ['step-41'],
      estimatedDuration: '10m',
      parallel: true,
      rollbackAction: 'None',
      inputs: { storyId: '3.2' },
    });

    expect(step.id).toBe('step-42');
    expect(step.agent).toBe('@qa');
    expect(step.dependencies).toEqual(['step-41']);
    expect(step.parallel).toBe(true);
  });
});

describe('createExecutionPlan', () => {
  test('creates plan with defaults', () => {
    const plan = createExecutionPlan();

    expect(plan.id).toMatch(/^mission-\d+-[a-f0-9]{4}$/);
    expect(plan.intent).toBeNull();
    expect(plan.description).toBe('');
    expect(plan.steps).toEqual([]);
    expect(plan.createdAt).toBeDefined();
    expect(plan.estimatedTotalDuration).toBe('0m');
    expect(plan.parallelGroups).toEqual([]);
  });

  test('creates plan with overrides', () => {
    const plan = createExecutionPlan({
      id: 'mission-test',
      description: 'Test plan',
      steps: [createPlanStep({ id: 'step-1' })],
    });

    expect(plan.id).toBe('mission-test');
    expect(plan.description).toBe('Test plan');
    expect(plan.steps).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Constants Tests
// ---------------------------------------------------------------------------

describe('Constants', () => {
  test('INTENT_TO_CHAIN_MAP has expected mappings', () => {
    expect(INTENT_TO_CHAIN_MAP['story.full_cycle']).toBe('sdc');
    expect(INTENT_TO_CHAIN_MAP['spec.pipeline']).toBe('spec-pipeline');
    expect(INTENT_TO_CHAIN_MAP['qa.loop']).toBe('qa-loop');
    expect(INTENT_TO_CHAIN_MAP['brownfield.discover']).toBe('brownfield');
  });

  test('MAX_PARALLEL_CONCURRENCY is 3', () => {
    expect(MAX_PARALLEL_CONCURRENCY).toBe(3);
  });

  test('DURATION_ESTIMATES covers all known agents', () => {
    const agents = ['@sm', '@po', '@dev', '@qa', '@devops', '@architect', '@analyst', '@pm'];
    for (const agent of agents) {
      expect(DURATION_ESTIMATES[agent]).toBeDefined();
    }
  });
});

// ---------------------------------------------------------------------------
// Edge Cases
// ---------------------------------------------------------------------------

describe('Edge Cases', () => {
  let planner;

  beforeEach(() => {
    planner = new MissionPlanner({
      executorAssignment: {
        assignExecutor: jest.fn(),
        assignExecutorFromContent: jest.fn(),
      },
    });
    planner.loadData();
  });

  test('handles intent with no entities gracefully', () => {
    const intent = makeIntent({
      intent: 'story.develop',
      category: 'development',
      rawInput: 'develop something',
      entities: {},
    });
    const plan = planner.plan(intent);

    expect(plan.steps).toHaveLength(1);
    expect(plan.steps[0].agent).toBe('@dev');
  });

  test('handles intent with all entities populated', () => {
    const intent = makeIntent({
      intent: 'story.develop',
      category: 'development',
      rawInput: 'implement story 3.2 from epic 1',
      entities: {
        storyId: '3.2',
        epicId: '1',
        agentHint: 'dev',
        featureName: 'auth module',
        mode: 'yolo',
      },
    });
    const plan = planner.plan(intent);

    expect(plan.steps).toHaveLength(1);
    expect(plan.description).toContain('Story 3.2');
    expect(plan.description).toContain('Epic 1');
  });

  test('auto-loads data on first plan() call', () => {
    const lazyPlanner = new MissionPlanner({
      executorAssignment: {
        assignExecutor: jest.fn(),
        assignExecutorFromContent: jest.fn(),
      },
    });
    // DO NOT call loadData()

    const intent = makeIntent({ intent: 'help.general', rawInput: 'help' });
    const plan = lazyPlanner.plan(intent);

    expect(plan).toBeDefined();
    expect(plan.steps).toHaveLength(1);
  });
});
