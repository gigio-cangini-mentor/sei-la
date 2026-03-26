# package-for-action.md — Empacotar Diagnóstico para Ação

## Purpose

Transformar um diagnóstico técnico em um pacote acionável. Diagnósticos brilhantes que
não levam a ação são inúteis. Esta task pega as causas-raiz verificadas e as traduz em
problemas priorizados, statements "How Might We", critérios de sucesso e um challenge
map que serve como ponte direta entre diagnóstico e execução.

**Agente responsável:** min-basadur
**Fase:** 9 — Package for Action
**Framework:** Simplex Process (Creative Problem Solving)

---

## Task Metadata

```yaml
task_id: root-diagnosis/package-for-action
task_name: Package Diagnosis for Action
squad: root-diagnosis
type: action-packaging
status: pending
responsible_executor: min-basadur
execution_type: Agent
version: "1.0.0"
estimated_duration: "20-30 min"
execution_mode: analytical
```

---

## Inputs

```yaml
required:
  all_previous_outputs:
    source: "Todos os outputs das fases 0-8"
    required: true
    critical_files:
      - root-cause-analysis.md (verified root causes)
      - stress-test.md (amendments and caveats)
      - evidence-quantification.md (confidence levels)
      - reframing-analysis.md (recommended frame)
```

---

## Preconditions

- [ ] Stress test PASS ou PASS_WITH_AMENDMENTS
- [ ] Causas-raiz verificadas disponíveis
- [ ] Agente min-basadur carregado com Simplex framework

---

## Action Items

### Step 1: Prioritize Root Causes

Organizar causas-raiz por prioridade de ação:

```yaml
prioritization_matrix:
  criteria:
    - impact: "Impacto na resolução do problema (1-5)"
    - urgency: "Urgência de tratamento (1-5)"
    - feasibility: "Viabilidade de ação (1-5)"
    - dependencies: "Quantas outras causas dependem desta (0-N)"
    - confidence: "Confiança na verificação (High=3, Medium=2, Low=1)"

  formula: "(impact * 0.30) + (urgency * 0.25) + (feasibility * 0.25) + (dependencies * 0.10) + (confidence * 0.10)"

  output:
    - rank: 1
      root_cause: "RC-X"
      score: N.N
      classification: "Address First | Address Second | Monitor | Accept"
```

### Step 2: Generate "How Might We" (HMW) Statements

Para cada causa-raiz priorizada, gerar HMW statements:

```yaml
hmw_generation:
  rules:
    - "Nem tão amplo que vira abstrato ('Como podemos melhorar tudo?')"
    - "Nem tão estreito que já implica solução ('Como podemos comprar o software X?')"
    - "Foco no espaço de oportunidade, não no problema"
    - "Mínimo 2 HMWs por causa-raiz, máximo 4"

  template: "Como poderíamos {verbo de ação} de forma que {resultado desejado} sem {restrição importante}?"

  examples:
    root_cause: "Equipe não tem visibilidade do pipeline"
    hmw_too_broad: "Como podemos melhorar a gestão?"
    hmw_too_narrow: "Como podemos implementar o Jira?"
    hmw_right: "Como poderíamos dar visibilidade do pipeline à equipe de forma que decisões sejam baseadas em dados sem aumentar overhead de reporting?"
```

### Step 3: Define Success Criteria

Para cada causa-raiz priorizada:

```yaml
success_criteria:
  root_cause: "RC-X"
  criteria:
    - criterion: "O que precisa ser verdade para considerarmos a causa tratada"
      measurable_as: "Métrica específica (da evidence-quantification.md)"
      target: "Valor alvo"
      current: "Valor atual estimado"
      timeframe: "Em quanto tempo esperar resultado"
    - criterion: "Segundo critério"
      measurable_as: "..."
```

### Step 4: Create Challenge Map

Mapa hierárquico de desafios (Basadur Challenge Mapping):

```yaml
challenge_map:
  level_0_vision:
    statement: "Visão de sucesso — como seria se o problema não existisse"

  level_1_strategic_challenges:
    - challenge: "Desafio estratégico derivado das causas-raiz"
      root_causes_addressed: ["RC-1", "RC-2"]

  level_2_tactical_challenges:
    - challenge: "Desafio tático — mais específico"
      parent: "level_1 challenge"
      actionable: true/false

  level_3_action_items:
    - action: "Ação concreta executável"
      parent: "level_2 challenge"
      owner: "Quem deveria executar"
      effort: "Low | Medium | High"
      timeline: "Imediato | 30 dias | 90 dias"
      validation_rule: "Cada action item deve ter: verbo de ação + objeto específico + responsável sugerido + timeline. Se não tem esses 4 elementos, não é ação concreta."
```

### Step 5: Define Handoff Specification

Especificar o que o próximo executor (pessoa ou squad) precisa para agir:

