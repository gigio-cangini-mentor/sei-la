# quick-diagnosis.md — Orquestração do Pipeline Diagnóstico Rápido (8 Fases)

## Purpose

Orquestrar o pipeline diagnóstico abreviado de 8 fases (Phases 0, 1, 3, 3.5, 4, 5, 6, 10).
Pula as fases de viabilidade (Phase 1.5), diagnóstico cultural (Phase 2), quantificação de
evidências (Phase 7), stress test (Phase 8) e empacotamento para ação (Phase 9). Inclui
System Dynamics (Phase 3.5) por ser essencial para capturar feedback loops. Indicado para
problemas relativamente isolados, com urgência alta ou como diagnóstico preliminar antes de
investir no completo. Tradeoff explícito: velocidade por profundidade.

**Agente responsável:** root-diagnosis-chief
**Trigger:** `*quick-diagnosis`
**Duração estimada:** 30-45 min

---

## Task Metadata

```yaml
task_id: root-diagnosis/quick-diagnosis
task_name: Quick Diagnostic Pipeline Orchestration
squad: root-diagnosis
type: orchestration
status: pending
responsible_executor: root-diagnosis-chief
execution_type: Orchestrator
version: "1.2.0"
estimated_duration: "35-50 min"
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
```

---

## Preconditions

- [ ] Squad root-diagnosis ativo e configurado
- [ ] root-diagnosis-chief carregado como orquestrador
- [ ] Usuário disponível para sessão de intake (10-15 min mínimo)

---

## Timing Breakdown por Fase

```yaml
timing:
  phase_0_intake: "5-8 min"
  phase_1_classify: "5-10 min"
  phase_3_assumptions: "5-10 min"
  phase_3_5_system_dynamics: "10-15 min"
  phase_4_reframing: "5-10 min"
  phase_5_deep_diagnosis: "10-15 min"
  phase_6_rca: "10-15 min"
  phase_10_report: "5-10 min"
  total: "35-50 min (sem loops)"
  overhead_decision_points: "3-5 min (DP1 + DP2 routing)"
  note: "Quick mode prioriza velocidade. Se uma fase exceder 15 min, WARN e oferecer simplificar."
```

---

## Skipped Phases (com justificativa)

```yaml
skipped_phases:
  - phase: 1.5
    name: "Viability Assessment"
    agent: stafford-beer
    reason: "Diagnóstico de viabilidade organizacional requer tempo e é OPCIONAL mesmo no modo Full. Quick mode foca no diagnóstico causal direto."
    impact: "Disfunções estruturais organizacionais (VSM S1-S5) podem não ser detectadas"

  - phase: 2
    name: "Cultural & Political Diagnosis"
    agent: edgar-schein
    reason: "Dinâmicas culturais/políticas requerem tempo e profundidade. Em modo rápido, assumimos que o problema é predominantemente técnico/estrutural."
    impact: "Causas-raiz políticas ou culturais podem passar despercebidas"

  - phase: 7
    name: "Evidence Quantification"
    agent: douglas-hubbard
    reason: "Quantificação rigorosa requer acesso a dados e tempo para calibração. Quick diagnosis opera com estimativas qualitativas."
    impact: "Intervalos de confiança não calibrados — confiança baseada em julgamento, não em dados"

  - phase: 8
    name: "Stress Test"
    agent: gary-klein
    reason: "PreMortem e Data/Frame analysis adicionam rigor mas não são essenciais para diagnóstico preliminar."
    impact: "Diagnóstico não testado contra cenários de falha — risco de viés de confirmação"

  - phase: 9
    name: "Package for Action"
    agent: min-basadur
    reason: "Quick diagnosis produz relatório com causas-raiz, não pacote completo para ação. Empacotamento pode ser feito separadamente se necessário."
    impact: "Output não inclui HMW statements, challenge map ou timeline de execução"
```

---

## Tradeoffs Explícitos

```yaml
tradeoffs:
  confidence:
    full_mode: "70-90%"
    quick_mode: "50-70%"
    reason: "Sem quantificação de evidências e sem stress test"

  coverage:
    full_mode: "Técnico + Cultural + Político + Cognitivo"
    quick_mode: "Técnico + Cognitivo"
    reason: "Sem diagnóstico cultural/político (Phase 2)"

  actionability:
    full_mode: "Relatório + Action Package (HMW, Challenge Map, Timeline)"
    quick_mode: "Relatório com causas-raiz e recomendações básicas"
    reason: "Sem Phase 9 (Package for Action)"

  validation:
    full_mode: "Diagnóstico stress-tested com PreMortem"
    quick_mode: "Diagnóstico não stress-tested"
    reason: "Sem Phase 8 (Stress Test)"
```

---

## When To Use

