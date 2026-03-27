---
task-id: create-pptx
name: Create Branded Presentation
agent: pptx-architect
version: 1.0.0
purpose: Generate a full branded PPTX presentation from content

inputs:
  - name: content
    type: string
    description: Content to be structured into slides (text, topics, or outline)
    required: true
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "output/{slug}.pptx"
    format: pptx
    description: Complete branded presentation file

acceptance_criteria:
  - "Brand tokens loaded and applied consistently across all slides"
  - "Master slides created: Title, Content, Section Divider, Closing"
  - "Content mapped to appropriate slide layouts"
  - "Max 6 lines per slide, max 8 words per bullet"
  - "Font sizes never below size_h3 from brand tokens"
  - "Logo present on every slide"
  - "Minimum 3 slides generated"
---

# create-pptx

## Overview

Generates a complete branded presentation from raw content. The agent loads brand tokens from the Vault, creates master slide layouts, then maps the content into a structured deck — like a designer who reads your notes and turns them into polished slides.

PptxGenJS is the rendering engine. Every visual decision (colors, fonts, spacing) comes from the brand profile, not from defaults.

## Steps

1. **Load brand** — Read brand profile from `data/brands/{brand_name}/` and extract tokens (colors, fonts, logos, spacing)
2. **Create master slides** — Build 4 master layouts: Title, Content, Section Divider, Closing
3. **Parse content** — Break input content into logical sections and determine slide count
4. **Map to layouts** — Assign each content block to the best master layout
5. **Apply brand tokens** — Inject colors, fonts, logo, and spacing from brand profile into every slide
6. **Generate PPTX** — Render final file via PptxGenJS and save to `output/`

## Veto Conditions

- **BLOCKER:** PptxGenJS não disponível ou não instalado — sem engine de renderização, nada pode ser produzido
- **BLOCKER:** Conteúdo insuficiente para produzir mínimo de 3 slides — pedir mais conteúdo ao usuário
- **BLOCKER:** Brand profile não encontrado em `data/brands/` — rodar extract-design-system primeiro
- **BLOCKER:** Master slides não criados antes de gerar slides de conteúdo — consistência visual comprometida
- **WARNING:** Slide com mais de 6 linhas de texto ou bullets com mais de 8 palavras — editar conteúdo antes de renderizar

## Handoff

on_complete: pass to quality-validator
on_fail: escalate to brandcraft-chief
