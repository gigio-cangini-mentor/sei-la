---
task_id: KOE_ARQ_006
name: "YouTube Script"
agent: koe-arquiteto
type: creation
complexity: high
estimated_time: 90min
version: 1.0.0

source:
  channel: "Dan Koe YouTube channel (2M+ subscribers)"
  author: "Dan Koe"
  framework: "APAG Structure + Visual Storytelling + Content Cascade"
  reference: "Long-form videos (15-25 min) as authority-building anchor content"

inputs:
  required:
    - big_idea: "Big Idea validada pelo koe-sintetizador"
    - video_angle: "Ângulo específico do vídeo (tutorial, filosofia, framework, story)"
    - target_viewer: "Perfil do viewer com awareness level"
  optional:
    - newsletter_source: "Newsletter que originou o vídeo (se cascade)"
    - b_roll_resources: "Recursos visuais disponíveis"
    - previous_videos: "Últimos 5 vídeos para evitar repetição"

outputs:
  primary:
    - full_script: "Script completo (15-25 min) com visual cues"
  secondary:
    - clip_markers: "Marcações de clips curtos (30-60s) para Shorts/Reels"
    - thumbnail_concepts: "3 conceitos de thumbnail"
    - seo_metadata: "Título, descrição e tags otimizados"
  template: youtube-script-output.yaml

validation:
  checklist: video-quality-validation.md
  apag_structure: true
  visual_cues_present: true
  hook_under_30s: true
  clips_identified: 3

elicit: true
---

# YouTube Script

## Propósito

> "YouTube is the modern university. A 20-minute video can change someone's trajectory
> more than four years of college — if you structure it right."
> — Dan Koe

Escrever um script de YouTube de longa duração (15-25 minutos) utilizando a estrutura
APAG adaptada para vídeo, com visual cues para b-roll, on-screen text e transições.
O vídeo é uma peça-âncora do Content Cascade e a principal ferramenta de construção
de autoridade no sistema Dan Koe.

---

## Contexto

No ecossistema Dan Koe, YouTube cumpre múltiplos papéis:

1. **Authority Builder** — vídeos longos demonstram profundidade (Iceberg Model)
2. **Lead Generator** — YouTube → Newsletter → Offers (funil natural)
3. **Cascade Source** — 1 vídeo de 20min → 5+ clips curtos + tweets + posts
4. **Evergreen Asset** — vídeos continuam gerando views e leads por anos
5. **Trust Accelerator** — 20 minutos de vídeo cria mais confiança que 100 tweets

**Estilo Visual Dan Koe:**
- Talking head com b-roll frequente
- On-screen text para pontos-chave
- Slides minimalistas para frameworks
- Cenário clean e iluminação quente
- Edição rápida nos primeiros 30 segundos (retenção)

**Posição no Cascade:**
```
Big Idea → Newsletter → [YOUTUBE SCRIPT] → Clips → Shorts → Social
                              ↑ Você está aqui
```

---

## Pré-requisitos

- [ ] Big Idea validada (idealmente já publicada como newsletter para testar reação)
- [ ] Ângulo do vídeo definido (tutorial, filosofia, framework, story)
- [ ] Viewer persona clara
- [ ] Referências visuais coletadas (b-roll disponível)
- [ ] Sessão de Deep Work agendada (90 min)
- [ ] Últimos 5 vídeos revisados (evitar repetição de temas)

---

## Steps

### Step 1: Escrever Hook (Primeiros 30 Segundos)

**Objetivo:** Criar os primeiros 30 segundos que determinam se o viewer fica ou sai.

**Anatomia do Hook Dan Koe:**

