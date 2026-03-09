---
task_id: KOE_DIST_005
name: "Leverage Ratio Audit"
agent: koe-distribuidor
type: validation
complexity: medium
estimated_time: 30min
version: 1.0.0

source:
  concept: "Leverage Ratio — Creation-to-Distribution measurement"
  author: "Dan Koe"
  framework: "Content Cascade + Leverage Stack"
  reference: "Target ratio: 1h creation = 10h distributed content"
  metric: "Leverage Ratio = Total Distribution Hours / Total Creation Hours"

inputs:
  required:
    - creation_log: "Log de tempo de criação (KOE_ARQ_003 session logs)"
    - distribution_log: "Log de conteúdo distribuído (KOE_DIST_004 calendar executed)"
    - time_period: "Período de auditoria (semana | mês | quarter)"
  optional:
    - performance_metrics: "Métricas de engajamento por peça distribuída"
    - previous_audit: "Auditoria anterior para comparação"
    - benchmark_targets: "Targets customizados (default: 1:10)"

outputs:
  primary:
    - audit_report: "Relatório completo de leverage ratio com gaps identificados"
  secondary:
    - optimization_plan: "Plano de otimização para melhorar o ratio"
    - cascade_efficiency_map: "Mapa de eficiência por tipo de cascade"
  template: leverage-audit-output.yaml

validation:
  checklist: leverage-quality-validation.md
  ratio_calculated: true
  gaps_identified: true
  optimization_actionable: true

elicit: true
---

# Leverage Ratio Audit

## Propósito

> "If you're spending more time creating than distributing, you don't have a content system —
> you have a content job. The goal is 1 hour of creation generating 10 hours of content."
> — Dan Koe

Auditar o ratio entre tempo de criação e volume de distribuição, comparando com o
target de Dan Koe (1h criação = 10h conteúdo distribuído). A auditoria identifica
gaps no Content Cascade e oportunidades de maior leverage.

---

## Contexto

O Leverage Ratio é a métrica central do sistema de conteúdo Dan Koe:

```
Leverage Ratio = Horas de Conteúdo Distribuído / Horas de Criação

Target:  1:10 (1 hora cria → 10 horas de conteúdo)
Good:    1:7-9
Average: 1:4-6
Poor:    1:1-3 (praticamente nenhum leverage)
```

**Por que medir:**
- Identifica ineficiências no pipeline de criação
- Revela oportunidades de fragmentação não exploradas
- Quantifica o valor do Content Cascade
- Compara performance entre diferentes Big Ideas
- Fundamenta decisão de investimento em ferramentas/processos

**O que conta como "hora de conteúdo distribuído":**
- Cada peça publicada = tempo que levaria para criar do zero
- Newsletter de 2000 palavras = ~2h criação se fosse original
- Thread de 10 tweets = ~1h criação se fosse original
- Clip de 60s = ~30min criação se fosse original
- Carousel de 10 slides = ~1h criação se fosse original

---

## Pré-requisitos

- [ ] Session logs de criação disponíveis (KOE_ARQ_003)
- [ ] Calendário de distribuição executado (KOE_DIST_004)
- [ ] Período de auditoria definido
- [ ] Métricas de plataforma acessíveis (se disponível)
- [ ] Auditoria anterior disponível para comparação (se existir)

---

## Steps

### Step 1: Medir Tempo de Criação

**Objetivo:** Contabilizar todo o tempo investido em criação de conteúdo.

**Creation Time Log:**

```yaml
creation_time_log:
  period: ""

  deep_work_sessions:
    - date: ""
      duration_minutes: 0
      task: ""  # KOE_ARQ_001 | 002 | 004 | 005 | 006
      output: ""
      quality: ""

  total_creation_hours: 0

  breakdown:
    newsletter_creation: 0  # Horas
    youtube_script: 0
    course_module: 0
    apag_content: 0
    cascade_foundation: 0

  notes:
    wasted_time: 0  # Horas perdidas (interrupções, retrabalho)
    efficient_time: 0  # Horas produtivas
    efficiency_rate: 0  # efficient / total
```

