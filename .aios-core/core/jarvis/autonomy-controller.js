#!/usr/bin/env node

/**
 * JARVIS Autonomy Controller
 *
 * Manages the three autonomy levels for JARVIS orchestration:
 *   - supervised: present plan and wait for approval on EACH step
 *   - assisted: auto-execute known-safe patterns, surface novel decisions
 *   - autonomous: execute everything, surface only when genuinely blocked
 *
 * The controller integrates with the existing SurfaceChecker to determine
 * when human input is required, extending its criteria with JARVIS-specific
 * rules from jarvis-surface-criteria.yaml.
 *
 * State machine: level is mutable at runtime via setLevel().
 * Persistence: level is saved to .aios/jarvis/session.json across sessions.
 * Config: initial level loaded from core-config.yaml (jarvis.autonomy).
 *
 * @module autonomy-controller
 * @story 1.5
 * @architecture docs/stories/jarvis/ARCHITECTURE-JARVIS.md#4.4
 */

'use strict';

const path = require('path');
const fs = require('fs');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Valid autonomy levels */
const LEVELS = {
  SUPERVISED: 'supervised',
  ASSISTED: 'assisted',
  AUTONOMOUS: 'autonomous',
};

/** All valid level values */
const VALID_LEVELS = [LEVELS.SUPERVISED, LEVELS.ASSISTED, LEVELS.AUTONOMOUS];

/** Default level -- safest default, never autonomous by default */
const DEFAULT_LEVEL = LEVELS.SUPERVISED;

/** Session persistence directory (relative to project root) */
const DEFAULT_SESSION_DIR = path.join(process.cwd(), '.aios', 'jarvis');

/** Session file name */
const SESSION_FILENAME = 'session.json';

// ---------------------------------------------------------------------------
// Event types emitted by the controller
// ---------------------------------------------------------------------------

const EVENTS = {
  NEEDS_APPROVAL: 'needs_approval',
  AUTO_EXECUTING: 'auto_executing',
  SURFACING: 'surfacing',
  LEVEL_CHANGED: 'level_changed',
};

// ---------------------------------------------------------------------------
// AutonomyController class
// ---------------------------------------------------------------------------

class AutonomyController {
  /**
   * @param {object} [options]
   * @param {string} [options.configPath] - Override path to core-config.yaml
   * @param {string} [options.sessionDir] - Override session persistence directory
   * @param {string} [options.rulesPath] - Override path to autonomy-rules.yaml
   * @param {string} [options.jarvisCriteriaPath] - Override path to jarvis-surface-criteria.yaml
   * @param {string} [options.bobCriteriaPath] - Override path to bob-surface-criteria.yaml
   * @param {object} [options.surfaceChecker] - Injected SurfaceChecker instance (for testing)
   * @param {Function} [options.eventHandler] - Callback for events: (eventType, payload) => void
   */
  constructor(options = {}) {
    this._configPath = options.configPath ||
      path.join(__dirname, '..', '..', 'core-config.yaml');
    this._sessionDir = options.sessionDir || DEFAULT_SESSION_DIR;
    this._rulesPath = options.rulesPath ||
      path.join(__dirname, 'config', 'autonomy-rules.yaml');
    this._jarvisCriteriaPath = options.jarvisCriteriaPath ||
      path.join(__dirname, 'config', 'jarvis-surface-criteria.yaml');
    this._bobCriteriaPath = options.bobCriteriaPath ||
      path.join(__dirname, '..', 'orchestration', 'bob-surface-criteria.yaml');

    this._surfaceChecker = options.surfaceChecker || null;
    this._eventHandler = options.eventHandler || null;

    this._level = DEFAULT_LEVEL;
    this._safePatterns = [];
    this._novelTriggers = [];
    this._confidenceThresholds = {};
    this._jarvisCriteria = null;
    this._bobCriteria = null;
    this._loaded = false;
  }

  // -------------------------------------------------------------------------
  // Initialization
  // -------------------------------------------------------------------------

