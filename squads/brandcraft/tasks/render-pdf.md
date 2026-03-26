---
task-id: render-pdf
name: Render Branded PDF
agent: doc-generator
version: 1.0.0
purpose: Render a branded PDF document in A4 or slides format

inputs:
  - name: content
    type: string
    description: Markdown or structured content to render
    required: true
  - name: format
    type: string
    description: "Output format: a4 or slides"
    required: true
  - name: brand_name
    type: string
    description: Brand template to apply
    required: true

outputs:
  - path: "output/{slug}.pdf"
    format: pdf
    description: Branded PDF document

acceptance_criteria:
  - "Brand tokens are applied as CSS custom properties"
  - "Fonts are embedded (not linked)"
  - "A4 format uses proper margins and bleeds"
  - "Slides format uses 16:9 aspect ratio"
---

# render-pdf

## Overview

Generates a branded PDF by combining content with brand tokens from the vault. Supports two formats: A4 (document-style with margins/bleeds) and slides (16:9 presentation-style). Uses Puppeteer for HTML-to-PDF rendering with full CSS control.

## Steps

1. Request brand template from Vault via `serve-template`
2. Validate that required tokens exist (colors, typography, spacing minimum)
3. Select base HTML template based on format (a4 or slides)
4. Inject brand tokens as CSS custom properties (`--brand-primary`, `--brand-font`, etc.)
5. Parse content (Markdown → HTML) and inject into template
6. Configure Puppeteer:
   - A4: 210x297mm, margins 15mm, bleed 3mm
   - Slides: 1920x1080px, no margins
7. Render PDF via Puppeteer `page.pdf()`
8. Embed fonts (subset only used glyphs)
9. Save to `output/{slug}.pdf`
10. Return file path and page count

## Veto Conditions

- Puppeteer not available or not installed → HALT
- Brand tokens incomplete (missing colors or typography) → HALT (run template-status first)
- Content is empty → HALT

## Handoff

on_complete: pass to quality-validator for review
on_fail: escalate to brandcraft-chief
