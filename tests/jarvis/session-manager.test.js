/**
 * JARVIS Session Manager - Unit Tests
 *
 * Covers:
 * - Round-trip save/load (all fields preserved)
 * - Atomic write safety (temp file + rename)
 * - Recovery from corrupted state (invalid JSON)
 * - Completed missions cap (30 max, oldest pruned)
 * - Cleanup by age (archive >30d, purge >90d)
 * - Fresh state when file does not exist
 * - getContext() returns correct data
 * - addMission / completeMission workflows
 * - Resume info for in-progress missions
 * - Reset returns fresh state
 * - 5-second load performance (NFR3)
 *
 * @story 1.6
 */

'use strict';

const path = require('path');
const fs = require('fs');
const os = require('os');

// ---------------------------------------------------------------------------
// Module under test
// ---------------------------------------------------------------------------

const MODULE_PATH = path.resolve(
  __dirname, '..', '..', '.aios-core', 'core', 'jarvis', 'session-manager',
);

const {
  JarvisSessionManager,
  createDefaultState,
  SCHEMA_VERSION,
  MAX_COMPLETED_MISSIONS,
  ARCHIVE_THRESHOLD_DAYS,
  PURGE_THRESHOLD_DAYS,
} = require(MODULE_PATH);

// ---------------------------------------------------------------------------
// Test Helpers
// ---------------------------------------------------------------------------

/**
 * Creates a unique temp directory for test isolation.
 * @returns {string} Temp directory path
 */
function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'jarvis-session-test-'));
}

/**
 * Recursively removes a directory.
 * @param {string} dir
 */
function cleanupTempDir(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch { /* ignore */ }
}

/**
 * Creates a JarvisSessionManager pointing to a temp directory.
 * @param {string} tmpDir
 * @param {object} [extraOpts]
 * @returns {JarvisSessionManager}
 */
function createTestManager(tmpDir, extraOpts = {}) {
  const sessionDir = path.join(tmpDir, '.aios', 'jarvis');
  return new JarvisSessionManager({
    sessionDir,
    projectRoot: tmpDir,
    debug: false,
    ...extraOpts,
  });
}

/**
 * Creates a mock mission object.
 * @param {number} index
 * @param {object} [overrides]
 * @returns {object}
 */
