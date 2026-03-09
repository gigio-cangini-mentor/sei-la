<!--
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                                                                              ║
║              ┌───────┐                                                       ║
║              │  ___  │                                                       ║
║              │ (o o) │          ┌───────┐                                     ║
║              │  \_/  │          │  ___  │                                     ║
║              │       │    ~~    │ (o o) │                                     ║
║              └───┬───┘   /  \  │  \_/  │                                     ║
║            ┌─────┴─────┐/    \┌┴───────┴┐                                    ║
║            │           ├──────┤         │                                    ║
║            │  PARENT   │ LOVE │  CHILD  │                                    ║
║            │           ├──────┤         │                                    ║
║            └─────┬─────┘      └────┬────┘                                    ║
║                  │    ╔════════╗    │                                         ║
║               ┌──┴──┐ ║ GUIDE ║ ┌──┴──┐                                      ║
║               │ /|\ │ ╚════════╝ │     │                                      ║
║               │/ | \│            │  /\ │                                      ║
║               │  |  │            │ /  \│                                      ║
║               │ / \ │            │/    │                                      ║
║               └─────┘            └─────┘                                      ║
║                                                                              ║
║          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                    ║
║          ~  Nurturing growth, type by type             ~                    ║
║          ~  Understanding your child through the lens  ~                    ║
║          ~  of personality                             ~                    ║
║          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                    ║
║                                                                              ║
║   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ║
║   ▒  MBTI Expert Squad  ·  Parenting Guide Task  ·  Data-Lookup Engine   ▒   ║
║   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
-->

# Task: Parenting Guide

Parenting advice by type and child developmental stage.

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                    M E T A D A T A                          │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

---

## Metadata
- **task-id:** parenting-guide
- **agent:** luiz-fosc
- **elicit:** true
- **execution_type:** agent
- **params:**
  - type: string (required) — Parent's type
  - stage: string (optional) — "infancy", "toddler", "preschool", "school", "adolescence"
  - child_type: string (optional) — Child's type if known

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                    VETO CONDITIONS                          │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

## Veto Conditions
- ❌ **VETO** se tipo informado não é um código MBTI válido (16 tipos: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP)
- ❌ **VETO** se dados de referência não foram carregados antes de gerar output

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │               I N S T R U C T I O N S                       │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

## Instructions

### Step 1: Load Data
- `squads/luiz-fosc/data/mbti/parenting-stages.md`
- `squads/luiz-fosc/data/mbti/type-profiles-overview.md`
- `squads/luiz-fosc/data/mbti/sources/personalities/{TYPE}-{Nickname}.md` — **Premium source** (load Parenthood section: parenting strengths, challenges by developmental stage, Erikson-aligned advice)

<!-- ─────────────────────────────────────────────────────────────── -->

### Step 2: Ask Context
If stage not specified, ask:
- Child's age range
- Specific parenting challenge being faced

<!-- ─────────────────────────────────────────────────────────────── -->

### Step 3: Generate Guide
Include:
- Parent type's natural parenting strengths
- Parent type's natural parenting challenges
- Stage-specific advice (Balanced/Unbalanced/Rebalancing)
- If child_type known: Cross-reference parent-child type dynamics
- Practical tips and exercises
- ABCDE method for adolescent emotional regulation (if stage = adolescence)

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                  ACCEPTANCE CRITERIA                        │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

## Acceptance Criteria
- [ ] Forças e desafios naturais como pai/mãe
- [ ] Conselho específico por estágio de desenvolvimento
- [ ] Dinâmica pai-filho quando child_type fornecido
- [ ] Dicas práticas e exercícios
- [ ] Método ABCDE se estágio = adolescência
