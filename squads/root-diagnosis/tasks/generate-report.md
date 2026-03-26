# generate-report.md — Compilar Relatório Diagnóstico Final

## Purpose

Compilar todos os outputs das fases anteriores em um relatório diagnóstico final coeso,
legível, didático e acionável. Este é o deliverable principal do squad — o documento que o
solicitante vai usar para tomar decisões.

O relatório DEVE ser acessível a pessoas leigas — sem conhecimento prévio de frameworks
diagnósticos, metodologias de causa-raiz, ou terminologia técnica. Cada conceito deve ser
EXPLICADO antes de ser usado, com analogias e linguagem simples.

### Princípios de Escrita Didática (OBRIGATÓRIOS)

1. **Explique antes de usar:** Todo framework, termo técnico ou conceito deve ter uma explicação
   em linguagem simples ANTES de aparecer nos resultados. Nunca presuma que o leitor conhece
   Cynefin, CRT, SSM, Apollo RCA, PreMortem, etc.

2. **Use analogias:** Cada conceito abstrato deve ter uma analogia concreta. Exemplos:
   - "Causa-raiz é como a raiz de uma árvore — os galhos secos são os sintomas visíveis"
   - "PreMortem é como o checklist de um piloto antes de voar — não é pessimismo, é profissionalismo"
   - "IS/IS NOT é como um detetive comparando onde o crime aconteceu vs onde não aconteceu"

3. **Inclua callouts "Em linguagem simples":** Após cada seção técnica, adicione um parágrafo
   que resuma a conclusão em 2-3 frases que qualquer pessoa entenderia.

4. **Estruture em 4 blocos:** Resumo (5min) → Análise (como chegamos lá) → Ação (o que fazer) → Referência (profundidade)

5. **Guia de leitura no início:** O relatório DEVE começar com uma seção "Como Ler Este Relatório"
   que explica a estrutura, termos-chave, e sugere um caminho rápido de leitura (~10 min).

6. **Glossário acessível:** O glossário no Anexo B deve usar definições em linguagem simples
   com analogias, não definições técnicas enciclopédicas.

7. **Narrativa, não só bullets:** Prefira parágrafos narrativos que contam a história do
   diagnóstico a listas de bullets secos. O leitor deve sentir que está acompanhando uma investigação.

8. **"O que isso significa na prática":** Após cada causa-raiz e recomendação, incluir uma
   frase que traduza o impacto para o dia-a-dia do cliente.

**Agente responsável:** root-diagnosis-chief
**Fase:** 10 — Diagnostic Report
**Template:** diagnostic-report-tmpl.md

---

## Task Metadata

```yaml
task_id: root-diagnosis/generate-report
task_name: Generate Diagnostic Report
squad: root-diagnosis
type: report-generation
status: pending
responsible_executor: root-diagnosis-chief
execution_type: Agent
version: "1.0.0"
estimated_duration: "15-25 min"
execution_mode: compilation
```

---

## Inputs

```yaml
required:
  phase_outputs:
    - source: intake-brief.md
      phase: 0
      required: true
    - source: domain-classification.md
      phase: 1
      required: true
    - source: cultural-diagnosis.md
      phase: 2
      required: false
    - source: assumption-audit.md
      phase: 3
      required: true
    - source: reframing-analysis.md
      phase: 4
      required: true
    - source: deep-diagnosis.md
      phase: 5
      required: true
    - source: root-cause-analysis.md
      phase: 6
      required: true
    - source: evidence-quantification.md
      phase: 7
      required: false
    - source: stress-test.md
      phase: 8
      required: false
    - source: action-package.md
      phase: 9
      required: false
```

---

## Preconditions

- [ ] Fases obrigatórias completadas: 0, 1, 3, 4, 5, 6
- [ ] Nenhum veto ativo não resolvido
- [ ] Agente root-diagnosis-chief carregado
- [ ] Template diagnostic-report-tmpl.md disponível

---

## Action Items

### Step 1: Verify Completeness

Antes de compilar, verificar:

```yaml
completeness_check:
  required_phases:
    - phase: 0 (Intake)
      status: "complete | missing"
    - phase: 1 (Domain Classification)
      status: "complete | missing"
    - phase: 3 (Assumption Audit)
      status: "complete | missing"
    - phase: 4 (Reframing)
      status: "complete | missing"
    - phase: 5 (Deep Diagnosis)
      status: "complete | missing"
    - phase: 6 (Root Cause Analysis)
      status: "complete | missing"
  optional_phases:
    - phase: 2 (Cultural Diagnosis)
      status: "complete | skipped | missing"
    - phase: 7 (Evidence Quantification)
      status: "complete | skipped | missing"
    - phase: 8 (Stress Test)
      status: "complete | skipped | missing"
    - phase: 9 (Action Package)
      status: "complete | skipped | missing"
  gate: "Todas required phases devem ser complete. Se alguma missing → HALT"
```

