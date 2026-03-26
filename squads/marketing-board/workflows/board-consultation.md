# Workflow: Board Consultation

**Workflow ID**: board-consultation
**Version**: 1.0.0
**Trigger**: `/consult-board`, `/evaluate-deal`, `/strategic-review`
**Cadence**: Ad-hoc (consult/deal) ou semanal/quinzenal (review)

---

## Overview

Workflow unificado do Advisory Board. 3 conselheiros (Naval, Hormozi, Thiel) analisam a questão por lentes distintas, convergem, e o Agente Chefe (Elon Musk) decide com ação + deadline.

---

## Flow Diagram

```
ENTRADA
━━━━━━
  Questão estratégica
  (deal, strategy, priority, positioning, pricing)
       │
       ▼
┌──────────────────────┐
│  ENQUADRAR QUESTÃO   │
│                      │
│  1. Tipo de decisão  │
│  2. Urgência         │
│  3. Peso por advisor │
│  4. Dados disponíveis│
│                      │
│  Se dados faltam →   │
│  perguntar antes     │
└──────┬───────────────┘
       │
       ▼
  Carregar contexto minds
  1. squads/mind-cloning/minds/{slug}/system_prompts/ (prioridade)
  2. data/decision-frameworks.yaml (fallback)
  3. agents/board-orchestrator.md (base)


CONSELHEIROS (sequencial)
━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────┐
│  NAVAL RAVIKANT                      │
│  Lente: Leverage + Equity            │
│  "Isso escala sem presença?"         │
│                                      │
│  → Diagnóstico (2-3 frases)          │
│  → Recomendação (1 ação)             │
│  → Veredicto (1 frase)              │
└──────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  ALEX HORMOZI                        │
│  Lente: Monetização + Unit Economics │
│  "Qual é a matemática?"             │
│                                      │
│  → Diagnóstico (2-3 frases)          │
│  → Recomendação (1 ação)             │
│  → Veredicto (1 frase)              │
└──────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  PETER THIEL                         │
│  Lente: Monopólio + Contrarian       │
│  "Está competindo ou criando?"       │
│                                      │
│  → Diagnóstico (2-3 frases)          │
│  → Recomendação (1 ação)             │
│  → Veredicto (1 frase)              │
└──────────────────────────────────────┘


CONVERGÊNCIA
━━━━━━━━━━━━

| Aspecto | Naval | Hormozi | Thiel | Consenso |
|---------|-------|---------|-------|----------|

  Identificar:
  - Acordo forte (2+ concordam) → sinal forte
  - Divergência → oportunidade de insight
  - Ponto cego → o que nenhum cobriu


### Checkpoint: Aprovação do Usuário
Após os 3 conselheiros emitirem suas perspectivas, PAUSAR e apresentar resumo ao usuário.
Perguntar: "Os 3 conselheiros deram suas perspectivas. Quer que o Agente Chefe decida agora, ou quer ajustar algo?"


AGENTE CHEFE
━━━━━━━━━━━━

┌──────────────────────────────────────┐
│  ELON MUSK (DECISOR)                 │
│                                      │
│  Recebe: 3 perspectivas +            │
│          tabela convergência         │
│                                      │
│  1. Aplica first principles          │
│  2. Remove complexidade              │
│  3. Entrega:                         │
│     DECISÃO: [o que fazer]           │
│     AÇÃO: [próximo passo concreto]   │
│     DEADLINE: [quando]               │
│                                      │
│  Tone: Urgente, pragmático,          │
│  impaciente com complexidade.        │
│  "Faça X. Até [data]. Porque [1     │
│   frase]."                           │
└──────┬───────────────────────────────┘
       │
       ▼
  Salvar sessão
  docs/logs/YYYY-MM-DD_board-{tipo}.md
```

---

## Variantes por Tipo

### `/consult-board` (Consulta Genérica)

| Campo | Valor |
|-------|-------|
| Input | Questão + contexto opcional |
| Peso conselheiros | Balanceado |
| Output | Decisão + ação + deadline |
| Template | templates/board-session-report.md |

### `/evaluate-deal` (Avaliação de Deal)

| Campo | Valor |
|-------|-------|
| Input | Parceiro + perfil + estrutura + contribuição |
| Peso conselheiros | Naval (deal structure), Hormozi (math), Thiel (positioning) |
| Extra | Deal scoring (0-3 SIM), kill condition |
| Output | ACEITAR / REJEITAR / RENEGOCIAR + condições |
| Template | templates/board-session-report.md |

**Deal Scoring:**

| Score | Significado | Ação |
|-------|------------|------|
| 3/3 SIM | Deal excepcional | Executar HOJE |
| 2/3 SIM | Deal bom com ressalva | Executar com ajuste |
| 1/3 SIM | Deal questionável | Renegociar ou recusar |
| 0/3 SIM | Deal ruim | Recusar imediatamente |

### `/strategic-review` (Revisão Estratégica)

| Campo | Valor |
|-------|-------|
| Input | Período + receita + deals + pipeline + blockers + wins |
| Peso conselheiros | Balanceado com foco específico por advisor |
| Extra | Dashboard de situação, runway, priorização MANTER/ACELERAR/CORTAR |
| Output | Prioridade #1 da próxima semana em 1 frase |
| Template | templates/board-session-report.md |

**Cadência review:**

| Frequência | Tipo | Profundidade |
|------------|------|-------------|
| Semanal (sexta) | Quick review | Dashboard + Elon prioriza |
| Quinzenal | Full review | Todos conselheiros + convergência |
| Mensal | Deep review | Full + tendência + ajuste meta |
| Trimestral | Strategic pivot | Reavaliação completa |

---

## Mind Integration

| Advisor | Slug | Status | Fallback |
|---------|------|--------|----------|
| Naval Ravikant | `naval_ravikant` | 35% | decision-frameworks.yaml |
| Alex Hormozi | `alex_hormozi` | 70% | decision-frameworks.yaml |
| Peter Thiel | `peter_thiel` | 45% | decision-frameworks.yaml |
| Elon Musk | `elon_musk` | 75% | decision-frameworks.yaml |

**Prioridade de carregamento:**
1. `squads/mind-cloning/minds/{slug}/system_prompts/` (se existir)
2. `data/decision-frameworks.yaml` (fallback)
3. Definição em `agents/board-orchestrator.md` (base)

---

## Commands do Board

| Command | Descrição | Task |
|---------|-----------|------|
| `*consult` | Questão ao board completo | consult-board.md |
| `*deal` | Avaliar parceria/deal | evaluate-deal.md |
| `*review` | Revisão estratégica | strategic-review.md |
| `*naval` | Consultar Naval individual | — |
| `*hormozi` | Consultar Hormozi individual | — |
| `*thiel` | Consultar Thiel individual | — |
| `*elon` | Consultar Elon individual | — |
| `*debate` | Provocar debate entre advisors | — |

---

## Quality Gate

Toda sessão do board passa pelo checklist `checklists/board-decision-quality.md`:
- [ ] Todos conselheiros emitiram perspectiva autêntica
- [ ] Tabela de convergência preenchida
- [ ] Agente Chefe entregou decisão com ação + deadline
- [ ] Sessão salva em docs/logs/
- [ ] José sabe exatamente o que fazer HOJE

---

*Workflow v1.0.0 — Unificado de tasks/consult-board.md + evaluate-deal.md + strategic-review.md*
