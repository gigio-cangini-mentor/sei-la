/**
 * JARVIS Core API Tests
 * Tests for: processTextCommand, session management, module status,
 *            autonomy mode changes, and agent listing.
 *
 * @wave 2.1
 */

'use strict';

const path = require('path');

// Module under test path
const API_PATH = path.resolve(
  __dirname,
  '..',
  '..',
  '.aios-core',
  'core',
  'jarvis',
  'jarvis-api',
);

// ---------------------------------------------------------------------------
// Mocks — mock the downstream JARVIS modules
// ---------------------------------------------------------------------------

jest.mock('../../.aios-core/core/jarvis/intent-engine', () => {
  class IntentEngine {
    loadPatterns() {}
    async classify(text) {
      if (text.includes('unknown')) {
        return { intent: 'unknown', ambiguous: false, confidence: 0.1 };
      }
      if (text.includes('ambiguous')) {
        return { intent: 'ambiguous', ambiguous: true, disambiguation: ['option1', 'option2'], confidence: 0.4 };
      }
      return {
        intent: 'implement_story',
        confidence: 0.92,
        entities: { storyId: '3.2' },
        ambiguous: false,
      };
    }
  }
  return { IntentEngine };
});

jest.mock('../../.aios-core/core/jarvis/mission-planner', () => {
  class MissionPlanner {
    plan(structured) {
      return {
        id: 'plan-001',
        description: `Plan for ${structured.intent}`,
        estimatedTotalDuration: '5m',
        steps: [
          { id: 'step-1', agent: 'dev', command: '*develop', parallel: false },
          { id: 'step-2', agent: 'qa', command: '*qa-gate', parallel: false },
        ],
      };
    }
  }
  return { MissionPlanner };
});

jest.mock('../../.aios-core/core/jarvis/autonomy-controller', () => {
  let _level = 'supervised';
  class AutonomyController {
    initialize() {}
    getLevel() { return _level; }
    setLevel(l) { _level = l; return true; }
    shouldAutoExecute() { return _level === 'autonomous'; }
  }
  return { AutonomyController };
});

jest.mock('../../.aios-core/core/jarvis/delegation-bridge', () => {
  class DelegationBridge {
    async delegate(step) {
      return {
        status: 'success',
        agentId: step.agent,
        duration: 1234,
        retries: 0,
        artifacts: [],
      };
    }
  }
  return { DelegationBridge };
});

