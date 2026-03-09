# Leverage Ratio Checklist

> Checklist de validação para `leverage-ratio-audit.md` (KOE_DIS_003)
> Source: Dan Koe — 1h Creation = 10h Distribution
> Agent: koe-distribuidor

---

## 1. Creation-to-Distribution Ratio

```yaml
creation_ratio:
  time_investment:
    - [ ] Original content creation took <= 1 hour (or documented time)
    - [ ] Distribution outputs total >= 10x creation time in equivalent value
    - [ ] Ratio documented: {creation_hours}h → {distribution_hours}h equivalent
  output_count:
    - [ ] Minimum 7 derivative pieces from single source content
    - [ ] Each derivative targets a different platform or format
    - [ ] No derivative is a simple copy-paste (each adds platform value)
  pipeline_efficiency:
    - [ ] Template/system used for repurposing (not ad hoc each time)
    - [ ] Repurposing workflow documented and repeatable
    - [ ] Time from source to full distribution <= 48 hours
```

---

## 2. ROI Per Platform

```yaml
platform_roi:
  reach_metrics:
    - [ ] Each platform's expected reach documented
    - [ ] Impressions-per-hour-invested calculated per platform
    - [ ] Low-ROI platforms identified and either optimized or dropped
  engagement_metrics:
    - [ ] Engagement rate tracked per platform (likes, comments, shares, saves)
    - [ ] Engagement-per-effort ratio calculated
    - [ ] Top 3 platforms by ROI identified
  conversion_metrics:
    - [ ] Click-through to funnel tracked per platform
    - [ ] Lead generation attributed per platform
    - [ ] Revenue attribution per platform documented (even if estimated)
```

---

## 3. Repurposing Completeness

```yaml
repurposing_completeness:
  format_coverage:
    - [ ] Long-form → short-form text (tweets, LinkedIn posts)
    - [ ] Long-form → visual (carousels, infographics)
    - [ ] Long-form → audio (podcast clip, audiogram)
    - [ ] Long-form → video (clips, Shorts, Reels)
    - [ ] Long-form → newsletter segment
  depth_layers:
    - [ ] Surface layer: hooks and quotable lines extracted
    - [ ] Framework layer: models and systems visualized
    - [ ] Story layer: personal narratives isolated for standalone use
    - [ ] Teaching layer: tactical steps reformatted as how-to
```

---

## 4. Leverage Multiplier Quality

```yaml
leverage_quality:
  value_preservation:
    - [ ] Core insight preserved in every derivative (not diluted)
    - [ ] Each piece could stand alone for someone who never sees the original
    - [ ] No derivative feels like "leftover content"
  amplification_potential:
    - [ ] At least 2 derivatives have viral/share potential
    - [ ] Evergreen derivatives identified for re-use in future cycles
    - [ ] Derivatives cross-reference each other (web effect)
  one_person_business_alignment:
    - [ ] All repurposing can be done by one person (or one person + AI)
    - [ ] No step requires hiring or outsourcing to execute
    - [ ] System scales with content volume, not headcount
```

---

## 5. Audit Trail

```yaml
audit_trail:
  documentation:
    - [ ] Source content piece identified with URL/file reference
    - [ ] All derivatives listed with platform + format + status
    - [ ] Publication dates/times logged per derivative
  performance_tracking:
    - [ ] Baseline metrics captured within 48h of publish
    - [ ] 7-day performance review scheduled
    - [ ] Learnings documented for next cycle optimization
```

---

## Scoring

| Category | Items | Points Each | Max |
|----------|-------|-------------|-----|
| Critical — Creation-to-Distribution Ratio | 8 | 3 | 24 |
| Critical — Repurposing Completeness | 9 | 3 | 27 |
| Standard — ROI Per Platform | 9 | 2 | 18 |
| Standard — Leverage Multiplier Quality | 9 | 2 | 18 |
| Bonus — Audit Trail | 5 | 1 | 5 |
| **TOTAL** | **40** | | **92** |

### Thresholds
- **PASS**: >= 74 points (80%)
- **CONDITIONAL**: >= 56 points (60%)
- **FAIL**: < 56 points

### If FAIL
1. Recalculate creation-to-distribution ratio — if below 1:7, add more derivative formats
2. Audit repurposing for missing format types — fill gaps in text/visual/audio/video coverage
3. Drop lowest-ROI platform and redistribute effort to top performers
4. Ensure every derivative passes the "standalone value" test before resubmitting

*Checklist: leverage-ratio-checklist | Version: 1.0*
*Supports: leverage-ratio-audit.md (KOE_DIS_003)*
