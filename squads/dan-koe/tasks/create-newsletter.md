---
task_id: KOE_ARQ_002
name: "Create Newsletter"
agent: koe-arquiteto
type: creation
complexity: high
estimated_time: 120min
version: 1.0.0

source:
  format: "Koe Letter format"
  author: "Dan Koe"
  framework: "APAG + Content Cascade + Deep Work Protocol"
  reference: "Weekly newsletter as anchor piece for entire content ecosystem"

inputs:
  required:
    - big_idea: "Big Idea validada e nomeada pelo koe-sintetizador"
    - audience_context: "Contexto do público com awareness level"
    - week_theme: "Tema da semana alinhado com calendário editorial"
  optional:
    - queue_notes: "Notas da Queue priorizadas para esta edição"
    - previous_editions: "Últimas 3 edições para manter continuidade"
    - cascade_plan: "Plano de cascade pré-definido pelo koe-distribuidor"

outputs:
  primary:
    - newsletter_draft: "Newsletter completa (1500-3000 palavras) em formato Koe Letter"
  secondary:
    - cascade_skeleton: "Esqueleto de cascade com 15+ fragmentos identificados"
    - voice_elements_log: "Log de elementos de voz aplicados (em-dashes, perguntas retóricas)"
  template: newsletter-output.yaml

validation:
  checklist: content-quality-validation.md
  word_count_range: [1500, 3000]
  apag_structure: true
  cascade_fragments_min: 15

elicit: true
---

# Create Newsletter (Koe Letter Format)

## Propósito

> "Your newsletter is the foundation of your entire content business. Everything else is a derivative."
> — Dan Koe

Criar a newsletter semanal de longa duração (1500-3000 palavras) que serve como peça-âncora
de todo o Content Cascade. A Koe Letter é o ativo de maior profundidade — dela derivam
tweets, threads, clips, posts e scripts de vídeo. Uma newsletter bem escrita alimenta
uma semana inteira de conteúdo distribuído.

---

## Contexto

A newsletter no sistema Dan Koe não é apenas um email — é o **motor do Content Cascade**.
Cada edição segue a estrutura APAG mas com profundidade expandida, permitindo exploração
completa de uma Big Idea com múltiplas pontes cross-domain.

**Características da Koe Letter:**
- Formato longo (1500-3000 palavras) — profundidade do Iceberg Model
- Estrutura APAG expandida com sub-seções
- Voz pessoal forte com em-dashes, perguntas retóricas e frases curtas
- Cada parágrafo é potencialmente um tweet ou clip standalone
- Tom conversacional como se falasse com um amigo inteligente
- Sempre conecta filosofia de vida com estratégia prática

**Posição no Pipeline:**
```
Queue → Sintetizador → [NEWSLETTER] → Cascade → Distribuição
                         ↑ Você está aqui
```

---

## Pré-requisitos

- [ ] Big Idea selecionada e validada (strength score >= 7/10)
- [ ] Sessão de Deep Work agendada (mínimo 2 horas ininterruptas)
- [ ] Últimas 3 edições revisadas (evitar repetição de temas)
- [ ] Queue notes relevantes compiladas
- [ ] Ambiente de criação preparado (zero notificações)

---

## Steps

### Step 1: Selecionar Big Idea e Validar Força

**Objetivo:** Confirmar que a Big Idea tem profundidade suficiente para 1500-3000 palavras.

**Teste de Força da Big Idea:**

```yaml
big_idea_strength_test:
  name: ""
  one_liner: ""

  depth_check:
    can_explain_in_1_paragraph: true  # Se não, é complexa demais
    can_expand_to_3000_words: true    # Se não, é rasa demais
    has_cross_domain_bridges: 2+      # Mínimo para Koe Letter

  relevance_check:
    solves_real_pain: true
    audience_cares_today: true        # Timing importa
    not_covered_last_3_editions: true

  uniqueness_check:
    contrarian_angle_exists: true     # Precisa de ângulo diferente
    personal_experience_available: true

  strength_score: 0  # 1-10, precisa >= 7
```

**Se score < 7:** Retornar à Queue ou pedir ao koe-sintetizador para fortalecer.

---

### Step 2: Outline APAG Expandido

**Objetivo:** Criar esqueleto detalhado antes de escrever o draft.

**Estrutura do Outline:**

```yaml
newsletter_outline:
  subject_line:
    primary: ""
    variant_a: ""
    variant_b: ""

  attention_section:
    hook_type: ""
    hook_draft: ""
    opening_story_or_statement: ""
    transition_to_perspective: ""
    target_word_count: 200-400

  perspective_section:
    main_reframe: ""
    cross_domain_bridge_1:
      from: ""
      to: ""
      insight: ""
    cross_domain_bridge_2:
      from: ""
      to: ""
      insight: ""
    key_rhetorical_questions:
      - ""
      - ""
    target_word_count: 500-1000

  advantage_section:
    transformation_promise: ""
    benefit_1_tangible: ""
    benefit_2_emotional: ""
    benefit_3_compounding: ""
    proof_elements:
      - ""
    target_word_count: 400-800

  gamify_section:
    cta_type: ""
    action_steps:
      - ""
    target_word_count: 200-400
```

