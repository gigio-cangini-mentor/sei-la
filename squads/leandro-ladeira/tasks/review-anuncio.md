# review-anuncio

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_id** | `review-anuncio` |
| **task_name** | Revisar/Criar Anúncio de Tráfego Pago |
| **execution_type** | Agent |
| **primary_agent** | leandro-ladeira |
| **estimated_duration** | 20-30 minutos |
| **complexity** | Medium |
| **dependencies** | Big Idea deve estar definida (recomendado) |
| **auto_handoff** | Nenhum |

## Purpose

Revisar anúncio existente ou criar anúncio novo para tráfego pago (Facebook, Instagram, Google) usando os frameworks **Mandala M.T.O** (Section 2.4), **Pirâmide de Prontidão** (Section 2.3) e **Elimine o Imperativo** (Section 2.10). Garantir que o anúncio tem Big Idea clara, público correto e copy persuasiva sem ser pushy.

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `existing_ad` | object | ❌ | Anúncio existente (título, copy, imagem/vídeo, CTA) |
| `ad_brief` | object | ❌ | Brief para novo anúncio (objetivo, público, mensagem) |
| `big_idea` | string | ✅ | Big Idea do produto (se não tiver, deve criar antes) |
| `pyramid_phase` | enum | ✅ | Urgência / Consciência / Oportunidade |
| `mto_context` | object | ✅ | M.T.O — Momento, Tipo, Objetivo |
| `product_price` | number | ✅ | Preço do produto |
| `current_metrics` | object | ❌ | Se revisando anúncio: CTR, CPC, CPA atuais |

**Nota:** Cliente deve fornecer `existing_ad` OU `ad_brief` (não ambos). Se forneceu anúncio existente, é REVISÃO. Se forneceu brief, é CRIAÇÃO.

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| `reviewed_ad` | object | Anúncio revisado/criado (título, copy, sugestões de visual, CTA) |
| `annotations` | array | Anotações explicando cada mudança/escolha |
| `vetos_triggered` | array | Lista de vetos que foram acionados (se aplicável) |
| `performance_prediction` | string | Projeção de performance baseada em benchmarks |

## Execution Flow

### 1. Elicitation Phase (5 min)

Fazer perguntas para entender contexto:

```yaml
questions_if_reviewing:
  - "Qual anúncio você quer que eu revise? (manda título + copy + descrição do visual)"
  - "Esse anúncio já rodou? Se sim, quais as métricas? (CTR, CPC, CPA)"
  - "Qual é a Big Idea do produto?"
  - "Esse anúncio é pra qual fase? Urgência, Consciência ou Oportunidade?"

questions_if_creating:
  - "Qual o objetivo desse anúncio? (gerar leads, vendas diretas, engajamento)"
  - "Qual a Big Idea do produto?"
  - "Tá criando pra qual fase da Pirâmide? (Urgência, Consciência, Oportunidade)"
  - "Tem algum hook específico que você quer usar?"
  - "Formato: imagem, vídeo ou carrossel?"
```

**Checkpoint:** "Beleza, então você quer [revisar/criar] anúncio de [produto] pra fase de [X]. É isso?"

### 2. Big Idea Validation (VETO CHECK)

**CRÍTICO:** Verificar se Big Idea existe e está clara.

```yaml
veto_check:
  condition: big_idea == null OR big_idea == "não sei"
  action: BLOCK, redirect to create-big-idea task
  message: |
    Olha só, antes de criar/revisar anúncio, você precisa ter a Big Idea definida.

    Por quê? Porque a Big Idea é o ponto central que você vai partir pra começar
    a derivar os seus anúncios de prontidão, de urgência ou de oportunidade.

    Sem Big Idea, o anúncio vai ficar genérico e solto. Já vi isso dar errado muitas vezes.

    Vamos definir a Big Idea primeiro? [handoff to create-big-idea]
```

### 3. M.T.O Framework Application (Mandala)

Aplicar framework **Mandala** (Section 2.4) para garantir que anúncio tem OBJETIVO claro:

