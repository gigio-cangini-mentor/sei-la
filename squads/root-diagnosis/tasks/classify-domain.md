# classify-domain.md — Classificação Cynefin do Problema

## Purpose

Classificar o problema em um domínio Cynefin (Clear, Complicated, Complex, Chaotic, Disorder)
para determinar a abordagem diagnóstica correta. Problemas complicados requerem análise
especializada (Goldratt/KT); problemas complexos requerem abordagem exploratória (Checkland/Gano).
Uma classificação errada aqui contamina todo o diagnóstico posterior.

**Agente responsável:** dave-snowden
**Fase:** 1 — Domain Classification
**Framework:** Cynefin Framework

---

## Task Metadata

```yaml
task_id: root-diagnosis/classify-domain
task_name: Classify Problem Domain
squad: root-diagnosis
type: classification
status: pending
responsible_executor: dave-snowden
execution_type: Agent
version: "1.0.0"
estimated_duration: "15-30 min"
execution_mode: analytical
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
```

---

## Preconditions

- [ ] intake-brief.md disponível e completo
- [ ] Agente dave-snowden carregado com Cynefin Framework

---

## Action Items

### Step 1: Analyze Problem Characteristics

Examinar o intake-brief e avaliar cada dimensão:

```yaml
dimensions:
  causality:
    question: "A relação causa-efeito é conhecida ou desconhecida?"
    clear: "Causa-efeito óbvia, best practice disponível"
    complicated: "Causa-efeito existe mas requer expertise para descobrir"
    complex: "Causa-efeito só visível em retrospectiva"
    chaotic: "Nenhuma relação causa-efeito perceptível"

  predictability:
    question: "O comportamento do sistema é previsível?"
    clear: "Altamente previsível, repetível"
    complicated: "Previsível com análise adequada"
    complex: "Emergente, padrões mudam"
    chaotic: "Imprevisível, turbulência"

  expertise_sufficiency:
    question: "Expertise existente é suficiente para resolver?"
    clear: "Qualquer pessoa treinada resolve"
    complicated: "Requer especialista mas é solucionável"
    complex: "Especialistas divergem na abordagem"
    chaotic: "Ninguém sabe o que fazer"

  stakeholder_agreement:
    question: "Stakeholders concordam sobre o que é o problema?"
    clear: "Consenso total"
    complicated: "Concordam no problema, divergem na solução"
    complex: "Divergem sobre o próprio problema"
    chaotic: "Nem conseguem discutir coerentemente"

  reproducibility:
    question: "O problema é reproduzível de forma consistente?"
    clear: "100% reproduzível"
    complicated: "Reproduzível com condições específicas"
    complex: "Aparece de forma intermitente e imprevisível"
    chaotic: "Cada ocorrência é única"
```

### Step 2: Apply Cynefin Classification

Baseado na análise das 5 dimensões, classificar:

| Domain | Critério | Abordagem Diagnóstica |
|--------|----------|----------------------|
| **Clear** | >=4 dimensões apontam Clear | Sense-Categorize-Respond. Skip para RCA direto. |
| **Complicated** | Maioria aponta Complicated | Sense-Analyze-Respond. Goldratt + KT. |
| **Complex** | Maioria aponta Complex | Probe-Sense-Respond. Checkland + Gano. |
| **Chaotic** | >=3 dimensões apontam Chaotic | Act-Sense-Respond. Estabilizar antes de diagnosticar. |
| **Disorder** | Nenhum domínio predomina | Decompor em sub-problemas e classificar cada um. |

### Step 3: Identify Boundary Conditions

Verificar se o problema está em transição entre domínios:
- Complicated → Complex (fronteira mais comum)
- Complex → Chaotic (crise iminente)
- Clear → Complicated (falsa simplicidade)

### Step 4: Determine Diagnostic Routing