**Tempo estimado para outline:** 15-20 minutos.

---

### Step 3: Escrever Draft em Sessão de Deep Work

**Objetivo:** Transformar o outline em newsletter completa durante uma sessão focada.

**Protocolo de Deep Work para Newsletter:**

1. **Setup (5 min):**
   - Fechar todas as abas exceto editor
   - Colocar celular em modo avião
   - Abrir outline ao lado do editor
   - Definir timer para 90 minutos

2. **Escrita do Draft (90 min):**
   - Escrever na ordem: Attention → Perspective → Advantage → Gamify
   - NÃO editar durante a escrita — fluxo contínuo
   - Marcar [TODO] em pontos que precisam de pesquisa
   - Manter parágrafo médio de 2-3 frases (estilo Koe)
   - Alternar frases curtas e complexas para ritmo

3. **Regras de Escrita Dan Koe:**
   - Parágrafos curtos (2-4 linhas máximo)
   - Em-dashes para criar pausas dramáticas
   - Perguntas retóricas a cada 300-500 palavras
   - Tom conversacional direto ("Você" não "As pessoas")
   - Evitar jargão acadêmico — explicar como se fosse para amigo

4. **Pausas Produtivas:**
   - Se travar, levantar e caminhar 2 minutos
   - Se a energia cair, trocar de seção (não precisa ser linear)
   - Se a Big Idea não funciona, pivotar ângulo (não abandonar)

---

### Step 4: Adicionar Elementos de Voz e Polir

**Objetivo:** Transformar draft em conteúdo com voz autêntica Dan Koe.

**Checklist de Elementos de Voz:**

```yaml
voice_elements:
  em_dashes:
    minimum: 5
    usage: "Pausas dramáticas, inserções de pensamento"
    example: "The problem isn't lack of ideas — it's lack of systems"

  rhetorical_questions:
    minimum: 3
    usage: "Forçar reflexão, criar engagement"
    example: "But what if the problem isn't motivation — it's architecture?"

  short_sentences:
    frequency: "A cada 3-4 frases complexas"
    usage: "Impacto, ênfase, ritmo"
    example: "That's the real problem."

  personal_stories:
    minimum: 1
    usage: "Autenticidade, prova social sutil"

  contrarian_statements:
    minimum: 2
    usage: "Diferenciação, provocação intelectual"

  cross_domain_references:
    minimum: 2
    usage: "Digital Renaissance — conectar campos inesperados"
```

**Processo de Polimento:**
1. Ler o draft em voz alta (teste de ritmo e naturalidade)
2. Adicionar em-dashes onde há pausas naturais
3. Converter declarações em perguntas retóricas onde cabível
4. Inserir frases curtas de impacto após parágrafos densos
5. Verificar que cada parágrafo pode funcionar standalone (cascade-ready)

---

### Step 5: Extrair Cascade Fragments

**Objetivo:** Identificar e marcar todos os fragmentos reutilizáveis.

**Processo de Extração:**

```yaml
cascade_extraction:
  tweets:
    criteria: "Frase standalone < 280 chars com impacto"
    target: 7-10

  thread_hooks:
    criteria: "Pontos que podem abrir um thread de 7-15 tweets"
    target: 2-3

  clip_sections:
    criteria: "Parágrafos que funcionam como micro-conteúdo (30-60s leitura)"
    target: 3-5

  visual_concepts:
    criteria: "Conceitos que podem virar infográfico ou slide"
    target: 2-3

  youtube_segments:
    criteria: "Seções que podem virar segmentos de vídeo"
    target: 2-4

  debate_triggers:
    criteria: "Afirmações contrarian que geram engajamento"
    target: 2-3
```

**Para cada fragmento, marcar:**
- Tipo (tweet, thread_hook, clip, visual, youtube, debate)
- Localização (parágrafo e linha)
- Texto exato ou range
- Adaptação necessária (nenhuma, leve, significativa)

---

### Step 6: Revisão Final e Subject Line

**Objetivo:** Garantir qualidade editorial e criar subject line irresistível.

**Subject Line Framework:**

```yaml
subject_line_types:
  curiosity: "The [unexpected thing] about [common topic]"
  contrarian: "[Popular belief] is wrong. Here's why."
  benefit: "How to [desired outcome] in [timeframe]"
  story: "I [did something unexpected] and [result]"
  question: "What if [paradigm shift]?"
```

