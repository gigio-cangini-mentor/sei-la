<!--
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      ║
║      ░░                                                            ░░      ║
║      ░░              ████████████████████████████                   ░░      ║
║      ░░           ████░░░░░░░░░░░░░░░░░░░░░░░░████                ░░      ║
║      ░░         ███░░░░░░▓▓▓▓▓▓░░░░░▓▓▓▓▓▓░░░░░░███              ░░      ║
║      ░░        ██░░░░▓▓▓▓▓▓▓▓▓▓▓▓░▓▓▓▓▓▓▓▓▓▓▓░░░░██             ░░      ║
║      ░░       ██░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░██            ░░      ║
║      ░░      ██░░▓▓▓▓▓▓╔══╗▓▓▓▓▓▓▓▓▓▓▓╔══╗▓▓▓▓▓░░██            ░░      ║
║      ░░      ██░▓▓▓▓▓▓▓║██║▓▓▓▓▓▓▓▓▓▓▓║██║▓▓▓▓▓▓░██            ░░      ║
║      ░░      ██░▓▓▓▓▓▓▓╚══╝▓▓▓▓▓▓▓▓▓▓▓╚══╝▓▓▓▓▓▓░██            ░░      ║
║      ░░      ██░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░██            ░░      ║
║      ░░       ██░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░██             ░░      ║
║      ░░        ██░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░██              ░░      ║
║      ░░         ███░░░░░░░░░░░░░░░░░░░░░░░░░░░███               ░░      ║
║      ░░           ████████████████████████████████                ░░      ║
║      ░░                   ║║║║║║║║║║║║                            ░░      ║
║      ░░               ════╬╬╬╬╬╬╬╬╬╬╬╬════                      ░░      ║
║      ░░              NEURAL ░ CONNECTIONS                         ░░      ║
║      ░░                                                            ░░      ║
║      ░░    ██████╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗██╗██╗  ░░      ║
║      ░░   ██╔════╝██╔═══██╗██╔════╝ ████╗  ██║██║╚══██╔══╝██║██║  ░░      ║
║      ░░   ██║     ██║   ██║██║  ███╗██╔██╗ ██║██║   ██║   ██║██║  ░░      ║
║      ░░   ██║     ██║   ██║██║   ██║██║╚██╗██║██║   ██║   ██║╚═╝  ░░      ║
║      ░░   ╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║   ██║██╗  ░░      ║
║      ░░    ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝╚═╝  ░░      ║
║      ░░                                                            ░░      ║
║      ░░     C O G N I T I V E    F U N C T I O N S                ░░      ║
║      ░░            B R E A K D O W N                               ░░      ║
║      ░░                                                            ░░      ║
║      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
-->

# Task: Cognitive Functions Breakdown

Detailed Jungian cognitive functions analysis for a type.

---

<!-- ┌─────────────────────────────────────────────────────────────────┐ -->
<!-- │  ⚙  M E T A D A T A                                           │ -->
<!-- └─────────────────────────────────────────────────────────────────┘ -->

## Metadata
- **task-id:** cognitive-functions
- **agent:** luiz-fosc
- **elicit:** false
- **execution_type:** worker
- **params:**
  - type: string (required)

<!-- ┌─────────────────────────────────────────────────────────────────┐ -->
<!-- │  ⚙  VETO CONDITIONS                                            │ -->
<!-- └─────────────────────────────────────────────────────────────────┘ -->

## Veto Conditions
- ❌ **VETO** se tipo informado não é um código MBTI válido (16 tipos: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP)
- ❌ **VETO** se dados de referência não foram carregados antes de gerar output

<!-- ┌─────────────────────────────────────────────────────────────────┐ -->
<!-- │  ⚙  I N S T R U C T I O N S                                   │ -->
<!-- └─────────────────────────────────────────────────────────────────┘ -->

## Instructions

### Step 1: Load Data
- `squads/luiz-fosc/data/mbti/cognitive-functions-reference.md`
- `squads/luiz-fosc/data/mbti/type-profiles-overview.md`

<!-- ╔═══════════════════════════════════════════════════════════════╗ -->
<!-- ║  ⚙  GENERATE FUNCTIONS ANALYSIS                             ║ -->
<!-- ╚═══════════════════════════════════════════════════════════════╝ -->

### Step 2: Generate Functions Analysis

```markdown
# Funções Cognitivas: [TYPE]

## Stack Funcional
| # | Função | Orientação | Papel |
|---|--------|-----------|-------|
| 1 | [fn] | [E/I] | Dominante — [description] |
| 2 | [fn] | [E/I] | Auxiliar — [description] |
| 3 | [fn] | [E/I] | Terciária — [description] |
| 4 | [fn] | [E/I] | Inferior — [description] |

## Função Dominante: [fn]
[Detailed description of how this manifests in this type]
[Development timeline: childhood]

## Função Auxiliar: [fn]
[Detailed description of how this balances the dominant]
[Development timeline: adolescence]

## Função Terciária: [fn]
[How this develops in midlife; growth opportunity]

## Função Inferior: [fn]
[How this manifests under stress (grip)]
[Development opportunity in later life]

## Sombra (Shadow Functions)
| # | Função | Papel |
|---|--------|-------|
| 5 | [fn] | Oponente |
| 6 | [fn] | Pai/Mãe Crítico |
| 7 | [fn] | Trickster |
| 8 | [fn] | Demônio |

## Nota Importante
O modelo 16Personalities NÃO utiliza funções cognitivas.
Esta análise segue o modelo Junguiano clássico (Jung/Myers-Briggs).
Ambos os modelos são complementares e oferecem perspectivas diferentes.
```

<!-- ┌─────────────────────────────────────────────────────────────────┐ -->
<!-- │  ⚙  ACCEPTANCE CRITERIA                                        │ -->
<!-- └─────────────────────────────────────────────────────────────────┘ -->

## Acceptance Criteria
- [ ] Stack completo (dominante, auxiliar, terciária, inferior)
- [ ] Descrição de cada função no contexto do tipo
- [ ] Funções sombra mencionadas
- [ ] Processo de individuação abordado
- [ ] Aplicações práticas incluídas