### Step 2: Compile Executive Summary

```yaml
executive_summary:
  structure:
    problem: "O problema em 2-3 frases (usando o frame recomendado)"
    root_causes: "Top 3 causas-raiz em linguagem executiva"
    confidence: "Nível de confiança geral do diagnóstico"
    key_insight: "O insight mais importante que emergiu"
    recommended_action: "Próximo passo imediato"
  rules:
    - "Máximo 1 página"
    - "Linguagem de decisor, não de analista"
    - "Zero jargão de frameworks — se usar um termo técnico, explicar entre parênteses"
    - "Números concretos quando disponíveis"
    - "Incluir parágrafo 'O que isso significa na prática' ao final"
    - "Tom: contar uma história, não listar fatos"
```

### Step 3: Show Problem Evolution

Documentar como o entendimento do problema evoluiu ao longo do diagnóstico:

```yaml
problem_evolution:
  initial_statement: "Como o problema foi descrito no intake"
  after_cynefin: "Como foi classificado (domínio)"
  after_cultural: "O que o diagnóstico cultural revelou"
  after_assumptions: "Que pressupostos foram derrubados"
  after_reframing: "Se/como o frame mudou"
  after_deep_diagnosis: "Cadeia causal ou sistema identificado"
  after_rca: "Causas-raiz verificadas"
  after_stress_test: "Amendments ou caveats"
  final_understanding: "O que realmente está acontecendo (síntese)"
```

### Step 4: Compile Root Causes with Evidence

Para cada causa-raiz verificada:

```yaml
root_cause_entry:
  id: "VRC-X"
  statement: "Causa-raiz em linguagem clara"
  evidence:
    - "Evidência 1 (com fonte/fase)"
    - "Evidência 2"
  confidence: "High | Medium | Low"
  confidence_interval: "90% CI se disponível"
  priority: "Critical | High | Medium | Low"
  pov_statement: "POV derivado do reframing (stakeholder + necessidade + insight)"
  hmw_statement: "How Might We associado"
  recommended_action: "Ação recomendada"
```

### Step 5: Map Adjacent Problems

Problemas que não são a causa-raiz mas que emergiram durante o diagnóstico:

```yaml
adjacent_problems:
  - problem: "Descrição do problema adjacente"
    discovered_in_phase: N
    severity: "High | Medium | Low"
    relationship: "Causa do problema principal | Efeito | Independente mas correlacionado"
    recommendation: "Investigar separadamente | Monitorar | Ignorar por ora"
```

### Step 6: Include Diagnostic Metadata

```yaml
diagnostic_metadata:
  diagnostic_id: "DIAG-{timestamp}"
  depth: "Quick | Full | Deep"
  total_duration: "X horas"
  phases_executed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  phases_skipped: []
  agents_used: []
  frameworks_applied: []
  overall_confidence: "High | Medium | Low"
  known_limitations:
    - "Limitação 1 (ex: cultural diagnosis não realizado)"
    - "Limitação 2 (ex: dados quantitativos insuficientes)"
  methodology: "Root Diagnosis Squad — Multi-framework sequential analysis"
```

### Step 7: Generate Final Report

Compilar usando template `diagnostic-report-tmpl.md`:

```markdown
# Diagnostic Report — {problem_name}
## {date} | Depth: {Quick/Full/Deep} | Confidence: {High/Medium/Low}

---

### Executive Summary
{executive_summary}

---

### Problem Evolution
{problem_evolution — initial → final}

---

### Domain Classification
{Cynefin domain + reasoning}

---

### Root Causes (Verified)
{For each: statement + evidence + confidence + priority}

---

### Adjacent Problems
{Table of adjacent problems discovered}

---

### Recommendations
#### Immediate (This Week)
{actions}
#### Short-Term (30 Days)
{actions}
#### Medium-Term (90 Days)
{actions}

---

### Point of View (POV)
{POV statement derivado do reframing — stakeholder + necessidade + insight}

### How Might We Statements
{Prioritized HMW list for execution}

### Próximos Squads Recomendados
{Squads sugeridos para continuidade, vinculados às causas-raiz — de action-package.md}

---

### Confidence & Limitations
{Overall confidence, known limitations, what we still don't know}

---

### Diagnostic Metadata
{ID, duration, phases, agents, frameworks}

---

### Appendices
A. Detailed Phase Outputs
B. Assumption Audit Results
C. Stress Test Results
D. Evidence Quantification
```

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/diagnostic-report-final.md`

```yaml
output:
  diagnostic_report:
    executive_summary: "1-page executive summary"
    problem_evolution: "How understanding evolved across phases"
    domain_classification: "Cynefin domain + routing"
    verified_root_causes: []
    adjacent_problems: []
    recommendations:
      immediate: []
      short_term: []
      medium_term: []
    pov_statement: "POV derivado do reframing"
    hmw_statements: []
    recommended_next_squads: []
    confidence_and_limitations: {}
    diagnostic_metadata: {}
    appendices:
      - "Phase outputs completos para referência"