**O que conta como criação:**
- Deep work sessions (KOE_ARQ_003)
- Escrita de newsletters (KOE_ARQ_002)
- Scripts de YouTube (KOE_ARQ_006)
- Módulos de curso (KOE_ARQ_005)
- Content Cascade foundation (KOE_ARQ_004)

**O que NÃO conta:**
- Tempo de distribuição (isso vai na outra coluna)
- Tempo de planejamento/estratégia
- Tempo de engajamento/resposta a comentários

---

### Step 2: Contar Peças Distribuídas

**Objetivo:** Inventariar todo conteúdo distribuído e calcular "equivalent creation hours".

**Distribution Inventory:**

```yaml
distribution_inventory:
  period: ""

  pieces_distributed:
    newsletters:
      count: 0
      equivalent_hours_each: 2.0
      total_equivalent: 0

    youtube_videos:
      count: 0
      equivalent_hours_each: 3.0
      total_equivalent: 0

    twitter_threads:
      count: 0
      equivalent_hours_each: 1.0
      total_equivalent: 0

    standalone_tweets:
      count: 0
      equivalent_hours_each: 0.15
      total_equivalent: 0

    linkedin_posts:
      count: 0
      equivalent_hours_each: 0.75
      total_equivalent: 0

    instagram_carousels:
      count: 0
      equivalent_hours_each: 1.0
      total_equivalent: 0

    instagram_reels:
      count: 0
      equivalent_hours_each: 0.5
      total_equivalent: 0

    tiktok_clips:
      count: 0
      equivalent_hours_each: 0.5
      total_equivalent: 0

    youtube_shorts:
      count: 0
      equivalent_hours_each: 0.5
      total_equivalent: 0

    instagram_stories:
      count: 0
      equivalent_hours_each: 0.1
      total_equivalent: 0

  total_pieces: 0
  total_equivalent_hours: 0
```

---

### Step 3: Calcular Ratio e Identificar Gaps

**Objetivo:** Calcular o leverage ratio e identificar onde o sistema está perdendo eficiência.

**Leverage Ratio Calculation:**

```yaml
leverage_calculation:
  total_creation_hours: 0
  total_equivalent_distribution_hours: 0

  leverage_ratio: "1:X"
  # Fórmula: total_equivalent / total_creation

  target: "1:10"

  assessment:
    ratio_value: 0
    rating: ""  # excellent (10+) | good (7-9) | average (4-6) | poor (1-3)
    gap_to_target: 0

  gap_analysis:
    underutilized_platforms:
      - platform: ""
        current_pieces: 0
        potential_pieces: 0
        gap: 0

    underutilized_fragment_types:
      - type: ""
        current_count: 0
        potential_count: 0
        gap: 0

    cascade_efficiency:
      fragments_identified: 0
      fragments_used: 0
      utilization_rate: 0  # used / identified

    bottlenecks:
      - bottleneck: ""
        impact: ""  # high | medium | low
        fix_suggestion: ""
```

**Gap Categories:**

```yaml
gap_types:
  platform_gap: "Plataforma com potencial não explorado"
  fragment_gap: "Tipo de fragmento não extraído do cascade"
  frequency_gap: "Publicação abaixo da cadência ideal"
  format_gap: "Formatos não utilizados (ex: carousel, poll)"
  repurpose_gap: "Conteúdo antigo que poderia ser atualizado"
```

---

### Step 4: Criar Plano de Otimização

**Objetivo:** Definir ações concretas para melhorar o leverage ratio.

**Optimization Plan:**

