# Epic 3 — Quality Assurance and Delivery

**Epic ID:** transcript-sculptor/epic-3
**Status:** Done
**Priority:** P0 — Critical Path
**Estimated Stories:** 3
**Owner:** @pm (Morgan)

---

## Goal

Implement automated quality validation and the end-to-end workflow that allows processing any transcription with a single command.

## Value Delivered

After this epic, the squad is fully operational: a single command processes any input folder end-to-end, with quality validation, reporting, and documentation — ready for daily production use.

---

## Stories

### Story 3.1 — Agent quality-guardian: Quality Validation

> As a user, I want the system to automatically validate the quality of the edited document, so that I can be confident nothing was lost and DNA was preserved.

**Acceptance Criteria:**
1. Raw vs edited comparison: content preservation percentage (target >= 98%)
2. DNA preservation score (1-10)
3. Structural coherence score (1-10)
4. List of removed excerpts for auditing
5. List of excerpts marked [REVISAR]
6. Quality report in markdown format

**Agent Assignment:** @dev
**Complexity:** L (Large)
**Dependencies:** Epic 2 complete

---

### Story 3.2 — End-to-End Workflow and Checklists

> As a user, I want to execute the complete pipeline with a single command, so that I can process transcriptions efficiently on a daily basis.

**Acceptance Criteria:**
1. Workflow `wf-transcript-to-masterpiece` functional end-to-end
2. Single command: `/transcript-sculptor:*` with input folder path
3. Editorial quality checklist integrated
4. Conversion quality checklist integrated
5. Support for partial reprocessing (e.g., re-edit only, without reconverting)
6. Complete processing log with timing per stage

**Agent Assignment:** @dev
**Complexity:** L (Large)
**Dependencies:** Story 3.1

---

### Story 3.3 — Smoke Test and Final Documentation

> As a user, I want complete documentation and tested examples, so that I can use the squad confidently and train others to use it.

**Acceptance Criteria:**
1. Smoke test executed with short real transcription (~1k words)
2. Smoke test executed with long transcription (~10k+ words)
3. Complete README.md with usage examples
4. Squad knowledge base (transcript-sculptor-kb.md) documented
5. Slash commands registered and functional

**Agent Assignment:** @dev + @qa
**Complexity:** M (Medium)
**Dependencies:** Story 3.2

---

## Execution Order

```
Story 3.1 (Quality Validation)
    ↓
Story 3.2 (Workflow E2E + Checklists)
    ↓
Story 3.3 (Smoke Test + Docs)
```

## Quality Gate

- [ ] Quality report generates accurate scores
- [ ] End-to-end workflow completes without manual intervention
- [ ] Smoke tests pass on real transcriptions (short + long)
- [ ] README has working examples
- [ ] Slash commands registered in AIOS
- [ ] Daily use scenario validated (process → review → accept)

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 0.1 | Initial epic from PRD v0.1 | Morgan (PM) |
