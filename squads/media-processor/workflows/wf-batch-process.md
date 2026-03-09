# Workflow: Batch Processing Pipeline

**Version:** 1.0.0
**Status:** Active
**Owner:** @media-chief (Atlas)
**Created:** 2026-02-23

---

## Purpose

Pipeline completo otimizado para cursos inteiros ou playlists grandes (10+ items). Inclui dashboard de monitoramento em tempo real, resume support, e per-item streaming. Diferencia-se do `wf-full-pipeline` pela enfase em batch operations, progress tracking granular, e KB build ao final.

---

## Trigger

- `*batch {URL_or_path}` — Ativa batch pipeline com dashboard

---

## Phases

### Phase 1: Classify + Enumerate

| Field | Value |
|-------|-------|
| **Agent** | @media-chief |
| **Task** | `classify-request.md` |
| **Duration** | 1-5 min |
| **Input** | URL do curso/playlist ou diretorio |
| **Output** | Item list completa com metadata |

**Acoes especificas do batch:**
1. Detectar plataforma
2. Enumerar TODOS os items (modulos, licoes, videos)
3. Criar manifest com todos os items em status `pending`
4. Inicializar dashboard

**Veto Conditions:**
- 0 items encontrados → HALT
- > 500 items → WARN, pedir confirmação
- Auth expired → HALT

**Checkpoint:**
- [ ] All items enumerated in manifest
- [ ] Session directory created
- [ ] Dashboard initialized
- [ ] ETA estimado reportado ao usuario

---

### Phase 2: Download (Batch)

| Field | Value |
|-------|-------|
| **Agent** | @media-chief |
| **Task** | Platform-specific download task |
| **Duration** | 30 min - 4h |
| **Gate** | QG-001 per item |

**Batch behavior:**
- Download items sequencialmente (uma por vez)
- Apos cada download + QG-001 pass → item avanca para Phase 3
- Failures isoladas: item marcado como failed, proximo item continua
- Status update apos cada item

**Veto Conditions:**
- 5 failures consecutivas → HALT, provável problema sistêmico
- Disk space < 2GB → HALT

**Checkpoint:**
- [ ] Progress: N/total downloaded
- [ ] Failures isolated and logged
- [ ] Dashboard reflects current progress

---

### Phase 3: Transcribe (Streaming)

| Field | Value |
|-------|-------|
| **Agent** | @media-chief |
| **Task** | `transcribe-media.md` |
| **Duration** | 5 min - 1h per item |
| **Gate** | QG-002 per item |

**Path Convention:** `output_dir` = lesson folder (transcription outputs alongside video)

**Streaming:** Items entram nesta fase assim que completam Phase 2, não esperam batch inteiro.

**Veto Conditions:**
- Whisper OOM → Retry smaller model (medium → small → base)
- After 2 retries → SKIP item

**Checkpoint:**
- [ ] Each item: transcription_clean.md + chunks in lesson folder
- [ ] QG-002 passed per item

---

### Phase 4: Sculpt (Streaming)

| Field | Value |
|-------|-------|
| **Agent** | transcript-sculptor (delegation) |
| **Task** | `sculpt-transcript.md` |
| **Duration** | 10-30 min per item |

**Path Convention:** `output_dir` = lesson folder (masterpiece.md alongside video and transcription)
**Delegation:** `/transcript-sculptor:process {lesson_folder}/transcription_clean.md {lesson_folder}/`

**Post-Process (obrigatório para pt-BR):**
Aplicar skill `pt-br-accentuation` em cada masterpiece gerado.
Corrige acentos/cedilhas/tils ausentes do output Whisper.

**Checkpoint:**
- [ ] masterpiece.md in lesson folder per item
- [ ] PT-BR accentuation applied per item
- [ ] Manifest updated

---

### Phase 5: Distill (Streaming)

| Field | Value |
|-------|-------|
| **Agent** | video-content-distillery (delegation) |
| **Task** | `distill-content.md` |
| **Duration** | 15-45 min per item |

**Path Convention:** `output_dir` = `{lesson_folder}/distilled/` (subfolder)
**Delegation:** `/video-content-distillery:distill {lesson_folder}/masterpiece.md {lesson_folder}/distilled/`

**Checkpoint:**
- [ ] distilled/ subfolder created in lesson folder per item
- [ ] Frameworks extracted per item
- [ ] Content pieces generated

---

### Phase 6: Build Knowledge Base (Batch Gate)

| Field | Value |
|-------|-------|
| **Agent** | knowledge-base-builder (delegation) |
| **Task** | `build-knowledge-base.md` |
| **Duration** | 30 min - 2h |
| **Gate** | QG-003 (Pipeline Completion) |

**BATCH GATE:** This phase ONLY starts after ALL items complete Phase 5.

**Path Convention:** KB at session level. Recursive scan of course hierarchy for masterpieces.
**Delegation:** `/knowledge-base-builder:ingest {session_dir}/{course_name}/ {session_dir}/knowledge-base/`

**Veto Conditions:**
- < 50% items have masterpieces → WARN, ask user
- 0 masterpieces → SKIP KB, report failures

**Checkpoint:**
- [ ] Knowledge base built at `{session_dir}/knowledge-base/`
- [ ] QG-003 passed
- [ ] Final dashboard update

---

## Dashboard Integration

O batch workflow atualiza `pipeline-status.json` a cada transicao:

```
Item complete → update-status.md (item_completed)
Phase complete → update-status.md (phase_completed)
Pipeline complete → update-status.md (pipeline_completed)
```

O dashboard HTML le `pipeline-status.json` via auto-refresh e renderiza:
- Progress bar geral
- Status por item (tabela)
- Fase atual
- Erros e warnings
- ETA estimado

Abrir: `open squads/media-processor/dashboard/index.html`

---

## Resume Support

```bash
*resume squads/media-processor/sessions/{session_id}/
```

1. Le `processing-manifest.json`
2. Identifica items pendentes/failed
3. Continua do ponto de interrupção
4. Não reprocessa items completos

---

## Completion Criteria

- [ ] All items: completed, skipped, or failed
- [ ] QG-001 passed for downloads
- [ ] QG-002 passed for transcriptions
- [ ] QG-003 passed for pipeline
- [ ] Knowledge base built (if >= 50% items successful)
- [ ] Final summary with statistics
- [ ] Dashboard shows completion
