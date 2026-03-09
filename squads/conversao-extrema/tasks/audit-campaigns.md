# audit-campaigns

## Metadata
```yaml
task_id: CE_AUDIT_001
agent: tessman-strategist
type: audit
complexity: medium
estimated_time: 30-45min
source: "Conversão Extrema - Otimização + 10 Mandamentos"
```

## Purpose

Auditar campanhas ativas (Google Ads + Facebook Ads) para identificar problemas, desperdícios e oportunidades de otimização seguindo os 10 Mandamentos Tessman.

> **"Conversão é a ÚNICA métrica que importa. CTR/impressões são vaidade."** — Thiago Tessman

---

## Executor

**Agent:** `tessman-strategist`
**Model:** `sonnet`

---

## Elicit

**FALSE** - Análise de dados existentes das campanhas.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Campanha ativa há menos de 7 dias"
    action: "WAIT - Aguardar pelo menos 7 dias para dados significativos"

  - condition: "Gasto total < R$100"
    action: "WAIT - Volume de dados insuficiente para auditoria"
```

---

## Steps

### STEP 1: Checklist dos 10 Mandamentos

**Validar conformidade com cada mandamento:**

```yaml
mandamento_1_especificidade:
  checklist:
    - [ ] Campanha específica por produto (não mistura produtos)?
    - [ ] Grupos de anúncios por intenção única?
    - [ ] Começou específico antes de ampliar?
  score: "/3"
  veto_se_falha: "Reestruturar campanha (está muito ampla)"

mandamento_2_conversao_unica_metrica:
  checklist:
    - [ ] Conversões configuradas e trackando?
    - [ ] Decisões baseadas em CPA/ROAS (não CTR)?
    - [ ] Métricas de vaidade (impressões) ignoradas?
  score: "/3"
  veto_se_falha: "Instalar/validar tracking de conversão"

mandamento_3_ordem_prioridade:
  checklist:
    - [ ] Começou por Pesquisa (se Google)?
    - [ ] Remarketing configurado?
    - [ ] Display/YouTube só após validar Pesquisa?
  score: "/3"
  veto_se_falha: "Pausar Display, focar em Pesquisa/Remarketing"

mandamento_4_tags_antes_tudo:
  checklist:
    - [ ] Pixel/tag instalado ANTES de gastar?
    - [ ] Conversões testadas e funcionando?
    - [ ] Remarketing tag ativa?
  score: "/3"
  veto_se_falha_critico: "HALT - Sem dados, impossível otimizar"

mandamento_5_p1_maior_p2:
  checklist:
    - [ ] Remarketing (P1) ativo?
    - [ ] Budget P1 >= 30% do total?
    - [ ] ROI P1 > ROI P2 (se não, investigar)?
  score: "/3"
  veto_se_falha: "Criar/otimizar campanhas P1"

mandamento_6_10_30_palavras:
  checklist:
    - [ ] Google Ads: 10-30 palavras por grupo?
    - [ ] Não tem grupo com 80+ palavras?
  score: "/2"
  veto_se_falha: "Dividir grupos muito amplos"

mandamento_7_teste_um_vez:
  checklist:
    - [ ] Facebook: 1 interesse por conjunto?
    - [ ] Testes isolam 1 variável?
  score: "/2"
  alerta_se_falha: "Impossível saber o que funciona"

mandamento_8_negativas_diarias:
  checklist:
    - [ ] Termos de pesquisa verificados nas primeiras 2 semanas?
    - [ ] Palavras negativas adicionadas?
  score: "/2"
  alerta_se_falha: "Desperdício de budget em buscas irrelevantes"

mandamento_9_cpa_com_dados:
  checklist:
    - [ ] Se usa CPA Desejado: tem 10-15 conversões?
    - [ ] Se zero conversões: está usando CPC Manual?
  score: "/2"
  veto_se_falha: "Mudar para CPC Manual até ter dados"

mandamento_10_80_20_preparacao:
  checklist:
    - [ ] (Se venda massiva) 80% do esforço em captação?
    - [ ] Base aquecida antes de vender?
  score: "/2"
  alerta_se_falha: "Venda sem preparo = baixa conversão"
```

**Score Total:** ____/25

**Interpretação:**
- 20-25: Campanha EXCELENTE
- 15-19: Campanha BOA (pequenos ajustes)
- 10-14: Campanha REGULAR (otimização necessária)
- <10: Campanha CRÍTICA (reestruturação urgente)

### STEP 2: Análise de Métricas por Plataforma

**Google Ads - Rede de Pesquisa:**

```yaml
metricas_google:
  conversoes:
    valor_atual: "__"
    benchmark: ">0 nos primeiros 14 dias"
    status: "OK | WARNING | CRÍTICO"

  ctr:
    valor_atual: "__%"
    benchmark: ">3%"
    diagnostico:
      if_baixo: "Anúncio não relevante ou palavra-chave errada"

  cpc:
    valor_atual: "R$__"
    benchmark: "Dentro do orçamento planejado"
    diagnostico:
      if_alto: "Índice de Qualidade baixo ou lance muito competitivo"

  cpa:
    valor_atual: "R$__"
    benchmark: "<30% do LTV"
    diagnostico:
      if_alto: "Landing page não converte OU palavra-chave errada"

  indice_qualidade:
    valor_atual: "_/10"
    benchmark: ">7"
    diagnostico:
      if_baixo: "Melhorar relevância anúncio-palavra-landing page"

  taxa_conversao_lp:
    valor_atual: "__%"
    benchmark: ">2%"
    diagnostico:
      if_baixa: "Problema na landing page (copiar, oferta, design)"
