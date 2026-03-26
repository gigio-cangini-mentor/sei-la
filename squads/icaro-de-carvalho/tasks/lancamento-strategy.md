# Task: Estratégia de Lançamento

```yaml
task_name: lancamento-strategy
status: active
executor: icaro-de-carvalho
execution_type: agent
elicit: true

input:
  required:
    - produto: "O que vai lançar"
    - publico: "Pra quem"
  optional:
    - lista: "Tamanho da lista atual"
    - budget: "Orçamento disponível"
    - prazo: "Prazo desejado"
    - historico: "Já lançou antes? Resultados?"

output:
  format: markdown
  sections:
    - "Diagnóstico PPP do produto"
    - "Estratégia recomendada (Tripwire, Sprint, ou Injeção de Caixa)"
    - "Timeline detalhada"
    - "Copy principal (headline + proposta)"
    - "Funil de emails (sequência)"
    - "Checklist de execução"

action_items:
  - step: 1
    action: "Diagnóstico PPP rápido"

  - step: 2
    action: "Selecionar estratégia"
    decision_tree:
      - "Tem lista grande + meses de conteúdo? → TRIPWIRE"
      - "Primeiro lançamento, sem lista? → SPRINT"
      - "Final de ano, lista existente? → INJEÇÃO DE CAIXA"
      - "Recorrência, conteúdo contínuo? → MODELO DE ASSINATURA"

  - step: 3
    action: "Montar timeline + funil"

  - step: 4
    action: "Redigir copy principal"

  - step: 5
    action: "Checklist de execução"

acceptance_criteria:
  - "Estratégia justificada com framework"
  - "Timeline realista com datas"
  - "Copy pronta (não placeholder)"
  - "Sequência de emails definida"
  - "KPIs claros para cada fase"

checkpoint_policy: block_on_veto
checkpoints:
  - after_step: 1
    name: "QG-INPUT: Validar inputs antes de prosseguir"
    human_review: false
    auto_check: "Inputs obrigatórios preenchidos?"
  - after_step: 4
    name: "QG-OUTPUT: Validar output antes de entregar"
    human_review: false
    auto_check: "Output atende acceptance criteria?"

veto_conditions:
  - "Estratégia sem justificativa → REFAZER"
  - "Copy genérica → REESCREVER"
  - "Timeline sem KPIs → ADICIONAR"

output_example:
  input: "*lancamento — mentoria de organização financeira para autônomos, lista de 2.500"
  output: |
    **DIAGNÓSTICO PPP:**
    - Produto: mentoria 8 semanas com calls semanais + comunidade
    - Proposta: "Parar de ter medo de abrir o extrato"
    - Personalidade: coloquial, sem jargão de economista

    **ESTRATÉGIA: SPRINT (Tiro Curto)**
    Justificativa: lista de 2.500 é boa mas não enorme, sem meses de
    conteúdo prévio. Sprint = execução rápida, testar demanda real.

    **TIMELINE (14 dias):**
    | Dia | Ação | KPI |
    |-----|------|-----|
    | D-14 a D-8 | 7 conteúdos sobre dor financeira (Stories + Reels) | Engajamento > 3% |
    | D-7 | Email 1: história pessoal + teaser | Abertura > 25% |
    | D-5 | Email 2: conteúdo de valor (planilha grátis) | Download > 15% |
    | D-3 | Email 3: cases de alunos beta | Click > 8% |
    | D-1 | Email 4: abertura de vagas + escassez real (30 vagas) | — |
    | D0 | Página aberta + live de 45min | Conversão > 3% |
    | D+1 | Email 5: FAQ + objeções | — |
    | D+2 | Email 6: último dia (escassez) | Conversão final |

    **COPY PRINCIPAL:**
    Headline: "A mentoria pra quem tem medo de abrir o extrato"
    Sub: "8 semanas pra sair do 'eu acho que tá sobrando' pro 'eu SEI quanto entra e quanto sai'"

    **PREÇO (IC_DH_009):** Programa com fluxo semanal → teto R$997+
    Leque: R$497 (básico) / R$797 (com calls) / R$1.297 (com 1:1 mensal)
```
