# Replit Prompt Assembler — Combine design.json + copy brief

> Assembles a complete, ready-to-paste prompt for Replit Design Mode (or any AI code generator).

## Template

The final prompt follows this structure:

```
You are designing a landing page for {PRODUCT_NAME}, {PRODUCT_DESCRIPTION}. Follow the design.json below as your design system guidelines. The overall aesthetic should feel {AESTHETIC_KEYWORDS}.

Follow instructions below for copy and landing page content.

design.json
{DESIGN_JSON}

copy
{SECTION_SPECS}

BRIEF: {PRODUCT_NAME} Landing Page
{BRIEF_DESCRIPTION}

DESIGN SYSTEM REFERENCE: Use the design.json above as the definitive style guide. Key points:
{KEY_DESIGN_POINTS}

SECTIONS:
{DETAILED_SECTION_SPECS}

IMPORTANT STYLE NOTES:
{STYLE_NOTES}
```

## How to Fill Each Section

### {PRODUCT_NAME} & {PRODUCT_DESCRIPTION}
From Discovery Phase — product name and one-line description.

### {AESTHETIC_KEYWORDS}
From design.json → designPrinciples.keywords (e.g., "premium, trustworthy, warm, clean").

### {DESIGN_JSON}
The COMPLETE design.json extracted in Phase 1, pasted as-is.

### {SECTION_SPECS}
For EACH section, specify:

```
Section N: {Section Name}

Layout: {columns, alignment}
Background: {color or gradient}
Content:
  - {Element 1}: {description}
  - {Element 2}: {description}
  - [Generate]: {image/component to AI-generate}
```

### {KEY_DESIGN_POINTS}
Extract the 6-8 most important design rules from design.json:
- Color palette summary
- Typography rules
- Button styling
- Card styling
- Spacing philosophy
- Hover effects

### {STYLE_NOTES}
Standard quality rules:
- Use generous whitespace between all elements
- Headlines should have mixed font weights for emphasis
- All interactive elements need smooth hover transitions
- Cards should have subtle lift on hover
- Maintain consistent border-radius across all components
- Section backgrounds should alternate to create rhythm
- Trust signals should appear near every CTA
- Mobile-first responsive design with single-column stacking

## Output

Save the assembled prompt as:
```
{OUTPUT_DIR}/{slug}-replit-prompt.md
```

This file is ready to paste into Replit Design Mode, Cursor, Claude, or any AI code generator.
