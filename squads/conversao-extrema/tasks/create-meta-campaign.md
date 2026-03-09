# create-meta-campaign

## Metadata
```yaml
task_id: CE_META_001
agent: tessman-meta-ads
type: implementation
complexity: high
estimated_time: 60-90min
source: "Conversão Extrema - Facebook/Instagram Ads"
```

## Purpose

Criar campanha de Facebook/Instagram Ads seguindo metodologia Tessman: 1 interesse por conjunto, P1 (público quente) > P2 (público frio), personalização por posicionamento.

> **"Produto de NECESSIDADE → Google. Produto de DESEJO → Facebook/Instagram."** — Thiago Tessman

---

## Executor

**Agent:** `tessman-meta-ads`
**Model:** `sonnet`

---

## Elicit

**TRUE** - Coletar informações sobre produto, público, orçamento.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Pixel não instalado"
    action: "HALT - Instalar pixel ANTES"

  - condition: "Budget < R$300/mês"
    action: "WARNING - Mínimo R$50/dia por conjunto recomendado"

  - condition: "Produto de NECESSIDADE (busca ativa no Google)"
    action: "REDIRECT - Google Ads melhor opção"
```

---

## Steps

### STEP 1: Pre-Flight & Audience Definition

**Elicitar:**

```yaml
questions:
  - q1: "Produto/serviço principal?"
  - q2: "É produto de DESEJO ou NECESSIDADE?"
    note: "Desejo: roupa, curso, coach. Necessidade: advogado, encanador"
  - q3: "Avatar: idade, profissão, interesses?"
  - q4: "Orçamento mensal?"
  - q5: "Já tem base? (email, seguidores, visitantes site)"
```

**Pre-Flight Checklist:**

```yaml
tracking:
  - [ ] Pixel Facebook instalado e ativo
  - [ ] Eventos configurados (ViewContent, AddToCart, Purchase/Lead)
  - [ ] Domínio verificado
  - [ ] Públicos personalizados criados (se tem base)

base:
  - [ ] Landing page ou página de produto pronta
  - [ ] Mobile-responsive
  - [ ] Velocidade < 3 segundos

creative:
  - [ ] Imagens/vídeos em múltiplos formatos:
    - [ ] Feed 1:1 (1080x1080)
    - [ ] Stories 9:16 (1080x1920)
    - [ ] Reels vertical
```

### STEP 2: Audience Hierarchy (P1 vs P2)

**Hierarquia Tessman (do mais quente ao mais frio):**

```yaml
p1_publicos_quentes:
  tier_1_super_hot:
    - Lista de email (upload CSV)
    - Lista de WhatsApp (upload)
    - Clientes anteriores (CRM)

  tier_2_hot:
    - Visitantes do site (últimos 30 dias)
    - Engajou com Instagram/Facebook (últimos 30 dias)
    - Visualizou vídeo 75%+

  tier_3_warm:
    - Visitantes do site (últimos 90 dias)
    - Seguidores Instagram/Facebook

p2_publicos_frios:
  tier_4_targeted:
    - Interesses específicos (1 por conjunto!)
    - Lookalike 1% (da lista de clientes)

  tier_5_cold:
    - Interesses amplos
    - Lookalike 2-5%
```

**REGRA DE OURO:** Sempre começar com P1. Só ir para P2 quando P1 estiver performando.

### STEP 3: Campaign Structure (P1 ou P2)

**Estrutura P1 (Público Quente):**

```
Campanha: [Produto] - P1 Conversão
  ↓
Conjunto 1: P1 - Visitantes 30 dias
  └─ 3 anúncios (variações)
  ↓
Conjunto 2: P1 - Engajou Instagram
  └─ 3 anúncios (mesmos)
  ↓
Conjunto 3: P1 - Lista Email
  └─ 3 anúncios (mesmos)
```

**Estrutura P2 (Público Frio):**

```
Campanha: [Produto] - P2 Conversão
  ↓
Conjunto 1: Interesse "Neil Patel"
  └─ 3 anúncios (variações)
  ↓
Conjunto 2: Interesse "Marketing Digital"
  └─ 3 anúncios (mesmos)
  ↓
Conjunto 3: Lookalike 1% Clientes
  └─ 3 anúncios (mesmos)
```

**VETO:** NUNCA misture interesses no mesmo conjunto. 1 interesse = 1 conjunto.

### STEP 4: Campaign Settings

```yaml
configuracoes:
  objetivo: "Conversões" (ou Tráfego se começando)

  budget:
    cbo: false  # Desligado para teste
    conjunto: 50.00  # R$50/dia mínimo por conjunto

  segmentacao:
    idade: "[range de 10 anos mín, ex: 25-35]"
    genero: "Todos" (começar amplo)
    localizacao: "[cidade/estado/país]"
    idioma: "Português (Brasil)"

  posicionamentos:
    opcao_1_automatico: "Deixa Facebook otimizar"
    opcao_2_manual:
      feed_facebook: true
      feed_instagram: true
      stories_fb: true
      stories_ig: true
      reels: true
      # Desmarcar: Audience Network, Messenger

  otimizacao:
    evento: "Conversões" (ou "Landing Page Views" se sem histórico)
    janela_conversao: "7 dias clique / 1 dia visualização"
