# Schema.org Types — Quick Reference

**Source:** Schema.org vocabulary + Google Search Central documentation, 2025
**Purpose:** Quick-reference for SEO Squad agents when recommending or validating structured data.

---

## Impact Overview

| Schema Type | SERP Feature Unlocked | Priority |
|-------------|----------------------|----------|
| Organization / LocalBusiness | Knowledge Panel, brand sitelinks | 🔴 High |
| Article / NewsArticle | Top Stories carousel, article date in snippet | 🔴 High |
| FAQPage | FAQ rich result (accordion below listing) | 🔴 High |
| HowTo | Step-by-step rich result with images | 🟡 Medium |
| Product + Review | Price, rating, availability in snippet | 🔴 High |
| BreadcrumbList | Breadcrumb path in URL line | 🟡 Medium |
| WebSite | Sitelinks search box | 🟡 Medium |
| Person | Knowledge Panel for personal brands | 🟡 Medium |

---

## Detailed Reference

### 1. Organization

**When to use:** Every site that represents a company, nonprofit, or brand. Place on the homepage.

**Required properties:**
```json
{
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png"
}
```

**Recommended additions:** `sameAs` (social profiles), `contactPoint`, `foundingDate`, `address`

**SERP impact:** Enables Knowledge Panel, brand recognition in image search, sitelinks eligibility.

---

### 2. LocalBusiness

**When to use:** Physical locations — restaurants, clinics, stores, agencies with a service area. Extends Organization.

**Required properties:**
```json
{
  "@type": "LocalBusiness",
  "name": "Business Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "00000",
    "addressCountry": "US"
  },
  "telephone": "+1-800-000-0000",
  "openingHours": "Mo-Fr 09:00-18:00"
}
```

**SERP impact:** Local pack eligibility, rich snippet with address/hours/phone, Google Maps integration.

---

### 3. Article / NewsArticle / BlogPosting

**When to use:** Blog posts, news articles, editorial content. Use `BlogPosting` for informal blogs, `NewsArticle` for journalism.

**Required properties:**
```json
{
  "@type": "Article",
  "headline": "Article Title (max 110 chars)",
  "author": { "@type": "Person", "name": "Author Name" },
  "datePublished": "2025-01-15",
  "dateModified": "2025-03-10",
  "image": "https://example.com/article-image.jpg"
}
```

**SERP impact:** Article date shown in snippet, Top Stories carousel eligibility, Discover feed.

---

### 4. FAQPage

**When to use:** Pages with a section of frequently asked questions answered inline. One schema per page.

**Required properties:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text (can include basic HTML)."
      }
    }
  ]
}
```

**Limits:** Google typically shows 2–3 FAQ results per domain at once. Use for genuinely informational Q&A, not marketing copy.

**SERP impact:** Accordion items below main listing — doubles SERP real estate. High CTR lift.

---

### 5. HowTo

**When to use:** Step-by-step instructional content (tutorials, recipes, DIY guides). Requires numbered steps.

**Required properties:**
```json
{
  "@type": "HowTo",
  "name": "How to Do X",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Step 1 Name",
      "text": "Detailed description of the step.",
      "image": "https://example.com/step1.jpg"
    }
  ]
}
```

**Optional:** `totalTime` (ISO 8601 duration), `estimatedCost`, `supply`, `tool`

**SERP impact:** Rich result with step list and images in desktop search. Strong for instructional queries.

---

### 6. Product

**When to use:** Any page selling or describing a specific product. Combine with `AggregateRating` and `Offer`.

**Required properties:**
```json
{
  "@type": "Product",
  "name": "Product Name",
  "image": "https://example.com/product.jpg",
  "description": "Product description.",
  "offers": {
    "@type": "Offer",
    "price": "49.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/product"
  }
}
```

**SERP impact:** Price, availability, and rating stars shown directly in the snippet. Essential for e-commerce.

---

### 7. Review / AggregateRating

**When to use:** Always nest inside `Product`, `LocalBusiness`, `Course`, or `Recipe`. Do not use standalone.

**Required properties:**
```json
{
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "238",
    "bestRating": "5"
  }
}
```

**Rules:** Only use if reviews are genuinely from users and visible on the page. Google penalizes self-generated ratings.

**SERP impact:** Gold star rating in snippet. Significant CTR improvement — avg. +15–30%.

---

### 8. BreadcrumbList

**When to use:** Any site with hierarchical navigation (virtually all multi-page sites). Place on every non-homepage URL.

**Required properties:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2, "name": "Category", "item": "https://example.com/category/" },
    { "@type": "ListItem", "position": 3, "name": "Page Title" }
  ]
}
```

**SERP impact:** URL line shows breadcrumb path instead of raw URL. Improves UX and signals site structure to Google.

---

### 9. WebSite

**When to use:** Homepage only. One instance per domain. Enables Sitelinks Search Box.

**Required properties:**
```json
{
  "@type": "WebSite",
  "name": "Site Name",
  "url": "https://example.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://example.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**SERP impact:** Sitelinks search box appears for branded queries. Only eligible for well-established sites Google already recognizes.

---

### 10. Person

**When to use:** Author pages, personal brand sites, professional profiles. Helps establish E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

**Required properties:**
```json
{
  "@type": "Person",
  "name": "Full Name",
  "url": "https://example.com/about",
  "sameAs": [
    "https://linkedin.com/in/username",
    "https://twitter.com/username"
  ],
  "jobTitle": "Role or Profession",
  "knowsAbout": ["Topic 1", "Topic 2"]
}
```

**SERP impact:** Knowledge Panel for well-known individuals, author rich results, E-E-A-T signal for YMYL content.

---

## Implementation Notes

- **Format:** JSON-LD preferred (inject via `<script type="application/ld+json">` in `<head>`)
- **Validation:** Always test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- **Nesting:** Combine schemas where logical — e.g., `Product` + `AggregateRating` + `Offer`
- **Avoid:** Marking up content not visible on the page (Google penalty risk)
- **Priority rule:** If time is limited, implement in this order: Organization → BreadcrumbList → FAQPage → Product/Article
