# Workflow: Weekly Marketing Cycle

**Workflow ID**: weekly-marketing-cycle
**Version**: 1.0.0
**Trigger**: Domingo/Segunda (planning) + Domingo (metrics)
**Cadence**: Semanal

---

## Overview

Ciclo semanal completo do marketing arm: planejamento no início da semana, execução diária, e análise no final. Inclui feedback loop obrigatório que atualiza o Content Map.

---

## Flow Diagram

```
DOMINGO/SEGUNDA — PLANEJAMENTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

@marketing-ideation
       │
       ▼
  Revisar semana anterior
  (outputs/hubs/marketing/)
       │
       ▼
  Gerar 5 Big Ideas (seg-sex)
  Consultar content-map.yaml
  Respeitar rotacao de temas
       │
       ▼
  Apresentar plano semanal
  | Dia | Tema | Big Idea | Angulo | Prova |
       │
       ▼
  Jose aprova/ajusta
       │
       ▼
  Atualizar queue em content-map.yaml


SEGUNDA A SEXTA — EXECUÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━

  /daily-content (ver workflow daily-content-pipeline.md)
  Executar 1x por dia util
  Segue queue do content-map.yaml


DOMINGO — ANALISE
━━━━━━━━━━━━━━━━━

@marketing-metrics
       │
       ▼
  Coletar dados IG (Apify automatico)
  Coletar dados LinkedIn (manual)
       │
       ▼
  Calcular 3 KPIs oficiais
  ┌────────────────────────────────────┐
  │ Save Rate IG    meta ≥ 3%         │
  │ Save Rate LI    meta ≥ 2%         │
  │ DMs/semana      meta ≥ 5 (fase 1) │
  │ Purple Cow Avg  meta ≥ 4.0/5      │
  └────────────────────────────────────┘
       │
       ▼
  Identificar padrões
  (tema, formato, horário, hook)
       │
       ▼
  3 ajustes acionaveis
       │
       ▼
┌──────────────────────────────┐
│  GATE — Forced Feedback Loop │ ⛔ BLOQUEANTE
│                              │
│  @metrics ATUALIZA           │
│  content-map.yaml:           │
│  - Reduz temas fracos        │
│  - Aumenta temas fortes      │
│  - Adiciona novas ideias     │
│                              │
│  @cmo REVISA mudanças:       │
│  - Faz sentido estratégico?  │
│  - SVA servida?              │
│  - Não perseguindo vanity?   │
│                              │
│  Se não atualizar → flag de  │
│  falha no relatório          │
└──────────────┬───────────────┘
               │
               ▼
  Content Map atualizado
  → próxima semana começa
```

---

## Calendário de Temas (Rotação Fixa)

| Dia | Tema | Peso |
|-----|------|------|
| Segunda | OPES in Practice | 40% |
| Terca | Nexialismo Aplicado | 35% |
| Quarta | Jornada Real | 25% |
| Quinta | OPES in Practice | 40% |
| Sexta | Reflexão/Provocação | — |

---

## Tasks Envolvidas

| Ordem | Task | Quando | Agent Principal |
|-------|------|--------|-----------------|
| 1 | `/weekly-content-plan` | Domingo/Segunda | @marketing-ideation |
| 2 | `/daily-content` (5x) | Seg-Sex | Pipeline completo (6 agents) |
| 3 | `/metrics-weekly` | Domingo | @marketing-metrics + @marketing-cmo |

---

## Feedback Loop (Obrigatório)

```
Semana N: Publicar conteúdo
    ↓
Domingo: @metrics coleta dados
    ↓
@metrics atualiza content-map.yaml
    ↓
@cmo valida mudanças
    ↓
Semana N+1: Planejamento usa Content Map atualizado
    ↓
(ciclo repete)
```

**Se o loop falhar** (metrics não atualizar content-map):
- Semana seguinte usa queue antiga
- Relatório registra "feedback loop falhou"
- @cmo deve intervir

---

## Outputs Semanais

| Output | Path | Frequência |
|--------|------|------------|
| Plano semanal | `data/content-map.yaml` (queue) | 1x/semana |
| Posts diários | `outputs/hubs/marketing/YYYY-MM-DD.md` | 5x/semana |
| Imagens | `outputs/hubs/marketing/YYYY-MM-DD-cover.png` | 3-4x/semana |
| Relatório métricas | `docs/logs/YYYY-MM-DD_marketing-metrics.md` | 1x/semana |
| Content Map update | `data/content-map.yaml` | 1x/semana (pós-métricas) |

---

## Cadência de Revisão CMO

| Trigger | Ação do CMO |
|---------|------------|
| Nova semana | Define tom/foco semanal |
| Mudança estratégica | Pivota posicionamento |
| Post controverso | Avalia risco vs reward |
| Nova oferta | Define narrativa de lançamento |
| KPI 3 < 4.0 | Para tudo, recalibra com @ideation |
| KPI 1 cai | Revisa posicionamento e SVA |
| KPI 2 cai | Revisa nível de permissão e conexão |

---

*Workflow v1.0.0 — Extraido de tasks/weekly-content-plan.md + metrics-weekly.md*
