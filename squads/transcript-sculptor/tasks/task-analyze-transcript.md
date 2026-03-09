# Task: Analyze Transcript

**Task ID:** transcript-sculptor/analyze-transcript
**Version:** 1.0.0
**Status:** Production Ready
**Created:** 2026-02-22
**Category:** Stage 1 - Analysis

---

## Executive Summary

This task performs semantic analysis of raw markdown transcriptions, identifying speakers, mapping content zones (lecture/Q&A/music/noise), detecting topic changes, and designing intelligent chunking strategy for long content. It produces an analysis-map.yaml that serves as the blueprint for all downstream editing.

**Workflow Position:** Stage 1 of full pipeline (after ingestion)
**Success Definition:** Complete analysis map with chunks, speakers, zones, title suggestions
**Output Quality Gate:** QG-ANALYSIS (coverage + chunk boundary quality)

---

## Executor Type

**Agent (100%)**
- transcript-analyst agent performs LLM-powered semantic analysis
- Detects patterns, generates structure, designs chunking

---

## Inputs

```yaml
raw_file:
  field: "Path to raw markdown file"
  format: "raw/{source}.md"
  required: true

output_folder:
  field: "Path to output directory"
  format: "Absolute directory path"
  required: true

options:
  chunk_size_min:
    default: 5000
    description: "Minimum words per chunk"
  chunk_size_max:
    default: 8000
    description: "Maximum words per chunk"
  overlap_words:
    default: 250
    description: "Context overlap between chunks"
```

---

## Action Items

**IMPORTANT:** These steps are designed to be executed by an LLM (Claude Code). Follow each step sequentially and thoroughly. This is NOT a Python script — this is a task definition for intelligent analysis.

---

### Step 1: Read and Assess the Raw Transcript

**Objective:** Load the raw markdown file and gather basic metrics.

**Instructions:**
1. Use the `Read` tool to load the entire content of `{raw_file}`
2. Count total words in the document (split by whitespace, count non-empty tokens)
3. Detect the primary language:
   - Look for Portuguese markers: "é", "você", "então", "porque", "também"
   - Look for English markers: "the", "and", "is", "are", "with"
   - Default to "pt-BR" if uncertain (primary use case)
4. Log the following:
   - File path
   - Total word count
   - Detected language

**Output:** Metadata for analysis-map header

---

### Step 2: Detect Speakers

**Objective:** Identify distinct speakers through linguistic pattern analysis.

**Instructions:**

1. **Scan for dialogue markers:**
   - Look for explicit markers: `—`, `:`, `"..."`, `Pergunta:`, `Resposta:`, `Participante:`
   - Look for formatting patterns indicating speaker changes (e.g., bolded names, line breaks)

2. **Identify vocabulary shifts:**
   - Detect catchphrases (e.g., "galera", "olha só", "percebam", "sacou?")
   - Detect formality changes (e.g., "você" vs "vocês", formal vs informal language)
   - Detect tone shifts (teaching mode → answering mode, energetic → calm)

3. **Assign speaker labels:**
   - If speaker names are explicit in text → use actual names
   - If speakers are distinguishable but unnamed → use descriptive labels:
     - "Palestrante Principal" (main speaker, teaches, explains)
     - "Participante (Q&A)" (asks questions, interacts)
     - "Moderador" (facilitates, introduces topics)
   - If speakers cannot be distinguished → use generic labels: "Speaker 1", "Speaker 2"
   - Always include an "unknown" speaker for ambiguous segments

4. **Estimate speaking percentage:**
   - Approximate what % of total words each speaker contributes
   - Example: Main speaker 85%, Q&A participants 10%, Unknown 5%

5. **Document speaker characteristics:**
   - Record catchphrases used by each speaker
   - Record tone descriptors (energetic, calm, formal, informal, questioning)
   - Record any distinctive linguistic patterns

**Output:** `speakers` section in analysis-map.yaml

**Example:**
```yaml
speakers:
  - id: "speaker-1"
    label: "Palestrante Principal"
    estimated_percentage: 85
    tone: "energetic"
    characteristics: ["usa 'galera', 'olha só'", "tom didático", "muitas perguntas retóricas"]
  - id: "speaker-2"
    label: "Participante (Q&A)"
    estimated_percentage: 10
    tone: "neutral"
    characteristics: ["perguntas diretas", "vocabulário técnico"]
  - id: "unknown"
    label: "Não identificado"
    estimated_percentage: 5
```

---

### Step 3: Map Content Zones

**Objective:** Classify all content into semantic zones (lecture, Q&A, music, pitch, noise, break).

**Instructions:**

1. **Scan the entire document and classify each section by type using these detection patterns:**

