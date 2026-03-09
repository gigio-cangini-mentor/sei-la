# Task: Merge and Deliver

**Task ID:** transcript-sculptor/merge-and-deliver
**Version:** 1.0.0
**Status:** Production Ready
**Created:** 2026-02-22
**Category:** Stage 4 - Delivery

---

## Executive Summary

This task performs intelligent merging of all edited chunks into a final masterpiece document. It ensures smooth transitions between chunks, generates table of contents, adds metadata header, and compiles the final quality report. The output is a complete, navigable, publication-ready markdown file.

**Workflow Position:** Stage 4 of full pipeline (final stage)
**Success Definition:** Single masterpiece.md file with TOC, metadata, and quality report
**Output Quality Gate:** QG-DELIVERY (final file valid, all metadata complete)

---

## Executor Type

**Agent (100%)**
- sculptor-chief agent performs merge orchestration
- Generates TOC and metadata

---

## Inputs

```yaml
output_folder:
  field: "Path to output directory containing all chunks and reports"
  format: "Absolute directory path"
  required: true

source_name:
  field: "Base name for output file"
  format: "String (e.g., 'palestra-dia1')"
  required: true

options:
  generate_toc:
    default: true
    description: "Generate table of contents"
  include_metadata:
    default: true
    description: "Add metadata header"
```

---

## Action Items

**IMPORTANT:** These steps are designed to be executed by an LLM (Claude Code). Follow each step sequentially and thoroughly. This is NOT a Python script — this is an intelligent merge workflow.

---

### Step 1: Inventory Edited Chunks

**Objective:** Load all edited chunks and verify completeness.

**Instructions:**

1. **List all chunk files:**
   - Use `Glob` tool to find all files matching pattern: `{output_folder}/chunks/*-edited.md`
   - Sort files by chunk ID (extract from filename: `chunk-001`, `chunk-002`, etc.)

2. **Read each chunk file:**
   - Use `Read` tool to load content of each chunk
   - Parse YAML frontmatter to extract:
     - `chunk_id` (e.g., "chunk-001")
     - `source` (original raw file)
     - `word_count_before` and `word_count_after`
     - `removal_log` (list of removed/flagged excerpts)
     - `dna_indicators` (catchphrases, tone adjustments, paraphrased sentences)

3. **Load analysis map:**
   - Use `Read` tool to load `{output_folder}/analysis/{source}-analysis-map.yaml`
   - Extract expected chunk count from `chunks` section
   - Verify all expected chunks are present in `chunks/` directory

4. **Validation:**
   - If chunk count mismatch → HALT, report missing chunks
   - If any chunk file is malformed or missing frontmatter → HALT, report issue
   - Log inventory:
     - Total chunks found
     - Total words across all chunks (sum of `word_count_after`)
     - List of chunk IDs in order

**Output:** Complete inventory of chunks ready for merge

---

### Step 2: Merge Chunks with Intelligent Transitions

**Objective:** Concatenate chunks in order while removing overlap and ensuring smooth transitions.

**Instructions:**

1. **Initialize merged content:**
   - Create empty string for merged content
   - Track current position for debugging

