# black-friday-campaign

## Metadata
```yaml
task_id: CE_STRATEGY_003
agent: tessman-strategist
type: campaign-planning
complexity: high
estimated_time: 60-90min
source: "Conversão Extrema - Campanha Black Friday 3 Fases (TT Mind DNA v2.0)"
```

## Purpose

Planejar campanha de Black Friday em 3 fases sequenciais: Fase 1 CAPTURA (1º nov), Fase 2 AQUECIMENTO (até 24-25), Fase 3 VENDA (última sexta). ROI esperado: 3-6 meses de faturamento concentrado em 1 semana.

> **"Black Friday não é sobre desconto. É sobre URGÊNCIA GENUÍNA concentrada. Quem se prepara 1 mês antes, fatura 6 meses."** — Thiago Tessman

---

## Executor

**Agent:** `tessman-strategist`
**Model:** `sonnet` (requer planejamento estratégico complexo)

---

## Elicit

**TRUE** - Esta task EXIGE interação com o usuário para coletar informações sobre produto, base existente e objetivos da campanha.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Campanha iniciada após 15 de novembro"
    action: "HALT - Prazo insuficiente para as 3 fases, recomendar próxima data (Natal, Ano Novo)"

  - condition: "Base de leads ZERO (sem V2 - Conectar)"
    action: "WARNING - Campanha será limitada a tráfego frio, ROI menor. Foco em CAPTURA primeiro"

  - condition: "Produto sem fit com Black Friday (ex: funerária)"
    action: "BLOCK - Black Friday não aplica, sugerir outra estratégia"

  - condition: "Escassez FAKE (sem limite real de vagas/estoque)"
    action: "BLOCK - Urgência deve ser GENUÍNA, nunca inventada"

  - condition: "Servidor/infra não suporta pico de tráfego"
    action: "HALT - Risco de site cair no dia D, preparar infra primeiro"
```

---

## Steps

### STEP 1: Elicitação — Contexto da Campanha

```yaml
questions:
  contexto_negocio:
    - q1: "Qual produto/serviço vai promover na Black Friday?"
      nota: "Pode ser oferta especial diferente do produto principal"

    - q2: "Qual o objetivo principal da campanha?"
      opcoes:
        - "Maximizar faturamento (vendas de ticket médio/alto)"
        - "Capturar base (lead magnet irresistível)"
        - "Liquidar estoque (produto físico)"
        - "Lançar produto novo com desconto early-bird"

    - q3: "Qual o ticket médio do produto/oferta da Black Friday?"
      tipo: "R$ valor"
      nota: "Se desconhecido, estimar"

    - q4: "Faturamento médio mensal atual?"
      tipo: "R$ valor"
      objetivo: "Calcular meta BF (3-6x faturamento mensal em 1 semana)"

  base_existente:
    - q5: "Você tem base de leads existente?"
      opcoes:
        - "Não (começar do zero)"
        - "Sim, menos de 500 leads"
        - "Sim, 500-2000 leads"
        - "Sim, 2000-10000 leads"
        - "Sim, mais de 10000 leads"

    - q6: "Você tem base de CLIENTES (compradores anteriores)?"
      opcoes:
        - "Não (primeiro ano)"
        - "Sim, menos de 50 clientes"
        - "Sim, 50-200 clientes"
        - "Sim, mais de 200 clientes"

    - q7: "Sua base está aquecida? (email open rate >20%)"
      opcoes:
        - "Não sei"
        - "Não (base fria, sem comunicação regular)"
        - "Parcialmente (comunico 1x/mês)"
        - "Sim (comunico 3x+ por semana)"

  oferta_bf:
    - q8: "Qual será o DIFERENCIAL da oferta Black Friday?"
      opcoes:
        - "Desconto % (especificar)"
        - "Bônus exclusivo (especificar)"
        - "Parcelamento especial"
        - "Combo/bundle diferenciado"
        - "Outro (especificar)"
      nota: "NUNCA apenas 'desconto genérico' — precisa ser MEMORÁVEL"

    - q9: "Qual a escassez GENUÍNA?"
      opcoes:
        - "Vagas limitadas (especificar número)"
        - "Estoque limitado (físico)"
        - "Prazo fixo (até 29/11 23:59)"
        - "Bônus limitado (primeiras X pessoas)"
        - "Combinação (especificar)"
      warning: "Escassez FAKE quebra confiança — deve ser verdadeira"

    - q10: "Preço normal vs preço Black Friday?"
      formato: "R$ [normal] → R$ [BF] ([X]% desconto)"

  investimento:
    - q11: "Budget disponível para tráfego pago na campanha?"
      tipo: "R$ valor total"
      distribuicao_sugerida:
        fase_1_captura: "30% do budget (1-20 nov)"
        fase_2_aquecimento: "20% do budget (21-24 nov)"
        fase_3_venda: "50% do budget (25-29 nov)"
