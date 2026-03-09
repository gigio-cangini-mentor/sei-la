# Transcript Sculptor — Squad Knowledge Base

**Version:** 1.0.0
**Last Updated:** 2026-02-22
**Maintainer:** AIOS Development Team

---

## Table of Contents

- [Squad Overview](#squad-overview)
- [Pipeline Data Flow](#pipeline-data-flow)
- [Agent Descriptions](#agent-descriptions)
- [Intermediate Artifacts](#intermediate-artifacts)
- [DNA Preservation Rules](#dna-preservation-rules)
- [Scoring System](#scoring-system)
- [Common Issues and Resolutions](#common-issues-and-resolutions)
- [Glossary of Terms](#glossary-of-terms)

---

## Squad Overview

### Purpose

The **Transcript Sculptor** squad transforms raw transcriptions and multi-format documents into editorial-quality structured markdown with 100% DNA preservation. It processes hours of content (40k+ words) through a 5-stage intelligent pipeline, producing publication-ready documents with table of contents, metadata, and comprehensive quality reports.

### Core Capabilities

1. **Multi-Format Ingestion** — Converts PDF (with OCR), DOCX, EPUB, SRT, VTT, RTF, ODT to markdown
2. **Intelligent Analysis** — Detects speakers, maps content zones, identifies topic changes
3. **Structural Editing** — Adds titles, formats dialogues, removes noise while preserving DNA
4. **Quality Validation** — Scores content preservation, DNA integrity, structural coherence
5. **Smart Delivery** — Merges chunks with smooth transitions, generates TOC and metadata

### Target Audience

- Content creators processing course transcriptions
- Educators converting lectures to structured materials
- Researchers working with interview transcripts
- Publishers preparing manuscripts from raw recordings
- Anyone with long-form audio/video transcription needing editorial polish

### Key Differentiators

- **DNA Preservation First** — Never summarizes, never paraphrases, marks ambiguity with `[REVISAR]`
- **Intelligent Chunking** — Processes long content (40k+ words) via natural topic boundaries
- **Multi-Speaker Support** — Automatically detects and formats speaker attributions
- **Zone Classification** — Identifies Lecture, Q&A, Music, Pitch, Noise sections
- **Reprocessing Support** — Resume from any stage without rerunning expensive operations

---

## Pipeline Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         INPUT FOLDER                             │
│  .md  .pdf  .docx  .epub  .srt  .vtt  .txt  .rtf  .odt         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 0: INGESTION (doc-converter)                             │
│  • Format detection & routing                                    │
│  • PDF OCR (Docling + Surya-OCR for scanned)                   │
│  • Pandoc conversion (DOCX, EPUB, RTF, ODT)                     │
│  • SRT/VTT timestamp parsing                                     │
│  • Output: raw/*.md + ingestion-report.yaml                     │
│  • Quality Gate: >= 95% conversion success                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 1: ANALYSIS (transcript-analyst)                         │
│  • Speaker detection (linguistic patterns)                       │
│  • Zone mapping ([Lecture], [Q&A], [Music], [Noise])           │
│  • Topic change detection (title suggestions)                    │
│  • Intelligent chunking (~5000-8000 words per chunk)            │
│  • Output: analysis/*.yaml + chunks/*.md (raw)                  │
│  • Quality Gate: 100% zone coverage, chunk boundaries valid     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 2: EDITING (transcript-editor)                           │
│  • Structure with H2/H3 headings                                 │
│  • Format speaker dialogues (**Speaker:**)                       │
│  • Remove noise (murmurs, open mic, context-free phrases)       │
│  • Adjust punctuation per tone (energetic → !, calm → .)        │
│  • Mark ambiguity with [REVISAR]                                 │
│  • Track DNA indicators (catchphrases, formality, rhythm)       │
│  • Output: chunks/*-edited.md (with frontmatter)                │
│  • Quality Gate: DNA >= 9.0, Content >= 98%, Coherence >= 8.5  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 3: VALIDATION (quality-guardian)                         │
│  • Raw vs edited comparison (word count, content delta)         │
│  • Score content preservation (target >= 98%)                   │
│  • Score DNA preservation (catchphrases, tone) (target >= 9.0) │
│  • Score structural coherence (headings, flow) (target >= 8.5) │
│  • Audit removed excerpts                                        │
│  • Verdict: PASS / CONCERNS / FAIL                              │
│  • Output: reports/quality-report.yaml                          │
│  • Quality Gate: All thresholds met, zero paraphrasing          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 4: DELIVERY (sculptor-chief)                             │
│  • Intelligent chunk merge (overlap removal, smooth transitions)│
│  • Table of Contents generation (H2/H3 hierarchy + anchor links)│
│  • Metadata header (title, speakers, duration, scores, date)    │
│  • Final assembly (frontmatter + TOC + content + footer)        │
│  • Output: {source}-masterpiece.md + processing-log.yaml        │
│  • Quality Gate: Valid markdown, functional TOC, metadata complete│
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
              📄 MASTERPIECE.MD (Final Output)
```

### Data Flow Summary

1. **Input** → Mixed-format files
2. **Stage 0** → Converts everything to raw markdown
3. **Stage 1** → Analyzes semantic structure, creates chunk boundaries
4. **Stage 2** → Edits each chunk independently (structure, cleanup, DNA preservation)
5. **Stage 3** → Validates quality per chunk, aggregates scores
6. **Stage 4** → Merges chunks into final document with TOC and metadata
7. **Output** → Publication-ready masterpiece.md

---

## Agent Descriptions

### 1. sculptor-chief (Orchestrator)

**Role:** Pipeline coordinator and final assembler

**Responsibilities:**
- Execute end-to-end workflow (`wf-transcript-to-masterpiece.md`)
- Manage chunking strategy (determines when to split long transcriptions)
- Coordinate stage transitions and error handling
- Perform final chunk merge with intelligent transition smoothing
- Generate table of contents with anchor links
- Create metadata header (YAML frontmatter)
- Write processing log with timing and metrics

**Inputs:**
- Input folder path (mixed-format files)
- Reprocessing flags (optional: `--from=stage1`, `--from=stage2`, etc.)

**Outputs:**
- `{source}-masterpiece.md` — Final publication-ready document
- `processing-log.yaml` — Pipeline timing and status
- `pipeline-state.yaml` — Resumable state for reprocessing

**Key Skills:**
- Workflow orchestration
- Error recovery strategies
- Markdown assembly and formatting
- TOC generation with heading extraction

---

### 2. doc-converter (Tier 0)

**Role:** Multi-format ingestion specialist

**Responsibilities:**
- Scan input folder and catalog all files by extension
- Route each file to appropriate converter (PDF → Docling, DOCX → Pandoc, etc.)
- Execute format conversion scripts (Python + CLI tools)
- Perform OCR on scanned PDFs (Docling + Surya-OCR)
- Extract digital PDF text (PyMuPDF)
- Parse SRT/VTT timestamps and convert to context markers
- Generate ingestion report with conversion status
- Run conversion quality checklist

**Inputs:**
- `{input_folder}` — Directory with mixed-format files

**Outputs:**
- `raw/*.md` — Converted markdown files (one per input file)
- `ingestion-report.yaml` — Conversion status, word counts, OCR confidence

**Key Skills:**
- File type detection and routing
- Python script execution via Bash
- OCR quality assessment
- Pandoc configuration for structure preservation

**Tools Used:**
- Docling + Surya-OCR (scanned PDF OCR)
- PyMuPDF (digital PDF text extraction)
- Pandoc (DOCX, EPUB, RTF, ODT conversion)
- Custom SRT/VTT parser (timestamp → context)

---

### 3. transcript-analyst (Tier 1)

**Role:** Semantic analysis and intelligent chunking

**Responsibilities:**
- Detect distinct speakers via linguistic patterns (vocabulary, tone, formality)
- Map content zones ([Lecture], [Q&A], [Music], [Sales Pitch], [Noise], [Break])
- Identify topic changes and suggest section titles
- Determine intelligent chunk boundaries at natural breaks (topic transitions, Q&A transitions)
- Generate analysis map with complete semantic structure
- Execute chunking script to physically split text

**Inputs:**
- `raw/*.md` — Converted raw markdown from Stage 0

**Outputs:**
- `analysis/{source}-analysis-map.yaml` — Semantic structure, speakers, zones, chunk boundaries
- `chunks/{source}-chunk-{id}.md` — Raw chunks (not yet edited)

**Key Skills:**
- Semantic analysis via LLM
- Speaker pattern recognition
- Topic boundary detection
- Intelligent chunking strategy (balances size and natural breaks)

**Analysis Map Schema:**
- `speakers` — List of detected speakers with characteristics
- `zones` — List of content zones with type, start/end, title suggestions
- `chunks` — List of chunk boundaries with overlap context
- `noise_candidates` — List of potential noise for removal with confidence scores

---

### 4. transcript-editor (Tier 1)

**Role:** Structural editing and DNA preservation

**Responsibilities:**
- Structure content with H2/H3 headings (based on analysis-map title suggestions)
- Format speaker dialogues (`**Speaker Name:**` before each speech)
- Remove noise zones (murmurs, background music, open mic, context-free phrases)
- Adjust punctuation to match inferred tone of voice (energetic → !, calm → ., rhetorical → ?)
- Mark ambiguous content with `[REVISAR]` when uncertain if noise or substantive
- Preserve linguistic DNA: vocabulary, catchphrases, formality level, speech rhythm
- Track DNA indicators in chunk frontmatter (catchphrases preserved, tone adjustments)
- Generate removal log (what was removed and why)

**Inputs:**
- `chunks/{source}-chunk-{id}.md` — Raw chunks from Stage 1
- `analysis/{source}-analysis-map.yaml` — Semantic guide

**Outputs:**
- `chunks/{source}-chunk-{id}-edited.md` — Edited chunk with YAML frontmatter

**Key Skills:**
- Structural markdown editing
- Dialogue formatting
- Tone-based punctuation adjustment
- Conservative noise removal (when in doubt, mark `[REVISAR]`)
- DNA preservation auditing

**Frontmatter Schema:**
- `chunk_id` — Chunk identifier
- `source` — Source raw file
- `word_count_before` / `word_count_after` — Content metrics
- `words_removed` — Total removed
- `removal_log` — List of removed excerpts with reasons
- `dna_indicators` — Catchphrases preserved, tone adjustments, paraphrased sentences (should be 0)

---

### 5. quality-guardian (Tier 2)

**Role:** Quality validation and auditing

**Responsibilities:**
- Compare raw vs edited chunks (word count delta, content preservation)
- Score content preservation (target >= 98%)
- Score DNA preservation (catchphrases, tone, formality) (target >= 9.0/10)
- Score structural coherence (heading hierarchy, logical flow) (target >= 8.5/10)
- Audit all removed excerpts (verify removals are justified)
- List all excerpts marked `[REVISAR]` for human review
- Generate aggregated quality report
- Issue verdict (PASS / CONCERNS / FAIL)

**Inputs:**
- `raw/{source}.md` — Original raw markdown
- `chunks/{source}-chunk-{id}-edited.md` — All edited chunks
- `analysis/{source}-analysis-map.yaml` — Analysis guide

**Outputs:**
- `reports/{source}-quality-report.yaml` — Aggregated scores, audit logs, verdict

**Key Skills:**
- Semantic comparison (LLM-based)
- DNA auditing (catchphrase detection, tone analysis)
- Statistical analysis (word count, preservation percentage)
- Verdict decision logic (thresholds, multi-iteration tolerance)

**Scoring Criteria:**

**Content Preservation (target >= 98%):**
- (words_final - words_removed_noise) / words_original × 100

**DNA Preservation (target >= 9.0/10):**
- Catchphrases preserved: +2 points per catchphrase (max 4)
- Tone consistency: +3 points if maintained
- Formality level maintained: +2 points
- Paraphrasing penalty: -10 points per paraphrased sentence
- Vocabulary alteration penalty: -5 points per altered term

**Structural Coherence (target >= 8.5/10):**
- Logical heading hierarchy: +3 points
- Smooth transitions between chunks: +2 points
- Consistent speaker attribution: +2 points
- Zone context clarity: +2 points
- Abrupt transitions penalty: -3 points per occurrence

**Verdict Logic:**
- **PASS:** All scores meet thresholds
- **CONCERNS:** Minor issues (< 3 violations below threshold by < 5%)
- **FAIL:** Major issues (any score < threshold by >= 5% or paraphrasing detected)

---

## Intermediate Artifacts

### ingestion-report.yaml

**Generated by:** doc-converter (Stage 0)

**Purpose:** Track conversion status, word counts, OCR confidence

**Schema:**
```yaml
ingestion_report:
  input_folder: "/path/to/input"
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
  summary:
    total_files: 2
    processed: 2
    skipped: 0
    total_words: 50550
```

**Key Fields:**
- `converter` — Which tool was used (passthrough, docling+surya, pandoc, srt-parser)
- `status` — success, failed, skipped
- `ocr_confidence` — For scanned PDFs (0.0-1.0, target >= 0.93)
- `summary.total_words` — Total content processed

---

### analysis-map.yaml

**Generated by:** transcript-analyst (Stage 1)

**Purpose:** Complete semantic structure of transcription — speakers, zones, chunks, noise candidates

**Schema:**
```yaml
analysis_map:
  source_file: "raw/palestra-dia1.md"
  total_words: 42350
  language: "pt-BR"
  speakers:
    - id: "speaker-1"
      label: "Palestrante Principal"
      estimated_percentage: 85
      tone: "energetic"
      characteristics: ["usa 'galera', 'olha só', 'percebam'"]
    - id: "speaker-2"
      label: "Participante (Q&A)"
      estimated_percentage: 10
      tone: "neutral"
  zones:
    - type: "lecture"
      start_word: 0
      end_word: 12000
      title_suggestion: "Fundamentos do Método"
    - type: "qa"
      start_word: 12001
      end_word: 15000
      title_suggestion: "Perguntas e Respostas — Bloco 1"
    - type: "noise"
      start_word: 15201
      end_word: 15400
      context: "Murmúrios e conversas paralelas"
      action: "remove"
  chunks:
    - id: "chunk-001"
      start_word: 0
      end_word: 7500
      zones: ["lecture"]
      overlap_context: "...último parágrafo para contexto..."
  noise_candidates:
    - start_word: 15201
      end_word: 15400
      text_preview: "...então... [inaudível]..."
      confidence: 0.92
      recommendation: "remove"
```

**Key Fields:**
- `speakers` — Detected speakers with linguistic characteristics (used for dialogue formatting)
- `zones` — Content classification (lecture, qa, music, pitch, noise, break)
- `chunks` — Intelligent chunk boundaries at natural breaks
- `noise_candidates` — Potential removals with confidence scores

---

### chunk-{id}-edited.md

**Generated by:** transcript-editor (Stage 2)

**Purpose:** Edited chunk with structure, cleanup, and DNA tracking

**Format:**
```markdown
---
chunk_id: "chunk-001"
source: "raw/palestra-dia1.md"
word_count_before: 7500
word_count_after: 7320
words_removed: 180
removal_log:
  - type: "noise"
    text: "[murmúrios inaudíveis]"
    reason: "No substantive content"
  - type: "review"
    text: "Alguém pode fechar a porta?"
    reason: "Possibly relevant context"
    action: "[REVISAR]"
dna_indicators:
  catchphrases_preserved: ["galera", "olha só", "percebam"]
  tone_adjustments: 3
  paraphrased_sentences: 0
---

## Fundamentos do Método

**Palestrante Principal:**

Galera, olha só — o que eu quero mostrar pra vocês hoje...
```

**Key Fields:**
- `removal_log` — All removed excerpts with justifications (auditable)
- `dna_indicators` — Catchphrases preserved, tone adjustments, paraphrasing count
- Frontmatter validates DNA preservation rules compliance

---

### quality-report.yaml

**Generated by:** quality-guardian (Stage 3)

**Purpose:** Aggregated quality scores, audit logs, verdict

**Schema:**
```yaml
quality_report:
  source: "raw/palestra-dia1.md"
  output: "palestra-dia1-masterpiece.md"
  processed_at: "2026-02-22T15:45:00Z"
  scores:
    content_preservation: 98.2
    dna_preservation: 9.1
    structural_coherence: 8.8
    overall: 8.7
  content_analysis:
    words_original: 42350
    words_final: 41580
    words_removed: 770
    words_removed_noise: 680
    words_removed_duplicates: 90
    words_marked_review: 12
  removed_excerpts:
    - text: "[murmúrios inaudíveis]..."
      reason: "noise"
  review_excerpts:
    - text: "Alguém pode fechar a porta?"
      location: "Section 3, paragraph 12"
      reason: "Possibly relevant stage direction"
  dna_analysis:
    catchphrases_found: ["galera", "olha só", "percebam"]
    catchphrases_preserved: 4
    catchphrases_lost: 0
    tone_consistency: "high"
    formality_level_maintained: true
  verdict: "PASS"
```

**Key Fields:**
- `scores` — Content, DNA, coherence, overall (target thresholds: 98%, 9.0, 8.5)
- `removed_excerpts` — All removals for audit trail
- `review_excerpts` — All `[REVISAR]` markers for human review
- `verdict` — PASS / CONCERNS / FAIL

---

## DNA Preservation Rules

**These rules are NON-NEGOTIABLE. Violation = Automatic FAIL verdict.**

### Rule 1: NEVER Summarize
**Preserve all substantive content verbatim.** No condensing, no "in other words", no paraphrasing.

**Example Violation:**
```
Original: "Galera, eu vou falar pra vocês sobre três coisas importantes hoje. A primeira é mindset, a segunda é estratégia, e a terceira é execução."

WRONG: "O palestrante abordará três temas: mindset, estratégia e execução."
RIGHT: [Keep original verbatim]
```

---

### Rule 2: NEVER Paraphrase
**Keep speaker's exact words.** Even if you could say it "better", don't.

**Example Violation:**
```
Original: "Tá ligado? É tipo aquela vibe de..."

WRONG: "Você entende? É semelhante àquela sensação de..."
RIGHT: "Tá ligado? É tipo aquela vibe de..."
```

---

### Rule 3: NEVER Alter Vocabulary
**Preserve idiosyncrasies.** "Galera" stays "galera", not "pessoal". "Tá" stays "tá", not "está".

**Example:**
```
Catchphrase: "Olha só, galera"
Informal terms: "tá", "né", "tipo", "sacou"
Regional expressions: "trem bão", "viu", "uai"

All must be preserved exactly as spoken.
```

---

### Rule 4: NEVER Change Formality
**Informal stays informal.** Formal stays formal. Don't "correct" the speaker's register.

**Example Violation:**
```
Original: "Ó, vou te falar um negócio, tá ligado?"

WRONG: "Gostaria de compartilhar algo com você, compreende?"
RIGHT: "Ó, vou te falar um negócio, tá ligado?"
```

---

### Rule 5: ALWAYS Mark Ambiguity
**Use `[REVISAR: {reason}]` when uncertain.** Better to flag for human review than to make wrong decision.

**When to mark REVISAR:**
- Excerpt could be noise OR could be relevant context
- Unclear if speaker attribution is correct
- Unclear if punctuation reflects intended tone
- Any doubt about meaning or intent

**Example:**
```
[ruído de porta abrindo]
"Alguém pode fechar a porta?"
[volta ao conteúdo]

Editor decision:
"[REVISAR: Possível direção de palco relevante ou interrupção irrelevante?]
Alguém pode fechar a porta?"
```

---

### Rule 6: ALWAYS Preserve Catchphrases
**DNA markers MUST appear in final output.** These are identity signals.

**Catchphrase Examples:**
- "Galera, olha só"
- "Percebam"
- "Sacou?"
- "Deixa eu explicar"
- "Tipo assim"

**Detection:** Look for repeated phrases (appears >= 3 times in transcription).

**Validation:** quality-guardian checks if catchphrases from analysis-map appear in edited chunks.

---

## Scoring System

### Content Preservation Score

**Formula:**
```
content_preservation = (words_final - words_removed_noise) / words_original × 100
```

**Target:** >= 98%

**What counts as "removed content":**
- Substantive sentences, phrases, ideas
- Questions from participants
- Speaker attributions
- Context markers ([Q&A], [Lecture])

**What does NOT count as "removed content":**
- Noise (murmurs, [inaudível], open mic moments)
- Duplicate sentences (merge artifacts)
- Timestamps from SRT/VTT
- Stage directions ("alguém desligou o microfone?")

**Example:**
```
Original: 10,000 words
Noise removed: 200 words
Duplicates removed: 50 words
Final: 9,750 words

content_preservation = (9750 - 200) / 10000 × 100 = 95.5%
FAIL (< 98%)
```

---

### DNA Preservation Score

**Formula:** Additive scoring (max 10.0)

**Scoring Breakdown:**

| Criterion | Points | How to Assess |
|-----------|--------|---------------|
| Catchphrases preserved | +2.0 per catchphrase (max 4 catchphrases) | Compare analysis-map catchphrases vs final document |
| Tone consistency maintained | +3.0 | Check if energetic/calm/formal tone reflected in punctuation |
| Formality level unchanged | +2.0 | Check if "tá" not changed to "está", "galera" not changed to "pessoal" |
| Zero paraphrasing | +0.0 (baseline) | Any paraphrased sentence = -10.0 penalty |
| Vocabulary alterations | -5.0 per alteration | Check if speaker's specific terms were "corrected" |

**Target:** >= 9.0/10

**Example:**
```
Catchphrases preserved: 3 → +6.0
Tone consistency: high → +3.0
Formality maintained: yes → +2.0
Paraphrasing: 0 sentences → 0.0
Vocabulary changes: 0 → 0.0

DNA score = 6.0 + 3.0 + 2.0 = 11.0 (capped at 10.0)
PASS
```

---

### Structural Coherence Score

**Formula:** Additive scoring (max 10.0)

**Scoring Breakdown:**

| Criterion | Points | How to Assess |
|-----------|--------|---------------|
| Logical heading hierarchy | +3.0 | Check H2 (main topics) and H3 (subtopics) are properly nested |
| Smooth chunk transitions | +2.0 | Check if merge points have natural flow, no abrupt topic jumps |
| Consistent speaker attribution | +2.0 | Check if speaker labels are consistent throughout (`**Speaker 1:**` not mixed with `**Participante:**`) |
| Zone context clarity | +2.0 | Check if [Q&A], [Lecture] markers help navigation |
| Table of contents functional | +1.0 | Check if TOC links work and cover all sections |
| Abrupt transitions penalty | -3.0 per occurrence | Flag transitions marked with `[TRANSIÇÃO]` due to merge failure |

**Target:** >= 8.5/10

**Example:**
```
Heading hierarchy: proper nesting → +3.0
Chunk transitions: smooth → +2.0
Speaker labels: consistent → +2.0
Zone markers: clear → +2.0
TOC: functional → +1.0
Abrupt transitions: 0 → 0.0

coherence_score = 3.0 + 2.0 + 2.0 + 2.0 + 1.0 = 10.0
PASS
```

---

## Common Issues and Resolutions

### Issue 1: Low OCR Confidence

**Symptom:** `ingestion-report.yaml` shows OCR confidence < 0.90 for scanned PDF

**Root Cause:**
- Low-quality scan (blurry, skewed, poor contrast)
- Non-standard font (handwriting, artistic typography)
- PT-BR language model not optimized for specific dialect

**Resolution:**
1. Check if digital PDF extraction is possible (some PDFs have embedded text layer)
2. Re-scan document at higher DPI (600+ recommended)
3. Pre-process image (deskew, contrast adjustment) before OCR
4. Flag document for manual review if confidence < 0.85

**Command:**
```bash
# Retry with PyMuPDF (digital extraction)
python scripts/convert_pdf.py --force-digital material.pdf
```

---

### Issue 2: Speaker Detection Failure

**Symptom:** `analysis-map.yaml` shows generic speaker labels ("Speaker 1", "Speaker 2") instead of identified names

**Root Cause:**
- Single-speaker transcription (no dialogue)
- Speakers not linguistically distinct (similar vocabulary, tone)
- Transcription lacks speaker attribution cues

**Resolution:**
1. Accept generic labels if content is primarily monologue
2. Manually update `analysis-map.yaml` with known speaker names if available
3. Re-run Stage 2 (editing) after manual speaker label update

**Manual Edit Example:**
```yaml
speakers:
  - id: "speaker-1"
    label: "Ana Paula Santos"  # Updated from "Speaker 1"
    characteristics: ["usa 'galera', 'olha só'"]
```

---

### Issue 3: DNA Score Below Threshold

**Symptom:** quality-guardian reports DNA preservation score < 9.0

**Root Cause:**
- Paraphrasing detected (editor "improved" speaker's wording)
- Catchphrases lost during noise removal
- Formality level altered (informal → formal)

**Resolution:**
1. Review `quality-report.yaml` → `dna_analysis` section for specific violations
2. Review `removal_log` in edited chunks — check if catchphrases were removed
3. Re-edit affected chunks with stricter DNA preservation instructions
4. Re-run Stage 2 (editing) and Stage 3 (validation)

**Prevention:**
- Include catchphrase list in editing instructions
- Mark ambiguous removals with `[REVISAR]` instead of deleting

---

### Issue 4: Abrupt Chunk Transitions

**Symptom:** Final masterpiece.md has `[TRANSIÇÃO]` markers indicating merge failure

**Root Cause:**
- Chunk boundary mid-sentence or mid-paragraph
- No overlap context between chunks
- Topic change at exact chunk boundary

**Resolution:**
1. Re-run Stage 1 (analysis) with larger overlap (300 words instead of 200)
2. Manually adjust chunk boundaries in `analysis-map.yaml` to natural break points
3. Re-run Stage 2 (editing) with updated boundaries
4. Use `*reprocess --from=stage1 {output_folder}` to skip ingestion

**Prevention:**
- Ensure chunks have 200-300 word overlap
- Place chunk boundaries at topic changes, Q&A transitions, or section breaks

---

### Issue 5: Content Preservation < 98%

**Symptom:** quality-guardian reports content preservation score < 98%

**Root Cause:**
- Aggressive noise removal (deleted substantive content)
- Summarization occurred (violation of Rule 1)
- Duplicate removal too aggressive

**Resolution:**
1. Review `removed_excerpts` in `quality-report.yaml`
2. Check if any removed excerpt contains substantive content
3. If yes, restore to edited chunks with `[REVISAR]` marker
4. Re-run Stage 3 (validation)

**Prevention:**
- When in doubt, mark `[REVISAR]` instead of removing
- Only remove excerpts with confidence >= 0.9 (from analysis-map `noise_candidates`)

---

### Issue 6: Processing Time Exceeds Target (NFR1)

**Symptom:** Pipeline takes > 15 minutes for 10k word transcription

**Root Cause:**
- Large file OCR (scanned PDF bottleneck)
- Too many small chunks (overhead of per-chunk LLM calls)
- Sequential chunk editing (not parallel)

**Resolution:**
1. For digital PDFs, force fast extraction: `--force-digital` flag
2. Increase chunk size to 7500-8000 words (fewer chunks)
3. Edit chunks in parallel if LLM API supports (requires code change)

**Optimization:**
```bash
# Skip OCR for digital PDF
python scripts/convert_pdf.py --force-digital material.pdf

# Larger chunks (modify analysis task)
# Update chunk_size target in transcript-analyst instructions
```

---

### Issue 7: Markdown Rendering Issues

**Symptom:** Final .md file has broken TOC links, malformed headings, or invalid syntax

**Root Cause:**
- Special characters in heading text (not escaped)
- Duplicate heading IDs (anchor collision)
- Malformed frontmatter YAML

**Resolution:**
1. Validate frontmatter with YAML linter
2. Check for duplicate H2/H3 headings (must be unique for TOC anchors)
3. Escape special characters in headings: `#`, `[`, `]`, `(`, `)`
4. Re-run Stage 4 (delivery) with corrected headings

**Validation:**
```bash
# Test markdown rendering
pandoc masterpiece.md -o test.html
# If errors, check line numbers reported
```

---

## Glossary of Terms

### Chunk
A processable block of transcription text, typically 5000-8000 words, created during Stage 1 (analysis). Chunks are defined at natural topic boundaries to facilitate independent editing while maintaining semantic coherence.

**Example:** A 40k word transcription divided into 6 chunks, each covering a distinct topic or section.

---

### DNA
The speaker's linguistic identity — vocabulary, idiomatic expressions, catchphrases, speech rhythm, and formality level. Preserving DNA means keeping the speaker's voice recognizable in the final document.

**Example:** A speaker who uses "galera" (informal) should not be changed to "pessoal" (neutral) or "senhoras e senhores" (formal).

---

### Zone
A classified section of transcription based on content type. Zones help structure the document and guide editing decisions.

**Zone Types:**
- **[Lecture]** — Educational content, main presentation
- **[Q&A]** — Question and answer session
- **[Music]** — Background music, musical interlude
- **[Sales Pitch]** — Product/service promotion
- **[Break]** — Interval, pause in content
- **[Noise]** — Irrelevant murmurs, open mic, background conversations
- **[Interview]** — Structured interview format
- **[Dialogue]** — Conversational exchange between participants

---

### Masterpiece
The final publication-ready markdown document produced by the pipeline. Contains structured content with TOC, metadata, speaker attributions, and quality-validated editorial polish.

**File naming:** `{source}-masterpiece.md`

---

### Catchphrase
A repeated expression characteristic of the speaker's style. Used as a DNA marker for validation. Must appear in the final document to confirm DNA preservation.

**Detection threshold:** Expression appears >= 3 times in raw transcription

**Examples:** "Olha só", "Percebam", "Sacou?", "Deixa eu explicar"

---

### Overlap Context
Text shared between adjacent chunks to enable smooth merging. Typically 200-300 words from the end of one chunk repeated at the start of the next chunk.

**Purpose:** Provides context for the editor when processing chunks independently, and guides the merge algorithm to avoid content duplication or gaps.

---

### Quality Gate
A validation checkpoint between pipeline stages. Gates enforce quality thresholds and block progression if criteria are not met.

**Gates:**
- **QG-INGESTION** — >= 95% conversion success
- **QG-ANALYSIS** — 100% zone coverage, valid chunk boundaries
- **QG-EDITING** — DNA >= 9.0, Content >= 98%, Coherence >= 8.5
- **QG-VALIDATION** — All thresholds met, zero paraphrasing
- **QG-DELIVERY** — Valid markdown, functional TOC, complete metadata

---

### Noise Candidate
An excerpt identified during analysis as potentially irrelevant (murmurs, open mic, background conversation). Each candidate has a confidence score (0.0-1.0) and a recommendation (remove, review, keep).

**Example:**
```
text: "[murmúrios inaudíveis]"
confidence: 0.95
recommendation: "remove"
```

---

### [REVISAR] Marker
A flag inserted by the editor when content is ambiguous — could be noise OR could be relevant. Signals need for human review before final publication.

**When to use:**
- Confidence < 0.9 that excerpt is noise
- Unclear speaker attribution
- Uncertain about tone/intent

**Example:**
```
[REVISAR: Possível direção de palco relevante?]
Alguém pode fechar a porta?
```

---

### Partial Reprocessing
Resuming pipeline execution from a specific stage without re-running prior stages. Enables iterative refinement without repeating expensive operations (e.g., OCR, conversion).

**Entry points:** `--from=stage0`, `--from=stage1`, `--from=stage2`, `--from=stage3`, `--from=stage4`

**Use case:** Re-edit with different instructions without re-analyzing or re-converting.

---

### Verdict
The final decision from quality-guardian after validation.

**Verdicts:**
- **PASS** — All quality thresholds met, proceed to delivery
- **CONCERNS** — Minor issues logged but acceptable for delivery
- **FAIL** — Major quality issues, return to editing (max 2 retry cycles)

---

*End of Knowledge Base*
