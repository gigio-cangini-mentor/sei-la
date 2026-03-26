---
task-id: export-template
name: Export Brand Template
agent: template-architect
version: 1.0.0
purpose: Export a brand template as a standalone YAML file

inputs:
  - name: brand_name
    type: string
    description: Brand identifier to export
    required: true
  - name: output_path
    type: path
    description: Destination path for exported file (defaults to output/)
    required: false

outputs:
  - path: "{output_path}/{brand-name}-export.yaml"
    format: yaml
    description: Standalone exported YAML file

acceptance_criteria:
  - "Exported YAML is self-contained (includes all tokens and metadata)"
  - "File is written to specified path or default output directory"
  - "Export includes version and export timestamp"
---

# export-template

## Overview

Exports a brand template as a portable, self-contained YAML file that can be shared, backed up, or imported into another BrandCraft instance. The exported file includes all tokens, metadata, and version information.

## Steps

1. Load template from `data/templates/{brand-name}.yaml`
2. Build standalone YAML with:
   - Full token set
   - Metadata (name, version, status, created_at, exported_at)
   - Schema version for compatibility
3. Determine output path (use provided path or default to `output/`)
4. Write YAML file as `{brand-name}-export.yaml`
5. Return confirmation with file path and size

## Veto Conditions

- Template not found → HALT
- Output path is not writable → HALT

## Handoff

on_complete: return exported file path
on_fail: escalate to brandcraft-chief