```yaml
optimization_plan:
  current_ratio: "1:X"
  target_ratio: "1:10"

  quick_wins:
    - action: ""
      estimated_improvement: ""
      effort: ""  # low | medium | high
      deadline: ""

  medium_term:
    - action: ""
      estimated_improvement: ""
      effort: ""
      deadline: ""

  systemic_changes:
    - change: ""
      rationale: ""
      implementation_steps: []

  tools_automation:
    - tool: ""
      purpose: ""
      time_saved: ""

  kpis_to_track:
    - metric: ""
      current: ""
      target: ""
      measurement_frequency: ""
```

---

### Step 5: Comparar com Auditorias Anteriores

**Objetivo:** Medir evolução do leverage ratio ao longo do tempo.

**Trend Analysis:**

```yaml
trend_analysis:
  periods:
    - period: ""
      ratio: ""
      total_pieces: 0
      creation_hours: 0

  trend: ""  # improving | stable | declining

  insights:
    - insight: ""
      action: ""

  forecast:
    next_period_target: ""
    confidence: ""
    dependencies: []
```

---

## Input Required

```yaml
input:
  audit_period:
    start_date: ""
    end_date: ""
    type: ""  # week | month | quarter

  creation_data:
    session_logs: []  # Referências para KOE_ARQ_003 logs
    total_sessions: 0

  distribution_data:
    calendar_executed: ""  # Referência para KOE_DIST_004
    pieces_published: []

  performance_data:
    platform_metrics: {}
    engagement_rates: {}

  targets:
    leverage_ratio_target: "1:10"
    custom_targets: {}

  previous_audit:
    date: ""
    ratio: ""
    key_findings: []
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_DIST_005
    created_at: ""
    agent: koe-distribuidor
    audit_period: ""

  leverage_ratio:
    creation_hours: 0
    distribution_equivalent_hours: 0
    ratio: "1:X"
    rating: ""
    gap_to_target: 0

  distribution_breakdown:
    by_platform: {}
    by_content_type: {}
    total_pieces: 0

  gap_analysis:
    underutilized_platforms: []
    underutilized_fragments: []
    bottlenecks: []
    cascade_utilization_rate: 0

  optimization_plan:
    quick_wins: []
    medium_term: []
    systemic_changes: []

  trend:
    direction: ""
    previous_ratio: ""
    improvement: ""

  quality_metrics:
    ratio_calculated: true
    gaps_identified: true
    optimization_actionable: true
    trend_analyzed: false
```

---

## Quality Gate

### Checklist de Validação (KOE_DIST_005)

**Cálculos:**
- [ ] Tempo de criação medido com precisão
- [ ] Peças distribuídas contadas e categorizadas
- [ ] Leverage ratio calculado corretamente
- [ ] Gap to target identificado

**Análise:**
- [ ] Plataformas subutilizadas identificadas
- [ ] Tipos de fragmento não explorados listados
- [ ] Bottlenecks no pipeline documentados
- [ ] Cascade utilization rate calculado

**Otimização:**
- [ ] Quick wins com baixo esforço identificados
- [ ] Plano de ação com deadlines
- [ ] KPIs para tracking definidos

**Comparação:**
- [ ] Trend vs auditorias anteriores analisado (se disponível)
- [ ] Forecast para próximo período definido

**Sovereignty Check:**
- [ ] Otimizações mantêm sistema operável por 1 pessoa
- [ ] Não adiciona complexidade desnecessária
- [ ] Segue radical simplicity

---

## Handoff

**Para koe-chief:**
- Leverage ratio report com gaps e otimizações
- Recomendações para ajuste no content pipeline
- Trend analysis para decisão estratégica

**Para koe-arquiteto:**
- Feedback sobre quais cascade foundations geram mais leverage
- Recomendações de fragmentação

**Para koe-distribuidor (próximo ciclo):**
- Otimizações a implementar na próxima semana
- Plataformas e formatos a priorizar

---

*Koe Distribuidor | Leverage Auditor | Efficiency Analyst*
*"If you're spending more time creating than distributing, you have a content job, not a content system."*
