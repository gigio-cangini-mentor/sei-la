# create-search-campaign

## Metadata
```yaml
task_id: CE_GOOGLE_001
agent: tessman-google-ads
type: implementation
complexity: high
estimated_time: 60-90min
source: "Conversão Extrema - Rede de Pesquisa Google Ads"
```

## Purpose

Criar campanha de Google Ads na Rede de Pesquisa seguindo a metodologia Tessman: círculos concêntricos (específico → amplo), 10-30 palavras por grupo, tracking instalado ANTES de gastar R$1.

> **"Quanto mais específico, mais resultado. Anúncio sobre iPhone 11 para quem busca iPhone 11."** — Thiago Tessman

---

## Executor

**Agent:** `tessman-google-ads`
**Model:** `sonnet` (requer decisões estratégicas)

---

## Elicit

**TRUE** - Precisa coletar informações do produto/serviço, orçamento e objetivos.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Tags de conversão não instaladas"
    action: "HALT - Instalar pixel/tag ANTES de criar campanha"

  - condition: "Landing page não existe ou não converte"
    action: "HALT - Criar/otimizar landing page primeiro"

  - condition: "Budget < R$300/mês"
    action: "WARNING - Budget muito baixo, resultados lentos"

  - condition: "Produto de DESEJO (não necessidade)"
    action: "REDIRECT - Facebook Ads melhor para produto de desejo"
```

---

## Steps

### STEP 1: Pre-Flight Check (Checklist de Base)

```yaml
pre_flight_checklist:
  tracking:
    - [ ] Tag de conversão Google Ads instalada e testada
    - [ ] Tag de remarketing instalada
    - [ ] Google Analytics conectado
    - [ ] Conversões configuradas (compra, lead, form submit)

  base:
    - [ ] Landing page específica existe
    - [ ] LP é mobile-responsive
    - [ ] Velocidade < 3 segundos
    - [ ] CTA claro e visível
    - [ ] Formulário funcionando (se lead gen)

  oferta:
    - [ ] Proposta de valor clara
    - [ ] Diferencial competitivo definido
    - [ ] Preço definido (ou "solicitar orçamento")
    - [ ] Garantia (se houver)
```

### STEP 2: Research & Keyword Selection

**Elicitar do usuário:**

```yaml
questions:
  - q1: "Qual o produto/serviço principal?"
    example: "Curso de Tráfego Pago"

  - q2: "O que as pessoas BUSCAM no Google quando querem isso?"
    example: "curso google ads, aprender tráfego pago, como anunciar no facebook"

  - q3: "Qual a localização-alvo?"
    options:
      - "Cidade específica (ex: São Paulo)"
      - "Estado (ex: SP, RJ)"
      - "País inteiro (Brasil)"
      - "Internacional"

  - q4: "Qual o orçamento mensal disponível?"
    example: "R$1.500/mês"

  - q5: "Qual o valor médio do produto/serviço?"
    note: "Para calcular CPA máximo"
```

**Processo de Pesquisa:**

1. **Usar Google Keyword Planner:**
   - Buscar variações da palavra-chave principal
   - Filtrar por volume de busca (mín 100/mês)
   - Filtrar por intenção comercial (alta)

2. **Aplicar Círculos Concêntricos:**

```
NÚCLEO (começar aqui):
├─ Palavra exata + cidade (ex: [curso google ads são paulo])
├─ Palavra exata + resultado (ex: [aprender tráfego pago])
└─ Palavra exata + comparação (ex: [melhor curso google ads])

CAMADA 2 (depois de validar núcleo):
├─ Palavra frase + região (ex: "curso google ads" + SP)
└─ Variações semânticas (ex: "treinamento google ads")

CAMADA 3 (só se camada 2 performar):
├─ Palavra ampla modificada (+curso +google +ads)
└─ Long-tail relacionadas
```

3. **Definir Palavras Negativas (Crítico):**

```yaml
negative_keywords_padrao:
  - "gratis"
  - "gratuito"
  - "free"
  - "pirata"
  - "download"
  - "torrent"
  - "crack"
  - "emprego" (se não está contratando)
  - "curso" (se não é curso)
  - "vaga" (se não está contratando)
