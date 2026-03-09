---
task_id: KOE_ARQ_005
name: "Course Module"
agent: koe-arquiteto
type: creation
complexity: high
estimated_time: 120min
version: 1.0.0

source:
  courses:
    - "Modern Mastery"
    - "Digital Economics"
    - "Mental Monetization"
    - "2 Hour Writer"
  author: "Dan Koe"
  framework: "Value Hierarchy (Entertainment → Transformation → Implementation) + APAG"
  reference: "Course design as highest-leverage digital product"

inputs:
  required:
    - course_name: "Nome do curso onde o módulo será inserido"
    - module_topic: "Tópico específico do módulo"
    - learning_outcome: "O que o aluno será capaz de fazer após completar"
    - target_student: "Perfil do aluno com nível de experiência"
  optional:
    - previous_modules: "Módulos anteriores para continuidade"
    - big_ideas_pool: "Big Ideas disponíveis do koe-sintetizador"
    - student_feedback: "Feedback de alunos sobre módulos anteriores"

outputs:
  primary:
    - module_content: "Módulo completo com lições, exercícios e assessment"
  secondary:
    - implementation_exercise: "Exercício prático de implementação"
    - cascade_fragments: "Fragmentos do módulo para conteúdo público"
  template: course-module-output.yaml

validation:
  checklist: course-quality-validation.md
  learning_outcome_measurable: true
  exercises_included: true
  implementation_present: true

elicit: true
---

# Course Module Design

## Propósito

> "A course is not information — it's transformation. Every module should move someone
> from 'I understand' to 'I can do this.' If they can't implement, you've failed."
> — Dan Koe

Projetar e escrever um módulo de curso completo para produto digital, seguindo a filosofia
de Dan Koe: cursos são veículos de transformação, não repositórios de informação.
Cada módulo leva o aluno de um estado atual para um estado desejado mensurável.

---

## Contexto

No sistema Dan Koe, cursos são o produto digital de maior valor no Leverage Stack:

```
Leverage Stack:
  1. Free Content (marketing) → Newsletter, YouTube, Social
  2. Low-Ticket ($27-97) → Mini-courses, templates
  3. Mid-Ticket ($297-997) → Full courses (Modern Mastery, 2 Hour Writer)
  4. High-Ticket ($2000+) → Coaching, mastermind
```

**Princípios de Design de Curso Dan Koe:**
- **Transformation over information** — o aluno IMPLEMENTA, não apenas aprende
- **Value Hierarchy** — Entertainment → Transformation → Implementation
- **Radical Simplicity** — menos módulos com mais profundidade
- **Cross-domain** — conectar conceitos de diferentes campos
- **Sovereignty** — ensinar o aluno a pensar, não criar dependência
- **APAG em cada lição** — mesmo dentro do curso, cada lição engaja

**Estrutura típica de módulo Dan Koe:**
1. Contexto e Big Idea do módulo (Attention)
2. Reframe/Perspectiva nova (Perspective)
3. Framework ou sistema prático (Advantage)
4. Exercício de implementação (Gamify)
5. Assessment para validar aprendizado

---

## Pré-requisitos

- [ ] Curso definido com syllabus geral
- [ ] Learning outcome do módulo claro e mensurável
- [ ] Perfil do aluno-alvo definido
- [ ] Módulos anteriores revisados (se aplicável)
- [ ] Big Ideas relevantes selecionadas
- [ ] Sessão de Deep Work agendada (120 min)

---

## Steps

### Step 1: Definir Learning Outcome Mensurável

**Objetivo:** Estabelecer exatamente o que o aluno será capaz de fazer.

**Framework de Learning Outcome:**

```yaml
learning_outcome:
  module_title: ""

  before_state:
    knowledge: "O aluno sabe..."
    ability: "O aluno consegue..."
    mindset: "O aluno acredita..."

  after_state:
    knowledge: "O aluno saberá..."
    ability: "O aluno conseguirá..."
    mindset: "O aluno acreditará..."

  measurable_outcome: ""
  # Formato: "Ao final deste módulo, o aluno será capaz de [VERBO] [OBJETO] [CRITÉRIO]"
  # Ex: "Ao final, o aluno será capaz de ESCREVER um HOOK APAG que gere > 10% CTR"

  bloom_taxonomy_level: ""
  # remember | understand | apply | analyze | evaluate | create

  time_to_master: ""  # Ex: "2-4 horas de prática"

  prerequisites:
    - module: ""
      skill: ""
```

**Regra Dan Koe:** Se o learning outcome não pode ser verificado com um exercício
prático, está muito vago. Refazer até ser testável.

