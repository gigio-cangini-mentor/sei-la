# Task: Estratégia de Reversão de Risco

```yaml
task_id: KOE_OFF_003
agent: koe-offers
type: design
complexity: medium
estimated_time: 25min
source: "Digital Economics — Dan Koe"
version: 1.0
tags: [risk-reversal, guarantee, objection-handling, trust]
dependencies: []
```

## Propósito

> "The best guarantee isn't about your confidence in the product.
> It's about eliminating every fear the buyer has — financial, time, effort, and social."
> — Dan Koe

Desenhar uma estratégia de reversão de risco multicamada que cubra os 4 tipos de
medo do comprador: financeiro, temporal, de esforço e social.

## Contexto

A maioria dos criadores oferece apenas garantia de reembolso (risco financeiro).
Mas o comprador tem 4 tipos de medo que impedem a compra:

1. **Risco Financeiro**: "E se eu perder meu dinheiro?"
2. **Risco Temporal**: "E se eu perder meu tempo?"
3. **Risco de Esforço**: "E se for difícil demais e eu não conseguir?"
4. **Risco Social**: "E se as pessoas me julgarem por comprar isso?"

Uma estratégia de reversão de risco completa elimina TODOS os 4 medos, não apenas o financeiro.

### Tipos de Garantia (do mais fraco ao mais forte)
- **Garantia de Satisfação**: Reembolso se não gostar (fraco)
- **Garantia Condicional**: Reembolso se seguir o método e não ter resultado (médio)
- **Garantia Incondicional**: Reembolso sem perguntas (forte)
- **Garantia "Melhor que Grátis"**: Reembolso + fica com tudo + bônus de desculpas (fortíssimo)
- **Garantia de Resultado**: Trabalho até funcionar ou devolvemos tudo (máximo)

### Princípio de Autenticidade
A garantia deve ser **genuína e sustentável**. Nunca prometa o que não pode cumprir.
Uma garantia falsa destrói mais confiança do que nenhuma garantia.

## Steps

### Step 1 — Mapear Medos do Avatar (7min)

Para cada tipo de risco, identifique o medo específico do seu avatar:

**Risco Financeiro**:
- Qual o medo financeiro principal? (ex: "não posso me dar ao luxo de errar")
- Qual o custo de oportunidade que ele calcula? (ex: "podia usar esse dinheiro em X")
- Ele já foi "enganado" antes? Como?
- Qual o threshold de "dinheiro jogado fora" para ele?

**Risco Temporal**:
- Quanto tempo ele acha que vai levar?
- Ele já investiu tempo em soluções que não funcionaram?
- Qual o custo do tempo dele? (hora de trabalho, projetos perdidos)
- Ele tem medo de "mais um curso que não vou terminar"?

**Risco de Esforço**:
- Ele acha que vai ser difícil demais?
- Qual o nível de habilidade técnica que ele teme precisar?
- Ele tem medo de "não ser disciplinado o suficiente"?
- Quais tentativas passadas reforçam esse medo?

**Risco Social**:
- Ele tem medo do que outros vão pensar?
- A compra precisa ser "justificável" para cônjuge/família?
- Existe estigma no nicho dele sobre comprar cursos/mentorias?
- Ele teme parecer "ingênuo" ou "desesperado"?

### Step 2 — Criar Reversão para Cada Risco (8min)

Para cada medo mapeado, desenhe uma reversão específica:

**Reversão do Risco Financeiro**:
- Tipo de garantia: ____
- Duração: ____ dias
- Condições (se houver): ____
- Linguagem exata: "____"
- Processo de reembolso: ____

**Reversão do Risco Temporal**:
- Como provar que economiza tempo? ____
- Que atalhos/templates eliminam trabalho? ____
- Qual o "tempo até primeiro resultado"? ____
- Linguagem exata: "____"

**Reversão do Risco de Esforço**:
- Como simplificar a jornada? ____
- Que suporte existe para momentos difíceis? ____
- Qual o "primeiro passo de 2 minutos"? ____
- Linguagem exata: "____"

**Reversão do Risco Social**:
- Que prova social elimina julgamento? ____
- Como outros "como ele" tiveram resultado? ____
- Que comunidade normaliza a decisão? ____
- Linguagem exata: "____"

