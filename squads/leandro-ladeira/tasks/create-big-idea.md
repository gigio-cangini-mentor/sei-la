# create-big-idea

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_id** | `create-big-idea` |
| **task_name** | Definir Big Idea para Produto/Curso |
| **execution_type** | Agent |
| **primary_agent** | leandro-ladeira |
| **estimated_duration** | 20-30 minutos |
| **complexity** | Medium |
| **dependencies** | Nenhuma |
| **auto_handoff** | Nenhum |

## Purpose

Definir a **Big Idea** (ponto central) de um produto ou curso para servir como base de todos os anúncios, materiais de marketing e conteúdo. A Big Idea é o framework fundamental (Section 2.7) que permite derivar anúncios nas 3 fases da Pirâmide de Prontidão (Urgência, Consciência, Oportunidade).

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `product_name` | string | ✅ | Nome do produto ou curso |
| `target_audience` | string | ✅ | Público-alvo principal |
| `main_transformation` | string | ✅ | Transformação principal que o produto entrega |
| `competitors` | string | ❌ | Principais concorrentes ou soluções alternativas |
| `market_context` | string | ❌ | Contexto do mercado (saturado, novo, oportunidade) |

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| `big_idea_statement` | string | Frase única e memorável que resume a transformação |
| `urgency_derivation` | string | Big Idea aplicada à Fase 1 (Urgência/Prontidão) |
| `consciousness_derivation` | string | Big Idea aplicada à Fase 2 (Consciência) |
| `opportunity_derivation` | string | Big Idea aplicada à Fase 3 (Oportunidade) |
| `usage_guidelines` | array | 3-5 diretrizes de como usar a Big Idea em materiais |

## Execution Flow

### 1. Elicitation Phase (5-10 min)
Fazer perguntas estratégicas para entender o produto:

```yaml
questions:
  - "Qual é o produto/curso que você quer vender?"
  - "Quem é o público principal? (perfil, problema, nível de consciência)"
  - "Qual transformação você entrega? (do ponto A ao ponto B)"
  - "O que torna essa transformação diferente do que já existe?"
  - "Tem concorrentes diretos? O que eles falam?"
```

**Checkpoint:** "Beleza, então você quer vender [produto] pra [público] que precisa de [transformação]. É isso?"

### 2. Transformation Identification (5 min)
Identificar o núcleo da transformação usando o framework:

```yaml
transformation_core:
  before_state: "Estado atual do cliente (dor, problema, frustração)"
  after_state: "Estado desejado do cliente (resultado, benefício)"
  unique_mechanism: "O que torna sua solução única (método, abordagem, diferencial)"
```

### 3. Big Idea Crafting (5-10 min)
Criar a frase central seguindo os princípios:

**DEVE:**
- Ser memorável (fácil de lembrar e repetir)
- Ser específica (não genérica)
- Capturar a transformação única
- Ser usável em todos os materiais
- Provocar curiosidade ou desafiar crença

**NÃO DEVE:**
- Usar jargão sem tradução
- Ser vaga ou genérica
- Prometer resultado sem esforço
- Copiar concorrente sem adaptar

**Exemplos de Big Ideas:**
- "Ansiedade não é normal" (curso de hipnose)
- "Venda Todo Santo Dia" (curso de tráfego perpétuo)
- "Stories 10x" (não 10x views, mas 10x em TUDO)

### 4. Derivation Phase (5-10 min)
Aplicar a Big Idea nas 3 fases da Pirâmide de Prontidão:

**URGÊNCIA (Fase 1):**
- Big Idea + "curso de [tema]"
- Exemplo: "Ansiedade não é normal — Curso de Hipnose para Ansiedade"

**CONSCIÊNCIA (Fase 2):**
- Big Idea + problemas específicos
- Exemplo: "Você acha normal ter crise de ansiedade? NÃO é."

**OPORTUNIDADE (Fase 3):**
- Big Idea + contexto amplo
- Exemplo: "E se eu te contar que ansiedade não precisa ser normal na sua vida?"

### 5. Validation & Guidelines (5 min)
Validar Big Idea e criar diretrizes de uso:

```yaml
validation_checks:
  - "A Big Idea é memorável? (consigo repetir depois de 10 segundos?)"
  - "É específica o suficiente? (diferente de concorrentes?)"
  - "Funciona nas 3 fases da Pirâmide? (Urgência, Consciência, Oportunidade)"
  - "Captura a transformação única do produto?"
```

## Frameworks Used

| Framework | Section | Application |
|-----------|---------|-------------|
| **Big Idea** | 2.7 | Framework principal — ponto central para derivar anúncios |
| **Pirâmide de Prontidão** | 2.3 | Aplicar Big Idea nas 3 fases (Urgência → Consciência → Oportunidade) |
| **Mandala M.T.O** | 2.4 | Garantir que a Big Idea tem OBJETIVO claro |

## Veto Conditions

