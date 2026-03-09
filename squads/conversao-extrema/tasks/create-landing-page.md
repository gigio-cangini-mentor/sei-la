# create-landing-page

## Metadata
```yaml
task_id: CE_COPY_001
agent: tessman-copy
type: creation
complexity: high
estimated_time: 45-60min
source: "Conversão Extrema - Cabeça-Corpo-Pernas + DSOD + H17/H18/H32/H34"
```

## Purpose

Criar landing page de alta conversão usando a estrutura Cabeça-Corpo-Pernas com a fórmula DSOD (Dor/Desejo + Solução + Mata Objeção + Diferenciação) para headlines. Benchmark de conversão: 15-35% para serviços (TT-H34).

> **"Uma página, um objetivo. Se tem dois botões, já tá errado."** — Thiago Tessman (H17)

---

## Executor

**Agent:** `tessman-copy`
**Model:** `sonnet` (requer criação de copy persuasiva)

---

## Elicit

**TRUE** - Esta task EXIGE interação com o usuário para coletar informações sobre a oferta, público e objetivo da landing page.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Oferta não validada (nenhum cliente ainda)"
    action: "HALT - Validar oferta primeiro com vendas orgânicas"

  - condition: "Múltiplos objetivos na mesma página"
    action: "BLOCK - H17 INEGOCIÁVEL: 1 página = 1 objetivo"

  - condition: "Sem prova social disponível (zero depoimentos)"
    action: "WARNING - Conversão será limitada, coletar urgente (V6)"

  - condition: "Promessa genérica ou exagerada (sem suporte)"
    action: "BLOCK - Promessa deve ser específica e defensável"
```

---

## Steps

### STEP 1: Elicitação — Coletar Informações da Oferta

```yaml
questions:
  - q1: "Qual é o produto/serviço que você está oferecendo?"
    note: "Nome + descrição breve"

  - q2: "Qual é o ÚNICO objetivo desta landing page?"
    options:
      - "Capturar lead (email/WhatsApp)"
      - "Vender produto/serviço direto"
      - "Agendar call/reunião"
      - "Outro (especificar)"
    validation: "APENAS 1 objetivo permitido (H17)"

  - q3: "Qual é o principal problema/dor do seu público?"
    note: "Seja específico - quanto mais doloroso, melhor"
    examples:
      - "Perder clientes para concorrentes"
      - "Trabalhar 12h/dia sem crescer"
      - "Gastar em ads sem retorno"

  - q4: "Qual é o desejo por trás dessa dor?"
    note: "O que eles REALMENTE querem alcançar?"
    examples:
      - "Ter previsibilidade de vendas"
      - "Trabalhar 4h/dia e lucrar mais"
      - "ROI de 3x em tráfego pago"

  - q5: "Qual é a sua solução?"
    note: "Como você resolve essa dor de forma única?"

  - q6: "Qual é a PRINCIPAL objeção que impede a conversão?"
    options:
      - "Preço muito alto"
      - "Não confia que funciona"
      - "Não tem urgência"
      - "Não sabe se é pra ele"
      - "Outra (especificar)"

  - q7: "O que te diferencia da concorrência?"
    note: "Método único, garantia, velocidade, resultados?"

  - q8: "Você tem depoimentos em vídeo?"
    options:
      - "Não tenho"
      - "Sim, 1-5 vídeos"
      - "Sim, 5-20 vídeos"
      - "Sim, mais de 20"
    note: "Vídeos autênticos convertem 2-3x mais (V6)"

  - q9: "Você tem garantia ou reversão de risco?"
    options:
      - "Não tenho"
      - "Garantia de reembolso (X dias)"
      - "Garantia de resultado"
      - "Outra (especificar)"

  - q10: "Qual é a escassez GENUÍNA?"
    note: "Vagas limitadas? Data de fechamento? Bônus temporário?"
    warning: "NUNCA inventar escassez falsa - quebra confiança"
