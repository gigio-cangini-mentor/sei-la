# diagnose-campanha

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_id** | `diagnose-campanha` |
| **task_name** | Diagnosticar Campanha Ativa com M.O.E.R |
| **execution_type** | Agent |
| **primary_agent** | leandro-ladeira |
| **estimated_duration** | 15-25 minutos |
| **complexity** | Medium |
| **dependencies** | Campanha deve estar rodando há pelo menos 4 dias |
| **auto_handoff** | Nenhum |

## Purpose

Diagnosticar campanha de tráfego pago ativa usando o framework **M.O.E.R** (Metrificar, Otimizar, Escalar, Resultados — Section 2.1). Identificar se a campanha está saudável, precisa de otimização ou deve ser escalada. Bloquear otimizações prematuras (antes de 4 dias) para evitar decisões baseadas em emoção ao invés de dados.

---

## Pre-Conditions (Poka-Yoke Gate)

Antes de iniciar esta task, VERIFICAR:

| Condição | Verificação | Se falhar |
|----------|-------------|-----------|
| Campanha ativa | Perguntar: "A campanha está rodando agora?" | BLOCK — Campanha precisa estar ativa |
| Mínimo 4 dias de dados | Perguntar: "Há quantos dias a campanha está rodando?" | BLOCK se < 4 dias — Aguardar dados suficientes |
| Métricas disponíveis | Confirmar: "Você tem acesso às métricas (CPM, CPC, CTR, CPA, ROAS)?" | BLOCK — Sem dados, impossível diagnosticar |

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `campaign_metrics` | object | ✅ | CPM, CPC, CTR, CPL, CPA, ROAS (ou ROI) |
| `campaign_age_days` | number | ✅ | Quantos dias a campanha está rodando |
| `total_budget_spent` | number | ✅ | Total gasto até agora (R$) |
| `creatives_count` | number | ✅ | Quantos criativos/anúncios diferentes |
| `sales_count` | number | ✅ | Número de vendas geradas |
| `leads_count` | number | ❌ | Número de leads (se aplicável) |
| `product_price` | number | ✅ | Preço do produto sendo vendido |

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| `diagnostic_report` | markdown | Relatório completo M.O.E.R com análise de cada componente |
| `health_status` | enum | HEALTHY / NEEDS_OPTIMIZATION / READY_TO_SCALE / UNHEALTHY |
| `optimization_plan` | array | Lista de ações específicas para otimizar (se aplicável) |
| `scale_criteria` | object | Critérios que devem ser atingidos antes de escalar |
| `expected_results` | string | Projeção de resultados após otimização/escala |

## Execution Flow

### 1. Timing Veto Check (CRÍTICO)

**ANTES DE TUDO, verificar:**

```yaml
veto_check:
  condition: campaign_age_days < 4
  action: BLOCK diagnostic, explain timing rule
  message: |
    Calma, cara. Ainda não.

    Normalmente eu faço as minhas otimizações de 4 em 4 dias,
    justamente pra que a minha alteração ela surta efeito,
    e só depois eu faça 1 próxima alteração.

    Por quê? Porque eu preciso de dados pra tomar 1 decisão mais assertiva.
    Sua campanha tem [X] dias. Aguarda mais [4-X] dias, aí a gente avalia.

    Faz sentido?
```

**Se campanha < 4 dias:** PARAR execução e orientar esperar.

### 2. M - Metrificar (Collect & Analyze Metrics)

Coletar e analisar as métricas essenciais:

```yaml
essential_metrics:
  CPM: "Custo por Mil Impressões (quanto paga pra mostrar o anúncio)"
  CPC: "Custo por Clique (quanto paga por clique no anúncio)"
  CTR: "Click-Through Rate (% de quem viu e clicou)"
  CPL: "Custo por Lead (quanto paga por lead/cadastro)" # se aplicável
  CPA: "Custo por Aquisição (quanto paga por venda)"
  ROAS: "Return on Ad Spend (faturamento / investimento)"
  ROI: "Return on Investment ((faturamento - custo) / custo)"
```

**Calcular métricas derivadas:**
```yaml
calculations:
  CPA: total_budget_spent / sales_count
  ROAS: (sales_count * product_price) / total_budget_spent
  ROI: ((sales_count * product_price) - total_budget_spent) / total_budget_spent
```

**Benchmarks de referência:**

| Métrica | Saudável | Atenção | Crítico |
|---------|----------|---------|---------|
| **CTR** | ≥ 2% | 1-2% | < 1% |
| **CPA** | < 30% do preço | 30-50% do preço | > 50% do preço |
| **ROAS** | ≥ 3.0 | 2.0-3.0 | < 2.0 |
| **ROI** | ≥ 200% | 100-200% | < 100% |

