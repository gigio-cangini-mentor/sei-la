# Task: Design do Ecossistema de Produtos

```yaml
task_id: KOE_OFF_006
agent: koe-offers
type: implementation
complexity: high
estimated_time: 40min
source: "Product Ecosystem — Dan Koe, Modern Mastery"
version: 1.0
tags: [products, ecosystem, value-ladder, ascension, offers, digital-products]
dependencies: []
```

## Proposito

> "Your products should form an ecosystem, not a collection.
> Each product naturally leads to the next. The free guide makes
> them want the course. The course makes them want the coaching.
> Design the journey, dont leave it to chance."
> — Dan Koe

Desenhar um ecossistema de produtos digitais interconectados em cada tier da
Value Hierarchy, formando um caminho natural de ascensao — cada produto
torna o proximo irresistivel.

## Contexto

O Product Ecosystem Design e a abordagem de Dan Koe para criar uma linha
de produtos que funciona como sistema, nao como colecao desconectada.
Cada produto resolve PARTE do problema no tier atual e naturalmente
aponta para a solucao COMPLETA no proximo tier.

### Os 5 Tiers do Ecossistema

| Tier | Faixa de Preco | Proposito | Formato |
|------|---------------|-----------|---------|
| Free | $0 | Trust + Email | Newsletter, guia, template |
| Low Ticket | $10-$100 | Primeira transacao | Ebook, workshop, bundle |
| Mid Ticket | $100-$1K | Educacao profunda | Curso, cohort, comunidade |
| High Ticket | $1K-$10K | Transformacao | Coaching, mastermind, mentoria |
| Ultra Premium | $10K+ | Done-for-you | Consultoria, servico, parceria |

### Regra de Ouro
Cada tier resolve PARTE do problema. O proximo tier resolve MAIS. O topo resolve TUDO.

## Steps

### Step 1 — Definir a Grande Transformacao (8min)

**O problema central que voce resolve**:
> ____

**A transformacao completa (de → para)**:
> De: ____
> Para: ____

**Por que VOCE e a pessoa certa para resolver isso?**:
> ____

**Decompor a transformacao em 5 niveis**:

| Nivel | O que resolve | O que fica pendente |
|-------|-------------|-------------------|
| Free | | Tudo exceto awareness |
| Low | | Maioria dos detalhes |
| Mid | | Implementacao e accountability |
| High | | Personalizacao e acompanhamento |
| Ultra | | Nada — tudo resolvido |

### Step 2 — Desenhar Cada Tier (15min)

**TIER FREE — Lead Magnet**:
- Produto: ____
- Formato: ____
- O que entrega: ____
- O que deixa pendente (gancho para Low): ____
- Mecanismo de captura (email): ____

**TIER LOW TICKET ($____)**:
- Produto: ____
- Formato: ____
- O que entrega: ____
- O que deixa pendente (gancho para Mid): ____
- Conversao-alvo de Free: ____%

**TIER MID TICKET ($____)**:
- Produto: ____
- Formato: ____
- O que entrega: ____
- O que deixa pendente (gancho para High): ____
- Conversao-alvo de Low: ____%

**TIER HIGH TICKET ($____)**:
- Produto: ____
- Formato: ____
- O que entrega: ____
- O que deixa pendente (gancho para Ultra): ____
- Conversao-alvo de Mid: ____%

**TIER ULTRA PREMIUM ($____)**:
- Produto: ____
- Formato: ____
- O que entrega: TUDO
- Cap de clientes: ____
- Conversao-alvo de High: ____%

### Step 3 — Desenhar Transicoes entre Tiers (10min)

**Free → Low**: O que faz alguem pagar pela primeira vez?
- Trigger: ____
- Mecanismo: ____
- Timing: ____ dias apos captura

**Low → Mid**: O que faz alguem investir mais?
- Trigger: ____
- Mecanismo: ____
- Timing: ____ dias apos compra Low

