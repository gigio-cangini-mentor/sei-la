---
task_id: KOE_ARQ_004
name: "Content Cascade Foundation"
agent: koe-arquiteto
type: creation
complexity: high
estimated_time: 90min
version: 1.0.0

source:
  concept: "Content Cascade (1 idea → 20+ pieces)"
  author: "Dan Koe"
  framework: "Content Cascade + APAG Structure + Leverage Stack"
  reference: "1h creation = 10h distributed content"

inputs:
  required:
    - big_idea: "Big Idea validada com strength score >= 8"
    - content_format: "Formato da peça-âncora (newsletter | youtube_script | blog)"
    - audience_context: "Perfil do público com awareness level"
  optional:
    - distribution_plan: "Plano de distribuição do koe-distribuidor"
    - previous_cascades: "Cascades anteriores para evitar repetição"
    - platform_priorities: "Plataformas prioritárias para fragmentação"

outputs:
  primary:
    - anchor_piece: "Peça-âncora completa (fonte de todo o cascade)"
    - cascade_skeleton: "Mapa completo de fragmentação com 10+ pontos"
  secondary:
    - fragment_library: "Biblioteca de fragmentos categorizados por tipo e plataforma"
    - distribution_brief: "Brief para koe-distribuidor com prioridades"
  template: cascade-foundation-output.yaml

validation:
  checklist: cascade-quality-validation.md
  minimum_fragments: 10
  anchor_piece_quality: "high"
  cascade_coverage: 5  # mínimo de plataformas cobertas

elicit: true
---

# Content Cascade Foundation

## Propósito

> "Create once, distribute forever. One Big Idea should fuel a week of content
> across every platform. That's leverage — that's how one person beats a team of 10."
> — Dan Koe

Criar a peça-âncora (foundation piece) que alimenta todo o Content Cascade. Esta é a
peça de maior profundidade e qualidade — dela derivam todos os outros formatos de conteúdo.
O objetivo é maximizar o leverage: 1 hora de criação = 10+ horas de conteúdo distribuído.

---

## Contexto

O Content Cascade é o sistema central de leverage do Dan Koe. A ideia é simples mas
poderosa: em vez de criar conteúdo separado para cada plataforma, você cria UMA peça
profunda e depois fragmenta em múltiplos formatos.

**Fluxo do Cascade:**

```
Big Idea (validada)
    ↓
[ANCHOR PIECE] ← Você está aqui
    ↓
┌─────────────────────────────────────────┐
│  Newsletter (1500-3000 palavras)         │
│  YouTube Script (15-25 min)              │
│  Blog Post (1000-2000 palavras)          │
└─────────────┬───────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Twitter Thread (7-15 tweets)            │
│  LinkedIn Post (300-500 palavras)        │
│  Instagram Carousel (8-10 slides)        │
│  TikTok/Reels Script (30-60s)            │
│  YouTube Shorts (3-5 clips)              │
│  Standalone Tweets (7-10)                │
│  Email Sequence Hooks (3-5)              │
│  Podcast Talking Points                  │
└─────────────────────────────────────────┘
```

**Princípio de Leverage:**
- 1 Big Idea → 1 Anchor Piece → 15-25 content pieces
- 1 hora de criação profunda → 10 horas de conteúdo distribuído
- Consistência de mensagem em todos os canais
- Zero redundância de esforço criativo

---

## Pré-requisitos

- [ ] Big Idea validada pelo koe-sintetizador (strength score >= 8)
- [ ] Formato da âncora definido (newsletter, script, ou blog)
- [ ] Público-alvo claro com awareness level mapeado
- [ ] Sessão de Deep Work agendada (KOE_ARQ_003)
- [ ] Plataformas prioritárias definidas com koe-distribuidor

---

## Steps

### Step 1: Validar Força da Big Idea para Cascade

**Objetivo:** Confirmar que a Big Idea tem substância suficiente para gerar 10+ fragmentos.

**Cascade Strength Test:**

```yaml
cascade_strength_test:
  big_idea:
    name: ""
    one_liner: ""

  fragmentation_potential:
    can_generate_contrarian_hook: true
    has_step_by_step_element: true
    contains_personal_story: true
    has_data_or_proof: true
    creates_debate: true
    teaches_framework: true

  platform_coverage:
    twitter_tweetable: true
    linkedin_professional: true
    instagram_visual: true
    tiktok_snackable: true
    youtube_expandable: true

  depth_layers:
    surface: "O que é (1 frase)"
    medium: "Por que importa (1 parágrafo)"
    deep: "Como implementar (seção completa)"
    iceberg: "Filosofia por trás (exploração profunda)"

  cascade_score: 0  # 1-10, precisa >= 8
```

