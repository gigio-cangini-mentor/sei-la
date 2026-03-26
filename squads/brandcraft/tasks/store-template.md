---
task-id: store-template
name: Store Brand Template
agent: template-architect
version: 1.0.0
purpose: Store new brand template from Prober output into the vault

inputs:
  - name: tokens
    type: object
    description: Extracted brand tokens (colors, typography, spacing, etc.)
    required: true
  - name: brand_name
    type: string
    description: Brand identifier (derived from URL if not provided)
    required: false

outputs:
  - path: "data/templates/{brand-name}.yaml"
    format: yaml
    description: Stored brand template with versioned tokens

acceptance_criteria:
  - "Token object is validated for minimum completeness (>= 50%)"
  - "Template saved as YAML with version 1.0.0 and status field"
  - "Brand name slug is kebab-case and unique in vault"
---

# store-template

## Overview

Receives extracted brand tokens from the Token Extractor (Prober) and persists them as a versioned YAML template in the vault. Each template gets an initial version of 1.0.0 and a status of `complete` or `draft` depending on token coverage.

## Steps

1. Receive tokens object and optional brand_name
2. If brand_name not provided, derive slug from source URL domain
3. Validate token completeness — count filled categories vs total expected
4. If completeness >= 50%, determine status:
   - >= 90% filled tokens → status: `complete`
   - 50-89% filled tokens → status: `draft`
5. Assign version `1.0.0`
6. Build YAML structure with metadata (name, version, status, created_at, token_count)
7. Save to `data/templates/{brand-name}.yaml`
8. Return confirmation with path and completeness percentage

## Veto Conditions

- Less than 50% of expected tokens extracted → HALT (insufficient data to create useful template)
- Brand name conflicts with existing template → HALT (use update-template instead)

## Handoff

on_complete: pass to doc-generator (template ready for rendering)
on_fail: escalate to brandcraft-chief
