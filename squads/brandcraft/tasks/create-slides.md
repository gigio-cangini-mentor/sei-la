---
task-id: create-slides
name: Create Slides from Outline
agent: pptx-architect
version: 1.0.0
purpose: Generate a presentation from an explicit slide-by-slide outline

inputs:
  - name: outline
    type: string
    description: Array of slide specs — each with title, body, and optional layout type
    required: true
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "output/{slug}.pptx"
    format: pptx
    description: Presentation built exactly per the provided outline

acceptance_criteria:
  - "Each slide matches its outline spec (title, body, layout)"
  - "Brand tokens applied to all slides"
  - "Slide order follows outline order exactly"
  - "Max 6 lines per slide, max 8 words per bullet"
---

# create-slides

## Overview

Unlike `create-pptx` which auto-structures content, this task takes an explicit outline where each slide is already specified. The agent follows the blueprint exactly — like a builder following an architect's drawings instead of designing the house.

Useful when the user already knows what goes on each slide and just needs it rendered with brand polish.

## Steps

1. **Load brand** — Read brand profile from `data/brands/{brand_name}/` and extract tokens
2. **Create master slides** — Build master layouts (Title, Content, Section Divider, Closing)
3. **Build slides** — Iterate through the outline array and create each slide per its spec
4. **Apply brand tokens** — Inject brand colors, fonts, logo, and spacing into every slide
5. **Generate PPTX** — Render and save to `output/`

## Veto Conditions

- Outline is empty or has zero valid slide specs → HALT
- Brand profile not found → HALT, suggest extract-design-system

## Handoff

on_complete: pass to quality-validator
on_fail: escalate to brandcraft-chief
