# Task: Mapeamento de Polaridade

```yaml
task_id: KOE_MND_003
agent: koe-mindset
type: creation
complexity: medium
estimated_time: 20min
source: "Polarity Principle — Dan Koe"
version: 1.0
tags: [polarity, vision, anti-vision, tension, motivation, clarity]
dependencies: []
```

## Propósito

> "You need two things to move: something to move toward and something
> to move away from. Vision without anti-vision is a dream.
> Anti-vision without vision is fear. Together, they create unstoppable momentum."
> — Dan Koe

Mapear a polaridade entre Visão (o que você quer) e Anti-Visão (o que você rejeita)
para criar tensão produtiva que gera movimento consistente e motivação duradoura.

## Contexto

O Polarity Principle é um dos conceitos fundamentais de Dan Koe para manter
motivação sustentável. A maioria das pessoas tem apenas visão OU anti-visão:

- **Só visão**: Sonhadores que não agem (a visão é confortável demais)
- **Só anti-visão**: Pessoas movidas por medo (ansiosas, reativas)
- **Ambos**: Tensão produtiva que gera ação consistente

### Como a Polaridade Funciona

```
ANTI-VISÃO ←←←←←←← TENSÃO →→→→→→→→ VISÃO
(o que rejeito)     (combustível)    (o que desejo)
```

A tensão entre os dois polos cria uma "corda elástica mental":
- Quando você se aproxima da anti-visão (preguiça, conformismo), a tensão
  te puxa de volta em direção à visão
- Quando você se acomoda na visão (sonho sem ação), a anti-visão te lembra
  do que acontece se parar

### Diferença entre Polaridade e Negatividade
- **Negatividade**: "Eu sou um fracasso" (autodestrutivo)
- **Polaridade**: "Se eu não agir, em 5 anos serei X" (combustível produtivo)

A anti-visão não é autocrítica — é clareza sobre consequências.

## Steps

### Step 1 — Definir Visão: O Que Você Quer (6min)

Descreva em detalhes específicos a vida que você quer criar:

**Visão Profissional**:
- O que você faz no trabalho? ____
- Quanto ganha por mês? ____
- Quantas horas trabalha por semana? ____
- Quem são seus clientes/audiência? ____
- Qual seu impacto no mundo? ____

**Visão Pessoal**:
- Como é seu dia ideal? ____
- Onde você mora? ____
- Com quem você passa tempo? ____
- Que hobbies pratica? ____
- Como é sua saúde? ____

**Visão de Identidade**:
- Como as pessoas te descrevem? ____
- Que adjetivos definem quem você é? ____
- Que conquistas te definem? ____

**Visão Consolidada (1 parágrafo)**:
> "Em 3 anos, eu ____________________________________________
> _________________________________________________________
> _________________________________________________________"

**Teste de especificidade**:
- [ ] Tem números concretos (renda, horas, etc.)?
- [ ] Tem detalhes sensoriais (o que vê, sente, faz)?
- [ ] É ambicioso mas credível?
- [ ] Te emociona quando lê em voz alta?

### Step 2 — Definir Anti-Visão: O Que Você Rejeita (6min)

Descreva em detalhes a vida que você RECUSA viver:

**Anti-Visão Profissional**:
- O que estaria fazendo? ____
- Quanto estaria ganhando? ____
- Quantas horas trabalhando? ____
- Para quem trabalharia? ____
- Qual o impacto (ou falta de)? ____

**Anti-Visão Pessoal**:
- Como seria seu dia típico? ____
- Onde moraria? ____
- Como seriam seus relacionamentos? ____
- Que arrependimentos carregaria? ____
- Como estaria sua saúde? ____

**Anti-Visão de Identidade**:
- Como as pessoas te descreveriam? ____
- Que adjetivos te definiriam? ____
- O que teria desistido? ____

**Anti-Visão Consolidada (1 parágrafo)**:
> "Se eu não mudar nada, em 3 anos eu ____________________________
> _________________________________________________________
> _________________________________________________________"

**Teste de honestidade**:
- [ ] É uma possibilidade real (não exagero)?
- [ ] Inclui consequências concretas (não abstratas)?
- [ ] Te causa desconforto ao ler?
- [ ] Reflete o caminho atual se nada mudar?

### Step 3 — Identificar Pontos de Tensão (4min)

Encontre onde visão e anti-visão criam a maior tensão produtiva:

**Ponto de Tensão 1**:
- Visão: ____
- Anti-visão: ____
- Tensão: "Ou eu ____ ou eu vou acabar ____"
- Ação que essa tensão exige: ____

