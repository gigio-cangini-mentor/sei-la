# Task: Validate Quality

**Task ID:** transcript-sculptor/validate-quality
**Version:** 1.0.0
**Status:** Production Ready
**Created:** 2026-02-22
**Category:** Stage 3 - Quality Assurance

---

## Executive Summary

This task performs forensic quality validation by comparing raw chunks against edited chunks. It calculates content preservation percentage, DNA preservation score (1-10), and structural coherence score (1-10), generating a detailed audit trail of all removals, review flags, and quality metrics.

**Workflow Position:** Stage 3 of full pipeline (after editing)
**Success Definition:** Verdict PASS with scores above thresholds
**Output Quality Gate:** QG-QUALITY (content >= 98%, DNA >= 9.0, coherence >= 8.5)

---

## Executor Type

**Agent (100%)**
- quality-guardian agent performs comparison and scoring
- Generates data-driven quality reports

---

## Inputs

```yaml
raw_file:
  field: "Path to raw .md file"
  format: "raw/{source}.md"
  required: true
  description: "Complete raw markdown file (not chunked)"

edited_chunks_dir:
  field: "Path to chunks/ directory with edited chunks"
  format: "chunks/"
  required: true
  description: "Directory containing all *-edited.md chunk files"

analysis_map:
  field: "Path to analysis-map.yaml"
  format: "analysis/{source}-analysis-map.yaml"
  required: true
  description: "Analysis map for speaker data and catchphrases"
```

---

## Action Items

**IMPORTANT:** This task is designed for LLM execution (Claude Code). Each step must be followed sequentially and thoroughly.

---

### Step 1: Load and Inventory All Inputs

**Objective:** Load all input files and aggregate metadata.

**Instructions:**

1. **Read the raw .md file:**
   - Use `Read` tool to load `{raw_file}`
   - Count total words: `words_original`
   - Store raw content for later comparison

2. **Read all edited chunks:**
   - Use `Glob` tool to find all `*-edited.md` files in `{edited_chunks_dir}`
   - For each chunk file:
     - Use `Read` tool to load the file
     - Parse YAML frontmatter to extract:
       - `chunk_id`
       - `word_count_before`
       - `word_count_after`
       - `words_removed`
       - `removal_log` (list of removed excerpts)
       - `dna_indicators` (catchphrases, paraphrasing count)
     - Store chunk content (body after frontmatter)

3. **Read analysis-map.yaml:**
   - Use `Read` tool to load `{analysis_map}`
   - Parse YAML structure
   - Extract:
     - `speakers[].characteristics` — catchphrases for each speaker
     - `speakers[].tone` — tone indicators
     - `zones` — zone types and boundaries

4. **Aggregate totals:**
   - Sum `word_count_before` from all chunks → `total_words_before`
   - Sum `word_count_after` from all chunks → `total_words_after`
   - Sum `words_removed` from all chunks → `total_words_removed`
   - Concatenate all chunk bodies → `full_edited_text`

5. **Log inventory:**
   - Print to console:
     - Raw file: word count
     - Edited chunks: count of chunks, total words before/after
     - Analysis map: number of speakers, number of zones

**Output:** All inputs loaded and metadata aggregated

---

### Step 2: Calculate Content Preservation Score (1-10)

**Objective:** Measure how much original content was preserved.

**Instructions:**

1. **Calculate preservation percentage:**
   ```
   content_preservation_pct = (total_words_after / words_original) × 100
   ```

2. **Score mapping:**
   - >= 98%: score = 10
   - 96-98%: score = 8
   - 94-96%: score = 6
   - 92-94%: score = 4
   - < 92%: score = 2

3. **Semantic check (spot-check substantive content):**
   - Extract first 500 words of raw file
   - Extract last 500 words of raw file
   - Search for these excerpts in `full_edited_text`
   - Verify no substantive paragraphs were dropped entirely
   - If major sections missing → flag as "substantive_content_lost"

4. **Classify removed content:**
   - Aggregate all `removal_log` entries from all chunks
   - Count entries by type:
     - `type: "noise"` → `words_removed_noise`
     - `type: "review"` → `words_marked_review`
   - Calculate: `words_removed_substantive = total_words_removed - words_removed_noise`

5. **Log results:**
   - Print preservation percentage
   - Print score (1-10)
   - Print substantive content lost (if any)

**Output:** Content preservation score (1-10) and detailed word count breakdown

---

### Step 3: Calculate DNA Preservation Score (1-10)

**Objective:** Measure speaker's linguistic DNA preservation.

**Instructions:**

1. **Extract catchphrases from analysis-map:**
   - Parse `speakers[].characteristics` field
   - Extract all quoted phrases (e.g., "galera", "olha só", "percebam")
   - Create list: `catchphrases_expected`

