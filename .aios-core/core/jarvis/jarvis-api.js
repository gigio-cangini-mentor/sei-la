/**
 * JARVIS Core API
 *
 * Programmatic API layer that exposes the JARVIS CLI engine pipeline
 * for consumption by the Voice Hub (server.js) and other integrations.
 *
 * Architecture:
 *   Voice Hub / REST → jarvis-api → IntentEngine → MissionPlanner
 *                                  → AutonomyController → DelegationBridge
 *                                  → SessionManager → ProgressReporter
 *
 * This module manages per-session state (one session per browser connection)
 * and provides a clean interface without requiring REPL or readline.
 *
 * @module jarvis-api
 * @wave 2.1
 */

'use strict';

const path = require('path');

// ---------------------------------------------------------------------------
// Lazy-loaded JARVIS Core Modules (same pattern as jarvis-bootstrap.js)
// ---------------------------------------------------------------------------

let _intentEngine = null;
let _missionPlanner = null;
let _autonomyController = null;
let _delegationBridge = null;
let _progressReporter = null;

const JARVIS_DIR = __dirname;

function getIntentEngine() {
  if (!_intentEngine) {
    try {
      const { IntentEngine } = require(path.join(JARVIS_DIR, 'intent-engine'));
      _intentEngine = new IntentEngine();
      _intentEngine.loadPatterns();
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS-API] IntentEngine unavailable: ${err.message}`);
    }
  }
  return _intentEngine;
}

function getMissionPlanner() {
  if (!_missionPlanner) {
    try {
      const { MissionPlanner } = require(path.join(JARVIS_DIR, 'mission-planner'));
      _missionPlanner = new MissionPlanner();
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS-API] MissionPlanner unavailable: ${err.message}`);
    }
  }
  return _missionPlanner;
}

function getAutonomyController() {
  if (!_autonomyController) {
    try {
      const { AutonomyController } = require(path.join(JARVIS_DIR, 'autonomy-controller'));
      _autonomyController = new AutonomyController();
      _autonomyController.initialize();
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS-API] AutonomyController unavailable: ${err.message}`);
    }
  }
  return _autonomyController;
}

function getDelegationBridge() {
  if (!_delegationBridge) {
    try {
      const { DelegationBridge } = require(path.join(JARVIS_DIR, 'delegation-bridge'));
      _delegationBridge = new DelegationBridge();
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS-API] DelegationBridge unavailable: ${err.message}`);
    }
  }
  return _delegationBridge;
}

function getProgressReporter(wsServer) {
  if (!_progressReporter) {
    try {
      const { ProgressReporter } = require(path.join(JARVIS_DIR, 'progress-reporter'));
      _progressReporter = new ProgressReporter({ terminal: false, silent: true });
    } catch (err) {
      if (process.env.AIOS_DEBUG) console.warn(`[JARVIS-API] ProgressReporter unavailable: ${err.message}`);
    }
  }
  if (_progressReporter && wsServer) {
    _progressReporter.setWebSocketServer(wsServer);
  }
  return _progressReporter;
}

// ---------------------------------------------------------------------------
// Session Store (in-memory, per browser connection)
// ---------------------------------------------------------------------------

const sessions = new Map();

/**
 * @typedef {object} JarvisSession
 * @property {string} id - Session identifier
 * @property {number} created - Timestamp
 * @property {number} lastActive - Timestamp
 * @property {Array<object>} missions - Mission history
 * @property {string} autonomyLevel - Current autonomy level
 * @property {object|null} activeMission - Currently running mission
 */

/**
 * Get or create a session for a given session ID.
 * @param {string} sessionId
 * @returns {JarvisSession}
 */
function getSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      id: sessionId,
      created: Date.now(),
      lastActive: Date.now(),
      missions: [],
      autonomyLevel: 'supervised',
      activeMission: null,
    });
  }
  const session = sessions.get(sessionId);
  session.lastActive = Date.now();
  return session;
}

/**
 * Remove a session.
 * @param {string} sessionId
 */
function removeSession(sessionId) {
  sessions.delete(sessionId);
}

/**
 * Clean up stale sessions (older than 1 hour).
 */
function cleanupSessions() {
  const now = Date.now();
  const maxAge = 60 * 60 * 1000; // 1 hour
  for (const [id, session] of sessions) {
    if (now - session.lastActive > maxAge) {
      sessions.delete(id);
    }
  }
}

