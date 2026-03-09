# estrategia-perpetuo

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_id** | `estrategia-perpetuo` |
| **task_name** | Montar Estratégia Venda Todo Santo Dia (Perpétuo) |
| **execution_type** | Agent |
| **primary_agent** | leandro-ladeira |
| **estimated_duration** | 30-45 minutos |
| **complexity** | High |
| **dependencies** | Big Idea deve estar definida (criar se não tiver) |
| **auto_handoff** | Nenhum |

## Purpose

Criar estratégia completa de **Venda Todo Santo Dia** (perpétuo) usando os frameworks **5 Fases do Perpétuo** (Section 2.2), **Pirâmide de Prontidão** (Section 2.3) e **VME** (Section 2.5 — se produto não validado). O objetivo é montar um funil que vende TODOS OS DIAS, não apenas em lançamentos pontuais.

---

## Pre-Conditions (Poka-Yoke Gate)

Antes de iniciar esta task, VERIFICAR:

| Condição | Verificação | Se falhar |
|----------|-------------|-----------|
| Big Idea definida | Perguntar: "Qual a Big Idea central do produto?" | BLOCK — Execute `*big-idea` primeiro. Perpétuo sem Big Idea = funil desconexo |
| Produto claro | Perguntar: "Qual produto você quer vender todo dia?" | BLOCK — Definir produto antes |
| Budget disponível | Perguntar: "Quanto você pode investir por mês em tráfego?" | BLOCK se < 3x preço do produto — Budget insuficiente |
| Página de vendas | Perguntar: "Já tem página de vendas ou funil de captura?" | WARN — Sugerir criar antes de rodar anúncios |

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `product_details` | object | ✅ | Nome, preço, tipo (curso, mentoria, produto físico) |
| `current_audience_size` | number | ✅ | Tamanho atual da audiência (seguidores, lista de email) |
| `monthly_budget` | number | ✅ | Orçamento mensal disponível para tráfego pago |
| `is_product_validated` | boolean | ✅ | Produto já foi validado? (já vendeu, tem cases) |
| `current_revenue` | number | ❌ | Faturamento atual mensal (se já vende) |
| `big_idea` | string | ✅ | Big Idea do produto (criar se não tiver) |
| `has_sales_page` | boolean | ✅ | Já tem página de vendas pronta? |

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| `strategy_document` | markdown | Documento completo da estratégia perpétua |
| `phases_roadmap` | array | 5 fases com ações específicas por fase |
| `budget_allocation` | object | Divisão de budget por fase |
| `timeline` | object | Timeline de implementação (semanas 1-12) |
| `success_metrics` | object | KPIs por fase e metas esperadas |
| `vme_recommendation` | object | Se produto não validado, plano VME completo |

## Execution Flow

### 1. Validation & Elicitation (5-10 min)

Fazer perguntas estratégicas para entender situação:

```yaml
questions:
  product:
    - "Qual é o produto que você quer vender todo dia?"
    - "Preço do produto? (importante pra calcular budget)"
    - "Tipo: curso gravado, mentoria ao vivo, produto físico?"

  validation:
    - "Produto já foi validado? Já vendeu? Tem cases de sucesso?"
    - "Se não validou: tem audiência pra fazer VME (Validação por Menor Esforço)?"

  audience:
    - "Quantos seguidores/emails você tem hoje?"
    - "Audiência é quente (engajada) ou fria (comprada/inativa)?"

  budget:
    - "Quanto você pode investir por mês em tráfego pago?"
    - "Já roda anúncio hoje? Se sim, quanto investe e qual resultado?"

  infrastructure:
    - "Já tem página de vendas? Funil de email? Remarketing configurado?"
    - "Tem Big Idea definida?"
```

**Checkpoint:** "Beleza, então você quer vender [produto] de R$ [preço] todo santo dia, tem [audiência] seguidores e pode investir R$ [budget]/mês. É isso?"