### Step 3 — Escolher Tipo de Garantia (5min)

Selecione o tipo de garantia principal com base na análise:

1. Avalie sua capacidade de absorver reembolsos
2. Calcule a taxa de reembolso esperada (mercado: 5-15%)
3. Defina se será condicional ou incondicional
4. Escolha a duração (7, 14, 30, 60, 90 dias)
5. Redija a declaração de garantia completa

**Fórmula de viabilidade**:
```
receita_mensal × taxa_reembolso_esperada ≤ margem_aceitável
```

### Step 4 — Validar Autenticidade (5min)

Teste a garantia contra critérios de autenticidade:

- [ ] Você PODE cumprir esta promessa financeiramente?
- [ ] Você ACREDITA que o produto entrega o que promete?
- [ ] O processo de reembolso é SIMPLES para o cliente?
- [ ] A garantia é SUSTENTÁVEL a longo prazo?
- [ ] Você ficaria confortável explicando esta garantia pessoalmente?
- [ ] A linguagem é clara (sem letras miúdas ou armadilhas)?

## Input Required

```yaml
input:
  avatar_fears:
    financial:
      primary_fear: ""
      past_losses: []
      budget_sensitivity: "low|medium|high"
    temporal:
      time_scarcity_level: "low|medium|high"
      failed_time_investments: []
      perceived_learning_curve: ""
    effort:
      self_discipline_confidence: "low|medium|high"
      technical_skill_level: "beginner|intermediate|advanced"
      past_incomplete_purchases: []
    social:
      peer_judgment_fear: "low|medium|high"
      needs_external_approval: true|false
      niche_stigma_level: "none|low|medium|high"

  business_capacity:
    monthly_revenue: 0
    acceptable_refund_rate: 0  # percentage
    margin_per_sale: 0
    support_team_available: true|false
    refund_process_automated: true|false

  offer_details:
    price: 0
    delivery_format: ""
    time_to_first_result: ""
    completion_rate_expected: 0  # percentage
```

## Output Template

```yaml
output:
  risk_reversal_strategy:
    offer_name: ""

    fear_map:
      financial:
        primary_fear: ""
        intensity: 0  # 1-10
        reversal_approach: ""
        language: ""
      temporal:
        primary_fear: ""
        intensity: 0
        reversal_approach: ""
        language: ""
      effort:
        primary_fear: ""
        intensity: 0
        reversal_approach: ""
        language: ""
      social:
        primary_fear: ""
        intensity: 0
        reversal_approach: ""
        language: ""

    primary_guarantee:
      type: "satisfaction|conditional|unconditional|better-than-free|result"
      duration_days: 0
      conditions: ""
      refund_process: ""
      full_statement: ""

    secondary_guarantees:
      - type: ""
        addresses_risk: ""
        statement: ""
      - type: ""
        addresses_risk: ""
        statement: ""

    combined_guarantee_statement: ""

    viability_check:
      expected_refund_rate: 0
      monthly_refund_cost: 0
      is_sustainable: true|false
      break_even_with_refunds: true|false

    authenticity_score:
      can_fulfill: true|false
      believes_in_product: true|false
      simple_process: true|false
      sustainable_long_term: true|false
      clear_language: true|false
      total_score: 0  # out of 5
```

## Quality Gate

```yaml
quality_gate: KOE_OFF_003_QG
checklist:
  - [ ] Todos os 4 tipos de medo mapeados com intensidade
  - [ ] Reversão específica para cada tipo de risco
  - [ ] Linguagem escrita para cada reversão (copy-ready)
  - [ ] Tipo de garantia principal definido e justificado
  - [ ] Cálculo de viabilidade financeira completo
  - [ ] Teste de autenticidade score ≥ 4/5
  - [ ] Declaração combinada de garantia redigida
  - [ ] Nenhuma promessa insustentável ou falsa
  - [ ] Processo de reembolso documentado
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_OFF_001  # Integrar no Offer Architecture
    - KOE_OFF_004  # Usar na Godfather Offer
  artifacts:
    - risk_reversal_strategy.yaml
  notes: "Estratégia de risco desenhada. Integrar na oferta principal e validar com clientes reais."
```
