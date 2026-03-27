---
task-id: batch-render
name: Batch Render Multiple Outputs
agent: doc-generator
version: 1.0.0
purpose: Batch render multiple branded outputs in a single run

inputs:
  - name: content_list
    type: array
    description: Array of content items to render
    required: true
  - name: format
    type: string
    description: "Output format: pdf|carousel|card"
    required: true
  - name: brand_name
    type: string
    description: Brand template to apply to all items
    required: true

outputs:
  - path: "output/batch-{timestamp}/"
    format: directory
    description: Directory containing all rendered outputs

acceptance_criteria:
  - "Brand template is loaded once and reused for all items"
  - "Each item is rendered independently (one failure doesn't block others)"
  - "Summary report is generated with success/failure per item"
  - "Output directory uses timestamp for uniqueness"
---

# batch-render

## Overview

Renders multiple content items in a single batch operation, reusing the same brand template for efficiency. Produces a timestamped output directory with all results and a summary report. Individual item failures are logged but don't block the batch.

## Steps

1. Request brand template from Vault via `serve-template` (loaded once)
2. Validate brand completeness for the requested format
3. Create output directory: `output/batch-{YYYYMMDD-HHmmss}/`
4. Iterate over content_list:
   - For each item, delegate to the appropriate render task (render-pdf, render-carousel, or render-card)
   - Catch errors per item — log failure, continue batch
   - Save output to batch directory
5. Generate summary report:
   | # | Content | Status | Output Path | Error |
6. Save summary as `batch-summary.md` in the batch directory
7. Return batch directory path, total count, success count, failure count

## Veto Conditions

- **BLOCKER:** content_list vazio — nada para renderizar
- **BLOCKER:** Brand template não encontrado — batch inteiro depende de um único template
- **BLOCKER:** Todos os itens falharam — retornar resumo de erros ao usuário
- **WARNING:** Mais de 50% dos itens falharam — batch parcialmente comprometido, revisar conteúdo
- **WARNING:** Brand template carregado mais de uma vez (ineficiência) — reutilizar instância

## Handoff

on_complete: pass to quality-validator for batch review
on_fail: escalate to brandcraft-chief
