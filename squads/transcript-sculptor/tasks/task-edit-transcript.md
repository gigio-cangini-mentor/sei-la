# Task: Edit Transcript

**Task ID:** transcript-sculptor/edit-transcript
**Version:** 1.0.0
**Status:** Production Ready
**Created:** 2026-02-22
**Category:** Stage 2 - Editing

---

## Executive Summary

This task performs structural editing of transcript chunks using the analysis map as a blueprint. It adds titles, formats dialogues, adjusts punctuation, removes noise, and preserves 100% of the speaker's linguistic DNA. No summarizing, no paraphrasing, no meaning alteration — only clarity through structure.

**Workflow Position:** Stage 2 of full pipeline (after analysis)
**Success Definition:** All chunks edited with DNA score >= 9.0/10
**Output Quality Gate:** QG-EDIT (DNA preservation + structural coherence)

---

## Executor Type

**Agent (100%)**
- transcript-editor agent performs LLM-powered editorial structuring
- Guided by analysis-map.yaml blueprint

---

## Inputs

```yaml
chunk_file:
  field: "Path to raw chunk markdown"
  format: "raw/{source}-chunk-{id}.md"
  required: true

analysis_map:
  field: "Path to analysis map"
  format: "analysis/{source}-analysis-map.yaml"
  required: true

output_folder:
  field: "Path to output directory"
  format: "Absolute directory path"
  required: true
```

---

## Action Items

**IMPORTANT:** This task is designed for LLM execution (Claude Code). Each step must be followed sequentially and thoroughly. This is NOT a Python script — this is an intelligent editorial workflow.

---

### Step 1: Load Inputs and Identify Chunk Context

**Objective:** Load all necessary data and extract metadata for this specific chunk.

**Instructions:**

1. **Read the raw chunk file:**
   - Use the `Read` tool to load `{chunk_file}` (e.g., `raw/palestra-dia1-chunk-001.md`)
   - If chunk has YAML frontmatter, parse it to extract:
     - `chunk_id` (e.g., "chunk-001")
     - `start_word` and `end_word` (word range for this chunk)
     - `source` (original raw file)

2. **Load the analysis map:**
   - Use the `Read` tool to load `{analysis_map}` (e.g., `analysis/palestra-dia1-analysis-map.yaml`)
   - Parse the YAML structure

3. **Identify chunk metadata:**
   - Match this chunk by `chunk_id` or word range
   - Extract from analysis-map:
     - **Zones:** Which zones (lecture/qa/music/noise/break) cover this chunk's word range
     - **Speakers:** Which speakers are active in this chunk's zones
     - **Noise candidates:** Noise entries with `start_word` and `end_word` within this chunk's range
     - **Title suggestions:** `title_suggestion` field from zones in this chunk

4. **Log context:**
   - Print to console:
     - Chunk ID
     - Word range (start-end)
     - Zones covered
     - Speakers identified
     - Number of noise candidates

**Output:** Chunk context data ready for processing

---

### Step 2: Apply H2 Section Titles

**Objective:** Add major section titles (H2) based on zone boundaries from analysis-map.

**Instructions:**

1. **For each zone in this chunk's word range:**
   - Identify zone type: lecture, qa, pitch, music, noise, break
   - Identify zone `title_suggestion` from analysis-map

2. **Insert H2 titles:**
   - **Lecture zones:** Insert `## {title_suggestion}` at zone start
   - **Q&A zones:** Insert `## [Q&A] {title_suggestion}` (with bracket context)
   - **Pitch zones:** Insert `## [Pitch de Vendas] {product_name or title_suggestion}`
   - **Music zones:** Insert `## [Intervalo]` if it's background music
   - **Break zones:** Insert `## [Pausa]`
   - **Noise zones:** Skip title (content will be removed in Step 6)

3. **Title placement rules:**
   - Insert H2 at the exact paragraph where zone starts (use word count to locate)
   - If zone starts mid-paragraph, insert before the paragraph
   - Maintain blank line before and after H2 heading

4. **Validation:**
   - Every major zone should have a title (except noise zones)
   - Titles should be descriptive, not generic ("Fundamentos do Método", not "Parte 1")

**Output:** Raw chunk text with H2 titles inserted

---

