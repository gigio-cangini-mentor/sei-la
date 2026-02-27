#!/usr/bin/env node

/**
 * JARVIS Delegation Bridge
 *
 * Thin wrapper around TerminalSpawner that:
 *   1. Constructs context-rich delegation requests from plan steps
 *   2. Enforces Agent Authority (Constitution Art. II) before spawning
 *   3. Calls TerminalSpawner for actual agent execution
 *   4. Captures and normalizes results into DelegationResult
 *   5. Implements retry logic (max 2 retries, 5s backoff)
 *   6. Controls concurrency via semaphore (max 3 simultaneous delegations)
 *   7. Appends results to mission NDJSON log
 *
 * Key design decisions:
 *   - Reuses TerminalSpawner as-is; does NOT reimplement spawning.
 *   - Authority rules are hardcoded from agent-authority.md delegation matrix
 *     (loaded once at construction, not parsed from markdown at runtime).
 *   - Semaphore uses a counter + queue (Promise-based) pattern.
 *   - Retry eligibility: timeouts and spawn errors are retryable;
 *     authority violations and validation errors are not.
 *   - Mission log uses NDJSON (newline-delimited JSON) to avoid full-file rewrites.
 *
 * @module delegation-bridge
 * @story 1.4
 * @architecture docs/stories/jarvis/ARCHITECTURE-JARVIS.md#4.2.5
 */

'use strict';

const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maximum concurrent delegations (NFR11, AC7) */
const MAX_CONCURRENT_DELEGATIONS = 3;

/** Maximum retries per delegation (AC5) */
const MAX_RETRIES = 2;

/** Backoff delay between retries in ms */
const RETRY_BACKOFF_MS = 5000;

/** Default delegation timeout in ms (5 minutes) */
const DEFAULT_TIMEOUT_MS = 300000;

/** Default missions directory */
const DEFAULT_MISSIONS_DIR = path.join(process.cwd(), '.aios', 'jarvis', 'missions');

// ---------------------------------------------------------------------------
// Authority Rules (from .claude/rules/agent-authority.md)
// ---------------------------------------------------------------------------

/**
 * Exclusive authority mapping.
 * Operations that MUST be performed by a specific agent.
 * Keys are operation patterns; values are the required agent IDs.
 *
 * Source: .claude/rules/agent-authority.md Delegation Matrix
 */
const EXCLUSIVE_AUTHORITIES = {
  // @devops exclusive
  'git push':       'devops',
  'git push --force': 'devops',
  'gh pr create':   'devops',
  'gh pr merge':    'devops',
  '*push':          'devops',

  // @sm exclusive
  '*draft':         'sm',
  '*create-story':  'sm',

  // @qa exclusive
  '*qa-gate':       'qa',
  '*qa-loop':       'qa',
  '*qa-loop-review': 'qa',
};

/**
 * Error types that are NOT retryable.
 * If the error message matches any of these patterns, do not retry.
 */
const NON_RETRYABLE_PATTERNS = [
  'authority violation',
  'authority redirect',
  'validation error',
  'invalid agent',
  'invalid command',
  'permission denied',
];

// ---------------------------------------------------------------------------
// Semaphore (Promise-based concurrency control)
// ---------------------------------------------------------------------------

/**
 * Simple counting semaphore for controlling concurrent delegations.
 * Uses a queue of resolve callbacks to wake waiting acquirers.
 */
class Semaphore {
  /**
   * @param {number} max - Maximum concurrent permits
   */
  constructor(max) {
    this._max = max;
    this._current = 0;
    this._queue = [];
  }

  /**
   * Acquire a permit. Resolves immediately if capacity is available,
   * otherwise queues until a permit is released.
   * @returns {Promise<void>}
   */
  acquire() {
    if (this._current < this._max) {
      this._current++;
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this._queue.push(resolve);
    });
  }

  /**
   * Release a permit, waking the next queued acquirer if any.
   */
  release() {
    if (this._queue.length > 0) {
      const next = this._queue.shift();
      // Do not decrement _current because the permit transfers directly
      next();
    } else {
      this._current--;
    }
  }

  /**
   * Current number of active (acquired) permits.
   * @returns {number}
   */
  get active() {
    return this._current;
  }

  /**
   * Number of waiters in queue.
   * @returns {number}
   */
  get waiting() {
    return this._queue.length;
  }
}

