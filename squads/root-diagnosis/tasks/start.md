# start.md — Entry Point do Root Diagnosis Squad

## Purpose

Ponto de entrada unificado para o Root Diagnosis Squad. Apresenta o squad ao usuario,
explica as opcoes disponiveis e roteia para o modo adequado de diagnostico.
Funciona como onboarding para quem nunca usou o squad.

**Agente responsavel:** root-diagnosis-chief
**Trigger:** `/RootDiagnosis:tasks:start`

---

## Task Metadata

```yaml
task_id: root-diagnosis/start
task_name: Root Diagnosis Squad Entry Point
squad: root-diagnosis
type: onboarding
status: active
responsible_executor: root-diagnosis-chief
execution_type: Orchestrator
version: "1.0.0"
estimated_duration: "2-5 min"
execution_mode: interactive
```

---

## Inputs

```yaml
inputs:
  required:
    - name: user_trigger
      type: command
      description: "Comando de ativacao — /RootDiagnosis:tasks:start, *start, ou ativacao direta do squad"
  optional:
    - name: previous_context
      type: text
      description: "Contexto previo do problema, se existente (ex: descricao, tentativas anteriores)"
```

---

## Action Items

### Step 1: Display Welcome

Exibir mensagem de boas-vindas:

```markdown
> 🔬 **Root Diagnosis Squad** | Diagnostic Pipeline

Bem-vindo ao Root Diagnosis Squad — diagnostico profundo de problemas
baseado em 13 elite minds com frameworks documentados.

**O que fazemos:** Identificamos causas-raiz reais usando um pipeline de
13 fases que combina Cynefin, VSM, System Dynamics, TOC, SSM, Ladder of
Inference, PreMortem e mais frameworks especializados.

**O que NAO fazemos:** Resolver o problema. Diagnosticamos com rigor
para que a solucao ataque a causa certa.
```

### Step 2: Present Options

```yaml
AskUserQuestion:
  id: "start_mode_selection"
  question: "Como posso ajudar?"
  type: multiple_choice
  options:
    - label: "Diagnosticar um problema (completo)"
      description: "Pipeline de 13 fases, 60-120 min. Maximo rigor e confianca (70-90%)."
      routes_to: "*diagnose"

    - label: "Diagnostico rapido"
      description: "Pipeline de 8 fases, 35-50 min. Velocidade com tradeoff de profundidade (50-70%)."
      routes_to: "*quick-diagnosis"

    - label: "Classificar um problema (Cynefin)"
      description: "Apenas classificar o tipo do problema — Clear, Complicated, Complex, Chaotic."
      routes_to: "*classify"

    - label: "Desafiar o enquadramento de um problema"
      description: "Verificar se estou resolvendo o problema certo (reframing)."
      routes_to: "*reframe"

    - label: "Saber mais sobre o squad"
      description: "Entender a arquitetura, agentes, fases e quando usar."
      routes_to: "step_3_explain"

  required: true
```

### Step 3: Route or Explain

```yaml
routing:
  "*diagnose":
    action: "Carregar tasks/full-diagnosis.md e iniciar Phase 0"
    message: "Iniciando diagnostico completo. Vamos comecar com a triagem..."

  "*quick-diagnosis":
    action: "Carregar tasks/quick-diagnosis.md e iniciar Phase 0"
    message: "Iniciando diagnostico rapido. Vamos comecar com a triagem..."

  "*classify":
    action: "Carregar tasks/classify-domain.md"
    message: "Vou classificar o dominio do seu problema usando Cynefin Framework..."

  "*reframe":
    action: "Carregar tasks/reframe-problem.md"
    message: "Vou desafiar o enquadramento do seu problema..."

  "step_3_explain":
    action: "Exibir explicacao do squad"
    content: |
      ## Como funciona o Root Diagnosis Squad

      ### Pipeline de 13 Fases
      ```
      0.   Intake & Triage .............. Escopo, urgencia, profundidade
      1.   Domain Classification ........ Cynefin: que tipo de problema e esse?
      1.5  Viability Assessment ......... Viabilidade organizacional (VSM) [opcional]
      2.   Cultural Diagnosis ........... O que NAO esta sendo dito? [opcional]
      3.   Assumption Audit ............. Que pressupostos estao nos cegando?
      3.5  System Dynamics Diagnostic ... Feedback loops, arquetipos, leverage points
      4.   Problem Reframing ............ E ESSE o problema certo?
      5.   Deep Diagnosis ............... Cadeia causal (CRT) ou sistema (SSM)
      6.   Root Cause Analysis .......... Isolar e verificar causa-raiz
      7.   Evidence Quantification ...... Quantificar o inquantificavel [opcional]
      8.   Stress Test .................. E se nosso diagnostico estiver errado? [opcional]
      9.   Package for Action ........... HMW + Challenge Map + Timeline [opcional]
      10.  Diagnostic Report ............ Relatorio consolidado
      ```

      ### 14 Agentes Especialistas
      Cada fase e executada por um agente baseado em elite mind real:
      Dave Snowden, Chris Argyris, Stafford Beer, Peter Senge,
      Eli Goldratt, Kepner & Tregoe, Peter Checkland,
      Thomas Wedell-Wedellsborg, Dean Gano, Gary Klein,
      Douglas Hubbard, Edgar Schein, Min Basadur.

      ### 2 Decision Points Adaptativos
      O pipeline se adapta ao tipo do problema:
      - DP1 (Phase 5): Cynefin domain → metodo de diagnostico profundo
      - DP2 (Phase 6): Isolabilidade → metodo de RCA

      ### Quick vs Full
      | Modo | Fases | Tempo | Confianca |
      |------|-------|-------|-----------|
      | Quick | 8 | 35-50 min | 50-70% |
      | Full | 13 | 60-120 min | 70-90% |

      Quer iniciar um diagnostico agora?

    follow_up:
      question: "Quer iniciar um diagnostico?"
      options:
        - "Sim, completo (*diagnose)"
        - "Sim, rapido (*quick-diagnosis)"
        - "Nao, obrigado"
```

---

## Output

Nenhum output direto — esta task roteia para a task apropriada.

---

## Acceptance Criteria

- [ ] Mensagem de boas-vindas exibida
- [ ] Opcoes apresentadas de forma clara
- [ ] Usuario roteado para task correta
- [ ] Se usuario escolheu "saber mais", explicacao exibida e follow-up oferecido

---

## Veto Conditions

```yaml
veto: null
# Entry point nao tem veto conditions — sempre acessivel
```

---

## Handoff

```yaml
handoff:
  routes_to:
    - tasks/full-diagnosis.md (se *diagnose)
    - tasks/quick-diagnosis.md (se *quick-diagnosis)
    - tasks/classify-domain.md (se *classify)
    - tasks/reframe-problem.md (se *reframe)
  executor: root-diagnosis-chief
  condition: "Sempre — entry point nao tem condicoes"
```

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-22 | Initial release — Entry point with 5 options and squad explanation |
