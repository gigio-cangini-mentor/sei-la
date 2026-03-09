# Task: Auditoria do Espectro de Atencao

```yaml
task_id: KOE_MND_007
agent: koe-mindset
type: diagnosis
complexity: medium
estimated_time: 25min
source: "Attention Spectrum — Dan Koe, The Art of Focus"
version: 1.0
tags: [attention, audit, consumption, creation, deep-work, reactive, proactive]
dependencies: []
```

## Proposito

> "Your attention is your most valuable asset. Not your time, not your money —
> your attention. Where it goes, your life follows. Most people have never
> audited where their attention actually goes. They'd be horrified."
> — Dan Koe

Mapear onde sua atencao realmente vai versus onde deveria ir, usando 3 dimensoes
diagnosticas: Consumo vs Criacao, Reativo vs Proativo, Raso vs Profundo.

## Contexto

O Attention Spectrum Audit e a ferramenta diagnostica de Dan Koe para identificar
vazamentos de atencao. Diferente de time tracking generico, ele mede QUALIDADE
da atencao em 3 dimensoes criticas para criadores digitais.

### As 3 Dimensoes

| Dimensao | Ratio Saudavel | Sinal de Perigo |
|----------|---------------|----------------|
| Consumo vs Criacao | 20/80 | Consumo > 30% |
| Reativo vs Proativo | 20/80 | Reativo > 40% |
| Raso vs Profundo | 30/70 | Deep work < 50% |

### Principio Central
Se voce esta ocupado mas improdutivo, o problema nao e tempo — e atencao mal direcionada.

## Steps

### Step 1 — Coleta de Dados: Rastreio de 3 Dias (5min para setup)

Registre como gasta seu tempo por 3 dias tipicos:

**Metodo de rastreio** (escolha um):
- [ ] App de time tracking (Toggl, RescueTime)
- [ ] Planilha manual a cada hora
- [ ] Bloco de notas com timestamps

**Categorias para registrar**:
- **Criacao**: escrever, gravar, desenhar, programar, pensar estrategicamente
- **Consumo**: redes sociais, YouTube, newsletters, noticias, podcasts
- **Proativo**: trabalho que VOCE iniciou, projetos proprios, deep work
- **Reativo**: email, DMs, reunioes convocadas por outros, urgencias
- **Profundo**: trabalho que exige concentracao total, sem interrupcao
- **Raso**: tarefas administrativas, respostas curtas, organizacao

### Step 2 — Calcular Ratios Atuais (7min)

Com os dados de 3 dias, calcule:

**Dimensao 1: Consumo vs Criacao**
- Horas consumindo/dia: ____
- Horas criando/dia: ____
- Ratio atual: ____/____
- Ratio saudavel: 20/80
- Status: [ ] Saudavel [ ] Aviso [ ] Critico

**Dimensao 2: Reativo vs Proativo**
- Horas em modo reativo/dia: ____
- Horas em modo proativo/dia: ____
- Ratio atual: ____/____
- Ratio saudavel: 20/80
- Status: [ ] Saudavel [ ] Aviso [ ] Critico

**Dimensao 3: Raso vs Profundo**
- Horas trabalho raso/dia: ____
- Horas deep work/dia: ____
- Ratio atual: ____/____
- Ratio saudavel: 30/70
- Status: [ ] Saudavel [ ] Aviso [ ] Critico

### Step 3 — Diagnostico: Onde a Atencao Vaza (7min)

**Top 3 vazamentos de atencao** (atividades que mais consomem atencao sem retorno):
1. ____ → ____ horas/dia
2. ____ → ____ horas/dia
3. ____ → ____ horas/dia

**Root cause de cada vazamento**:
1. Por que isso acontece? ____
2. O que dispara esse comportamento? ____
3. Que necessidade essa atividade atende (mal)? ____

