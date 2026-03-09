# Task: Transcribe Media

## Metadata
- **Task ID:** TASK-MP-001
- **Version:** 1.0.0
- **Status:** Active
- **Created:** 2026-02-23
- **Last Updated:** 2026-02-23
- **Owner:** @media-processor-coordinator
- **Executor Type:** AI Agent (@transcription-engineer)
- **Estimated Duration:** 5-30min (varies by media length)
- **Complexity:** MEDIUM

---

## Purpose

Transcrever arquivos de mídia local (video/audio) usando o video-transcriber CLI, gerando transcrição estruturada, limpa e segmentada em chunks para processamento posterior.

**Por que esta task existe:**
- Converte mídia falada em texto estruturado
- Prepara dados para sculpt e distill phases
- Garante qualidade e consistência na transcrição base

---

## Inputs

| Input | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| `media_file` | File path | User-provided or download task | YES | File exists, valid format |
| `output_dir` | Directory path | Lesson folder (same dir as media file) | YES | Writable directory |
| `model` | String | Config or default | NO | One of: tiny, base, small, medium, large |
| `language` | String | Config or default | NO | Valid Whisper language code |
| `source_type` | String | Detected or specified | YES | One of: local, url, vtt, srt, txt, md |

**Default Values:**
- `model`: medium (balanço qualidade/velocidade)
- `language`: pt (português brasileiro)

---

## Preconditions

### System Requirements
- [x] video-transcriber instalado em `tools/video-transcriber/`
- [x] Virtual environment ativado (`.venv/bin/`)
- [x] FFmpeg instalado (para extração de audio)
- [x] Whisper model baixado (primeiro uso demora mais)

### Input Validation
- [x] `media_file` existe e é legível
- [x] Formato suportado: .mp4, .mp3, .wav, .m4a, .webm, .vtt, .srt, .txt, .md
- [x] `output_dir` existe ou pode ser criado
- [x] Espaço em disco suficiente (estimativa: 2x tamanho do arquivo)

### Dependencies
- [x] Nenhuma task blocante (pode rodar em paralelo para múltiplos itens)

---

## Execution Steps

### Step 1: Prepare Environment
```bash
# Validate video-transcriber installation
cd <PROJECT_ROOT>/tools/video-transcriber
test -f .venv/bin/video-transcriber || { echo "video-transcriber not installed"; exit 1; }

# Create output directory
mkdir -p "{output_dir}"
```

### Step 2: Detect Source Type and Route
```bash
# Detect source type
if [[ "{media_file}" =~ ^https?:// ]]; then
  SOURCE_TYPE="url"
elif [[ "{media_file}" =~ \.(vtt|srt)$ ]]; then
  SOURCE_TYPE="subtitle"
elif [[ "{media_file}" =~ \.(txt|md)$ ]]; then
  SOURCE_TYPE="text"
else
  SOURCE_TYPE="local"
fi
```

### Step 3: Execute Transcription (Route A: Local Media)
```bash
# For local video/audio files
cd <PROJECT_ROOT>/tools/video-transcriber

# Transcribe
.venv/bin/video-transcriber transcribe "{media_file}" \
  -o "{output_dir}/transcription.json" \
  -m {model} \
  -l {language}

# Validate output
test -f "{output_dir}/transcription.json" || { echo "Transcription failed"; exit 1; }
```

### Step 3b: Execute Transcription (Route B: URL)
```bash
# For YouTube or direct media URLs
cd <PROJECT_ROOT>/tools/video-transcriber

# Process (download + transcribe in one step)
.venv/bin/video-transcriber process "{media_file}" \
  -o "{output_dir}" \
  -m {model} \
  -l {language}

# Validate output
test -f "{output_dir}/transcription.json" || { echo "Process failed"; exit 1; }
```

### Step 3c: Execute Transcription (Route C: Existing Transcript)
```bash
# For VTT, SRT, TXT, MD files
cd <PROJECT_ROOT>/tools/video-transcriber

# Ingest existing transcript
.venv/bin/video-transcriber ingest "{media_file}" \
  -o "{output_dir}/transcription.json"

# Validate output
test -f "{output_dir}/transcription.json" || { echo "Ingest failed"; exit 1; }
```

### Step 4: Clean Transcription
```bash
cd <PROJECT_ROOT>/tools/video-transcriber

# Clean (remove duplicates, fix spacing, improve readability)
.venv/bin/video-transcriber clean "{output_dir}/transcription.json" \
  -o "{output_dir}/transcription_clean.json"

# Validate clean output
test -f "{output_dir}/transcription_clean.json" || { echo "Clean failed"; exit 1; }
test -f "{output_dir}/transcription_clean.md" || { echo "Markdown export failed"; exit 1; }
```

