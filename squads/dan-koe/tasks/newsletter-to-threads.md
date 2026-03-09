---
task_id: KOE_DIST_001
name: "Newsletter to Threads"
agent: koe-distribuidor
type: creation
complexity: medium
estimated_time: 30min
version: 1.0.0

source:
  concept: "Content Cascade — Newsletter derivation"
  author: "Dan Koe"
  framework: "Content Cascade + Social Matrix"
  reference: "1 newsletter → 1 thread (7-15 tweets) — first cascade derivative"

inputs:
  required:
    - newsletter_content: "Newsletter completa (output do KOE_ARQ_002)"
    - cascade_fragments: "Fragmentos marcados com [CASCADE:tweet] e [CASCADE:thread]"
    - thread_goal: "Objetivo do thread (awareness | engagement | conversion)"
  optional:
    - hook_variants: "Hook variants da newsletter para adaptar"
    - audience_metrics: "Métricas de engajamento de threads anteriores"
    - posting_time: "Horário ideal de publicação"

outputs:
  primary:
    - thread_complete: "Thread de 7-15 tweets formatado e pronto para publicação"
  secondary:
    - standalone_tweets: "Tweets extras extraídos que não entraram no thread"
    - engagement_hooks: "Perguntas para quote-tweet e engagement"
  template: thread-output.yaml

validation:
  checklist: distribution-quality-validation.md
  tweet_count_range: [7, 15]
  hook_tweet_present: true
  cta_tweet_present: true

elicit: true
---

# Newsletter to Threads

## Propósito

> "A thread is a newsletter in compressed form. Same Big Idea, different container.
> The skill is knowing what to keep and what to cut."
> — Dan Koe

Transformar uma newsletter completa em um thread de Twitter/X de 7-15 tweets,
preservando a essência da Big Idea enquanto adapta formato, ritmo e tom para
a plataforma. O thread é o primeiro derivativo do Content Cascade e frequentemente
o de maior alcance orgânico.

---

## Contexto

No Content Cascade, o thread é o primeiro passo de distribuição após a newsletter:

```
Newsletter (1500-3000 palavras)
    ↓ VOCÊ ESTÁ AQUI
Thread (7-15 tweets, ~1000-2000 caracteres total)
    ↓
Standalone Tweets → Clips → LinkedIn → Instagram → ...
```

**Por que Threads funcionam no sistema Dan Koe:**
- Formato que recompensa profundidade no Twitter/X
- Alto potencial viral (cada tweet é um ponto de entrada)
- Demonstra expertise em formato acessível
- Funciona como "trailer" da newsletter (drive signups)
- Cada tweet é standalone — pode ser retweetado individualmente

**Anatomia de um Thread Dan Koe:**
1. **Hook Tweet** — Parada de scroll (contrarian, curiosidade, bold claim)
2. **Context Tweets** (2-3) — Setup do problema/reframe
3. **Value Tweets** (3-5) — Insights, passos, framework
4. **Proof Tweet** (1) — Exemplo, resultado, caso
5. **Bridge Tweet** (1) — Transição para CTA
6. **CTA Tweet** (1) — Ação clara (newsletter, save, retweet)

---

## Pré-requisitos

- [ ] Newsletter completa disponível (KOE_ARQ_002 executada)
- [ ] Cascade fragments marcados no texto original
- [ ] Objetivo do thread definido (awareness, engagement, conversion)
- [ ] Métricas de threads anteriores revisadas (se disponível)

---

## Steps

### Step 1: Identificar 7-10 Pontos-Chave da Newsletter

**Objetivo:** Extrair os pontos mais fortes que funcionam como tweets standalone.

**Processo de Extração:**

```yaml
extraction_criteria:
  must_include:
    - hook_original: "O hook da newsletter (adaptar para tweet)"
    - big_idea_core: "A essência da Big Idea em 1 tweet"
    - strongest_reframe: "O reframe mais impactante"
    - best_proof: "O melhor elemento de prova"
    - cta: "Call-to-action adaptado para Twitter"

  should_include:
    - cross_domain_bridge: "A ponte cross-domain mais surpreendente"
    - contrarian_statement: "A afirmação mais provocativa"
    - actionable_step: "Passo prático que o leitor pode usar imediatamente"
    - quotable_line: "Frase que merece ser salva/retweetada"

  evaluation:
    - "Funciona sem contexto? (standalone test)"
    - "Cabe em 280 caracteres? (se não, dividir)"
    - "Gera reação? (curiosity, agreement, debate)"
    - "É retweetável? (alguém compartilharia?)"
```

