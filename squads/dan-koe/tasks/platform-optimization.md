---
task_id: KOE_DIST_006
name: "Platform Optimization"
agent: koe-distribuidor
type: diagnosis
complexity: medium
estimated_time: 30min
version: 1.0.0

source:
  concept: "Platform-specific performance optimization"
  author: "Dan Koe"
  framework: "Social Matrix + Content Cascade + Data-Driven Iteration"
  reference: "Optimize based on what the data says, not what you feel"

inputs:
  required:
    - platform: "Plataforma a ser otimizada (twitter | linkedin | instagram | tiktok | youtube)"
    - metrics_data: "Dados de performance dos últimos 30 dias"
    - content_log: "Log de conteúdo publicado no período"
  optional:
    - competitor_benchmarks: "Benchmarks de creators similares"
    - audience_insights: "Dados demográficos e comportamentais da audiência"
    - previous_optimization: "Otimização anterior para comparar resultados"

outputs:
  primary:
    - optimization_playbook: "Playbook de otimização com ações específicas"
  secondary:
    - pattern_analysis: "Análise de padrões de top performers"
    - content_calendar_adjustments: "Ajustes sugeridos ao calendário"
  template: platform-optimization-output.yaml

validation:
  checklist: optimization-quality-validation.md
  data_analyzed: true
  patterns_identified: true
  playbook_actionable: true

elicit: true
---

# Platform Optimization

## Propósito

> "Don't guess what works — let the data tell you. Then do more of what works
> and less of what doesn't. That's the entire optimization strategy."
> — Dan Koe

Otimizar a performance de conteúdo em uma plataforma específica baseado em dados
de métricas reais. A otimização extrai padrões dos top performers, identifica
o que está funcionando (e o que não está) e cria um playbook acionável para
melhorar resultados no próximo ciclo.

---

## Contexto

No sistema Dan Koe, otimização é data-driven e iterativa:

```
Publicar → Medir → Analisar → Otimizar → Publicar melhor
    ↑                                          │
    └──────────────────────────────────────────┘
```

**Princípios de Otimização:**
1. **Medir antes de mudar** — sem dados, qualquer mudança é palpite
2. **Double down on winners** — encontre o que funciona e faça mais
3. **Kill your darlings** — se não performa, mude (sem apego emocional)
4. **Test one variable** — mudar tudo ao mesmo tempo impede aprendizado
5. **Long-term over viral** — otimizar para crescimento sustentável, não picos

**Métricas que Importam por Plataforma:**

```yaml
key_metrics:
  twitter_x:
    primary: ["impressions", "engagement_rate", "profile_visits"]
    secondary: ["replies", "retweets", "bookmarks"]
    vanity: ["likes"]  # Importante mas não decisivo

  linkedin:
    primary: ["impressions", "engagement_rate", "comment_quality"]
    secondary: ["shares", "profile_visits", "connection_requests"]
    vanity: ["likes"]

  instagram:
    primary: ["reach", "saves", "shares"]
    secondary: ["comments", "profile_visits", "follows"]
    vanity: ["likes"]

  tiktok:
    primary: ["views", "watch_time", "shares"]
    secondary: ["comments", "follows", "saves"]
    vanity: ["likes"]

  youtube:
    primary: ["watch_time", "CTR", "subscriber_conversion"]
    secondary: ["comments", "likes", "shares"]
    vanity: ["view_count"]  # Sem watch time, views são vazias
```

---

## Pré-requisitos

- [ ] Plataforma-alvo definida
- [ ] Mínimo 30 dias de dados disponíveis
- [ ] Log de conteúdo publicado no período
- [ ] Acesso aos analytics da plataforma
- [ ] Objetivo claro (crescimento | engajamento | conversão)

---

## Steps

### Step 1: Coletar e Organizar Métricas

**Objetivo:** Compilar todos os dados relevantes da plataforma no período.

**Data Collection Framework:**

