#!/usr/bin/env node

/**
 * JARVIS Bootstrap Module
 * Core bootstrap and REPL entry point for the JARVIS CLI.
 *
 * Responsibilities:
 * - Load JARVIS configuration from core-config.yaml
 * - Detect project context (git branch, active stories, last commit)
 * - Display contextual greeting
 * - Run interactive REPL or one-shot command mode
 * - Handle exit/farewell
 *
 * @module jarvis-bootstrap
 * @story 1.1
 */

'use strict';

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');

// ---------------------------------------------------------------------------
// JARVIS Core Module Imports (lazy-loaded for resilience)
// ---------------------------------------------------------------------------

let _intentEngine = null;
let _missionPlanner = null;
let _autonomyController = null;
let _delegationBridge = null;
let _sessionManager = null;
let _progressReporter = null;

function getIntentEngine() {
  if (!_intentEngine) {
    try {
      const { IntentEngine } = require(path.join(__dirname, 'intent-engine'));
      _intentEngine = new IntentEngine();
      _intentEngine.loadPatterns();
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS] IntentEngine unavailable: ${err.message}`);
    }
  }
  return _intentEngine;
}

function getMissionPlanner() {
  if (!_missionPlanner) {
    try {
      const { MissionPlanner } = require(path.join(__dirname, 'mission-planner'));
      _missionPlanner = new MissionPlanner();
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS] MissionPlanner unavailable: ${err.message}`);
    }
  }
  return _missionPlanner;
}

function getAutonomyController() {
  if (!_autonomyController) {
    try {
      const { AutonomyController } = require(path.join(__dirname, 'autonomy-controller'));
      _autonomyController = new AutonomyController();
      _autonomyController.initialize();
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS] AutonomyController unavailable: ${err.message}`);
    }
  }
  return _autonomyController;
}

function getDelegationBridge() {
  if (!_delegationBridge) {
    try {
      const { DelegationBridge } = require(path.join(__dirname, 'delegation-bridge'));
      _delegationBridge = new DelegationBridge();
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS] DelegationBridge unavailable: ${err.message}`);
    }
  }
  return _delegationBridge;
}

function getSessionManager(projectRoot) {
  if (!_sessionManager) {
    try {
      const { JarvisSessionManager } = require(path.join(__dirname, 'session-manager'));
      _sessionManager = new JarvisSessionManager({ projectRoot });
      _sessionManager.load();
      _sessionManager.enrichProjectContext();
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS] SessionManager unavailable: ${err.message}`);
    }
  }
  return _sessionManager;
}

function getProgressReporter() {
  if (!_progressReporter) {
    try {
      const { ProgressReporter } = require(path.join(__dirname, 'progress-reporter'));
      _progressReporter = new ProgressReporter();
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS] ProgressReporter unavailable: ${err.message}`);
    }
  }
  return _progressReporter;
}

// ---------------------------------------------------------------------------
// Color helpers (use chalk@4 CJS if available, otherwise raw ANSI)
// ---------------------------------------------------------------------------