**Para cada ponto, registrar:**
- Texto original da newsletter
- Adaptação proposta para tweet
- Posição no thread (hook, value, proof, cta)
- Potencial de engajamento (low, medium, high)

---

### Step 2: Escrever Cada Tweet como Standalone

**Objetivo:** Transformar cada ponto em um tweet que funciona isoladamente.

**Tweet Writing Rules (Dan Koe Style):**

```yaml
tweet_rules:
  formatting:
    max_characters: 280
    line_breaks: "Usar para ritmo visual"
    no_hashtags: true  # Dan Koe não usa hashtags em threads
    no_emojis_excess: true  # Máximo 1-2 por tweet, se necessário

  voice:
    em_dashes: "Converter em line breaks ou parênteses"
    short_sentences: "Preferir frases curtas e impactantes"
    direct_address: "Usar 'you' / 'você'"
    contrarian_tone: "Manter tom desafiador mas construtivo"

  structure:
    opening_line: "Forte o suficiente para parar scroll"
    body: "1-3 linhas de desenvolvimento"
    closing_line: "Punch line ou transição para próximo tweet"

  formatting_patterns:
    list_tweet: |
      [Statement forte]

      • Ponto 1
      • Ponto 2
      • Ponto 3

      [Conclusão]

    story_tweet: |
      [Início da história]

      [Desenvolvimento em 2-3 linhas]

      [Punch line]

    insight_tweet: |
      [Observação contrarian]

      [Expansão em 1-2 linhas]

      [Implicação]
```

**Para cada tweet:**
1. Escrever primeira versão
2. Cortar tudo que não é essencial (target: 80% do limite de chars)
3. Verificar se funciona standalone (sem contexto do thread)
4. Adicionar line breaks para ritmo visual
5. Verificar se cria curiosidade para o próximo tweet

---

### Step 3: Escrever Hook Tweet

**Objetivo:** Criar o tweet de abertura que determina o sucesso do thread.

**Hook Tweet Templates:**

```yaml
hook_templates:
  contrarian:
    format: "[Crença popular] is a lie.\n\nHere's what actually works:\n\n🧵"
    when: "Quando a Big Idea desafia consenso"

  result:
    format: "I went from [bad state] to [good state] in [time].\n\nHere's the exact system:\n\n🧵"
    when: "Quando há resultado concreto para demonstrar"

  curiosity:
    format: "There's one thing that separates [group A] from [group B].\n\nAnd nobody talks about it.\n\n🧵"
    when: "Quando o insight não é óbvio"

  list_promise:
    format: "[N] lessons I learned from [experience] that changed everything:\n\n🧵"
    when: "Quando o conteúdo tem múltiplos takeaways"

  question:
    format: "Why do [majority] [bad outcome] while [minority] [good outcome]?\n\nIt comes down to [one thing].\n\n🧵"
    when: "Quando o reframe resolve um paradoxo"
```

**Critérios do Hook Tweet:**
- Primeira linha para scroll do timeline
- Criar open loop (por que devo ler o resto?)
- Incluir 🧵 para sinalizar thread
- NÃO revelar tudo no hook (manter curiosidade)
- Testável: "Eu pararia de scrollar para ler isso?"

---

### Step 4: Escrever CTA Tweet

**Objetivo:** Fechar o thread com ação clara.

**CTA Tweet Types:**

```yaml
cta_types:
  newsletter_drive:
    format: |
      This is what I write about every week in my newsletter.

      [Benefício específico da newsletter]

      Join [N] readers: [link]
    when: "Objetivo principal é crescer newsletter"

  engagement:
    format: |
      What's the ONE thing from this thread you're implementing today?

      Reply below — I read every response.
    when: "Objetivo é engajamento e discussão"

  save_retweet:
    format: |
      If this thread changed how you think about [tema]:

      1. Save it for reference
      2. Retweet the first tweet to help others

      I share threads like this every [frequência].
      Follow for more.
    when: "Objetivo é crescimento de followers"

  product:
    format: |
      I teach this system in depth in [produto].

      [Benefício específico]
      [Social proof]

      Link: [url]
    when: "Objetivo é venda (usar com moderação)"
```

