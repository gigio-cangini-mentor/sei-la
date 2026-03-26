# evaluate-schema

## Task: Structured Data Evaluation (Score 0-15)

### Metadata
- **agent:** schema-architect
- **trigger:** Phase 1 parallel evaluation in `wf-seo-full-cycle`
- **elicit:** false (inputs provided by orchestrator)
- **output:** `scores.schema` (0-15) + per-check breakdown + gap map

---

### Purpose

Evaluate all existing JSON-LD structured data on target pages and identify gaps against
schema.org best practices and Google's Rich Results requirements. For each page, determine
the appropriate schema type, verify that required properties are present and valid, check
entity linking, and assess rich result eligibility. Returns a category score (0-15) and a
gap map that drives the `generate-schema` task.

---

### Inputs

```
target_pages: list of URLs or file paths to evaluate
page_types: detected or declared page types per page (auto-detect if not provided)
organization_name: site owner's organization name (for entity linking)
```

---

### Execution Steps

#### Step 1: Page Type Classification
- For each page, detect content type by analyzing HTML structure, URL pattern, and main content
- Classify into: `WebPage`, `Article`, `BlogPosting`, `Product`, `LocalBusiness`, `FAQPage`,
  `HowTo`, `Event`, `Person`, `Organization`, `BreadcrumbList`, or custom composite types
- Flag pages where page type is ambiguous — mark for human confirmation before schema generation
- Homepage requires at minimum: `Organization` + `WebSite` schemas

#### Step 2: JSON-LD Inventory
- Enumerate all existing `<script type="application/ld+json">` blocks on each page
- Parse each block for valid JSON syntax (flag parse errors immediately)
- Identify schema type (`@type`) and declared properties for each block
- Check for deprecated schema types (e.g., `Article` used where `NewsArticle` is more specific)

#### Step 3: Required Properties Validation
- For each detected schema type, verify all Google-required properties are present:
  - `Article/BlogPosting`: `headline`, `author`, `datePublished`, `image`
  - `Product`: `name`, `image`, `description`, `offers`
  - `LocalBusiness`: `name`, `address`, `telephone`
  - `FAQPage`: `mainEntity` array with `Question`/`Answer` pairs
  - `HowTo`: `name`, `step` array with `HowToStep`
  - `BreadcrumbList`: `itemListElement` with `ListItem`, `position`, `name`, `item`
- Flag missing required properties as FAIL; missing recommended properties as WARN

#### Step 4: Entity Linking & Cross-Page Consistency
- Verify `Organization` schema uses consistent `@id` across all pages (canonical entity URL)
- Verify `WebSite` schema on homepage includes `potentialAction` (SearchAction) if applicable
- Check `sameAs` property on `Organization`/`Person` schemas (social profile links)
- Verify `BreadcrumbList` correctly reflects page hierarchy

#### Step 5: Rich Result Eligibility Check
- Check `FAQPage` blocks: are questions/answers present and formatted for featured snippets?
- Check `HowTo` blocks: are all steps enumerated with `HowToStep` type?
- Check `Product` blocks: are `aggregateRating` and `Review` present for star ratings?
- Flag any JSON syntax errors that would disqualify pages from rich results

---

### Output Format

```markdown
## Schema/Structured Data: {score}/15

| Check                            | Status | Finding                                       |
|----------------------------------|--------|-----------------------------------------------|
| JSON-LD presente                 | WARN   | Apenas 2 de 6 páginas têm schema              |
| Sintaxe JSON válida              | PASS   | Sem erros de parse                            |
| Tipo de página correto           | PASS   | Article, Product detectados corretamente      |
| Propriedades obrigatórias        | FAIL   | Article sem "author" e "datePublished"        |
| Organization na homepage         | FAIL   | Schema Organization ausente                   |
| WebSite na homepage              | FAIL   | Schema WebSite ausente                        |
| BreadcrumbList                   | FAIL   | Ausente em todas as páginas internas          |
| Elegibilidade Rich Results       | WARN   | FAQPage presente mas sem Answer formatado     |
| @id de entidade consistente      | WARN   | Organization @id difere entre 2 páginas       |
| Tipos deprecated                 | PASS   | Sem tipos deprecated                          |

### Gap Map (pages requiring new schema)
| Page          | Missing Schema Types                            | Priority |
|---------------|-------------------------------------------------|----------|
| /             | Organization, WebSite                           | CRITICAL |
| /blog/post-1  | Article (missing author, datePublished)         | HIGH     |
| /sobre        | Person, Organization                            | HIGH     |
| /servicos     | Service, BreadcrumbList                         | MEDIUM   |
| /faq          | FAQPage                                         | MEDIUM   |

### Fixable Automatically
- Generate Organization + WebSite schema for homepage
- Generate BreadcrumbList for all internal pages
- Add missing required properties to existing Article schema
```

---

### Veto Conditions

- Cannot evaluate schema without parsing the actual HTML source of each page
- Cannot assess rich result eligibility without parsing the full JSON-LD block (no sampling)
- Cannot classify page type automatically if the page has no semantic HTML structure — flag for human input
- Cannot validate entity `@id` consistency without checking all pages that reference the same entity

---

### Completion Criteria

- All pages classified by page type (with human confirmation for ambiguous cases)
- All existing JSON-LD blocks parsed and validated (syntax + required properties)
- Gap map generated listing every page missing schema and which types are needed
- Score (0-15) calculated and returned to `seo-chief`
- Rich result eligibility assessed per page with specific blocking issues noted