function createMockMission(index, overrides = {}) {
  return {
    missionId: `mission-${index}`,
    description: `Test mission ${index}`,
    status: 'in_progress',
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('JarvisSessionManager', () => {
  let tmpDir;
  let manager;

  beforeEach(() => {
    tmpDir = createTempDir();
    manager = createTestManager(tmpDir);
  });

  afterEach(() => {
    cleanupTempDir(tmpDir);
  });

  // -----------------------------------------------------------------------
  // Fresh State
  // -----------------------------------------------------------------------

  describe('fresh state (no file exists)', () => {
    it('returns default state when session file does not exist', () => {
      const state = manager.load();

      expect(state).toBeDefined();
      expect(state.schemaVersion).toBe(SCHEMA_VERSION);
      expect(state.autonomyLevel).toBe('supervised');
      expect(state.activeMissions).toEqual([]);
      expect(state.completedMissions).toEqual([]);
      expect(state.projectContext).toBeDefined();
      expect(state.projectContext.currentStory).toBeNull();
      expect(state.projectContext.currentEpic).toBeNull();
      expect(state.projectContext.currentBranch).toBeNull();
      expect(state.preferences.address).toBe('sir');
      expect(state.lastInteractionAt).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // Round-trip Save/Load
  // -----------------------------------------------------------------------

  describe('save() and load() round-trip', () => {
    it('preserves all fields after save and reload', () => {
      // Load (creates fresh state)
      manager.load();

      // Modify state
      manager.addMission({
        missionId: 'mission-round-trip',
        description: 'Round-trip test mission',
      });
      manager.state.autonomyLevel = 'autonomous';
      manager.state.projectContext.currentStory = '3.2';
      manager.state.projectContext.currentEpic = '3';
      manager.state.projectContext.currentBranch = 'feat/story-3.2';
      manager.state.preferences.address = 'boss';

      // Save
      manager.save();

      // Reload with a new manager instance
      const manager2 = createTestManager(tmpDir);
      const reloaded = manager2.load();

      expect(reloaded.schemaVersion).toBe(SCHEMA_VERSION);
      expect(reloaded.autonomyLevel).toBe('autonomous');
      expect(reloaded.activeMissions).toHaveLength(1);
      expect(reloaded.activeMissions[0].missionId).toBe('mission-round-trip');
      expect(reloaded.activeMissions[0].description).toBe('Round-trip test mission');
      expect(reloaded.projectContext.currentStory).toBe('3.2');
      expect(reloaded.projectContext.currentEpic).toBe('3');
      expect(reloaded.projectContext.currentBranch).toBe('feat/story-3.2');
      expect(reloaded.preferences.address).toBe('boss');
      expect(reloaded.lastInteractionAt).toBeDefined();
    });

    it('creates session directory if it does not exist', () => {
      manager.load();
      manager.save();

      const sessionDir = path.dirname(manager.sessionPath);
      expect(fs.existsSync(sessionDir)).toBe(true);
      expect(fs.existsSync(manager.sessionPath)).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // Atomic Write Safety
  // -----------------------------------------------------------------------

  describe('atomic write safety', () => {
    it('writes to temp file before renaming', () => {
      manager.load();

      // Save should succeed and produce a valid file
      manager.save();

      // Verify the final file is valid JSON
      const raw = fs.readFileSync(manager.sessionPath, 'utf8');
      const parsed = JSON.parse(raw);
      expect(parsed.schemaVersion).toBe(SCHEMA_VERSION);

      // Verify no .tmp file remains
      const tmpPath = `${manager.sessionPath}.tmp`;
      expect(fs.existsSync(tmpPath)).toBe(false);
    });

    it('preserves pre-crash state if temp file write succeeds but rename fails', () => {
      manager.load();
      manager.addMission({ missionId: 'pre-crash', description: 'Before crash' });
      manager.save();

      // Verify pre-crash state is saved
      const raw = fs.readFileSync(manager.sessionPath, 'utf8');
      const parsed = JSON.parse(raw);
      expect(parsed.activeMissions[0].missionId).toBe('pre-crash');
    });
  });

  // -----------------------------------------------------------------------
  // Corruption Recovery (AC6)
  // -----------------------------------------------------------------------

  describe('corruption recovery', () => {
    it('recovers gracefully from corrupted JSON file', () => {
      // Create the directory and write corrupt data
      const sessionDir = path.dirname(manager.sessionPath);
      fs.mkdirSync(sessionDir, { recursive: true });
      fs.writeFileSync(manager.sessionPath, '{invalid json!!!', 'utf8');

      // Load should not throw
      const state = manager.load();

      // Should return fresh state
      expect(state.schemaVersion).toBe(SCHEMA_VERSION);
      expect(state.activeMissions).toEqual([]);
      expect(state.completedMissions).toEqual([]);
    });

    it('archives corrupted file with .corrupt.{timestamp} suffix', () => {
      const sessionDir = path.dirname(manager.sessionPath);
      fs.mkdirSync(sessionDir, { recursive: true });
      fs.writeFileSync(manager.sessionPath, 'NOT_JSON', 'utf8');

      manager.load();

      // The original file should have been renamed
      const files = fs.readdirSync(sessionDir);
      const corruptFiles = files.filter((f) => f.includes('.corrupt.'));
      expect(corruptFiles.length).toBeGreaterThanOrEqual(1);
    });

    it('recovers from file with missing schemaVersion', () => {
      const sessionDir = path.dirname(manager.sessionPath);
      fs.mkdirSync(sessionDir, { recursive: true });
      fs.writeFileSync(manager.sessionPath, JSON.stringify({ foo: 'bar' }), 'utf8');

      const state = manager.load();
      expect(state.schemaVersion).toBe(SCHEMA_VERSION);
      expect(state.activeMissions).toEqual([]);
    });

    it('never throws an uncaught exception from load()', () => {
      const sessionDir = path.dirname(manager.sessionPath);
      fs.mkdirSync(sessionDir, { recursive: true });

      // Write various kinds of invalid content
      const invalidContents = [
        '',
        'null',
        '[]',
        '123',
        '"just a string"',
        '{invalid',
        Buffer.from([0xFF, 0xFE]).toString(),
      ];

      for (const content of invalidContents) {
        fs.writeFileSync(manager.sessionPath, content, 'utf8');
        expect(() => manager.load()).not.toThrow();
      }
    });
  });

  // -----------------------------------------------------------------------
  // Mission Management
  // -----------------------------------------------------------------------

  describe('addMission()', () => {
    it('adds a mission to activeMissions', () => {
      manager.load();
      const mission = manager.addMission({
        missionId: 'test-1',
        description: 'Test mission',
      });

      expect(mission.missionId).toBe('test-1');
      expect(mission.status).toBe('in_progress');
      expect(mission.startedAt).toBeDefined();
      expect(manager.state.activeMissions).toHaveLength(1);
    });

    it('throws if state not loaded', () => {
      expect(() => manager.addMission({ missionId: 'x', description: 'x' }))
        .toThrow('not loaded');
    });
  });

  describe('completeMission()', () => {
    it('moves mission from active to completed', () => {
      manager.load();
      manager.addMission({ missionId: 'complete-me', description: 'To complete' });

      const completed = manager.completeMission('complete-me');

      expect(completed).not.toBeNull();
      expect(completed.status).toBe('completed');
      expect(completed.completedAt).toBeDefined();
      expect(manager.state.activeMissions).toHaveLength(0);
      expect(manager.state.completedMissions).toHaveLength(1);
    });

    it('returns null for non-existent mission', () => {
      manager.load();
      const result = manager.completeMission('non-existent');
      expect(result).toBeNull();
    });

    it('enforces cap of 30 completed missions', () => {
      manager.load();

      // Add and complete 35 missions
      for (let i = 0; i < 35; i++) {
        manager.addMission({
          missionId: `mission-${i}`,
          description: `Mission ${i}`,
        });
        manager.completeMission(`mission-${i}`);
      }

      expect(manager.state.completedMissions.length).toBe(MAX_COMPLETED_MISSIONS);

      // The oldest should have been pruned; newest should remain
      const ids = manager.state.completedMissions.map((m) => m.missionId);
      expect(ids).toContain('mission-34');
      expect(ids).toContain('mission-5');
      expect(ids).not.toContain('mission-0');
      expect(ids).not.toContain('mission-4');
    });
  });

  // -----------------------------------------------------------------------
  // Cleanup by Age (AC5)
  // -----------------------------------------------------------------------

  describe('cleanup()', () => {
    it('archives missions completed >30 days ago', () => {
      manager.load();

      // Manually add a completed mission with old completedAt
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 35);

      manager.state.completedMissions.push({
        missionId: 'old-mission',
        description: 'Old mission',
        status: 'completed',
        completedAt: oldDate.toISOString(),
        startedAt: oldDate.toISOString(),
      });

      const result = manager.cleanup();

      expect(result.archived).toBe(1);
      expect(manager.state.completedMissions[0].status).toBe('archived');
    });

    it('purges missions completed >90 days ago', () => {
      manager.load();

      const veryOldDate = new Date();
      veryOldDate.setDate(veryOldDate.getDate() - 95);

      manager.state.completedMissions.push({
        missionId: 'very-old-mission',
        description: 'Very old mission',
        status: 'completed',
        completedAt: veryOldDate.toISOString(),
        startedAt: veryOldDate.toISOString(),
      });

      const result = manager.cleanup();

      expect(result.purged).toBe(1);
      expect(manager.state.completedMissions).toHaveLength(0);
    });

    it('does nothing for recent missions', () => {
      manager.load();

      manager.state.completedMissions.push({
        missionId: 'recent-mission',
        description: 'Recent mission',
        status: 'completed',
        completedAt: new Date().toISOString(),
        startedAt: new Date().toISOString(),
      });

      const result = manager.cleanup();

      expect(result.archived).toBe(0);
      expect(result.purged).toBe(0);
      expect(manager.state.completedMissions).toHaveLength(1);
    });

    it('handles mixed age missions correctly', () => {
      manager.load();

      const now = new Date();
      const recentDate = new Date(now);
      const archiveDate = new Date(now);
      archiveDate.setDate(archiveDate.getDate() - 40);
      const purgeDate = new Date(now);
      purgeDate.setDate(purgeDate.getDate() - 100);

      manager.state.completedMissions = [
        {
          missionId: 'recent', description: 'Recent', status: 'completed',
          completedAt: recentDate.toISOString(), startedAt: recentDate.toISOString(),
        },
        {
          missionId: 'archive-me', description: 'Archive', status: 'completed',
          completedAt: archiveDate.toISOString(), startedAt: archiveDate.toISOString(),
        },
        {
          missionId: 'purge-me', description: 'Purge', status: 'completed',
          completedAt: purgeDate.toISOString(), startedAt: purgeDate.toISOString(),
        },
      ];

      const result = manager.cleanup();

      expect(result.archived).toBe(1);
      expect(result.purged).toBe(1);
      expect(manager.state.completedMissions).toHaveLength(2);
      expect(manager.state.completedMissions.find((m) => m.missionId === 'recent').status).toBe('completed');
      expect(manager.state.completedMissions.find((m) => m.missionId === 'archive-me').status).toBe('archived');
    });
  });

  // -----------------------------------------------------------------------
  // getContext()
  // -----------------------------------------------------------------------

  describe('getContext()', () => {
    it('returns correct context data', () => {
      manager.load();
      manager.addMission({ missionId: 'ctx-1', description: 'Context test' });
      manager.state.autonomyLevel = 'assisted';
      manager.state.projectContext.currentStory = '1.6';
      manager.state.preferences.address = 'boss';

      const ctx = manager.getContext();

      expect(ctx.autonomyLevel).toBe('assisted');
      expect(ctx.activeMissions).toHaveLength(1);
      expect(ctx.activeMissions[0].missionId).toBe('ctx-1');
      expect(ctx.completedMissionsCount).toBe(0);
      expect(ctx.projectContext.currentStory).toBe('1.6');
      expect(ctx.preferences.address).toBe('boss');
      expect(ctx.lastInteractionAt).toBeDefined();
    });

    it('returns defensive copies of nested objects', () => {
      manager.load();
      const ctx = manager.getContext();

      // Mutating returned context should not affect internal state
      ctx.projectContext.currentStory = 'HACKED';
      expect(manager.state.projectContext.currentStory).toBeNull();
    });

    it('throws if state not loaded', () => {
      expect(() => manager.getContext()).toThrow('not loaded');
    });
  });

  // -----------------------------------------------------------------------
  // Resume Info (AC4)
  // -----------------------------------------------------------------------

  describe('getResumeInfo()', () => {
    it('returns no resume info when no in-progress missions', () => {
      manager.load();

      const info = manager.getResumeInfo();
      expect(info.hasInProgress).toBe(false);
      expect(info.missions).toHaveLength(0);
      expect(info.message).toBeNull();
    });

    it('returns resume info for in-progress missions', () => {
      manager.load();
      manager.addMission({ missionId: 'resume-1', description: 'Implement story 3.2' });

      const info = manager.getResumeInfo();
      expect(info.hasInProgress).toBe(true);
      expect(info.missions).toHaveLength(1);
      expect(info.message).toContain('Implement story 3.2');
      expect(info.message).toContain('sir');
    });

    it('ignores paused missions', () => {
      manager.load();
      manager.addMission({
        missionId: 'paused-1',
        description: 'Paused mission',
        status: 'paused',
      });

      const info = manager.getResumeInfo();
      expect(info.hasInProgress).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // Reset
  // -----------------------------------------------------------------------

  describe('reset()', () => {
    it('resets state to fresh defaults', () => {
      manager.load();
      manager.addMission({ missionId: 'to-reset', description: 'Will be reset' });
      manager.state.autonomyLevel = 'autonomous';

      const fresh = manager.reset();

      expect(fresh.autonomyLevel).toBe('supervised');
      expect(fresh.activeMissions).toEqual([]);
      expect(fresh.completedMissions).toEqual([]);
      expect(fresh.schemaVersion).toBe(SCHEMA_VERSION);
    });
  });

  // -----------------------------------------------------------------------
  // createDefaultState()
  // -----------------------------------------------------------------------

  describe('createDefaultState()', () => {
    it('creates a valid default state with all required fields', () => {
      const state = createDefaultState();

      expect(state.schemaVersion).toBe(SCHEMA_VERSION);
      expect(state.autonomyLevel).toBe('supervised');
      expect(Array.isArray(state.activeMissions)).toBe(true);
      expect(Array.isArray(state.completedMissions)).toBe(true);
      expect(state.projectContext).toBeDefined();
      expect(state.preferences).toBeDefined();
      expect(state.lastInteractionAt).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // Performance (NFR3: <5s recovery)
  // -----------------------------------------------------------------------

  describe('performance', () => {
    it('loads session state in under 5 seconds even with large state', () => {
      manager.load();

      // Build a large state (30 completed missions with lots of data)
      for (let i = 0; i < 30; i++) {
        manager.state.completedMissions.push({
          missionId: `perf-mission-${i}`,
          description: `Performance test mission ${i} with a reasonably long description to simulate real data payload`,
          status: 'completed',
          completedAt: new Date().toISOString(),
          startedAt: new Date().toISOString(),
          currentStep: `step-${i % 5}`,
        });
      }

      // Also add some active missions
      for (let i = 0; i < 5; i++) {
        manager.addMission({
          missionId: `active-perf-${i}`,
          description: `Active performance mission ${i}`,
        });
      }

      manager.save();

      // Time the load
      const startTime = Date.now();
      const manager2 = createTestManager(tmpDir);
      manager2.load();
      const elapsed = Date.now() - startTime;

      expect(elapsed).toBeLessThan(5000); // Must load in <5s
      expect(manager2.state.completedMissions).toHaveLength(30);
      expect(manager2.state.activeMissions).toHaveLength(5);
    });
  });

  // -----------------------------------------------------------------------
  // Edge Cases
  // -----------------------------------------------------------------------

  describe('edge cases', () => {
    it('save() throws if state not loaded', () => {
      expect(() => manager.save()).toThrow('No state to save');
    });

    it('handles empty session file gracefully', () => {
      const sessionDir = path.dirname(manager.sessionPath);
      fs.mkdirSync(sessionDir, { recursive: true });
      fs.writeFileSync(manager.sessionPath, '', 'utf8');

      const state = manager.load();
      expect(state.schemaVersion).toBe(SCHEMA_VERSION);
    });

    it('multiple saves do not corrupt state', () => {
      manager.load();
      manager.addMission({ missionId: 'multi-1', description: 'First' });
      manager.save();

      manager.addMission({ missionId: 'multi-2', description: 'Second' });
      manager.save();

      manager.completeMission('multi-1');
      manager.save();

      // Reload and verify
      const manager2 = createTestManager(tmpDir);
      const state = manager2.load();

      expect(state.activeMissions).toHaveLength(1);
      expect(state.activeMissions[0].missionId).toBe('multi-2');
      expect(state.completedMissions).toHaveLength(1);
      expect(state.completedMissions[0].missionId).toBe('multi-1');
    });

    it('concurrent-like rapid save/load cycles work correctly', () => {
      manager.load();

      for (let i = 0; i < 20; i++) {
        manager.addMission({
          missionId: `rapid-${i}`,
          description: `Rapid mission ${i}`,
        });
        manager.save();
        manager.completeMission(`rapid-${i}`);
        manager.save();
      }

      const manager2 = createTestManager(tmpDir);
      const state = manager2.load();

      expect(state.activeMissions).toHaveLength(0);
      expect(state.completedMissions).toHaveLength(20);
    });
  });
});