| Zone Type | Indicators | Examples |
|-----------|-----------|----------|
| **lecture** | Continuous monologue, teaching tone, explanations, no dialogue | "Hoje vou ensinar...", "O conceito fundamental é...", long uninterrupted paragraphs |
| **qa** | Question-answer pattern, multiple speakers, interactive format | "Pergunta:", "Alguém perguntou:", alternating short/long paragraphs |
| **music** | Lyrics, song references, music-related markers | "[música]", "♪", lyrics in italics, "tocando ao fundo" |
| **pitch** | Sales language, product mentions, pricing, CTAs, urgency | "inscrições abertas", "garanta sua vaga", "investimento de", "últimos dias" |
| **noise** | Inaudible markers, murmurs, technical issues, contextless phrases | "[inaudível]", "...", "microfone desligado", isolated murmurs |
| **break** | Explicit interval markers, pauses | "vamos fazer um intervalo", "voltamos em 10 minutos", "pausa para café" |

2. **For each zone, record:**
   - `type` — one of: lecture, qa, music, pitch, noise, break
   - `start_word` — approximate word position where zone begins (0-indexed)
   - `end_word` — approximate word position where zone ends
   - `title_suggestion` — descriptive title for lecture/qa zones (null for others)
   - `context` (optional) — brief note about the zone (for music/noise/break)

3. **Zone boundary rules:**
   - Zones should cover 100% of the document (no gaps)
   - Adjacent zones of same type should be merged
   - Prefer granular zones for editing flexibility (split long lectures at topic changes)

4. **Title suggestions for lecture/qa zones:**
   - Titles should be descriptive (not generic like "Parte 1")
   - Titles should be 3-8 words in Portuguese
   - Titles should reflect actual content (e.g., "Fundamentos do Método de Vendas")

**Output:** `zones` section in analysis-map.yaml

**Example:**
```yaml
zones:
  - type: "lecture"
    start_word: 0
    end_word: 12000
    title_suggestion: "Introdução ao Framework de Produtividade"
  - type: "qa"
    start_word: 12001
    end_word: 15000
    title_suggestion: "Perguntas e Respostas — Bloco 1"
  - type: "music"
    start_word: 15001
    end_word: 15200
    title_suggestion: null
    context: "Música de intervalo"
  - type: "noise"
    start_word: 15201
    end_word: 15400
    context: "Murmúrios inaudíveis, microfone desligado"
```

---

### Step 4: Identify Topic Changes

**Objective:** Detect semantic shifts in content and suggest hierarchical titles (H2/H3).

**Instructions:**

1. **Scan lecture and qa zones for topic changes:**
   - Look for explicit transitions: "Agora vamos falar sobre...", "Próximo tópico:", "Mudando de assunto..."
   - Look for vocabulary cluster changes (e.g., marketing terms → technical terms)
   - Look for speaker changes combined with subject changes
   - Look for questions that introduce new subjects

2. **Classify topic boundaries:**
   - **Major topic change (H2)** — new thematic section, significant semantic shift
   - **Sub-topic change (H3)** — related sub-theme within same major topic

3. **Generate title suggestions:**
   - Titles should be descriptive and specific
   - Use sentence case, Portuguese language
   - Avoid generic titles ("Introdução", "Parte 2")
   - Prefer content-based titles ("Estratégias de Precificação", "Técnicas de Copywriting")

4. **Update zones with title_suggestion field:**
   - Each lecture/qa zone should have a suggested H2 or H3 title
   - Titles should guide the editor on how to structure the final document

**Output:** Enhanced `zones` section with accurate title suggestions

---

### Step 5: Calculate Chunk Boundaries

**Objective:** Design intelligent chunking strategy for long transcriptions (40k+ words).

**Instructions:**

1. **Determine if chunking is needed:**
   - If `total_words <= 8000` → single chunk (id: "chunk-001")
   - If `total_words > 8000` → multiple chunks required

2. **For multi-chunk documents, design chunk boundaries:**

   **Target size:** 5000-8000 words per chunk

   **Boundary priority (in order):**
   1. **Preferred:** Split at zone boundaries (end of lecture zone, end of Q&A zone)
   2. **Second choice:** Split at major topic changes (detected in Step 4)
   3. **Last resort:** Split at paragraph boundaries (avoid mid-sentence breaks)

3. **For each chunk, define:**
   - `id` — sequential: "chunk-001", "chunk-002", etc.
   - `start_word` — word position where chunk begins (0-indexed)
   - `end_word` — word position where chunk ends
   - `zones` — list of zone types covered by this chunk (e.g., ["lecture"], ["lecture", "qa"])
   - `overlap_context` — last ~200 words of this chunk (for merge context in final delivery)

4. **Include overlap between chunks:**
   - Last 200 words of Chunk N should overlap with first 200 words of Chunk N+1
   - This ensures context continuity during editing and merge
   - Overlap region recorded in `overlap_context` field

5. **Validation:**
   - All chunks should be within 5000-8000 words (±10% acceptable)
   - No mid-sentence breaks
   - Chunks cover entire document (no gaps)

