# Task: Estratégia de Social Media — Unbound Marketing

```yaml
task_name: estrategia-social
status: active
executor: rafael-kiso
execution_type: agent
elicit: true

input:
  required:
    - tipo_negocio: "Tipo de negócio e proposta de valor"
    - objetivo: "Objetivo principal nas redes sociais"
  optional:
    - presenca_atual: "Redes sociais ativas e número de seguidores"
    - publico_alvo: "Público-alvo definido (se já souber)"
    - orcamento_conteudo: "Orçamento disponível para produção de conteúdo"
    - frequencia_atual: "Frequência atual de postagem"
    - concorrentes: "Principais concorrentes nas redes"
    - metricas_atuais: "Engajamento médio, alcance, taxa de conversão"

output:
  format: markdown
  sections:
    - "Diagnóstico da presença digital atual"
    - "Definição de propósito e posicionamento social (X=BX+CX+UX)"
    - "Brand Persona (arquétipo + tom de voz)"
    - "Pilares de conteúdo (3Hs: Hero/Hub/Help)"
    - "Jornada Bumerangue (atração → engajamento → conversão → retenção)"
    - "Framework de calendário editorial"
    - "KPIs e métricas de controle"

output_example: |
  ## Estratégia Social: Clínica de Estética Premium

  ### Diagnóstico (Passo 1 — Unbound)
  - **Presença atual:** Instagram 12k seguidores, engajamento 1.8%
  - **Gap identificado:** Conteúdo sem propósito claro, mistura de posts técnicos e promocionais
  - **Oportunidade:** Posicionar como autoridade em autoestima (não em procedimentos)

  ### Propósito & Posicionamento (X=BX+CX+UX)
  - **Brand Experience (BX):** Clínica que cuida da autoestima, não da vaidade
  - **Customer Experience (CX):** Atendimento consultivo, não vendedor
  - **User Experience (UX):** Conteúdo educativo que empodera a decisão

  ### Brand Persona (NeedScope + Jung)
  - **Arquétipo:** Cuidador + Sábio
  - **Tom de voz:** Acolhedor, técnico sem ser frio, empoderador
  - **Expressão verbal:** "Você merece se sentir bem" > "Promoção de botox"

  ### Pilares de Conteúdo (3Hs) — RK_DH_004
  | Pilar | Tipo | Frequência | Exemplo |
  |-------|------|------------|---------|
  | Hero | Evento/campanha de impacto | 1x/mês | Série "Transformações Reais" |
  | Hub | Conteúdo recorrente de valor | 3x/semana | Dicas de cuidados, mitos vs verdades |
  | Help | Conteúdo utilitário/busca | 2x/semana | "Como escolher o melhor tratamento para..." |

  ### Jornada Bumerangue — RK_DH_003
  1. **Atração:** Reels educativos + colaborações
  2. **Engajamento:** Stories interativos + caixinha de perguntas
  3. **Conversão:** Depoimentos + CTA consultivo
  4. **Retenção:** Programa de fidelidade + conteúdo exclusivo

  ### KPIs
  | Métrica | Meta 30 dias | Meta 90 dias |
  |---------|-------------|-------------|
  | Engajamento | 2.5% | 4.0% |
  | Alcance/post | 5k | 15k |
  | Leads via social | 20/mês | 50/mês |
  | Salvamentos | 3% dos alcançados | 5% dos alcançados |

action_items:
  - step: 1
    action: "Elicitação — diagnóstico do ecossistema digital"
    questions:
      - "Qual é o propósito do seu negócio além de vender? (RK_DH_001 — sem propósito = commodity futura)"
      - "Quem é seu público e o que ele SENTE, não só o que ele COMPRA?"
      - "Em quais redes você está presente e com que frequência posta?"
      - "Quem são seus 3 principais concorrentes nas redes?"
      - "Qual resultado concreto você espera das redes em 90 dias?"
      - "Tem orçamento para produção de conteúdo (fotógrafo, editor, etc.)?"

  - step: 2
    action: "Diagnóstico — aplicar Passo 1 dos 5 Passos Unbound"
    criteria:
      - "Presença atual mapeada com dados reais (RK_DH_002)"
      - "Gaps e oportunidades identificados"
      - "Concorrência analisada (posicionamento, não cópia)"

  - step: 3
    action: "Objetivos — definir metas SMART alinhadas ao propósito"
    criteria:
      - "KPIs definidos e mensuráveis (RK_DH_006)"
      - "Metas por fase (30, 60, 90 dias)"
      - "Métricas de vaidade separadas de métricas de negócio"

  - step: 4
    action: "Estratégia — construir posicionamento e Brand Persona"
    criteria:
      - "Fórmula X=BX+CX+UX aplicada (RK_DH_005)"
      - "Brand Persona definida com arquétipo NeedScope/Jung (RK_DH_008)"
      - "Tom de voz documentado com exemplos do/don't"
      - "Pilares de conteúdo 3Hs definidos (RK_DH_004)"

  - step: 5
    action: "Tática — montar framework de calendário editorial"
    criteria:
      - "Jornada Bumerangue mapeada (RK_DH_003)"
      - "Frequência por pilar definida"
      - "Formatos por rede definidos"

  - step: 6
    action: "Controle — definir métricas e rituais de revisão"
    criteria:
      - "Dashboard de KPIs definido"
      - "Frequência de revisão (semanal/mensal)"

  - step: 7
    action: "Entregar estratégia completa"

acceptance_criteria:
  - "5 Passos Unbound aplicados completamente (Diagnóstico→Objetivos→Estratégia→Tática→Controle)"
  - "Brand Persona definida com arquétipo e tom de voz"
  - "Pilares de conteúdo 3Hs documentados com exemplos"
  - "Jornada Bumerangue mapeada com ações por etapa"
  - "KPIs mensuráveis e separados de métricas de vaidade"
  - "Linguagem do Kiso (estratégica, conceitual, com frameworks visuais)"
  - "Próximo passo claro"

completion_criteria:
  - "Estratégia cobre os 5 passos Unbound sem pular nenhum"
  - "Brand Persona documentada com pelo menos arquétipo, tom e exemplos"
  - "Calendário editorial com frequência e formatos definidos"
  - "Pelo menos 3 KPIs com metas para 30 e 90 dias"

checkpoint_policy: block_on_veto
checkpoints:
  - after_step: 1
    name: "QG-INPUT: Validar propósito e contexto"
    human_review: false
    auto_check: "Propósito claro? Público definido? Objetivo mensurável?"
  - after_step: 4
    name: "QG-STRATEGY: Validar estratégia antes de tática"
    human_review: false
    auto_check: "Brand Persona definida? Pilares de conteúdo claros?"
  - after_step: 6
    name: "QG-OUTPUT: Validar output completo"
    human_review: false
    auto_check: "Output atende acceptance criteria?"

veto_conditions:
  - "Sem propósito claro → BLOQUEAR: 'Sem propósito = commodity futura. Marca sem razão de existir é preço baixo esperando pra acontecer.' (RK_DH_001)"
  - "Sem KPI definido → BLOQUEAR: 'Estratégia sem métrica é horóscopo de marketing. Bonito de ler, inútil de executar.' (RK_DH_006)"
  - "Estratégia baseada em copiar concorrente → REFAZER: 'Copiar líder é construir a marca dele de graça. Referência sim, cópia não.' (RK_DH_007)"
  - "Conteúdo sem pilar definido → REFAZER: 'Postar sem pilar é gritar no deserto — muito esforço, nenhuma direção.' (RK_DH_004)"
  - "Plano genérico aplicável a qualquer negócio → REFAZER com especificidades do cliente"
```
