# Task: Diagnóstico PPP (Produto, Proposta, Personalidade)

```yaml
task_name: diagnostico-ppp
status: active
executor: icaro-de-carvalho
execution_type: agent
elicit: true

input:
  required:
    - negocio: "Descrição do negócio/produto a diagnosticar"
  optional:
    - publico: "Público-alvo (se já souber)"
    - canal: "Canais atuais de comunicação"
    - faturamento: "Faturamento atual (para calibrar recomendações)"

output:
  format: markdown
  sections:
    - "Diagnóstico do PRODUTO (o que é de verdade)"
    - "Diagnóstico da PROPOSTA (o estímulo emocional)"
    - "Diagnóstico da PERSONALIDADE (voz única)"
    - "Proporção recomendada (qual pilar priorizar)"
    - "3 ações concretas de melhoria"

action_items:
  - step: 1
    action: "Perguntar sobre o negócio usando framework de Escuta do Ecossistema"
    questions:
      - "O que você vende? (descreva como se explicasse pra sua mãe)"
      - "Por que alguém compraria de VOCÊ e não do concorrente?"
      - "Se eu tapar seu logo, o público sabe que é você?"
      - "Qual é o KPI principal do seu negócio hoje?"

  - step: 2
    action: "Analisar PRODUTO"
    criteria:
      - "Características racionais listadas"
      - "Formato adequado ao preço (IC_DH_009)"
      - "Diferencial real identificado"

  - step: 3
    action: "Analisar PROPOSTA"
    criteria:
      - "Estímulo emocional identificado"
      - "Público-dor mapeado (não métrica de vaidade)"
      - "Proposta financeira ou de transformação clara"

  - step: 4
    action: "Analisar PERSONALIDADE"
    criteria:
      - "Voz única identificada ou ausente"
      - "Diferenciação de concorrentes"
      - "Conteúdo com personalidade vs genérico"

  - step: 5
    action: "Entregar diagnóstico + 3 ações"

acceptance_criteria:
  - "Framework PPP aplicado completamente"
  - "Cada pilar tem diagnóstico específico (não genérico)"
  - "3 ações concretas e executáveis"
  - "Linguagem do Ícaro (informal, direta, com metáforas)"
  - "Próximo passo claro"

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
  - "Diagnóstico genérico sem referência ao negócio específico → REFAZER"
  - "Ações vagas tipo 'melhore sua comunicação' → REFAZER com específicos"
  - "Linguagem corporativa → REESCREVER no tom do Ícaro"

output_example:
  input: "*diagnostico — loja de bolos artesanais online"
  output: |
    Bom, vamos lá. Não importa o dia, o horário ou a data estelar...

    **PRODUTO:** Bolo artesanal. Bonito? Sim. Gostoso? Provavelmente. Mas aqui
    é onde 90% das boleiras param. "Meu bolo é o melhor." Todo mundo acha isso.

    **PROPOSTA:** Aqui é onde o jogo muda. Você não vende bolo, você vende:
    - A mãe que quer parecer que se dedicou pro aniversário do filho
    - A esposa que quer impressionar a sogra sem gastar 8h na cozinha
    - A empresa que quer parecer que ligou pro aniversário do funcionário
    As pessoas pagam pra não ter trabalho.

    **PERSONALIDADE:** Qual é a SUA voz? Se eu tapar o logo do seu Instagram,
    eu sei que é você? Ou é mais uma boleira com foto de bolo e textinho de 2 linhas?

    **3 AÇÕES:**
    1. 80% do conteúdo sobre MOMENTOS (festas, surpresas, celebrações), não sobre bolo
    2. Criar uma rubrica semanal com sua cara (ex: "Bolo da Semana" com história real)
    3. Montar leque: bolo mini R$39 / padrão R$89 / premium R$149 — produto único = vendas perdidas
```
