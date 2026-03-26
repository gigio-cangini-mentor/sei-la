# Workflow: Copy 1→10 — Operação de Copy Tomando Forma

## Metadados
```yaml
id: copy-1-to-10
versao: 1.0.0
duracao: 2-4 semanas (execução gradual)
complexidade: alta
estagio: "1→10"
output: Messaging guide + funis documentados + multicanal operando + framework de testes
dependencies:
  required_data:
    - copy-stages-ontology.md
  required_pre:
    - copy-0-to-1.md (deve ter vendas recorrentes antes de escalar)
  feeds_into:
    - copy-10-to-100.md (quando operar 4+ canais com time dedicado)
  checklists:
    - awareness-checklist.md
    - sugarman-31-triggers.md
    - audit-copy-hopkins.md
    - sales-letter-checklist.md
    - vsl-quality-checklist.md
```

---

## VISÃO GERAL

Copy deixa de ser tarefa do founder. O objetivo é criar **sistemas replicáveis**: messaging guide, funis documentados, templates por formato e um framework de teste que qualquer copywriter possa seguir.

**Pré-requisito:** Ter passado pelo 0→1 — vendas recorrentes, canal validado, controle de copy definido.

**Princípio:** No 1→10, consistência > criatividade. Melhor um sistema mediano que roda sozinho do que copy genial que depende do founder.

---

## FASE 1: MERCADO — Inteligência Sistemática (3-5 dias)

**Clone principal:** @eugene-schwartz
**Clone de apoio:** @dan-kennedy

### Passo 1.1: Ritual de Pesquisa
**Clone:** @dan-kennedy

Criar um processo recorrente de pesquisa de mercado:

```yaml
ritual_pesquisa:
  frequencia: "Quinzenal"
  fontes:
    - reviews_novos: "Amazon, G2, Reclame Aqui — novas reclamações e elogios"
    - comunidades: "Monitorar 3-5 grupos/fóruns do nicho"
    - concorrentes: "Swipe de ads e pages dos top 5"
    - suporte: "Tickets e dúvidas recorrentes dos próprios clientes"
  output: "Atualizar banco de VoC + mapa de objeções"
  responsavel: "" # Quem faz isso (founder ou delegar)
```

### Passo 1.2: Segmentação por ICP
**Clone:** @dan-kennedy

Definir e ranquear ICPs (Ideal Customer Profiles):

```yaml
icps:
  icp_primario:
    nome: ""
    descricao: ""
    awareness: "" # Nível predominante
    dor_principal: ""
    canal_preferido: ""
    ticket_medio: ""
    ltv_estimado: ""
  icp_secundario:
    nome: ""
    descricao: ""
    awareness: ""
    dor_principal: ""
    canal_preferido: ""
    ticket_medio: ""
    ltv_estimado: ""
```

### Passo 1.3: Mensagem por Segmento
**Clone:** @eugene-schwartz

Para cada ICP, definir:
- Nível de awareness predominante
- Promessa que mais ressoa
- Objeções específicas do segmento
- Tom de copy (emocional vs racional)

### Passo 1.4: Monitoramento Competitivo
Criar swipe file organizado:

```yaml
swipe_concorrentes:
  concorrente_1:
    nome: ""
    posicionamento: ""
    promessa_principal: ""
    mecanismo: ""
    preco: ""
    pontos_fortes: []
    gaps: [] # Onde eles falham e você pode explorar
  # Repetir para top 3-5 concorrentes
```

**Output:** ICPs ranqueados + mensagem por segmento + swipe competitivo.

### CHECKPOINT CP-1
- [ ] Pelo menos 2 ICPs definidos e ranqueados?
- [ ] Awareness mapeado por segmento?
- [ ] Mensagem diferenciada por ICP?
- [ ] Swipe de pelo menos 3 concorrentes?

**VETO:** Se os 2 ICPs têm a mesma mensagem → PARAR. Segmentação sem diferenciação de mensagem é ilusão.

---

## FASE 2: MENSAGEM — Documentar e Proteger (2-3 dias)

