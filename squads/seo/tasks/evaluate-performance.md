# evaluate-performance

## Task: Evaluate Core Web Vitals & Page Performance

### Metadata
- **executor:** performance-engineer
- **elicit:** false (runs as part of Phase 1 parallel audit)
- **mode:** evaluation
- **output:** scores.performance (0-10) + performance-findings.json

### Purpose
Audit the site's page performance against Core Web Vitals thresholds (LCP, CLS, INP),
resource optimization status, and loading strategy. Produces a numeric score (0-10) plus
a detailed findings report with every issue flagged for later optimization.

### Prerequisites
- Target URL or project path available from workflow inputs
- Page list identified by crawl step (from evaluate-seo.md)

### Execution Steps

#### Step 1: Core Web Vitals Assessment
For each page, evaluate the three CWV metrics:

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5s – 4.0s | > 4.0s |
| INP (Interaction to Next Paint) | < 200ms | 200ms – 500ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1 – 0.25 | > 0.25 |

Methods (use whichever are available):
- Read Lighthouse/PageSpeed Insights JSON if present in project
- Inspect HTML source for obvious CLS triggers (images without width/height, dynamic injections)
- Inspect `<link rel="preload">` and `fetchpriority` usage for LCP optimization signals

#### Step 2: Image Optimization Audit
For every `<img>` tag found in HTML:
- [ ] Has `width` and `height` attributes → prevents CLS
- [ ] Uses modern format (WebP or AVIF) → reduces payload
- [ ] Below-fold images have `loading="lazy"` → improves LCP
- [ ] LCP candidate image has `fetchpriority="high"` → critical path
- [ ] File size reasonable (flag images > 200KB as oversized)

#### Step 3: Render-Blocking Resource Audit
Scan `<head>` for blocking patterns:
- Synchronous `<script src>` tags before `</body>` close
- `<link rel="stylesheet">` blocking render without critical CSS inlined
- Web font loading without `font-display: swap` in `@font-face`
- Missing `<link rel="preconnect">` for third-party origins

#### Step 4: Score Calculation
Assign points (0-10) based on findings:

| Check | Points |
|-------|--------|
| LCP < 2.5s (or no evidence of violation) | 2 |
| INP < 200ms (or no interactivity issues found) | 2 |
| CLS < 0.1 (all images have dimensions) | 2 |
| Images use modern format (WebP/AVIF) | 1 |
| Lazy loading on below-fold images | 1 |
| No render-blocking resources | 1 |
| Font loading optimized (font-display: swap) | 1 |

### Output Format
```json
{
  "category": "performance",
  "score": 7,
  "max": 10,
  "grade": "B",
  "cwv": {
    "lcp": { "value": "2.8s", "status": "WARN", "threshold": "< 2.5s" },
    "inp": { "value": "180ms", "status": "PASS", "threshold": "< 200ms" },
    "cls": { "value": "0.05", "status": "PASS", "threshold": "< 0.1" }
  },
  "checks": [
    { "id": "lcp_threshold", "status": "WARN", "detail": "LCP 2.8s — above 2.5s threshold" },
    { "id": "images_dimensions", "status": "FAIL", "detail": "3 images missing width/height: /img/hero.jpg, /img/team.jpg, /img/logo.png" },
    { "id": "lazy_loading", "status": "PASS", "detail": "All below-fold images have loading=lazy" }
  ],
  "fixable_items": [
    "Add width/height to 3 images",
    "Add fetchpriority=high to hero image (LCP candidate)",
    "Add font-display: swap to /css/fonts.css"
  ]
}
```

### Veto Conditions
- Do NOT assign full marks (10/10) without evidence of all 7 checks passing
- Do NOT fail LCP/INP/CLS if no measurement data exists — mark as UNKNOWN and deduct 1pt per unknown metric
- Do NOT inspect binary image files directly — assess only HTML attributes and declarations
- Do NOT penalize for render-blocking resources that are already deferred or async

### Completion Criteria
- All 7 scoring checks evaluated with PASS/WARN/FAIL/UNKNOWN status
- CWV metrics assessed with values or UNKNOWN if unmeasurable from source
- List of fixable items generated for optimize-performance.md
- Score returned as integer 0-10 to workflow aggregator
