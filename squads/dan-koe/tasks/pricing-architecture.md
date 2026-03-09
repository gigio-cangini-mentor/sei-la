# Task: Arquitetura de Precificação

```yaml
task_id: KOE_OFF_005
agent: koe-offers
type: design
complexity: medium
estimated_time: 30min
source: "Digital Economics — Dan Koe"
version: 1.0
tags: [pricing, value-anchoring, tier-structure, monetization]
dependencies: [KOE_OFF_002]
```

## Propósito

> "Price is a story you tell. If you can't justify your price in one sentence,
> you don't have a pricing strategy — you have a guess."
> — Dan Koe

Desenhar a arquitetura de precificação com ancoragem de valor e estrutura de tiers
que maximize receita por cliente enquanto mantém acessibilidade.

## Contexto

A precificação no modelo Dan Koe não é baseada em custo — é baseada em **valor percebido
e transformação entregue**. O preço é uma consequência da hierarquia de valor.

### Princípios de Precificação Koe
1. **Preço = Função do resultado, não do tempo investido**
2. **Ancoragem antes do preço**: Sempre mostre o valor total antes do preço
3. **Tiers criam acessibilidade sem desvalorizar**: Free → Low → Mid → High
4. **Cada tier deve ser lucrativo isoladamente**
5. **Upsell natural**: Cada tier prepara para o próximo

### Estrutura de Tiers Típica

| Tier | Preço | Margem | Objetivo |
|------|-------|--------|----------|
| Free | R$0 | N/A | Lead generation, confiança |
| Low Ticket | R$27-197 | 90%+ | Qualificar compradores |
| Mid Ticket | R$297-2.000 | 80%+ | Core revenue |
| High Ticket | R$3.000-50.000+ | 70%+ | Máxima transformação |

## Steps

### Step 1 — Calcular Valor Percebido (8min)

Determine o valor percebido real da sua oferta:

**Método 1 — Custo de Oportunidade**:
- Quanto o avatar perderia em 12 meses SEM resolver o problema? R$ ____
- Quanto ele já gastou tentando resolver de outras formas? R$ ____
- Quanto custaria resolver com alternativa mais cara (consultoria 1:1, etc.)? R$ ____
- Valor percebido mínimo = média dos 3 acima: R$ ____

**Método 2 — Resultado Monetizável**:
- Qual o resultado financeiro esperado após implementar? R$ ____/mês
- Em 12 meses: R$ ____ × 12 = R$ ____
- Valor percebido = resultado × fator de certeza (0.3 a 0.8): R$ ____

**Método 3 — Comparação de Mercado**:
- Preço médio de concorrentes diretos: R$ ____
- Preço do concorrente mais caro: R$ ____
- Seu diferencial justifica prêmio de ____% sobre a média

**Valor percebido final (maior dos 3 métodos)**: R$ ____

### Step 2 — Definir Price Point (7min)

Com o valor percebido calculado, defina o preço:

**Regra base**: Preço = Valor Percebido ÷ 10 (mínimo ratio 10:1)

**Fatores de ajuste**:
- Mercado price-sensitive? Divida por 15-20 em vez de 10
- Mercado premium? Divida por 5-8
- Primeira oferta? Use low-ticket para reduzir barreira de entrada
- Oferta de backend (para clientes existentes)? Pode usar ratio menor (5:1)

**Cálculo**:
```
Valor Percebido: R$ ____
Divisor escolhido: ____
Preço calculado: R$ ____
Preço arredondado (terminando em 7): R$ ____

Validação: R$ [valor] ÷ R$ [preço] = ____ : 1 ≥ 10:1? [ ]
```

### Step 3 — Criar Sequência de Ancoragem (8min)

A ancoragem é a arte de mostrar o valor antes do preço:

**Sequência de 5 passos**:

1. **Âncora Alta** (valor total da stack):
   > "O valor total de tudo que você recebe é R$ ____"

2. **Âncora de Comparação** (alternativa mais cara):
   > "Se você fosse conseguir isso com ____, custaria R$ ____"

3. **Âncora de Custo** (custo de NÃO resolver):
   > "Cada mês sem resolver isso te custa R$ ____"

4. **Revelação do Preço** (com contraste):
   > "Mas seu investimento hoje não é R$ ____. Nem R$ ____. É apenas R$ ____"

5. **Divisão por Dia** (micro-comprometimento):
   > "Isso equivale a apenas R$ ____ por dia — menos que um café"

