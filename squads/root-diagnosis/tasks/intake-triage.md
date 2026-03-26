# intake-triage.md — Intake & Triage do Problema

## Purpose

Coletar contexto, escopo e restrições do problema antes de iniciar o diagnóstico.
Esta é a porta de entrada do pipeline diagnóstico — sem um intake bem feito, todo
o resto do diagnóstico fica comprometido. O objetivo é transformar a percepção
inicial do problema em um brief estruturado que alimente todas as fases seguintes.

**Agente responsável:** root-diagnosis-chief
**Fase:** 0 — Intake & Triage

---

## Task Metadata

```yaml
task_id: root-diagnosis/intake-triage
task_name: Gather Problem Context
squad: root-diagnosis
type: intake-assessment
status: pending
responsible_executor: root-diagnosis-chief
execution_type: Agent
version: "1.0.0"
estimated_duration: "15-30 min"
execution_mode: interactive
```

---

## Inputs

```yaml
required:
  requester_description:
    field: "Descrição inicial do problema pelo solicitante"
    format: text
    required: true
    source: user_input

optional:
  existing_documentation:
    field: "Documentos, relatórios ou dados prévios sobre o problema"
    format: files
    required: false
  previous_attempts:
    field: "Tentativas anteriores de resolução e seus resultados"
    format: text
    required: false
```

---

## Preconditions

- [ ] Squad root-diagnosis ativo e configurado
- [ ] Agente root-diagnosis-chief carregado
- [ ] Usuário disponível para sessão de elicitation (15-30 min)

---

## Elicitation Points (AskUserQuestion)

O agente DEVE fazer as 8 perguntas abaixo antes de prosseguir. Cada resposta
alimenta campos específicos do output.

### E1: Descrição do Problema

```yaml
AskUserQuestion:
  id: "intake_problem_description"
  question: "Descreva o problema como você o vê hoje. Seja o mais específico possível — o que está acontecendo, onde, com que frequência?"
  type: open
  required: true
  max_length: 1000
  feeds: problem_statement
  followup_if_vague: "Pode dar um exemplo concreto de quando esse problema se manifestou pela última vez?"
```

### E2: Stakeholders Afetados

```yaml
AskUserQuestion:
  id: "intake_stakeholders"
  question: "Quem são os stakeholders afetados por esse problema? Quem sofre as consequências diretas e indiretas?"
  type: open
  required: true
  max_length: 500
  feeds: stakeholder_map
  followup_if_vague: "Liste nomes, papéis ou grupos específicos que são impactados."
```

### E3: Duração do Problema

```yaml
AskUserQuestion:
  id: "intake_duration"
  question: "Há quanto tempo esse problema existe? Ele apareceu de repente ou foi se agravando aos poucos?"
  type: open
  required: true
  max_length: 300
  feeds: problem_timeline
```

### E4: Tentativas Anteriores

```yaml
AskUserQuestion:
  id: "intake_previous_attempts"
  question: "O que já foi tentado para resolver esse problema? (Mesmo soluções parciais ou que falharam contam.)"
  type: open
  required: true
  max_length: 500
  feeds: attempted_solutions
  followup_if_none: "Nenhuma tentativa? O que impediu de tentar até agora?"
```

### E5: Profundidade Desejada

```yaml
AskUserQuestion:
  id: "intake_depth"
  question: "Qual o nível de profundidade desejado para este diagnóstico?"
  type: multiple_choice
  options:
    - "Quick (30-45 min) — Diagnóstico rápido com 7 fases essenciais, foco em causas mais prováveis"
    - "Full (60-120 min) — Diagnóstico completo com todas as 11 fases"
    - "Deep (240+ min) — Diagnóstico exaustivo com múltiplas iterações e quantificação profunda"
  required: true
  feeds: diagnostic_depth
```

### E6: Restrições de Acesso

```yaml
AskUserQuestion:
  id: "intake_constraints"
  question: "Existem restrições de acesso a informações ou pessoas? Algum tema sensível, político ou confidencial que eu deva saber?"
  type: open
  required: false
  max_length: 500
  feeds: access_constraints
```

### E7: Nível de Urgência