```

### STEP 3: Campaign Structure

**Estrutura Recomendada (Tessman):**

```
Campanha: [Produto] - Rede de Pesquisa
  ↓
Grupo 1: KW - [Produto] Exatas
  ├─ 10-15 palavras-chave (exatas)
  ├─ 3-5 anúncios (variações)
  └─ LP específica
  ↓
Grupo 2: KW - [Produto] Frase
  ├─ 10-15 palavras-chave (frase)
  ├─ 3-5 anúncios (variações)
  └─ LP específica
  ↓
Grupo 3: KW - [Produto] Concorrentes
  ├─ 10-15 palavras-chave (nomes de concorrentes)
  ├─ 3-5 anúncios (comparativos)
  └─ LP específica
```

### STEP 4: Campaign Settings

```yaml
configuracoes_campanha:
  tipo: "Pesquisa"
  redes:
    search_network: true
    display_network: false  # DESMARCAR Display
    search_partners: true   # OK manter parceiros

  localizacao:
    target: "[conforme elicitado]"
    opcao: "Pessoas na localização-alvo" (não "interessadas")

  idioma: "Português"

  lance:
    inicio: "CPC Manual"  # Sempre começar manual
    transicao: "CPA Desejado após 10-15 conversões"

  orcamento:
    diario: "[orçamento mensal ÷ 30]"
    metodo: "Padrão" (não acelerado)

  extensoes:
    sitelinks: true
    chamadas: true
    snippets: true
    local: true (se negócio local)
```

### STEP 5: Ad Copy Creation

**Fórmula Tessman para Anúncios:**

```yaml
titulo_1:
  formula: "[Palavra-chave Principal]"
  example: "Curso Google Ads"

titulo_2:
  formula: "[Benefício Específico + Tempo/Resultado]"
  example: "Do Zero ao Avançado em 30 Dias"

titulo_3:
  formula: "[CTA ou Diferencial]"
  example: "Certificado Incluso"

descricao_1:
  formula: "[Expandir promessa + gatilho de urgência/escassez]"
  example: "Aprenda tráfego pago com quem fatura R$100k/mês. Vagas limitadas."

descricao_2:
  formula: "[Prova social ou garantia]"
  example: "Mais de 5.000 alunos aprovados. Garantia de 7 dias."

url_exibicao:
  formula: "dominio.com/[palavra-chave]"
  example: "conversaoextrema.com/curso-google-ads"

url_final:
  formula: "Landing page específica para essa palavra-chave"
  example: "https://conversaoextrema.com/curso-google-ads?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa"
```

**Criar 3-5 Variações por Grupo:**
- Variação 1: Foco em benefício principal
- Variação 2: Foco em prova social (depoimentos/números)
- Variação 3: Foco em garantia/urgência
- Variação 4: Foco em preço/oferta (se aplicável)
- Variação 5: Foco em diferencial competitivo

### STEP 6: Monitoring & Optimization Setup

```yaml
metricas_acompanhar:
  primeiras_48h:
    - CTR (>3% = bom)
    - CPC (dentro do orçamento?)
    - Impressões (está aparecendo?)
    - Posição média (meta: 1-3)

  primeiros_7_dias:
    - Conversões (qualquer uma?)
    - CPA (quanto custa cada conversão?)
    - Termos de pesquisa (TODO DIA - adicionar negativas)
    - Taxa de conversão da LP (>2% = ok)

  primeiros_30_dias:
    - CPA vs Meta (está dentro?)
    - ROI/ROAS (está positivo?)
    - Índice de Qualidade (>7 = bom)
    - Performance por grupo (qual performa melhor?)

  acoes_otimizacao:
    diarias:
      - [ ] Verificar termos de pesquisa
      - [ ] Adicionar palavras negativas
      - [ ] Pausar palavras com CPA alto (sem conversão)

    semanais:
      - [ ] Ajustar lances por palavra
      - [ ] Testar novos anúncios
      - [ ] Verificar concorrentes

    mensais:
      - [ ] Escalar budget (+20% se performance boa)
      - [ ] Expandir para novos grupos de palavras
      - [ ] Revisar landing pages