**Output:** `chunks` section in analysis-map.yaml

**Example:**
```yaml
chunks:
  - id: "chunk-001"
    start_word: 0
    end_word: 7500
    zones: ["lecture"]
    overlap_context: "...últimos 200 palavras do chunk para contexto..."
  - id: "chunk-002"
    start_word: 7300  # 200 words overlap with chunk-001
    end_word: 15000
    zones: ["lecture", "qa"]
    overlap_context: "...últimos 200 palavras do chunk para contexto..."
```

---

### Step 6: Detect Noise Candidates

**Objective:** Identify low-value content for removal (inaudible segments, murmurs, technical issues).

**Instructions:**

1. **Scan for noise patterns:**
   - Explicit markers: `[inaudível]`, `[música de fundo]`, `...`
   - Technical issues: "microfone desligado", "áudio cortado", "falha técnica"
   - Contextless murmurs: very short phrases (<5 words) with no semantic value
   - Stage directions irrelevant to content: "Alguém pode fechar a porta?"

2. **For each noise candidate, record:**
   - `start_word` — approximate word position
   - `end_word` — approximate word position
   - `text_preview` — first 50 characters of the noisy content
   - `confidence` — score from 0 to 1 indicating removal confidence
   - `recommendation` — "remove" or "review"

3. **Confidence scoring:**
   - **confidence >= 0.85** → recommendation: "remove" (high confidence noise)
   - **confidence < 0.85** → recommendation: "review" (ambiguous, mark as `[REVISAR]` for human review)

   **High confidence examples:**
   - `[inaudível]` → 0.95
   - Murmurs with no semantic value → 0.90
   - Technical interruptions → 0.92

   **Low confidence examples:**
   - Stage directions that might be contextually relevant → 0.70
   - Short phrases that could be part of dialogue → 0.60

**Output:** `noise_candidates` section in analysis-map.yaml

**Example:**
```yaml
noise_candidates:
  - start_word: 15201
    end_word: 15400
    text_preview: "...então... [inaudível]... microfone... tá ligado..."
    confidence: 0.92
    recommendation: "remove"
  - start_word: 28500
    end_word: 28600
    text_preview: "Alguém pode fechar a porta?"
    confidence: 0.78
    recommendation: "review"
```

---

### Step 7: Generate analysis-map.yaml

**Objective:** Write the complete YAML file with all analysis results.

**Instructions:**

1. **Construct the YAML structure:**

```yaml
analysis_map:
  source_file: "{raw_file}"
  total_words: {word_count}
  language: "pt-BR"  # or detected language
  speakers:
    # From Step 2
    - id: "speaker-1"
      label: "..."
      estimated_percentage: X
      tone: "..."
      characteristics: [...]
  zones:
    # From Step 3 + Step 4
    - type: "lecture"
      start_word: N
      end_word: M
      title_suggestion: "..."
  chunks:
    # From Step 5
    - id: "chunk-001"
      start_word: N
      end_word: M
      zones: ["lecture"]
      overlap_context: "..."
  noise_candidates:
    # From Step 6
    - start_word: N
      end_word: M
      text_preview: "..."
      confidence: X.XX
      recommendation: "remove|review"
```

2. **Determine output path:**
   - Extract source filename from `{raw_file}` (e.g., "palestra-dia1.md")
   - Output to: `{output_folder}/analysis/{source_name}-analysis-map.yaml`

3. **Write the file:**
   - Use `Write` tool to create the YAML file
   - Validate YAML syntax (proper indentation, no syntax errors)

4. **Log completion:**
   - Print summary to console:
     - Total words analyzed
     - Number of speakers detected
     - Number of zones mapped
     - Number of chunks created
     - Number of noise candidates identified
     - Output file path

**Output:** Complete `analysis-map.yaml` file ready for transcript-editor

---

---

## Outputs

```yaml
analysis_map:
  location: "{output_folder}/analysis/{source}-analysis-map.yaml"
  format: "YAML"
  schema: "See transcript-analyst agent for full schema"
```

---

## Quality Gates

### QG-ANALYSIS: Analysis Quality Gate

**Blocking Criteria:**
- All content assigned to zones (100% coverage)
- Chunk boundaries defined (if word_count > 8000)
- At least 80% of speech attributed to speakers
- Title suggestions present for all major topics

**Non-Blocking Warnings:**
- Speaker detection confidence low
- Topic boundaries subtle (fallback to word-count chunking)

**Pass/Fail:**
- PASS: All blocking criteria met
- CONCERNS: Low speaker confidence, but analysis complete
- FAIL: Incomplete zone mapping or missing chunks

---

## Dependencies

### Upstream
- raw/*.md from task-scan-and-convert

### Downstream
- transcript-editor (uses analysis-map.yaml)

### Agent
- transcript-analyst

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 1.0.0 | Initial task definition | Dex (Dev) |