2. **For each chunk (starting with chunk-001):**

   **Step 2a: Extract chunk content (without frontmatter)**
   - Read chunk file content
   - Split on `---` to separate frontmatter from markdown body
   - Extract markdown body only (skip frontmatter)

   **Step 2b: Remove overlap from chunks N+1 onward**
   - For chunk-001 → keep entire content (no overlap to remove)
   - For chunk-002 and later:
     - Extract `overlap_context` from analysis-map for previous chunk
     - Identify overlap region: first ~200-300 words of current chunk that match last words of previous chunk
     - Use fuzzy matching to detect overlap:
       - Compare first 100 words of current chunk with last 300 words of previous chunk
       - Look for repeated phrases, paragraphs, or sentences
     - Remove overlapping content from current chunk
     - Keep only the new content after overlap

   **Step 2c: Check transition quality**
   - Compare last paragraph of merged content with first paragraph of current chunk
   - Detect transition type:
     - **Smooth continuation:** Same topic/speaker continues → no action needed
     - **Topic change with heading:** New H2/H3 starts chunk → no action needed
     - **Abrupt transition:** Topic changes mid-paragraph, no heading → mark with `[TRANSIÇÃO]` or insert context overlap

   **Step 2d: Handle cross-boundary heading conflicts**
   - If last line of previous chunk is a heading (H2/H3)
   - AND first line of current chunk is the same heading
   - → Remove duplicate heading from current chunk (keep previous chunk's version)

   **Step 2e: Append chunk to merged content**
   - Add current chunk content to merged string
   - Add blank line separator between chunks (for readability)

3. **Validation after merge:**
   - Count total words in merged content
   - Verify word count approximately matches sum of `word_count_after` from all chunks (allow ±5% for overlap removal)
   - Verify no duplicate headings (scan for consecutive identical H2/H3)
   - Verify no paragraph duplicates (scan for repeated sentences)

**Output:** Single merged markdown string with all chunks concatenated

---

### Step 3: Resolve Cross-Boundary Conflicts

**Objective:** Handle edge cases where topics or sections span chunk boundaries.

**Instructions:**

1. **Scan for duplicate section headings:**
   - Extract all H2 headings from merged content
   - If same H2 appears twice consecutively → conflict detected
   - Resolution:
     - Keep first occurrence of H2
     - Merge content from both sections under single H2
     - Remove second occurrence

2. **Scan for split speaker dialogues:**
   - Look for speaker attribution patterns: `**Speaker Name:**`
   - If speaker dialogue was split across chunks:
     - Check if speaker attribution appears twice for same speaker with no intervening speaker
     - Merge into single dialogue block (remove duplicate attribution)

3. **Scan for mid-sentence breaks:**
   - Check chunk boundaries for incomplete sentences
   - Indicators: sentence ends with `,` or no punctuation at chunk boundary
   - Resolution:
     - Ensure overlap removal didn't cut mid-sentence
     - If detected → manually reconnect sentence fragments

**Output:** Merged content with conflicts resolved

---

### Step 4: Generate Table of Contents

**Objective:** Create navigable TOC with markdown links to all major sections.

**Instructions:**

1. **Extract all headings from merged content:**
   - Scan for lines starting with `##` (H2) or `###` (H3)
   - Extract heading text (without `##` symbols)
   - Preserve heading hierarchy (H2 vs H3)

2. **Generate anchor links:**
   - For each heading, create GitHub-compatible anchor:
     - Convert to lowercase
     - Replace spaces with hyphens
     - Remove special characters (except hyphens)
     - Example: "Fundamentos do Método" → "#fundamentos-do-método"
     - Example: "[Q&A] Perguntas" → "#qa-perguntas"

3. **Format TOC structure:**
   ```markdown
   ## Sumário

   - [Section Title 1](#section-title-1)
     - [Subsection 1.1](#subsection-11)
   - [Section Title 2](#section-title-2)
   - [[Q&A] Perguntas e Respostas](#qa-perguntas-e-respostas)
   ```

   **Formatting rules:**
   - H2 headings → top-level list items (no indentation)
   - H3 headings → indented 2 spaces (nested under parent H2)
   - Use `-` for list markers
   - Include link text in square brackets, anchor in parentheses

4. **Validation:**
   - Verify all TOC links are valid (anchors match actual headings in document)
   - Test: for each TOC entry, verify corresponding heading exists in merged content
   - If mismatch → HALT, report broken link

**Output:** Complete TOC markdown string

---

### Step 5: Generate Metadata Header

**Objective:** Create YAML frontmatter with document metadata and quality scores.

**Instructions:**

1. **Extract metadata from inputs:**

   **From analysis-map.yaml:**
   - `speakers` → list of speaker labels
   - `total_words` → original word count
   - `source_file` → original raw file name

   **From quality-report.yaml:**
   - `scores.content_preservation` → content preservation %
   - `scores.dna_preservation` → DNA score (X.X/10)
   - `scores.structural_coherence` → coherence score (X.X/10)
   - `scores.overall` → overall quality score

2. **Infer document title:**
   - Strategy 1: Use first lecture zone's `title_suggestion` from analysis-map
   - Strategy 2: Use first H2 heading from merged content
   - Strategy 3: Use source filename as fallback (e.g., "palestra-dia1.md" → "Palestra Dia 1")
   - Prefer Strategy 1, fallback to 2, then 3

3. **Calculate estimated duration:**
   - Use final word count from merged content
   - Formula: `duration_minutes = word_count / 150` (average PT-BR speaking rate)
   - Format: "Xh Ymin" (e.g., "2h 30min")

4. **Get current timestamp:**
   - ISO 8601 format: "YYYY-MM-DDTHH:MM:SSZ"

5. **Construct YAML frontmatter:**

   ```yaml
   ---
   title: "{inferred_title}"
   speakers:
     - "{speaker1_label}"
     - "{speaker2_label}"
   estimated_duration: "{Xh Ymin}"
   word_count: {final_word_count}
   processing_date: "{ISO_timestamp}"
   source_files:
     - "{original_source_filename}"
   quality_scores:
     content_preservation: {score}
     dna_preservation: {score}
     structural_coherence: {score}
   ---
   ```

**Output:** YAML frontmatter string

---

### Step 6: Final Quality Pass

**Objective:** Verify final document integrity before writing.

**Instructions:**

1. **Verify no duplicate headings:**
   - Scan all H2/H3 headings
   - Check for consecutive duplicates
   - If found → report and fix before proceeding

2. **Verify TOC links work:**
   - For each TOC entry, verify:
     - Anchor format is correct (lowercase, hyphens, no special chars)
     - Corresponding heading exists in document
   - If broken link → fix anchor or report error

3. **Verify metadata is complete:**
   - All required fields present: title, speakers, duration, word_count, date, quality_scores
   - No null values or placeholders
   - Quality scores are numeric and within valid ranges

4. **Verify document renders as valid markdown:**
   - No malformed YAML frontmatter
   - No broken heading syntax
   - No invalid markdown syntax (unmatched brackets, etc.)

5. **Count final word count:**
   - Split merged content by whitespace
   - Count non-empty tokens
   - Verify matches `word_count` in metadata (±1% acceptable)

**Output:** Validation complete, document ready to write

---

### Step 7: Write Masterpiece Document

**Objective:** Assemble final document and write to disk.

**Instructions:**

1. **Assemble complete document:**
   - Combine in this exact order:
     1. YAML frontmatter (from Step 5)
     2. Blank line
     3. Main title as H1: `# {title}`
     4. Blank line
     5. Table of Contents (from Step 4)
     6. Blank line
     7. Horizontal rule: `---`
     8. Blank line
     9. Merged content (from Steps 2-3)
     10. Blank line
     11. Footer: `_Documento gerado por transcript-sculptor | {processing_date}_`

2. **Determine output path:**
   - Extract source name from original file (e.g., "palestra-dia1.md" → "palestra-dia1")
   - Output path: `{output_folder}/{source_name}-masterpiece.md`

3. **Write file:**
   - Use `Write` tool to create file
   - Encoding: UTF-8
   - Line endings: Unix (LF)

4. **Log completion:**
   - Print summary to console:
     - Output file path
     - Final word count
     - Number of chunks merged
     - Number of sections (H2 count)
     - Quality scores (content, DNA, coherence)

**Output:** Final masterpiece file written to disk

---

### Step 8: Update Processing Log

**Objective:** Record merge completion in pipeline tracking.

**Instructions:**

1. **Create/update processing-log.yaml:**
   - Location: `{output_folder}/processing-log.yaml`
   - Append entry:
     ```yaml
     - stage: "merge-and-deliver"
       timestamp: "{ISO_timestamp}"
       chunks_merged: {count}
       final_word_count: {count}
       output_file: "{source_name}-masterpiece.md"
       status: "completed"
     ```

2. **Log to console:**
   - Print success message with file path
   - Print quality scores summary
   - Print next steps (if any, e.g., "Ready for publication")

**Output:** Processing log updated, task complete

---

## Outputs

```yaml
masterpiece_file:
  location: "{output_folder}/{source}-masterpiece.md"
  format: "Markdown with YAML frontmatter"
  description: "Final publication-ready document"

final_quality_report:
  location: "{output_folder}/quality-report.yaml"
  format: "YAML"
  description: "Aggregated quality scores and audit trail"
```

---

## Quality Gates

### QG-DELIVERY: Delivery Quality Gate

**Blocking Criteria:**
- Final file is valid markdown (parseable)
- TOC links functional
- Metadata complete and accurate
- Quality report generated
- No merge artifacts (duplicate content, broken transitions)

**Pass/Fail:**
- PASS: All criteria met, file ready for publication
- FAIL: Invalid markdown, broken TOC, missing metadata

---

## Merge Conflict Resolution

These conflict types are handled in Step 2 (Intelligent Merge) and Step 3 (Cross-Boundary Conflicts).

### Duplicate Content (Overlap Not Removed)

**Detection:**
- Fuzzy match first 100 words of chunk N+1 with last 300 words of chunk N
- Look for repeated paragraphs or sentences at chunk boundaries
- Compare word sequences for similarity (threshold: 80% match = overlap)

**Action:**
- Remove overlapping content from chunk N+1
- Keep only new content after overlap region
- Log overlap removal: "Removed {X} words of overlap between chunk-{N} and chunk-{N+1}"

### Duplicate Headings (Same H2 Twice)

**Detection:**
- Scan merged content for consecutive identical H2 headings
- Example: `## Fundamentos do Método` appears at end of chunk-001 and start of chunk-002

**Action:**
- Keep first occurrence of heading
- Remove second occurrence
- Merge content from both sections under single heading
- Ensure no paragraph duplicates in merged section

### Abrupt Transition (Topic Shift Without Connection)

**Detection:**
- Last paragraph of chunk N is about Topic A
- First paragraph of chunk N+1 is about Topic B
- No heading separates them

**Action:**
- If transition is natural (speaker continues, new point) → no action
- If transition is jarring → insert `[TRANSIÇÃO]` marker or context overlap
- Prefer context overlap (last 50 words of chunk N) if it helps continuity

### Split Speaker Dialogue

**Detection:**
- Same speaker attribution appears twice consecutively
- Example: `**Palestrante:**` at end of chunk N, then `**Palestrante:**` at start of chunk N+1

**Action:**
- Merge into single dialogue block
- Remove duplicate speaker attribution from chunk N+1
- Ensure smooth flow of speaker's content

### Broken Heading Hierarchy

**Detection:**
- H2 followed directly by H4 (skipped H3)
- Inconsistent heading levels across merged document

**Action:**
- Verify heading hierarchy: H1 → H2 → H3 (no level skips)
- If broken hierarchy detected → adjust heading levels
- Report in processing log if adjustments made

---

## Examples

### Example 1: Overlap Removal

**Chunk N ending:**
```
...e é por isso que este conceito é tão importante para vocês. Percebam como isso se aplica diretamente ao dia a dia de cada um.
```

**Chunk N+1 starting (with overlap):**
```
é tão importante para vocês. Percebam como isso se aplica diretamente ao dia a dia de cada um. Agora vamos para o próximo tópico...
```

**After overlap removal:**
```
...e é por isso que este conceito é tão importante para vocês. Percebam como isso se aplica diretamente ao dia a dia de cada um. Agora vamos para o próximo tópico...
```

---

### Example 2: Duplicate Heading Resolution

**Before merge:**

Chunk-001 ending:
```
...e isso conclui a primeira parte.

## Estratégias Avançadas
```

Chunk-002 starting:
```
## Estratégias Avançadas

Agora vamos falar sobre...
```

**After merge:**
```
...e isso conclui a primeira parte.

## Estratégias Avançadas

Agora vamos falar sobre...
```

---

### Example 3: TOC Generation

**Document headings:**
```markdown
## Fundamentos do Método
### Conceitos Principais
### Aplicação Prática
## [Q&A] Perguntas e Respostas
## Conclusão
```

**Generated TOC:**
```markdown
## Sumário

- [Fundamentos do Método](#fundamentos-do-método)
  - [Conceitos Principais](#conceitos-principais)
  - [Aplicação Prática](#aplicação-prática)
- [[Q&A] Perguntas e Respostas](#qa-perguntas-e-respostas)
- [Conclusão](#conclusão)
```

---

### Example 4: Metadata Header

```yaml
---
title: "Palestra Dia 1 — Fundamentos do Método de Vendas"
speakers:
  - "João Silva (Palestrante Principal)"
  - "Participantes (Q&A)"
estimated_duration: "2h 47min"
word_count: 25050
processing_date: "2026-02-22T15:45:00Z"
source_files:
  - "palestra-dia1.md"
quality_scores:
  content_preservation: 98.2
  dna_preservation: 9.1
  structural_coherence: 8.8
---
```

---

## Dependencies

### Upstream
- All edited chunks from task-edit-transcript
- All quality reports from task-validate-quality
- Analysis map from task-analyze-transcript

### Agent
- sculptor-chief

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 1.0.0 | Initial task definition | Dex (Dev) |
