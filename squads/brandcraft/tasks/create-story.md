---
task-id: create-story
name: Create Instagram Story
agent: director
version: 1.0.0
purpose: Compose a 15-second branded Instagram story video

inputs:
  - name: content
    type: string
    description: Content for the story (text, script, or visual brief)
    required: true
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "output/story-{slug}.mp4"
    format: mp4
    description: 15-second branded story video (1080x1920)

acceptance_criteria:
  - "Duration max 15 seconds"
  - "Canvas 1080x1920 with safe zones: 120px top, 200px bottom"
  - "Brand tokens applied consistently"
  - "Content condensed to fit 15s constraint"
---

# create-story

## Overview

Generates a 15-second Instagram story video with full brand consistency. The tight time constraint forces the agent to distill content to its most impactful form — like a billboard designer who has 3 seconds of attention.

Safe zones are larger than reels because of Instagram's UI overlays (profile bar top, reply bar bottom).

## Steps

1. **Load brand** — Read brand profile from `data/brands/{brand_name}/` and extract tokens
2. **Set canvas** — 1080x1920 with safe zones: 120px top (profile bar), 200px bottom (reply/swipe area)
3. **Condense content** — Trim and restructure content to fit 15s max duration
4. **Compose** — Build Remotion composition with branded scenes, transitions, and overlays
5. **Render** — Export MP4 and save to `output/`

## Veto Conditions

- **BLOCKER:** Remotion não instalado — sem engine de renderização de vídeo
- **BLOCKER:** Conteúdo muito escasso para gerar story significativo de 15s — pedir mais conteúdo
- **BLOCKER:** Brand profile não encontrado — rodar extract-design-system primeiro
- **WARNING:** Safe zones do Instagram (120px topo, 200px base) não aplicadas — UI do app vai cobrir conteúdo
- **WARNING:** Duração excede 15 segundos — conteúdo precisa ser condensado

## Handoff

on_complete: pass to quality-validator
on_fail: escalate to brandcraft-chief
