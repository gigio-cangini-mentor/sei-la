# quantify-evidence.md — Quantificação das Evidências Diagnósticas

## Purpose

Transformar achados qualitativos em evidências quantificadas. Diagnósticos frequentemente
ficam em linguagem vaga ("o problema é grande", "acontece frequentemente"). Esta task
aplica Applied Information Economics para decompor conceitos abstratos em indicadores
mensuráveis, calibrar estimativas e calcular o Value of Information (VOI) — garantindo
que sabemos o que sabemos e o que ainda não sabemos.

**Agente responsável:** douglas-hubbard
**Fase:** 7 — Evidence Quantification
**Framework:** Applied Information Economics / How to Measure Anything

---

## Task Metadata

```yaml
task_id: root-diagnosis/quantify-evidence
task_name: Quantify Diagnostic Evidence
squad: root-diagnosis
type: evidence-quantification
status: pending
responsible_executor: douglas-hubbard
execution_type: Agent
version: "1.0.0"
estimated_duration: "20-30 min"
execution_mode: analytical
```

---

## Inputs

```yaml
required:
  root_cause_analysis:
    source: tasks/root-cause-analysis.md → root-cause-analysis.md
    required: true
    critical_field: verified_root_causes

  all_previous:
    source: "Todos os outputs das fases 0-6"
    required: true
```

---

## Preconditions

- [ ] root-cause-analysis.md disponível com causas-raiz (verificadas ou candidatas)
- [ ] Agente douglas-hubbard carregado com framework AIE
- [ ] Dados qualitativos disponíveis para decomposição

---

## Action Items

### Step 1: Decompose Abstract Findings

Para cada achado qualitativo do diagnóstico, decompor em componentes mensuráveis:

```yaml
decomposition:
  finding: "Achado qualitativo original"
  components:
    - component: "Sub-elemento mensurável"
      observable: "O que observaríamos se fosse verdade?"
      measurable_via: "Como podemos medir isso?"
      proxy_if_direct_impossible: "Se medição direta é impossível, qual proxy?"
```

**Regra de Hubbard:** Se algo importa, afeta algo. Se afeta algo, é detectável.
Se é detectável, pode ser medido.

### Step 2: Identify Measurable Indicators

Para cada causa-raiz verificada:

```yaml
measurement_chain:
  root_cause: "RC-1"
  indicators:
    - indicator: "Métrica ou proxy observável"
      current_estimate: "Melhor estimativa atual (90% CI)"
      confidence_interval: "Intervalo de confiança de 90%"
      measurement_method: "Como medir na prática"
      data_available: true/false
      effort_to_measure: "Low | Medium | High"
```

### Step 3: Calibrate Estimates

Aplicar técnica de calibração para cada estimativa:

```yaml
calibration:
  technique: "equivalent_bet_test"
  process:
    1: "Fazer estimativa inicial com intervalo de 90% CI"
    2: "Aplicar teste de aposta equivalente — apostaria neste intervalo?"
    3: "Se não: alargar o intervalo até que se sinta confortável"
    4: "Se sim: verificar se intervalo não é excessivamente largo"
  output:
    estimate: "Valor central"
    lower_bound: "Limite inferior (5th percentile)"
    upper_bound: "Limite superior (95th percentile)"
    confidence: "90%"
```

### Step 4: Calculate Value of Information (VOI)

Para cada incerteza relevante:

```yaml
voi_analysis:
  uncertainty: "Descrição da incerteza"
  current_ci_width: "Largura do intervalo de confiança atual"
  decision_impact: "Que decisão muda dependendo do valor real?"
  cost_of_wrong_decision: "Custo estimado de decidir errado"
  cost_of_measuring: "Custo de reduzir a incerteza"
  voi: "Valor da informação = custo_wrong_decision * probability_wrong - cost_measuring"
  recommendation: "Medir | Não medir | Medir parcialmente"
```

**Regra:** Se VOI > custo de medir, vale a pena investigar mais. Se não, decidir com o que temos.

### Step 5: Create Evidence Summary

```yaml
evidence_summary:
  high_confidence_findings:
    - finding: "Achado com alta confiança"
      evidence_strength: "Strong"
      confidence: ">80%"
  medium_confidence_findings:
    - finding: "Achado com confiança moderada"
      evidence_strength: "Moderate"
      confidence: "50-80%"
  low_confidence_findings:
    - finding: "Achado com baixa confiança"
      evidence_strength: "Weak"
      confidence: "<50%"
  unknown:
    - item: "O que ainda não sabemos"
      voi: "High | Medium | Low"
      recommendation: "Investigar | Aceitar incerteza | Ignorar"
```

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/evidence-quantification.md`

```yaml
output:
  evidence_quantification:
    decompositions: []
    measurement_chains: []
    calibrated_estimates: []
    voi_analyses: []
    evidence_summary:
      high_confidence: []
      medium_confidence: []
      low_confidence: []
      unknowns: []
    overall_diagnostic_confidence: "High | Medium | Low"
    confidence_reasoning: "Justificativa para o nível de confiança geral"
    recommended_further_investigation:
      - item: "O que investigar para aumentar confiança"
        expected_voi: "Alto | Médio | Baixo"
        cost: "Estimativa de esforço"
```

---

## Acceptance Criteria

- [ ] Pelo menos 3 achados decompostos em indicadores mensuráveis
- [ ] Cada causa-raiz com pelo menos 1 measurement chain
- [ ] Estimativas calibradas com 90% CI
- [ ] VOI calculado para pelo menos 2 incertezas
- [ ] Evidence summary com classificação de confiança
- [ ] Confiança geral do diagnóstico documentada

---

## Veto Conditions

```yaml
veto:
  condition: "Nenhuma — quantificação SEMPRE adiciona rigor"
  action: "N/A"
  note: "Mesmo estimativas grosseiras são melhores que nenhuma estimativa"
```

---

## Handoff

```yaml
handoff:
  next_task: stress-test.md
  executor: gary-klein
  passes:
    - Todos os outputs anteriores
    - evidence-quantification.md
  condition: "evidence-quantification.md gerado com evidence_summary preenchido"
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
    condition: "Output de fase anterior contradiz dados novos desta fase (ex: root-cause diz confidence=High mas quantificação mostra evidência fraca)"
    action: "Documentar contradição — não ignorar silenciosamente"
    recovery: "Flaggar como 'data_conflict' no output e recomendar revisão na Phase 8 (stress test)"

  insufficient_data:
    condition: "Dados insuficientes para completar análise com confiança (ex: achados puramente qualitativos sem nenhum proxy mensurável)"
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
| 1.0.0 | 2026-02-21 | Initial release — AIE decomposition, calibration, VOI, measurement chains |
| 1.1.0 | 2026-02-22 | Add Error Handling section — timeout, contradictions, insufficient data, agent degradation |