  /**
   * Initialize the controller: load config, session, rules, and criteria.
   * Called automatically on first use if not called explicitly.
   */
  initialize() {
    if (this._loaded) return;

    // 1. Load initial level from core-config.yaml
    const configLevel = this._loadConfigLevel();

    // 2. Load persisted session level (overrides config if present)
    const sessionLevel = this._loadSessionLevel();

    // 3. Determine effective level: session > config > default
    if (sessionLevel && VALID_LEVELS.includes(sessionLevel)) {
      this._level = sessionLevel;
    } else if (configLevel && VALID_LEVELS.includes(configLevel)) {
      this._level = configLevel;
    } else {
      this._level = DEFAULT_LEVEL;
      if (configLevel && !VALID_LEVELS.includes(configLevel)) {
        this._warn(
          `Invalid autonomy level "${configLevel}" in core-config.yaml. ` +
          `Falling back to "${DEFAULT_LEVEL}".`,
        );
      }
    }

    // 4. Load autonomy rules (safe patterns + novel triggers)
    this._loadRules();

    // 5. Load JARVIS surface criteria
    this._loadJarvisCriteria();

    // 6. Load Bob surface criteria
    this._loadBobCriteria();

    this._loaded = true;
  }

  /**
   * Ensure the controller is initialized.
   * @private
   */
  _ensureInitialized() {
    if (!this._loaded) {
      this.initialize();
    }
  }

  // -------------------------------------------------------------------------
  // Level Management (AC: 1, 2, 6, 8)
  // -------------------------------------------------------------------------

  /**
   * Get the current autonomy level.
   * @returns {string} Current level: 'supervised', 'assisted', or 'autonomous'
   */
  getLevel() {
    this._ensureInitialized();
    return this._level;
  }

  /**
   * Set the autonomy level. Validates input and persists immediately.
   *
   * @param {string} level - New level: 'supervised', 'assisted', or 'autonomous'
   * @returns {boolean} true if level was changed, false if invalid
   */
  setLevel(level) {
    this._ensureInitialized();

    if (!level || typeof level !== 'string') {
      this._warn(`Invalid level: ${level}. Must be one of: ${VALID_LEVELS.join(', ')}`);
      return false;
    }

    const normalized = level.toLowerCase().trim();

    if (!VALID_LEVELS.includes(normalized)) {
      this._warn(`Invalid level: "${level}". Must be one of: ${VALID_LEVELS.join(', ')}`);
      return false;
    }

    const oldLevel = this._level;
    this._level = normalized;

    // Persist immediately
    this._persistLevel(normalized);

    // Emit event
    if (oldLevel !== normalized) {
      this._emit(EVENTS.LEVEL_CHANGED, {
        oldLevel,
        newLevel: normalized,
      });
    }

    return true;
  }

  // -------------------------------------------------------------------------
  // Decision Methods (AC: 3, 4, 5)
  // -------------------------------------------------------------------------

  /**
   * Determine if an action should be auto-executed (proceed without approval).
   *
   * - supervised: ALWAYS returns false (wait for approval on every step)
   * - assisted: returns true only for known-safe patterns
   * - autonomous: returns true unless SurfaceChecker says to surface
   *
   * @param {object} action - The action to evaluate
   * @param {string} action.agent - Agent to activate (e.g., '@dev')
   * @param {string} action.command - Command to execute (e.g., '*develop')
   * @param {string} [action.type] - Action type for surface checking
   * @param {object} [context] - Execution context for surface checking
   * @returns {boolean} true if the action should be auto-executed
   */
  shouldAutoExecute(action, context) {
    this._ensureInitialized();

    if (!action) return false;

    switch (this._level) {
      case LEVELS.SUPERVISED:
        this._emit(EVENTS.NEEDS_APPROVAL, { action, context, reason: 'supervised mode' });
        return false;

      case LEVELS.ASSISTED:
        return this._evaluateAssisted(action, context);

      case LEVELS.AUTONOMOUS:
        return this._evaluateAutonomous(action, context);

      default:
        // Unknown level -- fall back to supervised
        return false;
    }
  }

