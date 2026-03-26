# Task: Campanha de Tráfego Pago Completa

```yaml
task_name: campanha-trafego
status: active
executor: pedro-sobral
execution_type: agent
elicit: true

input:
  required:
    - produto_servico: "Produto ou serviço a ser anunciado"
    - objetivo: "Objetivo da campanha (leads, vendas, reconhecimento)"
    - orcamento: "Orçamento mensal disponível para tráfego"
  optional:
    - plataforma: "Plataforma preferida (Meta Ads, Google Ads, TikTok Ads)"
    - pixel_configurado: "Já tem pixel/tag instalado? (sim/não)"
    - publicos_existentes: "Públicos personalizados ou lookalikes já criados"
    - historico: "Histórico de campanhas anteriores (ROAS, CPA, CTR)"
    - pagina_destino: "URL da landing page ou página de destino"

output:
  format: markdown
  sections:
    - "Diagnóstico do cenário atual (pixel, públicos, histórico)"
    - "Estrutura da campanha (campanhas → conjuntos → anúncios)"
    - "Públicos-alvo definidos (frio, morno, quente)"
    - "Briefing de criativos (seguindo CTR Subido 85/10/5)"
    - "Distribuição de orçamento por fase e conjunto"
    - "KPIs e metas por fase"
    - "Cronograma de otimização (primeiros 7, 14, 30 dias)"

output_example: |
  ## Campanha: Lançamento Curso de Fotografia

  ### Estrutura
  - **Campanha 1 — Prospecção (Topo):** 60% do orçamento
    - Conjunto 1: Interesse amplo (fotografia + câmera)
    - Conjunto 2: Lookalike 1% compradores
    - Conjunto 3: Público aberto (broad) — deixa o algoritmo trabalhar
  - **Campanha 2 — Remarketing (Meio/Fundo):** 30% do orçamento
    - Conjunto 1: Visitou LP últimos 7 dias
    - Conjunto 2: Engajou Instagram 30 dias
  - **Campanha 3 — Retenção:** 10% do orçamento
    - Conjunto 1: Compradores anteriores (upsell)

  ### Briefing de Criativos (CTR Subido 85/10/5)
  - **85% do resultado vem do CRIATIVO** — foco aqui
  - **10% do público** — não adianta público perfeito com criativo ruim
  - **5% do restante** — configuração, lance, posicionamento
  - Formatos: 3 vídeos curtos (15-30s) + 2 estáticos + 1 carrossel
  - Regra: 20 criativos imperfeitos > 1 criativo perfeito (PS_DH_003)

  ### KPIs
  | Métrica | Meta Fase 1 (0-14d) | Meta Fase 2 (15-30d) |
  |---------|---------------------|----------------------|
  | CTR | > 1.5% | > 2.0% |
  | CPC | < R$2,50 | < R$1,80 |
  | CPL | < R$25 | < R$18 |

action_items:
  - step: 1
    action: "Elicitação — entender cenário completo do anunciante"
    questions:
      - "O que você vende e qual o ticket médio?"
      - "Qual o objetivo principal: gerar leads, vender direto ou aumentar reconhecimento?"
      - "Quanto pretende investir por mês em tráfego?"
      - "Já tem pixel instalado e disparando eventos? (PS_DH_001 — sem pixel = sem campanha)"
      - "Tem públicos personalizados ou lookalikes criados?"
      - "Já rodou campanha antes? Se sim, qual foi o melhor ROAS/CPA?"

  - step: 2
    action: "Diagnóstico técnico — verificar fundamentos"
    criteria:
      - "Pixel/tag instalado e rastreando eventos corretos (PS_DH_001)"
      - "Página de destino funcional e com carregamento rápido"
      - "Objetivo claro e mensurável definido"
      - "Orçamento viável para o objetivo (PS_DH_005)"

  - step: 3
    action: "Montar estrutura da campanha — Método Subido (PEDRO)"
    criteria:
      - "P — Público segmentado em camadas (frio/morno/quente)"
      - "E — Estratégia de escala definida"
      - "D — Distribuição de orçamento por conjunto"
      - "R — Resultados esperados com KPIs"
      - "O — Otimização planejada (quando pausar, escalar, testar)"
      - "8 fases de lançamento aplicadas se for contexto de lançamento (PS_DH_007)"

  - step: 4
    action: "Criar briefing de criativos — CTR Subido 85/10/5"
    criteria:
      - "85% do foco no criativo (PS_DH_002)"
      - "Regra dos 20 imperfeitos > 1 perfeito aplicada (PS_DH_003)"
      - "Formatos variados (vídeo, estático, carrossel)"
      - "Hook nos primeiros 3 segundos definido"

  - step: 5
    action: "Entregar plano completo com cronograma de otimização"

acceptance_criteria:
  - "Método Subido (PEDRO) aplicado completamente"
  - "CTR Subido 85/10/5 refletido no briefing de criativos"
  - "Distribuição de orçamento justificada por fase"
  - "KPIs mensuráveis definidos com metas realistas"
  - "Cronograma de otimização dos primeiros 30 dias incluído"
  - "Linguagem do Sobral (direta, prática, sem enrolação)"
  - "Próximo passo claro"

completion_criteria:
  - "Campanha estruturada com pelo menos 2 camadas de público"
  - "Briefing de criativos com pelo menos 3 variações"
  - "KPIs definidos com meta para cada fase"
  - "Plano de otimização semanal incluído"

checkpoint_policy: block_on_veto
checkpoints:
  - after_step: 1
    name: "QG-INPUT: Validar fundamentos técnicos"
    human_review: false
    auto_check: "Pixel existe? Objetivo claro? Orçamento definido?"
  - after_step: 4
    name: "QG-OUTPUT: Validar campanha antes de entregar"
    human_review: false
    auto_check: "Output atende acceptance criteria?"

veto_conditions:
  - "Sem pixel/tag instalado → BLOQUEAR: 'Sem pixel não existe campanha. Instala primeiro, depois a gente conversa.' (PS_DH_001)"
  - "Sem objetivo claro → BLOQUEAR: 'Rodar tráfego sem objetivo é queimar dinheiro com estilo.' (PS_DH_004)"
  - "Orçamento < R$500/mês → AVISAR: 'Com esse orçamento, o algoritmo mal vai aprender. Considere começar com R$30-50/dia mínimo.' (PS_DH_005)"
  - "Campanha sem criativo definido → REFAZER: '85% do resultado é criativo. Sem criativo, não tem campanha.' (PS_DH_002)"
  - "Plano genérico sem referência ao negócio específico → REFAZER"
```
