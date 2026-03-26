# Human Checklist Templates

Reference file for generating `## Human Checklist` sections in project INDEX.md files.
Used by `nav-create-project` and `nav-create-project-auto` tasks.

---

## How to Use

When creating a new project, select the template based on `project_type` and render it into the `{{{human_checklist}}}` placeholder in `nav-project-index-tmpl.md`.

Replace `{project_name}` with the actual project slug (kebab-case).
Replace `{squad_name}` with the primary squad name if applicable.
Replace `{src_path}` with the app source path if applicable (e.g., `./apps/web/src`).

---

## Type: squad

For squad-based projects (elite minds, expansion packs, content squads).

```markdown
### A cada sessão
- [ ] `/navigator:tasks:nav-checkpoint` — Salvar estado antes de sair
- [ ] Verificar se `## Próximas Tarefas` está atualizado

### Qualidade do Squad (após criação ou mudanças significativas)
- [ ] `/squad-creator:squad-chief` → `*validate-squad {squad_name}` — Validação estrutural completa
- [ ] `/squad-creator:oalanicolas` → `*fidelity-score` — Score de fidelidade dos clones
- [ ] `/squad-creator:oalanicolas` → `*clone-review` — Review de qualidade e autenticidade
- [ ] `/squad-creator:pedro-valerio` → `*audit` — Audit de workflows, veto conditions, automação
- [ ] `/squad-creator:pedro-valerio` → `*axioma-assessment` — Score em 10 dimensões de qualidade
- [ ] `/squad-creator:pedro-valerio` → `*veto-check` — Verificar que veto conditions bloqueiam paths incorretos
- [ ] `/squad-creator:pedro-valerio` → `*smoke-test-design` — Desenhar 3 smoke tests para validar comportamento

### Primeiro uso real (prova de fogo)
- [ ] Ativar o chief do squad → `*help` → testar 2-3 comandos core
- [ ] Testar com caso real (não hipotético)
- [ ] Avaliar se output é utilizável sem edição

### Melhoria contínua (mensal)
- [ ] `/squad-creator:tasks:find-0.8` — Encontrar gaps de qualidade (items abaixo de 80%)
- [ ] `/squad-creator:tasks:squad-analytics` — Métricas e analytics do squad
- [ ] `/squad-creator:squad-chief` → `*quality-dashboard {squad_name}` — Dashboard
- [ ] `/squad-creator:squad-diagnostician` → `*check-ecosystem` — Verificar overlap com outros squads
- [ ] `/squad-creator:pedro-valerio` → `*modernization-score` — Score de modernização IDS
```

---

## Type: app

For application projects (web apps, mobile apps, dashboards, tools).

```markdown
### A cada sessão
- [ ] `/navigator:tasks:nav-checkpoint` — Salvar estado antes de sair
- [ ] `/magic-bob:bob-orchestrator` → `*status` — Ver fase atual do BOB

### Qualidade de código (a cada story completa)
- [ ] `/magic-bob:bob-guardian` → `*review-story` — Quality gate (cobertura, segurança, linting)
- [ ] `/magic-bob:bob-validator` → `*risk-score` — Avaliar risco técnico/business/cost
- [ ] `/magic-bob:bob-guardian` → `*checklist` — Ver checklist completo de qualidade
- [ ] `/magic-bob:bob-validator` → `*criteria-list` — Ver os 7 critérios de superfície (C001-C007)

### Design & Acessibilidade (a cada epic/milestone)
- [ ] `/design:tasks:a11y-audit` → `*a11y-audit {src_path}` — Audit WCAG 2.2 completo
- [ ] `/design:tasks:ds-audit-codebase` → `*audit {src_path}` — Scan de redundâncias UI
- [ ] `/design:tasks:validate-design-fidelity` → `*validate-tokens {src_path}` — Tokens corretos
- [ ] `/design:tasks:contrast-matrix` → `*contrast-matrix {src_path}` — Contraste WCAG
- [ ] `/design:tasks:focus-order-audit` → `*focus-order {src_path}` — Navegação por teclado
- [ ] `/design:tasks:aria-audit` → `*aria-audit {src_path}` — ARIA roles e properties

### Performance & Health (mensal)
- [ ] `/design:tasks:ds-health-metrics` → `*ds-health {src_path}` — Health score
- [ ] `/design:tasks:bundle-audit` → `*bundle-audit {src_path}` — Tamanho do bundle
- [ ] `/design:tasks:dead-code-detection` → `*dead-code {src_path}` — Código morto
- [ ] `/design:tasks:token-usage-analytics` → `*token-usage {src_path}` — Tokens usados/não usados
- [ ] `@navigator *navigator-doctor` — Health check do projeto
```

---

## Type: mind-clone

For mind cloning projects (expert personality extraction and validation).

```markdown
### A cada sessão
- [ ] `/navigator:tasks:nav-checkpoint` — Salvar estado antes de sair