**Clone principal:** @stefan-georgi
**Clone de apoio:** @david-ogilvy

### Passo 2.1: Message Core
**Clone:** @stefan-georgi (RMBC Method)

Documentar o núcleo de mensagem que NUNCA muda:

```yaml
message_core:
  promessa_mestre: "" # A promessa central do negócio
  mecanismo_unico: "" # Por que funciona (documentado do 0→1)
  pilares_de_prova:
    - pilar_1: "" # Ex: "4.200 alunos transformados"
    - pilar_2: "" # Ex: "Metodologia publicada na Harvard BR"
    - pilar_3: "" # Ex: "12 anos de experiência prática"
```

### Passo 2.2: Hierarquia de Benefícios
**Clone:** @gary-bencivenga

```yaml
hierarquia:
  beneficio_principal: "" # O resultado #1 que vende
  beneficios_secundarios:
    - beneficio: ""
      prova: "" # Dado, caso ou depoimento que comprova
    - beneficio: ""
      prova: ""
  features_to_benefits:
    - feature: "" # Ex: "12 módulos em vídeo"
      benefit: "" # Ex: "Dominar copy em 90 dias no seu ritmo"
      so_what: "" # Ex: "Liberdade para parar de depender de agência"
```

### Passo 2.3: Messaging Guide
**Clone:** @david-ogilvy

O documento que qualquer copywriter (humano ou AI) precisa seguir:

```yaml
messaging_guide:
  tom_de_voz:
    descricao: "" # Ex: "Direto, sem floreios, como amigo que manja"
    exemplos_bom_uso:
      - ""
    exemplos_mau_uso:
      - ""
  frases_aprovadas:
    - frase: ""
      quando_usar: ""
  frases_proibidas:
    - frase: ""
      por_que: ""
  vocabulario_marca:
    sempre_usar: [] # Ex: ["transformação", "método", "resultado"]
    nunca_usar: [] # Ex: ["fácil", "rápido", "garantido"]
  regras_especificas:
    - regra: ""
      exemplo: ""
```

**Output:** Message Core + Hierarquia de Benefícios + Messaging Guide.

### CHECKPOINT CP-2
- [ ] Promessa mestre documentada com pilares de prova?
- [ ] Features mapeadas para benefits (com "so what")?
- [ ] Messaging guide com tom, frases aprovadas/proibidas?
- [ ] Guia é claro o suficiente para outro copywriter seguir?

**VETO:** Se messaging guide não passa o "teste do estagiário" (alguém novo conseguiria escrever copy consistente seguindo isso?) → PARAR. Reescrever com mais exemplos.

---

## FASE 3: OFERTA — Otimizar e Expandir (2-3 dias)

**Clone principal:** @alex-hormozi
**Clone de apoio:** @todd-brown

### Passo 3.1: Audit da Oferta Atual
Com os dados do 0→1, analisar:

```yaml
audit_oferta:
  taxa_conversao_atual: ""
  ticket_medio: ""
  refund_rate: ""
  objecao_mais_comum_no_checkout: ""
  componente_mais_valorizado: "" # O que clientes mais elogiam
  componente_menos_usado: "" # O que ninguém usa (candidato a cortar)
```

### Passo 3.2: Variações de Oferta
**Clone:** @alex-hormozi

```yaml
ofertas:
  tripwire:
    descricao: "" # Oferta de entrada (R$7-97)
    objetivo: "Converter lead em comprador"
    componentes: []
  principal:
    descricao: "" # Oferta core (preço médio)
    objetivo: "Resolver o problema principal"
    componentes: []
  premium:
    descricao: "" # Upsell/high-ticket
    objetivo: "Resultado acelerado + proximidade"
    componentes: []
```

### Passo 3.3: Garantia Otimizada
Analisar dados de refund e ajustar:

```yaml
garantia_otimizada:
  tipo_atual: ""
  refund_rate: ""
  ajuste: "" # Ex: "Mudar de incondicional para condicional (fazer X primeiro)"
  impacto_esperado: "" # Ex: "Reduzir refund de 8% para 3%"
```