// Cleanup every 15 minutes
const _cleanupInterval = setInterval(cleanupSessions, 15 * 60 * 1000);
// Don't prevent process exit
if (_cleanupInterval.unref) _cleanupInterval.unref();

// ---------------------------------------------------------------------------
// Core API Functions
// ---------------------------------------------------------------------------

/**
 * Process a text command through the full JARVIS pipeline.
 *
 * Pipeline: IntentEngine.classify() → MissionPlanner.plan()
 *           → AutonomyController.shouldAutoExecute()
 *           → DelegationBridge.delegate()
 *
 * @param {string} text - User command text
 * @param {string} sessionId - Session identifier
 * @param {object} [options]
 * @param {string} [options.projectRoot] - Project root path
 * @param {object} [options.wsServer] - WebSocket server for progress
 * @returns {Promise<object>} Result object with type, data, and message
 */
async function processTextCommand(text, sessionId, options = {}) {
  const trimmed = (text || '').trim();
  if (!trimmed) {
    return { type: 'empty', message: '' };
  }

  const session = getSession(sessionId);
  const reporter = getProgressReporter(options.wsServer);

  // Step 1: Classify intent
  const intentEngine = getIntentEngine();
  if (!intentEngine) {
    return {
      type: 'fallback',
      message: `I understand your request: "${trimmed}" — IntentEngine not available.`,
      raw: trimmed,
    };
  }

  if (reporter) reporter.update('classifying', 'Analyzing request...');

  let structured;
  try {
    structured = await intentEngine.classify(trimmed, {
      autonomyLevel: session.autonomyLevel,
      activeMissions: session.missions.filter((m) => m.status === 'in_progress'),
    });
  } catch (err) {
    return {
      type: 'error',
      message: `Classification error: ${err.message}`,
      raw: trimmed,
    };
  }

  // Step 2: Handle unknown/ambiguous
  if (structured.intent === 'unknown' || structured.ambiguous) {
    return {
      type: 'unknown',
      message: `Could not determine intent for: "${trimmed}"`,
      intent: structured.intent,
      disambiguation: structured.disambiguation || [],
      confidence: structured.confidence,
      raw: trimmed,
    };
  }

  // Step 3: Plan
  if (reporter) reporter.update('planning', `Planning: ${structured.intent}...`);
  const planner = getMissionPlanner();
  if (!planner) {
    return {
      type: 'classified',
      message: `Intent: "${structured.intent}" — MissionPlanner unavailable.`,
      intent: structured.intent,
      confidence: structured.confidence,
      entities: structured.entities,
      raw: trimmed,
    };
  }

  const plan = planner.plan(structured);

  // Step 4: Autonomy check
  const autonomy = getAutonomyController();
  const level = session.autonomyLevel || (autonomy ? autonomy.getLevel() : 'supervised');

  // Step 5: Build response based on autonomy level
  const planSummary = {
    type: 'plan',
    intent: structured.intent,
    confidence: structured.confidence,
    entities: structured.entities,
    plan: {
      id: plan.id,
      description: plan.description,
      steps: plan.steps.map((s) => ({
        id: s.id,
        agent: s.agent,
        command: s.command || s.task,
        parallel: s.parallel || false,
      })),
      estimatedDuration: plan.estimatedTotalDuration,
    },
    autonomyLevel: level,
    raw: trimmed,
  };

  // In supervised mode, return plan for human approval
  if (level === 'supervised') {
    planSummary.message = `Plan ready (${plan.steps.length} steps). Awaiting approval.`;
    planSummary.requiresApproval = true;
    return planSummary;
  }

  // In assisted/autonomous mode, attempt auto-execution
  if (autonomy && plan.steps.length > 0) {
    const firstStep = plan.steps[0];
    const shouldAuto = autonomy.shouldAutoExecute(
      { agent: firstStep.agent, command: firstStep.command },
      { autonomyLevel: level },
    );

    if (shouldAuto) {
      if (reporter) {
        reporter.startMission(plan.id, plan.steps.length, plan.description);
        reporter.stepStart(firstStep.id, firstStep.agent);
      }

      const bridge = getDelegationBridge();
      if (bridge) {
        try {
          const result = await bridge.delegate(firstStep, {
            missionId: plan.id,
            sessionContext: { autonomyLevel: level },
          });

          // Track in session
          const mission = {
            missionId: plan.id,
            description: plan.description,
            status: result.status === 'success' ? 'completed' : 'in_progress',
            timestamp: Date.now(),
          };
          session.missions.push(mission);
          if (session.missions.length > 30) session.missions.shift();

          if (reporter) {
            reporter.stepComplete(firstStep.id, result.status);
            reporter.complete(result.status);
          }

          return {
            type: 'executed',
            intent: structured.intent,
            plan: planSummary.plan,
            result: {
              status: result.status,
              agentId: result.agentId,
              duration: result.duration,
              artifacts: result.artifacts,
            },
            message: `Executed via @${result.agentId}: ${result.status}`,
            raw: trimmed,
          };
        } catch (err) {
          if (reporter) reporter.complete('failure', err.message);
          return {
            type: 'error',
            message: `Delegation failed: ${err.message}`,
            intent: structured.intent,
            raw: trimmed,
          };
        }
      }
    }
  }

  // Auto-execution not approved — return plan
  planSummary.message = `Plan ready but auto-execution not approved for this action.`;
  planSummary.requiresApproval = true;
  return planSummary;
}