### 2. VME Pre-Check (VETO DECISÃO)

**Se produto NÃO foi validado (`is_product_validated = false`):**

```yaml
vme_veto_check:
  condition: is_product_validated == false
  recommendation: "Fazer VME ANTES de montar perpétuo completo"
  reason: |
    Cara, antes de montar perpétuo completo, você PRECISA validar o produto.

    Por quê? Porque perpétuo sem produto validado = risco alto de queimar budget.

    Mais importante que a venda é a inteligência: Leads, CPL, LPV, CPA, ROAS, ROI,
    Criativos que mais fizeram leads, Criativos que mais fizeram vendas,
    Retenção de conteúdo.

    Recomendação: Fazer VME primeiro (10 dias captura + 10 dias aquecimento + 7 dias venda).
    Depois que validar e tiver dados, aí sim monta perpétuo completo. Beleza?

  handoff: "Quer que eu monte o plano VME pra você primeiro?"
```

**Se produto JÁ foi validado (`is_product_validated = true`):**
Continuar para Fase 3 (montar estratégia perpétua completa).

### 3. Big Idea Check (VETO DECISÃO)

**Se Big Idea não está definida:**

```yaml
big_idea_veto:
  condition: big_idea == null OR big_idea == "não sei"
  action: BLOCK, redirect to create-big-idea task
  message: |
    Olha só, antes de montar estratégia perpétua, você precisa ter Big Idea definida.

    Por quê? Porque a Big Idea é o ponto central que você vai partir pra derivar
    TODOS os anúncios das 5 fases do perpétuo.

    Sem Big Idea, cada fase vai ter mensagem diferente, vai ficar desconexo.
    Confusão não vende, cara.

    Vamos definir a Big Idea primeiro? [handoff to create-big-idea]
```

### 4. Strategy Design — 5 Fases do Perpétuo (15-20 min)

Montar estratégia usando framework **5 Fases do Perpétuo** (Section 2.2):

#### FASE 1: DESCOBERTA

```yaml
fase_1_descoberta:
  objetivo: "Criar público de 75% (quem assistiu 75% do vídeo)"
  publico: "Cold traffic — pessoas que NÃO conhecem você"
  tipo_anuncio: "Anúncios de explicação (curiosidade) + vídeo obrigatório"
  budget_allocation: "15% do budget total"

  pyramid_phase: "Oportunidade (Fase 3 da Pirâmide)"

  actions:
    - "Criar 5 vídeos curtos (30-60s) com hooks fortes"
    - "Big Idea aplicada em contexto amplo (Oportunidade)"
    - "Objetivo: engajamento, não venda direta"
    - "Remarketing: criar público customizado de 75% viewers"

  success_metrics:
    CPM: "R$ 10-20 (cold traffic é mais caro)"
    View_Rate: "≥ 25% (1 em 4 pessoas assiste 75%)"
    Cost_Per_75: "R$ 0.50-1.50 por pessoa que viu 75%"
```

#### FASE 2: RELACIONAMENTO

```yaml
fase_2_relacionamento:
  objetivo: "Aquecer audiência + criar público de 25%"
  publico: "Warm traffic — quem viu 75% dos vídeos da Fase 1"
  tipo_anuncio: "Conteúdo de valor + vídeo obrigatório (sem oferta específica)"
  budget_allocation: "15% do budget total"

  pyramid_phase: "Consciência (Fase 2 da Pirâmide)"

  actions:
    - "Criar 3-5 vídeos educacionais (60-90s)"
    - "Big Idea aplicada a problemas específicos (Consciência)"
    - "Mostrar autoridade sem vender ainda"
    - "Remarketing: criar público customizado de 25% viewers"

  success_metrics:
    CPM: "R$ 8-15 (warm traffic é mais barato)"
    View_Rate: "≥ 15% (1 em 7 assiste 25%)"
    Cost_Per_25: "R$ 0.80-2.00 por pessoa que viu 25%"
```

