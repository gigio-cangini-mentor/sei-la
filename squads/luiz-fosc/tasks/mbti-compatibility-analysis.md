<!--
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║                        .-""""""-.                                 ║
║                      .'          '.                               ║
║                     /   O      O   \                              ║
║                    :                :                              ║
║                    |                |                              ║
║                    : ',          ,' :                              ║
║                     \  '-......-'  /                               ║
║                      '.          .'                                ║
║                  ╔═════'-.____.-'═════╗                            ║
║                  ║                    ║                            ║
║            ♥  ───╣  COMPATIBILITY     ╠───  ♥                     ║
║                  ║     ANALYSIS       ║                            ║
║                  ╚════════════════════╝                            ║
║                                                                   ║
║             ┌────────┐  ~~ <3 ~~  ┌────────┐                     ║
║             │ TYPE 1 │────────────│ TYPE 2 │                     ║
║             │  INTJ  │  connect?  │  ENFP  │                     ║
║             └────────┘            └────────┘                     ║
║                                                                   ║
║   ╭─────────────────────────────────────────────────────────╮     ║
║   │  COMPATIBILITY ANALYSIS - Deep connection dynamics      │     ║
║   │  Romantic, friendship & workplace compatibility         │     ║
║   ╰─────────────────────────────────────────────────────────╯     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
-->

# Task: Compatibility Analysis

Deep compatibility analysis between two personality types.

---

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                        METADATA                            │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Metadata
- **task-id:** compatibility-analysis
- **agent:** luiz-fosc
- **elicit:** true
- **execution_type:** agent
- **params:**
  - type1: string (required) -- First type code
  - type2: string (required) -- Second type code
  - context: string (optional) -- "romantic", "friendship", "workplace" (default: all)

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                    VETO CONDITIONS                          │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Veto Conditions
- ❌ **VETO** se tipo informado não é um código MBTI válido (16 tipos: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP)
- ❌ **VETO** se type1 e type2 são idênticos (sem análise comparativa possível)
- ❌ **VETO** se dados de referência não foram carregados antes de gerar output

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                      INSTRUCTIONS                          │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Instructions

### Step 1: Validate Input
Ensure both types are valid 4-letter MBTI codes.

<!-- ──────────────── Step 2: Load Data ───────────────────────── -->

### Step 2: Load Reference Data
- `squads/luiz-fosc/data/mbti/compatibility-matrix.md` -- Role pairings
- `squads/luiz-fosc/data/mbti/type-profiles-overview.md` -- Type details
- `squads/luiz-fosc/data/mbti/cognitive-functions-reference.md` -- Function dynamics
- `squads/luiz-fosc/data/mbti/sources/personalities/{TYPE1}-{Nickname}.md` -- **Premium source for TYPE1** (load Relationships section: romantic, friendship, workplace dynamics)
- `squads/luiz-fosc/data/mbti/sources/personalities/{TYPE2}-{Nickname}.md` -- **Premium source for TYPE2** (load Relationships section)

<!-- ──────────────── Step 3: Pairing Category ────────────────── -->

### Step 3: Determine Pairing Category
Identify the Role groups for both types and find the corresponding pairing:
- Same Role (e.g., Analyst-Analyst)
- Cross-Role (e.g., Analyst-Diplomat)

<!-- ──────────────── Step 4: Generate Analysis ───────────────── -->

### Step 4: Generate Analysis

```markdown
# Compatibilidade: [TYPE1] x [TYPE2]

## Perfil Rápido
| | [TYPE1] | [TYPE2] |
|---|---------|---------|
| Role | [role] | [role] |
| Temperamento | [temp] | [temp] |
| Funções Dom/Aux | [fn] | [fn] |

## Pontos de Conexão
- [shared traits or complementary dynamics]
- [what naturally works between these types]

## Potenciais Fricções
- [where natural tensions exist]
- [common misunderstandings]

## Dinâmica por Contexto

### Romântico
- **Equilibrado:** [description]
- **Desequilibrado:** [description]
- **Reequilibrando:** [practical advice]

### Amizade
- **Equilibrado:** [description]
- **Desequilibrado:** [description]
- **Reequilibrando:** [practical advice]

### Trabalho
- **Equilibrado:** [description]
- **Desequilibrado:** [description]
- **Reequilibrando:** [practical advice]

## Funções Cognitivas: Complementaridade
[Analysis of how their function stacks interact]

## Exercícios Práticos
1. [practical exercise from source material]
2. [communication tip]
3. [conflict resolution approach]

## Resumo
[Overall compatibility assessment with growth potential]
```

<!-- ──────────────── Step 5: Context Filter ──────────────────── -->

### Step 5: If context specified
Only show the relevant section (romantic, friendship, or workplace) with extra depth.

<!-- ──────────────── Step 6: Next Steps ──────────────────────── -->

### Step 6: Offer Next Steps
- `*relationship [TYPE1] [TYPE2] --context romantic` -- Deep relationship dynamics
- `*type-profile [TYPE1]` -- Full profile of first type
- `*type-profile [TYPE2]` -- Full profile of second type

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                  ACCEPTANCE CRITERIA                        │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Acceptance Criteria
- [ ] Perfil rápido com Role e Temperamento de ambos
- [ ] Pontos de conexão e fricções identificados
- [ ] Dinâmica por contexto (romântico, amizade, trabalho) incluída
- [ ] Complementaridade de funções cognitivas analisada
- [ ] Exercícios práticos oferecidos
