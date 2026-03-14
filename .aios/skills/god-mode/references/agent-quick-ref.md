# Agent Quick Reference

## Matriz Completa de Agents

| Agent | Persona | Ativação | Especialidade | Comandos-chave |
|-------|---------|----------|---------------|----------------|
| `@dev` | Dex (Builder) | `/AIOS:agents:dev` | Codigo, testes, git local | `*develop`, `*run-tests`, `*track-attempt`, `*rollback` |
| `@qa` | Quinn (Guardian) | `/AIOS:agents:qa` | Quality gates, review | `*review`, `*gate`, `*qa-loop`, `*escalate-qa-loop` |
| `@architect` | Aria (Visionary) | `/AIOS:agents:architect` | Arquitetura, tech decisions | `*design-system`, `*assess-complexity`, `*plan-implementation` |
| `@pm` | Morgan (Strategist) | `/AIOS:agents:pm` | PRDs, epics, specs | `*create-prd`, `*create-epic`, `*execute-epic`, `*gather-requirements`, `*write-spec` |
| `@po` | Pax (Balancer) | `/AIOS:agents:po` | Validacao stories, backlog | `*validate-story-draft`, `*prioritize-backlog` |
| `@sm` | River (Facilitator) | `/AIOS:agents:sm` | Criar stories, sprints | `*draft`, `*create-story`, `*create-next-story` |
| `@analyst` | Atlas (Decoder) | `/AIOS:agents:analyst` | Pesquisa, analise, ROI | `*research`, `*brainstorm`, `*calculate-roi` |
| `@data-engineer` | Dara (Specialist) | `/AIOS:agents:data-engineer` | Schema, migrations, RLS | `*design-schema`, `*create-migration`, `*audit-db` |
| `@ux-design-expert` | Uma (Designer) | `/AIOS:agents:ux-design-expert` | UI/UX, wireframes | `*design-ui`, `*create-wireframe`, `*audit-accessibility` |
| `@devops` | Gage (Operator) | `/AIOS:agents:devops` | Push, PRs, CI/CD, MCP | `*pre-push`, `*push`, `*create-pr`, `*add-mcp`, `*remove-mcp` |
| `@aiox-master` | Orion (Orchestrator) | `/AIOS:agents:aios-master` | Governanca, escalation | `*diagnose`, `*enforce-constitution`, `*mediate` |

## Agent Locations

| Type | Path Pattern | Example |
|------|-------------|---------|
| Core agent definition | `.aiox-core/development/agents/{id}/` (PASTA) | `agents/dev/dev.md` |
| Core agent memory | `.aiox-core/development/agents/{id}/MEMORY.md` | `agents/dev/MEMORY.md` |
| Core slash command | `.claude/commands/AIOS/agents/{id}.md` | `AIOS/agents/dev.md` |
| Squad agent definition | `squads/{squad}/agents/{id}.md` (ARQUIVO) | `squads/advisor-board/agents/hormozi.md` |
| Squad slash command | `.claude/commands/{squad}/{id}.md` | `advisor-board/hormozi.md` |

**IMPORTANTE:** Core agents vivem em **pastas** (ex: `agents/dev/`), squad agents em **arquivos** soltos.

## Exclusive Authority Matrix

```
┌─────────────────────────────────────────────────────────┐
│ OPERACAO              │ EXCLUSIVO │ OUTROS = BLOCK      │
├───────────────────────┼───────────┼─────────────────────┤
│ git push / PRs        │ @devops   │ Delegar sempre      │
│ MCP management        │ @devops   │ Delegar sempre      │
│ Releases / Tags       │ @devops   │ Delegar sempre      │
│ Story validation      │ @po       │ Delegar sempre      │
│ Story creation        │ @sm       │ Delegar sempre      │
│ Epic orchestration    │ @pm       │ Delegar sempre      │
│ Architecture decides  │ @architect│ Consultar primeiro   │
│ Schema design         │ @data-eng │ Delegado de @arch   │
│ Framework governance  │ @aiox-mstr│ Escalar se preciso  │
└─────────────────────────────────────────────────────────┘
```

## Git Restrictions (Art. II)

| Agent | git add/commit/status/diff/log/branch | git push / gh pr | MCP mgmt |
|-------|---------------------------------------|------------------|----------|
| `@dev` | ALLOWED | BLOCKED → @devops | BLOCKED |
| `@qa` | ALLOWED | BLOCKED → @devops | BLOCKED |
| `@architect` | ALLOWED | BLOCKED → @devops | BLOCKED |
| `@sm` | ALLOWED | BLOCKED → @devops | BLOCKED |
| `@devops` | ALLOWED | **EXCLUSIVE** | **EXCLUSIVE** |
| Others | Read-only | BLOCKED → @devops | BLOCKED |

## Cross-Agent Flows

### Story Flow (mais comum)
```
@sm *draft → @po *validate → @dev *develop → @qa *gate → @devops *push
```

### Epic Flow
```
@pm *create-epic → @pm *execute-epic → @sm *draft (por story) → SDC
```

### Schema Flow
```
@architect (decide tecnologia) → @data-engineer (implementa DDL)
```

### Git Push Flow
```
QUALQUER agent → delega para @devops *push
```

### Escalation Flow
```
Agent bloqueado → @aiox-master media → resolve → retorna ao agent
```

### Research → Build Flow
```
@analyst *research → @architect *design → @pm *create-prd → SDC
```

### Multi-Agent Parallel (Hub-and-Spoke)
```
    ┌─ @analyst (pesquisa)
@pm ┼─ @architect (design)
    └─ @ux (wireframes)
    → merge → @dev (implementar)
```
