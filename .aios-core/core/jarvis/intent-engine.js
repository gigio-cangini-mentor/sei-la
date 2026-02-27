#!/usr/bin/env node

/**
 * JARVIS Intent Classification Engine
 *
 * Two-tier intent classification system:
 *   Tier 1: Deterministic pattern matching (<5ms, ~85% coverage)
 *   Tier 2: LLM fallback for ambiguous cases (placeholder/stub)
 *
 * Pipeline: Preprocessor -> Intent Classifier -> Entity Extractor -> Context Enricher
 *
 * @module intent-engine
 * @story 1.2
 * @architecture docs/stories/jarvis/ARCHITECTURE-JARVIS.md#4.1
 */

'use strict';

const path = require('path');
const fs = require('fs');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Minimum confidence to skip LLM fallback */
const TIER1_CONFIDENCE_THRESHOLD = 0.80;

/** Warning threshold for Tier 1 latency in ms */
const TIER1_LATENCY_WARN_MS = 5;

/** Maximum latency for full classification in ms */
const MAX_CLASSIFICATION_LATENCY_MS = 200;

/** LLM fallback timeout in ms */
const LLM_TIMEOUT_MS = 5000;

/** Valid intent categories (from AC2) */
const VALID_CATEGORIES = [
  'development',
  'planning',
  'research',
  'operations',
  'status_inquiry',
  'meta_configuration',
  'unknown',
];

/** Known agent names for entity extraction */
const KNOWN_AGENTS = [
  'dev', 'qa', 'architect', 'pm', 'po', 'sm',
  'analyst', 'data-engineer', 'ux-design-expert', 'devops', 'aios-master',
];

// ---------------------------------------------------------------------------
// StructuredIntent factory
// ---------------------------------------------------------------------------

/**
 * Create a StructuredIntent object with all required fields.
 *
 * @param {object} [overrides] - Fields to override
 * @returns {object} A complete StructuredIntent
 */
function createStructuredIntent(overrides = {}) {
  const defaultEntities = {
    storyId: null,
    epicId: null,
    agentHint: null,
    featureName: null,
    filePaths: [],
    topic: null,
    mode: null,
  };
  const defaultContext = {
    currentStory: null,
    currentBranch: null,
    workflowState: null,
    previousIntent: null,
  };

  const base = {
    intent: 'unknown',
    category: 'unknown',
    confidence: 0,
    suggestedAction: '',
    rawInput: '',
    ambiguous: false,
    disambiguation: [],
    ...overrides,
  };

  base.entities = { ...defaultEntities, ...(overrides.entities || {}) };
  base.context = { ...defaultContext, ...(overrides.context || {}) };

  return base;
}

// ---------------------------------------------------------------------------
// IntentEngine class
// ---------------------------------------------------------------------------

class IntentEngine {
  /**
   * @param {object} [options]
   * @param {string} [options.patternsPath] - Override path to intent-patterns.yaml
   * @param {object} [options.llmClient] - LLM client for Tier 2 fallback (stub by default)
   */
  constructor(options = {}) {
    this._patternsPath = options.patternsPath ||
      path.join(__dirname, 'intent-patterns.yaml');
    this._llmClient = options.llmClient || null;
    this._patterns = [];
    this._aliases = {};
    this._intentMapping = {};
    this._loaded = false;
    this._compiledPatterns = [];
  }

  // -------------------------------------------------------------------------
  // Pattern Loading
  // -------------------------------------------------------------------------

