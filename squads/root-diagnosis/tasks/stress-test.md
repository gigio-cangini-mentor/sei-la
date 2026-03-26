# stress-test.md — Stress Test do Diagnóstico

## Purpose

Submeter o diagnóstico completo a um stress test rigoroso antes de empacotá-lo para
ação. Usando PreMortem, Data/Frame analysis e busca ativa por contradições, esta task
identifica pontos cegos, fraquezas lógicas e cenários onde o diagnóstico poderia estar
errado. É a última linha de defesa contra entregar um diagnóstico bonito mas incorreto.

**Agente responsável:** gary-klein
**Fase:** 8 — Stress Test
**Frameworks:** PreMortem, Data/Frame Model, Recognition-Primed Decision (RPD)

---

## Task Metadata

```yaml
task_id: root-diagnosis/stress-test
task_name: Stress-Test Diagnosis
squad: root-diagnosis
type: validation
status: pending
responsible_executor: gary-klein
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
    source: "Todos os outputs das fases 0-7"
    required: true
    critical_files:
      - root-cause-analysis.md
      - evidence-quantification.md
      - deep-diagnosis.md
      - reframing-analysis.md
```

---

## Preconditions

- [ ] Todos os outputs das fases anteriores disponíveis
- [ ] Agente gary-klein carregado com frameworks de cognição
- [ ] Diagnóstico completo para ser testado

---

## Action Items

### Step 1: Run PreMortem on Diagnosis

Imaginar que o diagnóstico foi implementado e FALHOU completamente. Por quê?

```yaml
premortem:
  scenario: "É daqui a 6 meses. As causas-raiz foram tratadas conforme o diagnóstico recomendou. O problema NÃO melhorou. Na verdade, piorou. O que aconteceu?"

  failure_modes:
    - id: "FM-1"
      description: "Como o diagnóstico poderia estar errado"
      probability: "High | Medium | Low"
      impact: "Severe | Moderate | Minor"
      missed_by_diagnosis: "O que não vimos?"
      mitigation: "Como proteger contra isso"

  minimum_failure_modes: 3
  instruction: "Ser genuinamente pessimista — não é exercício acadêmico"
```

### Step 2: Apply Data/Frame Model

Avaliar como os dados foram interpretados:

```yaml
data_frame_analysis:
  current_frame:
    description: "Frame usado para interpretar os dados"
    data_that_fits: "Dados que suportam este frame"
    data_ignored: "Dados que não se encaixam e foram descartados ou minimizados"
    data_missing: "Dados que deveriam existir se o frame está correto, mas não temos"

  alternative_frames:
    - frame: "Interpretação alternativa dos mesmos dados"
      data_it_explains_better: "Que dados esta interpretação explica melhor?"
      data_it_fails: "Que dados esta interpretação não explica?"
      plausibility: "High | Medium | Low"
```

### Step 3: Look for Contradictions

Revisar sistematicamente todos os outputs em busca de:

```yaml
contradiction_scan:
  internal_contradictions:
    - location_1: "Onde encontrado (doc + seção)"
      location_2: "Onde contradiz (doc + seção)"
      nature: "Descrição da contradição"
      resolution: "Qual versão é mais confiável e por quê"
      resolution_criteria: "Contradições são resolvidas priorizando: (1) evidência quantificada > (2) convergência entre agentes > (3) output mais recente. Documentar qual critério decidiu."

  missing_evidence:
    - expected: "O que esperaríamos encontrar se o diagnóstico está correto"
      actually_found: "O que realmente encontramos (ou não encontramos)"
      significance: "Quão problemática é essa ausência"

  confirming_bias_check:
    - "Buscamos ativamente evidência que CONTRA-DIGA nossa conclusão?"
    - "Ponderamos evidência contrária com o mesmo peso?"
    - "Algum stakeholder discordaria fundamentalmente? O que diria?"
```

### Step 4: Identify Insight Triggers

Buscar sinais de insight que podem ter sido perdidos:

```yaml
insight_triggers:
  contradictions: "Dados que se contradizem mas foram harmonizados prematuramente"
  coincidences: "Coincidências que podem não ser coincidências"
  anomalies: "Dados outlier que foram descartados como ruído"
  connections: "Conexões entre elementos que não foram exploradas"
  creative_desperation: "Onde ficamos 'presos' no diagnóstico — o ponto de dificuldade pode ser o insight"
```

### Step 5: Amend Diagnosis (if needed)

Se o stress test revelou problemas:

```yaml
amendments:
  - id: "AMD-1"
    type: "correction | addition | caveat | reversal"
    original: "O que o diagnóstico dizia"
    amended: "O que deveria dizer"
    reason: "Por que a mudança é necessária"
    confidence_change: "Como isso afeta a confiança geral"
```

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/stress-test.md`

```yaml
output:
  stress_test:
    premortem:
      failure_modes: []
      highest_risk: "Modo de falha mais provável e grave"
      overall_robustness: "Robust | Adequate | Fragile"
    data_frame_analysis:
      current_frame_strength: "Strong | Moderate | Weak"
      alternative_frames: []
      best_alternative: "Frame alternativo mais plausível (se houver)"
    contradiction_scan:
      internal_contradictions: []
      missing_evidence: []
      confirmation_bias_risk: "High | Medium | Low"
    insight_triggers: []
    amendments: []
    stress_test_verdict:
      status: "PASS | PASS_WITH_AMENDMENTS | FAIL"
      confidence_after_test: "High | Medium | Low"
      diagnosis_reliable: true/false
      caveats: "Ressalvas que devem acompanhar o diagnóstico final"
```

---

## Acceptance Criteria

- [ ] PreMortem executado com mínimo 3 modos de falha
- [ ] Data/Frame analysis com pelo menos 1 frame alternativo testado
- [ ] Contradiction scan completo (internos + missing evidence + bias check)
- [ ] Insight triggers revisados
- [ ] Amendments documentados (se necessários)
- [ ] Veredicto final: PASS, PASS_WITH_AMENDMENTS ou FAIL

---

## Veto Conditions

```yaml
veto:
  condition: "Diagnóstico falha no PreMortem sem possibilidade de amendment"
  action: "FAIL — Retornar diagnóstico para revisão"
  recovery: "Identificar a fase que produziu o erro e reexecutar a partir dela"
  message: "O stress test revelou falhas fundamentais no diagnóstico. É necessário voltar e corrigir antes de prosseguir."
  escalation: "root-diagnosis-chief decide se retorna para deep-diagnosis ou root-cause-analysis"
```

---

## Handoff

```yaml
handoff:
  next_task: package-for-action.md
  executor: min-basadur
  passes:
    - Todos os outputs anteriores
    - stress-test.md
  condition: "stress_test_verdict.status == PASS ou PASS_WITH_AMENDMENTS"
  block_if: "stress_test_verdict.status == FAIL"
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
    condition: "Output de fase anterior contradiz dados novos desta fase"
    action: "Documentar contradição — não ignorar silenciosamente"
    recovery: "Flaggar como 'data_conflict' no output e recomendar revisão na Phase 8 (stress test)"
    resolution_rule: "Contradições são resolvidas priorizando: (1) evidência quantificada > (2) convergência entre agentes > (3) output mais recente. Documentar qual critério decidiu."

  insufficient_data:
    condition: "Dados insuficientes para completar análise com confiança"
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
| 1.0.0 | 2026-02-21 | Initial release — PreMortem, Data/Frame, contradiction scan, amendments |
| 1.1.0 | 2026-02-22 | Add Error Handling section. Add contradiction resolution rule: quantified evidence > agent convergence > recency |
