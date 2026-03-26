---
task-id: read-pages
name: Extract Specific Pages from PDF
agent: scribe
version: 1.0.0
purpose: Extract content from a specific page range of a PDF

inputs:
  - name: pdf_path
    type: path
    description: Path to the PDF file
    required: true
  - name: pages
    type: string
    description: "Page range to extract (e.g. '1-5', '3', '10-20')"
    required: true

outputs:
  - path: "output/extracted/{slug}-pages-{range}.md"
    format: markdown
    description: Extracted content for the specified page range

acceptance_criteria:
  - "Only specified pages extracted"
  - "Content structured as markdown with headings and paragraphs"
  - "Page boundaries clearly marked in output"
---

# read-pages

## Overview

Extracts content from a specific page range of a PDF — useful when you only need a chapter, a section, or a few pages from a large document. Like bookmarking pages in a book and photocopying just those.

## Steps

1. **Validate range** — Parse page range string and verify pages exist in the PDF
2. **Read specified pages** — Extract content only from the requested page range
3. **Structure as markdown** — Organize extracted content with headings, paragraphs, and page markers
4. **Save** — Write to `output/extracted/`

## Veto Conditions

- PDF password-protected → HALT
- Page range exceeds document length → HALT, report actual page count
- File not found → HALT

## Handoff

on_complete: pass to brandcraft-chief
on_fail: escalate to brandcraft-chief