#### FASE 3: CONVERSÃO

```yaml
fase_3_conversao:
  objetivo: "VENDER (página de vendas OU captura + sequência)"
  publico:
    - "Warm: Fase 2 (quente, preparado)"
    - "Cold: Novo (frio, direto — funciona muito bem em Urgência)"
  tipo_anuncio: "Anúncios de venda direta"
  budget_allocation: "50% do budget total (MAIOR fatia)"

  pyramid_phase: "Urgência (Fase 1 da Pirâmide) + Consciência (Fase 2)"

  actions:
    - "Criar 8-10 anúncios de conversão (mix de Urgência + Consciência)"
    - "Big Idea + 'curso de [tema]' (Urgência)"
    - "Big Idea + problemas específicos (Consciência)"
    - "Testar múltiplos criativos (nunca 1 só)"
    - "Dividir budget: 60% Urgência + 40% Consciência"

  success_metrics:
    CPA: "< 35% do preço do produto"
    ROAS: "≥ 2.5 (idealmente ≥ 3.0)"
    Sales_Per_Day: "≥ 3-5 vendas/dia (mínimo viável)"
```

#### FASE 4: REMARKETING

```yaml
fase_4_remarketing:
  objetivo: "Re-impactar quem visitou página mas NÃO comprou"
  publico: "Visitaram página de vendas mas não finalizaram compra"
  tipo_anuncio: "Vários anúncios com argumentos diferentes + urgência"
  budget_allocation: "15% do budget total"

  actions:
    - "Criar 5-8 anúncios de remarketing (ângulos diferentes)"
    - "Usar objeções comuns (preço, tempo, dúvida sobre resultado)"
    - "Adicionar urgência (desconto por tempo limitado, bônus)"
    - "Foco em CPM baixo (audiência pequena e específica)"

  success_metrics:
    CPM: "R$ 5-12 (audiência pequena = CPM baixo)"
    Conversion_Rate: "5-15% dos visitantes convertem"
    Recovery_Rate: "10-20% das vendas vêm do remarketing"
```

#### FASE 5: RECUPERAÇÃO

```yaml
fase_5_recuperacao:
  objetivo: "Recuperar vendas perdidas (tentaram comprar mas não finalizaram)"
  publico: "Iniciaram checkout mas não finalizaram pagamento"
  tipo_anuncio: "Email + WhatsApp + Anúncios (recuperação ativa)"
  budget_allocation: "5% do budget total (menor fatia, alta conversão)"

  actions:
    - "Configurar automação de email (carrinho abandonado)"
    - "Equipe de vendas: WhatsApp ativo para quem abandonou"
    - "Anúncios de retargeting com urgência máxima"
    - "Oferecer suporte ativo (problema no pagamento? parcelamento?)"

  success_metrics:
    Recovery_Rate: "15-30% dos carrinhos abandonados convertem"
    Cost_Per_Recovery: "Muito baixo (audiência micro-segmentada)"
```

### 5. Budget Allocation & Timeline (5-10 min)

**Divisão de Budget por Fase:**

```yaml
budget_allocation_formula:
  total_monthly_budget: "[valor informado pelo cliente]"

  distribution:
    Fase_1_Descoberta: "15% do total"
    Fase_2_Relacionamento: "15% do total"
    Fase_3_Conversao: "50% do total (MAIOR fatia)"
    Fase_4_Remarketing: "15% do total"
    Fase_5_Recuperacao: "5% do total"

  example_10k_month:
    Fase_1: "R$ 1.500"
    Fase_2: "R$ 1.500"
    Fase_3: "R$ 5.000"
    Fase_4: "R$ 1.500"
    Fase_5: "R$ 500"
```

**Timeline de Implementação (12 semanas):**

