# diagnose-funnel

## Metadata
```yaml
task_id: CE_STRATEGY_002
agent: tessman-strategist
type: diagnostic
complexity: medium
estimated_time: 30-45min
source: "Conversão Extrema - Funil de Métricas (H19) + Decision Trees + 5 Pilares + 7 Erros"
```

## Purpose

Diagnosticar funil de vendas usando o Funil de Métricas (H19) para identificar ONDE está o problema: Impressão → Clique → Lead → Venda. Aplicar decision trees, os 5 Pilares do Resultado Garantido e auditar os 7 Erros que Impedem Escala.

> **"Você não tem problema de vendas. Você tem problema de impressão, ou de clique, ou de lead, ou de conversão. Descubra ONDE."** — Thiago Tessman (H19)

---

## Executor

**Agent:** `tessman-strategist`
**Model:** `sonnet` (requer análise de métricas e diagnóstico)

---

## Elicit

**TRUE** - Esta task EXIGE interação com o usuário para coletar métricas do funil atual.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Sem métricas rastreadas (não sabe números do funil)"
    action: "HALT - Instalar tracking primeiro (pixel, analytics, CRM)"

  - condition: "Menos de 100 visitantes no período analisado"
    action: "WARNING - Amostra insuficiente, diagnóstico será limitado"

  - condition: "Funil sem todas as etapas (ex: venda direta sem captura)"
    action: "ADAPT - Diagnosticar apenas etapas existentes"

  - condition: "Múltiplos funis misturados (tráfego frio + quente juntos)"
    action: "BLOCK - Separar e analisar funis independentemente"
```

---

## Steps

### STEP 1: Apresentar Framework — Funil de Métricas (H19)

Explicar o modelo ao usuário:

```
O Funil de Métricas (H19) divide o processo de venda em 4 etapas rastreáveis:

┌─────────────────────────────────────────┐
│  IMPRESSÃO (quantas pessoas viram?)     │  ← Problema de ALCANCE
├─────────────────────────────────────────┤
│  CLIQUE (quantas clicaram?)             │  ← Problema de CRIATIVO/OFERTA
├─────────────────────────────────────────┤
│  LEAD (quantas viraram contato?)        │  ← Problema de LANDING PAGE
├─────────────────────────────────────────┤
│  VENDA (quantas compraram?)             │  ← Problema de CONVERSÃO/OFERTA
└─────────────────────────────────────────┘

Cada etapa tem uma taxa de conversão:
- CTR (Click-Through Rate): Cliques / Impressões
- CPC (Custo Por Clique): Gasto / Cliques
- CPCX (Custo Por Conexão): Gasto / Leads
- CAC (Custo de Aquisição de Cliente): Gasto / Vendas
- ROI (Retorno sobre Investimento): Receita / Gasto

Vamos identificar qual etapa está TRAVANDO seu funil.
```

### STEP 2: Elicitação — Coletar Métricas do Funil

```yaml
questions:
  contexto:
    - q1: "Qual período vamos analisar?"
      opcoes:
        - "Últimos 7 dias"
        - "Últimos 30 dias"
        - "Últimos 90 dias"
      nota: "Mínimo 100 visitantes para diagnóstico válido"

    - q2: "Qual tipo de tráfego?"
      opcoes:
        - "Tráfego pago (Google Ads)"
        - "Tráfego pago (Meta Ads)"
        - "Tráfego orgânico"
        - "Misto (especificar proporção)"
      nota: "Analisar cada fonte separadamente se misto"

  etapa_1_impressao:
    - q3: "Quantas impressões o anúncio/conteúdo teve?"
      tipo: "número"
      nota: "Quantas pessoas VIRAM o anúncio/post"

  etapa_2_clique:
    - q4: "Quantos cliques gerou?"
      tipo: "número"

    - q5: "Quanto gastou neste período?"
      tipo: "R$ valor"

  etapa_3_lead:
    - q6: "Quantos leads capturou? (email, WhatsApp, remarketing)"
      tipo: "número"
      nota: "Se venda direta sem captura, pular para etapa 4"

  etapa_4_venda:
    - q7: "Quantas vendas realizou?"
      tipo: "número"

    - q8: "Qual a receita total gerada?"
      tipo: "R$ valor"

    - q9: "Qual o ticket médio?"
      tipo: "R$ valor"
      calculo_alternativo: "receita_total / vendas"

  contexto_adicional:
    - q10: "Qual o LTV (Lifetime Value) do cliente?"
      opcoes:
        - "Não sei"
        - "Venda única (LTV = ticket médio)"
        - "Recorrência (especificar meses médios)"
        - "R$ [valor total médio por cliente]"
