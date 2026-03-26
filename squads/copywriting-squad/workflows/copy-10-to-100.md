# Workflow: Copy 10→100 — Departamento de Copy como Ativo Estratégico

## Metadados
```yaml
id: copy-10-to-100
versao: 1.0.0
duracao: 4-8 semanas (implementação gradual, revisão trimestral)
complexidade: muito-alta
estagio: "10→100"
output: Arquitetura de mensagem + biblioteca central + cultura de teste + operação de copy
dependencies:
  required_data:
    - copy-stages-ontology.md
  required_pre:
    - copy-1-to-10.md (deve ter multicanal, messaging guide e time)
  checklists:
    - awareness-checklist.md
    - sugarman-31-triggers.md
    - audit-copy-hopkins.md
    - sales-letter-checklist.md
    - vsl-quality-checklist.md
```

---

## VISÃO GERAL

Copy é infraestrutura do negócio. Mensagem consistente em escala, múltiplos mercados, múltiplos copywriters. O desafio não é escrever copy — é manter qualidade e coerência quando várias pessoas escrevem para vários canais.

**Pré-requisito:** Ter passado pelo 1→10 — multicanal, messaging guide, time, framework de testes.

**Princípio:** No 10→100, o sistema é o produto. Um copywriter novo deve conseguir produzir copy on-brand em 2 semanas usando a documentação.

---

## FASE 1: MERCADO — Inteligência Institucional (1-2 semanas)

**Clone principal:** @eugene-schwartz
**Clone de apoio:** @david-ogilvy

### Passo 1.1: Research Sistemático por Segmento
**Clone:** @eugene-schwartz

Evoluir de pesquisa ad-hoc para inteligência contínua:

```yaml
research_sistema:
  por_segmento:
    - segmento: ""
      fontes_primarias: [] # Entrevistas, tickets, NPS
      fontes_secundarias: [] # Reviews, comunidades, social listening
      cadencia: "Mensal"
      responsavel: ""
      output: "Atualização do VoC + mapa de objeções do segmento"
  voc_dashboard:
    metricas:
      - "Top 10 frases literais do mês (por segmento)"
      - "Novas objeções identificadas"
      - "Mudanças de awareness percebidas"
    atualizacao: "Quinzenal"
```

### Passo 1.2: Mapeamento de Sofisticação do Mercado
**Clone:** @eugene-schwartz

Além de awareness, mapear o nível de sofisticação (quantas promessas similares o mercado já ouviu):

```yaml
sofisticacao:
  nivel_1: "Mercado virgem — ser o primeiro é suficiente"
  nivel_2: "Segundas promessas — expandir a afirmação"
  nivel_3: "Mecanismo — explicar como funciona"
  nivel_4: "Mecanismo expandido — detalhar e sofisticar"
  nivel_5: "Identificação — conectar com a identidade do prospect"

  mercado_atual: "" # Em que nível está
  implicacao: "" # O que isso muda na copy
```

### Passo 1.3: Inteligência Competitiva Automatizada
```yaml
tracking_competitivo:
  concorrentes_tier1: [] # Top 3 diretos
  concorrentes_tier2: [] # 5 indiretos
  monitoramento:
    - "Ads Library (Meta, Google) — novas campanhas"
    - "Páginas de venda — mudanças de oferta/preço"
    - "Conteúdo — mudanças de posicionamento"
  cadencia: "Semanal"
  formato_report: "Diff report — o que mudou desde última análise"
```

### Passo 1.4: Segmentação Avançada
Cruzar awareness x vertical x caso de uso:

```yaml
matriz_mensagem:
  # Cada célula = mensagem específica
  segmentos:
    - vertical: "" # Ex: "E-commerce"
      caso_uso: "" # Ex: "Primeiro produto digital"
      awareness: "" # Ex: "Solution Aware"
      mensagem: "" # Ex: "O método X é o único que..."
      clone_recomendado: "" # Ex: "@todd-brown"
```

**Output:** Sistema de research + mapa de sofisticação + tracking competitivo + matriz de mensagem.