```

### STEP 2: Estruturar Cabeça-Corpo-Pernas

#### CABEÇA (50% da página) — INEGOCIÁVEL

```yaml
cabeca_section:
  percentual_pagina: 50%
  objetivo: "Prometer resultado + CTA antes da dobra"
  elementos_obrigatorios:
    - headline_dsod:
        formula: "Dor/Desejo + Solução + Mata Objeção + Diferenciação"
        exemplo: |
          [DOR] Cansado de gastar em tráfego sem retorno?
          [SOLUÇÃO] Descubra o método exato que gerou R$300k
          [MATA OBJEÇÃO] em 90 dias para +50 empresas
          [DIFERENCIAÇÃO] usando apenas Google Ads + ChatGPT

    - subheadline:
        objetivo: "Reforçar promessa com ESPECIFICIDADE"
        exemplo: "Sistema step-by-step validado em 12 nichos diferentes"

    - cta_primario:
        posicao: "ANTES DA DOBRA (H17)"
        texto_acao: "Verbo de ação + benefício claro"
        exemplos:
          - "Agendar Diagnóstico Gratuito"
          - "Começar Agora (Sem Cartão)"
          - "Garantir Minha Vaga"
        warning: "NUNCA usar 'Saiba Mais' ou 'Clique Aqui'"

    - hero_image_video:
        tipo: "Pessoa real > stock photo"
        opcoes:
          - "Vídeo do especialista (30-60 seg)"
          - "Foto autêntica com cliente"
          - "Screenshot de resultado"

  regras_h18:
    teste_5_segundos: |
      Usuário deve entender em 5 SEGUNDOS:
      1. O QUE você oferece
      2. PARA QUEM é
      3. QUAL AÇÃO tomar
    validation: "Se precisar ler mais de 1 parágrafo, FALHOU"
```

#### CORPO (30% da página)

```yaml
corpo_section:
  percentual_pagina: 30%
  objetivo: "Benefícios + Prova Social"
  elementos:
    - beneficios:
        quantidade: "3-5 benefícios específicos"
        formato: "Resultado concreto (não feature)"
        estrutura_cada_beneficio:
          - icone_visual: "✓ ou emoji relevante"
          - titulo_beneficio: "Resultado específico"
          - explicacao_curta: "Como/por que funciona (1-2 linhas)"
        exemplo: |
          ✓ ROI de 3x em 60 dias
          Método validado que otimiza cada centavo investido em ads

    - prova_social:
        ordem_prioridade:
          1: "Vídeos de clientes (autênticos > produzidos)"
          2: "Screenshots de resultados (antes/depois, dashboards)"
          3: "Logos de clientes (se B2B)"
          4: "Números agregados ('+500 clientes', 'R$2M gerados')"
        regra_v6: |
          Depoimentos DEVEM mostrar:
          - Nome real + foto
          - Problema específico
          - Resultado numérico
          - Timeline (quanto tempo)

    - como_funciona:
        formato: "3-5 passos simples"
        objetivo: "Desmistificar processo, reduzir fricção"
        estrutura:
          - passo_1: "Ação inicial (ex: preencher formulário)"
          - passo_2: "O que acontece (ex: diagnóstico gratuito)"
          - passo_3: "Resultado final (ex: campanha no ar)"
```

#### PERNAS (20% da página)

```yaml
pernas_section:
  percentual_pagina: 20%
  objetivo: "Garantia + Urgência + CTA final"
  elementos:
    - garantia_reversao_risco:
        tipos:
          - "Garantia incondicional X dias"
          - "Garantia de resultado ou dinheiro de volta"
          - "Teste grátis por X dias"
        apresentacao: |
          [ÍCONE DISTINTIVO]
          Garantia de [X]
          Explicação de como funciona (1-2 linhas)
          Reforçar que risco é ZERO

    - urgencia_genuina:
        tipos_validos:
          - "Vagas limitadas (se realmente limitado)"
          - "Bônus expira em [data]"
          - "Preço sobe em [data]"
          - "Turma fecha em [data]"
        warning: "NUNCA timer fake ou 'últimas vagas' sem limite real"
        formato: |
          [ELEMENTO VISUAL - countdown ou badge]
          Prazo claro + consequência de perder

    - cta_final:
        posicao: "Após garantia + urgência"
        formato: "Botão MAIOR que CTA primário"
        texto: "Reforçar benefício principal"
        exemplo: "Sim, Quero Triplicar Meu ROI"

    - faq_opcional:
        quando_usar: "Se objeções frequentes não foram cobertas"
        quantidade: "Máximo 5 perguntas"
        formato: "Pergunta direta + resposta objetiva"
