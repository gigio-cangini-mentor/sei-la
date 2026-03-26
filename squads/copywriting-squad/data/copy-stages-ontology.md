# Ontologia de Copy por Estágio de Negócio

## Visão Geral

Framework de diagnóstico que organiza a operação de copy em **3 estágios de maturidade do negócio** e **6 camadas temáticas**. O copy-maestro usa esta ontologia para diagnosticar onde o cliente está e rotear para o workflow correto.

---

## Espinha Ontológica

| Camada | 0→1 | 1→10 | 10→100 |
|--------|-----|------|--------|
| **Mercado** | Você pesquisando sozinho | Ritual sistemático + segmentação | Inteligência institucional |
| **Mensagem** | Encontrando a promessa | Documentando e protegendo | Arquitetando em escala |
| **Oferta** | Validando o que vende | Otimizando stack e preço | Linha de produtos com upsell |
| **Formato** | Peças mínimas para vender | Sistema de funis | Biblioteca central de ativos |
| **Canal** | Um canal, fundo total | Multicanal com foco | Omnichannel com especialistas |
| **Teste** | Vendeu ou não vendeu? | Framework de priorização | Cultura e banco de conhecimento |
| **Operação** | Ausente (founder faz tudo) | Nascendo (1-2 pessoas) | Departamento estratégico |

---

## Diagnóstico Rápido (5 perguntas)

O copy-maestro deve fazer estas perguntas para classificar o estágio:

```yaml
diagnostico_estagio:
  q1: "Você já tem vendas recorrentes desse produto/serviço?"
  # Não → 0→1 | Sim → próxima
  q2: "Quantas pessoas trabalham com copy/conteúdo no seu negócio?"
  # Só eu → 0→1 | 1-3 → 1→10 | 4+ → 10→100
  q3: "Você tem um messaging guide ou brand voice documentado?"
  # Não → 0→1 ou 1→10 | Sim → 1→10 ou 10→100
  q4: "Quantos canais de aquisição você opera simultaneamente?"
  # 0-1 → 0→1 | 2-3 → 1→10 | 4+ → 10→100
  q5: "Você tem um processo de teste A/B com cadência regular?"
  # Não → 0→1 ou 1→10 | Sim com ICE → 10→100
```

---

## Estágio 0→1 — Founder Escrevendo a Própria Copy

**Objetivo:** Encontrar a mensagem que converte antes de escalar qualquer coisa.

### Camada 1: Mercado
- **Consciência do Problema**
  - Níveis de Consciência (Schwartz)
  - O que o cliente sente mas não consegue nomear
  - Linguagem Literal do Mercado (exatamente como falam)
- **Pesquisa Profunda**
  - Reviews de Concorrentes (Amazon, G2, Trustpilot)
  - Grupos, Fóruns e Comunidades
  - Entrevistas e Transcrições
- **Perfil Psicográfico**
  - Medos e Frustrações
  - Desejos e Aspirações
  - Crenças Limitantes e Objeções

### Camada 2: Mensagem
- **Promessa Central**
  - Resultado Específico e Prazo
  - Para quem é (e para quem não é)
  - Versões da Promessa Testadas
- **Mecanismo Único**
  - Por que funciona (a lógica interna)
  - Nome do Mecanismo
  - Prova do Mecanismo
- **Posicionamento**
  - Categoria que Criamos ou Ocupamos
  - Diferencial vs Concorrentes
  - Declaração de Posicionamento

### Camada 3: Oferta
- **Stack de Valor**
  - Componentes core + aceleradores + facilitadores
  - Valor percebido de cada componente
  - Nome sexy para cada item
- **Preço e Garantia**
  - Posicionamento de preço (ancoragem)
  - Garantia que remove risco
  - Termos e condições
- **Bônus Estratégicos**
  - Bônus que resolvem objeções específicas
  - Bônus de urgência/escassez

### Camada 4: Formato
- **Fundamentos de Copy**
  - Headlines e Ganchos
  - Leads (Abertura dos 6 tipos)
  - Estruturas de Argumento (AIDA, PAS, BAB)