  /**
   * Load and compile patterns from YAML file.
   * Called once at initialization, not per-call.
   *
   * @returns {void}
   */
  loadPatterns() {
    let yaml;
    try {
      yaml = require('js-yaml');
    } catch {
      throw new Error('js-yaml is required: npm install js-yaml');
    }

    const rawYaml = fs.readFileSync(this._patternsPath, 'utf8');
    const parsed = yaml.load(rawYaml);

    this._aliases = parsed.aliases || {};
    this._patterns = parsed.patterns || [];
    this._intentMapping = parsed.intentMapping || {};

    // Pre-compile regex patterns for performance
    this._compiledPatterns = this._patterns.map((p) => {
      try {
        return {
          ...p,
          _regex: new RegExp(p.pattern, 'i'),
          _entityRegexes: (p.entities || []).map((e) => ({
            name: e.name,
            _regex: new RegExp(e.regex, 'i'),
            group: e.group || 1,
          })),
        };
      } catch (err) {
        // Skip patterns with invalid regex -- log and continue
        if (process.env.AIOS_DEBUG) {
          console.warn(`[IntentEngine] Invalid regex in pattern: ${p.pattern} - ${err.message}`);
        }
        return null;
      }
    }).filter(Boolean);

    this._loaded = true;
  }

  /**
   * Ensure patterns are loaded.
   * @private
   */
  _ensureLoaded() {
    if (!this._loaded) {
      this.loadPatterns();
    }
  }

  // -------------------------------------------------------------------------
  // Preprocessor
  // -------------------------------------------------------------------------

  /**
   * Normalize and preprocess user input.
   * - Trim whitespace
   * - Lowercase for matching (preserve original for rawInput)
   * - Expand known aliases (Portuguese -> English)
   * - Detect language hint
   *
   * @param {string} rawInput
   * @returns {{ normalized: string, language: string, original: string }}
   */
  preprocess(rawInput) {
    if (!rawInput || typeof rawInput !== 'string') {
      return { normalized: '', language: 'en', original: '' };
    }

    const original = rawInput.trim();
    let normalized = original.toLowerCase();

    // Detect language hint (simple heuristic)
    const language = this._detectLanguage(normalized);

    // Expand aliases
    normalized = this._expandAliases(normalized);

    return { normalized, language, original };
  }

  /**
   * Simple language detection based on keyword presence.
   * @private
   * @param {string} text
   * @returns {string} 'pt' or 'en'
   */
  _detectLanguage(text) {
    const ptKeywords = [
      'implementar', 'implementa', 'desenvolver', 'construir', 'criar',
      'validar', 'revisar', 'testar', 'enviar', 'publicar', 'ajuda',
      'proximo', 'proxima', 'historia', 'epico', 'esquema', 'pesquisar',
      'analisar', 'configurar', 'mudar', 'trocar',
    ];
    for (const kw of ptKeywords) {
      if (text.includes(kw)) return 'pt';
    }
    return 'en';
  }

  /**
   * Expand aliases in normalized text.
   * @private
   * @param {string} text
   * @returns {string}
   */
  _expandAliases(text) {
    this._ensureLoaded();
    let result = text;
    for (const [alias, expansion] of Object.entries(this._aliases)) {
      // Word boundary replacement to avoid partial matches
      const regex = new RegExp(`\\b${this._escapeRegex(alias)}\\b`, 'gi');
      result = result.replace(regex, expansion);
    }
    return result;
  }

  /**
   * Escape special regex characters in a string.
   * @private
   * @param {string} str
   * @returns {string}
   */
  _escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // -------------------------------------------------------------------------
  // Intent Classifier (Tier 1 - Pattern Matching)
  // -------------------------------------------------------------------------

  /**
   * Classify input using Tier 1 deterministic pattern matching.
   *
   * @param {string} normalizedInput - Preprocessed input
   * @returns {{ intent: string, category: string, confidence: number, patternEntities: object } | null}
   */
  classifyTier1(normalizedInput) {
    this._ensureLoaded();

    if (!normalizedInput) return null;

    let bestMatch = null;
    let bestConfidence = 0;

    for (const cp of this._compiledPatterns) {
      const match = cp._regex.exec(normalizedInput);
      if (match && cp.confidence > bestConfidence) {
        // Extract entities defined in this pattern
        const patternEntities = {};
        for (const entityDef of cp._entityRegexes) {
          const entityMatch = entityDef._regex.exec(normalizedInput);
          if (entityMatch) {
            patternEntities[entityDef.name] = entityMatch[entityDef.group] || entityMatch[1] || entityMatch[0];
          }
        }

        bestMatch = {
          intent: cp.intent,
          category: cp.category,
          confidence: cp.confidence,
          patternEntities,
        };
        bestConfidence = cp.confidence;
      }
    }

    return bestMatch;
  }

