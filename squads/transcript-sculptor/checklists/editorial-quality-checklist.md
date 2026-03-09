# Editorial Quality Checklist — Stage 2-3 Validation

**Checklist ID:** transcript-sculptor/editorial-quality
**Version:** 1.0.0
**Stage:** Stage 2-3 — Editing and Quality Assurance
**Purpose:** Validate editorial quality and DNA preservation after editing

---

## Overview

This checklist ensures that edited chunks preserve the speaker's linguistic DNA, maintain structural coherence, and remove only justified noise. It validates the core principles of the transcript-sculptor: clarity through structure, zero paraphrasing, catchphrase preservation.

**When to use:** After `task-edit-transcript.md` completes, as part of `task-validate-quality.md` execution.

**Quality Gate:** All critical items (marked ⚠️) must pass for Stage 2-3 to be considered complete.

---

## Checklist Items

### 1. DNA Preservation — Catchphrases (⚠️ CRITICAL)

- [ ] **All catchphrases from analysis-map preserved in edited text**
- [ ] **No vocabulary substitutions** (e.g., "galera" → "pessoal" is FORBIDDEN)
- [ ] **Formality level maintained** (informal → informal, formal → formal)
- [ ] **Repetitions for emphasis preserved** (e.g., "muito, muito importante" stays intact)

**Validation:**
- Extract catchphrases from `analysis-map.yaml` → `speakers[].characteristics`
- Search for each catchphrase in full edited text
- Verify count: `catchphrases_preserved == catchphrases_found`
- If any lost → **AUTOMATIC FAIL**

**Pass Criteria:** 100% catchphrase preservation (zero tolerance)

---

### 2. DNA Preservation — Paraphrasing (⚠️ CRITICAL)

- [ ] **paraphrased_sentences == 0 across all chunks**
- [ ] **No meaning alterations** — sentences preserve exact wording
- [ ] **Only punctuation adjusted** — words are immutable

**Validation:**
- Check all chunk frontmatters: `dna_indicators.paraphrased_sentences`
- Sum across all chunks
- If total > 0 → **AUTOMATIC FAIL**

**Pass Criteria:** Zero paraphrasing (hard constraint)

---

### 3. Structural Coherence — Heading Hierarchy

- [ ] **H2/H3 heading hierarchy is correct** — No H3 before H2, no orphan H3s
- [ ] **Titles are descriptive, not generic** — "Fundamentos do Método", not "Parte 1"
- [ ] **Titles match content** — Each section title accurately reflects content
- [ ] **Zone boundaries respected** — H2 sections align with zones from analysis-map

**Validation:**
- Parse edited text for H2 (`##`) and H3 (`###`) headings
- Verify hierarchy: no H3 before first H2, all H3s under an H2
- Check title quality: descriptive (>= 3 words), not sequential ("Part 1", "Section A")
- Cross-check zone boundaries from analysis-map with H2 placements

**Pass Criteria:** Clean hierarchy, descriptive titles, zones aligned

---

### 4. Structural Coherence — Speaker Labels

- [ ] **Speaker labels consistent throughout** — Same speaker labeled same way
- [ ] **All speakers clearly identified** — No ambiguous attribution
- [ ] **Visual separation between speakers** — Blank lines between speaker turns
- [ ] **Labels match analysis-map** — Speaker IDs correspond to analysis-map labels

**Validation:**
- Extract speaker labels from edited text (e.g., `**Palestrante Principal:**`)
- Verify consistency: same speaker never labeled differently
- Cross-check with `analysis-map.yaml` → `speakers[].label`
- Verify visual separation: blank line before each new speaker label

**Pass Criteria:** Clear, consistent attribution throughout

---

### 5. Structural Coherence — Zone Context Brackets

- [ ] **Zone context brackets match analysis-map zones** — `[Q&A]`, `[Intervalo]`, `[Pitch de Vendas]`
- [ ] **Non-lecture zones properly labeled** — Q&A, music, pitch, break zones have context
- [ ] **Lecture zones have no brackets** — Standard content has clean titles
- [ ] **Zone labels are accurate** — Bracket type matches zone content

**Validation:**
- Extract zone types from `analysis-map.yaml` → `zones[].type`
- For each zone:
  - If type = "qa" → verify `[Q&A]` bracket in corresponding section
  - If type = "music" → verify `[Intervalo]` or similar
  - If type = "pitch" → verify `[Pitch de Vendas]`
  - If type = "lecture" → verify NO brackets

**Pass Criteria:** All zone types correctly labeled

---

### 6. Content Preservation — Noise Removal (⚠️ CRITICAL)

- [ ] **Noise removed only where confidence >= 0.85** — High-confidence removals only
- [ ] **Low-confidence content preserved** — Ambiguous excerpts kept with `[REVISAR]` marker
- [ ] **Removal log complete** — All removals documented in chunk frontmatter
- [ ] **Justifications valid** — Each removal has clear reason (e.g., "inaudível", "ruído")

