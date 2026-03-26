# diagnose-culture.md — Diagnóstico Cultural, Político e Emocional

## Purpose

Extrair dinâmicas ocultas que influenciam o problema mas que não aparecem no discurso
oficial. Organizações (e indivíduos) frequentemente têm camadas não-ditas de poder,
tabus, emoções e normas invisíveis que mantêm o problema vivo. Sem diagnosticar essa
camada, a causa-raiz técnica pode estar correta mas a solução nunca será implementada.

**Agente responsável:** edgar-schein
**Fase:** 2 — Cultural & Political Diagnosis
**Frameworks:** Humble Inquiry, Clinical Inquiry, 3 Levels of Culture

---

## Task Metadata

```yaml
task_id: root-diagnosis/diagnose-culture
task_name: Diagnose Cultural Dynamics
squad: root-diagnosis
type: cultural-diagnosis
status: pending
responsible_executor: edgar-schein
execution_type: Agent
version: "1.0.0"
estimated_duration: "20-40 min"
execution_mode: interactive
```

---

## Inputs

```yaml
required:
  intake_brief:
    field: "Documento completo do intake"
    format: markdown
    source: tasks/intake-triage.md → intake-brief.md
    required: true

  domain_classification:
    field: "Classificação Cynefin do problema"
    format: markdown
    source: tasks/classify-domain.md → domain-classification.md
    required: true
```

---

## Preconditions

- [ ] intake-brief.md disponível
- [ ] domain-classification.md disponível
- [ ] Agente edgar-schein carregado com frameworks culturais
- [ ] Usuário disponível para sessão de inquiry (20-40 min)

---

## Elicitation Points (Humble Inquiry)

O agente DEVE fazer estas perguntas usando Humble Inquiry — genuína curiosidade,
sem julgamento, criando segurança psicológica para o interlocutor revelar o não-dito.

### E1: Dinâmicas de Poder

```yaml
AskUserQuestion:
  id: "culture_power"
  question: "Quem tem mais a perder se esse problema for resolvido? Existe alguém que, conscientemente ou não, se beneficia da situação atual?"
  type: open
  required: true
  max_length: 500
  feeds: power_dynamics
  tone: "humble_inquiry"
  followup: "Me ajude a entender — como as decisões são realmente tomadas nesse contexto? (Não o organograma oficial, mas como funciona de verdade.)"
```

### E2: Temas Proibidos

```yaml
AskUserQuestion:
  id: "culture_taboos"
  question: "Existe algo sobre esse problema que as pessoas evitam falar abertamente? Algum 'elefante na sala'?"
  type: open
  required: true
  max_length: 500
  feeds: undiscussables
  tone: "humble_inquiry"
  followup: "Se existisse uma conversa honesta que ninguém está tendo, qual seria?"
```

### E3: Histórico Emocional

```yaml
AskUserQuestion:
  id: "culture_emotions"
  question: "Que emoções esse problema gera nas pessoas envolvidas? (Frustração, medo, raiva, resignação, indiferença?)"
  type: open
  required: true
  max_length: 500
  feeds: emotional_landscape
```

### E4: Normas Invisíveis

```yaml
AskUserQuestion:
  id: "culture_norms"
  question: "Quais são as regras não-escritas nesse contexto? O que 'todo mundo sabe' mas ninguém formaliza?"
  type: open
  required: true
  max_length: 500
  feeds: invisible_norms
```

### E5: Tentativas Abortadas

```yaml
AskUserQuestion:
  id: "culture_aborted"
  question: "Alguém já tentou resolver esse problema e foi 'desestimulado'? O que aconteceu?"
  type: open
  required: false
  max_length: 500
  feeds: resistance_patterns
```

---

## Action Items

### Step 1: Apply 3 Levels of Culture Analysis

```yaml
three_levels:
  level_1_artifacts:
    description: "O que é visível — processos, estruturas, comportamentos observáveis"
    analysis: "Mapear artefatos relacionados ao problema"

  level_2_espoused_values:
    description: "O que é declarado — valores oficiais, missão, políticas"
    analysis: "Identificar gap entre discurso oficial e realidade"

  level_3_basic_assumptions:
    description: "O que é inconsciente — crenças profundas que guiam comportamento"
    analysis: "Inferir pressupostos básicos a partir dos gaps entre L1 e L2"
```

### Step 2: Identify Undiscussables

Usando as respostas de elicitation, mapear temas que são:
- **Undiscussable** — Ninguém fala sobre
- **Doubly undiscussable** — Ninguém fala sobre o fato de que ninguém fala sobre

### Step 3: Map Resistance Patterns

Identificar padrões de resistência que podem sabotar a resolução:
- Resistência passiva (concordar e não fazer)
- Resistência ativa (bloquear explicitamente)
- Resistência sistêmica (estruturas que impedem mudança)

### Step 4: Assess Implementation Viability

