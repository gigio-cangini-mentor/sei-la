# recommend-architecture

## Task: Recommend Site Architecture Improvements

### Metadata
- **executor:** site-architect
- **depends_on:** evaluate-architecture (requires prior audit findings)
- **elicit:** false (uses audit findings)
- **mode:** recommendation-only (no direct file edits)
- **output:** architecture-recommendations.md

### Purpose
Translate site architecture audit findings into a structured improvement plan covering
URL hierarchy, silo structure, internal linking topology, and navigation depth. This task
does NOT modify any files — it produces a detailed architecture blueprint that the team
can implement incrementally, with change risk noted for each recommendation.

### Prerequisites
- `evaluate-architecture.md` must have been run first
- Full page list with URLs and detected content categories available
- Internal link map available (which pages link to which)
- Navigation depth map available (click distance from homepage per page)

### Execution Steps

#### Step 1: Analyze URL Structure
Review all URLs against SEO best practices and flag violations:

| Issue | Example | Recommendation |
|-------|---------|----------------|
| Uppercase characters | /Blog/Post-Title | Lowercase: /blog/post-title |
| Underscores instead of hyphens | /my_page | Use hyphens: /my-page |
| Query parameters in navigational URLs | /page?id=42 | Descriptive slug: /about-us |
| Unnecessary depth | /en/blog/2024/01/article | Flatten: /blog/article-slug |
| Stop words in URL | /the-best-way-to-do | Remove: /best-way-to-do |
| Non-descriptive slugs | /p/4523 | Descriptive: /products/widget-name |

#### Step 2: Map Content Silos
Identify the natural content clusters in the page inventory and propose a silo structure:

```
Silo Recomendado: {Site Name}
├── / (Home)
├── /sobre (Authority Hub)
├── /blog (Content Hub)
│   ├── /blog/categoria-a (Silo Pillar)
│   │   ├── /blog/categoria-a/post-1
│   │   └── /blog/categoria-a/post-2
│   └── /blog/categoria-b (Silo Pillar)
│       └── /blog/categoria-b/post-1
├── /produtos (Conversion Hub)
│   └── /produtos/produto-especifico
└── /contato
```

Flag pages that don't fit any silo (orphaned or miscategorized content).

#### Step 3: Internal Linking Opportunities
Analyze the current internal link map and identify:
- **Underlinked pillar pages:** high-value pages receiving few internal links
- **Missing cluster links:** topic cluster posts not linking back to their pillar page
- **Navigation depth violations:** pages more than 3 clicks from homepage
- **Broken link opportunities:** pages that could contextually link to each other but don't

Generate a linking recommendation table:
```
| Source Page | Target Page | Anchor Text Suggestion | Priority |
|-------------|-------------|------------------------|----------|
| /blog/post-a | /produtos/widget | "saiba mais sobre o Widget" | Alta |
| /sobre | /blog/categoria-a | "nossos artigos sobre X" | Média |
```

#### Step 4: Navigation Depth Audit
List all pages exceeding 3 clicks from homepage:
```markdown
## Páginas com Profundidade Excessiva (> 3 cliques)

- /blog/categoria-a/subcategoria/post-antigo (4 cliques)
  Recomendação: mover para /blog/categoria-a/post-antigo ou adicionar
  link direto na página de categoria.

- /produtos/linha-b/variante-x/sku-123 (5 cliques)
  Recomendação: adicionar breadcrumb com link na landing de /produtos
  ou adicionar ao sitemap com prioridade 0.8.
```

### Output Format
```markdown
# Recomendações de Arquitetura do Site
**Target:** {url}
**Date:** {date}
**Score de Arquitetura (antes):** {score}/5

## Problemas de URL ({n} encontrados)
| URL Atual | Problema | URL Recomendada | Risco de Mudança |
|-----------|---------|-----------------|------------------|
| /Blog/Post | Maiúsculas | /blog/post | Médio (requer redirect 301) |

## Estrutura de Silos Recomendada
{tree diagram}

## Oportunidades de Links Internos
| Página Origem | Página Destino | Texto Âncora Sugerido | Prioridade |
|---------------|----------------|------------------------|------------|

## Páginas com Profundidade Excessiva
{list with current depth and recommended fix}

## Órfãos e Páginas Descategorizadas
{pages with no clear silo or fewer than 2 internal links pointing to them}

## Plano de Implementação
### Alta Prioridade (implementar primeiro)
{recommendations with highest ranking impact and lowest change risk}

### Média Prioridade
{recommendations requiring redirects or navigation changes}

### Baixa Prioridade
{long-term structural improvements}

## Pontos Recuperáveis Estimados
{score improvement if all recommendations implemented: +X/5}
```

### Veto Conditions
- Do NOT recommend URL changes without explicitly noting redirect requirements (301 redirects MUST be specified)
- Do NOT recommend flattening URL structure if it would create URL conflicts or ambiguity
- Do NOT suggest removing navigational depth for pages that logically belong deep (e.g., product variants, user docs)
- Do NOT recommend internal linking between pages with completely unrelated topics (forced linking harms UX)

### Completion Criteria
- All URL structure violations flagged with specific recommendations and change risk noted
- Content silo tree diagram generated based on actual page inventory
- Internal linking opportunity table generated (minimum 5 recommendations if applicable)
- All pages exceeding 3 clicks from homepage listed with remediation suggestions
- Orphaned pages identified (fewer than 2 internal links pointing to them)
- Implementation plan with priority tiers generated
- Estimated score recovery calculated
