---
task_id: KOE_DIST_004
name: "Cascade Calendar"
agent: koe-distribuidor
type: design
complexity: medium
estimated_time: 20min
version: 1.0.0

source:
  concept: "Content Cascade Distribution Calendar"
  author: "Dan Koe"
  framework: "Content Cascade + Social Matrix + Leverage Stack"
  reference: "7-day distribution cadence from single Content Cascade output"

inputs:
  required:
    - cascade_output: "Output completo do Content Cascade (KOE_ARQ_004)"
    - available_content: "Lista de conteúdo adaptado por plataforma (KOE_DIST_001-003)"
    - week_start_date: "Data de início da semana de distribuição"
  optional:
    - platform_analytics: "Dados de melhores horários e dias por plataforma"
    - audience_timezone: "Fuso horário principal da audiência"
    - previous_calendar: "Calendário da semana anterior para continuidade"

outputs:
  primary:
    - weekly_calendar: "Calendário de 7 dias com postagens mapeadas por plataforma e horário"
  secondary:
    - engagement_windows: "Janelas de engajamento pós-publicação"
    - contingency_slots: "Slots de contingência para conteúdo reativo"
  template: cascade-calendar-output.yaml

validation:
  checklist: distribution-quality-validation.md
  days_covered: 7
  platforms_per_day: 2
  engagement_windows_defined: true

elicit: true
---

# Cascade Calendar

## Propósito

> "Distribution without a calendar is like writing without structure —
> you might get lucky, but you'll never get leverage."
> — Dan Koe

Criar o calendário de distribuição de 7 dias a partir do output do Content Cascade,
mapeando qual conteúdo vai para qual plataforma, em qual dia e horário. O calendário
é o plano de execução que transforma um Content Cascade em uma semana completa
de presença consistente em todas as plataformas.

---

## Contexto

No sistema Dan Koe, a distribuição segue uma cadência previsível:

```
Semana Típica de Distribuição:

Seg  → Newsletter (Anchor) + Preview tweet
Ter  → Twitter Thread (derivado da newsletter)
Qua  → LinkedIn Post + Instagram Carousel
Qui  → YouTube Video (se gravado) + Standalone tweets
Sex  → TikTok/Reels (clips) + Twitter debate post
Sab  → Instagram Stories + Engagement responds
Dom  → Recap + planejamento da semana seguinte
```

**Por que um calendário é necessário:**
- Garante consistência (a audiência espera regularidade)
- Evita "content panic" (tudo já está planejado)
- Maximiza alcance (cada plataforma no melhor horário)
- Permite engagement proativo (janelas de resposta definidas)
- Mede leverage ratio (1h criação → Xh distribuição)

---

## Pré-requisitos

- [ ] Content Cascade output disponível (KOE_ARQ_004)
- [ ] Conteúdos adaptados por plataforma (KOE_DIST_001-003)
- [ ] Horários de pico por plataforma conhecidos
- [ ] Fuso horário da audiência definido
- [ ] Calendário da semana anterior revisado

---

## Steps

### Step 1: Mapear Conteúdo Disponível por Dia

**Objetivo:** Organizar todo o conteúdo do cascade em slots de 7 dias.

**Content Inventory:**

```yaml
content_inventory:
  anchor_pieces:
    - type: "newsletter"
      ready: false
      source: "KOE_ARQ_002"
    - type: "youtube_video"
      ready: false
      source: "KOE_ARQ_006"

  cascade_derivatives:
    - type: "twitter_thread"
      ready: false
      source: "KOE_DIST_001"
    - type: "short_clips"
      ready: false
      count: 0
      source: "KOE_DIST_002"
    - type: "platform_adaptations"
      ready: false
      platforms: []
      source: "KOE_DIST_003"

  standalone_content:
    - type: "tweets"
      count: 0
    - type: "engagement_posts"
      count: 0
    - type: "polls"
      count: 0

  total_pieces: 0
```

**Regra de Mapeamento:**
- Dia 1: Anchor piece (maior profundidade)
- Dias 2-3: Derivativos diretos (thread, carousel)
- Dias 4-5: Clips e adaptações
- Dias 6-7: Engagement, repurpose, tease da próxima semana

---

### Step 2: Atribuir Plataformas e Horários