**Mid → High**: O que faz alguem querer acompanhamento?
- Trigger: ____
- Mecanismo: ____
- Timing: ____ dias apos compra Mid

**High → Ultra**: O que faz alguem querer done-for-you?
- Trigger: ____
- Mecanismo: ____
- Timing: ____ dias apos compra High

**Sovereignty Check**:
- [ ] Cada tier pode escalar sem meu tempo proporcional
- [ ] Nenhum tier cria dependencia no cliente
- [ ] Revenue pode crescer 10x sem horas crescerem 10x

### Step 4 — Priorizar e Sequenciar (7min)

**Qual tier criar PRIMEIRO?** (normalmente Mid ou Low):
> ____

**Sequencia de criacao**:
1. ____ (primeiro — valida o mercado)
2. ____ (segundo — cria ascensao)
3. ____ (terceiro — monetiza trust)
4. ____ (quarto — premium)
5. ____ (quinto — topo)

**Timeline estimada**:
| Tier | Prazo de criacao | Prazo de lancamento |
|------|-----------------|-------------------|
| 1o | | |
| 2o | | |
| 3o | | |

## Input Required

```yaml
input:
  creator_profile:
    main_expertise: ""
    target_audience: ""
    core_transformation: ""
  current_products:
    - name: ""
      tier: ""
      price: 0
      status: "active|planned|idea"
  business_goals:
    revenue_target: ""
    timeline: ""
    preferred_format: "course|coaching|service|hybrid"
```

## Output Template

```yaml
output:
  product_ecosystem:
    design_date: ""

    core_transformation:
      problem: ""
      from_state: ""
      to_state: ""

    tiers:
      free:
        product: ""
        format: ""
        delivers: ""
        hook_to_next: ""
      low_ticket:
        product: ""
        price: 0
        format: ""
        delivers: ""
        hook_to_next: ""
        conversion_target: ""
      mid_ticket:
        product: ""
        price: 0
        format: ""
        delivers: ""
        hook_to_next: ""
        conversion_target: ""
      high_ticket:
        product: ""
        price: 0
        format: ""
        delivers: ""
        hook_to_next: ""
        conversion_target: ""
      ultra_premium:
        product: ""
        price: 0
        format: ""
        delivers: "everything"
        client_cap: 0
        conversion_target: ""

    transitions:
      free_to_low:
        trigger: ""
        mechanism: ""
        timing: ""
      low_to_mid:
        trigger: ""
        mechanism: ""
        timing: ""
      mid_to_high:
        trigger: ""
        mechanism: ""
        timing: ""
      high_to_ultra:
        trigger: ""
        mechanism: ""
        timing: ""

    implementation_sequence:
      - tier: ""
        priority: 1
        creation_deadline: ""
        launch_deadline: ""

    sovereignty_check:
      scales_without_time: true|false
      no_dependency_created: true|false
      revenue_leverage: true|false
```

## Quality Gate

```yaml
quality_gate: KOE_OFF_006_QG
checklist:
  - [ ] Transformacao central clara (de → para)
  - [ ] Todos 5 tiers desenhados com produto, formato e preco
  - [ ] Cada tier resolve PARTE e aponta para o proximo
  - [ ] Transicoes entre tiers definidas com trigger e mecanismo
  - [ ] Sovereignty check passa (escala sem tempo proporcional)
  - [ ] Nenhum tier cria dependencia no cliente
  - [ ] Sequencia de criacao priorizada com timeline
  - [ ] Value-to-price ratio minimo 10x em cada tier
  - [ ] Ultra Premium tem cap de clientes definido
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_OFF_001  # Create Irresistible Offer para detalhar oferta do tier prioritario
    - KOE_OFF_003  # Risk Reversal Strategy para cada tier
    - KOE_BRD_006  # Audience Flywheel para alinhar audiencia ao ecossistema
  artifacts:
    - product_ecosystem.yaml
  notes: "Ecossistema desenhado. Criar primeiro produto do tier prioritario IMEDIATAMENTE."
```