jest.mock('../../.aios-core/core/jarvis/progress-reporter', () => {
  class ProgressReporter {
    constructor() {
      this._phase = 'idle';
    }
    setWebSocketServer() {}
    update(phase) { this._phase = phase; }
    startMission() {}
    stepStart() {}
    stepComplete() {}
    complete() {}
    get phase() { return this._phase; }
  }
  return { ProgressReporter };
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('JARVIS Core API', () => {
  let api;

  beforeAll(() => {
    delete require.cache[require.resolve(API_PATH)];
    api = require(API_PATH);
  });

  afterEach(() => {
    // Clear sessions between tests
    api._sessions.clear();
  });

  // -------------------------------------------------------------------------
  // processTextCommand
  // -------------------------------------------------------------------------

  describe('processTextCommand', () => {
    test('returns empty for blank input', async () => {
      const result = await api.processTextCommand('', 'test-session');
      expect(result.type).toBe('empty');
      expect(result.message).toBe('');
    });

    test('returns empty for whitespace input', async () => {
      const result = await api.processTextCommand('   ', 'test-session');
      expect(result.type).toBe('empty');
    });

    test('classifies and plans a valid command (supervised mode)', async () => {
      const result = await api.processTextCommand('implement story 3.2', 'test-session');
      expect(result.type).toBe('plan');
      expect(result.intent).toBe('implement_story');
      expect(result.confidence).toBeCloseTo(0.92);
      expect(result.plan.steps).toHaveLength(2);
      expect(result.plan.steps[0].agent).toBe('dev');
      expect(result.plan.steps[1].agent).toBe('qa');
      expect(result.requiresApproval).toBe(true);
      expect(result.autonomyLevel).toBe('supervised');
    });

    test('returns unknown for unrecognized intents', async () => {
      const result = await api.processTextCommand('something unknown here', 'test-session');
      expect(result.type).toBe('unknown');
      expect(result.confidence).toBe(0.1);
    });

    test('returns disambiguation for ambiguous intents', async () => {
      const result = await api.processTextCommand('do something ambiguous', 'test-session');
      expect(result.type).toBe('unknown');
      expect(result.disambiguation).toEqual(['option1', 'option2']);
    });

    test('auto-executes in autonomous mode', async () => {
      api.changeAutonomyMode('auto-session', 'autonomous');
      const result = await api.processTextCommand('implement story 3.2', 'auto-session');
      expect(result.type).toBe('executed');
      expect(result.result.status).toBe('success');
      expect(result.result.agentId).toBe('dev');
    });

    test('creates session on first command', async () => {
      await api.processTextCommand('implement story 3.2', 'new-session');
      const state = api.getSessionState('new-session');
      expect(state.id).toBe('new-session');
      expect(state.autonomyLevel).toBe('supervised');
    });
  });

  // -------------------------------------------------------------------------
  // Session Management
  // -------------------------------------------------------------------------

  describe('session management', () => {
    test('getSessionState returns session details', () => {
      const state = api.getSessionState('sess-1');
      expect(state.id).toBe('sess-1');
      expect(state.autonomyLevel).toBe('supervised');
      expect(state.missionCount).toBe(0);
      expect(state.activeMissions).toEqual([]);
    });

    test('removeSession cleans up', () => {
      api.getSessionState('sess-remove');
      expect(api._sessions.has('sess-remove')).toBe(true);
      api.removeSession('sess-remove');
      expect(api._sessions.has('sess-remove')).toBe(false);
    });

    test('cleanupSessions removes stale sessions', () => {
      const session = api.getSession('old-session');
      session.lastActive = Date.now() - 2 * 60 * 60 * 1000; // 2 hours ago
      api.getSession('new-session'); // fresh session
      api.cleanupSessions();
      expect(api._sessions.has('old-session')).toBe(false);
      expect(api._sessions.has('new-session')).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Agents
  // -------------------------------------------------------------------------

  describe('getAvailableAgents', () => {
    test('returns array of 10 agents', () => {
      const agents = api.getAvailableAgents();
      expect(agents).toHaveLength(10);
      expect(agents[0]).toHaveProperty('id');
      expect(agents[0]).toHaveProperty('name');
      expect(agents[0]).toHaveProperty('scope');
    });

    test('includes dev agent', () => {
      const agents = api.getAvailableAgents();
      const dev = agents.find((a) => a.id === 'dev');
      expect(dev).toBeDefined();
      expect(dev.name).toBe('Dex');
    });
  });

  // -------------------------------------------------------------------------
  // Autonomy Mode
  // -------------------------------------------------------------------------

  describe('changeAutonomyMode', () => {
    test('changes mode successfully', () => {
      const result = api.changeAutonomyMode('mode-session', 'assisted');
      expect(result.success).toBe(true);
      expect(result.level).toBe('assisted');

      const state = api.getSessionState('mode-session');
      expect(state.autonomyLevel).toBe('assisted');
    });

    test('rejects invalid modes', () => {
      const result = api.changeAutonomyMode('mode-session', 'invalid');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid level');
    });

    test('accepts all valid modes', () => {
      for (const level of ['supervised', 'assisted', 'autonomous']) {
        const result = api.changeAutonomyMode('mode-test', level);
        expect(result.success).toBe(true);
        expect(result.level).toBe(level);
      }
    });
  });

  // -------------------------------------------------------------------------
  // Module Status
  // -------------------------------------------------------------------------

  describe('getModuleStatus', () => {
    test('reports all modules as available', () => {
      const status = api.getModuleStatus();
      expect(status.intentEngine).toBe(true);
      expect(status.missionPlanner).toBe(true);
      expect(status.autonomyController).toBe(true);
      expect(status.delegationBridge).toBe(true);
      expect(status.progressReporter).toBe(true);
      expect(typeof status.sessionCount).toBe('number');
    });
  });
});