```yaml
mto_analysis:
  M_MOMENTO:
    description: "Em que momento de compra a pessoa está?"
    pyramid_mapping:
      Urgência: "Pessoa PRONTA pra comprar AGORA (buscando 'curso de X')"
      Consciência: "Pessoa sabe que TEM PROBLEMA mas não sabe solução"
      Oportunidade: "Pessoa NEM SABE que precisa de algo"

  T_TIPO:
    description: "Qual tipo de anúncio/conteúdo?"
    options:
      - "Anúncio de conversão (venda direta)"
      - "Anúncio de captura (gerar leads)"
      - "Anúncio de descoberta (awareness + vídeo obrigatório)"
      - "Anúncio de relacionamento (aquecer audiência)"
      - "Anúncio de remarketing (re-impactar)"

  O_OBJETIVO:
    description: "O que você quer alcançar com esse anúncio?"
    examples:
      - "Gerar 50 vendas em 7 dias"
      - "Capturar 500 leads em 10 dias"
      - "Criar público de 75% (quem viu 75% do vídeo)"
      - "Re-impactar quem visitou página mas não comprou"
```

**VETO:** Se cliente não souber responder M.T.O, PARAR e explicar:
> "Você não pode fazer nada na sua vida sem objetivo. Você faz qualquer coisa na sua vida sem objetivo e você não sabe nem para que que você está fazendo. Você está fazendo só para repetir o que os outros estão fazendo."

### 4. Review/Creation Phase (10-15 min)

**Se REVISANDO anúncio existente:**

#### 4.1. Analyze Existing Ad

```yaml
review_checklist:
  title:
    - "Tem Big Idea no título? (se não, adicionar)"
    - "Título é genérico? (ex: 'Desafio' sem especificar tema — VETO)"
    - "Tem imperativo no título? (Aprenda, Descubra — considerar eliminar)"
    - "É específico ou vago?"

  copy:
    - "Começa com imperativo? (Aprenda, Descubra, Conquiste — VETO Framework 2.10)"
    - "Usa Big Idea ao longo da copy?"
    - "Fala de vários assuntos no mesmo anúncio? (VETO — foco único)"
    - "Cria objeção onde não existe? (VETO)"
    - "Usa números específicos ou genéricos? (300k views vs 'muitos views')"

  cta:
    - "Múltiplas CTAs? (VETO — deve ter APENAS 1 CTA)"
    - "CTA alinhada com M.T.O? (objetivo do anúncio)"
    - "CTA tem contexto ou é link solto? (link solto = VETO)"

  visual:
    - "Visual conecta com copy?"
    - "Tem texto legível na imagem/vídeo?"
    - "Se vídeo: hook nos primeiros 3 segundos?"
```

#### 4.2. Apply Framework Elimine o Imperativo (Section 2.10)

**ANTES (com imperativo — proibido):**
> "Aprenda a vender todo dia com tráfego pago"

**DEPOIS (sem imperativo — criativo):**
> "300.000 views e 12.000 seguidores com um anúncio de R$ 500. Como eu fiz isso vendendo todo santo dia"

**Processo:**
1. Identificar todos os imperativos (aprenda, descubra, conquiste, domine)
2. Eliminar os verbos de comando
3. Eliminar interrogações no início
4. O cérebro busca automaticamente ângulos diferentes e mais criativos

**Se CRIANDO anúncio novo:**

#### 4.3. Create Ad from Brief

```yaml
creation_structure:
  title:
    formula: "[Big Idea] + [especificidade da fase da Pirâmide]"
    examples:
      Urgência: "Ansiedade não é normal — Curso de Hipnose para Ansiedade"
      Consciência: "Você acha normal ter crise de ansiedade? NÃO é."
      Oportunidade: "E se ansiedade não precisasse ser normal na sua vida?"

  copy:
    structure:
      - "Hook (primeiros 3 segundos/linhas) — Big Idea ou dado curioso"
      - "Problema/Contexto — validar dor da pessoa"
      - "Solução/Transformação — o que o produto entrega"
      - "Prova social (se tiver) — resultados, cases, números"
      - "CTA única e contextualizada"

    rules:
      - "SEM imperativos no início"
      - "Números específicos sempre (300k views, não 'muitos')"
      - "Big Idea aparece pelo menos 2x"
      - "Foco em 1 único assunto (não vários)"
      - "Não criar objeção onde não existe"

  cta:
    formula: "[Ação] + [Razão/Urgência]"
    examples:
      - "Clica no link pra ver como funciona (só hoje com desconto)"
      - "Acessa o link e garante tua vaga (últimas vagas da turma)"
      - "Clica aqui pra ver os 3 passos que eu usei"
```