### 3. O - Otimizar (Optimization Plan)

Com base nas métricas, definir plano de otimização:

**Se CTR baixo (< 1.5%):**
```yaml
optimization:
  - "Criar novos criativos com hooks mais fortes"
  - "Testar Big Idea diferente (se ainda não tem Big Idea clara)"
  - "Revisar copy — eliminar imperativos (Framework 2.10)"
  - "Testar formatos diferentes (vídeo vs imagem vs carrossel)"
```

**Se CPA alto (> 40% do preço do produto):**
```yaml
optimization:
  - "Revisar público — pode estar muito amplo"
  - "Testar Fase 1 da Pirâmide (Urgência) se está em Consciência/Oportunidade"
  - "Analisar página de vendas — conversão pode estar baixa"
  - "Criar sequência de remarketing para fechar vendas (Fase 4 do Perpétuo)"
```

**Se ROAS baixo (< 2.0):**
```yaml
optimization:
  - "Pausar criativos com CPA acima da média"
  - "Escalar apenas os criativos campeões (menor CPA)"
  - "Criar público Lookalike dos compradores (Facebook aprendeu quem converte)"
  - "Testar VME (Validação por Menor Esforço) se produto novo — Section 2.5"
```

### 4. E - Escalar (Scale Criteria)

Definir critérios para escalar campanha:

**NUNCA escalar antes de:**
```yaml
scale_requirements:
  - "Mínimo 4 dias de dados estáveis"
  - "ROAS consistente ≥ 2.5 (idealmente ≥ 3.0)"
  - "CPA estável abaixo de 35% do preço do produto"
  - "Pelo menos 1 criativo campeão identificado (menor CPA)"
  - "Mínimo 20-50 vendas (Facebook aprendeu o perfil comprador)"
```

**Como escalar (quando critérios atingidos):**
```yaml
scale_strategy:
  budget_increase: "Aumentar orçamento 20-30% a cada 4 dias (não dobrar de uma vez)"
  creative_expansion: "Criar variações do criativo campeão (mesma estrutura, ângulos diferentes)"
  audience_expansion: "Criar Lookalikes 1%, 2%, 3% dos compradores"
  funnel_expansion: "Adicionar Fase 2 (Relacionamento) e Fase 4 (Remarketing) — Section 2.2"
```

### 5. R - Resultados (Projected Results)

Projetar resultados esperados após otimização/escala:

```yaml
result_projection:
  optimization_expected:
    - "CPA reduzir 15-25% em 7 dias"
    - "ROAS aumentar 0.5-1.0 pontos em 7 dias"
    - "CTR aumentar 0.5-1.0% em 7 dias"

  scale_expected:
    - "Faturamento aumentar 30-50% mantendo ROAS estável"
    - "Volume de vendas crescer proporcional ao aumento de budget"
    - "CPA manter-se estável ou aumentar no máximo 10%"
```

## Frameworks Used

| Framework | Section | Application |
|-----------|---------|-------------|
| **M.O.E.R** | 2.1 | Framework principal — Metrificar, Otimizar, Escalar, Resultados |
| **Pirâmide de Prontidão** | 2.3 | Identificar em qual fase está e recomendar ajustes |
| **5 Fases do Perpétuo** | 2.2 | Expandir funil se estiver apenas em Conversão |
| **VME** | 2.5 | Recomendar se produto novo sem validação |

## Veto Conditions

| Veto | Condition | Reason |
|------|-----------|--------|
| ❌ **Otimizar antes de 4 dias** | `campaign_age_days < 4` | Não tem dados suficientes. Decisão seria baseada em emoção, não em dados. Pode matar campanha que estava funcionando. |
| ❌ **Escalar sem ROAS positivo** | `ROAS < 2.0` | Vai multiplicar prejuízo ao invés de lucro. Precisa otimizar primeiro. |
| ❌ **Escalar sem criativo campeão** | Todos os criativos com CPA similar (nenhum se destaca) | Não tem criativo validado para escalar. Vai desperdiçar budget. |
| ❌ **Escalar sem volume mínimo** | `sales_count < 20` | Facebook ainda não aprendeu quem é o público comprador. Escalar agora = risco alto. |

**Ação quando veto acionado:** Explicar com Voice DNA (Section 1.2):
> "Calma, cara. Ainda não. Normalmente eu faço as minhas otimizações de 4 em 4 dias, justamente pra que a minha alteração ela surta efeito, e só depois eu faça 1 próxima alteração. Então eu preciso de dados pra tomar 1 decisão mais assertiva. Beleza?"