```

---

## Output Example

```yaml
google_search_campaign:
  campaign_name: "Curso Tráfego Pago - Pesquisa"
  daily_budget: 50.00  # R$1.500/mês ÷ 30
  target_location: "São Paulo, SP"

  ad_groups:
    - group_name: "KW - Curso Google Ads Exatas"
      keywords:
        - "[curso google ads]"
        - "[aprender google ads]"
        - "[treinamento google ads]"
        - "[como anunciar no google]"
        - "[curso trafego pago google]"
        # ... 10-15 total

      ads:
        - ad_1:
            titulo_1: "Curso Google Ads"
            titulo_2: "Do Zero ao Pro em 30 Dias"
            titulo_3: "Certificado Incluso"
            desc_1: "Aprenda tráfego pago com quem fatura R$100k/mês. Vagas limitadas."
            desc_2: "Mais de 5.000 alunos aprovados. Garantia de 7 dias."

        - ad_2:
            titulo_1: "Aprenda Google Ads"
            titulo_2: "5.000+ Alunos Aprovados"
            titulo_3: "Comece Hoje"
            desc_1: "Método testado e aprovado. Resultados em 30 dias ou seu dinheiro de volta."
            desc_2: "Suporte direto com especialista. Acesso vitalício."

      negative_keywords:
        - "gratis"
        - "gratuito"
        - "emprego"
        - "vaga"

    - group_name: "KW - Curso Tráfego Pago Frase"
      keywords:
        - "\"curso de tráfego pago\""
        - "\"como fazer tráfego pago\""
        - "\"aprender tráfego pago\""
        # ... 10-15 total

  tracking:
    conversion_action: "Compra - Curso Tráfego Pago"
    remarketing_tag: "instalada"
    utm_parameters:
      source: "google"
      medium: "cpc"
      campaign: "pesquisa"

  success_metrics:
    target_cpa: 150.00  # 30% do valor do produto (R$497)
    target_roas: 3.0    # R$3 de retorno para cada R$1 gasto
    min_ctr: 3%
    quality_score_target: 7+

  optimization_schedule:
    daily: "Termos de pesquisa + palavras negativas"
    weekly: "Ajuste de lances + teste de anúncios"
    biweekly: "Escalar budget se CPA < meta"
    monthly: "Expandir para novos grupos de palavras"
```

---

## Completion Criteria

```yaml
campaign_complete_when:
  - [ ] Pre-flight checklist 100% OK
  - [ ] Pesquisa de palavras-chave realizada (mín 30 palavras)
  - [ ] Palavras negativas adicionadas (mín 10)
  - [ ] Estrutura de campanha criada (mín 2 grupos)
  - [ ] 3-5 anúncios por grupo criados
  - [ ] Extensões configuradas (sitelinks, chamadas, snippets)
  - [ ] Tracking validado (teste de conversão executado)
  - [ ] Orçamento alocado
  - [ ] Campanha ATIVA (publicada)
  - [ ] Schedule de monitoramento definido
```

---

## Handoff To

```yaml
handoff:
  agent: "tessman-remarketing"
  task: "design-remarketing-strategy.md"
  when: "Após 7 dias de campanha ativa"
  reason: "Capturar quem visitou mas não converteu (90% dos visitantes)"
```

---

## Quality Gate

```yaml
campaign_quality:
  - [ ] Círculos concêntricos aplicados (específico → amplo)
  - [ ] 10-30 palavras por grupo (não mais, não menos)
  - [ ] Palavras negativas configuradas
  - [ ] Anúncios usam palavra-chave no título
  - [ ] Landing page match com anúncio
  - [ ] Tracking testado ANTES de publicar
  - [ ] Orçamento diário >= R$30 (mínimo viável)
```

---

*Task: CE_GOOGLE_001 | Agent: tessman-google-ads | Version: 1.0*
*Source: Conversão Extrema - Rede de Pesquisa Google Ads*
