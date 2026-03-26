# Workflow: Copy 0→1 — Founder Escrevendo a Própria Copy

## Metadados
```yaml
id: copy-0-to-1
versao: 1.0.0
duracao: 6-10 horas (pode ser distribuído em 2-3 dias)
complexidade: media
estagio: "0→1"
output: Mensagem validada + primeira peça de copy + primeiro canal rodando
dependencies:
  required_data:
    - copy-stages-ontology.md
  optional_pre:
    - oferta-irresistivel.md (se oferta já existe, pular Fase 3)
  feeds_into:
    - copy-1-to-10.md (quando tiver vendas recorrentes)
  checklists:
    - awareness-checklist.md
    - sugarman-31-triggers.md
    - audit-copy-hopkins.md
```

---

## VISÃO GERAL

Encontrar a mensagem que converte antes de escalar qualquer coisa. O founder é o copywriter — e isso é uma vantagem, porque ninguém conhece o produto como quem o criou.

**Resultado esperado:** Uma promessa testada, uma oferta estruturada, uma peça de copy publicada e um canal gerando as primeiras vendas.

**Princípio:** No 0→1, velocidade de teste > perfeição de copy. Melhor uma página de vendas imperfeita publicada do que uma carta perfeita no rascunho.

---

## FASE 1: MERCADO — Entender Antes de Escrever (2-3h)

**Clone principal:** @eugene-schwartz
**Clone de apoio:** @dan-kennedy

### Passo 1.1: Diagnóstico de Awareness
**Clone:** @eugene-schwartz

Classificar o mercado nos 5 Níveis de Consciência:

| Nível | Sinal | Implicação para Copy |
|-------|-------|---------------------|
| Unaware | Não sabe que tem problema | Copy LONGO, educacional, storytelling |
| Problem Aware | Sente a dor mas não sabe a solução | Copy que nomeia a dor e apresenta caminho |
| Solution Aware | Sabe que precisa de algo, não sabe de você | Copy que diferencia via mecanismo único |
| Product Aware | Conhece seu produto, não decidiu | Copy que remove objeções e prova |
| Most Aware | Pronto para comprar | Copy CURTO, direto, oferta |

**Output:** Nível de awareness documentado com evidências.

### Passo 1.2: Pesquisa de Voz do Mercado
**Clone:** @dan-kennedy

Coletar a linguagem EXATA que o mercado usa:

**Fontes obrigatórias (pelo menos 2):**
- Reviews de concorrentes (Amazon, G2, Trustpilot, Reclame Aqui)
- Grupos e fóruns (Facebook, Reddit, comunidades)
- Entrevistas com clientes/prospects (se tiver acesso)

**Para cada fonte, extrair:**
```yaml
voz_do_mercado:
  dores_literais: [] # Frases exatas que usam para descrever o problema
  desejos_literais: [] # Como descrevem o que querem
  objecoes_literais: [] # Por que não compraram antes
  linguagem_proibida: [] # Jargão do mercado que o público NÃO usa
```

**Output:** Banco de Voz do Cliente com pelo menos 15 frases literais.

### Passo 1.3: Perfil Psicográfico
**Clone:** @dan-kennedy

```yaml
perfil:
  medos:
    - medo_principal: ""
    - medo_social: "" # O que os outros vão pensar
    - medo_financeiro: "" # O que pode perder
  desejos:
    - desejo_principal: ""
    - desejo_emocional: "" # Como quer se sentir
    - desejo_status: "" # Como quer ser visto
  crencas_limitantes:
    - sobre_si: "" # "Não sou capaz de..."
    - sobre_solucao: "" # "Isso não funciona porque..."
    - sobre_preco: "" # "É caro demais para..."
  objecoes_top3:
    - objecao_1: ""
    - objecao_2: ""
    - objecao_3: ""
```

**Output:** Perfil psicográfico completo.

### CHECKPOINT CP-1
- [ ] Nível de awareness identificado com evidências?
- [ ] Pelo menos 15 frases literais do mercado coletadas?
- [ ] Top 3 objeções documentadas?
- [ ] Perfil psicográfico completo?

**VETO:** Se não tem nenhuma pesquisa real (só achismo) → PARAR. Pesquisar antes de escrever.

---

## FASE 2: MENSAGEM — Encontrar a Promessa que Converte (1-2h)

**Clone principal:** @todd-brown
**Clone de apoio:** @alex-hormozi

### Passo 2.1: Promessa Central
**Clone:** @alex-hormozi

Formular a promessa usando a fórmula:

```
"[AVATAR] consegue [RESULTADO ESPECÍFICO] em [TEMPO]
sem [MAIOR OBSTÁCULO] e finalmente [DESEJO EMOCIONAL]"
```

**Criar 3 versões da promessa** (para testar depois):
1. Versão focada em RESULTADO (racional)
2. Versão focada em TRANSFORMAÇÃO (emocional)
3. Versão focada em ELIMINAÇÃO DE DOR (medo)

**Output:** 3 versões da promessa central.