## Output Examples

### Example 1: Campanha Saudável (Ready to Scale)

```yaml
campaign_age_days: 7
total_budget_spent: 5000
sales_count: 35
product_price: 497
creatives_count: 5

metrics:
  CPA: 142.86
  ROAS: 3.48
  ROI: 248%
  CTR: 2.3%

diagnostic_report: |
  ## DIAGNÓSTICO M.O.E.R — Campanha SAUDÁVEL

  Vamos lá, cara. Sua campanha tá 7 dias rodando, vamos analisar.

  ### M - METRIFICAR
  - CPA: R$ 142,86 (28% do preço — EXCELENTE)
  - ROAS: 3.48 (cada R$ 1 virou R$ 3,48 — MUITO BOM)
  - ROI: 248% (mais que dobrou o investimento)
  - CTR: 2.3% (acima da média — criativo está pegando)
  - Total gasto: R$ 5.000 → Faturamento: R$ 17.395

  ### O - OTIMIZAR
  Campanha tá saudável, mas sempre dá pra melhorar:
  - Pausar os 2 criativos com CPA acima de R$ 200
  - Escalar os 3 criativos campeões (CPA entre R$ 120-150)
  - Criar 3 variações do criativo #1 (menor CPA)

  ### E - ESCALAR
  PRONTO PRA ESCALAR! Por quê? Porque:
  ✅ 7 dias de dados (acima de 4 dias)
  ✅ ROAS consistente acima de 3.0
  ✅ CPA estável (28% do preço)
  ✅ 35 vendas (Facebook já aprendeu quem converte)

  Plano de escala:
  1. Aumentar budget em 30% (R$ 5.000 → R$ 6.500/dia)
  2. Adicionar Fase 2 (Relacionamento) para aquecer público
  3. Adicionar Fase 4 (Remarketing) para recuperar quem visitou mas não comprou
  4. Criar Lookalike 1% dos 35 compradores

  ### R - RESULTADOS ESPERADOS
  Em 7 dias com escala:
  - Faturamento: R$ 17k → R$ 25-30k (+50-70%)
  - Vendas: 35 → 50-60
  - ROAS mantendo entre 3.0-3.5

  Beleza? Vamos escalar?

health_status: READY_TO_SCALE

optimization_plan:
  - "Pausar criativos #4 e #5 (CPA acima de R$ 200)"
  - "Criar 3 variações do criativo #1 (hooks diferentes, mesma estrutura)"
  - "Testar copy sem imperativos (Framework Elimine o Imperativo)"

scale_criteria:
  status: "TODOS OS CRITÉRIOS ATINGIDOS"
  next_step: "Aumentar budget 30% + expandir para Fases 2 e 4 do Perpétuo"

expected_results: |
  Projeção conservadora: R$ 25-30k de faturamento em 7 dias
  Projeção otimista: R$ 30-35k se Remarketing performar bem
  ROAS esperado: 3.0-3.5 (pode cair levemente com escala, normal)
```

### Example 2: Campanha Precisa Otimização

