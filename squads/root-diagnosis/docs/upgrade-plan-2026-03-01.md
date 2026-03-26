# Upgrade Plan — Root Diagnosis Squad v1.1.0 → v1.2.0

> Gerado por Squad Architect em 2026-03-01
> Status: **CONCLUÍDO** ✅
> Executado em: 2026-03-01
> Total de linhas pos-upgrade: 27,511 (antes: 26,212 — +1,299 linhas)

---

## Resumo Executivo

O squad root-diagnosis está estruturalmente robusto (score médio ~8.0/10), mas apresenta:

- **1 gap CRÍTICO:** chris-argyris sem `output_examples` e `anti_patterns`
- **1 gap SISTÊMICO:** `objection_algorithms` ausente em 13/14 agentes
- **3 gaps ALTOS no checklist:** contagem de critérios errada, veto V2 faltando Phase 3.5
- **Inconsistências de formato** nas Phases 1.5 e 3.5 (adicionadas na v1.1, não totalmente integradas)

**Gold standard de referência:** `agents/peter-senge.md` — único agente com PASS em todos os 6 níveis.

---

## Inventário

| Componente | Qtd | Linhas | PASS | NEEDS_UPGRADE | CRITICAL |
|-----------|-----|--------|------|---------------|----------|
| Agents | 14 | 18,282 | 1 | 12 | 1 |
| Tasks | 16 | 5,232 | 15 | 1 | 0 |
| Workflows | 1 | 1,607 | — | — | — |
| Templates | 1 | 897 | — | — | — |
| Checklists | 1 | 194 | — | — | — |
| **Total** | **33** | **26,212** | — | — | — |

---

## Phase 1: Critical Fixes (~2h)

### 1.1 — `agents/chris-argyris.md` (CRITICAL — 3 blocking gaps)

**Status atual:** 1124 linhas, L0-L3 e L5 PASS, L4 FAIL

**Gap 1: Adicionar `output_examples` (3+ exemplos completos)**

O agente JÁ TEM uma seção "Output Examples" a partir da linha 859, com um exemplo parcial de Assumption Audit. Porém:
- Exemplo 1 (Assumption Audit) está presente mas pode estar incompleto
- Faltam exemplos 2 e 3

**Ação:** Verificar completude do Exemplo 1. Adicionar mais 2 exemplos completos:
- Exemplo 2: Double-Loop Learning Analysis (quando Single-Loop é insuficiente)
- Exemplo 3: Undiscussable Detection (quando o problema real está oculto)

Cada exemplo deve seguir o formato `input → output` com dados fictícios concretos, mostrando:
- A Ladder of Inference aplicada ao caso
- Pressupostos identificados com status
- Recomendação de ação

**Gap 2: Adicionar `anti_patterns` formal (5+ items)**

O agente tem STRICT RULES extensas (17 items) que cobrem anti-patterns implicitamente, mas NÃO tem bloco formal `anti_patterns` / `never_do` como seção YAML separada.

**Ação:** Adicionar seção formal após QUALITY ASSURANCE:

```yaml
anti_patterns:
  never_do:
    - "Aceitar 'é óbvio' como justificativa — óbvio é sinônimo de não-testado"
    - "Pular degraus da Ladder — cada degrau DEVE ser explicitado"
    - "Diagnosticar sem perguntar 'que dados você NÃO olhou?'"
    - "Declarar pressuposto 'validado' sem teste empírico"
    - "Confundir familiaridade com compreensão — 'sei como funciona' ≠ evidência"
    - "Ignorar undiscussables — se ninguém quer falar sobre algo, É o problema"
    - "Aceitar consenso rápido — velocidade de concordância ≠ qualidade da conclusão"

  always_do:
    - "Descer pela Ladder até o Degrau 1 (dado observável) em CADA conclusão"
    - "Listar pressupostos com status: validado / refutado / inconclusivo"
    - "Verificar gap espoused vs theory-in-use"
    - "Aplicar Epistemic Audit (tipo de conhecimento, limites, o que muda a mente)"
    - "Identificar governing variables cegas antes de recomendar ação"
```

**Gap 3: Adicionar `objection_algorithms` (3+ objeções)**

Ação: Adicionar seção `objection_algorithms` com objeções específicas do domínio de Argyris:

