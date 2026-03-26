# Task: Precificação de Produto Digital

```yaml
task_name: precificacao
status: active
executor: icaro-de-carvalho
execution_type: agent
elicit: true

input:
  required:
    - produto: "Descrição do produto"
    - formato: "Tipo (ebook, vídeos, programa, assinatura)"
  optional:
    - publico: "Público-alvo"
    - concorrentes: "Preços de concorrentes"
    - proposta_financeira: "O produto promete retorno financeiro?"

output:
  format: markdown
  sections:
    - "Classificação do formato (teto de preço)"
    - "Análise da proposta (estica ou não o teto)"
    - "Preço recomendado (faixa)"
    - "Leque de preços sugerido"
    - "Justificativa usando frameworks"

action_items:
  - step: 1
    action: "Classificar formato usando IC_DH_009"
    table:
      - "Material escrito (ebook, PDF): teto R$ 69,90"
      - "Conjunto de vídeos: teto R$ 397"
      - "Programa com fluxo semanal: teto R$ 997+"
      - "Assinatura mensal: R$ 19,90 - R$ 99,90"

  - step: 2
    action: "Verificar se proposta financeira estica o teto"
    rule: "Se o cliente pode ganhar dinheiro com o que aprende, teto sobe"

  - step: 3
    action: "Aplicar IC_DH_003 (Leque de Preços)"
    rule: "Ter produtos em várias faixas — cliente entra por um, compra mais"

  - step: 4
    action: "Entregar recomendação com justificativa"

acceptance_criteria:
  - "Preço justificado por framework (não achismo)"
  - "Leque de preços sugerido (não preço único)"
  - "Consideração de proposta financeira"
  - "Linguagem direta do Ícaro"

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
  - "Preço sem justificativa → REFAZER"
  - "Ignorar formato do produto → REFAZER"

output_example:
  input: "*precificar — curso de culinária vegana em vídeo (20 aulas gravadas)"
  output: |
    **CLASSIFICAÇÃO (IC_DH_009):**
    Formato: Conjunto de vídeos → Teto: R$ 397

    **ANÁLISE DA PROPOSTA:**
    Promete retorno financeiro? NÃO (é lifestyle, não business).
    Teto se mantém em R$ 397. Sem elasticidade.

    **MAS** — se o curso ensina a VENDER comida vegana (ex: marmitas,
    delivery, encomendas), aí a proposta financeira entra e o teto estica
    para R$ 597-797 porque "o aluno pode ganhar dinheiro com o que aprende".

    **LEQUE DE PREÇOS (IC_DH_003):**
    | Produto | Preço | O que inclui |
    |---------|-------|-------------|
    | Básico | R$ 197 | 20 aulas gravadas |
    | Completo | R$ 347 | 20 aulas + ebook de receitas + grupo |
    | Premium | R$ 597 | Tudo + 4 calls de grupo ao vivo/mês |

    Produto único = vendas perdidas. Sempre ofereça pelo menos 2 faixas.

    **JUSTIFICATIVA:**
    - R$197 é entrada acessível (captura quem "só quer ver")
    - R$347 é o sweet spot (maioria compra esse)
    - R$597 pega quem quer resultado (e paga pela atenção)
    - Diferença entre faixas = percepção de valor, não custo de produção
```
