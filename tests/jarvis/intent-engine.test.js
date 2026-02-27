/**
 * JARVIS Intent Classification Engine - Unit Tests
 *
 * Covers:
 * - 50+ natural language pattern classifications
 * - Entity extraction (storyId, epicId, agentHint, featureName, filePaths, mode)
 * - Context enrichment with session context
 * - Tier 1 latency assertions (<200ms)
 * - Tier 2 LLM fallback path (mocked)
 * - Unknown intent disambiguation
 * - Edge cases (empty input, special characters, multilingual)
 * - Preprocessor (alias expansion, language detection)
 *
 * @story 1.2
 */

'use strict';

const path = require('path');

// Enable AIOS_DEBUG for coverage of warning code paths
process.env.AIOS_DEBUG = 'true';

// ---------------------------------------------------------------------------
// Module under test
// ---------------------------------------------------------------------------

const ENGINE_PATH = path.resolve(
  __dirname, '..', '..', '.aios-core', 'core', 'jarvis', 'intent-engine',
);

const {
  IntentEngine,
  classifyIntent,
  createStructuredIntent,
  resetDefaultEngine,
  TIER1_CONFIDENCE_THRESHOLD,
  VALID_CATEGORIES,
  KNOWN_AGENTS,
} = require(ENGINE_PATH);

// ---------------------------------------------------------------------------
// Global cleanup
// ---------------------------------------------------------------------------