### CHECKPOINT CP-1
- [ ] Research sistematizado com cadência e responsáveis?
- [ ] Sofisticação do mercado mapeada (nível 1-5)?
- [ ] Tracking competitivo automatizado para top 3?
- [ ] Matriz mensagem x segmento documentada?

**VETO:** Se usa a mesma mensagem para todos os segmentos → PARAR. No 10→100, mensagem genérica é desperdício de budget.

---

## FASE 2: MENSAGEM — Arquitetura em Escala (1-2 semanas)

**Clone principal:** @david-ogilvy
**Clone de apoio:** @stefan-georgi

### Passo 2.1: Arquitetura de Mensagem
**Clone:** @david-ogilvy

```yaml
arquitetura_mensagem:
  master_message: "" # A essência do negócio em 1 frase
  por_segmento:
    - segmento: ""
      promessa: ""
      tom: ""
      prova_principal: ""
  por_estagio_funil:
    topo: "" # Mensagem de awareness
    meio: "" # Mensagem de consideração
    fundo: "" # Mensagem de conversão
    retencao: "" # Mensagem de expansão
```

### Passo 2.2: Brand Voice Completo
**Clone:** @david-ogilvy

```yaml
brand_voice:
  manifesto: "" # 1 parágrafo que define a voz da marca
  dimensoes:
    formalidade: "" # Ex: "7/10 — profissional mas acessível"
    humor: "" # Ex: "3/10 — sério com pitadas de ironia"
    autoridade: "" # Ex: "9/10 — fala com propriedade"
    empatia: "" # Ex: "8/10 — entende a dor antes de resolver"
  por_canal:
    email: "" # Ex: "Mais pessoal, como se escrevesse para 1 pessoa"
    ads: "" # Ex: "Mais direto, sem floreios"
    social: "" # Ex: "Mais casual, com opinião forte"
    produto: "" # Ex: "Funcional, claro, sem marketing"
  exemplos:
    bom_uso:
      - contexto: ""
        exemplo: ""
    mau_uso:
      - contexto: ""
        exemplo: ""
        correcao: ""
```

### Passo 2.3: Messaging Guide Vivo
Evoluir o guide do 1→10 para documento institucional:

```yaml
messaging_guide_v2:
  promessas_aprovadas:
    - nivel: "Headline/Hero"
      promessas: []
      prova_vinculada: [] # Cada promessa com a prova que a sustenta
    - nivel: "Body copy"
      promessas: []
      prova_vinculada: []
  claims_com_prova:
    - claim: "" # Ex: "4.200 alunos transformados"
      prova: "" # Ex: "Dados do CRM, extraído em 2026-03"
      validade: "" # Ex: "Atualizar trimestralmente"
  vocabulario:
    termos_marca: [] # Palavras que definem a marca
    termos_proibidos: [] # Palavras que nunca usar
    termos_cuidado: [] # Palavras que só usar em contexto X
```

### Passo 2.4: Narrativa Estratégica
**Clone:** @david-ogilvy

```yaml
narrativas:
  origin_story: "" # Como e por que o negócio existe
  narrativa_categoria: "" # Que movimento o negócio lidera
  por_produto:
    - produto: ""
      narrativa: "" # A história desse produto específico
```

**Output:** Arquitetura de mensagem + brand voice + messaging guide v2 + narrativas.

### CHECKPOINT CP-2
- [ ] Master message definida?
- [ ] Brand voice documentado com dimensões e exemplos?
- [ ] Claims com prova vinculada e prazo de validade?
- [ ] Narrativa estratégica (origin + categoria)?

**VETO:** Se brand voice é genérico ("profissional e amigável" sem exemplos) → PARAR. Deve ser específico o suficiente para distinguir da concorrência.

---

## FASE 3: OFERTA — Arquitetura de Produtos (1 semana)

**Clone principal:** @alex-hormozi
**Clone de apoio:** @dan-kennedy

### Passo 3.1: Linha de Produtos
**Clone:** @alex-hormozi

