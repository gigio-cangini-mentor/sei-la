# diagnose-business

## Metadata
```yaml
task_id: CE_STRATEGY_001
agent: tessman-strategist
type: diagnostic
complexity: medium
estimated_time: 20-30min
source: "Conversão Extrema - Círculo 6V + Diagnóstico de Negócio"
```

## Purpose

Diagnosticar em qual estágio do Círculo 6V o negócio está e identificar o gargalo principal que impede crescimento. Este diagnóstico determina a estratégia correta — o que funciona em um estágio pode QUEBRAR o negócio em outro.

> **"Tráfego é poder. Mas tráfego sem base é desperdício de dinheiro."** — Thiago Tessman

---

## Executor

**Agent:** `tessman-strategist`
**Model:** `sonnet` (requer análise e diagnóstico)

---

## Elicit

**TRUE** - Esta task EXIGE interação com o usuário para coletar informações do negócio atual.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Usuário não tem negócio ativo (apenas ideia)"
    action: "HALT - Primeiro validar oferta e conseguir primeiros clientes"

  - condition: "Negócio sem nenhum cliente ainda"
    action: "WARNING - Foco deve ser em validação, não em tráfego pago"

  - condition: "Sem orçamento mínimo para tráfego (< R$500/mês)"
    action: "REDIRECT - Foco em orgânico primeiro (V3 Relacionar)"
```

---

## Steps

### STEP 1: Apresentação do Framework

Explicar o Círculo 6V ao usuário:

```
O Círculo 6V é um modelo de gestão de negócios desenvolvido pelo Thiago Tessman.
Ele funciona como uma bola de neve - cada pilar alimenta o próximo.

Os 6 Pilares:

1V - ATRAIR (Visitar)
   Gerar tráfego de visitantes interessados

2V - CONECTAR
   Capturar contato (email, WhatsApp, remarketing)

3V - RELACIONAR
   Nutrir relacionamento e gerar valor

4V - VENDER
   Converter em clientes pagantes

5V - SURPREENDER
   Superar expectativas do cliente

6V - TESTEMUNHAR
   Coletar depoimentos e cases de sucesso

Quando um V está quebrado, o crescimento trava.
Vamos identificar qual V precisa de atenção AGORA.
```

### STEP 2: Coleta de Informações (Elicitação)

Fazer perguntas sequenciais para cada V:

#### Perguntas V1 - ATRAIR (Tráfego)

```yaml
questions:
  - q1: "Quantas pessoas visitam seu site/perfil por mês (aproximadamente)?"
    options:
      - "< 100"
      - "100-500"
      - "500-2000"
      - "2000-10000"
      - "> 10000"

  - q2: "Você está investindo em tráfego pago atualmente?"
    options:
      - "Não, apenas orgânico"
      - "Sim, menos de R$500/mês"
      - "Sim, R$500-R$2000/mês"
      - "Sim, R$2000-R$10000/mês"
      - "Sim, mais de R$10000/mês"

  - q3: "Qual a principal fonte de tráfego atual?"
    options:
      - "Orgânico (SEO, redes sociais)"
      - "Google Ads"
      - "Facebook/Instagram Ads"
      - "Indicação/boca a boca"
      - "Outros"
```

#### Perguntas V2 - CONECTAR (Captura de Leads)

```yaml
questions:
  - q4: "Quantos leads (emails/WhatsApp) você captura por mês?"
    options:
      - "< 10"
      - "10-50"
      - "50-200"
      - "200-1000"
      - "> 1000"

  - q5: "Você tem pixel de remarketing instalado?"
    options:
      - "Não sei o que é isso"
      - "Não"
      - "Sim, mas não uso"
      - "Sim, uso ativamente"

  - q6: "Qual o Custo Por Conexão (CPCX) médio?"
    note: "Quanto você gasta para capturar 1 email/WhatsApp"
    options:
      - "Não sei"
      - "< R$5"
      - "R$5-R$20"
      - "R$20-R$50"
      - "> R$50"