- **Peças Essenciais do 0→1**
  - Landing Page de Captura
  - Sequência de E-mail de Boas-vindas
  - Página de Vendas (Long-form básica)
- **Biblioteca de Swipe**
  - Headlines que Funcionaram
  - Referências do Mercado
  - Controles Ativos

### Camada 5: Canal
- **Canal Principal (Escolha UM — obrigatório)**
  - Onde o Cliente Já Está
  - Canal com Menor Fricção de Teste
  - Histórico de Performance
- **Canais Secundários (quando o principal validar)**
  - E-mail: Sequência de Nutrição, Broadcasts, Reengajamento
  - Tráfego Direto: Ads de Teste, Copy Orgânica, Outreach Manual

### Camada 6: Teste
- **Teste Binário (vendeu ou não vendeu?)**
  - Tentei → Funcionou/Não Funcionou → Por quê → Próximo
  - Headline vs Headline (quando tiver volume)
  - Oferta vs Oferta (quando tiver volume)
- **Registro Simples**
  - O que testei
  - O que aconteceu
  - O que aprendi
- **Controle Atual**
  - Peça Vencedora Ativa
  - Métrica de Referência (mesmo que simples)

---

## Estágio 1→10 — Operação de Copy Tomando Forma

**Objetivo:** Copy deixa de ser tarefa do founder. Sistemas, ativos e consistência de mensagem.

### Camada 1: Mercado
- **Inteligência de Mercado Contínua**
  - Ritual de Pesquisa (Frequência e Fontes)
  - Banco de Voz do Cliente (VoC)
  - Mapa de Objeções Atualizado
- **Segmentação**
  - ICPs Definidos e Ranqueados
  - Jornada de Consciência por Segmento
  - Mensagem por Segmento
- **Monitoramento Competitivo**
  - Swipe de Concorrentes
  - Mudanças de Posicionamento
  - Gaps de Mercado Identificados

### Camada 2: Mensagem
- **Núcleo de Mensagem (Message Core)**
  - Promessa Mestre
  - Mecanismo Único Documentado
  - Pilares de Prova
- **Hierarquia de Benefícios**
  - Benefício Principal
  - Benefícios Secundários
  - Features → Benefits Map
- **Guia de Mensagem (Messaging Guide)**
  - O Que Dizer (e o Que Nunca Dizer)
  - Tom e Voz da Marca
  - Frases Proibidas e Aprovadas

### Camada 3: Oferta
- **Otimização de Stack**
  - Componentes que mais convertem vs overhead
  - Simplificação sem perder valor percebido
  - Teste de preço (price elasticity)
- **Variações de Oferta**
  - Oferta de entrada (tripwire)
  - Oferta principal
  - Upsell e cross-sell
- **Garantias Otimizadas**
  - Dados de refund rate por tipo de garantia
  - Garantia específica por segmento

### Camada 4: Formato
- **Funil de Aquisição**
  - Topo — Ads e Conteúdo de Entrada
  - Meio — Nutrição e Educação
  - Fundo — Oferta e Fechamento
- **Formatos de Alta Conversão**
  - VSL (Video Sales Letter)
  - Long-form Sales Page
  - Webinar / Apresentação de Venda
  - Sequências de E-mail de Venda
- **Formatos de Retenção**
  - Onboarding por E-mail
  - E-mails de Engajamento e Feature Adoption
  - Campanhas de Reativação
- **Biblioteca de Ativos**
  - Templates Aprovados por Formato
  - Swipe File Interno
  - Controles Ativos com Métricas

### Camada 5: Canal
- **E-mail Marketing**
  - Arquitetura de Listas e Segmentação
  - Sequências Automatizadas
  - Calendário Editorial de Broadcasts
- **Mídia Paga**
  - Copy de Ads (Meta, Google, YouTube)
  - Ângulos por Audiência
  - Criativos e Variações
- **Orgânico e Conteúdo**
  - SEO Copy (Páginas e Blog)
  - Social Selling
  - Comunidades e PR
- **Produto (In-app Copy)**
  - Microcopy e UX Writing
  - Notificações e Push
  - Tooltips e Onboarding In-app

