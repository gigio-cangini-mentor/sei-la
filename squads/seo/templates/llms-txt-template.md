# llms.txt Template

Template based on the llms.txt specification (llmstxt.org).
Place the generated file at the root of the domain: `https://{{SITE_URL}}/llms.txt`

---

## Template

```
# {{SITE_NAME}}

> {{SITE_TAGLINE}}

{{SITE_DESCRIPTION_1_PARAGRAPH}}

## Key Pages

- [Home](https://{{SITE_URL}}/): {{HOME_DESCRIPTION}}
- [About](https://{{SITE_URL}}/about): {{ABOUT_DESCRIPTION}}
- [Blog](https://{{SITE_URL}}/blog): {{BLOG_DESCRIPTION}}
- [Products / Services](https://{{SITE_URL}}/products): {{PRODUCTS_DESCRIPTION}}
- [Contact](https://{{SITE_URL}}/contact): {{CONTACT_DESCRIPTION}}

## Topics Covered

{{TOPIC_1}}
{{TOPIC_2}}
{{TOPIC_3}}
{{TOPIC_4}}
{{TOPIC_5}}

## Contact & Social

- Email: {{CONTACT_EMAIL}}
- LinkedIn: {{LINKEDIN_URL}}
- Twitter/X: {{TWITTER_URL}}
- GitHub: {{GITHUB_URL}}

## Structured Data Hints

- Organization: {{ORG_NAME}}, founded {{FOUNDED_YEAR}}, headquartered in {{LOCATION}}
- Primary language: {{LANGUAGE}}
- Content license: {{LICENSE}}
- Update frequency: {{UPDATE_FREQUENCY}}

## Optional: llms-full.txt

For a full content dump (all pages, raw text), see:
https://{{SITE_URL}}/llms-full.txt
```

---

## Usage Notes

| Field | Description | Example |
|-------|-------------|---------|
| `SITE_NAME` | Brand or domain name | `Acme Corp` |
| `SITE_TAGLINE` | One-line value proposition | `B2B SaaS for logistics teams` |
| `SITE_DESCRIPTION` | 2–4 sentences. What the site does, who it serves. | — |
| `Key Pages` | Link only canonical, high-value pages. Skip tag pages, pagination, duplicates. | — |
| `Topics Covered` | Plain-language topic list, one per line, no special chars. | `E-commerce fulfillment` |
| `Structured Data Hints` | Extra entity facts to help LLMs build a knowledge graph node for the site. | — |

## Checklist Before Publishing

- [ ] File is UTF-8 encoded, no BOM
- [ ] File is accessible at `/llms.txt` without redirect
- [ ] `robots.txt` does NOT disallow `/llms.txt`
- [ ] All internal links are absolute URLs (not relative)
- [ ] Description is factual — no marketing fluff
- [ ] Topics list reflects actual content, not aspirational keywords
