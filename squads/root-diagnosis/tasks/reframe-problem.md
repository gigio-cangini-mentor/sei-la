# reframe-problem.md — Desafiar o Enquadramento do Problema

## Purpose

Verificar se estamos resolvendo o problema CERTO. A maioria dos diagnósticos falha não
porque a análise é fraca, mas porque o problema foi enquadrado de forma errada desde o
início. Esta task aplica 5 estratégias de reframing para testar o enquadramento atual
e propor alternativas superiores antes de investir em análise profunda.

**Agente responsável:** thomas-wedell-wedellsborg
**Fase:** 4 — Problem Reframing
**Framework:** Frame-Reframe-Move Forward (Are You Solving the Right Problem?)

---

## Task Metadata

```yaml
task_id: root-diagnosis/reframe-problem
task_name: Reframe Problem Statement
squad: root-diagnosis
type: reframing
status: pending
responsible_executor: thomas-wedell-wedellsborg
execution_type: Agent
version: "1.0.0"
estimated_duration: "20-30 min"
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
    field: "Classificação Cynefin"
    format: markdown
    source: tasks/classify-domain.md → domain-classification.md
    required: true

  assumption_audit:
    field: "Auditoria de pressupostos"
    format: markdown
    source: tasks/audit-assumptions.md → assumption-audit.md
    required: true

optional:
  cultural_diagnosis:
    field: "Diagnóstico cultural"
    format: markdown
    source: tasks/diagnose-culture.md → cultural-diagnosis.md
    required: false

  system_dynamics_analysis:
    field: "Análise de dinâmica sistêmica"
    format: markdown
    source: tasks/model-system-dynamics.md → system-dynamics-analysis.md
    required: false
    note: "Disponível quando Phase 3.5 (Senge) foi executada — enriquece reframing com feedback loops e archetypes"

  viability_assessment:
    field: "Avaliação de viabilidade organizacional"
    format: markdown
    source: tasks/assess-viability.md → viability-assessment.md
    required: false
    note: "Disponível quando Phase 1.5 (Beer) foi executada"
```

---

## Preconditions

- [ ] intake-brief.md disponível
- [ ] domain-classification.md disponível
- [ ] assumption-audit.md disponível
- [ ] Agente thomas-wedell-wedellsborg carregado

---

## Action Items

### Step 1: Capture the Current Frame

Documentar o enquadramento atual do problema exatamente como está:

```yaml
current_frame:
  problem_as_stated: "O problema na linguagem do solicitante"
  implicit_solution: "Que solução está implícita nesta definição?"
  who_defined: "Quem definiu o problema e de que perspectiva?"
  what_is_excluded: "O que fica fora deste enquadramento?"
```

### Step 2: Apply 5 Reframing Strategies

#### Strategy 1: Look Outside the Frame

```yaml
outside_frame:
  question: "O que está acontecendo FORA do enquadramento atual que pode ser relevante?"
  method: "Expandir a fronteira do problema — incluir elementos adjacentes"
  output: "Frame alternativo que inclui contexto ignorado"
```

#### Strategy 2: Rethink the Goal

```yaml
rethink_goal:
  question: "O que realmente queremos alcançar? (Não o que dissemos querer)"
  method: "Separar PEDIDO de NECESSIDADE — o pedido é 'resolver X', a necessidade pode ser diferente"
  output: "Frame alternativo baseado na necessidade real vs pedido superficial"
```

#### Strategy 3: Examine the Bright Spots

```yaml
bright_spots:
  question: "Onde esse problema NÃO acontece? O que está diferente nesses casos?"
  method: "Buscar exceções positivas — onde o sistema funciona apesar do problema"
  output: "Frame alternativo baseado em desvios positivos"
```

#### Strategy 4: Look in the Mirror

```yaml
mirror:
  question: "Qual é o nosso papel em manter esse problema vivo?"
  method: "Inverter a perspectiva — de vítima para co-criador"
  output: "Frame alternativo que inclui o diagnosticador como variável"
```

#### Strategy 5: Take Their Perspective

```yaml
perspective:
  question: "Como cada stakeholder diferente vê esse problema?"
  method: "Mapear o mesmo problema sob 3+ perspectivas diferentes"
  output: "Frame alternativo baseado em perspectiva não-dominante"
```

### Step 3: Evaluate Alternative Frames

Para cada frame alternativo gerado:

| Critério | Frame Original | Frame Alt 1 | Frame Alt 2 | Frame Alt 3 |
|----------|---------------|-------------|-------------|-------------|
| **Abrangência** | Cobre todas as evidências? | | | |
| **Acionabilidade** | Leva a ações concretas? | | | |
| **Novidade** | Revela algo que não víamos? | | | |
| **Testabilidade** | Podemos verificar se é correto? | | | |
| **Stakeholder Fit** | Ressoa com os envolvidos? | | | |

### Step 3.5: Meadows Purpose Test (Validation)

Aplicar o teste de propósito de Donella Meadows como validação pós-reframing:

```yaml
meadows_purpose_test:
  q1: "O que esse sistema REALMENTE produz? (outputs observados, não mission statements)"
  q2: "Propósito declarado = propósito revelado pelos resultados?"
  q3: "Incentivos, métricas e estruturas estão alinhados ao propósito declarado?"
  q4: "Quem se beneficia do propósito REAL vs quem se beneficiaria do DECLARADO?"
  output:
    declared_purpose: "O que o sistema diz que faz"
    revealed_purpose: "O que o sistema realmente produz"
    alignment_gap: "Distância entre declarado e revelado"
    implication_for_reframing: "Se gap significativo, propósito revelado é candidato a novo frame"
```

