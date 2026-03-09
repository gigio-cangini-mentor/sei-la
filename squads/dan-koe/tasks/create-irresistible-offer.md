# Task: Criar Oferta Irresistível

```yaml
task_id: KOE_OFF_001
agent: koe-offers
type: creation
complexity: high
estimated_time: 60min
source: "Digital Economics — Dan Koe"
version: 1.0
tags: [offer, irresistible, value-stack, transformation]
dependencies: []
```

## Propósito

> "An irresistible offer is not about the product. It's about the transformation.
> People don't buy products — they buy better versions of themselves."
> — Dan Koe

Criar uma oferta digital irresistível completa usando o framework de Dan Koe.
A oferta deve ser tão valiosa que o prospect sente que está "roubando" ao comprar.

## Contexto

No modelo de Dan Koe, uma oferta irresistível não é apenas um produto com bônus.
É uma **arquitetura de transformação** que conecta:
- O estado atual do avatar (dor/frustração)
- O estado desejado (sonho/aspiração)
- O veículo de transformação (seu produto/serviço)
- A prova de que funciona (evidência social + garantia)

A oferta deve ter um **value-to-price ratio mínimo de 10:1** — ou seja, o valor
percebido deve ser pelo menos 10x o preço cobrado.

### Princípios Fundamentais
1. **Transformação > Informação**: Ninguém paga por informação, pagam por transformação
2. **Especificidade mata generalidade**: "Perca 5kg em 30 dias" > "Emagreça"
3. **Risco zero percebido**: A garantia deve eliminar TODO o risco do comprador
4. **Godfather Statement**: Uma frase que torna impossível dizer não

## Steps

### Step 1 — Definir a Transformação Core (15min)

Identifique a transformação central que a oferta entrega:

1. **Estado Atual (Antes)**:
   - Qual a principal dor/frustração do avatar?
   - O que ele já tentou que não funcionou?
   - Qual o custo de NÃO resolver isso?

2. **Estado Desejado (Depois)**:
   - Qual o resultado específico e mensurável?
   - Em quanto tempo ele alcança?
   - Como a vida dele muda concretamente?

3. **Veículo de Transformação**:
   - Qual o mecanismo único que entrega o resultado?
   - Por que seu método é diferente do que ele já tentou?
   - Qual a "grande ideia" por trás da abordagem?

**Critério de validação**: A transformação deve ser descritível em uma frase de 15 palavras ou menos.

### Step 2 — Construir Hierarquia de Valor (15min)

Organize o valor da oferta em 4 níveis crescentes:

1. **Nível Entertainment** (valor mais baixo):
   - O que torna a experiência agradável/envolvente?
   - Elementos de storytelling e engajamento
   - Design, apresentação, experiência do usuário

2. **Nível Information** (valor médio):
   - Que conhecimento específico é transferido?
   - Frameworks, modelos mentais, estratégias
   - Dados, pesquisas, estudos de caso

3. **Nível Transformation** (valor alto):
   - Que mudança comportamental/mental é gerada?
   - Exercícios práticos, worksheets, templates
   - Accountability, checkpoints, milestones

4. **Nível Implementation** (valor máximo):
   - O que é feito POR eles ou COM eles?
   - Done-for-you components
   - Acesso direto, mentoria, feedback personalizado

**Regra**: Cada nível acima justifica um preço exponencialmente maior.

### Step 3 — Arquitetar o Offer Stack (15min)

Monte a stack completa da oferta:

1. **Core Offer** (produto principal):
   - Descreva em 1 parágrafo
   - Valor percebido: R$ ____