```

---

## Acceptance Criteria

- [ ] Executive summary com máximo 1 página
- [ ] Problem evolution mostra a jornada do entendimento
- [ ] Todas as causas-raiz verificadas listadas com evidência
- [ ] POV statement presente (derivado do reframing-analysis.md)
- [ ] Próximos squads recomendados com justificativa vinculada às causas-raiz (se action-package.md disponível)
- [ ] Recomendações com 3 horizontes (imediato / 30d / 90d)
- [ ] Confiança geral e limitações documentadas
- [ ] Metadata completo (ID, duration, phases, agents)
- [ ] Relatório é legível por não-especialista (zero jargão de framework sem explicação)
- [ ] Seção "Como Ler Este Relatório" presente no início com guia de leitura e termos-chave
- [ ] Cada seção técnica tem callout "Em linguagem simples" ou explicação prévia do conceito
- [ ] Glossário do Anexo B usa linguagem simples com analogias (não definições enciclopédicas)
- [ ] Estrutura em 4 blocos: Resumo → Análise → Ação → Referência
- [ ] Analogias concretas usadas para cada framework/conceito abstrato
- [ ] Relatório conta uma história narrativa, não apenas lista outputs

---

## Quality Gate

```yaml
quality_gate:
  required:
    - "Todas as fases obrigatórias completadas"
    - "Nenhum veto ativo não resolvido"
    - "Pelo menos 1 causa-raiz verificada"
    - "Recomendações concretas com responsável e timeline"
  recommended:
    - "Stress test executado com PASS"
    - "Evidence quantification com 90% CI"
    - "Cultural diagnosis incluído"
    - "Challenge map com 3 níveis"
  gate_decision: "RELEASE | HOLD | REVISE"
```

---

## Veto Conditions

```yaml
veto:
  condition: "Fases obrigatórias incompletas ou vetos não resolvidos"
  action: "HOLD — Não gerar relatório final até resolver"
  recovery: "Completar fases pendentes ou resolver vetos"
  message: "Relatório não pode ser gerado — fases obrigatórias pendentes: {lista}"
```

---

## Handoff

```yaml
handoff:
  next_task: null
  delivers_to: "Solicitante do diagnóstico"
  passes:
    - diagnostic-report-final.md
  post_delivery:
    - "Disponibilizar para squads de execução (se aplicável)"
    - "Registrar diagnóstico no histórico do squad"
    - "Arquivar outputs intermediários em data/{problem-slug}/"
```

---

## Error Handling

```yaml
errors:
  phase_timeout:
    threshold: "20 min para compilacao do relatorio"
    action: "WARN ao usuario — relatorio pode ser simplificado"
    recovery: "Gerar versao resumida com executive summary + causas-raiz + recomendacoes. Marcar como 'simplified_report'"

  missing_phase_outputs:
    condition: "Output de fase obrigatoria nao encontrado em data/{problem-slug}/"
    action: "HALT — identificar fase faltante e notificar"
    recovery: "Se fase obrigatoria (0,1,3,4,5,6): retornar para execucao. Se opcional (2,7,8,9): documentar como 'fase pulada' com impacto"

  template_rendering_failure:
    condition: "Template diagnostic-report-tmpl.md nao pode ser renderizado"
    action: "Fallback para formato livre seguindo estrutura do template"
    degradation: "Relatorio pode ter formatacao inconsistente — documentar como limitation"

  contradictory_outputs:
    condition: "Outputs de fases diferentes se contradizem (ex: Phase 5 aponta causa X, Phase 6 refuta)"
    action: "Documentar contradicao na secao 'Convergencia entre Agentes'"
    recovery: "Nao resolver — apresentar ambas perspectivas com evidencias. Deixar o stakeholder decidir."

  quality_gate_failure:
    condition: "Score do quality gate < 7.0"
    action: "HOLD — nao entregar. Identificar secoes com score baixo"
    recovery: "Retornar para fases com gaps e completar antes de re-compilar"
    max_retries: 2
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-21 | Initial release — Full report compilation with quality gate |
| 1.1.0 | 2026-02-22 | Added Error Handling section with 5 error scenarios |
| 1.2.0 | 2026-02-27 | Major upgrade: didactic writing principles, 4-block structure, reading guide, analogies, plain-language callouts, expanded glossary, narrative style |
| 1.3.0 | 2026-03-02 | Add POV statement, recommended_next_squads ao relatório. POV derivado do reframing, squads vinculados às causas-raiz |