  // -------------------------------------------------------------------------
  // Intent Classifier (Tier 2 - LLM Fallback)
  // -------------------------------------------------------------------------

  /**
   * Classify input using LLM fallback (stub implementation).
   * Real LLM integration will be added in a future story.
   *
   * When Tier 1 confidence < TIER1_CONFIDENCE_THRESHOLD, this is invoked.
   * Current implementation returns the Tier 1 result (if any) with a
   * flag indicating LLM was not actually used.
   *
   * @param {string} rawInput - Original user input
   * @param {object} [tier1Result] - Result from Tier 1 (may be null)
   * @param {object} [sessionContext] - Session context for LLM prompt
   * @returns {Promise<object|null>} Classification result or null
   */
  async classifyTier2(rawInput, tier1Result, sessionContext) {
    // If an llmClient is provided, attempt real classification
    if (this._llmClient && typeof this._llmClient.classify === 'function') {
      let timeoutHandle;
      try {
        const result = await Promise.race([
          this._llmClient.classify(rawInput, sessionContext),
          new Promise((_, reject) => {
            timeoutHandle = setTimeout(() => reject(new Error('LLM timeout')), LLM_TIMEOUT_MS);
          }),
        ]);
        clearTimeout(timeoutHandle);
        return result;
      } catch (err) {
        clearTimeout(timeoutHandle);
        // On any LLM error, return unknown with ambiguous: true
        if (process.env.AIOS_DEBUG) {
          console.warn(`[IntentEngine] LLM fallback failed: ${err.message}`);
        }
        return {
          intent: 'unknown',
          category: 'unknown',
          confidence: 0,
          patternEntities: {},
          llmFailed: true,
        };
      }
    }

    // Stub: return Tier 1 result with flag, or null
    if (tier1Result) {
      return { ...tier1Result, llmStub: true };
    }

    return null;
  }

  // -------------------------------------------------------------------------
  // Entity Extractor
  // -------------------------------------------------------------------------

  /**
   * Extract entities from raw input independent of pattern matching.
   * This runs globally to catch entities the pattern-specific regexes might miss.
   *
   * @param {string} text - Preprocessed or raw input
   * @returns {object} Extracted entities
   */
  extractEntities(text) {
    if (!text || typeof text !== 'string') {
      return {};
    }

    const entities = {};

    // Story ID: e.g. "3.2", "1.1", "story 2.5"
    const storyMatch = text.match(/(?:story\s+)?(\d+\.\d+)/i);
    if (storyMatch) {
      entities.storyId = storyMatch[1];
    }

    // Epic ID: e.g. "epic 2", "epic number 3", "from epic 5"
    const epicMatch = text.match(/(?:epic|from\s+epic)\s+(?:number\s+)?(\d+)/i);
    if (epicMatch) {
      entities.epicId = epicMatch[1];
    }

    // Agent hint: @dev, @architect, etc.
    const agentMatch = text.match(/@([\w-]+)/);
    if (agentMatch && KNOWN_AGENTS.includes(agentMatch[1])) {
      entities.agentHint = agentMatch[1];
    }

    // Feature name: quoted strings or "the X feature/module/system"
    const quotedMatch = text.match(/["']([^"']+)["']/);
    if (quotedMatch) {
      entities.featureName = quotedMatch[1];
    } else {
      const featureMatch = text.match(/(?:the|this)\s+([\w\s-]+?)\s+(?:feature|module|system|component|service)/i);
      if (featureMatch) {
        entities.featureName = featureMatch[1].trim();
      }
    }

    // File paths: detect common path patterns
    const filePaths = [];
    const pathRegex = /(?:^|\s)((?:\.\/|\.\.\/|\/|[\w-]+\/)+[\w.-]+\.\w+)/g;
    let pathMatch;
    while ((pathMatch = pathRegex.exec(text)) !== null) {
      filePaths.push(pathMatch[1]);
    }
    if (filePaths.length > 0) {
      entities.filePaths = filePaths;
    }

    // Topic: for research/spec intents - extracted by pattern entities, but also globally
    // Topic is captured by pattern entity regexes, so skip global extraction to avoid duplication

    // Mode: yolo, interactive, preflight
    const modeMatch = text.match(/\b(yolo|interactive|preflight|autonomous|supervised|assisted)\b/i);
    if (modeMatch) {
      entities.mode = modeMatch[1].toLowerCase();
    }

    return entities;
  }