### Step 5: Chunk Transcription
```bash
cd <PROJECT_ROOT>/tools/video-transcriber

# Chunk (semantic segmentation for processing)
.venv/bin/video-transcriber chunk "{output_dir}/transcription_clean.json" \
  -o "{output_dir}/chunks"

# Validate chunks
test -d "{output_dir}/chunks" || { echo "Chunking failed"; exit 1; }
CHUNK_COUNT=$(ls "{output_dir}/chunks"/*.json 2>/dev/null | wc -l)
test "$CHUNK_COUNT" -gt 0 || { echo "No chunks generated"; exit 1; }
```

### Step 6: Generate Stats
```bash
# Stats are auto-generated during clean step
test -f "{output_dir}/stats.json" || { echo "Stats missing"; exit 1; }

# Extract key metrics
WORD_COUNT=$(jq -r '.word_count' "{output_dir}/stats.json")
DURATION=$(jq -r '.duration_seconds' "{output_dir}/stats.json")
CHUNK_COUNT=$(jq -r '.chunk_count' "{output_dir}/stats.json")

echo "Transcription complete: $WORD_COUNT words, $DURATION seconds, $CHUNK_COUNT chunks"
```

---

## Outputs

| Output | Type | Location | Description |
|--------|------|----------|-------------|
| `transcription.json` | JSON | `{output_dir}/` | Raw Whisper output with timestamps |
| `transcription_clean.json` | JSON | `{output_dir}/` | Cleaned, structured transcription |
| `transcription_clean.md` | Markdown | `{output_dir}/` | Human-readable transcript |
| `chunks/` | Directory | `{output_dir}/chunks/` | Semantic segments (JSON files) |
| `stats.json` | JSON | `{output_dir}/` | Metadata: word count, duration, quality metrics |

**Output Structure (Lesson Folder = Unidade Atômica):**

All transcription outputs go into the **lesson folder** — the same directory where the downloaded media lives. This keeps all artifacts for a lesson co-located.

```
{lesson_folder}/                    # = output_dir
├── video.mp4                       # Already here from download phase
├── video_16k.wav                   # Audio prep (if applicable)
├── transcription.json              # Raw Whisper output
├── transcription_clean.json        # Cleaned output
├── transcription_clean.md          # Markdown export
├── stats.json                      # Metrics
└── chunks/
    ├── chunk_001.json
    ├── chunk_002.json
    └── ...
```

**Path convention:** `{session_dir}/{Course}/{NN}{SEP}{Module}/{NN}{SEP}{Lesson}/`
- Hotmart separator: `_` (e.g., `01_Module Name/01_Lesson Name/`)
- Cademi separator: ` - ` (e.g., `01 - Module Name/01 - Lesson Name/`)

---

## Validation Rules

### Quality Gate QG-002: Transcription Quality

**Automated Checks:**
```bash
# 1. All expected files exist
test -f "{output_dir}/transcription.json"
test -f "{output_dir}/transcription_clean.json"
test -f "{output_dir}/transcription_clean.md"
test -f "{output_dir}/stats.json"
test -d "{output_dir}/chunks"

# 2. Stats validation
WORD_COUNT=$(jq -r '.word_count' "{output_dir}/stats.json")
test "$WORD_COUNT" -gt 0 || { echo "Empty transcription"; exit 1; }

# 3. Chunk validation
CHUNK_COUNT=$(ls "{output_dir}/chunks"/*.json 2>/dev/null | wc -l)
test "$CHUNK_COUNT" -gt 0 || { echo "No chunks generated"; exit 1; }

# 4. Markdown readability
MD_LINES=$(wc -l < "{output_dir}/transcription_clean.md")
test "$MD_LINES" -gt 10 || { echo "Transcript too short"; exit 1; }
```

**Manual Review (Optional):**
- [ ] Transcrição reflete o conteúdo da mídia
- [ ] Sem erros críticos de reconhecimento
- [ ] Idioma detectado corretamente
- [ ] Chunks semanticamente coerentes

**Thresholds:**
- Word count > 0 (CRITICAL)
- Chunk count > 0 (CRITICAL)
- Duration > 0 (CRITICAL)
- Confidence score > 0.7 (if available, RECOMMENDED)

---

## Quality Threshold

**Pass Criteria:**
- All automated checks pass
- Word count > 100 (for media > 1min)
- Chunk count > 0
- No critical errors in logs

**Fail Criteria (Retry):**
- Empty transcription (word count = 0)
- No chunks generated
- Missing required files
- FFmpeg errors (invalid media format)

**Escalation Criteria:**
- Retry limit exceeded (3 attempts)
- Whisper model download fails
- Unsupported media format
- Corrupted media file

---

## Integration Points

### Downstream Tasks
- **NEXT:** `sculpt-transcript.md` (consumes `transcription_clean.md`)
- **PARALLEL:** Can run for multiple items simultaneously

### Upstream Tasks
- **PREVIOUS:** `download-media.md` (if source is URL) OR direct user input (local file)

### Squad Coordination
- Outputs `transcription_clean.md` to handoff location for transcript-sculptor
- Updates batch status with transcription stats
- Logs completion in session state

---

## Error Handling

### Common Errors

