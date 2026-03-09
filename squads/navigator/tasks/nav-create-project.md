---
task: Create Client Project
responsavel: "@navigator"
responsavel_type: hybrid
model: sonnet
atomic_layer: task
elicit: true
Entrada: |
  - project_name: Nome do projeto em kebab-case (ex: "renan-vieira")
  - project_description: Descrição breve do projeto
  - project_type: Tipo do projeto (squad | app | mind-clone | pipeline | knowledge)
  - status: Status inicial (🔄 Em andamento | ✅ Completo | ⏸️ Pausado)
  - squads: Squads relacionados (opcional)
Saida: |
  - project_dir: docs/projects/{name}/
  - index_file: docs/projects/{name}/INDEX.md
  - active_updated: docs/projects/ACTIVE.md (linha adicionada)
Checklist:
  - "[ ] Collect project name and description"
  - "[ ] Validate name is kebab-case and unique"
  - "[ ] Create project directory structure"
  - "[ ] Generate INDEX.md from template"
  - "[ ] Update ACTIVE.md with new project row"
  - "[ ] Verify all links in INDEX.md point to existing files"
veto_conditions:
  - "Project directory already exists at docs/projects/{name}/ → WARN (suggest updating INDEX instead)"
  - "ACTIVE.md does not exist at docs/projects/ACTIVE.md → BLOCK (create ACTIVE.md first)"
  - "Project name contains spaces or uppercase → BLOCK (must be kebab-case)"
---

# *create-project

Create a new client project with INDEX.md and directory structure for session navigation.

## Usage

```bash
@navigator
*create-project
```

## Context

Client projects live in `docs/projects/{name}/` and serve as **navigation points** between Claude sessions. The INDEX.md is the single file a user sends to Claude to restore full project context.

This is NOT for code projects (use `*map-project` for that). This is for **client work tracking** — transcription pipelines, mind clones, content processing, etc.

## Workflow

### Step 1: Collect Project Info

```
Qual o nome do projeto? (kebab-case, ex: "renan-vieira", "conversao-extrema")

> nome-do-projeto

Descreva brevemente o que é este projeto:

> Transcrição e processamento de cursos do cliente X

Status inicial?
1. 🔄 Em andamento
2. ✅ Completo
3. ⏸️ Pausado

> 1

Tipo de projeto?
1. 🎭 Squad (elite minds, expansion pack)
2. 💻 App (aplicação web/mobile)
3. 🧬 Mind Clone (clone de expert)
4. 🔄 Pipeline (transcrição, ETL, processamento)
5. 📚 Knowledge/Platform (base de conhecimento, prospecção)

> 1

Squads relacionados? (opcional, separados por vírgula)

> media-processor, transcript-sculptor
```

### Step 2: Validate

- Confirm name is kebab-case (no spaces, no uppercase)
- Check `docs/projects/{name}/` does not already exist
- Check `docs/projects/ACTIVE.md` exists

### Step 3: Create Directory Structure

```bash
mkdir -p docs/projects/{name}/scripts
mkdir -p docs/projects/{name}/logs
mkdir -p docs/projects/{name}/data
mkdir -p docs/projects/{name}/runtime
```

Subdirectories:
- `scripts/` — Project-specific scripts (ad-hoc Python, Shell, etc.)
- `logs/` — Log files (gitignored via `docs/projects/*/logs/`)
- `data/` — Status JSON, reports, processed data
- `runtime/` — Temporary execution data (pipeline status, live servers)

### Step 4: Generate Human Checklist

Based on `project_type`, generate the `human_checklist` content using the reference checklists in `squads/navigator/data/human-checklist-templates.md`. Each type has a pre-defined checklist with the right commands for that project category.

### Step 5: Generate INDEX.md

Use template `nav-project-index-tmpl.md` with collected data (including `human_checklist`).

**IMPORTANT:** Generate `last_session_date` with BOTH date AND time in format: `YYYY-MM-DD às HH:MM`

```javascript
const now = new Date();
const date = now.toISOString().split('T')[0];
const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
const last_session_date = `${date} às ${time}`;  // Example: "2026-03-03 às 14:30"
```

Scan the codebase for relevant existing files:
1. Stories in `docs/stories/active/` and `docs/stories/completed/` matching project name
2. Epics in `docs/stories/epics/` matching project name
3. Sessions in `docs/sessions/` matching project name
4. Squads in `squads/` matching provided squad names
5. Scripts in `tools/` matching project name

Populate the INDEX.md with real paths to found files.

**IMPORTANT — Recursos e Tarefas:**

The template has two key sections to populate:

1. **Recursos do Projeto** — List ONLY squads/tools/skills that this project actually uses. Do NOT list all available resources. If the user mentioned squads, include only those + `navigator`.

2. **Próximas Tarefas** — Based on the project description, next_step, and squads provided, populate with 3-8 concrete next steps. Each row: order, task, resource name, activation command.

Example for a transcription project:
```markdown
| 1 | Baixar vídeos do curso da Cademi | `media-processor` | `/media-processor:tasks:download-cademi` |
| 2 | Transcrever todos os módulos | `media-processor` | `/media-processor:tasks:transcribe-media` |
| 3 | Editar e formatar transcrições | `transcript-sculptor` | `/transcript-sculptor:sculptor-chief` |
```

### Step 5: Update ACTIVE.md

Add a new row to the table in `docs/projects/ACTIVE.md`:

```markdown
| {Project Name} | {status_emoji} {status_text} | {session_timestamp} | {next_step} | [→ INDEX]({name}/INDEX.md) |
```

Where `{session_timestamp}` includes date AND time (e.g., "2026-03-03 às 14:30").

Update the "Última atualização" date at the top (also with time).

### Step 6: Verify

- All links in INDEX.md point to files that actually exist
- ACTIVE.md table is valid markdown
- Directory structure was created

## Output Example

```markdown
✅ Projeto criado com sucesso!

**Projeto:** Renan Vieira
**Status:** 🔄 Em andamento
**Diretório:** docs/projects/renan-vieira/

**Estrutura criada:**
  docs/projects/renan-vieira/
  ├── INDEX.md          ← Ponto de entrada (manda pro Claude)
  ├── scripts/
  ├── logs/             (gitignored)
  ├── data/
  └── runtime/

**ACTIVE.md atualizado** com nova linha na tabela.

**Arquivos detectados:**
  - 4 stories encontradas
  - 1 epic encontrado
  - 1 checkpoint encontrado
  - 2 squads relacionados

Para retomar este projeto em nova sessão:
  → Cole `docs/projects/renan-vieira/INDEX.md` no Claude
```

## Related

- **Agent:** @navigator (Vega)
- **Template:** nav-project-index-tmpl.md
- **Dashboard:** docs/projects/ACTIVE.md
- **Guideline:** CLAUDE.md → "Projetos de Cliente"