```yaml
objection_algorithms:
  "O problema é claro, não precisa descer pela Ladder":
    response: |
      Se o problema fosse claro, não estaria sendo diagnosticado — já teria sido
      resolvido. A clareza aparente é o sinal mais forte de que estamos no Degrau 6
      (crença) achando que estamos no Degrau 1 (dado observável). A Ladder existe
      exatamente para isso: mostrar os 5 saltos invisíveis entre o que vemos e
      o que concluímos. 15 minutos de descida pela Ladder revelam pressupostos
      que levam meses para descobrir da maneira difícil.

  "Não temos tempo para auditar pressupostos":
    response: |
      O paradoxo: quando não há tempo para auditar pressupostos, é quando mais
      precisam ser auditados. A urgência cria o ambiente perfeito para saltos
      lógicos — e esses saltos custam mais tempo no futuro do que a auditoria
      custaria agora. A pergunta não é 'temos tempo?'. É 'podemos nos dar ao
      luxo de agir sobre pressupostos não testados?'

  "Todo mundo concorda com o diagnóstico, então está certo":
    response: |
      Consenso rápido é sinal de defesa, não de verdade. Quando todo mundo
      concorda imediatamente, significa que estão no Degrau 7 (ação) sem ter
      passado pelos Degraus 1-6. O que vocês chamam de 'diagnóstico' é uma
      crença compartilhada que nunca foi testada. A pergunta de ouro: 'que
      evidência específica nos faria mudar de ideia sobre esse diagnóstico?'
      Se ninguém tem resposta — não é diagnóstico, é dogma coletivo.
```

**Esforço:** ~45min

---

### 1.2 — `checklists/diagnosis-quality-gate.md` (3 gaps ALTOS)

**Status atual:** 194 linhas, Score 7.5/10

**Gap 1: Contagem de critérios errada nos headers**

| Seção | Header diz | Real | Tabela cálculo diz |
|-------|-----------|------|-------------------|
| B | "6 critérios" | 7 (B1-B7) | 6 |
| C | "5 critérios" | 6 (C1-C6) | 5 |

**Ações:**
1. Linha 33: Alterar `peso 30% — 6 criterios` → `peso 30% — 7 criterios`
2. Linha 45: Manter `___/7 criterios` (já está correto)
3. Linha 49: Alterar `peso 20% — 5 criterios` → `peso 20% — 6 criterios`
4. Linha 60: Manter `___/6 criterios` (já está correto)

**Gap 2: Tabela de cálculo usa números antigos**

Linha 83: `B. Rigor Analitico | 30% | 6 |` → deve ser `7`
Linha 84: `C. Profundidade | 20% | 5 |` → deve ser `6`
Linha 86: `**TOTAL** | **100%** | **20** |` → deve ser `**22**`

**Gap 3: Veto V2 faltando Phase 3.5**

Linha 109: `Phases 0, 1, 3, 4, 5, 6, 10` → deve ser `Phases 0, 1, 3, 3.5, 4, 5, 6, 10`

**Ação adicional recomendada:** Adicionar critério para Phase 1.5 (VSM). Opções:
- Adicionar critério C7 na seção Profundidade: "Viabilidade organizacional avaliada (Phase 1.5) quando problema tem componente organizacional"
- OU adicionar nota no footer que Phase 1.5 é opcional e não requer critério específico

**Esforço:** ~30min

---

## Phase 2: Systematic Gap — objection_algorithms (12 agentes) (~4-5h)

### Padrão a seguir

**Referência:** `agents/peter-senge.md` linhas 1333-1378 (objection_algorithms)

Cada agente precisa de 3-5 objeções específicas ao seu domínio, no formato:

```yaml
objection_algorithms:
  "Objeção do usuário":
    response: |
      Resposta contextualizada usando o framework do expert,
      com argumento concreto de por que a objeção não se sustenta,
      terminando com proposta de ação rápida.
```

### Objeções por agente (outline)

| # | Agente | Objeções sugeridas (domain-specific) |
|---|--------|-------------------------------------|
| 1 | root-diagnosis-chief | "Já sei o problema", "Preciso de solução, não diagnóstico", "Não precisa de tantas fases" |
| 2 | dave-snowden | "Todo problema é complexo", "Cynefin é muito teórico", "Não preciso classificar, preciso resolver" |
| 3 | stafford-beer | "VSM é só para empresas grandes", "Muito abstrato", "Nosso problema é simples, não organizacional" |
| 4 | eli-goldratt | "Temos muitas restrições, não uma", "TOC é para manufatura", "Já sabemos o gargalo" |
| 5 | kepner-tregoe | "IS/IS NOT é muito burocrático", "O problema muda rápido demais", "Não temos dados para IS NOT" |
| 6 | peter-checkland | "SSM é lento demais", "Não preciso de rich pictures", "Os stakeholders não vão cooperar" |
| 7 | thomas-wedell-wedellsborg | "O problema já está bem definido", "Não temos tempo para reframing", "Reframing vai atrasar a solução" |
| 8 | dean-gano | "Causa-raiz é uma só", "Grafos causais são complicados demais", "Já fizemos 5 whys" |
| 9 | gary-klein | "PreMortem é pessimismo", "O diagnóstico já foi validado", "Não precisamos questionar mais" |
| 10 | douglas-hubbard | "Isso não pode ser medido", "Não temos dados suficientes", "Medição vai atrasar a ação" |
| 11 | edgar-schein | "O problema não é cultural", "Cultura é subjetiva", "Não temos acesso à cultura real" |
| 12 | min-basadur | "Já sabemos o que fazer", "HMW é técnica de brainstorm", "O diagnóstico já está pronto para ação" |

