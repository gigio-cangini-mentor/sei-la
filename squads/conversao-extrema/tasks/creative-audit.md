# creative-audit

## Metadata
```yaml
task_id: CE_META_001
agent: tessman-meta-ads
type: audit
complexity: medium
estimated_time: 30-40min
source: "Conversão Extrema - H28 (Criativo = 50%) + Ugly Ads + DSOD + Creative Fatigue"
```

## Purpose

Auditar criativos de Meta Ads (Facebook/Instagram) contra benchmarks de performance, aplicando conceito de Ugly Ads (autêntico > polido), H28 (criativo = 50% do resultado), DSOD na copy e identificando fadiga de criativo (renovar a cada 15-30 dias).

> **"Criativo é 50% do seu resultado em Meta Ads. Você pode ter segmentação perfeita, oferta boa, mas se o criativo não PARA o scroll, você queimou dinheiro."** — Thiago Tessman (H28 — dado Meta)

---

## Executor

**Agent:** `tessman-meta-ads`
**Model:** `sonnet` (requer análise de métricas e criativo)

---

## Elicit

**TRUE** - Esta task EXIGE interação com o usuário para coletar métricas dos criativos atuais e acesso aos assets.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Criativo tem < 1000 impressões (amostra insuficiente)"
    action: "WARNING - Aguardar mais impressões para diagnóstico preciso"

  - condition: "Sem acesso aos assets (imagens/vídeos)"
    action: "BLOCK - Não é possível auditar visualmente sem ver criativos"

  - condition: "CTR > 5% (já está excelente)"
    action: "WARNING - Criativo já performa bem, foco em manter/escalar"

  - condition: "Campanha pausada ou inativa"
    action: "BLOCK - Não é possível auditar campanha sem dados recentes"
```

---

## Steps

### STEP 1: Elicitação — Coletar Métricas dos Criativos

```yaml
questions:
  contexto_campanha:
    - q1: "Qual plataforma? (Facebook Feed, Instagram Feed, Stories, Reels)"
      opcoes:
        - "Facebook Feed"
        - "Instagram Feed"
        - "Instagram Stories"
        - "Instagram Reels"
        - "Misto (especificar proporção)"
      nota: "Cada posicionamento tem benchmark diferente"

    - q2: "Tipo de criativo?"
      opcoes:
        - "Imagem estática"
        - "Vídeo (especificar duração)"
        - "Carrossel"
        - "Stories (especificar formato)"

    - q3: "Objetivo da campanha?"
      opcoes:
        - "Tráfego (cliques)"
        - "Conversão (vendas/leads)"
        - "Engajamento"
        - "Reconhecimento de marca"

  metricas_criativo:
    - q4: "Impressões do criativo? (período)"
      tipo: "número + período (ex: 50.000 nos últimos 30 dias)"

    - q5: "Cliques?"
      tipo: "número"

    - q6: "CTR (Click-Through Rate)?"
      calculo: "(cliques / impressoes) * 100"
      benchmark_referencia:
        facebook_feed: "1-2% bom, > 2% ótimo"
        instagram_feed: "1-2% bom, > 2% ótimo"
        stories: "0.5-1.5% bom, > 1.5% ótimo"
        reels: "1-3% bom, > 3% ótimo"

    - q7: "CPC (Custo Por Clique)?"
      tipo: "R$ valor"
      benchmark_referencia:
        b2c: "R$0.50-R$3.00"
        b2b: "R$3.00-R$10.00"

    - q8: "Conversões (se campanha de conversão)?"
      tipo: "número"
      nota: "Leads capturados ou vendas realizadas"

    - q9: "Há quanto tempo este criativo está rodando?"
      opcoes:
        - "< 7 dias (novo)"
        - "7-15 dias"
        - "15-30 dias (renovação recomendada)"
        - "30-60 dias (fadiga provável)"
        - "> 60 dias (fadiga CERTA)"
      nota: "Criativos fadigam após 15-30 dias (H28)"

  contexto_visual:
    - q10: "O criativo é 'ugly' (autêntico) ou 'polished' (produzido)?"
      definicoes:
        ugly_ads: "Foto celular, selfie vídeo, screenshot, UGC (User Generated Content)"
        polished: "Produção profissional, stock photo, motion graphics"
      opcoes:
        - "Ugly (autêntico)"
        - "Polished (produzido)"
        - "Híbrido"

    - q11: "Copy do criativo usa DSOD?"
      elementos_dsod:
        - "Dor/Desejo (problema claro)"
        - "Solução (o que resolve)"
        - "Mata Objeção (prova, garantia)"
        - "Diferenciação (por que você, não concorrente)"
      opcoes:
        - "Não sei"
        - "Sim, todos 4 elementos"
        - "Parcial (2-3 elementos)"
        - "Não (copy genérica)"