```

### STEP 2: Definir Segmentação — Clientes vs Não-Clientes

```yaml
segmentacao_strategy:
  objetivo: "Ofertas diferentes para cada grupo maximizam conversão"

  segmento_1_clientes:
    definicao: "Quem JÁ comprou de você"
    oferta_recomendada:
      - tipo: "Upsell/upgrade exclusivo"
      - desconto: "Menor que não-clientes (15-25%)"
      - bonus: "MAIOR que não-clientes (recompensa lealdade)"
      - urgencia: "Acesso antecipado (23-24 nov, antes da abertura geral)"
    mensagem_chave: "Você é VIP, tem prioridade"
    canal: "Email direto + WhatsApp (se tiver)"

  segmento_2_leads_quentes:
    definicao: "Base de leads que NÃO compraram ainda"
    oferta_recomendada:
      - tipo: "Desconto agressivo para converter"
      - desconto: "30-50%"
      - bonus: "Bônus de quebra de objeção"
      - urgencia: "Black Friday única do ano"
    mensagem_chave: "Última chance de entrar com desconto"
    canal: "Email sequence + Remarketing + WhatsApp broadcast"

  segmento_3_trafego_frio:
    definicao: "Nunca ouviu falar de você"
    oferta_recomendada:
      - tipo: "Lead magnet IRRESISTÍVEL ou oferta tripwire"
      - desconto: "Desconto extremo OU brinde valioso"
      - objetivo: "Capturar contato > vender direto"
    mensagem_chave: "Oferta limitada para quem está conhecendo agora"
    canal: "Google Ads + Meta Ads (P1 + P2 + P3)"

  regra_ouro: |
    CLIENTE paga mais, recebe mais valor (upsell + bônus VIP)
    LEAD paga menos, vira cliente (desconto agressivo)
    FRIO conhece, vira lead (lead magnet ou tripwire)
