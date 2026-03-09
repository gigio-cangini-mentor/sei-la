<!--
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                           T E A M                                            ║
║                        D Y N A M I C S                                       ║
║                                                                              ║
║               ┌───┐         ┌───┐         ┌───┐                              ║
║               │ @ │─────────│ @ │─────────│ @ │                              ║
║               └─┬─┘         └─┬─┘         └─┬─┘                              ║
║                 │  \          │          /  │                                 ║
║                 │   \    ┌────┴────┐    /   │                                 ║
║                 │    ╲   │ SYNERGY │   ╱    │                                 ║
║                 │     ╲  └────┬────┘  ╱     │                                 ║
║                 │      ╲     │     ╱      │                                  ║
║               ┌─┴─┐    ╲  ┌─┴─┐  ╱    ┌─┴─┐                                ║
║               │ @ │─────╲─│ @ │─╱─────│ @ │                                ║
║               └─┬─┘      ╲└─┬─┘╱      └─┬─┘                                ║
║                 │          ╲ │ ╱          │                                   ║
║                 │           ╲│╱           │                                   ║
║                 │          ┌─┴─┐          │                                   ║
║                 └──────────│ @ │──────────┘                                   ║
║                            └───┘                                              ║
║                           LEADER                                             ║
║                                                                              ║
║      ┌──────────────────────────────────────────────────────┐                ║
║      │  "None of us is as smart as all of us."             │                ║
║      │   Understand the invisible threads that connect      │                ║
║      │   your team — and the friction points that divide.   │                ║
║      └──────────────────────────────────────────────────────┘                ║
║                                                                              ║
║   ░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█   ║
║   █  MBTI Expert Squad  ·  Team Dynamics Task  ·  Analytical Engine     █   ║
║   ░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█░█   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
-->

# Task: Team Dynamics Analysis

Analyze team composition and dynamics based on member types.

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                    M E T A D A T A                          │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

---

## Metadata
- **task-id:** team-dynamics
- **agent:** luiz-fosc
- **elicit:** true
- **execution_type:** agent
- **params:**
  - types: string (required) — Comma-separated type codes (e.g., "ENTJ,INFP,ISTP,ESFJ")

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
- `squads/luiz-fosc/data/mbti/type-profiles-overview.md`
- `squads/luiz-fosc/data/mbti/compatibility-matrix.md`
- `squads/luiz-fosc/data/mbti/career-map.md`
- `squads/luiz-fosc/data/mbti/brazilian-statistics.md`

<!-- ─────────────────────────────────────────────────────────────── -->

### Step 2: Analyze Composition

```markdown
# Análise de Dinâmica de Equipe

## Composição
| Membro | Tipo | Role | Temperamento |
|--------|------|------|-------------|
| 1 | [type] | [role] | [temp] |
| ... | ... | ... | ... |

## Distribuição
- Roles: [count per role]
- E/I: [ratio]
- N/S: [ratio]
- T/F: [ratio]
- J/P: [ratio]

## Forças da Equipe
- [strengths from composition]

## Gaps e Pontos Cegos
- [missing roles or dimensions]
- [potential blind spots]

## Potenciais Conflitos
- [specific pairings that may clash]
- [dynamics to watch]

## Recomendações
1. [team communication tip]
2. [conflict prevention strategy]
3. [role assignment suggestion based on types]
4. [suggestion for missing perspective]

## Comparação com Perfil Corporativo Brasileiro
[How this team compares to average Brazilian team composition]
```

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                  ACCEPTANCE CRITERIA                        │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

## Acceptance Criteria
- [ ] Composição do time mapeada por Role
- [ ] Forças coletivas e lacunas identificadas
- [ ] Dinâmicas de conflito potenciais
- [ ] Recomendações de comunicação
- [ ] Plano de melhoria do time
