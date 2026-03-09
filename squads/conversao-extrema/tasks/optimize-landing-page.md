# optimize-landing-page

## Metadata
```yaml
task_id: CE_COPY_002
agent: tessman-copy
type: audit-optimization
complexity: medium
estimated_time: 30-45min
source: "Conversão Extrema - Audit LP: Cabeça-Corpo-Pernas + H17/H18/H32/H34"
```

## Purpose

Auditar landing page existente contra benchmarks Tessman (H17, H18, H32, H34) e estrutura Cabeça-Corpo-Pernas (50-30-20). Identificar gargalos de conversão e propor otimizações baseadas em dados.

> **"Se sua landing page converte menos de 15%, o problema NÃO é tráfego. É a página."** — Thiago Tessman (H34)

---

## Executor

**Agent:** `tessman-copy`
**Model:** `sonnet` (requer análise crítica e copy)

---

## Elicit

**TRUE** - Esta task EXIGE interação com o usuário para coletar URL da LP e métricas atuais.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "LP tem menos de 100 visitantes (amostra insuficiente)"
    action: "WARNING - Diagnóstico será limitado, aguardar mais tráfego"

  - condition: "LP não está rastreando conversões (sem analytics)"
    action: "HALT - Instalar Google Analytics ou pixel primeiro"

  - condition: "LP está offline ou em manutenção"
    action: "BLOCK - Não é possível auditar"

  - condition: "Conversão > 30% (já está ótima)"
    action: "WARNING - LP já performa acima do benchmark, micro-otimizações apenas"
```

---

## Steps

### STEP 1: Elicitação — Coletar Contexto da LP

```yaml
questions:
  contexto_lp:
    - q1: "URL da landing page?"
      tipo: "url"
      nota: "Para análise visual e técnica"

    - q2: "Qual o objetivo ÚNICO desta LP?"
      opcoes:
        - "Capturar lead (email/WhatsApp)"
        - "Vender produto direto"
        - "Agendar call/reunião"
        - "Outro (especificar)"

    - q3: "Qual o tipo de tráfego que chega na LP?"
      opcoes:
        - "Tráfego frio (Google/Meta Ads)"
        - "Tráfego morno (remarketing)"
        - "Tráfego quente (email, orgânico)"
        - "Misto (especificar proporção)"

  metricas_atuais:
    - q4: "Quantos visitantes a LP teve? (período)"
      tipo: "número + período (ex: 500 nos últimos 30 dias)"

    - q5: "Quantas conversões aconteceram?"
      tipo: "número"

    - q6: "Taxa de conversão atual?"
      calculo: "(conversoes / visitantes) * 100"
      benchmark_referencia:
        servicos_b2b: "15-35% (H34)"
        ecommerce_b2c: "2-5%"
        lead_magnet: "30-50%"

    - q7: "Tempo médio de carregamento da página?"
      opcoes:
        - "Não sei"
        - "< 3 segundos"
        - "3-5 segundos"
        - "> 5 segundos"
      nota: "Cada segundo > 3seg = -6% conversão (H32)"

    - q8: "Qual % de tráfego é mobile?"
      opcoes:
        - "Não sei"
        - "< 30%"
        - "30-60%"
        - "> 60%"
      nota: "Se > 60%, mobile-first é CRÍTICO"

  contexto_adicional:
    - q9: "Você fez algum teste A/B anteriormente?"
      opcoes:
        - "Não"
        - "Sim (especificar o que testou e resultado)"

    - q10: "Principal fonte de feedback negativo? (se houver)"
      opcoes:
        - "Não sei/não tenho"
        - "Usuários dizem que não entenderam oferta"
        - "Usuários dizem que preço é alto"
        - "Usuários dizem que não confiam"
        - "Outro (especificar)"