> **Nota:** O Purpose Test não substitui as 5 estratégias — ele VALIDA e COMPLEMENTA. Se o propósito revelado diverge do declarado, isso é um frame alternativo poderoso que deve entrar na avaliação do Step 4.

### Step 4: Recommend Frame

```yaml
recommendation:
  options:
    maintain: "Manter frame original — reframing não revelou perspectiva superior"
    reframe: "Adotar frame alternativo — razões específicas"
    combine: "Combinar frame original com insights do reframing"
  decision: "maintain | reframe | combine"
  justification: "Razão detalhada para a recomendação"
```

### Step 4.5: Generate Point of View (POV) Statement

Sintetizar o frame recomendado em um POV statement formal que articula quem sofre, o que precisa e por que — servindo como ponte entre diagnóstico e design de solução.

```yaml
pov_generation:
  template: "[Stakeholder principal] precisa de [necessidade real revelada pelo diagnóstico] porque [insight-chave que emergiu do reframing]"

  rules:
    - "Derivado do recommended_frame — NUNCA do frame original se houve reframe"
    - "O stakeholder vem do intake-brief (E0-2: quem é afetado)"
    - "A necessidade vem do rethink_goal (Strategy 2) — necessidade real, não pedido superficial"
    - "O insight vem do reframing — o que o processo revelou que não era óbvio antes"
    - "Deve ser específico o suficiente para guiar ação, genérico o suficiente para não prescrever solução"

  examples:
    good: "Profissionais liberais brasileiros precisam de visibilidade sobre seu pipeline de clientes porque tomam decisões de investimento baseadas em intuição, não em dados — o que gera ciclos de feast-or-famine."
    too_vague: "Empresas precisam melhorar seus processos."
    too_prescriptive: "A equipe precisa implementar um CRM com dashboard de pipeline."
```

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/reframing-analysis.md`

```yaml
output:
  reframing_analysis:
    original_frame:
      statement: "Problema como definido originalmente"
      implicit_solution: "Solução embutida"
      excluded_context: "O que fica de fora"
    alternative_frames:
      - id: "AF1"
        strategy_used: "outside_frame | rethink_goal | bright_spots | mirror | perspective"
        new_statement: "Problema reformulado"
        insight: "O que essa perspectiva revela"
        score:
          abrangencia: 1-5
          acionabilidade: 1-5
          novidade: 1-5
          testabilidade: 1-5
          stakeholder_fit: 1-5
    recommended_frame:
      decision: "maintain | reframe | combine"
      statement: "Frame recomendado para prosseguir o diagnóstico"
      justification: "Razão"
    pov_statement:
      stakeholder: "Quem é o principal afetado"
      need: "Necessidade real (não o pedido superficial)"
      insight: "O que o reframing revelou"
      full_statement: "[stakeholder] precisa de [need] porque [insight]"
    reframing_insights:
      - "Insight relevante que emergiu mesmo se frame não mudou"
```

---

## Acceptance Criteria

- [ ] Frame original documentado com solução implícita identificada
- [ ] Pelo menos 3 das 5 estratégias de reframing aplicadas
- [ ] Cada frame alternativo avaliado nos 5 critérios
- [ ] Recomendação clara: maintain, reframe ou combine
- [ ] Se reframe: novo problem statement documentado
- [ ] POV statement gerado com stakeholder + necessidade real + insight do reframing
- [ ] Insights do reframing registrados mesmo se frame não mudou
- [ ] Meadows Purpose Test aplicado — propósito declarado vs revelado documentado

---

## Veto Conditions

```yaml
veto:
  condition: "Nenhuma — reframing SEMPRE adiciona valor"
  action: "N/A"
  note: "Mesmo quando o frame original é mantido, o processo de questioná-lo fortalece a confiança no diagnóstico"
```

---

## Handoff

```yaml
handoff:
  next_task: deep-diagnosis.md
  executor: "eli-goldratt OR peter-checkland (conforme domain-classification.md)"
  passes:
    - intake-brief.md
    - domain-classification.md
    - cultural-diagnosis.md (if available)
    - assumption-audit.md
    - reframing-analysis.md
  condition: "reframing-analysis.md gerado com recommended_frame definido"
  note: "Se reframe ocorreu, deep-diagnosis usa o NOVO frame, não o original"
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
    condition: "Output de fase anterior contradiz dados novos desta fase (ex: assumption audit refutou pressupostos que o reframing tenta usar)"
    action: "Documentar contradição — não ignorar silenciosamente"
    recovery: "Flaggar como 'data_conflict' no output e recomendar revisão na Phase 8 (stress test)"

  insufficient_data:
    condition: "Dados insuficientes para completar análise com confiança (ex: apenas 1 perspectiva disponível para reframing)"
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
| 1.0.0 | 2026-02-21 | Initial release — 5 reframing strategies, scoring matrix, frame recommendation |
| 1.1.0 | 2026-02-22 | Add Error Handling section — timeout, contradictions, insufficient data, agent degradation |
| 1.2.0 | 2026-03-01 | Add Meadows Purpose Test (Step 3.5), system-dynamics-analysis.md as optional input, viability-assessment.md as optional input |
| 1.3.0 | 2026-03-02 | Add POV Statement generation (Step 4.5) — síntese do frame recomendado em formato stakeholder/necessidade/insight para handoff a squads de design |
