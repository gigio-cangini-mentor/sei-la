---
task_id: KOE_ARQ_001
name: "Write APAG Content"
agent: koe-arquiteto
type: creation
complexity: high
estimated_time: 90min
version: 1.0.0

source:
  book: "2 Hour Writer"
  author: "Dan Koe"
  framework: "APAG Structure (Attention-Perspective-Advantage-Gamify)"

inputs:
  required:
    - big_idea: "A Big Idea validada pelo koe-sintetizador"
    - target_audience: "Perfil do público-alvo com dores e desejos"
    - content_format: "newsletter | blog | thread | script"
  optional:
    - queue_notes: "Notas da Queue relevantes ao tema"
    - cross_domain_seeds: "Pontes interdisciplinares já identificadas"
    - previous_cascade: "Peças anteriores do Content Cascade para manter continuidade"

outputs:
  primary:
    - apag_content: "Peça de conteúdo completa seguindo estrutura APAG"
  secondary:
    - cascade_fragments: "Fragmentos marcados para distribuição via Content Cascade"
    - hook_variants: "3 variantes de hook para teste A/B"
  template: apag-content-output.yaml

validation:
  checklist: content-quality-validation.md
  apag_sections_present: true
  cross_domain_bridges: 2
  em_dash_rhythm: true

elicit: true
---

# Write APAG Content

## Propósito

> "Every piece of content is a micro-product. Structure it like one."
> — Dan Koe, 2 Hour Writer

Criar conteúdo de alto impacto utilizando a estrutura APAG (Attention-Perspective-Advantage-Gamify),
o framework proprietário de Dan Koe para transformar Big Ideas em peças que capturam atenção,
mudam perspectiva, demonstram vantagem e gamificam a ação do leitor.

---

## Contexto

A estrutura APAG é o coração de toda criação de conteúdo no sistema Dan Koe. Cada seção
tem um papel específico na jornada do leitor:

- **Attention (A):** Hook que interrompe o scroll e cria curiosidade irresistível
- **Perspective (P):** Reframe que conecta domínios inesperados e muda a lente do leitor
- **Advantage (A):** Benefício concreto e tangível que o leitor ganha ao adotar a nova perspectiva
- **Gamify (G):** Call-to-action que transforma consumo passivo em ação imediata

O koe-arquiteto executa esta task durante sessões de Deep Work (2-4h), preferencialmente
no período da manhã quando a energia criativa está no pico (fase "Use" do ciclo
Fill/Empty/Use).

---

## Pré-requisitos

- [ ] Big Idea validada e nomeada (output do koe-sintetizador)
- [ ] Público-alvo definido com dores e desejos mapeados
- [ ] Formato de conteúdo escolhido (newsletter, blog, thread, script)
- [ ] Ambiente de Deep Work preparado (zero interrupções)
- [ ] Queue notes relevantes revisadas

---

## Steps

### Step 1: Escolher Tipo de Hook (Attention)

**Objetivo:** Selecionar e escrever o hook que vai interromper o scroll do leitor.

**Tipos de Hook disponíveis:**

```yaml
hook_types:
  contrarian: "Afirmação que desafia crença popular"
  curiosity_gap: "Promessa de revelação que cria tensão"
  pattern_interrupt: "Frase inesperada que quebra expectativa"
  story_open: "Início de narrativa pessoal com tensão"
  bold_claim: "Declaração audaciosa com prova implícita"
```

**Processo:**
1. Revise a Big Idea e identifique o ângulo mais contraintuitivo
2. Escreva 3 variantes de hook usando tipos diferentes
3. Selecione o hook mais forte (critério: "Eu pararia de scrollar?")
4. Valide que o hook faz uma promessa que o conteúdo cumpre

**Critérios de qualidade:**
- Máximo 2 linhas
- Cria curiosidade sem ser clickbait
- Conecta com uma dor ou desejo real do público
- Funciona isoladamente (sem contexto)

---

### Step 2: Desenvolver Perspective com Pontes Cross-Domain

**Objetivo:** Reframear o tema conectando 2+ domínios inesperados.

**Framework de Ponte Cross-Domain:**

```yaml
cross_domain_bridge:
  domain_origin: "Campo onde a Big Idea nasceu"
  domain_destination: "Campo inesperado que ilumina o tema"
  bridge_mechanism: "Analogia, metáfora ou princípio compartilhado"
  insight_generated: "O que o leitor entende ao ver a conexão"
```