**Output:** Linha de ofertas (tripwire → principal → premium) com garantias otimizadas.

### CHECKPOINT CP-3
- [ ] Oferta atual auditada com dados reais?
- [ ] Pelo menos 2 variações de oferta (entrada + principal)?
- [ ] Garantia ajustada baseada em dados de refund?

---

## FASE 4: FORMATO — Sistema de Funis (5-7 dias)

**Clone principal:** @jon-benson (VSL) + @gary-halbert (sales page)
**Clone de apoio:** @andre-chaperon (email) + @ben-settle (broadcast)

### Passo 4.1: Funil de Aquisição
Documentar o funil completo:

```
TOPO (Atenção)
├── Ads / Conteúdo orgânico
├── Lead magnet / Isca
└── Landing page de captura

MEIO (Nutrição)
├── Sequência de boas-vindas (3-7 emails)
├── Conteúdo educacional
└── Quebra de objeções

FUNDO (Conversão)
├── Sales page / VSL / Webinar
├── Sequência de venda (5-10 emails)
└── Follow-up e urgência
```

### Passo 4.2: Criar Peças por Etapa do Funil

**Topo — @dan-koe + @john-carlton:**
- 5-10 variações de ad copy ou posts orgânicos
- Landing page de captura

**Meio — @andre-chaperon:**
- Soap Opera Sequence de nutrição (5-7 emails)
- 3-5 conteúdos educacionais que vendem sem vender

**Fundo — @jon-benson OU @gary-halbert:**
- VSL ou Sales Page completa (para oferta principal)
- Sequência de venda com @ben-settle

**Retenção — @andre-chaperon:**
- Onboarding por email
- Sequência de reativação

### Passo 4.3: Biblioteca de Ativos
Organizar tudo que já foi criado:

```yaml
biblioteca:
  templates_aprovados:
    - formato: "Email de venda"
      template: "email-sequence-tmpl.md"
      controle_ativo: "" # Versão que mais converte
    - formato: "Sales page"
      template: "sales-page-completa-tmpl.md"
      controle_ativo: ""
  swipe_interno:
    - peca: ""
      performance: "" # CTR, CVR, etc.
      data: ""
```

**Output:** Funil documentado + peças por etapa + biblioteca de ativos.

### CHECKPOINT CP-4
- [ ] Funil tem topo + meio + fundo documentados?
- [ ] Pelo menos 1 peça de copy para cada etapa?
- [ ] Email sequences criadas (nutrição + venda)?
- [ ] Biblioteca de ativos organizada?

**VETO:** Se funil pula direto de topo para fundo (sem nutrição) → PARAR. No 1→10, nutrição é o que diferencia escala de desperdício.

---

## FASE 5: CANAL — Multicanal com Foco (3-5 dias)

**Clone principal:** @john-carlton (ads) + @ben-settle (email)
**Clone de apoio:** @dan-koe (orgânico)

### Passo 5.1: Expandir do Canal Validado
Partir do canal que funcionou no 0→1 e adicionar 1-2 canais:

```yaml
expansao_canais:
  canal_primario:
    nome: "" # O que já funciona
    metricas: "" # CPA, ROAS, CVR
    copy_adaptada: "Sim"
  canal_secundario:
    nome: "" # Próximo canal a testar
    criterio_escolha: "" # Por que este canal
    budget_teste: "" # Quanto investir no teste
    copy_adaptada: "Em progresso"
```

### Passo 5.2: Email como Backbone
**Clone:** @ben-settle + @andre-chaperon

Independente do canal de aquisição, email é o backbone:

```yaml
email_backbone:
  lista_tamanho: ""
  segmentacao:
    - segmento: "Leads novos (< 7 dias)"
      sequencia: "Boas-vindas + nutrição"
    - segmento: "Engajados (abrem 3+ emails)"
      sequencia: "Oferta principal"
    - segmento: "Inativos (30+ dias sem abrir)"
      sequencia: "Reativação"
  calendario:
    broadcasts: "" # Ex: "3x por semana"
    automacoes: "" # Quantas sequências ativas
```

