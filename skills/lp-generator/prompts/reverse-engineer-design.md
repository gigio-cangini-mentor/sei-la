# Reverse Engineer Design — Extract design.json from Screenshot

> Core prompt of Mode C. Analyzes a design reference screenshot and extracts a structured design system.

## Instructions

You are a **senior creative director** analyzing a design screenshot. Your job is to extract EVERY visual decision into a structured `design.json` that an AI code generator can use to replicate this exact look.

Analyze the attached screenshot deeply. Extract:

## What to Extract

### 1. Design Principles
- Overall aesthetic in one sentence
- 3-5 keywords that define the feel
- What to AVOID (anti-patterns from this style)

### 2. Color Palette
Extract ALL colors you see, organized by role:

```json
{
  "primary": { "main": "#hex", "light": "#hex", "dark": "#hex" },
  "neutral": { "white": "#hex", "cream": "#hex", "gray": "#hex", "dark": "#hex", "black": "#hex" },
  "accent": { "main": "#hex", "secondary": "#hex" },
  "usage": {
    "backgrounds": ["description of when to use each bg color"],
    "text": { "headings": "color", "body": "color", "muted": "color", "onDark": "color" },
    "buttons": { "primary": "bg + text", "secondary": "bg + text + border" }
  }
}
```

### 3. Typography
- Font families (heading vs body — identify or suggest closest match)
- Font weights used
- Size scale (h1, h2, h3, body, small) with clamp() values
- Line heights and letter spacing
- Special emphasis techniques (italic, bold, mixed weights)

### 4. Spacing
- Section vertical padding
- Container max width
- Component gaps (between cards, between heading and content)
- Card internal padding
- Grid system (columns, gutter)

### 5. Components
For EACH component visible:
- **Buttons**: shape, padding, border-radius, shadows, hover effects
- **Cards**: background, border-radius, padding, shadow, border, hover
- **Icons**: style (Lucide, Heroicons, etc.), size, container styling
- **Badges/Labels**: shape, colors, text style
- **Inputs**: border, radius, padding, focus states
- **Navigation**: height, background, link styles

### 6. Imagery
- Photo style (warm, cool, lifestyle, abstract, 3D)
- Illustration style if present
- Background treatments (textures, gradients, patterns)
- Hero image composition

### 7. Animations & Effects
- Hover effects (lift, scale, glow, color change)
- Transition timing and easing
- Scroll animations if detectable
- Micro-interactions

### 8. Layout Patterns
- Hero layout (columns, alignment, split ratio)
- Section rhythm (alternating backgrounds)
- Card grid layouts
- CTA section layout
- Footer structure

## Output Format

Return a SINGLE JSON object called `design.json` with ALL the above sections. Use the exact structure shown above. Be SPECIFIC — use hex codes, pixel values, rem values, and cubic-bezier curves. No vague descriptions.

**Critical rules:**
- Extract REAL values you see, don't invent
- If a font is unclear, suggest the closest Google Font match
- Include clamp() for responsive typography
- Describe hover states even if you can't see them (infer from the design style)
- Use CSS-ready values (not "big padding" but "clamp(4rem, 10vw, 8rem)")

## Brand YAML Mapping

After generating `design.json`, also output a simplified `brand.yaml` compatible with the lp-generator pipeline:

```yaml
name: "{Extracted Theme Name}"
theme: "{dark|light}"
colors:
  primary: "{primary.main}"
  primary_light: "{primary.light}"
  accent: "{accent.main}"
  background: "{neutral.dark or neutral.white}"
  card: "{card background}"
  border: "{card border or neutral.gray}"
  text: "{text.body}"
  text_muted: "{text.muted}"
  white: "{neutral.white}"
  highlight: "{accent.secondary or primary.light}"
font: "{heading font family}"
cover:
  gradient_primary: "rgba(R,G,B,0.20)"
  gradient_secondary: "rgba(R,G,B,0.08)"
```

This `brand.yaml` is the bridge between the extracted design and the existing lp-generator render engine.