```

### STEP 3: Calcular Métricas e Taxas de Conversão

```yaml
calculos:
  ctr:
    formula: "(cliques / impressoes) * 100"
    benchmark:
      google_search: "3-5% (bom), > 5% (ótimo)"
      google_display: "0.5-1% (bom), > 1% (ótimo)"
      meta_feed: "1-2% (bom), > 2% (ótimo)"
      meta_stories: "0.5-1.5% (bom), > 1.5% (ótimo)"

  cpc:
    formula: "gasto / cliques"
    benchmark:
      google_search: "R$1-R$5 (serviços locais), R$5-R$20 (B2B)"
      meta: "R$0.50-R$3 (B2C), R$3-R$10 (B2B)"

  lead_conversion_rate:
    formula: "(leads / cliques) * 100"
    benchmark: "15-35% (serviços - H34), 30-50% (lead magnet forte)"

  cpcx:
    formula: "gasto / leads"
    benchmark: "< R$20 (B2C), < R$50 (B2B), < R$100 (high-ticket)"

  sales_conversion_rate:
    formula: "(vendas / leads) * 100"
    benchmark:
      low_ticket: "5-10% (< R$500)"
      mid_ticket: "2-5% (R$500-R$3000)"
      high_ticket: "1-3% (> R$3000 com call)"

  cac:
    formula: "gasto / vendas"
    benchmark: "< 1/3 do LTV (saudável), < 1/5 do LTV (ótimo)"

  roi:
    formula: "((receita - gasto) / gasto) * 100"
    benchmark:
      minimo_viavel: "100% (2x)"
      saudavel: "200% (3x)"
      excelente: "400%+ (5x+)"
```

### STEP 4: Aplicar Decision Tree — Onde Otimizar o Funil?

```yaml
decision_tree:
  node_1_impressao:
    pergunta: "Impressões são suficientes? (>10.000/mês B2C, >1.000/mês B2B)"
    if_nao:
      diagnostico: "PROBLEMA DE ALCANCE (Impressão baixa)"
      causas_possiveis:
        - "Budget muito baixo"
        - "Segmentação muito restrita"
        - "Lances não competitivos"
        - "Campanha pausada/limitada por orçamento"
      acoes:
        - "Aumentar budget diário"
        - "Expandir segmentação (círculos concêntricos)"
        - "Ajustar lances (CPC ou CPM)"
      handoff: "tessman-google-ads ou tessman-meta-ads (ajustar campanha)"
    if_sim:
      proximo: "node_2_ctr"

  node_2_ctr:
    pergunta: "CTR está acima do benchmark? (ver tabela acima)"
    if_nao:
      diagnostico: "PROBLEMA DE CRIATIVO/OFERTA (Clique baixo)"
      causas_possiveis:
        - "Criativo não chama atenção (H28 - criativo = 50%)"
        - "Oferta não é atrativa"
        - "Segmentação errada (público não interessado)"
        - "Fadiga de criativo (>30 dias sem renovar)"
      acoes:
        - "Testar novos criativos (Ugly Ads > produção)"
        - "Revisar promessa/oferta"
        - "Refinar segmentação"
        - "Aplicar DSOD em copy do anúncio"
      handoff: "tessman-meta-ads (task: creative-audit.md)"
    if_sim:
      proximo: "node_3_lead_conversion"

  node_3_lead_conversion:
    pergunta: "Taxa de conversão Lead está acima do benchmark? (15-35% serviços)"
    if_nao:
      diagnostico: "PROBLEMA DE LANDING PAGE (Lead baixo)"
      causas_possiveis:
        - "Landing page não convence (H18 - 5 segundos falhou)"
        - "CTA não está above the fold (H17)"
        - "Falta prova social"
        - "Velocidade lenta (H32 - cada seg = -6%)"
        - "Mobile quebrado"
      acoes:
        - "Revisar estrutura Cabeça-Corpo-Pernas"
        - "Garantir CTA antes da dobra"
        - "Adicionar depoimentos em vídeo (V6)"
        - "Otimizar velocidade (< 3seg)"
        - "Testar versão mobile"
      handoff: "tessman-copy (task: optimize-landing-page.md)"
    if_sim:
      proximo: "node_4_sales_conversion"

  node_4_sales_conversion:
    pergunta: "Taxa de conversão Venda está acima do benchmark?"
    if_nao:
      diagnostico: "PROBLEMA DE CONVERSÃO/OFERTA (Venda baixa)"
      causas_possiveis:
        - "Lead não está aquecido (V3 Relacionar fraco)"
        - "Processo de vendas ineficiente"
        - "Objeções não tratadas"
        - "Preço não condiz com valor percebido"
        - "Falta urgência/escassez"
      acoes:
        - "Implementar nutrição de leads (email sequence)"
        - "Criar script de vendas estruturado"
        - "Adicionar garantia/reversão de risco"
        - "Incluir bônus com deadline (urgência genuína)"
        - "Revisar posicionamento de preço"
      handoff: "tessman-strategist (task: optimize-offer.md) ou tessman-copy (email sequence)"
    if_sim:
      proximo: "node_5_roi"

  node_5_roi:
    pergunta: "ROI está acima de 200% (3x)?"
    if_nao:
      diagnostico: "FUNIL FUNCIONA MAS ROI INSUFICIENTE"
      causas_possiveis:
        - "CAC muito alto vs LTV"
        - "Ticket médio muito baixo"
        - "Sem estratégia de upsell/recorrência"
        - "Custos operacionais altos"
      acoes:
        - "Aumentar ticket médio (bundling, premium tier)"
        - "Criar upsell/cross-sell"
        - "Implementar recorrência (aumentar LTV)"
        - "Otimizar etapas anteriores para reduzir CAC"
      handoff: "tessman-strategist (otimização de LTV/ticket)"
    if_sim:
      diagnostico: "FUNIL SAUDÁVEL — FOCO EM ESCALA"
      acoes:
        - "Aumentar budget gradualmente (10-20% por semana)"
        - "Replicar campanha em novos canais"
        - "Expandir segmentação (lookalike, similares)"
        - "Testar novos criativos (evitar fadiga)"
      handoff: "tessman-strategist (planejamento de escala)"
