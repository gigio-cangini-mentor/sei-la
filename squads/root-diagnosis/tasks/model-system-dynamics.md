# model-system-dynamics.md — Modelar Dinâmicas Sistêmicas do Problema

## Purpose

Mapear as dinâmicas sistêmicas subjacentes ao problema usando Causal Loop Diagrams, System
Archetypes, Iceberg Model e Meadows Leverage Points. Esta fase revela feedback loops, delays
e padrões estruturais que perpetuam o problema — causas que análises lineares (CRT, IS/IS NOT)
não capturam. Essencial para problemas classificados como Complex no Cynefin.

**Agente responsável:** peter-senge
**Fase:** 3.5 — System Dynamics Diagnostic
**Framework:** System Dynamics (CLDs, Archetypes, Iceberg, Meadows)

---

## Task Metadata

```yaml
task_id: root-diagnosis/model-system-dynamics
task_name: Model System Dynamics
squad: root-diagnosis
type: systems-analysis
status: pending
responsible_executor: peter-senge
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
  viability_assessment:
    field: "Avaliação de viabilidade organizacional"
    format: markdown
    source: tasks/assess-viability.md → viability-assessment.md
    required: false
    note: "Disponível quando Phase 1.5 (Beer) foi executada — enriquece com structural insights"

  cultural_diagnosis:
    field: "Diagnóstico cultural"
    format: markdown
    source: tasks/diagnose-culture.md → cultural-diagnosis.md
    required: false
```

---

## Preconditions

- [ ] intake-brief.md disponível
- [ ] domain-classification.md disponível
- [ ] assumption-audit.md disponível
- [ ] Agente peter-senge carregado

---

## Action Items

### Step 1: Iceberg Model — 4 Níveis de Profundidade

Aplicar o Iceberg Model para decompor o problema em 4 níveis:

```yaml
iceberg_model:
  level_1_events:
    question: "O que aconteceu? Quais são os eventos visíveis?"
    output: "Lista de eventos observáveis (sintomas, incidentes, queixas)"
    note: "Isso é o que as pessoas REPORTAM. Não parar aqui."

  level_2_patterns:
    question: "Isso já aconteceu antes? Qual é o padrão ao longo do tempo?"
    output: "Tendências, ciclos, padrões recorrentes"
    tool: "Behavior Over Time (BOT) graphs"
    note: "Padrões revelam que o evento não é acidente — é tendência."

  level_3_structures:
    question: "Que estruturas (processos, incentivos, regras, fluxos) geram esses padrões?"
    output: "Estruturas sistêmicas: feedback loops, delays, constraints, incentivos"
    note: "AQUI mora a causa real. Estruturas geram padrões que geram eventos."

  level_4_mental_models:
    question: "Que crenças, valores e pressupostos sustentam essas estruturas?"
    output: "Mental models dos stakeholders que mantêm as estruturas intactas"
    note: "Mudança mais profunda e mais difícil. Conecta com Phase 3 (Argyris)."
```

### Step 2: Causal Loop Diagram (CLD)

Mapear loops de feedback que perpetuam o problema:

```yaml
causal_loop_diagram:
  process:
    - "Identificar variáveis-chave do sistema (5-15 variáveis)"
    - "Mapear relações causais entre variáveis (+ ou -)"
    - "Identificar loops de Reforço (R) — ciclos viciosos/virtuosos"
    - "Identificar loops de Balanceamento (B) — mecanismos de estabilização"
    - "Identificar delays — onde há defasagem entre causa e efeito"

  notation:
    reinforcing_loop: "R — Loop de reforço: A↑ → B↑ → A↑ (ciclo vicioso/virtuoso)"
    balancing_loop: "B — Loop de balanceamento: A↑ → B↑ → A↓ (homeostase)"
    positive_link: "+ — Mais de A leva a mais de B (mesma direção)"
    negative_link: "- — Mais de A leva a menos de B (direção oposta)"
    delay: "|| — Delay entre causa e efeito (perigoso — mascara feedback)"

  output_format: |
    ## Causal Loop Diagram

    ### Variáveis-chave
    1. {variável} — {descrição breve}
    ...

    ### Loops identificados
    **R1: {nome do loop}** — {descrição do ciclo}
    {variável_a} →(+) {variável_b} →(+) {variável_c} →(+) {variável_a}

    **B1: {nome do loop}** — {descrição do mecanismo}
    {variável_x} →(+) {variável_y} →(-) {variável_x}

    ### Delays críticos
    - {delay_1}: {onde} — {tempo estimado} — {por que é perigoso}

  minimum_requirement: "≥1 feedback loop identificado (R ou B)"
```