**Ponto de Tensão 2**:
- Visão: ____
- Anti-visão: ____
- Tensão: "Ou eu ____ ou eu vou acabar ____"
- Ação que essa tensão exige: ____

**Ponto de Tensão 3**:
- Visão: ____
- Anti-visão: ____
- Tensão: "Ou eu ____ ou eu vou acabar ____"
- Ação que essa tensão exige: ____

**Ponto de Tensão de Maior Intensidade**: #____
**Por quê?**: ____

### Step 4 — Usar Tensão como Combustível (4min)

Transforme a tensão em ações concretas:

**Daily Polarity Check** (1 minuto por dia):
Pela manhã, antes de começar o dia:
1. Leia sua visão (30 segundos)
2. Leia sua anti-visão (30 segundos)
3. Pergunte: "O que faço HOJE que me aproxima da visão?"

**Polarity Trigger** (para momentos de procrastinação):
Quando sentir vontade de procrastinar/evitar:
1. Lembre: "Esse momento de conforto me leva à anti-visão"
2. Sinta o desconforto da anti-visão
3. Escolha o desconforto temporário da ação

**Polarity Anchor** (frase que carrega a tensão):
> "Eu escolho [AÇÃO DIFÍCIL] porque a alternativa é [ANTI-VISÃO]."

Exemplo:
> "Eu escolho criar conteúdo toda manhã porque a alternativa é morrer no CLT aos 60."

**Sua Polarity Anchor**:
> "Eu escolho ____ porque a alternativa é ____."

**Uso prático**:
- [ ] Escrever nos post-its do monitor
- [ ] Alarm no celular com a frase
- [ ] Fundo de tela do celular
- [ ] Primeiro item no journal diário

## Input Required

```yaml
input:
  current_situation:
    life_satisfaction: 0  # 1-10
    biggest_frustration: ""
    biggest_desire: ""
    current_trajectory: "improving|stagnant|declining"

  time_horizon:
    vision_years: 3  # default 3 years
    urgency_level: "low|medium|high"

  context:
    life_area_focus: "all|professional|personal|health|relationships|financial"
    previous_vision_work: true|false
    known_fears: []
    known_desires: []
```

## Output Template

```yaml
output:
  polarity_map:
    created_date: ""
    time_horizon: ""

    vision:
      professional: ""
      personal: ""
      identity: ""
      consolidated: ""
      specificity_score: 0  # out of 4

    anti_vision:
      professional: ""
      personal: ""
      identity: ""
      consolidated: ""
      honesty_score: 0  # out of 4

    tension_points:
      - area: ""
        vision_pole: ""
        anti_vision_pole: ""
        tension_statement: ""
        required_action: ""
        intensity: 0  # 1-10
      - area: ""
        vision_pole: ""
        anti_vision_pole: ""
        tension_statement: ""
        required_action: ""
        intensity: 0
      - area: ""
        vision_pole: ""
        anti_vision_pole: ""
        tension_statement: ""
        required_action: ""
        intensity: 0

    highest_tension_point:
      area: ""
      why: ""

    fuel_system:
      daily_polarity_check: true|false
      polarity_trigger: ""
      polarity_anchor: ""
      placement:
        - location: ""
          format: ""

    immediate_actions:
      - action: ""
        driven_by_tension: ""
        deadline: ""
      - action: ""
        driven_by_tension: ""
        deadline: ""
      - action: ""
        driven_by_tension: ""
        deadline: ""
```

## Quality Gate

```yaml
quality_gate: KOE_MND_003_QG
checklist:
  - [ ] Visão tem detalhes específicos (números, sensoriais)
  - [ ] Visão passa no teste de especificidade (4/4)
  - [ ] Anti-visão é honesta e realista (não exagerada)
  - [ ] Anti-visão passa no teste de honestidade (4/4)
  - [ ] Mínimo 3 pontos de tensão mapeados
  - [ ] Cada ponto tem ação concreta associada
  - [ ] Polarity Anchor escrita e prática
  - [ ] Daily Polarity Check configurado
  - [ ] Mínimo 3 ações imediatas definidas com prazo
  - [ ] A tensão gera movimento, não paralisia
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_MND_001  # Conscious Conditioning usando a tensão como motor
    - KOE_ADV_003  # Future-Present Integration para criar plano
    - KOE_ADV_004  # Life Design Session para alinhar visão com lifestyle
  artifacts:
    - polarity_map.yaml
  notes: "Mapa de polaridade criado. Ativar Daily Polarity Check amanhã de manhã."
```
