---
task_id: KOE_ARQ_003
name: "Deep Work Session"
agent: koe-arquiteto
type: implementation
complexity: medium
estimated_time: 180min
version: 1.0.0

source:
  book: "The Art of Focus"
  author: "Dan Koe"
  framework: "2-4h Deep Work Protocol + Fill/Empty/Use Brain Cycle"
  reference: "Use Phase — morning creative execution with zero interruptions"

inputs:
  required:
    - session_goal: "Objetivo claro e mensurável para a sessão"
    - creation_task: "Task específica a ser executada (KOE_ARQ_001, 002, 005, 006)"
    - materials: "Todos os inputs necessários já preparados"
  optional:
    - queue_notes: "Notas relevantes da Queue"
    - previous_session_notes: "Notas da sessão anterior (continuidade)"
    - energy_level: "Auto-avaliação de energia (1-10)"

outputs:
  primary:
    - session_output: "Artefato criado durante a sessão (conteúdo, módulo, script)"
  secondary:
    - session_log: "Log de métricas da sessão (duração, qualidade, interrupções)"
    - cascade_markers: "Fragmentos identificados durante a criação"
  template: deep-work-session-output.yaml

validation:
  checklist: deep-work-quality-validation.md
  minimum_duration: 120
  zero_interruptions: true
  output_produced: true

elicit: true
---

# Deep Work Session

## Propósito

> "The quality of your creative output is directly proportional to the depth of your focus.
> Two hours of deep work beats eight hours of shallow multitasking."
> — Dan Koe, The Art of Focus

Executar uma sessão de trabalho profundo de 2-4 horas com zero interrupções, seguindo o
protocolo de Dan Koe para criação de alto impacto. A sessão é o motor de produção
do koe-arquiteto — é onde Big Ideas se transformam em ativos digitais.

---

## Contexto

No sistema Dan Koe, a criação acontece na fase **Use** do ciclo Fill/Empty/Use:

```
Fill (tarde) → Empty (noite) → Use (manhã) → Fill (tarde) → ...
      ↑                              ↑
  Consumo curado               DEEP WORK SESSION
  Leitura, podcasts            Criação focada
  Input de qualidade           Output de alto valor
```

**Por que Deep Work funciona no sistema Koe:**
- O cérebro foi "enchido" com inputs de qualidade na fase Fill
- A fase Empty permitiu processamento subconsciente
- A manhã (Use) é quando conexões emergem naturalmente
- Zero interrupções permite acessar o estado de flow
- 2-4 horas é o sweet spot — mais longo gera fadiga, mais curto não permite profundidade

**O que pode ser criado em uma sessão:**
- Newsletter completa (KOE_ARQ_002)
- Conteúdo APAG (KOE_ARQ_001)
- Módulo de curso (KOE_ARQ_005)
- Script de YouTube (KOE_ARQ_006)
- Estrutura de Content Cascade (KOE_ARQ_004)

---

## Pré-requisitos

- [ ] Objetivo da sessão definido e mensurável
- [ ] Todos os inputs necessários preparados (não buscar durante sessão)
- [ ] Ambiente preparado (notificações desligadas, porta fechada)
- [ ] Água e café prontos (não levantar durante a sessão)
- [ ] Timer configurado (90min bloco 1 + pausa + 90min bloco 2)
- [ ] Fase Fill e Empty dos dias anteriores cumpridas

---

## Steps

### Step 1: Preparar Ambiente (10 minutos)

**Objetivo:** Eliminar todas as fontes de interrupção e preparar estado mental.

**Checklist de Ambiente:**

```yaml
environment_setup:
  digital:
    - notifications_off: true
    - phone_airplane_mode: true
    - browser_tabs_closed: true  # Exceto editor e referências
    - messaging_apps_closed: true
    - email_closed: true

  physical:
    - door_closed: true
    - water_available: true
    - coffee_ready: true
    - comfortable_temperature: true
    - good_lighting: true

  mental:
    - brain_dump_done: true  # Anotar preocupações pendentes
    - intention_set: true    # "Nesta sessão eu vou..."
    - timer_configured: true
    - materials_open: true
```

**Ritual de Início:**
1. Escrever a intenção da sessão em uma frase
2. Fazer brain dump de 2 minutos (descarregar preocupações)
3. Respirar 3x profundamente
4. Iniciar timer do Bloco 1

---

### Step 2: Definir Intenção e Métricas

**Objetivo:** Tornar o resultado da sessão mensurável.

**Framework de Intenção:**