// ---------------------------------------------------------------------------
// AuthorityChecker
// ---------------------------------------------------------------------------

/**
 * Validates that a delegation request respects Agent Authority boundaries
 * (Constitution Article II).
 *
 * If a violation is detected, the checker redirects to the correct agent
 * and returns a redirect record. Never silently overrides.
 */
class AuthorityChecker {
  /**
   * @param {Object} [customRules] - Override default authority rules (for testing)
   */
  constructor(customRules) {
    this._rules = customRules || EXCLUSIVE_AUTHORITIES;
  }

  /**
   * Validate a delegation request against authority rules.
   *
   * @param {string} agentId - Target agent (e.g., "dev", "devops")
   * @param {string} command - Command or operation (e.g., "*push", "git push")
   * @returns {{ valid: boolean, redirectTo?: string, reason?: string }}
   */
  validate(agentId, command) {
    const normalizedAgent = (agentId || '').replace(/^@/, '');
    const normalizedCommand = (command || '').trim().toLowerCase();

    for (const [pattern, requiredAgent] of Object.entries(this._rules)) {
      const normalizedPattern = pattern.toLowerCase();
      if (normalizedCommand.includes(normalizedPattern) || normalizedCommand === normalizedPattern) {
        const normalizedRequired = requiredAgent.replace(/^@/, '');
        if (normalizedAgent !== normalizedRequired) {
          return {
            valid: false,
            redirectTo: normalizedRequired,
            reason: `Operation "${command}" requires @${normalizedRequired} (Constitution Art. II). ` +
                    `Redirecting from @${normalizedAgent}.`,
          };
        }
      }
    }

    return { valid: true };
  }
}

// ---------------------------------------------------------------------------
// DelegationBridge
// ---------------------------------------------------------------------------

class DelegationBridge {
  /**
   * @param {Object} [options]
   * @param {Object} [options.terminalSpawner] - Injected TerminalSpawner module (for testing)
   * @param {string} [options.missionsDir] - Override mission log directory
   * @param {Object} [options.authorityRules] - Override authority rules (for testing)
   * @param {number} [options.maxConcurrent] - Override max concurrent delegations
   * @param {number} [options.maxRetries] - Override max retries per delegation
   * @param {number} [options.retryBackoffMs] - Override retry backoff delay
   */
  constructor(options = {}) {
    this._spawner = options.terminalSpawner || null;
    this._missionsDir = options.missionsDir || DEFAULT_MISSIONS_DIR;
    this._authority = new AuthorityChecker(options.authorityRules);
    this._semaphore = new Semaphore(options.maxConcurrent || MAX_CONCURRENT_DELEGATIONS);
    this._maxRetries = options.maxRetries != null ? options.maxRetries : MAX_RETRIES;
    this._retryBackoffMs = options.retryBackoffMs != null ? options.retryBackoffMs : RETRY_BACKOFF_MS;

    // Lazy-load TerminalSpawner if not injected
    if (!this._spawner) {
      try {
        this._spawner = require(
          path.join(__dirname, '..', 'orchestration', 'terminal-spawner'),
        );
      } catch (err) {
        if (process.env.AIOS_DEBUG) {
          console.warn(`[DelegationBridge] Failed to load TerminalSpawner: ${err.message}`);
        }
        this._spawner = null;
      }
    }
  }

  // -------------------------------------------------------------------------
  // Primary API
  // -------------------------------------------------------------------------

