# Task: Scan and Convert

**Task ID:** transcript-sculptor/scan-and-convert
**Version:** 1.0.0
**Status:** Production Ready
**Created:** 2026-02-22
**Category:** Stage 0 - Ingestion

---

## Executive Summary

This task performs multi-format document ingestion, converting all supported file types (PDF with OCR, DOCX, EPUB, SRT, VTT, MD, TXT, RTF, ODT) into normalized markdown files ready for semantic analysis. It produces raw/*.md files and an ingestion-report.yaml detailing conversion status, word counts, and OCR confidence scores.

**Workflow Position:** Stage 0 of full pipeline (first step)
**Success Definition:** >= 95% files successfully converted to .md
**Output Quality Gate:** QG-INGEST (conversion success rate + output validation)

---

## Executor Type

**Agent (100%)**
- doc-converter agent selects conversion tool per file format
- Executes Python scripts and CLI tools (Pandoc, Docling, PyMuPDF)
- Handles errors gracefully (log and continue, never crash)

---

## Inputs

```yaml
input_folder:
  field: "Path to folder containing mixed-format files"
  format: "Absolute directory path"
  required: true

output_folder:
  field: "Path to output directory (will create raw/ subfolder)"
  format: "Absolute directory path"
  required: true

options:
  ocr_enabled:
    default: true
    description: "Enable OCR for scanned PDFs (Docling + Surya)"
  recursive:
    default: true
    description: "Recursively scan subfolders"
  supported_formats:
    default: [".md", ".pdf", ".docx", ".epub", ".txt", ".srt", ".vtt", ".rtf", ".odt"]
```

---

## Action Items

### Step 1: Folder Scan and Format Detection

1. Recursively scan input_folder for all files
2. Filter by supported extensions (.md, .pdf, .docx, .epub, .txt, .srt, .vtt, .rtf, .odt)
3. For each file:
   - Detect format via extension
   - For PDFs: detect digital vs scanned (PyMuPDF metadata check)
   - Calculate file size
   - Classify by conversion strategy

### Step 2: Conversion Routing

For each file, route to appropriate converter:

| Format | Converter | Command/Script |
|--------|-----------|----------------|
| PDF (digital) | PyMuPDF | `scripts/convert_pdf.py --mode=digital {file}` |
| PDF (scanned) | Docling + Surya-OCR | `scripts/convert_pdf.py --mode=ocr {file}` |
| DOCX | Pandoc | `scripts/convert_docs.py --format=docx {file}` |
| EPUB | Pandoc | `scripts/convert_docs.py --format=epub {file}` |
| RTF/ODT | Pandoc | `scripts/convert_docs.py --format={fmt} {file}` |
| SRT/VTT | Custom parser | `scripts/convert_subtitles.py {file}` |
| MD/TXT | Passthrough | Encoding normalization only |

### Step 3: Execute Conversions

1. For each file, execute appropriate converter
2. Capture stdout/stderr for error logging
3. Validate output is non-empty (>= 100 characters)
4. Calculate word count of output
5. For OCR conversions: extract confidence score from Surya output
6. Write output to `raw/{filename}.md` (sanitized filename)

### Step 4: Output Validation

For each converted file:
1. Check output exists and is readable
2. Verify UTF-8 encoding (attempt read, handle encoding errors)
3. Calculate word count
4. Flag suspiciously low word counts relative to file size
5. For scanned PDFs: flag if OCR confidence < 90%

### Step 5: Generate Ingestion Report

Write `ingestion-report.yaml` with:

```yaml
ingestion_report:
  input_folder: "/path/to/input"
  output_folder: "/path/to/output"
  processed_at: "2026-02-22T14:30:00Z"
  files:
    - original: "palestra-dia1.md"
      format: "markdown"
      converter: "passthrough"
      output: "raw/palestra-dia1.md"
      status: "success"
      word_count: 42350
    - original: "material.pdf"
      format: "pdf-scanned"
      converter: "docling+surya"
      output: "raw/material.md"
      status: "success"
      word_count: 8200
      ocr_confidence: 0.96
    - original: "slides.pptx"
      format: "pptx"
      converter: "skipped"
      output: null
      status: "unsupported"
      reason: "PPTX not in supported formats"
  summary:
    total_files: 10
    processed: 8
    skipped: 1
    failed: 1
    total_words: 85420
    conversion_rate: 0.80
```

### Step 6: Error Handling

For each failed conversion:
1. Log error message with full traceback
2. Include diagnostic information (file size, format, tool used)
3. Suggest alternative approach (e.g., "Try manual OCR with Adobe")
4. Mark status as "failed" in ingestion report
5. Continue processing remaining files

---

## Outputs

```yaml
raw_markdown_files:
  location: "{output_folder}/raw/*.md"
  format: "UTF-8 encoded markdown (GFM)"
  description: "Normalized markdown for each successfully converted file"

ingestion_report:
  location: "{output_folder}/ingestion-report.yaml"
  format: "YAML"
  description: "Complete conversion status, word counts, errors"
```

---

## Quality Gates

### QG-INGEST: Ingestion Quality Gate

**Blocking Criteria:**
- Conversion success rate >= 95% (processed / total_files)
- All successful conversions have word_count > 0
- All outputs are valid UTF-8
- OCR confidence >= 90% for scanned PDFs (or flagged for review)

**Non-Blocking Warnings:**
- OCR confidence 85-90% (flag for manual review)
- Word count < 100 (possibly empty document)
- Encoding detection uncertainty

**Pass/Fail:**
- PASS: >= 95% success, all critical validations passed
- CONCERNS: 90-95% success, some low-confidence OCR
- FAIL: < 90% success, or critical validation failures

---

## Dependencies

### Python Dependencies (requirements.txt)
- `docling>=2.0.0` — PDF OCR pipeline
- `surya-ocr>=0.8.0` — High-quality OCR engine
- `markitdown>=0.1.0` — Multi-format fallback converter
- `pymupdf>=1.24.0` — Digital PDF text extraction

### External Tools
- **Pandoc** (`brew install pandoc`) — Office format conversion
- **Tesseract 5.5.2** — OCR backend (already installed)

### Python Scripts
- `scripts/detect_format.py` — Format detection and routing
- `scripts/convert_pdf.py` — PDF conversion (digital + OCR modes)
- `scripts/convert_docs.py` — Office format conversion via Pandoc
- `scripts/convert_subtitles.py` — SRT/VTT parsing

---

## Error Recovery

### Pandoc Conversion Failure
**Action:** Fallback to MarkItDown converter
**Command:** `python3 -c "from markitdown import MarkItDown; md = MarkItDown(); md.convert('{file}')"`

### OCR Failure (Surya)
**Action:** Fallback to Tesseract
**Command:** `tesseract {pdf_page}.png stdout -l por`

### Encoding Detection Failure
**Action:** Try common encodings in order: UTF-8, Latin-1, Windows-1252, UTF-16
**Fallback:** Mark as failed with encoding error

### Unsupported Format
**Action:** Log as "skipped" in ingestion report
**Suggestion:** "Convert to supported format (PDF/DOCX/EPUB/MD) before processing"

---

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Conversion Speed | <= 30s per 10k words | Total processing time |
| Success Rate | >= 95% | Successful conversions / Total files |
| OCR Accuracy | >= 93% (scanned PDFs) | Surya-OCR confidence score |
| Memory Usage | <= 2GB peak | Per-file conversion |

---

## Testing Checklist

- [ ] Digital PDF conversion (text-based)
- [ ] Scanned PDF conversion (OCR required)
- [ ] DOCX with headings and tables
- [ ] EPUB with chapters
- [ ] SRT/VTT subtitle files
- [ ] MD/TXT passthrough with encoding detection
- [ ] RTF/ODT via Pandoc
- [ ] Mixed folder with multiple formats
- [ ] Error handling (corrupted file, unsupported format)
- [ ] Large file handling (>50MB PDF)

---

## Integration Points

### Upstream Dependencies
- **sculptor-chief** -- Provides input_folder path

### Downstream Consumers
- **transcript-analyst** -- Receives raw/*.md + ingestion-report.yaml

### Tool Ownership
- **doc-converter agent** -- Executes this task

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 1.0.0 | Initial task definition | Dex (Dev) |