2. **Bônus 1** (resolve objeção #1):
   - Qual objeção elimina?
   - Valor percebido: R$ ____

3. **Bônus 2** (resolve objeção #2):
   - Qual objeção elimina?
   - Valor percebido: R$ ____

4. **Bônus 3** (resolve objeção #3):
   - Qual objeção elimina?
   - Valor percebido: R$ ____

5. **Fast-Action Bonus** (urgência legítima):
   - Disponível apenas para os primeiros X ou por Y horas
   - Valor percebido: R$ ____

**Cálculo**: Soma dos valores percebidos ÷ Preço da oferta ≥ 10

### Step 4 — Design Risk Reversal (10min)

Crie a estratégia de reversão de risco:

1. **Garantia Primária**: Tipo e duração
2. **Garantia Secundária**: O que acontece se não funcionar
3. **Garantia "Melhor que Grátis"**: Eles ficam com tudo + reembolso
4. **Linguagem da Garantia**: Frase exata para copy

### Step 5 — Criar Godfather Statement (5min)

Escreva a declaração irrecusável:

> "[RESULTADO ESPECÍFICO] em [PRAZO] ou [GARANTIA EXTREMA]"

Valide contra 3 critérios:
- [ ] É específica e mensurável?
- [ ] Tem prazo definido?
- [ ] A garantia elimina todo o risco?

## Input Required

```yaml
input:
  creator_profile:
    name: ""
    expertise_area: ""
    unique_mechanism: ""
    years_experience: 0
    proof_of_results: []
    current_audience_size: 0

  avatar:
    name: ""
    age_range: ""
    primary_pain: ""
    secondary_pains: []
    dream_outcome: ""
    failed_attempts: []
    budget_range: ""
    urgency_level: "low|medium|high"
    sophistication_level: "unaware|problem-aware|solution-aware|product-aware|most-aware"

  market:
    niche: ""
    sub_niche: ""
    competitors: []
    average_price_point: 0
    market_sophistication: "1|2|3|4|5"
    trending_topics: []
```

## Output Template

```yaml
output:
  offer_architecture:
    name: ""
    tagline: ""
    godfather_statement: ""

    transformation:
      before_state: ""
      after_state: ""
      vehicle: ""
      timeframe: ""
      mechanism_name: ""

    value_hierarchy:
      entertainment:
        elements: []
        perceived_value: 0
      information:
        elements: []
        perceived_value: 0
      transformation:
        elements: []
        perceived_value: 0
      implementation:
        elements: []
        perceived_value: 0

    offer_stack:
      core_offer:
        description: ""
        perceived_value: 0
      bonuses:
        - name: ""
          addresses_objection: ""
          perceived_value: 0
        - name: ""
          addresses_objection: ""
          perceived_value: 0
        - name: ""
          addresses_objection: ""
          perceived_value: 0
      fast_action_bonus:
        name: ""
        scarcity_type: ""
        perceived_value: 0

    pricing:
      total_perceived_value: 0
      price: 0
      value_to_price_ratio: 0

    risk_reversal:
      primary_guarantee:
        type: ""
        duration: ""
        terms: ""
      secondary_guarantee:
        type: ""
        terms: ""
      guarantee_language: ""

    validation:
      is_specific: false
      has_timeframe: false
      risk_eliminated: false
      ratio_above_10x: false
```

## Quality Gate

```yaml
quality_gate: KOE_OFF_001_QG
checklist:
  - [ ] Transformação descrita em ≤15 palavras
  - [ ] 4 níveis de hierarquia de valor preenchidos
  - [ ] Mínimo 3 bônus que resolvem objeções reais
  - [ ] Value-to-price ratio ≥ 10:1
  - [ ] Garantia elimina risco financeiro, temporal e social
  - [ ] Godfather Statement passa nos 3 critérios
  - [ ] Linguagem na voz do avatar (não jargão de marketing)
  - [ ] Nenhuma promessa que não pode ser cumprida
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_OFF_005  # Pricing Architecture para detalhar precificação
    - KOE_OFF_003  # Risk Reversal Strategy para aprofundar garantia
  artifacts:
    - offer_architecture.yaml
  notes: "Oferta criada. Validar com avatar real antes de lançar."
```