  /**
   * Determine if a decision/event should surface to the user.
   * Mirrors shouldAutoExecute logic for mid-execution decisions.
   *
   * - supervised: ALWAYS surfaces
   * - assisted: surfaces for novel decisions, not for known-safe
   * - autonomous: surfaces only when SurfaceChecker criteria trigger
   *
   * @param {object} action - The decision to evaluate
   * @param {string} action.agent - Agent involved
   * @param {string} action.command - Command or decision type
   * @param {string} [action.type] - Action type for surface checking
   * @param {object} [context] - Execution context
   * @returns {boolean} true if the decision should be surfaced to the user
   */
  shouldSurface(action, context) {
    this._ensureInitialized();

    if (!action) return true;

    switch (this._level) {
      case LEVELS.SUPERVISED:
        return true;

      case LEVELS.ASSISTED:
        // Surface = NOT auto-executable (novel decision)
        return !this._evaluateAssisted(action, context);

      case LEVELS.AUTONOMOUS:
        // Surface only when SurfaceChecker says so
        return !this._evaluateAutonomous(action, context);

      default:
        return true;
    }
  }

  // -------------------------------------------------------------------------
  // Assisted Mode Evaluation (AC: 4)
  // -------------------------------------------------------------------------

  /**
   * Evaluate an action in assisted mode.
   * Returns true if the action matches a known-safe pattern.
   *
   * @private
   * @param {object} action
   * @param {object} [context]
   * @returns {boolean} true if safe to auto-execute
   */
  _evaluateAssisted(action, context) {
    // Check novel triggers first -- these ALWAYS require surfacing
    if (this._matchesNovelTrigger(action, context)) {
      this._emit(EVENTS.SURFACING, {
        action,
        context,
        reason: 'novel decision trigger in assisted mode',
      });
      return false;
    }

    // Check safe patterns
    if (this._matchesSafePattern(action, context)) {
      this._emit(EVENTS.AUTO_EXECUTING, {
        action,
        context,
        reason: 'known-safe pattern in assisted mode',
      });
      return true;
    }

    // Unknown pattern -- surface for approval
    this._emit(EVENTS.SURFACING, {
      action,
      context,
      reason: 'unknown pattern in assisted mode',
    });
    return false;
  }

  /**
   * Check if the action matches a known-safe pattern.
   *
   * @private
   * @param {object} action
   * @param {object} [context]
   * @returns {boolean}
   */
  _matchesSafePattern(action, context) {
    for (const pattern of this._safePatterns) {
      // Match agent
      if (pattern.agent && action.agent) {
        const normPatternAgent = pattern.agent.replace('@', '').toLowerCase();
        const normActionAgent = action.agent.replace('@', '').toLowerCase();
        if (normPatternAgent !== normActionAgent) continue;
      }

      // Match command
      if (pattern.command && action.command) {
        const normPatternCmd = pattern.command.replace('*', '').toLowerCase();
        const normActionCmd = action.command.replace('*', '').toLowerCase();
        if (!normActionCmd.includes(normPatternCmd)) continue;
      }

      // Match conditions against context
      if (pattern.condition && context) {
        if (!this._evaluateCondition(pattern.condition, context)) continue;
      }

      // All checks passed -- this is a safe pattern
      return true;
    }
    return false;
  }