```yaml
produto_jornada:
  entrada:
    nome: ""
    preco: ""
    objetivo: "Converter lead em comprador"
    copy_focus: "Valor imediato, resultado rápido"
  core:
    nome: ""
    preco: ""
    objetivo: "Resolver o problema principal"
    copy_focus: "Transformação completa"
  premium:
    nome: ""
    preco: ""
    objetivo: "Resultado acelerado + proximidade"
    copy_focus: "Exclusividade, acesso, velocidade"
  continuidade:
    nome: "" # Ex: membership, assinatura
    preco: ""
    objetivo: "Reter e expandir LTV"
    copy_focus: "Comunidade, atualização, suporte"
```

### Passo 3.2: Pricing Matrix por Segmento
```yaml
pricing:
  - segmento: ""
    produto_mais_vendido: ""
    ticket_medio: ""
    ltv: ""
    elasticidade: "" # Ex: "Teste de +20% não afetou CVR"
```

**Output:** Linha de produtos com jornada de valor + pricing por segmento.

### CHECKPOINT CP-3
- [ ] Jornada de produto clara (entrada → core → premium → continuidade)?
- [ ] Pricing por segmento documentado?
- [ ] Copy focus definido por produto?

---

## FASE 4: FORMATO — Biblioteca Central de Ativos (2-3 semanas)

**Clone principal:** @stefan-georgi (processos)
**Clone de apoio:** Todos os executores conforme formato

### Passo 4.1: Sistema de Funis por Canal
Documentar funis completos:

```yaml
funis:
  aquisicao:
    - canal: ""
      topo: "" # Peças e copy
      meio: "" # Nutrição
      fundo: "" # Conversão
      metricas: "" # KPIs por etapa
  ativacao:
    - produto: ""
      onboarding: "" # Sequência
      first_value: "" # Momento de primeiro valor
      activation_metric: ""
  expansao:
    - trigger: "" # Ex: "30 dias após compra"
      oferta_upsell: ""
      copy: ""
      cvr_historico: ""
```

### Passo 4.2: Formatos com Templates e Controles

| Formato | Template | Controle Ativo | Métricas | Clone |
|---------|----------|---------------|----------|-------|
| VSL | vsl-script-tmpl.md | {versão atual} | CVR, watch time | @jon-benson |
| Sales Page | sales-page-completa-tmpl.md | {versão atual} | CVR, scroll depth | @gary-halbert |
| Email Venda | email-sequence-tmpl.md | {versão atual} | Open, click, CVR | @ben-settle |
| Ads | ad-creative-tmpl.md | {versão atual} | CTR, CPC, ROAS | @john-carlton |
| Webinar | webinar-script-tmpl.md | {versão atual} | Show rate, CVR | @jon-benson |
| Conteúdo | post-organico-tmpl.md | {versão atual} | Engagement, reach | @dan-koe |

### Passo 4.3: Biblioteca Central
**Clone:** @stefan-georgi

```yaml
biblioteca_central:
  organizacao: "Por formato → por canal → por segmento"
  versionamento: "v{major}.{minor} — major = rewrite, minor = tweak"
  controles:
    - formato: ""
      versao_ativa: ""
      data_desde: ""
      metricas: ""
      proximo_desafiante: ""
  processo_atualizacao:
    - "Novo desafiante supera controle por 2+ semanas → vira novo controle"
    - "Controle sem desafio por 30+ dias → criar desafiante obrigatório"
```

**Output:** Sistema de funis + biblioteca central com controles e métricas.

### CHECKPOINT CP-4
- [ ] Funis documentados por canal (aquisição + ativação + expansão)?
- [ ] Cada formato tem template + controle ativo + métricas?
- [ ] Processo de atualização de controles definido?

**VETO:** Se controles não têm métricas associadas → PARAR. Sem dados, não existe controle — existe achismo.

---

## FASE 5: CANAL — Omnichannel com Especialistas (2-3 semanas)

**Clone principal:** Varia por canal
**Clone de apoio:** @claude-hopkins (otimização cross-canal)

### Passo 5.1: Copy por Plataforma