```

### STEP 3: Planejar Fase 1 — CAPTURA (1º a 20 de novembro)

```yaml
fase_1_captura:
  periodo: "1º novembro a 20 novembro (20 dias)"
  objetivo_primario: "Capturar máximo de leads possível ANTES da venda"
  budget_alocacao: "30% do budget total"

  estrategia:
    1_landing_page_especifica:
      titulo: "LP dedicada 'Pré-Black Friday'"
      estrutura:
        - headline: "Se inscreva AGORA para acesso antecipado à Black Friday"
        - promessa: "Desconto extra de [X]% para inscritos + bônus exclusivo"
        - cta: "Garantir Meu Acesso Antecipado"
        - escassez: "Apenas inscritos terão acesso 24h antes (genuíno)"
      handoff: "tessman-copy (task: create-landing-page.md)"

    2_lead_magnet:
      tipo: "Checklist/guia relacionado ao produto"
      exemplo_consultoria: "'Checklist: 10 erros que matam conversão em ads'"
      exemplo_ecommerce: "'Guia: Como escolher [produto] sem errar'"
      objetivo: "Educar + aquecer para compra"

    3_campanhas_trafego:
      google_ads:
        tipo: "Campanhas de Pesquisa + Display Remarketing"
        copy: "Black Friday [Produto] - Inscreva-se para 50% OFF"
        handoff: "tessman-google-ads (criar campanha captura)"
      meta_ads:
        tipo: "Traffic + Engagement (captura ampla)"
        criativo: "Teaser da oferta (sem revelar tudo)"
        copy: "Black Friday chegando. Acesso antecipado para inscritos."
        handoff: "tessman-meta-ads (criar campanha captura)"

    4_comunicacao_base_existente:
      se_tem_base:
        email_1_anuncio:
          dia: "1º novembro"
          assunto: "Black Friday 2026 confirmada (detalhes dentro)"
          conteudo: "Anunciar data, teaser oferta, link inscrição"
        email_2_lembrete:
          dia: "10 novembro"
          assunto: "10 dias para a Black Friday - já se inscreveu?"
          conteudo: "Reforçar benefício de inscrição antecipada"
        email_3_ultimo_aviso:
          dia: "18 novembro"
          assunto: "Última chance de garantir acesso antecipado"
          conteudo: "Inscrições fecham em 48h"

  metricas_sucesso_fase_1:
    leads_capturados: "Meta: 3-5x base atual ou 500+ leads (se começando do zero)"
    cpcx_target: "< R$20 (B2C) ou < R$50 (B2B)"
    taxa_abertura_emails: "> 30% (se base aquecida)"
```

### STEP 4: Planejar Fase 2 — AQUECIMENTO (21 a 24 de novembro)

```yaml
fase_2_aquecimento:
  periodo: "21 novembro a 24 novembro (4 dias)"
  objetivo_primario: "Nutrir leads, construir ANTECIPAÇÃO, educar sobre oferta"
  budget_alocacao: "20% do budget total"

  frequencia_comunicacao:
    regra: "2-3x por semana (NÃO diário ainda)"
    canais:
      - "Email (primário)"
      - "WhatsApp (se base pequena e permissão)"
      - "Instagram Stories/Feed (orgânico + pago)"

  conteudo_sequence:
    email_1_revelacao:
      dia: "21 novembro (sexta)"
      assunto: "REVELADO: Oferta Black Friday 2026"
      conteudo: |
        - Apresentar oferta completa (produto + desconto + bônus)
        - Mostrar comparação (preço normal vs BF)
        - Listar bônus exclusivos
        - Reforçar escassez genuína
        - CTA: "Lembrete no calendário" (ainda NÃO vende)

    email_2_prova_social:
      dia: "23 novembro (domingo)"
      assunto: "Veja quem já garantiu vaga na Black Friday"
      conteudo: |
        - Depoimentos de clientes anteriores (V6)
        - Cases de resultado (antes/depois)
        - Screenshots/vídeos autênticos
        - Reforçar que abertura é em 25/11 (sexta)

    email_3_educacao:
      dia: "24 novembro (segunda - véspera)"
      assunto: "Amanhã às 8h: Black Friday abre (o que esperar)"
      conteudo: |
        - Timeline: "Amanhã 8h abre, domingo 23:59 fecha"
        - Passo a passo de como garantir vaga
        - FAQ (objeções comuns)
        - Último reforço de escassez (vagas/estoque)
        - CTA: "Preparar forma de pagamento"

  conteudo_organico_paralelo:
    stories_instagram:
      frequencia: "2-3 stories por dia"
      tipos:
        - "Countdown para abertura"
        - "Bastidores da preparação"
        - "Depoimentos de clientes"
        - "Teaser dos bônus"
    feed_posts:
      frequencia: "1 post a cada 2 dias"
      tipos:
        - "Carrossel explicando oferta"
        - "Vídeo curto (reels) com case de sucesso"

  remarketing_intensivo:
    publico:
      - "Quem se inscreveu na Fase 1 mas NÃO abriu emails"
      - "Quem visitou LP mas NÃO converteu"
    campanha:
      - tipo: "Meta Ads Remarketing (P1)"
      - copy: "Black Friday abre em X dias - você está na lista?"
      - criativo: "Countdown + oferta visual"

  metricas_sucesso_fase_2:
    taxa_abertura_emails: "> 40% (expectativa alta)"
    taxa_clique_emails: "> 10%"
    engajamento_stories: "> 20% dos seguidores"
    remarketing_ctr: "> 3%"
