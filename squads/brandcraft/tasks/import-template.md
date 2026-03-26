---
task-id: import-template
name: Import Brand Template
agent: template-architect
version: 1.0.0
purpose: Import a brand template from an external YAML file

inputs:
  - name: yaml_path
    type: path
    description: Path to external YAML file to import
    required: true

outputs:
  - path: "data/templates/{brand-name}.yaml"
    format: yaml
    description: Imported and validated template

acceptance_criteria:
  - "External YAML is validated against expected schema"
  - "Token completeness is checked (>= 50% required)"
  - "Imported template is stored with correct metadata"
---

# import-template

## Overview

Imports a brand template from an external YAML file into the vault. Validates structure and completeness before storing. Useful for migrating templates between BrandCraft instances or importing manually crafted brand definitions.

## Steps

1. Read YAML file from provided path
2. Validate YAML structure (required fields: name, tokens, version)
3. Validate token schema — ensure categories match expected structure
4. Calculate token completeness percentage
5. If completeness < 50%, halt with details on missing tokens
6. Normalize brand name to kebab-case slug
7. Check for conflicts with existing templates (prompt for overwrite if exists)
8. Store in `data/templates/{brand-name}.yaml` with import metadata (source_path, imported_at)

## Veto Conditions

- YAML file not found or unreadable → HALT
- Invalid YAML structure (missing required fields) → HALT
- Token completeness below 50% → HALT

## Handoff

on_complete: return stored template path and completeness report
on_fail: escalate to brandcraft-chief