**Escreva sua sequência completa de ancoragem**:
```
Âncora 1: "____"
Âncora 2: "____"
Âncora 3: "____"
Revelação: "____"
Divisão: "____"
```

### Step 4 — Desenhar Tier Structure (7min)

Crie a escada de produtos (Product Ladder):

**Tier Free (Lead Magnet)**:
- O que: ____
- Formato: ____
- Objetivo: Gerar lead qualificado + demonstrar expertise
- KPI: ____ leads/mês
- Transição para Low: ____

**Tier Low Ticket (Qualificador)**:
- O que: ____
- Preço: R$ ____
- Formato: ____
- Objetivo: Converter lead em comprador + gerar prova
- KPI: ____% conversão de free→low
- Transição para Mid: ____

**Tier Mid Ticket (Core)**:
- O que: ____
- Preço: R$ ____
- Formato: ____
- Objetivo: Receita principal + transformação core
- KPI: ____% conversão de low→mid
- Transição para High: ____

**Tier High Ticket (Premium)**:
- O que: ____
- Preço: R$ ____
- Formato: ____
- Objetivo: Máxima transformação + máxima receita por cliente
- KPI: ____% conversão de mid→high
- Lifetime Value estimado: R$ ____

## Input Required

```yaml
input:
  offer_context:
    offer_name: ""
    perceived_value_estimated: 0
    target_market: ""
    market_price_sensitivity: "low|medium|high"
    competitor_price_range:
      min: 0
      max: 0
      average: 0

  avatar_economics:
    monthly_income_range: ""
    disposable_income_for_education: 0
    cost_of_not_solving: 0  # per month
    expected_roi_after_purchase: 0  # per month

  creator_economics:
    cost_per_acquisition: 0
    desired_margin: 0  # percentage
    fulfillment_cost_per_sale: 0
    current_audience_size: 0
    conversion_rate_estimated: 0  # percentage

  existing_products:
    - name: ""
      price: 0
      tier: ""
    - name: ""
      price: 0
      tier: ""
```

## Output Template

```yaml
output:
  pricing_architecture:
    offer_name: ""

    value_calculation:
      method_1_opportunity_cost: 0
      method_2_monetizable_result: 0
      method_3_market_comparison: 0
      final_perceived_value: 0
      method_used: ""

    price_point:
      calculated_price: 0
      rounded_price: 0
      value_to_price_ratio: 0
      passes_10x_test: true|false

    anchoring_sequence:
      anchor_high: ""
      anchor_comparison: ""
      anchor_cost_of_inaction: ""
      price_reveal: ""
      daily_division: ""

    tier_structure:
      free:
        product_name: ""
        format: ""
        objective: ""
        kpi_target: ""
        transition_to_low: ""
      low_ticket:
        product_name: ""
        price: 0
        format: ""
        objective: ""
        conversion_rate_target: 0
        transition_to_mid: ""
      mid_ticket:
        product_name: ""
        price: 0
        format: ""
        objective: ""
        conversion_rate_target: 0
        transition_to_high: ""
      high_ticket:
        product_name: ""
        price: 0
        format: ""
        objective: ""
        conversion_rate_target: 0
        customer_ltv: 0

    revenue_projection:
      monthly_leads: 0
      free_to_low_rate: 0
      low_to_mid_rate: 0
      mid_to_high_rate: 0
      projected_monthly_revenue: 0
      projected_annual_revenue: 0
      average_revenue_per_customer: 0

    pricing_psychology:
      price_ending: "7|9|0"
      payment_plan_available: true|false
      payment_plan_terms: ""
      price_framing: ""
```

## Quality Gate

```yaml
quality_gate: KOE_OFF_005_QG
checklist:
  - [ ] Valor percebido calculado por pelo menos 2 métodos
  - [ ] Value-to-price ratio ≥ 10:1
  - [ ] Sequência de ancoragem completa (5 passos)
  - [ ] Mínimo 3 tiers definidos (free + low + mid OU mid + high)
  - [ ] Cada tier tem KPI e transição para o próximo
  - [ ] Projeção de receita mensal calculada
  - [ ] Preço termina em 7 (padrão de mercado digital)
  - [ ] Margem por venda é sustentável (≥ 70%)
  - [ ] Plano de pagamento disponível para tickets > R$500
  - [ ] Customer LTV estimado para tier mais alto
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_OFF_004  # Godfather Offer com pricing definido
    - KOE_BRD_003  # Leverage Stack Build para otimizar receita
  artifacts:
    - pricing_architecture.yaml
  notes: "Arquitetura de precificação completa. Testar preço com beta group antes do lançamento público."
```