```

### STEP 2: Audit H28 — Criativo = 50% do Resultado

```yaml
h28_audit:
  regra: "Meta confirmou que criativo é 50% do resultado. Se CTR baixo, problema É o criativo."

  benchmark_ctr_por_posicionamento:
    facebook_feed:
      ruim: "< 1%"
      razoavel: "1-2%"
      bom: "2-3%"
      otimo: "> 3%"

    instagram_feed:
      ruim: "< 1%"
      razoavel: "1-2%"
      bom: "2-3%"
      otimo: "> 3%"

    instagram_stories:
      ruim: "< 0.5%"
      razoavel: "0.5-1%"
      bom: "1-1.5%"
      otimo: "> 1.5%"

    instagram_reels:
      ruim: "< 1%"
      razoavel: "1-2%"
      bom: "2-3%"
      otimo: "> 3%"

  diagnostico_por_ctr:
    if_ctr_ruim:
      diagnostico: "CRIATIVO NÃO PARA O SCROLL"
      causas_possiveis:
        - "Visual genérico (stock photo, sem personalidade)"
        - "Copy não chama atenção (sem gancho)"
        - "Não respeita linguagem da plataforma"
        - "Muito 'anúncio' (usuário ignora)"
      acoes:
        - "Testar Ugly Ads (autêntico > polido)"
        - "Reescrever copy (DSOD)"
        - "Adicionar elemento humano (rosto, pessoa)"
        - "Usar UGC (User Generated Content)"

    if_ctr_razoavel:
      diagnostico: "CRIATIVO OK, mas pode melhorar"
      acoes:
        - "Testar variações (novo gancho, nova imagem)"
        - "A/B test Ugly vs Polished"

    if_ctr_bom_otimo:
      diagnostico: "CRIATIVO PERFORMA BEM"
      acoes:
        - "Manter criativo"
        - "Renovar em 15-30 dias (evitar fadiga)"
        - "Criar variações similares"
```

### STEP 3: Audit Ugly Ads vs Polished

```yaml
ugly_ads_audit:
  conceito: "Anúncios 'feios' (autênticos) performam MELHOR que produzidos em Meta."

  regra: "Usuário quer conteúdo REAL, não publicidade. Quanto mais 'anúncio' parece, menos performa."

  caracteristicas_ugly_ads:
    - "Foto/vídeo de celular (qualidade média)"
    - "Selfie vídeo (pessoa falando direto)"
    - "Screenshot de conversa/resultado"
    - "Behind the scenes (bastidores)"
    - "UGC (cliente usando produto)"
    - "Texto sobre imagem simples (sem design)"

  caracteristicas_polished:
    - "Produção profissional (câmera, iluminação)"
    - "Stock photos (modelos genéricos)"
    - "Motion graphics animados"
    - "Design elaborado (muito Photoshop)"
    - "Trilha sonora produzida"

  diagnostico:
    se_polished_e_ctr_baixo:
      problema: "Criativo muito 'anúncio', usuário ignora"
      acao: "Testar versão Ugly (celular, selfie, screenshot)"
      expectativa: "+50-200% CTR"

    se_ugly_e_ctr_baixo:
      problema: "Não é questão de produção, é copy/oferta"
      acao: "Revisar copy (DSOD) e segmentação"

  exemplo_antes_depois:
    antes:
      tipo: "Stock photo sorrindo + texto 'Transforme seu negócio'"
      ctr: "0.8%"
    depois:
      tipo: "Selfie vídeo 15seg: 'Olha o resultado do meu cliente em 30 dias' + screenshot dashboard"
      ctr: "2.4% (+200%)"
