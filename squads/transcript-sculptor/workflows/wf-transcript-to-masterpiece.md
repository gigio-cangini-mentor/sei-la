# Workflow: Transcript to Masterpiece

**Workflow ID:** transcript-sculptor/wf-transcript-to-masterpiece
**Version:** 1.0.0
**Status:** Production Ready
**Created:** 2026-02-22

---

## Overview

Complete end-to-end pipeline from raw multi-format input folder to final publication-ready masterpiece markdown. This workflow orchestrates 5 sequential stages, each with validation gates and error handling, producing a fully structured document with table of contents, metadata, and quality reports.

**Trigger:** `/transcript-sculptor:process {input_folder}` or `*process {input_folder}`

**Duration:** ~12-15 minutes for 10k word transcription (target: NFR1)

**Output:** `{source}-masterpiece.md` + processing artifacts + quality reports

---

## Workflow Stages

```yaml
workflow:
  name: wf-transcript-to-masterpiece
  description: "Full pipeline: input folder → masterpiece.md"
  version: "1.0"
  trigger: "/transcript-sculptor:process {input_folder}"

  stages:
    - name: "Stage 0: Ingestion"
      agent: doc-converter
      task: task-scan-and-convert
      input: "{input_folder}"
      output: "raw/*.md + ingestion-report.yaml"
      checklist: conversion-quality-checklist
      on_error: halt
      critical: true

    - name: "Stage 1: Analysis"
      agent: transcript-analyst
      task: task-analyze-transcript
      input: "raw/*.md"
      output: "analysis/*.yaml + chunks via chunk_text.py"
      on_error: halt
      critical: true

    - name: "Stage 2: Editing"
      agent: transcript-editor
      task: task-edit-transcript
      input: "chunks/*.md + analysis-map.yaml"
      output: "chunks/*-edited.md"
      loop: "for each chunk"
      checklist: editorial-quality-checklist
      on_error: warn_and_continue
      critical: false

    - name: "Stage 3: Validation"
      agent: quality-guardian
      task: task-validate-quality
      input: "raw/*.md + chunks/*-edited.md + analysis-map.yaml"
      output: "reports/quality-report.yaml"
      verdict_action:
        PASS: continue
        CONCERNS: continue_with_warning
        FAIL: halt_and_return_to_stage2
      on_error: halt
      critical: true

    - name: "Stage 4: Delivery"
      agent: sculptor-chief
      task: task-merge-and-deliver
      input: "chunks/*-edited.md + analysis-map.yaml + quality-report.yaml"
      output: "{source}-masterpiece.md"
      on_error: halt
      critical: true
```

---

## Stage Specifications

### Stage 0: Ingestion (doc-converter)

**Purpose:** Convert all input files (PDF, DOCX, EPUB, SRT, etc.) to raw markdown.

**Input Requirements:**
- `{input_folder}` — Directory containing mixed-format files
- Supported formats: .pdf, .docx, .epub, .rtf, .odt, .srt, .vtt, .txt, .md

**Execution Flow:**
1. Scan input folder and catalog all files by format
2. Route each file to appropriate converter:
   - PDF (scanned) → Docling + Surya-OCR
   - PDF (digital) → PyMuPDF
   - DOCX/EPUB/RTF/ODT → Pandoc
   - SRT/VTT → SRT parser
   - MD/TXT → Passthrough
3. Generate `ingestion-report.yaml` with conversion status
4. Run `conversion-quality-checklist.md` for validation
5. Save all converted files to `{output_folder}/raw/`

**Success Criteria:**
- >= 95% files successfully converted
- All converted files are valid markdown
- Ingestion report generated with complete status

**Error Handling:**
- **Critical error:** No files converted successfully → HALT pipeline
- **Non-critical:** Single file conversion failure → Log error, continue with remaining files
- **OCR low confidence (<0.9):** Flag file for manual review, continue processing

**Outputs:**
- `{output_folder}/raw/{source}.md` — One file per input document
- `{output_folder}/ingestion-report.yaml` — Conversion status report

**Quality Gate:** QG-INGESTION (>= 95% success rate)

---

### Stage 1: Analysis (transcript-analyst)

**Purpose:** Semantic analysis, speaker detection, zone mapping, and intelligent chunking.

**Input Requirements:**
- `{output_folder}/raw/*.md` — All raw markdown files from Stage 0

**Execution Flow:**
1. For each raw .md file:
   - Perform semantic analysis (speakers, zones, topics)
   - Detect natural chunk boundaries (topic changes, scene transitions)
   - Generate `analysis-map.yaml` with chunk definitions