let chalk;
try {
  chalk = require('chalk');
} catch {
  // Minimal fallback using ANSI escape codes
  chalk = {
    yellow: (s) => `\x1b[33m${s}\x1b[0m`,
    gold: (s) => `\x1b[33m${s}\x1b[0m`, // alias
    cyan: (s) => `\x1b[36m${s}\x1b[0m`,
    gray: (s) => `\x1b[90m${s}\x1b[0m`,
    green: (s) => `\x1b[32m${s}\x1b[0m`,
    red: (s) => `\x1b[31m${s}\x1b[0m`,
    bold: (s) => `\x1b[1m${s}\x1b[0m`,
    dim: (s) => `\x1b[2m${s}\x1b[0m`,
  };
  chalk.yellow.bold = (s) => `\x1b[1;33m${s}\x1b[0m`;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FAREWELL_MESSAGE = 'Signing off, sir. Until next time.';
const PROMPT_STRING = 'JARVIS > ';

// Time-of-day brackets for greeting
const TIME_BRACKETS = [
  { start: 0, end: 4, label: 'midnight' },
  { start: 5, end: 11, label: 'morning' },
  { start: 12, end: 17, label: 'afternoon' },
  { start: 18, end: 23, label: 'evening' },
];

// ---------------------------------------------------------------------------
// Config Loading
// ---------------------------------------------------------------------------

/**
 * Load JARVIS config from core-config.yaml.
 * Returns the `jarvis` key or sensible defaults.
 *
 * @param {string} projectRoot - Absolute path to project root
 * @returns {object} Resolved JARVIS config
 */
function loadJarvisConfig(projectRoot) {
  const defaults = {
    enabled: true,
    autonomy: 'supervised',
    personality: true,
    version: '1.0.0',
    greeting: {
      enabled: true,
      address: 'sir',
    },
  };

  try {
    const yaml = require('js-yaml');
    const configPath = path.join(projectRoot, '.aios-core', 'core-config.yaml');
    if (!fs.existsSync(configPath)) return defaults;

    const raw = fs.readFileSync(configPath, 'utf8');
    const parsed = yaml.load(raw);
    if (parsed && parsed.jarvis) {
      return { ...defaults, ...parsed.jarvis, greeting: { ...defaults.greeting, ...(parsed.jarvis.greeting || {}) } };
    }
  } catch {
    // Graceful fallback on any config error
  }

  return defaults;
}

// ---------------------------------------------------------------------------
// Time-of-day detection
// ---------------------------------------------------------------------------

/**
 * Return the time-of-day label based on the current hour.
 *
 * @param {number} [hour] - Override hour for testing (0-23)
 * @returns {string} One of: morning, afternoon, evening, midnight
 */
function getTimeOfDay(hour) {
  const h = typeof hour === 'number' ? hour : new Date().getHours();
  const bracket = TIME_BRACKETS.find((b) => h >= b.start && h <= b.end);
  return bracket ? bracket.label : 'evening';
}

// ---------------------------------------------------------------------------
// Project Context Detection
// ---------------------------------------------------------------------------

/**
 * Detect project context: git branch, active stories, last commit.
 * All detections are best-effort -- failures are silently skipped.
 *
 * @param {string} projectRoot - Absolute path to project root
 * @returns {object} Context object with branch, stories, lastCommit
 */
function detectProjectContext(projectRoot) {
  const context = {
    branch: null,
    activeStories: 0,
    lastCommit: null,
    isGitRepo: false,
  };

  // Git branch
  try {
    context.branch = execSync('git branch --show-current', {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    context.isGitRepo = true;
  } catch {
    // Not a git repo or git not available
  }

  // Last commit
  if (context.isGitRepo) {
    try {
      context.lastCommit = execSync('git log --oneline -1', {
        cwd: projectRoot,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim();
    } catch {
      // Empty repo or error
    }
  }

  // Active stories
  try {
    const storiesDir = path.join(projectRoot, 'docs', 'stories');
    if (fs.existsSync(storiesDir)) {
      const countStories = (dir) => {
        let count = 0;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            count += countStories(fullPath);
          } else if (entry.name.endsWith('.story.md') || entry.name.endsWith('.md')) {
            try {
              const content = fs.readFileSync(fullPath, 'utf8');
              // Count files whose status is NOT "Done" or "Completed"
              const statusMatch = content.match(/^## Status\s*\n+\s*(.+)/m);
              if (statusMatch) {
                const status = statusMatch[1].trim().toLowerCase();
                if (status !== 'done' && status !== 'completed') {
                  count++;
                }
              }
            } catch {
              // Skip unreadable files
            }
          }
        }
        return count;
      };
      context.activeStories = countStories(storiesDir);
    }
  } catch {
    // Stories dir not accessible
  }

  return context;
}

// ---------------------------------------------------------------------------
// Greeting
// ---------------------------------------------------------------------------

/**
 * Build the JARVIS startup greeting string.
 *
 * @param {object} config - JARVIS config from loadJarvisConfig
 * @param {object} context - Project context from detectProjectContext
 * @param {number} [hourOverride] - Override hour for testing
 * @returns {string} Formatted greeting string
 */
function buildGreeting(config, context, hourOverride) {
  if (!config.greeting || !config.greeting.enabled) {
    return '';
  }

  const timeLabel = getTimeOfDay(hourOverride);
  const address = config.greeting.address || 'sir';
  const lines = [];

  // Signature greeting
  lines.push('');
  lines.push(chalk.yellow.bold ? chalk.yellow.bold(`  Good ${timeLabel}, ${address}. JARVIS at your service.`) : `  Good ${timeLabel}, ${address}. JARVIS at your service.`);
  lines.push('');

  // Context summary
  if (context.branch) {
    lines.push(chalk.dim(`  Branch: ${context.branch}`));
  }
  if (context.activeStories > 0) {
    lines.push(chalk.dim(`  Active stories: ${context.activeStories}`));
  }
  if (context.lastCommit) {
    lines.push(chalk.dim(`  Last commit: ${context.lastCommit}`));
  }
  if (!context.isGitRepo) {
    lines.push(chalk.dim('  No git repository detected'));
  }

  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Command Processing Pipeline
// ---------------------------------------------------------------------------

/**
 * Process a user command through the full JARVIS pipeline:
 * IntentEngine → MissionPlanner → AutonomyController → DelegationBridge
 *
 * For built-in commands (help, status, mode), handles directly.
 * For natural language requests, runs the classification → planning → execution pipeline.
 *
 * @param {string} input - User input string
 * @param {object} [context] - Runtime context (projectRoot, sessionManager, etc.)
 * @returns {Promise<string>} Response string
 */
async function processCommand(input, context = {}) {
  const trimmed = input.trim();

  if (!trimmed) {
    return '';
  }

  const lower = trimmed.toLowerCase();

  // ----- Built-in commands (no pipeline needed) -----

  if (lower === 'help') {
    return [
      '',
      '  Available commands:',
      '    help             - Show this help message',
      '    status           - Show project context & active missions',
      '    mode             - Show current autonomy mode',
      '    mode <level>     - Change mode (supervised/assisted/autonomous)',
      '    exit / quit      - Exit JARVIS',
      '',
      '  Natural language commands:',
      '    "implement story 3.2"          - Develop a story',
      '    "create next story from epic 2"- Draft a new story',
      '    "review story 3.2"             - Run QA review',
      '    "push the changes"             - Push via @devops',
      '    "status"                        - Project status',
      '',
    ].join('\n');
  }

  if (lower === 'status') {
    return _handleStatusCommand(context);
  }

  if (lower === 'mode' || lower.startsWith('mode ')) {
    return _handleModeCommand(trimmed, context);
  }

  // ----- Full pipeline: Intent → Plan → Autonomy → Delegate -----

  const reporter = getProgressReporter();
  const intentEngine = getIntentEngine();

  if (!intentEngine) {
    return `  I understand your request: "${trimmed}"\n  IntentEngine not available. Modules may still be loading.`;
  }

  // Step 1: Classify intent
  if (reporter) reporter.update('classifying', 'Analyzing your request...');
  const sessionCtx = _getSessionContext(context);
  let structured;
  try {
    structured = await intentEngine.classify(trimmed, sessionCtx);
  } catch (err) {
    return `  I understand your request: "${trimmed}"\n  Classification error: ${err.message}`;
  }

  // Step 2: Handle ambiguous/unknown intents
  if (structured.intent === 'unknown' || structured.ambiguous) {
    const suggestions = structured.disambiguation || [];
    const lines = [
      '',
      `  I couldn't determine a clear intent for: "${trimmed}"`,
    ];
    if (suggestions.length > 0) {
      lines.push('');
      lines.push('  Did you mean:');
      for (const s of suggestions) {
        lines.push(`    ${s}`);
      }
    }
    lines.push('');
    return lines.join('\n');
  }

  // Step 3: Plan execution
  if (reporter) reporter.update('planning', `Planning: ${structured.intent}...`);
  const planner = getMissionPlanner();
  if (!planner) {
    return `  Intent classified as "${structured.intent}" but MissionPlanner is unavailable.`;
  }

  const plan = planner.plan(structured);

  // Step 4: Check autonomy
  const autonomy = getAutonomyController();
  const level = autonomy ? autonomy.getLevel() : 'supervised';

  // Step 5: Present plan to user
  const planSummary = _formatPlanSummary(plan, level);

  if (level === 'supervised') {
    // In supervised mode, present plan and wait for confirmation
    return planSummary + '\n  [Supervised mode] Approve and execute via agent activation.';
  }

  // In assisted/autonomous mode, check auto-execution
  if (autonomy && plan.steps.length > 0) {
    const firstStep = plan.steps[0];
    const shouldAuto = autonomy.shouldAutoExecute(
      { agent: firstStep.agent, command: firstStep.command },
      sessionCtx,
    );

    if (shouldAuto) {
      // Auto-execute via delegation bridge
      if (reporter) reporter.update('delegating', `Delegating to ${firstStep.agent}...`);
      const bridge = getDelegationBridge();
      if (bridge) {
        try {
          const result = await bridge.delegate(firstStep, {
            missionId: plan.id,
            sessionContext: sessionCtx,
          });

          // Track mission in session
          const session = getSessionManager(context.projectRoot);
          if (session) {
            session.addMission({
              missionId: plan.id,
              description: plan.description,
              status: result.status === 'success' ? 'completed' : 'in_progress',
            });
            session.save();
          }

          if (reporter) reporter.complete(result.status === 'success' ? 'success' : 'failure');
          return _formatDelegationResult(result);
        } catch (err) {
          if (reporter) reporter.complete('failure');
          return `  Delegation failed: ${err.message}`;
        }
      }
    }
  }

  // Present plan for manual execution
  return planSummary;
}

/**
 * Handle the 'status' built-in command.
 * @private
 */
function _handleStatusCommand(context) {
  const session = getSessionManager(context.projectRoot);
  const lines = ['', '  Project Status:'];

  if (session && session.state) {
    const ctx = session.getContext();
    if (ctx.projectContext.currentBranch) {
      lines.push(`    Branch: ${ctx.projectContext.currentBranch}`);
    }
    if (ctx.projectContext.lastCommit) {
      lines.push(`    Last commit: ${ctx.projectContext.lastCommit}`);
    }
    lines.push(`    Autonomy mode: ${ctx.autonomyLevel}`);
    if (ctx.activeMissions.length > 0) {
      lines.push(`    Active missions: ${ctx.activeMissions.length}`);
      for (const m of ctx.activeMissions) {
        lines.push(`      - ${m.description} (${m.status})`);
      }
    }
    lines.push(`    Completed missions: ${ctx.completedMissionsCount}`);
  } else {
    // Fallback to basic git detection
    try {
      const branch = execSync('git branch --show-current', {
        encoding: 'utf8', timeout: 3000,
      }).trim();
      lines.push(`    Branch: ${branch}`);
    } catch { /* ignore */ }
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Handle the 'mode' command.
 * @private
 */
function _handleModeCommand(input, context) {
  const autonomy = getAutonomyController();
  if (!autonomy) {
    return '  AutonomyController not available.';
  }

  const parts = input.trim().split(/\s+/);
  if (parts.length === 1) {
    // Show current mode
    return `  Current autonomy mode: ${autonomy.getLevel()}`;
  }

  const newLevel = parts[1].toLowerCase();
  const success = autonomy.setLevel(newLevel);
  if (success) {
    return `  Autonomy mode changed to: ${newLevel}`;
  }
  return `  Invalid mode: "${parts[1]}". Valid: supervised, assisted, autonomous`;
}

/**
 * Get session context for intent classification.
 * @private
 */
function _getSessionContext(context) {
  const session = getSessionManager(context.projectRoot);
  if (session && session.state) {
    return session.getContext();
  }
  return {};
}

/**
 * Format an execution plan as a readable summary.
 * @private
 */
function _formatPlanSummary(plan, level) {
  const lines = [
    '',
    `  Mission: ${plan.description}`,
    `  Steps: ${plan.steps.length} | Duration: ~${plan.estimatedTotalDuration} | Mode: ${level}`,
  ];

  for (const step of plan.steps) {
    const parallel = step.parallel ? ' [parallel]' : '';
    lines.push(`    ${step.id}: ${step.agent} → ${step.command || step.task}${parallel}`);
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Format a delegation result as a readable message.
 * @private
 */
function _formatDelegationResult(result) {
  const status = result.status === 'success' ? 'completed' : result.status;
  const lines = [
    '',
    `  Delegation ${status}: @${result.agentId}`,
    `  Duration: ${result.duration}ms | Retries: ${result.retries}`,
  ];

  if (result.artifacts && result.artifacts.length > 0) {
    lines.push(`  Artifacts: ${result.artifacts.join(', ')}`);
  }
  if (result.error) {
    lines.push(`  Error: ${result.error}`);
  }

  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// REPL (Interactive Mode)
// ---------------------------------------------------------------------------

/**
 * Start the interactive REPL loop.
 *
 * @param {object} config - JARVIS config
 * @param {object} context - Project context
 * @param {string} projectRoot - Project root path
 * @returns {Promise<void>}
 */
function startRepl(config, context, projectRoot) {
  return new Promise((resolve) => {
    // Initialize session manager
    const session = getSessionManager(projectRoot);

    // Check for resume flow
    if (session) {
      const resumeInfo = session.getResumeInfo();
      if (resumeInfo.hasInProgress) {
        process.stdout.write(`\n${chalk.cyan(`  ${resumeInfo.message}`)}\n\n`);
      }
    }

    const greeting = buildGreeting(config, context);
    if (greeting) {
      process.stdout.write(greeting);
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.yellow ? chalk.yellow(PROMPT_STRING) : PROMPT_STRING,
    });

    rl.prompt();

    rl.on('line', async (line) => {
      const input = line.trim();

      // Exit command
      if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
        // Save session before exit
        if (session) {
          try { session.save(); } catch { /* ignore */ }
        }
        console.log(`\n  ${FAREWELL_MESSAGE}\n`);
        rl.close();
        return;
      }

      // Process command (async)
      try {
        const response = await processCommand(input, { projectRoot });
        if (response) {
          console.log(response);
        }
      } catch (err) {
        console.log(`  Error: ${err.message}`);
      }

      rl.prompt();
    });

    rl.on('close', () => {
      // Final session save
      if (session) {
        try { session.save(); } catch { /* ignore */ }
      }
      resolve();
    });

    // Handle SIGINT (Ctrl+C)
    rl.on('SIGINT', () => {
      if (session) {
        try { session.save(); } catch { /* ignore */ }
      }
      console.log(`\n\n  ${FAREWELL_MESSAGE}\n`);
      rl.close();
    });
  });
}

// ---------------------------------------------------------------------------
// One-Shot Mode
// ---------------------------------------------------------------------------

/**
 * Execute a single command and exit.
 *
 * @param {string} command - The command string to execute
 * @param {object} config - JARVIS config
 * @param {object} context - Project context
 * @param {string} projectRoot - Project root path
 * @returns {Promise<void>}
 */
async function executeOneShot(command, _config, _context, projectRoot) {
  const response = await processCommand(command, { projectRoot });
  if (response) {
    console.log(response);
  }
}

// ---------------------------------------------------------------------------
// Main Bootstrap
// ---------------------------------------------------------------------------

/**
 * Main bootstrap function.
 * Parses argv, loads config, detects context, and routes to the appropriate mode.
 *
 * @param {object} [options] - Override options for testing
 * @param {string} [options.projectRoot] - Override project root
 * @param {string[]} [options.argv] - Override process.argv
 * @returns {Promise<void>}
 */
async function bootstrap(options = {}) {
  const projectRoot = options.projectRoot || path.resolve(__dirname, '..', '..', '..');
  const argv = options.argv || process.argv.slice(2);

  // --version / -v flag
  if (argv.includes('--version') || argv.includes('-v')) {
    try {
      const pkgPath = path.join(projectRoot, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      console.log(`JARVIS v${pkg.version}`);
    } catch {
      console.log('JARVIS v0.0.0 (version unavailable)');
    }
    return;
  }

  // Load config
  const config = loadJarvisConfig(projectRoot);

  // Check if JARVIS is enabled
  if (!config.enabled) {
    console.log('JARVIS is disabled in core-config.yaml. Enable it with jarvis.enabled: true');
    return;
  }

  // Detect project context
  const context = detectProjectContext(projectRoot);

  // Determine mode: one-shot vs interactive
  const nonFlagArgs = argv.filter((a) => !a.startsWith('-'));

  if (nonFlagArgs.length > 0) {
    // One-shot mode: execute the command string and exit
    const command = nonFlagArgs.join(' ');
    await executeOneShot(command, config, context, projectRoot);
  } else {
    // Interactive REPL mode
    await startRepl(config, context, projectRoot);
  }
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = {
  bootstrap,
  loadJarvisConfig,
  getTimeOfDay,
  detectProjectContext,
  buildGreeting,
  processCommand,
  startRepl,
  executeOneShot,
  FAREWELL_MESSAGE,
  PROMPT_STRING,
  TIME_BRACKETS,
};