---

### Step 2: Estruturar Fluxo da Lição

**Objetivo:** Criar o fluxo pedagógico que leva do desconhecimento à implementação.

**Lesson Flow Framework:**

```yaml
lesson_flow:
  # Parte 1: ENGAGE (10-15% do módulo)
  engage:
    hook: ""  # Por que este módulo importa AGORA
    story: ""  # Exemplo pessoal ou caso de uso
    promise: ""  # O que o aluno ganha ao completar
    anti_vision: ""  # O que acontece se NÃO aprender isso

  # Parte 2: TEACH (30-40% do módulo)
  teach:
    big_idea: ""  # Conceito central do módulo
    reframe: ""  # Perspectiva nova que muda tudo
    framework:
      name: ""
      steps: []
      visual: ""  # Diagrama ou modelo mental
    cross_domain_bridge: ""  # Conexão inesperada que ilumina
    common_mistakes:
      - mistake: ""
        why_it_happens: ""
        correct_approach: ""

  # Parte 3: SHOW (20-25% do módulo)
  show:
    example_1:
      context: ""
      walkthrough: ""
      result: ""
    example_2:
      context: ""
      walkthrough: ""
      result: ""
    before_after:
      before: ""
      after: ""
      transformation: ""

  # Parte 4: DO (25-30% do módulo)
  do:
    exercise_guided:
      instruction: ""
      template: ""
      time_estimate: ""
    exercise_independent:
      challenge: ""
      criteria: ""
      time_estimate: ""
    implementation_project:
      description: ""
      deliverable: ""
      deadline_suggested: ""
```

**Proporção ideal:** 15% Engage + 35% Teach + 20% Show + 30% Do = 100%

---

### Step 3: Escrever Conteúdo com Exercícios

**Objetivo:** Produzir o conteúdo completo do módulo incluindo exercícios integrados.

**Diretrizes de Escrita:**

1. **Tom e Voz:**
   - Conversacional como Dan Koe (em-dashes, perguntas retóricas)
   - Direto e sem jargão desnecessário
   - Segundo pessoa ("Você vai..." não "O aluno deve...")
   - Confiante sem ser arrogante

2. **Estrutura de Cada Seção:**
   - Abrir com hook (por que importa)
   - Explicar conceito com exemplo
   - Dar framework acionável
   - Fechar com micro-exercício

3. **Exercícios Integrados:**
   ```yaml
   exercise_types:
     reflection: "Pare e pense: [pergunta que força aplicação pessoal]"
     micro_implementation: "Agora faça: [ação de 5 minutos]"
     template_fill: "Complete este template com seu caso: [template]"
     peer_review: "Compartilhe no grupo e receba feedback: [instrução]"
     challenge: "Desafio de 7 dias: [estrutura progressiva]"
   ```

4. **Formatação para Plataforma Digital:**
   - Headers claros para navegação
   - Bullets para listas acionáveis
   - Caixas de destaque para conceitos-chave
   - Espaçamento generoso (uma ideia por parágrafo)

---

### Step 4: Criar Assessment

**Objetivo:** Desenhar verificação de aprendizado que confirma transformação.

**Assessment Framework:**

```yaml
assessment:
  type: ""  # quiz | project | peer_review | self_assessment

  # Opção 1: Quiz de Compreensão
  quiz:
    questions:
      - question: ""
        type: ""  # multiple_choice | open_ended | scenario
        correct_answer: ""
        explanation: ""
    passing_score: 0.7

  # Opção 2: Projeto de Implementação
  project:
    description: ""
    deliverable: ""
    rubric:
      excellent: ""
      good: ""
      adequate: ""
      needs_improvement: ""
    estimated_time: ""

  # Opção 3: Self-Assessment
  self_assessment:
    checklist:
      - "Eu consigo [ability] sem consultar o material"
      - "Eu entendo por que [concept] funciona"
      - "Eu já implementei [deliverable]"
    confidence_scale: "1-10"

  # Opção 4: Peer Review
  peer_review:
    submission: ""
    review_criteria: []
    feedback_template: ""
```

**Regra Dan Koe:** O melhor assessment é o que faz o aluno CRIAR algo real.
Quizzes são úteis para conceitos, mas projetos são superiores para transformação.

---

### Step 5: Desenhar Exercício de Implementação

**Objetivo:** Criar o exercício final que transforma conhecimento em habilidade.

**Implementation Exercise Framework:**

