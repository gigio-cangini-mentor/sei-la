# root-cause-analysis.md — Análise Detalhada de Causa-Raiz

## Purpose

Identificar e verificar as causas-raiz com rigor forense. Esta task pega os candidatos
a causa-raiz do deep-diagnosis e os submete a verificação metódica. Problemas com
desvio isolável usam KT Rational Process (IS/IS NOT); problemas multi-causais usam
Apollo RCA (grafos causais verificáveis). O output são causas-raiz verificadas,
não apenas candidatas.

**Agente responsável:** kepner-tregoe (desvio isolável) OU dean-gano (multi-causal)
**Fase:** 6 — Root Cause Analysis
**Frameworks:** KT Rational Process / Apollo Root Cause Analysis

---

## Task Metadata

```yaml
task_id: root-diagnosis/root-cause-analysis
task_name: Verify Root Causes
squad: root-diagnosis
type: root-cause-verification
status: pending
responsible_executor: kepner-tregoe OR dean-gano
execution_type: Agent
version: "1.0.0"
estimated_duration: "30-45 min"
execution_mode: analytical
decision_routing:
  source: deep-diagnosis.md
  isolable_deviation: kepner-tregoe
  multi_causal: dean-gano
  both: sequential (KT first, then Gano for residuals)
```

---

## Inputs

```yaml
required:
  deep_diagnosis:
    source: tasks/deep-diagnosis.md → deep-diagnosis.md
    required: true
    critical_field: root_causes_preliminary

  all_previous:
    source: "intake-brief.md + domain-classification.md + reframing-analysis.md"
    required: true
    note: "Context completo necessário para verificação"
```

---

## Preconditions

- [ ] deep-diagnosis.md disponível com root_causes_preliminary
- [ ] Agente correto carregado conforme routing
- [ ] Dados suficientes para IS/IS NOT (KT) ou grafo causal (Gano)

---

## Action Items — Path A: Kepner-Tregoe (Isolable Deviation)

### Step A1: Problem Specification (IS / IS NOT)

Para cada causa-raiz candidata, construir a especificação:

| Dimensão | IS (É) | IS NOT (NÃO É) |
|----------|--------|-----------------|
| **WHAT** — O que é o desvio? | O que exatamente está acontecendo | O que poderia estar mas NÃO está |
| **WHERE** — Onde ocorre? | Onde o problema aparece | Onde NÃO aparece (mas poderia) |
| **WHEN** — Quando ocorre? | Quando começou, quando se repete | Quando NÃO ocorre |
| **EXTENT** — Qual a extensão? | Quanto, quantos, que magnitude | Que magnitude NÃO atinge |

### Step A2: Distinction & Change Analysis

A partir do IS/IS NOT, identificar:

```yaml
distinctions:
  - distinction: "O que é diferente entre IS e IS NOT?"
    change: "O que mudou nessa diferença?"
    when_changed: "Quando essa mudança aconteceu?"
    relevance: "Como se conecta ao problema?"
```

### Step A3: Most Probable Cause

```yaml
most_probable_cause:
  statement: "Causa mais provável baseada em Distinction/Change"
  reasoning: "Cadeia lógica que leva a essa conclusão"
  explains_all_is: true/false
  explains_all_is_not: true/false
```

### Step A4: Verify

Para cada causa provável:

| Verificação | Resultado |
|-------------|-----------|
| Explica TODOS os IS? | Sim / Não / Parcial |
| Explica TODOS os IS NOT? | Sim / Não / Parcial |
| Existe evidência independente? | Sim / Não |
| É possível testar diretamente? | Sim / Não / Parcialmente |
| **Veredicto** | **CONFIRMED / PROBABLE / REJECTED** |

---

## Action Items — Path B: Dean Gano (Multi-Causal Chain)

### Step B1: Define the Problem

```yaml
problem_definition:
  what: "O que aconteceu / está acontecendo"
  significance: "Por que isso importa"
  when: "Quando começou"
  frequency: "Com que frequência"
```

### Step B2: Build Cause-Effect Chart

Construir grafo causal com 3 tipos de causas:

