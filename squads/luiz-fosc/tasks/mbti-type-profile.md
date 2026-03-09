<!--
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║              ┌──────────────────────┐                             ║
║              │  ╭────╮             │                              ║
║              │  │    │  ┌────────┐ │                              ║
║              │  │ O  │  │ Name:  │ │                              ║
║              │  │/|\ │  │ Role:  │ │                              ║
║              │  │/ \ │  │ Type:  │ │                              ║
║              │  │    │  │ Fns:   │ │                              ║
║              │  ╰────╯  └────────┘ │                              ║
║              │  ┌────────────────┐ │                              ║
║              │  │ ## Strengths   │ │                              ║
║              │  │ ## Challenges  │ │                              ║
║              │  │ ## Functions   │ │                              ║
║              │  └────────────────┘ │                              ║
║              └──────────────────────┘                             ║
║                                                                   ║
║   ╭─────────────────────────────────────────────────────────╮     ║
║   │  TYPE PROFILE - Comprehensive personality blueprint     │     ║
║   │  Deep-dive into strengths, functions & growth areas     │     ║
║   ╰─────────────────────────────────────────────────────────╯     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
-->

# Task: Complete Type Profile

Generate a comprehensive profile for a given personality type.

---

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                        METADATA                            │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Metadata
- **task-id:** type-profile
- **agent:** luiz-fosc
- **elicit:** false
- **execution_type:** worker
- **params:**
  - type: string (required) -- The 4-letter type code (e.g., INTJ, ENFP)

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

### Step 1: Validate Input
Ensure `type` is a valid 4-letter MBTI code from the 16 types.

<!-- ──────────────── Step 2: Load Data ───────────────────────── -->

### Step 2: Load Reference Data
Read the following data files:
- `squads/luiz-fosc/data/mbti/type-profiles-overview.md` -- Core profile
- `squads/luiz-fosc/data/mbti/cognitive-functions-reference.md` -- Function stack
- `squads/luiz-fosc/data/mbti/temperaments-and-strategies.md` -- Temperament & strategy
- `squads/luiz-fosc/data/mbti/sources/personalities/{TYPE}-{Nickname}.md` -- **Premium source profile** (load for deep, evidence-based content: strengths, weaknesses, growth areas, stress behavior, real-world examples)

<!-- ──────────────── Step 3: Generate Profile ────────────────── -->

### Step 3: Generate Profile

Present a structured report with these sections:

```markdown
# [TYPE] -- "[Nickname]" ([Nome PT])

## Visão Geral
- Role: [Analyst/Diplomat/Sentinel/Explorer]
- Temperamento Keirsey: [NT/NF/SJ/SP] -- [Nome]
- Estratégia (A): [Strategy name]
- Estratégia (T): [Strategy name]
- Frequência: [% na população brasileira, se disponível]

## Os 5 Aspectos de Personalidade
- **Mind:** [E/I] -- [description]
- **Energy:** [N/S] -- [description]
- **Nature:** [T/F] -- [description]
- **Tactics:** [J/P] -- [description]
- **Identity:** [A/T variants] -- [description]

## Funções Cognitivas (Modelo Junguiano)
| Posição | Função | Descrição |
|---------|--------|-----------|
| Dominante | [XX] | [description] |
| Auxiliar | [XX] | [description] |
| Terciária | [XX] | [description] |
| Inferior | [XX] | [description] |

## Pontos Fortes
- [strength 1]
- [strength 2]
- [strength 3]
- [strength 4]
- [strength 5]

## Áreas de Desenvolvimento
- [challenge 1]
- [challenge 2]
- [challenge 3]
- [challenge 4]

## Comportamento Sob Estresse (Grip)
[Description of inferior function activation]

## Resumo
[2-3 sentence synthesis]
```

<!-- ──────────────── Step 4: Next Steps ──────────────────────── -->

### Step 4: Offer Next Steps
Suggest related commands:
- `*personal-growth [TYPE]` -- Development plan
- `*career [TYPE]` -- Career guidance
- `*compatibility [TYPE] [OTHER]` -- Relationship analysis
- `*compare [TYPE] [OTHER]` -- Side-by-side comparison

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                  ACCEPTANCE CRITERIA                        │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Acceptance Criteria
- [ ] Visão geral com Role, Temperamento, Estratégia
- [ ] 5 Aspectos de Personalidade apresentados
- [ ] Funções cognitivas com 4 posições
- [ ] Mínimo 5 pontos fortes e 4 áreas de desenvolvimento
- [ ] Comportamento sob estresse descrito
- [ ] Próximos passos oferecidos
