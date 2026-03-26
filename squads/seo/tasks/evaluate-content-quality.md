# evaluate-content-quality

## Task: Content Quality & E-E-A-T Evaluation (Score 0-15)

### Metadata
- **agent:** content-quality-assessor
- **trigger:** Phase 1 parallel evaluation in `wf-seo-full-cycle`
- **elicit:** false (inputs provided by orchestrator)
- **output:** `scores.content_quality` (0-15) + per-check breakdown + E-E-A-T gap report

---

### Purpose

Evaluate the site's content quality through the lens of Google's E-E-A-T framework
(Experience, Expertise, Authoritativeness, Trustworthiness) and topical authority signals.
Checks author credentials, trust pages, content depth, original research, citations, editorial
standards, YMYL classification, and recency. Returns a category score (0-15) and a gap report
that drives the `recommend-content-quality` task in Phase 2.

---

### Inputs

```
target_pages: list of URLs or file paths to evaluate
site_category: site type/niche (auto-detect if not provided)
competing_pages_benchmark: optional list of top-ranking competitor URLs for depth comparison
```

---

### Execution Steps

#### Step 1: YMYL Classification
- Determine if the site falls into Your Money or Your Life categories:
  - YMYL: finance, health, legal, safety, news/civic, government, shopping
  - Non-YMYL: entertainment, hobbies, general information
- YMYL sites are held to a higher E-E-A-T standard — flag for stricter evaluation
- Document YMYL classification with rationale; affects severity of missing trust signals

#### Step 2: Author & Expertise Signals (Experience + Expertise)
- Check for author byline on article/blog pages
- Verify author bio page exists with: credentials, professional history, areas of expertise
- Check for author schema (`Person`) linking byline to bio page
- Check for first-person experience signals: case studies, personal stories, "I tested…" language
- Verify author's demonstrated domain expertise (qualifications, published work, industry recognition)

#### Step 3: Authoritativeness Signals
- Check for external citations: does the content link to authoritative sources (PubMed, .gov, .edu)?
- Check for About page: company/team history, mission, credentials
- Check for Press/Media page or "As Featured In" section
- Check for external backlink signals (informational only — note if author/brand is cited externally)
- Check for editorial policies page (for news/media sites)
- Assess content uniqueness: is the content original research/data, or commodity rewrite?

#### Step 4: Trustworthiness Signals
- Verify Privacy Policy page exists and is accessible from the footer
- Verify Terms of Service / Terms of Use page exists
- Verify Contact page exists with real contact information (not just a form)
- Check for physical address and phone number (critical for local businesses and YMYL)
- Verify `last updated` date is present on articles and evergreen content
- Check HTTPS (handoff from technical-auditor findings — apply if available)
- Check for customer reviews, testimonials, or third-party trust marks

#### Step 5: Content Depth & Topical Authority
- Compare article word count against top 3–5 ranking competitor pages for target keywords
- Check if site covers sub-topics and related entities around its main theme (topical cluster assessment)
- Identify thin content pages (under 300 words with no supporting media)
- Check content recency: are date-sensitive articles updated regularly?
- Check for original data, statistics, proprietary research, or unique insights

---

### Output Format

```markdown
## Content Quality (E-E-A-T): {score}/15

### YMYL Classification
- **Status:** {YMYL / Non-YMYL} — {rationale}
- **Evaluation standard:** {Standard / Elevated}

| Check                                  | Status | Finding                                          |
|----------------------------------------|--------|--------------------------------------------------|
| Byline do autor                        | FAIL   | Artigos sem identificação de autor               |
| Página de bio do autor                 | FAIL   | Ausente                                          |
| Schema de autor (Person)               | FAIL   | Ausente em todos os artigos                      |
| Sinais de experiência pessoal          | WARN   | Conteúdo informativo sem experiência de 1ª pessoa |
| Página Sobre com credenciais           | WARN   | Sobre presente, mas sem histórico da equipe       |
| Citações para fontes autoritativas     | FAIL   | Nenhum link para fontes externas confiáveis      |
| Política de Privacidade                | PASS   | Presente e acessível no rodapé                   |
| Termos de Serviço                      | PASS   | Presente                                         |
| Página de Contato com dados reais      | PASS   | E-mail e formulário presentes                    |
| Data de última atualização             | FAIL   | Ausente em artigos (mais recente: 8 meses atrás) |
| Profundidade do conteúdo               | WARN   | Média 620 palavras vs. 1.400 nos concorrentes     |
| Conteúdo original / pesquisa própria   | WARN   | Sem dados proprietários ou pesquisas citadas     |
| Conteúdo thin (<300 palavras)          | FAIL   | 3 páginas identificadas como thin content        |
| Atualidade do conteúdo                 | WARN   | 5 artigos com mais de 12 meses sem revisão        |

### E-E-A-T Gap Summary
- **Experience:** Baixo — sem relatos de experiência pessoal ou estudos de caso
- **Expertise:** Médio — conteúdo competente, mas sem credenciais de autor visíveis
- **Authoritativeness:** Baixo — sem citações externas, sem página "Sobre" completa
- **Trustworthiness:** Médio — políticas presentes, mas datas de atualização ausentes

### Priority Recommendations
1. [CRITICAL] Adicionar byline + bio de autor com credenciais
2. [HIGH] Adicionar datas de atualização em todos os artigos
3. [HIGH] Incluir links para fontes externas autoritativas
4. [MEDIUM] Expandir 3 thin content pages acima de 600 palavras
```

---

### Veto Conditions

- Cannot score E-E-A-T without classifying the site's YMYL status first
- Cannot mark author signals as PASS without finding an actual byline on content pages
- Cannot assess content depth without a word count comparison — cannot estimate by visual inspection
- Cannot score Trustworthiness as passing if Privacy Policy or Contact page is missing

---

### Completion Criteria

- YMYL classification documented with rationale
- All 14 E-E-A-T checks evaluated with PASS / WARN / FAIL status
- Topical authority assessment complete (word count benchmark vs. competitors)
- E-E-A-T gap summary covers all four dimensions (Experience, Expertise, Authoritativeness, Trustworthiness)
- Score (0-15) calculated and returned to `seo-chief`
- Prioritized recommendation list prepared for `recommend-content-quality` task