### Step 3: System Archetype Detection

Verificar se o problema segue algum dos 9 arquétipos sistêmicos clássicos:

```yaml
system_archetypes:
  archetypes:
    - name: "Fixes that Fail"
      pattern: "Solução rápida que gera efeito colateral que piora o problema original"
      diagnostic_question: "A solução anterior criou novos problemas?"
      example: "Cortar custos → qualidade cai → clientes saem → receita cai → cortar mais custos"

    - name: "Shifting the Burden"
      pattern: "Solução sintomática que enfraquece a capacidade de resolver a causa real"
      diagnostic_question: "Há uma solução 'paliativa' que impede a solução fundamental?"
      example: "Consultor resolve → equipe não aprende → mais dependência de consultor"

    - name: "Limits to Growth"
      pattern: "Crescimento que encontra limite não-óbvio"
      diagnostic_question: "O que antes funcionava parou de funcionar? Qual é o limite?"
      example: "Vendas crescem → suporte não acompanha → NPS cai → crescimento estagna"

    - name: "Eroding Goals"
      pattern: "Meta gradualmente reduzida quando gap entre realidade e meta persiste"
      diagnostic_question: "As metas foram ajustadas para baixo ao longo do tempo?"
      example: "Meta 100 → real 70 → 'ajustamos para 80' → real 60 → 'ajustamos para 70'"

    - name: "Escalation"
      pattern: "Dois lados competindo, cada um escalando em resposta ao outro"
      diagnostic_question: "Há uma competição onde cada lado reage ao outro?"
      example: "Desconto de A → desconto de B → desconto maior de A → guerra de preços"

    - name: "Success to the Successful"
      pattern: "Quem tem mais, recebe mais — feedback loop de desigualdade"
      diagnostic_question: "Recursos estão sendo alocados proporcionalmente ao sucesso passado?"
      example: "Área A performa bem → recebe mais investimento → performa melhor → Área B definha"

    - name: "Tragedy of the Commons"
      pattern: "Recurso compartilhado explorado individualmente até colapsar"
      diagnostic_question: "Há um recurso compartilhado sendo sobre-utilizado?"
      example: "Todos usam o suporte técnico → suporte sobrecarregado → ninguém recebe ajuda"

    - name: "Growth and Underinvestment"
      pattern: "Crescimento exige investimento em capacidade, mas investimento é adiado"
      diagnostic_question: "O crescimento está sendo suportado por investimento proporcional?"
      example: "Clientes crescem → não contrata → qualidade cai → clientes saem"

    - name: "Accidental Adversaries"
      pattern: "Parceiros que se tornam adversários por ações bem-intencionadas"
      diagnostic_question: "Há partes que deveriam colaborar mas estão em conflito?"
      example: "Marketing promete → produto não entrega → culpa mútua → silos"

  output: |
    ## Archetype Detection

    **Archetype identificado:** {nome}
    **Padrão observado:** {como o padrão se manifesta no problema}
    **Evidência:** {dados que confirmam o padrão}
    **Implicação:** {o que isso muda no diagnóstico}
    **Archetype NÃO presente:** {arquétipos testados e descartados}
```

### Step 4: Delay Mapping

Mapear delays que mascaram feedback:

```yaml
delay_mapping:
  purpose: "Delays são onde a maioria dos problemas se esconde — efeitos aparecem longe da causa"
  process:
    - "Para cada loop do CLD, identificar onde há delay"
    - "Estimar magnitude do delay (horas, dias, semanas, meses, anos)"
    - "Avaliar impacto: quanto mais longo o delay, mais perigoso"
    - "Mapear: decisões de hoje cujos efeitos só aparecem em X meses"
  output: "Lista de delays com localização, magnitude e perigo"
```

