<!--
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║       ┌─────────┐                       ┌─────────┐              ║
║       │  TYPE    │    ╦  ╦ ╔═╗          │  TYPE    │              ║
║       │  ████    │    ║  ║ ╚═╗          │  ████    │              ║
║       │  ████    │    ╚╗╔╝ ╚═╝          │  ████    │              ║
║       │  ____    │     ╚╝               │  ____    │              ║
║       │ |Mind|   │  ┌──────────┐        │ |Mind|   │              ║
║       │ |Enrg|   │  │ COMPARE  │        │ |Enrg|   │              ║
║       │ |Natr|   │  │    &     │        │ |Natr|   │              ║
║       │ |Tact|   │  │ CONTRAST │        │ |Tact|   │              ║
║       └─────────┘  └──────────┘        └─────────┘              ║
║            ▲                                ▲                     ║
║            └────────── VERSUS ──────────────┘                     ║
║                                                                   ║
║   ╭─────────────────────────────────────────────────────────╮     ║
║   │  COMPARE TYPES - Side-by-side personality comparison    │     ║
║   │  Discover shared traits and key differences             │     ║
║   ╰─────────────────────────────────────────────────────────╯     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
-->

# Task: Compare Two Types

Side-by-side comparison of two personality types.

---

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                        METADATA                            │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Metadata
- **task-id:** compare-types
- **agent:** luiz-fosc
- **elicit:** false
- **execution_type:** worker
- **params:**
  - type1: string (required)
  - type2: string (required)

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

### Step 1: Load Reference Data
- `squads/luiz-fosc/data/mbti/type-profiles-overview.md`
- `squads/luiz-fosc/data/mbti/cognitive-functions-reference.md`
- `squads/luiz-fosc/data/mbti/temperaments-and-strategies.md`
- `squads/luiz-fosc/data/mbti/sources/personalities/{TYPE1}-{Nickname}.md` — **Premium source for TYPE1** (load for detailed trait descriptions and real-world behavioral patterns)
- `squads/luiz-fosc/data/mbti/sources/personalities/{TYPE2}-{Nickname}.md` — **Premium source for TYPE2**

<!-- ──────────────── Step 2: Comparison Table ────────────────── -->

### Step 2: Generate Comparison Table

```markdown
# Comparação: [TYPE1] vs. [TYPE2]

| Aspecto | [TYPE1] -- [Nickname] | [TYPE2] -- [Nickname] |
|---------|---------------------|---------------------|
| **Role** | [role] | [role] |
| **Temperamento** | [temperament] | [temperament] |
| **Mind** | [E/I + description] | [E/I + description] |
| **Energy** | [N/S + description] | [N/S + description] |
| **Nature** | [T/F + description] | [T/F + description] |
| **Tactics** | [J/P + description] | [J/P + description] |
| **Estratégia (A)** | [strategy] | [strategy] |
| **Estratégia (T)** | [strategy] | [strategy] |
| **Liderança** | [style] | [style] |
| **Social** | [style] | [style] |
| **Comunicação** | [style] | [style] |
| **Desequilíbrio** | [main risk] | [main risk] |
| **Desafio emocional** | [main challenge] | [main challenge] |
| **No trabalho** | [style] | [style] |
| **Pai/Mãe** | [style] | [style] |

## Funções Cognitivas
| Posição | [TYPE1] | [TYPE2] |
|---------|---------|---------|
| Dominante | [fn] | [fn] |
| Auxiliar | [fn] | [fn] |
| Terciária | [fn] | [fn] |
| Inferior | [fn] | [fn] |

## O que Compartilham
- [shared trait 1]
- [shared trait 2]

## Diferenças-Chave
- [key difference 1]
- [key difference 2]
- [key difference 3]

## Como Interagem
[Brief compatibility note based on their Role pairing]
```

<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                  ACCEPTANCE CRITERIA                        │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

## Acceptance Criteria
- [ ] Tabela comparativa com todos os aspectos preenchidos
- [ ] Funções cognitivas comparadas
- [ ] Pontos compartilhados identificados
- [ ] Diferenças-chave listadas
- [ ] Nota de compatibilidade incluída
