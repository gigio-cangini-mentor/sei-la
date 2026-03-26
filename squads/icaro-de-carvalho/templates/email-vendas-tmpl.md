# Template: Email de Vendas — Framework Ícaro de Carvalho

> **Base:** IC_DH_008 — "Email é tiro de 60 mil. Escreva na segunda, revise na quarta, revise na sexta."
> **Gatilhos principais:** reciprocidade + comprometimento (Cialdini)
> **Regra de ouro:** nunca esconder a venda — transparência sobre intenção comercial aumenta confiança

---

## Estrutura Universal do Email de Vendas

```
[SUBJECT LINE]
[PRIMEIRO PARÁGRAFO — seu melhor material vai aqui]
[CORPO — contexto, história ou prova]
[CTA — uma ação, clara e única]
[ASSINATURA]
[P.S. — segundo CTA ou reforço emocional]
```

---

## Regras Inegociáveis Antes de Escrever

- **Subject sem emoji** — emoji em subject é sinal de spam e grita "promoção barata"
- **Subject sem CAPS LOCK** — parece grito, não persuasão
- **Um único CTA** — dois botões = zero cliques; a pessoa não sabe o que fazer
- **Transparência sobre a venda** — não disfarce que está vendendo; isso aumenta, não diminui a conversão
- **Melhor parágrafo primeiro** — se o leitor parar no segundo parágrafo, o que ele leu já valeu
- **P.S. é lido quase tanto quanto o subject** — use com intenção
- Revise 3 vezes em dias diferentes antes de disparar para lista grande

---

## Placeholders

| Placeholder | O que preencher |
|-------------|-----------------|
| `{{NOME}}` | Nome do destinatário (personalização) |
| `{{PRODUTO}}` | Nome do produto ou serviço sendo vendido |
| `{{PROPOSTA_EMOCIONAL}}` | O benefício emocional central (não a feature) |
| `{{CTA}}` | Verbo de ação: "acesse", "garanta", "entre", "clique" |
| `{{LINK}}` | URL da página de vendas ou checkout |
| `{{PRECO}}` | Preço ou faixa de preço |
| `{{PRAZO}}` | Data ou condição de urgência real |
| `{{TEMA_CONTEUDO}}` | Assunto que levou o lead a entrar na lista |

---

## VARIAÇÃO 1 — Reengajamento (Lista Fria)

**Quando usar:** Lista que não abre seus emails há mais de 60 dias. Objetivo: trazer de volta ou limpar a base.

```
SUBJECT: {{NOME}}, uma pergunta rápida

Faz tempo que a gente não se fala.

Você entrou nessa lista porque em algum momento se interessou por
{{TEMA_CONTEUDO}}. Talvez tenha achado útil, baixou o material, e
depois a vida aconteceu. Normal.

Mas eu queria te fazer uma pergunta honesta: você ainda quer
{{PROPOSTA_EMOCIONAL}}?

Se sim, na semana que vem eu vou abrir {{PRODUTO}} e queria que você
soubesse antes de todo mundo. Sem promoção. Sem desconto. Só prioridade.

Se não, sem problema. Clica no link abaixo e eu te tiro da lista sem
ressentimento nenhum.

[link de descadastro]

Abraço,
[Nome]

P.S. Se sim, responde este email com "tenho interesse" — quero saber
quantas pessoas recebem essa mensagem antes de divulgar em outro lugar.
```

**Por que funciona:**
- Reciprocidade: você avisa antes de todo mundo
- Comprometimento: pede uma ação pequena (responder) que cria vínculo
- Transparência: o link de saída reduz atrito e aumenta confiança em quem fica

---

## VARIAÇÃO 2 — Pré-Lançamento (Aquecimento)

**Quando usar:** 3 a 5 dias antes de abrir as vendas. Objetivo: criar antecipação e desejo antes do lançamento.

```
SUBJECT: o que eu não vou te dizer na quinta-feira

{{NOME}},

Na quinta-feira eu vou abrir {{PRODUTO}} para a lista. Vai ter página
de vendas, depoimentos, tudo certinho.

Mas esse email não é sobre isso.

Eu quero te contar por que eu criei esse produto — não a versão
polida que vai estar na página, mas a versão real.

[HISTÓRIA CURTA — 3 a 5 linhas sobre a dor que o produto resolve,
baseada em experiência própria ou de um cliente real]

{{PROPOSTA_EMOCIONAL}}.

Isso é o que {{PRODUTO}} entrega. Não é uma promessa vaga — é o
resultado que eu vi acontecer [número] vezes.

Na quinta você vai ter todos os detalhes. Mas se você já sabe que
isso é para você, pode entrar na lista de espera aqui:

{{LINK}}

Quem está nessa lista tem acesso 24 horas antes de todo mundo.

[Nome]

P.S. Não vou enviar desconto. Vou enviar acesso antecipado — que é
mais valioso do que desconto para quem realmente quer isso.
```

