#!/usr/bin/env node

/**
 * JARVIS Session Manager
 *
 * Maintains persistent session state for JARVIS across IDE restarts
 * and terminal closures. Extends the existing session-state.js module
 * with JARVIS-specific fields (missions, autonomy, project context).
 *
 * Key design decisions:
 *   - Atomic writes via temp file + rename to prevent corruption
 *   - Graceful recovery from corrupted state (log + fresh start)
 *   - completedMissions capped at 30 entries (oldest pruned)
 *   - Cleanup: >30 days archived, >90 days purged
 *   - Synchronous load for <5s recovery (NFR3)
 *   - State file parameterized via constructor for test isolation
 *
 * @module jarvis/session-manager
 * @story 1.6
 * @architecture docs/stories/jarvis/ARCHITECTURE-JARVIS.md#4.4.4
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Schema version for forward-compatibility checks */
const SCHEMA_VERSION = '1.0.0';

/** Maximum completed missions to retain */
const MAX_COMPLETED_MISSIONS = 30;

/** Days before archived missions are eligible for archive */
const ARCHIVE_THRESHOLD_DAYS = 30;

/** Days before archived missions are eligible for purge */
const PURGE_THRESHOLD_DAYS = 90;

/** Default session file path (relative to project root) */
const DEFAULT_SESSION_DIR = path.join('.aios', 'jarvis');
const DEFAULT_SESSION_FILE = 'session.json';

// ---------------------------------------------------------------------------
// Default State Factory
// ---------------------------------------------------------------------------

/**
 * Creates a fresh default session state.
 * @returns {object} Fresh session state
 */
function createDefaultState() {
  return {
    schemaVersion: SCHEMA_VERSION,
    lastInteractionAt: new Date().toISOString(),
    autonomyLevel: 'supervised',
    activeMissions: [],
    completedMissions: [],
    projectContext: {
      currentStory: null,
      currentEpic: null,
      currentBranch: null,
      lastCompletedStory: null,
      lastCommit: null,
    },
    preferences: {
      address: 'sir',
      personality: true,
      greeting: true,
    },
  };
}

// ---------------------------------------------------------------------------
// JarvisSessionManager class
// ---------------------------------------------------------------------------

class JarvisSessionManager {
  /**
   * @param {object} [options]
   * @param {string} [options.sessionDir] - Override session directory path
   * @param {string} [options.sessionFile] - Override session filename
   * @param {string} [options.projectRoot] - Project root for git/story detection
   * @param {boolean} [options.debug] - Enable debug logging
   */
  constructor(options = {}) {
    this._projectRoot = options.projectRoot || process.cwd();
    this._sessionDir = options.sessionDir ||
      path.join(this._projectRoot, DEFAULT_SESSION_DIR);
    this._sessionFile = options.sessionFile || DEFAULT_SESSION_FILE;
    this._sessionPath = path.join(this._sessionDir, this._sessionFile);
    this._debug = options.debug || false;
    this._state = null;
  }

  // -------------------------------------------------------------------------
  // Core State Accessors
  // -------------------------------------------------------------------------

  /**
   * Returns the current in-memory state (or null if not loaded).
   * @returns {object|null}
   */
  get state() {
    return this._state;
  }

  /**
   * Returns the full path to the session file.
   * @returns {string}
   */
  get sessionPath() {
    return this._sessionPath;
  }

  // -------------------------------------------------------------------------
  // Load
  // -------------------------------------------------------------------------

  /**
   * Load session state from disk. If the file does not exist, returns
   * a fresh default state. If the file is corrupted, archives the corrupt
   * file and returns a fresh state (AC6: graceful recovery).
   *
   * @returns {object} The loaded (or fresh) session state
   */
  load() {
    // If file doesn't exist, start fresh
    if (!fs.existsSync(this._sessionPath)) {
      this._log('No session file found. Starting fresh.');
      this._state = createDefaultState();
      return this._state;
    }

    try {
      const raw = fs.readFileSync(this._sessionPath, 'utf8');
      const parsed = JSON.parse(raw);

      // Basic schema validation
      if (!parsed || typeof parsed !== 'object' || !parsed.schemaVersion) {
        throw new Error('Invalid session state schema: missing schemaVersion');
      }

      this._state = parsed;
      this._log('Session state loaded successfully.');
      return this._state;
    } catch (err) {
      // AC6: Corruption recovery
      this._log(`Session state corrupted: ${err.message}. Starting fresh.`);
      this._archiveCorruptFile();
      this._state = createDefaultState();
      return this._state;
    }
  }

