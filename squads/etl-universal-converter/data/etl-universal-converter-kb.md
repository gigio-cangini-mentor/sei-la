# ETL Universal Converter — Knowledge Base

## Core Concept

Content ETL: Extract any file → Transform to normalized markdown → Load next to original.

## Routing Matrix (Quick Reference)

| Extension | Category | Processor | Delegated? |
|-----------|----------|-----------|------------|
| .mp4 .mkv .webm .avi .mov | video | media-processor | YES |
| .mp3 .m4a .wav .flac .ogg | audio | media-processor | YES |
| .pdf .epub .mobi .azw | book | book-to-markdown | YES |
| .docx .rtf .odt | document | book-to-markdown | YES |
| .csv .tsv .xlsx .xls .ods | spreadsheet | convert-spreadsheet | NO |
| .pptx .ppt .odp | presentation | convert-presentation | NO |
| .png .jpg .jpeg .tiff .bmp .webp | image | convert-image-ocr | NO |
| .json .yaml .yml .xml .toml | data | convert-data-file | NO |
| .txt .md .rst .log | text | convert-text | NO |

## Python Dependencies

```bash
pip install polars openpyxl python-pptx pytesseract Pillow langdetect pydantic PyYAML tabulate chardet
```

## System Dependencies

```bash
# macOS
brew install tesseract tesseract-lang

# Verify
tesseract --version
```

## Common Patterns

### Single File
```
*convert ~/docs/report.xlsx
→ classify → spreadsheet → convert-spreadsheet → normalize → validate → save
→ Output: ~/docs/report.md
```

### Batch
```
*batch ~/project/materials/
→ scan → classify all → group by type → process each → validate → summary
→ Output: .md files next to each original
```

### Delegation
```
*convert ~/video/talk.mp4
→ classify → video → delegate to media-processor
→ media-processor does: transcribe → sculpt
→ etl-chief does: normalize frontmatter → validate → save
→ Output: ~/video/talk.md
```

## Frontmatter Contract

Every output MUST have:
- title, source_type, source_format, source_path, date_processed, word_count

## Quality Verification (v1.1.0)

Post-extraction quality pipeline that compares output against original source.

### Pipeline
```
CONVERT → VALIDATE (format) → VERIFY QUALITY (source vs output) → SAVE
                                      │
                              ┌───────┼───────┐
                            PASS    RETRY    HUMAN
                           (≥7.0)  (5-6.9)  (<5.0)
```

### Scoring (5 dimensions, 0-10 scale)
| Dimension | Weight | What it checks |
|-----------|--------|----------------|
| Fidelity | 35% | Text/data accuracy vs source |
| Completeness | 30% | Content coverage, nothing lost |
| Structure | 20% | Headings, lists, tables preserved |
| Metadata | 10% | Frontmatter accuracy |
| Readability | 5% | Clean markdown output |

### Commands
```
*verify ~/docs/report.md              # Single file quality check
*qa-batch ~/project/materials/         # Batch quality check
*review ~/scan/document.md             # Human review for flagged file
*qa-batch ~/dir/ --review              # Batch + auto human review
```

### Thresholds (type-adjusted)
| Type | Default | Adjusted | Reason |
|------|---------|----------|--------|
| Standard | 7.0 | 7.0 | — |
| Spreadsheet | 7.0 | 7.5 | Data must be exact |
| Image (OCR) | 7.0 | 6.0 | OCR is inherently lossy |
| Video/Audio | 7.0 | 6.5 | Transcription varies by quality |

### Human Review Flow
Score < threshold → queue → reviewer gets dashboard with:
- Score breakdown per dimension
- Side-by-side source vs output samples
- Options: Approve / Approve with note / Re-extract / Edit / Reject / Skip

### Quality Reports
Saved to `{output_dir}/.qa/`:
- `{filename}-quality-report.md` — per-file report
- `review-history.yaml` — all review decisions
- `review-queue.yaml` — pending reviews
- `qa-summary-{date}.md` — batch summary

## Error Philosophy

- Never crash the batch for one file
- Never save invalid output
- Never modify source files
- Always explain skip reasons
- Always verify extraction against source [SOURCE: v1.1.0]
- Never auto-retry below 5.0 (structural issue, not tuning)