```

### STEP 5: Planejar Fase 3 — VENDA (25 a 29 de novembro)

```yaml
fase_3_venda:
  periodo: "25 novembro (sexta 8h) a 29 novembro (terça 23:59)"
  objetivo_primario: "CONVERTER máximo possível com urgência GENUÍNA"
  budget_alocacao: "50% do budget total (MAIOR investimento)"

  timeline_detalhada:
    dia_1_abertura:
      data: "25 novembro (SEXTA - Black Friday oficial)"
      hora_abertura: "8h AM (manhã cedo para pegar disposição alta)"
      comunicacao:
        - canal: "Email URGENTE"
          assunto: "🔥 ABERTO: Black Friday [Produto] - 50% OFF por 5 dias"
          conteudo: |
            - "ESTÁ ABERTO! Link direto para checkout"
            - Reforçar escassez (vagas/estoque/prazo)
            - Mostrar bônus que expiram
            - CTA gigante: "GARANTIR MINHA VAGA AGORA"
        - canal: "WhatsApp Broadcast (se tiver base)"
          mensagem: "🔥 Black Friday ABERTA! Link: [URL]"
        - canal: "Push notification (se app)"
        - canal: "Stories + Feed (orgânico + ads)"

      trafego_pago_intensivo:
        google_ads:
          - "Lances MÁXIMOS (CPC ou tCPA agressivo)"
          - "Campanhas de Conversão (não mais captura)"
          - "Remarketing P1 + P2 full blast"
        meta_ads:
          - "Conversão (otimizar para compra)"
          - "Remarketing total (P1 + P2 + P3)"
          - "Budget SEM LIMITE (se ROI positivo)"

    dia_2_sabado:
      data: "26 novembro (SÁBADO)"
      comunicacao:
        - email_manha:
            assunto: "Você perdeu? Black Friday ainda está aberta (4 dias)"
            conteudo: "Para quem NÃO abriu email de sexta"
        - email_noite:
            assunto: "⏰ 4 dias restantes - [X] vagas preenchidas"
            conteudo: "Atualização de escassez (se vagas, mostrar quantas faltam)"

    dia_3_domingo:
      data: "27 novembro (DOMINGO)"
      comunicacao:
        - email_unico:
            assunto: "Último final de semana com 50% OFF"
            conteudo: "Reforçar que segundona acaba tudo"

    dia_4_segunda:
      data: "28 novembro (SEGUNDA)"
      comunicacao:
        - email_manha:
            assunto: "⚠️ ÚLTIMA SEGUNDA-FEIRA - Black Friday acaba amanhã"
            conteudo: "Penúltimo aviso, criar FOMO"
        - email_tarde:
            assunto: "24 horas para Black Friday acabar"
            conteudo: "Countdown final"

    dia_5_ultima_terca:
      data: "29 novembro (TERÇA - ÚLTIMO DIA)"
      comunicacao:
        - email_1_manha:
            hora: "8h"
            assunto: "🚨 HOJE ACABA: Black Friday encerra às 23:59"
        - email_2_tarde:
            hora: "14h"
            assunto: "10 HORAS: Black Friday fecha para sempre"
        - email_3_final:
            hora: "20h"
            assunto: "🔴 ÚLTIMAS 4 HORAS - Não perca"
            conteudo: |
              - "Esta é a última chance REAL"
              - "Próxima oportunidade apenas em [data futura - ex: Ano Novo]"
              - CTA ENORME: "GARANTIR AGORA ANTES DE ACABAR"

      encerramento:
        hora: "23:59"
        acao: "Desativar checkout/remover oferta"
        pos_encerramento: "Email agradecimento (quem comprou) + email 'perdeu' (quem não comprou)"

  segmentacao_emails_fase_3:
    regra: "Emails DIFERENTES para cada estágio do funil"

    segmento_abriu_nao_comprou:
      conteudo: "Reforçar urgência + quebrar objeção (FAQ, garantia)"

    segmento_nao_abriu:
      conteudo: "Assunto mais FORTE, FOMO extremo"

    segmento_visitou_lp_nao_finalizou:
      conteudo: "Remarketing email: 'Você estava quase lá...'"
      bonus: "Oferecer ajuda (chat, call) se ticket alto"

  pos_venda_imediata:
    email_confirmacao:
      quando: "Imediatamente após compra"
      conteudo: "Obrigado + próximos passos + acesso aos bônus"

    email_upsell:
      quando: "24-48h após compra"
      conteudo: "Oferta complementar (só para quem comprou BF)"

  metricas_sucesso_fase_3:
    conversao_base: "> 10% da base total (leads + clientes)"
    roi_campanha: "> 400% (5x - Black Friday deve ser lucrativa)"
    ticket_medio: "Próximo do normal (desconto compensado por volume)"
    pico_vendas: "Dia 1 (sexta) e Dia 5 (última terça) - esperar 60-70% vendas"
