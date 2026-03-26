# evaluate-ai-visibility

## Task: Evaluate AI Search Visibility & GEO Signals

### Metadata
- **executor:** ai-visibility-optimizer
- **elicit:** false (runs as part of Phase 1 parallel audit)
- **mode:** evaluation
- **output:** scores.ai_visibility (0-10) + ai-visibility-findings.json

### Purpose
Audit the site's readiness for AI-powered search (ChatGPT, Perplexity, Gemini, Claude,
SGE). Evaluates GEO (Generative Engine Optimization) signals: llms.txt presence, citation
potential, self-contained content blocks, structured answer formatting, and AI crawler
policy. Produces a numeric score (0-10) plus a findings report for optimization.

### Prerequisites
- Target URL or project path available from workflow inputs
- Page list identified by crawl step

### Execution Steps

#### Step 1: Check llms.txt & Crawler Policy
- [ ] `llms.txt` present at site root (e.g., `https://example.com/llms.txt`)
  - Verify it follows the llms.txt spec: site description, allowed sections, key URLs
- [ ] `robots.txt` has explicit AI crawler policy defined
  - Check for rules targeting: `GPTBot`, `ClaudeBot`, `PerplexityBot`, `GoogleOther`
  - Determine policy: allow all, block all, or selective (preferred: allow with guidance)

#### Step 2: Content Structure for AI Parsability
For each page, evaluate:
- [ ] **Semantic HTML structure:** `<article>`, `<section>`, `<h1>`–`<h3>` used meaningfully
- [ ] **Self-contained content blocks:** each section makes sense without reading surrounding context
- [ ] **Direct answer formatting:** key questions answered directly in first 1-2 sentences of a section
  - Pattern: "What is X? X is..." (featured snippet / AI citation style)
- [ ] **Structured data for AI:** `FAQPage`, `HowTo`, `Article` schema present (increases citation probability)

#### Step 3: Citation Potential Assessment
Evaluate whether the content is likely to be cited by AI systems:
- [ ] **Quantitative statistics present:** specific numbers, percentages, dates (e.g., "aumentou 47% em 2024")
- [ ] **Citable claims with sources:** external citations to authoritative sources (gov, academic, industry reports)
- [ ] **Original information/research:** proprietary data, surveys, case studies, unique insights
- [ ] **Content is unique:** not commodity content that AI already knows (generic how-tos without original angle)

#### Step 4: Score Calculation
Assign points (0-10) based on findings:

| Check | Points |
|-------|--------|
| llms.txt present and valid | 2 |
| robots.txt AI crawler policy defined | 1 |
| Semantic HTML structure used correctly | 1 |
| Self-contained content blocks (no context dependency) | 1 |
| Direct answer formatting for key questions | 1 |
| FAQPage / HowTo / Article schema present | 1 |
| Quantitative statistics in content | 1 |
| Citations to credible external sources | 1 |
| Original information / proprietary data present | 1 |

### Output Format
```json
{
  "category": "ai_visibility",
  "score": 4,
  "max": 10,
  "grade": "D",
  "checks": [
    { "id": "llms_txt", "status": "FAIL", "detail": "llms.txt not found at /llms.txt" },
    { "id": "robots_ai_policy", "status": "FAIL", "detail": "No GPTBot or ClaudeBot rules in robots.txt" },
    { "id": "semantic_html", "status": "PASS", "detail": "Correct use of article, section, h1-h3" },
    { "id": "self_contained_blocks", "status": "WARN", "detail": "2 sections reference 'as mentioned above' — context-dependent" },
    { "id": "direct_answers", "status": "PASS", "detail": "FAQ section uses question-then-answer format" },
    { "id": "faq_schema", "status": "FAIL", "detail": "FAQ content present but no FAQPage schema" },
    { "id": "quantitative_stats", "status": "PASS", "detail": "7 statistics found across 3 pages" },
    { "id": "external_citations", "status": "WARN", "detail": "Only 1 citation to an external authoritative source" },
    { "id": "original_content", "status": "PASS", "detail": "Proprietary case study data found on /case-studies" }
  ],
  "fixable_items": [
    "Generate llms.txt with site structure",
    "Add GPTBot and ClaudeBot directives to robots.txt",
    "Add FAQPage schema to /faq page",
    "Rewrite 2 context-dependent content blocks to be self-contained"
  ]
}
```

### Veto Conditions
- Do NOT assign full marks (10/10) without llms.txt confirmed present and valid
- Do NOT mark AI crawler policy as PASS if only `Disallow: /` exists for AI bots (blocking = FAIL for visibility)
- Do NOT evaluate semantic HTML by tag presence alone — assess whether tags are used meaningfully
- Do NOT mark "original content" as PASS for generic how-to content without unique angle or data

### Completion Criteria
- All 9 scoring checks evaluated with PASS/WARN/FAIL status
- llms.txt presence and validity confirmed
- robots.txt AI crawler policy documented (allow/block/undefined per bot)
- Citation potential assessed per page
- List of fixable items generated for optimize-ai-visibility.md
- Score returned as integer 0-10 to workflow aggregator
