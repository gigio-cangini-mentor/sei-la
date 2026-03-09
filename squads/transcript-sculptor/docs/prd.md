# Transcript Sculptor — Product Requirements Document (PRD)

**Version:** 0.1
**Date:** 2026-02-22
**Author:** Morgan (PM) — based on @analyst (Atlas) brainstorm
**Status:** Approved

---

## Table of Contents

- [Goals and Background Context](#goals-and-background-context)
- [Requirements](#requirements)
- [Technical Assumptions](#technical-assumptions)
- [Epic List](#epic-list)
- [Epic 1 — Foundation and Ingestion](#epic-1--foundation-and-ingestion)
- [Epic 2 — Intelligent Analysis and Structuring](#epic-2--intelligent-analysis-and-structuring)
- [Epic 3 — Quality Assurance and Delivery](#epic-3--quality-assurance-and-delivery)
- [Next Steps](#next-steps)
- [Change Log](#change-log)

---

## Goals and Background Context

### Goals

- Transform raw transcriptions (hours of content) into structured `.md` documents with 10/10 editorial quality
- Preserve 100% of the speaker's linguistic DNA (no summarizing, no altering meaning)
- Structure content with titles, subtitles, zone context (Q&A, music, pitch, noise) and speaker identification
- Support multi-format ingestion (PDF with OCR, DOCX, EPUB, TXT, SRT, VTT, MD) as layer zero before processing
- Produce reusable material for future creation of ebooks, handouts, presentations, and structured methods
- Process long content (4h+ transcription / 40k+ words) via intelligent chunking

### Background Context

The user frequently works with transcriptions of courses, lectures, interviews, and workshops — materials that can last hours and reach tens of thousands of words. Raw content comes primarily in `.md` format (transcription output), but the input folder may also contain PDFs (including scanned with images), DOCX, and other formats that need conversion before processing.

The core problem is that raw transcriptions are unusable as reference material: they contain noise (murmurs, loose phrases, open microphone), lack structure (no titles, no topic separation), and mix content types (lecture, Q&A, music, sales pitch) without differentiation. The goal is to create an automated pipeline that transforms this raw material into masterpiece documents — structured, navigable, and faithful to the speaker's DNA — ready to serve as a base for derivative content creation.

---

## Requirements

### Functional Requirements

- **FR1:** The system must accept an input folder containing files in multiple formats (MD, PDF, DOCX, EPUB, TXT, SRT, VTT, RTF, ODT) and process them in batch
- **FR2:** For PDF files containing images or scanned pages, the system must perform high-quality OCR (via Docling + Surya-OCR) before any text processing
- **FR3:** For DOCX, EPUB, RTF, and ODT files, the system must convert to markdown preserving original structure (via Pandoc)
- **FR4:** The system must automatically detect the type of each file in the input folder and route to the appropriate converter
- **FR5:** The system must perform intelligent chunking of long transcriptions (40k+ words), dividing into blocks of ~5000-8000 words at natural topic change points
- **FR6:** The system must detect and identify distinct speakers in the content, even when the transcription does not explicitly provide this information
- **FR7:** The system must map content zones classifying excerpts as: [Lecture], [Q&A], [Music], [Sales Pitch], [Break], [Noise/Irrelevant], [Interview], [Dialogue]
- **FR8:** The system must remove noise (murmurs, loose phrases without context, accidental open microphone) without removing any substantive content
- **FR9:** The system must structure the final document with section titles (H2) based on topic changes and subtitles (H3) for sub-topics within each section
- **FR10:** The system must format dialogues with speaker identification (e.g., **Speaker 1:** or **Name:**) when there are multiple participants
- **FR11:** The system must adjust punctuation according to inferred tone of voice (energetic → exclamations; calm → soft punctuation; rhetorical question → question mark)
- **FR12:** The system must preserve 100% of original substantive content — no summarizing, no paraphrasing, no altering meaning. Only minimal clarity adjustments are permitted
- **FR13:** The system must preserve the speaker's linguistic DNA: vocabulary, idiomatic expressions, catchphrases, speech rhythm, formality level
- **FR14:** The system must generate a table of contents at the top of the final document with links to each section
- **FR15:** The system must include metadata in the final document: inferred title, identified speakers, estimated duration of original content, processing date, word count
- **FR16:** The system must perform intelligent merge of processed chunks, ensuring narrative continuity and coherence between sections
- **FR17:** The system must perform quality validation comparing the final document with the raw input, reporting: percentage of preserved content, DNA preservation score (1-10), structural coherence score (1-10)
- **FR18:** The system must mark doubtful excerpts with `[REVISAR]` when uncertain if content is relevant or noise, allowing later human review

### Non-Functional Requirements

- **NFR1:** The system must process a 1-hour transcription (~10k words) in less than 15 minutes of total pipeline time
- **NFR2:** The system must work 100% locally (macOS ARM64), without dependency on cloud APIs for core processing
- **NFR3:** The system must be operable via CLI (AIOS slash commands), without need for UI
- **NFR4:** OCR must achieve minimum accuracy of 93% on scanned documents in Portuguese
- **NFR5:** The system must support daily processing without degradation (near-daily use per user requirement)
- **NFR6:** The final document must be a valid `.md` file, renderable in any Markdown viewer (GitHub, Obsidian, VS Code)
- **NFR7:** The squad must follow standard AIOS architecture (agents/, tasks/, workflows/, checklists/, data/) and be activatable via slash commands (`/transcript-sculptor:*`)
- **NFR8:** External dependencies (Pandoc, Docling, Surya-OCR) must be installable via `brew` and `pip3` without manual compilation

---

## Technical Assumptions

### Repository Structure: Monorepo

The squad lives in `~/aios-core/squads/transcript-sculptor/` — AIOS expansion pack.

### Service Architecture

```
Squad AIOS (agents + tasks + workflows)
  ↕ orchestrates
Processing Pipeline (Python + Node.js)
  ↕ uses
External Tools (Pandoc, Docling, Surya-OCR, Tesseract)
```

- **Orchestration layer:** Markdown-driven (AIOS agents, tasks, workflows)
- **Conversion layer:** Python (Docling, Surya-OCR, pymupdf) + CLI (Pandoc)
- **Intelligent processing layer:** LLM via Claude Code (analysis, structuring, editing, QA)
- **Runtime:** macOS ARM64, local-only, no cloud APIs

### Testing Requirements

- Smoke test with short transcription (~1k words) before processing batch
- Automatic validation: content preservation percentage (>= 98%)
- Editorial quality checklist integrated in workflow

### Additional Technical Assumptions

- Python 3.13 via Homebrew (`/opt/homebrew/opt/python@3.13/bin`)
- Dependencies: `pandoc` (brew), `docling`, `surya-ocr`, `markitdown`, `pymupdf` (pip3)
- Tesseract 5.5.2 already installed
- Chunking of ~5000-8000 words to respect LLM context limits
- Output always UTF-8, GFM-compatible markdown

---

## Epic List

| Epic | Title | Goal |
|------|-------|------|
| **Epic 1** | Foundation and Ingestion | Install dependencies, create squad structure, implement multi-format conversion pipeline (PDF OCR, DOCX, EPUB → MD) |
| **Epic 2** | Intelligent Analysis and Structuring | Implement analysis agents (speaker detection, zone mapping, chunking) and editing (titles, cleanup, punctuation, formatting) |
| **Epic 3** | Quality Assurance and Delivery | Implement quality validation, chunk merging, metadata/summary generation, and complete end-to-end workflow |

---

## Epic 1 — Foundation and Ingestion

**Goal:** Establish the squad infrastructure and deliver a functional multi-format conversion pipeline, ensuring any input document is converted to high-quality raw markdown.

### Story 1.1 — Dependency Installation and Squad Setup

> As an AIOS user, I want the transcript-sculptor squad installed with all dependencies, so that I can start processing transcriptions.

**Acceptance Criteria:**
1. Pandoc installed via brew and accessible in PATH
2. Docling, surya-ocr, markitdown, and pymupdf installed via pip3
3. Squad folder structure created (agents/, tasks/, workflows/, checklists/, data/, templates/)
4. Squad README.md created with quick start
5. Squad activatable via `/transcript-sculptor:*`

### Story 1.2 — Format Detection and Routing Pipeline

> As a user, I want to point at a folder with mixed files and have the system automatically detect the type of each file, so that I don't need to manually convert.

**Acceptance Criteria:**
1. Recursive scan of input folder detects: .md, .pdf, .docx, .epub, .txt, .srt, .vtt, .rtf, .odt
2. Each file is classified and routed to the appropriate converter
3. Unsupported files listed in a skip report
4. Processing log generated with status of each file

### Story 1.3 — PDF Conversion with OCR

> As a user, I want PDFs (including scanned with images) converted to markdown with high-quality OCR, so that the content is accessible for processing.

**Acceptance Criteria:**
1. Digital-text PDFs extracted via pymupdf/pdftotext
2. Scanned PDFs processed via Docling + Surya-OCR
3. Automatic detection of scanned vs digital PDF
4. OCR accuracy >= 93% on PT-BR documents
5. Output: .md file with extracted text preserving paragraphs

### Story 1.4 — DOCX, EPUB and Other Format Conversion

> As a user, I want Word documents, EPUB, and other formats converted to markdown preserving structure, so that all materials are in uniform format.

**Acceptance Criteria:**
1. DOCX → MD via Pandoc preserving headings, lists, and tables
2. EPUB → MD via Pandoc preserving chapters
3. RTF and ODT → MD via Pandoc
4. SRT/VTT → MD with timestamps converted to context
5. Embedded images extracted to attachments folder

---

## Epic 2 — Intelligent Analysis and Structuring

**Goal:** Implement semantic analysis and structural editing agents that transform raw markdown into structured content, preserving 100% of the speaker's DNA.

### Story 2.1 — Agent transcript-analyst: Analysis and Mapping

> As a user, I want the system to analyze the transcription identifying speakers, content zones, and topic changes, so that structuring is intelligent and not arbitrary.

**Acceptance Criteria:**
1. Detection of distinct speakers with consistent labeling
2. Zone mapping: [Lecture], [Q&A], [Music], [Pitch], [Noise], [Break]
3. Identification of topic changes with section title suggestions
4. Output: analysis-map.yaml with complete transcription map
5. Intelligent chunking into blocks of ~5000-8000 words at natural break points

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

### Story 2.3 — Agent sculptor-chief: Orchestration and Merge

> As a user, I want the orchestrator to coordinate chunk processing and perform intelligent final merge ensuring continuity, so that the document appears to have been edited by a top human editor end-to-end.

**Acceptance Criteria:**
1. Sequential orchestration: analysis → editing → validation per chunk
2. Intelligent chunk merge with smooth transitions between sections
3. Conflict resolution when a topic crosses the boundary of two chunks
4. Table of contents generation with links to each section
5. Metadata at top: title, speakers, estimated duration, word count, date

---

## Epic 3 — Quality Assurance and Delivery

**Goal:** Implement automated quality validation and the end-to-end workflow that allows processing any transcription with a single command.

### Story 3.1 — Agent quality-guardian: Quality Validation

> As a user, I want the system to automatically validate the quality of the edited document, so that I can be confident nothing was lost and DNA was preserved.

**Acceptance Criteria:**
1. Raw vs edited comparison: content preservation percentage (target >= 98%)
2. DNA preservation score (1-10)
3. Structural coherence score (1-10)
4. List of removed excerpts for auditing
5. List of excerpts marked [REVISAR]
6. Quality report in markdown format

### Story 3.2 — End-to-End Workflow and Checklists

> As a user, I want to execute the complete pipeline with a single command, so that I can process transcriptions efficiently on a daily basis.

**Acceptance Criteria:**
1. Workflow `wf-transcript-to-masterpiece` functional end-to-end
2. Single command: `/transcript-sculptor:*` with input folder path
3. Editorial quality checklist integrated
4. Conversion quality checklist integrated
5. Support for partial reprocessing (e.g., re-edit only, without reconverting)
6. Complete processing log with timing per stage

### Story 3.3 — Smoke Test and Final Documentation

> As a user, I want complete documentation and tested examples, so that I can use the squad confidently and train others to use it.

**Acceptance Criteria:**
1. Smoke test executed with short real transcription (~1k words)
2. Smoke test executed with long transcription (~10k+ words)
3. Complete README.md with usage examples
4. Squad knowledge base (transcript-sculptor-kb.md) documented
5. Slash commands registered and functional

---

## Next Steps

### UX Expert Prompt

N/A — CLI-only squad, no UI requirements.

### Architect Prompt

> @architect — Execute `*create-full-stack-architecture` using the transcript-sculptor squad PRD at `docs/prd.md`. The squad is an AIOS expansion pack at `squads/transcript-sculptor/` with 5 agents, multi-format conversion pipeline (Python + Pandoc), and LLM processing for editorial structuring. Focus on: folder structure, data flow between stages, intermediate artifact schemas (analysis-map.yaml, etc.), and integration with existing AIOS ecosystem.

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 0.1 | Initial draft based on @analyst brainstorm | Morgan (PM) |