```

#### Perguntas V3 - RELACIONAR (Nutrição)

```yaml
questions:
  - q7: "Com que frequência você se comunica com sua base?"
    options:
      - "Raramente ou nunca"
      - "1x por mês"
      - "1x por semana"
      - "3-5x por semana"
      - "Diariamente"

  - q8: "Você tem sequência de emails automatizada?"
    options:
      - "Não"
      - "Sim, mas básica (1-3 emails)"
      - "Sim, completa (7+ emails)"

  - q9: "Sua base está engajada? (abre emails, responde mensagens)"
    options:
      - "Não sei"
      - "Muito pouco (<10% abre)"
      - "Razoável (10-30% abre)"
      - "Bem engajada (>30% abre)"
```

#### Perguntas V4 - VENDER (Conversão)

```yaml
questions:
  - q10: "Quantas vendas você faz por mês?"
    options:
      - "< 5"
      - "5-20"
      - "20-50"
      - "50-100"
      - "> 100"

  - q11: "Qual sua taxa de conversão (vendas / visitantes)?"
    note: "Se não souber, podemos calcular juntos"
    options:
      - "Não sei"
      - "< 1%"
      - "1-3%"
      - "3-5%"
      - "> 5%"

  - q12: "Você tem processo de vendas estruturado?"
    options:
      - "Não, vendo de forma improvisada"
      - "Tenho script/roteiro"
      - "Tenho funil completo"
```

#### Perguntas V5 - SURPREENDER (Experiência)

```yaml
questions:
  - q13: "Seus clientes ficam satisfeitos? Taxa de reclamação:"
    options:
      - "Alta (>20% reclamam)"
      - "Média (5-20% reclamam)"
      - "Baixa (<5% reclamam)"
      - "Quase zero"

  - q14: "Você supera expectativas? (entrega mais que prometeu)"
    options:
      - "Não, entrego só o combinado"
      - "Às vezes"
      - "Sim, sempre"
```

#### Perguntas V6 - TESTEMUNHAR (Prova Social)

```yaml
questions:
  - q15: "Quantos depoimentos em vídeo você tem?"
    options:
      - "Nenhum"
      - "1-5"
      - "5-20"
      - "> 20"

  - q16: "Você coleta depoimentos regularmente?"
    options:
      - "Não"
      - "Às vezes"
      - "Sim, todo cliente"

  - q17: "Seus depoimentos mostram RESULTADOS específicos?"
    options:
      - "Não tenho depoimentos"
      - "São genéricos ('adorei', 'recomendo')"
      - "Mostram resultados específicos (números, antes/depois)"
```

### STEP 3: Análise e Diagnóstico

Com base nas respostas, calcular o "score" de cada V:

```python
scoring_logic:
  v1_atrair:
    traffic_volume: [q1]
    paid_investment: [q2]
    main_source: [q3]
    score: weighted_average()

  v2_conectar:
    leads_per_month: [q4]
    remarketing_setup: [q5]
    cpcx: [q6]
    score: weighted_average()

  v3_relacionar:
    communication_frequency: [q7]
    automation: [q8]
    engagement: [q9]
    score: weighted_average()

  v4_vender:
    sales_volume: [q10]
    conversion_rate: [q11]
    sales_process: [q12]
    score: weighted_average()

  v5_surpreender:
    satisfaction: [q13]
    over_delivery: [q14]
    score: weighted_average()

  v6_testemunhar:
    video_testimonials: [q15]
    collection_process: [q16]
    specific_results: [q17]
    score: weighted_average()