```yaml
canais:
  email_crm:
    clone: "@ben-settle + @andre-chaperon"
    automacoes: [] # Listar todas
    segmentacao_comportamental: "" # Baseada em ações, não em dados demográficos
    calendario: "" # Broadcasts + automações
  midia_paga:
    clone: "@john-carlton + @jon-benson"
    plataformas: [] # Meta, Google, YouTube, LinkedIn
    matriz_angulo_audiencia:
      - angulo: ""
        audiencia: ""
        copy: ""
        performance: ""
    iteracao_criativos: "" # Como gera variações sistematicamente
  organico:
    clone: "@dan-koe + @david-ogilvy"
    seo: "" # Estratégia de conteúdo orgânico
    thought_leadership: "" # Posicionamento como autoridade
    comunidade: "" # Grupos, parcerias, PR
  produto:
    clone: "@david-ogilvy"
    ux_writing: "" # Microcopy, tooltips, onboarding
    notificacoes: "" # Push, in-app, email transacional
  emergentes:
    audio_podcast: ""
    video_curto: "" # Reels, Shorts, TikTok
    conversacional: "" # WhatsApp, chatbots
```

### Passo 5.2: Consistência Cross-Canal
**Clone:** @claude-hopkins

```yaml
consistencia:
  regra: "Mesma mensagem, adaptada ao canal — nunca mensagem diferente"
  audit_trimestral:
    - "Coletar amostra de copy de cada canal"
    - "Verificar aderência ao messaging guide"
    - "Identificar desvios e corrigir"
  dashboard:
    - "Brand voice score por canal (1-10)"
    - "Consistência de promessa (sim/não)"
    - "Uso de termos proibidos (contagem)"
```

**Output:** Copy especializada por canal + sistema de consistência.

### CHECKPOINT CP-5
- [ ] 4+ canais operando com copy especializada?
- [ ] Matriz ângulo x audiência para mídia paga?
- [ ] Audit de consistência implementado?

---

## FASE 6: TESTE — Cultura e Banco de Conhecimento (contínuo)

**Clone principal:** @claude-hopkins

### Passo 6.1: Cultura de Teste
```yaml
cultura:
  principios:
    - "Toda copy é uma hipótese até ser testada"
    - "Controles existem para serem batidos"
    - "Insights de um canal podem valer em outro"
  quem_pode_testar:
    - "Copywriter: headline, lead, bullets, emails"
    - "Head de copy: oferta, promessa, posicionamento"
    - "C-level: marca, categoria, narrativa"
  cadencia:
    - "1 teste ativo por canal por semana (mínimo)"
    - "Review de resultados: quinzenal"
    - "Consolidação de insights: mensal"
```

### Passo 6.2: Sistema de Testes por Nível
```yaml
niveis:
  nivel_1_estrategico:
    o_que: "Oferta, posicionamento, promessa mestre"
    quem_aprova: "Head de copy + C-level"
    duracao_minima: "2-4 semanas"
    significancia: "95%"
  nivel_2_tatico:
    o_que: "Mensagem, ângulo, tom"
    quem_aprova: "Head de copy"
    duracao_minima: "1-2 semanas"
    significancia: "90%"
  nivel_3_operacional:
    o_que: "Formato, estrutura, extensão"
    quem_aprova: "Copywriter sênior"
    duracao_minima: "1 semana"
    significancia: "85%"
  nivel_4_micro:
    o_que: "Elementos, microcopy, botões, subject lines"
    quem_aprova: "Copywriter"
    duracao_minima: "3-5 dias"
    significancia: "80%"
```

### Passo 6.3: Banco de Conhecimento Institucional
```yaml
banco:
  principios_validados:
    - principio: "" # Ex: "Dor > aspiração no segmento X"
      evidencia: "" # Ex: "5 testes confirmam, CVR +23% médio"
      aplicavel_a: [] # Segmentos/canais onde vale
  nunca_mais_testar:
    - hipotese: "" # Ex: "Humor em ads de saúde"
      resultado: "" # Ex: "3 testes, todos com CTR -40%"
      data: ""
  insights_transferiveis:
    - insight: "" # Ex: "Números ímpares em headlines performam melhor"
      canal_origem: "" # Ex: "Email"
      validado_em: [] # Ex: ["Ads", "Landing page"]
  metricas_copy:
    por_canal: "" # CTR, CVR, ROAS
    por_funil: "" # Ativação, retenção, expansão
    copy_score: "" # Métrica interna composta
```