  // -------------------------------------------------------------------------
  // Context Enricher
  // -------------------------------------------------------------------------

  /**
   * Enrich a StructuredIntent with session context.
   * Session context is optional (Story 1.6 provides it).
   *
   * Priority:
   * 1. Explicit user mention in raw input (already in entities)
   * 2. Active session state
   * 3. Previous intent from session
   *
   * @param {object} intent - The StructuredIntent to enrich
   * @param {object} [sessionContext] - Session context from caller
   * @returns {object} Enriched StructuredIntent
   */
  enrichContext(intent, sessionContext) {
    if (!sessionContext || typeof sessionContext !== 'object') {
      return intent;
    }

    const enriched = { ...intent };
    enriched.context = { ...intent.context };

    // Copy session state into context
    if (sessionContext.currentStory) {
      enriched.context.currentStory = sessionContext.currentStory;
      // If no storyId in entities, infer from session
      if (!enriched.entities.storyId && sessionContext.currentStory) {
        const storyIdMatch = String(sessionContext.currentStory).match(/(\d+\.\d+)/);
        if (storyIdMatch) {
          enriched.entities = { ...enriched.entities, storyId: storyIdMatch[1] };
        }
      }
    }

    if (sessionContext.currentBranch) {
      enriched.context.currentBranch = sessionContext.currentBranch;
    }

    if (sessionContext.workflowState) {
      enriched.context.workflowState = sessionContext.workflowState;
    }

    if (sessionContext.previousIntent) {
      enriched.context.previousIntent = sessionContext.previousIntent;
    }

    return enriched;
  }

  // -------------------------------------------------------------------------
  // Disambiguation
  // -------------------------------------------------------------------------

  /**
   * Generate disambiguation suggestions for unknown or ambiguous intents.
   * Uses partial keyword matching against known patterns.
   *
   * @param {string} normalizedInput
   * @returns {string[]} Array of suggestion strings
   */
  generateDisambiguation(normalizedInput) {
    if (!normalizedInput) {
      return [
        'Try: "implement story X.Y" to develop a story',
        'Try: "create next story" to draft a new story',
        'Try: "status" to check project status',
        'Try: "help" to see available commands',
      ];
    }

    this._ensureLoaded();

    const suggestions = [];
    const words = normalizedInput.split(/\s+/).filter((w) => w.length > 2);

    // Find patterns that partially match input words
    const scored = [];
    for (const cp of this._compiledPatterns) {
      let score = 0;
      for (const word of words) {
        if (cp.pattern.toLowerCase().includes(word)) {
          score++;
        }
        if (cp.intent.toLowerCase().includes(word)) {
          score++;
        }
      }
      if (score > 0) {
        scored.push({ intent: cp.intent, category: cp.category, score });
      }
    }

    // Sort by score descending, take top 5 unique intents
    scored.sort((a, b) => b.score - a.score);
    const seen = new Set();
    for (const item of scored) {
      if (seen.has(item.intent)) continue;
      seen.add(item.intent);
      suggestions.push(this._intentToSuggestion(item.intent));
      if (suggestions.length >= 5) break;
    }

    // If no partial matches, return generic suggestions
    if (suggestions.length === 0) {
      return [
        'Try: "implement story X.Y" to develop a story',
        'Try: "create next story" to draft a new story',
        'Try: "status" to check project status',
        'Try: "help" to see available commands',
      ];
    }

    return suggestions;
  }

