# Task: Integração Futuro-Presente

```yaml
task_id: KOE_ADV_003
agent: koe-advisor
type: design
complexity: medium
estimated_time: 30min
source: "One-Person Business Architecture — Dan Koe"
version: 1.0
tags: [future-vision, present-reality, bridge-plan, quarterly-planning, sprint]
dependencies: [KOE_MND_003]
```

## Propósito

> "The gap between where you are and where you want to be isn't a problem —
> it's a project. Break it into quarters, then into sprints, then into
> daily actions. The future becomes the present one day at a time."
> — Dan Koe

Integrar a visão de futuro com a realidade presente criando um caminho
acionável. Transformar o gap entre "onde estou" e "onde quero estar" em
um projeto com etapas claras, trimestre a trimestre.

## Contexto

A maioria das pessoas tem uma de duas doenças:
1. **Visionários paralisados**: Sabem onde querem chegar mas não agem
2. **Executores sem direção**: Agem muito mas sem visão clara

A integração futuro-presente resolve ambos ao criar uma PONTE entre
a visão de 3 anos e as ações dos próximos 30 dias.

### O Framework de Integração

```
VISÃO (3 anos) → QUARTERS (12 trimestres) → SPRINT (30 dias) → DAILY (ações)
```

Cada nível é derivado do anterior, criando uma cadeia de causalidade clara.

### Princípios de Dan Koe para Planejamento
1. **Visão inspira, ação transforma**: A visão dá direção, a ação dá resultado
2. **Quarters > years**: Planejamento trimestral é mais eficaz que anual
3. **Sprint > planning**: 30 dias de execução focada > 12 meses de planejamento
4. **Daily compound**: Pequenas ações diárias compõem resultados extraordinários

## Steps

### Step 1 — Definir Visão de 3 Anos (8min)

Descreva com detalhes específicos onde você quer estar em 3 anos:

**Dimensão Profissional**:
- Negócio/carreira: ____
- Revenue mensal: R$ ____
- Horas de trabalho: ____h/semana
- Equipe (se houver): ____
- Produtos/serviços ativos: ____
- Audiência: ____
- Impacto: ____

**Dimensão Pessoal**:
- Localização: ____
- Estilo de vida: ____
- Saúde: ____
- Relacionamentos: ____
- Hobbies/interesses: ____

**Dimensão Financeira**:
- Patrimônio: R$ ____
- Renda passiva: R$ ____/mês
- Investimentos: ____
- Reserva de emergência: R$ ____

**Visão em 1 parágrafo**:
> "Em 3 anos (____), eu ________________________________________
> _________________________________________________________
> _________________________________________________________"

### Step 2 — Auditar Estado Atual (7min)

Avalie honestamente onde você está hoje:

**Dimensão Profissional Atual**:
- Negócio/carreira: ____
- Revenue mensal: R$ ____
- Horas de trabalho: ____h/semana
- Equipe: ____
- Produtos/serviços: ____
- Audiência: ____
- Impacto: ____

**Dimensão Pessoal Atual**:
- Localização: ____
- Estilo de vida: ____
- Saúde: ____
- Relacionamentos: ____
- Hobbies: ____

**Dimensão Financeira Atual**:
- Patrimônio: R$ ____
- Renda passiva: R$ ____/mês
- Investimentos: ____
- Reserva: R$ ____

### Step 3 — Identificar Gap e Criar Bridge Plan (8min)

**Gap Analysis**:

| Dimensão | Atual | Visão 3 anos | Gap | Dificuldade |
|----------|-------|-------------|-----|-------------|
| Revenue | R$ ____ | R$ ____ | R$ ____ | 1-10 |
| Audiência | ____ | ____ | ____ | 1-10 |
| Horas/semana | ____ | ____ | ____ | 1-10 |
| Produtos | ____ | ____ | ____ | 1-10 |
| Patrimônio | R$ ____ | R$ ____ | R$ ____ | 1-10 |
| Saúde | ____/10 | ____/10 | ____ | 1-10 |
| Liberdade | ____/10 | ____/10 | ____ | 1-10 |

**Bridge Plan — 12 Quarters**:

**Ano 1 — Foundation**:
- Q1 (Meses 1-3): ____
  - Meta principal: ____
  - Entregável: ____
- Q2 (Meses 4-6): ____
  - Meta principal: ____
  - Entregável: ____
- Q3 (Meses 7-9): ____
  - Meta principal: ____
  - Entregável: ____
- Q4 (Meses 10-12): ____
  - Meta principal: ____
  - Entregável: ____

**Ano 2 — Growth**:
- Q5 (Meses 13-15): ____
- Q6 (Meses 16-18): ____
- Q7 (Meses 19-21): ____
- Q8 (Meses 22-24): ____