### Step 3: Identify and Apply H3 Subtitles

**Objective:** Add sub-topic headings (H3) for semantic shifts within H2 sections.

**Instructions:**

1. **Within each H2 section, scan for sub-topic changes:**
   - Look for explicit transitions:
     - "Agora vamos falar sobre..."
     - "Próximo ponto:"
     - "Mudando de assunto..."
   - Look for vocabulary cluster shifts (e.g., marketing terms → technical terms)
   - Look for questions that introduce new sub-themes

2. **Insert H3 subtitles:**
   - Format: `### {Sub-topic Title}` (3-6 words, sentence case)
   - Examples:
     - `### Estratégias de Precificação`
     - `### Estudos de Caso Práticos`
     - `### Erros Comuns a Evitar`

3. **Constraints:**
   - Maximum 3 H3 per H2 section (avoid over-fragmentation)
   - Only insert H3 if sub-topic is genuinely distinct
   - Prefer fewer, clearer H3s over many vague ones

4. **Placement:**
   - Insert H3 at the paragraph where sub-topic begins
   - Maintain blank line before H3

**Output:** Chunk with H2 and H3 hierarchical structure

---

### Step 4: Add Zone Context Brackets

**Objective:** Add contextual labels for non-lecture zones to guide the reader.

**Instructions:**

1. **Apply zone-specific formatting:**

   | Zone Type | Format | Example |
   |-----------|--------|---------|
   | **qa** | `## [Q&A] {title}` | `## [Q&A] Perguntas e Respostas — Bloco 1` |
   | **music** | `## [Intervalo]` + description | `## [Intervalo]`<br>`_Música de fundo durante o intervalo._` |
   | **pitch** | `## [Pitch de Vendas] {product}` | `## [Pitch de Vendas] Curso Avançado de Vendas` |
   | **break** | `## [Pausa]` | `## [Pausa]` |
   | **lecture** | No brackets | `## Fundamentos do Método` |

2. **For music zones:**
   - Add italic description on next line: `_Descrição do contexto musical._`
   - Keep brief (1 line)

3. **For noise zones:**
   - No title needed (content will be removed in Step 6)

**Output:** Chunk with zone context brackets applied

---

### Step 5: Format Dialogues with Speaker Identification

**Objective:** Clearly attribute speech to speakers using labels from analysis-map.

**Instructions:**

1. **Identify speaker changes:**
   - Use speaker labels from analysis-map (e.g., "Palestrante Principal", "Participante", "Moderador")
   - Detect speaker changes by:
     - Dialogue markers (—, :, "...")
     - Tone shifts (teaching → questioning)
     - Explicit markers in text ("Pergunta:", "Resposta:")

2. **Insert speaker labels:**
   - Format: `**{Speaker Label}:**` on its own line before speech block
   - Examples:
     ```markdown
     **Palestrante Principal:**

     Galera, olha só — o que eu quero mostrar pra vocês hoje...

     **Participante:**

     Posso fazer uma pergunta rápida?
     ```

3. **Visual separation:**
   - Always add blank line between different speakers
   - If rapid back-and-forth dialogue, still maintain speaker labels for each turn

4. **Unknown speakers:**
   - If speaker cannot be determined → use generic `**Speaker:**`
   - Flag in metadata: `speaker_attribution_uncertain: true`

**Output:** Chunk with clear speaker attribution

---

### Step 6: Adjust Punctuation Per Inferred Tone

**Objective:** Match punctuation to speaker tone from analysis-map while preserving exact wording.

**Instructions:**

1. **Extract speaker tone from analysis-map:**
   - Example: `tone: "energetic"`, `tone: "calm"`, `tone: "questioning"`

2. **Apply punctuation rules by tone:**

   | Tone | Punctuation Strategy | Examples |
   |------|---------------------|----------|
   | **energetic** | Add `!` for emphasis, `?` for rhetorical questions | "Galera!" → "Galera!"<br>"Sacou" → "Sacou?" |
   | **calm** | Use `.` predominantly, minimal exclamations | "Vamos continuar" → "Vamos continuar." |
   | **questioning** | Add `?` for questions, even implied | "Entendeu" → "Entendeu?" |
   | **formal** | Traditional punctuation, no slang markers | "Compreenderam" → "Compreenderam?" |

