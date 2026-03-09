# Task: Sessao Focus Funnel

```yaml
task_id: KOE_MND_006
agent: koe-mindset
type: implementation
complexity: medium
estimated_time: 30min
source: "Focus Funnel — Dan Koe, The Art of Focus"
version: 1.0
tags: [focus, attention, elimination, automation, delegation, deep-work]
dependencies: []
```

## Proposito

> "Most people are busy, not productive. They confuse motion with progress.
> The Focus Funnel forces you to ask the only question that matters:
> does this NEED my attention? If not, eliminate it. If yes, is there
> a way to do it without me? If not, THEN focus."
> — Dan Koe

Executar o Focus Funnel completo em 4 estagios — Eliminate, Automate, Delegate, Focus —
para reclamar tempo de atividades de baixo valor e redirecionar para trabalho criativo profundo.

## Contexto

O Focus Funnel e o filtro de Dan Koe para cada atividade que demanda atencao.
Diferente de "produtividade" generica, o Focus Funnel e subtrativo — ele remove
o que nao deveria existir antes de otimizar o que fica.

### O Funil

```
TODAS AS ATIVIDADES
    |
    v
[ELIMINATE] — Precisa existir? NAO → Corta
    |
    v
[AUTOMATE] — Pode ser sistematizado? SIM → Sistema
    |
    v
[DELEGATE] — Precisa ser EU? NAO → Delega
    |
    v
[FOCUS] — So eu posso fazer? SIM → Protege tempo para isso
```

### Regra de Ouro
O que sobrevive ao funil e seu trabalho REAL. Todo o resto e ruido disfarçado de produtividade.

## Steps

### Step 1 — Inventario de Atividades (8min)

Liste TODAS as atividades que consomem seu tempo numa semana tipica:

**Atividades Diarias**:
| # | Atividade | Tempo/dia | Categoria |
|---|-----------|-----------|-----------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |

**Total de horas/dia estimado**: ____

### Step 2 — ELIMINATE: Cortar o Desnecessario (7min)

Para cada atividade, pergunte: "Isso PRECISA existir?"

**Criterios de eliminacao**:
- Nao produz valor direto ou indireto
- Existe por habito, nao por necessidade
- Ninguem notaria se desaparecesse

**Atividades a ELIMINAR**:
| # | Atividade | Por que eliminar | Tempo recuperado |
|---|-----------|-----------------|-----------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

**Compromisso**: Quando vou parar? ____
**Protecao**: O que fazer quando sentir vontade de voltar? ____

### Step 3 — AUTOMATE: Sistematizar o Repetitivo (5min)

Das atividades que sobreviveram, pergunte: "Um sistema pode fazer isso?"

**Criterios de automacao**:
- Tarefa repetitiva com padrao previsivel
- Ferramenta ou template pode substituir esforco manual
- Resultado consistente sem sua presenca

**Atividades a AUTOMATIZAR**:
| # | Atividade | Ferramenta/Sistema | Setup necessario | Tempo recuperado |
|---|-----------|-------------------|-----------------|-----------------|
| 1 | | | | |
| 2 | | | | |

### Step 4 — DELEGATE: Passar o que Nao Precisa de Voce (5min)

Das atividades restantes, pergunte: "Precisa ser EU especificamente?"

**Criterios de delegacao**:
- Requer humano, mas nao seu talento unico
- Alguem pode fazer 80% tao bem quanto voce
- Seu tempo vale mais no trabalho criativo

**Atividades a DELEGAR**:
| # | Atividade | Para quem | Custo estimado | Tempo recuperado |
|---|-----------|-----------|---------------|-----------------|
| 1 | | | | |
| 2 | | | | |

### Step 5 — FOCUS: Proteger o Trabalho Essencial (5min)

O que sobreviveu e seu trabalho REAL. Proteja-o:

**Atividades de FOCUS** (so voce pode fazer):
| # | Atividade | Horas/dia ideais | Bloco de energia |
|---|-----------|-----------------|-----------------|
| 1 | | | Peak |
| 2 | | | Peak |
| 3 | | | Sustained |

**Design de protecao**:
- Horario sagrado para deep work: ____ ate ____
- O que NUNCA entra nesse horario: ____
- Ritual de entrada no foco: ____
- Consequencia se violar o bloco: ____

**Tempo total recuperado**: ____ horas/dia
**Tempo redirecionado para FOCUS**: ____ horas/dia

## Input Required

```yaml
input:
  current_activities:
    - activity: ""
      time_per_day: ""
      category: "creation|admin|communication|consumption|maintenance"
  pain_points:
    biggest_time_waste: ""
    desired_focus_hours: 0
    current_focus_hours: 0
  constraints:
    team_available: true|false
    budget_for_tools: "none|low|medium|high"
    budget_for_delegation: "none|low|medium|high"
```

## Output Template

```yaml
output:
  focus_funnel_session:
    session_date: ""

    inventory:
      total_activities: 0
      total_hours_per_day: 0

    eliminate:
      activities: []
      time_recovered: ""
      start_date: ""

    automate:
      activities:
        - activity: ""
          tool: ""
          setup_time: ""
      time_recovered: ""

    delegate:
      activities:
        - activity: ""
          to_whom: ""
          cost: ""
      time_recovered: ""

    focus:
      activities:
        - activity: ""
          hours_per_day: ""
          energy_block: ""
      sacred_hours: ""
      protection_ritual: ""

    summary:
      total_time_recovered: ""
      time_redirected_to_focus: ""
      before_focus_hours: 0
      after_focus_hours: 0
      improvement_percentage: 0
```

## Quality Gate

```yaml
quality_gate: KOE_MND_006_QG
checklist:
  - [ ] Inventario completo com TODAS as atividades semanais
  - [ ] Minimo 2 atividades eliminadas com justificativa
  - [ ] Automacoes identificadas com ferramenta especifica
  - [ ] Delegacoes identificadas com responsavel (mesmo que futuro)
  - [ ] Atividades de FOCUS sao genuinamente trabalho criativo de alto valor
  - [ ] Horario sagrado definido com ritual de entrada
  - [ ] Tempo total recuperado calculado e realista
  - [ ] Nenhuma atividade de FOCUS e tarefeira disfarçada
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_MND_007  # Attention Spectrum Audit para medir onde a atencao vai
    - KOE_MND_008  # Creative Energy Management para alinhar energia aos blocos
    - KOE_MND_004  # Habit Loop Reengineering para instalar novos habitos
  artifacts:
    - focus_funnel_session.yaml
  notes: "Focus Funnel completo. Implementar eliminacoes IMEDIATAMENTE. Automacoes e delegacoes em 7 dias."
```