| Error | Cause | Recovery |
|-------|-------|----------|
| `Transcription failed` | Whisper error, invalid media | Retry with smaller model (base) |
| `FFmpeg not found` | Missing dependency | Install FFmpeg: `brew install ffmpeg` |
| `Model download timeout` | Network issue | Retry, use pre-downloaded model |
| `Empty transcription` | Silent media, wrong language | Verify media, try language auto-detect |
| `Chunking failed` | Malformed JSON | Re-run clean step |

### Retry Strategy
- Max retries: 3
- Backoff: 5s, 10s, 30s
- Retry conditions: Network errors, Whisper timeouts
- NO retry: Invalid media format, corrupted file

---

## Performance Notes

**Benchmarks (estimados):**
- 1min video → ~30s transcription (model: medium)
- 10min video → ~3min transcription
- 1h video → ~15-20min transcription

**Optimization Tips:**
- Use `tiny` or `base` model for speed (lower quality)
- Use `large` model for critical content (slower)
- Process multiple files in parallel (max 4 concurrent)
- Pre-download Whisper models to avoid first-run delay

---

## Configuration

### Environment Variables
```bash
# Optional: Override defaults
export WHISPER_MODEL="medium"      # tiny, base, small, medium, large
export WHISPER_LANGUAGE="pt"       # pt, en, es, etc.
export WHISPER_DEVICE="cpu"        # cpu, cuda (if GPU available)
```

### Config File (squad-manifest.yaml)
```yaml
transcription:
  default_model: medium
  default_language: pt
  chunk_max_words: 500
  parallel_limit: 4
```

---

## Examples

### Example 1: Course Lesson (Cademi)
```bash
# Input — media lives in lesson folder from download phase
media_file: "sessions/mp-2026-0302-001/Método 30D/01 - Seja Bem-Vindo/01 - Bem-vindo/video.mp4"
output_dir: "sessions/mp-2026-0302-001/Método 30D/01 - Seja Bem-Vindo/01 - Bem-vindo/"

# Execution
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber transcribe \
  "sessions/mp-2026-0302-001/Método 30D/01 - Seja Bem-Vindo/01 - Bem-vindo/video.mp4" \
  -o "sessions/mp-2026-0302-001/Método 30D/01 - Seja Bem-Vindo/01 - Bem-vindo/transcription.json" \
  -m medium -l pt

# Output — all files in the SAME lesson folder
sessions/mp-2026-0302-001/Método 30D/01 - Seja Bem-Vindo/01 - Bem-vindo/
├── video.mp4                       # Already existed
├── transcription.json              # NEW
├── transcription_clean.json        # NEW
├── transcription_clean.md          # NEW (12,450 words)
├── stats.json                      # NEW
└── chunks/                         # NEW (25 files)
```

### Example 2: Course Lesson (Hotmart)
```bash
# Input — Hotmart uses _ separator
media_file: "sessions/mp-2026-0302-001/Curso Vendas/01_Fundamentos/01_Introdução/video.mp4"
output_dir: "sessions/mp-2026-0302-001/Curso Vendas/01_Fundamentos/01_Introdução/"

# Output — same pattern, output_dir = lesson folder
```

### Example 3: YouTube URL
```bash
# Input — YouTube creates lesson folder dynamically
media_file: "https://www.youtube.com/watch?v=ABC123"
output_dir: "sessions/mp-2026-0302-001/YouTube/01_ABC123-Video-Title/"

# Execution
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber process "https://www.youtube.com/watch?v=ABC123" \
  -o "sessions/mp-2026-0302-001/YouTube/01_ABC123-Video-Title/" \
  -m medium -l pt
```

### Example 4: Existing VTT File
```bash
# Input — local files also use lesson folder structure
media_file: "<USER_HOME>/Downloads/subtitles.vtt"
output_dir: "sessions/mp-2026-0302-001/Local/01_subtitles/"

# Execution
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber ingest "<USER_HOME>/Downloads/subtitles.vtt" \
  -o "sessions/mp-2026-0302-001/Local/01_subtitles/transcription.json"

# Then clean + chunk as usual
```

---

## Notes

- **Language detection:** Se `--language` não especificado, Whisper tenta auto-detectar (menos preciso)
- **Model selection:** `medium` é o melhor balanço para pt-BR. `large` raramente melhora significativamente.
- **Chunk size:** Padrão é ~500 palavras por chunk. Configurável via `--chunk-size`.
- **Parallel processing:** Suporta múltiplos arquivos em paralelo (limite: 4 concurrent para evitar memory issues)

---

## References

- Tool: `tools/video-transcriber/`
- CLI docs: `tools/video-transcriber/README.md`
- Whisper models: https://github.com/openai/whisper#available-models-and-languages
- Quality Gate: `.aios-core/core/quality-gates/QG-002-transcription-quality.md`

---

**Task Owner:** @transcription-engineer
**Last Review:** 2026-02-23
**Next Review:** After 10 executions or major video-transcriber update
