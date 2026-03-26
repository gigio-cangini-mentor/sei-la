# audit-assumptions.md — Auditoria de Pressupostos na Definição do Problema

## Purpose

Auditar os pressupostos embutidos na definição do problema. Humanos escalam a Ladder of
Inference automaticamente — selecionam dados, adicionam significado, fazem generalizações
e agem com base em conclusões que parecem "óbvias" mas são construídas. Esta task força
uma descida deliberada da escada para verificar cada degrau.

**Agente responsável:** chris-argyris
**Fase:** 3 — Assumption Audit
**Frameworks:** Ladder of Inference, Double-Loop Learning, Model I vs Model II

---

## Task Metadata

```yaml
task_id: root-diagnosis/audit-assumptions
task_name: Audit Problem Assumptions
squad: root-diagnosis
type: assumption-audit
status: pending
responsible_executor: chris-argyris
execution_type: Agent
version: "1.0.0"
estimated_duration: "15-25 min"
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

  domain_classification:
    field: "Classificação Cynefin do problema"
    format: markdown
    source: tasks/classify-domain.md → domain-classification.md
    required: true

optional:
  cultural_diagnosis:
    field: "Diagnóstico cultural (se disponível)"
    format: markdown
    source: tasks/diagnose-culture.md → cultural-diagnosis.md
    required: false
```

---

## Preconditions

- [ ] intake-brief.md disponível
- [ ] domain-classification.md disponível
- [ ] Agente chris-argyris carregado com frameworks de meta-cognição

---

## Action Items

### Step 1: Extract Embedded Assumptions

Percorrer o problem_statement do intake-brief e identificar:

```yaml
assumption_categories:
  causal_assumptions:
    description: "Afirmações implícitas de causa-efeito"
    example: "'O time não entrega porque não tem processo' — assume que processo é a causa"

  scope_assumptions:
    description: "O que está dentro e fora do escopo do problema"
    example: "'O problema é do departamento X' — assume que outros departamentos não contribuem"

  stakeholder_assumptions:
    description: "Quem é visto como parte do problema/solução"
    example: "'A liderança precisa mudar' — assume que liderança é a variável crítica"

  temporal_assumptions:
    description: "Sobre quando/como o problema começou"
    example: "'Desde que o novo sistema foi implantado' — assume correlação temporal como causa"

  solution_assumptions:
    description: "Soluções já embutidas na descrição do problema"
    example: "'Precisamos de mais gente' — assume que headcount é a solução antes de diagnosticar"
```

### Step 2: Walk the Ladder of Inference

Para cada assunção identificada, descer a escada:

```
7. AÇÃO → O que estão fazendo/querendo fazer baseado na conclusão?
6. CONCLUSÃO → Que conclusão tiraram?
5. CRENÇA → Que crença sustenta essa conclusão?
4. GENERALIZAÇÃO → Que generalização foi feita?
3. SIGNIFICADO → Que significado foi atribuído aos dados?
2. SELEÇÃO → Que dados foram selecionados (e quais ignorados)?
1. DADOS → Quais são os dados observáveis reais?
```

### Step 3: Identify Governing Variables (Model I)

Detectar comportamentos de Model I (defensivo):
- **Controle unilateral** — "Eu sei o que o problema é"
- **Maximizar vitória** — "Minha definição do problema é a correta"
- **Suprimir emoções negativas** — "Não é pessoal, é técnico"
- **Ser racional** — "Os dados mostram claramente que..."

### Step 4: Challenge Each Assumption

Para cada assunção:

| Assunção | Evidência a favor | Evidência contra | Alternativa | Status |
|----------|-------------------|------------------|-------------|--------|
| A1 | ... | ... | ... | Confirmed / Challenged / Refuted |

### Step 5: Flag Double-Loop Opportunities

Identificar onde é necessário Double-Loop Learning:
- **Single-loop:** Problema aceito como-é, buscar solução
- **Double-loop:** Questionar se estamos resolvendo o problema certo

```yaml
loop_assessment:
  single_loop_sufficient: true/false
  double_loop_needed: true/false
  reasoning: "Por que a definição do problema precisa (ou não) ser questionada"
```

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/assumption-audit.md`

```yaml
output:
  assumption_audit:
    total_assumptions_found: N
    assumptions:
      - id: "A1"
        statement: "Descrição da assunção"
        category: "causal | scope | stakeholder | temporal | solution"
        ladder_position: "Degrau da escada onde o salto ocorre"
        evidence_for: "O que suporta"
        evidence_against: "O que contradiz"
        alternative: "Interpretação alternativa"
        status: "confirmed | challenged | refuted"
        severity: "high | medium | low"
    governing_variables:
      - variable: "Descrição"
        model: "Model I | Model II"
        impact: "Como afeta o diagnóstico"
    double_loop_assessment:
      needed: true/false
      reasoning: "Justificativa"
      reframe_suggestions: "Se needed=true, sugestões de reframe"
    summary: "Resumo executivo das assunções críticas"
```

---

## Acceptance Criteria

- [ ] Pelo menos 3 assunções identificadas e documentadas
- [ ] Cada assunção tem evidência a favor e contra
- [ ] Ladder of Inference aplicada em pelo menos 2 assunções críticas
- [ ] Model I behaviors identificados (se presentes)
- [ ] Avaliação de Double-Loop documentada
- [ ] Assunções classificadas como confirmed/challenged/refuted

---

## Veto Conditions

```yaml
veto:
  condition: "O diagnosticador (ou cliente) recusa examinar seus próprios pressupostos"
  action: "WARN — Documentar a recusa como risco e prosseguir"
  recovery: "Registrar no relatório final como 'Assumption audit incomplete — subject resistance'"
  message: "A recusa em examinar pressupostos é, em si, um dado diagnóstico importante. Registro e prossigo."
```

---

## Handoff

```yaml
handoff:
  next_task: reframe-problem.md
  executor: thomas-wedell-wedellsborg
  passes:
    - intake-brief.md
    - domain-classification.md
    - cultural-diagnosis.md (if available)
    - assumption-audit.md
  condition: "assumption-audit.md gerado com pelo menos 3 assunções documentadas"
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
    condition: "Output de fase anterior contradiz dados novos desta fase (ex: domain-classification diz 'Clear' mas assumption audit revela complexidade oculta)"
    action: "Documentar contradição — não ignorar silenciosamente"
    recovery: "Flaggar como 'data_conflict' no output e recomendar revisão na Phase 8 (stress test)"

  insufficient_data:
    condition: "Dados insuficientes para completar análise com confiança (ex: problem statement muito vago para extrair assunções)"
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
| 1.0.0 | 2026-02-21 | Initial release — Ladder of Inference, Model I detection, Double-Loop assessment |
| 1.1.0 | 2026-02-22 | Add Error Handling section — timeout, contradictions, insufficient data, agent degradation |