afterAll(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
  resetDefaultEngine();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a fresh engine for each test to avoid cross-contamination */
function freshEngine() {
  const engine = new IntentEngine();
  engine.loadPatterns();
  return engine;
}

// ---------------------------------------------------------------------------
// StructuredIntent Schema Validation
// ---------------------------------------------------------------------------

describe('StructuredIntent schema', () => {
  it('creates a valid default StructuredIntent with all required fields', () => {
    const si = createStructuredIntent();
    expect(si).toHaveProperty('intent', 'unknown');
    expect(si).toHaveProperty('category', 'unknown');
    expect(si).toHaveProperty('confidence', 0);
    expect(si).toHaveProperty('entities');
    expect(si.entities).toHaveProperty('storyId', null);
    expect(si.entities).toHaveProperty('epicId', null);
    expect(si.entities).toHaveProperty('agentHint', null);
    expect(si.entities).toHaveProperty('featureName', null);
    expect(si.entities).toHaveProperty('filePaths');
    expect(si.entities).toHaveProperty('topic', null);
    expect(si.entities).toHaveProperty('mode', null);
    expect(si).toHaveProperty('suggestedAction', '');
    expect(si).toHaveProperty('rawInput', '');
    expect(si).toHaveProperty('ambiguous', false);
    expect(si).toHaveProperty('disambiguation');
    expect(si).toHaveProperty('context');
    expect(si.context).toHaveProperty('currentStory', null);
    expect(si.context).toHaveProperty('currentBranch', null);
    expect(si.context).toHaveProperty('workflowState', null);
    expect(si.context).toHaveProperty('previousIntent', null);
  });

  it('merges overrides into StructuredIntent without losing defaults', () => {
    const si = createStructuredIntent({
      intent: 'story.develop',
      category: 'development',
      confidence: 0.95,
      entities: { storyId: '3.2' },
    });
    expect(si.intent).toBe('story.develop');
    expect(si.entities.storyId).toBe('3.2');
    expect(si.entities.epicId).toBe(null); // default preserved
    expect(si.context.currentStory).toBe(null); // default preserved
  });
});

// ---------------------------------------------------------------------------
// Pattern Loading
// ---------------------------------------------------------------------------

describe('IntentEngine pattern loading', () => {
  it('loads patterns from YAML without errors', () => {
    const engine = new IntentEngine();
    expect(() => engine.loadPatterns()).not.toThrow();
    expect(engine._compiledPatterns.length).toBeGreaterThan(40);
  });

  it('auto-loads patterns on first classify call', async () => {
    const engine = new IntentEngine();
    expect(engine._loaded).toBe(false);
    const result = await engine.classify('status');
    expect(engine._loaded).toBe(true);
    expect(result.intent).toBe('status.query');
  });

  it('throws when js-yaml is not available and patterns path is invalid', () => {
    const engine = new IntentEngine({ patternsPath: '/nonexistent/path.yaml' });
    expect(() => engine.loadPatterns()).toThrow();
  });
});

// ---------------------------------------------------------------------------
// Preprocessor
// ---------------------------------------------------------------------------

describe('Preprocessor', () => {
  let engine;
  beforeEach(() => { engine = freshEngine(); });

  it('normalizes input to lowercase and trims whitespace', () => {
    const result = engine.preprocess('  Implement Story 3.2  ');
    expect(result.normalized).toContain('implement');
    expect(result.original).toBe('Implement Story 3.2');
  });

  it('detects Portuguese language from keywords', () => {
    const result = engine.preprocess('implementar a historia');
    expect(result.language).toBe('pt');
  });

  it('detects English as default language', () => {
    const result = engine.preprocess('implement the story');
    expect(result.language).toBe('en');
  });

  it('expands Portuguese aliases to English', () => {
    const result = engine.preprocess('implementar story 2.1');
    expect(result.normalized).toContain('implement');
  });

  it('expands "criar" to "create"', () => {
    const result = engine.preprocess('criar proxima historia');
    expect(result.normalized).toContain('create');
    expect(result.normalized).toContain('next');
    expect(result.normalized).toContain('story');
  });

  it('handles null input gracefully', () => {
    const result = engine.preprocess(null);
    expect(result.normalized).toBe('');
    expect(result.language).toBe('en');
  });

  it('handles empty string input', () => {
    const result = engine.preprocess('');
    expect(result.normalized).toBe('');
  });

  it('handles non-string input gracefully', () => {
    const result = engine.preprocess(42);
    expect(result.normalized).toBe('');
  });
});

// ---------------------------------------------------------------------------
// Tier 1 Pattern Matching -- 50+ Natural Language Patterns
// ---------------------------------------------------------------------------

describe('Tier 1 pattern matching', () => {
  let engine;
  beforeEach(() => { engine = freshEngine(); });

  // --- DEVELOPMENT patterns (1-10) ---

  it('1. "implement story 3.2" -> story.develop, development, storyId=3.2', async () => {
    const r = await engine.classify('implement story 3.2');
    expect(r.intent).toBe('story.develop');
    expect(r.category).toBe('development');
    expect(r.confidence).toBeGreaterThanOrEqual(0.95);
    expect(r.entities.storyId).toBe('3.2');
  });

  it('2. "develop story 1.1" -> story.develop', async () => {
    const r = await engine.classify('develop story 1.1');
    expect(r.intent).toBe('story.develop');
    expect(r.entities.storyId).toBe('1.1');
  });

  it('3. "code story 2.5" -> story.develop', async () => {
    const r = await engine.classify('code story 2.5');
    expect(r.intent).toBe('story.develop');
    expect(r.entities.storyId).toBe('2.5');
  });

  it('4. "build the next feature" -> story.develop', async () => {
    const r = await engine.classify('build the next feature');
    expect(r.intent).toBe('story.develop');
    expect(r.category).toBe('development');
  });

  it('5. "work on story 4.3" -> story.develop', async () => {
    const r = await engine.classify('work on story 4.3');
    expect(r.intent).toBe('story.develop');
    expect(r.entities.storyId).toBe('4.3');
  });

  it('6. "start coding" -> story.develop', async () => {
    const r = await engine.classify('start coding');
    expect(r.intent).toBe('story.develop');
  });

  it('7. "fix bug in authentication module" -> story.develop', async () => {
    const r = await engine.classify('fix bug in authentication module');
    expect(r.intent).toBe('story.develop');
    expect(r.category).toBe('development');
  });

  it('8. "refactor the user service" -> story.develop', async () => {
    const r = await engine.classify('refactor the user service');
    expect(r.intent).toBe('story.develop');
  });

  it('9. "design the database schema" -> db.design', async () => {
    const r = await engine.classify('design the database schema');
    expect(r.intent).toBe('db.design');
    expect(r.category).toBe('development');
  });

  it('10. "full cycle end to end" -> story.full_cycle', async () => {
    const r = await engine.classify('full cycle end to end');
    expect(r.intent).toBe('story.full_cycle');
    expect(r.category).toBe('development');
  });

  // --- PLANNING patterns (11-20) ---

  it('11. "create next story from epic 2" -> story.create, epicId=2', async () => {
    const r = await engine.classify('create next story from epic 2');
    expect(r.intent).toBe('story.create');
    expect(r.category).toBe('planning');
    expect(r.entities.epicId).toBe('2');
  });

  it('12. "draft a new story" -> story.create', async () => {
    const r = await engine.classify('draft a new story');
    expect(r.intent).toBe('story.create');
    expect(r.category).toBe('planning');
  });

  it('13. "write the next story" -> story.create', async () => {
    const r = await engine.classify('write the next story');
    expect(r.intent).toBe('story.create');
  });

  it('14. "validate story 2.3" -> story.validate, storyId=2.3', async () => {
    const r = await engine.classify('validate story 2.3');
    expect(r.intent).toBe('story.validate');
    expect(r.category).toBe('planning');
    expect(r.entities.storyId).toBe('2.3');
  });

  it('15. "create system architecture" -> arch.create_fullstack', async () => {
    const r = await engine.classify('create system architecture');
    expect(r.intent).toBe('arch.create_fullstack');
    expect(r.category).toBe('planning');
  });

  it('16. "design the backend architecture" -> arch.create_backend', async () => {
    const r = await engine.classify('design the backend architecture');
    expect(r.intent).toBe('arch.create_backend');
  });

  it('17. "create frontend architecture" -> arch.create_frontend', async () => {
    const r = await engine.classify('create frontend architecture');
    expect(r.intent).toBe('arch.create_frontend');
  });

  it('18. "create a new epic for user auth" -> epic.create', async () => {
    const r = await engine.classify('create a new epic for user auth');
    expect(r.intent).toBe('epic.create');
    expect(r.category).toBe('planning');
  });

  it('19. "execute epic 3" -> epic.execute, epicId=3', async () => {
    const r = await engine.classify('execute epic 3');
    expect(r.intent).toBe('epic.execute');
    expect(r.entities.epicId).toBe('3');
  });

  it('20. "create PRD for payments" -> spec.pipeline', async () => {
    const r = await engine.classify('create PRD for payments');
    expect(r.intent).toBe('spec.pipeline');
    expect(r.category).toBe('planning');
  });

  // --- RESEARCH patterns (21-26) ---

  it('21. "research microservices patterns" -> research.general', async () => {
    const r = await engine.classify('research microservices patterns');
    expect(r.intent).toBe('research.general');
    expect(r.category).toBe('research');
  });

  it('22. "investigate the auth flow" -> research.general', async () => {
    const r = await engine.classify('investigate the auth flow');
    expect(r.intent).toBe('research.general');
  });

  it('23. "audit the frontend UX" -> ux.audit', async () => {
    const r = await engine.classify('audit the frontend UX');
    expect(r.intent).toBe('ux.audit');
    expect(r.category).toBe('research');
  });

  it('24. "assess this legacy codebase" -> brownfield.discover', async () => {
    const r = await engine.classify('assess this legacy codebase');
    expect(r.intent).toBe('brownfield.discover');
  });

  it('25. "technical debt assessment" -> brownfield.discover', async () => {
    const r = await engine.classify('technical debt assessment');
    expect(r.intent).toBe('brownfield.discover');
    expect(r.category).toBe('research');
  });

  it('26. "explore new frameworks" -> research.general', async () => {
    const r = await engine.classify('explore new frameworks');
    expect(r.intent).toBe('research.general');
  });

  // --- OPERATIONS patterns (27-35) ---

  it('27. "push the changes" -> story.push', async () => {
    const r = await engine.classify('push the changes');
    expect(r.intent).toBe('story.push');
    expect(r.category).toBe('operations');
  });

  it('28. "deploy the code" -> story.push', async () => {
    const r = await engine.classify('deploy the code');
    expect(r.intent).toBe('story.push');
  });

  it('29. "ship it" -> story.push', async () => {
    const r = await engine.classify('ship it');
    expect(r.intent).toBe('story.push');
  });

  it('30. "run QA on story 2.3" -> story.review', async () => {
    const r = await engine.classify('run QA on story 2.3');
    expect(r.intent).toBe('story.review');
    expect(r.category).toBe('operations');
    expect(r.entities.storyId).toBe('2.3');
  });

  it('31. "review story 1.4" -> story.review', async () => {
    const r = await engine.classify('review story 1.4');
    expect(r.intent).toBe('story.review');
    expect(r.entities.storyId).toBe('1.4');
  });

  it('32. "keep reviewing until it passes" -> qa.loop', async () => {
    const r = await engine.classify('keep reviewing until it passes');
    expect(r.intent).toBe('qa.loop');
    expect(r.category).toBe('operations');
  });

  it('33. "create pr" -> story.push', async () => {
    const r = await engine.classify('create pr');
    expect(r.intent).toBe('story.push');
  });

  it('34. "merge the branch" -> story.push', async () => {
    const r = await engine.classify('merge the branch');
    expect(r.intent).toBe('story.push');
  });

  it('35. "start qa loop" -> qa.loop', async () => {
    const r = await engine.classify('start qa loop');
    // qa.loop or story.review are both acceptable -- qa.loop has priority from "qa loop" pattern
    expect(['qa.loop', 'story.review']).toContain(r.intent);
  });

  // --- STATUS INQUIRY patterns (36-40) ---

  it('36. "what is the status?" -> status.query', async () => {
    const r = await engine.classify('what is the status?');
    expect(r.intent).toBe('status.query');
    expect(r.category).toBe('status_inquiry');
  });

  it('37. "what is going on?" -> status.query', async () => {
    const r = await engine.classify('what is going on?');
    expect(r.intent).toBe('status.query');
  });

  it('38. "how are we doing?" -> status.query', async () => {
    const r = await engine.classify('how are we doing?');
    expect(r.intent).toBe('status.query');
  });

  it('39. "show active stories" -> status.query', async () => {
    const r = await engine.classify('show active stories');
    expect(r.intent).toBe('status.query');
  });

  it('40. "help" -> help.general', async () => {
    const r = await engine.classify('help');
    expect(r.intent).toBe('help.general');
    expect(r.category).toBe('status_inquiry');
  });

  // --- META CONFIGURATION patterns (41-44) ---

  it('41. "yolo" -> mode.yolo', async () => {
    const r = await engine.classify('yolo');
    expect(r.intent).toBe('mode.yolo');
    expect(r.category).toBe('meta_configuration');
  });

  it('42. "go autonomous" -> mode.yolo', async () => {
    const r = await engine.classify('go autonomous');
    expect(r.intent).toBe('mode.yolo');
  });

  it('43. "switch to supervised mode" -> mode.supervised', async () => {
    const r = await engine.classify('switch to supervised mode');
    expect(r.intent).toBe('mode.supervised');
    expect(r.category).toBe('meta_configuration');
  });

  it('44. "exploration mode" -> mode.explore', async () => {
    const r = await engine.classify('exploration mode');
    expect(r.intent).toBe('mode.explore');
  });

  // --- AGENT DIRECT patterns (45-48) ---

  it('45. "@architect design the auth module" -> agent.direct, agentHint=architect', async () => {
    const r = await engine.classify('@architect design the auth module');
    expect(r.intent).toBe('agent.direct');
    expect(r.entities.agentHint).toBe('architect');
    expect(r.confidence).toBeGreaterThanOrEqual(0.95);
  });

  it('46. "@dev fix the login page" -> agent.direct, agentHint=dev', async () => {
    const r = await engine.classify('@dev fix the login page');
    expect(r.intent).toBe('agent.direct');
    expect(r.entities.agentHint).toBe('dev');
  });

  it('47. "@qa review all tests" -> agent.direct, agentHint=qa', async () => {
    const r = await engine.classify('@qa review all tests');
    expect(r.intent).toBe('agent.direct');
    expect(r.entities.agentHint).toBe('qa');
  });

  it('48. "@data-engineer audit the schema" -> agent.direct, agentHint=data-engineer', async () => {
    const r = await engine.classify('@data-engineer audit the schema');
    expect(r.intent).toBe('agent.direct');
    expect(r.entities.agentHint).toBe('data-engineer');
  });

  // --- ADDITIONAL patterns for 50+ coverage (49-55) ---

  it('49. "write a specification for the API" -> spec.pipeline', async () => {
    const r = await engine.classify('write a specification for the API');
    expect(r.intent).toBe('spec.pipeline');
  });

  it('50. "gather requirements" -> spec.pipeline', async () => {
    const r = await engine.classify('gather requirements');
    expect(r.intent).toBe('spec.pipeline');
    expect(r.category).toBe('planning');
  });

  it('51. "analyze project structure" -> arch.analyze', async () => {
    const r = await engine.classify('analyze project structure');
    expect(r.intent).toBe('arch.analyze');
    expect(r.category).toBe('planning');
  });

  it('52. "review draft" -> story.validate', async () => {
    const r = await engine.classify('review draft');
    expect(r.intent).toBe('story.validate');
  });

  it('53. "what can you do?" -> help.general', async () => {
    const r = await engine.classify('what can you do?');
    expect(r.intent).toBe('help.general');
  });

  it('54. "debug the payment service" -> story.develop', async () => {
    const r = await engine.classify('debug the payment service');
    expect(r.intent).toBe('story.develop');
  });

  it('55. "look into performance issues" -> research.general', async () => {
    const r = await engine.classify('look into performance issues');
    expect(r.intent).toBe('research.general');
  });

  it('56. "implement the next story end to end" -> story.full_cycle', async () => {
    const r = await engine.classify('implement the next story end to end');
    expect(r.intent).toBe('story.full_cycle');
    expect(r.category).toBe('development');
  });

  it('57. "create a migration" -> db.design', async () => {
    const r = await engine.classify('create a migration');
    expect(r.intent).toBe('db.design');
  });

  it('58. "check quality of story 5.1" -> story.review', async () => {
    const r = await engine.classify('check quality of story 5.1');
    expect(r.intent).toBe('story.review');
    expect(r.entities.storyId).toBe('5.1');
  });
});

// ---------------------------------------------------------------------------
// Portuguese / Multilingual Support
// ---------------------------------------------------------------------------

describe('Multilingual support (Portuguese)', () => {
  let engine;
  beforeEach(() => { engine = freshEngine(); });

  it('classifies "implementar story 2.1" -> story.develop via alias expansion', async () => {
    const r = await engine.classify('implementar story 2.1');
    expect(r.intent).toBe('story.develop');
    expect(r.entities.storyId).toBe('2.1');
  });

  it('classifies "criar proxima historia" -> story.create via alias expansion', async () => {
    const r = await engine.classify('criar proxima historia');
    expect(r.intent).toBe('story.create');
    expect(r.category).toBe('planning');
  });

  it('classifies "validar story 3.1" -> story.validate via alias expansion', async () => {
    const r = await engine.classify('validar story 3.1');
    expect(r.intent).toBe('story.validate');
    expect(r.entities.storyId).toBe('3.1');
  });

  it('classifies "pesquisar microservices" -> research.general via alias expansion', async () => {
    const r = await engine.classify('pesquisar microservices');
    expect(r.intent).toBe('research.general');
  });

  it('classifies "enviar as mudancas" -> story.push via alias expansion', async () => {
    const r = await engine.classify('enviar as mudancas');
    expect(r.intent).toBe('story.push');
  });
});

// ---------------------------------------------------------------------------
// Entity Extraction
// ---------------------------------------------------------------------------

describe('Entity extraction', () => {
  let engine;
  beforeEach(() => { engine = freshEngine(); });

  it('extracts storyId from "story 3.2"', () => {
    const entities = engine.extractEntities('implement story 3.2');
    expect(entities.storyId).toBe('3.2');
  });

  it('extracts storyId from bare number "1.1"', () => {
    const entities = engine.extractEntities('work on 1.1');
    expect(entities.storyId).toBe('1.1');
  });

  it('extracts epicId from "epic 2"', () => {
    const entities = engine.extractEntities('create story from epic 2');
    expect(entities.epicId).toBe('2');
  });

  it('extracts epicId from "from epic 5"', () => {
    const entities = engine.extractEntities('draft next story from epic 5');
    expect(entities.epicId).toBe('5');
  });

  it('extracts agentHint from "@architect"', () => {
    const entities = engine.extractEntities('@architect analyze impact');
    expect(entities.agentHint).toBe('architect');
  });

  it('extracts agentHint from "@data-engineer"', () => {
    const entities = engine.extractEntities('@data-engineer design schema');
    expect(entities.agentHint).toBe('data-engineer');
  });

  it('does not extract unknown agents', () => {
    const entities = engine.extractEntities('@unknown-agent do something');
    expect(entities.agentHint).toBeUndefined();
  });

  it('extracts featureName from quoted string', () => {
    const entities = engine.extractEntities('implement "payment gateway" feature');
    expect(entities.featureName).toBe('payment gateway');
  });

  it('extracts featureName from "the X module" pattern', () => {
    const entities = engine.extractEntities('refactor the authentication module');
    expect(entities.featureName).toBe('authentication');
  });

  it('extracts file paths', () => {
    const entities = engine.extractEntities('check file src/index.js and lib/utils.ts');
    expect(entities.filePaths).toBeDefined();
    expect(entities.filePaths.length).toBeGreaterThan(0);
  });

  it('extracts mode from "yolo"', () => {
    const entities = engine.extractEntities('run in yolo mode');
    expect(entities.mode).toBe('yolo');
  });

  it('extracts mode from "interactive"', () => {
    const entities = engine.extractEntities('develop interactive');
    expect(entities.mode).toBe('interactive');
  });

  it('returns empty object for empty input', () => {
    const entities = engine.extractEntities('');
    expect(entities).toEqual({});
  });

  it('returns empty object for null input', () => {
    const entities = engine.extractEntities(null);
    expect(entities).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// Context Enrichment
// ---------------------------------------------------------------------------

describe('Context enrichment', () => {
  let engine;
  beforeEach(() => { engine = freshEngine(); });

  it('enriches intent with session context', async () => {
    const sessionContext = {
      currentStory: 'story-2.3',
      currentBranch: 'feat/story-2.3',
      workflowState: { phase: 'implementation' },
      previousIntent: 'story.develop',
    };
    const r = await engine.classify('status', sessionContext);
    expect(r.context.currentStory).toBe('story-2.3');
    expect(r.context.currentBranch).toBe('feat/story-2.3');
    expect(r.context.workflowState).toEqual({ phase: 'implementation' });
    expect(r.context.previousIntent).toBe('story.develop');
  });

  it('infers storyId from session context when not in input', async () => {
    const sessionContext = { currentStory: 'story-2.3' };
    const r = await engine.classify('start developing', sessionContext);
    expect(r.entities.storyId).toBe('2.3');
  });

  it('does not override explicit storyId with session context', async () => {
    const sessionContext = { currentStory: 'story-2.3' };
    const r = await engine.classify('implement story 4.1', sessionContext);
    expect(r.entities.storyId).toBe('4.1');
  });

  it('handles null session context gracefully', async () => {
    const r = await engine.classify('implement story 1.1', null);
    expect(r.context.currentStory).toBeNull();
    expect(r.context.currentBranch).toBeNull();
  });

  it('handles undefined session context gracefully', async () => {
    const r = await engine.classify('implement story 1.1');
    expect(r.context.currentStory).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Disambiguation for Unknown Intents
// ---------------------------------------------------------------------------

describe('Disambiguation', () => {
  let engine;
  beforeEach(() => { engine = freshEngine(); });

  it('returns disambiguation array for completely unknown input', async () => {
    const r = await engine.classify('xyzzy foobar qwert');
    expect(r.intent).toBe('unknown');
    expect(r.ambiguous).toBe(true);
    expect(r.disambiguation).toBeInstanceOf(Array);
    expect(r.disambiguation.length).toBeGreaterThan(0);
  });

  it('returns disambiguation for empty input', async () => {
    const r = await engine.classify('');
    expect(r.intent).toBe('unknown');
    expect(r.ambiguous).toBe(true);
    expect(r.disambiguation.length).toBeGreaterThanOrEqual(3);
  });

  it('generates relevant suggestions for partially matching input', () => {
    const suggestions = engine.generateDisambiguation('story something');
    expect(suggestions.length).toBeGreaterThan(0);
    // Should suggest story-related intents
    const joined = suggestions.join(' ');
    expect(joined.toLowerCase()).toMatch(/story/);
  });

  it('generates generic suggestions when nothing matches', () => {
    const suggestions = engine.generateDisambiguation('zzzzzzz');
    expect(suggestions.length).toBeGreaterThanOrEqual(3);
  });

  it('returns max 5 disambiguation suggestions', () => {
    const suggestions = engine.generateDisambiguation('create design build deploy');
    expect(suggestions.length).toBeLessThanOrEqual(5);
  });
});

// ---------------------------------------------------------------------------
// Tier 2 LLM Fallback
// ---------------------------------------------------------------------------

describe('Tier 2 LLM fallback', () => {
  it('uses LLM client when provided and Tier 1 confidence is low', async () => {
    const mockLlmClient = {
      classify: jest.fn().mockResolvedValue({
        intent: 'story.develop',
        category: 'development',
        confidence: 0.85,
        patternEntities: { featureName: 'user auth' },
      }),
    };
    const engine = new IntentEngine({ llmClient: mockLlmClient });
    engine.loadPatterns();

    // Use an input that would be unknown to Tier 1
    const r = await engine.classify('please handle the user auth thing');
    // LLM client should have been called since Tier 1 confidence < 0.80
    expect(mockLlmClient.classify).toHaveBeenCalled();
  });

  it('falls back to unknown on LLM timeout', async () => {
    jest.useFakeTimers();
    const mockLlmClient = {
      classify: jest.fn().mockImplementation(() =>
        new Promise((resolve) => setTimeout(() => resolve({ intent: 'story.develop' }), 10000)),
      ),
    };
    const engine = new IntentEngine({ llmClient: mockLlmClient });
    engine.loadPatterns();

    const classifyPromise = engine.classify('some totally ambiguous request');
    // Advance timers past LLM_TIMEOUT_MS (5000ms) to trigger the timeout
    jest.advanceTimersByTime(6000);
    const r = await classifyPromise;
    // Should have timed out and returned unknown
    expect(r.intent).toBe('unknown');
    expect(r.ambiguous).toBe(true);
    jest.useRealTimers();
  }, 10000);

  it('falls back to unknown on LLM error', async () => {
    const mockLlmClient = {
      classify: jest.fn().mockRejectedValue(new Error('API error')),
    };
    const engine = new IntentEngine({ llmClient: mockLlmClient });
    engine.loadPatterns();

    const r = await engine.classify('something ambiguous');
    expect(r.ambiguous).toBe(true);
  });

  it('does not call LLM when Tier 1 confidence >= 0.80', async () => {
    const mockLlmClient = {
      classify: jest.fn().mockResolvedValue({ intent: 'whatever' }),
    };
    const engine = new IntentEngine({ llmClient: mockLlmClient });
    engine.loadPatterns();

    await engine.classify('implement story 3.2'); // High confidence Tier 1 match
    expect(mockLlmClient.classify).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Latency Assertions
// ---------------------------------------------------------------------------

describe('Latency', () => {
  let engine;
  beforeEach(() => { engine = freshEngine(); });

  it('classifies "implement story 3.2" in under 200ms', async () => {
    const start = performance.now();
    await engine.classify('implement story 3.2');
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(200);
  });

  it('classifies "status" in under 200ms', async () => {
    const start = performance.now();
    await engine.classify('status');
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(200);
  });

  it('classifies "create next story from epic 2" in under 200ms', async () => {
    const start = performance.now();
    await engine.classify('create next story from epic 2');
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(200);
  });

  it('classifies unknown input in under 200ms', async () => {
    const start = performance.now();
    await engine.classify('xyzzy foobar qwert');
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(200);
  });

  it('classifies empty input in under 200ms', async () => {
    const start = performance.now();
    await engine.classify('');
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(200);
  });

  it('Tier 1 pattern matching completes in under 5ms for 10 consecutive calls', () => {
    const inputs = [
      'implement story 3.2', 'create next story', 'status', 'push',
      'yolo', '@dev fix it', 'help', 'deploy', 'review story 1.1', 'research API',
    ];
    for (const input of inputs) {
      const { normalized } = engine.preprocess(input);
      const start = performance.now();
      engine.classifyTier1(normalized);
      const elapsed = performance.now() - start;
      expect(elapsed).toBeLessThan(5);
    }
  });
});

// ---------------------------------------------------------------------------
// Edge Cases
// ---------------------------------------------------------------------------

describe('Edge cases', () => {
  let engine;
  beforeEach(() => { engine = freshEngine(); });

  it('handles very long input without crashing', async () => {
    const longInput = 'implement '.repeat(1000) + 'story 1.2';
    const r = await engine.classify(longInput);
    expect(r).toBeDefined();
    expect(r.rawInput).toBeTruthy();
  });

  it('handles input with special characters', async () => {
    const r = await engine.classify('implement story 3.2! @#$%^&*()');
    expect(r.intent).toBe('story.develop');
    expect(r.entities.storyId).toBe('3.2');
  });

  it('handles input with newlines', async () => {
    const r = await engine.classify('implement\nstory\n3.2');
    // newlines should be preserved in raw but matching works on trimmed
    expect(r).toBeDefined();
  });

  it('handles input with unicode characters', async () => {
    const r = await engine.classify('implementar story 2.1 com acentuacao');
    expect(r.intent).toBe('story.develop');
  });

  it('handles multiple story IDs - extracts first', async () => {
    const r = await engine.classify('implement story 3.2 and then story 4.1');
    expect(r.entities.storyId).toBe('3.2');
  });

  it('handles numeric-only input', async () => {
    const r = await engine.classify('3.2');
    // Should extract storyId even without intent verb
    expect(r.entities.storyId).toBe('3.2');
  });

  it('is case-insensitive for intent matching', async () => {
    const r1 = await engine.classify('IMPLEMENT STORY 3.2');
    const r2 = await engine.classify('implement story 3.2');
    expect(r1.intent).toBe(r2.intent);
    expect(r1.confidence).toBe(r2.confidence);
  });
});

// ---------------------------------------------------------------------------
// Suggested Action
// ---------------------------------------------------------------------------

describe('Suggested action', () => {
  let engine;
  beforeEach(() => { engine = freshEngine(); });

  it('suggests agent activation for story.develop', async () => {
    const r = await engine.classify('implement story 3.2');
    expect(r.suggestedAction).toContain('@dev');
    expect(r.suggestedAction).toContain('*develop');
  });

  it('suggests workflow for story.full_cycle', async () => {
    const r = await engine.classify('full cycle');
    expect(r.suggestedAction).toContain('workflow');
  });

  it('suggests internal handler for status.query', async () => {
    const r = await engine.classify('status');
    expect(r.suggestedAction).toContain('internal');
  });

  it('suggests passthrough for agent.direct', async () => {
    const r = await engine.classify('@architect analyze');
    expect(r.suggestedAction).toContain('@architect');
  });

  it('provides fallback action for unknown input', async () => {
    const r = await engine.classify('xyzzy');
    expect(r.suggestedAction).toContain('help');
  });
});

// ---------------------------------------------------------------------------
// Module-level convenience function
// ---------------------------------------------------------------------------

describe('classifyIntent convenience function', () => {
  beforeEach(() => { resetDefaultEngine(); });

  it('creates engine on first call and returns valid result', async () => {
    const r = await classifyIntent('implement story 3.2');
    expect(r.intent).toBe('story.develop');
    expect(r.entities.storyId).toBe('3.2');
  });

  it('reuses engine across multiple calls', async () => {
    const r1 = await classifyIntent('status');
    const r2 = await classifyIntent('help');
    expect(r1.intent).toBe('status.query');
    expect(r2.intent).toBe('help.general');
  });

  it('accepts session context', async () => {
    const r = await classifyIntent('start developing', { currentStory: 'story-2.3' });
    expect(r.context.currentStory).toBe('story-2.3');
    expect(r.entities.storyId).toBe('2.3');
  });
});

// ---------------------------------------------------------------------------
// Constants and exports
// ---------------------------------------------------------------------------

describe('Module exports', () => {
  it('exports all required items', () => {
    expect(IntentEngine).toBeDefined();
    expect(classifyIntent).toBeDefined();
    expect(createStructuredIntent).toBeDefined();
    expect(resetDefaultEngine).toBeDefined();
    expect(TIER1_CONFIDENCE_THRESHOLD).toBe(0.80);
    expect(VALID_CATEGORIES).toContain('development');
    expect(VALID_CATEGORIES).toContain('unknown');
    expect(KNOWN_AGENTS).toContain('dev');
    expect(KNOWN_AGENTS).toContain('architect');
  });
});
