# Task: Criacao de Produto Digital

```yaml
task_id: KOE_OFF_007
agent: koe-offers
type: implementation
complexity: high
estimated_time: 35min
source: "Digital Product Pipeline — Dan Koe, Modern Mastery"
version: 1.0
tags: [digital-product, creation, pipeline, idea-to-product, launch, offers]
dependencies: []
```

## Proposito

> "The best digital product is your best content, organized into a
> transformation sequence. You already have the ideas — you just need
> the architecture. Stop waiting for the perfect idea. Take what you
> know and package it into something people can USE."
> — Dan Koe

Transformar uma ideia em um produto digital vendavel usando o pipeline
completo: Idea → Validation → Architecture → Creation → Launch.
O foco e velocidade com qualidade — ship fast, iterate based on feedback.

## Contexto

O Digital Product Pipeline de Dan Koe e projetado para criadores soberanos
que querem monetizar conhecimento sem construir uma empresa complexa.
O principio: seu melhor conteudo, organizado numa sequencia de transformacao.

### O Pipeline

```
IDEA → VALIDATION → ARCHITECTURE → CREATION → LAUNCH
  |        |             |              |          |
  v        v             v              v          v
 Core    Market       Module        Content     Offer
 Concept  Test        Design        Production  Design
```

### Regra: Ship in 30 Days
Se levar mais de 30 dias para criar, voce esta over-engineering.

## Steps

### Step 1 — Definir a Ideia do Produto (7min)

**Core Concept**:
- Que problema especifico resolve? ____
- Para quem? ____
- Qual a transformacao (de → para)? ____

**Teste do "Stupid to Say No"**:
- Se alguem tem esse problema, seria burrice nao comprar? [ ] Sim [ ] Nao
- Se nao, o que falta? ____

**Posicao na Value Hierarchy**:
- [ ] Low Ticket ($10-$100) — Informacao
- [ ] Mid Ticket ($100-$1K) — Educacao profunda
- [ ] High Ticket ($1K-$10K) — Transformacao

**Preco inicial**: $____
**Justificativa (value ≥ 10x price)**: ____

### Step 2 — Validacao Rapida (5min)

**3 Sinais de que o mercado quer isso**:
1. ____
2. ____
3. ____

**Teste de 24h**:
- Postar sobre o tema e medir resposta: [ ] Feito [ ] A fazer
- Perguntar para 5 pessoas se pagariam: [ ] Feito [ ] A fazer
- Procurar produtos similares que vendem: [ ] Feito [ ] A fazer

**Pre-venda possivel?** [ ] Sim [ ] Nao
Se sim, meta de pre-vendas: ____

### Step 3 — Arquitetura do Produto (10min)

**Formato escolhido**: [ ] Ebook [ ] Curso [ ] Workshop [ ] Template Pack [ ] Comunidade

**Estrutura de modulos/capitulos**:

| # | Modulo/Capitulo | Resultado para o aluno | Formato |
|---|----------------|----------------------|---------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |

**Bonus (resolve objecoes especificas)**:
| # | Bonus | Objecao que resolve | Formato |
|---|-------|---------------------|---------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

**Quick Win** (resultado nos primeiros 15 min):
> O aluno consegue ____ logo no Modulo 1.

### Step 4 — Plano de Criacao em 30 Dias (8min)

**Semana 1: Outline + Modulo 1-2**
- [ ] Outline completo com todos modulos
- [ ] Modulo 1 criado (inclui Quick Win)
- [ ] Modulo 2 criado
- [ ] Prazo: ____

**Semana 2: Modulos 3-4**
- [ ] Modulo 3 criado
- [ ] Modulo 4 criado
- [ ] Review do que foi criado
- [ ] Prazo: ____

**Semana 3: Modulos 5-6 + Bonus**
- [ ] Modulos restantes criados
- [ ] Bonus produzidos
- [ ] Teste do produto (voce como aluno)
- [ ] Prazo: ____

**Semana 4: Launch Prep**
- [ ] Landing page criada
- [ ] Email sequence de lancamento (3-5 emails)
- [ ] Offer design (core + bonus + guarantee)
- [ ] Risk reversal definido
- [ ] Prazo de lancamento: ____

### Step 5 — Design da Oferta (5min)

**Godfather Offer Assembly**:
- Core product: ____
- Bonus 1: ____
- Bonus 2: ____
- Bonus 3: ____
- Guarantee: ____
- Real scarcity (se aplicavel): ____
- Preco final: $____

**Risk Reversal escolhido**:
- [ ] Garantia incondicional (____ dias)
- [ ] Garantia condicional (se fizer ____, refund)
- [ ] Garantia de performance (resultado X ou ____)
- [ ] Sem garantia (social proof forte)

**Sovereignty Check**:
- [ ] Produto escala sem meu tempo proporcional
- [ ] Nao cria dependencia no cliente
- [ ] Alinhado com minha Personal Monopoly
- [ ] Revenue pode crescer enquanto durmo

## Input Required

```yaml
input:
  product_idea:
    problem: ""
    audience: ""
    transformation: ""
    format: "ebook|course|workshop|templates|community"
  pricing:
    value_hierarchy_tier: "low|mid|high"
    target_price: 0
  timeline:
    creation_deadline: ""
    launch_date: ""
  existing_content:
    related_posts: []
    related_newsletters: []
    audience_questions: []
```

## Output Template

```yaml
output:
  digital_product:
    creation_date: ""

    concept:
      problem: ""
      audience: ""
      transformation: ""
      price: 0
      format: ""

    validation:
      market_signals: []
      pre_sale_results: ""

    architecture:
      modules:
        - number: 1
          title: ""
          outcome: ""
          format: ""
      bonuses:
        - title: ""
          resolves: ""
      quick_win: ""

    creation_plan:
      week_1: []
      week_2: []
      week_3: []
      week_4: []
      launch_date: ""

    offer_design:
      core: ""
      bonuses: []
      guarantee: ""
      scarcity: ""
      final_price: 0

    sovereignty_check:
      scales: true|false
      no_dependency: true|false
      aligned_monopoly: true|false
```

## Quality Gate

```yaml
quality_gate: KOE_OFF_007_QG
checklist:
  - [ ] Problema claro com transformacao definida (de → para)
  - [ ] Posicao na Value Hierarchy definida com preco justificado
  - [ ] Minimo 3 sinais de validacao do mercado
  - [ ] Arquitetura com modulos, resultados por modulo e Quick Win
  - [ ] Bonus resolvem objecoes especificas (nao sao enchimento)
  - [ ] Plano de 30 dias com entregas semanais
  - [ ] Offer completa (core + bonus + guarantee + scarcity)
  - [ ] Risk reversal escolhido e justificado
  - [ ] Sovereignty check passa
  - [ ] Value ≥ 10x price demonstrado
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_OFF_001  # Create Irresistible Offer para refinar a oferta
    - KOE_OFF_003  # Risk Reversal Strategy para detalhar garantia
    - KOE_BRD_006  # Audience Flywheel para alinhar lancamento ao flywheel
  artifacts:
    - digital_product.yaml
  notes: "Produto arquitetado. Comecar criacao na Semana 1 IMEDIATAMENTE. Ship in 30 days."
```
