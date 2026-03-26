# Core Web Vitals Benchmarks by Site Type

**Source:** Google CrUX (Chrome User Experience Report) field data, 2025
**Scope:** 75th percentile thresholds per site category

---

## Metrics Reference

| Metric | Full Name | What It Measures |
|--------|-----------|-----------------|
| **LCP** | Largest Contentful Paint | Load performance — when the largest visible element renders |
| **CLS** | Cumulative Layout Shift | Visual stability — unexpected layout shifts during load |
| **INP** | Interaction to Next Paint | Responsiveness — delay between user input and visual feedback |

---

## Universal Thresholds (Google Standard)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤ 2.5s | 2.5s – 4.0s | > 4.0s |
| CLS | ≤ 0.1 | 0.1 – 0.25 | > 0.25 |
| INP | ≤ 200ms | 200ms – 500ms | > 500ms |

> **Pass/Fail rule:** A page "passes" CWV only when ALL three metrics are in the "Good" range.

---

## Benchmarks by Site Type

### E-Commerce

Typical profile: image-heavy product pages, third-party scripts (payment, analytics, chat), dynamic cart.

| Metric | Top 10% (Elite) | Median | Bottom 25% |
|--------|----------------|--------|------------|
| LCP | < 1.8s | 2.9s | > 4.5s |
| CLS | < 0.05 | 0.12 | > 0.30 |
| INP | < 150ms | 280ms | > 600ms |

**Common culprits:** unoptimized product images (missing `width`/`height`), third-party tag managers, late-loaded font files, carousel/slider widgets causing layout shifts.

---

### Blog / Content Site

Typical profile: text-heavy, ads, social embeds, comment systems.

| Metric | Top 10% (Elite) | Median | Bottom 25% |
|--------|----------------|--------|------------|
| LCP | < 1.5s | 2.4s | > 3.8s |
| CLS | < 0.03 | 0.09 | > 0.22 |
| INP | < 120ms | 210ms | > 450ms |

**Common culprits:** render-blocking fonts, ad network scripts injecting DOM elements after load, lazy-loaded hero images without `fetchpriority="high"`.

---

### Landing Page

Typical profile: single-purpose, conversion-focused, often minimal JS, but heavy on hero visuals and video.

| Metric | Top 10% (Elite) | Median | Bottom 25% |
|--------|----------------|--------|------------|
| LCP | < 1.2s | 2.0s | > 3.2s |
| CLS | < 0.02 | 0.07 | > 0.18 |
| INP | < 100ms | 180ms | > 400ms |

**Common culprits:** autoplay background video (triggers LCP delay), web fonts without `font-display: swap`, unoptimized hero image (missing `preload` link tag).

---

### SaaS Dashboard / App

Typical profile: authenticated, JS-heavy SPA, lots of async data fetching, complex UI components.

| Metric | Top 10% (Elite) | Median | Bottom 25% |
|--------|----------------|--------|------------|
| LCP | < 2.0s | 3.5s | > 5.5s |
| CLS | < 0.05 | 0.14 | > 0.32 |
| INP | < 180ms | 320ms | > 700ms |

**Common culprits:** large JS bundles (missing code splitting), skeleton screens that shift on hydration, unthrottled re-renders on user input, Cumulative Layout Shift from dynamic content injection.

---

## Measurement Tools

| Tool | Data Type | Use Case |
|------|-----------|----------|
| Google Search Console (CWV report) | Field (real users) | Monitor production trends |
| PageSpeed Insights | Field + Lab | Diagnose specific URLs |
| Chrome DevTools (Performance tab) | Lab | Deep-dive debugging |
| WebPageTest | Lab | Filmstrip, waterfall analysis |
| Lighthouse CI | Lab | Automated CI/CD gates |
| CrUX API | Field | Bulk URL analysis |

---

## Scoring Weights in Google's CWV

Each metric contributes equally to the CWV badge (pass/fail — not a weighted score).
For **Lighthouse Performance Score**, weights are:
- LCP: 25%
- CLS: 15%
- INP: 30% (replaced FID in 2024)
- FCP: 10%
- TBT (Total Blocking Time, proxy for INP in lab): 30%
