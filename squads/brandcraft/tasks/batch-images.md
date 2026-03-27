---
task-id: batch-images
name: Generate Batch of Brand Images
agent: image-generator
version: 1.0.0
purpose: Generate multiple brand-coherent images in a single run

inputs:
  - name: descriptions
    type: string
    description: Array of image descriptions to generate
    required: true
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "output/images/batch-{timestamp}/"
    format: directory
    description: Folder containing all generated images

acceptance_criteria:
  - "All images share the same brand style and visual consistency"
  - "Provider selected per image type (not one-size-fits-all)"
  - "Incoherent images retried up to 2 times"
  - "Batch folder named with timestamp for traceability"
---

# batch-images

## Overview

Generates a set of brand-coherent images in one go. The key challenge beyond single generation is consistency — every image in the batch must look like it belongs to the same family. Like a photo shoot where every shot has the same lighting, color grading, and mood.

After generation, the agent reviews the batch for style coherence and retries outliers.

## Steps

1. **Load brand tokens** — Read brand profile for colors, style, mood
2. **Select providers** — Map each description to the best provider (nano-banana, dalle3, fal-video, flux) based on image type
3. **Craft prompts** — Inject brand context into each description, adding a shared style anchor across all prompts
4. **Generate all images** — Process each description through its assigned provider
5. **Verify batch consistency** — Compare outputs for visual coherence (same palette, same style). Flag outliers
6. **Retry incoherent** — Re-generate flagged images with stronger brand constraints (max 2 retries per image)
7. **Save batch** — Store all images in `output/images/batch-{timestamp}/`

## Veto Conditions

- **BLOCKER:** Array de descrições vazio — nada para gerar
- **BLOCKER:** Brand profile não encontrado — sem contexto visual para injetar nos prompts
- **BLOCKER:** Mais de 50% das imagens falharam após retries — reportar resultados parciais
- **WARNING:** Imagens do batch com estilos visualmente inconsistentes — regenerar outliers com constraints mais fortes
- **WARNING:** Mesmo provedor usado para todos os tipos de imagem — selecionar provedor por tipo (ilustração vs foto vs texto)

## Handoff

on_complete: pass to requesting agent or quality-validator
on_fail: escalate to brandcraft-chief with partial results
