# platform-selection

## Metadata
```yaml
task_id: CE_STRATEGY_004
agent: tessman-strategist
type: decision-tree
complexity: medium
estimated_time: 20-30min
source: "Conversão Extrema - Google vs Meta + Necessidade vs Desejo Visual + H16 (95/5 Rule) + Jornada Consciência"
```

## Purpose

Aplicar decision tree para escolher entre Google Ads e Meta Ads (ou ambos) baseado em tipo de produto (necessidade vs desejo visual), budget disponível, e integrar com H16 (95/5 Rule: investir em criação E captura de demanda) e Jornada de Consciência.

> **"Encanador, dentista, chaveiro = Google (necessidade). Roupa, curso, decoração = Meta (desejo visual). Se tiver grana, os dois."** — Thiago Tessman

---

## Executor

**Agent:** `tessman-strategist`
**Model:** `sonnet` (requer análise estratégica e decisão)

---

## Elicit

**TRUE** - Esta task EXIGE interação com o usuário para coletar informações sobre produto, público e budget.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Budget < R$300/mês (insuficiente para tráfego pago)"
    action: "HALT - Recomendar tráfego orgânico primeiro (Instagram, TikTok, SEO)"

  - condition: "Produto não validado (zero vendas orgânicas)"
    action: "WARNING - Validar oferta com tráfego orgânico antes de pagar por tráfego"

  - condition: "Landing page não existe ou não converte"
    action: "BLOCK - Criar/otimizar LP antes de escolher plataforma (task: create-landing-page.md)"

  - condition: "Não sabe quem é o público-alvo"
    action: "BLOCK - Definir avatar/ICP antes de escolher plataforma"
```

---

## Steps

### STEP 1: Elicitação — Contexto do Produto e Negócio

```yaml
questions:
  produto_servico:
    - q1: "Qual produto/serviço você vende?"
      tipo: "texto livre"
      exemplos:
        - "Conserto de encanamento"
        - "Curso de marketing digital"
        - "Roupas femininas"
        - "Consultoria financeira"

    - q2: "Seu produto/serviço resolve uma NECESSIDADE ou cria DESEJO?"
      definicoes:
        necessidade: "Cliente BUSCA solução (encanador, dentista, advogado, seguro)"
        desejo: "Cliente DESCOBRE que quer (roupa, curso, decoração, viagem)"
      opcoes:
        - "NECESSIDADE (cliente busca ativamente)"
        - "DESEJO (cliente descobre que quer)"
        - "HÍBRIDO (especificar)"

    - q3: "Seu produto/serviço é VISUAL?"
      definicoes:
        visual: "Foto/vídeo do produto VENDE (roupa, comida, casa, carro)"
        nao_visual: "Benefício abstrato, não há 'foto' que venda (consultoria, seguro, SaaS)"
      opcoes:
        - "SIM (visual é crítico)"
        - "NÃO (benefício abstrato)"
        - "PARCIAL (resultado visual - antes/depois)"

  publico_alvo:
    - q4: "Seu público SABE que precisa do seu produto?"
      contexto_jornada_consciencia:
        nivel_5_mais_consciente: "Sabe que precisa, conhece você (remarketing)"
        nivel_4_consciente_produto: "Sabe que precisa, busca soluções (Google Search)"
        nivel_3_consciente_problema: "Sabe que tem problema, não sabe solução (Google + Meta)"
        nivel_2_consciente_sintoma: "Sente sintomas, não sabe que é problema (Meta Feed)"
        nivel_1_inconsciente: "Não sabe que tem problema (Meta Display, difícil converter)"
      opcoes:
        - "SIM, busca ativamente (nível 4-5)"
        - "SIM, mas não sabe como resolver (nível 3)"
        - "NÃO, precisa descobrir que tem problema (nível 1-2)"

  budget_tempo:
    - q5: "Budget mensal para tráfego pago?"
      tipo: "R$ valor"
      orientacao_minima:
        google_search: "Mínimo R$500/mês (idealmente R$1.500+)"
        meta_ads: "Mínimo R$300/mês (idealmente R$1.000+)"
        ambos: "Mínimo R$1.500/mês (R$1.000 Google + R$500 Meta ou vice-versa)"

    - q6: "Urgência de resultado?"
      opcoes:
        - "IMEDIATO (preciso vendas esta semana)"
        - "CURTO PRAZO (1-2 meses)"
        - "MÉDIO/LONGO PRAZO (3-6 meses)"

  experiencia_anterior:
    - q7: "Já testou tráfego pago antes?"
      opcoes:
        - "Não, nunca"
        - "Sim, Google Ads (resultado: bom/ruim/neutro)"
        - "Sim, Meta Ads (resultado: bom/ruim/neutro)"
        - "Sim, ambos (resultado: especificar)"
