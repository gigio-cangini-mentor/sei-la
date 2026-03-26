# recommend-content-quality

## Task: Generate E-E-A-T & Topical Authority Recommendations

### Metadata
- **executor:** content-quality-assessor
- **depends_on:** evaluate-content-quality (requires prior audit scores)
- **elicit:** false (uses audit findings)
- **mode:** recommendation-only (no direct file edits)
- **output:** content-quality-recommendations.md

### Purpose
Translate E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) and topical
authority audit findings into a prioritized, actionable improvement plan. This task does
NOT rewrite content — it produces a structured recommendation report that humans or other
agents can act on.

### Prerequisites
- `evaluate-content-quality.md` must have been run first
- Audit findings with PASS/WARN/FAIL per check available
- Page list with content depth scores available

### Execution Steps

#### Step 1: Classify Issues by E-E-A-T Pillar
Group all WARN/FAIL findings into four buckets:
- **Experience:** missing author bylines, no case studies, no first-hand examples
- **Expertise:** thin content, no credentials, no expert citations, missing methodology
- **Authoritativeness:** no About page, missing backlink-worthy assets, no editorial policy
- **Trustworthiness:** missing Privacy Policy, Terms of Service, Contact page, no HTTPS signals

#### Step 2: Score Topical Depth Per Page
For each page, compare word count and subtopic coverage against top-10 SERP results:
- Flag pages with content length < 70% of competitors' average
- Identify missing subtopics (inferred from competitor H2/H3 coverage)
- Mark YMYL (Your Money or Your Life) pages requiring elevated trust signals

#### Step 3: Build Recommendation Report
Produce a ranked list of recommendations (highest trust/ranking impact first):

- **Critical (do first):** Missing trust pages (Privacy, Contact, About with credentials)
- **High:** Missing author bios with schema linkage, no editorial standards page
- **Medium:** Content depth gaps, missing citations to authoritative sources
- **Low:** Update dates not visible, no original data or proprietary research signals

#### Step 4: Generate TODO List
Output a machine-readable TODO block per page with specific actions:
```
PAGE: /blog/example-post
  [ ] Add author byline with name, photo, credentials
  [ ] Link author name to author page (/author/name)
  [ ] Add "Last updated: YYYY-MM-DD" near headline
  [ ] Add 2+ citations to authoritative external sources
  [ ] Expand "How it works" section (currently 120 words vs ~380 avg competitor)
```

### Output Format
```markdown
# Content Quality Recommendations
**Target:** {url}
**Date:** {date}
**E-E-A-T Score (before):** {score}/15

## Critical Issues
{list with specific pages and actions}

## Trust Page Checklist
- [ ] About page with team credentials — {status}
- [ ] Contact page with real address/phone — {status}
- [ ] Privacy Policy — {status}
- [ ] Terms of Service — {status}

## Author & Byline Improvements
{per-page author recommendations}

## Content Depth Gaps
| Page | Current Words | Competitor Avg | Gap | Priority |
|------|---------------|----------------|-----|----------|
| /page | {n} | {n} | -{n} | {high/med/low} |

## YMYL Flags
{pages requiring elevated trust signals}

## Estimated Score Recovery
{points recoverable if all recommendations applied}
```

### Veto Conditions
- Do NOT rewrite or edit any content file directly — recommendations only
- Do NOT suggest keyword stuffing or artificial link schemes
- Do NOT flag pages as YMYL without evidence of health/finance/legal topic signals
- Do NOT estimate score recovery higher than the category maximum (15 pts)

### Completion Criteria
- All WARN/FAIL findings from audit converted into concrete, actionable recommendations
- Each recommendation tied to a specific page and E-E-A-T pillar
- Trust page checklist generated with current status per item
- TODO block generated per page with issues
- Estimated score recovery calculated