### Camada 6: Teste
- **Framework de Testes**
  - Prioridade de Teste (ICE Score)
  - Calendário de Testes
  - Significância Estatística
- **O Que Testar (por nível)**
  - Nível 1 — Oferta e Promessa
  - Nível 2 — Headline e Lead
  - Nível 3 — Formato e Estrutura
- **Aprendizados**
  - Banco de Testes (O Que Funcionou)
  - Insights por Segmento
  - Princípios Validados Internamente

### Camada 7: Operação
- **Time e Papéis**
  - Copywriter Principal
  - Revisor Estratégico
  - Especialistas por Canal
- **Processo de Produção**
  - Brief de Copy (Template)
  - Fluxo de Aprovação
  - Controle de Versões
- **Qualidade**
  - Checklist de Copy Antes de Publicar
  - Critérios de Aprovação
  - Revisão Pós-publicação

---

## Estágio 10→100 — Departamento de Copy como Ativo Estratégico

**Objetivo:** Copy é infraestrutura do negócio. Mensagem consistente em escala, múltiplos mercados, múltiplos copywriters.

### Camada 1: Mercado
- **Inteligência Estratégica**
  - Research Sistemático por Segmento
  - Painel de Voz do Cliente (VoC Dashboard)
  - Mapeamento de Sofisticação do Mercado
- **Segmentação Avançada**
  - Personas por Estágio de Consciência
  - Segmentos por Vertical e Caso de Uso
  - Matriz de Mensagem x Segmento
- **Inteligência Competitiva**
  - Tracking Automatizado de Concorrentes
  - Análise de Posicionamento do Setor
  - Oportunidades de Categoria

### Camada 2: Mensagem
- **Arquitetura de Mensagem**
  - Mensagem Mestre (Master Message)
  - Mensagem por Segmento
  - Mensagem por Estágio do Funil
- **Brand Voice**
  - Manifesto de Voz
  - Tom por Canal e Contexto
  - Exemplos de Bom e Mau Uso
- **Messaging Guide (Documento Vivo)**
  - Promessas Aprovadas por Nível
  - Claims com Prova Vinculada
  - Vocabulário da Marca
- **Narrativa Estratégica**
  - Story da Empresa (Origin Story)
  - Narrativa de Categoria
  - Narrativa por Produto e Feature

### Camada 3: Oferta
- **Arquitetura de Produtos**
  - Linha de produtos com posicionamento distinto
  - Jornada de valor (entrada → core → premium)
  - Pricing matrix por segmento
- **Otimização Contínua**
  - LTV por oferta e segmento
  - Elasticidade de preço por canal
  - A/B de stack, garantia e termos
- **Expansão**
  - Novos mercados (geográficos, verticais)
  - Parcerias e co-branded offers
  - Licenciamento e white-label

### Camada 4: Formato
- **Sistema de Funis**
  - Funil de Aquisição por Canal
  - Funil de Ativação e Onboarding
  - Funil de Expansão e Upsell
- **Formatos de Aquisição**
  - VSL e Webinar de Venda
  - Long-form e Short-form Sales Page
  - Sequências de E-mail de Lançamento
  - Advertorial e Native Ads
- **Formatos de Retenção e Expansão**
  - Onboarding por Segmento
  - Campanhas de Feature Adoption
  - Sequências de Upsell e Cross-sell
  - Campanhas de Win-back
- **Formatos de Conteúdo**
  - SEO e Conteúdo Orgânico
  - Case Studies e Provas Sociais
  - Thought Leadership
- **Biblioteca Central de Ativos**
  - Controles Ativos com Métricas
  - Templates por Formato e Canal
  - Swipe File Estratégico

### Camada 5: Canal
- **E-mail e CRM**
  - Arquitetura de Automações
  - Segmentação Comportamental
  - Calendário de Campanhas
- **Mídia Paga em Escala**
  - Copy por Plataforma (Meta, Google, YouTube, LinkedIn)
  - Matriz de Ângulo x Audiência
  - Sistema de Iteração de Criativos
