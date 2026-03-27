---
task-id: render-card
name: Render Social Card
agent: doc-generator
version: 1.0.0
purpose: Render a social card PNG (1200x630) for link previews

inputs:
  - name: content
    type: string
    description: Card content (title, subtitle, optional description)
    required: true
  - name: brand_name
    type: string
    description: Brand template to apply
    required: true

outputs:
  - path: "output/card-{slug}.png"
    format: png
    description: Social card image (1200x630)

acceptance_criteria:
  - "Output dimensions are exactly 1200x630px"
  - "Text is readable at thumbnail size"
  - "Brand colors and typography are applied"
  - "Logo or brand mark is included if available in tokens"
---

# render-card

## Overview

Generates an Open Graph-compatible social card (1200x630px) for use as link previews on Twitter, LinkedIn, Facebook, and other platforms. Applies brand tokens for consistent visual identity across shared links.

## Steps

1. Request brand template from Vault via `serve-template`
2. Parse content into card elements (title, subtitle, description)
3. Build HTML card layout:
   - Background: brand primary or surface color
   - Title: large, brand heading font
   - Subtitle: medium, brand body font
   - Logo/brand mark: positioned bottom-right if available
4. Apply brand tokens as CSS custom properties
5. Set viewport to exactly 1200x630px
6. Render as PNG via Playwright `page.screenshot()`
7. Validate readability (minimum font size 24px for title)
8. Save to `output/card-{slug}.png`
9. Return file path and file size

## Veto Conditions

- **BLOCKER:** Playwright não disponível — sem engine de renderização de PNG
- **BLOCKER:** Conteúdo vazio — nada para renderizar no card
- **BLOCKER:** Brand tokens sem cores definidas — card perde identidade visual
- **WARNING:** Título com fonte menor que 24px — ilegível em thumbnail de link preview
- **WARNING:** Dimensões diferentes de 1200x630px — Open Graph padrão não será respeitado

## Handoff

on_complete: pass to quality-validator for review
on_fail: escalate to brandcraft-chief
