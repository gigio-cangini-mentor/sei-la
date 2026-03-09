# Changelog — media-processor

Todas as mudanças notáveis deste squad são documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

---

## [1.0.1] - 2026-03-02

### Security
- Removido `cademi.env` com credenciais expostas (SEC-011)
- Adicionado `*.env` ao `.gitignore` global

### Fixed
- Corrigida acentuação pt-BR em workflows e checklists
- Adicionado diagrama mermaid de arquitetura no README

### Added
- Este CHANGELOG.md

---

## [1.0.0] - 2026-02-23

### Added
- Squad media-processor criado como meta-orchestrator
- Agente Atlas (media-chief) — Pipeline Commander
- 12 tasks: classify, download (hotmart/cademi/youtube), transcribe, sculpt, distill, build-kb, validate (3), update-status
- 4 workflows: full-pipeline, download-only, transcribe-only, batch-process
- 3 checklists: download-validation (QG-001), transcription-quality (QG-002), pipeline-completion (QG-003)
- 3 templates: pipeline-status, manifest, pipeline-report
- 2 data files: media-processor-kb, cli-reference
- Dashboard HTML com auto-refresh para monitoramento em tempo real
- Suporte a resume via processing-manifest.json
- Per-item streaming (items avançam individualmente pelas fases)
- Plataformas suportadas: Hotmart, Cademi, YouTube, arquivos locais
