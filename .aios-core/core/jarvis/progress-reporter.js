#!/usr/bin/env node

/**
 * JARVIS Progress Reporter
 *
 * Real-time progress reporting for JARVIS missions and delegations.
 * Supports two output channels:
 *   1. Terminal: Inline spinner/status updates for CLI sessions
 *   2. WebSocket: JSON events for JARVIS Voice Hub cockpit
 *
 * Features:
 *   - Spinner animation for terminal output
 *   - Phase-based progress tracking (classifying → planning → delegating → complete)
 *   - Mission-level progress aggregation (step N of M)
 *   - Event emitter pattern for extensibility
 *   - WebSocket broadcast for cockpit integration
 *
 * @module progress-reporter
 * @story 1.7
 * @architecture docs/stories/jarvis/ARCHITECTURE-JARVIS.md#4.5
 */

'use strict';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Spinner frames for terminal output */
const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

/** Spinner interval in ms */
const SPINNER_INTERVAL_MS = 80;

/** Phase display names */
const PHASE_LABELS = {
  idle: 'Idle',
  classifying: 'Classifying intent',
  planning: 'Planning mission',
  delegating: 'Delegating to agent',
  executing: 'Executing',
  waiting: 'Waiting for approval',
  complete: 'Complete',
};

/** Phase colors (ANSI codes) */
const PHASE_COLORS = {
  idle: '\x1b[90m',
  classifying: '\x1b[36m',
  planning: '\x1b[33m',
  delegating: '\x1b[35m',
  executing: '\x1b[34m',
  waiting: '\x1b[33m',
  complete: '\x1b[32m',
};

const RESET = '\x1b[0m';

// ---------------------------------------------------------------------------
// ProgressReporter class
// ---------------------------------------------------------------------------