```

**Facebook/Instagram Ads:**

```yaml
metricas_facebook:
  ctr:
    valor_atual: "__%"
    benchmark: ">1%"
    diagnostico:
      if_baixo: "Criativo não para o scroll ou público errado"

  cpm:
    valor_atual: "R$__"
    benchmark: "<R$30"
    diagnostico:
      if_alto: "Criativo cansou (frequência) ou público saturado"

  frequencia:
    valor_atual: "__x"
    benchmark: "<3 (idealmente <5)"
    diagnostico:
      if_alta: "Criativo saturado, trocar imediato"

  cpl:
    valor_atual: "R$__"
    benchmark: "Variável (comparar com meta)"
    diagnostico:
      if_alto: "Público frio demais ou criativo fraco"

  cpa:
    valor_atual: "R$__"
    benchmark: "<30% do LTV"
    diagnostico:
      if_alto: "Funil quebrado (tráfego OK mas não converte)"
```

### STEP 3: Diagnóstico de Problemas Comuns

```yaml
problema_1_alto_cpa:
  sintoma: "CPA acima da meta"
  causas_possiveis:
    - "Landing page não converte (<2%)"
    - "Público errado"
    - "Oferta não clara"
    - "Muito tráfego frio (P2) e pouco quente (P1)"

  acoes_corretivas:
    prioridade_1:
      - task: "Otimizar landing page (A/B test headline, CTA)"
        impacto: "ALTO"
    prioridade_2:
      - task: "Aumentar budget P1 (remarketing)"
        impacto: "ALTO"
    prioridade_3:
      - task: "Testar novos públicos P2"
        impacto: "MÉDIO"

problema_2_baixo_volume:
  sintoma: "Poucas impressões/cliques"
  causas_possiveis:
    - "Lance muito baixo"
    - "Segmentação muito restrita"
    - "Budget muito baixo"
    - "Índice de Qualidade baixo (Google)"

  acoes_corretivas:
    prioridade_1:
      - task: "Aumentar lance +20%"
      - task: "Expandir segmentação (geo, idade)"
    prioridade_2:
      - task: "Aumentar budget diário"

problema_3_alta_frequencia:
  sintoma: "Frequência >5-7x"
  causas_possiveis:
    - "Público pequeno demais"
    - "Criativo saturou"
    - "Budget alto para audiência limitada"

  acoes_corretivas:
    prioridade_1:
      - task: "Refresh criativo (novo vídeo/imagem)"
        deadline: "Imediato"
    prioridade_2:
      - task: "Expandir público"
      - task: "Reduzir budget temporariamente"

problema_4_clica_mas_nao_converte:
  sintoma: "CTR bom (>2%) mas conversão baixa (<1%)"
  causas_possiveis:
    - "Anúncio promete X, landing page entrega Y (mismatch)"
    - "Landing page lenta/quebrada"
    - "Formulário muito longo"
    - "Preço não claro"

  acoes_corretivas:
    prioridade_1:
      - task: "Validar match anúncio-landing page"
      - task: "Testar landing page (velocidade, mobile)"
    prioridade_2:
      - task: "Simplificar formulário (menos campos)"
      - task: "Adicionar prova social na LP"

problema_5_gasta_rapido_demais:
  sintoma: "Budget diário se esgota em poucas horas"
  causas_possiveis:
    - "Lance muito agressivo"
    - "Entrega acelerada ativada"
    - "Palavra-chave ampla demais"

  acoes_corretivas:
    prioridade_1:
      - task: "Mudar para entrega padrão (não acelerada)"
      - task: "Reduzir lance -20%"
    prioridade_2:
      - task: "Adicionar palavras negativas"
      - task: "Tornar correspondência mais restritiva"
```

### STEP 4: Identificar Winners & Losers

**Critérios de Classificação:**

```yaml
winners:
  definicao: "Performance ACIMA da meta"
  criterios:
    - "CPA < meta"
    - "ROAS > 3x"
    - "Taxa conversão > 2%"
    - "CTR > benchmark (3% Google, 1% Facebook)"
  acao: "ESCALAR (+20% budget a cada 3-5 dias)"

performers:
  definicao: "Performance DENTRO da meta"
  criterios:
    - "CPA = meta (+/-20%)"
    - "ROAS 2-3x"
  acao: "MANTER (observar por mais 7 dias)"