### 5. Annotation & Validation (5 min)

Criar anotações explicando cada escolha/mudança:

```yaml
annotation_examples:
  - "Removi 'Aprenda' do título (Framework Elimine o Imperativo — Section 2.10)"
  - "Adicionei Big Idea no hook ('Ansiedade não é normal')"
  - "Troquei 'desafio' por 'desafio da respiração' (título genérico = VETO)"
  - "Removi 2ª CTA (múltiplas CTAs = VETO — confunde pessoa)"
  - "Adicionei número específico (300k views) no lugar de 'muitas visualizações'"
```

**Validação final:**
```yaml
final_checks:
  - "Big Idea presente?"
  - "M.T.O claro? (Momento, Tipo, Objetivo)"
  - "Sem imperativos?"
  - "Apenas 1 CTA?"
  - "Título específico (não genérico)?"
  - "Foco em 1 assunto só?"
```

## Frameworks Used

| Framework | Section | Application |
|-----------|---------|-------------|
| **Mandala M.T.O** | 2.4 | Garantir que anúncio tem Momento, Tipo e Objetivo claros |
| **Pirâmide de Prontidão** | 2.3 | Adaptar mensagem à fase (Urgência / Consciência / Oportunidade) |
| **Big Idea** | 2.7 | Usar como ponto central do anúncio |
| **Elimine o Imperativo** | 2.10 | Melhorar copy eliminando verbos de comando |
| **Stories 10x** | 2.6 | Referência se anúncio vier de story orgânico |

## Veto Conditions

| Veto | Condition | Reason |
|------|-----------|--------|
| ❌ **Sem Big Idea** | Cliente não tem Big Idea definida | Anúncio vai ficar genérico, solto, sem coerência. Vai desperdiçar budget. |
| ❌ **Título genérico** | Título tipo "Desafio" sem especificar tema | Não captura atenção. "Desafio da Respiração" > "Desafio" |
| ❌ **Copy com imperativo** | Copy começa com "Aprenda", "Descubra", "Conquiste" | Copy pushy, salesy, genérica. Framework 2.10 comprova que eliminar melhora 10x. |
| ❌ **Múltiplas CTAs** | 2 ou mais CTAs no mesmo anúncio | Confunde pessoa. "O cara não sabe no que clicar" — Section 4.3 |
| ❌ **Vários assuntos** | Anúncio fala de 3-4 temas diferentes | Dilui mensagem, confunde público, conversão baixa. |
| ❌ **Criar objeção** | Copy introduz problema que cliente não tinha | Gera resistência desnecessária, aumenta atrito. |

**Ação quando veto acionado:** Explicar com exemplo concreto (Section 5 — Output Examples):
> "Vamos lá Carol, vou analisar na vida real aqui. Você botou ali 'desafio 1', desafio em exclamação né? Eu acho que você gritar o nome desafio não é 1 boa ideia pra começar. Por quê? Mais importante que o desafio é o tema."

## Output Examples

### Example 1: Revisão de Anúncio (Curso de Respiração)

**ANÚNCIO ORIGINAL (Cliente enviou):**
```yaml
title: "Desafio!"
copy: |
  Aprenda a respirar corretamente em 7 dias.

  Descubra técnicas de respiração que vão mudar sua vida.

  Clique aqui para começar
  Acesse o link na bio
cta_count: 2
visual: "Foto genérica de pessoa meditando"
```

