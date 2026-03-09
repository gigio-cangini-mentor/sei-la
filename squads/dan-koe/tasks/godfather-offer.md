# Task: Criar Godfather Offer

```yaml
task_id: KOE_OFF_004
agent: koe-offers
type: creation
complexity: high
estimated_time: 45min
source: "Digital Economics — Dan Koe"
version: 1.0
tags: [godfather-offer, irresistible, value-stack, conversion]
dependencies: [KOE_OFF_002, KOE_OFF_003]
```

## Propósito

> "A Godfather Offer is an offer so good that your ideal customer would feel stupid
> saying no. The value is so overwhelmingly clear that the only logical response is yes."
> — Dan Koe

Criar uma Godfather Offer — uma oferta tão irrecusável que o prospect sente que
está perdendo dinheiro ao NÃO comprar. O ratio de valor-para-preço deve ser mínimo 10:1.

## Contexto

O conceito de "Godfather Offer" vem da famosa frase do filme: "uma oferta que ele
não pode recusar". No contexto de Dan Koe, isso significa:

- **Valor percebido absurdamente maior que o preço**
- **Risco zero para o comprador** (toda garantia possível)
- **Escassez legítima** (não fabricada)
- **Dream outcome claramente articulado**

### Anatomia de uma Godfather Offer
1. **Dream Outcome**: O resultado que o avatar mais deseja
2. **Perceived Value Stack**: Soma de todos os valores > 10x preço
3. **Bonus Stack**: Cada bônus resolve uma objeção específica
4. **Risk Reversal**: Garantia que inverte todo o risco
5. **Godfather Statement**: A frase que fecha (impossível dizer não)
6. **Urgency/Scarcity**: Motivo legítimo para agir agora

### Diferença entre Oferta Boa e Godfather Offer

| Aspecto | Oferta Boa | Godfather Offer |
|---------|------------|-----------------|
| Value ratio | 3-5x | 10x+ |
| Garantia | 30 dias reembolso | "Melhor que grátis" |
| Bônus | Genéricos | Cada um mata uma objeção |
| Escassez | "Vagas limitadas" | Razão estrutural real |
| Reação do prospect | "Interessante" | "Eu seria burro de não comprar" |

## Steps

### Step 1 — Definir Dream Outcome (10min)

O dream outcome é o resultado final que o avatar mais deseja. Não é um feature,
não é um benefício — é a TRANSFORMAÇÃO DE VIDA.

**Framework para definir**:
1. Se seu produto funcionasse perfeitamente, o que mudaria na vida do avatar?
2. Como ele descreveria essa mudança para um amigo em uma frase?
3. Qual o resultado mais ambicioso mas ainda credível?

**Formatos de Dream Outcome**:
- Resultado + Prazo: "Fature R$10k/mês em 90 dias"
- Transformação + Identidade: "Torne-se um criador de 6 dígitos"
- Eliminação + Especificidade: "Nunca mais dependa de algoritmo para vender"

**Teste de validação**:
- [ ] O avatar ficaria animado lendo isso em voz alta?
- [ ] É específico o suficiente para ser mensurável?
- [ ] É ambicioso mas credível (não é hype)?

### Step 2 — Calcular Value-to-Price Ratio (10min)

Monte a stack de valor completa e calcule o ratio:

**Core Offer**:
- Descrição: ____
- Valor percebido: R$ ____
- Justificativa: "quanto custaria conseguir isso de outra forma?"

**Bônus 1 — Mata objeção: "____"**
- Descrição: ____
- Valor percebido: R$ ____
- Justificativa do valor: ____

**Bônus 2 — Mata objeção: "____"**
- Descrição: ____
- Valor percebido: R$ ____
- Justificativa do valor: ____

**Bônus 3 — Mata objeção: "____"**
- Descrição: ____
- Valor percebido: R$ ____
- Justificativa do valor: ____

**Bônus 4 — Fast Action (urgência legítima)**
- Descrição: ____
- Valor percebido: R$ ____
- Disponível apenas para: ____

**Cálculo**:
```
Total Valor Percebido = Core + B1 + B2 + B3 + B4
Preço da Oferta = R$ ____
Ratio = Total ÷ Preço = ____ : 1

✅ Ratio ≥ 10:1? [ ] SIM  [ ] NÃO
```

Se NÃO: aumente valor (mais bônus) OU reduza preço OU ambos.

### Step 3 — Stack de Bônus Anti-Objeção (10min)

Cada bônus deve neutralizar uma objeção específica:

**Mapeamento de Objeções → Bônus**:

