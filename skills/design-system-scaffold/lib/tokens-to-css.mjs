#!/usr/bin/env node
/**
 * tokens-to-css.mjs
 *
 * Converts extracted tokens.yaml into CSS custom properties.
 *
 * Usage:
 *   node tokens-to-css.mjs --input tokens.yaml --output src/styles/tokens.css
 */

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
let inputPath = null;
let outputPath = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--input') inputPath = args[++i];
  else if (args[i] === '--output') outputPath = args[++i];
}

if (!inputPath) {
  console.error('Error: --input tokens.yaml is required');
  process.exit(1);
}

outputPath = outputPath || './tokens.css';

// Simple YAML parser (same as tokens-to-tailwind)
function parseSimpleYaml(content) {
  const result = { colors: {}, typography: {}, spacing: {}, shadows: {}, custom_properties: {} };
  let currentSection = null;
  let currentItem = null;

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (!line.startsWith(' ') && trimmed.endsWith(':') && !trimmed.includes('"')) {
      currentSection = trimmed.replace(':', '');
      currentItem = null;
      continue;
    }

    if (currentSection && line.startsWith('  ') && !line.startsWith('    ')) {
      const match = trimmed.match(/^"?([^"]+)"?:\s*(.*)$/);
      if (match) {
        currentItem = match[1];
        const value = match[2].replace(/^"/, '').replace(/"$/, '');
        if (value && currentSection === 'custom_properties') {
          result.custom_properties[currentItem] = value;
        } else if (!value) {
          if (!result[currentSection]) result[currentSection] = {};
          result[currentSection][currentItem] = {};
        }
      }
      continue;
    }

    if (currentSection && currentItem && line.startsWith('    ')) {
      const match = trimmed.match(/^([^:]+):\s*"?([^"]*)"?$/);
      if (match) {
        const [, key, val] = match;
        if (!result[currentSection]) result[currentSection] = {};
        if (!result[currentSection][currentItem]) result[currentSection][currentItem] = {};
        result[currentSection][currentItem][key.trim()] = val.trim();
      }
    }
  }
  return result;
}

const tokens = parseSimpleYaml(fs.readFileSync(inputPath, 'utf-8'));

const lines = [];
lines.push('/**');
lines.push(' * Design Tokens — CSS Custom Properties');
lines.push(` * Generated from: ${path.basename(inputPath)}`);
lines.push(` * Date: ${new Date().toISOString()}`);
lines.push(' */');
lines.push('');
lines.push(':root {');

// Colors
lines.push('  /* Colors */');
const colorNames = ['primary', 'secondary', 'accent', 'muted', 'background', 'foreground', 'surface', 'border'];
let ci = 0;
const seenColors = new Set();
for (const [key, data] of Object.entries(tokens.colors || {})) {
  const value = data.value || '';
  if (!value || seenColors.has(value)) continue;
  seenColors.add(value);
  const occurrences = parseInt(data.occurrences) || 0;
  if (occurrences < 2) continue;
  const name = ci < colorNames.length ? colorNames[ci] : `color-${ci}`;
  lines.push(`  --color-${name}: ${value};`);
  ci++;
  if (ci >= 20) break;
}

// Typography
lines.push('');
lines.push('  /* Typography */');
const seenFonts = new Set();
for (const [key, data] of Object.entries(tokens.typography || {})) {
  const family = data['font-family'] || '';
  if (family && !seenFonts.has(family)) {
    seenFonts.add(family);
    const name = family.split(',')[0].trim().replace(/['"]/g, '').toLowerCase().replace(/\s+/g, '-');
    lines.push(`  --font-${name}: ${family};`);
  }
}

// Font sizes (deduplicated)
const seenSizes = new Set();
let sizeIndex = 0;
const sizeNames = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
for (const [key, data] of Object.entries(tokens.typography || {})) {
  const size = data['font-size'] || '';
  if (size && !seenSizes.has(size)) {
    seenSizes.add(size);
    const name = sizeIndex < sizeNames.length ? sizeNames[sizeIndex] : `size-${sizeIndex}`;
    lines.push(`  --font-size-${name}: ${size};`);
    sizeIndex++;
  }
}

// Spacing
lines.push('');
lines.push('  /* Spacing */');
let si = 0;
for (const [key, data] of Object.entries(tokens.spacing || {})) {
  const value = data.value || '';
  if (!value) continue;
  lines.push(`  --spacing-${si}: ${value};`);
  si++;
  if (si >= 20) break;
}

// Shadows
lines.push('');
lines.push('  /* Shadows */');
let shi = 0;
for (const [key, data] of Object.entries(tokens.shadows || {})) {
  const value = data.value || '';
  if (!value) continue;
  lines.push(`  --shadow-${shi}: ${value};`);
  shi++;
}

// Original CSS custom properties (passthrough)
const customProps = Object.entries(tokens.custom_properties || {});
if (customProps.length > 0) {
  lines.push('');
  lines.push('  /* Original CSS Custom Properties */');
  for (const [prop, val] of customProps) {
    lines.push(`  ${prop}: ${val};`);
  }
}

lines.push('}');
lines.push('');

// Ensure output directory exists
const outDir = path.dirname(outputPath);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(outputPath, lines.join('\n'));
console.log(`✅ Generated: ${outputPath}`);
console.log(`   Colors:     ${ci} variables`);
console.log(`   Fonts:      ${seenFonts.size} families`);
console.log(`   Font sizes: ${seenSizes.size} values`);
console.log(`   Spacing:    ${si} values`);
console.log(`   Shadows:    ${shi} values`);
console.log(`   Custom:     ${customProps.length} properties`);
