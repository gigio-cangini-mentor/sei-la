# Merge: squad-creator + squad-creator-pro

**Objetivo:** Consolidar os dois squads em um só (`squad-creator`), preservando o melhor de cada um.
**Estratégia:** squad-creator absorve os assets únicos do -pro. Depois, -pro vai para `_archived/`.
**Ação #2 do Top 10** — [INDEX](../INDEX.md)
**Executado em:** 2026-03-26

---

## Fase 1: Preparação

- [x] **1.1** ~~Criar branch dedicada~~ — Executado na branch existente `chore/devops-10-improvements`
- [x] **1.2** Snapshot: copiado para `squads/_archived/squad-creator-pro-snapshot/`

## Fase 2: Copiar assets únicos do -pro para squad-creator

### Scripts (já existiam no original — -pro tinha cópia)
- [x] **2.1** Verificado: original já tinha scripts/ com 16+ arquivos. -pro tinha cópia idêntica.
- [x] **2.2** Zero paths hardcoded de `-pro` nos scripts

### Minds/Heurísticas (12 arquivos — únicos do -pro)
- [x] **2.3** Copiado `minds/oalanicolas/` e `minds/pedro_valerio/` com heurísticas + artefatos

### Checklists extras (5 que -pro tem e original não)
- [x] **2.4** Copiados:
  - `task-anatomy-checklist.md`
  - `agent-quality-gate.md`
  - `quality-gate-checklist.md`
  - `mind-validation.md`
  - `executor-matrix-checklist.md`

### Workflow único
- [x] **2.5** Copiado `wf-etl-to-mind-clone.yaml`

### Skill
- [x] **2.6** Copiado `skills/squad.md`

### Templates extras
- [x] **2.7** Copiados 6 templates exclusivos do -pro:
  - `config-tmpl.yaml`, `pop-extractor-prompt.md`, `quality-gate-tmpl.yaml`
  - `readme-tmpl.md`, `template-tmpl.yaml`, `workflow-tmpl.yaml`

### Data extras
- [x] **2.8** Copiados 4 data files exclusivos do -pro:
  - `ecosystem-cache.json`, `executor-matrix-framework.md`
  - `quality-dimensions-framework.md`, `tier-system-framework.md`

## Fase 3: Resolver conflitos de versão

### Tasks com versões diferentes (original mais profundo)
- [x] **3.1** Original já tinha versões mais profundas de todas as tasks an-* e pv-*
- [x] **3.2** Verificado: zero tasks exclusivas do -pro (todas existiam no original)

### Config
- [x] **3.3** Original já tinha `model-routing.yaml` e `scoring-rubric.yaml`
- [x] **3.4** Copiado `config/squad-config.yaml` do -pro

### squad-chief.md
- [x] **3.5** squad-chief.md: original (1553L) já contém TODAS as seções do -pro. -pro era versão trimada. Nada a mergear.

## Fase 4: Atualizar referências

- [x] **4.1** `config.yaml` atualizado para v4.0.0 com nota de merge
- [ ] **4.2** Atualizar `README.md` com nota de consolidação *(baixa prioridade — funcional sem isso)*
- [x] **4.3** Grep + fix de `squad-creator-pro` em todo o repo:
  - Corrigidos: 16 arquivos ativos (configs de outros squads, ACTIVE.md, catalog, ECOSYSTEM-INDEX, etc.)
  - Removidos: `.claude/commands/squad-creator-pro/`, `.codex/commands/squad-creator-pro/`, `.gemini/commands/squad-creator-pro/`, `.gemini/rules/squad-creator-pro/`
  - Mantidos como histórico: sessions/, handoffs/, stories/completed/
- [x] **4.4** ECOSYSTEM-AUDIT atualizado: -pro marcado ARCHIVED, squad-creator bumped para 9.0, recomendação #1 marcada ✅, contagem 64 squads

## Fase 5: Deprecar -pro

- [x] **5.1** Movido `squads/squad-creator-pro/` → `squads/_archived/squad-creator-pro/`
- [x] **5.2** Removidos slash commands do -pro em `.claude/`, `.codex/`, `.gemini/`
- [x] **5.3** `squads/README.md` atualizado

## Fase 6: Validação

- [ ] **6.1** Rodar `squad-creator` e verificar que todos os comandos funcionam
- [ ] **6.2** Verificar que nenhum slash command quebrou
- [x] **6.3** Grep final: restam apenas referências intencionais (config.yaml nota de merge, checklist, INDEX, audit)
- [x] **6.4** INDEX.md atualizado: ação #2 marcada ✅, histórico com entrada do merge

---

## Decisões tomadas
- Estratégia: opção 1 (squad-creator absorve -pro)
- Para tasks duplicadas: manter versão com mais linhas (original ganha em todas)
- squad-creator-pro movido para `_archived/`, não deletado
- Snapshot de segurança em `_archived/squad-creator-pro-snapshot/`

## Pendências (baixa prioridade)
- **4.2** README.md com nota de consolidação (cosmético)
- **6.1** Smoke test do squad-creator (requer ativação manual)
- **6.2** Verificação de slash commands (requer ativação manual)
