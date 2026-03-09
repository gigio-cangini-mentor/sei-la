# Epic 2 — Intelligent Analysis and Structuring

**Epic ID:** transcript-sculptor/epic-2
**Status:** Done
**Priority:** P0 — Critical Path
**Estimated Stories:** 3
**Owner:** @pm (Morgan)

---

## Goal

Implement semantic analysis and structural editing agents that transform raw markdown into structured content, preserving 100% of the speaker's DNA.

## Value Delivered

After this epic, raw transcriptions are transformed into structured, titled, cleaned documents with speaker identification, zone context, and editorial-quality formatting — while preserving the speaker's authentic voice.

---

## Stories

### Story 2.1 — Agent transcript-analyst: Analysis and Mapping

> As a user, I want the system to analyze the transcription identifying speakers, content zones, and topic changes, so that structuring is intelligent and not arbitrary.

**Acceptance Criteria:**
1. Detection of distinct speakers with consistent labeling
2. Zone mapping: [Lecture], [Q&A], [Music], [Pitch], [Noise], [Break]
3. Identification of topic changes with section title suggestions
4. Output: analysis-map.yaml with complete transcription map
5. Intelligent chunking into blocks of ~5000-8000 words at natural break points

**Agent Assignment:** @dev
**Complexity:** XL (Extra Large)
**Dependencies:** Epic 1 complete

---

### Story 2.2 — Agent transcript-editor: Structuring and Cleanup

> As a user, I want the transcription structured with titles, subtitles, proper punctuation, and formatted dialogues, without losing the speaker's DNA.

**Acceptance Criteria:**
1. H2 titles for each main thematic section
2. H3 subtitles for sub-topics
3. Context brackets for non-lecture zones: [Q&A], [Music], etc.
4. Dialogues formatted with **Speaker:** before each speech
5. Punctuation adjusted per tone (energetic → !, calm → .)
6. Noise removed (murmurs, contextless loose phrases)
7. Ambiguous excerpts marked with [REVISAR]
8. Linguistic DNA preserved: vocabulary, expressions, catchphrases, rhythm

**Agent Assignment:** @dev
**Complexity:** XL (Extra Large)
**Dependencies:** Story 2.1

---

### Story 2.3 — Agent sculptor-chief: Orchestration and Merge

> As a user, I want the orchestrator to coordinate chunk processing and perform intelligent final merge ensuring continuity, so that the document appears to have been edited by a top human editor end-to-end.

**Acceptance Criteria:**
1. Sequential orchestration: analysis → editing → validation per chunk
2. Intelligent chunk merge with smooth transitions between sections
3. Conflict resolution when a topic crosses the boundary of two chunks
4. Table of contents generation with links to each section
5. Metadata at top: title, speakers, estimated duration, word count, date

**Agent Assignment:** @dev
**Complexity:** L (Large)
**Dependencies:** Story 2.1, Story 2.2

---

## Execution Order

```
Story 2.1 (Analysis + Mapping)
    ↓
Story 2.2 (Editing + Structuring)
    ↓
Story 2.3 (Orchestration + Merge)
```

## Quality Gate

- [ ] Analysis map correctly identifies speakers and zones
- [ ] Chunking respects natural topic boundaries
- [ ] DNA preservation validated (catchphrases, vocabulary, tone)
- [ ] No substantive content lost (>= 98% preservation)
- [ ] Merge produces seamless transitions between chunks
- [ ] Table of contents links work correctly

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 0.1 | Initial epic from PRD v0.1 | Morgan (PM) |