```yaml
handoff_spec:
  context_package:
    - "Resumo executivo (1 parágrafo)"
    - "Top 3 causas-raiz com evidência"
    - "POV statement (de reframing-analysis.md)"
    - "HMW statements priorizados"
    - "Success criteria com métricas"
  prerequisites:
    - "O que precisa estar em lugar antes de começar"
  recommended_approach:
    - "Se Simple/Clear: Implementar diretamente"
    - "Se Complicated: Planejar com especialista"
    - "Se Complex: Probe → Sense → Respond (experimentos)"
  risks:
    - "Riscos de implementação identificados no stress test"
  not_included:
    - "O que este diagnóstico NÃO cobriu (escopo fora)"
  recommended_next_squads:
    description: "Squads recomendados para dar continuidade ao diagnóstico, baseado na natureza das causas-raiz e no tipo de ação necessária"
    selection_rules:
      - condition: "Causa-raiz envolve modelo de negócio, posicionamento ou estratégia de mercado"
        squad: "business-architect"
        reason: "Redesenhar modelo, posicionamento ou oferta"
      - condition: "Causa-raiz envolve automação, processos repetitivos ou ineficiência operacional"
        squad: "ai-strategy"
        reason: "Diagnosticar oportunidades de automação e agentes IA"
      - condition: "Causa-raiz envolve pessoas, cultura, perfil de time ou liderança"
        squad: "human-mapping"
        reason: "Mapear perfis, dinâmicas de time e gaps comportamentais"
      - condition: "Causa-raiz envolve processo, fluxo de trabalho ou gargalos operacionais"
        squad: "process-mapping"
        reason: "Mapear processos AS-IS, identificar gargalos, redesenhar TO-BE"
      - condition: "Causa-raiz envolve comunicação, narrativa ou construção de comunidade"
        squad: "community-builder"
        reason: "Arquitetar comunidade, rituais e engajamento"
      - condition: "Causa-raiz envolve diferenciação de mercado ou oportunidade não explorada"
        squad: "blue-ocean-hunter"
        reason: "Buscar espaços de mercado inexplorados"
      - condition: "Causa-raiz envolve oferta de curso, treinamento ou capacitação"
        squad: "course-architect"
        reason: "Arquitetar experiência de aprendizagem"
      - condition: "Diagnóstico precisa de aprofundamento em framework específico"
        squad: "framework-factory"
        reason: "Construir ou adaptar framework sob medida"
    output_format:
      - squad: "nome-do-squad"
        priority: "Primary | Secondary | Optional"
        reason: "Justificativa em 1 frase vinculada à causa-raiz"
        root_causes_addressed: ["RC-1", "RC-N"]
```

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/action-package.md`

```yaml
output:
  action_package:
    prioritized_root_causes:
      - rank: 1
        root_cause: "Descrição"
        score: N.N
        classification: "Address First"
        hmw_statements: []
        success_criteria: []
    challenge_map:
      vision: "..."
      strategic_challenges: []
      tactical_challenges: []
      action_items: []
    handoff_spec:
      context_package: "..."
      prerequisites: []
      recommended_approach: "..."
      risks: []
      not_included: []
      recommended_next_squads:
        - squad: "nome-do-squad"
          priority: "Primary | Secondary | Optional"
          reason: "Justificativa vinculada à causa-raiz"
          root_causes_addressed: ["RC-1"]
    execution_recommendation:
      immediate: "O que fazer esta semana"
      short_term: "O que fazer em 30 dias"
      medium_term: "O que fazer em 90 dias"
    total_root_causes: N
    total_hmw_statements: N
    total_action_items: N
```

---

## Acceptance Criteria

- [ ] Causas-raiz priorizadas com scoring transparente
- [ ] Pelo menos 2 HMW statements por causa-raiz prioritária
- [ ] Success criteria mensuráveis para cada causa-raiz "Address First"
- [ ] Challenge map com 3 níveis (visão → estratégico → tático)
- [ ] Handoff spec completo para o próximo executor
- [ ] Recommended next squads com pelo menos 1 squad primary vinculado a causa-raiz
- [ ] Recomendações de execução com timeline (imediato / 30d / 90d)

---

## Veto Conditions

```yaml
veto:
  condition: "Causas-raiz não podem ser traduzidas em statements acionáveis"
  action: "WARN — Documentar como 'Actionability gap'"
  recovery: "Retornar as causas não-acionáveis para root-cause-analysis com pedido de decomposição"
  message: "Algumas causas-raiz são verdadeiras mas não-acionáveis no contexto atual. Documentando como restrição."
```

---

## Handoff

```yaml
handoff:
  next_task: generate-report.md
  executor: root-diagnosis-chief
  passes:
    - Todos os outputs anteriores
    - action-package.md
  condition: "action-package.md gerado com pelo menos 1 causa priorizada e 1 HMW"
```

---

## Error Handling

```yaml
errors:
  phase_timeout:
    threshold: "20 min (individual phase)"
    action: "WARN ao usuario — oferecer simplificar escopo ou skip se fase opcional"
    recovery: "Salvar output parcial e documentar o que foi completado"

  contradictory_inputs:
    condition: "Output de fase anterior contradiz dados novos desta fase (ex: stress test amendments alteram causas-raiz que já foram priorizadas)"
    action: "Documentar contradição — não ignorar silenciosamente"
    recovery: "Flaggar como 'data_conflict' no output e recomendar revisão na Phase 8 (stress test)"

  insufficient_data:
    condition: "Dados insuficientes para completar análise com confiança (ex: causas-raiz sem evidência quantificada para priorizar)"
    action: "WARN — documentar o que falta e qual impacto na confiança"
    recovery: "Prosseguir com confidence=Low e flag para Phase 7 (quantificação)"

  agent_degradation:
    condition: "Agente não consegue aplicar framework adequadamente"
    action: "Fallback para root-diagnosis-chief com método simplificado"
    degradation: "Documentar como limitation no relatório final"
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-21 | Initial release — Prioritization matrix, HMW generation, challenge map, handoff spec |
| 1.1.0 | 2026-02-22 | Add Error Handling section. Add validation rule for challenge map level 3 action items (verbo + objeto + responsavel + timeline) |
| 1.2.0 | 2026-03-02 | Add recommended_next_squads ao handoff_spec — conector inter-squads com selection rules por tipo de causa-raiz. Add POV statement ao context_package |
