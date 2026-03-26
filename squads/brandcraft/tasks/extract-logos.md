---
task-id: extract-logos
name: Extract Logos
agent: token-extractor
version: 1.0.0
purpose: Extract logo assets from a URL

inputs:
  - name: url
    type: url
    description: Website URL to extract logos from
    required: true

outputs:
  - path: "data/brands/{slug}/assets/logo.svg"
    format: svg
    description: Full logo in SVG format
  - path: "data/brands/{slug}/assets/logo.png"
    format: png
    description: Full logo in PNG format
  - path: "data/brands/{slug}/assets/icon.png"
    format: png
    description: Icon/favicon variant

acceptance_criteria:
  - "At least one logo variant extracted"
  - "SVG preferred when available"
  - "PNG fallback captured via screenshot if no SVG found"
  - "Icon variant extracted from favicon or nav element"
---

# extract-logos

## Overview

Focused extraction that pulls logo assets from a website. Checks multiple common locations where logos live and saves both full logo and compact icon variants.

Like grabbing a business card — you want the logo in the best quality you can get.

## Steps

1. **Check header/nav** — Look for SVG elements or img tags in the header/nav area (most common logo location)
2. **Check og:image** — Inspect Open Graph meta tags for a branded image
3. **Check favicon** — Extract favicon.ico, apple-touch-icon, or manifest icons
4. **Prioritize SVG** — If an SVG logo is found, save it directly (vector = best quality)
5. **PNG fallback** — If no SVG, capture the logo element as a high-res PNG screenshot
6. **Extract icon variant** — Save a compact version (favicon or cropped logo) as icon
7. **Save assets** — Write files to `data/brands/{slug}/assets/`

## Veto Conditions

- URL unreachable → HALT
- No identifiable logo found in header, og:image, or favicon → HALT, ask user for logo file

## Handoff

on_complete: pass to template-architect for asset registration
on_fail: escalate to brandcraft-chief with details on what was attempted