```

### STEP 2: Audit Checklist — H17 (1 Página, 1 Objetivo)

```yaml
h17_audit:
  regra: "Uma landing page deve ter UM objetivo ÚNICO. Múltiplos CTAs = confusão."

  checks:
    - check_1_cta_unico:
        pergunta: "A LP tem apenas 1 CTA principal?"
        criterios:
          pass: "1 CTA repetido (ok duplicar mesmo CTA)"
          fail: "Múltiplos CTAs (ex: 'Comprar' + 'Saber Mais' + 'Baixar Guia')"
        impacto_se_fail: "Confusão = -30-50% conversão"
        acao_se_fail: "REMOVER todos CTAs secundários. 1 página = 1 ação."

    - check_2_distracao:
        pergunta: "Há links para outras páginas (menu, footer com links)?"
        criterios:
          pass: "Menu mínimo ou zero (LP focada)"
          fail: "Menu completo com 5+ links para sair da página"
        impacto_se_fail: "Cada link de saída = hemorragia de conversão"
        acao_se_fail: "Remover menu. LP não é site institucional."

    - check_3_objetivo_claro:
        pergunta: "Em 5 segundos, está claro qual ação tomar?"
        criterios:
          pass: "CTA visível above the fold, texto de ação claro"
          fail: "CTA escondido, texto genérico ('Clique Aqui')"
        impacto_se_fail: "Usuário não sabe o que fazer = sai"
        acao_se_fail: "CTA above the fold com verbo de ação + benefício"

  score_h17:
    formula: "checks_pass / 3 * 100"
    benchmark:
      pass: "> 66% (2/3 checks)"
      fail: "< 66%"
```

### STEP 3: Audit Checklist — H18 (Teste dos 5 Segundos)

```yaml
h18_audit:
  regra: "Usuário deve entender em 5 SEGUNDOS: O QUÊ você oferece, PARA QUEM é, QUAL AÇÃO tomar."

  teste_simulacao:
    instrucao: |
      Imagine um usuário olhando a LP por 5 segundos APENAS.
      Faça 3 perguntas:

  checks:
    - check_1_o_que:
        pergunta: "Ele entende O QUÊ você oferece?"
        criterios:
          pass: "Headline deixa claro o produto/serviço"
          fail: "Headline vaga ('Transforme seu negócio') sem especificar COMO"
        exemplo_pass: "Mentoria Tráfego Pago - Aprenda Google Ads em 90 Dias"
        exemplo_fail: "Descubra o segredo do sucesso online"
        acao_se_fail: "Reescrever headline com DSOD (Dor + Solução + Objeção + Diferenciação)"

    - check_2_para_quem:
        pergunta: "Ele entende PARA QUEM é?"
        criterios:
          pass: "Subheadline ou copy deixa claro público-alvo"
          fail: "Genérico demais ('para empreendedores')"
        exemplo_pass: "Para dentistas que faturam < R$30k/mês"
        exemplo_fail: "Para quem quer ganhar dinheiro"
        acao_se_fail: "Adicionar linha específica de avatar"

    - check_3_qual_acao:
        pergunta: "Ele sabe QUAL AÇÃO tomar?"
        criterios:
          pass: "CTA visível above the fold, texto claro"
          fail: "CTA below the fold ou texto genérico"
        exemplo_pass: "Agendar Diagnóstico Gratuito" (above the fold)
        exemplo_fail: "Saiba Mais" (below the fold)
        acao_se_fail: "CTA no topo com verbo de ação específico"

  score_h18:
    formula: "checks_pass / 3 * 100"
    benchmark:
      pass: "100% (3/3 checks) — INEGOCIÁVEL"
      fail: "< 100%"
    impacto_se_fail: "Usuário confuso = bounce em 3-5 segundos"
