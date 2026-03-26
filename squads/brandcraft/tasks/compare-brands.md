---
task-id: compare-brands
name: Compare Brands
agent: token-extractor
version: 1.0.0
purpose: Compare design tokens between two websites

inputs:
  - name: url1
    type: url
    description: First website URL to compare
    required: true
  - name: url2
    type: url
    description: Second website URL to compare
    required: true

outputs:
  - path: "output/comparison-{slug1}-vs-{slug2}.md"
    format: markdown
    description: Side-by-side comparison report with highlighted differences

acceptance_criteria:
  - "Tokens extracted from both URLs"
  - "Comparison table includes colors, typography, and spacing"
  - "Differences clearly highlighted"
  - "Similarity score calculated"
---

# compare-brands

## Overview

Extracts design tokens from two websites and builds a side-by-side comparison report. Useful for competitive analysis, migration planning, or verifying brand consistency across domains.

Like putting two outfits side by side — same color? Same fabric? Where do they diverge?

## Steps

1. **Extract tokens from URL 1** — Run full color + typography + spacing extraction on first URL
2. **Extract tokens from URL 2** — Run full extraction on second URL
3. **Build comparison table** — Align tokens by semantic role and show values side by side
4. **Highlight differences** — Mark tokens that differ significantly:
   - Colors: deltaE > 10 = major difference
   - Typography: different font family = major, size diff > 4px = minor
   - Spacing: diff > 8px = notable
5. **Calculate similarity score** — Percentage of matching tokens (0-100%)
6. **Generate report** — Write markdown with comparison table, diff highlights, and summary
7. **Save output** — Write to `output/` directory

## Veto Conditions

- Either URL unreachable → HALT, report which one failed
- Both URLs return identical content (same site) → WARN, proceed but note it

## Handoff

on_complete: return report to user via brandcraft-chief
on_fail: escalate to brandcraft-chief with partial results if one URL succeeded