**ANÚNCIO REVISADO:**
```yaml
title: "Desafio da Respiração Consciente — 7 Dias"
copy: |
  3.000 pessoas já reduziram ansiedade em 50% usando respiração consciente.

  Você acha normal viver com falta de ar, coração acelerado e insônia?
  Não é. Seu corpo sabe respirar, só esqueceu como.

  Em 7 dias você vai reaprender o que seu corpo sempre soube:
  respirar traz calma, foco e energia de volta.

  Clica aqui pra começar o desafio (últimas vagas dessa turma)
cta_count: 1
visual: "Vídeo curto (15s) mostrando pessoa em crise vs pessoa calma depois da técnica"

annotations:
  - "TÍTULO: Mudei de 'Desafio!' pra 'Desafio da Respiração Consciente — 7 Dias'"
  - "  → Razão: Título genérico = VETO. 'Desafio' sozinho não captura. Tema específico sim."
  - ""
  - "COPY — Linha 1: Removi 'Aprenda' e adicionei número específico (3.000 pessoas)"
  - "  → Razão: Framework Elimine o Imperativo (Section 2.10). 'Aprenda' é pushy."
  - ""
  - "COPY — Linha 2: Usei pergunta retórica + 'Não é'"
  - "  → Razão: Validar dor da pessoa sem criar objeção nova. Ela JÁ sente isso."
  - ""
  - "COPY — Linha 3-4: Foco na transformação sem imperativo"
  - "  → Razão: 'Vai reaprender' > 'Aprenda'. Mais natural, menos salesy."
  - ""
  - "CTA: Removi 2ª CTA ('Acesse o link na bio')"
  - "  → Razão: Múltiplas CTAs = VETO (Section 4.3). Confunde pessoa. 1 CTA só."
  - ""
  - "VISUAL: Sugestão de vídeo curto mostrando antes/depois"
  - "  → Razão: Vídeo tem CTR maior que imagem estática. Hook visual nos 3s."

vetos_triggered:
  - "Título genérico ('Desafio' sem tema)"
  - "Copy com imperativo ('Aprenda', 'Descubra')"
  - "Múltiplas CTAs (2 CTAs no mesmo anúncio)"

performance_prediction: |
  Com essas mudanças, eu espero:
  - CTR aumentar de ~1.0% pra 1.8-2.5% (título específico + hook forte)
  - CPC diminuir 20-30% (CTR maior = custo menor)
  - CPA melhorar 15-25% em 4-7 dias

  Por quê? Porque quando eu boto 1 anúncio ali que veio do Storage DX com
  tema claro e sem imperativo, eu já sei que é campeão, amigo. É certeza.
```

### Example 2: Criação de Anúncio (Curso de Tráfego Pago — Fase Urgência)

**BRIEF (Cliente enviou):**
```yaml
objective: "Vender curso de tráfego pago (R$ 997)"
big_idea: "Venda Todo Santo Dia"
pyramid_phase: "Urgência"
target_audience: "Pessoas buscando 'curso de tráfego pago'"
format: "Vídeo (30s)"
```

