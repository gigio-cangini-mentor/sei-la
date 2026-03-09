---
task_id: KOE_DIST_003
name: "Social Matrix Adapt"
agent: koe-distribuidor
type: implementation
complexity: medium
estimated_time: 45min
version: 1.0.0

source:
  concept: "Social Matrix — Cross-platform adaptation"
  author: "Dan Koe"
  framework: "Social Matrix + Content Cascade"
  reference: "1 content piece → 5 platform-native versions"

inputs:
  required:
    - source_content: "Peça de conteúdo original (newsletter, thread, script, ou blog)"
    - source_format: "Formato original (newsletter | thread | video_script | blog)"
    - target_platforms: "Lista de plataformas-alvo"
  optional:
    - cascade_fragments: "Fragmentos pré-marcados do Content Cascade"
    - platform_metrics: "Métricas de performance por plataforma"
    - audience_profiles: "Perfis de audiência por plataforma"

outputs:
  primary:
    - adapted_content: "Conteúdo adaptado para cada plataforma-alvo"
  secondary:
    - posting_guide: "Guia de publicação com horários e CTAs por plataforma"
    - ab_test_variants: "Variantes para teste A/B em plataformas prioritárias"
  template: social-matrix-output.yaml

validation:
  checklist: distribution-quality-validation.md
  platforms_covered: 5
  native_format_each: true
  cta_per_platform: true

elicit: true
---

# Social Matrix Adapt

## Propósito

> "The same idea hits different when it's native to the platform.
> A tweet is not a short LinkedIn post. An Instagram caption is not a compressed blog.
> Adapt the container, not the content."
> — Dan Koe

Adaptar uma única peça de conteúdo para 5 plataformas diferentes (Twitter/X, LinkedIn,
Instagram, TikTok, YouTube Shorts), respeitando o formato nativo, tom e expectativas
de cada audiência. O Social Matrix maximiza o alcance sem multiplicar o esforço criativo.

---

## Contexto

O Social Matrix é o framework de Dan Koe para distribuição cross-platform:

```
1 Peça Original
    ↓
┌────────────────────────────────────────────┐
│  SOCIAL MATRIX                              │
│                                              │
│  Twitter/X  → Threads + Tweets + Polls       │
│  LinkedIn   → Long posts + Carousels         │
│  Instagram  → Carousels + Reels + Stories     │
│  TikTok     → Short-form video + Stitches     │
│  YT Shorts  → Clips verticais                │
└────────────────────────────────────────────┘
```

**Princípio-chave:** Cada plataforma tem uma "linguagem nativa". Conteúdo que performa
em uma não funciona copy-pasted em outra. A adaptação é o que transforma distribuição
em leverage real.

**Diferenças por Plataforma:**

```yaml
platform_profiles:
  twitter_x:
    format: "Text-first, conciso, provocativo"
    max_length: "280 chars por tweet / thread ilimitado"
    tone: "Direto, contrarian, conversacional"
    engagement: "Replies, retweets, quote-tweets"
    audience: "Creators, thinkers, entrepreneurs"
    peak_content: "Hot takes, threads, insights rápidos"

  linkedin:
    format: "Text longo, profissional, storytelling"
    max_length: "3000 chars"
    tone: "Profissional mas pessoal, storytelling"
    engagement: "Comments, shares, DMs"
    audience: "Profissionais, corporativo, B2B"
    peak_content: "Lições aprendidas, frameworks, stories"

  instagram:
    format: "Visual-first, carousels, reels, stories"
    max_length: "2200 chars caption"
    tone: "Visual, inspirational, lifestyle"
    engagement: "Likes, saves, shares, DMs"
    audience: "Ampla, lifestyle, visual learners"
    peak_content: "Carousels educativos, reels impactantes"

  tiktok:
    format: "Video vertical curto, trends, relatability"
    max_length: "60-180s video"
    tone: "Casual, energético, trend-aware"
    engagement: "Views, shares, stitches, duets"
    audience: "Gen Z/Millennial, early adopters"
    peak_content: "Hot takes em vídeo, tutorials rápidos"

  youtube_shorts:
    format: "Video vertical curto, educational"
    max_length: "60s video"
    tone: "Similar ao canal principal, mais punchier"
    engagement: "Views, likes, subscribe"
    audience: "Subscribed + discovery"
    peak_content: "Clips do canal principal, mini-tutorials"
```

---