---

### Step 5: Revisar Fluxo do Thread

**Objetivo:** Garantir que o thread flui naturalmente de tweet em tweet.

**Thread Flow Checklist:**

```yaml
flow_review:
  hook_to_context:
    transition: ""  # Como o hook conecta com o primeiro tweet de contexto
    smooth: false

  context_to_value:
    transition: ""
    smooth: false

  value_progression:
    builds_on_previous: false  # Cada tweet adiciona algo novo
    no_redundancy: false       # Sem repetição de ideias

  value_to_proof:
    transition: ""
    smooth: false

  proof_to_cta:
    transition: ""
    smooth: false

  overall:
    tweet_count: 0
    estimated_read_time: ""
    standalone_test_passed: false  # Cada tweet funciona sozinho
    thread_test_passed: false      # Thread funciona como narrativa
    energy_curve: ""  # ascending | flat | descending (ideal: ascending)
```

**Regras de Fluxo:**
- Cada tweet deve criar curiosidade para o próximo
- Sem tweets "de enchimento" — cada um entrega valor
- A energia deve subir gradualmente até o clímax
- O CTA deve parecer conclusão natural, não venda forçada
- Total de 7-15 tweets (sweet spot: 10-12)

---

## Input Required

```yaml
input:
  newsletter:
    edition_number: 0
    title: ""
    big_idea: ""
    word_count: 0
    file_location: ""

  cascade_fragments:
    tweets_marked: []
    thread_hooks_marked: []

  thread_config:
    goal: ""  # awareness | engagement | conversion
    target_tweets: 0  # 7-15
    posting_time: ""

  audience_metrics:
    avg_thread_impressions: 0
    avg_thread_engagement: 0
    best_performing_hook_type: ""
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_DIST_001
    created_at: ""
    agent: koe-distribuidor
    source_newsletter: ""
    thread_goal: ""

  thread:
    total_tweets: 0
    tweets:
      - position: 1
        type: "hook"
        text: ""
        character_count: 0
        standalone_score: ""  # high | medium | low
      - position: 2
        type: "context"
        text: ""
        character_count: 0
        standalone_score: ""
      # ... continue for all tweets

  standalone_tweets:
    - text: ""
      source_paragraph: 0
      suggested_posting_day: ""

  engagement_hooks:
    - question: ""
      type: ""  # poll | open_question | debate

  quality_metrics:
    tweet_count: 0
    avg_character_count: 0
    hook_strength: ""
    flow_quality: ""
    standalone_test: ""
    cta_clarity: ""
```

---

## Quality Gate

### Checklist de Validação (KOE_DIST_001)

**Estrutura do Thread:**
- [ ] Hook tweet presente e compelling (pararia de scrollar?)
- [ ] 7-15 tweets total
- [ ] CTA tweet com ação clara
- [ ] Cada tweet < 280 caracteres

**Qualidade Individual:**
- [ ] Cada tweet funciona standalone (sem contexto)
- [ ] Cada tweet adiciona valor (sem filler)
- [ ] Formatação com line breaks para ritmo visual
- [ ] Sem hashtags em excesso (estilo Dan Koe)

**Fluxo Narrativo:**
- [ ] Transições suaves entre tweets
- [ ] Energia ascendente ao longo do thread
- [ ] CTA como conclusão natural
- [ ] Open loops criados e fechados

**Fidelidade à Big Idea:**
- [ ] Big Idea preservada na compressão
- [ ] Reframe principal presente
- [ ] Pelo menos 1 ponte cross-domain mantida

**Sovereignty:**
- [ ] Thread entrega valor real (não é apenas teaser)
- [ ] CTA respeita o leitor
- [ ] Sem táticas de manipulação

---

## Handoff

**Para koe-distribuidor (postagem):**
- Thread formatado e pronto para publicação
- Horário de postagem sugerido
- Standalone tweets para dias subsequentes

**Para koe-chief:**
- Métricas de qualidade do thread
- Tempo de criação real vs estimado (30min)
- Recomendação de threading frequency

---

*Koe Distribuidor | Content Cascade Executor | Thread Specialist*
*"A thread is a newsletter in compressed form."*