**Se cascade_score < 8:** A Big Idea precisa de mais desenvolvimento ou não é adequada
para cascade (pode ser usada como conteúdo standalone).

---

### Step 2: Estruturar APAG da Peça-Âncora

**Objetivo:** Criar outline expandido otimizado para fragmentação.

**Outline de Cascade-First:**

```yaml
anchor_outline:
  attention:
    hook_primary: ""
    hook_variants: []  # 3 variantes para diferentes plataformas
    fragment_points:
      - "[CASCADE:tweet] Hook standalone"
      - "[CASCADE:clip_hook] Hook para vídeo curto"

  perspective:
    main_reframe: ""
    cross_domain_bridges:
      - bridge: ""
        fragment_potential: ""  # thread_anchor | carousel_slide | clip
    rhetorical_questions:
      - question: ""
        fragment_potential: ""
    fragment_points:
      - "[CASCADE:thread_hook] Reframe como abertura de thread"
      - "[CASCADE:carousel] Ponte cross-domain como slide"

  advantage:
    transformation: ""
    step_by_step:
      - step: ""
        fragment_potential: ""
    proof_elements:
      - proof: ""
        fragment_potential: ""
    fragment_points:
      - "[CASCADE:linkedin] Benefício como post profissional"
      - "[CASCADE:tiktok] Step-by-step em 60 segundos"

  gamify:
    cta_primary: ""
    cta_variants: []  # Para diferentes plataformas
    fragment_points:
      - "[CASCADE:tweet] CTA standalone"
      - "[CASCADE:story] CTA como poll/pergunta"
```

**Regra-chave:** Ao escrever o outline, já pensar em como cada seção pode ser
fragmentada. Isso não compromete a qualidade — apenas adiciona uma lente de leverage.

---

### Step 3: Escrever Peça-Âncora

**Objetivo:** Criar a peça de conteúdo completa em sessão de Deep Work.

**Protocolo de Escrita Cascade-Aware:**

1. **Escrever com profundidade total** — não simplificar para facilitar fragmentação
2. **Cada parágrafo deve funcionar standalone** — teste: se extraído do contexto, faz sentido?
3. **Usar formatação cascadeável:**
   - Frases de impacto em linhas próprias (viram tweets)
   - Listas numeradas (viram carousels ou threads)
   - Perguntas retóricas (viram polls ou engagement posts)
   - Exemplos concretos (viram clips ou demos)

4. **Inline Cascade Markers:**
   ```
   [CASCADE:tweet] → Frase tweetável
   [CASCADE:thread] → Ponto de thread
   [CASCADE:clip] → Seção para vídeo curto
   [CASCADE:visual] → Conceito para infográfico
   [CASCADE:debate] → Afirmação que gera discussão
   [CASCADE:carousel] → Ponto para carousel slide
   [CASCADE:linkedin] → Seção para post LinkedIn
   ```

5. **Voice Elements Dan Koe obrigatórios:**
   - Em-dashes para pausas
   - Perguntas retóricas
   - Frases curtas de impacto
   - Tom conversacional
   - Pontes cross-domain

---

### Step 4: Identificar 10+ Pontos de Fragmentação

**Objetivo:** Mapear todos os fragmentos extraíveis da peça-âncora.

**Fragment Identification Process:**

```yaml
fragment_map:
  # Tipo 1: Tweets (< 280 chars)
  tweets:
    - text: ""
      location: "parágrafo X"
      strength: ""  # high | medium

  # Tipo 2: Thread Hooks
  thread_hooks:
    - opening: ""
      expandable_to_tweets: 0
      location: "seção X"

  # Tipo 3: Clip Scripts (30-60s)
  clips:
    - hook: ""
      body: ""
      cta: ""
      duration_estimate: ""
      location: "parágrafos X-Y"

  # Tipo 4: Carousel Slides
  carousels:
    - title: ""
      slides_count: 0
      content_source: "seção X"

  # Tipo 5: LinkedIn Posts
  linkedin_posts:
    - hook: ""
      body_summary: ""
      cta: ""
      location: "seção X"

  # Tipo 6: Visual Concepts
  visuals:
    - concept: ""
      format: ""  # infographic | diagram | quote_card

  # Tipo 7: Debate Triggers
  debates:
    - statement: ""
      expected_reactions: ""
      platform_best_fit: ""
```

