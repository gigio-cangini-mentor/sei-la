# design-remarketing-strategy

## Metadata
```yaml
task_id: CE_REMARKET_001
agent: tessman-remarketing
type: strategic_design
complexity: high
estimated_time: 45-60min
source: "Conversão Extrema - Remarketing 2.0 / Ultra Segmentação"
```

## Purpose

Desenhar estratégia completa de remarketing cross-platform (Google + Facebook) com ultra segmentação por comportamento, frequência por temperatura e exclusões.

> **"O cara entra no seu site, sai e se perdeu. Pra encontrar de novo, paga de novo. Remarketing 2.0 é OBRIGATÓRIO."** — Thiago Tessman

---

## Executor

**Agent:** `tessman-remarketing`
**Model:** `sonnet`

---

## Elicit

**FALSE** - Usa dados existentes das campanhas (visitantes, páginas, eventos).

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Tags de remarketing não instaladas"
    action: "HALT - Instalar pixel Facebook + tag Google ANTES"

  - condition: "Volume de tráfego < 100 visitantes/mês"
    action: "WARNING - Volume muito baixo para remarketing eficaz"

  - condition: "Sem campanha de prospecção ativa (P2)"
    action: "REDIRECT - Criar campanha P2 primeiro para alimentar remarketing"
```

---

## Steps

### STEP 1: Segmentação por Comportamento (Listas de Observação)

**Segmentação Tessman (do mais quente ao mais frio):**

```yaml
lista_1_super_hot_2_dias:
  nome: "Visitou Produto - 2 dias"
  criterio: "Visitou página de produto OU checkout nos últimos 2 dias"
  exclusao: "Quem já comprou"
  temperatura: "FERVENDO"
  frequencia_target: "Ilimitado ou 5-10x/dia"
  budget_allocation: "40%"
  mensagem: "Urgência máxima (última chance, expira hoje)"

lista_2_hot_7_dias:
  nome: "Carrinho Abandonado - 7 dias"
  criterio: "Adicionou ao carrinho mas não comprou - últimos 7 dias"
  exclusao: "Quem já comprou"
  temperatura: "QUENTE"
  frequencia_target: "5-7x/dia"
  budget_allocation: "30%"
  mensagem: "Lembrete + incentivo (desconto, bônus, frete grátis)"

lista_3_warm_15_dias:
  nome: "Visitou Site - 15 dias"
  criterio: "Visitou qualquer página nos últimos 15 dias"
  exclusao: "Quem já comprou + quem visitou produto (já está em lista 1 ou 2)"
  temperatura: "MORNO"
  frequencia_target: "3-5x/dia"
  budget_allocation: "20%"
  mensagem: "Educação + prova social (depoimentos, cases)"

lista_4_cold_30_dias:
  nome: "Visitou Site - 30 dias"
  criterio: "Visitou nos últimos 30 dias (mas não nos últimos 15)"
  exclusao: "Quem já comprou"
  temperatura: "FRIO"
  frequencia_target: "1-2x/dia"
  budget_allocation: "10%"
  mensagem: "Reengajamento (novidade, conteúdo de valor)"
```

### STEP 2: Observação vs Segmentação Restritiva (Google Ads)

**Estratégia Tessman: OBSERVAÇÃO (não restritivo)**

```yaml
estrategia_observacao:
  problema_segmentacao_restritiva:
    exemplo_errado:
      publico: "Visitantes do site"
      restricao: "Apenas mulheres 25-35 em São Paulo"
      resultado: "Alcance MUITO limitado (apenas quem É as duas coisas)"

    exemplo_correto_observacao:
      publico: "Visitantes do site (todos)"
      observacao: "Mulheres 25-35 em São Paulo"
      ajuste_lance: "+30% para esse segmento"
      resultado: "Alcança TODOS visitantes, mas paga mais pelo segmento prioritário"

  vantagem:
    alcance: "Muito maior (não exclui ninguém)"
    otimizacao: "Algoritmo aprende com mais dados"
    flexibilidade: "Pode priorizar sem restringir"

  como_aplicar_google:
    step_1: "Criar lista de remarketing ampla (todos visitantes)"
    step_2: "Adicionar como OBSERVAÇÃO (não segmentação)"
    step_3: "Criar listas de observação específicas (ex: visitou produto)"
    step_4: "Ajustar lance +20-50% para listas mais quentes"