```

### STEP 5: Auditar 5 Pilares do Resultado Garantido

```yaml
cinco_pilares_checklist:
  pilar_1_segmentacao:
    pergunta: "Você está falando com as pessoas CERTAS?"
    checks:
      - [ ] Público tem DOR específica que sua oferta resolve
      - [ ] Público tem PODER DE COMPRA
      - [ ] Público está ACESSÍVEL na plataforma (Google/Meta)
      - [ ] Segmentação não é genérica demais (ex: "empreendedores")
    diagnostico_falha: "Segmentação muito ampla ou errada"

  pilar_2_criativo:
    pergunta: "Seu criativo PARA o scroll?"
    checks:
      - [ ] Primeira linha/imagem chama atenção (3 seg)
      - [ ] Copy usa DSOD (Dor + Solução + Objeção + Diferenciação)
      - [ ] Visual autêntico > produção (Ugly Ads concept)
      - [ ] Criativo renovado nos últimos 30 dias (fadiga)
    diagnostico_falha: "Criativo fraco ou fadigado (H28)"

  pilar_3_oferta:
    pergunta: "Sua oferta é IRRESISTÍVEL?"
    checks:
      - [ ] Promessa clara e específica
      - [ ] Benefício > Feature
      - [ ] Prova social presente (depoimentos, números)
      - [ ] Urgência/escassez GENUÍNA
      - [ ] Reversão de risco (garantia)
    diagnostico_falha: "Oferta genérica ou não defensável"

  pilar_4_landing_page:
    pergunta: "Sua LP converte em 5 segundos?"
    checks:
      - [ ] H17: 1 página, 1 objetivo
      - [ ] H18: 5 segundos test passa
      - [ ] CTA above the fold
      - [ ] Estrutura Cabeça-Corpo-Pernas (50-30-20)
      - [ ] Mobile funciona (> 60% tráfego)
    diagnostico_falha: "LP confusa, lenta ou quebrada"

  pilar_5_followup:
    pergunta: "Você nutre os leads que não compraram?"
    checks:
      - [ ] Pixel de remarketing instalado
      - [ ] Sequência de emails automatizada (V3)
      - [ ] Campanha de remarketing ativa
      - [ ] WhatsApp/canal direto disponível
    diagnostico_falha: "Perda de 90% dos leads frios (V2/V3 quebrado)"