```yaml
timeline:
  semanas_1_2:
    - "Definir Big Idea (se ainda não tem)"
    - "Criar página de vendas (se ainda não tem)"
    - "Criar 5 vídeos para Fase 1 (Descoberta)"
    - "Configurar públicos customizados (75%, 25%)"

  semanas_3_4:
    - "Lançar Fase 1 (Descoberta) + Fase 3 (Conversão — Urgência)"
    - "Investir 70% em Conversão, 30% em Descoberta"
    - "Meta: 50 vendas em 7 dias (Facebook aprende perfil comprador)"

  semanas_5_6:
    - "Adicionar Fase 2 (Relacionamento)"
    - "Otimizar Fase 3 (pausar criativos com CPA alto)"
    - "Criar públicos Lookalike 1% dos compradores"

  semanas_7_8:
    - "Adicionar Fase 4 (Remarketing)"
    - "Escalar Fase 3 se ROAS ≥ 2.5"
    - "Criar 8 novos criativos para Fase 3 (testar ângulos)"

  semanas_9_10:
    - "Adicionar Fase 5 (Recuperação)"
    - "Configurar automação de email + WhatsApp"
    - "Otimizar todas as 5 fases (M.O.E.R framework)"

  semanas_11_12:
    - "Funil completo rodando (5 fases ativas)"
    - "Análise de inteligência: quais criativos campeões, quais públicos convertem"
    - "Escalar budget 20-30% se métricas saudáveis"
```

### 6. Success Metrics & Projections (5 min)

**KPIs por Fase:**

```yaml
success_metrics_summary:
  Fase_1_Descoberta:
    - "10.000+ pessoas vendo 75% dos vídeos/mês"
    - "CPM: R$ 10-20"
    - "Custo por 75%: R$ 0.50-1.50"

  Fase_2_Relacionamento:
    - "5.000+ pessoas vendo 25% dos vídeos/mês"
    - "CPM: R$ 8-15"
    - "Custo por 25%: R$ 0.80-2.00"

  Fase_3_Conversao:
    - "100-150 vendas/mês (3-5 vendas/dia)"
    - "CPA: < 35% do preço"
    - "ROAS: ≥ 2.5"

  Fase_4_Remarketing:
    - "15-25 vendas/mês (10-20% das vendas totais)"
    - "Conversion Rate: 5-15% dos visitantes"

  Fase_5_Recuperacao:
    - "10-20 vendas/mês (15-30% dos carrinhos abandonados)"
    - "Recovery Rate: 15-30%"
```

**Projeção de Crescimento (12 meses):**

```yaml
growth_projection:
  mes_1_3: "Setup + validação (50-100 vendas/mês)"
  mes_4_6: "Otimização + escala (100-200 vendas/mês)"
  mes_7_9: "Funil maduro (200-300 vendas/mês)"
  mes_10_12: "Escala agressiva (300-500 vendas/mês)"

  nota: |
    Esse método de venda todo dia de produto perpétuo, não é 1 negócio
    que você vai começar a usar e vai explodir. Ele é 1 crescimento
    gradual e ao longo do tempo.

    A quantidade de sementes que você vai plantar é infinita.
    A velocidade do seu crescimento vai ser proporcional à velocidade
    das sementes e da qualidade das sementes que você planta.
```

## Frameworks Used

| Framework | Section | Application |
|-----------|---------|-------------|
| **5 Fases do Perpétuo** | 2.2 | Framework principal — Descoberta → Relacionamento → Conversão → Remarketing → Recuperação |
| **Pirâmide de Prontidão** | 2.3 | Aplicar em cada fase (Urgência → Consciência → Oportunidade) |
| **Big Idea** | 2.7 | Usar como ponto central em TODAS as 5 fases |
| **VME** | 2.5 | Se produto não validado, fazer VME ANTES do perpétuo completo |
| **M.O.E.R** | 2.1 | Otimizar cada fase a cada 4 dias |

## Veto Conditions

