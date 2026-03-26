# full-diagnosis.md — Orquestração do Pipeline Diagnóstico Completo (13 Fases)

## Purpose

Orquestrar o pipeline diagnóstico completo de 13 fases (Phases 0-10 + 1.5 + 3.5). Esta task guia o
root-diagnosis-chief pela execução sequencial de todos os agentes especialistas, gerenciando
transições entre fases, decision points adaptativos e quality gates. Cada fase produz um
artefato que alimenta as fases seguintes, criando uma cadeia causal verificável do intake
até o relatório final. Inclui Viability Assessment (Phase 1.5, opcional) e System Dynamics
Diagnostic (Phase 3.5, obrigatória).

**Agente responsável:** root-diagnosis-chief
**Trigger:** `*diagnose`
**Duração estimada:** 60-120 min (standard) | 240+ min (deep)

---

## Task Metadata

```yaml
task_id: root-diagnosis/full-diagnosis
task_name: Full Diagnostic Pipeline Orchestration
squad: root-diagnosis
type: orchestration
status: pending
responsible_executor: root-diagnosis-chief
execution_type: Orchestrator
version: "1.2.0"
estimated_duration: "60-120 min (standard) | 240+ min (deep)"
execution_mode: orchestrated
```

---

## Inputs

```yaml
required:
  problem_description:
    field: "Descrição do problema fornecida pelo usuário"
    format: text
    required: true
    source: user_input

optional:
  existing_documentation:
    field: "Documentação, relatórios ou dados prévios sobre o problema"
    format: files
    required: false
  previous_diagnoses:
    field: "Diagnósticos anteriores ou tentativas de resolução documentadas"
    format: files
    required: false
```

---

## Preconditions

- [ ] Squad root-diagnosis ativo e configurado
- [ ] root-diagnosis-chief carregado como orquestrador
- [ ] Usuário disponível para sessão de intake (15-30 min mínimo)

---

## Timing Breakdown por Fase

```yaml
timing:
  phase_0_intake: "5-10 min"
  phase_1_classify: "10-15 min"
  phase_1_5_viability: "10-20 min (opcional — org/business)"
  phase_2_culture: "15-25 min"
  phase_3_assumptions: "10-20 min"
  phase_3_5_system_dynamics: "15-25 min"
  phase_4_reframing: "10-15 min"
  phase_5_deep_diagnosis: "15-25 min"
  phase_6_rca: "15-25 min"
  phase_7_quantify: "10-15 min"
  phase_8_stress_test: "10-20 min"
  phase_9_package: "10-15 min"
  phase_10_report: "10-20 min"
  total_standard: "60-120 min (sem loops)"
  total_deep: "240+ min (com iteracoes e profundidade maxima)"
  overhead_decision_points: "5-10 min (DP1 + DP2 routing)"
  note: "Tempos sao estimativas. Se uma fase exceder 30 min, WARN ao usuario."
```

---

## Action Items

### Phase 0: Intake & Triage

```yaml
phase: 0
name: "Intake & Triage"
load: tasks/intake-triage.md
agent: root-diagnosis-chief
description: "Coletar contexto, escopo e restrições do problema"
actions:
  - Executar 8 elicitation points com o usuário (E1-E8 conforme intake-triage.md)
  - Classificar urgência (Critical/High/Medium/Low)
  - Determinar profundidade desejada (Quick/Full/Deep)
  - Definir escopo de fases a executar
output: "data/{problem-slug}/intake-brief.md"
quality_gate: QG-RD-INTAKE
gate_criteria:
  - "Problem statement específico (não vago)"
  - "Stakeholders identificados"
  - "Profundidade escolhida"
  - "intake-brief.md gerado com todos os campos"
```

### Phase 1: Domain Classification

```yaml
phase: 1
name: "Domain Classification"
load: tasks/classify-domain.md
agent: dave-snowden
input: intake-brief.md
description: "Classificar o tipo do problema usando Cynefin Framework"
actions:
  - Analisar características do problema
  - Aplicar Cynefin sense-making
  - Classificar domínio (Clear/Complicated/Complex/Chaotic/Disorder)
  - Documentar sinais de cada domínio detectados
output: "data/{problem-slug}/domain-classification.md"
quality_gate: QG-RD-CLASSIFY
gate_criteria:
  - "Domínio Cynefin definido com justificativa"
  - "Sinais conflitantes documentados (se houver)"
  - "Implicações para fases seguintes mapeadas"
```

### Phase 1.5: Viability Assessment (OPCIONAL)

