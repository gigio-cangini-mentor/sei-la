/**
 * JARVIS CLI Bootstrap Tests
 * Tests for: greeting generation, --version flag, one-shot arg parsing,
 *            exit command, and project context detection.
 *
 * @story 1.1
 */

'use strict';

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Module under test path
const BOOTSTRAP_PATH = path.resolve(
  __dirname,
  '..',
  '..',
  '.aios-core',
  'core',
  'jarvis',
  'jarvis-bootstrap',
);

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

jest.mock('fs', () => {
  const actual = jest.requireActual('fs');
  return {
    ...actual,
    existsSync: jest.fn(),
    readFileSync: jest.fn(),
    readdirSync: jest.fn(),
  };
});

// Suppress console output during tests
let consoleLogSpy;
let consoleErrorSpy;

beforeEach(() => {
  jest.clearAllMocks();
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // Default: config file does not exist (use defaults)
  fs.existsSync.mockReturnValue(false);
});

afterEach(() => {
  consoleLogSpy.mockRestore();
  consoleErrorSpy.mockRestore();
});

// Re-require module for each describe to get clean state
function loadModule() {
  // Clear module cache to reset requires
  delete require.cache[require.resolve(BOOTSTRAP_PATH)];
  return require(BOOTSTRAP_PATH);
}

// ---------------------------------------------------------------------------
// Tests: getTimeOfDay
// ---------------------------------------------------------------------------

describe('getTimeOfDay', () => {
  let mod;
  beforeAll(() => {
    mod = loadModule();
  });

  test('returns "midnight" for hours 0-4', () => {
    expect(mod.getTimeOfDay(0)).toBe('midnight');
    expect(mod.getTimeOfDay(2)).toBe('midnight');
    expect(mod.getTimeOfDay(4)).toBe('midnight');
  });

  test('returns "morning" for hours 5-11', () => {
    expect(mod.getTimeOfDay(5)).toBe('morning');
    expect(mod.getTimeOfDay(8)).toBe('morning');
    expect(mod.getTimeOfDay(11)).toBe('morning');
  });

  test('returns "afternoon" for hours 12-17', () => {
    expect(mod.getTimeOfDay(12)).toBe('afternoon');
    expect(mod.getTimeOfDay(14)).toBe('afternoon');
    expect(mod.getTimeOfDay(17)).toBe('afternoon');
  });

  test('returns "evening" for hours 18-23', () => {
    expect(mod.getTimeOfDay(18)).toBe('evening');
    expect(mod.getTimeOfDay(21)).toBe('evening');
    expect(mod.getTimeOfDay(23)).toBe('evening');
  });
});

// ---------------------------------------------------------------------------
// Tests: loadJarvisConfig
// ---------------------------------------------------------------------------