```

### STEP 3: Aplicar Regras de Performance (H32, H34)

```yaml
performance_rules:
  h32_velocidade_carregamento:
    benchmark: "Cada segundo = -6% conversão"
    limite_aceitavel: "< 3 segundos (desktop), < 5 segundos (mobile)"
    checklist:
      - [ ] Imagens otimizadas (WebP, lazy loading)
      - [ ] Vídeos hospedados externamente (YouTube, Vimeo)
      - [ ] CSS/JS minificados
      - [ ] Fontes web otimizadas (máximo 2 famílias)
      - [ ] Remover scripts desnecessários (trackers, widgets)

  h34_benchmark_conversao:
    tipo_oferta: "Serviços B2B/B2C"
    conversao_esperada:
      pessimista: "15%"
      realista: "20-25%"
      otimista: "30-35%"
    validation: |
      Se conversão < 10% após 100 visitantes:
      → Revisar CABEÇA (promessa unclear)
      → Revisar PROVA SOCIAL (insuficiente)
      → Revisar CTA (fricção alta)

  whatsapp_alternativo:
    objetivo: "Canal de conversão para quem não converte no CTA principal"
    posicao: "Widget flutuante (canto inferior direito)"
    mensagem_pre_preenchida: |
      Olá! Vim da página [OFERTA] e gostaria de [OBJETIVO]
```

### STEP 4: Validação Above the Fold (H17 + H18)

```yaml
above_the_fold_validation:
  h17_um_objetivo:
    check: "Tem apenas 1 CTA principal?"
    veto_if: "Múltiplos botões com ações diferentes"

  h18_teste_5_segundos:
    simulation: |
      Imagine usuário olhando página por 5 segundos:
      1. Ele entende O QUÊ você oferece?
      2. Ele entende PARA QUEM é?
      3. Ele sabe QUAL AÇÃO tomar?
    veto_if: "Resposta NÃO para qualquer uma das 3"

  mobile_first:
    check: "Above the fold funciona em mobile (375x667)?"
    elementos_visiveis:
      - [ ] Headline completa
      - [ ] Subheadline (ou primeiras 2 linhas)
      - [ ] CTA primário (botão completo)
```

### STEP 5: Gerar Output — Copy Estruturada

Produzir documento com copy completa da landing page:

```markdown
# Landing Page: [Nome da Oferta]

## CABEÇA (Above the Fold - 50%)

### Headline (DSOD)
[Headline seguindo Dor/Desejo + Solução + Mata Objeção + Diferenciação]

### Subheadline
[Reforço da promessa com especificidade]

### CTA Primário
[Botão: Texto de Ação + Benefício]

### Hero Visual
[Descrição do vídeo/imagem + mensagem]

---

## CORPO (30%)

### Benefícios (3-5)

**✓ Benefício 1: [Título]**
[Explicação curta - 1-2 linhas]

**✓ Benefício 2: [Título]**
[Explicação curta]

[...]

### Prova Social

**Depoimento 1 (Vídeo)**
[Nome - Resultado específico]
[Transcrição key quote: "..."]

**Depoimento 2 (Screenshot)**
[Antes/Depois - Métrica numérica]

[...]

### Como Funciona

**Passo 1:** [Ação inicial]
**Passo 2:** [O que acontece]
**Passo 3:** [Resultado final]

---

## PERNAS (20%)

### Garantia
[Tipo de garantia + como funciona]

### Urgência
[Prazo + consequência]

### CTA Final
[Botão GRANDE: Texto reforçando benefício principal]

### FAQ (opcional)

**[Pergunta 1]**
[Resposta objetiva]

[...]

---

## PERFORMANCE CHECKLIST

