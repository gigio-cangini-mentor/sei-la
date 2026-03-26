---
task-id: create-gif
name: Create Animated GIF
agent: director
version: 1.0.0
purpose: Generate a branded animated GIF with looping animation

inputs:
  - name: content
    type: string
    description: Content or visual brief for the GIF animation
    required: true
  - name: dimensions
    type: string
    description: "Output dimensions (default: 400x400)"
    required: false
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "output/{slug}.gif"
    format: gif
    description: Animated GIF file

acceptance_criteria:
  - "Dimensions match input or default 400x400"
  - "Frame rate 15fps"
  - "Max duration 10 seconds"
  - "Seamless loop animation"
  - "Brand tokens applied (colors, typography)"
  - "File size optimized (< 5MB target)"
---

# create-gif

## Overview

Generates a branded animated GIF — small, loopable, and optimized for web/chat/email. GIFs are the memes of branded content: lightweight, shareable, and instantly recognizable. The agent ensures the loop is seamless and the brand identity is clear even at small sizes.

## Steps

1. **Load brand** — Read brand profile from `data/brands/{brand_name}/` and extract tokens
2. **Set dimensions** — Apply specified dimensions or default to 400x400, set 15fps
3. **Create loop animation** — Design a seamless looping animation (max 10s) using brand colors and typography
4. **Render GIF** — Export as optimized GIF with reduced color palette for file size
5. **Save** — Write to `output/{slug}.gif`

## Veto Conditions

- Content too vague to produce meaningful animation → HALT, ask for specifics
- Brand profile not found → HALT

## Handoff

on_complete: pass to quality-validator
on_fail: escalate to brandcraft-chief
