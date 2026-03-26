# evaluate-technical

## Task: Technical SEO Audit (Score 0-20)

### Metadata
- **agent:** technical-auditor
- **trigger:** Phase 1 parallel evaluation in `wf-seo-full-cycle`
- **elicit:** false (inputs provided by orchestrator)
- **output:** `scores.technical` (0-20) + per-check breakdown

---

### Purpose

Audit technical SEO factors that affect crawlability, indexation, and search engine accessibility.
Covers HTTP status codes, broken links, redirect chains, canonical tags, robots.txt, XML sitemap,
HTTPS enforcement, mobile responsiveness, hreflang, orphan pages, and Core Web Vitals signals.
Returns a category score (0-20) with per-check PASS / WARN / FAIL status.

---

### Inputs

```
target: site URL or local project path
pages_list: list of all discovered URLs (from page discovery step)
robots_txt_path: path or URL to robots.txt (auto-resolved if not provided)
sitemap_path: path or URL to XML sitemap (auto-resolved if not provided)
```

---

### Execution Steps

#### Step 1: Crawlability & Indexation Check
- Fetch and parse `robots.txt`: verify it exists, is syntactically valid, and does not block important pages
- Fetch and validate XML sitemap: verify it exists, is valid XML, URLs return 200, no noindexed URLs included
- Check for `<meta name="robots" content="noindex">` tags on pages that should be indexed
- Identify orphan pages (no internal links pointing to them)

#### Step 2: HTTP Status & Redirect Audit
- Check HTTP status codes for all pages in `pages_list` — flag any 4xx or 5xx responses
- Detect redirect chains exceeding 1 hop (A → B → C = 2 hops: flag for optimization)
- Detect redirect loops
- Verify all internal links resolve to 200 (no broken internal links)
- Sample-check external links for 4xx/5xx (flag broken external links)

#### Step 3: Canonical & Duplicate Content Check
- Verify canonical tags are present on all indexable pages
- Verify canonical tags point to the correct self-referencing URL (no cross-domain canonicals unless intentional)
- Check for duplicate `<title>` tags across pages
- Check for duplicate `<meta description>` across pages

#### Step 4: Security & Mobile Readiness
- Verify HTTPS is enforced: all HTTP URLs redirect to HTTPS
- Check for mixed content (HTTP resources loaded on HTTPS pages)
- Verify `<meta name="viewport">` tag is present on all pages
- Check hreflang implementation if site has multi-language content (correct language codes, x-default present)

#### Step 5: Scoring & Issue Ranking
- Score each check per scoring breakdown (0-20 total)
- Rank issues by crawl impact: blocks indexation (critical) → harms ranking (high) → cosmetic (low)
- Identify auto-fixable items (missing canonical, sitemap issues, redirect chains) vs. manual items

---

### Output Format

```markdown
## Technical SEO: {score}/20

| Check                        | Status | Finding                                  |
|------------------------------|--------|------------------------------------------|
| robots.txt válido            | PASS   | Presente e sem bloqueios críticos        |
| XML Sitemap                  | WARN   | Presente, mas 2 URLs retornam 404        |
| HTTP Status (páginas)        | FAIL   | 3 páginas com erro 404                   |
| Links internos quebrados     | FAIL   | 5 links internos quebrados encontrados   |
| Links externos quebrados     | WARN   | 2 links externos retornam 404            |
| Cadeia de redirecionamentos  | WARN   | 1 cadeia com 3 hops detectada            |
| Tags canônicas               | WARN   | 4 páginas sem canonical                  |
| HTTPS enforced               | PASS   | Todos os redirecionamentos HTTP → HTTPS  |
| Mixed Content                | FAIL   | 2 imagens carregadas via HTTP            |
| Meta Viewport (mobile)       | PASS   | Presente em todas as páginas             |
| Títulos duplicados           | WARN   | 2 pares de páginas com título idêntico   |
| Meta descriptions duplicadas | PASS   | Sem duplicatas                           |
| Hreflang                     | N/A    | Site monolíngue — não aplicável          |
| Páginas órfãs                | WARN   | 3 páginas sem links internos apontando   |

### Issues Found (by crawl impact)
1. [CRITICAL] 3 pages returning 404 — removed from index
2. [HIGH] Mixed content on HTTPS pages — security warning
3. [HIGH] 5 broken internal links — crawl budget wasted

### Fixable Automatically
- Add missing canonical tags
- Remove 404 URLs from sitemap
- Fix redirect chain (collapse to 1 hop)
```

---

### Veto Conditions

- Cannot return a score without checking all 14 technical checks
- Cannot mark robots.txt as valid without fetching and parsing its actual content
- Cannot claim "no broken links" without having crawled all pages in `pages_list`
- Cannot skip hreflang check without first confirming the site is monolingual

---

### Completion Criteria

- All 14 checks evaluated with PASS / WARN / FAIL status
- Score (0-20) calculated and returned to `seo-chief`
- Every issue includes a severity level (CRITICAL / HIGH / MEDIUM / LOW)
- List of auto-fixable vs. manual items prepared for `optimize-technical` task
- Broken link inventory saved with exact URLs for reference during optimization