```

### STEP 3: Frequência por Temperatura

**Regra de Frequência Tessman:**

```yaml
frequencia_por_temperatura:
  super_hot_2_dias:
    impressoes_dia: "Ilimitado (5-10x)"
    justificativa: "Está quase comprando, maximize presença"
    cap: "None ou 10x/dia"

  hot_7_dias:
    impressoes_dia: "5-7x"
    justificativa: "Ainda interessado, alta presença"
    cap: "7x/dia"

  warm_15_dias:
    impressoes_dia: "3-5x"
    justificativa: "Interesse moderado, presença média"
    cap: "5x/dia"

  cold_30_dias:
    impressoes_dia: "1-2x"
    justificativa: "Interesse frio, apenas lembrete"
    cap: "2x/dia"

  regra_ouro:
    principle: "Quanto mais RECENTE a visita, MAIOR a frequência"
    veto: "NUNCA frequência >10x/dia (mesmo para super hot)"
```

### STEP 4: Exclusões (Crítico)

**Listas de Exclusão Obrigatórias:**

```yaml
exclusoes_obrigatorias:
  exclusao_1_convertidos:
    lista: "Compradores (all time)"
    aplicar_em: "TODAS as campanhas de remarketing"
    justificativa: "Não gaste anunciando para quem já comprou"
    excecao: "Apenas se tem upsell/cross-sell"

  exclusao_2_listas_quentes:
    exemplo:
      lista_fria: "Visitou site 30 dias"
      excluir: "Quem está em 'Visitou produto 2 dias'"
      justificativa: "Evitar overlap (já está em campanha mais agressiva)"

  exclusao_3_custom:
    exemplos:
      - "Visitou página de cancelamento"
      - "Visitou página de trabalhe conosco"
      - "Visitou blog (se objetivo é venda, não leitura)"
```

### STEP 5: Criativo Específico para Remarketing

**Mensagens por Temperatura:**

```yaml
criativos_por_temperatura:
  super_hot_2_dias:
    angulo: "Urgência + Escassez"
    exemplos:
      - "Você visitou [produto] ontem. Últimas 5 unidades!"
      - "Seu carrinho expira em 2 horas. Finalize agora."
      - "HOJE: 20% OFF no produto que você viu"

  hot_7_dias:
    angulo: "Lembrete + Incentivo"
    exemplos:
      - "Esqueceu algo? Seu carrinho está esperando + FRETE GRÁTIS"
      - "Ainda interessado em [produto]? Bônus exclusivo hoje."

  warm_15_dias:
    angulo: "Prova Social + Educação"
    exemplos:
      - "5.000 pessoas já compraram. Veja os depoimentos."
      - "Como [produto] resolveu [problema] (case real)"

  cold_30_dias:
    angulo: "Reengajamento + Novidade"
    exemplos:
      - "Novidade! [Novo produto] que você vai amar"
      - "Conteúdo gratuito: [ebook/vídeo] sobre [tema]"
```

### STEP 6: Budget Allocation

```yaml
alocacao_budget_remarketing:
  total_budget_remarketing: "30% do budget total de ads"

  distribuicao_interna:
    super_hot_2_dias: 40%  # Maior ROI esperado
    hot_7_dias: 30%
    warm_15_dias: 20%
    cold_30_dias: 10%

  exemplo:
    budget_total_ads: 5000.00
    budget_remarketing: 1500.00  # 30% de 5000
    distribuicao:
      super_hot: 600.00   # 40% de 1500
      hot: 450.00         # 30% de 1500
      warm: 300.00        # 20% de 1500
      cold: 150.00        # 10% de 1500