```yaml
phase: 1.5
name: "Viability Assessment"
load: tasks/assess-viability.md
agent: stafford-beer
input: intake-brief.md + domain-classification.md
description: "Diagnosticar viabilidade organizacional via VSM (S1-S5)"
optional: true
skip_condition: "Problema puramente técnico, individual ou sem componente organizacional"
actions:
  - Identificar sistema em foco e fronteiras
  - Mapear S1-S5 (Operations, Coordination, Optimization, Intelligence, Policy)
  - Avaliar viabilidade de cada sistema
  - Verificar equilíbrio de variedade (Lei de Ashby)
  - Check recursivo (viabilidade em sub-níveis)
output: "data/{problem-slug}/viability-assessment.md"
quality_gate: QG-RD-VIABILITY
gate_blocking: false
gate_criteria:
  - "5 sistemas VSM mapeados com assessment"
  - "Variedade avaliada"
  - "Recursion check executado"
```

### Phase 2: Cultural & Political Diagnosis

```yaml
phase: 2
name: "Cultural & Political Diagnosis"
load: tasks/diagnose-culture.md
agent: edgar-schein
input: intake-brief.md + domain-classification.md
description: "Extrair dinâmicas culturais e políticas — o que NÃO está sendo dito"
actions:
  - Aplicar Humble Inquiry para explorar dinâmicas ocultas
  - Analisar 3 Levels of Culture (artefatos, valores, pressupostos)
  - Identificar Clinical Inquiry points (reações emocionais, resistências)
  - Mapear dinâmicas de poder e influência relevantes
output: "data/{problem-slug}/cultural-diagnosis.md"
quality_gate: QG-RD-CULTURE
gate_blocking: false
gate_criteria:
  - "3 níveis de cultura analisados"
  - "Dinâmicas políticas documentadas (ou ausência justificada)"
  - "Temas não-ditos identificados"
```

### Phase 3: Assumption Audit

```yaml
phase: 3
name: "Assumption Audit"
load: tasks/audit-assumptions.md
agent: chris-argyris
input: intake-brief.md + domain-classification.md + cultural-diagnosis.md
description: "Auditar pressupostos e saltos lógicos do diagnosticador e stakeholders"
actions:
  - Aplicar Ladder of Inference em afirmações-chave
  - Identificar saltos lógicos (dados → conclusão)
  - Detectar reasoning defensivo e single-loop thinking
  - Listar pressupostos não-testados com risco de cada um
output: "data/{problem-slug}/assumption-audit.md"
quality_gate: QG-RD-ASSUMPTIONS
gate_criteria:
  - "Pelo menos 3 pressupostos identificados e auditados"
  - "Saltos lógicos documentados com evidência faltante"
  - "Pressupostos classificados por risco (High/Medium/Low)"
```

### Phase 3.5: System Dynamics Diagnostic

```yaml
phase: 3.5
name: "System Dynamics Diagnostic"
load: tasks/model-system-dynamics.md
agent: peter-senge
input: intake-brief.md + domain-classification.md + assumption-audit.md + viability-assessment.md (se disponível)
description: "Mapear dinâmicas sistêmicas — feedback loops, archetypes, leverage points"
actions:
  - Iceberg Model (Events → Patterns → Structures → Mental Models)
  - Causal Loop Diagram (loops R + B + delays)
  - System Archetype Detection (9 archetypes)
  - Delay Mapping
  - Meadows 12 Leverage Points (hierarquia de intervenção)
  - Behavior Over Time graphs
output: "data/{problem-slug}/system-dynamics-analysis.md"
quality_gate: QG-RD-SYSTEMS
gate_criteria:
  - "Iceberg Model 4 níveis documentados"
  - "≥1 feedback loop identificado (R ou B)"
  - "≥1 archetype testado"
  - "Leverage points classificados (Meadows)"
```

### Phase 4: Problem Reframing

```yaml
phase: 4
name: "Problem Reframing"
load: tasks/reframe-problem.md
agent: thomas-wedell-wedellsborg
input: intake-brief.md + domain-classification.md + assumption-audit.md + system-dynamics-analysis.md
description: "Desafiar o enquadramento do problema — é esse o problema certo?"
actions:
  - Gerar 3-5 frames alternativos para o problema
  - Avaliar cada frame contra evidências disponíveis
  - Recomendar frame mais produtivo com justificativa
  - Documentar frames rejeitados e motivos
output: "data/{problem-slug}/reframing-analysis.md"
quality_gate: QG-RD-REFRAME
gate_criteria:
  - "Pelo menos 3 frames alternativos gerados"
  - "Frame recomendado com justificativa baseada em evidência"
  - "Frames rejeitados documentados"
```

