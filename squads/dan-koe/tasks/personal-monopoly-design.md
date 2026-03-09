# Task: Design de Monopoly Pessoal

```yaml
task_id: KOE_BRD_002
agent: koe-brand
type: creation
complexity: high
estimated_time: 45min
source: "Digital Renaissance — Dan Koe"
version: 1.0
tags: [personal-monopoly, positioning, differentiation, brand-moat]
dependencies: [KOE_BRD_001]
```

## Propósito

> "A personal monopoly is the intersection of your skills, interests, and
> experience that creates a market of ONE. No one can compete with you
> because no one else IS you."
> — Dan Koe

Desenhar um Personal Monopoly — posicionamento único que ninguém pode replicar.
O resultado é uma posição de mercado onde você é a ÚNICA opção, não a melhor opção.

## Contexto

Personal Monopoly é o conceito central de Dan Koe para posicionamento.
Diferente de um "nicho", que é uma categoria de mercado com competidores,
um monopoly pessoal é uma categoria que você CRIA e que só você pode ocupar.

### Componentes de um Personal Monopoly
1. **Skill Stack**: Combinação de 3+ habilidades de alto nível
2. **Unique Intersection**: O ponto onde suas skills se cruzam de forma inédita
3. **Monopoly Declaration**: Sua declaração de posicionamento irreproduzível
4. **Content Pillars**: Os temas derivados do seu monopoly

### Exemplos de Personal Monopoly
- Dan Koe: Filosofia + Design + Marketing Digital → "O cara que ensina solopreneurship como caminho filosófico"
- Naval Ravikant: Startups + Filosofia + Wealth → "O filósofo do wealth building"
- Tim Ferriss: Lifestyle Design + Biohacking + Entrevistas → "O decodificador de alta performance"

### Diferença: Nicho vs. Monopoly

| Aspecto | Nicho | Monopoly |
|---------|-------|----------|
| Competidores | Muitos | Zero |
| Defensibilidade | Baixa | Máxima |
| Preço | Compete por preço | Define seu preço |
| Substituição | Facilmente substituível | Impossível substituir |
| Crescimento | Linear | Exponencial |

## Steps

### Step 1 — Identificar 3+ Domínios de Skill (12min)

Liste todos os domínios onde você tem competência significativa.

**Domínio 1**:
- Nome: ____
- Nível: Beginner / Intermediate / Advanced / Expert
- Anos de experiência: ____
- Credenciais/provas: ____
- O que você consegue fazer que a maioria não consegue? ____

**Domínio 2**:
- Nome: ____
- Nível: ____
- Anos de experiência: ____
- Credenciais/provas: ____
- O que você consegue fazer que a maioria não consegue? ____

**Domínio 3**:
- Nome: ____
- Nível: ____
- Anos de experiência: ____
- Credenciais/provas: ____
- O que você consegue fazer que a maioria não consegue? ____

**Domínio 4 (opcional)**:
- Nome: ____
- Nível: ____
- Anos de experiência: ____

**Domínio 5 (opcional)**:
- Nome: ____
- Nível: ____
- Anos de experiência: ____

**Regra de validação**: Pelo menos 2 domínios devem ser nível Advanced ou Expert.

### Step 2 — Encontrar a Interseção Única (10min)

Cruze os domínios para encontrar onde eles se conectam de forma inédita.

**Exercício de cruzamento**:

Domínio 1 × Domínio 2 = ____
- Como essas duas skills se complementam?
- Que insight surge dessa combinação?

Domínio 1 × Domínio 3 = ____
- Como essas duas skills se complementam?
- Que insight surge dessa combinação?

Domínio 2 × Domínio 3 = ____
- Como essas duas skills se complementam?
- Que insight surge dessa combinação?

Domínio 1 × Domínio 2 × Domínio 3 = ____
- Que perspectiva ÚNICA surge do cruzamento dos 3?
- Quem mais no mundo tem essa combinação exata? ____
- Se a resposta é "ninguém" → você encontrou seu monopoly

**Teste de mercado**:
- Existe demanda para essa interseção? ____
- As pessoas já buscam soluções nessa área? ____
- Você pode resolver um problema real com essa combinação? ____

### Step 3 — Criar Monopoly Declaration (10min)

Escreva sua declaração de monopólio pessoal.

**Formato**:
> "Eu sou o/a [identidade] que usa [skill 1] + [skill 2] + [skill 3]
> para ajudar [avatar] a [transformação] sem [dor principal que ele evita]."

**Draft 1** (primeira tentativa):
> "________________________________________________________"

**Draft 2** (mais conciso):
> "________________________________________________________"

**Draft 3** (versão final):
> "________________________________________________________"