**Processo:**
1. Liste 3-5 domínios aparentemente desconectados da Big Idea
2. Para cada domínio, identifique um princípio compartilhado
3. Escolha a ponte mais iluminadora (critério: "O leitor dirá 'nunca tinha pensado assim'")
4. Escreva a seção Perspective usando transições com em-dashes
5. Inclua pelo menos uma pergunta retórica que force reflexão

**Elementos obrigatórios:**
- Mínimo 2 pontes cross-domain
- Pelo menos 1 pergunta retórica
- Uso de em-dashes para ritmo (estilo Dan Koe)
- Transição natural do hook para o reframe

---

### Step 3: Articular Advantage com Benefícios Concretos

**Objetivo:** Mostrar ao leitor o que ele ganha ao adotar a nova perspectiva.

**Framework de Articulação:**

```yaml
advantage_structure:
  transformation_promise: "De [estado atual] para [estado desejado]"
  concrete_benefit_1: "Benefício tangível e mensurável"
  concrete_benefit_2: "Benefício emocional ou de identidade"
  concrete_benefit_3: "Benefício de longo prazo (compounding)"
  proof_element: "Exemplo pessoal, caso de uso ou dados"
```

**Processo:**
1. Defina a transformação em uma frase (De X para Y)
2. Liste 3 benefícios concretos (tangível, emocional, longo prazo)
3. Adicione pelo menos 1 elemento de prova (exemplo pessoal preferível)
4. Escreva a seção conectando benefícios ao reframe da Perspective
5. Use linguagem de implementação, não de teoria

**Critérios de qualidade:**
- Benefícios são específicos, não genéricos
- Pelo menos 1 exemplo concreto ou caso de uso
- Linguagem de ação ("Quando você aplica..." não "Em teoria...")
- Conexão clara com a Perspective (não pode parecer desconectada)

---

### Step 4: Desenhar Gamify CTA

**Objetivo:** Transformar o conteúdo em ação imediata para o leitor.

**Tipos de CTA disponíveis:**

```yaml
cta_types:
  micro_implementation: "Ação de 5min que o leitor pode fazer agora"
  identity_shift: "Convite para se identificar com o novo paradigma"
  community_engagement: "Pergunta que gera comentários e debate"
  resource_bridge: "Link para recurso que aprofunda o tema"
  challenge: "Desafio de 7 dias relacionado ao conteúdo"
```

**Processo:**
1. Escolha o tipo de CTA mais adequado ao formato e público
2. Escreva o CTA com urgência sem manipulação
3. Garanta que o CTA é executável em 5 minutos ou menos
4. Adicione elemento de gamificação (progresso, desafio, recompensa)
5. Revise se o CTA fecha o loop aberto pelo hook

**Critérios de qualidade:**
- Ação clara e específica (não vago)
- Executável imediatamente
- Conecta com o hook (fecha o loop narrativo)
- Não é manipulativo (Dan Koe rejeita táticas de urgência falsa)

---

### Step 5: Revisão Final e Marcação de Cascade Fragments

**Objetivo:** Polir o conteúdo e preparar para o Content Cascade.

**Processo:**
1. Leia o conteúdo completo em voz alta (teste de ritmo)
2. Verifique presença de todos os elementos APAG
3. Marque fragmentos que podem virar tweets, clips ou posts
4. Identifique pelo menos 10 pontos de fragmentação para cascade
5. Gere 3 variantes de hook alternativas para teste A/B

**Checklist de marcação:**

```yaml
cascade_markers:
  tweetable_quotes: "Frases standalone de < 280 caracteres"
  clip_worthy_sections: "Parágrafos que funcionam como micro-conteúdo"
  thread_anchors: "Pontos que podem abrir um thread"
  visual_moments: "Conceitos que podem virar infográfico"
  debate_triggers: "Afirmações que geram engajamento"
```

---

## Input Required