```

### STEP 2: Decision Tree — Google vs Meta vs Ambos

```yaml
decision_tree:
  node_1_tipo_produto:
    pergunta: "Produto é NECESSIDADE (cliente busca) ou DESEJO (cliente descobre)?"

    if_necessidade:
      exemplos: "Encanador, dentista, advogado, chaveiro, seguro, contador"
      recomendacao_primaria: "GOOGLE ADS (Search)"
      racional: |
        Cliente BUSCA ativamente. Ele digita "encanador [cidade]" e quer AGORA.
        Google captura essa demanda existente.
      proxima_pergunta: "node_2_budget"

    if_desejo:
      exemplos: "Roupas, cursos online, decoração, viagens, infoprodutos"
      recomendacao_primaria: "META ADS (Facebook/Instagram)"
      racional: |
        Cliente não está buscando. Ele está scrolling, você precisa PARAR o scroll.
        Meta cria demanda mostrando produto/resultado visualmente.
      proxima_pergunta: "node_3_visual"

  node_2_budget:
    contexto: "Produto é NECESSIDADE → Google recomendado"
    pergunta: "Budget permite Google Ads? (mínimo R$500/mês)"

    if_sim_budget_suficiente:
      if_budget_lt_1500:
        recomendacao: "GOOGLE SEARCH APENAS"
        alocacao: "100% Google Search (Rede de Pesquisa)"
        proxima_acao: "tessman-google-ads (create-search-campaign.md)"

      if_budget_gte_1500_and_lt_3000:
        recomendacao: "GOOGLE SEARCH (80%) + META REMARKETING (20%)"
        alocacao:
          google_search: "R$ 1.200"
          meta_remarketing: "R$ 300"
        racional: "Captura demanda (Google) + recupera quem não converteu (Meta P1)"
        proxima_acao: "tessman-google-ads + tessman-remarketing"

      if_budget_gte_3000:
        recomendacao: "GOOGLE (70%) + META (30%) — AMBOS"
        alocacao:
          google_search: "R$ 2.100"
          meta_ads: "R$ 900"
        racional: |
          H16 (95/5 Rule): 95% das pessoas NÃO estão buscando agora.
          Google captura os 5% (demanda ativa).
          Meta cria demanda nos 95% (quem ainda não sabe que precisa).
        proxima_acao: "tessman-google-ads + tessman-meta-ads"

    if_nao_budget_insuficiente:
      recomendacao: "TRÁFEGO ORGÂNICO até juntar budget"
      canais_organicos:
        - "Google Meu Negócio (essencial para local)"
        - "SEO (blog, conteúdo)"
        - "Instagram orgânico (educação + cases)"
        - "Parcerias/indicação"

  node_3_visual:
    contexto: "Produto é DESEJO → Meta recomendado"
    pergunta: "Produto é VISUAL (foto/vídeo vende)?"

    if_sim_visual:
      exemplos: "Roupas, comida, casa, carro, antes/depois estético"
      recomendacao: "META ADS (Instagram Feed + Stories + Reels)"
      racional: "Visual = Meta. Plataforma feita para descoberta visual."
      alocacao_se_budget_baixo:
        meta_apenas: "R$ 300-1.000"
      alocacao_se_budget_alto:
        meta_primario: "60-70%"
        google_display: "30-40% (remarketing visual)"
      proxima_acao: "tessman-meta-ads (create-meta-campaign.md)"

    if_nao_visual:
      exemplos: "Consultoria, SaaS, infoproduto (benefício abstrato)"
      recomendacao: "META ADS (foco em RESULTADO visual, não produto)"
      racional: |
        Produto não é visual, mas RESULTADO pode ser.
        Ex: Curso → mostrar depoimento, antes/depois renda, dashboard.
      criativo_recomendado:
        - "Depoimentos em vídeo (V6)"
        - "Screenshots de resultados"
        - "Antes/depois numérico"
      proxima_pergunta: "node_4_consciencia"

  node_4_consciencia:
    contexto: "Definindo nível de consciência do público"
    pergunta: "Público SABE que precisa ou precisa DESCOBRIR?"

    if_sabe_busca:
      nivel: "4-5 (Consciente Produto/Solução)"
      recomendacao_adicional: "ADICIONAR Google Search"
      racional: "Se público BUSCA, Google captura. Meta sozinho perde vendas fáceis."
      estrategia_dual:
        google: "Capturar quem busca (底 do funil)"
        meta: "Criar demanda em quem ainda não busca (topo do funil)"

    if_nao_sabe:
      nivel: "1-3 (Inconsciente/Sintoma/Problema)"
      recomendacao: "META APENAS (educação + aquecimento)"
      racional: "Público não busca, precisa ser EDUCADO primeiro."
      estrategia:
        fase_1_educacao: "Conteúdo educativo (posts, reels, stories)"
        fase_2_aquecimento: "Remarketing (P1, P2)"
        fase_3_venda: "Oferta para base aquecida"
      ciclo_mais_longo: "2-4 semanas (vs 1 semana Google)"