- [ ] H17: 1 página, 1 objetivo (CTA único)
- [ ] H18: Teste 5 segundos passa
- [ ] H32: Velocidade < 3seg desktop, < 5seg mobile
- [ ] Above the fold: Headline + CTA visível sem scroll
- [ ] Mobile: Funciona em 375x667
- [ ] Prova social: Vídeos autênticos ou screenshots
- [ ] Garantia: Presente e clara
- [ ] Urgência: Genuína (não fake timer)
- [ ] WhatsApp: Widget flutuante configurado
```

---

## Output Example

```yaml
landing_page_brief:
  oferta: "Mentoria Tráfego Pago 90 Dias"
  objetivo_unico: "Agendar diagnóstico gratuito"

  cabeca:
    headline_dsod: |
      Cansado de queimar dinheiro em Google Ads sem resultado?
      Descubra o método exato que gerou R$450k em vendas
      para 73 empresas em 90 dias
      usando apenas R$20/dia de budget inicial

    subheadline: "Sistema validado em 12 nichos — de dentistas a infoprodutores"

    cta_primario: "Agendar Meu Diagnóstico Gratuito"

    hero: "Vídeo 45seg: Thiago explicando método + case rápido"

  corpo:
    beneficios:
      - titulo: "ROI de 3x em 60 dias"
        explicacao: "Método que otimiza cada centavo, não queima budget em teste"
      - titulo: "Campanha no ar em 7 dias"
        explicacao: "Setup completo, do pixel ao anúncio, sem enrolação"
      - titulo: "Suporte direto no WhatsApp"
        explicacao: "Dúvida apareceu? Resposta em até 2h úteis"

    prova_social:
      - tipo: "Vídeo depoimento"
        cliente: "João Silva - Dentista"
        resultado: "De 2 pacientes/mês para 15 pacientes/mês em 45 dias"
      - tipo: "Screenshot dashboard"
        metrica: "CPA caiu de R$180 para R$45 em 30 dias"

    como_funciona:
      passos:
        - "Preenche formulário (2 min)"
        - "Diagnóstico gratuito (30 min call)"
        - "Campanha otimizada no ar em 7 dias"

  pernas:
    garantia: "30 dias de garantia incondicional — não gostou, devolvo 100%"
    urgencia: "Bônus 'Copywriting para Ads' expira em 48h (genuíno)"
    cta_final: "Sim, Quero Triplicar Meu Resultado Agora"
    faq:
      - pergunta: "Funciona no meu nicho?"
        resposta: "Validado em 12 nichos diferentes, de serviços locais a infoprodutos"
      - pergunta: "Preciso de budget alto?"
        resposta: "Não. Método funciona a partir de R$20/dia"

  performance:
    h17_check: "✓ 1 objetivo (agendar call)"
    h18_check: "✓ 5 segundos: oferta clara, público claro, ação clara"
    h32_target: "< 3seg (otimizar vídeo hero)"
    h34_benchmark: "Alvo: 20-25% conversão (visitante → agendamento)"

  whatsapp_widget:
    mensagem_pre: "Olá! Vim da página Mentoria Tráfego e quero agendar diagnóstico"
```

---

## Completion Criteria

```yaml
lp_complete_when:
  - [ ] Elicitação completa (10 perguntas respondidas)
  - [ ] Estrutura Cabeça-Corpo-Pernas implementada (50-30-20)
  - [ ] Headline DSOD criada
  - [ ] CTA primário ANTES DA DOBRA
  - [ ] Prova social presente (vídeos ou screenshots)
  - [ ] Garantia + Urgência nas pernas
  - [ ] H17 validado (1 página, 1 objetivo)
  - [ ] H18 validado (teste 5 segundos passa)
  - [ ] Performance checklist completo (H32, mobile, WhatsApp)
  - [ ] Copy completa gerada em formato estruturado
```

---

## Handoff To

Após criação da landing page:

| Próximo Passo | Agent | Task |
|---------------|-------|------|
| **Design/implementação** | Designer/Dev | Implementar copy em página real |
| **Tráfego para LP** | `tessman-google-ads` ou `tessman-meta-ads` | `create-search-campaign.md` ou `create-meta-campaign.md` |
| **Otimização pós-lançamento** | `tessman-copy` | `optimize-landing-page.md` (após 100+ visitantes) |

---

## Quality Gate

```yaml
lp_quality:
  - [ ] Copy usa linguagem TESSMAN (não genérica/corporativa)
  - [ ] Promessa é específica E defensável (não exagero)
  - [ ] Prova social é autêntica (não stock/genérica)
  - [ ] Urgência é genuína (não timer fake)
  - [ ] CTA é ação + benefício (não "Saiba Mais")
  - [ ] Mobile-first respeitado
  - [ ] Sem múltiplos objetivos (H17 INEGOCIÁVEL)
```

---

*Task: CE_COPY_001 | Agent: tessman-copy | Version: 1.0*
*Source: Conversão Extrema - Cabeça-Corpo-Pernas + DSOD + H17/H18/H32/H34*