```yaml
cause_types:
  action_causes:
    description: "Ações ou eventos que contribuem para o efeito"
    symbol: "→"
    example: "Equipe não revisou o código"

  conditional_causes:
    description: "Condições que devem existir para a ação causar o efeito"
    symbol: "⊂"
    example: "Processo de code review não existe"

  combined:
    description: "Ação + Condição juntas produzem o efeito"
    notation: "Ação → (dado que Condição) → Efeito"
```

### Step B3: Verify Each Connection

Para CADA conexão no grafo:

```yaml
verification:
  connection: "Causa X → Efeito Y"
  evidence: "O que comprova esta conexão"
  counter_evidence: "O que poderia refutá-la"
  confidence: "High | Medium | Low"
  status: "verified | plausible | unverified"
```

### Step B4: Identify Root Causes

Causas que estão na base do grafo (sem causa upstream) E que são acionáveis:

```yaml
root_causes_gano:
  - id: "RC-1"
    type: "action | conditional"
    statement: "Descrição da causa-raiz"
    effects_chain: ["Efeito 1", "Efeito 2", "Problema Principal"]
    actionable: true/false
    within_control: true/false
```

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/root-cause-analysis.md`

```yaml
output:
  root_cause_analysis:
    method_used: "kepner-tregoe | dean-gano | both"
    # Se KT:
    kt_analysis:
      is_is_not_specification: {}
      distinctions: []
      most_probable_cause: {}
      verification_results: []
    # Se Gano:
    gano_analysis:
      problem_definition: {}
      cause_effect_chart: "Descrição textual ou mermaid do grafo"
      connection_verifications: []
      root_causes: []
    verified_root_causes:
      - id: "VRC-1"
        statement: "Causa-raiz verificada"
        verification_method: "kt | gano"
        confidence: "High | Medium | Low"
        evidence: "Evidência que suporta"
        actionable: true/false
        priority: "Critical | High | Medium | Low"
    unverified_candidates:
      - id: "UC-1"
        statement: "Candidata não verificada"
        reason: "Por que não foi possível verificar"
        recommendation: "O que seria necessário para verificar"
```

---

## Acceptance Criteria

- [ ] Método correto aplicado conforme routing
- [ ] **KT:** IS/IS NOT completo para pelo menos 1 desvio, verificação documentada
- [ ] **Gano:** Grafo causal com mínimo 3 conexões verificadas
- [ ] Pelo menos 1 causa-raiz verificada (ou justificativa se nenhuma)
- [ ] Cada causa-raiz com nível de confiança e evidência
- [ ] Candidatas não verificadas documentadas com razão

---

## Veto Conditions

```yaml
veto:
  condition: "Nenhuma causa-raiz pode ser verificada com os dados disponíveis"
  action: "WARN — se nenhuma causa verificada após 2 tentativas, HALT e recomendar retorno à Phase 5 para investigação adicional"
  recovery: "Na primeira tentativa: listar candidatas com melhor ranking e tentar verificação alternativa. Na segunda tentativa sem sucesso: HALT — escalar para root-diagnosis-chief com recomendação de reexecutar deep-diagnosis.md com dados complementares"
  message: "Dados atuais insuficientes para verificação definitiva. Após 2 tentativas sem causa verificada, recomenda-se retorno à Phase 5 (deep-diagnosis) para investigação adicional."
```

---

## Handoff

```yaml
handoff:
  next_task: quantify-evidence.md
  executor: douglas-hubbard
  passes:
    - Todos os outputs anteriores
    - root-cause-analysis.md
  condition: "root-cause-analysis.md gerado com pelo menos 1 verified_root_cause OU unverified_candidates"
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
    condition: "Output de fase anterior contradiz dados novos desta fase (ex: deep-diagnosis aponta causa A mas IS/IS NOT refuta)"
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
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-21 | Initial release — Dual-path (KT IS/IS NOT + Gano cause-effect charts) |
| 1.1.0 | 2026-02-22 | Add Error Handling section. Strengthen veto: HALT after 2 failed verification attempts with recommendation to return to Phase 5 |
