---
task-id: generate-image
name: Generate Brand-Coherent Image
agent: image-generator
version: 1.0.0
purpose: Generate a single AI image that matches the brand's visual identity

inputs:
  - name: description
    type: string
    description: What the image should depict
    required: true
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true
  - name: dimensions
    type: string
    description: "Image dimensions (e.g., 1920x1080, 1080x1080). Defaults to provider standard."
    required: false

outputs:
  - path: "output/images/{slug}.png"
    format: png
    description: Generated brand-coherent image

acceptance_criteria:
  - "Image reflects the brand's color palette and visual mood"
  - "Provider selected based on image type (illustration vs photorealistic vs text-heavy)"
  - "Brand context injected into the generation prompt"
  - "Output saved with descriptive slug filename"
---

# generate-image

## Overview

Generates a single AI image that feels like it belongs to the brand. The agent doesn't just generate — it first loads the brand's visual DNA (colors, style, mood) and weaves that context into the prompt. Like giving an illustrator a brand book before asking them to draw.

Provider selection is automatic based on image type, with fallback chain if one fails.

## Steps

1. **Load brand tokens** — Read `data/brands/{brand_name}/` for colors, style keywords, mood, and visual references
2. **Select MCP provider** — Choose based on image type:
   - **nano-banana-pro** — Illustrations, icons, stylized graphics (priority 1)
   - **dalle3** — Photorealistic images, product shots (priority 2)
   - **fal-video** — Images with text overlays or captions (priority 3)
   - **flux (FLUX Kontext Pro)** — Style transfer, brand-specific aesthetics (priority 4)
3. **Craft prompt** — Inject brand context into the description: color palette, style adjectives, mood
4. **Generate image** — Call the selected provider with the enriched prompt
5. **Verify brand coherence** — Check that output colors/style align with brand tokens
6. **Save output** — Store in `output/images/{slug}.png`

## Veto Conditions

- All 4 providers failed or unavailable → HALT, notify user
- Brand profile not found → HALT, suggest extract-design-system
- Description is empty or too vague to produce meaningful output → HALT, ask user to clarify

## Handoff

on_complete: pass to requesting agent (doc-generator, pptx-architect, or video-architect)
on_fail: escalate to brandcraft-chief