### DECISION POINT 1 (Phase 5)

```yaml
decision_point:
  id: DP1
  name: "Deep Diagnosis Method Selection"
  input: domain-classification.md (Cynefin result)
  logic:
    if_complicated: "Route to eli-goldratt (CRT/TOC) — problema tem cadeia causal linear"
    if_complex: "Route to peter-checkland (SSM) — problema tem múltiplas perspectivas"
    if_both_or_unclear: "Sequential — Goldratt primeiro (CRT), depois Checkland (SSM)"
    if_clear: "Simplified RCA — pular direto para Phase 6"
    if_chaotic: "Stabilize first — probe actions antes de diagnóstico completo"
  rationale_required: true
  document_in: "data/{problem-slug}/decision-log.md"
```

### Phase 5: Deep Diagnosis

```yaml
phase: 5
name: "Deep Diagnosis"
load: tasks/deep-diagnosis.md
agent: "eli-goldratt OR peter-checkland (conforme DP1)"
input: intake-brief.md + domain-classification.md + assumption-audit.md + reframing-analysis.md
description: "Diagnóstico profundo usando método adaptado ao domínio"
actions:
  if_goldratt:
    - Construir Current Reality Tree (CRT)
    - Identificar Undesirable Effects (UDEs)
    - Mapear cadeia causal até core constraint
    - Verificar suficiência lógica de cada conexão
  if_checkland:
    - Construir Rich Pictures do sistema
    - Definir CATWOE para cada perspectiva relevante
    - Construir modelos conceituais (root definitions)
    - Comparar modelos com realidade observada
output: "data/{problem-slug}/deep-diagnosis.md"
quality_gate: QG-RD-DEEP
gate_criteria:
  - "Método selecionado documentado com justificativa (DP1)"
  - "Artefato principal do método gerado (CRT ou Rich Pictures + CATWOE)"
  - "Conexões causais verificadas ou perspectivas mapeadas"
```

### DECISION POINT 2 (Phase 6)

```yaml
decision_point:
  id: DP2
  name: "RCA Method Selection"
  input: deep-diagnosis.md + domain-classification.md
  logic:
    if_isolable: "Route to kepner-tregoe (IS/IS NOT) — causa isolável por eliminação"
    if_chain: "Route to dean-gano (Apollo RCA) — cadeia causal com múltiplos contribuintes"
    if_both_or_unclear: "Sequential — KT primeiro (isolar), depois Gano (cadeia)"
  rationale_required: true
  document_in: "data/{problem-slug}/decision-log.md"
```

### Phase 6: Root Cause Analysis

```yaml
phase: 6
name: "Root Cause Analysis"
load: tasks/root-cause-analysis.md
agent: "kepner-tregoe OR dean-gano (conforme DP2)"
input: deep-diagnosis.md + todos os outputs anteriores
description: "Análise de causa-raiz detalhada e verificável"
actions:
  if_kepner_tregoe:
    - Aplicar IS/IS NOT analysis
    - Gerar distinções e mudanças
    - Testar causas potenciais contra evidências
    - Verificar causa mais provável
  if_dean_gano:
    - Construir Apollo RCA causal graph
    - Identificar causas primárias, contribuintes e condicionais
    - Verificar cada conexão causal com evidência
    - Determinar causas acionáveis vs. não-acionáveis
output: "data/{problem-slug}/root-cause-analysis.md"
quality_gate: QG-RD-RCA
gate_criteria:
  - "Causas-raiz identificadas com evidência verificável"
  - "Método selecionado documentado com justificativa (DP2)"
  - "Distinção clara entre sintomas e causas-raiz"
  - "Cada causa-raiz com nível de confiança"
```

### Phase 7: Evidence Quantification

```yaml
phase: 7
name: "Evidence Quantification"
load: tasks/quantify-evidence.md
agent: douglas-hubbard
input: root-cause-analysis.md + todos os outputs anteriores
description: "Quantificar evidências e criar measurement chains"
actions:
  - Definir measurement chains para cada causa-raiz
  - Calcular intervalos de confiança calibrados
  - Identificar Value of Information (VoI) para cada incerteza
  - Priorizar medições por Expected Value of Perfect Information (EVPI)
  - Aplicar decomposição de Fermi onde dados diretos não existem
output: "data/{problem-slug}/evidence-quantification.md"
quality_gate: QG-RD-QUANTIFY
gate_criteria:
  - "Cada causa-raiz com intervalo de confiança documentado"
  - "Measurement chains definidas para métricas-chave"
  - "VoI calculado para incertezas críticas"
```

### Phase 8: Stress Test

