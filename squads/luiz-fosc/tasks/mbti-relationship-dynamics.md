<!--
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║                  ╭────╮         ╭────╮                            ║
║                  │    │         │    │                             ║
║                  │ O  │         │ O  │                             ║
║                  │/|\ │         │/|\ │                             ║
║                  │/ \ │         │/ \ │                             ║
║                  ╰──┬─╯         ╰─┬──╯                            ║
║                     │             │                               ║
║                     └──────┬──────┘                               ║
║                            │                                      ║
║                     ┌──────┴──────┐                               ║
║                     │  DYNAMICS   │                               ║
║                     │ ~~~~~~~~~~~ │                               ║
║                     │  Balanced   │                               ║
║                     │  Unbalanced │                               ║
║                     │  Growth     │                               ║
║                     └─────────────┘                               ║
║                                                                   ║
║           ══════  RELATIONSHIP DYNAMICS  ══════                   ║
║                                                                   ║
║   ╭─────────────────────────────────────────────────────────╮     ║
║   │  RELATIONSHIP DYNAMICS - How types connect & grow       │     ║
║   │  Romantic, friendship & family interaction patterns     │     ║
║   ╰─────────────────────────────────────────────────────────╯     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
-->

# Task: Relationship Dynamics

Detailed relationship dynamics analysis for a type or type pairing.

---

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                        METADATA                            │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Metadata
- **task-id:** relationship-dynamics
- **agent:** luiz-fosc
- **elicit:** true
- **execution_type:** agent
- **params:**
  - type: string (required) -- Primary type
  - partner_type: string (optional) -- Partner type for specific pairing
  - context: string (optional) -- "romantic", "friendship", "family" (default: romantic)

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                    VETO CONDITIONS                          │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Veto Conditions
- ❌ **VETO** se tipo informado não é um código MBTI válido (16 tipos: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP)
- ❌ **VETO** se dados de referência não foram carregados antes de gerar output

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                      INSTRUCTIONS                          │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Instructions

### Step 1: Load Data
- `squads/luiz-fosc/data/mbti/compatibility-matrix.md`
- `squads/luiz-fosc/data/mbti/type-profiles-overview.md`
- `squads/luiz-fosc/data/mbti/sources/personalities/{TYPE}-{Nickname}.md` — **Premium source** (load Relationships section: approach to relationships, balanced/unbalanced dynamics, communication patterns, growth through connection)

<!-- ──────────────── Step 2: Generate Analysis ───────────────── -->

### Step 2: Generate Analysis

If partner_type provided: Specific pairing analysis (Balanced/Unbalanced/Rebalancing)
If only type provided: General relationship profile across all 4 Role pairings

Include:
- Approach to relationships (general tendencies)
- Best compatibility dynamics for each Role group
- Communication style in relationships
- Common relationship pitfalls
- Practical exercises from source material
- Growth opportunities through relationships

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                  ACCEPTANCE CRITERIA                        │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Acceptance Criteria
- [ ] Abordagem geral de relacionamentos descrita
- [ ] Dinâmicas por Role group cobertas (ou pairing específico)
- [ ] Estilo de comunicação em relacionamentos
- [ ] Armadilhas comuns identificadas
- [ ] Exercícios práticos do material fonte incluídos
