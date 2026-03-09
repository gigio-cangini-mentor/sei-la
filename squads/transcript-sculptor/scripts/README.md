# Transcript Sculptor — Conversion Scripts

Python scripts for multi-format document conversion to markdown.

## Scripts Overview

| Script | Purpose | Story | Status |
|--------|---------|-------|--------|
| `detect_format.py` | Format detection and routing pipeline | 1.2 | ✓ Complete |
| `convert_pdf.py` | PDF to markdown (digital + OCR) | 1.3 | Stub |
| `convert_docs.py` | Document conversion via Pandoc | 1.4 | Stub |
| `convert_subtitles.py` | Subtitle file conversion | 1.4 | Stub |

## Usage

### detect_format.py

Main entry point for the ingestion pipeline. Scans an input folder, detects file formats, routes to converters, and generates an ingestion report.

```bash
python3 detect_format.py --input /path/to/input --output /path/to/output
```

**Arguments:**
- `--input`: Input folder path (scanned recursively)
- `--output`: Output folder path (created if doesn't exist)

**Output:**
- `{output}/raw/*.md`: Converted markdown files
- `{output}/ingestion-report.yaml`: Processing summary

**Supported formats (Story 1.2):**
- ✓ `.md`, `.txt`: Passthrough (copy to raw/)
- ⏳ `.pdf`: Stub (Story 1.3)
- ⏳ `.docx`, `.epub`, `.rtf`, `.odt`: Stub (Story 1.4)
- ⏳ `.srt`, `.vtt`: Stub (Story 1.4)

**Edge cases handled:**
- Hidden files (starting with `.`) → skipped
- Symlinks → skipped
- Files without extension → skipped
- Unsupported formats → skipped with reason in report
- Empty folders → report with 0 files

### Example

```bash
# Create test input folder
mkdir -p test-input
echo "# Test Document" > test-input/doc.md
echo "Plain text content" > test-input/notes.txt

# Run pipeline
python3 scripts/detect_format.py --input test-input --output test-output

# Check results
cat test-output/ingestion-report.yaml
ls test-output/raw/
```

## Dependencies

- **Python:** 3.13+
- **Required:** PyYAML (`pip3 install pyyaml`)
- **Future (Story 1.3):** pymupdf, docling, surya-ocr
- **Future (Story 1.4):** Pandoc (CLI)

## Development

All scripts follow AIOS coding standards:
- Shebang: `#!/usr/bin/env python3`
- Type hints in function signatures
- Comprehensive docstrings
- Comments in English
- UTF-8 encoding explicit
- Executable permissions (`chmod +x`)

## Testing

Run detect_format.py on test data:

```bash
# Create test folder with edge cases
mkdir -p test-data
echo "content" > test-data/valid.md
echo "content" > test-data/.hidden.txt
echo "content" > test-data/noext
echo "content" > test-data/unsupported.pptx

# Run and verify
python3 detect_format.py --input test-data --output test-output
cat test-output/ingestion-report.yaml
```

Expected: 1 processed (valid.md), 3 skipped (hidden, no extension, unsupported)