```

### STEP 3: Integrar H16 — 95/5 Rule

```yaml
h16_integration:
  regra: "95% das pessoas NÃO estão no mercado agora. 5% estão comprando HOJE."

  implicacoes:
    google_ads:
      captura: "5% (demanda ativa)"
      limitacao: "Teto de mercado — não cresce além dos 5%"
      vantagem: "Conversão rápida, alta intenção"

    meta_ads:
      captura: "95% (demanda latente)"
      limitacao: "Ciclo mais longo, precisa educar"
      vantagem: "Mercado 19x MAIOR, cria demanda"

  estrategia_ideal_se_budget_permite:
    google_search:
      alocacao: "40-50% budget"
      objetivo: "Capturar demanda ativa (底 funil)"
      conversao_esperada: "Rápida (1-7 dias)"

    meta_ads:
      alocacao: "50-60% budget"
      objetivo: "Criar demanda (topo/meio funil)"
      conversao_esperada: "Média/longa (7-30 dias)"

  quando_budget_limitado:
    if_produto_necessidade:
      prioridade: "Google (captura 5% primeiro)"
      meta_depois: "Quando sobrar budget"

    if_produto_desejo:
      prioridade: "Meta (criar demanda nos 95%)"
      google_depois: "Se público começar a buscar"

  sinal_de_maturidade:
    criterio: "Quando pessoas começam a buscar sua marca no Google"
    acao: "Adicionar campanha Google Branded (proteger marca)"
```

### STEP 4: Jornada de Consciência + Plataforma

```yaml
jornada_consciencia_mapping:
  nivel_5_mais_consciente:
    descricao: "Conhece você, está decidindo"
    plataforma_ideal: "Remarketing (Google + Meta P1)"
    mensagem: "Oferta, desconto, urgência"

  nivel_4_consciente_produto:
    descricao: "Sabe que precisa, busca soluções"
    plataforma_ideal: "Google Search"
    mensagem: "Sua solução resolve [problema]"
    exemplo_busca: "'melhor curso de marketing digital'"

  nivel_3_consciente_problema:
    descricao: "Sabe problema, não sabe solução"
    plataforma_ideal: "Google Search + Meta (Lookalike)"
    mensagem: "Educar sobre solução"
    exemplo_busca: "'como conseguir mais clientes'"
    exemplo_meta: "Anúncio educando 'X formas de conseguir clientes'"

  nivel_2_consciente_sintoma:
    descricao: "Sente sintomas, não sabe que é problema"
    plataforma_ideal: "Meta Feed/Stories"
    mensagem: "Identificar problema ('Você sabia que X é sinal de Y?')"
    exemplo: "'Gastando em ads sem retorno? Veja 3 erros comuns'"

  nivel_1_inconsciente:
    descricao: "Não sabe que tem problema"
    plataforma_ideal: "Meta Display (difícil converter)"
    mensagem: "Criar consciência (conteúdo viral, storytelling)"
    conversao: "BAIXA — não recomendado para iniciantes"
    alternativa: "Focar em orgânico (Instagram, TikTok) antes de pagar"

  estrategia_multipla:
    se_budget_alto:
      topo_funil: "Meta (níveis 1-2) — consciência + educação"
      meio_funil: "Meta + Google Display (nível 3) — consideração"
      fundo_funil: "Google Search (nível 4) + Remarketing (nível 5) — conversão"
