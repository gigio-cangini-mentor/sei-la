# assess-viability.md — Avaliar Viabilidade Organizacional via VSM

## Purpose

Avaliar a viabilidade organizacional do sistema em análise usando o Viable System Model (VSM)
de Stafford Beer. Identifica disfunções estruturais nos 5 sistemas (S1-S5), verifica o equilíbrio
de variedade (Lei de Ashby) e testa viabilidade recursiva em sub-níveis. Esta fase é OPCIONAL —
executa apenas quando o problema envolve organização/negócio e viabilidade organizacional é
relevante para o diagnóstico.

**Agente responsável:** stafford-beer
**Fase:** 1.5 — Viability Assessment (OPCIONAL)
**Framework:** Viable System Model (VSM)

---

## Task Metadata

```yaml
task_id: root-diagnosis/assess-viability
task_name: Assess Organizational Viability
squad: root-diagnosis
type: viability-analysis
status: pending
responsible_executor: stafford-beer
execution_type: Agent
version: "1.0.0"
estimated_duration: "10-20 min"
execution_mode: analytical
optional: true
skip_condition: "Problema puramente técnico, individual ou sem componente organizacional"
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
```

---

## Preconditions

- [ ] intake-brief.md disponível
- [ ] domain-classification.md disponível
- [ ] Agente stafford-beer carregado
- [ ] Problema envolve organização/negócio (validado no intake)

---

## Action Items

### Step 1: Identificar o Sistema em Foco

Determinar qual sistema organizacional será analisado:

```yaml
system_identification:
  questions:
    - "Qual é o sistema em foco? (departamento, empresa, divisão, projeto)"
    - "Qual é o ambiente externo relevante?"
    - "Quais são as fronteiras do sistema?"
  output:
    system_in_focus: "Nome/descrição do sistema"
    environment: "Contexto externo relevante"
    boundaries: "Fronteiras do sistema (o que está dentro vs fora)"
```

### Step 2: Mapear S1-S5 (5 Sistemas VSM)

Diagnosticar cada um dos 5 sistemas do VSM:

```yaml
vsm_mapping:
  S1_operations:
    question: "Quais são as unidades operacionais que fazem o trabalho real?"
    diagnostic:
      - "Listar cada unidade operacional"
      - "Cada unidade é viável por si só? (autônoma o suficiente?)"
      - "Cada unidade tem acesso aos recursos que precisa?"
      - "Há clareza sobre o que cada unidade produz?"
    health_indicators:
      healthy: "Unidades autônomas, produtivas, com recursos adequados"
      unhealthy: "Unidades dependentes, sub-resourced, sem clareza de output"
    assessment: "Funcional / Disfuncional / Parcial"

  S2_coordination:
    question: "Como as unidades operacionais se coordenam entre si?"
    diagnostic:
      - "Existem mecanismos de coordenação entre S1s?"
      - "Conflitos entre unidades são resolvidos ou acumulam?"
      - "Há padrões, protocolos, calendários compartilhados?"
      - "Informação flui entre unidades ou fica em silos?"
    health_indicators:
      healthy: "Conflitos resolvidos, padrões compartilhados, informação fluindo"
      unhealthy: "Silos, conflitos crônicos, duplicação de esforço, desalinhamento"
    assessment: "Funcional / Disfuncional / Parcial"

  S3_optimization:
    question: "Quem otimiza o sistema como um todo? Como recursos são alocados?"
    diagnostic:
      - "Existe controle operacional que vê o todo?"
      - "Recursos são alocados com base em critérios claros?"
      - "Há monitoramento de performance das unidades?"
      - "S3* (auditoria) existe? Verificação independente?"
    health_indicators:
      healthy: "Visão sistêmica, alocação racional, monitoramento ativo"
      unhealthy: "Gestão por crise, alocação política, sem monitoramento"
    assessment: "Funcional / Disfuncional / Parcial"

  S4_intelligence:
    question: "Quem olha para o futuro e para o ambiente externo?"
    diagnostic:
      - "Alguém está monitorando tendências, ameaças, oportunidades?"
      - "Há planejamento estratégico real (não cosmético)?"
      - "S4 se comunica com S3? (futuro dialoga com presente?)"
      - "Há capacidade de adaptação a mudanças externas?"
    health_indicators:
      healthy: "Antecipação ativa, adaptação contínua, diálogo S3-S4"
      unhealthy: "Reativo, cego ao futuro, S3 e S4 desconectados"
    assessment: "Funcional / Disfuncional / Parcial"

  S5_policy:
    question: "Quem define identidade, valores e propósito? Quem arbitra S3 vs S4?"
    diagnostic:
      - "Há clareza de identidade organizacional?"
      - "Quando S3 (otimização) conflita com S4 (inovação), quem decide?"
      - "Valores declarados correspondem a comportamentos observados?"
      - "A organização sabe o que é e o que não é?"
    health_indicators:
      healthy: "Identidade clara, arbitragem S3/S4 funcional, valores vividos"
      unhealthy: "Crise de identidade, conflito S3/S4 não resolvido, valores só no papel"
    assessment: "Funcional / Disfuncional / Parcial"
```

### Step 3: Avaliar Viabilidade de Cada Sistema

```yaml
viability_assessment:
  per_system:
    - system: "S1-S5"
      assessment: "Funcional / Disfuncional / Parcial"
      evidence: "Evidência que sustenta o assessment"
      impact_on_problem: "Como a disfunção deste sistema contribui para o problema"
  overall_viability: "Viável / Ameaçado / Inviável"
```