Avaliar se o contexto cultural permite implementar soluções:
- **Green:** Cultura suporta mudança
- **Yellow:** Mudança possível com gestão cuidadosa de stakeholders
- **Red:** Cultura bloqueará qualquer solução — tratar cultura primeiro

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/cultural-diagnosis.md`

```yaml
output:
  cultural_diagnosis:
    three_levels_analysis:
      artifacts: "Descrição dos artefatos observados"
      espoused_values: "Valores declarados vs praticados"
      basic_assumptions: "Pressupostos inconscientes identificados"
    undiscussables:
      - topic: "Descrição do tema proibido"
        severity: "High | Medium | Low"
        impact_on_problem: "Como isso mantém o problema vivo"
    power_dynamics:
      beneficiaries: "Quem se beneficia do status quo"
      blockers: "Quem pode bloquear resolução"
      champions: "Quem apoiaria mudança"
    emotional_landscape: "Mapa emocional dos stakeholders"
    resistance_patterns:
      - pattern: "Tipo de resistência"
        source: "De onde vem"
        mitigation: "Como mitigar"
    implementation_viability: "Green | Yellow | Red"
    recommendations: "Ações culturais necessárias para viabilizar resolução"
```

---

## Acceptance Criteria

- [ ] Análise dos 3 níveis de cultura completada
- [ ] Pelo menos 1 undiscussable identificado (ou declaração explícita de que não há)
- [ ] Dinâmicas de poder mapeadas
- [ ] Viabilidade de implementação classificada (Green/Yellow/Red)
- [ ] Recomendações culturais documentadas

---

## Veto Conditions

```yaml
veto:
  condition: "Acesso ao contexto organizacional negado — usuário não pode/quer responder perguntas culturais"
  action: "SKIP phase — Documentar como 'Cultural analysis unavailable'"
  recovery: "Prosseguir sem diagnóstico cultural, mas flaggar no relatório final como blind spot"
  message: "Sem acesso ao contexto cultural, o diagnóstico ficará incompleto. Vamos prosseguir, mas registro que esta dimensão é um ponto cego."
```

---

## Handoff

```yaml
handoff:
  next_task: audit-assumptions.md
  executor: chris-argyris
  passes:
    - intake-brief.md
    - domain-classification.md
    - cultural-diagnosis.md
  condition: "cultural-diagnosis.md gerado (ou skip documentado)"
```

---

## Error Handling

```yaml
errors:
  phase_timeout:
    threshold: "30 min para esta fase — se Humble Inquiry exceder, documentar parcial"
    action: "WARN ao usuario — oferecer simplificar escopo ou skip se fase opcional"
    recovery: "Salvar output parcial e documentar o que foi completado. Registrar quais elicitation points foram cobertos e quais ficaram pendentes"

  contradictory_inputs:
    condition: "Output de fase anterior contradiz dados novos desta fase (ex: intake diz 'sem conflito político' mas cultural diagnosis revela poder oculto)"
    action: "Documentar contradição — não ignorar silenciosamente"
    recovery: "Flaggar como 'data_conflict' no output e recomendar revisão na Phase 8 (stress test)"

  insufficient_data:
    condition: "Dados insuficientes para completar análise com confiança (ex: usuário responde monossilabicamente às perguntas culturais)"
    action: "WARN — documentar o que falta e qual impacto na confiança"
    recovery: "Prosseguir com confidence=Low e flag para Phase 7 (quantificação)"

  agent_degradation:
    condition: "Agente não consegue aplicar framework adequadamente"
    action: "Fallback para root-diagnosis-chief com método simplificado"
    degradation: "Documentar como limitation no relatório final"
```

### Exemplo Concreto de Output — Cultural Artifacts

```yaml
# Exemplo de output para Level 1 Artifacts
three_levels_analysis:
  artifacts:
    - artifact: "Reuniões de status semanais onde ninguém reporta problemas"
      observation: "100% dos reports são 'on track' apesar de 3 deadlines perdidos no trimestre"
      implication: "Cultura de 'não dar más notícias' — conflito entre discurso e realidade"
    - artifact: "Canal Slack #general tem 0 mensagens nos últimos 30 dias"
      observation: "Comunicação migrou para DMs e grupos fechados"
      implication: "Transparência formal existe mas comunicação real é opaca"
  espoused_values:
    - value: "Transparência e comunicação aberta (website corporativo)"
      reality: "Informação flui por canais informais e seletivos"
      gap: "HIGH — discurso oficial contradiz prática observada"
  basic_assumptions:
    - assumption: "Mostrar vulnerabilidade é sinal de fraqueza"
      evidence: "Ninguém reporta problemas, tentativas anteriores de 'abrir o jogo' resultaram em consequências negativas"
      impact: "Problemas ficam ocultos até virarem crises"
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-21 | Initial release — Humble Inquiry, 3 Levels, undiscussables, power mapping |
| 1.1.0 | 2026-02-22 | Add Error Handling section — timeout 30min, contradictions, insufficient data, agent degradation. Add concrete output example for cultural artifacts |