**ANÚNCIO CRIADO:**
```yaml
title: "Venda Todo Santo Dia — Curso de Tráfego Pago Perpétuo"
copy: |
  Eu cresci de 100.000 pra 500.000 seguidores usando tráfego pago estratégico.
  Um anúncio de R$ 500 gerou 300.000 views e 12.000 seguidores.

  Você quer vender só quando abre carrinho? Ou todo santo dia?

  Venda Todo Santo Dia não é lançamento. É sistema perpétuo.
  Você planta sementes (anúncios), colhe vendas todo dia.

  Curso completo: Big Idea, M.O.E.R, 5 Fases do Perpétuo, Stories 10x.
  R$ 997 em 12x ou à vista com desconto.

  Clica no link pra ver como funciona (últimas vagas dessa turma)
cta_count: 1
visual_suggestion: |
  Vídeo 30s:
  - 0-3s: Hook visual (print de 300k views no anúncio real)
  - 3-10s: "100k → 500k seguidores" (animação crescimento)
  - 10-20s: "Venda Todo Santo Dia" (destaque na tela)
  - 20-30s: CTA ("Clica no link")

annotations:
  - "TÍTULO: Usei Big Idea + especificidade da Fase 1 (Urgência)"
  - "  → 'Curso de Tráfego Pago Perpétuo' = pessoa buscando exatamente isso."
  - ""
  - "COPY — Hook: Números específicos (100k→500k, 300k views, 12k seguidores)"
  - "  → Razão: Números reais > genéricos. Prova social imediata."
  - ""
  - "COPY — Linha 2: Pergunta retórica sem criar objeção"
  - "  → 'Vender só quando abre carrinho' = dor real que pessoa já sente."
  - ""
  - "COPY — Linha 3-4: Metáfora 'sementes' (Section 1.2 — Signature Phrase)"
  - "  → 'Plantar sementes, colher vendas' = linguagem do Leandro Ladeira."
  - ""
  - "COPY — Linha 5: Frameworks mencionados (Big Idea, M.O.E.R, 5 Fases, Stories 10x)"
  - "  → Razão: Fase Urgência = pessoa quer saber O QUE vai aprender."
  - ""
  - "CTA: Única, com urgência ('últimas vagas')"
  - "  → Razão: 1 CTA só (veto de múltiplas CTAs). Urgência força decisão."
  - ""
  - "VISUAL: Hook visual forte (print real de 300k views)"
  - "  → Razão: Primeiros 3s decidem se pessoa assiste ou pula."

mto_analysis:
  M_MOMENTO: "Urgência — pessoa buscando 'curso de tráfego pago'"
  T_TIPO: "Anúncio de conversão (venda direta)"
  O_OBJETIVO: "Gerar 50 vendas em 7 dias (meta: 50 vendas = Facebook aprende perfil comprador)"

vetos_triggered: []

performance_prediction: |
  Anúncio de Urgência (Fase 1) bem executado. Expectativa:
  - CTR: 2.0-2.8% (público quente + hook forte)
  - CPA: R$ 250-350 (25-35% do preço — saudável)
  - ROAS: 2.8-3.5 (cada R$ 1 vira R$ 2.80-3.50)

  Por quê? Porque tá na fase certa (Urgência), tem Big Idea clara,
  números específicos, sem imperativo, 1 CTA só. Tudo alinhado.

  Simples assim. Beleza?
```

## Acceptance Criteria

- [ ] Big Idea presente no anúncio (título ou copy)
- [ ] M.T.O definido (Momento, Tipo, Objetivo)
- [ ] Sem imperativos na copy (ou justificativa se tiver)
- [ ] Apenas 1 CTA (não 2 ou mais)
- [ ] Título específico (não genérico tipo "Desafio" solto)
- [ ] Foco em 1 assunto único (não vários temas misturados)
- [ ] Anotações explicam cada escolha/mudança
- [ ] Projeção de performance baseada em benchmarks reais
- [ ] Voice DNA presente (cara, vamos lá, por quê?, beleza?)

## Handoff

Após revisar/criar anúncio:

| Next Task | Trigger |
|-----------|---------|
| `diagnose-campanha` | Cliente quer rodar anúncio e já tem campanha ativa |
| `estrategia-perpetuo` | Cliente quer montar funil completo (não só 1 anúncio) |
| `create-big-idea` | Se Big Idea não está clara e precisa definir antes |

## Voice DNA Reminders

| Marker | Frequency | Example |
|--------|-----------|---------|
| "Vamos lá" | 2-3x | "Vamos lá Carol, vou analisar na vida real aqui" |
| "Cara" | 8-10x | "Cara, título genérico não captura atenção" |
| "Por quê? Porque..." | 4-6x | "Por quê? Porque múltiplas CTAs confundem pessoa" |
| "Beleza?" | 2-4x | "Tudo alinhado. Beleza?" |
| "Olha só" | 2-3x | "Olha só, eu vou te mostrar o que acontece quando..." |

**Signature Phrase obrigatória:**
> "Quando eu boto 1 anúncio ali que veio do Storage DX, eu já sei que é campeão, amigo. É certeza."

## Notes

- Se cliente enviar anúncio com 5+ vetos, ser direto mas didático (não criticar, ensinar)
- Framework Elimine o Imperativo (2.10) é poderoso mas nem sempre óbvio — explicar com exemplo
- Sempre validar com "Faz sentido?" ao final
- Se anúncio vem de story orgânico que performou bem, mencionar Stories 10x (Section 2.6)