```yaml
campaign_age_days: 5
total_budget_spent: 3000
sales_count: 8
product_price: 997
creatives_count: 3

metrics:
  CPA: 375
  ROAS: 2.12
  ROI: 112%
  CTR: 1.1%

diagnostic_report: |
  ## DIAGNÓSTICO M.O.E.R — Campanha PRECISA OTIMIZAÇÃO

  Vamos lá. Sua campanha tá 5 dias rodando, vamos ver o que tá rolando.

  ### M - METRIFICAR
  - CPA: R$ 375 (37% do preço — ALTO demais)
  - ROAS: 2.12 (ainda positivo, mas abaixo do ideal)
  - ROI: 112% (tá lucrando, mas pouco)
  - CTR: 1.1% (BAIXO — criativo não tá pegando)
  - Total gasto: R$ 3.000 → Faturamento: R$ 7.976

  Olha, tá lucrando, mas tá longe do ideal. CPA de R$ 375 é muito alto, cara.

  ### O - OTIMIZAR
  Precisa otimizar ANTES de escalar. Por quê? Porque se escalar agora,
  vai multiplicar o problema. Vamos atacar 3 pontos:

  **1. CRIATIVOS (CTR baixo)**
  - CTR de 1.1% = criativo não tá chamando atenção
  - Criar 5 novos criativos com hooks mais fortes
  - Testar Big Idea diferente (se ainda não tem clara)
  - Usar Stories 10x: pegar stories que performaram bem e virar anúncio

  **2. PÚBLICO (CPA alto)**
  - Tá em qual fase? Consciência ou Oportunidade?
  - Se sim, VOLTAR pra Urgência (Fase 1 da Pirâmide)
  - Pessoas prontas pra comprar = CPA menor
  - Só expande pra Consciência depois de dominar Urgência

  **3. OFERTA (conversão baixa)**
  - 8 vendas em 5 dias = 1.6 vendas/dia (baixo)
  - Revisar página de vendas (pode ter vazamento)
  - Testar VME se produto é novo e ainda não validou

  ### E - ESCALAR
  NÃO ESCALAR AINDA. Por quê? Porque:
  ❌ CPA muito alto (37% do preço)
  ❌ CTR baixo (criativos precisam melhorar)
  ⚠️ ROAS positivo mas instável

  Critérios pra escalar:
  - CPA cair pra < R$ 300 (30% do preço)
  - CTR subir pra ≥ 1.8%
  - ROAS estabilizar em ≥ 2.5
  - Ter pelo menos 1 criativo campeão (CPA < R$ 250)

  ### R - RESULTADOS ESPERADOS
  Após otimização (7 dias):
  - CPA: R$ 375 → R$ 280-320 (-20-25%)
  - ROAS: 2.12 → 2.5-3.0 (+20-40%)
  - CTR: 1.1% → 1.8-2.2% (+60-100%)
  - Vendas/dia: 1.6 → 3-4 vendas/dia

  Aí sim, com essas métricas, a gente escala. Beleza?

health_status: NEEDS_OPTIMIZATION

optimization_plan:
  - "Criar 5 novos criativos com hooks fortes (usar Stories 10x)"
  - "Voltar pra Fase 1 da Pirâmide (Urgência) se estiver em Consciência/Oportunidade"
  - "Revisar página de vendas (testar headlines, CTAs)"
  - "Pausar criativo #3 (pior CTR e maior CPA)"
  - "Testar público Lookalike 1% se já tem 8+ compradores"

scale_criteria:
  status: "NÃO ATINGIDO — Otimizar primeiro"
  requirements:
    - "CPA < R$ 300"
    - "CTR ≥ 1.8%"
    - "ROAS ≥ 2.5"
    - "Ter 1 criativo campeão com CPA < R$ 250"

expected_results: |
  Após otimização (7 dias):
  - CPA reduzir 20-25% (R$ 280-320)
  - ROAS aumentar para 2.5-3.0
  - Vendas/dia dobrar (1.6 → 3-4)

  AÍ SIM a gente escala com segurança.
```

## Acceptance Criteria

- [ ] Timing veto verificado (campanha tem ≥ 4 dias)
- [ ] Todas as métricas essenciais (CPM, CPC, CTR, CPL, CPA, ROAS) foram analisadas
- [ ] Health status definido (HEALTHY / NEEDS_OPTIMIZATION / READY_TO_SCALE / UNHEALTHY)
- [ ] Plano de otimização específico (não genérico tipo "melhorar criativos")
- [ ] Critérios de escala claramente definidos com números
- [ ] Projeção de resultados realista (não promessa impossível)
- [ ] Relatório usa Voice DNA (cara, vamos lá, por quê?, beleza?)

## Handoff

Após diagnóstico, próximos passos:

| Next Task | Trigger |
|-----------|---------|
| `review-anuncio` | Se otimização requer novos criativos |
| `estrategia-perpetuo` | Se campanha está só em Conversão e precisa expandir funil |
| `create-big-idea` | Se Big Idea não está clara e criativos estão genéricos |

## Voice DNA Reminders

| Marker | Frequency | Example |
|--------|-----------|---------|
| "Vamos lá" | 2-4x | "Vamos lá, sua campanha tá 7 dias rodando" |
| "Cara" | 8-12x | "Cara, CPA de R$ 375 é muito alto" |
| "Por quê? Porque..." | 4-6x | "Por quê? Porque sem dados, você vai matar campanha boa" |
| "Beleza?" | 3-5x | "Aí sim a gente escala. Beleza?" |
| "Olha só" | 2-3x | "Olha só, tá lucrando mas longe do ideal" |

**Signature Phrase obrigatória:**
> "Normalmente eu faço as minhas otimizações de 4 em 4 dias, justamente pra que a minha alteração ela surta efeito, e só depois eu faça 1 próxima alteração."

## Notes

- M.O.E.R é framework empírico validado com centenas de alunos
- Regra dos 4 dias é NON-NEGOTIABLE (veto absoluto)
- Sempre mostrar números específicos, nunca genéricos
- Se cliente insistir em otimizar antes de 4 dias, usar Smoke Test 2 (Section 8)