```

### STEP 4: Audit Checklist — H32 (Velocidade de Carregamento)

```yaml
h32_audit:
  regra: "Cada SEGUNDO de carregamento > 3seg = -6% conversão."

  benchmarks:
    ideal: "< 2 segundos"
    aceitavel: "2-3 segundos"
    ruim: "3-5 segundos (já perdendo 6-12% conversão)"
    critico: "> 5 segundos (perdendo 12%+ conversão)"

  checks:
    - check_1_velocidade_desktop:
        ferramenta: "Google PageSpeed Insights (desktop)"
        criterios:
          pass: "Score > 80"
          warning: "Score 50-80"
          fail: "Score < 50"

    - check_2_velocidade_mobile:
        ferramenta: "Google PageSpeed Insights (mobile)"
        criterios:
          pass: "Score > 70"
          warning: "Score 40-70"
          fail: "Score < 40"
        nota: "Mobile geralmente é mais lento, ajustar critério"

    - check_3_largest_contentful_paint:
        metrica: "LCP (Largest Contentful Paint)"
        criterios:
          pass: "< 2.5 segundos"
          warning: "2.5-4 segundos"
          fail: "> 4 segundos"

  causas_comuns_lentidao:
    - "Imagens não otimizadas (PNG/JPG pesados, sem WebP)"
    - "Vídeo hero hospedado no servidor (deve ser YouTube/Vimeo)"
    - "Muitos scripts externos (pixels, chats, popups)"
    - "Fontes web pesadas (> 2 famílias)"
    - "Servidor lento (hosting compartilhado barato)"

  acoes_corretivas:
    - acao: "Comprimir imagens (TinyPNG, WebP)"
      impacto: "Reduz 50-80% tamanho imagens"
    - acao: "Lazy loading para imagens below the fold"
      impacto: "Carrega só quando usuário scrolla"
    - acao: "Hospedar vídeo no YouTube/Vimeo (embed)"
      impacto: "Não sobrecarrega servidor"
    - acao: "Minificar CSS/JS"
      impacto: "Reduz 20-30% peso código"
    - acao: "Remover scripts desnecessários"
      impacto: "Cada script = +0.5-1seg"
    - acao: "Migrar para CDN (Cloudflare)"
      impacto: "Entrega global rápida"

  score_h32:
    formula: "Se LCP < 3seg: PASS, senão FAIL"
    impacto_conversao:
      calculo: "perda_conversao = (LCP - 3) * 6%"
      exemplo: "LCP 5seg = (5-3) * 6% = 12% perda"
```

### STEP 5: Audit Checklist — H34 (Benchmark de Conversão)

```yaml
h34_audit:
  regra: "Landing page de serviços deve converter 15-35%. Se < 10%, algo está QUEBRADO."

  benchmarks_por_tipo:
    servicos_b2b_high_ticket:
      conversao_esperada: "15-35% (captura lead para call)"
      fonte: "H34 - Thiago Tessman"
    ecommerce_b2c:
      conversao_esperada: "2-5% (venda direta)"
      fonte: "Indústria geral"
    lead_magnet_forte:
      conversao_esperada: "30-50% (ebook, checklist)"
      fonte: "Indústria geral"
    webinar_live:
      conversao_esperada: "20-40% (inscrição)"
      fonte: "Indústria geral"

  diagnostico_por_conversao:
    if_conversao_lt_10:
      diagnostico: "CRÍTICO - LP está quebrada"
      investigar:
        - "H18 falhando? (5 segundos test)"
        - "H17 falhando? (múltiplos objetivos)"
        - "H32 falhando? (página lenta)"
        - "Promessa não bate com anúncio (discrepância)"
        - "CTA escondido (below the fold)"
        - "Sem prova social (zero confiança)"

    if_conversao_10_to_15:
      diagnostico: "ABAIXO DO ESPERADO - melhorias necessárias"
      investigar:
        - "Prova social insuficiente (< 3 depoimentos)"
        - "Cabeça fraca (promessa não clara)"
        - "Velocidade lenta (H32)"
        - "Mobile quebrado"

    if_conversao_15_to_25:
      diagnostico: "SAUDÁVEL - otimizações incrementais"
      investigar:
        - "Testar variações de headline (DSOD)"
        - "Adicionar urgência/escassez"
        - "Melhorar prova social (vídeos > texto)"

    if_conversao_25_to_35:
      diagnostico: "ÓTIMO - micro-otimizações apenas"
      investigar:
        - "Testar cores de CTA"
        - "Testar posições de elementos"
        - "A/B test copy variações"

    if_conversao_gt_35:
      diagnostico: "EXCELENTE - foco em ESCALA, não otimização"
      acao: "Manter LP, investir em tráfego"
