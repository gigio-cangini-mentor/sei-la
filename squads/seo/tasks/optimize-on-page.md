# optimize-on-page

## Task: On-Page SEO Optimization (Implement Fixes)

### Metadata
- **agent:** on-page-optimizer
- **trigger:** Phase 2 sequential optimization in `wf-seo-full-cycle`, after `evaluate-on-page`
- **depends_on:** `evaluate-on-page.md` (requires scored findings)
- **elicit:** false
- **output:** modified page files + `changes-manifest.json` entries

---

### Purpose

Apply all on-page SEO fixes identified during `evaluate-on-page`. This task implements concrete changes
to page files: writing or rewriting meta titles, meta descriptions, Open Graph tags, Twitter Cards,
heading hierarchy corrections, image alt texts, and keyword placement improvements.
Changes are logged to the changes manifest for the final report.

---

### Inputs

```
evaluate_on_page_results: scored findings from evaluate-on-page task
target_pages: list of page files to modify
focus_keyphrases: confirmed keyphrase per page
brand_name: site/brand name for title suffix (optional)
```

---

### Execution Steps

#### Step 1: Load Findings and Prioritize
- Load FAIL and WARN items from `evaluate-on-page` results
- Rank by point impact (highest points recoverable first)
- Verify that the target files are within project scope before making any edits
- Priority order: meta title → meta description → meta keywords → OG tags → Twitter Card → heading hierarchy → image alts → keyword placement

#### Step 2: Fix Meta Tags
- **Title:** Rewrite using formula `[Primary Keyword] — [Benefit/Hook] | [Brand]`, 50-60 chars, keyword front-loaded
- **Meta description:** Write using formula `[Hook with keyword]. [Value proposition]. [CTA].`, 120-160 chars
- **Meta keywords:** Generate list of 10-20 terms: 3-5 primary, 5-7 secondary, 3-5 long-tail; inject as `<meta name="keywords">`
- Record before/after for each tag in the changes manifest

#### Step 3: Fix Social Meta Tags
- Inject complete Open Graph block: `og:title`, `og:description`, `og:image` (1200×630 recommended), `og:type`, `og:url`, `og:locale`, `og:site_name`
- Inject Twitter Card block: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
- Reuse optimized title and description text where appropriate

#### Step 4: Fix Heading Hierarchy
- If multiple H1s exist: demote extras to H2 keeping the most relevant one as H1
- If heading hierarchy skips levels (H1 → H3): insert H2 or re-tag intermediate headings
- Ensure keyword appears in the H1 and at least one H2
- Do NOT change heading text meaning — only structural tag adjustments

#### Step 5: Fix Image Alt Texts and Internal Links
- For each `<img>` missing alt: generate descriptive alt text referencing the image context and keyword where natural
- Replace generic alts (`"image"`, `"photo"`, `"img_001"`) with descriptive alternatives
- If no external link exists: flag for human review (cannot auto-insert external links without verification)
- Log all image alt changes to the manifest

---

### Output Format

```markdown
## On-Page Optimization: Changes Applied

### Meta Tags
**Meta Title**
- Before: `<title>Home</title>`
- After:  `<title>Retiros de Autoconhecimento — Transforme sua Vida | Alma de Maramar</title>`

**Meta Description**
- Before: (ausente)
- After:  `<meta name="description" content="Descubra os retiros de autoconhecimento do Método AGS. Resultados comprovados em 3 dias. Vagas limitadas — inscreva-se agora.">`

**Meta Keywords**
- Before: (ausente)
- After:  `<meta name="keywords" content="retiro de autoconhecimento, método AGS, cura interior, ...">`

### Open Graph
- Added: og:title, og:description, og:image, og:type, og:url, og:locale, og:site_name

### Twitter Card
- Added: twitter:card, twitter:title, twitter:description, twitter:image

### Heading Hierarchy
- Fixed: H1 > H3 → H1 > H2 > H3 (seção herói corrigida)

### Image Alt Texts
- Fixed 3/7 images: alts gerados para imagens sem descrição

### Changes Count: 12 modifications in 1 file
```

---

### Veto Conditions

- Cannot modify files outside the declared project scope
- Cannot create a meta title exceeding 70 characters
- Cannot create a meta description exceeding 165 characters (Google truncates at ~160)
- Cannot auto-insert external links without human verification of source quality

---

### Completion Criteria

- All FAIL items from `evaluate-on-page` have been addressed or flagged as manual-only
- Every change is logged in the `changes-manifest.json` with before/after values
- No meta tag exceeds its character limit after optimization
- Modified files are syntactically valid HTML (no broken tags introduced)
- Handoff to `seo-chief` includes count of changes made and list of remaining manual items
