# generate-schema

## Task: Structured Data Generation (Implement JSON-LD)

### Metadata
- **agent:** schema-architect
- **trigger:** Phase 2 sequential optimization in `wf-seo-full-cycle`, after `evaluate-schema`
- **depends_on:** `evaluate-schema.md` (requires gap map)
- **elicit:** false
- **output:** modified page files with injected JSON-LD + `changes-manifest.json` entries

---

### Purpose

Generate and inject valid JSON-LD structured data markup for all gaps identified in `evaluate-schema`.
Covers homepage `Organization` and `WebSite` schemas, page-type-specific schemas (Article, Product,
FAQPage, HowTo, LocalBusiness, etc.), BreadcrumbList for all internal pages, and entity `@id` linking.
All generated schema is validated before injection. Syntax errors block injection.

---

### Inputs

```
evaluate_schema_results: gap map and findings from evaluate-schema task
target_pages: list of page files to modify
organization_name: organization's legal or brand name
organization_url: canonical URL (used as @id)
organization_logo: URL to logo image (for Organization schema)
social_profiles: list of social media profile URLs (for sameAs)
site_name: site display name (for WebSite schema)
```

---

### Execution Steps

#### Step 1: Load Gap Map and Prioritize
- Load gap map from `evaluate-schema` results
- Priority order: homepage Organization+WebSite → BreadcrumbList (all internal pages) → Article/BlogPosting → Product → FAQPage → HowTo → Person/LocalBusiness
- Verify target files are within project scope before modifying
- Collect any page-specific data needed for generation (article author, publish date, product price, FAQ pairs)

#### Step 2: Generate Homepage Schemas
- **Organization schema:** `@type`, `@id` (canonical URL + `#organization`), `name`, `url`, `logo` (ImageObject), `sameAs` (social profiles array)
- **WebSite schema:** `@type`, `@id` (canonical URL + `#website`), `name`, `url`, `publisher` (reference to Organization `@id`), `potentialAction` (SearchAction if site has search)
- Validate generated JSON with JSON.parse before injecting

#### Step 3: Generate Page-Type Schemas
- **Article/BlogPosting:** `headline` (from H1), `author` (Person with name + url), `datePublished` (from page metadata or git history), `dateModified`, `image` (first relevant image), `publisher` (Organization reference)
- **FAQPage:** extract all Q&A pairs from page content; wrap each in `Question`/`Answer` structure with `acceptedAnswer`
- **HowTo:** extract step headings and descriptions; build `HowToStep` array with `name`, `text`, `position`
- **Product:** `name`, `description`, `image`, `offers` (Offer with `price`, `priceCurrency`, `availability`)
- **LocalBusiness:** `name`, `address` (PostalAddress), `telephone`, `openingHours`, `geo` (GeoCoordinates if available)

#### Step 4: Generate BreadcrumbList for All Internal Pages
- For each internal page: trace hierarchy from homepage to current page via URL structure and navigation
- Build `itemListElement` array with `ListItem` entries: `position` (1-indexed), `name` (page title), `item` (canonical URL)
- Homepage is always position 1; current page is always the last item
- Inject into each internal page's `<head>` section

#### Step 5: Validate and Inject All Schema
- Run JSON.parse on every generated block — reject and report any syntax error (do NOT inject invalid JSON)
- Inject each block as `<script type="application/ld+json">` inside the `<head>` tag
- Verify no duplicate `@type` blocks are created for types that already existed
- Log every injection to `changes-manifest.json` with page path and schema types added

---

### Output Format

```markdown
## Schema Generation: Changes Applied

### Homepage
- Added Organization schema: {organization_name} — @id: {base_url}/#organization
- Added WebSite schema: sitelinks searchbox incluído

### Article Pages (2 pages)
- /blog/post-1: Article — adicionado author, datePublished, image
- /blog/post-2: BlogPosting — schema completo gerado

### BreadcrumbList
- Adicionado em 5 páginas internas (/sobre, /servicos, /blog, /contato, /faq)

### FAQPage
- /faq: 8 pares de pergunta/resposta extraídos e formatados

### Validation
- Todos os blocos JSON-LD validados antes da injeção — sem erros de sintaxe

### Changes Count: 11 schema blocks injected across 8 files

### Manual Action Required
- /loja/produto-1: preço e moeda ausentes no HTML — preencher antes de gerar Product schema
```

---

### Veto Conditions

- Cannot inject JSON-LD that fails JSON.parse validation — syntax errors block injection entirely
- Cannot generate Article schema without a confirmed `author` name (no placeholder authors)
- Cannot generate Product schema without real `price` and `priceCurrency` values
- Cannot generate BreadcrumbList if the page's position in the site hierarchy is ambiguous

---

### Completion Criteria

- All gaps from the `evaluate-schema` gap map have been addressed or flagged as manual-only
- Every generated JSON-LD block passed JSON.parse validation before injection
- BreadcrumbList injected in all internal pages listed in the gap map
- All changes logged in `changes-manifest.json` with schema types and target files
- No duplicate schema types introduced on pages that already had valid blocks