class ProgressReporter {
  /**
   * @param {object} [options]
   * @param {boolean} [options.terminal] - Enable terminal output (default: true if TTY)
   * @param {object} [options.wsServer] - WebSocket server instance for broadcasting
   * @param {Function} [options.eventHandler] - Custom event handler: (event) => void
   * @param {boolean} [options.silent] - Suppress all terminal output
   */
  constructor(options = {}) {
    this._terminal = options.terminal != null ? options.terminal : (process.stdout.isTTY || false);
    this._wsServer = options.wsServer || null;
    this._eventHandler = options.eventHandler || null;
    this._silent = options.silent || false;

    this._phase = 'idle';
    this._message = '';
    this._spinnerFrame = 0;
    this._spinnerTimer = null;
    this._missionId = null;
    this._totalSteps = 0;
    this._currentStep = 0;
    this._startTime = null;
    this._listeners = [];
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /**
   * Start tracking a mission.
   *
   * @param {string} missionId - Mission identifier
   * @param {number} totalSteps - Total number of steps in the plan
   * @param {string} [description] - Mission description
   */
  startMission(missionId, totalSteps, description) {
    this._missionId = missionId;
    this._totalSteps = totalSteps;
    this._currentStep = 0;
    this._startTime = Date.now();

    this._emit({
      type: 'mission_start',
      missionId,
      totalSteps,
      description: description || '',
      timestamp: new Date().toISOString(),
    });

    this.update('planning', description || `Mission ${missionId} started`);
  }

  /**
   * Update the current progress phase and message.
   *
   * @param {string} phase - Phase identifier (classifying, planning, delegating, etc.)
   * @param {string} [message] - Human-readable status message
   */
  update(phase, message) {
    this._phase = phase;
    this._message = message || PHASE_LABELS[phase] || phase;

    this._emit({
      type: 'progress_update',
      missionId: this._missionId,
      phase,
      message: this._message,
      step: this._currentStep,
      totalSteps: this._totalSteps,
      timestamp: new Date().toISOString(),
    });

    if (this._terminal && !this._silent) {
      this._startSpinner();
    }
  }

  /**
   * Advance to the next step in the mission.
   *
   * @param {string} stepId - Step identifier
   * @param {string} agentId - Agent handling this step
   * @param {string} [message] - Status message
   */
  stepStart(stepId, agentId, message) {
    this._currentStep++;
    const progress = `[${this._currentStep}/${this._totalSteps}]`;
    const statusMsg = message || `${progress} @${agentId} executing ${stepId}`;

    this._emit({
      type: 'step_start',
      missionId: this._missionId,
      stepId,
      agentId,
      step: this._currentStep,
      totalSteps: this._totalSteps,
      message: statusMsg,
      timestamp: new Date().toISOString(),
    });

    this.update('delegating', statusMsg);
  }

  /**
   * Mark a step as completed.
   *
   * @param {string} stepId - Step identifier
   * @param {string} status - Result status (success, failure, timeout)
   * @param {string} [message] - Result message
   */
  stepComplete(stepId, status, message) {
    this._emit({
      type: 'step_complete',
      missionId: this._missionId,
      stepId,
      status,
      step: this._currentStep,
      totalSteps: this._totalSteps,
      message: message || `Step ${stepId}: ${status}`,
      timestamp: new Date().toISOString(),
    });

    if (this._terminal && !this._silent) {
      this._clearLine();
      const icon = status === 'success' ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
      process.stdout.write(`  ${icon} ${message || `Step ${stepId}: ${status}`}\n`);
    }
  }

  /**
   * Mark the current operation as complete.
   *
   * @param {string} [status] - Final status (success, failure)
   * @param {string} [message] - Final message
   */
  complete(status, message) {
    this._stopSpinner();

    const duration = this._startTime ? Date.now() - this._startTime : 0;
    const finalStatus = status || 'success';
    const finalMessage = message || (finalStatus === 'success' ? 'Done.' : 'Failed.');

    this._emit({
      type: 'mission_complete',
      missionId: this._missionId,
      status: finalStatus,
      message: finalMessage,
      duration,
      stepsCompleted: this._currentStep,
      totalSteps: this._totalSteps,
      timestamp: new Date().toISOString(),
    });

    if (this._terminal && !this._silent) {
      this._clearLine();
      const icon = finalStatus === 'success' ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
      const durStr = duration > 0 ? ` (${(duration / 1000).toFixed(1)}s)` : '';
      process.stdout.write(`  ${icon} ${finalMessage}${durStr}\n`);
    }

    // Reset state
    this._phase = 'idle';
    this._missionId = null;
    this._totalSteps = 0;
    this._currentStep = 0;
    this._startTime = null;
  }

  // -------------------------------------------------------------------------
  // Event System
  // -------------------------------------------------------------------------

  /**
   * Register an event listener.
   *
   * @param {Function} listener - Callback: (event) => void
   * @returns {Function} Unsubscribe function
   */
  on(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Set the WebSocket server for broadcasting events.
   *
   * @param {object} wsServer - WebSocket server with clients Set
   */
  setWebSocketServer(wsServer) {
    this._wsServer = wsServer;
  }

  // -------------------------------------------------------------------------
  // Terminal Spinner
  // -------------------------------------------------------------------------

  /**
   * Start the terminal spinner animation.
   * @private
   */
  _startSpinner() {
    this._stopSpinner();

    this._renderSpinner();
    this._spinnerTimer = setInterval(() => {
      this._spinnerFrame = (this._spinnerFrame + 1) % SPINNER_FRAMES.length;
      this._renderSpinner();
    }, SPINNER_INTERVAL_MS);
  }

  /**
   * Render current spinner frame.
   * @private
   */
  _renderSpinner() {
    if (this._silent) return;

    const frame = SPINNER_FRAMES[this._spinnerFrame];
    const color = PHASE_COLORS[this._phase] || PHASE_COLORS.idle;
    const progress = this._totalSteps > 0
      ? ` [${this._currentStep}/${this._totalSteps}]`
      : '';

    this._clearLine();
    process.stdout.write(`  ${color}${frame}${RESET} ${this._message}${progress}`);
  }

  /**
   * Stop the spinner animation.
   * @private
   */
  _stopSpinner() {
    if (this._spinnerTimer) {
      clearInterval(this._spinnerTimer);
      this._spinnerTimer = null;
    }
  }

  /**
   * Clear the current terminal line.
   * @private
   */
  _clearLine() {
    if (process.stdout.clearLine && process.stdout.cursorTo) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    }
  }

  // -------------------------------------------------------------------------
  // Event Emission
  // -------------------------------------------------------------------------

  /**
   * Emit an event to all channels.
   * @private
   * @param {object} event - Progress event
   */
  _emit(event) {
    // Custom event handler
    if (typeof this._eventHandler === 'function') {
      try {
        this._eventHandler(event);
      } catch { /* handler errors should never break reporter */ }
    }

    // Registered listeners
    for (const listener of this._listeners) {
      try {
        listener(event);
      } catch { /* ignore */ }
    }

    // WebSocket broadcast
    if (this._wsServer) {
      this._broadcastWS(event);
    }
  }

  /**
   * Broadcast an event to all connected WebSocket clients.
   * @private
   * @param {object} event - Progress event
   */
  _broadcastWS(event) {
    const message = JSON.stringify({
      source: 'jarvis',
      ...event,
    });

    try {
      if (this._wsServer.clients) {
        for (const client of this._wsServer.clients) {
          if (client.readyState === 1) { // WebSocket.OPEN
            client.send(message);
          }
        }
      }
    } catch (err) {
      if (process.env.AIOS_DEBUG) {
        console.warn(`[ProgressReporter] WS broadcast failed: ${err.message}`);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Accessors
  // -------------------------------------------------------------------------

  /** @returns {string} Current phase */
  get phase() { return this._phase; }

  /** @returns {string|null} Current mission ID */
  get missionId() { return this._missionId; }

  /** @returns {number} Current step number */
  get currentStep() { return this._currentStep; }

  /** @returns {number} Total steps in mission */
  get totalSteps() { return this._totalSteps; }
}

// ---------------------------------------------------------------------------
// Module Exports
// ---------------------------------------------------------------------------

module.exports = {
  ProgressReporter,

  // Constants for testing
  SPINNER_FRAMES,
  SPINNER_INTERVAL_MS,
  PHASE_LABELS,
  PHASE_COLORS,
};