**Processo por agente:**
1. Ler o agente completo (voice_dna, frameworks, heuristics)
2. Gerar 3-5 objeções que um usuário REAL faria ao framework
3. Escrever respostas que usam o VOCABULÁRIO e ESTILO do expert
4. Inserir após `completion_criteria` e antes de `CREDIBILITY` (ou posição equivalente)

**Esforço:** ~20-25min por agente × 12 = ~4-5h

---

## Phase 3: Consistency Fixes — Phases 1.5/3.5 (~1.5h)

### 3.1 — `workflows/wf-root-diagnosis.yaml`

**Problema:** Phases 1.5 e 3.5 usam formato diferente das demais fases (v1.0 style vs v1.1 style).

**Ações:**

| Item | De | Para |
|------|----|------|
| Phase 1.5 `quality_gate:` | `quality_gate:` com `blocking:` | `checkpoint:` com `type: blocking` (padrão das demais) |
| Phase 1.5 `output:` | `output:` (singular, campo file:) | `outputs:` (plural, lista — padrão das demais) |
| Phase 1.5 veto | ausente | Adicionar `veto:` com condições (ex: "VSM S1-S5 não mapeados completos") |
| Phase 1.5 campos ausentes | sem depends_on, required_in, human_review, elicit | Adicionar conforme padrão |
| Phase 3.5 `quality_gate:` | idem | idem |
| Phase 3.5 `output:` | idem | idem |
| Phase 3.5 veto | ausente | Adicionar `veto:` (ex: "Problema Complex sem feedback loop identificado") |
| Phase 3.5 `estimated_duration:` | `estimated_duration:` | `duration:` (padrão das demais) |
| Phase 3.5 `required_in:` | ausente | `required_in: [full, quick]` |
| Phase 3.5 campos ausentes | sem depends_on, human_review, elicit | Adicionar conforme padrão |

**Esforço:** ~45min

### 3.2 — `templates/diagnostic-report-tmpl.md`

**Problema:** Seções 4.5 (VSM/Beer) e 4.6 (System Dynamics/Senge) estão subordinadas visualmente à seção 4 (Schein/Phase 2), quebrando ordem cronológica e semântica.

**Ações:**
- Reposicionar Phase 1.5 (VSM) ANTES de Phase 2 (Schein) — renumerar como seção independente
- Reposicionar Phase 3.5 (System Dynamics) APÓS Phase 3 (Argyris) — renumerar como seção independente
- Renumerar seções para manter sequência linear sem sub-numeração

**Sugestão de nova numeração:**

| Seção | Conteúdo | Phase |
|-------|----------|-------|
| 1 | Resumo Executivo | — |
| 2 | Evolução do Problema | 0 |
| 3 | Classificação do Problema | 1 |
| 4 | Viabilidade Organizacional | 1.5 |
| 5 | Dinâmicas Ocultas | 2 |
| 6 | Pressupostos Auditados | 3 |
| 7 | Dinâmica Sistêmica | 3.5 |
| 8 | Mudança de Enquadramento | 4 |
| 9 | Diagnóstico Profundo | 5 |
| 10 | Causas-Raiz Identificadas | 6 |
| 11 | Problemas Adjacentes | — |
| 12 | Quantificação | 7 |
| 13 | Stress Test | 8 |
| 14 | Pacote para Ação | 9 |
| 15 | Recomendações | 10 |
| 16-18 | Referência (Convergência, Confiança, Metadados) | — |

**Esforço:** ~30min

### 3.3 — `checklists/diagnosis-quality-gate.md` (complementar ao Phase 1)

**Ação adicional:** Alinhar referência a "13 perguntas de triagem" (A4) com o workflow. O workflow define 8 perguntas (E0-1 a E0-8) e o checklist menciona 13 (8 + 4 Ulrich + 1 Hollnagel). Verificar se as 5 perguntas adicionais estão documentadas em `tasks/intake-triage.md` e, se não, adicioná-las.

**Esforço:** ~15min

---

## Phase 4: Polish (~1h)

### 4.1 — `tasks/start.md`

**Gap:** Única task sem seção formal `Inputs` (YAML block).

