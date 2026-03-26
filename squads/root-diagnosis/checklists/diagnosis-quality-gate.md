# Quality Gate — Root Diagnosis

## Proposito

Checklist de validacao de qualidade aplicado ao relatorio diagnostico final (Phase 10).
O Diagnostic Orchestrator executa este quality gate antes de entregar o relatorio ao cliente.
Score minimo para aprovacao: **7.0/10** (conforme `config.yaml`).

---

## Instrucoes de Scoring

- Cada criterio vale **1 ponto** se atendido, **0 pontos** se nao atendido, **0.5 pontos** se parcialmente atendido.
- O score de cada secao e: `(pontos obtidos / pontos possiveis) * peso da secao * 10`
- Score final = soma dos scores ponderados das 4 secoes.
- **Veto conditions** bloqueiam aprovacao independente do score numerico.

---

## A. Completude (peso 30% — 4 criterios)

| # | Criterio | Status | Nota |
|---|---------|--------|------|
| A1 | Todas as fases obrigatorias foram executadas (0, 1, 3, 3.5, 4, 5, 6, 10) | [ ] | Listar fases executadas vs obrigatorias. Fases obrigatorias faltantes = falha automatica (veto condition). Phase 3.5 (System Dynamics) e obrigatoria em modo Full. |
| A2 | Cada fase executada produziu output documentado e salvo em `data/` | [ ] | Verificar existencia de arquivo de output para cada fase concluida. Output vazio ou generico = 0 pontos. |
| A3 | Decision Points (Phase 5, Phase 6) foram justificados com criterios objetivos | [ ] | Verificar: DP1 cita classificacao Cynefin. DP2 cita isolabilidade do problema. Justificativa vaga = 0.5 pontos. |
| A4 | Intake (Phase 0) elicitou contexto suficiente — todas as 13 perguntas de triagem respondidas | [ ] | Verificar se as 13 perguntas foram feitas E respondidas (8 originais + 4 Ulrich + 1 Hollnagel). Respostas genericas ou faltantes = 0.5 pontos. |

**Score A:** ___/4 criterios * 30% = ___/3.0 pontos

---

## B. Rigor Analitico (peso 30% — 7 criterios)

| # | Criterio | Status | Nota |
|---|---------|--------|------|
| B1 | Causas-raiz estao claramente distinguidas de sintomas — nenhum sintoma listado como causa-raiz | [ ] | Para cada causa-raiz, aplicar o teste: "Se removessemos essa causa, o problema desapareceria ou reduziria significativamente?" Se nao, e sintoma. |
| B2 | Cada causa-raiz identificada tem pelo menos 1 evidencia verificavel | [ ] | Evidencia = dado, metrica, observacao factual, testemunho. "Eu acho que..." ou "provavelmente..." NAO e evidencia. |
| B3 | Pressupostos foram explicitados E desafiados (Phase 3 completa) | [ ] | Verificar: lista de pressupostos existe, cada um tem status (validado/refutado/inconclusivo), Ladder of Inference aplicada. |
| B4 | Frame do problema foi testado com pelo menos 1 alternativa (Phase 4 completa) | [ ] | Verificar: frame original documentado, pelo menos 1 frame alternativo explorado, justificativa da escolha final. Frame aceito sem questionamento = 0 pontos. |
| B5 | Cadeia causal e logicamente consistente — cada "porque" conecta ao proximo sem saltos | [ ] | Ler a cadeia de tras pra frente: "X acontece PORQUE Y". Se em algum ponto a conexao nao for logica ou faltar um elo, = 0.5 pontos. Se houver salto grave, = 0 pontos. |
| B6 | Nenhum salto logico nao justificado na analise | [ ] | Verificar: conclusoes seguem das premissas. Correlacao nao apresentada como causalidade. Generalizacoes nao feitas a partir de caso unico. |
| B7 | Cognitive biases auditados — pelo menos 4 de 8 vieses verificados (Kahneman Bias Audit) | [ ] | Phase 8 deve incluir audit de vieses: confirmation, anchoring, availability, sunk cost (minimo). ≥3 vieses detectados sem mitigacao = 0 pontos. Sem audit = 0.5 pontos. |

**Score B:** ___/7 criterios * 30% = ___/3.0 pontos

---

## C. Profundidade (peso 20% — 6 criterios)

