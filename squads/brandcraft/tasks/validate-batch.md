---
task-id: validate-batch
name: Validate Batch Outputs
agent: gauge
version: 1.0.0
purpose: Score all outputs in a folder against brand template

inputs:
  - name: folder_path
    type: path
    description: Path to folder containing outputs to validate
    required: true
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "stdout"
    format: text
    description: Batch validation report with per-file and aggregate scores

acceptance_criteria:
  - "Every output in folder validated individually"
  - "Per-file scores and verdicts listed"
  - "Aggregate quality score calculated"
  - "Failing items clearly flagged with reasons"
---

# validate-batch

## Overview

Validates every output file in a folder against the brand template — the assembly line version of quality control. Each file gets its own score, and the report shows an aggregate view. Like a factory inspector checking every unit off the production line before shipping.

## Steps

1. **List outputs** — Scan folder and identify all validatable files (docs, videos, images)
2. **Detect types** — Auto-classify each file as doc or video based on extension
3. **Validate each** — Run `validate-output` logic on every file individually
4. **Aggregate scores** — Calculate average score, min/max, pass rate
5. **Report** — Present per-file results + overall batch quality summary

## Veto Conditions

- Folder empty or not found → HALT
- Brand profile not found → HALT

## Handoff

on_complete: pass to brandcraft-chief with batch report
on_fail: escalate to brandcraft-chief
