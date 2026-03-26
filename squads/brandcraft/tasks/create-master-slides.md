---
task-id: create-master-slides
name: Create Master Slide Set
agent: pptx-architect
version: 1.0.0
purpose: Generate reusable master slide templates for a brand

inputs:
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "data/masters/{brand}-masters.pptx"
    format: pptx
    description: Master slide template file with 4 branded layouts

acceptance_criteria:
  - "4 master layouts created: Title, Content, Section Divider, Closing"
  - "All layouts use brand colors, fonts, and logo from the brand profile"
  - "Layouts are reusable as templates for future presentations"
  - "File saved to data/masters/ for reuse by other tasks"
---

# create-master-slides

## Overview

Creates a standalone master slide set that acts as the brand's presentation DNA. Once generated, any future `create-pptx` or `create-slides` task can load these masters instead of rebuilding from scratch — like having a stencil ready instead of drawing freehand every time.

This task only creates the template structure with placeholder content. It does not generate a real presentation.

## Steps

1. **Load brand tokens** — Read `data/brands/{brand_name}/` for colors (primary, secondary, accent, background, text), fonts (heading, body), and logo path
2. **Create Title layout** — Full-bleed background with brand primary color, centered title in heading font, subtitle in body font, logo in corner
3. **Create Content layout** — White/light background, title bar with brand color, body area for bullets/text, logo in footer
4. **Create Section Divider layout** — Brand accent color background, large centered section title, minimal elements
5. **Create Closing layout** — Brand primary background, thank-you/CTA text, logo centered, contact info area
6. **Save template** — Export to `data/masters/{brand}-masters.pptx`

## Veto Conditions

- Brand profile not found in `data/brands/` → HALT
- Brand profile missing essential tokens (no colors or no fonts) → HALT, request brand extraction first

## Handoff

on_complete: pass to brandcraft-chief (template ready for use)
on_fail: escalate to token-extractor for brand profile completion