2. Execute `chunk_text.py` to physically split text based on analysis-map boundaries
3. Save raw chunks to `{output_folder}/chunks/`

**Success Criteria:**
- All raw files analyzed
- Chunk boundaries at natural topic breaks
- Speaker detection completed (even if generic labels)
- Zone mapping covers entire transcription

**Error Handling:**
- **Critical error:** Cannot analyze file (malformed markdown, encoding issues) → HALT pipeline
- **Non-critical:** Low-confidence speaker detection → Use generic labels ("Speaker 1", "Speaker 2")
- **Fallback:** If no natural topic breaks detected → Fallback to word-count-based chunking (every 7500 words)

**Outputs:**
- `{output_folder}/analysis/{source}-analysis-map.yaml` — Semantic analysis + chunk boundaries
- `{output_folder}/chunks/{source}-chunk-{id}.md` — Raw chunks (not yet edited)

**Quality Gate:** QG-ANALYSIS (chunk boundaries valid, analysis complete)

---

### Stage 2: Editing (transcript-editor)

**Purpose:** Structural editing per chunk — titles, cleanup, formatting, DNA preservation.

**Input Requirements:**
- `{output_folder}/chunks/{source}-chunk-{id}.md` — Raw chunks from Stage 1
- `{output_folder}/analysis/{source}-analysis-map.yaml` — Semantic guide

**Execution Flow:**
1. For each chunk in analysis-map:
   - Load raw chunk content
   - Load zone mapping and title suggestions from analysis-map
   - Apply structural editing:
     - Insert H2/H3 headings based on zone titles
     - Remove noise zones (music, background conversations)
     - Format speaker dialogues (`**Speaker Name:**`)
     - Adjust punctuation for readability
     - Mark ambiguous content with `[REVISAR]`
   - Track DNA preservation (catchphrases, tone, formality)
2. Generate frontmatter with editing metadata
3. Save edited chunk to `{output_folder}/chunks/{source}-chunk-{id}-edited.md`
4. Run `editorial-quality-checklist.md` for each chunk

**Success Criteria:**
- All chunks edited and structured
- DNA indicators tracked for each chunk
- No chunk edit removed > 5% substantive content
- Ambiguous excerpts marked with `[REVISAR]`

**Error Handling:**
- **Critical error:** Chunk file missing or corrupted → HALT pipeline
- **Non-critical:** LLM timeout on single chunk → Retry up to 2 times, then skip chunk and log warning
- **Warning:** DNA preservation < 9.0 for single chunk → Log warning, continue (will be caught in QA)

**Outputs:**
- `{output_folder}/chunks/{source}-chunk-{id}-edited.md` — Edited chunk with frontmatter

**Quality Gate:** QG-EDITING (all chunks edited, DNA tracking complete)

---

### Stage 3: Validation (quality-guardian)

**Purpose:** Quality validation — raw vs edited comparison, scoring, auditing.

**Input Requirements:**
- `{output_folder}/raw/{source}.md` — Original raw markdown
- `{output_folder}/chunks/{source}-chunk-{id}-edited.md` — All edited chunks
- `{output_folder}/analysis/{source}-analysis-map.yaml` — Analysis guide

**Execution Flow:**
1. For each edited chunk:
   - Compare with corresponding raw chunk (word count, content preservation)
   - Score DNA preservation (catchphrases, tone, formality)
   - Score structural coherence (heading hierarchy, transitions)
2. Aggregate scores across all chunks
3. Generate quality report with:
   - Overall scores (content, DNA, coherence)
   - Removed excerpts audit log
   - Review-flagged excerpts (`[REVISAR]`)
   - Verdict (PASS / CONCERNS / FAIL)
4. Save quality report to `{output_folder}/reports/quality-report.yaml`

**Success Criteria:**
- Content preservation >= 98%
- DNA preservation score >= 9.0/10
- Structural coherence score >= 8.5/10
- All removed excerpts logged for audit

**Verdict Actions:**
- **PASS:** Continue to Stage 4 (Delivery)
- **CONCERNS:** Log warnings, continue to Stage 4 with advisory
- **FAIL:** HALT pipeline, return to Stage 2 for re-editing (max 2 retry cycles)

**Error Handling:**
- **Critical error:** Cannot compare chunks (missing files) → HALT pipeline
- **Non-critical:** Single chunk score below threshold → Include in CONCERNS verdict, continue

**Outputs:**
- `{output_folder}/reports/quality-report.yaml` — Aggregated quality scores + audit log

**Quality Gate:** QG-VALIDATION (scores meet thresholds)

---

