---
task-id: list-templates
name: List Brand Templates
agent: template-architect
version: 1.0.0
purpose: List all available brand templates in the vault

inputs:
  - name: filter
    type: string
    description: Optional filter by name, status, or date
    required: false

outputs:
  - path: "(stdout)"
    format: table
    description: Formatted table of all templates with metadata

acceptance_criteria:
  - "All templates in data/templates/ are scanned"
  - "Table includes name, version, status, token count, and created date"
  - "Filter is applied if provided"
---

# list-templates

## Overview

Scans the vault directory and produces a summary table of all stored brand templates. Useful for discovering available brands before rendering, or for auditing the vault state.

## Steps

1. Scan `data/templates/` directory for all `.yaml` files
2. Read each YAML file and extract metadata (name, version, status, token_count, created_at)
3. If filter is provided, apply it (match against name, status, or date range)
4. Sort results alphabetically by name
5. Build formatted table:
   | Brand | Version | Status | Tokens | Created |
6. Return table

## Veto Conditions

- No templates found and no filter applied → return empty table with note (not a halt)

## Handoff

on_complete: return table to requesting agent
on_fail: escalate to brandcraft-chief