**Objetivo:** Definir quando e onde cada peça é publicada.

**Optimal Posting Matrix:**

```yaml
posting_matrix:
  twitter_x:
    best_days: ["terça", "quarta", "quinta"]
    best_times: ["08:00", "12:00", "17:00"]
    frequency: "1-3 posts/dia"
    content_types: ["threads", "tweets", "polls", "debates"]

  linkedin:
    best_days: ["terça", "quarta", "quinta"]
    best_times: ["08:00", "10:00"]
    frequency: "1 post/dia (dias úteis)"
    content_types: ["long_post", "carousel", "insight"]

  instagram:
    best_days: ["segunda", "quarta", "sexta"]
    best_times: ["09:00", "12:00", "19:00"]
    frequency: "1 feed post/dia + stories diários"
    content_types: ["carousel", "reel", "story", "single_image"]

  tiktok:
    best_days: ["terça", "quinta", "sábado"]
    best_times: ["11:00", "19:00", "21:00"]
    frequency: "1-2 videos/dia"
    content_types: ["clip", "tutorial", "hot_take"]

  youtube_shorts:
    best_days: ["quarta", "sexta", "domingo"]
    best_times: ["12:00", "17:00"]
    frequency: "3-5 shorts/semana"
    content_types: ["clip", "mini_tutorial"]
```

**Nota:** Estes horários são guidelines iniciais. Ajustar baseado em analytics reais
do `platform_analytics` input.

---

### Step 3: Definir Janelas de Engagement

**Objetivo:** Programar janelas para responder comentários e interagir.

**Engagement Windows:**

```yaml
engagement_windows:
  post_publication:
    duration: "30-60 min após cada publicação"
    actions:
      - "Responder primeiros comentários"
      - "Repostar/compartilhar engajamento relevante"
      - "Engajar com conteúdo de outros creators"

  daily_check:
    times: ["10:00", "15:00", "20:00"]
    duration: "15 min cada"
    actions:
      - "Verificar notificações"
      - "Responder DMs relevantes"
      - "Engajar com audiência"

  weekly_community:
    day: "sábado"
    duration: "60 min"
    actions:
      - "Responder backlog de comentários"
      - "Criar polls/perguntas de engagement"
      - "Identificar UGC e shared content"
```

**Regra Dan Koe:** Engagement é distribuição. Responder comentários mantém o algoritmo
ativo e cria relacionamento com a audiência. Não é opcional — é parte do sistema.

---

### Step 4: Criar Calendário Visual de 7 Dias

**Objetivo:** Montar o calendário completo com todos os slots preenchidos.

**Calendar Template:**

```yaml
weekly_calendar:
  week_of: ""
  big_idea: ""
  anchor_piece: ""

  monday:
    theme: "Anchor Day — Newsletter Launch"
    posts:
      - platform: "email"
        time: "08:00"
        content: "Newsletter completa"
        type: "anchor"
        status: "scheduled | draft | published"
      - platform: "twitter_x"
        time: "09:00"
        content: "Preview tweet com link"
        type: "promotion"
        status: ""
    engagement_window: "09:00-10:00"

  tuesday:
    theme: "Thread Day — Twitter/X Deep Dive"
    posts:
      - platform: "twitter_x"
        time: "08:00"
        content: "Thread principal (7-15 tweets)"
        type: "cascade"
        status: ""
      - platform: "linkedin"
        time: "10:00"
        content: "Post profissional derivado"
        type: "adaptation"
        status: ""
    engagement_window: "08:30-09:30 + 12:00-12:30"

  wednesday:
    theme: "Visual Day — Instagram + Carousel"
    posts:
      - platform: "instagram"
        time: "09:00"
        content: "Carousel educativo (8-10 slides)"
        type: "cascade"
        status: ""
      - platform: "twitter_x"
        time: "12:00"
        content: "Standalone tweets (2-3)"
        type: "engagement"
        status: ""
    engagement_window: "09:30-10:00 + 19:00-19:30"

  thursday:
    theme: "Video Day — YouTube + Clips"
    posts:
      - platform: "youtube"
        time: "12:00"
        content: "Vídeo longo (se disponível)"
        type: "anchor"
        status: ""
      - platform: "twitter_x"
        time: "17:00"
        content: "Debate trigger tweet"
        type: "engagement"
        status: ""
    engagement_window: "12:30-13:00 + 17:30-18:00"

  friday:
    theme: "Short-Form Day — TikTok + Reels"
    posts:
      - platform: "tiktok"
        time: "11:00"
        content: "Clip 1 (30-60s)"
        type: "cascade"
        status: ""
      - platform: "instagram"
        time: "19:00"
        content: "Reel (30-60s)"
        type: "cascade"
        status: ""
      - platform: "youtube_shorts"
        time: "17:00"
        content: "Short (30-60s)"
        type: "cascade"
        status: ""
    engagement_window: "11:30-12:00 + 19:30-20:00"

  saturday:
    theme: "Engagement Day — Community + Stories"
    posts:
      - platform: "instagram"
        time: "10:00"
        content: "Stories sequence (polls, Q&A)"
        type: "engagement"
        status: ""
      - platform: "tiktok"
        time: "19:00"
        content: "Clip 2 (30-60s)"
        type: "cascade"
        status: ""
    engagement_window: "10:00-11:00 (community block)"

  sunday:
    theme: "Recap + Planning"
    posts:
      - platform: "twitter_x"
        time: "10:00"
        content: "Recap tweet ou next week tease"
        type: "engagement"
        status: ""
    engagement_window: "Minimal — recovery day"
    planning: "Revisar métricas + planejar próxima semana"
```