### Passo 5.3: Copy por Canal
Adaptar messaging guide para cada canal:

| Canal | Tom | Extensão | CTA |
|-------|-----|----------|-----|
| Meta Ads | Direto, visual | Curto (125 chars) ou longo (post) | Link na bio / LP |
| Google Ads | Intencional | Curto (headlines + descriptions) | LP direta |
| Email | Pessoal, conversacional | Médio (300-800 palavras) | Botão/link |
| Orgânico | Valor primeiro | Varia por formato | Bio / link na bio |

**Output:** 2-3 canais operando com copy adaptada + email como backbone.

### CHECKPOINT CP-5
- [ ] Canal primário com métricas documentadas?
- [ ] Pelo menos 1 canal secundário em teste?
- [ ] Email backbone configurado com segmentação?
- [ ] Copy adaptada por canal (não copy genérica em todos)?

---

## FASE 6: TESTE — Framework de Priorização (contínuo)

**Clone principal:** @claude-hopkins

### Passo 6.1: Framework ICE
Priorizar testes por impacto:

```yaml
ice_framework:
  teste:
    descricao: ""
    impact: "" # 1-10 (quanto muda o resultado)
    confidence: "" # 1-10 (quão confiante estou que funciona)
    ease: "" # 1-10 (quão fácil de implementar)
    score: "" # I × C × E
    prioridade: "" # Rank
```

### Passo 6.2: Hierarquia de Testes
Testar na ordem que mais impacta:

1. **Nível 1 — Oferta e Promessa** (maior impacto)
   - Oferta A vs Oferta B
   - Promessa A vs Promessa B
   - Preço A vs Preço B

2. **Nível 2 — Headline e Lead** (alto impacto)
   - Headline A vs Headline B
   - Lead tipo story vs lead tipo pergunta
   - Hook de ad A vs Hook B

3. **Nível 3 — Formato e Estrutura** (médio impacto)
   - Long-form vs short-form
   - VSL vs sales page
   - Email longo vs email curto

### Passo 6.3: Banco de Aprendizados
```yaml
banco_testes:
  - teste: ""
    data: ""
    hipotese: ""
    resultado: ""
    aprendizado: ""
    aplicavel_a: [] # Em que outros contextos esse insight vale
```

**Output:** Framework de testes ativo + banco de aprendizados.

### CHECKPOINT CP-6 (FINAL)
- [ ] Framework ICE implementado?
- [ ] Pelo menos 3 testes no banco de aprendizados?
- [ ] Insights sendo aplicados cross-canal?

---

## VETO CONDITIONS

| ID | Condição | Severidade | Ação |
|----|----------|-----------|------|
| VT-1 | Expandir canal sem ter messaging guide | BLOCKING | PARAR — documentar mensagem antes de escalar |
| VT-2 | Funil sem etapa de nutrição | BLOCKING | PARAR — criar nutrição antes de escalar tráfego |
| VT-3 | Copy idêntica em todos os canais | HIGH | PAUSAR — adaptar copy por canal |
| VT-4 | Zero testes A/B rodando | HIGH | PAUSAR — implementar pelo menos 1 teste por semana |
| VT-5 | Email não segmentado (blast geral) | HIGH | PAUSAR — segmentar antes de enviar |

---

## CRITÉRIO DE GRADUAÇÃO (1→10 completo)

```yaml
graduacao:
  criterios:
    - "Opera 3+ canais com copy adaptada por canal"
    - "Messaging guide documentado e seguido por outros"
    - "Framework de teste ativo com cadência regular"
    - "Time de 2+ pessoas trabalhando com copy"
    - "Banco de aprendizados com 10+ insights validados"
    - "Email backbone com segmentação e automações"
  workflow_seguinte: "copy-10-to-100.md"
```

---

**Versão:** 1.0.0
**Ontologia base:** `data/copy-stages-ontology.md`