**Validation:**
- Check all chunk frontmatters: `removal_log`
- For each removal:
  - Verify `reason` field is present and descriptive
  - Cross-check with `analysis-map.yaml` → `noise_candidates`
  - Verify confidence threshold (if in noise_candidates)
- Count removals by type: noise vs review
- Verify no substantive content removed (spot-check removal excerpts)

**Pass Criteria:** Only justified noise removed, all low-confidence cases marked `[REVISAR]`

---

### 7. Content Preservation — Ambiguous Content

- [ ] **Ambiguous content marked `[REVISAR]`, not removed** — When in doubt, preserve
- [ ] **Review markers include context** — `[REVISAR: reason]` explains why flagged
- [ ] **All `[REVISAR]` instances logged** — Tracked in quality report for human review

**Validation:**
- Search edited text for `[REVISAR]` markers
- For each occurrence:
  - Verify context is included (reason for flagging)
  - Verify original text is preserved (not removed)
- Cross-check with `removal_log` entries where `action: "[REVISAR]"`

**Pass Criteria:** All ambiguous content flagged, not removed

---

### 8. Content Preservation — Overall Percentage (⚠️ CRITICAL)

- [ ] **Content preservation >= 98%** — No more than 2% content removed
- [ ] **No substantive paragraphs dropped entirely** — Spot-check first/last 500 words
- [ ] **Word count tracking accurate** — Frontmatter counts match actual content

**Validation:**
- Calculate: `(total_words_after / words_original) × 100`
- Verify >= 98%
- Spot-check: extract first 500 and last 500 words from raw, verify present in edited
- If < 98% → **AUTOMATIC FAIL**

**Pass Criteria:** >= 98% content preserved

---

### 9. DNA Preservation — Overall Score

- [ ] **DNA preservation score >= 8.0/10** — Acceptable DNA quality
- [ ] **Ideally >= 9.0/10** — Target quality for PASS verdict

**Validation:**
- Quality guardian calculates DNA score in `task-validate-quality.md`
- Score factors: catchphrases (40%), vocabulary (30%), tone (20%), paraphrasing (10%)
- Check final score in `quality-report.yaml` → `scores.dna_preservation`

**Pass Criteria:** >= 8.0 (minimum), >= 9.0 (target for PASS)

---

### 10. Integration and Completeness

- [ ] **All chunks processed** — No edited chunks missing
- [ ] **Chunk metadata complete** — All frontmatters have required fields
- [ ] **Output files well-formed** — Valid YAML + Markdown syntax
- [ ] **Quality report generated** — `quality-report.yaml` exists and complete

**Validation:**
- Count chunks in `analysis-map.yaml` → `chunks`
- Count edited chunk files in `chunks/` directory
- Verify counts match
- Verify all chunk frontmatters have: `chunk_id`, `word_count_before`, `word_count_after`, `removal_log`, `dna_indicators`
- Verify `quality-report.yaml` exists and matches schema

**Pass Criteria:** All chunks accounted for, all metadata complete

---

## Quality Gate Decision

**PASS:** All 10 items pass, including all CRITICAL items (1, 2, 6, 8)
**CONCERNS:** Items 1-2, 6, 8 pass; minor issues in items 3-5, 7, 9-10 (document, proceed)
**FAIL:** Any CRITICAL item fails (catchphrases lost, paraphrasing > 0, preservation < 98%)

**Action on FAIL:** Return to Stage 2, re-edit affected chunks, re-run validation

---

## Critical Rules Summary

These rules MUST be followed for editorial quality:

1. **NEVER paraphrase** — `paraphrased_sentences == 0` (hard constraint)
2. **NEVER change vocabulary** — "galera" stays "galera", no synonyms
3. **NEVER formalize informal speech** — "tá" stays "tá", not "está"
4. **NEVER remove catchphrases** — All speaker DNA markers preserved
5. **ONLY remove high-confidence noise** — Ambiguous content flagged, not removed
6. **PRESERVE >= 98% content** — Maximum 2% removal allowed

---

## Usage Example

```bash
# After running task-edit-transcript.md on all chunks:

# Step 1: Run quality validation
*validate raw/palestra-dia1.md chunks/

# Step 2: Check quality report
cat reports/quality-report.yaml

# Step 3: Verify verdict
grep "verdict:" reports/quality-report.yaml

# Step 4: If PASS, proceed to Stage 4 (merge and delivery)
# If FAIL, check specific issues and re-edit affected chunks
```

---

## Integration Points

**Upstream:** task-edit-transcript.md (transcript-editor agent)
**Downstream:** task-merge-and-deliver.md (sculptor-chief agent)
**Quality Guardian:** Executes this checklist as part of task-validate-quality.md

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 1.0.0 | Initial checklist for Stage 2-3 validation | Dex (Dev) |
