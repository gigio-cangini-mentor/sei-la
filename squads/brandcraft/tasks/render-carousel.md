---
task-id: render-carousel
name: Render Instagram Carousel
agent: doc-generator
version: 1.0.0
purpose: Render carousel PNG slides for Instagram posts

inputs:
  - name: content
    type: string
    description: Carousel content (will be split into slides)
    required: true
  - name: ratio
    type: string
    description: "Aspect ratio: square (1080x1080) or portrait (1080x1350)"
    required: true
  - name: brand_name
    type: string
    description: Brand template to apply
    required: true

outputs:
  - path: "output/carousel-{slug}/slide-{01-N}.png"
    format: png
    description: Individual carousel slide PNGs

acceptance_criteria:
  - "First slide is hook/title with high visual impact"
  - "Last slide is CTA with brand contact/handle"
  - "Each slide respects safe zone margins (no text in outer 5%)"
  - "All slides share consistent brand styling"
---

# render-carousel

## Overview

Creates Instagram carousel slides as individual PNG files. Splits content into digestible chunks, applies brand styling, and ensures the first slide hooks attention while the last slide drives action. Uses Playwright for pixel-perfect rendering.

## Steps

1. Request brand template from Vault via `serve-template`
2. Split content into slide-sized chunks (max ~40 words per slide)
3. Structure slides:
   - Slide 1: Hook/title — large text, bold, attention-grabbing
   - Slides 2-N-1: Content slides — body text with supporting visuals
   - Slide N: CTA — brand handle, website, or call-to-action
4. Select dimensions based on ratio:
   - Square: 1080x1080px
   - Portrait: 1080x1350px
5. Build HTML for each slide with brand tokens as CSS variables
6. Render each slide as PNG via Playwright `page.screenshot()`
7. Apply safe zone validation (no content in outer 5% margin)
8. Save slides to `output/carousel-{slug}/slide-01.png` through `slide-{N}.png`
9. Return directory path and slide count

## Veto Conditions

- **BLOCKER:** Playwright não disponível — sem engine de renderização de PNG
- **BLOCKER:** Conteúdo curto demais para carrossel (< 2 slides) — sugerir render-card em vez disso
- **BLOCKER:** Brand tokens sem cores definidas — impossível aplicar identidade visual
- **WARNING:** Primeiro slide sem hook/título de alto impacto visual — carrossel perde atenção na timeline
- **WARNING:** Último slide sem CTA (call-to-action) — carrossel sem conversão

## Handoff

on_complete: pass to quality-validator for review
on_fail: escalate to brandcraft-chief