  /**
   * Delegate a plan step to an agent and return the result.
   *
   * This is the primary entry point. It:
   *   1. Builds a DelegationRequest from the plan step
   *   2. Validates authority
   *   3. Acquires semaphore
   *   4. Spawns via TerminalSpawner with retry logic
   *   5. Captures output into DelegationResult
   *   6. Appends result to mission log
   *   7. Releases semaphore
   *
   * @param {Object} planStep - A PlanStep from mission-planner.js
   * @param {Object} missionContext - Mission context including missionId, session info
   * @returns {Promise<Object>} DelegationResult
   */
  async delegate(planStep, missionContext = {}) {
    // Build request
    const request = this._buildRequest(planStep, missionContext);

    // Authority check
    const authResult = this._authority.validate(request.agentId, request.command);
    if (!authResult.valid) {
      this._logAuthorityRedirect(request, authResult);
      request.agentId = authResult.redirectTo;
      request.authorityRedirect = {
        originalAgent: planStep.agent,
        redirectedTo: authResult.redirectTo,
        reason: authResult.reason,
      };
    }

    // Acquire semaphore slot
    await this._semaphore.acquire();

    try {
      // Execute with retry logic
      const result = await this._executeWithRetry(request, missionContext);

      // Append to mission log
      await this._appendToMissionLog(result, missionContext);

      return result;
    } finally {
      this._semaphore.release();
    }
  }

  /**
   * Execute multiple plan steps concurrently, respecting the semaphore.
   * Uses Promise.allSettled to ensure all delegations complete
   * even if some fail.
   *
   * @param {Object[]} planSteps - Array of PlanStep objects
   * @param {Object} missionContext - Shared mission context
   * @returns {Promise<Object[]>} Array of DelegationResult objects
   */
  async delegateParallel(planSteps, missionContext = {}) {
    const promises = planSteps.map((step) => this.delegate(step, missionContext));

    const settled = await Promise.allSettled(promises);

    return settled.map((outcome, index) => {
      if (outcome.status === 'fulfilled') {
        return outcome.value;
      }
      // Rejected promise -- build error result
      return {
        stepId: planSteps[index].id || `step-${index + 1}`,
        agentId: (planSteps[index].agent || '').replace(/^@/, ''),
        status: 'failure',
        output: '',
        artifacts: [],
        statusChanges: [],
        duration: 0,
        retries: 0,
        error: outcome.reason instanceof Error ? outcome.reason.message : String(outcome.reason),
      };
    });
  }

  // -------------------------------------------------------------------------
  // Request Construction (AC2)
  // -------------------------------------------------------------------------

  /**
   * Build a DelegationRequest from a plan step and mission context.
   *
   * @private
   * @param {Object} planStep
   * @param {Object} missionContext
   * @returns {Object} DelegationRequest
   */
  _buildRequest(planStep, missionContext) {
    const agentId = (planStep.agent || '').replace(/^@/, '');
    const command = planStep.command || planStep.task || '';

    // Build context payload (AC2: validate paths exist)
    const contextPayload = this._buildContextPayload(planStep, missionContext);

    return {
      agentId,
      command,
      taskFile: planStep.taskFile || null,
      contextPayload,
      timeout: planStep.timeout || missionContext.timeout || DEFAULT_TIMEOUT_MS,
    };
  }

  /**
   * Build the context payload, validating that referenced paths exist on disk.
   *
   * @private
   * @param {Object} planStep
   * @param {Object} missionContext
   * @returns {Object}
   */
  _buildContextPayload(planStep, missionContext) {
    const payload = {
      missionId: missionContext.missionId || '',
      stepId: planStep.id || '',
      sessionContext: missionContext.sessionContext || {},
    };

    // Validate story file path
    if (missionContext.storyFile) {
      if (fs.existsSync(missionContext.storyFile)) {
        payload.storyFile = missionContext.storyFile;
      }
    }

    // Validate code paths (only include existing ones)
    if (planStep.inputs && Array.isArray(planStep.inputs.codePaths)) {
      payload.codePaths = planStep.inputs.codePaths.filter((p) => {
        try { return fs.existsSync(p); } catch { return false; }
      });
    }

    return payload;
  }

  // -------------------------------------------------------------------------
  // Execution with Retry (AC5)
  // -------------------------------------------------------------------------

