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

- content_list is empty → HALT
- Brand template not found → HALT
- All items fail → HALT (return error summary)

## Handoff

on_complete: pass to quality-validator for batch review
on_fail: escalate to brandcraft-chief
