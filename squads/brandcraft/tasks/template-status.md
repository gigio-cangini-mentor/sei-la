---
task-id: template-status
name: Template Completeness Status
agent: template-architect
version: 1.0.0
purpose: Show completeness report for a brand template

inputs:
  - name: brand_name
    type: string
    description: Brand identifier to audit
    required: true

outputs:
  - path: "(stdout)"
    format: report
    description: Completeness report with per-category breakdown

acceptance_criteria:
  - "Each token category is evaluated independently"
  - "Missing tokens are explicitly listed"
  - "Overall completeness percentage is calculated"
---

# template-status

## Overview

Produces a detailed completeness audit for a brand template. Breaks down token coverage by category (colors, typography, spacing, etc.) and flags specific missing tokens. Useful before rendering to ensure output quality.

## Steps

1. Load template from `data/templates/{brand-name}.yaml`
2. Define expected token categories and their required fields:
   - Colors: primary, secondary, accent, background, surface, text, muted
   - Typography: font-family, headings, body, sizes, weights, line-heights
   - Spacing: base unit, scale, padding, margins
   - Borders: radius, widths, colors
   - Effects: shadows, gradients, overlays
3. Count filled vs expected tokens per category
4. Calculate per-category and overall completeness percentages
5. Flag missing tokens with their category
6. Build report:
   | Category | Filled | Total | % | Missing |
7. Return report with overall status recommendation

## Veto Conditions

- Template not found → HALT

## Handoff

on_complete: return report to requesting agent
on_fail: escalate to brandcraft-chief