**Meta:** Mínimo 10 fragmentos, idealmente 15-20.

---

### Step 5: Criar Cascade Skeleton

**Objetivo:** Organizar fragmentos em um plano distribuível.

**Cascade Skeleton Structure:**

```yaml
cascade_skeleton:
  anchor_piece:
    format: ""
    word_count: 0
    quality: ""

  cascade_plan:
    day_1:
      platform: "Newsletter / YouTube"
      content: "Anchor piece completo"

    day_2:
      platform: "Twitter"
      content: "Thread principal (7-15 tweets)"
      fragments_used: []

    day_3:
      platform: "LinkedIn + Instagram"
      content: "Post profissional + Carousel"
      fragments_used: []

    day_4:
      platform: "TikTok / YouTube Shorts"
      content: "3-5 clips curtos"
      fragments_used: []

    day_5:
      platform: "Twitter"
      content: "Tweets standalone + debate triggers"
      fragments_used: []

    day_6:
      platform: "Instagram Stories"
      content: "Polls + engagement"
      fragments_used: []

    day_7:
      platform: "Recap + Next week tease"
      content: "Resumo + preview"
      fragments_used: []

  total_pieces_generated: 0
  leverage_ratio: ""  # Ex: "1h criação → 12h conteúdo"
  coverage_platforms: []
```

---

## Input Required

```yaml
input:
  big_idea:
    name: ""
    one_liner: ""
    strength_score: 0
    validated_by: "koe-sintetizador"
    cross_domain_bridges: []

  anchor_format: ""  # newsletter | youtube_script | blog

  target_audience:
    primary_persona: ""
    awareness_level: ""
    preferred_platforms: []

  distribution_context:
    priority_platforms: []
    posting_schedule: ""
    previous_cascade_topic: ""

  deep_work_session:
    planned: false
    duration: ""
    time_slot: ""
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_ARQ_004
    created_at: ""
    agent: koe-arquiteto
    big_idea_name: ""
    anchor_format: ""

  anchor_piece:
    title: ""
    word_count: 0
    apag_complete: false
    voice_elements_count: 0
    quality_score: ""
    file_location: ""

  cascade_skeleton:
    total_fragments: 0
    fragments_by_type:
      tweets: 0
      thread_hooks: 0
      clips: 0
      carousels: 0
      linkedin_posts: 0
      visuals: 0
      debates: 0
    coverage_platforms: []
    leverage_ratio: ""

  distribution_brief:
    recommended_schedule: {}
    priority_fragments: []
    platform_specific_notes: {}

  quality_metrics:
    anchor_quality: ""
    cascade_score: 0
    fragments_identified: 0
    platforms_covered: 0
    leverage_ratio_achieved: ""
```

---

## Quality Gate

### Checklist de Validação (KOE_ARQ_004)

**Peça-Âncora:**
- [ ] APAG completo com todas as seções
- [ ] Word count adequado ao formato escolhido
- [ ] Voice elements Dan Koe presentes (em-dashes, perguntas, ritmo)
- [ ] Cross-domain bridges (mínimo 2)

**Cascade Coverage:**
- [ ] Mínimo 10 fragmentos identificados e marcados
- [ ] Mínimo 5 plataformas cobertas
- [ ] Cada fragmento categorizado por tipo
- [ ] Leverage ratio calculado (target: 1h → 10h)

**Fragmentação:**
- [ ] Tweets standalone fazem sentido sem contexto
- [ ] Thread hooks são compelling o suficiente para abrir thread
- [ ] Clip scripts funcionam em 30-60 segundos
- [ ] Visual concepts são visualizáveis

**Sovereignty Check:**
- [ ] Cascade maximiza autonomia do criador
- [ ] Sistema reduz dependência de equipe grande
- [ ] Segue princípio de radical simplicity

---

## Handoff

**Para koe-distribuidor (KOE_DIST_001-006):**
- Anchor piece completo + cascade skeleton + fragment library
- Distribution brief com prioridades por plataforma
- Inline markers [CASCADE:tipo] já presentes no texto

**Para koe-chief:**
- Leverage ratio alcançado
- Quality metrics
- Recomendação de próximo cascade cycle

---

*Koe Arquiteto | Content Cascade Architect | Leverage Maximizer*
*"Create once, distribute forever."*