```

### STEP 6: Calcular Projeções e Budget

```yaml
projecoes:
  input_usuario:
    faturamento_mensal: "R$ [valor da elicitação]"
    base_leads: "[número de leads]"
    base_clientes: "[número de clientes]"
    budget_total: "R$ [budget disponível]"

  calculos:
    meta_faturamento_bf:
      conservadora: "3x faturamento mensal"
      realista: "4-5x faturamento mensal"
      otimista: "6x faturamento mensal"
      formula: "faturamento_mensal * multiplicador"

    conversao_esperada:
      clientes_existentes: "15-25% (upsell mais fácil)"
      leads_quentes: "5-10% (desconto agressivo)"
      trafego_frio: "1-3% (descoberta + compra rápida difícil)"

    distribuicao_receita:
      de_clientes: "40-50% da receita BF"
      de_leads: "30-40% da receita BF"
      de_trafego_frio: "10-20% da receita BF"

  exemplo_projecao:
    premissas:
      faturamento_mensal: "R$ 30.000"
      base_leads: "1.000"
      base_clientes: "100"
      ticket_bf: "R$ 500"
      budget_total: "R$ 5.000"

    metas:
      faturamento_bf_alvo: "R$ 120.000 (4x mensal)"
      vendas_necessarias: "240 vendas"

    origem_vendas:
      clientes:
        conversao: "20%"
        vendas: "20 vendas (100 clientes * 20%)"
        receita: "R$ 10.000"
      leads:
        conversao: "8%"
        vendas: "80 vendas (1000 leads * 8%)"
        receita: "R$ 40.000"
      trafego_frio:
        conversao: "2%"
        visitantes_necessarios: "7.000 visitantes (para 140 vendas)"
        receita: "R$ 70.000"
        cac_target: "R$ 35 (R$ 5.000 budget / 140 vendas)"
        roi_necessario: "1400% (14x) - VALIDAR SE REALISTA"

    validacao:
      roi_fase_3: "((R$ 120k - R$ 5k) / R$ 5k) * 100 = 2300% (23x)"
      viabilidade: "SE CAC = R$35 e ticket = R$500, VIÁVEL"