  // -------------------------------------------------------------------------
  // Save (Atomic Write)
  // -------------------------------------------------------------------------

  /**
   * Persist the current state to disk using atomic write strategy:
   * write to .tmp file, then rename (AC3: atomic writes).
   *
   * @returns {void}
   */
  save() {
    if (!this._state) {
      throw new Error('No state to save. Call load() first.');
    }

    // Update interaction timestamp
    this._state.lastInteractionAt = new Date().toISOString();

    // Ensure directory exists
    if (!fs.existsSync(this._sessionDir)) {
      fs.mkdirSync(this._sessionDir, { recursive: true });
    }

    const tmpPath = `${this._sessionPath}.tmp`;
    const content = JSON.stringify(this._state, null, 2);

    // Write to temp file first
    fs.writeFileSync(tmpPath, content, 'utf8');

    // Atomic rename
    try {
      fs.renameSync(tmpPath, this._sessionPath);
    } catch (renameErr) {
      // Windows fallback: rename fails if target exists in some edge cases
      try {
        fs.writeFileSync(this._sessionPath, content, 'utf8');
      } catch (writeErr) {
        // Clean up temp file on failure
        try { fs.unlinkSync(tmpPath); } catch { /* ignore */ }
        throw writeErr;
      }
      // Clean up temp file
      try { fs.unlinkSync(tmpPath); } catch { /* ignore */ }
    }

    this._log('Session state saved.');
  }

  // -------------------------------------------------------------------------
  // Mission Management
  // -------------------------------------------------------------------------

  /**
   * Add a mission to activeMissions.
   *
   * @param {object} mission - Mission object
   * @param {string} mission.missionId - Unique mission ID
   * @param {string} mission.description - Human-readable description
   * @param {string} [mission.status] - Mission status (default: 'in_progress')
   * @param {string} [mission.currentStep] - Current step ID
   * @returns {object} The added mission (normalized)
   */
  addMission(mission) {
    this._ensureLoaded();

    const normalized = {
      missionId: mission.missionId,
      description: mission.description,
      status: mission.status || 'in_progress',
      currentStep: mission.currentStep || null,
      startedAt: mission.startedAt || new Date().toISOString(),
    };

    this._state.activeMissions.push(normalized);
    return normalized;
  }

  /**
   * Complete a mission: move from activeMissions to completedMissions.
   * Enforces the 30-mission cap on completedMissions (AC2: prune oldest).
   *
   * @param {string} missionId - The mission ID to complete
   * @returns {object|null} The completed mission, or null if not found
   */
  completeMission(missionId) {
    this._ensureLoaded();

    const idx = this._state.activeMissions.findIndex(
      (m) => m.missionId === missionId,
    );
    if (idx === -1) {
      this._log(`Mission ${missionId} not found in activeMissions.`);
      return null;
    }

    // Remove from active
    const [mission] = this._state.activeMissions.splice(idx, 1);
    mission.status = 'completed';
    mission.completedAt = new Date().toISOString();

    // Add to completed
    this._state.completedMissions.push(mission);

    // Enforce cap: keep only the most recent MAX_COMPLETED_MISSIONS
    if (this._state.completedMissions.length > MAX_COMPLETED_MISSIONS) {
      const excess = this._state.completedMissions.length - MAX_COMPLETED_MISSIONS;
      this._state.completedMissions.splice(0, excess);
    }

    return mission;
  }

  // -------------------------------------------------------------------------
  // Context
  // -------------------------------------------------------------------------

  /**
   * Returns a summary context object suitable for injection into
   * JARVIS prompts or downstream modules.
   *
   * @returns {object} Context summary
   */
  getContext() {
    this._ensureLoaded();

    return {
      autonomyLevel: this._state.autonomyLevel,
      activeMissions: this._state.activeMissions,
      completedMissionsCount: this._state.completedMissions.length,
      projectContext: { ...this._state.projectContext },
      preferences: { ...this._state.preferences },
      lastInteractionAt: this._state.lastInteractionAt,
    };
  }

  // -------------------------------------------------------------------------
  // Cleanup (DataLifecycleManager pattern - AC5)
  // -------------------------------------------------------------------------