losers:
  definicao: "Performance ABAIXO da meta"
  criterios:
    - "CPA > 150% da meta após R$100 gastos"
    - "Zero conversões após R$100 gastos"
    - "CTR < 0,5% (Google) ou <0,3% (Facebook)"
  acao: "PAUSAR ou OTIMIZAR (mudar criativo/público)"
```

**Output: Lista de Winners & Losers**

```yaml
winners:
  - campanha: "Google - Curso Tráfego Pago - KW Exatas"
    cpa: 80.00
    meta: 150.00
    roas: 4.2
    acao: "Escalar +20% budget (de R$50 para R$60/dia)"

  - campanha: "Facebook - P1 Remarketing Produto 2d"
    cpa: 45.00
    meta: 150.00
    roas: 7.5
    acao: "Escalar +20% (de R$30 para R$36/dia)"

losers:
  - campanha: "Google - Display Ampla"
    cpa: 350.00
    meta: 150.00
    conversoes: 2
    gasto: 180.00
    acao: "PAUSAR (Display sem performance em Pesquisa = erro)"

  - campanha: "Facebook - Interesse 'Empreendedorismo'"
    cpa: 280.00
    ctr: 0.4%
    gasto: 150.00
    acao: "PAUSAR (interesse muito amplo, CTR baixo)"
```

---

## Output Example

```yaml
campaign_audit:
  date: "2026-03-02"
  period_analyzed: "Últimos 30 dias"

  score_10_mandamentos: 18/25  # BOA - pequenos ajustes

  issues_found:
    criticos:
      - issue: "Display ativa sem performance em Pesquisa (Mandamento 3)"
        action: "PAUSAR Display imediatamente"
        priority: 1

      - issue: "Grupo 'Palavras Gerais' com 85 palavras (Mandamento 6)"
        action: "Dividir em 3 grupos específicos"
        priority: 1

    importantes:
      - issue: "Remarketing apenas 15% do budget (deveria ser 30%)"
        action: "Realocar budget P2 → P1"
        priority: 2

      - issue: "Facebook: 3 interesses misturados no mesmo conjunto"
        action: "Criar 1 conjunto por interesse"
        priority: 2

    menores:
      - issue: "Termos de pesquisa não verificados há 10 dias"
        action: "Adicionar palavras negativas diariamente"
        priority: 3

  winners:
    - campaign: "Google Search - KW Exatas"
      performance: "Excelente"
      action: "Escalar +20%"

    - campaign: "Facebook P1 - Carrinho 7d"
      performance: "Excelente"
      action: "Escalar +20%"

  losers:
    - campaign: "Google Display"
      performance: "Crítica"
      action: "PAUSAR"

    - campaign: "Facebook - Interesse Amplo"
      performance: "Ruim"
      action: "PAUSAR"

  quick_wins:
    - action: "Adicionar 20 palavras negativas (Google)"
      impact: "Reduzir CPA em 15-20%"
      effort: "Baixo (30min)"

    - action: "Refresh criativos Facebook (frequência >7)"
      impact: "Recuperar performance"
      effort: "Médio (criar 3 novos vídeos)"

    - action: "Aumentar budget P1 de 15% para 30%"
      impact: "Melhorar ROAS geral"
      effort: "Baixo (realocação)"

  recommended_actions_next_7_days:
    day_1:
      - "Pausar campanhas losers (Display + Interesse Amplo)"
      - "Adicionar palavras negativas"

    day_2:
      - "Dividir grupo 'Palavras Gerais' em 3 específicos"
      - "Criar 1 conjunto por interesse (Facebook)"

    day_3_5:
      - "Refresh criativos (3 novos vídeos)"
      - "Realocar budget P2 → P1"

    day_6_7:
      - "Escalar winners +20%"
      - "Monitorar performance pós-otimização"
```

---

## Completion Criteria

```yaml
audit_complete_when:
  - [ ] Checklist 10 Mandamentos completo (score calculado)
  - [ ] Métricas analisadas (Google + Facebook)
  - [ ] Problemas classificados (crítico, importante, menor)
  - [ ] Winners & losers identificados
  - [ ] Quick wins listados
  - [ ] Plano de ação 7 dias criado
  - [ ] Prioridades definidas (1, 2, 3)
```

---

## Handoff To

```yaml
handoff:
  if_issues_criticos:
    agent: "tessman-google-ads" OR "tessman-meta-ads"
    task: "Reestruturar campanha"
    priority: 1

  if_issues_menores:
    agent: "tessman-strategist"
    task: "Implementar quick wins"
    priority: 2

  if_performance_ok:
    agent: "tessman-strategist"
    task: "Escalar winners"
    priority: 3
```

---

## Quality Gate

```yaml
audit_quality:
  - [ ] Análise baseada em DADOS (não achismo)
  - [ ] Benchmarks corretos aplicados
  - [ ] Diagnóstico segue metodologia Tessman
  - [ ] Ações priorizadas por impacto vs esforço
  - [ ] Timeline realista (não promete milagre)
```

---

*Task: CE_AUDIT_001 | Agent: tessman-strategist | Version: 1.0*
*Source: Conversão Extrema - Otimização + 10 Mandamentos*