```yaml
recommended_when:
  - "Problema relativamente isolado (não sistêmico)"
  - "Urgência alta, tempo limitado"
  - "Diagnóstico preliminar antes de investir no completo"
  - "Problema técnico com causa provavelmente rastreável"
  - "Contexto bem conhecido, poucas incógnitas"

not_recommended_when:
  - "Problema envolve dinâmicas políticas ou culturais fortes"
  - "Múltiplos stakeholders com perspectivas conflitantes"
  - "Problema crônico que resiste a tentativas anteriores"
  - "Decisão de alto impacto depende do diagnóstico"
  - "Cliente quer confiança máxima antes de agir"

upgrade_path:
  trigger: "Quick diagnosis revela complexidade maior que esperada"
  action: "Executar fases faltantes (2, 7, 8, 9) como add-on"
  reuse: "Outputs das fases já executadas são reutilizados integralmente"
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
  - Confirmar modo Quick com o usuário
  - Definir escopo das 7 fases
output: "data/{problem-slug}/intake-brief.md"
quality_gate: QG-RD-INTAKE
gate_criteria:
  - "Problem statement específico (não vago)"
  - "Stakeholders identificados"
  - "Modo Quick confirmado pelo usuário"
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
  - FLAG: Se domínio = Complex ou Chaotic, recomendar upgrade para Full
output: "data/{problem-slug}/domain-classification.md"
quality_gate: QG-RD-CLASSIFY
gate_criteria:
  - "Domínio Cynefin definido com justificativa"
  - "Sinais conflitantes documentados (se houver)"
  - "Recomendação de upgrade documentada (se aplicável)"
```

### Phase 3: Assumption Audit

```yaml
phase: 3
name: "Assumption Audit"
load: tasks/audit-assumptions.md
agent: chris-argyris
input: intake-brief.md + domain-classification.md
description: "Auditar pressupostos e saltos lógicos do diagnosticador e stakeholders"
note: "Phase 2 (Cultural/Political) pulada — inputs limitados a intake + classification"
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
input: intake-brief.md + domain-classification.md + assumption-audit.md
description: "Mapear dinâmicas sistêmicas — feedback loops, archetypes, leverage points"
note: "Incluída no quick mode por ser essencial para capturar feedback loops — operação simplificada"
actions:
  - Iceberg Model (4 níveis)
  - Causal Loop Diagram (loops R + B + delays)
  - Archetype Detection (foco nos 3 mais comuns: Fixes that Fail, Shifting the Burden, Limits to Growth)
  - Meadows Leverage Points (classificação rápida)
output: "data/{problem-slug}/system-dynamics-analysis.md"
quality_gate: QG-RD-SYSTEMS
gate_criteria:
  - "Iceberg Model 4 níveis documentados"
  - "≥1 feedback loop identificado"
  - "Leverage points classificados"
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
  - "Cada causa-raiz com nível de confiança (qualitativo em quick mode)"
note: "Em quick mode, confiança é qualitativa (High/Medium/Low) — sem quantificação AIE"
```

### Phase 10: Diagnostic Report (Simplified)

```yaml
phase: 10
name: "Diagnostic Report (Quick)"
load: tasks/generate-report.md
template: templates/diagnostic-report-tmpl.md
agent: root-diagnosis-chief
input: "Todos os outputs das fases 0, 1, 3, 4, 5, 6"
description: "Compilar relatório diagnóstico simplificado"
actions:
  - Carregar template diagnóstico
  - Compilar outputs disponíveis em relatório coeso
  - Documentar fases puladas e impacto na confiança
  - Incluir executive summary com top 3 findings
  - Adicionar seção de limitações do quick mode
  - Gerar recomendações: resolver OU fazer diagnóstico completo
output: "data/{problem-slug}/DIAGNOSTIC-REPORT-{slug}.md"
quality_gate: QG-RD-REPORT
gate_criteria:
  - "Relatório segue template padrão"
  - "Executive summary com top 3 findings"
  - "Fases puladas documentadas com impacto"
  - "Limitações do quick mode explícitas"
  - "Recomendação de upgrade para Full (se aplicável)"
quick_mode_additions:
  - "Seção 'Quick Mode Limitations' obrigatória"
  - "Flag de confiança qualitativa (não quantificada)"
  - "Recomendação explícita se Full diagnosis é necessário"
```

---

## Output

**Arquivo principal:** `squads/root-diagnosis/data/{problem-slug}/DIAGNOSTIC-REPORT-{slug}.md`