### Stage 4: Delivery (sculptor-chief)

**Purpose:** Intelligent chunk merge, TOC generation, metadata header, final assembly.

**Input Requirements:**
- `{output_folder}/chunks/{source}-chunk-{id}-edited.md` — All edited chunks
- `{output_folder}/analysis/{source}-analysis-map.yaml` — Analysis guide
- `{output_folder}/reports/quality-report.yaml` — Quality scores

**Execution Flow:**
1. Inventory all edited chunks (verify completeness)
2. Merge chunks with intelligent transitions:
   - Remove overlap regions between chunks (fuzzy matching)
   - Resolve duplicate headings at chunk boundaries
   - Smooth transitions between chunks (insert context if needed)
   - Merge split speaker dialogues
3. Generate table of contents (H2/H3 hierarchy with anchor links)
4. Generate metadata header (YAML frontmatter):
   - Title (from analysis-map or first H2)
   - Speakers list
   - Estimated duration (word_count / 150 words per minute)
   - Quality scores
   - Processing date
5. Assemble final document:
   - Frontmatter
   - Main title (H1)
   - Table of contents
   - Merged content
   - Footer (generated by transcript-sculptor)
6. Write `{output_folder}/{source}-masterpiece.md`
7. Update processing log

**Success Criteria:**
- Final .md file is valid markdown
- TOC links functional
- Metadata complete and accurate
- No merge artifacts (duplicate content, broken transitions)

**Error Handling:**
- **Critical error:** Missing chunks, cannot merge → HALT pipeline
- **Non-critical:** Abrupt transition between chunks → Insert `[TRANSIÇÃO]` marker, log warning
- **Merge conflict:** Duplicate heading → Keep first occurrence, merge content, remove second

**Outputs:**
- `{output_folder}/{source}-masterpiece.md` — FINAL PUBLICATION-READY DOCUMENT
- `{output_folder}/processing-log.yaml` — Pipeline timing and status

**Quality Gate:** QG-DELIVERY (final file valid, TOC functional)

---

## Partial Reprocessing

The pipeline supports resuming from any stage, enabling iterative refinement without re-running expensive stages.

### Entry Points

| Command | Skips | Uses Existing | Use Case |
|---------|-------|---------------|----------|
| `*reprocess --from=stage0 {output_folder}` | Nothing | Full run | Re-run entire pipeline |
| `*reprocess --from=stage1 {output_folder}` | Ingestion | `raw/*.md` | Re-analyze with different chunking strategy |
| `*reprocess --from=stage2 {output_folder}` | Ingestion + Analysis | `raw/*.md` + `analysis-map.yaml` | Re-edit with different editorial rules |
| `*reprocess --from=stage3 {output_folder}` | Ingestion + Analysis + Editing | All chunks + analysis | Re-validate after manual chunk fixes |
| `*reprocess --from=stage4 {output_folder}` | Ingestion + Analysis + Editing + QA | All validated chunks | Re-merge with different strategy |

### Workflow Execution

When `--from={stage}` is specified:

1. **Load pipeline state** from `{output_folder}/pipeline-state.yaml`
2. **Verify prerequisites** for target stage (check required input files exist)
3. **Skip completed stages** (stages before target stage)
4. **Execute from target stage** through final delivery
5. **Update pipeline state** with new completion status

### Prerequisites Validation

Before resuming from a stage, verify:

| Stage | Required Files |
|-------|---------------|
| stage1 | `raw/*.md` |
| stage2 | `raw/*.md`, `analysis/*.yaml` |
| stage3 | `chunks/*-edited.md`, `analysis/*.yaml` |
| stage4 | `chunks/*-edited.md`, `analysis/*.yaml`, `reports/quality-report.yaml` |

If prerequisites missing → HALT, report missing files, suggest full run.

---

## Processing Log

The workflow maintains a detailed processing log tracking timing, status, and metrics for each stage.

### Schema: `processing-log.yaml`