| # | Criterio | Status | Nota |
|---|---------|--------|------|
| C1 | Dominio Cynefin classificado com justificativa baseada em indicadores observados | [ ] | Classificacao sem justificativa = 0 pontos. Justificativa generica ("e complexo porque e dificil") = 0.5 pontos. Justificativa com indicadores concretos = 1 ponto. |
| C2 | Problemas adjacentes foram mapeados — lista existe e cada item tem relacao com causa-raiz definida | [ ] | Ausencia total de problemas adjacentes e improvavel em diagnosticos reais. Se nenhum adjacente foi identificado, deve haver justificativa explicita. |
| C3 | Dinamicas ocultas investigadas (Phase 2 executada) OU justificativa documentada para pular | [ ] | Phase 2 pulada sem justificativa = 0 pontos. Pulada com justificativa valida (ex: problema puramente tecnico sem componente cultural) = 0.5 pontos. Executada = 1 ponto. |
| C4 | Stress test executado (Phase 8) OU justificativa documentada para pular | [ ] | Mesma logica de C3. Diagnostico sem stress test e mais fragil, mas aceitavel em modo rapido com justificativa. |
| C5 | Multiplas perspectivas consideradas — pelo menos 2 agentes/frameworks produziram insights distintos | [ ] | Diagnostico baseado em framework unico = 0.5 pontos. Multiplos frameworks convergindo = 1 ponto. |
| C6 | Analise sistemica executada (Phase 3.5) — feedback loops, archetypes e leverage points documentados | [ ] | Phase 3.5 executada com pelo menos 1 feedback loop identificado = 1 ponto. Phase 3.5 pulada com justificativa = 0.5 pontos. Phase 3.5 pulada sem justificativa = 0 pontos. |

**Score C:** ___/6 criterios * 20% = ___/2.0 pontos

---

## D. Acionabilidade (peso 20% — 5 criterios)

| # | Criterio | Status | Nota |
|---|---------|--------|------|
| D1 | Causas-raiz sao especificas e nao genericas — cada causa nomeia algo concreto e delimitado | [ ] | "Falta de comunicacao" = generico (0 pontos). "Ausencia de criterios objetivos no handoff de leads entre marketing e vendas" = especifico (1 ponto). |
| D2 | Recomendacoes sao concretas, priorizadas por horizonte temporal (7d / 30d / 90d+) e atribuidas | [ ] | Recomendacoes vagas ("melhorar a comunicacao") = 0 pontos. Recomendacoes concretas com responsavel sugerido e prazo = 1 ponto. |
| D3 | Criterios de sucesso definidos — como saber se a intervencao funcionou | [ ] | Pelo menos 1 metrica por causa-raiz com baseline e meta. Sem metricas = 0 pontos. Metricas vagas = 0.5 pontos. |
| D4 | Handoff para proximo squad/equipe de execucao e claro — o receptor sabe o que fazer | [ ] | Relatorio termina com "proximos passos" claros. Nao assume que o receptor conhece o diagnostico. Inclui contexto suficiente para agir. |
| D5 | Relatorio e compreensivel para nao-especialistas — sumario executivo nao requer conhecimento tecnico | [ ] | Sumario executivo com jargao sem explicacao = 0.5 pontos. Sumario claro com termos explicados ou evitados = 1 ponto. |

**Score D:** ___/5 criterios * 20% = ___/2.0 pontos

---

## Calculo do Score Final

| Secao | Peso | Criterios | Pontos obtidos | Score ponderado |
|-------|------|-----------|---------------|----------------|
| A. Completude | 30% | 4 | ___/4 | ___/3.0 |
| B. Rigor Analitico | 30% | 7 | ___/7 | ___/3.0 |
| C. Profundidade | 20% | 6 | ___/6 | ___/2.0 |
| D. Acionabilidade | 20% | 5 | ___/5 | ___/2.0 |
| **TOTAL** | **100%** | **22** | — | **___/10.0** |

---

## Classificacao

| Score | Classificacao | Significado | Acao |
|-------|-------------|------------|------|
| 9.0 — 10.0 | **Excelente** | Diagnostico completo, rigoroso, acionavel. Multiplas evidencias convergentes. | Entregar ao cliente. |
| 8.0 — 8.9 | **Bom** | Minor gaps que nao comprometem as conclusoes principais. | Entregar com nota sobre gaps. |
| 7.0 — 7.9 | **Adequado** | Gaps identificados mas conclusoes se sustentam. Score minimo aceitavel. | Entregar com ressalvas documentadas. |
| 6.0 — 6.9 | **Insuficiente** | Gaps significativos. Conclusoes podem nao se sustentar. | Revisar fases com gap antes de entregar. |
| < 6.0 | **Reprovado** | Diagnostico incompleto ou com falhas graves. | Nao entregar. Retornar para fases necessarias. |

---

## Veto Conditions (bloqueiam aprovacao independente do score)

Qualquer uma destas condicoes **bloqueia** a entrega do relatorio, mesmo que o score numerico seja >= 7.0:

