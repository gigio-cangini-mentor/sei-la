---
task-id: serve-template
name: Serve Brand Template
agent: template-architect
version: 1.0.0
purpose: Serve a brand template to any requesting agent

inputs:
  - name: brand_name
    type: string
    description: Brand identifier to look up
    required: true

outputs:
  - path: "(in-memory)"
    format: object
    description: Full brand template object with all tokens

acceptance_criteria:
  - "Exact match attempted first, then fuzzy match (>80% similarity)"
  - "If no match, available templates are listed for disambiguation"
  - "Returned object includes all token categories"
---

# serve-template

## Overview

Acts as the vault's read interface. When any agent (doc-generator, image-generator, etc.) needs brand tokens, they request them through this task. Implements a matching strategy that tries exact match first, then fuzzy, then lists alternatives.

## Steps

1. Receive brand_name request
2. Attempt exact match in `data/templates/` (kebab-case normalized)
3. If no exact match, run fuzzy match against all template names (threshold: 80%)
4. If fuzzy match found, return with a note about the matched name
5. If no match at all, list all available templates and return error
6. Load matched YAML file
7. Parse and return full token object with metadata

## Veto Conditions

- No match found after exact + fuzzy search → HALT (return available list instead)
- Template file is corrupted or unparseable → HALT (flag for repair)

## Handoff

on_complete: return tokens to requesting agent
on_fail: escalate to brandcraft-chief