- **Orgânico e Distribuição**
  - SEO Estratégico
  - Thought Leadership e PR
  - Comunidade e Parceiros de Conteúdo
- **Copy de Produto (In-app)**
  - UX Writing e Microcopy
  - Copy de Onboarding In-app
  - Notificações e Comunicação In-product
- **Canais Emergentes**
  - Áudio e Podcast
  - Vídeo Curto (Reels, Shorts)
  - Conversacional (WhatsApp, Chatbots)

### Camada 6: Teste
- **Cultura de Teste**
  - Princípios de Experimentação
  - Quem Pode Testar o Quê
  - Cadência de Revisão de Resultados
- **Sistema de Testes (por nível)**
  - Nível 1 — Oferta e Posicionamento
  - Nível 2 — Mensagem e Ângulo
  - Nível 3 — Formato e Estrutura
  - Nível 4 — Elementos e Microcopy
- **Banco de Conhecimento**
  - Princípios Validados por Segmento
  - O Que Nunca Mais Testar
  - Insights Transferíveis entre Canais
- **Métricas de Copy**
  - Por Canal (CTR, CVR, ROAS)
  - Por Funil (Ativação, Retenção, Expansão)
  - Copy Score (Métrica Interna)

### Camada 7: Operação
- **Time e Estrutura**
  - Head de Copy (Estratégia e Liderança)
  - Copywriters por Especialidade
  - Freelancers e Parceiros Externos
- **Processo de Produção**
  - Brief Estratégico de Copy
  - Fluxo de Criação e Revisão
  - Sistema de Aprovação por Nível de Risco
- **Qualidade e Consistência**
  - Guia de Qualidade de Copy
  - Checklist por Formato
  - Auditoria Periódica de Ativos
- **Desenvolvimento do Time**
  - Trilha de Evolução do Copywriter
  - Biblioteca de Referências e Estudos
  - Rituais de Melhoria (Critique Sessions)

---

## Mapeamento: Estágio → Clones Recomendados

```yaml
estagio_0_to_1:
  foco: "Descobrir a mensagem que converte"
  clones_primarios:
    - eugene-schwartz: "Diagnosticar awareness do mercado"
    - alex-hormozi: "Construir oferta irresistível"
    - gary-halbert: "Escrever a primeira sales letter/página"
  clones_secundarios:
    - todd-brown: "Criar mecanismo único (se produto não é diferenciado)"
    - dan-kennedy: "Definir avatar (se público não é claro)"
  clone_final:
    - claude-hopkins: "Audit rápido antes de publicar"
  workflows:
    - wf-copy-0-to-1.md

estagio_1_to_10:
  foco: "Sistematizar e escalar o que funciona"
  clones_primarios:
    - stefan-georgi: "Sistematizar o processo (RMBC)"
    - dan-kennedy: "Segmentar e documentar avatars"
    - jon-benson: "Criar VSL para escalar"
    - ben-settle: "Monetizar lista com email diário"
  clones_secundarios:
    - andre-chaperon: "Automações de email (Soap Opera)"
    - gary-bencivenga: "Bullets e objeções para cada segmento"
    - clayton-makepeace: "Copy emocional para segmentos frios"
  clone_final:
    - claude-hopkins: "Audit sistemático + framework de testes"
  workflows:
    - wf-copy-1-to-10.md

estagio_10_to_100:
  foco: "Copy como infraestrutura do negócio"
  clones_primarios:
    - david-ogilvy: "Brand voice + copy premium"
    - eugene-schwartz: "Arquitetura de mensagem por awareness"
    - claude-hopkins: "Cultura de teste e otimização contínua"
  clones_secundarios:
    - dan-koe: "Thought leadership e conteúdo orgânico"
    - stefan-georgi: "Processos replicáveis para time"
    - john-carlton: "Copy direto para campanhas de performance"
  orquestracao:
    - copy-maestro: "Coordena múltiplos copywriters e canais"
  workflows:
    - wf-copy-10-to-100.md
```

---

**Versão:** 1.0.0
**Baseado em:** Framework ontológico de Luiz Fosc + ajustes (camada Oferta adicionada, Teste 0→1 simplificado)