## Pré-requisitos

- [ ] Peça de conteúdo original disponível
- [ ] Cascade fragments marcados (se disponível)
- [ ] Plataformas-alvo definidas e priorizadas
- [ ] Perfis de audiência por plataforma revisados
- [ ] Guidelines de formato de cada plataforma atualizados

---

## Steps

### Step 1: Analisar Requisitos de Cada Plataforma

**Objetivo:** Mapear o que cada plataforma exige em termos de formato, tom e tamanho.

**Platform Analysis Matrix:**

```yaml
platform_analysis:
  twitter_x:
    applicable_formats:
      - "Thread (7-15 tweets)"
      - "Standalone tweet"
      - "Quote-tweet com opinião"
      - "Poll"
    adaptation_needed: ""
    tone_shift: ""
    length_constraint: ""

  linkedin:
    applicable_formats:
      - "Long-form post (1000-2000 chars)"
      - "Carousel (8-10 slides)"
      - "Short insight post (300-500 chars)"
      - "Article"
    adaptation_needed: ""
    tone_shift: ""
    length_constraint: ""

  instagram:
    applicable_formats:
      - "Carousel educativo (8-10 slides)"
      - "Reel (30-60s)"
      - "Story sequence (5-7 stories)"
      - "Single image + caption"
    adaptation_needed: ""
    tone_shift: ""
    length_constraint: ""

  tiktok:
    applicable_formats:
      - "Video curto (30-60s)"
      - "Stitch com opinião"
      - "Tutorial rápido"
      - "Storytelling em vídeo"
    adaptation_needed: ""
    tone_shift: ""
    length_constraint: ""

  youtube_shorts:
    applicable_formats:
      - "Clip curto (30-60s)"
      - "Mini-tutorial"
      - "Hot take"
    adaptation_needed: ""
    tone_shift: ""
    length_constraint: ""
```

---

### Step 2: Adaptar Tom, Tamanho e Formato

**Objetivo:** Reescrever o conteúdo em formato nativo de cada plataforma.

**Adaptation Process:**

Para cada plataforma:

1. **Extrair a essência** — Qual é o core message em 1 frase?
2. **Escolher formato nativo** — O que performa melhor nesta plataforma?
3. **Adaptar tom** — Manter voz Dan Koe mas ajustar para audiência
4. **Ajustar tamanho** — Respeitar limites e expectations da plataforma
5. **Adicionar elementos nativos** — Hashtags, polls, calls, etc.

**Tom Adaptation Guide:**

```yaml
tone_adaptation:
  twitter_x:
    from_newsletter: "Comprimir, punchier, mais contrarian"
    voice_elements: "Em-dashes → line breaks, perguntas retóricas mantidas"
    examples:
      newsletter: "The problem with most productivity advice is that it treats humans like machines — optimizing for output when the real bottleneck is attention architecture."
      twitter: "Most productivity advice is for machines, not humans.\n\nThe real bottleneck isn't output.\n\nIt's attention architecture."

  linkedin:
    from_newsletter: "Profissionalizar sem perder personalidade, add storytelling"
    voice_elements: "Stories pessoais amplificadas, frameworks destacados"
    examples:
      newsletter: "I spent 3 years building content the wrong way..."
      linkedin: "3 years ago, I was writing content like everyone else.\n\n12 hours a day. Burnout. Zero leverage.\n\nThen I discovered something that changed everything:\n\n[Framework explanation with professional context]"

  instagram:
    from_newsletter: "Visualizar conceitos, simplificar linguagem"
    voice_elements: "Frases de impacto para slides, emojis moderados"
    examples:
      newsletter: "The APAG structure transforms every piece of content..."
      instagram_carousel: "Slide 1: The framework that 10x'd my content\nSlide 2: A - Attention\n..."

  tiktok:
    from_newsletter: "Energizar, simplificar, ser direto em 60s"
    voice_elements: "Hook nos primeiros 2s, tom mais casual"

  youtube_shorts:
    from_newsletter: "Clip de insight ou tutorial em 60s"
    voice_elements: "Similar ao canal principal, mais conciso"
```

---

### Step 3: Adicionar CTAs Específicos por Plataforma

**Objetivo:** Incluir call-to-action nativo e eficaz para cada plataforma.

**Platform-Specific CTAs:**

