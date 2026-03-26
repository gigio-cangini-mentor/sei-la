---
task-id: extract-colors
name: Extract Colors
agent: token-extractor
version: 1.0.0
purpose: Extract color palette from a URL and map to semantic roles

inputs:
  - name: url
    type: url
    description: Website URL to extract colors from
    required: true

outputs:
  - path: "data/brands/{slug}/colors.yaml"
    format: yaml
    description: 7 color tokens mapped to semantic roles

acceptance_criteria:
  - "All visible colors collected from CSS and inline styles"
  - "Near-duplicates merged (deltaE < 5)"
  - "7 semantic roles assigned: primary, secondary, accent, background, surface, text_primary, text_secondary"
---

# extract-colors

## Overview

Focused extraction that pulls only the color palette from a website. Useful when you already have typography/spacing but need to update or verify colors.

Like using an eyedropper on a painting — pick up every color and organize them by role.

## Steps

1. **Scan pages** — Load homepage and one inner page; collect all color values from CSS, inline styles, and computed styles
2. **Collect raw values** — Gather hex, rgb, rgba, hsl values from backgrounds, text, borders, buttons, links
3. **Normalize** — Convert all values to hex format for consistency
4. **Deduplicate** — Merge colors with deltaE < 5 (perceptually similar)
5. **Map to semantic roles** — Assign each color to one of 7 roles based on usage context:
   - `primary` — dominant brand color (buttons, headers)
   - `secondary` — supporting brand color
   - `accent` — highlights, CTAs
   - `background` — main page background
   - `surface` — cards, panels
   - `text_primary` — main text color
   - `text_secondary` — muted/secondary text
6. **Output** — Save as structured YAML

## Veto Conditions

- URL unreachable → HALT
- Page returns no CSS/styles (raw HTML only) → HALT, suggest alternative URL

## Handoff

on_complete: pass to template-architect for token storage
on_fail: escalate to brandcraft-chief