  /**
   * Convert an intent identifier to a human-readable suggestion.
   * @private
   * @param {string} intent
   * @returns {string}
   */
  _intentToSuggestion(intent) {
    const suggestionMap = {
      'story.create': 'Create a new story? Try: "create next story from epic N"',
      'story.validate': 'Validate a story? Try: "validate story X.Y"',
      'story.develop': 'Implement a story? Try: "implement story X.Y"',
      'story.review': 'Run QA review? Try: "review story X.Y"',
      'story.push': 'Push changes? Try: "push the changes"',
      'story.full_cycle': 'Full development cycle? Try: "implement end to end"',
      'arch.create_fullstack': 'Design architecture? Try: "create system architecture"',
      'arch.create_backend': 'Backend architecture? Try: "create backend architecture"',
      'arch.create_frontend': 'Frontend design? Try: "design the frontend architecture"',
      'arch.analyze': 'Analyze project? Try: "analyze project structure"',
      'spec.pipeline': 'Write a spec? Try: "create PRD for feature"',
      'qa.loop': 'QA iteration? Try: "keep reviewing until it passes"',
      'brownfield.discover': 'Legacy assessment? Try: "assess this legacy codebase"',
      'db.design': 'Database design? Try: "design the database schema"',
      'ux.audit': 'UX audit? Try: "audit the frontend UX"',
      'epic.create': 'Create epic? Try: "create a new epic for feature"',
      'epic.execute': 'Execute epic? Try: "execute epic N"',
      'status.query': 'Check status? Try: "status" or "what is happening?"',
      'help.general': 'Need help? Try: "help" or "what can you do?"',
      'mode.yolo': 'Switch mode? Try: "yolo" or "go autonomous"',
      'mode.configure': 'Configure? Try: "switch to supervised mode"',
      'agent.direct': 'Direct agent? Try: "@agent-name action"',
      'research.general': 'Research something? Try: "research topic-name"',
    };

    return suggestionMap[intent] || `Did you mean: "${intent.replace('.', ' ')}"?`;
  }

  // -------------------------------------------------------------------------
  // Suggested Action Builder
  // -------------------------------------------------------------------------

  /**
   * Build a human-readable suggested action string based on intent + entities.
   * @private
   * @param {string} intent
   * @param {object} entities
   * @returns {string}
   */
  _buildSuggestedAction(intent, entities) {
    const mapping = this._intentMapping[intent];
    if (!mapping) {
      return 'I could not determine a specific action. Try "help" for available commands.';
    }

    if (mapping.passthrough && entities.agentHint) {
      return `Route to @${entities.agentHint} for direct execution`;
    }

    if (mapping.internal) {
      return `Execute internal handler: ${mapping.handler}`;
    }

    if (mapping.workflow) {
      return `Start workflow: ${mapping.workflow}`;
    }

    const parts = [`Activate ${mapping.agent}`];
    if (mapping.command) {
      let cmd = mapping.command;
      if (entities.storyId) cmd += ` ${entities.storyId}`;
      else if (entities.epicId) cmd += ` ${entities.epicId}`;
      parts.push(`execute ${cmd}`);
    }
    return parts.join(', ');
  }

  // -------------------------------------------------------------------------
  // Main Classification Pipeline
  // -------------------------------------------------------------------------