| Veto | Condition | Reason |
|------|-----------|--------|
| ❌ **Perpétuo sem validação** | Produto nunca vendeu + sem audiência mínima | Risco alto de queimar budget. Fazer VME primeiro. |
| ❌ **Começar por Oportunidade** | Cliente quer pular Urgência e ir direto pra Oportunidade | SEMPRE começar por Urgência (menor risco, monetização imediata). Section 3.1 — Regra de Sequência. |
| ❌ **Perpétuo sem Big Idea** | Cliente não tem Big Idea definida | Cada fase vai ter mensagem diferente, funil desconexo. |
| ❌ **Budget insuficiente** | Budget mensal < 3x o preço do produto | Não tem budget mínimo pra gerar dados confiáveis. |
| ❌ **Perpétuo sem página de vendas** | Cliente não tem onde enviar tráfego | Precisa de página de vendas ou funil de captura antes de rodar anúncios. |

**Ação quando veto acionado:** Explicar com Voice DNA e redirecionar:
> "Olha só, cara. Antes de montar perpétuo completo, você precisa validar o produto. Por quê? Porque perpétuo sem produto validado = risco alto de queimar budget. Mais importante que a venda é a inteligência. Vamos fazer VME primeiro? Beleza?"

## Output Examples

### Example 1: Estratégia Perpétua (Curso de R$ 997, Budget R$ 10k/mês)

