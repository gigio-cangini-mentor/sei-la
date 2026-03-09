# Conversion Quality Checklist — Stage 0 Validation

**Checklist ID:** transcript-sculptor/conversion-quality
**Version:** 1.0.0
**Stage:** Stage 0 — Ingestion
**Purpose:** Validate file conversion and OCR quality before analysis

---

## Overview

This checklist ensures that the ingestion process (Stage 0) produced high-quality raw markdown files suitable for downstream processing. It validates file detection, conversion accuracy, OCR quality, and output format compliance.

**When to use:** After `task-scan-and-convert.md` completes, before proceeding to Stage 1 (analysis).

**Quality Gate:** All items must pass for Stage 0 to be considered complete.

---

## Checklist Items

### 1. Input Detection and Classification

- [ ] **All input files detected** — No files in input folder skipped without reason
- [ ] **File types correctly identified** — Each file classified with correct format (PDF, DOCX, EPUB, etc.)
- [ ] **Supported formats processed** — All supported file types successfully converted
- [ ] **Unsupported formats documented** — Unsupported files listed in ingestion-report.yaml with reason

**Validation:**
- Check `ingestion-report.yaml` → `summary.total_files` matches actual count of files in input folder
- Verify `ingestion-report.yaml` → `files[].format` is accurate for each file
- Verify `ingestion-report.yaml` → `files[].status` is either "success" or "unsupported" (no unexplained failures)

**Pass Criteria:** All input files accounted for, none skipped silently

---

### 2. Conversion Success Rate

- [ ] **No supported files skipped without reason** — All PDF/DOCX/EPUB/SRT/VTT/MD/TXT converted or documented
- [ ] **Conversion errors logged** — Any failures documented in ingestion-report.yaml with error message
- [ ] **Output files exist** — Each successful conversion has corresponding `raw/*.md` file

**Validation:**
- For each file in `ingestion-report.yaml` where `status: "success"`:
  - Verify `output` field points to existing file in `raw/` directory
  - Use `Read` tool to confirm file is readable
- For each file where `status: "failed"`:
  - Verify `reason` field explains why conversion failed

**Pass Criteria:** >= 95% of supported files successfully converted

---

### 3. OCR Quality (for Scanned PDFs)

- [ ] **OCR confidence >= 93% for scanned PDFs** — Surya-OCR reports acceptable accuracy
- [ ] **Low-confidence PDFs flagged** — Any PDF with OCR confidence < 93% documented in ingestion-report.yaml
- [ ] **No garbled text** — Spot-check OCR output for gibberish or unreadable characters
- [ ] **Language detection correct** — OCR detected correct language (PT-BR expected)

**Validation:**
- For each PDF file in `ingestion-report.yaml` where `converter: "docling+surya"`:
  - Check `ocr_confidence` field
  - If < 0.93 → flag as "low_confidence_ocr"
  - If < 0.85 → **FAIL** (unusable for downstream processing)
- Manually read first 200 words of OCR output to check for garbled text

**Pass Criteria:** All scanned PDFs have OCR confidence >= 93%, no garbled output

---

### 4. Word Count Sanity Check

- [ ] **Word counts are reasonable** — No files with 0 words (unless legitimately empty)
- [ ] **No absurdly large counts** — No single file with > 500,000 words (likely parsing error)
- [ ] **Counts match expectations** — Large files have high word counts, small files have low counts

**Validation:**
- For each file in `ingestion-report.yaml`:
  - Check `word_count` field
  - If `word_count == 0` and file is not empty → **FAIL**
  - If `word_count > 500000` → flag as "suspicious_word_count"
- Spot-check: compare word count to file size (rough ratio: ~6 bytes per word for PT-BR)

**Pass Criteria:** All word counts fall within expected ranges

---

### 5. Output Format Compliance

- [ ] **Output files are valid UTF-8 markdown** — No encoding issues, files readable
- [ ] **No binary artifacts** — No binary data embedded in markdown (images properly handled)
- [ ] **Consistent line endings** — All files use Unix-style line endings (LF, not CRLF)
- [ ] **No conversion artifacts** — No XML tags, HTML entities, or formatting remnants

**Validation:**
- Use `Read` tool to load each `raw/*.md` file
- Check for encoding errors (�, garbled characters)
- Search for common artifacts:
  - HTML tags: `<div>`, `<p>`, `<span>`
  - XML tags: `<w:`, `<a:`
  - Entities: `&nbsp;`, `&quot;`
- Verify markdown syntax is clean (no malformed headings, broken lists)

**Pass Criteria:** All output files are clean UTF-8 markdown with no artifacts

---

### 6. Ingestion Report Completeness

- [ ] **Ingestion report generated** — `ingestion-report.yaml` exists
- [ ] **All required fields present** — `input_folder`, `processed_at`, `files`, `summary`
- [ ] **File-level metadata complete** — Each file entry has `original`, `format`, `converter`, `output`, `status`
- [ ] **Summary statistics accurate** — `total_files`, `processed`, `skipped`, `total_words` match file entries

**Validation:**
- Use `Read` tool to load `ingestion-report.yaml`
- Parse YAML and verify schema matches expected structure (see architecture doc)
- Verify `summary.total_files == len(files)`
- Verify `summary.processed == count(files where status="success")`
- Verify `summary.skipped == count(files where status="unsupported" or status="failed")`
- Verify `summary.total_words == sum(files[].word_count where status="success")`

**Pass Criteria:** Ingestion report is complete and accurate

---

## Quality Gate Decision

**PASS:** All 6 checklist items pass
**CONCERNS:** Items 1-2 pass, items 3-6 have minor issues (document in report, proceed)
**FAIL:** Any of items 1-2 fail, or item 3 fails (OCR < 85%), or item 5 fails (corrupt output)

**Action on FAIL:** Return to Stage 0, fix conversion issues, re-run ingestion

---

## Usage Example

```bash
# After running task-scan-and-convert.md:

# Step 1: Validate ingestion report exists
ls ingestion-report.yaml

# Step 2: Check summary stats
grep "total_files\|processed\|skipped" ingestion-report.yaml

# Step 3: Verify all raw outputs exist
ls raw/

# Step 4: Spot-check first converted file
head -n 50 raw/first-file.md

# Step 5: Run this checklist manually or via script
# (Future: automate with validation script)
```

---

## Integration Points

**Upstream:** task-scan-and-convert.md (doc-converter agent)
**Downstream:** task-analyze-transcript.md (transcript-analyst agent)
**Quality Guardian:** Uses this checklist to validate Stage 0 before proceeding to Stage 1

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 1.0.0 | Initial checklist for Stage 0 validation | Dex (Dev) |
