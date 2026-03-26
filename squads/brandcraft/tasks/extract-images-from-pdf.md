---
task-id: extract-images-from-pdf
name: Extract Images from PDF
agent: scribe
version: 1.0.0
purpose: Extract only embedded images from a PDF as separate files

inputs:
  - name: pdf_path
    type: path
    description: Path to the PDF file
    required: true

outputs:
  - path: "output/extracted-images/"
    format: directory
    description: Extracted image files with page/position metadata

acceptance_criteria:
  - "All embedded images extracted"
  - "Original resolution preserved"
  - "Files named with page number and position (e.g. p3-img1.png)"
  - "Manifest file listing all images with source page"
---

# extract-images-from-pdf

## Overview

Pulls every embedded image out of a PDF as individual files. Each image retains its original resolution and gets labeled with its source page and position. Like cutting out all the photos from a magazine and organizing them in a folder.

## Steps

1. **Scan all pages** — Iterate through every page locating embedded image objects
2. **Extract images** — Pull each image in its original format and resolution
3. **Name files** — Label each image with page number and position (e.g. `p3-img1.png`)
4. **Note positions** — Record original page and placement for each image
5. **Save** — Write images to `output/extracted-images/` with a manifest file

## Veto Conditions

- PDF password-protected → HALT
- No images found in document → HALT, inform user
- File not found → HALT

## Handoff

on_complete: pass to brandcraft-chief
on_fail: escalate to brandcraft-chief