3. **CRITICAL RULE:**
   - **ONLY change punctuation marks (. ! ? , ;)**
   - **NEVER change words, vocabulary, or phrasing**
   - **Examples:**
     - ✅ "Galera" → "Galera!" (tone: energetic)
     - ❌ "Galera" → "Pessoal!" (FORBIDDEN — vocabulary change)
     - ✅ "Vocês entenderam" → "Vocês entenderam?" (tone: energetic)
     - ❌ "Vocês entenderam" → "Vocês compreenderam?" (FORBIDDEN — paraphrase)

4. **Track adjustments:**
   - Count how many punctuation changes made
   - Log in `tone_adjustments` field of frontmatter

**Output:** Chunk with punctuation adjusted to match speaker tone

---

### Step 7: Remove Noise and Mark Ambiguous Content

**Objective:** Eliminate low-value noise while preserving all substantive content.

**Instructions:**

1. **Cross-reference noise_candidates from analysis-map:**
   - Extract noise entries with `start_word` and `end_word` within this chunk's range
   - For each noise candidate, check `confidence` score and `recommendation`

2. **Apply removal rules:**

   | Confidence | Recommendation | Action |
   |-----------|---------------|--------|
   | >= 0.85 | "remove" | **REMOVE** the excerpt, log in `removal_log` |
   | < 0.85 | "review" | **KEEP** but mark with `[REVISAR: {reason}]` |

3. **For high-confidence removals (>= 0.85):**
   - Locate the text excerpt in chunk
   - Remove it completely
   - Log in `removal_log`:
     ```yaml
     - type: "noise"
       text: "[murmúrios inaudíveis]"
       reason: "No substantive content"
     ```

4. **For low-confidence cases (< 0.85):**
   - Keep the text but mark inline: `[REVISAR: possibly relevant context]`
   - Log in `removal_log`:
     ```yaml
     - type: "review"
       text: "Alguém pode fechar a porta?"
       reason: "Possibly relevant stage direction"
       action: "[REVISAR]"
     ```

5. **Additional noise patterns to remove (if not in noise_candidates):**
   - Explicit markers: `[inaudível]`, `[ruído]`, `...` (excessive ellipses)
   - Technical interruptions: "microfone desligado", "está gravando?"
   - Contextless murmurs: "ahn...", "hmm..." (if not part of speech pattern)

6. **What to PRESERVE (even if seems like noise):**
   - Filler words part of speaker's rhythm: "né", "então", "tipo" (if characteristic)
   - Catchphrases: "galera", "olha só", "sacou?" (DNA markers)
   - Intentional pauses: "..." (if part of rhetorical pattern)
   - Stage directions with context: "(risos)", "(pausa para reflexão)"

**Output:** Chunk with noise removed, ambiguous content flagged, all removals logged

---

### Step 8: DNA Preservation Validation Pass

**Objective:** Verify that the speaker's linguistic DNA is 100% preserved.

**Instructions:**

1. **Extract speaker catchphrases from analysis-map:**
   - From `speakers[].characteristics` field
   - Examples: `["usa 'galera', 'olha só'", "tom didático", "perguntas retóricas"]`
   - Extract all quoted phrases: "galera", "olha só", "sacou?", etc.

2. **Verify catchphrases preserved:**
   - Scan edited chunk text
   - Confirm ALL catchphrases from analysis-map are still present
   - If any missing → **CRITICAL ERROR** — restore immediately
   - Log preserved catchphrases: `catchphrases_preserved: ["galera", "olha só", "percebam"]`

3. **Verify vocabulary unchanged:**
   - Scan for any synonym substitutions (e.g., "galera" → "pessoal")
   - Scan for any formalization (e.g., "tá" → "está")
   - If found → **CRITICAL ERROR** — revert to original wording

4. **Verify no paraphrasing:**
   - Compare sentence structures between raw and edited
   - Confirm only punctuation changed, not sentence construction
   - **MANDATORY:** `paraphrased_sentences: 0` (hard constraint)

5. **Verify formality level maintained:**
   - If raw uses informal ("você", "tá", "galera") → edited must preserve
   - If raw uses formal ("senhor", "está", "audiência") → edited must preserve