```

---

## Output Example

```yaml
remarketing_strategy:
  platform: "Google Ads + Facebook Ads (cross-platform)"

  google_ads_remarketing:
    campaign_name: "Remarketing - Display"
    campaign_type: "Display"

    audiences:
      - list_name: "Super Hot - Produto 2d"
        criteria: "Visitou /produto nos últimos 2 dias"
        exclusions: ["Compradores"]
        bid_adjustment: "+50%"
        frequency_cap: "10 impressões/dia"
        budget_daily: 20.00

      - list_name: "Hot - Carrinho 7d"
        criteria: "AddToCart nos últimos 7 dias"
        exclusions: ["Compradores", "Super Hot 2d"]
        bid_adjustment: "+30%"
        frequency_cap: "7 impressões/dia"
        budget_daily: 15.00

      - list_name: "Warm - Site 15d"
        criteria: "Visitou site últimos 15 dias"
        exclusions: ["Compradores", "Super Hot", "Hot"]
        bid_adjustment: "+10%"
        frequency_cap: "5 impressões/dia"
        budget_daily: 10.00

    observation_lists:
      - "Mulheres 25-35" (observação, não segmentação)
      - "Visitou página de preços"

  facebook_ads_remarketing:
    campaign_name: "Remarketing - P1"
    objective: "Conversões"

    ad_sets:
      - set_name: "P1 - Produto 2d"
        audience: "Custom - Page View /produto - 2 days"
        exclusions: "Compradores"
        budget: 20.00
        frequency_target: "5-10x/dia"
        creative_angle: "Urgência + Escassez"

      - set_name: "P1 - Carrinho 7d"
        audience: "Custom - AddToCart - 7 days"
        exclusions: "Compradores"
        budget: 15.00
        frequency_target: "5-7x/dia"
        creative_angle: "Lembrete + Incentivo"

  kpis:
    target_cpa_remarketing: 70.00  # Mais baixo que prospecção
    target_roas: 5.0  # Mais alto que prospecção (público quente)
    max_frequency: 10.0
    min_ctr: 2.0%  # Maior que P2

  optimization_rules:
    daily:
      - "Monitorar frequência (pausar se >10)"
      - "Verificar saturação de criativo"

    weekly:
      - "Refresh criativos se frequência >7"
      - "Testar novos ângulos de mensagem"
      - "Verificar overlap entre listas"

    monthly:
      - "Analisar custo P1 vs P2"
      - "Expandir listas de exclusão"
      - "Criar novas listas por comportamento específico"
```

---

## Completion Criteria

```yaml
strategy_complete_when:
  - [ ] Listas de remarketing criadas (mín 3 por temperatura)
  - [ ] Exclusão de convertidos configurada em TODAS
  - [ ] Frequência por temperatura definida
  - [ ] Budget allocation por lista definido
  - [ ] Criativos específicos por temperatura criados
  - [ ] Observação vs segmentação aplicada (Google)
  - [ ] Cross-platform (Google + Facebook)
```

---

## Handoff To

```yaml
handoff:
  agent: "tessman-google-ads" OR "tessman-meta-ads"
  task: "audit-campaigns.md"
  when: "Após 14 dias de remarketing ativo"
  reason: "Otimizar performance e identificar winners"
```

---

## Quality Gate

```yaml
strategy_quality:
  - [ ] Frequência inversamente proporcional ao tempo (recente = maior)
  - [ ] Exclusão de convertidos em TODAS as campanhas
  - [ ] Segmentação por comportamento (não apenas tempo)
  - [ ] Budget prioriza listas mais quentes (40-30-20-10)
  - [ ] Criativos personalizados por temperatura
```

---

*Task: CE_REMARKET_001 | Agent: tessman-remarketing | Version: 1.0*
*Source: Conversão Extrema - Remarketing 2.0 / Ultra Segmentação*