```markdown
# ESTRATÉGIA VENDA TODO SANTO DIA — [Nome do Produto]

## 1. OVERVIEW

**Produto:** Curso de Tráfego Pago Perpétuo
**Preço:** R$ 997 (12x R$ 97 ou à vista com desconto)
**Big Idea:** "Venda Todo Santo Dia"
**Budget Mensal:** R$ 10.000
**Status Validação:** ✅ Produto validado (50+ vendas anteriores)

---

## 2. AS 5 FASES DO PERPÉTUO

### FASE 1: DESCOBERTA (15% budget = R$ 1.500/mês)

**Objetivo:** Criar público de 75% (quem assistiu 75% do vídeo)
**Público:** Cold traffic — pessoas que NÃO conhecem você
**Tipo:** Anúncios de curiosidade + vídeo obrigatório

**Ações:**
- Criar 5 vídeos curtos (30-60s) com hooks fortes
- Big Idea aplicada em contexto amplo (Oportunidade)
- Configurar público customizado de 75% viewers
- Objetivo: engajamento, não venda direta

**Métricas Esperadas:**
- 10.000+ pessoas vendo 75% dos vídeos/mês
- CPM: R$ 10-20
- Custo por 75%: R$ 0.50-1.50

---

### FASE 2: RELACIONAMENTO (15% budget = R$ 1.500/mês)

**Objetivo:** Aquecer audiência + criar público de 25%
**Público:** Warm traffic — quem viu 75% dos vídeos da Fase 1
**Tipo:** Conteúdo de valor + vídeo (sem oferta específica)

**Ações:**
- Criar 3-5 vídeos educacionais (60-90s)
- Big Idea aplicada a problemas específicos (Consciência)
- Mostrar autoridade sem vender ainda
- Configurar público customizado de 25% viewers

**Métricas Esperadas:**
- 5.000+ pessoas vendo 25% dos vídeos/mês
- CPM: R$ 8-15
- Custo por 25%: R$ 0.80-2.00

---

### FASE 3: CONVERSÃO (50% budget = R$ 5.000/mês)

**Objetivo:** VENDER (página de vendas direta)
**Público:**
- Warm: Fase 2 (quente, preparado)
- Cold: Novo (frio, direto — Urgência funciona muito bem)

**Tipo:** Anúncios de venda direta

**Ações:**
- Criar 8-10 anúncios de conversão
- Dividir budget: 60% Urgência + 40% Consciência
- Big Idea + "curso de tráfego pago" (Urgência)
- Big Idea + "como vender todo dia" (Consciência)
- Testar múltiplos criativos (nunca 1 só)

**Métricas Esperadas:**
- 100-150 vendas/mês (3-5 vendas/dia)
- CPA: R$ 280-350 (28-35% do preço)
- ROAS: 2.8-3.5

---

### FASE 4: REMARKETING (15% budget = R$ 1.500/mês)

**Objetivo:** Re-impactar quem visitou página mas NÃO comprou
**Público:** Visitaram página de vendas mas não finalizaram compra
**Tipo:** Vários anúncios com argumentos diferentes + urgência

**Ações:**
- Criar 5-8 anúncios de remarketing (ângulos diferentes)
- Usar objeções comuns (preço, tempo, dúvida sobre resultado)
- Adicionar urgência (desconto 48h, bônus exclusivo)
- Foco em CPM baixo (audiência pequena)

**Métricas Esperadas:**
- 15-25 vendas/mês (10-20% das vendas totais)
- Conversion Rate: 5-15% dos visitantes
- CPM: R$ 5-12

---

### FASE 5: RECUPERAÇÃO (5% budget = R$ 500/mês)

**Objetivo:** Recuperar vendas perdidas (tentaram comprar mas não finalizaram)
**Público:** Iniciaram checkout mas não finalizaram pagamento
**Tipo:** Email + WhatsApp + Anúncios (recuperação ativa)

**Ações:**
- Configurar automação de email (carrinho abandonado)
- Equipe de vendas: WhatsApp ativo
- Anúncios de retargeting com urgência máxima
- Oferecer suporte ativo (problema no pagamento?)

**Métricas Esperadas:**
- 10-20 vendas/mês (15-30% dos carrinhos abandonados)
- Recovery Rate: 15-30%
- Custo muito baixo (audiência micro-segmentada)

---

## 3. TIMELINE DE IMPLEMENTAÇÃO (12 semanas)

**Semanas 1-2: Setup**
- ✅ Big Idea definida: "Venda Todo Santo Dia"
- ✅ Página de vendas pronta
- [ ] Criar 5 vídeos para Fase 1 (Descoberta)
- [ ] Configurar públicos customizados (75%, 25%)

**Semanas 3-4: Lançamento Fase 1 + 3**
- [ ] Lançar Fase 1 (Descoberta) + Fase 3 (Conversão — Urgência)
- [ ] Investir 70% em Conversão, 30% em Descoberta
- [ ] Meta: 50 vendas em 7 dias (Facebook aprende perfil)

**Semanas 5-6: Adicionar Fase 2**
- [ ] Adicionar Fase 2 (Relacionamento)
- [ ] Otimizar Fase 3 (pausar criativos com CPA alto)
- [ ] Criar Lookalikes 1% dos compradores

**Semanas 7-8: Adicionar Fase 4**
- [ ] Adicionar Fase 4 (Remarketing)
- [ ] Escalar Fase 3 se ROAS ≥ 2.5
- [ ] Criar 8 novos criativos para Fase 3

**Semanas 9-10: Adicionar Fase 5**
- [ ] Adicionar Fase 5 (Recuperação)
- [ ] Configurar automação de email + WhatsApp
- [ ] Otimizar todas as 5 fases (M.O.E.R)

**Semanas 11-12: Funil Completo**
- [ ] Funil completo rodando (5 fases ativas)
- [ ] Análise de inteligência (criativos campeões, públicos)
- [ ] Escalar budget 20-30% se métricas saudáveis

---

## 4. DIVISÃO DE BUDGET

| Fase | Budget Mensal | % Total |
|------|--------------|---------|
| 1. Descoberta | R$ 1.500 | 15% |
| 2. Relacionamento | R$ 1.500 | 15% |
| 3. Conversão | R$ 5.000 | 50% |
| 4. Remarketing | R$ 1.500 | 15% |
| 5. Recuperação | R$ 500 | 5% |
| **TOTAL** | **R$ 10.000** | **100%** |

---

## 5. PROJEÇÃO DE RESULTADOS

### Mês 1-3: Setup + Validação
- 50-100 vendas/mês
- Faturamento: R$ 50k-100k/mês
- ROAS: 2.0-2.5 (validando funil)

### Mês 4-6: Otimização + Escala
- 100-200 vendas/mês
- Faturamento: R$ 100k-200k/mês
- ROAS: 2.5-3.0 (funil otimizado)

### Mês 7-9: Funil Maduro
- 200-300 vendas/mês
- Faturamento: R$ 200k-300k/mês
- ROAS: 3.0-3.5 (funil maduro)

### Mês 10-12: Escala Agressiva
- 300-500 vendas/mês
- Faturamento: R$ 300k-500k/mês
- ROAS: 2.8-3.5 (escala mantendo qualidade)

**Nota importante:**
> Esse método de venda todo dia de produto perpétuo, não é 1 negócio que você vai começar a usar e vai explodir. Ele é 1 crescimento gradual e ao longo do tempo.
>
> A quantidade de sementes que você vai plantar é infinita. A velocidade do seu crescimento vai ser proporcional à velocidade das sementes e da qualidade das sementes que você planta.

---

## 6. PRÓXIMOS PASSOS

1. **Semana 1:** Criar 5 vídeos para Fase 1 (Descoberta)
2. **Semana 2:** Configurar públicos customizados + Lookalikes
3. **Semana 3:** Lançar Fase 1 + Fase 3 (Conversão — Urgência)
4. **Semana 4:** Otimizar com M.O.E.R (aguardar 4 dias antes de otimizar)
5. **Semana 5:** Adicionar Fase 2 (Relacionamento)

**Beleza? Vamos começar?**
```