```

### STEP 5: Ad Creative (Multi-Format)

**Formato 1: Feed 1:1 (Quadrado)**

```yaml
imagem: "1080x1080 (produto/benefício/antes-depois)"
texto_principal:
  formula: "[Hook problema] + [Promessa] + [CTA]"
  max_chars: 125 (antes do "ver mais")
  example: |
    Cansado de gastar em anúncio e não vender? Descubra o método
    que gerou R$1M em vendas. Acesse agora (link na bio).

titulo:
  formula: "[Resultado específico + tempo]"
  example: "Do Zero a R$10k/mês em 60 Dias"

descricao:
  formula: "[Benefício principal]"
  example: "Método validado por 5.000+ alunos"

cta_button: "Saiba Mais" | "Comprar Agora" | "Inscreva-se"
```

**Formato 2: Stories/Reels 9:16 (Vertical)**

```yaml
video: "1080x1920, 15-30 segundos"
estrutura:
  segundos_0_3: "[HOOK visual + texto]"
  segundos_3_15: "[Problema → Solução → Prova]"
  segundos_15_30: "[CTA claro]"

texto:
  minimo: "CTA apenas (visual fala por si)"
  example: "Link na bio 👆"

audio: "Música trending ou narração"
```

**Criar 3 Variações:**

```yaml
variacao_1:
  tipo: "Problema/Dor"
  hook: "Cansado de [problema]?"
  foco: "Agitar dor"

variacao_2:
  tipo: "Prova Social"
  hook: "5.000+ pessoas já [resultado]"
  foco: "Depoimentos/números"

variacao_3:
  tipo: "Resultado/Promessa"
  hook: "De R$0 a R$10k em 60 dias"
  foco: "Transformação"
```

### STEP 6: Testing Protocol

**REGRA:** Testar UM elemento por vez.

```yaml
fase_1_teste_publicos:
  duration: "48-72h"
  variable: "Públicos diferentes (1 interesse por conjunto)"
  constante: "Mesmos 3 anúncios em todos os conjuntos"
  decisao: "Pausar público com CPL >2x da média"

fase_2_teste_criativos:
  duration: "48-72h"
  variable: "Criativos diferentes (imagem vs vídeo)"
  constante: "Melhor público da fase 1"
  decisao: "Pausar criativo com CTR <0,8%"

fase_3_escala:
  condition: "CPA dentro da meta por 7 dias"
  action: "Aumentar budget +20% a cada 3-5 dias"
```

---

## Output Example

```yaml
meta_campaign:
  campaign_name: "Curso Tráfego - P1 Conversão"
  objective: "Conversões"
  daily_budget_per_set: 50.00

  ad_sets:
    - set_name: "P1 - Visitantes 30d"
      audience:
        type: "Custom - Website Visitors"
        window: "30 days"
        exclusions: "Compradores"
      budget: 50.00
      optimization: "Conversões"

      ads:
        - ad_1_problema:
            format: "Imagem 1:1"
            image: "problema-gastar-sem-vender.jpg"
            primary_text: "Cansado de gastar em anúncio e não vender? Descubra o método que gerou R$1M. Link na bio."
            headline: "Do Zero a R$10k/mês em 60 Dias"
            description: "Método validado por 5.000+ alunos"
            cta: "Saiba Mais"

        - ad_2_prova_social:
            format: "Vídeo 9:16"
            video: "depoimento-cliente-1.mp4"
            primary_text: "5.000+ alunos já faturaram os primeiros R$10k. Você é o próximo?"
            headline: "Resultados Comprovados"
            cta: "Inscreva-se"

    - set_name: "P1 - Engajou IG 30d"
      audience:
        type: "Custom - Instagram Engagers"
        window: "30 days"
      budget: 50.00
      ads: "[mesmos 3 anúncios acima]"

  tracking:
    pixel_events:
      - "ViewContent"
      - "AddToCart"
      - "Purchase"
    custom_conversions: "Compra Curso - Obrigado Page"

  kpis:
    target_cpl: 30.00
    target_cpa: 150.00
    min_ctr: 1.0%
    max_frequency: 3.0
```

---

## Completion Criteria

```yaml
campaign_complete_when:
  - [ ] Pixel instalado e testado
  - [ ] Públicos criados (P1 ou P2 conforme estratégia)
  - [ ] 1 interesse por conjunto (se P2)
  - [ ] 3 anúncios por conjunto (variações)
  - [ ] Criativos em múltiplos formatos (feed + stories)
  - [ ] Exclusão de convertidos configurada
  - [ ] Orçamento mínimo R$50/dia por conjunto
  - [ ] Campanha ATIVA
```

---

## Handoff To

```yaml
handoff:
  agent: "tessman-remarketing"
  task: "design-remarketing-strategy.md"
  when: "Após 7 dias de campanha"
  reason: "Otimizar frequência e segmentação por comportamento"
```

---

## Quality Gate

```yaml
campaign_quality:
  - [ ] P1 priorizado sobre P2 (se base existe)
  - [ ] 1 interesse por conjunto (não misturado)
  - [ ] Textos < 125 caracteres (antes do "ver mais")
  - [ ] Criativos personalizados por posicionamento
  - [ ] Exclusão de convertidos ativa
```

---

*Task: CE_META_001 | Agent: tessman-meta-ads | Version: 1.0*
*Source: Conversão Extrema - Facebook/Instagram Ads*
