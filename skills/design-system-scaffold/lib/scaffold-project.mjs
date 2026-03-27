#!/usr/bin/env node
/**
 * scaffold-project.mjs
 *
 * Automates the full scaffold: Next.js + Tailwind + Shadcn + Storybook 8
 * Copies extracted assets and generates token configs.
 *
 * Usage:
 *   node scaffold-project.mjs --name <name> --design-system <path> --output <path>
 *
 * Example:
 *   node scaffold-project.mjs --name circle-br \
 *     --design-system /tmp/circle-clone/design-system \
 *     --output ~/CODE/design-systems/circle-br
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Parse args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
let name = null;
let designSystemPath = null;
let outputPath = null;
let skipNextjs = false;
let skipStorybook = false;
let dryRun = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--name' || arg === '-n') name = args[++i];
  else if (arg === '--design-system' || arg === '--ds') designSystemPath = args[++i];
  else if (arg === '--output' || arg === '-o') outputPath = args[++i];
  else if (arg === '--skip-nextjs') skipNextjs = true;
  else if (arg === '--skip-storybook') skipStorybook = true;
  else if (arg === '--dry-run') dryRun = true;
  else if (arg === '--help' || arg === '-h') {
    console.log(`
scaffold-project — Full project scaffold from extracted design system

Usage:
  node scaffold-project.mjs --name <name> --design-system <path> [--output <path>]

Options:
  --name, -n            Design system name (required)
  --design-system, --ds Path to extracted design-system/ folder (required)
  --output, -o          Output project path (default: ~/CODE/design-systems/{name})
  --skip-nextjs         Skip Next.js creation (if project already exists)
  --skip-storybook      Skip Storybook installation
  --dry-run             Show commands without executing
  --help, -h            Show this help
`);
    process.exit(0);
  }
}

if (!name) { console.error('Error: --name is required'); process.exit(1); }
if (!designSystemPath) { console.error('Error: --design-system is required'); process.exit(1); }

outputPath = outputPath || path.join(os.homedir(), 'CODE', 'design-systems', name);
designSystemPath = path.resolve(designSystemPath);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function run(cmd, opts = {}) {
  const label = cmd.length > 80 ? cmd.substring(0, 77) + '...' : cmd;
  if (dryRun) {
    console.log(`  [DRY RUN] ${label}`);
    return '';
  }
  try {
    return execSync(cmd, {
      stdio: opts.silent ? 'pipe' : 'inherit',
      cwd: opts.cwd || outputPath,
      timeout: opts.timeout || 120000,
      ...opts,
    });
  } catch (err) {
    if (!opts.ignoreError) {
      console.error(`  Error running: ${label}`);
      console.error(`  ${err.message}`);
      if (opts.critical) process.exit(1);
    }
    return null;
  }
}

function step(num, total, label) {
  console.log(`\n⏳ [${num}/${total}] ${label}`);
}

function done(label) {
  console.log(`✅ ${label}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return 0;
  ensureDir(dest);
  let count = 0;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      count += copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

// ---------------------------------------------------------------------------
// Validate inputs
// ---------------------------------------------------------------------------

console.log('\n🏗️  Design System Scaffold');
console.log(`   Name:    ${name}`);
console.log(`   Source:  ${designSystemPath}`);
console.log(`   Output:  ${outputPath}`);
console.log('');

// Check required files
const requiredFiles = ['tokens.yaml', 'extracted-css.json', 'components.json'];
for (const file of requiredFiles) {
  const filePath = path.join(designSystemPath, file);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: ${file} not found in ${designSystemPath}`);
    console.error('Run /design-system-forge first to extract the site.');
    process.exit(1);
  }
}

ensureDir(outputPath);
const totalSteps = 6 - (skipNextjs ? 1 : 0) - (skipStorybook ? 1 : 0);
let currentStep = 0;

// ---------------------------------------------------------------------------
// Step 1: Create Next.js project
// ---------------------------------------------------------------------------

if (!skipNextjs) {
  currentStep++;
  const hasPackageJson = fs.existsSync(path.join(outputPath, 'package.json'));

  if (hasPackageJson) {
    step(currentStep, totalSteps, 'Next.js project already exists, skipping creation');
    done('Using existing project');
  } else {
    step(currentStep, totalSteps, 'Creating Next.js project...');
    // Use --yes flag to skip prompts
    run(`npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --yes`, {
      critical: true,
      timeout: 180000,
    });
    done('Next.js project created');
  }

  // Install Shadcn
  step(currentStep, totalSteps, 'Configuring Shadcn/ui...');
  run('npx shadcn@latest init -d', { ignoreError: true, timeout: 60000 });
  done('Shadcn/ui configured');
}

// ---------------------------------------------------------------------------
// Step 2: Install Storybook
// ---------------------------------------------------------------------------

if (!skipStorybook) {
  currentStep++;
  const hasStorybook = fs.existsSync(path.join(outputPath, '.storybook'));

  if (hasStorybook) {
    step(currentStep, totalSteps, 'Storybook already configured, skipping');
    done('Using existing Storybook');
  } else {
    step(currentStep, totalSteps, 'Installing Storybook 8...');
    run('npx storybook@latest init --skip-install', { ignoreError: true, timeout: 120000 });
    run('npm install', { timeout: 120000 });
    done('Storybook 8 installed');
  }

  // Install extra addons
  run('npm install -D @storybook/addon-a11y @storybook/addon-viewport 2>/dev/null', {
    ignoreError: true,
    silent: true,
  });
}

// ---------------------------------------------------------------------------
// Step 3: Copy extracted assets
// ---------------------------------------------------------------------------

currentStep++;
step(currentStep, totalSteps, 'Copying extracted assets...');

const publicDir = path.join(outputPath, 'public');
ensureDir(publicDir);

// Copy design-system folder as reference
const dsDestDir = path.join(outputPath, 'design-system');
if (!fs.existsSync(dsDestDir)) {
  const dsCount = copyDir(designSystemPath, dsDestDir);
  console.log(`  Copied design-system/ (${dsCount} files)`);
}

// Copy assets to public/
const assetDirs = [
  { src: 'images', dest: 'images' },
  { src: 'svgs', dest: 'svgs' },
  { src: 'fonts', dest: 'fonts' },
  { src: 'screenshots', dest: 'screenshots' },
];

for (const { src, dest } of assetDirs) {
  const srcDir = path.join(designSystemPath, src);
  const destDir = path.join(publicDir, dest);
  if (fs.existsSync(srcDir)) {
    const count = copyDir(srcDir, destDir);
    console.log(`  ${src}/ → public/${dest}/ (${count} files)`);
  }
}

done('Assets copied');

// ---------------------------------------------------------------------------
// Step 4: Generate Tailwind config
// ---------------------------------------------------------------------------

currentStep++;
step(currentStep, totalSteps, 'Generating tailwind.config.ts from tokens...');

const tokensToTailwind = path.join(__dirname, 'tokens-to-tailwind.mjs');
run(`node ${tokensToTailwind} --input ${path.join(designSystemPath, 'tokens.yaml')} --css ${path.join(designSystemPath, 'extracted-css.json')} --output ${path.join(outputPath, 'tailwind.config.ts')}`);

done('tailwind.config.ts generated');

// ---------------------------------------------------------------------------
// Step 5: Generate CSS tokens
// ---------------------------------------------------------------------------

currentStep++;
step(currentStep, totalSteps, 'Generating CSS custom properties...');

const tokensToCss = path.join(__dirname, 'tokens-to-css.mjs');
const stylesDir = path.join(outputPath, 'src', 'styles');
ensureDir(stylesDir);
run(`node ${tokensToCss} --input ${path.join(designSystemPath, 'tokens.yaml')} --output ${path.join(stylesDir, 'tokens.css')}`);

// Import tokens.css in globals.css if not already there
const globalsPath = path.join(outputPath, 'src', 'app', 'globals.css');
if (fs.existsSync(globalsPath)) {
  const globals = fs.readFileSync(globalsPath, 'utf-8');
  if (!globals.includes('tokens.css')) {
    fs.writeFileSync(globalsPath, `@import '../styles/tokens.css';\n\n${globals}`);
    console.log('  Added tokens.css import to globals.css');
  }
}

done('tokens.css generated');

// ---------------------------------------------------------------------------
// Step 6: Create component structure
// ---------------------------------------------------------------------------

currentStep++;
step(currentStep, totalSteps, 'Creating component structure...');

const componentDirs = [
  'src/components/atoms/button',
  'src/components/atoms/badge',
  'src/components/atoms/input',
  'src/components/atoms/avatar',
  'src/components/atoms/icon',
  'src/components/molecules/card',
  'src/components/molecules/nav-item',
  'src/components/molecules/form-field',
  'src/components/organisms/hero',
  'src/components/organisms/header',
  'src/components/organisms/footer',
  'src/components/organisms/feature-section',
  'src/components/organisms/testimonials',
];

for (const dir of componentDirs) {
  ensureDir(path.join(outputPath, dir));
}

// Create barrel export
const indexContent = `// Design System Components — Auto-generated barrel export
// Populate as you build components in /design-system-storybook

// Atoms
// export { Button } from './atoms/button';
// export { Badge } from './atoms/badge';

// Molecules
// export { Card } from './molecules/card';

// Organisms
// export { Hero } from './organisms/hero';
// export { Header } from './organisms/header';
`;

fs.writeFileSync(path.join(outputPath, 'src', 'components', 'index.ts'), indexContent);

done('Component structure created');

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

console.log('\n' + '='.repeat(60));
console.log('🎨 Scaffold Complete!');
console.log('='.repeat(60));
console.log(`
📁 Project: ${outputPath}
   ├── design-system/          ← Dados extraídos (referência)
   ├── public/{images,svgs,fonts}/ ← Assets
   ├── src/
   │   ├── components/{atoms,molecules,organisms}/
   │   └── styles/tokens.css
   ├── tailwind.config.ts      ← Tokens aplicados
   └── .storybook/             ← Configurado

📋 Próximos passos:
   1. cd ${outputPath}
   2. npm run dev              ← Verificar que roda
   3. npm run storybook        ← Verificar Storybook
   4. /design-system-storybook ← Gerar componentes + stories
`);