```

### STEP 4: Audit Copy — DSOD Application

```yaml
dsod_audit:
  regra: "Copy do criativo deve seguir DSOD: Dor/Desejo + Solução + Mata Objeção + Diferenciação"

  estrutura_ideal:
    linha_1_gancho:
      funcao: "PARAR O SCROLL (3 palavras críticas)"
      formulas:
        - "Pergunta de dor: 'Cansado de [problema]?'"
        - "Declaração ousada: '[Resultado] em [prazo]'"
        - "Negação comum: 'Você NÃO precisa de [crença falsa]'"
      exemplos:
        - "Gastando em ads sem retorno?" (dor)
        - "ROI 3x em 60 dias?" (desejo)
        - "Tráfego pago SEM queimar dinheiro?" (dor + desejo)

    linha_2_solucao:
      funcao: "Apresentar O QUE resolve"
      estrutura: "Método/Sistema/Fórmula [específico]"
      exemplos:
        - "Método validado em 50+ empresas"
        - "Sistema step-by-step sem enrolação"

    linha_3_mata_objecao:
      funcao: "Quebrar resistência"
      elementos:
        - "Prova social (números, depoimentos)"
        - "Garantia"
        - "Facilidade ('em 7 dias', 'sem experiência')"
      exemplos:
        - "Já gerou R$2M para clientes"
        - "Garantia 30 dias"
        - "Funciona mesmo com R$20/dia"

    linha_4_diferenciacao:
      funcao: "Por que VOCÊ, não concorrente"
      elementos:
        - "Método único"
        - "Especialização (nicho)"
        - "Velocidade"
        - "Suporte diferenciado"
      exemplos:
        - "Único método que usa IA + ChatGPT"
        - "Especialista em dentistas (12 anos)"
        - "Campanha no ar em 48h"

    cta:
      funcao: "Ação clara + benefício"
      formato: "[Verbo] + [Benefício]"
      exemplos:
        - "Agendar Diagnóstico Gratuito"
        - "Baixar Checklist Agora"
        - "Garantir 50% OFF (expira hoje)"
      evitar:
        - "Saiba Mais"
        - "Clique Aqui"
        - "Ver Mais"

  audit_checklist:
    - check: "Primeira linha PARA o scroll?"
      pass: "Gancho forte (dor/desejo)"
      fail: "Genérica ou sem gancho"

    - check: "Solução específica presente?"
      pass: "Método/Sistema nomeado"
      fail: "Vago ('melhore seu negócio')"

    - check: "Mata objeção?"
      pass: "Prova social, garantia, facilidade"
      fail: "Sem quebra de objeção"

    - check: "Diferenciação clara?"
      pass: "Por que você ≠ concorrência"
      fail: "Genérico (qualquer um poderia dizer)"

    - check: "CTA com verbo de ação?"
      pass: "Verbo + benefício"
      fail: "'Saiba Mais' ou similar"

  score_dsod:
    formula: "checks_pass / 5 * 100"
    benchmark:
      pass: "> 80% (4-5 elementos)"
      fail: "< 80%"
```

### STEP 5: Audit Creative Fatigue (Fadiga de Criativo)

```yaml
creative_fatigue_audit:
  regra: "Criativos fadigam após 15-30 dias. Frequência alta + mesma mensagem = usuário ignora."

  sintomas_fadiga:
    - "CTR caindo semana a semana (mesmo budget/segmentação)"
    - "CPC subindo (Meta precisa forçar mais para conseguir clique)"
    - "Frequência > 3 (mesma pessoa viu 3+ vezes)"
    - "Engajamento negativo subindo (ocultar anúncio, reportar)"

  diagnostico_por_tempo:
    if_0_to_7_dias:
      status: "NOVO - aguardar aprendizado"
      acao: "Deixar rodar, coletar dados"

    if_7_to_15_dias:
      status: "VALIDAÇÃO - já tem dados suficientes"
      acao: "Se CTR > benchmark, continuar. Se < benchmark, pausar e testar novo."

    if_15_to_30_dias:
      status: "RENOVAÇÃO RECOMENDADA"
      acao: "Mesmo se performando bem, preparar próxima versão"
      racional: "Evitar fadiga antes de acontecer"

    if_30_to_60_dias:
      status: "FADIGA PROVÁVEL"
      sintomas_esperados: "CTR caindo, CPC subindo"
      acao: "SUBSTITUIR criativo URGENTE"

    if_gt_60_dias:
      status: "FADIGA CERTA"
      diagnostico: "Criativo está morto, queimando budget"
      acao: "PAUSAR imediatamente, rodar novo criativo"

  renovacao_strategy:
    quando: "A cada 15-30 dias (ANTES da fadiga)"
    como:
      - "Mesmo conceito, visual DIFERENTE"
      - "Mesmo visual, copy DIFERENTE"
      - "Mudar gancho (nova dor, novo desejo)"
      - "Mudar formato (imagem → vídeo, feed → stories)"
    exemplo:
      criativo_1: "Foto produto + 'Transforme X em Y'"
      criativo_2: "Vídeo depoimento cliente + 'Veja resultado real'"
      criativo_3: "Screenshot dashboard + 'ROI 3x em 60 dias'"
