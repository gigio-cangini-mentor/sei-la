# Queue System Checklist

> Checklist de validacao para `capture-idea.md` (KOE_COL_001) e `process-queue.md` (KOE_COL_002)
> Source: Dan Koe — The Queue System / 2 Hour Writer
> Agent: koe-coletor

---

## 1. Queue Infrastructure

```yaml
queue_infrastructure:
  storage_setup:
    - [ ] Central queue repository exists (notes app, doc, or database)
    - [ ] Queue is accessible from mobile and desktop
    - [ ] Items timestamped automatically on capture
    - [ ] 7-day expiry rule configured and enforced
  tagging_system:
    - [ ] Tag taxonomy defined (domain, format, urgency)
    - [ ] Every item tagged within 24h of capture
    - [ ] Tags use consistent naming convention
    - [ ] Cross-domain tags enabled for synthesis potential
```

---

## 2. Capture Discipline

```yaml
capture_discipline:
  speed:
    - [ ] Capture-to-queue time under 30 seconds
    - [ ] No editing during capture (raw thought preserved)
    - [ ] Friction-free capture tool always available
  completeness:
    - [ ] Emotional state logged with each capture
    - [ ] Source/trigger context preserved (what prompted the idea)
    - [ ] Physical context noted (location, activity, time of day)
    - [ ] Related ideas cross-referenced if obvious
```

---

## 3. Queue Processing

```yaml
queue_processing:
  daily_review:
    - [ ] Queue reviewed at least once per day
    - [ ] Items older than 7 days either promoted or purged
    - [ ] Promoted items moved to permanent knowledge system
    - [ ] Purged items archived (not deleted) for pattern analysis
  prioritization:
    - [ ] Priority scoring applied (relevance x energy x timeliness)
    - [ ] High-priority items flagged for immediate synthesis
    - [ ] Low-priority items batched for weekly review
    - [ ] Priority recalculated when context changes
```

---

## 4. Queue Hygiene

```yaml
queue_hygiene:
  expiry_enforcement:
    - [ ] 7-day expiry rule strictly followed
    - [ ] No items older than 7 days without explicit promotion
    - [ ] Weekly purge session scheduled and executed
  volume_control:
    - [ ] Queue size monitored (target: 20-50 active items)
    - [ ] Overflow triggers immediate processing session
    - [ ] Empty queue triggers consumption session (Fill phase)
```

---

## 5. Integration with Fill/Empty/Use Cycle

```yaml
cycle_integration:
  fill_phase:
    - [ ] Queue feeds directly from curated consumption
    - [ ] Consumption sessions produce minimum 3 queue items
    - [ ] Active recovery insights routed to queue
  empty_phase:
    - [ ] Queue processing is the primary Empty activity
    - [ ] Processed items output to synthesis pipeline
  use_phase:
    - [ ] Promoted items traceable to content output
    - [ ] Queue-to-content pipeline documented
```

---

## Scoring

| Category | Items | Points Each | Max |
|----------|-------|-------------|-----|
| Critical — Queue Infrastructure & Expiry | 8 | 3 | 24 |
| Standard — Capture & Processing | 14 | 2 | 28 |
| Bonus — Hygiene & Cycle Integration | 8 | 1 | 8 |
| **TOTAL** | **30** | | **60** |

### Thresholds
- **PASS**: >= 48 points (80%)
- **CONDITIONAL**: >= 36 points (60%)
- **FAIL**: < 36 points

### If FAIL
1. Rebuild queue infrastructure from scratch — single tool, single location
2. Set phone timer for 7-day expiry reviews
3. Practice 10 rapid captures (under 30 seconds each) to build muscle memory
4. Re-run checklist after 3 days of disciplined queue operation

*Checklist: queue-system-checklist | Version: 1.0*
*Supports: capture-idea.md (KOE_COL_001), process-queue.md (KOE_COL_002)*