**Checklist de validação da declaração**:
- [ ] Inclui sua identidade (não cargo genérico)
- [ ] Menciona pelo menos 2 skills do stack
- [ ] Define avatar específico
- [ ] Promete transformação clara
- [ ] Ninguém mais poderia usar essa mesma declaração
- [ ] Cabe em um tweet (≤ 280 caracteres)
- [ ] Gera curiosidade (pessoa quer saber mais)

### Step 4 — Desenhar Content Pillars do Monopoly (13min)

Derive 3-5 pilares de conteúdo diretamente do seu monopoly:

**Pilar 1**: ____
- Relação com o monopoly: ____
- Tipos de conteúdo: ____
- Frequência ideal: ____
- Exemplo de post: "____"

**Pilar 2**: ____
- Relação com o monopoly: ____
- Tipos de conteúdo: ____
- Frequência ideal: ____
- Exemplo de post: "____"

**Pilar 3**: ____
- Relação com o monopoly: ____
- Tipos de conteúdo: ____
- Frequência ideal: ____
- Exemplo de post: "____"

**Pilar 4 (opcional)**: ____
- Relação com o monopoly: ____
- Tipos de conteúdo: ____
- Frequência ideal: ____

**Pilar 5 (opcional)**: ____
- Relação com o monopoly: ____
- Tipos de conteúdo: ____
- Frequência ideal: ____

**Regra**: Cada pilar deve conectar diretamente a pelo menos 1 domínio de skill.
Nenhum pilar deve ser "genérico" (ex: "motivação", "produtividade" sem ângulo único).

## Input Required

```yaml
input:
  creator:
    name: ""
    current_positioning: ""
    niche_audit_result:
      intersection_statement: ""
      authenticity_score: 0
      is_the_niche: true|false

  skill_domains:
    - domain: ""
      level: "beginner|intermediate|advanced|expert"
      years: 0
      proof: []
    - domain: ""
      level: ""
      years: 0
      proof: []
    - domain: ""
      level: ""
      years: 0
      proof: []

  market_context:
    existing_audience: 0
    platforms: []
    current_content_topics: []
    competitor_positioning: []
```

## Output Template

```yaml
output:
  personal_monopoly:
    creator_name: ""

    skill_stack:
      domains:
        - name: ""
          level: ""
          years: 0
          unique_capability: ""
        - name: ""
          level: ""
          years: 0
          unique_capability: ""
        - name: ""
          level: ""
          years: 0
          unique_capability: ""
      validation:
        advanced_or_expert_count: 0
        passes_minimum: true|false

    unique_intersection:
      domain_1_x_2: ""
      domain_1_x_3: ""
      domain_2_x_3: ""
      all_domains_combined: ""
      uniqueness_proof: ""
      market_demand_exists: true|false

    monopoly_declaration:
      final_statement: ""
      character_count: 0
      validation:
        includes_identity: true|false
        mentions_skills: true|false
        defines_avatar: true|false
        promises_transformation: true|false
        is_unique: true|false
        fits_tweet: true|false
        generates_curiosity: true|false
        total_checks: 0  # out of 7

    content_pillars:
      - pillar: ""
        monopoly_connection: ""
        content_types: []
        frequency: ""
        example_post: ""
      - pillar: ""
        monopoly_connection: ""
        content_types: []
        frequency: ""
        example_post: ""
      - pillar: ""
        monopoly_connection: ""
        content_types: []
        frequency: ""
        example_post: ""

    competitive_analysis:
      direct_competitors: 0
      closest_alternative: ""
      differentiation_gap: ""
      moat_strength: "weak|medium|strong|unbreakable"
```

## Quality Gate

```yaml
quality_gate: KOE_BRD_002_QG
checklist:
  - [ ] 3+ domínios de skill identificados com pelo menos 2 em nível Advanced+
  - [ ] Cruzamento de todos os pares de domínios documentado
  - [ ] Interseção dos 3+ domínios gera perspectiva verdadeiramente única
  - [ ] Monopoly Declaration passa 6/7 checks de validação
  - [ ] Declaração ≤ 280 caracteres
  - [ ] 3-5 content pillars derivados diretamente do monopoly
  - [ ] Cada pilar conecta a pelo menos 1 domínio de skill
  - [ ] Nenhum pilar é genérico (todos têm ângulo único)
  - [ ] Moat strength ≥ "strong"
  - [ ] Teste de mercado confirma demanda para a interseção
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_BRD_003  # Leverage Stack Build usando o monopoly como base
    - KOE_BRD_004  # Authority Construction para amplificar o monopoly
    - KOE_BRD_005  # Brand Lead Gen para monetizar o monopoly
  artifacts:
    - personal_monopoly.yaml
  notes: "Monopoly desenhado. Usar como filtro para TODA decisão de conteúdo e produto."
```
