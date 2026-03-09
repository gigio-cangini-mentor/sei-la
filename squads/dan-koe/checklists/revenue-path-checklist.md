# Revenue Path Checklist

> Checklist de validação para `pricing-architecture.md` (KOE_OFF_005)
> Source: Dan Koe — One-Person Business Revenue
> Agent: koe-offers

---

## 1. Pricing Tiers Logic

```yaml
pricing_tiers:
  structure:
    - [ ] Minimum 2 tiers, maximum 4 tiers defined
    - [ ] Each tier serves a distinct buyer persona and budget level
    - [ ] Tier names reflect value level, not arbitrary labels
    - [ ] Price gaps between tiers are psychologically logical (2-5x jumps)
  differentiation:
    - [ ] Each tier has clear "what's included" and "what's NOT included"
    - [ ] Higher tiers include everything from lower tiers plus additions
    - [ ] Feature differences justify the price difference (not padding)
    - [ ] Most popular tier is visually highlighted (anchor effect)
  pricing_psychology:
    - [ ] Lowest tier is not so cheap it devalues the brand
    - [ ] Highest tier exists to make middle tier feel reasonable (decoy effect)
    - [ ] Prices end in 7 or 9 (psychological pricing) or round numbers (premium signal)
    - [ ] Annual pricing offers genuine savings vs monthly (if applicable)
```

---

## 2. Lifetime Value Maximization

```yaml
ltv_maximization:
  retention_design:
    - [ ] Product naturally creates need for continued engagement
    - [ ] Community or ongoing content keeps buyers active
    - [ ] Milestones and progress tracking prevent disengagement
    - [ ] Exit barriers are value-based, not penalty-based
  expansion_revenue:
    - [ ] Upgrade path exists from every tier to a higher tier
    - [ ] Cross-sell opportunities identified (complementary products)
    - [ ] Referral incentives built in (word-of-mouth growth)
  metrics:
    - [ ] Target LTV defined per tier
    - [ ] Average retention period estimated per tier
    - [ ] LTV:CAC ratio >= 3:1 for primary tier
    - [ ] Revenue per customer per year calculated
```

---

## 3. Sovereignty Maintenance

```yaml
sovereignty:
  platform_independence:
    - [ ] Revenue not dependent on a single platform (diversified)
    - [ ] Email list owned (not just social followers)
    - [ ] Product hosted on owned or portable infrastructure
    - [ ] Payment processing uses standard tools (Stripe, etc.)
  creative_freedom:
    - [ ] Pricing model doesn't force content creator into content treadmill
    - [ ] Creator can take breaks without revenue going to zero
    - [ ] Product evolution follows creator's interests, not just market demands
  business_model_integrity:
    - [ ] No investor pressure or external stakeholder obligations
    - [ ] Profit margins >= 80% on digital products
    - [ ] Overhead costs minimal (no office, no large team)
    - [ ] Creator retains 100% of intellectual property
```

---

## 4. Scalability Without Hiring

```yaml
scalability:
  automation:
    - [ ] Sales process automated (landing page → checkout → delivery)
    - [ ] Onboarding automated (welcome email, access provision, getting started)
    - [ ] Support handled through knowledge base + community (not 1-on-1)
    - [ ] Content delivery automated (drip, membership area, or course platform)
  leverage_points:
    - [ ] One piece of content can sell indefinitely (evergreen)
    - [ ] Revenue grows with audience, not with hours worked
    - [ ] Systems handle 10x current volume without breaking
  constraints:
    - [ ] 1-on-1 time strictly limited and priced at premium
    - [ ] Group formats preferred over individual (1:many leverage)
    - [ ] AI/tools used to multiply output without adding headcount
    - [ ] Weekly time commitment defined and capped (e.g., 20h/week max)
```

---

## 5. Revenue Architecture Completeness

```yaml
completeness:
  financial_model:
    - [ ] Monthly recurring revenue (MRR) target defined
    - [ ] One-time revenue projections per launch/cycle
    - [ ] Seasonal patterns accounted for
    - [ ] Break-even point calculated
  risk_mitigation:
    - [ ] Revenue diversified across 2+ products/tiers
    - [ ] No single customer represents > 5% of revenue
    - [ ] Refund budget allocated (3-5% of revenue)
  growth_path:
    - [ ] Year 1 revenue target defined
    - [ ] Key milestones: first $1K, $10K, $100K months mapped
    - [ ] Growth levers identified (audience growth, conversion optimization, price increase)
```

---

## Scoring

| Category | Items | Points Each | Max |
|----------|-------|-------------|-----|
| Critical — Pricing Tiers Logic | 12 | 3 | 36 |
| Critical — LTV Maximization | 11 | 3 | 33 |
| Standard — Sovereignty Maintenance | 11 | 2 | 22 |
| Standard — Scalability Without Hiring | 11 | 2 | 22 |
| Bonus — Revenue Architecture Completeness | 8 | 1 | 8 |
| **TOTAL** | **53** | | **121** |

### Thresholds
- **PASS**: >= 97 points (80%)
- **CONDITIONAL**: >= 73 points (60%)
- **FAIL**: < 73 points

### If FAIL
1. Simplify pricing tiers — if more than 4, consolidate; if buyer is confused, you have too many options
2. Calculate LTV per tier with real or estimated data — if LTV:CAC < 3:1, raise prices or reduce acquisition cost
3. Audit for sovereignty — eliminate any dependency that could shut down your business overnight
4. Test scalability: "Could I serve 10x customers tomorrow?" — if no, automate the bottleneck first

*Checklist: revenue-path-checklist | Version: 1.0*
*Supports: pricing-architecture.md (KOE_OFF_005)*