```yaml
implementation_exercise:
  name: ""
  description: ""

  context:
    why_this_exercise: ""
    real_world_connection: ""

  instructions:
    step_1:
      action: ""
      time: ""
      tip: ""
    step_2:
      action: ""
      time: ""
      tip: ""
    step_3:
      action: ""
      time: ""
      tip: ""

  deliverable:
    format: ""
    minimum_requirements: []
    stretch_goals: []

  success_criteria:
    must_have: []
    nice_to_have: []

  common_mistakes:
    - mistake: ""
      fix: ""

  example_output:
    description: ""
    quality: ""  # O que um output "excelente" parece

  time_estimate: ""
  difficulty: ""  # beginner | intermediate | advanced

  sovereignty_note: ""
  # Como este exercício aumenta a autonomia do aluno
```

**Princípio:** O exercício deve ser aplicável ao negócio/projeto real do aluno,
não um caso fictício. Isso garante implementação imediata.

---

## Input Required

```yaml
input:
  course:
    name: ""
    total_modules: 0
    current_module_number: 0
    syllabus_summary: ""

  module:
    topic: ""
    learning_outcome: ""
    estimated_duration: ""  # Em minutos de consumo

  target_student:
    experience_level: ""  # beginner | intermediate | advanced
    primary_goal: ""
    biggest_obstacle: ""

  big_ideas:
    - name: ""
      relevance: ""

  previous_modules:
    - module_number: 0
      topic: ""
      key_takeaway: ""

  deep_work_session:
    planned_duration: "120min"
    time_slot: ""
```

---

## Output Template

```yaml
output:
  metadata:
    task_id: KOE_ARQ_005
    created_at: ""
    agent: koe-arquiteto
    course_name: ""
    module_number: 0
    module_title: ""

  learning_outcome:
    before_state: ""
    after_state: ""
    measurable: ""
    bloom_level: ""

  module_content:
    engage:
      hook: ""
      story: ""
      word_count: 0
    teach:
      big_idea: ""
      framework_name: ""
      framework_steps: []
      cross_domain_bridge: ""
      word_count: 0
    show:
      examples_count: 0
      before_after_included: false
      word_count: 0
    do:
      exercises_count: 0
      implementation_included: true
      word_count: 0

  total_word_count: 0
  estimated_consumption_time: ""

  assessment:
    type: ""
    passing_criteria: ""

  implementation_exercise:
    name: ""
    deliverable: ""
    time_estimate: ""

  cascade_fragments:
    teachable_moments: []
    quotable_lines: []
    framework_diagrams: []

  quality_metrics:
    learning_outcome_measurable: false
    engage_teach_show_do_complete: false
    exercises_included: false
    assessment_present: false
    implementation_exercise_present: false
    voice_consistency: ""
    sovereignty_check: false
```

---

## Quality Gate

### Checklist de Validação (KOE_ARQ_005)

**Learning Design:**
- [ ] Learning outcome é mensurável e específico
- [ ] Bloom taxonomy level adequado ao objetivo
- [ ] Fluxo Engage → Teach → Show → Do completo
- [ ] Proporção adequada (15/35/20/30)

**Conteúdo:**
- [ ] Big Idea claramente articulada
- [ ] Framework prático com passos claros
- [ ] Mínimo 2 exemplos concretos
- [ ] Before/After demonstrado
- [ ] Cross-domain bridge presente

**Exercícios:**
- [ ] Exercícios integrados ao longo do módulo
- [ ] Exercício de implementação final com deliverable real
- [ ] Assessment verificável incluído
- [ ] Instruções claras e tempo estimado definido

**Voz Dan Koe:**
- [ ] Tom conversacional direto
- [ ] Em-dashes e perguntas retóricas presentes
- [ ] Sem jargão acadêmico desnecessário
- [ ] Parágrafos curtos e escaneáveis

**Sovereignty:**
- [ ] Módulo ensina a pensar, não cria dependência
- [ ] Exercício aplicável ao projeto real do aluno
- [ ] Aluno sai mais autônomo do que entrou

**Immune System:**
- [ ] Não promete resultado sem esforço de implementação
- [ ] Não usa táticas de urgência artificial
- [ ] Valor real entregue (não filler content)

---

## Handoff

**Para koe-chief:**
- Módulo completo com métricas de qualidade
- Tempo de criação real vs estimado (120min)
- Recomendações para módulos subsequentes

**Para koe-distribuidor:**
- Cascade fragments extraídos do módulo (teachable moments)
- Framework diagrams que podem virar conteúdo público
- Quotable lines para social media

**Para koe-offers:**
- Assessment results template (para medir satisfação do aluno)
- Implementation exercise como preview de valor do curso

---

*Koe Arquiteto | Course Design Specialist | Transformation Architect*
*"A course is not information — it's transformation."*
