---
task_id: KOE_DIST_002
name: "Video to Clips"
agent: koe-distribuidor
type: creation
complexity: medium
estimated_time: 30min
version: 1.0.0

source:
  concept: "Content Cascade — Video derivation"
  author: "Dan Koe"
  framework: "Content Cascade + Social Matrix"
  reference: "1 long-form video → 3-5 short-form clips (30-60s) for TikTok/Reels/Shorts"

inputs:
  required:
    - video_script: "Script completo do YouTube (output do KOE_ARQ_006)"
    - clip_markers: "Marcações de clips do script original"
    - target_platforms: "Plataformas-alvo (TikTok, Instagram Reels, YouTube Shorts)"
  optional:
    - video_recording: "Vídeo já gravado (para timestamps exatos)"
    - performance_data: "Métricas de clips anteriores"
    - trending_formats: "Formatos em alta nas plataformas-alvo"

outputs:
  primary:
    - clip_scripts: "3-5 scripts de clips curtos (30-60s) com hooks próprios"
  secondary:
    - caption_text: "Texto de legenda para cada clip"
    - hashtag_sets: "Conjuntos de hashtags por plataforma"
    - posting_notes: "Notas de publicação (horário, formato, CTA)"
  template: video-clips-output.yaml

validation:
  checklist: distribution-quality-validation.md
  clips_count_range: [3, 5]
  clip_duration_range: [30, 60]
  hook_present_each: true

elicit: true
---

# Video to Clips

## Propósito

> "One 20-minute video should generate a week of short-form content.
> That's not repurposing — that's leverage."
> — Dan Koe

Extrair 3-5 clips de curta duração (30-60 segundos) a partir de conteúdo de vídeo
longo, cada um com hook próprio otimizado para formato vertical. Os clips são
derivativos de alto leverage no Content Cascade — alcançam audiências que não
consumiriam o vídeo completo.

---

## Contexto

Short-form video é o formato de maior alcance orgânico nas plataformas em 2024-2026:

```
YouTube Long-form (15-25 min) → Autoridade, profundidade
    ↓ VOCÊ ESTÁ AQUI
Short-form Clips (30-60s) → Alcance, descoberta, viralidade
    ↓
    ├── TikTok → Maior potencial viral, audiência jovem
    ├── Instagram Reels → Visual-first, community engagement
    └── YouTube Shorts → Alimenta o canal principal
```

**Por que clips derivados superam clips originais:**
- O conteúdo já foi testado na newsletter e vídeo longo
- Momentos de pico já foram identificados no script
- A Big Idea já foi refinada por múltiplas iterações
- O koe-arquiteto já marcou os melhores momentos

**Tipos de Clip que Performam:**

```yaml
clip_types:
  aha_moment: "Insight revelador que muda perspectiva em 30s"
  hot_take: "Opinião contrarian forte com justificativa rápida"
  mini_tutorial: "Passo-a-passo ultracompacto (3 passos em 45s)"
  story_snippet: "Trecho de história pessoal com punch line"
  framework_reveal: "Framework nomeado apresentado em 60s"
```

---

## Pré-requisitos

- [ ] Script de YouTube disponível (KOE_ARQ_006 executada)
- [ ] Clip markers do script original revisados
- [ ] Plataformas-alvo definidas
- [ ] Formatos em alta verificados (tendências atuais)
- [ ] Guidelines de cada plataforma revisados

---

## Steps

### Step 1: Identificar Peak Moments

**Objetivo:** Selecionar os 5-7 momentos de maior impacto do vídeo longo.

**Peak Moment Identification:**

```yaml
peak_moment_criteria:
  emotional_peaks:
    - description: "Momento onde a emoção é mais forte"
    - indicator: "Mudança de tom, pausa dramática, revelação"

  insight_peaks:
    - description: "Momento de aha/revelação"
    - indicator: "Cross-domain bridge, reframe, perspectiva nova"

  controversy_peaks:
    - description: "Momento mais debatível/contrarian"
    - indicator: "Afirmação ousada, desafio a crença popular"

  practical_peaks:
    - description: "Momento mais acionável"
    - indicator: "Passo-a-passo, framework, ferramenta"

  story_peaks:
    - description: "Momento narrativo mais engaging"
    - indicator: "Plot twist, resultado inesperado, vulnerabilidade"
```