```yaml
session_intention:
  primary_goal: ""  # O que PRECISA sair desta sessão
  secondary_goal: "" # O que seria BOM sair

  success_metrics:
    minimum_viable: ""  # Ex: "Draft de 1000 palavras"
    good: ""            # Ex: "Draft completo de 2000 palavras"
    excellent: ""       # Ex: "Draft completo + cascade fragments"

  task_reference: ""    # KOE_ARQ_001, 002, 005, ou 006

  time_allocation:
    block_1: "90min — criação principal"
    break: "10-15min — pausa ativa"
    block_2: "60-90min — refinamento e expansão"
```

**Regra de Ouro:** A intenção deve ser específica o suficiente para que ao final
da sessão você saiba OBJETIVAMENTE se atingiu ou não.

---

### Step 3: Executar Bloco de Criação

**Objetivo:** Produzir o artefato principal em estado de flow.

**Protocolo de Execução — Bloco 1 (90 min):**

1. **Fase de Aquecimento (0-15 min):**
   - Reler outline/materiais preparados
   - Começar escrevendo sem filtro (qualidade vem depois)
   - Ignorar gramática, formatação e perfeição
   - Objetivo: entrar no fluxo

2. **Fase de Flow (15-75 min):**
   - Escrever continuamente sem parar para editar
   - Se travar em uma seção, pular para outra
   - Marcar [TODO] em pontos que precisam de pesquisa
   - NÃO abrir browser para pesquisar (usar materiais preparados)
   - Se uma ideia tangencial surgir, anotar em bullet e voltar ao tema

3. **Fase de Fechamento (75-90 min):**
   - Completar a seção atual (não parar no meio)
   - Fazer quick scan do que foi produzido
   - Anotar onde continuar no Bloco 2
   - Parar o timer

**Regras During Criação:**
- NUNCA editar enquanto escreve (criar e editar são modos opostos)
- NUNCA verificar celular ou email
- NUNCA pesquisar online (use materiais pré-preparados)
- Se perder o foco, fechar os olhos por 30 segundos e retomar

**Pausa Ativa (10-15 min):**
- Levantar e caminhar
- NÃO verificar celular
- Deixar o cérebro processar em background
- Beber água
- NÃO consumir conteúdo novo

**Protocolo de Execução — Bloco 2 (60-90 min):**

1. **Reler e Refinar (0-20 min):**
   - Ler o que foi produzido no Bloco 1
   - Adicionar transições e conectores
   - Resolver [TODO] markers com materiais disponíveis

2. **Expandir e Aprofundar (20-60 min):**
   - Expandir seções que ficaram rasas
   - Adicionar exemplos e pontes cross-domain
   - Aplicar elementos de voz Dan Koe
   - Escrever seções que faltaram

3. **Fechar e Marcar (60-90 min):**
   - Revisão final de fluxo e coerência
   - Marcar cascade fragments
   - Documentar métricas da sessão

---

### Step 4: Revisar Output e Qualidade

**Objetivo:** Avaliar o que foi produzido e documentar métricas.

**Revisão Rápida (15 min):**

```yaml
output_review:
  completeness:
    primary_goal_achieved: false
    secondary_goal_achieved: false
    percentage_complete: 0

  quality_assessment:
    flow_state_reached: false
    flow_duration_minutes: 0
    voice_consistency: ""  # strong | medium | weak
    depth_adequate: false

  issues_found:
    - issue: ""
      severity: ""  # minor | moderate | critical
      resolution: ""
```

**Não buscar perfeição neste momento.** A revisão profunda acontece em task separada.
O objetivo aqui é verificar se o artefato está "good enough" para passar adiante.

---

### Step 5: Marcar Cascade Fragments

**Objetivo:** Identificar fragmentos reutilizáveis enquanto o conteúdo está fresco.

**Por que fazer agora (e não depois):**
- Durante a criação, você sabe quais frases são mais fortes
- O contexto emocional ajuda a identificar debate triggers
- Fragmentos são mais fáceis de marcar quando o fluxo está na memória

**Quick Cascade Scan:**

```yaml
cascade_quick_scan:
  tweetable_quotes: 0     # Frases standalone < 280 chars
  thread_hooks: 0          # Pontos que abrem thread
  clip_sections: 0         # Micro-conteúdo standalone
  visual_concepts: 0       # Conceitos para infográfico
  debate_triggers: 0       # Afirmações que geram engajamento

  total_fragments: 0
  cascade_readiness: ""    # ready | needs_work | incomplete
```

**Marcar no texto:** Usar `[CASCADE:tipo]` inline para o koe-distribuidor localizar.

---

### Step 6: Documentar Session Log