| # | Objeção do Avatar | Bônus que Neutraliza | Como Neutraliza |
|---|-------------------|---------------------|-----------------|
| 1 | "Não tenho tempo" | | |
| 2 | "Não sei se funciona pra mim" | | |
| 3 | "É muito caro" | | |
| 4 | "Não tenho as habilidades" | | |
| 5 | "Já tentei antes e não funcionou" | | |

**Regras para bônus eficazes**:
- Cada bônus resolve UMA objeção específica
- O bônus deve ter valor independente (poderia ser vendido separado)
- Nomeie cada bônus como produto (não como "bônus #1")
- Atribua valor realista e justificável

### Step 4 — Escrever Godfather Statement (15min)

O Godfather Statement é a frase que torna impossível dizer não.

**Estrutura**:
> "[DREAM OUTCOME] em [PRAZO] ou [GARANTIA EXTREMA], e você ainda leva [BÔNUS PRINCIPAL] de graça."

**Exemplos**:
- "Monte seu negócio de 6 dígitos em 6 meses ou devolvemos cada centavo + você fica com todo o material"
- "Dobre seu faturamento em 90 dias usando nosso método ou trabalhamos de graça até funcionar"
- "Crie sua primeira oferta digital lucrativa em 30 dias ou receba o dobro do investimento de volta"

**Seu Godfather Statement**:
> "____________________________________________________________"

**Checklist de validação**:
- [ ] Inclui dream outcome específico?
- [ ] Tem prazo definido?
- [ ] Garantia elimina todo risco?
- [ ] Adiciona bônus/sweetener extra?
- [ ] É credível (você pode cumprir)?
- [ ] Gera a reação "eu seria burro de não aceitar"?

## Input Required

```yaml
input:
  avatar:
    dream_outcome_raw: ""
    top_objections:
      - objection: ""
        intensity: 0  # 1-10
      - objection: ""
        intensity: 0
      - objection: ""
        intensity: 0
      - objection: ""
        intensity: 0
      - objection: ""
        intensity: 0
    budget_range: ""
    decision_timeline: ""

  offer_base:
    core_product: ""
    core_value: 0
    current_price: 0
    existing_bonuses: []
    current_guarantee: ""

  creator:
    confidence_level: 0  # 1-10 in product delivering results
    refund_capacity: ""
    fulfillment_capacity: ""
    unique_mechanism: ""
```

## Output Template

```yaml
output:
  godfather_offer:
    name: ""
    godfather_statement: ""

    dream_outcome:
      statement: ""
      timeframe: ""
      metric: ""
      credibility_proof: ""

    value_stack:
      core_offer:
        name: ""
        description: ""
        perceived_value: 0
        value_justification: ""
      bonuses:
        - name: ""
          kills_objection: ""
          description: ""
          perceived_value: 0
          standalone_value: true|false
        - name: ""
          kills_objection: ""
          description: ""
          perceived_value: 0
          standalone_value: true|false
        - name: ""
          kills_objection: ""
          description: ""
          perceived_value: 0
          standalone_value: true|false
      fast_action_bonus:
        name: ""
        description: ""
        perceived_value: 0
        scarcity_reason: ""
        available_for: ""

    pricing:
      total_perceived_value: 0
      price: 0
      value_to_price_ratio: 0
      passes_10x_test: true|false

    risk_reversal:
      guarantee_type: ""
      guarantee_statement: ""
      guarantee_duration: ""
      refund_process: ""

    urgency:
      type: "deadline|quantity|bonus-removal|price-increase"
      reason: ""
      is_legitimate: true|false
      deadline_or_limit: ""

    validation:
      dream_outcome_specific: true|false
      ratio_above_10x: true|false
      each_bonus_kills_objection: true|false
      guarantee_eliminates_risk: true|false
      urgency_is_legitimate: true|false
      creator_can_fulfill: true|false
      overall_score: 0  # out of 6
```

## Quality Gate

```yaml
quality_gate: KOE_OFF_004_QG
checklist:
  - [ ] Dream Outcome é específico, mensurável e com prazo
  - [ ] Value-to-price ratio ≥ 10:1 calculado e documentado
  - [ ] Mínimo 3 bônus, cada um matando uma objeção específica
  - [ ] Cada bônus tem valor standalone (poderia ser vendido separado)
  - [ ] Garantia do tipo "melhor que grátis" ou superior
  - [ ] Godfather Statement passa nos 6 critérios de validação
  - [ ] Escassez/urgência é legítima (não fabricada)
  - [ ] Criador pode cumprir TUDO que promete
  - [ ] Overall validation score ≥ 5/6
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_OFF_005  # Pricing Architecture para finalizar precificação
    - KOE_BRD_005  # Brand Lead Gen para criar funil da oferta
  artifacts:
    - godfather_offer.yaml
  notes: "Godfather Offer criada. Testar com 5-10 avatares reais antes de lançar publicamente."
```