```yaml
data_collection:
  platform: ""
  period: ""

  overview:
    total_posts: 0
    total_impressions: 0
    total_engagement: 0
    avg_engagement_rate: 0
    follower_growth: 0
    follower_growth_rate: 0

  content_performance:
    - post_id: ""
      date: ""
      type: ""  # tweet | thread | post | carousel | reel | video
      topic: ""
      big_idea: ""
      impressions: 0
      engagement: 0
      engagement_rate: 0
      saves: 0
      shares: 0
      comments: 0
      click_through: 0

  time_analysis:
    best_day_of_week: ""
    best_time_of_day: ""
    worst_day_of_week: ""
    worst_time_of_day: ""

  format_analysis:
    best_format: ""
    worst_format: ""
    format_breakdown: {}

  topic_analysis:
    best_topic: ""
    worst_topic: ""
    topic_breakdown: {}
```

---

### Step 2: Identificar Top Performers

**Objetivo:** Encontrar os 20% de conteúdo que gera 80% dos resultados.

**Top Performer Analysis:**

```yaml
top_performer_analysis:
  # Top 20% por engagement rate
  top_posts:
    - post: ""
      metrics: {}

  # Padrões comuns nos top performers
  common_patterns:
    hook_type: ""  # Que tipo de hook aparece mais
    format: ""     # Que formato domina
    topic: ""      # Que tema ressoa mais
    length: ""     # Curto vs longo
    tone: ""       # Contrarian vs educational vs story
    time_posted: ""
    day_posted: ""

    visual_elements:
      text_overlay: false
      emoji_usage: ""
      formatting: ""

  # Elementos exclusivos dos top 3
  top_3_unique:
    post_1:
      unique_element: ""
      replicable: false
    post_2:
      unique_element: ""
      replicable: false
    post_3:
      unique_element: ""
      replicable: false
```

**Análise de Bottom Performers:**

```yaml
bottom_performer_analysis:
  bottom_posts:
    - post: ""
      metrics: {}

  common_anti_patterns:
    - pattern: ""
      frequency: 0
      impact: ""

  lessons:
    - "O que evitar no próximo ciclo"
```

---

### Step 3: Extrair Padrões Acionáveis

**Objetivo:** Transformar dados em insights que guiam decisões.

**Pattern Extraction:**

```yaml
patterns:
  content_patterns:
    winning_hooks:
      - type: ""
        example: ""
        avg_performance: ""
    winning_formats:
      - format: ""
        avg_performance: ""
    winning_topics:
      - topic: ""
        avg_performance: ""
    winning_length:
      optimal_range: ""
      evidence: ""

  timing_patterns:
    best_days: []
    best_times: []
    worst_days: []
    worst_times: []
    evidence: ""

  audience_patterns:
    what_they_save: ""  # Indica valor percebido
    what_they_share: ""  # Indica identidade/agreement
    what_they_comment: ""  # Indica engagement/debate
    what_they_ignore: ""  # Indica irrelevância

  engagement_patterns:
    conversation_starters: ""  # O que gera replies
    virality_triggers: ""  # O que gera shares
    authority_builders: ""  # O que gera follows

  anti_patterns:
    - pattern: ""
      negative_impact: ""
      recommendation: ""
```

---

### Step 4: Criar Playbook de Otimização

**Objetivo:** Compilar todas as descobertas em um playbook executável.

**Optimization Playbook:**

```yaml
optimization_playbook:
  platform: ""
  period_analyzed: ""

  # DO MORE (baseado em top performers)
  do_more:
    - action: ""
      evidence: ""
      expected_impact: ""
      implementation: ""
      priority: ""  # P0 | P1 | P2

  # DO LESS (baseado em bottom performers)
  do_less:
    - action: ""
      evidence: ""
      expected_impact: ""
      priority: ""

  # TEST (hipóteses a validar)
  test:
    - hypothesis: ""
      test_design: ""
      success_metric: ""
      duration: ""
      priority: ""

  # SCHEDULE ADJUSTMENTS
  schedule:
    posting_days: []
    posting_times: []
    frequency: ""
    changes_from_current: ""

  # FORMAT ADJUSTMENTS
  format:
    primary_format: ""
    secondary_format: ""
    formats_to_drop: []
    new_formats_to_test: []

  # HOOK ADJUSTMENTS
  hooks:
    winning_types: []
    templates_to_use: []
    hooks_to_avoid: []

  # CTA ADJUSTMENTS
  ctas:
    best_performing: ""
    worst_performing: ""
    adjustment: ""

  implementation_timeline:
    week_1: ""
    week_2: ""
    week_3: ""
    week_4: ""
    review_date: ""
```