2. **Verify catchphrases in edited text:**
   - For each catchphrase in `catchphrases_expected`:
     - Search for it in `full_edited_text`
     - If found → add to `catchphrases_preserved`
     - If NOT found → add to `catchphrases_lost`
   - Count: `catchphrases_found = len(catchphrases_expected)`
   - Count: `catchphrases_preserved_count = len(catchphrases_preserved)`
   - Count: `catchphrases_lost_count = len(catchphrases_lost)`

3. **Check tone consistency:**
   - Extract speaker `tone` from analysis-map (e.g., "energetic", "calm")
   - Check punctuation patterns in edited text:
     - If tone = "energetic" → verify presence of `!` and `?` marks
     - If tone = "calm" → verify predominance of `.` marks
   - Assign: `tone_consistency = "high" | "medium" | "low"`

4. **Check formality level maintained:**
   - Extract informal markers from raw: "né", "galera", "tipo", "tá"
   - Verify these markers still present in edited text
   - If speaker uses informal language → verify NOT formalized
   - Assign: `formality_level_maintained = true | false`

5. **Aggregate paraphrasing count:**
   - From all chunk frontmatters, extract `dna_indicators.paraphrased_sentences`
   - Sum across all chunks: `total_paraphrased_sentences`
   - **CRITICAL:** This MUST be 0 for PASS verdict

6. **Calculate DNA score (max 10.0):**
   - Base score = 10.0
   - If catchphrases_lost > 0 → deduct 2.0 per lost catchphrase
   - If total_paraphrased_sentences > 0 → **AUTOMATIC FAIL** (score = 0)
   - If tone_consistency = "low" → deduct 1.0
   - If formality_level_maintained = false → deduct 1.0
   - Final score = max(0, base_score - deductions)

7. **Log results:**
   - Print catchphrases found, preserved, lost
   - Print tone consistency assessment
   - Print formality level status
   - Print paraphrasing count
   - Print final DNA score

**Output:** DNA preservation score (1-10) and detailed DNA analysis

---

### Step 4: Calculate Structural Coherence Score (1-10)

**Objective:** Assess structural quality of edited document.

**Instructions:**

1. **Verify heading hierarchy:**
   - Parse edited text for H2 (`##`) and H3 (`###`) headings
   - Check hierarchy rules:
     - No H3 before first H2
     - No orphan H3s (H3 without parent H2)
     - Headings follow logical nesting
   - Count violations: `heading_hierarchy_violations`

2. **Verify zone brackets match analysis-map:**
   - Extract zones from analysis-map
   - For each zone type (qa, music, pitch, break):
     - Search for corresponding bracket in edited text (e.g., `[Q&A]`, `[Intervalo]`)
   - Count mismatches: `zone_label_mismatches`

3. **Verify speaker labels consistent:**
   - Extract speaker labels from analysis-map
   - Search for speaker attribution in edited text (e.g., `**Palestrante Principal:**`)
   - Check consistency: same speaker labeled same way throughout
   - Count inconsistencies: `speaker_label_inconsistencies`

4. **Check section flow:**
   - Identify major H2 sections
   - Check for abrupt topic jumps between sections
   - Verify smooth transitions (contextual continuity)
   - Count jarring transitions: `flow_issues`

5. **Calculate coherence score (max 10.0):**
   - Base score = 10.0
   - Deduct 1.0 per heading hierarchy violation
   - Deduct 0.5 per zone label mismatch
   - Deduct 0.5 per speaker label inconsistency
   - Deduct 0.5 per flow issue
   - Final score = max(0, base_score - deductions)

6. **Log results:**
   - Print heading hierarchy status
   - Print zone label accuracy
   - Print speaker label consistency
   - Print flow quality
   - Print final coherence score

**Output:** Structural coherence score (1-10) and structural analysis

---

### Step 5: Aggregate Removed Excerpts

**Objective:** Compile complete list of all content removed during editing.

**Instructions:**

1. **Parse removal_log from all chunks:**
   - For each chunk's frontmatter `removal_log`:
     - Extract each entry: `type`, `text`, `reason`, `action` (if present)
     - Add `chunk_id` to entry for traceability

2. **Separate by type:**
   - `removed_excerpts` — entries where `type: "noise"`
   - `review_excerpts` — entries where `type: "review"` or `action: "[REVISAR]"`

3. **Format for output:**
   - For `removed_excerpts`:
     ```yaml
     - text: "{excerpt text}"
       reason: "{reason for removal}"
       chunk_id: "{chunk_id}"
     ```
   - For `review_excerpts`:
     ```yaml
     - text: "{excerpt text}"
       location: "Chunk {chunk_id}, {section context}"
       reason: "{reason for flagging}"
     ```

**Output:** Complete lists of removed and flagged content

