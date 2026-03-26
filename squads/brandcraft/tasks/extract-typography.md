---
task-id: extract-typography
name: Extract Typography
agent: token-extractor
version: 1.0.0
purpose: Extract typography tokens from a URL

inputs:
  - name: url
    type: url
    description: Website URL to extract typography from
    required: true

outputs:
  - path: "data/brands/{slug}/typography.yaml"
    format: yaml
    description: 8 typography tokens (families, sizes, weights)

acceptance_criteria:
  - "Font families detected from @font-face, Google Fonts, or system stack"
  - "Heading and body families correctly distinguished"
  - "Font sizes extracted for h1, h2, h3, and body"
  - "Font weights extracted for heading and body"
---

# extract-typography

## Overview

Focused extraction that pulls only typography information from a website. Detects which fonts are loaded, how they're used for headings vs body text, and captures the size/weight scale.

Like reading a book's colophon — what typeface, what size, what weight.

## Steps

1. **Scan CSS** — Parse all stylesheets (linked + inline) for font declarations
2. **Detect font sources** — Check for @font-face rules, Google Fonts links, Adobe Fonts, system font stacks
3. **Map families** — Distinguish heading font from body font based on usage on h1-h6 vs p/span elements
4. **Extract sizes** — Capture computed font-size for h1, h2, h3, and body text
5. **Extract weights** — Capture font-weight for headings and body
6. **Build 8 tokens:**
   - `font_heading` — heading font family
   - `font_body` — body font family
   - `size_h1` — h1 font size
   - `size_h2` — h2 font size
   - `size_h3` — h3 font size
   - `size_body` — body font size
   - `weight_heading` — heading font weight
   - `weight_body` — body font weight
7. **Output** — Save as structured YAML

## Veto Conditions

- URL unreachable → HALT
- No fonts detected (all system defaults with no explicit declarations) → WARN, output system stack defaults

## Handoff

on_complete: pass to template-architect for token storage
on_fail: escalate to brandcraft-chief