```

### STEP 7: Gerar Plano Completo

Consolidar todas as fases em documento executável:

```markdown
# Plano Black Friday 2026 - [Nome do Negócio]

## Resumo Executivo

- **Meta Faturamento:** R$ [valor] ([X]x faturamento mensal)
- **Período:** 1º novembro a 29 novembro (29 dias, 3 fases)
- **Budget Total:** R$ [valor]
- **Vendas Necessárias:** [número] vendas
- **ROI Esperado:** [X]x

---

## Oferta Black Friday

- **Produto:** [nome]
- **Preço Normal:** R$ [valor]
- **Preço Black Friday:** R$ [valor] ([X]% desconto)
- **Bônus Exclusivos:** [lista]
- **Escassez Genuína:** [vagas/prazo/estoque]
- **Garantia:** [tipo]

---

## Segmentação

### Clientes (Segmento VIP)
- **Quantidade:** [número]
- **Oferta:** [detalhes upsell]
- **Acesso:** Antecipado (23-24 nov)
- **Conversão Esperada:** [X]%

### Leads Quentes
- **Quantidade:** [número]
- **Oferta:** [detalhes desconto]
- **Conversão Esperada:** [X]%

### Tráfego Frio
- **Volume Necessário:** [número] visitantes
- **CAC Target:** R$ [valor]
- **Conversão Esperada:** [X]%

---

## FASE 1: CAPTURA (1-20 nov)

**Objetivo:** Capturar [número] leads

### Ações:
- [ ] Criar LP "Pré-Black Friday" (tessman-copy)
- [ ] Configurar campanhas Google Ads captura
- [ ] Configurar campanhas Meta Ads captura
- [ ] Email 1 (1º nov): Anúncio BF
- [ ] Email 2 (10 nov): Lembrete inscrição
- [ ] Email 3 (18 nov): Último aviso
- [ ] Lead magnet: [título]

**Budget:** R$ [30% do total]
**Meta CPCX:** < R$ [valor]

---

## FASE 2: AQUECIMENTO (21-24 nov)

**Objetivo:** Nutrir leads, construir antecipação

### Ações:
- [ ] Email 1 (21 nov): Revelar oferta completa
- [ ] Email 2 (23 nov): Prova social (depoimentos)
- [ ] Email 3 (24 nov): Véspera (preparar)
- [ ] Stories diários (countdown + bastidores)
- [ ] Post feed (25 nov): Carrossel oferta
- [ ] Remarketing intensivo (quem não abriu)

**Budget:** R$ [20% do total]

---

## FASE 3: VENDA (25-29 nov)

**Objetivo:** Converter máximo com urgência genuína

### Timeline:

**Sexta 25/11 - ABERTURA (8h)**
- [ ] Email ABERTURA (8h)
- [ ] WhatsApp broadcast
- [ ] Stories + Feed (ABERTO)
- [ ] Ativar campanhas conversão (Google + Meta)
- [ ] Budget máximo em ads

**Sábado 26/11**
- [ ] Email manhã (quem não abriu)
- [ ] Email noite (4 dias restantes)

**Domingo 27/11**
- [ ] Email (último fim de semana)

**Segunda 28/11**
- [ ] Email manhã (acaba amanhã)
- [ ] Email tarde (24h)

**Terça 29/11 - ENCERRAMENTO**
- [ ] Email 8h (hoje acaba)
- [ ] Email 14h (10 horas)
- [ ] Email 20h (ÚLTIMAS 4H)
- [ ] 23:59 - FECHAR checkout
- [ ] Email agradecimento (compradores)
- [ ] Email "perdeu" (não compradores)

**Budget:** R$ [50% do total]

---

## Projeção de Resultados

| Segmento | Conversão | Vendas | Receita |
|----------|-----------|--------|---------|
| Clientes | [X]% | [n] | R$ [valor] |
| Leads | [X]% | [n] | R$ [valor] |
| Frio | [X]% | [n] | R$ [valor] |
| **TOTAL** | - | **[n]** | **R$ [valor]** |