**Output:** Cultura de teste + banco de conhecimento institucional.

### CHECKPOINT CP-6 (FINAL)
- [ ] Cultura de teste documentada com princípios e cadência?
- [ ] Testes por nível com aprovadores e significância?
- [ ] Banco de conhecimento com 15+ insights validados?
- [ ] Copy score definido como métrica interna?

---

## FASE 7: OPERAÇÃO — O Departamento (contínuo)

**Clone principal:** @stefan-georgi (processos)

### Passo 7.1: Estrutura do Time
```yaml
time:
  head_de_copy:
    funcao: "Estratégia, brand voice, aprovação final"
    skills: "Estratégia + execução + liderança"
  copywriters:
    - especialidade: "" # Ex: "Email e automações"
      nivel: "" # Jr, Pleno, Sênior
    - especialidade: "" # Ex: "Ads e landing pages"
      nivel: ""
  freelancers:
    - quando_usar: "Picos de demanda, formatos especializados"
      onboarding: "Messaging guide + 2 peças supervisionadas"
```

### Passo 7.2: Processo de Produção
```yaml
processo:
  brief:
    template: "brief-estrategico-tmpl.md"
    quem_cria: "Solicitante + Head de copy"
    campos_obrigatorios:
      - "Objetivo da peça"
      - "Público/segmento"
      - "Canal e formato"
      - "Mensagem principal (do messaging guide)"
      - "CTA desejado"
      - "Deadline"
  fluxo:
    1_brief: "Solicitante → Head de copy"
    2_rascunho: "Copywriter → Rascunho 1"
    3_revisao: "Head de copy → Feedback"
    4_final: "Copywriter → Versão final"
    5_aprovacao: "Head de copy → Aprovado/Ajustar"
    6_publicacao: "Canal owner → Publicar"
  sla:
    email: "2 dias úteis"
    ads: "3 dias úteis"
    sales_page: "5 dias úteis"
    vsl: "7 dias úteis"
```

### Passo 7.3: Qualidade e Desenvolvimento
```yaml
qualidade:
  checklist_pre_publicacao:
    - "Aderente ao messaging guide?"
    - "Brand voice consistente?"
    - "Claims com prova vinculada?"
    - "CTA claro e único?"
    - "Revisão ortográfica e gramatical?"
  audit_trimestral:
    - "Revisar todos os controles ativos"
    - "Atualizar messaging guide com novos insights"
    - "Descontinuar peças com performance abaixo do threshold"
  desenvolvimento:
    trilha:
      jr: "Seguir templates → copiar controles → criar variações"
      pleno: "Criar peças do zero → testar ângulos → otimizar"
      senior: "Definir estratégia → criar frameworks → mentorear jr"
    rituais:
      - "Critique session semanal (1h)"
      - "Swipe review mensal"
      - "Workshop trimestral de skills"
```

**Output:** Time estruturado + processo documentado + qualidade garantida.

### CHECKPOINT CP-7 (OPERACIONAL)
- [ ] Estrutura do time definida?
- [ ] Processo de produção com SLA?
- [ ] Checklist pré-publicação implementado?
- [ ] Trilha de desenvolvimento para o time?

---

## VETO CONDITIONS

| ID | Condição | Severidade | Ação |
|----|----------|-----------|------|
| VT-1 | Escalar canais sem arquitetura de mensagem | BLOCKING | PARAR — mensagem inconsistente em escala destrói marca |
| VT-2 | Controles sem métricas | BLOCKING | PARAR — sem dados, não há otimização |
| VT-3 | Copywriter novo sem onboarding (messaging guide + peça supervisionada) | HIGH | PAUSAR — onboarding antes de publicar |
| VT-4 | Claims sem prova vinculada | HIGH | PAUSAR — vincular prova ou remover claim |
| VT-5 | 30+ dias sem teste ativo em nenhum canal | HIGH | PAUSAR — estagnação é regressão |
| VT-6 | Brand voice genérico ("profissional e amigável") | HIGH | PAUSAR — especificar com exemplos e dimensões |

---

**Versão:** 1.0.0
**Ontologia base:** `data/copy-stages-ontology.md`