```

### STEP 6: Audit Estrutura Cabeça-Corpo-Pernas

```yaml
estrutura_audit:
  cabeca_50_percent:
    objetivo: "Promessa + CTA ANTES DA DOBRA"
    checks:
      - check: "Headline DSOD presente?"
        pass: "Dor/Desejo + Solução + Objeção + Diferenciação"
        fail: "Headline genérica ou vaga"
      - check: "CTA above the fold?"
        pass: "Botão visível sem scroll"
        fail: "CTA só aparece após scroll"
      - check: "Hero visual autêntico?"
        pass: "Pessoa real, vídeo, screenshot resultado"
        fail: "Stock photo genérica"
      - check: "Subheadline reforça promessa?"
        pass: "Especificidade (números, prazo, método)"
        fail: "Subheadline ausente ou genérica"

  corpo_30_percent:
    objetivo: "Benefícios + Prova Social"
    checks:
      - check: "3-5 benefícios específicos?"
        pass: "Resultado concreto (não feature)"
        fail: "Features técnicas sem benefício"
      - check: "Prova social presente?"
        tipos_validos:
          - "Vídeos de clientes (melhor)"
          - "Screenshots de resultados"
          - "Depoimentos com nome + foto + resultado"
        fail: "Sem depoimentos OU depoimentos genéricos"
      - check: "'Como funciona' presente?"
        pass: "3-5 passos simples"
        fail: "Processo não explicado (fricção)"

  pernas_20_percent:
    objetivo: "Garantia + Urgência + CTA Final"
    checks:
      - check: "Garantia/reversão de risco?"
        pass: "Presente e clara"
        fail: "Ausente"
      - check: "Urgência GENUÍNA?"
        pass: "Prazo/vagas/bônus real"
        fail: "Sem urgência OU timer fake"
      - check: "CTA final maior que primário?"
        pass: "Botão grande, destaque visual"
        fail: "CTA final igual ou menor"

  score_estrutura:
    formula: "(checks_pass_cabeca + checks_pass_corpo + checks_pass_pernas) / total_checks * 100"
    benchmark:
      pass: "> 75%"
      fail: "< 75%"
```

### STEP 7: Audit Mobile (se > 60% tráfego mobile)

```yaml
mobile_audit:
  regra: "Se > 60% tráfego é mobile, LP DEVE ser mobile-first."

  checks:
    - check_1_above_fold_mobile:
        pergunta: "Above the fold funciona em 375x667 (iPhone SE)?"
        elementos_visiveis:
          - [ ] Headline completa
          - [ ] Subheadline (ao menos 2 linhas)
          - [ ] CTA botão (completo, clicável)
        fail: "Usuário precisa scrollar para ver CTA"

    - check_2_legibilidade:
        pergunta: "Fonte é legível sem zoom?"
        criterios:
          pass: "Fonte mínima 16px corpo, 24px+ headline"
          fail: "Fonte < 14px"

    - check_3_botao_tamanho:
        pergunta: "Botão CTA é grande o suficiente para dedo?"
        criterios:
          pass: "Mínimo 44x44 pixels (Apple guideline)"
          fail: "Botão pequeno, difícil clicar"

    - check_4_formulario_mobile:
        pergunta: "Formulário funciona bem em mobile?"
        criterios:
          pass: "Campos grandes, teclado correto (email, tel), poucos campos"
          fail: "Muitos campos, teclado errado, campos pequenos"

    - check_5_velocidade_mobile:
        pergunta: "LCP mobile < 5seg?"
        criterios:
          pass: "< 5seg"
          fail: "> 5seg"

  score_mobile:
    formula: "checks_pass / 5 * 100"
    benchmark:
      pass: "> 80%"
      fail: "< 80%"