### Validação do clone (após criação ou atualização de KBs)
- [ ] `/mind-cloning:mind-cloner` → `*smoke-test {project_name}` — 3 testes (BLOCKING GATE)
- [ ] `/icp-cloning:clone-validator` → `*test-30q` — 30 perguntas conversacionais
- [ ] `/icp-cloning:clone-validator` → `*checklist-100` — Checklist de 100 pontos (mínimo 90/100)
- [ ] `/icp-cloning:clone-validator` → `*calculate-fidelity` — Score de fidelidade (alvo: 95+)
- [ ] `/icp-cloning:clone-validator` → `*test-edge-cases` — Situações extremas e stress

### Qualidade do agent (após mudanças no squad)
- [ ] `/squad-creator:oalanicolas` → `*fidelity-score` — Score de fidelidade
- [ ] `/squad-creator:oalanicolas` → `*diagnose-clone` — Diagnosticar gaps
- [ ] `/squad-creator:pedro-valerio` → `*authenticity-check` — Verificar voz e thinking DNA
- [ ] `/squad-creator:pedro-valerio` → `*audit` — Audit de workflows e veto conditions

### Teste real (prova de fogo)
- [ ] Ativar o agent do clone → `*help` → testar 2-3 comandos
- [ ] Conversar sobre um tema que VOCÊ domina — o clone mantém paradoxos ou resolve tudo?
- [ ] Fazer 3 perguntas que só a pessoa real saberia responder
- [ ] Avaliar se linguagem "soa como" a pessoa (vocabulário, tom, ritmo)

### Melhoria (quando score < 90 ou após feedback)
- [ ] `/mind-cloning:mind-cloner` → `*diagnose-clone {project_name}` — Diagnosticar fraqueza
- [ ] `/icp-cloning:clone-validator` → `*refine-clone [area]` — Refinamento direcionado
- [ ] `/mind-content-updater:mind-content-updater` → `*help` — Atualizar com novos conteúdos
```

---

## Type: pipeline

For processing pipelines (transcription, ETL, batch conversion, data processing).

```markdown
### A cada sessão
- [ ] `/navigator:tasks:nav-checkpoint` — Salvar estado antes de sair
- [ ] Verificar status JSON para progresso atualizado

### Validação de output (a cada batch concluído)
- [ ] Verificar 3-5 amostras aleatórias do output
- [ ] `/transcript-sculptor:tasks:task-validate-quality` — Qualidade de transcrição (se aplicável)
- [ ] `/etl-universal-converter:tasks:validate-output` — Validar estrutura e conteúdo
- [ ] Conferir métricas: total processado vs falhas vs % completo

### Qualidade de transcrição (se aplicável)
- [ ] Ouvir 30s de 3 arquivos aleatórios e comparar com transcrição
- [ ] Verificar speaker identification (se multi-speaker)
- [ ] Verificar timestamps e segmentação

### Pipeline health
- [ ] `@navigator *status-report` — Relatório de status
- [ ] Verificar disk space nos destinos
- [ ] Verificar se há items travados/com erro
- [ ] Conferir que timeouts e recursos estão adequados para o batch atual
```

---

## Type: knowledge

For knowledge base and platform projects (prospecção, CRM, content hubs).

```markdown
### A cada sessão
- [ ] `/navigator:tasks:nav-checkpoint` — Salvar estado antes de sair

### Qualidade da Knowledge Base
- [ ] Testar 3 perguntas sobre o domínio do projeto
- [ ] Verificar se knowledge base (data files) está atualizado com informações recentes
- [ ] Verificar se scoring/regras refletem prática real

### Qualidade dos Squads associados
- [ ] `/squad-creator:squad-chief` → `*validate-squad {squad_name}` — Validação estrutural
- [ ] `/squad-creator:pedro-valerio` → `*audit` — Audit de workflows e veto conditions

### Teste real (prova de fogo)
- [ ] Ativar o chief do squad principal → testar pipeline com caso real
- [ ] Review de outputs antes de enviar para cliente/stakeholder
- [ ] Testar edge cases (inputs inesperados, dados faltantes)

### Melhoria contínua (mensal)
- [ ] `/squad-creator:tasks:find-0.8` — Encontrar gaps de qualidade
- [ ] `/squad-creator:tasks:squad-analytics` — Métricas do squad
- [ ] Verificar se há novos dados/conteúdos para integrar na KB
```

---

## Notes

- **Persistent format:** Items are marked `[x]` with date: `- [x] Item (2026-03-05)`
- **Items never reset** — they track lifetime progress of the project
- **"A cada sessão" items** are the exception — they can be re-checked each session
- **aiosprojectmonitor** reads INDEX.md and displays checklist progress automatically
- **Template selection** falls back to `squad` if type cannot be determined