| # | Veto condition | Verificacao | Remediacao |
|---|---------------|------------|-----------|
| V1 | Causa-raiz sem evidencia verificavel | Toda causa-raiz no relatorio tem campo "Evidencia" preenchido com dado factual? | Obter evidencia ou rebaixar para "hipotese" (nao causa-raiz). |
| V2 | Fase obrigatoria nao executada sem justificativa | Phases 0, 1, 3, 3.5, 4, 5, 6, 10 — todas constam no relatorio? | Executar a fase faltante ou documentar justificativa formal (raro — exige aprovacao do cliente). |
| V3 | Pressupostos nao auditados (Phase 3 ausente ou vazia) | Phase 3 produziu lista de pressupostos com status? | Executar Phase 3. Pressupostos nao auditados contaminam todo o diagnostico. |
| V4 | Diagnostico contradiz evidencias apresentadas | Conclusoes sao consistentes com os dados mostrados no proprio relatorio? | Resolver a contradicao: ou os dados estao errados, ou a conclusao precisa mudar. |
| V5 | Frame nunca questionado — problema aceito at face value | Phase 4 explorou pelo menos 1 frame alternativo? Ou o frame original foi mantido COM justificativa? | Executar Phase 4. Aceitar o frame sem questionar e o erro diagnostico mais comum. |
| V6 | Problema Complex (Cynefin) sem analise sistemica | Se Cynefin = Complex e Phase 3.5 nao foi executada, diagnostico esta incompleto. | Executar Phase 3.5. Problemas complexos EXIGEM modelagem de feedback loops e system archetypes. |

**Regra:** Se QUALQUER veto condition estiver ativa → **BLOQUEADO**. Resolver antes de entregar.

---

## Protocolo de Aplicacao

### Quando aplicar
- **Obrigatorio:** Antes de entregar qualquer relatorio diagnostico (Phase 10)
- **Opcional:** Mid-process checkpoint apos Phase 6 (para verificar se vale continuar ou precisa corrigir rumo)

### Quem aplica
- **Primario:** Diagnostic Orchestrator (root-diagnosis-chief) — auto-avaliacao
- **Secundario:** Qualquer agente QA externo ao squad, se disponivel

### Como aplicar
1. Carregar o relatorio diagnostico completo
2. Percorrer cada criterio sequencialmente (A1 a D5)
3. Marcar status: [x] atendido, [ ] nao atendido, [~] parcial (0.5)
4. Verificar todas as veto conditions
5. Calcular score final
6. Emitir veredicto

### Output do quality gate

```yaml
quality_gate_result:
  diagnostic_id: "{{diagnostic_id}}"
  date: "{{date}}"
  score: {{score}}/10.0
  classification: "{{classificacao}}"
  veto_conditions_active: {{vetos_list}}
  verdict: "APPROVED | APPROVED_WITH_NOTES | BLOCKED"
  notes: "{{notas}}"
  criteria_details:
    A_completude: {{score_a}}/3.0
    B_rigor: {{score_b}}/3.0
    C_profundidade: {{score_c}}/2.0
    D_acionabilidade: {{score_d}}/2.0
  blocked_by: "{{veto_ids_or_none}}"
  remediation_required: "{{lista_de_remediacoes}}"
```

### Veredictos possiveis

| Veredicto | Condicao | Acao |
|-----------|---------|------|
| **APPROVED** | Score >= 7.0 E zero veto conditions | Entregar relatorio ao cliente |
| **APPROVED_WITH_NOTES** | Score >= 7.0 E zero veto conditions, mas com gaps menores documentados | Entregar com notas sobre limitacoes |
| **BLOCKED** | Score < 7.0 OU qualquer veto condition ativa | Nao entregar. Remediar e re-avaliar. |

---

## Checklist Rapido (para uso em modo quick-diagnosis)

Em diagnostico rapido (8 fases: 0, 1, 3, 3.5, 4, 5, 6, 10), aplicar versao reduzida com criterios minimos:

- [ ] Phase 0 (Intake) executada — 13 perguntas de triagem respondidas e modo Quick confirmado
- [ ] Phase 1 (Cynefin) executada com classificacao justificada
- [ ] Phase 3 (Pressupostos) executada — pelo menos 2 pressupostos auditados
- [ ] Phase 3.5 (System Dynamics) executada — pelo menos 1 feedback loop identificado
- [ ] Phase 4 (Reframing) executada — frame questionado com pelo menos 1 alternativa + Meadows Purpose Test
- [ ] Phase 5 (Deep Diagnosis) executada — metodo selecionado via DP1 com justificativa
- [ ] Phase 6 (RCA) executada — pelo menos 1 causa-raiz com evidencia verificavel
- [ ] Phase 10 (Report) executado — relatorio distingue sintomas de causas-raiz
- [ ] Decision Points DP1 e DP2 documentados com rationale
- [ ] Fases puladas (1.5, 2, 7, 8, 9) documentadas com impacto na confianca
- [ ] Confianca declarada (esperada: 50-70%, menor que diagnostico completo)
- [ ] Limitacoes do quick mode explicitadas no relatorio
- [ ] Proximos passos definidos (incluindo recomendacao de upgrade se aplicavel)
- [ ] Nenhuma veto condition ativa

**Score minimo para quick-diagnosis:** 6.0/10 (tolerancia menor por escopo reduzido, mas com nota explicita de limitacao).

---

*Quality Gate v1.2.0 — Root Diagnosis Squad — Synkra AIOS*
*Referencia: config.yaml > quality > minimum_score: 7.0*
*Fases obrigatorias: 0, 1, 3, 3.5, 4, 5, 6, 10*
*Fases opcionais: 1.5, 2, 7, 8, 9*
*Criterios: 22 (A=4, B=7, C=6, D=5) + 6 veto conditions*