```yaml
phase: 8
name: "Stress Test"
load: tasks/stress-test.md
agent: gary-klein
input: root-cause-analysis.md + evidence-quantification.md
description: "PreMortem — 'E se nosso diagnóstico estiver errado?'"
actions:
  - Executar PreMortem completo (imaginando diagnóstico falhando)
  - Aplicar Data/Frame analysis (que dados contradizem nosso frame?)
  - Calcular Diagnostic Confidence Score agregado (ver formula abaixo)
  - Listar caveats e amendments ao diagnóstico
confidence_score_calculation: |
  O Diagnostic Confidence Score e calculado pelo gary-klein DENTRO desta fase:
  Score = (fases_completadas/11 * 30%) + (evidencias_verificadas/total_causas * 25%)
        + (convergencia_entre_agentes * 25%) + (premortem_robustez * 20%)
  Onde:
  - fases_completadas: quantas das 11 fases foram executadas
  - evidencias_verificadas: causas-raiz com evidencia factual vs total
  - convergencia_entre_agentes: quantos agentes apontam mesma direcao (0-10)
  - premortem_robustez: (1 - probabilidade_max_failure_mode) * 10
  O score e calculado APOS o PreMortem, usando dados de TODAS as fases anteriores.
  NAO depende de si mesmo — usa inputs das Phases 0-7 acumulados.
output: "data/{problem-slug}/stress-test-report.md"
quality_gate: QG-RD-STRESS
gate_criteria:
  - "PreMortem executado com pelo menos 3 cenários de falha"
  - "Confidence Score calculado usando fórmula documentada"
  - "Caveats e amendments listados"
loop_condition:
  trigger: "Confidence Score < 50% (calculado nesta fase usando dados das Phases 0-7)"
  action: "LOOP back to Phase 5 or Phase 6 para refinar diagnóstico"
  max_loops: 2
  escalation: "Se confidence < 50% após 2 loops, documentar e prosseguir com flag low_confidence"
```

### Phase 9: Package for Action

```yaml
phase: 9
name: "Package for Action"
load: tasks/package-for-action.md
agent: min-basadur
input: root-cause-analysis.md + stress-test-report.md + evidence-quantification.md + reframing-analysis.md
description: "Empacotar diagnóstico para ação — ponte entre diagnóstico e execução"
actions:
  - Priorizar causas-raiz usando scoring matrix (impact * urgency * feasibility)
  - Gerar HMW statements (2-4 por causa-raiz)
  - Definir success criteria mensuráveis
  - Criar Challenge Map hierárquico (3 níveis)
  - Especificar handoff package para executor
output: "data/{problem-slug}/action-package.md"
quality_gate: QG-RD-PACKAGE
gate_criteria:
  - "Causas priorizadas com scoring transparente"
  - "HMW statements gerados (min 2 por causa)"
  - "Challenge map com 3 níveis"
  - "Recomendações de execução com timeline"
```

### Phase 10: Diagnostic Report

```yaml
phase: 10
name: "Diagnostic Report"
load: tasks/generate-report.md
template: templates/diagnostic-report-tmpl.md
agent: root-diagnosis-chief
input: "TODOS os outputs das fases 0-9"
description: "Compilar relatório diagnóstico completo e consolidado"
actions:
  - Carregar template diagnóstico
  - Compilar todos os outputs em relatório coeso
  - Garantir rastreabilidade (cada conclusão aponta para fase que a gerou)
  - Incluir executive summary com top 3 findings
  - Adicionar seção de riscos, caveats e limitações
  - Gerar recomendações de próximos passos
output: "data/{problem-slug}/DIAGNOSTIC-REPORT-{slug}.md"
quality_gate: QG-RD-REPORT
gate_criteria:
  - "Relatório segue template padrão"
  - "Executive summary com top 3 findings"
  - "Cada conclusão rastreável à fase de origem"
  - "Caveats e limitações documentados"
  - "Próximos passos acionáveis"
```

---

## Output

**Arquivo principal:** `squads/root-diagnosis/data/{problem-slug}/DIAGNOSTIC-REPORT-{slug}.md`

```yaml
output:
  diagnostic_report:
    executive_summary: "Resumo executivo com top 3 findings"
    problem_classification:
      cynefin_domain: "Clear | Complicated | Complex | Chaotic"
      frame_selected: "Frame recomendado após reframing"
    root_causes:
      - id: "RC-1"
        description: "Descrição da causa-raiz"
        evidence: "Evidência verificável"
        confidence: "High | Medium | Low (com intervalo)"
        classification: "Address First | Address Second | Monitor | Accept"
    action_package:
      hmw_statements: []
      challenge_map: {}
      timeline: "Imediato | 30d | 90d"
    caveats_and_limitations: []
    recommended_next_steps: []
  supporting_artifacts:
    - intake-brief.md
    - domain-classification.md
    - viability-assessment.md
    - cultural-diagnosis.md
    - assumption-audit.md
    - system-dynamics-analysis.md
    - reframing-analysis.md
    - deep-diagnosis.md
    - root-cause-analysis.md
    - evidence-quantification.md
    - stress-test-report.md
    - action-package.md
    - decision-log.md
```