```yaml
processing_log:
  started_at: "2026-02-22T14:00:00Z"           # Pipeline start (ISO-8601)
  completed_at: "2026-02-22T14:12:30Z"         # Pipeline completion (ISO-8601)
  total_duration_seconds: 750                  # Total pipeline time
  input_folder: "/path/to/input"               # Original input folder
  output_folder: "/path/to/output"             # Output directory

  stages:
    - name: "ingestion"
      started_at: "2026-02-22T14:00:00Z"
      completed_at: "2026-02-22T14:01:30Z"
      duration_seconds: 90
      files_processed: 3
      files_successful: 3
      files_failed: 0
      status: "success"

    - name: "analysis"
      started_at: "2026-02-22T14:01:30Z"
      completed_at: "2026-02-22T14:04:00Z"
      duration_seconds: 150
      files_analyzed: 3
      chunks_created: 6
      status: "success"

    - name: "editing"
      started_at: "2026-02-22T14:04:00Z"
      completed_at: "2026-02-22T14:10:00Z"
      duration_seconds: 360
      chunks_edited: 6
      chunks_retried: 0
      status: "success"

    - name: "validation"
      started_at: "2026-02-22T14:10:00Z"
      completed_at: "2026-02-22T14:11:30Z"
      duration_seconds: 90
      verdict: "PASS"
      content_preservation: 98.2
      dna_preservation: 9.1
      structural_coherence: 8.8
      status: "success"

    - name: "delivery"
      started_at: "2026-02-22T14:11:30Z"
      completed_at: "2026-02-22T14:12:30Z"
      duration_seconds: 60
      chunks_merged: 6
      output_file: "palestra-dia1-masterpiece.md"
      final_word_count: 41580
      status: "success"

  warnings:
    - stage: "editing"
      chunk: "chunk-003"
      message: "Low DNA score (8.5) - below target (9.0)"

  errors: []
```

### Timing Metrics

The processing log tracks:
- **Per-stage duration** — Identify bottlenecks (NFR1 compliance)
- **File counts** — Track throughput per stage
- **Success/failure rates** — Monitor conversion and editing reliability
- **Quality scores** — Aggregate scores for final report

---

## Pipeline State

The workflow maintains resumable state for partial reprocessing.

### Schema: `pipeline-state.yaml`

```yaml
pipeline_state:
  last_completed_stage: "stage2"               # Last successfully completed stage
  last_run_at: "2026-02-22T14:10:00Z"          # Last execution timestamp
  input_folder: "/path/to/input"               # Original input folder
  output_folder: "/path/to/output"             # Output directory

  stages_completed:
    - "stage0"
    - "stage1"
    - "stage2"

  stages_pending:
    - "stage3"
    - "stage4"

  can_resume_from: "stage3"                    # Next valid entry point

  artifacts:
    raw_files:
      - "raw/palestra-dia1.md"
      - "raw/material-complementar.md"
    analysis_maps:
      - "analysis/palestra-dia1-analysis-map.yaml"
    edited_chunks:
      - "chunks/palestra-dia1-chunk-001-edited.md"
      - "chunks/palestra-dia1-chunk-002-edited.md"
      - "chunks/palestra-dia1-chunk-003-edited.md"
    quality_reports: []
    masterpiece: null
```

### State Updates

The pipeline state is updated:
- **After each stage completion** — Mark stage as completed, update `last_completed_stage`
- **On error** — Log error, mark stage as failed, update `can_resume_from`
- **On partial reprocessing** — Reset `stages_pending`, update `can_resume_from`

---

## Error Handling Strategy

### Critical Errors (HALT Pipeline)

These errors block pipeline progression:

| Error Type | Trigger | Action |
|-----------|---------|--------|
| **No files converted** | Stage 0: All conversions failed | HALT, report all errors |
| **Malformed markdown** | Stage 1: Cannot parse raw .md | HALT, report file path |
| **Missing chunks** | Stage 4: Expected chunks not found | HALT, report missing chunk IDs |
| **Quality gate FAIL** | Stage 3: DNA < 9.0, Content < 98% | HALT, return to Stage 2 (max 2 retries) |

**Action on critical error:**
1. Log error details to `processing-log.yaml`
2. Update `pipeline-state.yaml` with failed stage
3. Display error message with recovery suggestions
4. HALT pipeline execution

### Non-Critical Errors (Warn and Continue)

These errors log warnings but allow pipeline to continue:

| Error Type | Trigger | Action |
|-----------|---------|--------|
| **Single file conversion failure** | Stage 0: One file fails OCR | Log error, skip file, continue with remaining |
| **Low OCR confidence** | Stage 0: Confidence < 0.9 | Flag for manual review, continue processing |
| **Chunk timeout** | Stage 2: LLM timeout on chunk edit | Retry up to 2 times, then skip chunk and log |
| **Abrupt transition** | Stage 4: No smooth connection between chunks | Insert `[TRANSIÇÃO]` marker, log warning |

**Action on non-critical error:**
1. Log warning to `processing-log.yaml`
2. Apply fallback strategy (skip, retry, insert marker)
3. Continue pipeline execution

### Retry Logic