---

## Input Required

```yaml
input:
  cascade_output:
    big_idea: ""
    anchor_format: ""
    total_fragments: 0
    fragments_by_type: {}

  adapted_content:
    thread_ready: false
    clips_ready: false
    platform_adaptations_ready: false

  schedule_context:
    week_start_date: ""
    audience_timezone: ""
    special_dates: []  # Feriados, eventos relevantes

  platform_analytics:
    best_times: {}
    best_days: {}
    top_performing_content: {}

  previous_calendar:
    last_week_theme: ""
    carryover_content: []
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_DIST_004
    created_at: ""
    agent: koe-distribuidor
    week_of: ""
    big_idea: ""

  calendar:
    monday: {}
    tuesday: {}
    wednesday: {}
    thursday: {}
    friday: {}
    saturday: {}
    sunday: {}

  summary:
    total_posts: 0
    posts_by_platform:
      twitter_x: 0
      linkedin: 0
      instagram: 0
      tiktok: 0
      youtube: 0
      youtube_shorts: 0
      email: 0
    engagement_windows_total: 0
    estimated_distribution_time: ""

  contingency_slots:
    - day: ""
      time: ""
      purpose: "Conteúdo reativo / trending topic"

  quality_metrics:
    days_covered: 0
    platforms_per_day_avg: 0
    engagement_windows_defined: false
    balance_score: ""  # Bem distribuído vs concentrado
```

---

## Quality Gate

### Checklist de Validação (KOE_DIST_004)

**Cobertura:**
- [ ] 7 dias cobertos
- [ ] Mínimo 2 plataformas por dia (média)
- [ ] Todas as 5 plataformas representadas na semana
- [ ] Anchor piece publicado no Dia 1

**Cadência:**
- [ ] Distribuição espaçada (não tudo no mesmo dia)
- [ ] Horários alinhados com peak times de cada plataforma
- [ ] Engagement windows definidas para cada dia de publicação
- [ ] Contingency slots para conteúdo reativo

**Leverage:**
- [ ] Todo conteúdo deriva do mesmo Content Cascade
- [ ] Ratio criação:distribuição registrado
- [ ] Sem criação nova necessária (apenas distribuição)

**Sovereignty Check:**
- [ ] Calendário é executável por 1 pessoa
- [ ] Tempo total de distribuição é razoável (< 1h/dia)
- [ ] Segue radical simplicity

---

## Handoff

**Para execução (publicação):**
- Calendário completo com horários e conteúdo por slot
- Engagement windows para cada dia

**Para koe-chief:**
- Resumo da semana com total de posts e plataformas
- Leverage ratio (criação vs distribuição)
- Recomendações para próxima semana

**Para koe-distribuidor (KOE_DIST_005 — Audit):**
- Dados de planejamento para comparar com performance real

---

*Koe Distribuidor | Cascade Calendar Architect | Distribution Planner*
*"Distribution without a calendar is like writing without structure."*