```yaml
hook_anatomy:
  # Segundo 0-5: PATTERN INTERRUPT
  pattern_interrupt:
    type: ""  # bold_statement | question | story_open | contrarian
    text: ""
    visual: ""  # O que aparece na tela

  # Segundo 5-15: CONTEXT BRIDGE
  context_bridge:
    text: ""  # Conecta o interrupt com o tema do vídeo
    visual: ""

  # Segundo 15-25: PROMISE
  promise:
    text: ""  # O que o viewer ganha se ficar
    specificity: ""  # Quanto mais específico, melhor
    visual: ""

  # Segundo 25-30: TEASE
  tease:
    text: ""  # Tease de algo que vem mais tarde no vídeo
    creates_open_loop: true
    visual: ""
```

**Tipos de Hook que Funcionam no Canal Dan Koe:**

```yaml
hook_types:
  contrarian_opener:
    example: "Everything you know about productivity is wrong — and I can prove it."
    when_to_use: "Quando a Big Idea desafia crença popular"

  personal_failure:
    example: "I wasted 3 years building a business the wrong way. Here's what I'd do instead."
    when_to_use: "Quando há história pessoal relevante"

  curiosity_gap:
    example: "There's one thing every successful creator does that nobody talks about."
    when_to_use: "Quando o insight não é óbvio"

  bold_prediction:
    example: "In 5 years, 90% of traditional careers will be obsolete. Here's how to prepare."
    when_to_use: "Quando a Big Idea tem implicação de futuro"

  result_showcase:
    example: "This one system generates $50k/month from 2 hours of work. Let me show you how."
    when_to_use: "Quando há resultado concreto para demonstrar"
```

**Regras do Hook:**
- MÁXIMO 30 segundos (idealmente 15-20)
- Edição rápida (cortes a cada 2-3 segundos)
- On-screen text nos primeiros 5 segundos
- NÃO começar com "Hey guys" ou intro genérica
- O hook é a thumbnail em formato de áudio

---

### Step 2: Desenvolver Perspective com B-Roll Cues

**Objetivo:** Escrever a seção de reframe com indicações visuais para edição.

**Perspective Section Format:**

```yaml
perspective_section:
  duration: "5-8 minutos"

  structure:
    reframe_introduction:
      script: ""
      visual_cue: "[TALKING HEAD + on-screen text: conceito-chave]"

    cross_domain_bridge_1:
      script: ""
      visual_cue: "[B-ROLL: imagens do domínio de origem]"
      transition: "[SLIDE: diagrama da ponte cross-domain]"

    cross_domain_bridge_2:
      script: ""
      visual_cue: "[B-ROLL: imagens do domínio de destino]"

    rhetorical_question:
      script: ""
      visual_cue: "[TALKING HEAD close-up, pausa dramática]"

    insight_reveal:
      script: ""
      visual_cue: "[ON-SCREEN TEXT: frase de impacto + talking head]"
```

**Visual Cue Legend:**
```
[TH]     = Talking Head (câmera frontal)
[TH-CU]  = Talking Head Close-Up (ênfase)
[B-ROLL]  = Footage de cobertura
[SLIDE]   = Slide minimalista
[TEXT]    = On-screen text overlay
[SCREEN]  = Screen recording
[TRANS]   = Transição entre seções
[PAUSE]   = Pausa dramática (1-2 segundos de silêncio)
```

**Regras Visuais:**
- Trocar de visual a cada 15-30 segundos (manter atenção)
- B-roll em momentos de conceito abstrato
- Slides apenas para frameworks com passos
- On-screen text para frases de impacto
- Close-up para momentos emocionais ou perguntas retóricas

---

### Step 3: Criar Advantage Section com On-Screen Examples

**Objetivo:** Demonstrar benefícios com exemplos visuais na tela.

**Advantage Section Format:**

```yaml
advantage_section:
  duration: "5-8 minutos"

  structure:
    transformation_promise:
      script: ""
      visual_cue: "[TH] + [TEXT: De X → Para Y]"

    benefit_1_tangible:
      script: ""
      visual_cue: "[SCREEN: exemplo real na tela]"
      demo_description: ""

    benefit_2_emotional:
      script: ""
      visual_cue: "[TH-CU] + [B-ROLL: lifestyle relevante]"

    benefit_3_compounding:
      script: ""
      visual_cue: "[SLIDE: gráfico de crescimento composto]"

    proof_element:
      type: ""  # personal_result | student_result | data | case_study
      script: ""
      visual_cue: "[SCREEN: screenshot/dados reais]"

    step_by_step:
      intro: ""
      visual_cue: "[SLIDE: lista de passos]"
      steps:
        - step: ""
          script: ""
          visual_cue: ""
          duration: ""
```

