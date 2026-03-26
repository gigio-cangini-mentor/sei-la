# Da Ideia ao Deploy — Guia para Imprimir

> Cole na parede. Nunca mais esqueca nenhum passo.
> Atualizado em 2026-03-25 | 58 skills, 12 agentes, 8 worlds

---

## Como Comecar Qualquer Projeto

```
mkdir ~/CODE/Projects/meu-app && cd ~/CODE/Projects/meu-app
claude
/quest
```

**`/quest` faz tudo:** diagnostica, instala AIOS, abre dashboard, cria checklist.
**Dashboard:** abre automaticamente no segundo monitor (http://localhost:5000+)

---

## Os 8 Worlds da Jornada

```
WORLD 0: A Oficina ................ Setup do projeto
WORLD 1: O Mapa do Tesouro ....... Pesquisa e ideacao
WORLD 2: A Planta da Fortaleza ... PRD e arquitetura
WORLD 3: O Pergaminho ............ Stories
WORLD 4: A Forja ................. Implementacao
WORLD 5: O Tribunal .............. Qualidade
WORLD 6: O Portal do Deploy ...... Push e PR
WORLD 7: A Torre de Vigia ........ Manutencao
```

**Atalho:** `/forge "descricao"` automatiza Worlds 1-6 inteiro.

---

## WORLD 0 — A Oficina (Setup)

> `/quest` faz automaticamente. Voce so confirma.

| # | Missao | Comando | XP |
|---|--------|---------|-----|
| 0.1 | Instalar AIOS | `/quest` faz | 20 |
| 0.2 | Setup ambiente (Node, CLIs) | `/devops` → `*environment-bootstrap` | 20 |
| 0.3 | Configurar GitHub + CodeRabbit | `/devops` → `*setup-github` | 15 |
| 0.4 | Rodar projeto localmente | Pedir ao Claude | 15 |
| 0.5 | README + CLAUDE.md | Pedir ao Claude | 15 |
| 0.6 | Auditar configs | `/audit-project-config` | 10 |
| 0.7 | Configurar MCPs | `/devops` → `*search-mcp` | 5 |

---

## WORLD 1 — O Mapa do Tesouro (Pesquisa)

> `/forge` faz na Phase 0-1. Ou faca manualmente:

| # | Missao | Comando | Obrig? | XP |
|---|--------|---------|--------|-----|
| 1.1 | Brainstorming | `/superpowers:brainstorming` | SIM | 30 |
| 1.2 | Pesquisa mercado | `/deep-research` ou `/tech-search` | Se novo | 25 |
| 1.3 | Investigar concorrentes | `/sherlock-investigator` | Opc | 10 |
| 1.4 | Scraping de dados | `/apify` ou `/smart-browser-playwright` | Opc | 10 |
| 1.5 | Board de advisors | `/advisor-board:README` | Opc | 5 |

---

## WORLD 2 — A Planta da Fortaleza (Spec)

> `/forge` faz na Phase 1. Ou faca manualmente:

| # | Missao | Comando | Obrig? | XP |
|---|--------|---------|--------|-----|
| 2.1 | Criar PRD | `@pm` → `*create-prd` ou `/prd-generator` | SIM | 35 |
| 2.2 | Arquitetura tecnica | `@architect` → `*create-fullstack-arch` | SIM | 30 |
| 2.3 | Schema do banco | `@data-engineer` → `*schema-design` | Se DB | 20 |
| 2.4 | Wireframes | `@ux` → `*wireframe` | Se UI | 15 |
| 2.5 | Design system ref. | `/design-system-extractor` | Opc | 10 |
| 2.6 | Arvore de decisoes | `/decision-tree-generator` | Opc | 10 |
| 2.7 | Criar Epic | `@pm` → `*create-epic` | SIM | 20 |
| 2.8 | QA review spec | `@qa` (score >= 4/5) | SIM | 10 |

---

## WORLD 3 — O Pergaminho (Stories)

> `/forge` faz na Phase 2. Ou faca manualmente:

| # | Missao | Comando | Obrig? | XP |
|---|--------|---------|--------|-----|
| 3.1 | Criar stories | `@sm` → `*create-story` | SIM | 30 |
| 3.2 | Validar stories | `@po` → `*validate-story` (>= 7/10) | SIM | 30 |
| 3.3 | Ordenar backlog | `@po` → `*backlog-review` | SIM | 20 |
| 3.4 | Plano implementacao | `/superpowers:writing-plans` | Opc | 20 |

---

## WORLD 4 — A Forja (Build) — repetir por story

> `/forge` faz na Phase 3. Ou faca manualmente:

| # | Missao | Comando | Obrig? | XP |
|---|--------|---------|--------|-----|
| 4.1 | Worktree isolado | `/superpowers:using-git-worktrees` | Opc | 10 |
| 4.2 | Implementar story | `@dev` → `*develop-story` | SIM | 50 |
| 4.3 | Lint + typecheck + tests | `npm run lint && typecheck && test` | SIM | 30 |
| 4.4 | Testes exaustivos | `/bulletproof-test` | Rec | 30 |
| 4.5 | TDD (alternativa) | `/superpowers:test-driven-development` | Opc | 10 |
| 4.6 | QA Gate | `@qa` → `*gate` | SIM | 30 |
| 4.7 | Fixes de QA | `@dev` → `*apply-qa-fixes` | Se falhou | 15 |
| 4.8 | Verificacao final | `/superpowers:verification-before-completion` | SIM | 25 |

---

## WORLD 5 — O Tribunal da Qualidade

> `/forge` faz na Phase 4 (com extended gates). Ou faca manualmente:

| # | Missao | Comando | Obrig? | XP |
|---|--------|---------|--------|-----|
| 5.1 | Code review | `/superpowers:requesting-code-review` | SIM | 25 |
| 5.2 | Aplicar feedback | `/superpowers:receiving-code-review` | Se rev | 15 |
| 5.3 | Seguranca OWASP | `/vulnerability-scanner` | Rec | 25 |
| 5.4 | Refactoring | `/code-refactoring-refactor-clean` | Se debt | 15 |
| 5.5 | Audit frontend | `/tokenizacao` | Se UI | 15 |
| 5.6 | Tier-S checklist | `/tier-s-checklist` | Rec | 25 |
| 5.7 | Process audit | `@pedro-valerio` | Full app | 20 |
| 5.8 | Output quality | Kaizen squad | Full app | 15 |
| 5.9 | Build final | `npm run build` | SIM | 15 |

---

## WORLD 6 — O Portal do Deploy

> `/forge` faz na Phase 5. SO @devops toca aqui.

| # | Missao | Comando | XP |
|---|--------|---------|-----|
| 6.1 | Gate pre-push | `@devops` → `*pre-push` | 25 |
| 6.2 | Commit | `@devops` → `*commit` | 25 |
| 6.3 | Push | `@devops` → `*push` | 40 |
| 6.4 | Pull Request | `@devops` → `*create-pr` | 35 |
| 6.5 | Finalizar branch | `/superpowers:finishing-a-development-branch` | 25 |

---

## WORLD 7 — A Torre de Vigia (Pos-Deploy)

| # | Missao | Comando | Quando |
|---|--------|---------|--------|
| 7.1 | Sync projetos | `/sync-pulse` | Periodicamente |
| 7.2 | Audit ecossistema | `/ecosystem-audit` | Mensalmente |
| 7.3 | Quality scores | `/quality-dashboard` | Mensalmente |
| 7.4 | Limpar memoria | `/memory-audit` | Quando poluida |
| 7.5 | Otimizar contexto | `/context-surgeon` | Se lento |
| 7.6 | Audit configs | `/audit-project-config` | Apos updates |

---

## Modos de Operacao

| Modo | Como | O que faz |
|------|------|-----------|
| **Full Auto** | `/forge "descricao"` | Worlds 1-6, voce so confirma 2x |
| **Guiado** | `/quest` + `/pipeline-checklist next` | Passo a passo com XP |
| **Feature** | `/forge feature "desc"` | Worlds 4-6 (sem spec) |
| **Bug fix** | `/forge fix "bug"` | World 4 light + 6 |
| **Brownfield** | `/forge scan` | Diagnostico sem implementar |

---

## Cola Rapida — Skills por Momento

```
COMECAR PROJETO:
  /quest                    → Setup + dashboard + checklist

ANTES DE CODAR:
  /superpowers:brainstorming → Explorar ideias
  /deep-research             → Pesquisar mercado
  /prd-generator             → Gerar PRD
  /decision-tree-generator   → Mapear decisoes

DURANTE O CODIGO:
  /superpowers:writing-plans → Planejar
  /superpowers:test-driven-development → TDD
  /bulletproof-test          → Testes exaustivos

ANTES DE ENTREGAR:
  /superpowers:verification-before-completion → Checar
  /superpowers:requesting-code-review → Review
  /vulnerability-scanner     → Seguranca
  /tier-s-checklist          → Producao-ready
  /tokenizacao               → Frontend audit

DEPOIS DE ENTREGAR:
  /ecosystem-audit           → Saude geral
  /quality-dashboard         → Scores
  /memory-audit              → Limpeza
```

---

## Catalogo por Dominio

### Frameworks

| Stack | Skill |
|-------|-------|
| React/Next.js | `/nextjs-react-expert` |
| Angular | `/angular` + `/angular-state-management` |
| Avalonia | `/avalonia-viewmodels-zafiro` |
| Godot | `/godot-gdscript-patterns` |
| Unreal | `/unreal-engine-cpp-pro` |
| Games | `/game-development` (roteia auto) |
| MCP | `/mcp-builder` |

### Conteudo

| Objetivo | Skill |
|----------|-------|
| Landing page | `/lp-generator` |
| Imagens PNG | `/image-creator` |
| Videos | `/video-generator` |
| PPTX | `/pptx-generator` |
| Dashboard visual | `/dashboard-generator` |
| Redes sociais | `/blotato` ou `/instagram-publisher` |
| Copy vendas | Copy Chief ou `/copywriting-squad:README` |
| Canva | `/canva` |

### Pesquisa

| Objetivo | Skill |
|----------|-------|
| Geral profunda | `/deep-research` |
| Geral rapida | `/deep-search` |
| Tecnica | `/tech-search` |
| Perfis sociais | `/sherlock-investigator` |
| Scraping | `/apify` |
| Browser AI | `/smart-browser-playwright` |

### Audio

| Volume | Skill |
|--------|-------|
| Pequeno (1-30) | `/groq-transcriber` |
| Grande (50+) | `/deepgram-transcriber` |
| Livro → MD | `/book-to-markdown` |

---

## Hierarquia Visual

```
/quest (um comando)
  |
  └─→ /forge "descricao" (tudo automatico)
       |
       ├─ Phase 0: Discovery ........ /superpowers:brainstorming
       ├─ Phase 1: Spec ............. @pm + @architect + @analyst
       ├─ Phase 2: Stories .......... @sm + @po
       ├─ Phase 3: Build ............ @dev + @qa (por story)
       ├─ Phase 4: Integration ...... @qa + @pedro-valerio + @kaizen
       │   └─ Extended Gates:
       │      ├─ /bulletproof-test
       │      ├─ /vulnerability-scanner
       │      ├─ /tier-s-checklist
       │      ├─ /tokenizacao (se frontend)
       │      └─ /code-refactoring (se tech debt)
       └─ Phase 5: Deploy ........... @devops (exclusivo)
```

---

## Niveis do Pipeline Quest

```
Lv.1  Apprentice Builder    0-99 XP
Lv.2  Junior Architect    100-249 XP
Lv.3  Code Warrior        250-449 XP
Lv.4  Quality Guardian    450-649 XP
Lv.5  Deploy Commander    650-849 XP
Lv.6  Master Builder      850-999 XP
Lv.7  LEGEND                 1000 XP
```

---

## Regra de Ouro

```
/quest → /forge → /pipeline-checklist next → trabalhar → check → repeat
```

**Se lembrar so de uma coisa:** `/quest`

---

*AIOS Core v4.1 | Pipeline Quest v2.0 | 2026-03-25*
