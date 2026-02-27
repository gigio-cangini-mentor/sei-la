/**
 * JARVIS Delegation Bridge - Unit Tests
 *
 * Covers:
 * - AuthorityChecker: validates exclusive agent authorities (Constitution Art. II)
 * - Semaphore: concurrency control (max 3 simultaneous delegations)
 * - DelegationBridge.delegate(): request construction, authority enforcement, retry, output capture
 * - DelegationBridge.delegateParallel(): concurrent execution via Promise.allSettled
 * - Retry logic: retryable vs non-retryable errors, max 2 retries with backoff
 * - Timeout handling with correct status
 * - Context payload path validation
 * - Mission log NDJSON append
 * - Edge cases: invalid agent, missing spawner, null inputs
 *
 * @story 1.4
 */

'use strict';

const path = require('path');
const fs = require('fs');
const os = require('os');

// ---------------------------------------------------------------------------
// Module under test
// ---------------------------------------------------------------------------

const BRIDGE_PATH = path.resolve(
  __dirname, '..', '..', '.aios-core', 'core', 'jarvis', 'delegation-bridge',
);

const {
  DelegationBridge,
  AuthorityChecker,
  Semaphore,
  MAX_CONCURRENT_DELEGATIONS,
  MAX_RETRIES,
  RETRY_BACKOFF_MS,
  DEFAULT_TIMEOUT_MS,
  EXCLUSIVE_AUTHORITIES,
  NON_RETRYABLE_PATTERNS,
} = require(BRIDGE_PATH);

// ---------------------------------------------------------------------------
// Test Helpers
// ---------------------------------------------------------------------------

/**
 * Create a minimal plan step for testing.
 */
function makePlanStep(overrides = {}) {
  return {
    id: overrides.id || 'step-1',
    agent: overrides.agent || '@dev',
    command: overrides.command || '*develop',
    task: overrides.task || 'develop',
    taskFile: overrides.taskFile || null,
    timeout: overrides.timeout || undefined,
    inputs: overrides.inputs || {},
    ...(overrides.extra || {}),
  };
}

/**
 * Create a minimal mission context for testing.
 */
function makeMissionContext(overrides = {}) {
  return {
    missionId: overrides.missionId || 'test-mission-001',
    sessionContext: overrides.sessionContext || { branch: 'main' },
    storyFile: overrides.storyFile || undefined,
    timeout: overrides.timeout || undefined,
  };
}

/**
 * Create a mock TerminalSpawner that resolves with a configurable result.
 */
function createMockSpawner(results) {
  let callIndex = 0;
  return {
    spawnAgent: jest.fn().mockImplementation(() => {
      if (Array.isArray(results)) {
        const result = results[callIndex] || results[results.length - 1];
        callIndex++;
        if (result instanceof Error) {
          return Promise.reject(result);
        }
        return Promise.resolve(result);
      }
      if (results instanceof Error) {
        return Promise.reject(results);
      }
      return Promise.resolve(results);
    }),
  };
}

/**
 * Create a temporary directory for mission log tests.
 */
