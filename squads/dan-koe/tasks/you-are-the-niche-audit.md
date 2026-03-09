# Task: Auditoria "Você É o Nicho"

```yaml
task_id: KOE_BRD_001
agent: koe-brand
type: validation
complexity: medium
estimated_time: 30min
source: "Digital Renaissance — Dan Koe"
version: 1.0
tags: [niche, positioning, authenticity, personal-brand]
dependencies: []
```

## Propósito

> "You are the niche. You don't find a niche — you ARE the niche.
> Your unique intersection of skills, interests, and experiences IS the market
> that nobody else can serve."
> — Dan Koe

Auditar se o criador realmente É o nicho — e não apenas está servindo um nicho genérico.
A diferença é crucial: quem serve um nicho compete com milhares; quem É o nicho é único.

## Contexto

O modelo tradicional de "escolher um nicho" está morto segundo Dan Koe.
Em vez de escolher uma categoria de mercado e competir dentro dela, o criador deve:

1. **Identificar a interseção única** de suas habilidades + interesses + experiências
2. **Ser insubstituível** nessa interseção (ninguém mais tem a mesma combinação)
3. **Criar o mercado** em vez de competir em um mercado existente

### Sinais de que você NÃO é o nicho
- Qualquer pessoa com um curso poderia fazer o que você faz
- Sua bio poderia ser copiada por 100 outras pessoas
- Você escolheu o nicho por ser "lucrativo", não por ser genuíno
- Você não tem experiência pessoal profunda no tema

### Sinais de que você É o nicho
- Sua combinação de skills + experiências é irreproduzível
- Pessoas te procuram especificamente (não procuram "um profissional de X")
- Você viveu o problema que resolve
- Seu conteúdo tem perspectiva que ninguém mais tem

## Steps

### Step 1 — Mapear Interseção Única (10min)

Identifique os 3 pilares da sua interseção:

**Pilar 1 — Skills (O que você SABE fazer)**:
Liste todas as habilidades relevantes:
1. ____
2. ____
3. ____
4. ____
5. ____

Quais são de alto nível (top 10% no assunto)?
- ____
- ____

**Pilar 2 — Interests (O que te FASCINA)**:
Liste os interesses genuínos (não os "lucrativos"):
1. ____
2. ____
3. ____
4. ____
5. ____

Quais você pesquisaria mesmo sem ganhar dinheiro?
- ____
- ____

**Pilar 3 — Experiences (O que você VIVEU)**:
Liste experiências únicas que moldam sua perspectiva:
1. ____
2. ____
3. ____
4. ____
5. ____

Quais transformaram fundamentalmente como você vê o mundo?
- ____
- ____

**Interseção**: O ponto onde Skills + Interests + Experiences se encontram:
> "Eu sou __________ que __________ e ajudo __________ a __________"

### Step 2 — Teste de Unicidade (8min)

Valide que a interseção é verdadeiramente única:

**Teste 1 — Busca no Google**:
- Pesquise sua "declaração de interseção" no Google
- Quantos resultados relevantes aparecem? ____
- Alguém mais ocupa exatamente esse posicionamento? SIM/NÃO

**Teste 2 — Teste do Clone**:
- Se alguém quisesse copiar seu posicionamento, precisaria ter:
  - [ ] Suas mesmas habilidades técnicas
  - [ ] Seus mesmos interesses genuínos
  - [ ] Suas mesmas experiências de vida
  - [ ] Sua mesma perspectiva/worldview
- Quantos checkboxes marcou? ____/4
- Se < 3: sua interseção não é única o suficiente

**Teste 3 — Teste da Substituição**:
- Se você desaparecesse, alguém poderia substituir sua perspectiva?
- Se SIM: você não é o nicho, está apenas NO nicho
- Se NÃO: você É o nicho

**Teste 4 — Teste do Conteúdo**:
- Seu conteúdo poderia ter sido escrito por qualquer especialista?
- Ou ele tem insights que SÓ vêm da sua experiência?
- Exemplos de insights únicos: ____

### Step 3 — Identificar Defensibilidade (7min)

O que torna sua posição impossível de copiar?

**Moats (Fossos Defensivos)**:
1. **Experiência Vivida**: O que você viveu que não pode ser aprendido em curso?
   - ____