**Regras:**
- Sempre demonstrar, não apenas explicar
- Screen recordings para processos práticos
- Resultados reais > resultados teóricos
- Cada benefício com prova visual

---

### Step 4: Desenhar End CTA

**Objetivo:** Criar call-to-action final que converte viewer em subscriber/lead.

**CTA Structure:**

```yaml
end_cta:
  duration: "1-2 minutos"

  # Parte 1: Resumo de valor (30s)
  value_recap:
    script: ""  # Resumir o que o viewer aprendeu
    visual_cue: "[SLIDE: 3 bullet points de takeaway]"

  # Parte 2: Bridge para próximo passo (30s)
  next_step_bridge:
    script: ""  # Conectar o conteúdo com próximo passo
    visual_cue: "[TH]"

  # Parte 3: CTA específico (30s)
  cta:
    primary_action: ""  # Ex: "Link na descrição para newsletter"
    secondary_action: ""  # Ex: "Assista este vídeo relacionado"
    visual_cue: "[END SCREEN: vídeo sugerido + subscribe button]"

  # Parte 4: Open Loop para próximo vídeo (15s)
  next_video_tease:
    script: ""
    visual_cue: "[END SCREEN]"
```

**CTAs que Funcionam no Canal Dan Koe:**
- Newsletter signup (principal)
- Curso/produto digital (quando relevante)
- Vídeo relacionado (aumenta watch time)
- "Se isto mudou sua perspectiva, subscribe" (não "smash that like button")

---

### Step 5: Adicionar Timestamps e Clip Markers

**Objetivo:** Criar timestamps para YouTube e marcar pontos de clip para Shorts.

**Timestamps:**

```yaml
timestamps:
  - time: "0:00"
    title: "Hook"
  - time: ""
    title: "[Attention section title]"
  - time: ""
    title: "[Perspective section title]"
  - time: ""
    title: "[Advantage section title]"
  - time: ""
    title: "[Gamify/CTA section title]"
```

**Clip Markers para Shorts/Reels:**

```yaml
clip_markers:
  clip_1:
    start_time: ""
    end_time: ""
    duration: ""  # 30-60 segundos
    hook_for_clip: ""  # Hook específico para versão curta
    script_excerpt: ""
    why_this_works: ""  # "Momento de alto impacto/emoção"
    vertical_format_notes: ""

  clip_2:
    start_time: ""
    end_time: ""
    duration: ""
    hook_for_clip: ""
    script_excerpt: ""
    why_this_works: ""
    vertical_format_notes: ""

  clip_3:
    start_time: ""
    end_time: ""
    duration: ""
    hook_for_clip: ""
    script_excerpt: ""
    why_this_works: ""
    vertical_format_notes: ""
```

**Critérios para Clip Selection:**
- Momento de insight ("aha moment")
- Afirmação contrarian forte
- História pessoal com emoção
- Framework explicado de forma concisa
- Resultado concreto demonstrado

**SEO Metadata:**

```yaml
seo_metadata:
  title:
    primary: ""  # < 60 chars, keyword-rich
    variant_a: ""
    variant_b: ""
  description:
    first_line: ""  # Mais importante — aparece no preview
    body: ""  # Links, timestamps, CTAs
    keywords: []
  tags: []

  thumbnail_concepts:
    concept_1:
      text_overlay: ""  # Máximo 5 palavras
      emotion: ""  # curious | shocked | inspired
      visual: ""
    concept_2:
      text_overlay: ""
      emotion: ""
      visual: ""
    concept_3:
      text_overlay: ""
      emotion: ""
      visual: ""
```