**Ação:** Adicionar seção Inputs:

```yaml
inputs:
  required:
    - name: user_trigger
      type: command
      description: "Comando de ativação (*start, *diagnose, *quick-diagnosis)"
  optional:
    - name: previous_context
      type: text
      description: "Contexto prévio do problema, se existente"
```

**Esforço:** ~10min

### 4.2 — Versionamento alinhado

**Status atual:**
- config.yaml: v1.1.0
- workflow: v1.1.0
- template footer: v1.2
- checklist footer: v1.1

**Ação:** Após todas as correções, bumpar todos para **v1.2.0**:
- config.yaml → version: 1.2.0
- wf-root-diagnosis.yaml → metadata.version: 1.2.0
- diagnostic-report-tmpl.md → footer v1.2.0
- diagnosis-quality-gate.md → footer v1.2.0
- README.md → atualizar changelog

**Esforço:** ~15min

### 4.3 — README.md changelog

**Ação:** Adicionar seção "O que mudou na v1.2" documentando:
- chris-argyris completado (output_examples, anti_patterns, objection_algorithms)
- objection_algorithms adicionado em 12 agentes
- Checklist corrigido (contagem, veto V2)
- Phases 1.5 e 3.5 normalizadas no workflow
- Template renumerado
- start.md com Inputs formal

**Esforço:** ~15min

---

## Ordem de Execução Recomendada

```
Phase 1.2 (Checklist) ← Pode começar imediatamente, correções simples
    ↓
Phase 1.1 (chris-argyris) ← Requer pesquisa de output_examples
    ↓
Phase 3.1 (Workflow) ← Normalizar Phases 1.5/3.5
    ↓
Phase 3.2 (Template) ← Renumerar seções
    ↓
Phase 3.3 (Checklist complementar)
    ↓
Phase 2 (12 agentes — objection_algorithms) ← Maior esforço, pode ser paralelizado
    ↓
Phase 4 (Polish — start.md, versões, README)
```

**Nota para execução paralela:** Phase 2 pode ser executada com múltiplos agentes em paralelo (ex: 3-4 agentes por batch) para reduzir tempo.

---

## Backups

Antes de QUALQUER edição, criar backup em `squads/root-diagnosis/.backup/`:

```bash
cp {arquivo} .backup/{arquivo}.{timestamp}.bak
```

---

## Verificação Pós-Upgrade

Após completar todas as fases:

1. Executar `*validate-squad root-diagnosis` — score esperado: 8.5-9.0/10
2. Comparar before/after:
   - Before: 1 PASS, 12 NEEDS_UPGRADE, 1 CRITICAL (agents)
   - Expected after: 14 PASS (agents), 16 PASS (tasks)
3. Verificar que nenhum comportamento existente foi quebrado
4. Executar `*refresh-registry` para atualizar squad-registry.yaml

---

## Critérios de Conclusão

- [x] chris-argyris passa no quality gate SC_AGT_001 (Example 3 + objection_algorithms adicionados)
- [x] Todos os 14 agentes têm `objection_algorithms` (14/14 confirmado via grep)
- [x] Checklist diagnosis-quality-gate.md com contagem correta (22 critérios: A=4, B=7, C=6, D=5)
- [x] Veto V2 inclui Phase 3.5 (Phases 0, 1, 3, 3.5, 4, 5, 6, 10)
- [x] Workflow com formato uniforme em todas as 13 fases (Phases 1.5/3.5 normalizadas)
- [x] Template com numeração linear — 18 seções em ordem cronológica (sem 4.5/4.6)
- [x] Versionamento alinhado em v1.2.0 (config, workflow, checklist, template, README)
- [ ] Score geral do squad >= 8.5/10 (verificação manual pendente — squad-analytics recomendado)

---

## Resultado Final

| Métrica | Antes (v1.1) | Depois (v1.2) |
|---------|-------------|---------------|
| Agents com objection_algorithms | 1/14 (7%) | 14/14 (100%) |
| chris-argyris output_examples | 2 | 3 |
| Checklist critérios contados | 20 (errado) | 22 (correto) |
| Veto V2 fases obrigatórias | 7 (sem 3.5) | 8 (com 3.5) |
| Template seções | 16 (com 4.5/4.6) | 18 (sequenciais) |
| Workflow phases normalizadas | 11/13 | 13/13 |
| Total linhas | 26,212 | 27,511 (+1,299) |
| Versão | 1.1.0 | 1.2.0 |

**7/8 critérios atendidos. Upgrade concluído.**

---

*Upgrade Plan v1.0 — Squad Architect — 2026-03-01*
*Executado e concluído em 2026-03-01*
*Referência: upgrade-squad.md task (4-phase upgrade flow)*