6. **Verify repetitions for emphasis preserved:**
   - Examples: "muito, muito importante", "nunca, nunca faça isso"
   - These are DNA markers, not redundancy — PRESERVE ALL

7. **Log DNA indicators in frontmatter:**
   ```yaml
   dna_indicators:
     catchphrases_preserved: ["galera", "olha só", "percebem"]
     tone_adjustments: 3
     paraphrased_sentences: 0  # MUST be 0
   ```

**Output:** DNA validation complete, metrics logged

---

### Step 9: Generate Edited Chunk with YAML Frontmatter

**Objective:** Write the final edited chunk file with complete metadata.

**Instructions:**

1. **Calculate word counts:**
   - Count words in raw chunk: `word_count_before`
   - Count words in edited chunk: `word_count_after`
   - Calculate: `words_removed = word_count_before - word_count_after`

2. **Construct YAML frontmatter:**

   ```yaml
   ---
   chunk_id: "{chunk_id from input}"
   source: "{source raw file path}"
   word_count_before: {count from raw}
   word_count_after: {count from edited}
   words_removed: {difference}
   removal_log:
     - type: "noise"
       text: "{excerpt removed}"
       reason: "{why removed}"
     - type: "review"
       text: "{excerpt flagged}"
       reason: "{why flagged}"
       action: "[REVISAR]"
   dna_indicators:
     catchphrases_preserved: ["{list of catchphrases}"]
     tone_adjustments: {count of punctuation changes}
     paraphrased_sentences: 0  # MUST be 0
   ---
   ```

3. **Write output file:**
   - Determine output path: `chunks/{source_name}-chunk-{id}-edited.md`
   - Use `Write` tool to create file with:
     - YAML frontmatter (above)
     - Blank line after `---`
     - Edited markdown content

4. **Log completion:**
   - Print summary to console:
     - Chunk ID processed
     - Words before/after
     - Number of noise items removed
     - Number of items flagged for review
     - DNA preservation score (catchphrases preserved)
     - Output file path

**Output:** Complete edited chunk file at `chunks/{source}-chunk-{id}-edited.md`

---

### DNA Preservation Rules (CRITICAL — Non-Negotiable)

**Display at the start of every execution:**

```
┌────────────────────────────────────────────────────────────────┐
│ DNA PRESERVATION RULES — NON-NEGOTIABLE                        │
├────────────────────────────────────────────────────────────────┤
│ 1. NEVER change vocabulary — "galera" stays "galera"           │
│ 2. NEVER formalize informal speech — "tá" stays "tá"           │
│ 3. NEVER summarize or condense — every sentence stays          │
│ 4. paraphrased_sentences MUST be 0 — hard constraint           │
│ 5. Punctuation adjustable — words are IMMUTABLE                │
│ 6. Filler words kept if characteristic — preserve rhythm       │
│ 7. Repetitions for emphasis PRESERVED — "muito, muito"         │
└────────────────────────────────────────────────────────────────┘
```

**Enforcement:**
- Any violation of these rules → **AUTOMATIC FAIL** in QA gate
- DNA score < 9.0/10 → chunk must be re-edited

---

## Outputs

```yaml
edited_chunk:
  location: "{output_folder}/chunks/{source}-chunk-{id}-edited.md"
  format: "Markdown with YAML frontmatter"
  schema: "See transcript-editor agent"
```

---

## Quality Gates

### QG-EDIT: Editing Quality Gate

**Blocking Criteria:**
- DNA preservation score >= 9.0/10 (no paraphrasing, all catchphrases preserved)
- Content preservation >= 98% (noise removals only)
- Structural coherence >= 8.5/10 (titles accurate, dialogues clear)

**Critical Rules (Violation = Auto-Fail):**
- No summarizing
- No paraphrasing
- No vocabulary substitutions
- No formality level changes

**Pass/Fail:**
- PASS: All thresholds met, critical rules followed
- FAIL: Paraphrasing detected, catchphrases lost, excessive removal

---

## Dependencies

### Upstream
- raw chunks from task-analyze-transcript
- analysis-map.yaml

### Downstream
- quality-guardian (validates edited chunks)

### Agent
- transcript-editor

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 1.0.0 | Initial task definition | Dex (Dev) |
