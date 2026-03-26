# optimize-technical

## Task: Technical SEO Optimization (Implement Fixes)

### Metadata
- **agent:** technical-auditor
- **trigger:** Phase 2 sequential optimization in `wf-seo-full-cycle`, after `evaluate-technical`
- **depends_on:** `evaluate-technical.md` (requires audit findings)
- **elicit:** false
- **output:** modified files + `changes-manifest.json` entries

---

### Purpose

Apply all technical SEO fixes identified during `evaluate-technical`. Implements concrete file changes:
adding canonical tags, fixing or generating the XML sitemap, correcting robots.txt rules, adding
viewport meta tags, collapsing redirect chains, and resolving broken internal links where possible.
Changes that require server-level access or external verification are flagged for manual action.

---

### Inputs

```
evaluate_technical_results: audit findings from evaluate-technical task
target_pages: list of page files to modify
sitemap_path: path to XML sitemap file
robots_txt_path: path to robots.txt file
base_url: canonical base URL of the site (e.g., https://example.com)
```

---

### Execution Steps

#### Step 1: Load Findings and Scope Check
- Load all FAIL and WARN items from `evaluate-technical` results
- Verify every target file is within the declared project scope before editing
- Separate fixes into: (a) file-level changes possible now, (b) server/infra changes requiring manual action
- Priority order: broken internal links → missing canonicals → sitemap fixes → robots.txt → viewport → redirect guidance

#### Step 2: Fix Canonical Tags
- For every page missing a canonical tag: inject `<link rel="canonical" href="{self_url}">` in `<head>`
- For pages with incorrect canonical (pointing to wrong URL): correct the `href` value
- Verify all canonical URLs use HTTPS and match the site's `base_url`
- Log each canonical addition/correction in the changes manifest

#### Step 3: Fix Broken Internal Links
- For each broken internal link (404): attempt to find the correct destination page by slug similarity
- If a clear match exists: update the `href` to the correct URL
- If no match exists: flag the link for manual review (cannot auto-resolve ambiguous redirects)
- Remove dead links from XML sitemap (if they appear as listed URLs returning 404)

#### Step 4: Fix XML Sitemap
- Remove URLs from sitemap that return 4xx/5xx
- Remove URLs with `<meta name="robots" content="noindex">` from sitemap
- Ensure all important indexable pages are listed in the sitemap
- Validate final sitemap XML structure (proper `<urlset>`, `<url>`, `<loc>`, `<lastmod>` tags)
- Save updated sitemap to `sitemap_path`

#### Step 5: Fix robots.txt and Mobile Meta
- If robots.txt is missing: generate a minimal valid file with `User-agent: *`, `Allow: /`, and `Sitemap:` directive
- If robots.txt incorrectly blocks indexable pages: remove or adjust the offending `Disallow` rule
- For pages missing `<meta name="viewport">`: inject `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Log all redirect chain issues with recommended resolution (cannot auto-implement server-side redirects)

---

### Output Format

```markdown
## Technical Optimization: Changes Applied

### Canonical Tags
- Added canonical to 4 pages: /sobre, /blog, /contato, /servicos
- Corrected 1 canonical: /produtos (apontava para URL errada)

### Broken Internal Links
- Fixed 3/5 broken links (destinos identificados por similaridade de slug)
- 2 links requerem ação manual: destinos ambíguos — ver lista abaixo

### XML Sitemap
- Removidas 2 URLs com 404 do sitemap
- Sitemap validado: 18 URLs indexáveis listadas

### robots.txt
- Nenhuma alteração necessária — arquivo válido

### Mobile Viewport
- Tag viewport adicionada em 1 página: /landing-especial

### Manual Action Required
- Cadeias de redirecionamento: 1 cadeia (A → B → C) — requer config de servidor
- Mixed content (2 imagens HTTP) — requer substituição das URLs nas imagens
- 2 links internos quebrados sem destino claro — requer decisão editorial

### Changes Count: 9 modifications across 6 files
```

---

### Veto Conditions

- Cannot modify files outside the declared project scope
- Cannot auto-insert a redirect without confirming the destination URL exists and returns 200
- Cannot remove a robots.txt `Disallow` rule without understanding whether the block is intentional
- Cannot claim "sitemap fixed" without having re-validated the XML structure after edits

---

### Completion Criteria

- All auto-fixable FAIL/WARN items from `evaluate-technical` have been resolved
- Every change logged in `changes-manifest.json` with file path and before/after value
- Remaining items (server-level, manual decision required) documented with clear instructions
- XML sitemap passes validation after edits
- Handoff to `seo-chief` includes count of changes and list of manual action items