---

### Step 6: Scan for [REVISAR] Markers

**Objective:** Find all review markers in edited text.

**Instructions:**

1. **Search all edited chunks for `[REVISAR]` text:**
   - Use `Grep` tool with pattern `\[REVISAR[^\]]*\]` to find markers
   - For each match:
     - Extract surrounding context (±50 words)
     - Identify section (nearest H2/H3 heading)
     - Record location (chunk ID + section)

2. **Format for output:**
   ```yaml
   - text: "{text with [REVISAR] marker}"
     location: "Chunk {chunk_id}, Section '{section_title}'"
     reason: "{extracted from marker or removal_log}"
   ```

3. **Count total markers:**
   - `review_markers_count = total number of [REVISAR] occurrences`

**Output:** List of all review markers with locations

---

### Step 7: Calculate Overall Score and Verdict

**Objective:** Aggregate scores and determine final verdict.

**Instructions:**

1. **Calculate overall score (max 10.0):**
   ```
   overall_score =
     (content_preservation_score × 0.40) +
     (dna_preservation_score × 0.35) +
     (structural_coherence_score × 0.25)
   ```

2. **Round to 1 decimal place**

3. **Determine verdict:**
   - **PASS (>= 8.0):** All thresholds met
     - content_preservation >= 8.0 (equivalent to >= 98%)
     - dna_preservation >= 9.0
     - structural_coherence >= 8.5
     - paraphrased_sentences == 0
   - **CONCERNS (6.0-7.9):** Minor issues flagged but acceptable
     - Scores slightly below thresholds
     - No critical violations
   - **FAIL (< 6.0):** Critical thresholds violated
     - content_preservation < 6.0 (< 96%)
     - dna_preservation < 8.5
     - paraphrased_sentences > 0
     - catchphrases_lost > 0

4. **Log results:**
   - Print all three scores
   - Print overall score
   - Print verdict with justification

**Output:** Overall score (1-10) and verdict (PASS/CONCERNS/FAIL)

---

### Step 8: Generate quality-report.yaml

**Objective:** Write comprehensive quality report to file.

**Instructions:**

1. **Determine output path:**
   - Extract source filename from `raw_file` (e.g., "palestra-dia1.md")
   - Output path: `reports/quality-report.yaml`

2. **Construct YAML report:**

   ```yaml
   quality_report:
     source: "{raw_file}"
     output: "output/{source}-masterpiece.md"
     processed_at: "{ISO 8601 timestamp}"
     scores:
       content_preservation: {score from Step 2}
       dna_preservation: {score from Step 3}
       structural_coherence: {score from Step 4}
       overall: {score from Step 7}
     content_analysis:
       words_original: {words_original from Step 1}
       words_final: {total_words_after from Step 1}
       words_removed: {total_words_removed from Step 1}
       words_removed_noise: {words_removed_noise from Step 2}
       words_removed_duplicates: 0  # Not tracked separately yet
       words_marked_review: {count of review markers from Step 6}
     removed_excerpts:
       {list from Step 5}
     review_excerpts:
       {list from Step 5 and Step 6}
     dna_analysis:
       catchphrases_found: {catchphrases_expected from Step 3}
       catchphrases_preserved: {catchphrases_preserved_count from Step 3}
       catchphrases_lost: {catchphrases_lost_count from Step 3}
       tone_consistency: {tone_consistency from Step 3}
       formality_level_maintained: {formality_level_maintained from Step 3}
     verdict: "{verdict from Step 7}"
   ```

3. **Write file:**
   - Use `Write` tool to create `reports/quality-report.yaml`
   - Ensure proper YAML formatting (2-space indentation)

4. **Log completion:**
   - Print success message with file path
   - Print summary: verdict, overall score, key metrics

**Output:** `reports/quality-report.yaml` file created

---

## Outputs

```yaml
quality_report:
  location: "{output_folder}/reports/{source}-chunk-{id}-quality.yaml"
  format: "YAML"
  schema: "See quality-guardian agent"
```

---

## Quality Thresholds

### PASS
- Content preservation >= 98%
- DNA preservation >= 9.0/10
- Structural coherence >= 8.5/10
- Zero paraphrasing
- Zero catchphrases lost

### CONCERNS
- Content preservation 96-98%
- DNA preservation 8.5-9.0/10
- Structural coherence 8.0-8.5/10

### FAIL
- Content preservation < 96%
- DNA preservation < 8.5/10
- Paraphrasing detected
- Catchphrases lost

---

## Dependencies

### Upstream
- raw chunks
- edited chunks from task-edit-transcript

### Downstream
- sculptor-chief (uses quality scores for final approval)

### Agent
- quality-guardian

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 1.0.0 | Initial task definition | Dex (Dev) |
