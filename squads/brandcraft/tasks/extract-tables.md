---
task-id: extract-tables
name: Extract Tables from PDF
agent: scribe
version: 1.0.0
purpose: Extract only tabular data from a PDF as structured markdown tables

inputs:
  - name: pdf_path
    type: path
    description: Path to the PDF file
    required: true

outputs:
  - path: "output/extracted/tables-{slug}.md"
    format: markdown
    description: All tables extracted as markdown with page references

acceptance_criteria:
  - "All tabular data detected and extracted"
  - "Column headers preserved"
  - "Column alignment maintained"
  - "Each table labeled with source page number"
---

# extract-tables

## Overview

Scans a PDF and extracts only the tables, ignoring body text, headings, and images. Each table is converted to markdown format with proper column alignment. Like a data analyst who flips through a report and pulls out just the spreadsheets.

## Steps

1. **Scan all pages** — Iterate through every page looking for tabular data patterns
2. **Detect tables** — Identify table boundaries, headers, and cell content
3. **Preserve structure** — Maintain columns, headers, alignment, and row groupings
4. **Output as markdown** — Convert each table to markdown table format with page reference
5. **Save** — Write to `output/extracted/tables-{slug}.md`

## Veto Conditions

- PDF password-protected → HALT
- No tables found in document → HALT, inform user
- File not found → HALT

## Handoff

on_complete: pass to brandcraft-chief
on_fail: escalate to brandcraft-chief