```

### STEP 8: Gerar Relatório de Audit com Priorização

```yaml
output_structure:
  resumo_metricas:
    url: "[URL da LP]"
    objetivo: "[Objetivo único]"
    conversao_atual: "[X]%"
    benchmark_tipo: "[serviços/ecommerce/lead magnet]"
    benchmark_esperado: "[Y-Z]%"
    gap: "[X - Y]% (diferença)"
    visitantes_periodo: "[número]"
    conversoes: "[número]"

  scores_audit:
    h17_1_objetivo: "[X]% (PASS/FAIL)"
    h18_5_segundos: "[X]% (PASS/FAIL)"
    h32_velocidade: "[LCP]seg (PASS/FAIL) — Perda estimada: [X]%"
    h34_conversao: "[X]% vs [Y-Z]% benchmark (PASS/FAIL)"
    estrutura_cabeca_corpo_pernas: "[X]% (PASS/FAIL)"
    mobile_se_aplicavel: "[X]% (PASS/FAIL)"

  problemas_identificados:
    criticos:
      - problema: "[Descrição]"
        impacto: "[Perda estimada de conversão]"
        prioridade: "P0"
        acao: "[O que fazer]"
        esforco: "[Baixo/Médio/Alto]"

    importantes:
      - problema: "[Descrição]"
        impacto: "[Perda estimada de conversão]"
        prioridade: "P1"
        acao: "[O que fazer]"

    melhorias_incrementais:
      - problema: "[Descrição]"
        impacto: "[Ganho estimado]"
        prioridade: "P2"
        acao: "[O que fazer]"

  acoes_priorizadas:
    fase_1_quick_wins:
      objetivo: "Ganhos rápidos (1-3 dias, impacto alto)"
      acoes:
        - acao: "[Específica]"
          impacto_estimado: "[+X]% conversão"
          esforco: "[horas/dias]"

    fase_2_otimizacoes_medio_prazo:
      objetivo: "Melhorias estruturais (1-2 semanas)"
      acoes:
        - acao: "[Específica]"

    fase_3_testes_ab:
      objetivo: "Validar hipóteses (4+ semanas)"
      acoes:
        - teste: "[Variável a testar]"
          hipotese: "[Por que deve melhorar]"

  projecao_impacto:
    conversao_atual: "[X]%"
    conversao_apos_fase_1: "[X + Y]%"
    conversao_apos_fase_2: "[X + Y + Z]%"
    conversao_otima_esperada: "[benchmark]%"

    impacto_negocio:
      visitantes_mes: "[número]"
      conversoes_atual: "[número]"
      conversoes_apos_otimizacao: "[número]"
      ganho_conversoes: "[+número] conversões/mês"
      ganho_receita_estimado: "R$ [valor]/mês (se ticket = R$ [X])"
