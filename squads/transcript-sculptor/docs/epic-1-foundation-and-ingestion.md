# Epic 1 — Foundation and Ingestion

**Epic ID:** transcript-sculptor/epic-1
**Status:** Done
**Priority:** P0 — Critical Path
**Estimated Stories:** 4
**Owner:** @pm (Morgan)

---

## Goal

Establish the squad infrastructure and deliver a functional multi-format conversion pipeline, ensuring any input document is converted to high-quality raw markdown.

## Value Delivered

After this epic, the user can point at a folder with mixed files (PDF, DOCX, EPUB, MD, TXT, SRT, VTT) and get all of them converted to clean markdown — ready for the intelligence pipeline in Epic 2.

---

## Stories

### Story 1.1 — Dependency Installation and Squad Setup

> As an AIOS user, I want the transcript-sculptor squad installed with all dependencies, so that I can start processing transcriptions.

**Acceptance Criteria:**
1. Pandoc installed via brew and accessible in PATH
2. Docling, surya-ocr, markitdown, and pymupdf installed via pip3
3. Squad folder structure created (agents/, tasks/, workflows/, checklists/, data/, templates/)
4. Squad README.md created with quick start
5. Squad activatable via `/transcript-sculptor:*`

**Agent Assignment:** @dev
**Complexity:** S (Small)

---

### Story 1.2 — Format Detection and Routing Pipeline

> As a user, I want to point at a folder with mixed files and have the system automatically detect the type of each file, so that I don't need to manually convert.

**Acceptance Criteria:**
1. Recursive scan of input folder detects: .md, .pdf, .docx, .epub, .txt, .srt, .vtt, .rtf, .odt
2. Each file is classified and routed to the appropriate converter
3. Unsupported files listed in a skip report
4. Processing log generated with status of each file

**Agent Assignment:** @dev
**Complexity:** M (Medium)
**Dependencies:** Story 1.1

---

### Story 1.3 — PDF Conversion with OCR

> As a user, I want PDFs (including scanned with images) converted to markdown with high-quality OCR, so that the content is accessible for processing.

**Acceptance Criteria:**
1. Digital-text PDFs extracted via pymupdf/pdftotext
2. Scanned PDFs processed via Docling + Surya-OCR
3. Automatic detection of scanned vs digital PDF
4. OCR accuracy >= 93% on PT-BR documents
5. Output: .md file with extracted text preserving paragraphs

**Agent Assignment:** @dev
**Complexity:** L (Large)
**Dependencies:** Story 1.1, Story 1.2

---

### Story 1.4 — DOCX, EPUB and Other Format Conversion

> As a user, I want Word documents, EPUB, and other formats converted to markdown preserving structure, so that all materials are in uniform format.

**Acceptance Criteria:**
1. DOCX → MD via Pandoc preserving headings, lists, and tables
2. EPUB → MD via Pandoc preserving chapters
3. RTF and ODT → MD via Pandoc
4. SRT/VTT → MD with timestamps converted to context
5. Embedded images extracted to attachments folder

**Agent Assignment:** @dev
**Complexity:** M (Medium)
**Dependencies:** Story 1.1, Story 1.2

---

## Execution Order

```
Story 1.1 (Setup)
    ↓
Story 1.2 (Detection + Routing)
    ↓
Story 1.3 (PDF + OCR)  ←→  Story 1.4 (DOCX/EPUB/Other)  [parallel]
```

## Quality Gate

- [ ] All dependencies installed and verified
- [ ] All supported formats convert successfully
- [ ] Ingestion report generated correctly
- [ ] OCR accuracy validated on PT-BR sample
- [ ] Edge cases tested (empty files, corrupt PDFs, mixed encoding)

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 0.1 | Initial epic from PRD v0.1 | Morgan (PM) |