  /**
   * Execute a delegation with retry logic.
   *
   * Retryable conditions: timeouts and spawn/process errors.
   * Non-retryable: authority violations, validation errors.
   *
   * @private
   * @param {Object} request - DelegationRequest
   * @param {Object} missionContext
   * @returns {Promise<Object>} DelegationResult
   */
  async _executeWithRetry(request, missionContext) {
    let lastError = null;
    let retries = 0;

    for (let attempt = 0; attempt <= this._maxRetries; attempt++) {
      const startTime = Date.now();

      try {
        const spawnResult = await this._spawn(request);
        const duration = Date.now() - startTime;

        // Parse artifacts from spawn output
        const artifacts = this._extractArtifacts(spawnResult.output);

        const result = {
          stepId: request.contextPayload.stepId,
          agentId: request.agentId,
          status: spawnResult.success ? 'success' : 'failure',
          output: spawnResult.output || '',
          artifacts,
          statusChanges: [],
          duration,
          retries,
          error: spawnResult.error || undefined,
        };

        // If spawn reported success, return immediately
        if (spawnResult.success) {
          return result;
        }

        // Spawn failed -- check if retryable
        lastError = spawnResult.error || 'Unknown spawn failure';

        if (!this._isRetryable(lastError)) {
          result.retries = retries;
          return result;
        }

        // If we have retries left, backoff and continue
        if (attempt < this._maxRetries) {
          retries++;
          await this._sleep(this._retryBackoffMs);
          continue;
        }

        // Max retries exhausted
        result.status = 'failure';
        result.retries = retries;
        return result;

      } catch (err) {
        const duration = Date.now() - startTime;
        lastError = err.message || String(err);

        // Check if timeout
        const isTimeout = lastError.toLowerCase().includes('timeout');

        if (!this._isRetryable(lastError)) {
          return {
            stepId: request.contextPayload.stepId,
            agentId: request.agentId,
            status: isTimeout ? 'timeout' : 'failure',
            output: '',
            artifacts: [],
            statusChanges: [],
            duration,
            retries,
            error: lastError,
          };
        }

        if (attempt < this._maxRetries) {
          retries++;
          await this._sleep(this._retryBackoffMs);
          continue;
        }

        return {
          stepId: request.contextPayload.stepId,
          agentId: request.agentId,
          status: isTimeout ? 'timeout' : 'failure',
          output: '',
          artifacts: [],
          statusChanges: [],
          duration,
          retries,
          error: lastError,
        };
      }
    }

    // Should not reach here, but safety net
    return {
      stepId: request.contextPayload.stepId,
      agentId: request.agentId,
      status: 'failure',
      output: '',
      artifacts: [],
      statusChanges: [],
      duration: 0,
      retries,
      error: lastError || 'Max retries exhausted',
    };
  }

  /**
   * Determine if an error is retryable.
   *
   * @private
   * @param {string} errorMessage
   * @returns {boolean}
   */
  _isRetryable(errorMessage) {
    if (!errorMessage) return true;
    const lower = errorMessage.toLowerCase();
    return !NON_RETRYABLE_PATTERNS.some((pattern) => lower.includes(pattern));
  }

  // -------------------------------------------------------------------------
  // Spawn (AC1, AC3)
  // -------------------------------------------------------------------------

  /**
   * Call TerminalSpawner to execute the delegation.
   *
   * @private
   * @param {Object} request - DelegationRequest
   * @returns {Promise<Object>} SpawnResult from TerminalSpawner
   */
  async _spawn(request) {
    if (!this._spawner) {
      throw new Error('TerminalSpawner is not available');
    }

    const spawnOptions = {
      context: {
        story: request.contextPayload.storyFile || '',
        files: request.contextPayload.codePaths || [],
        instructions: request.command,
        metadata: {
          missionId: request.contextPayload.missionId,
          stepId: request.contextPayload.stepId,
        },
      },
      timeout: request.timeout,
      debug: process.env.AIOS_DEBUG === 'true',
    };

    // TerminalSpawner expects (agent, task, options)
    return this._spawner.spawnAgent(
      request.agentId,
      request.taskFile || request.command.replace(/^\*/, ''),
      spawnOptions,
    );
  }