| Stage | Retryable Operation | Max Retries | Backoff |
|-------|-------------------|-------------|---------|
| Stage 0 | PDF OCR (timeout) | 2 | 5s exponential |
| Stage 2 | Chunk edit (LLM timeout) | 2 | 10s exponential |
| Stage 3 | Quality validation (if FAIL) | 2 | Manual intervention |

---

## Output Directory Structure

```
{output_folder}/
├── raw/                           # Stage 0 output — converted raw .md files
│   ├── palestra-dia1.md
│   └── material-complementar.md
├── analysis/                      # Stage 1 output — analysis maps
│   ├── palestra-dia1-analysis-map.yaml
│   └── material-complementar-analysis-map.yaml
├── chunks/                        # Stage 1 (raw) + Stage 2 (edited)
│   ├── palestra-dia1-chunk-001.md         # Raw chunk (from chunk_text.py)
│   ├── palestra-dia1-chunk-001-edited.md  # Edited chunk (from transcript-editor)
│   ├── palestra-dia1-chunk-002.md
│   ├── palestra-dia1-chunk-002-edited.md
│   └── ...
├── reports/                       # Stage 3 output — quality reports
│   ├── palestra-dia1-quality-report.yaml
│   └── material-complementar-quality-report.yaml
├── ingestion-report.yaml          # Stage 0 summary
├── processing-log.yaml            # Pipeline timing and status
├── pipeline-state.yaml            # Resumable state
├── palestra-dia1-masterpiece.md   # FINAL OUTPUT (Stage 4)
└── material-complementar-masterpiece.md
```

---

## Integration with Checklists

### Conversion Quality Checklist (Stage 0)

**File:** `checklists/conversion-quality-checklist.md`

**Executed:** After each file conversion in Stage 0

**Validation Points:**
- Output markdown is valid (parseable)
- Text extraction quality (OCR confidence >= 0.9)
- Formatting preserved (headings, lists, quotes)
- Special characters handled correctly (PT-BR accents)
- Images/tables handled appropriately (converted to markdown or skipped)

**Integration:**
- doc-converter agent runs checklist automatically
- Results logged in `ingestion-report.yaml`
- Failed checklist items logged as warnings

---

### Editorial Quality Checklist (Stage 2)

**File:** `checklists/editorial-quality-checklist.md`

**Executed:** After each chunk edit in Stage 2

**Validation Points:**
- DNA preservation (catchphrases, tone, formality)
- Structural coherence (heading hierarchy, logical flow)
- Noise removal appropriate (no substantive content lost)
- Speaker attributions correct
- Ambiguous content marked `[REVISAR]`

**Integration:**
- transcript-editor agent runs checklist for each chunk
- Results logged in chunk frontmatter
- Failed checklist items trigger warnings in processing log

---

## Performance Targets (NFR1)

**Target:** 1-hour transcription (~10k words) in < 15 minutes

### Timing Breakdown (Estimated)

| Stage | Target Duration | Bottleneck |
|-------|----------------|------------|
| Stage 0: Ingestion | 1-2 min | OCR processing for scanned PDFs |
| Stage 1: Analysis | 2-3 min | LLM semantic analysis |
| Stage 2: Editing | 6-8 min | LLM chunk editing (6 chunks × ~1 min each) |
| Stage 3: Validation | 1-2 min | LLM comparison and scoring |
| Stage 4: Delivery | 1 min | Merge and TOC generation |
| **TOTAL** | **11-16 min** | **Within target** |

### Optimization Strategies

- **Parallel chunk editing:** Edit multiple chunks concurrently (if LLM API supports)
- **Cache analysis results:** Reuse analysis-map for reprocessing
- **Skip OCR for digital PDFs:** Use fast PyMuPDF extraction
- **Batch quality checks:** Validate chunks in batches rather than sequentially

---

## Dependencies

### Upstream
- Input folder with mixed-format files
- Conversion tools installed (Pandoc, Docling, Surya-OCR)
- Python 3.13 with required packages (PyYAML, pymupdf)
- Claude Code LLM available

### Agents
- doc-converter (Stage 0)
- transcript-analyst (Stage 1)
- transcript-editor (Stage 2)
- quality-guardian (Stage 3)
- sculptor-chief (Stage 4)

### Tasks
- task-scan-and-convert.md (Stage 0)
- task-analyze-transcript.md (Stage 1)
- task-edit-transcript.md (Stage 2)
- task-validate-quality.md (Stage 3)
- task-merge-and-deliver.md (Stage 4)

### Checklists
- conversion-quality-checklist.md (Stage 0)
- editorial-quality-checklist.md (Stage 2)

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 1.0.0 | Initial workflow definition with 5-stage pipeline | Dex (Dev) |