  /**
   * Run cleanup on completed missions based on age thresholds.
   * - Missions completed >30 days ago: marked as 'archived'
   * - Missions completed/archived >90 days ago: purged
   *
   * This follows DataLifecycleManager patterns but operates on
   * in-memory state (mission arrays), not filesystem directories.
   *
   * @returns {object} Cleanup summary { archived: number, purged: number }
   */
  cleanup() {
    this._ensureLoaded();

    const now = Date.now();
    const archiveMs = ARCHIVE_THRESHOLD_DAYS * 24 * 60 * 60 * 1000;
    const purgeMs = PURGE_THRESHOLD_DAYS * 24 * 60 * 60 * 1000;

    let archived = 0;
    let purged = 0;

    // Process completed missions
    this._state.completedMissions = this._state.completedMissions.filter((m) => {
      const completedAt = m.completedAt ? new Date(m.completedAt).getTime() : 0;
      const ageMs = now - completedAt;

      // Purge if >90 days
      if (ageMs > purgeMs) {
        purged++;
        return false; // remove
      }

      // Archive if >30 days
      if (ageMs > archiveMs && m.status !== 'archived') {
        m.status = 'archived';
        archived++;
      }

      return true; // keep
    });

    this._log(`Cleanup: ${archived} archived, ${purged} purged.`);
    return { archived, purged };
  }

  // -------------------------------------------------------------------------
  // Reset
  // -------------------------------------------------------------------------

  /**
   * Reset session state to fresh defaults.
   * @returns {object} Fresh state
   */
  reset() {
    this._state = createDefaultState();
    return this._state;
  }

  // -------------------------------------------------------------------------
  // Project Context Enrichment (Task 7)
  // -------------------------------------------------------------------------

  /**
   * Enrich project context with live git/story state.
   * Called optionally after load() to merge live data.
   * Uses sync exec for git commands (must complete <5s per NFR3).
   *
   * @returns {object} Updated projectContext
   */
  enrichProjectContext() {
    this._ensureLoaded();

    // Git branch
    try {
      const branch = execSync('git branch --show-current', {
        cwd: this._projectRoot,
        encoding: 'utf8',
        timeout: 3000,
      }).trim();
      if (branch) {
        this._state.projectContext.currentBranch = branch;
      }
    } catch {
      this._log('Could not detect git branch.');
    }

    // Last commit
    try {
      const commit = execSync('git log --oneline -1', {
        cwd: this._projectRoot,
        encoding: 'utf8',
        timeout: 3000,
      }).trim();
      if (commit) {
        this._state.projectContext.lastCommit = commit;
      }
    } catch {
      this._log('Could not detect last commit.');
    }

    return this._state.projectContext;
  }

  // -------------------------------------------------------------------------
  // Resume Flow (Task 4 - AC4)
  // -------------------------------------------------------------------------

  /**
   * Check for in-progress missions and return resume information.
   *
   * @returns {object} Resume info: { hasInProgress: boolean, missions: array, message: string }
   */
  getResumeInfo() {
    this._ensureLoaded();

    const inProgress = this._state.activeMissions.filter(
      (m) => m.status === 'in_progress',
    );

    if (inProgress.length === 0) {
      return {
        hasInProgress: false,
        missions: [],
        message: null,
      };
    }

    const descriptions = inProgress
      .map((m) => m.description)
      .join(', ');

    return {
      hasInProgress: true,
      missions: inProgress,
      message: `Welcome back, sir. We have unfinished business -- ${descriptions}. Shall I resume? (y/n)`,
    };
  }

  // -------------------------------------------------------------------------
  // Private Helpers
  // -------------------------------------------------------------------------

  /**
   * Ensure state is loaded before operating.
   * @private
   */
  _ensureLoaded() {
    if (!this._state) {
      throw new Error('Session state not loaded. Call load() first.');
    }
  }

  /**
   * Archive a corrupted session file for forensics (AC6).
   * @private
   */
  _archiveCorruptFile() {
    try {
      if (fs.existsSync(this._sessionPath)) {
        const timestamp = Date.now();
        const corruptPath = `${this._sessionPath}.corrupt.${timestamp}`;
        fs.renameSync(this._sessionPath, corruptPath);
        this._log(`Corrupted file archived to: ${corruptPath}`);
      }
    } catch (err) {
      this._log(`Failed to archive corrupted file: ${err.message}`);
    }
  }

  /**
   * Debug logger.
   * @param {string} message
   * @private
   */
  _log(message) {
    if (this._debug) {
      console.log(`[JarvisSessionManager] ${message}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Module Exports
// ---------------------------------------------------------------------------

module.exports = {
  JarvisSessionManager,
  createDefaultState,
  SCHEMA_VERSION,
  MAX_COMPLETED_MISSIONS,
  ARCHIVE_THRESHOLD_DAYS,
  PURGE_THRESHOLD_DAYS,
  DEFAULT_SESSION_DIR,
  DEFAULT_SESSION_FILE,
};
