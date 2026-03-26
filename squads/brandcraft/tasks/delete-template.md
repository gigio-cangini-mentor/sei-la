---
task-id: delete-template
name: Delete Brand Template
agent: template-architect
version: 1.0.0
purpose: Remove a brand template from the vault

inputs:
  - name: brand_name
    type: string
    description: Brand identifier to delete
    required: true
  - name: confirm
    type: boolean
    description: Explicit deletion confirmation
    required: true

outputs:
  - path: "(none)"
    format: confirmation
    description: Deletion confirmation message

acceptance_criteria:
  - "Template existence is verified before deletion"
  - "Explicit boolean confirmation is required"
  - "Deleted template name is logged"
---

# delete-template

## Overview

Permanently removes a brand template from the vault. This is a destructive operation that requires explicit confirmation. Designed to clean up obsolete or test templates.

## Steps

1. Verify template exists at `data/templates/{brand-name}.yaml`
2. Check if this is the only template in the vault (safety check)
3. Verify `confirm` is explicitly `true`
4. Delete the YAML file
5. Return confirmation with deleted template name and timestamp

## Veto Conditions

- Template not found → HALT
- `confirm` is not `true` → HALT (require explicit confirmation)
- Last remaining template in vault → HALT (prevent empty vault without explicit override)

## Handoff

on_complete: return confirmation to requesting agent
on_fail: escalate to brandcraft-chief
