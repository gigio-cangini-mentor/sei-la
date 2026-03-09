# Task: Desenhar Hierarquia de Valor

```yaml
task_id: KOE_OFF_002
agent: koe-offers
type: design
complexity: medium
estimated_time: 30min
source: "Digital Economics — Dan Koe"
version: 1.0
tags: [value-hierarchy, offer-design, transformation, pricing-justification]
dependencies: []
```

## Propósito

> "The value hierarchy is the difference between a $10 ebook and a $10,000 program.
> Entertainment is cheap. Implementation is priceless."
> — Dan Koe

Desenhar a hierarquia de valor em 4 níveis para qualquer oferta digital.
Cada nível acima multiplica o valor percebido e justifica preços exponencialmente maiores.

## Contexto

A maioria dos criadores digitais vende **informação** — o nível mais comoditizado.
Dan Koe ensina que o verdadeiro valor está na **implementação**, não na informação.

A hierarquia funciona assim (de menor a maior valor):

| Nível | Exemplo | Preço Típico | Entrega |
|-------|---------|--------------|---------|
| Entertainment | Podcast, YouTube | Grátis-R$50 | Passivo |
| Information | Curso, Ebook | R$50-R$500 | Self-paced |
| Transformation | Mentoria em grupo | R$500-R$5.000 | Guiado |
| Implementation | Done-with-you | R$5.000-R$50.000+ | Personalizado |

### Por que isso importa
- Criadores que ficam no nível Entertainment/Information competem por preço
- Criadores que sobem para Transformation/Implementation competem por resultado
- O mesmo conhecimento empacotado em níveis diferentes vale 100x mais

## Steps

### Step 1 — Definir Entertainment Value (8min)

O nível mais básico: tornar a experiência agradável e envolvente.

**Perguntas de elicitação**:
1. O que torna seu conteúdo/produto interessante de consumir?
2. Que elementos de storytelling você pode incluir?
3. Como o design/apresentação aumenta o engajamento?
4. Que formato é mais natural para seu público? (vídeo, texto, áudio)

**Componentes a definir**:
- Formato de entrega principal
- Elementos de engajamento (stories, exemplos, humor)
- Design e experiência visual
- Ritmo e estrutura de consumo
- Elementos de comunidade/social

**Valor percebido deste nível**: R$ ____

**Critério**: O consumidor diria "isso foi interessante/divertido"?

### Step 2 — Definir Information Value (8min)

O nível onde conhecimento específico e acionável é transferido.

**Perguntas de elicitação**:
1. Que frameworks proprietários você ensina?
2. Que dados/pesquisas fundamentam seu método?
3. Que modelos mentais mudam a perspectiva do aluno?
4. Que atalhos/hacks aceleram o resultado?

**Componentes a definir**:
- Frameworks e modelos proprietários (nomeie-os)
- Estudos de caso documentados
- Templates e checklists
- Pesquisas e dados de suporte
- Biblioteca de recursos curada
- Glossário e referência rápida

**Valor percebido deste nível**: R$ ____

**Critério**: O consumidor diria "agora eu ENTENDO como funciona"?

### Step 3 — Definir Transformation Value (8min)

O nível onde comportamento e identidade realmente mudam.

**Perguntas de elicitação**:
1. Que exercícios práticos geram mudança real?
2. Como você mantém accountability?
3. Que checkpoints marcam progresso mensurável?
4. Que comunidade/suporte existe para momentos difíceis?

**Componentes a definir**:
- Exercícios práticos com entregáveis
- Sistema de accountability (check-ins, prazos)
- Milestones de progresso mensuráveis
- Comunidade de pares para suporte
- Feedback loops (quizzes, avaliações)
- Certificação ou reconhecimento de conclusão
- Sessões ao vivo de Q&A
- Grupo de accountability (pods/trios)

**Valor percebido deste nível**: R$ ____

**Critério**: O consumidor diria "eu MUDEI por causa disso"?

### Step 4 — Definir Implementation Value (6min)

O nível máximo: fazer COM eles ou POR eles.

