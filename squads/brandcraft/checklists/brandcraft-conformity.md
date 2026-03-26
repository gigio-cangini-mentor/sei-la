# BrandCraft Conformity Checklist

Verifica se a implementacao esta identica ao BrandCraft original (squads.sh) + melhorias.

## Agents (9/9)

- [x] Maestro (brandcraft-chief) — Pipeline orchestrator, routes all requests
- [x] Prober (token-extractor) — Extracts design tokens from URLs
- [x] Vault (template-architect) — Stores/versions/serves brand templates
- [x] Forge-Renderer (doc-generator) — HTML -> PDF/PNG via Puppeteer/Playwright
- [x] Canvas (pptx-architect) — PPTX generation via PptxGenJS
- [x] Brush (image-generator) — AI image gen via 4 MCP providers
- [x] Director (video-architect) — Video composition via Remotion
- [x] Scribe (pdf-extractor) — PDF content extraction
- [x] Gauge (quality-validator) — Brand consistency scoring PASS/FAIL

## Workflows (5/5)

- [x] Extract & Save (URL -> tokens -> template)
- [x] Create Document (content -> PDF/PNG + validation)
- [x] Create PPTX (content -> presentation + validation)
- [x] Create Video (content -> MP4/GIF + validation)
- [x] Improve Document (PDF -> extract -> re-render + validation)

## Output Formats (11/11)

### Documents (5)
- [x] PDF Report A4 (210x297mm) — Puppeteer
- [x] PDF Slides 16:9 (254x143mm) — Puppeteer
- [x] Carousel Instagram (1080x1080 / 1080x1350) — Playwright PNG
- [x] Social Card (1200x630) — Playwright PNG
- [x] PPTX Widescreen (10x5.625in) — PptxGenJS

### Videos (6)
- [x] Reel/Short 9:16 (1080x1920, 30fps) — Remotion
- [x] Story 9:16 (1080x1920, 30fps) — Remotion
- [x] Landscape 16:9 (1920x1080, 30fps) — Remotion
- [x] Square 1:1 (1080x1080, 30fps) — Remotion
- [x] Animated Carousel 4:5 (1080x1350, 30fps) — Remotion
- [x] GIF (configurable, 15fps) — Remotion

## Tech Stack

- [x] Puppeteer ^23.0 (PDF/PNG rendering)
- [x] PptxGenJS ^3.12 (PPTX generation)
- [x] Remotion ^4.0 (video composition)
- [x] pdf-parse ^1.1 (PDF extraction)
- [x] pdf-lib ^1.17 (PDF manipulation)
- [x] 4 AI image MCPs (nano-banana, dalle3, fal-video, flux)

## Quality System (Gauge)

### Document Scoring (100 points)
- [x] Brand Colors: 20 pts (primary, secondary, accent, backgrounds)
- [x] Typography: 20 pts (font families, hierarchy, readability)
- [x] Spacing: 15 pts (token application, consistency)
- [x] Layout: 30 pts (dimensions, margins, alignment, overflow)
- [x] Overall Consistency: 15 pts (coherence, logo, style unity)

### Video Scoring (100 points)
- [x] Brand Colors: 25 pts (all scenes)
- [x] Typography: 20 pts (brand fonts, sizes)
- [x] Animations: 20 pts (frame-driven, timing)
- [x] Layout & Safe Zones: 20 pts (dimensions, placement)
- [x] Logo & Identity: 15 pts (presence, proportions)

### Verdict Thresholds
- [x] >=90: PASS (Excellent) -> immediate delivery
- [x] 70-89: PASS (Acceptable) -> delivery with notes
- [x] 50-69: FAIL (Partial) -> auto-correct + re-validate (max 2x)
- [x] <50: FAIL (Critical) -> complete re-execution

## Token Structure (YAML Template)
- [x] 7 color tokens (primary, secondary, accent, background, surface, text_primary, text_secondary)
- [x] 8 typography tokens (font_heading, font_body, sizes h1-h3+body, weights)
- [x] 6 spacing tokens (xs through xxl: 4-48px)
- [x] 2 logo variants (primary SVG, icon PNG)
- [x] Metadata (source_url, extracted_at, version, status)

## AIOS Skill Reuse
- [x] design-system-extractor (Prober capability)
- [x] md-to-branded-pdf (Forge-Renderer PDF capability)
- [x] image-creator (Forge-Renderer PNG capability)
- [x] canva (Brush alternative)
- [x] image-fetcher (Brush reference images)
- [x] instagram-publisher (Maestro publishing)

## AIOS Squad Reuse
- [x] ai-reels (Director video pipeline)
- [x] branding (Brand strategy governance)
- [x] design (Design system validation)

## Enhancements (beyond original)
- [x] Direct social publishing (instagram-publisher, blotato)
- [x] Landing page generation (lp-generator, md-to-landing-page)
- [x] Avatar + voice (ElevenLabs + HeyGen via ai-reels)
- [x] Brand strategy layer (6 elite minds from branding squad)
- [x] 26 pre-built brand themes (from md-to-branded-pdf)

## Structure Compliance
- [x] config.yaml with full agent roster and dependencies
- [x] README.md with quick start and full documentation
- [x] All agents in agents/ with AIOS-compliant structure
- [x] All workflows in workflows/ with phases and veto conditions
- [x] Checklist for conformity validation
- [x] Tier system: T0 (diagnosis) -> T1 (orchestration) -> T2 (production) -> T3 (validation)