**Objetivo:** Registrar métricas para otimização de futuras sessões.

**Session Log:**

```yaml
session_log:
  date: ""
  start_time: ""
  end_time: ""
  total_duration_minutes: 0

  blocks:
    block_1:
      duration: 0
      flow_achieved: false
      flow_duration: 0
      interruptions: 0
      output_quality: ""
    break:
      duration: 0
      activity: ""
    block_2:
      duration: 0
      flow_achieved: false
      flow_duration: 0
      interruptions: 0
      output_quality: ""

  energy:
    start_level: 0  # 1-10
    end_level: 0
    peak_moment: ""
    fatigue_onset: ""

  environment:
    time_of_day: ""  # morning | afternoon | evening
    fill_empty_cycle_followed: false
    preparation_quality: ""  # excellent | good | poor

  learnings:
    what_worked: ""
    what_didnt: ""
    adjustment_for_next: ""
```

---

## Input Required

```yaml
input:
  session_goal:
    primary: ""
    secondary: ""
    task_reference: ""  # KOE_ARQ_001 | 002 | 004 | 005 | 006

  materials_prepared:
    - name: ""
      type: ""
      ready: false

  energy_assessment:
    current_level: 0  # 1-10
    sleep_quality_last_night: ""  # good | ok | poor
    fill_phase_yesterday: false
    empty_phase_yesterday: false

  environment:
    location: ""
    time_planned: ""
    duration_planned: ""  # 120 | 150 | 180 | 240
    interruption_risk: ""  # low | medium | high

  continuation:
    is_continuation: false
    previous_session_notes: ""
    previous_output_location: ""
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_ARQ_003
    created_at: ""
    agent: koe-arquiteto
    session_date: ""

  session_results:
    primary_goal_achieved: false
    secondary_goal_achieved: false
    artifact_produced: ""
    artifact_location: ""
    word_count: 0
    completion_percentage: 0

  session_metrics:
    total_duration_minutes: 0
    flow_state_minutes: 0
    flow_percentage: 0
    interruption_count: 0
    energy_start: 0
    energy_end: 0
    deep_work_quality: ""  # excellent | good | adequate | poor

  cascade_markers:
    total_fragments: 0
    types:
      tweets: 0
      thread_hooks: 0
      clips: 0
      visuals: 0
      debates: 0
    cascade_readiness: ""

  session_log:
    block_1_summary: ""
    break_notes: ""
    block_2_summary: ""
    learnings: ""
    adjustment_for_next: ""

  quality_assessment:
    output_quality: ""  # excellent | good | adequate | needs_rework
    voice_consistency: ""
    depth_adequate: false
    ready_for_next_step: false
    next_step_recommendation: ""
```

---

## Quality Gate

### Checklist de Validação (KOE_ARQ_003)

**Execução da Sessão:**
- [ ] Duração mínima de 120 minutos cumprida
- [ ] Ambiente preparado com zero interrupções
- [ ] Timer utilizado para blocos de trabalho
- [ ] Pausa ativa entre blocos (sem tela)

**Output Produzido:**
- [ ] Artefato principal criado (draft, outline, ou módulo)
- [ ] Cascade fragments identificados e marcados
- [ ] Quality suficiente para avançar no pipeline

**Deep Work Protocol:**
- [ ] Fase Fill/Empty dos dias anteriores seguida
- [ ] Intenção da sessão definida antes de iniciar
- [ ] Materiais preparados antecipadamente
- [ ] Nenhuma pesquisa online durante a sessão

**Session Log:**
- [ ] Métricas documentadas (duração, flow, energia)
- [ ] Learnings registrados para otimização futura
- [ ] Próximos passos claros definidos

**Sovereignty Check:**
- [ ] Sessão aumentou produção criativa pessoal
- [ ] Processo não criou dependência de ferramentas externas
- [ ] Segue princípio de radical simplicity

---

## Handoff

**Para task específica (KOE_ARQ_001, 002, 005, 006):**
- Output da sessão com cascade markers
- Quality assessment e completion percentage
- Se incomplete, notas para continuação na próxima sessão

**Para koe-chief:**
- Session metrics para tracking de produtividade
- Deep work quality score
- Sugestões de ajuste no pipeline se qualidade abaixo do esperado

**Para koe-distribuidor:**
- Cascade markers identificados (se cascade_readiness = "ready")
- Fragmentos pré-marcados para distribuição imediata

---

*Koe Arquiteto | Deep Work Executor | Focus Protocol Specialist*
*"Two hours of deep work beats eight hours of shallow multitasking."*