```yaml
routing:
  clear:
    skip_phases: [2, 4, 7, 8, 9]
    fast_track: true
    note: "Problema simples — ir direto para RCA e solução"

  complicated:
    deep_diagnosis_agent: eli-goldratt
    rca_agent: kepner-tregoe
    include_phases: [0, 1, 3, 4, 5, 6, 10]
    note: "Análise estruturada com expertise"

  complex:
    deep_diagnosis_agent: peter-checkland
    rca_agent: dean-gano
    include_phases: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    note: "Exploração completa necessária"

  chaotic:
    immediate_action: "Estabilizar primeiro"
    then: "Reclassificar após estabilização"
    note: "Não diagnosticar no meio do caos — primeiro conter"

  disorder:
    action: "Decompor em sub-problemas"
    then: "Classificar cada sub-problema individualmente"
```

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/domain-classification.md`

```yaml
output:
  domain_classification:
    primary_domain: "Clear | Complicated | Complex | Chaotic | Disorder"
    confidence: "High | Medium | Low"
    dimension_scores:
      causality: "clear | complicated | complex | chaotic"
      predictability: "clear | complicated | complex | chaotic"
      expertise_sufficiency: "clear | complicated | complex | chaotic"
      stakeholder_agreement: "clear | complicated | complex | chaotic"
      reproducibility: "clear | complicated | complex | chaotic"
    boundary_conditions:
      - "Descrição de transições ou bordas identificadas"
    diagnostic_routing:
      deep_diagnosis_agent: "agent-id"
      rca_agent: "agent-id"
      phases_to_execute: []
      phases_to_skip: []
    reasoning: "Justificativa detalhada para a classificação"
```

---

## Acceptance Criteria

- [ ] As 5 dimensões foram analisadas com score individual
- [ ] Domínio primário classificado com justificativa
- [ ] Nível de confiança atribuído (High/Medium/Low)
- [ ] Condições de contorno (boundaries) identificadas
- [ ] Routing de diagnóstico definido (quais agentes/fases)
- [ ] Se Disorder: sub-problemas decompostos e classificados individualmente

---

## Veto Conditions

```yaml
veto:
  condition: "Não é possível classificar o domínio mesmo após análise completa das 5 dimensões"
  action: "HALT — Classificar como Disorder e decompor"
  recovery: "Se decomposição também falha, escalar para root-diagnosis-chief para re-intake"
  message: "O problema não se encaixa em nenhum domínio Cynefin de forma clara. Vamos decompô-lo em partes menores."
```

---

## Handoff

```yaml
handoff:
  next_task: diagnose-culture.md
  executor: edgar-schein
  passes:
    - intake-brief.md
    - domain-classification.md
  condition: "domain-classification.md gerado com primary_domain definido"
  parallel_handoff:
    also_informs: audit-assumptions.md
    reason: "Chris Argyris pode trabalhar em paralelo se recursos disponíveis"
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

  insufficient_data:
    condition: "Dados insuficientes para completar análise com confiança"
    action: "WARN — documentar o que falta e qual impacto na confiança"
    recovery: "Prosseguir com confidence=Low e flag para Phase 7 (quantificação)"

  agent_degradation:
    condition: "Agente não consegue aplicar framework adequadamente"
    action: "Fallback para root-diagnosis-chief com método simplificado"
    degradation: "Documentar como limitation no relatório final"

  depth_validation:
    condition: "Domínio classificado como Complex ou Chaotic e usuário escolheu Quick mode"
    action: "WARN: 'Problema classificado como {domínio} — quick mode pode ser insuficiente. Recomendação: upgrade para Full.'"
    recovery: "Se usuário confirma Quick, prosseguir mas registrar como risk no relatório final"
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-21 | Initial release — 5 dimensions, Cynefin classification, diagnostic routing |
| 1.1.0 | 2026-02-22 | Add Error Handling section — timeout, contradictions, insufficient data, agent degradation, depth validation for Complex/Chaotic + Quick mode |