**Processo:**
1. Revisar clip_markers do script original (KOE_ARQ_006)
2. Listar 5-7 candidatos usando os critérios acima
3. Ranquear por potencial de viralidade
4. Selecionar 3-5 finais (mix de tipos)
5. Verificar que cada clip funciona SEM contexto do vídeo completo

**Regra de Seleção:** Se precisa de contexto para fazer sentido, NÃO é um bom clip.

---

### Step 2: Escrever Script de Cada Clip

**Objetivo:** Adaptar cada momento em um script autônomo de 30-60 segundos.

**Clip Script Structure:**

```yaml
clip_script:
  # Segundos 0-5: HOOK (parar scroll vertical)
  hook:
    text: ""
    type: ""  # question | bold_claim | story_start | result
    visual: "[FACE close-up + TEXT overlay]"

  # Segundos 5-15: SETUP
  setup:
    text: ""
    visual: ""
    purpose: "Contexto mínimo para entender o que vem"

  # Segundos 15-45: DELIVERY
  delivery:
    text: ""
    visual: ""
    key_moment: ""  # O "aha" do clip

  # Segundos 45-60: PAYOFF + CTA
  payoff:
    text: ""
    visual: ""
    cta: ""  # "Follow para mais" | "Salve para depois" | "Comente se concorda"

  total_duration: 0  # 30-60 segundos
  word_count: 0  # ~150 palavras por minuto falando
```

**Adaptações para Short-form:**
- Eliminar introduções longas — DIRETO no ponto
- Hook nos primeiros 3 segundos (scroll vertical é impiedoso)
- Frases mais curtas e punchier que no vídeo longo
- Tom levemente mais energético (plataforma exige)
- CTA nativo da plataforma ("Segue para parte 2" funciona)

---

### Step 3: Adicionar Hooks para Cada Clip

**Objetivo:** Criar hooks específicos para formato vertical (diferentes do vídeo longo).

**Short-form Hook Framework:**

```yaml
short_form_hooks:
  text_hook:
    text_overlay: ""  # 3-5 palavras que aparecem na tela
    font: "bold, grande, alto contraste"
    position: "centro ou topo do frame"
    duration: "3 segundos"

  audio_hook:
    first_words: ""  # As primeiras palavras faladas
    tone: ""  # dramatic | casual | urgent | curious

  visual_hook:
    first_frame: ""  # O que o viewer vê antes de dar play
    movement: ""  # Gesto, expressão, ação nos primeiros frames

  combined_hook:
    text: ""
    audio: ""
    visual: ""
    impact_score: ""  # 1-10
```

**Regras de Hook Vertical:**
- Primeiros 1-2 segundos determinam TUDO
- Text overlay é obrigatório (muitos assistem sem som)
- Expressão facial no primeiro frame importa
- Pergunta no hook gera maior watch time
- Bold claim + prova em 3 segundos = retenção máxima

---

### Step 4: Formatar para Vertical

**Objetivo:** Adaptar cada clip para formato 9:16 com notas de produção.

**Vertical Format Specifications:**

```yaml
vertical_format:
  aspect_ratio: "9:16"
  resolution: "1080x1920"

  framing:
    primary: "Talking head centro-frame, olhos no terço superior"
    variations:
      - "Close-up para momentos de emoção"
      - "Medium shot para gestos amplos"
      - "Split screen para antes/depois"

  text_overlays:
    captions:
      style: "Bold, sans-serif, alto contraste"
      position: "Centro-inferior (acima dos controles)"
      size: "Legível em tela de celular"
      animation: "Palavra por palavra ou frase por frase"

    key_points:
      style: "Caixa de cor sólida com texto"
      position: "Topo ou centro"
      trigger: "Quando ponto-chave é dito"

  audio:
    background_music: ""  # trending sound | subtle music | none
    volume_mix: "Voz 100%, música 15-20%"

  pacing:
    cuts_per_minute: "4-8 (mais rápido que vídeo longo)"
    maximum_static_shot: "8 segundos"
```

**Notas por Plataforma:**

```yaml
platform_notes:
  tiktok:
    max_duration: 60
    trending_sounds: true
    hashtags: 3-5
    caption_style: "Story + CTA"

  instagram_reels:
    max_duration: 90
    cover_image: true
    hashtags: 5-10
    caption_style: "Value + CTA + hashtags"

  youtube_shorts:
    max_duration: 60
    title_important: true
    hashtags: "#Shorts obrigatório"
    caption_style: "Título compelling"
```