```

---

## Output Example

```yaml
audit_lp:
  data: "2026-03-06"
  url: "https://exemplo.com/mentoria-trafego"
  objetivo: "Capturar lead (agendar diagnóstico)"
  tipo_benchmark: "Serviços B2B (H34)"

  metricas_atuais:
    visitantes_30d: 450
    conversoes: 45
    conversao: "10% (ABAIXO benchmark 15-35%)"
    trafego_mobile: "65%"
    lcp: "4.2 segundos"

  scores:
    h17: "67% (2/3) - ATENÇÃO"
    h18: "33% (1/3) - FALHA CRÍTICA"
    h32: "FAIL (LCP 4.2seg = -7% conversão)"
    h34: "10% (abaixo benchmark 15-35%) - FAIL"
    estrutura: "60% (9/15) - ABAIXO"
    mobile: "40% (2/5) - CRÍTICO"

  problemas_criticos:
    - problema: "CTA NÃO está above the fold (mobile)"
      impacto: "-20-30% conversão"
      prioridade: "P0"
      acao: "Mover CTA para topo, visível sem scroll"
      esforco: "1-2 horas"

    - problema: "Headline genérica ('Transforme seu negócio com tráfego pago')"
      impacto: "H18 FAIL — usuário não entende O QUÊ em 5seg"
      prioridade: "P0"
      acao: "Reescrever com DSOD: 'Cansado de queimar R$ em ads? Método validado gera ROI 3x em 60 dias para dentistas'"
      esforco: "30 min"

    - problema: "Página lenta (LCP 4.2seg)"
      impacto: "-7% conversão (H32)"
      prioridade: "P0"
      acao: "Comprimir imagens (TinyPNG), hospedar vídeo no YouTube"
      esforco: "2-4 horas"

  problemas_importantes:
    - problema: "Prova social fraca (1 depoimento texto genérico)"
      impacto: "-5-10% conversão"
      prioridade: "P1"
      acao: "Adicionar 3 vídeos depoimento com resultados específicos"
      esforco: "1 semana (coletar depoimentos)"

    - problema: "Menu completo com 7 links (H17)"
      impacto: "-5-10% conversão (distrações)"
      prioridade: "P1"
      acao: "Remover menu, deixar apenas logo"
      esforco: "15 min"

  melhorias_incrementais:
    - problema: "Sem urgência/escassez"
      impacto: "+3-5% conversão"
      prioridade: "P2"
      acao: "Adicionar 'Vagas limitadas: 5 restantes esta semana'"

    - problema: "Sem garantia"
      impacto: "+2-3% conversão"
      prioridade: "P2"
      acao: "Adicionar 'Diagnóstico 100% gratuito, sem compromisso'"

  acoes_priorizadas:
    fase_1_quick_wins:
      prazo: "3 dias"
      acoes:
        - "Mover CTA para above the fold (mobile + desktop)"
        - "Reescrever headline (DSOD)"
        - "Remover menu (H17)"
        - "Comprimir imagens (H32)"
      impacto_estimado: "10% → 15-17% conversão (+5-7%)"

    fase_2_medio_prazo:
      prazo: "2 semanas"
      acoes:
        - "Coletar 3 depoimentos em vídeo"
        - "Adicionar seção 'Como Funciona' (3 passos)"
        - "Adicionar garantia/urgência"
        - "Otimizar formulário mobile (reduzir campos)"
      impacto_estimado: "17% → 22-25% conversão (+5-8%)"

    fase_3_testes_ab:
      prazo: "1-2 meses"
      testes:
        - teste: "Headline variações (3 versões DSOD)"
          hipotese: "Dor diferente pode ressoar mais"
        - teste: "CTA copy ('Agendar' vs 'Começar' vs 'Garantir')"
          hipotese: "Verbo mais urgente converte mais"

  projecao_impacto:
    conversao_atual: "10% (45 conversões/mês)"
    conversao_pos_fase_1: "16% (72 conversões/mês) — +27 conversões"
    conversao_pos_fase_2: "23% (104 conversões/mês) — +59 conversões"
    conversao_alvo: "25-30% (benchmark superior H34)"

    impacto_negocio:
      ticket_medio: "R$ 2.000 (mentoria)"
      receita_atual: "R$ 90.000/mês"
      receita_pos_otimizacao: "R$ 208.000/mês"
      ganho_mensal: "+R$ 118.000/mês"
```

---

## Completion Criteria

```yaml
audit_complete_when:
  - [ ] URL coletada e LP acessível
  - [ ] Métricas atuais coletadas (visitantes, conversões, %)
  - [ ] H17 auditado (1 objetivo)
  - [ ] H18 auditado (5 segundos test)
  - [ ] H32 auditado (velocidade)
  - [ ] H34 auditado (benchmark conversão)
  - [ ] Estrutura Cabeça-Corpo-Pernas auditada
  - [ ] Mobile auditado (se > 60% tráfego)
  - [ ] Problemas identificados e priorizados (P0, P1, P2)
  - [ ] Ações específicas definidas com impacto estimado
  - [ ] Projeção de ganho calculada
  - [ ] Relatório completo gerado
```

---

## Handoff To

Após audit, handoff para implementação:

| Problema | Responsável | Ação |
|----------|-------------|------|
| **Copy (headline, CTA)** | `tessman-copy` | Reescrever copy otimizada |
| **Velocidade (H32)** | Dev/DevOps | Otimizar imagens, CDN, minificar |
| **Prova social** | `tessman-copy` + cliente | Coletar depoimentos vídeo (V6) |
| **Design/estrutura** | Designer | Ajustar layout (CTA posição, mobile) |

---

## Quality Gate

```yaml
audit_quality:
  - [ ] Diagnóstico baseado em DADOS (não achismo)
  - [ ] Benchmarks corretos aplicados (H34 por tipo)
  - [ ] Priorização por impacto vs esforço
  - [ ] Ações específicas (não genéricas tipo "melhorar copy")
  - [ ] Impacto quantificado (% estimado)
  - [ ] Viável implementar (não recomendar reconstruir LP do zero se pequenos ajustes resolvem)
```

---

*Task: CE_COPY_002 | Agent: tessman-copy | Version: 1.0*
*Source: Conversão Extrema - Audit LP: Cabeça-Corpo-Pernas + H17/H18/H32/H34*
