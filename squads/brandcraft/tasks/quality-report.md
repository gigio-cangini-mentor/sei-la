---
task-id: quality-report
name: Generate Detailed QA Report
agent: gauge
version: 1.0.0
purpose: Produce a comprehensive quality report with specific issues and fixes

inputs:
  - name: output_path
    type: path
    description: Path to the output file to analyze
    required: true
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true

outputs:
  - path: "output/qa-reports/{slug}-report.md"
    format: markdown
    description: Detailed QA report with dimension analysis, issues, and fix suggestions

acceptance_criteria:
  - "Every scoring dimension documented with specific token references"
  - "Every issue found listed with severity and location"
  - "Fix suggestions provided for each issue"
  - "Report saved as persistent markdown file"
---

# quality-report

## Overview

Goes beyond a simple pass/fail score — this is the full autopsy report. Every dimension is documented with specific references to brand tokens, every issue is cataloged with its exact location and severity, and every fix is spelled out. Like a code review, but for visual content: line-by-line, with actionable comments.

## Steps

1. **Run full validation** — Execute complete scoring across all dimensions
2. **Document dimensions** — For each dimension, note the expected brand token values vs. actual values found
3. **List issues** — Catalog every deviation with severity (critical/major/minor) and exact location
4. **Suggest fixes** — Provide specific, actionable corrections for each issue
5. **Generate report** — Compile into structured markdown report
6. **Save** — Write to `output/qa-reports/{slug}-report.md`

## Veto Conditions

- Output file not found → HALT
- Brand profile not found → HALT

## Handoff

on_complete: pass to brandcraft-chief
on_fail: escalate to brandcraft-chief