```

### STEP 6: Audit Customização por Posicionamento

```yaml
positioning_audit:
  regra: "Feed (1:1) ≠ Stories (9:16). Reels ≠ Feed. Customizar criativo para cada posicionamento."

  facebook_instagram_feed:
    formato_ideal: "1:1 (quadrado) ou 4:5 (vertical leve)"
    duracao_video: "6-15 segundos (até 60seg ok se engajante)"
    copy: "Primeiras 2 linhas CRÍTICAS (resto é 'ver mais')"
    hook: "Primeiro frame deve ser impactante (usuário decide em 0.5seg)"

  instagram_stories:
    formato_ideal: "9:16 (vertical full screen)"
    duracao_video: "5-15 segundos (Stories são rápidas)"
    copy: "MÍNIMA (texto sobre vídeo, não caption longa)"
    interatividade: "Usar stickers (enquete, quiz, CTA 'deslizar')"
    autenticidade: "Stories são mais 'cru' — ugly ads performa MUITO bem"

  instagram_reels:
    formato_ideal: "9:16 (vertical)"
    duracao_video: "7-30 segundos (ideal 15seg)"
    hook: "PRIMEIRO SEGUNDO é tudo (80% desistem se não prender)"
    copy: "Texto sobre vídeo + caption com CTA"
    tendencias: "Usar áudio trending (não silencioso)"
    formato: "Educativo > vendedor (ex: '3 erros em X', 'Como fazer Y')"

  audit_checklist:
    - check: "Formato correto para posicionamento?"
      pass: "1:1 feed, 9:16 stories/reels"
      fail: "Formato errado (imagem cortada)"

    - check: "Duração adequada?"
      pass: "< 15seg stories, < 30seg reels, < 60seg feed"
      fail: "Vídeo muito longo (abandono)"

    - check: "Hook forte no primeiro segundo?"
      pass: "Frame inicial impactante"
      fail: "Intro lenta (logo, fade in)"

    - check: "Copy adaptada?"
      pass: "Curta em stories, detalhada em feed"
      fail: "Mesma copy em todos posicionamentos"