**Mapa visual do espectro**:
```
CONSUMO |████████░░| CRIACAO      Atual: __/__  Meta: 20/80
REATIVO |██████░░░░| PROATIVO     Atual: __/__  Meta: 20/80
RASO    |███████░░░| PROFUNDO     Atual: __/__  Meta: 30/70
```

### Step 4 — Prescricao: Rebalancear o Espectro (6min)

**Para cada dimensao fora do saudavel**:

**Consumo → Criacao**:
- Janela de consumo: ____ ate ____ (max 30 min/dia)
- Regra: Criar PRIMEIRO, consumir DEPOIS
- Acao imediata: ____

**Reativo → Proativo**:
- Sem email/DMs antes de: ____ h
- Reunioes agrupadas em: ____ (dia/horario)
- Manhã inteira para trabalho proativo: [ ] Sim [ ] Nao
- Acao imediata: ____

**Raso → Profundo**:
- Deep work protegido: ____ ate ____ (min 4h)
- Shallow work agrupado em: ____ ate ____
- Acao imediata: ____

**Novo horario-alvo**:
```
06:00-10:00  PROFUNDO + PROATIVO + CRIACAO (peak energy)
10:00-12:00  SUSTENTADO + PROATIVO (calls, editing)
12:00-13:00  RECUPERACAO
13:00-15:00  SUSTENTADO + ESTRUTURADO
15:00-16:00  RASO + REATIVO (email, DMs, admin)
16:00-16:30  CONSUMO (janela de consumo controlada)
```

## Input Required

```yaml
input:
  time_data:
    tracking_method: "app|manual|notes"
    days_tracked: 3
    hours_per_day:
      creating: 0
      consuming: 0
      proactive: 0
      reactive: 0
      deep: 0
      shallow: 0
  pain_points:
    main_complaint: ""
    desired_deep_work_hours: 0
  current_schedule:
    wake_time: ""
    work_start: ""
    work_end: ""
```

## Output Template

```yaml
output:
  attention_spectrum_audit:
    audit_date: ""
    tracking_period: "3 days"

    current_ratios:
      consumption_creation:
        consumption: 0
        creation: 0
        ratio: ""
        status: "healthy|warning|critical"
      reactive_proactive:
        reactive: 0
        proactive: 0
        ratio: ""
        status: "healthy|warning|critical"
      shallow_deep:
        shallow: 0
        deep: 0
        ratio: ""
        status: "healthy|warning|critical"

    leaks:
      - activity: ""
        hours_per_day: 0
        root_cause: ""
      - activity: ""
        hours_per_day: 0
        root_cause: ""
      - activity: ""
        hours_per_day: 0
        root_cause: ""

    prescription:
      consumption_window: ""
      no_reactive_before: ""
      deep_work_block: ""
      new_schedule: ""

    target_ratios:
      consumption_creation: "20/80"
      reactive_proactive: "20/80"
      shallow_deep: "30/70"

    re_audit_date: ""
```

## Quality Gate

```yaml
quality_gate: KOE_MND_007_QG
checklist:
  - [ ] Dados de 3 dias coletados (nao estimativas, dados reais)
  - [ ] 3 dimensoes calculadas com ratios concretos
  - [ ] Status de cada dimensao identificado (saudavel/aviso/critico)
  - [ ] Top 3 vazamentos de atencao com root cause
  - [ ] Prescricao especifica para cada dimensao fora do saudavel
  - [ ] Novo horario-alvo desenhado com blocos de energia
  - [ ] Data de re-auditoria marcada (max 2 semanas)
  - [ ] Nenhuma prescricao generica — tudo especifico ao usuario
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_MND_006  # Focus Funnel para eliminar os vazamentos encontrados
    - KOE_MND_008  # Creative Energy Management para alinhar blocos de energia
  artifacts:
    - attention_spectrum_audit.yaml
  notes: "Auditoria completa. Aplicar prescricoes IMEDIATAMENTE. Re-auditar em 2 semanas."
```
