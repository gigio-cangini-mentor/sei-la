# optimize-ai-visibility

## Task: Implement AI Visibility Optimizations (GEO)

### Metadata
- **executor:** ai-visibility-optimizer
- **depends_on:** evaluate-ai-visibility (requires prior findings)
- **elicit:** false (uses audit findings)
- **mode:** direct-edit + content recommendations
- **output:** AI visibility changes recorded in changes-manifest.json

### Purpose
Implement Generative Engine Optimization (GEO) improvements to increase the site's
probability of being cited by AI-powered search engines (ChatGPT, Perplexity, Gemini,
Claude Search, Google SGE). Includes generating llms.txt, hardening AI crawler policy
in robots.txt, restructuring content blocks, and adding direct-answer formatting.

### Prerequisites
- `evaluate-ai-visibility.md` must have been run first
- `ai-visibility-findings.json` available with fixable items list
- robots.txt accessible for editing
- Site structure/page list available for llms.txt generation

### Execution Steps

#### Step 1: Generate llms.txt
Create `/llms.txt` at the site root following the llms.txt specification:

```
# {Site Name}

> {One-sentence description of what the site is about}

## About
{2-3 sentence description covering the site's purpose, audience, and key topics}

## Key Pages
- [Home](https://example.com/): {brief description}
- [About](https://example.com/about): {brief description}
- [Blog](https://example.com/blog): {brief description — list top 5 posts if available}

## Topics Covered
{comma-separated list of main topics}

## Do Not Cite
{list pages NOT suitable for AI citation: login, checkout, admin, search results}
```

#### Step 2: Update robots.txt — AI Crawler Policy
Add explicit directives for major AI crawlers. Default stance: allow with guidance.

```
# AI Search Crawlers
User-agent: GPTBot
Allow: /
Disallow: /admin/
Disallow: /checkout/
Disallow: /account/

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleOther
Allow: /
```

If existing robots.txt has `Disallow: /` for AI bots from audit findings:
- Flag to user before overwriting — this is a policy decision, not purely technical
- Add comment in manifest: "AI crawler policy changed from BLOCK to ALLOW — confirm with site owner"

#### Step 3: Rewrite Context-Dependent Content Blocks
For each block flagged as context-dependent in findings (e.g., uses "as mentioned above",
"in the previous section", "see below"):

Replace with self-contained version. Example:
```markdown
<!-- ANTES (contexto-dependente) -->
Como mencionamos acima, essa técnica reduz o tempo de carregamento.

<!-- DEPOIS (auto-contido) -->
A técnica de lazy loading reduz o tempo de carregamento da página ao adiar
o carregamento de imagens que estão fora da área visível do usuário.
```

#### Step 4: Add Direct-Answer Formatting to Key Sections
For pages that answer a primary question (FAQ, how-to, definition pages), restructure
the opening sentence of each section to answer directly:

```markdown
<!-- ANTES -->
Neste artigo, vamos explorar o conceito de SEO técnico e como ele funciona.

<!-- DEPOIS -->
SEO técnico é o conjunto de otimizações feitas na infraestrutura de um site —
como velocidade, rastreabilidade e dados estruturados — para facilitar o
trabalho dos mecanismos de busca.
```

#### Step 5: Generate FAQPage Schema Recommendations
For pages with FAQ content that lack `FAQPage` schema, output the JSON-LD to add
(delegate actual schema injection to schema-architect if available, otherwise include
in recommendations):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é SEO técnico?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO técnico é o conjunto de otimizações feitas na infraestrutura..."
      }
    }
  ]
}
```

### Veto Conditions
- Do NOT set `Disallow: /` for all AI crawlers without explicit user confirmation
- Do NOT rewrite content paragraphs — only restructure opening sentences for direct-answer format
- Do NOT generate llms.txt that lists private, admin, or user-account pages as citable
- Do NOT add FAQPage schema if no actual FAQ content exists on the page (schema must reflect real content)

### Completion Criteria
- `llms.txt` generated and placed at site root
- robots.txt updated with AI crawler policy for GPTBot, ClaudeBot, PerplexityBot, GoogleOther
- All context-dependent content blocks rewritten to be self-contained
- Direct-answer formatting applied to key question/answer sections
- FAQPage schema recommendations generated for pages with FAQ content lacking schema
- All changes recorded in changes-manifest.json with before/after values