### Step 4: Verificar Equilíbrio de Variedade (Lei de Ashby)

```yaml
variety_audit:
  principle: "O controlador precisa ter pelo menos tanta variedade quanto o sistema controlado"
  diagnostic:
    - "S3 tem variedade suficiente para gerenciar todos os S1s?"
    - "S5 tem variedade suficiente para arbitrar S3/S4?"
    - "Existem amplificadores de variedade (tecnologia, processos, delegação)?"
    - "Existem atenuadores de variedade (filtros, agregação, simplificação)?"
  assessment:
    variety_balanced: "Controlador tem variedade adequada"
    variety_deficit: "Controlador sub-equipado para a complexidade do sistema"
    variety_excess: "Controlador over-engineered para a simplicidade do sistema"
```

### Step 5: Check Recursivo (Viabilidade em Sub-Níveis)

```yaml
recursion_check:
  principle: "Todo sistema viável contém e está contido em um sistema viável"
  diagnostic:
    - "Cada S1 é viável por si só? (tem seus próprios S1-S5 internos?)"
    - "O sistema como um todo é um S1 de um sistema maior? Qual?"
    - "Onde a viabilidade se quebra em nível recursivo?"
  depth: "Verificar 1 nível abaixo (sub-unidades) e 1 nível acima (meta-sistema)"
```

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/viability-assessment.md`

```yaml
output:
  viability_assessment:
    system_in_focus: "Nome do sistema analisado"
    vsm_mapping:
      S1: { status: "Funcional/Disfuncional/Parcial", evidence: "", impact: "" }
      S2: { status: "Funcional/Disfuncional/Parcial", evidence: "", impact: "" }
      S3: { status: "Funcional/Disfuncional/Parcial", evidence: "", impact: "" }
      S4: { status: "Funcional/Disfuncional/Parcial", evidence: "", impact: "" }
      S5: { status: "Funcional/Disfuncional/Parcial", evidence: "", impact: "" }
    overall_viability: "Viável / Ameaçado / Inviável"
    variety_balance: "Balanced / Deficit / Excess"
    recursion_issues: "Lista de quebras de viabilidade em sub-níveis"
    key_finding: "Principal insight de viabilidade"
    connection_to_diagnosis: "Como viabilidade se conecta ao problema diagnosticado"
```

---

## Quality Gate (QG-RD-VIABILITY)

```yaml
quality_gate:
  id: QG-RD-VIABILITY
  blocking: false
  criteria:
    - "5 sistemas (S1-S5) mapeados com assessment"
    - "Pelo menos 1 disfunção identificada com evidência"
    - "Variedade avaliada (balanced/deficit/excess)"
    - "Recursion check executado (1 nível abaixo)"
  minimum_pass: "3 de 4 critérios atendidos"
  note: "Non-blocking — disfunções de viabilidade enriquecem mas não bloqueiam o diagnóstico"
```

---

## Acceptance Criteria

- [ ] Sistema em foco identificado com fronteiras claras
- [ ] 5 sistemas VSM (S1-S5) mapeados com assessment
- [ ] Variedade avaliada usando Lei de Ashby
- [ ] Check recursivo executado (pelo menos 1 nível)
- [ ] Key finding documentado com conexão ao problema
- [ ] Output salvo em data/{slug}/viability-assessment.md

---

## Veto Conditions

```yaml
veto:
  condition: "Nenhuma — Phase 1.5 é OPCIONAL"
  action: "N/A"
  skip_justification_required: false
  note: |
    Esta fase pode ser pulada sem justificativa formal.
    Recomendada quando o problema envolve organização/negócio.
    Skip automático para problemas puramente técnicos, individuais ou não-organizacionais.
```

---

## Handoff

```yaml
handoff:
  next_task: diagnose-culture.md OR audit-assumptions.md
  executor: "edgar-schein (Phase 2) OR chris-argyris (Phase 3)"
  passes:
    - intake-brief.md
    - domain-classification.md
    - viability-assessment.md
  condition: "viability-assessment.md gerado com 5 sistemas mapeados"
  note: "Se Phase 2 (Schein) for pulada, handoff vai direto para Phase 3 (Argyris)"
```

---

## Error Handling

```yaml
errors:
  phase_timeout:
    threshold: "20 min"
    action: "WARN ao usuário — oferecer simplificar para S1-S3 (operacional) apenas"
    recovery: "Salvar output parcial e documentar S4-S5 como não avaliados"

  not_applicable:
    condition: "Problema não envolve organização/negócio"
    action: "Skip automático — documentar justificativa"
    recovery: "Prosseguir para próxima fase sem viability assessment"

  insufficient_data:
    condition: "Dados insuficientes para mapear todos os 5 sistemas"
    action: "WARN — mapear o que for possível e documentar gaps"
    recovery: "Output parcial é melhor que nenhum output"

  agent_degradation:
    condition: "Agente não consegue aplicar VSM adequadamente"
    action: "Fallback para root-diagnosis-chief com checklist simplificado S1-S5"
    degradation: "Documentar como limitation no relatório final"
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-03-01 | Initial release — 5 action items (System ID, VSM S1-S5, Viability, Variety, Recursion), QG-RD-VIABILITY, error handling |