function createTempDir() {
  const tmpDir = path.join(
    os.tmpdir(),
    `delegation-bridge-test-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  );
  fs.mkdirSync(tmpDir, { recursive: true });
  return tmpDir;
}

/**
 * Cleanup a temporary directory.
 */
function cleanupTempDir(dirPath) {
  try {
    fs.rmSync(dirPath, { recursive: true, force: true });
  } catch {
    // Ignore cleanup failures
  }
}

// ---------------------------------------------------------------------------
// AuthorityChecker Tests (AC6)
// ---------------------------------------------------------------------------

describe('AuthorityChecker', () => {
  let checker;

  beforeEach(() => {
    checker = new AuthorityChecker();
  });

  describe('Exclusive Authority Enforcement', () => {
    test('blocks @dev from executing git push (devops exclusive)', () => {
      const result = checker.validate('dev', 'git push');

      expect(result.valid).toBe(false);
      expect(result.redirectTo).toBe('devops');
      expect(result.reason).toContain('Constitution Art. II');
      expect(result.reason).toContain('@devops');
    });

    test('blocks @dev from executing *push (devops exclusive)', () => {
      const result = checker.validate('dev', '*push');

      expect(result.valid).toBe(false);
      expect(result.redirectTo).toBe('devops');
    });

    test('blocks @dev from executing gh pr create (devops exclusive)', () => {
      const result = checker.validate('dev', 'gh pr create');

      expect(result.valid).toBe(false);
      expect(result.redirectTo).toBe('devops');
    });

    test('blocks @dev from executing gh pr merge (devops exclusive)', () => {
      const result = checker.validate('dev', 'gh pr merge');

      expect(result.valid).toBe(false);
      expect(result.redirectTo).toBe('devops');
    });

    test('allows @devops to execute git push', () => {
      const result = checker.validate('devops', 'git push');

      expect(result.valid).toBe(true);
      expect(result.redirectTo).toBeUndefined();
    });

    test('allows @devops to execute *push', () => {
      const result = checker.validate('devops', '*push');
      expect(result.valid).toBe(true);
    });

    test('blocks @dev from executing *draft (sm exclusive)', () => {
      const result = checker.validate('dev', '*draft');

      expect(result.valid).toBe(false);
      expect(result.redirectTo).toBe('sm');
    });

    test('allows @sm to execute *draft', () => {
      const result = checker.validate('sm', '*draft');
      expect(result.valid).toBe(true);
    });

    test('allows @sm to execute *create-story', () => {
      const result = checker.validate('sm', '*create-story');
      expect(result.valid).toBe(true);
    });

    test('blocks @dev from executing *qa-gate (qa exclusive)', () => {
      const result = checker.validate('dev', '*qa-gate');

      expect(result.valid).toBe(false);
      expect(result.redirectTo).toBe('qa');
    });

    test('allows @qa to execute *qa-gate', () => {
      const result = checker.validate('qa', '*qa-gate');
      expect(result.valid).toBe(true);
    });

    test('allows @qa to execute *qa-loop', () => {
      const result = checker.validate('qa', '*qa-loop');
      expect(result.valid).toBe(true);
    });
  });

  describe('Non-exclusive Operations', () => {
    test('allows @dev to execute *develop (no restriction)', () => {
      const result = checker.validate('dev', '*develop');
      expect(result.valid).toBe(true);
    });

    test('allows @architect to execute *analyze (no restriction)', () => {
      const result = checker.validate('architect', '*analyze');
      expect(result.valid).toBe(true);
    });

    test('allows any agent to execute generic commands', () => {
      const result = checker.validate('analyst', '*research');
      expect(result.valid).toBe(true);
    });
  });

  describe('Normalization', () => {
    test('strips @ prefix from agent ID', () => {
      const result = checker.validate('@devops', 'git push');
      expect(result.valid).toBe(true);
    });

    test('handles case-insensitive command matching', () => {
      const result = checker.validate('dev', 'Git Push');
      expect(result.valid).toBe(false);
      expect(result.redirectTo).toBe('devops');
    });

    test('handles empty agentId gracefully', () => {
      const result = checker.validate('', 'git push');
      expect(result.valid).toBe(false);
      expect(result.redirectTo).toBe('devops');
    });

    test('handles empty command gracefully', () => {
      const result = checker.validate('dev', '');
      expect(result.valid).toBe(true);
    });

    test('handles null agentId gracefully', () => {
      const result = checker.validate(null, 'git push');
      expect(result.valid).toBe(false);
    });

    test('handles null command gracefully', () => {
      const result = checker.validate('dev', null);
      expect(result.valid).toBe(true);
    });
  });

  describe('Custom Rules', () => {
    test('accepts custom authority rules', () => {
      const customChecker = new AuthorityChecker({
        '*deploy': 'devops',
        '*review': 'qa',
      });

      expect(customChecker.validate('dev', '*deploy').valid).toBe(false);
      expect(customChecker.validate('devops', '*deploy').valid).toBe(true);
      expect(customChecker.validate('dev', '*review').valid).toBe(false);
      expect(customChecker.validate('qa', '*review').valid).toBe(true);
    });
  });
});

// ---------------------------------------------------------------------------
// Semaphore Tests (AC7)
// ---------------------------------------------------------------------------

describe('Semaphore', () => {
  test('allows up to max concurrent acquisitions', async () => {
    const sem = new Semaphore(3);

    await sem.acquire();
    await sem.acquire();
    await sem.acquire();

    expect(sem.active).toBe(3);
    expect(sem.waiting).toBe(0);
  });

  test('4th acquisition waits when semaphore is at capacity', async () => {
    const sem = new Semaphore(3);

    await sem.acquire();
    await sem.acquire();
    await sem.acquire();

    let fourthResolved = false;
    const fourthPromise = sem.acquire().then(() => {
      fourthResolved = true;
    });

    // Give microtask a chance to run
    await new Promise((r) => setTimeout(r, 10));
    expect(fourthResolved).toBe(false);
    expect(sem.waiting).toBe(1);

    // Release one slot
    sem.release();
    await fourthPromise;

    expect(fourthResolved).toBe(true);
    expect(sem.active).toBe(3); // Still 3 because permit transferred
    expect(sem.waiting).toBe(0);
  });

  test('release without waiters decrements active count', () => {
    const sem = new Semaphore(3);

    // Manually set state by acquiring
    sem._current = 2;

    sem.release();
    expect(sem.active).toBe(1);
  });

  test('multiple waiters are served in FIFO order', async () => {
    const sem = new Semaphore(1);
    const order = [];

    await sem.acquire(); // slot 1 taken

    const p1 = sem.acquire().then(() => order.push('first'));
    const p2 = sem.acquire().then(() => order.push('second'));

    expect(sem.waiting).toBe(2);

    sem.release(); // wakes first
    await p1;

    sem.release(); // wakes second
    await p2;

    expect(order).toEqual(['first', 'second']);
  });

  test('active and waiting accessors return correct values', () => {
    const sem = new Semaphore(2);
    expect(sem.active).toBe(0);
    expect(sem.waiting).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// DelegationBridge - Request Construction (AC2)
// ---------------------------------------------------------------------------

describe('DelegationBridge - Request Construction', () => {
  let bridge;
  let mockSpawner;

  beforeEach(() => {
    mockSpawner = createMockSpawner({ success: true, output: '', error: null });
    bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0, // No delay in tests
    });
  });

  test('builds DelegationRequest from plan step', async () => {
    const step = makePlanStep({ agent: '@dev', command: '*develop' });
    const ctx = makeMissionContext({ missionId: 'mission-42' });

    await bridge.delegate(step, ctx);

    expect(mockSpawner.spawnAgent).toHaveBeenCalledTimes(1);
    const [agentArg, taskArg, optionsArg] = mockSpawner.spawnAgent.mock.calls[0];
    expect(agentArg).toBe('dev');
    expect(optionsArg.context.metadata.missionId).toBe('mission-42');
    expect(optionsArg.context.metadata.stepId).toBe('step-1');
  });

  test('validates story file path exists before including', async () => {
    const step = makePlanStep();
    const ctx = makeMissionContext({
      storyFile: '/nonexistent/story.md',
    });

    await bridge.delegate(step, ctx);

    const [, , optionsArg] = mockSpawner.spawnAgent.mock.calls[0];
    // Non-existent path should not be included
    expect(optionsArg.context.story).toBe('');
  });

  test('validates code paths and filters out non-existent ones', async () => {
    const step = makePlanStep({
      inputs: {
        codePaths: ['/nonexistent/path1', os.tmpdir()],
      },
    });
    const ctx = makeMissionContext();

    await bridge.delegate(step, ctx);

    const [, , optionsArg] = mockSpawner.spawnAgent.mock.calls[0];
    // Only tmpdir (existing) should be included
    expect(optionsArg.context.files).toEqual([os.tmpdir()]);
  });

  test('uses default timeout when step and context have no timeout', async () => {
    const step = makePlanStep();
    const ctx = makeMissionContext();

    await bridge.delegate(step, ctx);

    const [, , optionsArg] = mockSpawner.spawnAgent.mock.calls[0];
    expect(optionsArg.timeout).toBe(DEFAULT_TIMEOUT_MS);
  });

  test('uses step timeout over default', async () => {
    const step = makePlanStep({ timeout: 60000 });
    const ctx = makeMissionContext();

    await bridge.delegate(step, ctx);

    const [, , optionsArg] = mockSpawner.spawnAgent.mock.calls[0];
    expect(optionsArg.timeout).toBe(60000);
  });
});

// ---------------------------------------------------------------------------
// DelegationBridge - DelegationResult Schema (AC4)
// ---------------------------------------------------------------------------

describe('DelegationBridge - DelegationResult', () => {
  test('returns correct DelegationResult on success', async () => {
    const mockSpawner = createMockSpawner({
      success: true,
      output: 'Created: docs/stories/3.2.story.md\nModified: package.json',
      error: null,
    });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(
      makePlanStep({ id: 'step-2', agent: '@dev' }),
      makeMissionContext(),
    );

    expect(result.stepId).toBe('step-2');
    expect(result.agentId).toBe('dev');
    expect(result.status).toBe('success');
    expect(result.output).toContain('Created: docs/stories/3.2.story.md');
    expect(result.artifacts).toEqual(['docs/stories/3.2.story.md', 'package.json']);
    expect(result.statusChanges).toEqual([]);
    expect(typeof result.duration).toBe('number');
    expect(result.duration).toBeGreaterThanOrEqual(0);
    expect(result.retries).toBe(0);
    expect(result.error).toBeUndefined();
  });

  test('returns failure result on spawn failure', async () => {
    const mockSpawner = createMockSpawner({
      success: false,
      output: 'Something went wrong',
      error: 'validation error: missing config',
    });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('failure');
    expect(result.error).toContain('validation error');
  });

  test('extracts artifacts from output using Created/Modified patterns', async () => {
    const mockSpawner = createMockSpawner({
      success: true,
      output: [
        'Starting development...',
        'Created: src/components/button.tsx',
        'Modified: src/index.ts',
        'Generated: docs/api.md',
        'Wrote: tests/button.test.ts',
        'Updated: package.json',
        'Some random line without artifact',
      ].join('\n'),
      error: null,
    });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.artifacts).toContain('src/components/button.tsx');
    expect(result.artifacts).toContain('src/index.ts');
    expect(result.artifacts).toContain('docs/api.md');
    expect(result.artifacts).toContain('tests/button.test.ts');
    expect(result.artifacts).toContain('package.json');
    expect(result.artifacts).toHaveLength(5);
  });

  test('deduplicates artifact paths', async () => {
    const mockSpawner = createMockSpawner({
      success: true,
      output: 'Created: src/file.ts\nModified: src/file.ts',
      error: null,
    });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.artifacts).toEqual(['src/file.ts']);
  });

  test('returns empty artifacts for empty output', async () => {
    const mockSpawner = createMockSpawner({
      success: true,
      output: '',
      error: null,
    });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.artifacts).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// DelegationBridge - Authority Enforcement in delegate() (AC6)
// ---------------------------------------------------------------------------

describe('DelegationBridge - Authority Enforcement', () => {
  let bridge;
  let mockSpawner;
  let consoleWarnSpy;

  beforeEach(() => {
    mockSpawner = createMockSpawner({ success: true, output: '', error: null });
    bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  test('redirects @dev git push to @devops and logs', async () => {
    const step = makePlanStep({ agent: '@dev', command: 'git push' });
    const ctx = makeMissionContext();

    const result = await bridge.delegate(step, ctx);

    // Should redirect to devops
    expect(result.agentId).toBe('devops');

    // Should call spawner with redirected agent
    const [agentArg] = mockSpawner.spawnAgent.mock.calls[0];
    expect(agentArg).toBe('devops');

    // Should log the redirect
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Authority redirect'),
    );
  });

  test('redirects @dev *push to @devops', async () => {
    const step = makePlanStep({ agent: '@dev', command: '*push' });
    const ctx = makeMissionContext();

    await bridge.delegate(step, ctx);

    const [agentArg] = mockSpawner.spawnAgent.mock.calls[0];
    expect(agentArg).toBe('devops');
  });

  test('redirects @dev *draft to @sm', async () => {
    const step = makePlanStep({ agent: '@dev', command: '*draft' });
    const ctx = makeMissionContext();

    await bridge.delegate(step, ctx);

    const [agentArg] = mockSpawner.spawnAgent.mock.calls[0];
    expect(agentArg).toBe('sm');
  });

  test('does not redirect when agent matches authority', async () => {
    const step = makePlanStep({ agent: '@devops', command: 'git push' });
    const ctx = makeMissionContext();

    await bridge.delegate(step, ctx);

    const [agentArg] = mockSpawner.spawnAgent.mock.calls[0];
    expect(agentArg).toBe('devops');

    // No redirect warning
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  test('does not redirect for non-exclusive commands', async () => {
    const step = makePlanStep({ agent: '@dev', command: '*develop' });
    const ctx = makeMissionContext();

    await bridge.delegate(step, ctx);

    const [agentArg] = mockSpawner.spawnAgent.mock.calls[0];
    expect(agentArg).toBe('dev');
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// DelegationBridge - Retry Logic (AC5)
// ---------------------------------------------------------------------------

describe('DelegationBridge - Retry Logic', () => {
  test('retries on retryable failure and succeeds on second attempt', async () => {
    const mockSpawner = createMockSpawner([
      { success: false, output: '', error: 'network timeout error' },
      { success: true, output: 'Done', error: null },
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('success');
    expect(result.retries).toBe(1);
    expect(mockSpawner.spawnAgent).toHaveBeenCalledTimes(2);
  });

  test('retries up to maxRetries (2) then fails', async () => {
    const mockSpawner = createMockSpawner([
      { success: false, output: '', error: 'spawn error' },
      { success: false, output: '', error: 'spawn error' },
      { success: false, output: '', error: 'spawn error' },
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
      maxRetries: 2,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('failure');
    expect(result.retries).toBe(2);
    // 1 initial + 2 retries = 3 total calls
    expect(mockSpawner.spawnAgent).toHaveBeenCalledTimes(3);
  });

  test('does NOT retry non-retryable errors (authority violation)', async () => {
    const mockSpawner = createMockSpawner([
      { success: false, output: '', error: 'authority violation: forbidden' },
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('failure');
    expect(result.retries).toBe(0);
    expect(mockSpawner.spawnAgent).toHaveBeenCalledTimes(1);
  });

  test('does NOT retry validation errors', async () => {
    const mockSpawner = createMockSpawner([
      { success: false, output: '', error: 'validation error: missing field' },
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('failure');
    expect(result.retries).toBe(0);
    expect(mockSpawner.spawnAgent).toHaveBeenCalledTimes(1);
  });

  test('does NOT retry permission denied errors', async () => {
    const mockSpawner = createMockSpawner([
      { success: false, output: '', error: 'permission denied' },
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('failure');
    expect(result.retries).toBe(0);
    expect(mockSpawner.spawnAgent).toHaveBeenCalledTimes(1);
  });

  test('retries on thrown Error (network/spawn failure)', async () => {
    const mockSpawner = createMockSpawner([
      new Error('Connection reset'),
      { success: true, output: 'OK', error: null },
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('success');
    expect(result.retries).toBe(1);
    expect(mockSpawner.spawnAgent).toHaveBeenCalledTimes(2);
  });

  test('does NOT retry thrown non-retryable Error', async () => {
    const mockSpawner = createMockSpawner([
      new Error('invalid agent: nonexistent'),
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('failure');
    expect(result.retries).toBe(0);
    expect(mockSpawner.spawnAgent).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// DelegationBridge - Timeout Handling (AC5)
// ---------------------------------------------------------------------------

describe('DelegationBridge - Timeout Handling', () => {
  test('returns timeout status for timeout errors', async () => {
    const mockSpawner = createMockSpawner([
      new Error('Operation timeout exceeded'),
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
      maxRetries: 0, // No retries for cleaner test
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('timeout');
    expect(result.error).toContain('timeout');
  });

  test('retries timeout errors (they are retryable)', async () => {
    const mockSpawner = createMockSpawner([
      new Error('Delegation timeout'),
      { success: true, output: 'Recovered', error: null },
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('success');
    expect(result.retries).toBe(1);
  });

  test('returns timeout status after exhausting retries on timeout', async () => {
    const mockSpawner = createMockSpawner([
      new Error('timeout'),
      new Error('timeout'),
      new Error('timeout'),
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
      maxRetries: 2,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('timeout');
    expect(result.retries).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// DelegationBridge - Concurrent Delegation (AC7)
// ---------------------------------------------------------------------------

describe('DelegationBridge - Concurrent Delegation', () => {
  test('respects semaphore: max 3 concurrent, 4th waits', async () => {
    let activeCount = 0;
    let maxActive = 0;

    const slowSpawner = {
      spawnAgent: jest.fn().mockImplementation(() => {
        activeCount++;
        maxActive = Math.max(maxActive, activeCount);
        return new Promise((resolve) => {
          setTimeout(() => {
            activeCount--;
            resolve({ success: true, output: '', error: null });
          }, 50);
        });
      }),
    };

    const bridge = new DelegationBridge({
      terminalSpawner: slowSpawner,
      missionsDir: os.tmpdir(),
      maxConcurrent: 3,
      retryBackoffMs: 0,
    });

    const steps = [
      makePlanStep({ id: 'step-1', agent: '@dev' }),
      makePlanStep({ id: 'step-2', agent: '@qa' }),
      makePlanStep({ id: 'step-3', agent: '@sm' }),
      makePlanStep({ id: 'step-4', agent: '@architect' }),
      makePlanStep({ id: 'step-5', agent: '@analyst' }),
    ];

    const results = await bridge.delegateParallel(steps, makeMissionContext());

    expect(results).toHaveLength(5);
    expect(results.every((r) => r.status === 'success')).toBe(true);
    expect(maxActive).toBeLessThanOrEqual(3);
  });

  test('delegateParallel returns results for all steps even if some fail', async () => {
    let callCount = 0;
    const mixedSpawner = {
      spawnAgent: jest.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 2) {
          return Promise.resolve({ success: false, output: '', error: 'fail' });
        }
        return Promise.resolve({ success: true, output: '', error: null });
      }),
    };

    const bridge = new DelegationBridge({
      terminalSpawner: mixedSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
      maxRetries: 0, // Skip retries for this test
    });

    const steps = [
      makePlanStep({ id: 'step-1', agent: '@dev' }),
      makePlanStep({ id: 'step-2', agent: '@qa' }),
      makePlanStep({ id: 'step-3', agent: '@sm' }),
    ];

    const results = await bridge.delegateParallel(steps, makeMissionContext());

    expect(results).toHaveLength(3);
    // step-2 should fail, others succeed
    const failedResults = results.filter((r) => r.status === 'failure');
    const successResults = results.filter((r) => r.status === 'success');
    expect(failedResults.length).toBe(1);
    expect(successResults.length).toBe(2);
  });

  test('delegateParallel handles rejected promises gracefully', async () => {
    const throwSpawner = {
      spawnAgent: jest.fn().mockRejectedValue(new Error('fatal crash')),
    };

    const bridge = new DelegationBridge({
      terminalSpawner: throwSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
      maxRetries: 0,
    });

    const steps = [
      makePlanStep({ id: 'step-1', agent: '@dev' }),
    ];

    // Should not throw -- delegateParallel uses allSettled internally
    const results = await bridge.delegateParallel(steps, makeMissionContext());

    expect(results).toHaveLength(1);
    expect(results[0].status).toBe('failure');
    expect(results[0].error).toContain('fatal crash');
  });

  test('semaphore accessor returns correct instance', () => {
    const bridge = new DelegationBridge({
      terminalSpawner: { spawnAgent: jest.fn() },
      maxConcurrent: 5,
    });

    expect(bridge.semaphore).toBeInstanceOf(Semaphore);
    expect(bridge.semaphore._max).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// DelegationBridge - Mission Log (AC4)
// ---------------------------------------------------------------------------

describe('DelegationBridge - Mission Log', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = createTempDir();
  });

  afterEach(() => {
    cleanupTempDir(tmpDir);
  });

  test('appends NDJSON entry to mission log', async () => {
    const mockSpawner = createMockSpawner({ success: true, output: '', error: null });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: tmpDir,
      retryBackoffMs: 0,
    });

    await bridge.delegate(
      makePlanStep({ id: 'step-1' }),
      makeMissionContext({ missionId: 'mission-log-test' }),
    );

    const logPath = path.join(tmpDir, 'mission-mission-log-test.ndjson');
    expect(fs.existsSync(logPath)).toBe(true);

    const content = fs.readFileSync(logPath, 'utf8').trim();
    const entry = JSON.parse(content);

    expect(entry.type).toBe('delegation_result');
    expect(entry.stepId).toBe('step-1');
    expect(entry.status).toBe('success');
    expect(entry.timestamp).toBeDefined();
    expect(typeof entry.duration).toBe('number');
  });

  test('appends multiple entries to same mission log', async () => {
    const mockSpawner = createMockSpawner({ success: true, output: '', error: null });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: tmpDir,
      retryBackoffMs: 0,
    });

    const ctx = makeMissionContext({ missionId: 'multi-entry' });

    await bridge.delegate(makePlanStep({ id: 'step-1' }), ctx);
    await bridge.delegate(makePlanStep({ id: 'step-2' }), ctx);

    const logPath = path.join(tmpDir, 'mission-multi-entry.ndjson');
    const lines = fs.readFileSync(logPath, 'utf8').trim().split('\n');

    expect(lines).toHaveLength(2);

    const entry1 = JSON.parse(lines[0]);
    const entry2 = JSON.parse(lines[1]);
    expect(entry1.stepId).toBe('step-1');
    expect(entry2.stepId).toBe('step-2');
  });

  test('skips log append when missionId is missing', async () => {
    const mockSpawner = createMockSpawner({ success: true, output: '', error: null });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: tmpDir,
      retryBackoffMs: 0,
    });

    await bridge.delegate(makePlanStep(), { sessionContext: {} });

    // No log files should be created
    const files = fs.readdirSync(tmpDir);
    const ndjsonFiles = files.filter((f) => f.endsWith('.ndjson'));
    expect(ndjsonFiles).toHaveLength(0);
  });

  test('creates missions directory if it does not exist', async () => {
    const nestedDir = path.join(tmpDir, 'nested', 'deep', 'missions');
    const mockSpawner = createMockSpawner({ success: true, output: '', error: null });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: nestedDir,
      retryBackoffMs: 0,
    });

    await bridge.delegate(
      makePlanStep(),
      makeMissionContext({ missionId: 'nested-test' }),
    );

    const logPath = path.join(nestedDir, 'mission-nested-test.ndjson');
    expect(fs.existsSync(logPath)).toBe(true);
  });

  test('log append failure does not break delegation', async () => {
    const mockSpawner = createMockSpawner({ success: true, output: 'ok', error: null });

    // Use an invalid path to force log write failure
    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: '/\0invalid/path', // Invalid path
      retryBackoffMs: 0,
    });

    // Should not throw
    const result = await bridge.delegate(
      makePlanStep(),
      makeMissionContext({ missionId: 'fail-log' }),
    );

    expect(result.status).toBe('success');
  });
});

// ---------------------------------------------------------------------------
// DelegationBridge - Edge Cases
// ---------------------------------------------------------------------------

describe('DelegationBridge - Edge Cases', () => {
  test('fails when spawner is explicitly unavailable', async () => {
    // Create a bridge and forcefully null out the spawner after construction
    // to bypass the lazy-load fallback
    const bridge = new DelegationBridge({
      terminalSpawner: { spawnAgent: jest.fn() },
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
      maxRetries: 0,
    });
    // Simulate spawner becoming unavailable
    bridge._spawner = null;

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('failure');
    expect(result.error).toContain('TerminalSpawner is not available');
  });

  test('handles plan step with missing agent gracefully', async () => {
    const mockSpawner = createMockSpawner({ success: true, output: '', error: null });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    // Pass an agent with no value (empty after stripping @)
    const step = { id: 'step-1', agent: '', command: '*develop', task: 'develop', inputs: {} };
    const result = await bridge.delegate(step, makeMissionContext());

    expect(result.status).toBe('success');
    // Agent should be empty string since we passed empty
    expect(result.agentId).toBe('');
    // Spawner should still be called with empty agent
    expect(mockSpawner.spawnAgent).toHaveBeenCalledWith('', expect.any(String), expect.any(Object));
  });

  test('handles plan step with no command gracefully', async () => {
    const mockSpawner = createMockSpawner({ success: true, output: '', error: null });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const step = makePlanStep({ command: '', task: '' });
    const result = await bridge.delegate(step, makeMissionContext());

    expect(result.status).toBe('success');
  });

  test('handles empty mission context', async () => {
    const mockSpawner = createMockSpawner({ success: true, output: '', error: null });

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
    });

    const result = await bridge.delegate(makePlanStep(), {});

    expect(result.status).toBe('success');
  });

  test('authorityChecker accessor returns AuthorityChecker instance', () => {
    const bridge = new DelegationBridge({
      terminalSpawner: { spawnAgent: jest.fn() },
    });

    expect(bridge.authorityChecker).toBeInstanceOf(AuthorityChecker);
  });

  test('default maxConcurrent is MAX_CONCURRENT_DELEGATIONS constant', () => {
    const bridge = new DelegationBridge({
      terminalSpawner: { spawnAgent: jest.fn() },
    });

    expect(bridge.semaphore._max).toBe(MAX_CONCURRENT_DELEGATIONS);
    expect(MAX_CONCURRENT_DELEGATIONS).toBe(3);
  });

  test('default maxRetries is MAX_RETRIES constant', () => {
    expect(MAX_RETRIES).toBe(2);
  });

  test('RETRY_BACKOFF_MS is 5000', () => {
    expect(RETRY_BACKOFF_MS).toBe(5000);
  });

  test('DEFAULT_TIMEOUT_MS is 300000 (5 minutes)', () => {
    expect(DEFAULT_TIMEOUT_MS).toBe(300000);
  });

  test('EXCLUSIVE_AUTHORITIES contains required devops rules', () => {
    expect(EXCLUSIVE_AUTHORITIES['git push']).toBe('devops');
    expect(EXCLUSIVE_AUTHORITIES['*push']).toBe('devops');
    expect(EXCLUSIVE_AUTHORITIES['gh pr create']).toBe('devops');
    expect(EXCLUSIVE_AUTHORITIES['gh pr merge']).toBe('devops');
  });

  test('EXCLUSIVE_AUTHORITIES contains required sm rules', () => {
    expect(EXCLUSIVE_AUTHORITIES['*draft']).toBe('sm');
    expect(EXCLUSIVE_AUTHORITIES['*create-story']).toBe('sm');
  });

  test('EXCLUSIVE_AUTHORITIES contains required qa rules', () => {
    expect(EXCLUSIVE_AUTHORITIES['*qa-gate']).toBe('qa');
    expect(EXCLUSIVE_AUTHORITIES['*qa-loop']).toBe('qa');
  });

  test('NON_RETRYABLE_PATTERNS includes authority and validation', () => {
    expect(NON_RETRYABLE_PATTERNS).toContain('authority violation');
    expect(NON_RETRYABLE_PATTERNS).toContain('validation error');
    expect(NON_RETRYABLE_PATTERNS).toContain('invalid agent');
    expect(NON_RETRYABLE_PATTERNS).toContain('permission denied');
  });
});

// ---------------------------------------------------------------------------
// DelegationBridge - Custom Options
// ---------------------------------------------------------------------------

describe('DelegationBridge - Custom Options', () => {
  test('respects custom maxRetries option', async () => {
    const mockSpawner = createMockSpawner([
      { success: false, output: '', error: 'network error' },
      { success: false, output: '', error: 'network error' },
      { success: false, output: '', error: 'network error' },
      { success: false, output: '', error: 'network error' },
      { success: true, output: 'ok', error: null },
    ]);

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
      maxRetries: 4,
    });

    const result = await bridge.delegate(makePlanStep(), makeMissionContext());

    expect(result.status).toBe('success');
    expect(result.retries).toBe(4);
    expect(mockSpawner.spawnAgent).toHaveBeenCalledTimes(5);
  });

  test('respects custom maxConcurrent option', async () => {
    let activeCount = 0;
    let maxActive = 0;

    const slowSpawner = {
      spawnAgent: jest.fn().mockImplementation(() => {
        activeCount++;
        maxActive = Math.max(maxActive, activeCount);
        return new Promise((resolve) => {
          setTimeout(() => {
            activeCount--;
            resolve({ success: true, output: '', error: null });
          }, 30);
        });
      }),
    };

    const bridge = new DelegationBridge({
      terminalSpawner: slowSpawner,
      missionsDir: os.tmpdir(),
      maxConcurrent: 1,
      retryBackoffMs: 0,
    });

    const steps = [
      makePlanStep({ id: 'step-1' }),
      makePlanStep({ id: 'step-2' }),
      makePlanStep({ id: 'step-3' }),
    ];

    await bridge.delegateParallel(steps, makeMissionContext());

    expect(maxActive).toBe(1);
  });

  test('respects custom authorityRules option', async () => {
    const mockSpawner = createMockSpawner({ success: true, output: '', error: null });
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const bridge = new DelegationBridge({
      terminalSpawner: mockSpawner,
      missionsDir: os.tmpdir(),
      retryBackoffMs: 0,
      authorityRules: {
        '*deploy': 'devops',
      },
    });

    const step = makePlanStep({ agent: '@dev', command: '*deploy' });
    await bridge.delegate(step, makeMissionContext());

    const [agentArg] = mockSpawner.spawnAgent.mock.calls[0];
    expect(agentArg).toBe('devops');

    consoleWarnSpy.mockRestore();
  });
});