  /**
   * Classify a raw user input into a StructuredIntent.
   * This is the main entry point for the Intent Engine.
   *
   * Pipeline: Preprocess -> Tier 1 -> (Tier 2 if needed) -> Entity Extract -> Context Enrich
   *
   * @param {string} rawInput - The user's natural language input
   * @param {object} [sessionContext] - Optional session context
   * @returns {Promise<object>} StructuredIntent
   */
  async classify(rawInput, sessionContext) {
    const startTime = Date.now();

    // Step 1: Preprocess
    const { normalized, original } = this.preprocess(rawInput);

    if (!normalized) {
      return createStructuredIntent({
        rawInput: original || '',
        intent: 'unknown',
        category: 'unknown',
        confidence: 0,
        ambiguous: true,
        disambiguation: this.generateDisambiguation(''),
        suggestedAction: 'Please provide a request. Try "help" for available commands.',
      });
    }

    // Step 2: Tier 1 pattern matching
    const tier1Start = Date.now();
    const tier1Result = this.classifyTier1(normalized);
    const tier1End = Date.now();
    const tier1Latency = tier1End - tier1Start;

    // Latency warning for Tier 1
    if (tier1Latency > TIER1_LATENCY_WARN_MS && process.env.AIOS_DEBUG) {
      console.warn(`[IntentEngine] Tier 1 latency warning: ${tier1Latency.toFixed(2)}ms (threshold: ${TIER1_LATENCY_WARN_MS}ms)`);
    }

    let classificationResult = tier1Result;

    // Step 3: Tier 2 LLM fallback if needed
    if (!tier1Result || tier1Result.confidence < TIER1_CONFIDENCE_THRESHOLD) {
      const tier2Result = await this.classifyTier2(original, tier1Result, sessionContext);
      if (tier2Result && (!tier1Result || tier2Result.confidence > tier1Result.confidence)) {
        classificationResult = tier2Result;
      }
    }

    // Step 4: Global entity extraction
    const globalEntities = this.extractEntities(original);
    const patternEntities = classificationResult ? (classificationResult.patternEntities || {}) : {};

    // Merge entities: pattern-specific takes priority, then global
    const mergedEntities = {
      ...globalEntities,
      ...patternEntities,
    };
    // Remove null/undefined but keep empty arrays
    for (const [key, value] of Object.entries(mergedEntities)) {
      if (value === undefined) delete mergedEntities[key];
    }

    // Step 5: Build StructuredIntent
    const isUnknown = !classificationResult;
    const isAmbiguous = isUnknown ||
      (classificationResult && classificationResult.confidence < TIER1_CONFIDENCE_THRESHOLD);

    const intent = createStructuredIntent({
      intent: classificationResult ? classificationResult.intent : 'unknown',
      category: classificationResult ? classificationResult.category : 'unknown',
      confidence: classificationResult ? classificationResult.confidence : 0,
      entities: mergedEntities,
      rawInput: original,
      ambiguous: isAmbiguous,
      disambiguation: isAmbiguous ? this.generateDisambiguation(normalized) : [],
      suggestedAction: classificationResult
        ? this._buildSuggestedAction(classificationResult.intent, mergedEntities)
        : 'I could not determine a specific action. Try "help" for available commands.',
    });

    // Step 6: Context enrichment
    const enriched = this.enrichContext(intent, sessionContext);

    // Total latency check
    const endTime = Date.now();
    const totalLatency = endTime - startTime;

    if (totalLatency > MAX_CLASSIFICATION_LATENCY_MS && process.env.AIOS_DEBUG) {
      console.warn(`[IntentEngine] Total classification latency: ${totalLatency.toFixed(2)}ms (max: ${MAX_CLASSIFICATION_LATENCY_MS}ms)`);
    }

    return enriched;
  }
}

// ---------------------------------------------------------------------------
// Module-level convenience function
// ---------------------------------------------------------------------------

/** Singleton instance for convenience */
let _defaultEngine = null;

/**
 * Classify user input using the default IntentEngine instance.
 * Creates and initializes the engine on first call.
 *
 * @param {string} rawInput - The user's natural language input
 * @param {object} [sessionContext] - Optional session context
 * @returns {Promise<object>} StructuredIntent
 */
async function classifyIntent(rawInput, sessionContext) {
  if (!_defaultEngine) {
    _defaultEngine = new IntentEngine();
    _defaultEngine.loadPatterns();
  }
  return _defaultEngine.classify(rawInput, sessionContext);
}

/**
 * Reset the default engine singleton (useful for testing).
 */
function resetDefaultEngine() {
  _defaultEngine = null;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = {
  IntentEngine,
  classifyIntent,
  createStructuredIntent,
  resetDefaultEngine,
  // Constants exported for testing
  TIER1_CONFIDENCE_THRESHOLD,
  TIER1_LATENCY_WARN_MS,
  MAX_CLASSIFICATION_LATENCY_MS,
  LLM_TIMEOUT_MS,
  VALID_CATEGORIES,
  KNOWN_AGENTS,
};