**Checklist Final:**
1. Subject line testada (3 variantes)
2. Contagem de palavras dentro do range (1500-3000)
3. Todos os [TODO] resolvidos
4. Links e referências verificados
5. Preview text definido (complementa subject line)
6. Cascade fragments marcados e catalogados

---

## Input Required

```yaml
input:
  big_idea:
    name: ""
    one_liner: ""
    strength_score: 0
    validated_by: "koe-sintetizador"

  week_context:
    week_number: 0
    theme: ""
    previous_edition_topic: ""
    audience_feedback_signals: ""

  target_audience:
    primary_persona: ""
    awareness_level: ""
    current_pain_point: ""

  deep_work_session:
    planned_duration: "120min"
    time_slot: ""
    environment_ready: false

  queue_references:
    - note_id: ""
      topic: ""
      relevance_score: 0

  cascade_plan:
    platforms_target: []
    distribution_week: ""
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_ARQ_002
    created_at: ""
    agent: koe-arquiteto
    edition_number: 0
    big_idea_name: ""
    word_count: 0
    creation_time_minutes: 0
    deep_work_quality: ""  # flow | good | interrupted | struggled

  newsletter:
    subject_line:
      primary: ""
      variant_a: ""
      variant_b: ""
    preview_text: ""

    content:
      attention:
        hook_type: ""
        word_count: 0
        text: ""
      perspective:
        cross_domain_bridges: []
        rhetorical_questions: []
        word_count: 0
        text: ""
      advantage:
        transformation: ""
        benefits: []
        word_count: 0
        text: ""
      gamify:
        cta_type: ""
        action: ""
        word_count: 0
        text: ""

    total_word_count: 0
    estimated_read_time: ""

  voice_elements_log:
    em_dash_count: 0
    rhetorical_question_count: 0
    short_sentences_count: 0
    personal_stories_count: 0
    contrarian_statements_count: 0
    cross_domain_references_count: 0

  cascade_skeleton:
    total_fragments: 0
    tweets:
      - text: ""
        paragraph_ref: 0
    thread_hooks:
      - text: ""
        expandable_to: 0  # estimated tweet count
    clip_sections:
      - start_paragraph: 0
        end_paragraph: 0
        estimated_duration: ""
    visual_concepts:
      - concept: ""
        suggested_format: ""
    youtube_segments:
      - topic: ""
        estimated_duration: ""
    debate_triggers:
      - statement: ""
        expected_reaction: ""

  quality_metrics:
    word_count_in_range: false
    apag_complete: false
    cross_domain_bridges_count: 0
    voice_elements_sufficient: false
    cascade_fragments_count: 0
    subject_line_variants: 0
```

---

## Quality Gate

### Checklist de Validação (KOE_ARQ_002)

**Estrutura e Formato:**
- [ ] Word count entre 1500-3000 palavras
- [ ] Estrutura APAG completa (todas as 4 seções presentes)
- [ ] Subject line com 3 variantes para teste
- [ ] Preview text complementar definido

**Profundidade (Iceberg Model):**
- [ ] Mínimo 2 pontes cross-domain desenvolvidas
- [ ] Pelo menos 1 exemplo pessoal ou caso de uso
- [ ] Big Idea explorada com profundidade (não superficial)
- [ ] Cada seção APAG com desenvolvimento adequado

**Voz Dan Koe:**
- [ ] Mínimo 5 em-dashes para ritmo
- [ ] Mínimo 3 perguntas retóricas
- [ ] Parágrafos curtos (máximo 4 linhas)
- [ ] Tom conversacional direto
- [ ] Frases curtas de impacto alternando com complexas

**Content Cascade Ready:**
- [ ] Mínimo 15 cascade fragments identificados
- [ ] Tweets standalone marcados (7-10)
- [ ] Thread hooks identificados (2-3)
- [ ] Clip sections delimitados (3-5)
- [ ] Visual concepts sugeridos (2-3)

**Sovereignty Check:**
- [ ] Conteúdo aumenta autonomia do leitor
- [ ] Não cria dependência artificial
- [ ] Segue radical simplicity

**Immune System:**
- [ ] Sem táticas de urgência falsa
- [ ] Sem promessas de resultado rápido sem esforço
- [ ] Sem vanity metrics como argumento

---

## Handoff

**Para koe-distribuidor (KOE_DIST_001-006):**
- Newsletter completa + cascade_skeleton com fragmentos marcados
- Subject line variants para teste A/B
- Voice elements log para manter consistência nas adaptações

**Para koe-chief:**
- Métricas de qualidade e tempo de criação
- Sinalizar se a edição precisa de revisão adicional
- Feedback sobre a Big Idea (forte o suficiente? precisa de mais desenvolvimento?)

---

*Koe Arquiteto | Deep Work Executor | Newsletter Specialist*
*"Your newsletter is the foundation. Everything else is a derivative."*