**Por que funciona:**
- Reciprocidade: entrega valor (a história real) antes de pedir
- Comprometimento: lista de espera = micro-ação que antecipa a compra
- Personalidade: a versão "não polida" cria conexão genuína

---

## VARIAÇÃO 3 — Venda Direta (Lançamento ou Oferta Aberta)

**Quando usar:** Dia de abertura do carrinho ou oferta com prazo definido. Objetivo: conversão imediata.

```
SUBJECT: {{PRODUTO}} está aberto — até {{PRAZO}}

{{NOME}},

Direto ao ponto: {{PRODUTO}} está disponível agora.

[PRIMEIRO PARÁGRAFO — seu argumento mais forte aqui. Uma dor
específica que o leitor reconhece imediatamente.]

O que está incluído:
- [Entregável 1 com benefício claro]
- [Entregável 2 com benefício claro]
- [Entregável 3 com benefício claro]

O preço é {{PRECO}}.

Não é desconto. Não é promoção. É o preço real porque eu acredito
que {{PROPOSTA_EMOCIONAL}} vale isso — e quem comprou pode confirmar.

[DEPOIMENTO CURTO ou RESULTADO ESPECÍFICO DE CLIENTE]

Se isso é para você, {{CTA}} aqui:

{{LINK}}

Se não é, tudo bem. Mas eu não vou ficar mandando email todo dia
sobre isso. Esse é o aviso.

[Nome]

P.S. Fecha {{PRAZO}}. Não porque é urgência fabricada — mas porque
eu preciso limitar o número de pessoas para entregar com qualidade.
```

**Por que funciona:**
- Transparência total: "direto ao ponto" e "não é promoção" desarmam ceticismo
- Prova social: depoimento ou número concreto sustenta o preço
- Urgência real: prazo com justificativa plausível, não contagem regressiva vazia

---

## VARIAÇÃO 4 — Nurturing (Relacionamento com Conteúdo)

**Quando usar:** Emails de conteúdo da sequência de boas-vindas ou newsletter regular. Objetivo: confiança antes da venda.

```
SUBJECT: [título da dica ou insight — ex: "o erro que me custou 3 meses"]

{{NOME}},

[INSIGHT, DICA OU HISTÓRIA — 80% do email. Conteúdo real,
sem diluição. A pessoa deve sentir que aprendeu algo ao ler.]

[No final do conteúdo, transição natural:]

Isso é parte do que eu ensino em {{PRODUTO}}. Se você quer aprofundar,
o link está aqui: {{LINK}}

Mas mesmo que você não compre nada, espero que esse email já tenha
valido o seu tempo.

[Nome]

P.S. Se você achou útil, encaminha para alguém que precisa disso.
```

**Por que funciona:**
- Conteúdo genuíno primeiro (reciprocidade sem disfarce)
- Menção ao produto no final, não como interrupção mas como extensão natural
- P.S. de compartilhamento aumenta alcance orgânico da lista

---

## Anti-Padrões — O Que Nunca Fazer

| Anti-padrão | Por quê mata o email |
|-------------|----------------------|
| Emoji no subject | Filtra como spam; sinaliza pressa e amadorismo |
| CAPS LOCK no subject | Parece grito; o leitor fecha antes de ler |
| Múltiplos CTAs | Paralisia de escolha; zero clique é o resultado |
| "Oportunidade imperdível" | Clichê que o leitor ignora automaticamente |
| Urgência sem motivo real | Destrói confiança quando a "última chance" aparece 10 vezes |
| Esconder que está vendendo | O leitor percebe e se sente enganado — pior que vender direto |
| Email muito longo sem paragrafação | Muro de texto = email fechado |
| Elogiar o leitor sem motivo | "Você é especial" sem substância = manipulação óbvia |

---

## Checklist de Revisão (IC_DH_008)

Antes de disparar para a lista, responda:

- [ ] Subject diz o que o email entrega sem mentir?
- [ ] Primeiro parágrafo é o mais forte do email?
- [ ] Existe apenas um CTA?
- [ ] A intenção de vender está clara desde o início?
- [ ] O P.S. reforça ou complementa o CTA principal?
- [ ] Reli em voz alta — soa humano ou parece template?
- [ ] Revi em dias diferentes (segunda, quarta, sexta)?

---

*Framework: Ícaro de Carvalho — O Novo Mercado | Templates compilados para o squad icaro-de-carvalho*