**Perguntas de elicitação**:
1. O que você pode fazer diretamente para/com o cliente?
2. Que parte do processo pode ser done-for-you?
3. Como o acesso direto a você acelera resultados?
4. Que customização 1:1 é possível?

**Componentes a definir**:
- Componentes done-for-you (o que você faz por eles)
- Sessões de implementação 1:1
- Revisão e feedback personalizado
- Acesso direto via chat/Voxer/WhatsApp
- Customização do plano ao contexto único deles
- Acompanhamento proativo (você busca eles)
- Garantia de resultado (não de satisfação)
- Co-criação de assets (copy, estratégia, design)

**Valor percebido deste nível**: R$ ____

**Critério**: O consumidor diria "ele fez isso COMIGO/POR MIM"?

## Input Required

```yaml
input:
  offer_context:
    offer_name: ""
    offer_description: ""
    target_avatar: ""
    current_price: 0
    desired_price: 0
    delivery_format: ""

  creator_capacity:
    can_do_1on1: true|false
    max_clients_per_month: 0
    available_hours_per_week: 0
    team_members: 0
    automation_level: "none|basic|advanced"

  current_value_levels:
    entertainment_score: 0  # 0-10
    information_score: 0    # 0-10
    transformation_score: 0 # 0-10
    implementation_score: 0 # 0-10
```

## Output Template

```yaml
output:
  value_hierarchy:
    offer_name: ""

    level_1_entertainment:
      score: 0  # 0-10
      elements:
        - name: ""
          description: ""
          delivery: ""
        - name: ""
          description: ""
          delivery: ""
      perceived_value: 0
      price_justification: ""
      consumer_reaction: "Isso foi interessante/divertido"

    level_2_information:
      score: 0  # 0-10
      elements:
        - name: ""
          description: ""
          format: ""
        - name: ""
          description: ""
          format: ""
      proprietary_frameworks:
        - name: ""
          description: ""
      perceived_value: 0
      price_justification: ""
      consumer_reaction: "Agora eu ENTENDO como funciona"

    level_3_transformation:
      score: 0  # 0-10
      elements:
        - name: ""
          description: ""
          frequency: ""
        - name: ""
          description: ""
          frequency: ""
      accountability_system:
        type: ""
        frequency: ""
        mechanism: ""
      milestones:
        - milestone: ""
          timeframe: ""
          metric: ""
      perceived_value: 0
      price_justification: ""
      consumer_reaction: "Eu MUDEI por causa disso"

    level_4_implementation:
      score: 0  # 0-10
      elements:
        - name: ""
          description: ""
          customization_level: ""
        - name: ""
          description: ""
          customization_level: ""
      done_for_you_components:
        - component: ""
          delivery_time: ""
      direct_access:
        channel: ""
        response_time: ""
        availability: ""
      perceived_value: 0
      price_justification: ""
      consumer_reaction: "Ele fez isso COMIGO/POR MIM"

    summary:
      total_perceived_value: 0
      recommended_price_range:
        min: 0
        max: 0
      highest_value_level: ""
      biggest_gap: ""
      improvement_priority: ""
      value_to_price_ratio: 0
```

## Quality Gate

```yaml
quality_gate: KOE_OFF_002_QG
checklist:
  - [ ] Todos os 4 níveis têm pelo menos 2 elementos definidos
  - [ ] Cada nível tem valor percebido atribuído em reais
  - [ ] Valores percebidos crescem exponencialmente entre níveis
  - [ ] Nível Entertainment tem elementos de engajamento genuíno
  - [ ] Nível Information tem pelo menos 1 framework proprietário
  - [ ] Nível Transformation tem sistema de accountability definido
  - [ ] Nível Implementation tem componente done-for-you claro
  - [ ] Frases de reação do consumidor validam cada nível
  - [ ] Score total resulta em value-to-price ≥ 10:1
  - [ ] Capacidade do criador comporta o nível mais alto proposto
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_OFF_001  # Criar Oferta Irresistível com hierarquia definida
    - KOE_OFF_005  # Pricing Architecture baseada na hierarquia
  artifacts:
    - value_hierarchy.yaml
  notes: "Hierarquia desenhada. Usar como base para arquitetar oferta e precificação."
```