```

### STEP 4: Identificar Gargalo Principal

```yaml
diagnosis_logic:
  if:
    v1_score: < 40
  then:
    primary_bottleneck: "V1 - ATRAIR"
    diagnosis: |
      PROBLEMA: Volume de tráfego insuficiente.

      SEM tráfego, nada mais funciona. É a base da pirâmide.

      RECOMENDAÇÃO:
      1. Se budget < R$500/mês: Foco em orgânico (Instagram, YouTube, TikTok)
      2. Se budget >= R$500/mês: Iniciar tráfego pago (Google ou Facebook)
      3. Usar estratégia de círculos concêntricos (começar específico)
    next_actions:
      - "create-search-campaign.md" (se produto de necessidade)
      - "create-meta-campaign.md" (se produto de desejo)

  if:
    v1_score: >= 40 AND v2_score: < 40
  then:
    primary_bottleneck: "V2 - CONECTAR"
    diagnosis: |
      PROBLEMA: Tráfego está chegando mas você NÃO está capturando contato.

      "O cara entra no seu site, sai e se perdeu. Pra encontrar de novo, paga de novo."

      90% não compram na primeira vez. Se não captura contato, perdeu para sempre.

      RECOMENDAÇÃO:
      1. Instalar pixel de remarketing URGENTE (Facebook, Google)
      2. Criar landing page de captura (oferecer algo de valor)
      3. Configurar pop-up de saída
      4. WhatsApp Business para captura rápida
    next_actions:
      - "setup-remarketing-tags.md"
      - "create-lead-magnet.md"

  if:
    v1_score: >= 40 AND v2_score: >= 40 AND v3_score: < 40
  then:
    primary_bottleneck: "V3 - RELACIONAR"
    diagnosis: |
      PROBLEMA: Você tem tráfego e captura leads, mas NÃO nutre relacionamento.

      Base fria = conversão baixa. Você precisa gerar valor ANTES de vender.

      RECOMENDAÇÃO:
      1. Criar sequência de emails automatizada (mínimo 7 emails)
      2. Conteúdo orgânico regular (3-5x por semana)
      3. Grupo VIP no WhatsApp/Telegram
      4. Lives semanais ou quinzenais
    next_actions:
      - "create-email-sequence.md"
      - "plan-content-calendar.md"

  if:
    v1_score: >= 40 AND v2_score: >= 40 AND v3_score: >= 40 AND v4_score: < 40
  then:
    primary_bottleneck: "V4 - VENDER"
    diagnosis: |
      PROBLEMA: Tráfego OK, leads OK, relacionamento OK, mas vendas FRACAS.

      Ou a oferta está ruim, ou o processo de vendas está quebrado.

      RECOMENDAÇÃO:
      1. Revisar oferta (problema → solução → resultado claro)
      2. Criar script de vendas (se venda por call/WhatsApp)
      3. Testar diferentes CTAs
      4. Reduzir fricção no checkout
    next_actions:
      - "optimize-offer.md"
      - "create-sales-script.md"

  if:
    all_vs_score: >= 40 AND v5_score: < 40
  then:
    primary_bottleneck: "V5 - SURPREENDER"
    diagnosis: |
      PROBLEMA: Vendas acontecem mas clientes não ficam satisfeitos.

      Alto churn (cancelamento) ou boca-a-boca negativo.

      RECOMENDAÇÃO:
      1. Melhorar entrega/produto
      2. Suporte mais ágil
      3. Bônus surpresa pós-venda
      4. Comunidade exclusiva para clientes
    next_actions:
      - "improve-delivery.md"
      - "setup-customer-success.md"

  if:
    all_vs_score: >= 40 AND v6_score: < 40
  then:
    primary_bottleneck: "V6 - TESTEMUNHAR"
    diagnosis: |
      PROBLEMA: Clientes satisfeitos mas sem prova social documentada.

      "Um depoimento vale mais do que você falando do seu próprio produto."

      SEM depoimentos, suas vendas são limitadas. Prova social = conversão 2-3x maior.

      RECOMENDAÇÃO:
      1. Criar processo de coleta (logo após resultado positivo)
      2. Usar celular do cliente (autenticidade > produção)
      3. Perguntas direcionadas (problema → solução → resultado)
      4. Implementar em anúncios e landing pages
    next_actions:
      - "collect-testimonials.md"
      - "create-testimonial-ads.md"
```

### STEP 5: Gerar Plano de Ação Priorizado

```yaml
action_plan:
  priority_1:
    v: "[V identificado como gargalo]"
    actions:
      - action_1: "[Ação específica]"
        deadline: "[Prazo sugerido]"
        difficulty: "[Baixa/Média/Alta]"
      - action_2: "[Ação específica]"
        deadline: "[Prazo sugerido]"
        difficulty: "[Baixa/Média/Alta]"

  priority_2:
    v: "[Segundo V mais crítico]"
    actions:
      - action_1: "[Ação específica]"

  priority_3:
    v: "[Manutenção dos Vs OK]"
    actions:
      - action_1: "[Continuar X, Y, Z]"
