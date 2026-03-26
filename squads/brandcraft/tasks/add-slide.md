---
task-id: add-slide
name: Add Slide to Existing Deck
agent: pptx-architect
version: 1.0.0
purpose: Append a new branded slide to an existing PPTX presentation

inputs:
  - name: deck_path
    type: path
    description: Path to the existing PPTX file
    required: true
  - name: content
    type: string
    description: Content for the new slide (title + body)
    required: true
  - name: slide_type
    type: string
    description: "Layout type: content, section, chart, or quote"
    required: false

outputs:
  - path: "{deck_path}"
    format: pptx
    description: Updated PPTX with the new slide appended

acceptance_criteria:
  - "Existing slides remain untouched"
  - "New slide matches the brand tokens of the existing deck"
  - "Slide type respected if provided, auto-detected if not"
  - "Logo and brand footer consistent with existing slides"
---

# add-slide

## Overview

Adds a single slide to an existing presentation without touching what is already there. Like adding a page to a book — the new page matches the same typography, margins, and style as the rest.

The agent reads the existing deck to extract the brand context, then creates the new slide using the same tokens.

## Steps

1. **Read existing deck** — Open the PPTX and extract brand tokens from existing slides
2. **Determine insertion point** — Default: append at end (before Closing slide if one exists)
3. **Select layout** — Use `slide_type` if provided; otherwise infer from content (bullets → content, single phrase → quote, etc.)
4. **Create slide** — Build the new slide with brand tokens (colors, fonts, logo)
5. **Append and save** — Insert the slide and overwrite the deck file

## Veto Conditions

- `deck_path` does not exist or is not a valid PPTX → HALT
- Content is empty → HALT

## Handoff

on_complete: pass to quality-validator
on_fail: escalate to pptx-architect for manual review