---

## Acceptance Criteria

- [ ] Todas as 13 fases executadas (ou skip documentado com justificativa para opcionais)
- [ ] Ambos os decision points (DP1 e DP2) resolvidos com rationale documentado
- [ ] Todos os quality gates passaram (ou override documentado)
- [ ] Relatório diagnóstico gerado usando template padrão
- [ ] Confidence level >= 50% (ou razão documentada para menor)
- [ ] Rastreabilidade: cada conclusão aponta para fase de origem
- [ ] Decision log completo com justificativas de DP1 e DP2

---

## Veto Conditions

```yaml
veto:
  conditions:
    - id: VETO-INTAKE
      condition: "Intake incompleto — Phase 0 falhou ou foi pulada"
      action: "HALT — Não é possível diagnosticar sem intake"
      recovery: "Retornar à Phase 0 e completar intake"

    - id: VETO-CYNEFIN
      condition: "Sem classificação Cynefin — Phase 1 pulada sem justificativa"
      action: "HALT — Decision points dependem da classificação"
      recovery: "Executar Phase 1 antes de prosseguir"

    - id: VETO-EVIDENCE
      condition: "Root cause analysis sem evidência verificável"
      action: "HALT — Diagnóstico sem evidência é opinião"
      recovery: "Retornar à Phase 6 e documentar evidências"

    - id: VETO-CONFIDENCE
      condition: "Confidence < 30% sem recovery plan documentado"
      action: "HALT — Diagnóstico com confiança muito baixa requer ação"
      recovery: "Loop back para Phase 5/6 ou documentar limitações explicitamente"
```

---

## Handoff

```yaml
handoff:
  deliverable: "DIAGNOSTIC-REPORT-{slug}.md"
  consumer: "Usuário / stakeholder definido na Phase 0"
  includes:
    - "Relatório diagnóstico completo (DIAGNOSTIC-REPORT-{slug}.md)"
    - "Action package com HMW statements e challenge map"
    - "Risk assessment e caveats"
    - "Próximos passos recomendados"
    - "Decision log com justificativas de DP1 e DP2"
    - "Todos os artefatos intermediários (13 arquivos)"
  condition: "DIAGNOSTIC-REPORT-{slug}.md gerado com pelo menos 1 causa-raiz verificada"
```

---

## Error Handling

```yaml
errors:
  phase_timeout:
    threshold: "30 min por fase"
    action: "WARN ao usuário, oferecer skip com documentação"
    recovery: "Fase pode ser pulada se não for obrigatória (ver config.yaml required_phases)"

  agent_unavailable:
    action: "Fallback para root-diagnosis-chief executando a task diretamente"
    degradation: "Qualidade pode ser menor — documentar como limitation"

  quality_gate_failure:
    action: "Retry fase com feedback específico do gate"
    max_retries: 2
    escalation: "Se falhar após 2 retries, documentar gap e prosseguir com flag"

  decision_point_ambiguous:
    action: "Usar modo sequential (ambos os agentes) quando domínio é ambíguo"
    note: "Aumenta duração mas reduz risco de diagnóstico incompleto"

  user_abandons_mid_process:
    action: "Salvar estado atual em data/{slug}/checkpoint-phase-{N}.md"
    recovery: "Retomar do último checkpoint completo"

  loop_infinite:
    condition: "Phase 8 confidence < 50% após 2 loops"
    action: "Documentar baixa confiança e prosseguir com caveats explícitos"
    message: "Diagnóstico com confiança abaixo de 50% após 2 iterações. Prosseguindo com caveats documentados."
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-22 | Initial release — 11-phase orchestration with 2 decision points, quality gates, and error handling |
| 1.1.0 | 2026-02-22 | Fix elicitation count 6→8, add timing breakdown per phase, define confidence score formula (resolve circular dependency) |
| 1.2.0 | 2026-03-01 | Upgrade 11→13 fases — add Phase 1.5 (Beer/VSM, opcional), Phase 3.5 (Senge/System Dynamics, obrigatória), Meadows Purpose Test na Phase 4, system-dynamics-analysis.md como input |
