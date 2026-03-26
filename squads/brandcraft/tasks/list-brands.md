---
task-id: list-brands
name: List Brands
agent: brandcraft-chief
version: 1.0.0
purpose: List available brand templates from the Vault

inputs:
  - name: filter
    type: string
    description: Optional filter string to narrow results by brand name
    required: false

outputs:
  - path: "(stdout — no file output)"
    format: markdown-table
    description: Table of available brands with name, source URL, and token count

acceptance_criteria:
  - "All brands in data/brands/ listed"
  - "Each entry shows brand name, source URL, and completeness status"
  - "Filter applied if provided"
---

# list-brands

## Overview

Delegates to template-architect to enumerate all stored brand design systems. Returns a formatted table so the user can pick which brand to use in generation tasks.

Like opening your closet and seeing all available outfits laid out.

## Steps

1. **Delegate to template-architect** — Call `*list` to scan `data/brands/` directory
2. **Collect brand metadata** — For each brand: name, source URL, token count, last updated
3. **Apply filter** — If filter param provided, match against brand names (case-insensitive)
4. **Format results** — Render as markdown table with columns: Brand | Source | Tokens | Status
5. **Return to user** — Display the table

## Veto Conditions

- None — read-only task

## Handoff

on_complete: return list to user (no further dispatch)
on_fail: report "no brands found" and suggest running extract-design-system first
