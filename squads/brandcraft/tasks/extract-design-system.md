---
task-id: extract-design-system
name: Extract Design System
agent: token-extractor
version: 1.0.0
purpose: Extract full design system from a URL (colors, typography, spacing, logos)

inputs:
  - name: url
    type: url
    description: Website URL to extract design tokens from
    required: true

outputs:
  - path: "data/brands/{slug}/tokens.yaml"
    format: yaml
    description: Complete design token set (colors, typography, spacing)
  - path: "data/brands/{slug}/assets/"
    format: directory
    description: Extracted logo files (SVG + PNG)

acceptance_criteria:
  - "7 color tokens extracted and mapped to semantic roles"
  - "8 typography tokens extracted (families, sizes, weights)"
  - "6 spacing tokens extracted"
  - "Logo assets saved in SVG and PNG formats"
  - "All tokens deduplicated and validated for completeness"
---

# extract-design-system

## Overview

The comprehensive extraction task. Scans a website and pulls out every visual design decision — colors, fonts, spacing, and logos — into a structured token set. This becomes the brand's DNA that all other generation tasks use.

Like reverse-engineering a recipe by tasting the dish — we figure out every ingredient.

## Steps

1. **Validate URL** — Confirm the URL is reachable and returns HTML content
2. **Scan homepage** — Extract visible styles from the main page
3. **Scan inner page** — Navigate to one inner page (about, services, or first nav link) for broader coverage
4. **Extract colors** — Collect all color values → deduplicate (deltaE < 5) → map to 7 semantic roles: primary, secondary, accent, background, surface, text_primary, text_secondary
5. **Extract typography** — Detect @font-face, Google Fonts, system fonts → map heading/body families → extract 8 tokens: font_heading, font_body, size_h1, size_h2, size_h3, size_body, weight_heading, weight_body
6. **Extract spacing** — Analyze padding/margin patterns → extract 6 tokens: xs, sm, md, lg, xl, section
7. **Extract logos** — Check header/nav SVGs, og:image, favicon → save full logo + icon variant
8. **Deduplicate** — Remove near-duplicate values across all token categories
9. **Validate completeness** — Ensure minimum token count per category; flag gaps
10. **Save** — Write tokens.yaml and assets to `data/brands/{slug}/`

## Veto Conditions

- **BLOCKER:** URL inacessível (timeout, 4xx, 5xx) — reportar erro e pedir URL alternativa
- **BLOCKER:** Página sem conteúdo visual (blank page, JS-only sem fallback) — sugerir URL alternativa
- **BLOCKER:** Extração feita de uma única página — mínimo 2 páginas para cobertura adequada de tokens
- **WARNING:** Menos de 3 tokens de cor encontrados — extração parcial, completar manualmente
- **WARNING:** Logo capturado apenas como favicon — tentar SVG do header antes de aceitar

## Handoff

on_complete: pass to template-architect for brand template storage and registration
on_fail: escalate to brandcraft-chief with extraction report
