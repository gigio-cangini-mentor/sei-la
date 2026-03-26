/**
 * PPTX Generator — Brand-consistent presentation generation
 *
 * Usage:
 *   node generate-pptx.mjs --content content.md --brand brand-template.yaml --output output.pptx
 *
 * Dependencies:
 *   npm install pptxgenjs gray-matter
 */

import PptxGenJS from 'pptxgenjs';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

// =============================================================================
// BRAND TOKEN LOADER
// =============================================================================

function loadBrandTokens(brandPath) {
  const raw = fs.readFileSync(brandPath, 'utf-8');
  const { data } = matter(raw);
  return data.tokens;
}

// =============================================================================
// CONTENT PARSER
// =============================================================================

function parseContent(contentPath) {
  const raw = fs.readFileSync(contentPath, 'utf-8');
  const lines = raw.split('\n');
  const slides = [];
  let currentSlide = null;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      // Title slide
      if (currentSlide) slides.push(currentSlide);
      currentSlide = { type: 'title', title: line.replace('# ', ''), bullets: [] };
    } else if (line.startsWith('## ')) {
      // Section divider
      if (currentSlide) slides.push(currentSlide);
      currentSlide = { type: 'section', title: line.replace('## ', ''), bullets: [] };
    } else if (line.startsWith('### ')) {
      // Content slide header
      if (currentSlide) slides.push(currentSlide);
      currentSlide = { type: 'content', title: line.replace('### ', ''), bullets: [] };
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      // Bullet point
      if (currentSlide) {
        currentSlide.bullets.push(line.replace(/^[-*] /, ''));
      }
    } else if (line.startsWith('> ')) {
      // Quote
      if (currentSlide) slides.push(currentSlide);
      currentSlide = { type: 'quote', text: line.replace('> ', ''), bullets: [] };
    }
  }

  if (currentSlide) slides.push(currentSlide);

  // Always add closing slide
  slides.push({ type: 'closing', title: '', bullets: [] });

  return slides;
}

// =============================================================================
// MASTER SLIDES
// =============================================================================

function defineMasterSlides(pptx, tokens) {
  const primary = tokens.colors.primary.replace('#', '');
  const accent = tokens.colors.accent.replace('#', '');
  const background = tokens.colors.background.replace('#', '');
  const textPrimary = tokens.colors.text_primary.replace('#', '');
  const fontHeading = tokens.typography.font_heading.replace(/'/g, '').split(',')[0].trim();
  const fontBody = tokens.typography.font_body.replace(/'/g, '').split(',')[0].trim();

  return { primary, accent, background, textPrimary, fontHeading, fontBody };
}

// =============================================================================
// SLIDE BUILDERS
// =============================================================================

function buildTitleSlide(pptx, slide, brand) {
  const s = pptx.addSlide();
  s.background = { color: brand.primary };
  s.addText(slide.title, {
    x: 0.5, y: 1.5, w: 9, h: 2,
    fontSize: 36, fontFace: brand.fontHeading,
    color: brand.background, bold: true,
    align: 'center', valign: 'middle'
  });
  return s;
}

function buildSectionSlide(pptx, slide, brand) {
  const s = pptx.addSlide();
  s.background = { color: brand.accent };
  s.addText(slide.title, {
    x: 0.5, y: 2, w: 9, h: 1.5,
    fontSize: 30, fontFace: brand.fontHeading,
    color: brand.background, bold: true,
    align: 'center', valign: 'middle'
  });
  return s;
}

function buildContentSlide(pptx, slide, brand) {
  const s = pptx.addSlide();
  s.background = { color: brand.background };

  // Header bar
  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.8, fill: { color: brand.primary }
  });

  // Title in header
  s.addText(slide.title, {
    x: 0.5, y: 0.1, w: 9, h: 0.6,
    fontSize: 20, fontFace: brand.fontHeading,
    color: brand.background, bold: true
  });

  // Bullets (max 6)
  const bullets = slide.bullets.slice(0, 6);
  if (bullets.length > 0) {
    s.addText(
      bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })),
      {
        x: 0.5, y: 1.2, w: 9, h: 3.5,
        fontSize: 16, fontFace: brand.fontBody,
        color: brand.textPrimary, lineSpacingMultiple: 1.5
      }
    );
  }

  return s;
}

function buildQuoteSlide(pptx, slide, brand) {
  const s = pptx.addSlide();
  s.background = { color: brand.background };
  s.addText(`"${slide.text}"`, {
    x: 1, y: 1.5, w: 8, h: 2.5,
    fontSize: 24, fontFace: brand.fontHeading,
    color: brand.primary, italic: true,
    align: 'center', valign: 'middle'
  });
  return s;
}

function buildClosingSlide(pptx, slide, brand) {
  const s = pptx.addSlide();
  s.background = { color: brand.background };
  s.addText('Thank you', {
    x: 0.5, y: 2, w: 9, h: 1.5,
    fontSize: 36, fontFace: brand.fontHeading,
    color: brand.primary, bold: true,
    align: 'center', valign: 'middle'
  });
  return s;
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const args = process.argv.slice(2);
  const contentIdx = args.indexOf('--content');
  const brandIdx = args.indexOf('--brand');
  const outputIdx = args.indexOf('--output');

  if (contentIdx === -1 || brandIdx === -1) {
    console.error('Usage: node generate-pptx.mjs --content <file> --brand <yaml> [--output <file>]');
    process.exit(1);
  }

  const contentPath = args[contentIdx + 1];
  const brandPath = args[brandIdx + 1];
  const outputPath = outputIdx !== -1 ? args[outputIdx + 1] : 'output.pptx';

  // Load
  const tokens = loadBrandTokens(brandPath);
  const slides = parseContent(contentPath);
  const brand = defineMasterSlides(null, tokens);

  // Build
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in

  const builders = {
    title: buildTitleSlide,
    section: buildSectionSlide,
    content: buildContentSlide,
    quote: buildQuoteSlide,
    closing: buildClosingSlide
  };

  for (const slide of slides) {
    const builder = builders[slide.type] || buildContentSlide;
    builder(pptx, slide, brand);
  }

  // Export
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await pptx.writeFile({ fileName: outputPath });

  console.log(`PPTX generated: ${outputPath}`);
  console.log(`Slides: ${slides.length}`);
  console.log(`Brand: ${tokens.colors.primary} primary, ${brand.fontHeading} font`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