---

## Input Required

```yaml
input:
  platform: ""  # twitter | linkedin | instagram | tiktok | youtube

  metrics_period:
    start_date: ""
    end_date: ""

  content_log:
    total_posts: 0
    posts: []  # Lista de posts com métricas

  platform_analytics:
    follower_count: 0
    follower_growth: 0
    avg_impressions: 0
    avg_engagement_rate: 0

  optimization_goal: ""  # growth | engagement | conversion | retention

  audience_insights:
    demographics: {}
    active_times: {}
    interests: []

  competitor_benchmarks:
    - creator: ""
      avg_engagement: 0
      best_format: ""

  previous_optimization:
    date: ""
    changes_made: []
    results: {}
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_DIST_006
    created_at: ""
    agent: koe-distribuidor
    platform: ""
    period_analyzed: ""
    optimization_goal: ""

  performance_summary:
    total_posts: 0
    avg_engagement_rate: 0
    follower_growth: 0
    top_post: ""
    bottom_post: ""

  patterns:
    winning_hooks: []
    winning_formats: []
    winning_topics: []
    winning_times: []
    anti_patterns: []

  playbook:
    do_more: []
    do_less: []
    test: []
    schedule_changes: {}
    format_changes: {}
    hook_changes: {}
    cta_changes: {}

  implementation_timeline: {}

  comparison:
    vs_previous: ""
    improvement_areas: []
    regression_areas: []

  quality_metrics:
    data_analyzed: true
    patterns_identified: true
    playbook_actionable: true
    timeline_defined: true
    sovereignty_maintained: true
```

---

## Quality Gate

### Checklist de Validação (KOE_DIST_006)

**Dados:**
- [ ] Mínimo 30 dias de dados analisados
- [ ] Todas as métricas-chave coletadas
- [ ] Top e bottom performers identificados
- [ ] Time analysis completa

**Análise:**
- [ ] Padrões de sucesso extraídos com evidência
- [ ] Anti-padrões identificados com exemplos
- [ ] Audiência patterns mapeados
- [ ] Benchmarks de competidores consultados (se disponível)

**Playbook:**
- [ ] Ações "Do More" com evidência e prioridade
- [ ] Ações "Do Less" com evidência
- [ ] Hipóteses "Test" com design de teste
- [ ] Schedule, format, hook e CTA adjustments
- [ ] Timeline de implementação de 4 semanas

**Sovereignty Check:**
- [ ] Otimizações não sacrificam autenticidade por métricas
- [ ] Não recomenda tactics que violam immune system
- [ ] Mantém foco em valor, não em vanity metrics
- [ ] Mudanças são testáveis (1 variável por vez)

**Immune System:**
- [ ] Não recomenda clickbait ou engagement bait
- [ ] Não sacrifica profundidade por alcance
- [ ] Não sugere seguir trends que contradizem a marca
- [ ] Vanity metrics (likes) não são tratadas como KPI principal

---

## Handoff

**Para koe-distribuidor (próximo ciclo):**
- Playbook completo para implementação
- Calendar adjustments para KOE_DIST_004
- Hook templates atualizados

**Para koe-chief:**
- Performance summary da plataforma
- Trend vs períodos anteriores
- Recomendação de investimento de tempo por plataforma

**Para koe-arquiteto:**
- Feedback sobre quais tipos de conteúdo performam melhor
- Hook types que mais convertem na plataforma
- Temas que a audiência mais valoriza (para guiar criação)

---

*Koe Distribuidor | Platform Optimizer | Data-Driven Iteration Specialist*
*"Don't guess what works — let the data tell you."*
