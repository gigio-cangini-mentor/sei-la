---
task-id: pdf-metadata
name: Show PDF Metadata
agent: scribe
version: 1.0.0
purpose: Display PDF metadata without extracting content

inputs:
  - name: pdf_path
    type: path
    description: Path to the PDF file
    required: true

outputs:
  - path: "stdout"
    format: text
    description: Metadata summary displayed to user

acceptance_criteria:
  - "Title, author, and creation date shown"
  - "Page count and file size reported"
  - "Fonts used listed"
  - "Encryption status noted"
---

# pdf-metadata

## Overview

Quick metadata inspection for a PDF — no content extraction, just the file's identity card. Shows who made it, when, how big it is, and what fonts it uses. Like checking the label on a package before opening it.

## Steps

1. **Read metadata** — Extract PDF metadata fields: title, author, creation date, modification date
2. **Count pages** — Report total page count
3. **Check file size** — Report file size in human-readable format
4. **List fonts** — Enumerate all fonts used in the document
5. **Report encryption** — Note if the PDF is encrypted or password-protected
6. **Display** — Present metadata summary to user

## Veto Conditions

- File not found or not a valid PDF → HALT

## Handoff

on_complete: return to requester
on_fail: escalate to brandcraft-chief
