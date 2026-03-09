# Smart Notes Hybrid Checklist

> Checklist de validacao para `pattern-recognition.md` (KOE_SIN_005)
> Source: Dan Koe — Smart Notes Hybrid System
> Agent: koe-sintetizador

---

## 1. Note Connection Quality

```yaml
note_connections:
  link_density:
    - [ ] Every new note linked to minimum 2 existing notes
    - [ ] Links are meaningful (not arbitrary — explain WHY linked)
    - [ ] Bidirectional links maintained (A links to B AND B links to A)
    - [ ] Orphan notes identified and connected within 7 days
  link_types:
    - [ ] "Supports" links — note A provides evidence for note B
    - [ ] "Contradicts" links — note A challenges note B
    - [ ] "Extends" links — note A builds upon note B
    - [ ] "Analogous" links — note A mirrors note B in a different domain
```

---

## 2. Zettelkasten-Inspired Structure

```yaml
zettelkasten:
  atomicity:
    - [ ] Each note contains ONE idea (not a collection)
    - [ ] Note can be understood without reading linked notes
    - [ ] Note is written in your own words (not copied)
    - [ ] Note title summarizes the core claim
  permanence:
    - [ ] Fleeting notes (queue items) processed into permanent notes
    - [ ] Permanent notes express a complete thought
    - [ ] Literature notes cite the source accurately
    - [ ] Permanent notes argue a position (not just summarize)
```

---

## 3. Emergent Pattern Detection

```yaml
emergent_patterns:
  cluster_awareness:
    - [ ] Clusters of 5+ connected notes identified as potential Big Ideas
    - [ ] Clusters spanning 2+ domains flagged for Digital Renaissance synthesis
    - [ ] Cluster growth monitored over time (which ideas attract more notes?)
    - [ ] Dead clusters (no new connections in 30 days) reviewed for relevance
  pattern_naming:
    - [ ] Emergent patterns given explicit names
    - [ ] Named patterns become "index notes" (entry points to clusters)
    - [ ] Index notes updated as cluster grows
    - [ ] Patterns tested against real-world application
```

---

## 4. Queue-to-Notes Pipeline

```yaml
queue_pipeline:
  processing_flow:
    - [ ] Queue items (fleeting notes) processed within 7 days
    - [ ] Each queue item either becomes a permanent note or is discarded
    - [ ] Processing includes: rewrite in own words + find connections
    - [ ] No raw queue items in the permanent notes system
  throughput:
    - [ ] Minimum 3 permanent notes created per week
    - [ ] Note creation time tracked (target: 10-15 min per permanent note)
    - [ ] Processing backlog under 20 items at all times
```

---

## 5. System Hygiene

```yaml
system_hygiene:
  maintenance:
    - [ ] Weekly review of recent notes for missed connections
    - [ ] Monthly review of index notes for accuracy
    - [ ] Quarterly pruning of irrelevant or outdated notes
    - [ ] Broken links identified and repaired
  searchability:
    - [ ] Consistent tagging system applied
    - [ ] Tags complement (not replace) links
    - [ ] Full-text search functional and used regularly
    - [ ] System navigable by browsing links (not just search)
```

---

## 6. Output Generation

```yaml
output_generation:
  content_readiness:
    - [ ] Clusters with 10+ notes reviewed for content potential
    - [ ] Content drafts assembled from note sequences (not blank page)
    - [ ] Notes provide the depth layer for Iceberg Model content
    - [ ] Each content piece traceable back to source notes
  serendipity_capture:
    - [ ] Random browsing of notes produces unexpected connections
    - [ ] "Serendipity sessions" scheduled monthly (30 min browsing without goal)
    - [ ] Unexpected connections captured as new synthesis notes
```

---

## Scoring

| Category | Items | Points Each | Max |
|----------|-------|-------------|-----|
| Critical — Connection Quality & Zettelkasten Structure | 12 | 3 | 36 |
| Standard — Patterns, Pipeline & Hygiene | 14 | 2 | 28 |
| Bonus — Output Generation & Serendipity | 6 | 1 | 6 |
| **TOTAL** | **32** | | **70** |

### Thresholds
- **PASS**: >= 56 points (80%)
- **CONDITIONAL**: >= 42 points (60%)
- **FAIL**: < 42 points

### If FAIL
1. Start small: pick 10 existing notes and add at least 2 links to each
2. Process 5 queue items into permanent notes this week (one idea per note, own words)
3. Look for your first cluster: which 5+ notes seem to orbit the same theme?
4. Name that cluster — congratulations, you have your first emergent pattern

*Checklist: smart-notes-hybrid-checklist | Version: 1.0*
*Supports: pattern-recognition.md (KOE_SIN_005)*