| Veto | Condition | Reason |
|------|-----------|--------|
| ❌ **Sem transformação clara** | Cliente não sabe qual resultado o produto entrega | Big Idea sem transformação = frase vazia sem poder de conversão |
| ❌ **Big Idea genérica** | Frase poderia ser usada por qualquer concorrente | Não gera diferenciação, não cria conexão única |
| ❌ **Pular Big Idea** | Cliente quer ir direto para anúncios sem definir Big Idea | Vai criar anúncios desconexos, sem coerência, baixa conversão |
| ❌ **Múltiplas Big Ideas** | Cliente quer 3-4 Big Ideas ao mesmo tempo | Dilui mensagem, confunde público, perde foco |

**Ação quando veto acionado:** Explicar com storytelling autêntico (Section 1.3):
> "Olha só, eu vou te mostrar o que acontece quando você pula a Big Idea. Qual que é a Big d? Olha, vamos pegar nesse caso aqui, né? Inclusive olha, como é que deu errado, eu comecei a escrever sem ter Big Idea, me perdi. Por quê? Porque sem Big Idea você não tem clareza de onde partir."

## Output Examples

### Example 1: Curso de Hipnose para Ansiedade

```yaml
big_idea_statement: "Ansiedade não é normal"

urgency_derivation: |
  Curso de Hipnose para Ansiedade — Porque ansiedade NÃO é normal

consciousness_derivation: |
  Você acha normal ter crise de ansiedade todo dia? NÃO é.
  Hipnose clínica pode resetar seu sistema nervoso.

opportunity_derivation: |
  E se eu te contar que ansiedade não precisa ser normal na sua vida?
  Milhares de pessoas já se libertaram usando hipnose.

usage_guidelines:
  - "Use 'Ansiedade não é normal' em TODOS os títulos de anúncios"
  - "Reforce em emails: 'Você não nasceu pra viver assim. Ansiedade não é normal.'"
  - "Stories: mostrar casos de quem se livrou da ansiedade (prova que não é normal)"
  - "Landing page: headline principal deve conter a Big Idea"
  - "Vídeos: abrir/fechar com a Big Idea para fixação"
```

### Example 2: Curso de Growth Hacking no Instagram

```yaml
big_idea_statement: "Seguidores comprados não compram de você"

urgency_derivation: |
  Curso de Growth Orgânico no Instagram — Porque seguidores comprados não compram de você

consciousness_derivation: |
  Você já percebeu que seus seguidores não interagem?
  Seguidores comprados não compram de você. Orgânico sim.

opportunity_derivation: |
  E se você pudesse crescer no Instagram SEM comprar seguidor fake?
  Seguidores reais geram vendas reais. Seguidores comprados, zero.

usage_guidelines:
  - "Toda vez que falar de crescimento, contrastar com 'seguidor comprado'"
  - "Usar em objeções: 'Ah mas fulano cresceu rápido' — 'Seguidor comprado não compra'"
  - "Stories: mostrar métricas reais (engajamento, vendas) vs métricas fake (seguidores)"
  - "Anúncios: usar 'seguidores REAIS' sempre que mencionar crescimento"
  - "Email de vendas: Big Idea no assunto para aumentar open rate"
```

## Acceptance Criteria

- [ ] Big Idea é uma frase única (não 3 parágrafos)
- [ ] Big Idea é específica (diferente de concorrentes)
- [ ] Big Idea captura a transformação do produto
- [ ] Derivação para URGÊNCIA está clara e usável
- [ ] Derivação para CONSCIÊNCIA está clara e usável
- [ ] Derivação para OPORTUNIDADE está clara e usável
- [ ] Guidelines de uso incluem pelo menos 3 aplicações práticas
- [ ] Cliente confirma que a Big Idea "faz sentido" (validation checkpoint)

## Handoff

Após definir Big Idea, o próximo passo natural é:

| Next Task | Trigger |
|-----------|---------|
| `review-anuncio` | Cliente quer criar/revisar anúncios usando a Big Idea |
| `estrategia-perpetuo` | Cliente quer montar estratégia completa de Venda Todo Santo Dia |
| `diagnose-campanha` | Cliente já tem campanha rodando e quer otimizar |

## Voice DNA Reminders

Durante execução desta task, SEMPRE usar:

| Marker | Frequency | Example |
|--------|-----------|---------|
| "Vamos lá" | 3-5x | "Vamos lá, primeira coisa: qual é o produto?" |
| "Cara" | 10-15x | "Cara, a Big Idea é o ponto central..." |
| "Por quê? Porque..." | 5-8x | "Por quê? Porque sem Big Idea você se perde." |
| "Beleza?" | 4-6x | "Então a Big Idea é 'X'. Beleza?" |
| "Pronto, é só isso" | 1-2x | "Pronto, é só isso. Big Idea definida." |

**Signature Phrase obrigatória:**
> "A Big Idea é o ponto central que você vai partir pra começar a derivar os seus anúncios de prontidão, de urgência ou de oportunidade."

## Notes

- Big Idea NÃO é slogan, é o núcleo estratégico de tudo
- Pode levar 2-3 iterações até cliente ficar satisfeito — normal
- Se cliente insistir em pular Big Idea, usar Objection Algorithm (Section 6, Objeção 3)
- Sempre validar com "Faz sentido?" ao final
