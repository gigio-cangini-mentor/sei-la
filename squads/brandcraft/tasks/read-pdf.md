---
task-id: read-pdf
name: Extract Full Content from PDF
agent: scribe
version: 1.0.0
purpose: Extract complete structured content from a PDF preserving hierarchy

inputs:
  - name: pdf_path
    type: path
    description: Path to the PDF file to extract
    required: true

outputs:
  - path: "output/extracted/{slug}.md"
    format: markdown
    description: Full extracted content as structured markdown
  - path: "output/extracted-images/"
    format: directory
    description: Extracted images from the PDF

acceptance_criteria:
  - "Section hierarchy preserved based on font size detection"
  - "Paragraphs extracted with proper formatting"
  - "Tables converted to markdown format"
  - "Images extracted as separate files"
  - "Issues flagged (missing text, OCR needs, corrupt pages)"
---

# read-pdf

## Overview

Extracts the full content of a PDF file while preserving its structure — headings, paragraphs, tables, and images all come out organized as markdown. Think of it as an X-ray machine for documents: you see everything inside, structured and labeled.

The agent detects whether the PDF is text-based or image-based (scanned) and flags accordingly. Scanned PDFs may need OCR for full extraction.

## Steps

1. **Read metadata** — Extract title, author, creation date, page count, file size, fonts used
2. **Detect type** — Check if PDF is text-based or scanned (image-only)
3. **Extract section hierarchy** — Identify headings by font size and build document outline
4. **Extract paragraphs** — Pull body text with formatting preserved
5. **Extract tables** — Detect tabular data and convert to markdown tables
6. **Extract images** — Pull embedded images and save to `output/extracted-images/`
7. **Flag issues** — Note any problems (missing text, corrupt pages, OCR requirements)

## Veto Conditions

- PDF is password-protected → HALT, ask user for password or alternate file
- File not found or not a valid PDF → HALT

## Handoff

on_complete: pass to brandcraft-chief for redesign pipeline
on_fail: escalate to brandcraft-chief
