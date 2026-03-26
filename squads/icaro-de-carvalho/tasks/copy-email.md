# Task: Copy de Email

```yaml
task_name: copy-email
status: active
executor: icaro-de-carvalho
execution_type: agent
elicit: true

input:
  required:
    - objetivo: "Tipo de email (reengajamento, venda, pré-lançamento, nurturing)"
    - produto: "O que está vendendo/promovendo"
  optional:
    - lista_tamanho: "Tamanho da lista"
    - tom: "Tom desejado (se diferente do padrão Ícaro)"
    - urgencia: "Nível de urgência/escassez"

output:
  format: markdown
  sections:
    - "Subject line (sem emoji, sem caps, sem fórmula)"
    - "Corpo do email (completo, pronto para envio)"
    - "CTA claro"
    - "Notas de estratégia (por que funciona)"
    - "Variações de subject (2 alternativas)"

action_items:
  - step: 1
    action: "Entender o contexto usando Escuta do Ecossistema"
    questions:
      - "Qual é o objetivo deste email? (venda, reengajamento, aquecimento)"
      - "Pra quem está escrevendo? (lead frio, quente, cliente)"
      - "Qual é a proposta emocional do produto?"

  - step: 2
    action: "Aplicar regras de email do Ícaro"
    rules:
      - "IC_DH_008: Email é tiro de 60 mil — revisar 3x"
      - "Primeiro parágrafo joga o melhor material"
      - "Transparência sobre a intenção de vender"
      - "Reciprocidade + comprometimento como gatilhos"
      - "Autenticidade > fórmula"

  - step: 3
    action: "Redigir email completo"

  - step: 4
    action: "Notas estratégicas de por que funciona"

acceptance_criteria:
  - "Subject line natural (não parece spam)"
  - "Primeiro parágrafo prende"
  - "Tom autêntico, não genérico"
  - "CTA claro e único"
  - "Intenção de venda transparente"
  - "Pronto para envio (não precisa de edição)"

checkpoint_policy: block_on_veto
checkpoints:
  - after_step: 1
    name: "QG-INPUT: Validar inputs antes de prosseguir"
    human_review: false
    auto_check: "Inputs obrigatórios preenchidos?"
  - after_step: 3
    name: "QG-OUTPUT: Validar output antes de entregar"
    human_review: false
    auto_check: "Output atende acceptance criteria?"

veto_conditions:
  - "Subject com emoji ou CAPS LOCK → REESCREVER"
  - "Corpo genérico tipo 'temos uma oferta especial' → REESCREVER"
  - "CTA múltiplo (vários links competindo) → SIMPLIFICAR"

output_example:
  input: "*email venda — curso de fotografia para celular, lista morna de 3.000"
  output: |
    **Subject:** eu fotografava com um tijolo de R$200

    Fala,

    Em 2019 eu tinha um celular que mais parecia uma calculadora com câmera.
    Tela rachada, memória cheia de áudio de WhatsApp, e 4 megapixels de pura
    mediocridade.

    Mesmo assim, foi com esse tijolo que eu tirei a foto que me deu o primeiro
    cliente pagante. R$150 por um ensaio de produto feito no chão da cozinha.

    O que mudou não foi o equipamento. Foi eu entender que foto boa não é
    nitidez — é COMPOSIÇÃO. É saber onde colocar a luz, o que tirar do fundo,
    e qual ângulo faz um produto de R$30 parecer de R$300.

    Eu compilei tudo o que aprendi em 4 anos fotografando com celular num
    programa de 6 semanas. Sem Photoshop, sem tripé de R$800, sem câmera
    profissional.

    Se seu celular tira selfie, ele tira foto que vende.

    [LINK] → Fotografia que Vende — 6 semanas, acesso imediato

    Um abraço,
    [Nome]

    PS: As 30 primeiras vagas têm um bônus com 47 presets de edição pra celular.
    Depois disso, o bônus sai e o preço sobe R$50. Não vou ficar mandando
    "última chance" — quando acabar, acabou.

    **Notas estratégicas:**
    - Subject pessoal (curiosidade + humildade = abertura)
    - Primeiro parágrafo: história real, não promessa
    - Gatilhos: reciprocidade (ensinou algo) + escassez real (30 vagas)
    - CTA único + PS com urgência

    **Variações de subject:**
    1. "a foto que me pagou R$150 (tirada com um celular de R$200)"
    2. "você não precisa de uma câmera cara — precisa de composição"
```
