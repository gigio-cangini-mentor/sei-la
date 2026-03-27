---
task-id: style-transfer
name: Apply Brand Style to Image
agent: image-generator
version: 1.0.0
purpose: Transform an existing image to match a brand's visual identity

inputs:
  - name: image_path
    type: path
    description: Path to the source image to be restyled
    required: true
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "output/images/{slug}-branded.png"
    format: png
    description: Source image restyled with brand visual identity

acceptance_criteria:
  - "Output preserves the composition and subject of the source image"
  - "Brand color palette visibly applied to the output"
  - "Style transfer uses FLUX Kontext Pro as primary engine"
  - "Output saved with -branded suffix for traceability"
---

# style-transfer

## Overview

Takes an existing image and re-renders it through the lens of a brand's visual identity. The subject stays the same, but the colors, texture, and mood shift to match the brand — like putting a photo through an Instagram filter, except the filter is your entire brand book.

Uses FLUX Kontext Pro as the primary engine for style transfer.

## Steps

1. **Load brand tokens** — Read `data/brands/{brand_name}/` for color palette, style keywords, mood descriptors
2. **Load source image** — Read the image at `image_path` and analyze its composition
3. **Build transfer prompt** — Construct a style transfer directive combining the source image with brand tokens (palette, mood, texture)
4. **Execute transfer** — Use flux (FLUX Kontext Pro) to apply brand style to the source image
5. **Verify coherence** — Compare output palette against brand tokens; ensure subject is preserved
6. **Save output** — Store in `output/images/{slug}-branded.png`

## Veto Conditions

- **BLOCKER:** `image_path` não existe ou não é um arquivo de imagem válido — sem source para transfer
- **BLOCKER:** Brand profile não encontrado — sem paleta/estilo para aplicar
- **BLOCKER:** FLUX Kontext Pro indisponível — sem fallback para style transfer (engine exclusivo)
- **WARNING:** Composição ou sujeito da imagem original alterado após transfer — preservar conteúdo, mudar só estilo

## Handoff

on_complete: pass to requesting agent
on_fail: escalate to brandcraft-chief
