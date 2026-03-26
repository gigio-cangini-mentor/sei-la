# optimize-performance

## Task: Implement Page Performance Optimizations

### Metadata
- **executor:** performance-engineer
- **depends_on:** evaluate-performance (requires prior findings)
- **elicit:** false (uses audit findings)
- **mode:** direct-edit + recommendation
- **output:** performance changes recorded in changes-manifest.json

### Purpose
Apply all auto-fixable performance improvements identified in the audit phase. Direct edits
are made for HTML attribute fixes (image dimensions, lazy loading, fetchpriority, font-display).
Resource-heavy optimizations (image compression, code splitting, critical CSS extraction) are
output as recommendations since they require build-tool or CDN configuration.

### Prerequisites
- `evaluate-performance.md` must have been run first
- `performance-findings.json` available with list of fixable items
- Project source files accessible for editing

### Execution Steps

#### Step 1: Fix Image Attributes (Direct Edit)
For each image flagged in findings:

**Add missing width/height attributes** — prevents CLS:
```html
<!-- BEFORE -->
<img src="/img/hero.jpg" alt="Hero image">

<!-- AFTER -->
<img src="/img/hero.jpg" alt="Hero image" width="1200" height="630">
```
- Detect dimensions by reading file metadata if accessible, or infer from CSS context
- If dimensions cannot be determined, use `aspect-ratio` CSS instead and note in manifest

**Add lazy loading to below-fold images:**
```html
<!-- BEFORE -->
<img src="/img/team.jpg" alt="Our team">

<!-- AFTER -->
<img src="/img/team.jpg" alt="Our team" loading="lazy" width="800" height="400">
```
- Rule: first image in `<main>` content is LCP candidate — do NOT add lazy to it
- All other `<img>` below the first viewport screenful → add `loading="lazy"`

**Mark LCP candidate with fetchpriority:**
```html
<!-- BEFORE -->
<img src="/img/hero.jpg" alt="Hero" width="1200" height="630">

<!-- AFTER -->
<img src="/img/hero.jpg" alt="Hero" width="1200" height="630" fetchpriority="high">
```

#### Step 2: Fix Font Loading (Direct Edit)
Find all `@font-face` declarations in CSS files:
```css
/* BEFORE */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
}

/* AFTER */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
}
```

#### Step 3: Add Preconnect for Third-Party Origins (Direct Edit)
Scan for third-party resources (Google Fonts, CDNs, analytics) and add to `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

#### Step 4: Generate Image Optimization Recommendations
For images without modern format (WebP/AVIF), output actionable recommendations:
```markdown
## Recomendações de Otimização de Imagens

### Imagens para converter para WebP
- /img/hero.jpg (480 KB) → estimativa após conversão: ~120 KB (75% menor)
- /img/team.jpg (320 KB) → estimativa após conversão: ~80 KB (75% menor)

### Ferramenta sugerida
- CLI: `cwebp -q 80 hero.jpg -o hero.webp`
- Build: configurar Next.js Image component ou webpack image-webpack-loader
```

#### Step 5: Flag Render-Blocking Resources
For each blocking script/stylesheet found, output a recommendation (do NOT auto-fix, as
this may break functionality):
```markdown
## Recursos bloqueantes de renderização

- <script src="/js/analytics.js"> na linha 12 de index.html
  Recomendação: adicionar defer ou async
  Impacto estimado: redução de ~300ms no LCP

- <link rel="stylesheet" href="/css/non-critical.css"> na linha 8
  Recomendação: identificar CSS crítico, inlinear no <head>, carregar restante de forma assíncrona
```

### Veto Conditions
- Do NOT add `loading="lazy"` to the LCP candidate image (first above-fold image)
- Do NOT remove or alter existing `fetchpriority` attributes that are already correctly set
- Do NOT auto-modify JavaScript files (async/defer changes) — flag as recommendations only
- Do NOT generate WebP files directly — recommend conversion tools and estimated savings only

### Completion Criteria
- All images with missing `width`/`height` attributes have been fixed
- All below-fold images (except LCP candidate) have `loading="lazy"` added
- LCP candidate has `fetchpriority="high"` added
- All `@font-face` blocks have `font-display: swap` added
- Preconnect hints added for detected third-party origins
- Image conversion and render-blocking recommendations documented
- All changes recorded in changes-manifest.json with before/after values