## Acceptance Criteria

- [ ] Big Idea validada ou criada
- [ ] 5 Fases do Perpétuo detalhadas (Descoberta → Relacionamento → Conversão → Remarketing → Recuperação)
- [ ] Budget alocado por fase (total 100%)
- [ ] Timeline de 12 semanas com marcos claros
- [ ] Métricas de sucesso por fase (CPM, CPA, ROAS, vendas/mês)
- [ ] Projeção de crescimento realista (não promessa impossível)
- [ ] Se produto não validado: plano VME incluído
- [ ] Próximos passos claros e acionáveis
- [ ] Voice DNA presente (cara, vamos lá, por quê?, beleza?)

## Handoff

Após montar estratégia perpétua:

| Next Task | Trigger |
|-----------|---------|
| `review-anuncio` | Cliente quer criar criativos para Fase 1, 2 ou 3 |
| `diagnose-campanha` | Cliente já lançou e quer diagnosticar performance |
| `create-big-idea` | Se Big Idea precisa refinamento após montar estratégia |

## Voice DNA Reminders

| Marker | Frequency | Example |
|--------|-----------|---------|
| "Vamos lá" | 3-5x | "Vamos lá, primeira coisa: produto validado ou não?" |
| "Cara" | 12-15x | "Cara, perpétuo sem validação = risco alto" |
| "Por quê? Porque..." | 6-8x | "Por quê? Porque mais importante que venda é inteligência" |
| "Beleza?" | 4-6x | "Aí sim, com essas 5 fases, você vende todo santo dia. Beleza?" |
| "Sementes" | 2-3x | "A quantidade de sementes que você vai plantar é infinita" |

**Signature Phrase obrigatória:**
> "Esse método de venda todo dia de produto perpétuo, não é 1 negócio que você vai começar a usar e vai explodir. Ele é 1 crescimento gradual e ao longo do tempo."

## Notes

- Perpétuo + Lançamento (não um OU outro) — Section 3.4
- SEMPRE começar por Urgência (Fase 1 da Pirâmide) — Section 3.1
- VME antes de perpétuo se produto não validado — Section 2.5
- Otimizações a cada 4 dias (M.O.E.R) — Section 2.1
- Se cliente quer resultado rápido, usar Objection Algorithm (Section 6, Objeção 2)