  // -------------------------------------------------------------------------
  // Output Parsing (AC4)
  // -------------------------------------------------------------------------

  /**
   * Extract artifact file paths from agent output.
   * Looks for common patterns: file paths, "created:", "modified:" markers.
   *
   * @private
   * @param {string} output
   * @returns {string[]}
   */
  _extractArtifacts(output) {
    if (!output || typeof output !== 'string') return [];

    const artifacts = [];
    const lines = output.split('\n');

    for (const line of lines) {
      // Pattern: "Created: path/to/file" or "Modified: path/to/file"
      const match = line.match(/(?:created|modified|generated|wrote|updated):\s*(.+)/i);
      if (match) {
        const filePath = match[1].trim();
        if (filePath && !filePath.includes(' ')) {
          artifacts.push(filePath);
        }
      }
    }

    return [...new Set(artifacts)]; // deduplicate
  }

  // -------------------------------------------------------------------------
  // Mission Log (AC4)
  // -------------------------------------------------------------------------

  /**
   * Append a DelegationResult entry to the mission NDJSON log file.
   *
   * @private
   * @param {Object} result - DelegationResult
   * @param {Object} missionContext
   * @returns {Promise<void>}
   */
  async _appendToMissionLog(result, missionContext) {
    const missionId = missionContext.missionId;
    if (!missionId) return;

    const logEntry = {
      type: 'delegation_result',
      timestamp: new Date().toISOString(),
      stepId: result.stepId,
      agentId: result.agentId ? `@${result.agentId}` : '',
      command: result.command || '',
      status: result.status,
      artifacts: result.artifacts,
      duration: result.duration,
      retries: result.retries,
      error: result.error || undefined,
    };

    try {
      // Ensure directory exists
      if (!fs.existsSync(this._missionsDir)) {
        fs.mkdirSync(this._missionsDir, { recursive: true });
      }

      const logPath = path.join(this._missionsDir, `mission-${missionId}.ndjson`);
      await fsPromises.appendFile(logPath, JSON.stringify(logEntry) + '\n', 'utf8');
    } catch (err) {
      // Log append failure should not break delegation
      if (process.env.AIOS_DEBUG) {
        console.warn(`[DelegationBridge] Failed to append mission log: ${err.message}`);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Authority Logging
  // -------------------------------------------------------------------------

  /**
   * Log an authority redirect. Never silent.
   *
   * @private
   * @param {Object} request
   * @param {Object} authResult
   */
  _logAuthorityRedirect(request, authResult) {
    console.warn(
      `[DelegationBridge] Authority redirect: ${authResult.reason}`,
    );
    if (process.env.AIOS_DEBUG) {
      console.warn(
        `[DelegationBridge] Original request: agent=${request.agentId}, command=${request.command}`,
      );
    }
  }

  // -------------------------------------------------------------------------
  // Utilities
  // -------------------------------------------------------------------------

  /**
   * @private
   * @param {number} ms
   * @returns {Promise<void>}
   */
  _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // -------------------------------------------------------------------------
  // Accessors (for testing)
  // -------------------------------------------------------------------------

  /** @returns {Semaphore} */
  get semaphore() {
    return this._semaphore;
  }

  /** @returns {AuthorityChecker} */
  get authorityChecker() {
    return this._authority;
  }
}

// ---------------------------------------------------------------------------
// Module Exports
// ---------------------------------------------------------------------------

module.exports = {
  DelegationBridge,
  AuthorityChecker,
  Semaphore,

  // Constants exported for testing
  MAX_CONCURRENT_DELEGATIONS,
  MAX_RETRIES,
  RETRY_BACKOFF_MS,
  DEFAULT_TIMEOUT_MS,
  EXCLUSIVE_AUTHORITIES,
  NON_RETRYABLE_PATTERNS,
};