---

## Input Required

```yaml
input:
  big_idea:
    name: ""
    one_liner: ""
    validated_by: "koe-sintetizador"

  video:
    angle: ""  # tutorial | filosofia | framework | story | breakdown
    target_duration: ""  # 15 | 20 | 25 minutos

  target_viewer:
    persona: ""
    awareness_level: ""
    why_they_click: ""

  visual_resources:
    b_roll_available: []
    screen_recordings_needed: []
    slides_needed: []

  cascade_context:
    newsletter_source: ""
    platform_clips_target: []

  previous_videos:
    - title: ""
      topic: ""
      performance: ""
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_ARQ_006
    created_at: ""
    agent: koe-arquiteto
    video_title: ""
    target_duration: ""

  script:
    hook:
      duration: "30s"
      text: ""
      visual_cues: []
    perspective:
      duration: ""
      text: ""
      visual_cues: []
      cross_domain_bridges: []
    advantage:
      duration: ""
      text: ""
      visual_cues: []
      examples: []
    gamify_cta:
      duration: ""
      text: ""
      visual_cues: []

  total_script_word_count: 0
  estimated_duration: ""
  visual_cue_count: 0

  timestamps: []

  clip_markers:
    total_clips: 0
    clips: []

  seo_metadata:
    title: ""
    description: ""
    tags: []

  thumbnail_concepts: []

  quality_metrics:
    hook_under_30s: false
    apag_complete: false
    visual_cues_present: false
    clips_identified: 0
    cross_domain_bridges: 0
    em_dash_rhythm: false
```

---

## Quality Gate

### Checklist de Validação (KOE_ARQ_006)

**Hook (Primeiros 30s):**
- [ ] Pattern interrupt nos primeiros 5 segundos
- [ ] Promise clara em 15-25 segundos
- [ ] Tease com open loop antes dos 30 segundos
- [ ] NÃO começa com "Hey guys" ou intro genérica

**Estrutura APAG:**
- [ ] Attention (Hook) < 30 segundos
- [ ] Perspective com mínimo 2 pontes cross-domain
- [ ] Advantage com exemplos visuais na tela
- [ ] Gamify/CTA com ação específica

**Visual Production:**
- [ ] Visual cues em cada seção do script
- [ ] Troca de visual a cada 15-30 segundos
- [ ] B-roll marcado para conceitos abstratos
- [ ] Slides para frameworks com passos
- [ ] On-screen text para frases de impacto

**Content Cascade:**
- [ ] Mínimo 3 clips de 30-60s identificados
- [ ] Cada clip tem hook próprio para formato vertical
- [ ] Timestamps completos para descrição

**SEO e Distribuição:**
- [ ] Título < 60 caracteres e keyword-rich
- [ ] Descrição com primeira linha impactante
- [ ] 3 conceitos de thumbnail
- [ ] Tags relevantes definidas

**Voz Dan Koe:**
- [ ] Em-dashes para ritmo
- [ ] Perguntas retóricas
- [ ] Tom conversacional direto
- [ ] Frases curtas de impacto

**Sovereignty Check:**
- [ ] Conteúdo ensina, não cria dependência
- [ ] CTA respeita o viewer (sem manipulação)
- [ ] Valor real entregue no vídeo gratuito

---

## Handoff

**Para koe-distribuidor (KOE_DIST_002):**
- Script completo com clip markers para extração de Shorts/Reels
- Cada clip com hook próprio e notas de formato vertical

**Para koe-distribuidor (KOE_DIST_003-004):**
- SEO metadata para publicação
- Thumbnail concepts para design
- Timestamps para descrição
- Cascade fragments para social media

**Para koe-chief:**
- Quality metrics e production readiness
- Estimativa de duração real vs target
- Recomendações para próximo vídeo baseado neste conteúdo

---

*Koe Arquiteto | YouTube Script Specialist | Visual Storytelling Architect*
*"YouTube is the modern university. Structure it right."*