describe('loadJarvisConfig', () => {
  let mod;
  beforeAll(() => {
    mod = loadModule();
  });

  test('returns defaults when config file does not exist', () => {
    fs.existsSync.mockReturnValue(false);
    const config = mod.loadJarvisConfig('/fake/root');

    expect(config.enabled).toBe(true);
    expect(config.autonomy).toBe('supervised');
    expect(config.personality).toBe(true);
    expect(config.version).toBe('1.0.0');
    expect(config.greeting.enabled).toBe(true);
    expect(config.greeting.address).toBe('sir');
  });

  test('loads jarvis config from yaml when present', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(
      'jarvis:\n  enabled: false\n  autonomy: autonomous\n  greeting:\n    address: madam\n',
    );

    const config = mod.loadJarvisConfig('/fake/root');

    expect(config.enabled).toBe(false);
    expect(config.autonomy).toBe('autonomous');
    expect(config.greeting.address).toBe('madam');
    // Defaults still applied for missing keys
    expect(config.personality).toBe(true);
    expect(config.greeting.enabled).toBe(true);
  });

  test('returns defaults when yaml has no jarvis key', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue('project:\n  type: greenfield\n');

    const config = mod.loadJarvisConfig('/fake/root');
    expect(config.enabled).toBe(true);
    expect(config.autonomy).toBe('supervised');
  });

  test('returns defaults when yaml is malformed', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockImplementation(() => {
      throw new Error('ENOENT');
    });

    const config = mod.loadJarvisConfig('/fake/root');
    expect(config.enabled).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Tests: detectProjectContext
// ---------------------------------------------------------------------------

describe('detectProjectContext', () => {
  let mod;
  beforeAll(() => {
    mod = loadModule();
  });

  test('detects git branch and last commit when in git repo', () => {
    execSync
      .mockReturnValueOnce('feat/jarvis-bootstrap\n') // git branch
      .mockReturnValueOnce('abc1234 feat: add jarvis\n'); // git log

    fs.existsSync.mockReturnValue(false); // no stories dir

    const ctx = mod.detectProjectContext('/fake/root');

    expect(ctx.isGitRepo).toBe(true);
    expect(ctx.branch).toBe('feat/jarvis-bootstrap');
    expect(ctx.lastCommit).toBe('abc1234 feat: add jarvis');
    expect(ctx.activeStories).toBe(0);
  });

  test('handles non-git-repo gracefully', () => {
    execSync.mockImplementation(() => {
      throw new Error('not a git repository');
    });
    fs.existsSync.mockReturnValue(false);

    const ctx = mod.detectProjectContext('/fake/root');

    expect(ctx.isGitRepo).toBe(false);
    expect(ctx.branch).toBeNull();
    expect(ctx.lastCommit).toBeNull();
  });

  test('counts active stories (non-Done status)', () => {
    execSync
      .mockReturnValueOnce('main\n') // git branch
      .mockReturnValueOnce('abc1234 init\n'); // git log

    // stories dir exists
    fs.existsSync.mockImplementation((p) => {
      if (typeof p === 'string' && p.includes('docs')) return true;
      if (typeof p === 'string' && p.includes('stories')) return true;
      return false;
    });

    fs.readdirSync.mockReturnValue([
      { name: '1.1.story.md', isDirectory: () => false },
      { name: '1.2.story.md', isDirectory: () => false },
    ]);

    // First story: Validated (active), second: Done
    const storyContents = [
      '## Status\n\nValidated\n',
      '## Status\n\nDone\n',
    ];
    let readIdx = 0;
    fs.readFileSync.mockImplementation(() => {
      return storyContents[readIdx++] || '';
    });

    const ctx = mod.detectProjectContext('/fake/root');
    expect(ctx.activeStories).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Tests: buildGreeting
// ---------------------------------------------------------------------------

describe('buildGreeting', () => {
  let mod;
  beforeAll(() => {
    mod = loadModule();
  });

  const defaultConfig = {
    greeting: { enabled: true, address: 'sir' },
  };
  const defaultContext = {
    branch: 'main',
    activeStories: 2,
    lastCommit: 'abc1234 feat: init',
    isGitRepo: true,
  };

  test('builds greeting with morning time', () => {
    const greeting = mod.buildGreeting(defaultConfig, defaultContext, 9);
    expect(greeting).toContain('Good morning, sir');
    expect(greeting).toContain('JARVIS at your service');
  });

  test('builds greeting with afternoon time', () => {
    const greeting = mod.buildGreeting(defaultConfig, defaultContext, 14);
    expect(greeting).toContain('Good afternoon, sir');
  });

  test('builds greeting with evening time', () => {
    const greeting = mod.buildGreeting(defaultConfig, defaultContext, 20);
    expect(greeting).toContain('Good evening, sir');
  });

  test('builds greeting with midnight time', () => {
    const greeting = mod.buildGreeting(defaultConfig, defaultContext, 2);
    expect(greeting).toContain('Good midnight, sir');
  });

  test('includes branch info in greeting', () => {
    const greeting = mod.buildGreeting(defaultConfig, defaultContext, 9);
    expect(greeting).toContain('Branch: main');
  });

  test('includes active stories count', () => {
    const greeting = mod.buildGreeting(defaultConfig, defaultContext, 9);
    expect(greeting).toContain('Active stories: 2');
  });

  test('includes last commit', () => {
    const greeting = mod.buildGreeting(defaultConfig, defaultContext, 9);
    expect(greeting).toContain('Last commit: abc1234 feat: init');
  });

  test('shows no git repo message when not in git repo', () => {
    const noGitCtx = { branch: null, activeStories: 0, lastCommit: null, isGitRepo: false };
    const greeting = mod.buildGreeting(defaultConfig, noGitCtx, 9);
    expect(greeting).toContain('No git repository detected');
  });

  test('returns empty string when greeting is disabled', () => {
    const disabledConfig = { greeting: { enabled: false } };
    const greeting = mod.buildGreeting(disabledConfig, defaultContext, 9);
    expect(greeting).toBe('');
  });

  test('uses custom address from config', () => {
    const customConfig = { greeting: { enabled: true, address: 'madam' } };
    const greeting = mod.buildGreeting(customConfig, defaultContext, 9);
    expect(greeting).toContain('Good morning, madam');
  });
});

// ---------------------------------------------------------------------------
// Tests: processCommand (async pipeline)
// ---------------------------------------------------------------------------

describe('processCommand', () => {
  let mod;
  beforeAll(() => {
    mod = loadModule();
  });

  test('returns empty string for empty input', async () => {
    expect(await mod.processCommand('')).toBe('');
    expect(await mod.processCommand('   ')).toBe('');
  });

  test('returns help text for "help" command', async () => {
    const result = await mod.processCommand('help');
    expect(result).toContain('Available commands');
    expect(result).toContain('exit');
  });

  test('returns status output for "status" command', async () => {
    const result = await mod.processCommand('status');
    expect(result).toContain('Project Status');
  });

  test('returns mode info for "mode" command', async () => {
    const result = await mod.processCommand('mode');
    // Should either show current mode or indicate unavailability
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Tests: --version flag
// ---------------------------------------------------------------------------

describe('bootstrap --version', () => {
  let mod;

  beforeEach(() => {
    mod = loadModule();
  });

  test('prints version from package.json with --version flag', async () => {
    fs.existsSync.mockReturnValue(false);
    fs.readFileSync.mockReturnValue(JSON.stringify({ version: '4.4.6' }));

    await mod.bootstrap({
      projectRoot: '/fake/root',
      argv: ['--version'],
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('JARVIS v4.4.6'));
  });

  test('prints version from package.json with -v flag', async () => {
    fs.existsSync.mockReturnValue(false);
    fs.readFileSync.mockReturnValue(JSON.stringify({ version: '1.0.0' }));

    await mod.bootstrap({
      projectRoot: '/fake/root',
      argv: ['-v'],
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('JARVIS v1.0.0'));
  });

  test('prints fallback when package.json is unreadable', async () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error('ENOENT');
    });

    await mod.bootstrap({
      projectRoot: '/fake/root',
      argv: ['--version'],
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('v0.0.0'));
  });
});

// ---------------------------------------------------------------------------
// Tests: One-shot mode
// ---------------------------------------------------------------------------

describe('one-shot mode', () => {
  let mod;

  beforeEach(() => {
    mod = loadModule();
  });

  test('executes one-shot command and returns', async () => {
    // Config not found -> defaults (enabled)
    fs.existsSync.mockReturnValue(false);

    // Git commands fail (not in git repo)
    execSync.mockImplementation(() => {
      throw new Error('not a git repo');
    });

    await mod.bootstrap({
      projectRoot: '/fake/root',
      argv: ['check', 'status'],
    });

    // Should have printed a response (may include input text or error gracefully)
    expect(consoleLogSpy).toHaveBeenCalled();
    const allCalls = consoleLogSpy.mock.calls.map((c) => c[0]).join(' ');
    expect(allCalls).toContain('check status');
  });
});

// ---------------------------------------------------------------------------
// Tests: Exit handling
// ---------------------------------------------------------------------------

describe('exit handling', () => {
  let mod;
  beforeAll(() => {
    mod = loadModule();
  });

  test('FAREWELL_MESSAGE is the expected string', () => {
    expect(mod.FAREWELL_MESSAGE).toBe('Signing off, sir. Until next time.');
  });

  test('PROMPT_STRING is JARVIS > ', () => {
    expect(mod.PROMPT_STRING).toBe('JARVIS > ');
  });
});

// ---------------------------------------------------------------------------
// Tests: bootstrap with disabled config
// ---------------------------------------------------------------------------

describe('bootstrap with disabled JARVIS', () => {
  let mod;

  beforeEach(() => {
    mod = loadModule();
  });

  test('prints disabled message when jarvis.enabled is false', async () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue('jarvis:\n  enabled: false\n');
    execSync.mockImplementation(() => {
      throw new Error('not a git repo');
    });

    await mod.bootstrap({
      projectRoot: '/fake/root',
      argv: [],
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('disabled'),
    );
  });
});