```yaml
# Preencher antes de executar a task
input:
  big_idea:
    name: ""
    one_liner: ""
    validated_by: "koe-sintetizador"
    validation_date: ""

  target_audience:
    primary_persona: ""
    core_pain: ""
    core_desire: ""
    awareness_level: "unaware | problem_aware | solution_aware | product_aware"

  content_format: ""  # newsletter | blog | thread | script
  target_word_count: ""  # Ex: 1500-2000

  queue_references:
    - note_id: ""
      relevance: ""
    - note_id: ""
      relevance: ""

  cross_domain_seeds:
    - domain: ""
      connection: ""
    - domain: ""
      connection: ""

  deep_work_session:
    planned_duration: ""
    start_time: ""
    environment: "preparado | nao_preparado"
```

---

## Output Template

```yaml
# Output gerado pela task
output:
  metadata:
    task_id: KOE_ARQ_001
    created_at: ""
    agent: koe-arquiteto
    big_idea_name: ""
    content_format: ""
    word_count: 0
    creation_time_minutes: 0

  apag_content:
    title: ""

    attention:
      hook_type: ""  # contrarian | curiosity_gap | pattern_interrupt | story_open | bold_claim
      hook_text: ""
      hook_variants:
        - variant_1: ""
        - variant_2: ""
        - variant_3: ""

    perspective:
      reframe_statement: ""
      cross_domain_bridges:
        - bridge_1:
            origin: ""
            destination: ""
            mechanism: ""
            insight: ""
        - bridge_2:
            origin: ""
            destination: ""
            mechanism: ""
            insight: ""
      rhetorical_questions:
        - ""
      em_dash_count: 0

    advantage:
      transformation: "De [X] para [Y]"
      benefits:
        tangible: ""
        emotional: ""
        compounding: ""
      proof_elements:
        - type: ""  # personal_example | case_study | data
          description: ""

    gamify:
      cta_type: ""
      cta_text: ""
      execution_time: "< 5min"
      gamification_element: ""
      loop_closure: ""

  cascade_fragments:
    total_fragments: 0
    tweetable_quotes:
      - ""
    clip_worthy_sections:
      - section: ""
        start_paragraph: 0
        end_paragraph: 0
    thread_anchors:
      - ""
    visual_moments:
      - concept: ""
        suggested_format: ""
    debate_triggers:
      - ""

  quality_metrics:
    apag_complete: false
    cross_domain_bridges_count: 0
    em_dash_rhythm: false
    rhetorical_questions_count: 0
    hook_strength: ""  # weak | medium | strong
    cascade_fragments_count: 0
```

---

## Quality Gate

### Checklist de Validação (KOE_ARQ_001)

**Estrutura APAG:**
- [ ] Seção Attention presente com hook de < 2 linhas
- [ ] Seção Perspective com mínimo 2 pontes cross-domain
- [ ] Seção Advantage com 3 benefícios concretos (tangível, emocional, compounding)
- [ ] Seção Gamify com CTA executável em < 5 minutos

**Voz Dan Koe:**
- [ ] Em-dashes presentes para ritmo narrativo
- [ ] Pelo menos 1 pergunta retórica
- [ ] Tom direto e sem jargão acadêmico
- [ ] Frases curtas alternando com frases complexas (ritmo)

**Content Cascade:**
- [ ] Mínimo 10 pontos de fragmentação marcados
- [ ] 3 variantes de hook geradas para teste A/B
- [ ] Fragmentos tweetáveis identificados (< 280 chars)

**Sovereignty Check:**
- [ ] Conteúdo aumenta autonomia do leitor (não cria dependência)
- [ ] Conselhos são acionáveis sem compra obrigatória
- [ ] Segue princípio de radical simplicity

**Immune System:**
- [ ] Não contém táticas de urgência falsa
- [ ] Não promete resultado rápido sem esforço
- [ ] Não usa vanity metrics como argumento
- [ ] Não contradiz princípio de soberania pessoal

---

## Handoff

**Para koe-distribuidor (KOE_DIST_001-004):**
- Entregar conteúdo APAG completo com cascade_fragments marcados
- Incluir hook_variants para teste em diferentes plataformas
- Informar formato original e word_count para calibrar adaptações

**Para koe-chief:**
- Reportar quality_metrics para tracking do Content Pipeline
- Informar tempo real de criação vs estimado (90min)
- Sinalizar se Big Idea precisa de mais desenvolvimento (retorno ao koe-sintetizador)

---

*Koe Arquiteto | Deep Work Executor | APAG Structure Specialist*
*"Every piece of content is a micro-product. Structure it like one."*