```

---

## Output Example

```yaml
business_diagnosis:
  date: "2026-03-02"
  business_name: "Exemplo Consultoria"

  scores_by_v:
    v1_atrair: 65
    v2_conectar: 30  # ← GARGALO
    v3_relacionar: 55
    v4_vender: 45
    v5_surpreender: 70
    v6_testemunhar: 40

  primary_bottleneck:
    v: "V2 - CONECTAR"
    severity: "CRÍTICO"
    diagnosis: |
      Você está gerando tráfego (65/100), mas está PERDENDO 90% dos visitantes.

      Sem captura de contato, cada visitante que sai é dinheiro jogado fora.
      Para encontrar ele de novo, você vai pagar de novo.

      IMPACTO: Você provavelmente está deixando R$5.000-R$10.000/mês na mesa.

  recommended_actions:
    immediate:
      - task: "Instalar pixel de remarketing (Facebook + Google)"
        deadline: "Próximos 3 dias"
        difficulty: "Baixa"
        impact: "ALTO"

      - task: "Criar landing page de captura com oferta irresistível"
        deadline: "Próxima semana"
        difficulty: "Média"
        impact: "ALTO"

      - task: "Configurar pop-up de saída no site"
        deadline: "Próximos 7 dias"
        difficulty: "Baixa"
        impact: "MÉDIO"

    short_term:
      - task: "Criar campanha de remarketing (P1)"
        deadline: "Próximas 2 semanas"
        difficulty: "Média"
        impact: "ALTO"

      - task: "Implementar WhatsApp Business para captura rápida"
        deadline: "Próximas 2 semanas"
        difficulty: "Baixa"
        impact: "MÉDIO"

    maintenance:
      - task: "Continuar gerando tráfego (V1 está OK)"
      - task: "Manter processo de surpresa (V5 está bem)"

  next_steps:
    handoff_to:
      - agent: "tessman-remarketing"
        task: "setup-remarketing-tags.md"
        priority: 1

      - agent: "tessman-copy"
        task: "create-lead-magnet.md"
        priority: 2

  veto_checks:
    - check: "Budget disponível para implementar ações?"
      result: "OK"

    - check: "Capacidade técnica para instalar pixels?"
      result: "OK (ou contratar freelancer)"
```

---

## Completion Criteria

```yaml
diagnosis_complete_when:
  - [ ] Todas as 17 perguntas respondidas
  - [ ] Score calculado para cada um dos 6 Vs
  - [ ] Gargalo principal identificado
  - [ ] Diagnóstico específico gerado
  - [ ] Plano de ação priorizado criado (immediate + short-term + maintenance)
  - [ ] Handoff para próximo agente/task definido
  - [ ] Veto conditions checadas
  - [ ] Output em formato YAML gerado
```

---

## Handoff To

Depende do V identificado como gargalo:

| Gargalo | Próximo Agent | Próxima Task |
|---------|---------------|--------------|
| **V1 - ATRAIR** | `tessman-google-ads` ou `tessman-meta-ads` | `create-search-campaign.md` ou `create-meta-campaign.md` |
| **V2 - CONECTAR** | `tessman-remarketing` | `setup-remarketing-tags.md` |
| **V3 - RELACIONAR** | `tessman-copy` | `create-email-sequence.md` |
| **V4 - VENDER** | `tessman-strategist` | `optimize-offer.md` |
| **V5 - SURPREENDER** | `tessman-strategist` | `improve-delivery.md` |
| **V6 - TESTEMUNHAR** | `tessman-copy` | `collect-testimonials.md` |

---

## Quality Gate

```yaml
diagnosis_quality:
  - [ ] Respostas coletadas com contexto (não apenas número)
  - [ ] Diagnóstico usa linguagem TESSMAN (não genérica)
  - [ ] Ações priorizadas por impacto vs esforço
  - [ ] Handoff claro para próximo agente
  - [ ] Expectativas realistas (não promete milagre)
```

---

*Task: CE_STRATEGY_001 | Agent: tessman-strategist | Version: 1.0*
*Source: Conversão Extrema - Círculo 6V + Diagnóstico de Negócio*