```

### STEP 5: Gerar Recomendação Completa

```yaml
output_structure:
  resumo_contexto:
    produto: "[nome]"
    tipo: "[NECESSIDADE/DESEJO]"
    visual: "[SIM/NAO]"
    consciencia_publico: "[nível 1-5]"
    budget_mensal: "R$ [valor]"
    urgencia: "[IMEDIATA/CURTO/MEDIO PRAZO]"

  recomendacao_primaria:
    plataforma: "[GOOGLE/META/AMBOS]"
    racional: "[Por que esta plataforma]"

  alocacao_budget:
    if_google_apenas:
      google_search: "100% (R$ [valor])"

    if_meta_apenas:
      meta_ads: "100% (R$ [valor])"

    if_ambos:
      google_search: "[%] (R$ [valor])"
      meta_ads: "[%] (R$ [valor])"

  estrategia_detalhada:
    google_se_aplicavel:
      tipo_campanha: "[Search/Display/Remarketing]"
      objetivo: "[Captura demanda ativa]"
      palavra_chave_exemplo: "[keywords]"
      conversao_esperada: "[prazo]"
      handoff: "tessman-google-ads (task: create-search-campaign.md)"

    meta_se_aplicavel:
      tipo_campanha: "[Traffic/Conversion/Engagement]"
      posicionamento: "[Feed/Stories/Reels]"
      criativo_recomendado: "[Ugly Ads/Depoimento/Screenshot]"
      publico: "[Cold/Warm/Lookalike]"
      conversao_esperada: "[prazo]"
      handoff: "tessman-meta-ads (task: create-meta-campaign.md)"

  integracao_h16:
    google: "Captura [X]% demanda ativa (5% mercado)"
    meta: "Cria demanda em [Y]% latente (95% mercado)"
    resultado_combinado: "Cobertura completa do funil"

  jornada_consciencia:
    nivel_publico: "[1-5]"
    plataforma_ideal: "[Google/Meta]"
    mensagem_recomendada: "[Tipo de mensagem]"

  proximo_passo:
    acao_1:
      o_que: "[Criar campanha Google/Meta]"
      quem: "[tessman-google-ads / tessman-meta-ads]"
      prazo: "[dias]"

    acao_2_se_aplicavel:
      o_que: "[Setup remarketing]"
      quem: "tessman-remarketing"
      prazo: "[dias]"

  quando_adicionar_segunda_plataforma:
    criterio: "[Condição específica]"
    exemplo: "Quando Google atingir R$3k/mês budget OU Meta gerar 500+ leads/mês"