```yaml
AskUserQuestion:
  id: "intake_urgency"
  question: "Qual o nível de urgência? (crítico | alto | médio | baixo)"
  type: multiple_choice
  options:
    - "Crítico — Impacto severo imediato, precisa de resposta urgente"
    - "Alto — Impacto significativo, precisa de atenção em dias"
    - "Médio — Impacto moderado, pode ser tratado em semanas"
    - "Baixo — Impacto menor, diagnóstico para planejamento futuro"
  required: true
  feeds: urgency_level
```

### E8: Acesso a Dados e Pessoas

```yaml
AskUserQuestion:
  id: "intake_data_access"
  question: "Há acesso a dados, métricas ou pessoas relevantes para investigar? Que tipo de evidências estão disponíveis?"
  type: open
  required: true
  max_length: 500
  feeds: data_access_level
  followup_if_vague: "Especificamente: há dashboards, relatórios, métricas, ou pessoas-chave disponíveis para entrevista?"
```

---

## Action Items

1. **Apresentar contexto do diagnóstico** — Explicar ao usuário o que vai acontecer e quanto tempo leva
2. **Aplicar as 8 perguntas de elicitation** — Sequencialmente, com follow-ups quando necessário
3. **Validar completude** — Garantir que problema foi articulado de forma específica (não vaga)
4. **Classificar urgência** — Baseado nas respostas, classificar urgência (Critical/High/Medium/Low)
5. **Determinar escopo** — Baseado na profundidade escolhida, definir quais fases serão executadas
6. **Compilar intake-brief.md** — Gerar o documento de output estruturado

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/intake-brief.md`

```yaml
output:
  intake_brief:
    problem_statement: "Descrição estruturada do problema"
    stakeholder_map: "Lista de stakeholders afetados com papel e impacto"
    problem_timeline: "Histórico temporal do problema"
    attempted_solutions: "O que já foi tentado e resultado de cada tentativa"
    diagnostic_depth: "Quick | Full | Deep"
    access_constraints: "Restrições conhecidas"
    urgency: "Critical | High | Medium | Low"
    data_access_level: "Disponibilidade de dados, métricas e pessoas para investigação"
    scope:
      required_phases: []
      optional_phases: []
      estimated_duration: "X horas"
```

---

## Acceptance Criteria

- [ ] Todas as 8 perguntas de elicitation foram feitas
- [ ] Problem statement é específico, não vago (contém exemplos concretos)
- [ ] Stakeholders estão identificados com papéis
- [ ] Profundidade foi escolhida pelo usuário
- [ ] intake-brief.md gerado com todos os campos preenchidos
- [ ] Urgência classificada com justificativa

---

## Veto Conditions

```yaml
veto:
  condition: "O solicitante não consegue articular o problema mesmo após follow-ups"
  action: "HALT — Não é possível diagnosticar o que não pode ser descrito"
  recovery: "Sugerir ao usuário um período de observação estruturada antes de retornar"
  message: "Sem uma descrição mínima do problema, o diagnóstico não tem ponto de partida. Recomendo observar o problema por 1-2 semanas registrando ocorrências concretas."
```

---

## Handoff

```yaml
handoff:
  next_task: classify-domain.md
  executor: dave-snowden
  passes:
    - intake-brief.md (complete)
  condition: "intake-brief.md gerado com problem_statement não-vazio"
```

---

## Error Handling

```yaml
errors:
  user_abandons:
    action: "Salvar respostas parciais em data/{slug}/intake-partial.md"
    recovery: "Retomar da última pergunta respondida"

  vague_responses:
    action: "Follow-up pedindo exemplo concreto"
    max_followups: 2
    escalation: "Se ainda vago após 2 follow-ups, registrar como-está e prosseguir com flag low_confidence"

  contradictory_responses:
    action: "Apontar contradição e pedir esclarecimento"
    example: "Você disse que o problema existe há 5 anos, mas que apareceu de repente. Pode explicar?"
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-21 | Initial release — 6 elicitation points, intake-brief output |
| 1.1.0 | 2026-02-22 | Added E7 (urgency) and E8 (data access) — now 8 elicitation points. Aligned depth times with config/workflow (30-45min / 60-120min / 240+min) |