**Ano 3 — Scale**:
- Q9 (Meses 25-27): ____
- Q10 (Meses 28-30): ____
- Q11 (Meses 31-33): ____
- Q12 (Meses 34-36): ____

### Step 4 — Definir Primeiro Sprint de 30 Dias (7min)

O Sprint 1 é o mais importante — é onde a visão se torna ação.

**Sprint 1 — Primeiros 30 Dias**:

**Tema do Sprint**: ____
**Meta principal**: ____
**Métrica de sucesso**: ____

**Semana 1**:
- [ ] ____
- [ ] ____
- [ ] ____

**Semana 2**:
- [ ] ____
- [ ] ____
- [ ] ____

**Semana 3**:
- [ ] ____
- [ ] ____
- [ ] ____

**Semana 4**:
- [ ] ____
- [ ] ____
- [ ] ____

**Daily Non-Negotiables** (ações diárias inegociáveis):
1. ____ (____min)
2. ____ (____min)
3. ____ (____min)

**Sprint Review (Dia 30)**:
- [ ] Meta principal atingida?
- [ ] Métrica de sucesso batida?
- [ ] O que funcionou?
- [ ] O que não funcionou?
- [ ] Ajustes para Sprint 2?

## Input Required

```yaml
input:
  current_state:
    revenue: 0
    audience: 0
    hours_per_week: 0
    products: []
    location: ""
    health_score: 0
    freedom_score: 0
    patrimony: 0

  vision_3_year:
    revenue_target: 0
    audience_target: 0
    hours_target: 0
    products_target: []
    location_target: ""
    health_target: 0
    freedom_target: 0
    patrimony_target: 0

  constraints:
    available_daily_hours: 0
    budget_for_growth: 0
    skills_to_develop: []
    biggest_obstacle: ""

  polarity_map:
    vision_statement: ""
    anti_vision_statement: ""
    highest_tension_point: ""
```

## Output Template

```yaml
output:
  future_present_integration:
    created_date: ""

    vision_3_year:
      professional: ""
      personal: ""
      financial: ""
      consolidated_statement: ""

    current_state:
      professional: ""
      personal: ""
      financial: ""

    gap_analysis:
      - dimension: ""
        current: ""
        target: ""
        gap: ""
        difficulty: 0
      - dimension: ""
        current: ""
        target: ""
        gap: ""
        difficulty: 0

    bridge_plan:
      year_1:
        theme: "Foundation"
        quarters:
          - quarter: "Q1"
            months: "1-3"
            goal: ""
            deliverable: ""
          - quarter: "Q2"
            months: "4-6"
            goal: ""
            deliverable: ""
          - quarter: "Q3"
            months: "7-9"
            goal: ""
            deliverable: ""
          - quarter: "Q4"
            months: "10-12"
            goal: ""
            deliverable: ""
      year_2:
        theme: "Growth"
        quarters:
          - quarter: "Q5-Q8"
            high_level_goals: []
      year_3:
        theme: "Scale"
        quarters:
          - quarter: "Q9-Q12"
            high_level_goals: []

    sprint_1:
      theme: ""
      main_goal: ""
      success_metric: ""
      weeks:
        - week: 1
          tasks: []
        - week: 2
          tasks: []
        - week: 3
          tasks: []
        - week: 4
          tasks: []
      daily_non_negotiables:
        - action: ""
          duration_min: 0
        - action: ""
          duration_min: 0
        - action: ""
          duration_min: 0
      review_questions: []
```

## Quality Gate

```yaml
quality_gate: KOE_ADV_003_QG
checklist:
  - [ ] Visão de 3 anos tem detalhes específicos (números, localização, lifestyle)
  - [ ] Estado atual auditado honestamente (sem inflar nem diminuir)
  - [ ] Gap analysis cobre mínimo 5 dimensões
  - [ ] Bridge plan tem metas para todos os 12 quarters (ano 1 detalhado)
  - [ ] Sprint 1 tem ações semanais concretas
  - [ ] Daily non-negotiables definidos (≤ 3 ações, ≤ 90 min total)
  - [ ] Sprint review agendado para dia 30
  - [ ] Cada quarter conecta logicamente ao anterior
  - [ ] Visão e ações são consistentes (ações levam à visão)
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_ADV_004  # Life Design Session para alinhar visão com lifestyle
    - KOE_MND_003  # Polarity Mapping para combustível contínuo
    - KOE_ADV_001  # Sovereignty Test para validar após Sprint 1
  artifacts:
    - future_present_integration.yaml
  notes: "Integração completa. Sprint 1 começa AMANHÃ. Review no dia 30."
```