/**
 * Get the current session state for a given session.
 *
 * @param {string} sessionId
 * @returns {object} Session state summary
 */
function getSessionState(sessionId) {
  const session = getSession(sessionId);
  return {
    id: session.id,
    created: session.created,
    lastActive: session.lastActive,
    autonomyLevel: session.autonomyLevel,
    missionCount: session.missions.length,
    activeMissions: session.missions.filter((m) => m.status === 'in_progress'),
    recentMissions: session.missions.slice(-5),
  };
}

/**
 * Get available AIOS agents.
 *
 * @returns {Array<object>} Agent list
 */
function getAvailableAgents() {
  return [
    { id: 'dev', name: 'Dex', scope: 'Implementation' },
    { id: 'qa', name: 'Quinn', scope: 'Testing & Quality' },
    { id: 'architect', name: 'Aria', scope: 'Architecture & Design' },
    { id: 'pm', name: 'Morgan', scope: 'Product Management' },
    { id: 'po', name: 'Pax', scope: 'Product Owner' },
    { id: 'sm', name: 'River', scope: 'Scrum Master' },
    { id: 'analyst', name: 'Alex', scope: 'Research & Analysis' },
    { id: 'data-engineer', name: 'Dara', scope: 'Database Design' },
    { id: 'ux-design-expert', name: 'Uma', scope: 'UX/UI Design' },
    { id: 'devops', name: 'Gage', scope: 'CI/CD & Git Push' },
  ];
}

/**
 * Change the autonomy mode for a session.
 *
 * @param {string} sessionId
 * @param {string} level - supervised | assisted | autonomous
 * @returns {object} Result with success flag and current level
 */
function changeAutonomyMode(sessionId, level) {
  const validLevels = ['supervised', 'assisted', 'autonomous'];
  if (!validLevels.includes(level)) {
    return { success: false, error: `Invalid level: "${level}". Valid: ${validLevels.join(', ')}`, level: null };
  }

  const session = getSession(sessionId);
  session.autonomyLevel = level;

  // Also update the global autonomy controller if available
  const autonomy = getAutonomyController();
  if (autonomy) {
    autonomy.setLevel(level);
  }

  return { success: true, level };
}

/**
 * Check if JARVIS Core modules are available.
 *
 * @returns {object} Module availability status
 */
function getModuleStatus() {
  return {
    intentEngine: !!getIntentEngine(),
    missionPlanner: !!getMissionPlanner(),
    autonomyController: !!getAutonomyController(),
    delegationBridge: !!getDelegationBridge(),
    progressReporter: !!getProgressReporter(),
    sessionCount: sessions.size,
  };
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = {
  processTextCommand,
  getSessionState,
  getAvailableAgents,
  changeAutonomyMode,
  getModuleStatus,
  getSession,
  removeSession,
  cleanupSessions,

  // For testing
  _sessions: sessions,
  _getIntentEngine: getIntentEngine,
  _getMissionPlanner: getMissionPlanner,
  _getAutonomyController: getAutonomyController,
  _getDelegationBridge: getDelegationBridge,
  _getProgressReporter: getProgressReporter,
};
