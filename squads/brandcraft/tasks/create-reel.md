---
task-id: create-reel
name: Create Branded Video Reel
agent: director
version: 1.0.0
purpose: Compose a branded video reel via Remotion with brand-consistent motion design

inputs:
  - name: content
    type: string
    description: Content to be structured into video scenes (script, topics, or outline)
    required: true
  - name: format
    type: string
    description: "Aspect ratio — 9:16 (default), 16:9, or 1:1"
    required: false
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "output/reel-{slug}.mp4"
    format: mp4
    description: Final branded video reel

acceptance_criteria:
  - "Brand tokens loaded and applied to all visual elements"
  - "Minimum 4 scenes: intro (0-3s), hook (3-6s), body, CTA (last 3-5s)"
  - "Safe zones respected per format"
  - "Motion style derived from brand personality"
  - "Video renders without errors via Remotion"
---

# create-reel

## Overview

Composes a branded video reel from content input. The director loads brand tokens from the Vault, sets canvas dimensions with proper safe zones, plans a scene structure, and renders via Remotion — like a video editor who reads your brief and delivers a polished reel ready for social.

Every visual decision (colors, fonts, motion style) comes from the brand profile, not defaults.

## Steps

1. **Load brand** — Read brand profile from `data/brands/{brand_name}/` and extract tokens (colors, fonts, logos, motion preferences)
2. **Set dimensions + safe zones** — Apply format dimensions: 9:16 = 1080x1920 (90px top/bottom), 16:9 = 1920x1080 (60px all sides), 1:1 = 1080x1080 (60px all sides)
3. **Plan scenes** — Structure content into scenes: intro (0-3s), hook (3-6s), body (variable), CTA (last 3-5s). Minimum 4 scenes required
4. **Derive motion style** — Map brand personality to motion language (e.g. bold → fast cuts, elegant → smooth fades)
5. **Compose via Remotion** — Build Remotion composition with scene components, transitions, and branded overlays
6. **Render MP4** — Render final video file and save to `output/`

## Veto Conditions

- Remotion not installed or not available → HALT, escalate to user
- Content insufficient to produce minimum 4 scenes → HALT, ask for more content
- Brand profile not found in `data/brands/` → HALT, suggest running extract-design-system first

## Handoff

on_complete: pass to quality-validator
on_fail: escalate to brandcraft-chief