  /**
   * Check if the action matches a novel trigger.
   *
   * @private
   * @param {object} action
   * @param {object} [context]
   * @returns {boolean}
   */
  _matchesNovelTrigger(action, context) {
    for (const trigger of this._novelTriggers) {
      // Agent-based trigger (e.g., any @architect delegation)
      if (trigger.pattern && action.agent) {
        const normAgent = action.agent.replace('@', '').toLowerCase();
        const normPattern = trigger.pattern.replace('@', '').toLowerCase();
        if (normAgent === normPattern) return true;
      }

      // Context-based trigger (e.g., qa_concerns, scope_drift)
      if (trigger.pattern && context) {
        if (trigger.pattern === 'qa_concerns' && context.qa_verdict === 'CONCERNS') {
          return true;
        }
        if (trigger.pattern === 'scope_drift' && context.scope_drift === true) {
          return true;
        }
        if (trigger.pattern === 'first_time' && context.first_time === true) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Evaluate a condition object against context.
   *
   * @private
   * @param {object} condition - Condition from rules YAML
   * @param {object} context - Execution context
   * @returns {boolean} true if all conditions are satisfied
   */
  _evaluateCondition(condition, context) {
    for (const [key, expected] of Object.entries(condition)) {
      const actual = context[key];

      if (typeof expected === 'boolean') {
        if (Boolean(actual) !== expected) return false;
      } else if (typeof expected === 'string') {
        if (String(actual).toLowerCase() !== expected.toLowerCase()) return false;
      } else if (typeof expected === 'number') {
        if (actual !== expected) return false;
      }
    }
    return true;
  }

  // -------------------------------------------------------------------------
  // Autonomous Mode Evaluation (AC: 5, 7)
  // -------------------------------------------------------------------------

  /**
   * Evaluate an action in autonomous mode.
   * Returns true (auto-execute) UNLESS SurfaceChecker triggers.
   *
   * @private
   * @param {object} action
   * @param {object} [context]
   * @returns {boolean} true if safe to auto-execute
   */
  _evaluateAutonomous(action, context) {
    const surfaceContext = this._buildSurfaceContext(action, context);

    // Check JARVIS-specific criteria
    const jarvisResult = this._checkJarvisCriteria(surfaceContext);
    if (jarvisResult.should_surface) {
      this._emit(EVENTS.SURFACING, {
        action,
        context,
        reason: `JARVIS criterion: ${jarvisResult.criterion_name || jarvisResult.criterion_id}`,
        criterion: jarvisResult,
      });
      return false;
    }

    // Check Bob criteria via SurfaceChecker
    const bobResult = this._checkBobCriteria(surfaceContext);
    if (bobResult.should_surface) {
      this._emit(EVENTS.SURFACING, {
        action,
        context,
        reason: `Bob criterion: ${bobResult.criterion_name || bobResult.criterion_id}`,
        criterion: bobResult,
      });
      return false;
    }

    // Nothing triggered -- auto-execute
    this._emit(EVENTS.AUTO_EXECUTING, {
      action,
      context,
      reason: 'autonomous mode, no surface criteria triggered',
    });
    return true;
  }

  /**
   * Build a surface context object from action and execution context.
   *
   * @private
   * @param {object} action
   * @param {object} [context]
   * @returns {object} Surface context for SurfaceChecker evaluation
   */
  _buildSurfaceContext(action, context) {
    return {
      action_type: action.type || action.command || '',
      action_description: action.description || '',
      ...(context || {}),
    };
  }

  /**
   * Check JARVIS-specific surface criteria.
   *
   * @private
   * @param {object} surfaceContext
   * @returns {object} SurfaceResult-like object
   */
  _checkJarvisCriteria(surfaceContext) {
    const noSurface = {
      should_surface: false,
      criterion_id: null,
      criterion_name: null,
    };

    if (!this._jarvisCriteria || !this._jarvisCriteria.criteria) {
      return noSurface;
    }

    const evaluationOrder = this._jarvisCriteria.evaluation_order ||
      Object.keys(this._jarvisCriteria.criteria);

    for (const criterionKey of evaluationOrder) {
      const criterion = this._jarvisCriteria.criteria[criterionKey];
      if (!criterion || !criterion.condition || !criterion.id) continue;

      if (this._evaluateSurfaceCondition(criterion.condition, surfaceContext)) {
        return {
          should_surface: true,
          criterion_id: criterion.id,
          criterion_name: criterion.name || criterionKey,
          action: criterion.action,
          message: criterion.message || '',
          severity: criterion.severity || 'info',
        };
      }
    }

    return noSurface;
  }

  /**
   * Check Bob surface criteria.
   * Uses injected SurfaceChecker if available, otherwise evaluates directly.
   *
   * @private
   * @param {object} surfaceContext
   * @returns {object} SurfaceResult-like object
   */
  _checkBobCriteria(surfaceContext) {
    // If SurfaceChecker is injected, use it directly
    if (this._surfaceChecker) {
      try {
        return this._surfaceChecker.shouldSurface(surfaceContext);
      } catch {
        // SurfaceChecker error -- do not surface, degrade gracefully
        return { should_surface: false, criterion_id: null, criterion_name: null };
      }
    }

    // Otherwise, evaluate Bob criteria from loaded YAML
    const noSurface = {
      should_surface: false,
      criterion_id: null,
      criterion_name: null,
    };

    if (!this._bobCriteria || !this._bobCriteria.criteria) {
      return noSurface;
    }

    const evaluationOrder = this._bobCriteria.evaluation_order ||
      Object.keys(this._bobCriteria.criteria);

    for (const criterionKey of evaluationOrder) {
      const criterion = this._bobCriteria.criteria[criterionKey];
      if (!criterion || !criterion.condition || !criterion.id) continue;

      if (this._evaluateSurfaceCondition(criterion.condition, surfaceContext)) {
        return {
          should_surface: true,
          criterion_id: criterion.id,
          criterion_name: criterion.name || criterionKey,
          action: criterion.action,
          message: criterion.message || '',
          severity: criterion.severity || 'info',
        };
      }
    }

    return noSurface;
  }

  /**
   * Evaluate a surface criterion condition string against context.
   * Supports: field > N, field >= N, field < N, field == 'str', boolean field.
   *
   * @private
   * @param {string} condition
   * @param {object} context
   * @returns {boolean}
   */
  _evaluateSurfaceCondition(condition, context) {
    if (!condition || !context) return false;

    // OR conditions
    if (condition.includes(' OR ')) {
      const parts = condition.split(' OR ').map((p) => p.trim());
      return parts.some((part) => this._evaluateSurfaceCondition(part, context));
    }

    // AND conditions
    if (condition.includes(' AND ')) {
      const parts = condition.split(' AND ').map((p) => p.trim());
      return parts.every((part) => this._evaluateSurfaceCondition(part, context));
    }

    // Greater than or equal
    const gteMatch = condition.match(/^(\w+)\s*>=\s*(\d+(?:\.\d+)?)$/);
    if (gteMatch) {
      return (context[gteMatch[1]] || 0) >= parseFloat(gteMatch[2]);
    }

    // Greater than
    const gtMatch = condition.match(/^(\w+)\s*>\s*(\d+(?:\.\d+)?)$/);
    if (gtMatch) {
      return (context[gtMatch[1]] || 0) > parseFloat(gtMatch[2]);
    }

    // Less than
    const ltMatch = condition.match(/^(\w+)\s*<\s*(\d+(?:\.\d+)?)$/);
    if (ltMatch) {
      return (context[ltMatch[1]] || 0) < parseFloat(ltMatch[2]);
    }

    // Equality with string
    const eqStrMatch = condition.match(/^(\w+)\s*==\s*['"](\w+)['"]$/);
    if (eqStrMatch) {
      return context[eqStrMatch[1]] === eqStrMatch[2];
    }

    // Equality with number
    const eqNumMatch = condition.match(/^(\w+)\s*==\s*(\d+(?:\.\d+)?)$/);
    if (eqNumMatch) {
      return context[eqNumMatch[1]] === parseFloat(eqNumMatch[2]);
    }

    // Boolean field check
    if (/^[a-z_]+$/.test(condition)) {
      return Boolean(context[condition]);
    }

    return false;
  }

  // -------------------------------------------------------------------------
  // Config Loading (AC: 6)
  // -------------------------------------------------------------------------

  /**
   * Load autonomy level from core-config.yaml.
   *
   * @private
   * @returns {string|null} Configured level or null
   */
  _loadConfigLevel() {
    try {
      const yaml = require('js-yaml');
      const content = fs.readFileSync(this._configPath, 'utf8');
      const config = yaml.load(content);
      return config && config.jarvis && config.jarvis.autonomy
        ? String(config.jarvis.autonomy)
        : null;
    } catch {
      // Config not found or unparseable -- not an error, use default
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // Session Persistence (AC: 8)
  // -------------------------------------------------------------------------

  /**
   * Load persisted autonomy level from session file.
   *
   * @private
   * @returns {string|null} Persisted level or null
   */
  _loadSessionLevel() {
    const sessionPath = path.join(this._sessionDir, SESSION_FILENAME);
    try {
      if (!fs.existsSync(sessionPath)) return null;

      const content = fs.readFileSync(sessionPath, 'utf8');
      const session = JSON.parse(content);
      return session && session.autonomyLevel
        ? String(session.autonomyLevel)
        : null;
    } catch {
      // Corrupted session file -- log warning and return null
      this._warn(
        `Corrupted session file at ${sessionPath}. ` +
        'Using config value instead.',
      );
      return null;
    }
  }

  /**
   * Persist the autonomy level to session file.
   * Creates the session directory if it does not exist.
   * Only writes the autonomyLevel key (Story 1.6 owns full schema).
   *
   * @private
   * @param {string} level
   */
  _persistLevel(level) {
    const sessionPath = path.join(this._sessionDir, SESSION_FILENAME);
    try {
      // Create directory if needed
      if (!fs.existsSync(this._sessionDir)) {
        fs.mkdirSync(this._sessionDir, { recursive: true });
      }

      // Read existing session data to preserve other keys
      let session = {};
      try {
        if (fs.existsSync(sessionPath)) {
          const existing = fs.readFileSync(sessionPath, 'utf8');
          session = JSON.parse(existing);
        }
      } catch {
        // Corrupted existing file -- overwrite
        session = {};
      }

      // Update autonomyLevel
      session.autonomyLevel = level;
      session.autonomyLevelUpdatedAt = new Date().toISOString();

      fs.writeFileSync(sessionPath, JSON.stringify(session, null, 2), 'utf8');
    } catch (err) {
      this._warn(`Failed to persist autonomy level: ${err.message}`);
    }
  }

  // -------------------------------------------------------------------------
  // Rules Loading (AC: 4, 7)
  // -------------------------------------------------------------------------

  /**
   * Load autonomy rules from YAML (safe patterns + novel triggers).
   * @private
   */
  _loadRules() {
    try {
      const yaml = require('js-yaml');
      const content = fs.readFileSync(this._rulesPath, 'utf8');
      const rules = yaml.load(content);

      this._safePatterns = rules && rules.safe_patterns ? rules.safe_patterns : [];
      this._novelTriggers = rules && rules.novel_triggers ? rules.novel_triggers : [];
      this._confidenceThresholds = rules && rules.confidence_thresholds
        ? rules.confidence_thresholds : {};
    } catch {
      // Rules file not found -- degrade gracefully with empty patterns
      this._safePatterns = [];
      this._novelTriggers = [];
      this._confidenceThresholds = {};
    }
  }

  /**
   * Load JARVIS-specific surface criteria from YAML.
   * @private
   */
  _loadJarvisCriteria() {
    try {
      const yaml = require('js-yaml');
      const content = fs.readFileSync(this._jarvisCriteriaPath, 'utf8');
      this._jarvisCriteria = yaml.load(content);
    } catch {
      // Not found -- degrade gracefully
      this._jarvisCriteria = null;
    }
  }

  /**
   * Load Bob surface criteria from YAML (for fallback when no SurfaceChecker injected).
   * @private
   */
  _loadBobCriteria() {
    try {
      const yaml = require('js-yaml');
      const content = fs.readFileSync(this._bobCriteriaPath, 'utf8');
      this._bobCriteria = yaml.load(content);
    } catch {
      // Not found -- degrade gracefully
      this._bobCriteria = null;
    }
  }

  // -------------------------------------------------------------------------
  // Query Methods
  // -------------------------------------------------------------------------

  /**
   * Get the list of known-safe patterns.
   * @returns {object[]} Safe patterns array
   */
  getSafePatterns() {
    this._ensureInitialized();
    return [...this._safePatterns];
  }

  /**
   * Get the list of novel decision triggers.
   * @returns {object[]} Novel triggers array
   */
  getNovelTriggers() {
    this._ensureInitialized();
    return [...this._novelTriggers];
  }

  /**
   * Get confidence thresholds per level.
   * @returns {object} Thresholds map
   */
  getConfidenceThresholds() {
    this._ensureInitialized();
    return { ...this._confidenceThresholds };
  }

  /**
   * Check if a given level string is valid.
   * @param {string} level
   * @returns {boolean}
   */
  static isValidLevel(level) {
    return VALID_LEVELS.includes(level);
  }

  // -------------------------------------------------------------------------
  // Utility
  // -------------------------------------------------------------------------

  /**
   * Emit an event via the event handler.
   * @private
   * @param {string} eventType
   * @param {object} payload
   */
  _emit(eventType, payload) {
    if (typeof this._eventHandler === 'function') {
      try {
        this._eventHandler(eventType, payload);
      } catch {
        // Event handler errors should never break the controller
      }
    }
  }

  /**
   * Log a warning.
   * @private
   * @param {string} message
   */
  _warn(message) {
    if (process.env.AIOS_DEBUG) {
      console.warn(`[AutonomyController] ${message}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Module Exports
// ---------------------------------------------------------------------------

module.exports = {
  AutonomyController,

  // Constants
  LEVELS,
  VALID_LEVELS,
  DEFAULT_LEVEL,
  EVENTS,
  SESSION_FILENAME,
};