```

### STEP 6: Auditar 7 Erros que Impedem Escala

```yaml
sete_erros_audit:
  erro_1_sem_tracking:
    check: "Pixel instalado e rastreando conversões?"
    impacto: "SEM tracking = decisões no escuro"
    acao_se_falha: "Instalar Facebook Pixel, Google Tag Manager, Google Analytics"

  erro_2_segmentacao_generica:
    check: "Segmentação específica (nicho claro)?"
    exemplo_erro: "'Empreendedores no Brasil' (genérico demais)"
    exemplo_correto: "'Dentistas em SP que faturam < R$30k/mês'"
    acao_se_falha: "Aplicar círculos concêntricos (começar específico)"

  erro_3_criativo_ruim:
    check: "CTR > benchmark da plataforma?"
    impacto: "Criativo = 50% do resultado (Meta dado - H28)"
    acao_se_falha: "Renovar criativos (Ugly Ads, depoimentos, UGC)"

  erro_4_lp_sem_conversao:
    check: "LP converte > 15% (serviços)?"
    impacto: "Tráfego desperdiçado"
    acao_se_falha: "Aplicar task optimize-landing-page.md"

  erro_5_sem_remarketing:
    check: "Remarketing ativo para quem não converteu?"
    impacto: "90% não compram na 1ª vez — perdidos pra sempre"
    acao_se_falha: "Configurar audiências de remarketing + campanha P1"

  erro_6_sem_nutricao:
    check: "Sequência de emails/conteúdo regular (V3)?"
    impacto: "Lead frio não compra"
    acao_se_falha: "Criar sequência 7 emails + conteúdo 3x/semana"

  erro_7_nao_testar:
    check: "Testando variações (criativos, copies, CTAs)?"
    impacto: "Estagnação — sem melhoria contínua"
    acao_se_falha: "Implementar rotina de teste semanal (1 variável por vez)"
```

### STEP 7: Gerar Diagnóstico Completo

```yaml
output_structure:
  resumo_metricas:
    periodo: "[data inicio - data fim]"
    fonte_trafego: "[Google/Meta/Organico]"
    impressoes: "[número]"
    cliques: "[número] (CTR: [%])"
    leads: "[número] (Conv: [%])"
    vendas: "[número] (Conv: [%])"
    gasto: "R$ [valor]"
    receita: "R$ [valor]"
    roi: "[%] ([X]x)"

  gargalo_primario:
    etapa: "[Impressão/Clique/Lead/Venda/ROI]"
    diagnostico: "[Descrição do problema]"
    causas_identificadas:
      - "[Causa 1]"
      - "[Causa 2]"

  pilares_quebrados:
    - pilar: "[Nome do pilar]"
      status: "FALHA"
      impacto: "[Descrição do impacto]"

  erros_impedem_escala:
    - erro: "[Nome do erro]"
      presente: "SIM/NAO"
      acao_corretiva: "[O que fazer]"

  acoes_priorizadas:
    prioridade_1_critico:
      - acao: "[Ação específica]"
        prazo: "[dias]"
        impacto_esperado: "[% melhoria estimada]"
        handoff: "[agent + task]"

    prioridade_2_importante:
      - acao: "[Ação]"

    prioridade_3_manutencao:
      - acao: "[Continuar X]"