### Passo 2.2: Mecanismo Único
**Clone:** @todd-brown

```
"Enquanto [concorrentes] focam em [abordagem comum],
o [NOME DO MÉTODO] ataca [causa raiz real] através de
[processo único], por isso [resultado diferente]."
```

**Checklist do mecanismo:**
- [ ] Tem nome próprio?
- [ ] Explica POR QUE funciona (lógica interna)?
- [ ] Tem pelo menos 1 prova (estudo, caso, dado)?
- [ ] É diferente do que concorrentes dizem?

**Output:** Mecanismo Único nomeado e explicado.

### Passo 2.3: Posicionamento
**Clone:** @todd-brown

```yaml
posicionamento:
  categoria: "" # Que categoria você ocupa ou cria
  diferencial: "" # O que você faz que ninguém mais faz
  declaracao: "" # "Nós somos o/a [X] para [Y] que querem [Z]"
  anti_posicionamento: "" # "Nós NÃO somos [X]"
```

**Output:** Declaração de posicionamento.

### CHECKPOINT CP-2
- [ ] Pelo menos 3 versões da promessa formuladas?
- [ ] Mecanismo Único nomeado com lógica interna?
- [ ] Posicionamento claro (sabe o que é e o que NÃO é)?

**VETO:** Se promessa é idêntica à de um concorrente → PARAR. Refazer com mecanismo único.

---

## FASE 3: OFERTA — Montar o que Você Vende (1-2h)

**Clone principal:** @alex-hormozi
**Clone de apoio:** @dan-kennedy

> Se já executou o workflow `oferta-irresistivel.md`, pular para Fase 4.

### Passo 3.1: Stack de Valor Mínimo
**Clone:** @alex-hormozi

No 0→1, não precisa de 15 componentes. Precisa do mínimo que faça a oferta ser irrecusável:

```yaml
stack_minimo:
  core: "" # Entrega principal (curso, mentoria, serviço)
  acelerador: "" # 1 coisa que diminui tempo até resultado
  facilitador: "" # 1 coisa que diminui esforço
  garantia: "" # Risco no vendedor, não no comprador
  preco:
    ancoragem: "" # Quanto custaria se fosse consultoria individual
    real: "" # Quanto custa de fato
    justificativa: "" # Por que esse preço (lançamento, beta, etc.)
```

### Passo 3.2: Objeções → Componentes
**Clone:** @dan-kennedy

Para cada objeção do perfil psicográfico, criar uma resposta na oferta:

| Objeção | Componente que Resolve |
|---------|----------------------|
| "Não tenho tempo" | Acelerador (templates prontos) |
| "Não sei se funciona" | Garantia + Casos |
| "É caro" | Ancoragem + Parcelamento |

**Output:** Stack de valor com preço e garantia.

### CHECKPOINT CP-3
- [ ] Oferta tem pelo menos core + 1 acelerador + garantia?
- [ ] Preço tem ancoragem (valor percebido > 3x preço)?
- [ ] Cada objeção principal tem resposta na oferta?

**VETO:** Se valor percebido < 3x o preço pedido → PARAR. Adicionar componentes ou reposicionar preço.

---

## FASE 4: FORMATO — A Primeira Peça de Copy (2-3h)

**Clone principal:** @gary-halbert (sales page/letter) OU @jon-benson (VSL)
**Clone de apoio:** @gary-bencivenga (bullets)

### Passo 4.1: Escolher o Formato
Baseado no awareness e no canal:

| Awareness | Formato Recomendado |
|-----------|-------------------|
| Unaware/Problem Aware | Long-form sales page ou VSL longo (15-30 min) |
| Solution Aware | Sales page média ou VSL médio (8-15 min) |
| Product/Most Aware | Sales page curta ou VSL curto (3-8 min) |

### Passo 4.2: Escrever a Peça
**Estrutura mínima (qualquer formato):**

1. **Headline** — A promessa central (versão mais forte)
2. **Lead** — Gancho que prende atenção nos primeiros 10 segundos
3. **Problema** — Nomear a dor usando linguagem literal do mercado
4. **Mecanismo** — Por que outras soluções falham + por que a sua funciona
5. **Oferta** — Stack de valor com preço ancorado
6. **Prova** — Casos, dados, depoimentos (o que tiver)
7. **Garantia** — Risco zero para o comprador
8. **CTA** — Chamada para ação clara e urgente
9. **PS** — Recapitular oferta + urgência

**Clone @gary-bencivenga:** Criar pelo menos 10 bullets/fascinations para injetar na seção de oferta.

**Output:** Peça de copy completa (rascunho 1).

### Passo 4.3: Audit Rápido
**Clone:** @claude-hopkins

Passar a peça pelo audit simplificado:
- [ ] Headline tem benefício específico?
- [ ] Lead prende em 10 segundos?
- [ ] Usa linguagem do mercado (não jargão)?
- [ ] Oferta está clara (sabe o que ganha)?
- [ ] CTA é inequívoco (sabe o que fazer)?
- [ ] Tem pelo menos 1 elemento de prova?
- [ ] Tem urgência/escassez?