### Step 5: Meadows 12 Leverage Points

Classificar pontos de alavancagem usando a hierarquia de Donella Meadows:

```yaml
meadows_leverage_points:
  purpose: "Identificar ONDE intervir no sistema com máximo impacto"
  hierarchy: |
    Listados do MENOS eficaz ao MAIS eficaz (contra-intuitivo mas correto):

    12. Constantes, parâmetros, números (ex: ajustar preço)
    11. Tamanho de buffers e estoques estabilizadores
    10. Estrutura de estoques e fluxos materiais
     9. Duração dos delays em relação às taxas de mudança
     8. Força dos loops de balanceamento (feedback negativo)
     7. Força dos loops de reforço (feedback positivo)
     6. Estrutura dos fluxos de informação
     5. Regras do sistema (incentivos, punições, restrições)
     4. Poder de adicionar, mudar, ou auto-organizar a estrutura
     3. Objetivos do sistema
     2. Mindset ou paradigma que originou o sistema
     1. Poder de transcender paradigmas

  diagnostic_application:
    - "Para cada causa-raiz candidata, classificar: em que nível de leverage ela opera?"
    - "Intervenções nos níveis 12-9 são fáceis mas pouco eficazes"
    - "Intervenções nos níveis 6-4 são moderadas e moderadamente eficazes"
    - "Intervenções nos níveis 3-1 são difíceis mas transformadoras"
    - "Priorizar leverage points mais altos quando viável"

  output: |
    ## Leverage Points Analysis

    | Causa/Intervenção | Nível Meadows | Eficácia Esperada | Viabilidade |
    |-------------------|---------------|-------------------|-------------|
    | {causa_1} | {nível} | {alta/média/baixa} | {alta/média/baixa} |
```

### Step 6: Behavior Over Time (BOT)

Traçar gráficos de comportamento temporal:

```yaml
behavior_over_time:
  purpose: "Visualizar tendências e padrões que confirmam/contradizem a análise"
  process:
    - "Para cada variável-chave do CLD, traçar evolução ao longo do tempo"
    - "Identificar: crescimento, declínio, oscilação, estagnação, colapso"
    - "Correlacionar padrões entre variáveis (covariação temporal)"
    - "Projetar: se nada mudar, para onde vai?"
  output: "BOT graphs (ASCII ou descritivos) + interpretação de cada padrão"
  visualization_tools:
    antv_chart_mcp:
      line_chart: "mcp__antv-chart__bindLine — tendências de variáveis ao longo do tempo"
      dual_axes: "mcp__antv-chart__bindDualAxes — correlação temporal entre 2 variáveis"
      area_chart: "mcp__antv-chart__bindArea — variação acumulada"
      network: "mcp__antv-chart__bindNetworkGraph — visualizar CLDs como grafos"
      fishbone: "mcp__antv-chart__bindFishbone — diagrama causa-efeito (complemento ao CLD)"
      note: "Usar AntV para gerar visualizações rápidas dos BOT graphs e CLDs como imagens"
```

---

## Output

**Arquivo:** `squads/root-diagnosis/data/{problem-slug}/system-dynamics-analysis.md`

