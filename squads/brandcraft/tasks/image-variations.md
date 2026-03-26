---
task-id: image-variations
name: Generate Image Variations
agent: image-generator
version: 1.0.0
purpose: Generate N variations of an image while maintaining brand coherence

inputs:
  - name: image_path
    type: path
    description: Path to the source image to create variations from
    required: true
  - name: count
    type: string
    description: Number of variations to generate (default 3)
    required: false
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "output/images/variations-{slug}/"
    format: directory
    description: Folder containing all generated variations

acceptance_criteria:
  - "Each variation is visually distinct but recognizably related to the source"
  - "All variations maintain brand color palette and style"
  - "Count defaults to 3 if not specified"
  - "Variations saved in a dedicated subfolder"
---

# image-variations

## Overview

Takes a source image and generates N distinct variations that all stay within the brand's visual identity. Each variation explores a different angle, composition, or emphasis while keeping the same DNA — like a photographer taking multiple shots of the same scene with different framing.

Useful for A/B testing visuals, social media carousels, or giving the user options to choose from.

## Steps

1. **Load brand tokens** — Read brand profile for colors, style, mood
2. **Analyze source image** — Extract composition, dominant colors, subject, and mood from the source
3. **Plan variations** — Define N distinct variation strategies (e.g., different crop, color emphasis, lighting, angle)
4. **Generate variations** — Create each variation using the appropriate provider, injecting brand context
5. **Verify coherence** — Ensure all variations stay within brand palette and style; discard any that drift too far
6. **Save output** — Store all variations in `output/images/variations-{slug}/`

## Veto Conditions

- `image_path` does not exist or is not a valid image file → HALT
- Brand profile not found → HALT
- Count exceeds 10 → HALT, ask user to confirm (resource-intensive)

## Handoff

on_complete: pass to requesting agent or quality-validator
on_fail: escalate to brandcraft-chief