2. **Rede de Relacionamentos**: Quem você conhece que dá acesso único?
   - ____
3. **Perspectiva Contrarian**: Que opinião sua vai contra o mainstream?
   - ____
4. **Prova Acumulada**: Que resultados você acumulou ao longo de anos?
   - ____
5. **Propriedade Intelectual**: Que frameworks/métodos você criou?
   - ____

**Score de Defensibilidade**: ____/5 moats identificados

### Step 4 — Scoring de Autenticidade (5min)

Avalie a autenticidade da sua posição:

| Critério | Score (0-10) |
|----------|-------------|
| Genuinidade: Você faria isso sem ganhar dinheiro? | ____ |
| Profundidade: Você conhece o tema em nível expert? | ____ |
| Experiência: Você viveu o que ensina? | ____ |
| Perspectiva: Sua visão é única/proprietária? | ____ |
| Paixão: Você fica entusiasmado falando sobre isso? | ____ |
| Prova: Você tem resultados para mostrar? | ____ |
| Consistência: Você fala sobre isso há mais de 1 ano? | ____ |
| Evolução: Seu pensamento evolui (não é estático)? | ____ |

**Score Total**: ____/80
- 60-80: Você É o nicho
- 40-59: Está no caminho, mas precisa aprofundar
- 20-39: Está servindo um nicho, não sendo o nicho
- 0-19: Repensar posicionamento completamente

## Input Required

```yaml
input:
  creator:
    name: ""
    current_positioning: ""
    years_in_field: 0
    content_platforms: []
    audience_size: 0

  self_assessment:
    skills:
      - skill: ""
        level: "beginner|intermediate|advanced|expert"
      - skill: ""
        level: ""
      - skill: ""
        level: ""
    interests:
      - interest: ""
        years_of_passion: 0
      - interest: ""
        years_of_passion: 0
    experiences:
      - experience: ""
        impact_level: "low|medium|high|transformative"
      - experience: ""
        impact_level: ""

  market_context:
    current_niche: ""
    competitors_count: 0
    differentiation_claim: ""
```

## Output Template

```yaml
output:
  niche_audit:
    creator_name: ""
    audit_date: ""

    intersection:
      skills_pillar:
        top_skills: []
        expert_level_skills: []
      interests_pillar:
        genuine_interests: []
        would_do_for_free: []
      experiences_pillar:
        unique_experiences: []
        transformative_experiences: []
      intersection_statement: ""

    uniqueness_tests:
      google_test:
        similar_results: 0
        unique_position: true|false
      clone_test:
        checkboxes_needed: 0
        score: 0  # out of 4
      substitution_test:
        replaceable: true|false
        reason: ""
      content_test:
        unique_insights: []
        could_be_generic: true|false

    defensibility:
      moats:
        lived_experience: ""
        relationships: ""
        contrarian_view: ""
        accumulated_proof: ""
        intellectual_property: ""
      moat_score: 0  # out of 5

    authenticity_score:
      genuineness: 0
      depth: 0
      experience: 0
      perspective: 0
      passion: 0
      proof: 0
      consistency: 0
      evolution: 0
      total: 0  # out of 80
      classification: ""

    verdict:
      is_the_niche: true|false
      confidence: "low|medium|high"
      improvements_needed: []
      action_plan: ""
```

## Quality Gate

```yaml
quality_gate: KOE_BRD_001_QG
checklist:
  - [ ] 3 pilares (Skills, Interests, Experiences) mapeados com 5+ itens cada
  - [ ] Declaração de interseção escrita em 1 frase
  - [ ] 4 testes de unicidade executados com scores
  - [ ] Mínimo 3 moats defensivos identificados
  - [ ] Score de autenticidade ≥ 60/80 para aprovação
  - [ ] Se score < 60: plano de ação para aumentar autenticidade
  - [ ] Veredicto claro: É ou Não É o nicho
  - [ ] Sem autoengano: avaliação honesta e fundamentada
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_BRD_002  # Personal Monopoly Design usando a interseção
    - KOE_BRD_004  # Authority Construction baseada nos moats
  artifacts:
    - niche_audit.yaml
  notes: "Auditoria completa. Se score < 60, trabalhar gaps antes de criar monopoly."
```