```yaml
output:
  system_dynamics_analysis:
    iceberg_model:
      events: "Eventos visíveis"
      patterns: "Padrões identificados"
      structures: "Estruturas que geram os padrões"
      mental_models: "Crenças que sustentam as estruturas"

    causal_loops:
      reinforcing_loops:
        - id: "R1"
          name: "Nome do loop"
          variables: ["var1", "var2", "var3"]
          description: "Como o loop funciona"
      balancing_loops:
        - id: "B1"
          name: "Nome do loop"
          variables: ["var1", "var2"]
          description: "Como o mecanismo funciona"
      delays:
        - location: "Entre var_x e var_y"
          magnitude: "Estimativa de tempo"
          danger_level: "Alto/Médio/Baixo"

    archetype_detected:
      name: "Nome do archetype"
      evidence: "Evidência que confirma o padrão"
      implication: "O que muda no diagnóstico"

    leverage_points:
      - cause: "Causa/intervenção"
        meadows_level: 1-12
        efficacy: "Alta/Média/Baixa"
        feasibility: "Alta/Média/Baixa"

    behavior_over_time:
      key_variables:
        - variable: "Nome"
          trend: "Crescimento/Declínio/Oscilação/Estagnação"
          projection: "Projeção se nada mudar"

    synthesis:
      key_insight: "Principal insight sistêmico"
      dominant_dynamic: "A dinâmica que mais explica o problema"
      highest_leverage: "Ponto de maior alavancagem identificado"
      connection_to_rca: "Como isso alimenta o diagnóstico de causa-raiz (Phases 5-6)"
```

---

## Quality Gate (QG-RD-SYSTEMS)

```yaml
quality_gate:
  id: QG-RD-SYSTEMS
  blocking: true
  criteria:
    - "Iceberg Model completo com 4 níveis documentados"
    - "Pelo menos 1 feedback loop identificado (R ou B)"
    - "Pelo menos 1 archetype testado (mesmo se descartado)"
    - "Leverage points classificados usando hierarquia Meadows"
    - "Síntese com key insight e conexão com próximas fases"
  minimum_pass: "4 de 5 critérios atendidos"
```

---

## Acceptance Criteria

- [ ] Iceberg Model completo com 4 níveis
- [ ] Pelo menos 1 feedback loop (R ou B) identificado com variáveis
- [ ] Pelo menos 1 archetype sistêmico testado
- [ ] Delays mapeados (se identificados)
- [ ] Leverage points classificados com nível Meadows
- [ ] Síntese conecta dinâmicas sistêmicas ao diagnóstico de causa-raiz
- [ ] Output salvo em data/{slug}/system-dynamics-analysis.md

---

## Veto Conditions

```yaml
veto:
  condition: "Nenhuma — Phase 3.5 é obrigatória mas seus outputs enriquecem, não bloqueiam"
  action: "N/A"
  note: |
    Se Phase 3.5 não identificar loops ou archetypes, documentar a ausência.
    Um sistema sem feedback loops visíveis pode ser genuinamente linear (Complicated),
    o que valida a classificação Cynefin e direciona para CRT na Phase 5.
```

---

## Handoff

```yaml
handoff:
  next_task: reframe-problem.md
  executor: "thomas-wedell-wedellsborg"
  passes:
    - intake-brief.md
    - domain-classification.md
    - cultural-diagnosis.md (if available)
    - viability-assessment.md (if available)
    - assumption-audit.md
    - system-dynamics-analysis.md
  condition: "system-dynamics-analysis.md gerado com pelo menos 1 feedback loop OU ausência documentada"
  note: "Wedell-Wedellsborg agora recebe dinâmicas sistêmicas como input para reframing mais rico"
```

---

## Error Handling

```yaml
errors:
  phase_timeout:
    threshold: "25 min"
    action: "WARN ao usuário — oferecer simplificar para Iceberg + 1 CLD"
    recovery: "Salvar output parcial e documentar o que foi completado"

  no_loops_found:
    condition: "Nenhum feedback loop identificado após análise"
    action: "Documentar como 'sistema aparentemente linear' — validar com Cynefin"
    recovery: "Se Cynefin = Complex, re-examinar com mais profundidade. Se Complicated, aceitar."

  insufficient_data:
    condition: "Dados insuficientes para construir CLD"
    action: "WARN — aplicar Iceberg Model (requer menos dados) e documentar gaps"
    recovery: "Prosseguir com confidence=Low e flag para Phase 7 (quantificação)"

  agent_degradation:
    condition: "Agente não consegue aplicar frameworks adequadamente"
    action: "Fallback para root-diagnosis-chief com Iceberg Model simplificado"
    degradation: "Documentar como limitation no relatório final"
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-03-01 | Initial release — 6 action items (Iceberg, CLD, Archetypes, Delays, Leverage, BOT), QG-RD-SYSTEMS, error handling |