```

### STEP 7: Gerar Relatório de Audit + Recomendações

```yaml
output_structure:
  resumo_criativo:
    plataforma: "[Facebook/Instagram]"
    posicionamento: "[Feed/Stories/Reels]"
    tipo: "[Imagem/Vídeo/Carrossel]"
    duracao_se_video: "[X segundos]"
    tempo_rodando: "[X dias]"

  metricas:
    impressoes: "[número]"
    cliques: "[número]"
    ctr: "[X]%"
    cpc: "R$ [valor]"
    conversoes_se_aplicavel: "[número]"
    frequencia: "[X]"

  scores_audit:
    h28_ctr: "[X]% (RUIM/RAZOÁVEL/BOM/ÓTIMO)"
    ugly_vs_polished: "[Ugly/Polished] — [adequado/inadequado]"
    dsod_copy: "[X]% (score 0-100)"
    fadiga: "[NOVO/VALIDAÇÃO/RENOVAR/FADIGA/MORTO]"
    posicionamento: "[adequado/inadequado]"

  problemas_identificados:
    criticos:
      - problema: "[Descrição]"
        impacto: "[Perda de performance]"
        prioridade: "P0"
        acao: "[O que fazer]"

    importantes:
      - problema: "[Descrição]"
        prioridade: "P1"
        acao: "[O que fazer]"

  recomendacoes_novos_criativos:
    conceito_1:
      formato: "[Imagem/Vídeo]"
      conceito: "[Descrição da ideia]"
      copy_sugerida: "[Texto DSOD completo]"
      por_que: "[Hipótese de por que vai performar]"

    conceito_2:
      formato: "[Imagem/Vídeo]"
      conceito: "[Descrição]"
      copy_sugerida: "[Texto]"

    conceito_3:
      formato: "[Imagem/Vídeo]"
      conceito: "[Descrição]"
      copy_sugerida: "[Texto]"

  cronograma_renovacao:
    acao_imediata:
      - "[Pausar criativo X se fadiga]"
    proximos_7_dias:
      - "[Criar e testar conceito 1, 2, 3]"
    proximos_15_dias:
      - "[Renovar criativo atual mesmo se performando]"
    manutencao_continua:
      - "[Renovar a cada 15-30 dias, monitorar CTR semanal]"
```

---

## Output Example

```yaml
audit_criativo:
  data: "2026-03-06"
  campanha: "Mentoria Tráfego Pago - Conversão"
  plataforma: "Instagram Feed"
  criativo_id: "IMG_001"

  resumo:
    tipo: "Imagem estática"
    formato: "1:1 (quadrado)"
    tempo_ativo: "45 dias"

  metricas:
    impressoes: 78000
    cliques: 780
    ctr: "1.0% (benchmark 1-2% = RAZOÁVEL)"
    cpc: "R$ 4.50 (benchmark R$3-R$10 B2B = OK)"
    conversoes: 45
    frequencia: 4.2

  scores:
    h28_ctr: "RAZOÁVEL (1.0%, pode melhorar)"
    tipo_criativo: "POLISHED (stock photo) — INADEQUADO"
    dsod_copy: "40% (2/5 elementos) — FALHA"
    fadiga: "MORTO (45 dias + freq 4.2) — CRÍTICO"
    posicionamento: "ADEQUADO (1:1 para feed)"

  problemas_criticos:
    - problema: "Criativo com 45 dias — FADIGA SEVERA"
      impacto: "CTR provavelmente caiu 30-50% vs início"
      prioridade: "P0"
      acao: "PAUSAR imediatamente, substituir por novo criativo"
      esforco: "Imediato"

    - problema: "Stock photo genérica (modelo sorrindo)"
      impacto: "Usuário ignora como 'anúncio'"
      prioridade: "P0"
      acao: "Substituir por Ugly Ads (selfie vídeo ou screenshot)"

    - problema: "Copy genérica — DSOD 40% (falta dor, diferenciação)"
      copy_atual: "'Aprenda tráfego pago e transforme seu negócio. Clique e saiba mais.'"
      impacto: "Não PARA o scroll"
      prioridade: "P0"
      acao: "Reescrever com DSOD completo"

  recomendacoes_novos_criativos:
    criativo_1_ugly_video:
      formato: "Vídeo 15seg (selfie)"
      conceito: "Você falando direto para câmera + screenshot resultado cliente"
      copy_dsod: |
        [GANCHO - DOR]
        Cansado de queimar R$ em Google Ads sem saber se funciona?

        [SOLUÇÃO]
        Método validado gerou ROI 3x em 60 dias para +50 dentistas

        [MATA OBJEÇÃO]
        Mesmo começando com R$20/dia

        [DIFERENCIAÇÃO]
        Único que usa ChatGPT + Google Ads juntos

        [CTA]
        Agendar Diagnóstico Gratuito (link bio)
      por_que: "Ugly Ads (selfie) + DSOD completo + nicho específico (dentistas) = deve dobrar CTR"

    criativo_2_screenshot:
      formato: "Imagem (screenshot dashboard)"
      conceito: "Dashboard Google Ads mostrando ROI 3x + anotações manuscritas"
      copy_dsod: |
        [GANCHO]
        R$3.000 investidos → R$9.000 faturados em 45 dias

        [SOLUÇÃO]
        Sistema de Google Ads para serviços locais

        [MATA OBJEÇÃO]
        Funciona mesmo em cidade pequena

        [DIFERENCIAÇÃO]
        Campanha no ar em 7 dias (não 30)

        [CTA]
        Quero Isso → Link na Bio
      por_que: "Prova visual (screenshot) + resultado numérico específico = alta confiança"

    criativo_3_depoimento:
      formato: "Vídeo 20seg (cliente depoimento)"
      conceito: "Cliente falando resultado (celular, autêntico)"
      copy_dsod: |
        [GANCHO]
        'Antes: 2 pacientes/mês. Depois: 15 pacientes/mês'

        [SOLUÇÃO]
        João (dentista SP) usou método Tráfego + ChatGPT

        [MATA OBJEÇÃO]
        Resultado em 45 dias (sem experiência em ads)

        [DIFERENCIAÇÃO]
        Suporte direto no WhatsApp

        [CTA]
        Começar Agora (50% OFF expira hoje)
      por_que: "Depoimento autêntico (V6) + resultado específico = prova social forte"

  cronograma:
    hoje:
      - "PAUSAR criativo atual (IMG_001)"
      - "Criar criativos 1, 2, 3"
    proximos_3_dias:
      - "Lançar criativo 1 (teste rápido)"
      - "Lançar criativo 2 e 3 (se orçamento permite, paralelo)"
    proximos_7_dias:
      - "Analisar qual criativo performa melhor (CTR, CPC)"
      - "Pausar perdedores, escalar vencedor"
    dia_15:
      - "Renovar criativo vencedor (variação similar, evitar fadiga)"
    manutencao:
      - "Monitorar CTR semanalmente"
      - "Renovar a cada 20-25 dias (antes de fadigar)"

  projecao_impacto:
    ctr_atual: "1.0%"
    ctr_esperado_novo_criativo: "2.0-2.5% (dobro)"
    impacto_cliques:
      impressoes_mes: "78.000"
      cliques_atual: "780"
      cliques_novo: "1.560-1.950 (+100-150%)"
    impacto_conversoes:
      conversoes_atual: "45"
      conversoes_novo: "90-112 (+100-150%)"
