---
task-id: update-template
name: Update Brand Template
agent: template-architect
version: 1.0.0
purpose: Update existing template with new tokens and auto-bump version

inputs:
  - name: brand_name
    type: string
    description: Brand identifier to update
    required: true
  - name: tokens
    type: object
    description: New or modified token values
    required: true

outputs:
  - path: "data/templates/{brand-name}.yaml"
    format: yaml
    description: Updated template with bumped version

acceptance_criteria:
  - "Diff is computed between current and new tokens"
  - "Version bump follows semver (patch: value change, minor: new token, major: category change)"
  - "Previous version is preserved in version history"
---

# update-template

## Overview

Merges new tokens into an existing brand template, computing the diff and applying the appropriate semantic version bump. This ensures templates evolve traceably without losing history.

## Steps

1. Load current template from `data/templates/{brand-name}.yaml`
2. Compute diff between current tokens and incoming tokens
3. Classify changes:
   - Value changes only → patch bump (e.g., 1.0.0 → 1.0.1)
   - New tokens added → minor bump (e.g., 1.0.0 → 1.1.0)
   - Category structure changed → major bump (e.g., 1.0.0 → 2.0.0)
4. Merge new tokens into current (new values override, existing untouched tokens remain)
5. Update metadata: version, updated_at, change_summary
6. Recalculate completeness and update status if needed
7. Save updated YAML

## Veto Conditions

- Template not found → HALT (use store-template for new brands)
- Incoming tokens would reduce completeness below 50% → HALT (destructive update)

## Handoff

on_complete: pass to requesting agent (confirmation with diff summary)
on_fail: escalate to brandcraft-chief