```

---

## Output Example

```yaml
diagnostico_funil:
  data_analise: "2026-03-06"
  periodo: "01-02-2026 a 29-02-2026 (28 dias)"
  fonte: "Meta Ads (Facebook + Instagram)"

  metricas_brutas:
    impressoes: 45000
    cliques: 900
    leads: 180
    vendas: 9
    gasto: "R$ 2.700"
    receita: "R$ 8.100"

  metricas_calculadas:
    ctr: "2.0% (benchmark: 1-2% — OK)"
    cpc: "R$ 3.00 (benchmark: R$0.50-R$3 — OK)"
    lead_conv: "20% (benchmark: 15-35% — OK)"
    cpcx: "R$ 15.00 (benchmark: < R$20 — OK)"
    sales_conv: "5% (benchmark: 5-10% low-ticket — OK)"
    cac: "R$ 300 (LTV: R$ 900 — ratio 1:3 OK)"
    roi: "200% (3x — saudável)"

  gargalo_primario:
    etapa: "IMPRESSÃO (Alcance insuficiente)"
    diagnostico: |
      Todas as taxas de conversão estão SAUDÁVEIS (CTR OK, Lead Conv OK, Sales Conv OK, ROI 3x).

      O problema NÃO é eficiência, é VOLUME.

      Com apenas 45k impressões/mês, você está limitando vendas em 9/mês.
      Se dobrar impressões (mantendo eficiência), dobra vendas para 18/mês.

    causas:
      - "Budget diário muito baixo (R$ 96/dia)"
      - "Segmentação muito restrita (público pequeno)"

  pilares_status:
    - pilar: "Segmentação"
      status: "OK"
      nota: "Público certo, mas PEQUENO demais"

    - pilar: "Criativo"
      status: "OK"
      nota: "CTR 2% está bom"

    - pilar: "Oferta"
      status: "OK"
      nota: "Conversões saudáveis"

    - pilar: "Landing Page"
      status: "OK"
      nota: "20% lead conv é ótimo"

    - pilar: "Follow-up"
      status: "ATENÇÃO"
      nota: "Sem remarketing — 95% dos que não converteram perdidos"

  erros_escala_detectados:
    - erro: "Erro 5 - Sem remarketing"
      impacto: "171 leads não compraram (95%) — sem segunda chance"
      acao: "Configurar campanha P1 remarketing URGENTE"

  acoes_priorizadas:
    prioridade_1_critico:
      - acao: "Aumentar budget diário de R$96 para R$150 (+56%)"
        prazo: "Imediato"
        impacto_esperado: "Vendas de 9 para 14/mês (+55%)"
        custo_adicional: "R$ 1.620/mês"
        receita_adicional: "R$ 4.500/mês (ROI mantido em 3x)"
        handoff: "tessman-meta-ads (ajustar budget campanha)"

      - acao: "Configurar remarketing para 171 leads que não compraram"
        prazo: "7 dias"
        impacto_esperado: "+2-3 vendas/mês dos leads existentes"
        handoff: "tessman-remarketing (setup-remarketing-tags.md)"

    prioridade_2_importante:
      - acao: "Expandir segmentação (lookalike 1% dos compradores)"
        prazo: "14 dias"
        impacto: "Dobrar impressões sem perder eficiência"
        handoff: "tessman-meta-ads (expandir audiências)"

    prioridade_3_manutencao:
      - acao: "Continuar criativos atuais (CTR OK)"
      - acao: "Renovar criativos em 15 dias (evitar fadiga)"
      - acao: "Manter LP atual (20% conv é ótimo)"

  proximo_diagnostico:
    quando: "Após 30 dias do aumento de budget"
    objetivo: "Validar se eficiência se mantém com maior volume"
```

---

## Completion Criteria

```yaml
diagnostico_complete_when:
  - [ ] Todas as métricas coletadas (Impressão, Clique, Lead, Venda, $)
  - [ ] Taxas calculadas (CTR, CPC, CPCX, CAC, ROI)
  - [ ] Benchmarks comparados
  - [ ] Decision tree aplicada — gargalo identificado
  - [ ] 5 Pilares auditados
  - [ ] 7 Erros auditados
  - [ ] Ações priorizadas (P1, P2, P3)
  - [ ] Impacto estimado para cada ação
  - [ ] Handoff claro para próximo agente/task
```

---

## Handoff To

Depende do gargalo identificado:

| Gargalo | Próximo Agent | Próxima Task |
|---------|---------------|--------------|
| **Impressão** | `tessman-google-ads` ou `tessman-meta-ads` | Ajustar budget/segmentação |
| **Clique (CTR)** | `tessman-meta-ads` | `creative-audit.md` |
| **Lead (LP)** | `tessman-copy` | `optimize-landing-page.md` |
| **Venda** | `tessman-strategist` | `optimize-offer.md` ou criar email sequence |
| **ROI** | `tessman-strategist` | Otimização LTV/ticket |

---

## Quality Gate

```yaml
diagnostico_quality:
  - [ ] Diagnóstico baseado em DADOS (não achismo)
  - [ ] Benchmarks aplicados (não julgamento subjetivo)
  - [ ] Causa raiz identificada (não apenas sintoma)
  - [ ] Ações específicas (não genéricas tipo "melhorar anúncios")
  - [ ] Impacto quantificado (% ou R$ esperado)
  - [ ] Linguagem Tessman (clara, direta, sem corporativês)
```

---

*Task: CE_STRATEGY_002 | Agent: tessman-strategist | Version: 1.0*
*Source: Conversão Extrema - Funil de Métricas (H19) + Decision Trees + 5 Pilares + 7 Erros*
