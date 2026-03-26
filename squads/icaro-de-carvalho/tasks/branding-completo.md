# Task: Branding Completo — Construção ou Reposicionamento de Marca

```yaml
task_name: branding-completo
status: active
executor: marcos-hiller
execution_type: agent
elicit: true

input:
  required:
    - negocio: "Tipo de negócio e proposta de valor"
    - publico_alvo: "Público-alvo principal"
  optional:
    - nome_marca: "Nome da marca (se já existir)"
    - precisa_naming: "Precisa de criação de nome? (sim/não)"
    - segmento: "Segmento/indústria de atuação"
    - concorrentes: "Principais concorrentes diretos e indiretos"
    - ativos_marca: "Ativos visuais/verbais existentes (logo, cores, slogan)"
    - historico: "Há quanto tempo a marca existe"
    - problema: "Problema principal (marca nova, reposicionamento, inconsistência)"

output:
  format: markdown
  sections:
    - "Diagnóstico da marca atual (ou briefing para marca nova)"
    - "Análise competitiva e mapa de posicionamento"
    - "Posicionamento estratégico (5 Passos)"
    - "Brand Persona — 4 Dimensões"
    - "Expressividades visuais e verbais"
    - "Tom de voz e guia de linguagem"
    - "Recomendações de naming (se aplicável)"
    - "Brand Track Health — métricas de saúde da marca"

output_example: |
  ## Branding: Fintech de Microcrédito para MEIs

  ### Diagnóstico
  - **Situação:** Marca nova, sem ativos visuais ou verbais definidos
  - **Desafio:** Segmento dominado por bancos tradicionais e fintechs genéricas
  - **Oportunidade:** Nenhum player fala a língua do MEI com respeito + simplicidade

  ### Análise Competitiva
  | Player | Posicionamento | Tom | Gap |
  |--------|---------------|-----|-----|
  | Nubank | Descomplicado, jovem | Informal, tech | Não fala com MEI |
  | Cora | PJ digital | Funcional, limpo | Frio, sem emoção |
  | Creditas | Crédito inteligente | Técnico, confiável | Complexo demais |
  - **Espaço vazio:** Parceiro financeiro que entende a batalha do MEI

  ### Posicionamento — 5 Passos (MH_DH_001)
  1. **Quem somos:** Fintech de microcrédito para MEIs
  2. **Para quem:** Microempreendedores individuais que faturam até R$81k/ano
  3. **Contra quem:** Bancos burocráticos e fintechs que ignoram o pequeno
  4. **O que entregamos:** Crédito rápido, justo e sem humilhação
  5. **Por que acreditar:** Taxa transparente + aprovação em 24h + atendimento humano

  ### Brand Persona — 4 Dimensões (MH_DH_003)
  | Dimensão | Definição |
  |----------|-----------|
  | **Física** | Cores quentes (laranja + azul escuro), tipografia arredondada, ícones manuais |
  | **Intelectual** | Educação financeira acessível, conteúdo prático |
  | **Emocional** | "Aqui você não é número, é nome" — empatia e respeito |
  | **Espiritual** | Democratizar acesso a crédito digno |

  ### Tom de Voz
  - **Somos:** Parceiros, diretos, acolhedores, práticos
  - **Não somos:** Paternalistas, burocráticos, técnicos, distantes
  - **Exemplo DO:** "Seu crédito aprovado em 24h. Sem pegadinha."
  - **Exemplo DON'T:** "Solicite já sua análise de crédito mediante comprovação documental."

  ### Brand Track Health — MH_DH_005
  | Indicador | Como medir | Meta 6 meses |
  |-----------|-----------|-------------|
  | Reconhecimento espontâneo | Pesquisa NPS + recall | 15% no segmento |
  | Associação de atributos | "O que vem à mente?" | "Crédito fácil para MEI" |
  | Coerência visual | Audit trimestral | 90% consistência |
  | Sentimento de marca | Social listening | 80% positivo |

action_items:
  - step: 1
    action: "Elicitação — entender o universo da marca"
    questions:
      - "A marca já existe ou precisa ser criada do zero?"
      - "Quem é seu público — descreva a pessoa, não a demografia"
      - "Quem são seus 3 maiores concorrentes? (MH_DH_002 — sem análise competitiva = sem posicionamento)"
      - "Se sua marca fosse uma pessoa, como ela se comportaria numa festa?"
      - "O que você quer que as pessoas SINTAM ao interagir com a marca?"
      - "Tem ativos visuais ou verbais que quer manter (logo, cores, slogan)?"

  - step: 2
    action: "Análise competitiva — mapear o território"
    criteria:
      - "Pelo menos 3 concorrentes analisados (MH_DH_002)"
      - "Posicionamento de cada um mapeado"
      - "Espaço vazio (gap) identificado"
      - "Regra: copiar líder = construir marca de graça pra ele (MH_DH_006)"

  - step: 3
    action: "Posicionamento — aplicar 5 Passos do Posicionamento"
    criteria:
      - "5 perguntas respondidas com clareza (MH_DH_001)"
      - "Posicionamento diferenciado do mapa competitivo"
      - "Reason to believe (RTB) concreto, não genérico"

  - step: 4
    action: "Brand Persona — construir nas 4 Dimensões"
    criteria:
      - "Dimensão Física definida (identidade visual) (MH_DH_003)"
      - "Dimensão Intelectual definida (conteúdo, discurso)"
      - "Dimensão Emocional definida (sentimento provocado)"
      - "Dimensão Espiritual definida (propósito maior)"

  - step: 5
    action: "Expressividades — definir linguagem visual e verbal"
    criteria:
      - "Tom de voz documentado com exemplos do/don't (MH_DH_004)"
      - "Diretrizes visuais com referências"
      - "Marca como Estrutura Mental aplicada: Tempo + Coerência + Repetição + Método (MH_DH_007)"

  - step: 6
    action: "Naming (se aplicável) — criar opções de nome"
    criteria:
      - "3-5 opções de nome com justificativa estratégica"
      - "Verificação de disponibilidade sugerida (domínio + INPI)"
      - "Nome alinhado ao posicionamento e Brand Persona"

  - step: 7
    action: "Entregar documento de branding completo + Brand Track Health"

acceptance_criteria:
  - "5 Passos do Posicionamento aplicados completamente (MH_DH_001)"
  - "Brand Persona definida nas 4 Dimensões (MH_DH_003)"
  - "Análise competitiva com pelo menos 3 concorrentes (MH_DH_002)"
  - "Tom de voz documentado com exemplos do/don't (MH_DH_004)"
  - "Brand Track Health com métricas mensuráveis (MH_DH_005)"
  - "Linguagem do Hiller (acadêmica acessível, com referências e provocações)"
  - "Próximo passo claro"

completion_criteria:
  - "Posicionamento estratégico completo e diferenciado"
  - "Brand Persona documentada nas 4 dimensões com exemplos"
  - "Tom de voz com pelo menos 2 exemplos do e 2 don't"
  - "Brand Track Health com pelo menos 3 indicadores mensuráveis"
  - "Se naming foi solicitado, pelo menos 3 opções apresentadas"

checkpoint_policy: block_on_veto
checkpoints:
  - after_step: 1
    name: "QG-INPUT: Validar contexto e concorrência"
    human_review: false
    auto_check: "Negócio claro? Concorrentes identificados? Público definido?"
  - after_step: 3
    name: "QG-POSITIONING: Validar posicionamento antes de persona"
    human_review: false
    auto_check: "5 Passos respondidos? Diferenciação clara?"
  - after_step: 6
    name: "QG-OUTPUT: Validar branding completo"
    human_review: false
    auto_check: "Output atende acceptance criteria?"

veto_conditions:
  - "Sem análise competitiva → BLOQUEAR: 'Posicionamento sem concorrência é achismo. Marca não existe no vácuo — existe em relação aos outros.' (MH_DH_002)"
  - "Copiar posicionamento do líder → BLOQUEAR: 'Copiar líder é construir a marca dele de graça. Você vira referência dele, não a própria referência.' (MH_DH_006)"
  - "Brand Persona genérica → REFAZER: 'Se a persona serve pra qualquer marca, não serve pra nenhuma.' (MH_DH_003)"
  - "Tom de voz sem exemplos concretos → REFAZER: 'Tom de voz abstrato é poesia, não branding. Precisa de do/don't com frases reais.' (MH_DH_004)"
  - "Branding sem métricas de saúde → REFAZER: 'Marca que não se mede não se gerencia. Brand Track Health é obrigatório.' (MH_DH_005)"
  - "Documento genérico aplicável a qualquer negócio → REFAZER com especificidades do cliente"
```