**Output:** Peça de copy revisada (rascunho final).

### CHECKPOINT CP-4
- [ ] Formato escolhido é compatível com awareness?
- [ ] Peça tem todos os 9 elementos da estrutura mínima?
- [ ] Audit passou sem bloqueios críticos?

**VETO:** Se não tem NENHUMA prova (zero depoimentos, zero dados, zero casos) → PARAR. Conseguir pelo menos 1 prova antes de publicar, ou usar "garantia agressiva" como substituto temporário.

---

## FASE 5: CANAL — Publicar e Começar a Vender (30min-1h)

**Clone principal:** @dan-koe (orgânico) OU @john-carlton (ads)

### Passo 5.1: Escolher UM Canal
**Regra do 0→1:** Um canal só. Dominar antes de diversificar.

```yaml
decisao_canal:
  criterio_1: "Onde meu público JÁ está?"
  criterio_2: "Onde consigo testar com MENOR fricção?"
  criterio_3: "Onde tenho ALGUMA vantagem (audiência, budget, skill)?"

  opcoes:
    organico_instagram: "Se tem audiência ou pode criar conteúdo diário"
    meta_ads: "Se tem R$50-100/dia para testar"
    google_ads: "Se público pesquisa solução ativamente"
    email_cold: "Se tem lista ou pode construir"
    outreach_manual: "Se ticket é alto e volume é baixo"
    comunidades: "Se participa ativamente de grupos do nicho"
```

### Passo 5.2: Adaptar Copy para o Canal
- **Ads:** Headline → criativo + 3 variações de copy
- **Orgânico:** Headline → posts + stories + CTA para LP
- **Email:** Headline → subject lines + sequência de 3-5 emails
- **Outreach:** Headline → mensagem personalizada + follow-up

### Passo 5.3: Publicar

**Output:** Copy publicada no canal escolhido.

### CHECKPOINT CP-5
- [ ] Canal escolhido com justificativa?
- [ ] Copy adaptada para o formato do canal?
- [ ] Publicada e rodando?

---

## FASE 6: TESTE — Vendeu ou Não Vendeu? (contínuo)

**Clone principal:** @claude-hopkins

### Passo 6.1: Registro Simples
No 0→1, não precisa de ICE Score nem significância estatística. Precisa de:

```yaml
registro_teste:
  data: ""
  o_que_testei: "" # Ex: "Headline A vs Headline B"
  o_que_aconteceu: "" # Ex: "A teve 3% CTR, B teve 1.2%"
  o_que_aprendi: "" # Ex: "Dor > aspiração neste público"
  proximo_teste: "" # Ex: "Testar oferta com garantia vs sem"
```

### Passo 6.2: Ordem de Testes
**Testar as coisas que mais impactam primeiro:**

1. **Oferta** — Está vendendo? Se não, mudar oferta antes de mudar copy.
2. **Headline** — Estão clicando/lendo? Se não, mudar headline.
3. **Lead** — Estão ficando? Se não, mudar abertura.
4. **Preço** — Estão interessados mas não comprando? Testar preço/garantia.

### Passo 6.3: Definir Controle
Quando algo funcionar:
```yaml
controle_atual:
  peca_vencedora: "" # Qual versão está ativa
  metrica_referencia: "" # CTR, CVR, CPA, ROAS (o que tiver)
  data_desde: "" # Desde quando roda
  proximo_desafiante: "" # O que vai testar contra
```

**Output:** Registro de testes + controle definido.

### CHECKPOINT CP-6 (FINAL)
- [ ] Pelo menos 1 teste real executado (não hipotético)?
- [ ] Resultado documentado com aprendizado?
- [ ] Controle atual definido?

---

## VETO CONDITIONS

| ID | Condição | Severidade | Ação |
|----|----------|-----------|------|
| VT-1 | Zero pesquisa de mercado (só achismo) | BLOCKING | PARAR — pesquisar antes de escrever |
| VT-2 | Promessa idêntica à do concorrente | BLOCKING | PARAR — criar mecanismo único |
| VT-3 | Valor percebido < 3x preço | BLOCKING | PARAR — adicionar componentes ou reposicionar |
| VT-4 | Zero prova social/dados/casos | HIGH | PAUSAR — conseguir prova ou compensar com garantia agressiva |
| VT-5 | Copy não publicada após completar Fase 4 | HIGH | PAUSAR — publicar imperfeita > polir infinitamente |

---

## CRITÉRIO DE GRADUAÇÃO (0→1 completo)

Quando migrar para o estágio 1→10:

```yaml
graduacao:
  criterios:
    - "Tem vendas recorrentes (não apenas 1 venda)"
    - "Sabe qual canal funciona melhor"
    - "Tem um controle de copy definido (sabe o que está funcionando)"
    - "Consegue prever minimamente o resultado de uma campanha"
  workflow_seguinte: "copy-1-to-10.md"
```

---

**Versão:** 1.0.0
**Ontologia base:** `data/copy-stages-ontology.md`