```

---

## Completion Criteria

```yaml
audit_complete_when:
  - [ ] Métricas coletadas (impressões, cliques, CTR, CPC)
  - [ ] H28 auditado (CTR vs benchmark)
  - [ ] Ugly vs Polished identificado
  - [ ] DSOD auditado (copy score)
  - [ ] Fadiga diagnosticada (tempo ativo + frequência)
  - [ ] Posicionamento validado (formato correto)
  - [ ] Problemas identificados e priorizados
  - [ ] 3 novos conceitos de criativo propostos (com copy DSOD completa)
  - [ ] Cronograma de renovação definido
  - [ ] Projeção de impacto calculada
```

---

## Handoff To

Após audit, handoff para criação:

| Ação | Responsável | Task |
|------|-------------|------|
| **Criar novos criativos** | Designer / Videomaker | Executar conceitos 1, 2, 3 |
| **Copy DSOD** | `tessman-copy` | Finalizar copy dos criativos |
| **Lançar campanhas** | `tessman-meta-ads` | Configurar e ativar novos criativos |
| **Coletar depoimentos** | Cliente + `tessman-copy` | Se usar criativo 3 (depoimento) |

---

## Quality Gate

```yaml
audit_quality:
  - [ ] Diagnóstico baseado em DADOS (CTR, CPC, frequência)
  - [ ] Benchmarks corretos aplicados (por posicionamento)
  - [ ] Conceitos novos SÃO DIFERENTES (não variações mínimas)
  - [ ] Copy DSOD completa em cada conceito (4 elementos)
  - [ ] Ugly Ads recomendado se polished não performa
  - [ ] Cronograma realista (não prometer 10 criativos em 1 dia)
```

---

*Task: CE_META_001 | Agent: tessman-meta-ads | Version: 1.0*
*Source: Conversão Extrema - H28 (Criativo = 50%) + Ugly Ads + DSOD + Creative Fatigue*