---

### Step 5: Adicionar Captions e Text Overlay Notes

**Objetivo:** Preparar texto de legenda e notas de overlay para edição.

**Caption Writing:**

```yaml
captions:
  clip_1:
    tiktok_caption: ""  # < 300 chars, story format
    instagram_caption: ""  # Value + CTA + hashtags
    youtube_title: ""  # < 60 chars, keyword-rich

  clip_2:
    tiktok_caption: ""
    instagram_caption: ""
    youtube_title: ""

  # ... para cada clip

text_overlay_notes:
  clip_1:
    - timestamp: "0:00-0:03"
      text: ""
      style: "hook_text"
    - timestamp: "0:15"
      text: ""
      style: "key_point"
    - timestamp: "0:45"
      text: ""
      style: "cta"
```

---

## Input Required

```yaml
input:
  video_source:
    script_file: ""  # Localização do script KOE_ARQ_006
    video_title: ""
    video_duration: ""
    clip_markers_from_script: []

  target_platforms:
    - platform: "tiktok"
      priority: ""  # high | medium | low
    - platform: "instagram_reels"
      priority: ""
    - platform: "youtube_shorts"
      priority: ""

  clip_preferences:
    target_count: 0  # 3-5
    preferred_duration: ""  # 30 | 45 | 60
    preferred_types: []  # aha_moment | hot_take | mini_tutorial | story | framework

  performance_context:
    best_performing_clip_type: ""
    avg_clip_views: 0
    trending_formats: []
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_DIST_002
    created_at: ""
    agent: koe-distribuidor
    source_video: ""
    total_clips: 0

  clips:
    - clip_number: 1
      type: ""
      duration: 0
      source_timestamp: ""

      script:
        hook:
          text: ""
          text_overlay: ""
        setup:
          text: ""
        delivery:
          text: ""
        payoff:
          text: ""
          cta: ""

      formatting:
        framing_notes: ""
        text_overlays: []
        pacing_notes: ""
        music_suggestion: ""

      captions:
        tiktok: ""
        instagram: ""
        youtube_title: ""

      hashtags:
        tiktok: []
        instagram: []
        youtube: []

    # ... repeat for each clip

  quality_metrics:
    clips_count: 0
    avg_duration: 0
    hooks_present: false
    standalone_test: false
    platform_formatting: false
    captions_complete: false
```

---

## Quality Gate

### Checklist de Validação (KOE_DIST_002)

**Seleção de Clips:**
- [ ] 3-5 clips selecionados de momentos de pico
- [ ] Mix de tipos (aha, hot_take, tutorial, story, framework)
- [ ] Cada clip funciona SEM contexto do vídeo longo
- [ ] Duração de 30-60 segundos cada

**Qualidade dos Scripts:**
- [ ] Hook nos primeiros 3 segundos de cada clip
- [ ] Setup mínimo (direto ao ponto)
- [ ] Payoff claro com CTA
- [ ] Word count compatível com duração (~150 palavras/min)

**Formato Vertical:**
- [ ] Notas de framing para 9:16
- [ ] Text overlays definidos com timestamps
- [ ] Sugestões de música/som incluídas
- [ ] Pacing mais rápido que vídeo longo

**Plataformas:**
- [ ] Captions escritas para cada plataforma
- [ ] Hashtags definidos por plataforma
- [ ] Regras de cada plataforma respeitadas

**Voz Dan Koe:**
- [ ] Tom direto e confiante
- [ ] Frases curtas e impactantes
- [ ] Sem filler words ou intros longas

**Sovereignty Check:**
- [ ] Clips entregam valor real (não são apenas teasers)
- [ ] CTA respeita o viewer
- [ ] Sem clickbait vazio

---

## Handoff

**Para edição de vídeo (produção):**
- Scripts de cada clip com visual cues e text overlays
- Timestamps do vídeo original para corte
- Notas de formatação vertical

**Para koe-distribuidor (KOE_DIST_004 — Calendar):**
- Clips prontos para inclusão no calendário de distribuição
- Notas de plataforma para scheduling

**Para koe-chief:**
- Total de clips gerados e plataformas cobertas
- Leverage ratio atualizado

---

*Koe Distribuidor | Video Cascade Specialist | Short-Form Architect*
*"One 20-minute video should generate a week of short-form content."*