```

---

## Output Example

```yaml
recomendacao_plataforma:
  data: "2026-03-06"
  cliente: "Clínica Odontológica Dr. Silva"

  contexto:
    produto: "Serviços odontológicos (limpeza, clareamento, implante)"
    tipo: "NECESSIDADE"
    visual: "PARCIAL (antes/depois)"
    consciencia_publico: "Nível 4 (sabe que precisa, busca dentista)"
    budget_mensal: "R$ 2.000"
    urgencia: "CURTO PRAZO (quer lotar agenda em 60 dias)"

  recomendacao_primaria:
    plataforma: "GOOGLE (70%) + META (30%)"
    racional: |
      Serviço odontológico é NECESSIDADE — pessoas BUSCAM "dentista [cidade]" quando precisam.
      Google captura essa demanda ativa (底 funil).

      Meta complementa criando demanda latente (pessoas que DEVERIAM ir ao dentista mas estão adiando).
      Budget R$2k permite ambos.

  alocacao_budget:
    google_search:
      valor: "R$ 1.400 (70%)"
      objetivo: "Capturar busca ativa"

    meta_ads:
      valor: "R$ 600 (30%)"
      objetivo: "Criar consciência + remarketing"

  estrategia_google:
    tipo_campanha: "Search (Rede de Pesquisa)"
    objetivo: "Conversão (agendamento consulta)"
    palavras_chave_exemplo:
      - "dentista [cidade]"
      - "clareamento dental [cidade]"
      - "implante dentário preço"
      - "dentista urgência [cidade]"
    estrutura:
      - "Campanha 1: Serviços gerais (limpeza, consulta)"
      - "Campanha 2: Alto valor (implante, ortodontia)"
    conversao_esperada: "7-15 dias (busca = intenção alta)"
    cpa_target: "R$ 50-100 por agendamento"
    handoff: "tessman-google-ads (create-search-campaign.md)"

  estrategia_meta:
    tipo_campanha: "Conversão (agendamento) + Remarketing"
    posicionamento: "Instagram Feed + Stories (70% budget Meta)"
    criativo_recomendado:
      - "Antes/depois clareamento (visual)"
      - "Depoimento paciente em vídeo (V6)"
      - "Selfie Dr. Silva explicando procedimento (Ugly Ads)"
    publico:
      cold_30_percent: "Lookalike pacientes + interesse saúde/beleza"
      remarketing_70_percent: "Quem visitou site mas não agendou (P1)"
    conversao_esperada: "14-30 dias (ciclo mais longo, educar)"
    cpa_target: "R$ 70-150 por agendamento"
    handoff: "tessman-meta-ads (create-meta-campaign.md)"

  integracao_h16:
    google_captura: "5% mercado (busca ativa agora)"
    meta_cria: "95% mercado (adiam ida ao dentista)"
    resultado_combinado: |
      Google traz pacientes HOJE.
      Meta educa quem está adiando, traz pacientes AMANHÃ.
      Cobertura completa = agenda lotada sustentável.

  jornada_consciencia:
    google_publico: "Nível 4 (consciente produto, busca dentista)"
    meta_publico: "Nível 2-3 (sabe que deveria ir, está adiando)"
    mensagem_google: "Agende consulta hoje — atendemos urgência"
    mensagem_meta: "Quando foi sua última limpeza? Prevenir é melhor que remediar."

  proximos_passos:
    acao_1:
      o_que: "Criar campanha Google Search"
      quem: "tessman-google-ads"
      prazo: "3 dias"
      entregavel: "Campanha configurada, aguardando aprovação Google"

    acao_2:
      o_que: "Criar campanha Meta (criativos + públicos)"
      quem: "tessman-meta-ads"
      prazo: "5 dias"
      entregavel: "3 criativos (antes/depois, depoimento, ugly ads) + 2 públicos"

    acao_3:
      o_que: "Setup pixel remarketing"
      quem: "tessman-remarketing"
      prazo: "1 dia (paralelo)"
      entregavel: "Pixel instalado, audiência configurada"

  quando_ajustar:
    if_google_cpa_lt_80:
      acao: "Aumentar budget Google (está performando bem)"
      nova_alocacao: "80% Google, 20% Meta"

    if_meta_gerar_100_leads_mes:
      acao: "Aumentar budget Meta (está criando demanda)"
      nova_alocacao: "50% Google, 50% Meta"

    if_agenda_lotada:
      acao: "Pausar Google (demanda ativa resolvida), manter Meta (base)"
```

---

## Completion Criteria

```yaml
recomendacao_complete_when:
  - [ ] Elicitação completa (7 perguntas respondidas)
  - [ ] Tipo produto identificado (necessidade/desejo)
  - [ ] Visual ou não identificado
  - [ ] Consciência público mapeada (nível 1-5)
  - [ ] Budget validado (suficiente para plataforma)
  - [ ] Decision tree aplicada
  - [ ] Recomendação primária definida (Google/Meta/Ambos)
  - [ ] Alocação budget calculada (se ambos)
  - [ ] Estratégia detalhada para cada plataforma
  - [ ] H16 integrado (95/5 rule)
  - [ ] Jornada consciência mapeada
  - [ ] Handoffs definidos (tessman-google-ads / tessman-meta-ads)
  - [ ] Critérios de ajuste futuro especificados
```

---

## Handoff To

Após decisão de plataforma:

| Plataforma | Agent | Task |
|------------|-------|------|
| **Google Ads** | `tessman-google-ads` | `create-search-campaign.md` |
| **Meta Ads** | `tessman-meta-ads` | `create-meta-campaign.md` |
| **Remarketing (ambos)** | `tessman-remarketing` | `setup-remarketing-tags.md` |

---

## Quality Gate

```yaml
recomendacao_quality:
  - [ ] Decisão baseada em TIPO DE PRODUTO (não achismo)
  - [ ] Budget realista (não recomendar ambos se < R$1.500)
  - [ ] Jornada consciência considerada
  - [ ] H16 (95/5) explicado se aplicável
  - [ ] Alocação budget justificada (não 50/50 genérico)
  - [ ] Critérios de ajuste futuro definidos (quando mudar)
  - [ ] Expectativas realistas (prazo conversão, CPA)
```

---

*Task: CE_STRATEGY_004 | Agent: tessman-strategist | Version: 1.0*
*Source: Conversão Extrema - Google vs Meta + Necessidade vs Desejo Visual + H16 (95/5 Rule) + Jornada Consciência*
