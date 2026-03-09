---
task: Create Client Project
responsavel: "@navigator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - project_name: Nome do projeto em kebab-case (ex: "renan-vieira")
  - project_description: Descrição breve do projeto
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

### Step 4: Generate INDEX.md

Use template `nav-project-index-tmpl.md` with collected data.

Scan the codebase for relevant existing files:
1. Stories in `docs/stories/active/` and `docs/stories/completed/` matching project name
2. Epics in `docs/stories/epics/` matching project name
3. Sessions in `docs/sessions/` matching project name
4. Squads in `squads/` matching provided squad names
5. Scripts in `tools/` matching project name

Populate the INDEX.md with real paths to found files.

### Step 5: Update ACTIVE.md

Add a new row to the table in `docs/projects/ACTIVE.md`:

```markdown
| {Project Name} | {status_emoji} {status_text} | {today_date} | {next_step} | [→ INDEX]({name}/INDEX.md) |
```

Update the "Última atualização" date at the top.

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
