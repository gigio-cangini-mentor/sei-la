---
task-id: create-animated-carousel
name: Create Animated Carousel Video
agent: director
version: 1.0.0
purpose: Generate an animated carousel as individual slide videos in 4:5 format

inputs:
  - name: slides
    type: array
    description: Array of slide content objects (text, images, notes per slide)
    required: true
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "output/carousel-{slug}/slide-{01-N}.mp4"
    format: mp4
    description: Individual animated slide videos (1080x1350 each)

acceptance_criteria:
  - "Canvas 1080x1350 (4:5) per slide"
  - "Each slide ~5s default duration"
  - "Smooth transitions between slides"
  - "Brand tokens applied consistently across all slides"
  - "Minimum 2 slides, maximum 10"
---

# create-animated-carousel

## Overview

Creates an animated carousel where each slide is an individual video file. Unlike static carousels (PNG), these use motion to add visual interest — entrance animations, text reveals, subtle background movement. Think of it as a mini video series, each card self-contained but visually cohesive.

## Steps

1. **Load brand** — Read brand profile from `data/brands/{brand_name}/` and extract tokens
2. **Set canvas** — 1080x1350 (4:5 Instagram carousel format)
3. **Create slide transitions** — Define entrance/exit animations consistent with brand motion style
4. **Animate each slide** — Compose each slide as a Remotion sequence (~5s default per slide)
5. **Render** — Export individual MP4 files per slide to `output/carousel-{slug}/`

## Veto Conditions

- Remotion not installed → HALT
- Fewer than 2 slides provided → HALT, need at least 2 for a carousel
- Brand profile not found → HALT

## Handoff

on_complete: pass to quality-validator
on_fail: escalate to brandcraft-chief
