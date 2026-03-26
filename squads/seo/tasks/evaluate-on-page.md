# evaluate-on-page

## Task: On-Page SEO Evaluation (Score 0-25)

### Metadata
- **agent:** on-page-optimizer
- **trigger:** Phase 1 parallel evaluation in `wf-seo-full-cycle`
- **elicit:** false (inputs provided by orchestrator)
- **output:** `scores.on_page` (0-25) + per-check breakdown

---

### Purpose

Evaluate all on-page SEO factors for each target page and return a category score (0-25).
Covers meta tags, heading structure, keyword placement, density, readability, internal/external links,
and social meta tags. Each check is scored individually and reported as PASS / WARN / FAIL.

---

### Inputs

```
target_pages: list of URLs or file paths to evaluate
focus_keyphrases: primary keyphrase per page (auto-detect if not provided)
language: page language (default: auto-detect)
```

---

### Execution Steps

#### Step 1: Keyphrase Detection
- If `focus_keyphrases` not provided: analyze H1, title, first paragraph, and top recurring phrases
- Suggest top 3 keyphrase candidates per page; use highest-confidence candidate for scoring
- Log detected keyphrase with confidence level

#### Step 2: Meta Tag Audit
- Check `<title>`: presence, character length (50-60), keyword placement (front-loaded)
- Check `<meta name="description">`: presence, character length (120-160), keyword included, CTA present
- Check `<meta name="keywords">`: presence; if missing, generate 10-20 targeted keywords (primary, secondary, long-tail)
- Check Open Graph tags: `og:title`, `og:description`, `og:image`, `og:type`, `og:url`, `og:locale`, `og:site_name`
- Check Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

#### Step 3: Heading & Content Structure Audit
- Verify exactly one `<H1>` per page
- Verify logical heading hierarchy (H1 → H2 → H3, no skips)
- Count total word count; compare against top-10 competitor benchmark
- Check keyword presence in: H1, first 100 words, at least one H2, URL slug
- Measure keyword density (target 1–2.5%); flag stuffing (>2.5%) or under-optimization (<0.5%)

#### Step 4: Image & Link Audit
- Enumerate ALL `<img>` tags; verify each has a non-empty `alt` attribute
- Check that alt texts are unique, descriptive, and at least 30% contain primary/secondary keywords
- Check for at least 1 internal link; check for at least 1 external link to an authoritative source

#### Step 5: Readability & Scoring
- Calculate Flesch Reading Ease score (target >60)
- Check sentence length: <25% of sentences over 20 words
- Check passive voice: <10% of sentences
- Aggregate points per scoring breakdown and return total (0-25)

---

### Output Format

```markdown
## On-Page SEO: {score}/25

| Check                        | Status | Finding                          |
|------------------------------|--------|----------------------------------|
| Meta Title                   | PASS   | "Título com palavra-chave" (55 chars) |
| Meta Description             | FAIL   | Ausente — nenhuma meta descrição encontrada |
| Meta Keywords                | WARN   | Presente, mas apenas 3 termos (mínimo 10) |
| H1 (único)                   | PASS   | H1 único presente                |
| Hierarquia de Headings       | WARN   | H1 > H3 (H2 ausente na seção herói) |
| Palavra-chave no Título      | PASS   | Detectada na posição 1           |
| Palavra-chave nos 100 primeiros | PASS | Encontrada no primeiro parágrafo |
| Densidade de Palavra-chave   | WARN   | 0.4% (abaixo do mínimo de 1%)    |
| Alt de Imagens               | FAIL   | 3 de 7 imagens sem atributo alt  |
| Links Internos               | PASS   | 4 links internos encontrados     |
| Links Externos               | FAIL   | Nenhum link externo              |
| Tags Open Graph              | FAIL   | Nenhuma tag OG detectada         |
| Twitter Card                 | FAIL   | Nenhuma tag Twitter Card         |
| Legibilidade (Flesch)        | PASS   | Score 67 — leitura fácil        |

### Issues Found (by severity)
1. [CRITICAL] Meta description missing — can lose 3 pts
2. [HIGH] Open Graph tags absent — social sharing broken
3. [MEDIUM] Keyword density 0.4% — under-optimized

### Fixable Automatically
- Add meta description
- Add Open Graph + Twitter Card tags
- Fix image alt texts
```

---

### Veto Conditions

- Cannot return a score without having evaluated all 14 checks
- Cannot report "images OK" without having individually inspected every `<img>` tag
- Cannot assign keyword density without an explicit (or auto-detected) focus keyphrase
- Cannot skip readability check for pages with body content above 300 words

---

### Completion Criteria

- Focus keyphrase identified (provided or auto-detected) for every page
- All 14 checks evaluated with PASS / WARN / FAIL status
- Score (0-25) calculated and returned to `seo-chief`
- List of fixable items prepared for `optimize-on-page` task
- Per-check findings include actionable descriptions (not just status)