```yaml
platform_ctas:
  twitter_x:
    primary: "Follow for daily insights on [tema]"
    engagement: "What's your take? Reply below"
    conversion: "I go deeper in my newsletter: [link in bio]"
    save: "Bookmark this thread for later"

  linkedin:
    primary: "Follow for frameworks on [tema]"
    engagement: "What would you add? Comment below"
    conversion: "I write about this weekly → link in first comment"
    connection: "Send me a DM if this resonated"

  instagram:
    primary: "Save this for later 📌"
    engagement: "Share with someone who needs this"
    conversion: "Link in bio for the full guide"
    story: "Share to stories and tag me"

  tiktok:
    primary: "Follow for Part 2"
    engagement: "Stitch this with your version"
    conversion: "Link in bio"
    comment: "Comment [keyword] for the full guide"

  youtube_shorts:
    primary: "Subscribe for more"
    engagement: "Comment below: which tip was most useful?"
    conversion: "Full video on my channel"
```

---

## Input Required

```yaml
input:
  source:
    content_file: ""
    format: ""  # newsletter | thread | video_script | blog
    big_idea: ""
    word_count: 0

  target_platforms:
    - platform: "twitter_x"
      priority: ""
      preferred_format: ""
    - platform: "linkedin"
      priority: ""
      preferred_format: ""
    - platform: "instagram"
      priority: ""
      preferred_format: ""
    - platform: "tiktok"
      priority: ""
      preferred_format: ""
    - platform: "youtube_shorts"
      priority: ""
      preferred_format: ""

  cascade_fragments: []

  platform_metrics:
    best_platform: ""
    avg_engagement_by_platform: {}
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_DIST_003
    created_at: ""
    agent: koe-distribuidor
    source_format: ""
    platforms_adapted: 0

  adaptations:
    twitter_x:
      format_chosen: ""
      content: ""
      cta: ""
      hashtags: []
      character_count: 0

    linkedin:
      format_chosen: ""
      content: ""
      cta: ""
      hashtags: []
      character_count: 0

    instagram:
      format_chosen: ""
      content: ""
      cta: ""
      hashtags: []
      slide_count: 0  # Se carousel

    tiktok:
      format_chosen: ""
      script: ""
      cta: ""
      hashtags: []
      duration: 0

    youtube_shorts:
      format_chosen: ""
      script: ""
      cta: ""
      title: ""
      duration: 0

  posting_guide:
    recommended_order: []
    posting_times: {}
    spacing: ""

  ab_test_variants:
    platform: ""
    variant_a: ""
    variant_b: ""

  quality_metrics:
    platforms_covered: 0
    native_format_used: false
    cta_per_platform: false
    tone_adapted: false
    big_idea_preserved: false
```

---

## Quality Gate

### Checklist de Validação (KOE_DIST_003)

**Cobertura:**
- [ ] 5 plataformas adaptadas (Twitter, LinkedIn, Instagram, TikTok, YT Shorts)
- [ ] Formato nativo escolhido para cada plataforma
- [ ] CTA específico incluído em cada versão

**Adaptação de Tom:**
- [ ] Twitter: conciso, contrarian, punchier
- [ ] LinkedIn: profissional com storytelling
- [ ] Instagram: visual-first, emojis moderados
- [ ] TikTok: casual, energético, trend-aware
- [ ] YouTube Shorts: educational, conciso

**Fidelidade:**
- [ ] Big Idea preservada em todas as adaptações
- [ ] Voz Dan Koe mantida (adaptada, não perdida)
- [ ] Nenhuma plataforma recebeu copy-paste do original

**Publicação:**
- [ ] Posting guide com ordem e horários
- [ ] Hashtags por plataforma definidos
- [ ] A/B test variants para plataforma prioritária

**Sovereignty Check:**
- [ ] Cada adaptação entrega valor standalone
- [ ] CTAs respeitam o audience de cada plataforma
- [ ] Sem clickbait ou manipulação

---

## Handoff

**Para publicação:**
- Conteúdo formatado e pronto para cada plataforma
- Posting guide com cronograma
- A/B test variants

**Para koe-distribuidor (KOE_DIST_004 — Calendar):**
- Adaptações prontas para inclusão no calendário semanal

**Para koe-chief:**
- Cobertura de plataformas e métricas de adaptação
- Recomendação de plataformas prioritárias baseado em performance

---

*Koe Distribuidor | Social Matrix Architect | Cross-Platform Specialist*
*"Adapt the container, not the content."*