**ROI Esperado:** [X]x

---

## Checklist Pré-Campanha

- [ ] LP Black Friday criada e testada (mobile + desktop)
- [ ] Servidor/infra preparado para pico de tráfego
- [ ] Emails escritos e agendados (todos os 10+ emails)
- [ ] Pixels rastreamento instalados (Google + Meta)
- [ ] Campanhas ads configuradas (pausadas, prontas para ativar)
- [ ] Depoimentos/prova social coletados (vídeos + screenshots)
- [ ] Checkout testado (carrinho, pagamento, confirmação)
- [ ] Bônus preparados (acessos, materiais)
- [ ] Garantia definida (termos claros)
- [ ] Escassez genuína confirmada (vagas/estoque REAL)
- [ ] Equipe preparada (suporte, vendas, atendimento)
- [ ] Plano B se infra cair (WhatsApp alternativo)

---

## Handoffs

| Fase | Agent | Task |
|------|-------|------|
| Fase 1 | tessman-copy | create-landing-page.md (LP Pré-BF) |
| Fase 1 | tessman-google-ads | Campanha captura Google |
| Fase 1 | tessman-meta-ads | Campanha captura Meta |
| Fase 2 | tessman-copy | Email sequence (aquecimento) |
| Fase 3 | tessman-google-ads | Campanha conversão Google |
| Fase 3 | tessman-meta-ads | Campanha conversão Meta |

---
```

---

## Output Example

Ver seção STEP 7 acima (plano completo gerado).

---

## Completion Criteria

```yaml
plano_bf_complete_when:
  - [ ] Elicitação completa (11 perguntas respondidas)
  - [ ] Segmentação definida (clientes vs leads vs frio)
  - [ ] Fase 1 planejada (ações + budget + métricas)
  - [ ] Fase 2 planejada (ações + budget + métricas)
  - [ ] Fase 3 planejada (timeline dia-a-dia + emails)
  - [ ] Projeções calculadas (vendas + receita por segmento)
  - [ ] ROI estimado e validado como viável
  - [ ] Checklist pré-campanha gerado
  - [ ] Handoffs definidos para cada fase
  - [ ] Plano completo em formato executável (markdown)
```

---

## Handoff To

Plano Black Friday envolve múltiplos agentes:

| Responsabilidade | Agent | Task |
|------------------|-------|------|
| **Landing Pages** | `tessman-copy` | `create-landing-page.md` |
| **Emails** | `tessman-copy` | Criar sequence completa (10+ emails) |
| **Google Ads** | `tessman-google-ads` | Campanhas Fase 1 (captura) + Fase 3 (conversão) |
| **Meta Ads** | `tessman-meta-ads` | Campanhas Fase 1 (captura) + Fase 3 (conversão) |
| **Remarketing** | `tessman-remarketing` | Configurar P1/P2/P3 para Fase 2 e 3 |

---

## Quality Gate

```yaml
plano_bf_quality:
  - [ ] Escassez é GENUÍNA (não fake timer ou vagas infinitas)
  - [ ] 3 fases bem definidas (não pular captura ou aquecimento)
  - [ ] Segmentação aplicada (clientes ≠ leads ≠ frio)
  - [ ] Timeline realista (mínimo 1 mês de preparo)
  - [ ] ROI conservador (não prometer 50x se histórico é 3x)
  - [ ] Infraestrutura validada (servidor aguenta pico)
  - [ ] Urgência genuína respeitada (fechar REALMENTE em 29/11 23:59)
  - [ ] Comunicação frequente mas não spam (2-3x/semana Fase 2, diário Fase 3)
```

---

*Task: CE_STRATEGY_003 | Agent: tessman-strategist | Version: 1.0*
*Source: Conversão Extrema - Campanha Black Friday 3 Fases (TT Mind DNA v2.0)*
