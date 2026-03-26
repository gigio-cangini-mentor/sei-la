/**
 * Video Generator — Brand-consistent video composition via Remotion
 *
 * This is the orchestration script that:
 * 1. Parses content into scenes
 * 2. Loads brand tokens
 * 3. Generates Remotion composition config
 * 4. Triggers render via @remotion/cli
 *
 * Usage:
 *   node compose-video.mjs --content script.md --brand brand.yaml --format reel --output output.mp4
 *
 * Prerequisites:
 *   npm install @remotion/cli @remotion/bundler react react-dom typescript
 *   (or delegate to ai-reels squad which already has Remotion installed)
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import matter from 'gray-matter';

// =============================================================================
// CONSTANTS
// =============================================================================

const FORMATS = {
  reel: { width: 1080, height: 1920, fps: 30, maxDuration: 90 },
  story: { width: 1080, height: 1920, fps: 30, maxDuration: 15 },
  landscape: { width: 1920, height: 1080, fps: 30, maxDuration: 300 },
  square: { width: 1080, height: 1080, fps: 30, maxDuration: 60 },
  carousel: { width: 1080, height: 1350, fps: 30, maxDuration: 60 },
  gif: { width: 800, height: 800, fps: 15, maxDuration: 10 }
};

const SAFE_ZONES = {
  reel: { top: 90, bottom: 90, left: 40, right: 40 },
  story: { top: 120, bottom: 200, left: 40, right: 40 },
  landscape: { top: 60, bottom: 60, left: 60, right: 60 },
  square: { top: 60, bottom: 60, left: 60, right: 60 },
  carousel: { top: 60, bottom: 60, left: 60, right: 60 },
  gif: { top: 0, bottom: 0, left: 0, right: 0 }
};

const MOTION_PRESETS = {
  minimal: { damping: 20, stiffness: 100, enter: 'fadeIn', exit: 'fadeOut' },
  bold: { damping: 12, stiffness: 200, enter: 'scaleUp', exit: 'slideOut' },
  corporate: { damping: 25, stiffness: 80, enter: 'fadeIn', exit: 'fadeOut' },
  playful: { damping: 8, stiffness: 300, enter: 'bounceIn', exit: 'bounceOut' }
};

// =============================================================================
// BRAND TOKEN LOADER
// =============================================================================

function loadBrandTokens(brandPath) {
  const raw = fs.readFileSync(brandPath, 'utf-8');
  const { data } = matter(raw);
  return data.tokens;
}

function deriveMotionStyle(tokens) {
  // Heuristic: derive brand personality from color analysis
  const primary = tokens.colors.primary.toLowerCase();
  const bg = tokens.colors.background.toLowerCase();

  // Dark primary + light bg = minimal/corporate
  if (primary.startsWith('#0') || primary.startsWith('#1') || primary.startsWith('#2')) {
    return bg === '#ffffff' || bg === '#fff' ? 'minimal' : 'corporate';
  }
  // Bright/saturated primary = bold
  if (primary.startsWith('#e') || primary.startsWith('#f') || primary.startsWith('#d')) {
    return 'bold';
  }
  // Default
  return 'minimal';
}

// =============================================================================
// CONTENT PARSER
// =============================================================================

function parseScenes(contentPath, format) {
  const raw = fs.readFileSync(contentPath, 'utf-8');
  const lines = raw.split('\n').filter((l) => l.trim());
  const scenes = [];
  const maxDuration = FORMATS[format].maxDuration;

  // Intro scene (always)
  scenes.push({
    type: 'intro',
    duration: 3,
    text: '',
    description: 'Logo animation + brand gradient'
  });

  // Parse content into body scenes
  for (const line of lines) {
    if (line.startsWith('# ')) {
      scenes.push({
        type: 'hook',
        duration: 3,
        text: line.replace('# ', ''),
        description: 'Key message, large text'
      });
    } else if (line.startsWith('## ') || line.startsWith('- ')) {
      scenes.push({
        type: 'body',
        duration: 4,
        text: line.replace(/^[#-]+ /, ''),
        description: 'Content with transition'
      });
    }
  }

  // CTA scene (always)
  scenes.push({
    type: 'cta',
    duration: 4,
    text: 'Follow for more',
    description: 'Call to action + logo + accent'
  });

  // Trim to max duration
  let totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);
  while (totalDuration > maxDuration && scenes.length > 3) {
    // Remove body scenes from the end
    const lastBodyIdx = scenes.findLastIndex((s) => s.type === 'body');
    if (lastBodyIdx === -1) break;
    totalDuration -= scenes[lastBodyIdx].duration;
    scenes.splice(lastBodyIdx, 1);
  }

  return scenes;
}

// =============================================================================
// COMPOSITION CONFIG GENERATOR
// =============================================================================

function generateCompositionConfig(scenes, tokens, format, motionStyle) {
  const fmt = FORMATS[format];
  const safeZones = SAFE_ZONES[format];
  const motion = MOTION_PRESETS[motionStyle];
  const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);

  return {
    width: fmt.width,
    height: fmt.height,
    fps: fmt.fps,
    durationInFrames: totalDuration * fmt.fps,
    totalDurationSeconds: totalDuration,
    safeZones,
    motion,
    brand: {
      colors: tokens.colors,
      typography: tokens.typography
    },
    scenes: scenes.map((scene, idx) => {
      const startFrame = scenes.slice(0, idx).reduce((sum, s) => sum + s.duration * fmt.fps, 0);
      return {
        ...scene,
        startFrame,
        endFrame: startFrame + scene.duration * fmt.fps,
        durationFrames: scene.duration * fmt.fps
      };
    })
  };
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const args = process.argv.slice(2);
  const contentIdx = args.indexOf('--content');
  const brandIdx = args.indexOf('--brand');
  const formatIdx = args.indexOf('--format');
  const outputIdx = args.indexOf('--output');

  if (contentIdx === -1 || brandIdx === -1) {
    console.error('Usage: node compose-video.mjs --content <file> --brand <yaml> --format <format> [--output <file>]');
    console.error('Formats: reel, story, landscape, square, carousel, gif');
    process.exit(1);
  }

  const contentPath = args[contentIdx + 1];
  const brandPath = args[brandIdx + 1];
  const format = formatIdx !== -1 ? args[formatIdx + 1] : 'reel';
  const outputPath = outputIdx !== -1 ? args[outputIdx + 1] : `output/video-${format}.mp4`;

  if (!FORMATS[format]) {
    console.error(`Unknown format: ${format}. Available: ${Object.keys(FORMATS).join(', ')}`);
    process.exit(1);
  }

  // Load brand
  const tokens = loadBrandTokens(brandPath);
  const motionStyle = deriveMotionStyle(tokens);

  // Parse scenes
  const scenes = parseScenes(contentPath, format);

  // Generate composition config
  const config = generateCompositionConfig(scenes, tokens, format, motionStyle);

  // Write composition config for Remotion
  const configPath = path.join(path.dirname(outputPath), 'composition-config.json');
  const configDir = path.dirname(configPath);
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  // Report
  console.log(`Video composition ready:`);
  console.log(`  Format: ${format} (${config.width}x${config.height}, ${config.fps}fps)`);
  console.log(`  Duration: ${config.totalDurationSeconds}s (${config.durationInFrames} frames)`);
  console.log(`  Scenes: ${scenes.length}`);
  console.log(`  Motion style: ${motionStyle}`);
  console.log(`  Brand: ${tokens.colors.primary} primary`);
  console.log(`  Config: ${configPath}`);
  console.log('');
  console.log('Scene timeline:');
  for (const scene of config.scenes) {
    const startSec = (scene.startFrame / config.fps).toFixed(1);
    const endSec = (scene.endFrame / config.fps).toFixed(1);
    console.log(`  [${startSec}s-${endSec}s] ${scene.type}: "${scene.text || scene.description}"`);
  }
  console.log('');
  console.log(`To render: npx remotion render src/index.tsx Video --props=${configPath} --output=${outputPath}`);
  console.log('Or delegate to ai-reels squad for full pipeline (voice, avatar, captions).');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