```yaml
output:
  diagnostic_report:
    mode: "Quick (8 phases)"
    executive_summary: "Resumo executivo com top 3 findings"
    problem_classification:
      cynefin_domain: "Clear | Complicated | Complex | Chaotic"
      frame_selected: "Frame recomendado após reframing"
    root_causes:
      - id: "RC-1"
        description: "Descrição da causa-raiz"
        evidence: "Evidência verificável"
        confidence: "High | Medium | Low (qualitativo)"
    quick_mode_limitations:
      - "Sem avaliação de viabilidade organizacional (Phase 1.5 skipped)"
      - "Sem diagnóstico cultural/político (Phase 2 skipped)"
      - "Confiança não quantificada (Phase 7 skipped)"
      - "Diagnóstico não stress-tested (Phase 8 skipped)"
      - "Sem action package (Phase 9 skipped)"
    upgrade_recommendation:
      needed: true/false
      reason: "Justificativa para upgrade ou não"
    recommended_next_steps: []
  supporting_artifacts:
    - intake-brief.md
    - domain-classification.md
    - assumption-audit.md
    - system-dynamics-analysis.md
    - reframing-analysis.md
    - deep-diagnosis.md
    - root-cause-analysis.md
    - decision-log.md
```

---

## Acceptance Criteria

- [ ] Todas as 8 fases executadas (0, 1, 3, 3.5, 4, 5, 6, 10)
- [ ] Ambos os decision points (DP1 e DP2) resolvidos com rationale documentado
- [ ] Quality gates das fases incluídas passaram
- [ ] Relatório diagnóstico simplificado gerado
- [ ] Fases puladas documentadas com justificativa e impacto
- [ ] Recomendação de upgrade para Full incluída (se aplicável)
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
      condition: "Root cause analysis sem nenhuma evidência"
      action: "HALT — Mesmo em quick mode, causas-raiz precisam de evidência mínima"
      recovery: "Retornar à Phase 6 e documentar evidências"

    - id: VETO-UPGRADE-IGNORED
      condition: "Cynefin = Complex/Chaotic e usuário não foi alertado sobre limitações"
      action: "WARN — Quick mode é inadequado para problemas complexos/caóticos"
      recovery: "Documentar alerta e oferecer upgrade para Full"
```

---

## Handoff

```yaml
handoff:
  deliverable: "DIAGNOSTIC-REPORT-{slug}.md"
  consumer: "Usuário / stakeholder definido na Phase 0"
  includes:
    - "Relatório diagnóstico simplificado (DIAGNOSTIC-REPORT-{slug}.md)"
    - "Causas-raiz com evidência (sem quantificação)"
    - "Limitações explícitas do quick mode"
    - "Recomendação de upgrade (se aplicável)"
    - "Decision log com justificativas de DP1 e DP2"
    - "Artefatos intermediários (8 arquivos)"
  condition: "DIAGNOSTIC-REPORT-{slug}.md gerado com pelo menos 1 causa-raiz identificada"
  upgrade_option:
    description: "Se Quick revelar complexidade maior, fases 1.5, 2, 7, 8, 9 podem ser executadas como add-on"
    command: "*diagnose --continue-from-quick {slug}"
    reuses: "Todos os 7 outputs já gerados"
```

---

## Error Handling

```yaml
errors:
  phase_timeout:
    threshold: "15 min por fase (mais agressivo que full mode)"
    action: "WARN ao usuário, oferecer skip com documentação"
    recovery: "Quick mode prioriza velocidade — skip com documentação é aceitável"

  agent_unavailable:
    action: "Fallback para root-diagnosis-chief executando a task diretamente"
    degradation: "Qualidade pode ser menor — documentar como limitation"

  quality_gate_failure:
    action: "Retry fase com feedback específico do gate"
    max_retries: 1
    note: "Quick mode tem apenas 1 retry (vs 2 em full) para manter velocidade"
    escalation: "Se falhar após 1 retry, documentar gap e prosseguir"

  decision_point_ambiguous:
    action: "Usar modo sequential (ambos os agentes) quando domínio é ambíguo"
    note: "Mesmo em quick mode, decision points ambíguos justificam ambos os métodos"

  user_abandons_mid_process:
    action: "Salvar estado atual em data/{slug}/checkpoint-phase-{N}.md"
    recovery: "Retomar do último checkpoint completo"

  complexity_exceeds_quick:
    condition: "Cynefin = Complex/Chaotic ou múltiplos stakeholders conflitantes"
    action: "WARN ao usuário — recomendar upgrade para Full"
    message: "Este problema parece mais complexo do que o modo Quick consegue cobrir. Recomendo upgrade para diagnóstico completo (*diagnose). Outputs já gerados serão reutilizados."
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-22 | Initial release — 7-phase abbreviated orchestration with documented tradeoffs and upgrade path |
| 1.1.0 | 2026-02-22 | Fix elicitation count 6→8, add timing breakdown per phase |
| 1.2.0 | 2026-03-01 | Upgrade 7→8 fases — add Phase 3.5 (Senge/System Dynamics), Phase 1.5 to skipped_phases, system-dynamics-analysis.md as input to Phase 4 |
