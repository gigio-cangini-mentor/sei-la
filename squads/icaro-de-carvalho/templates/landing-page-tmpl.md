# Template: Landing Page de Vendas — Framework PPP (Produto / Proposta / Personalidade)

> **Base:** Ícaro de Carvalho — triângulo PPP + IC_DH_003 (leque de preços)
> **Princípio central:** "Proposta mata preço. Errar a proposta é mais violento que errar o preço."
> **Regra de ouro:** nunca esconder a venda — comprador brasileiro é emocional e utilitarista; dê o estímulo emocional primeiro, o racional confirma depois

---

## A Lógica por Trás da Estrutura

Antes de usar o template, entenda o que cada bloco faz:

| Bloco | Função | Pilar PPP |
|-------|--------|-----------|
| Hero | Captura atenção + filtra audiência certa | Proposta + Personalidade |
| Causa | Explica por que isso existe (não o produto — o motivo) | Personalidade |
| Storytelling | Gera identificação emocional e constrói confiança | Proposta + Personalidade |
| O que está incluído | Justifica racionalmente o que o emocional já decidiu | Produto |
| Leque de preços | Multiplica conversões com opções de entrada | Produto (IC_DH_003) |
| Prova social | Reduz risco percebido com evidências reais | Proposta |
| FAQ | Mata objeções antes que virem abandono de página | Produto + Proposta |
| CTA final | Fecha o clico — uma ação, um link, urgência real | Todos os três |

---

## Placeholders

| Placeholder | O que preencher |
|-------------|-----------------|
| `{{HEADLINE}}` | A proposta emocional em uma frase — o que muda na vida do cliente |
| `{{SUBHEADLINE}}` | O que é o produto racionalmente — formato, categoria, entregável |
| `{{PRODUTO}}` | Nome do produto |
| `{{PROPOSTA}}` | Benefício central — o resultado emocional prometido |
| `{{HISTORIA}}` | Parágrafos de storytelling pessoal ou case de cliente |
| `{{PRECO_1}}` | Menor faixa de preço — entrada |
| `{{PRECO_2}}` | Faixa intermediária — mais popular |
| `{{PRECO_3}}` | Maior faixa — premium ou completo |
| `{{NOME_CRIADOR}}` | Quem está por trás do produto |
| `{{LINK_COMPRA}}` | URL do checkout |
| `{{PRAZO}}` | Data ou condição de encerramento real |
| `{{BONUS}}` | Bônus com valor percebido alto (se houver) |

---

## BLOCO 1 — Hero (Acima da Dobra)

> **O que faz:** nos primeiros 5 segundos, o visitante decide se fica ou sai. A headline é a proposta emocional. A subheadline é o produto racional. Juntas, elas dizem "é para mim" ou "não é para mim" — e isso é o objetivo.

```markdown
# {{HEADLINE}}
## {{SUBHEADLINE}}

[Botão] {{CTA}} → {{LINK_COMPRA}}

[Prova rápida abaixo do botão: "Mais de X pessoas já fizeram isso"
ou um resultado específico em uma linha]
```

**Exemplo preenchido:**
```
# Você não tem problema de dinheiro. Você tem problema de proposta.
## Curso online em vídeo — 8 módulos para reposicionar seu negócio em 30 dias

[Quero reposicionar meu negócio]

Mais de 4.200 pessoas já aplicaram esse método
```

**Anti-padrões:**
- Headline genérica ("Transforme sua vida") — não filtra ninguém
- Headline só racional ("Curso com 8 módulos de marketing") — não gera desejo
- Mais de dois elementos acima da dobra — confunde o visitante

---

## BLOCO 2 — Bloco de Causa (Por que isso importa)

> **O que faz:** o visitante não compra produto — compra causa. Este bloco explica o "porquê" por trás de {{PRODUTO}}. Não é a "missão da empresa" corporativa — é a razão pessoal e irritante que fez {{NOME_CRIADOR}} criar isso.

```markdown
## Por que eu criei isso

[2 a 4 parágrafos curtos. Estrutura sugerida:]

[Parágrafo 1 — A dor que motivou a criação. Específica, não genérica.]
[Parágrafo 2 — O que não existia no mercado que precisava existir.]
[Parágrafo 3 — O que mudou quando a solução foi testada pela primeira vez.]
[Parágrafo 4 (opcional) — Quem é {{NOME_CRIADOR}} em uma frase honesta.]
```

**Exemplo preenchido:**
```
## Por que eu criei isso

Eu passei três anos cobrando preço baixo porque achava que meu problema
era de vendas. Não era. Era de proposta. Eu estava vendendo a coisa errada
para a pessoa errada.

Quando entendi que o preço era só o sintoma — e que o problema real era
não saber transformar o que eu faço em algo que as pessoas realmente queriam
comprar — tudo mudou.

Não existia um método direto para isso. Existiam livros de marketing
americano que não funcionam no Brasil. Existiam cursos de "copywriting"
que ensinavam fórmula sem ensinar lógica.

Então eu construí o método que eu queria ter encontrado em 2018.
```

**Anti-padrões:**
- "Nossa missão é transformar vidas" — linguagem corporativa vazia
- Causa que parece fabricada para vender — o leitor sente isso
- Causa longa demais — três parágrafos são suficientes

---

## BLOCO 3 — Storytelling (História Pessoal ou Case)

> **O que faz:** a identificação emocional acontece aqui. O visitante precisa se ver na história — seja na dor do criador ou no resultado do aluno. Sem isso, o produto é só mais um produto.

```markdown
## [Título da história — pode ser o nome do cliente ou o momento de virada]

{{HISTORIA}}

[Estrutura interna da história:]
[1. Situação antes — a dor específica e reconhecível]
[2. O momento de virada — o que mudou e por quê]
[3. Resultado depois — específico, com número se possível]
[4. Conexão com o visitante — "se você está passando pelo mesmo..."]
```

**Exemplo preenchido (case de aluno):**
```
## A Mariana cobrava R$ 150 por sessão. Hoje cobra R$ 1.200.

Quando ela chegou para mim, tinha lista de espera. Agenda lotada.
E ganhava menos que a maioria dos seus clientes.

O problema não era demanda. Era proposta. Ela vendia sessão de coaching.
Quando ela aprendeu a vender resultado de vida — o número na conta, o emprego
conquistado, o relacionamento reconstruído — o preço que ela podia cobrar
mudou completamente.

Em 60 dias ela tinha refatorado sua comunicação, dobrado seu preço e
reduzido sua agenda pela metade.

Se você está lotado mas não está satisfeito com o que recebe, o problema
provavelmente não é você — é a proposta que você usa para se apresentar.
```

**Anti-padrões:**
- Resultado vago ("minha vida mudou completamente") — sem número não é prova
- História sem identificação com o visitante — precisa da dor antes do resultado
- Mais de dois casos em sequência — um bom caso é mais convincente que cinco mediocres

---

## BLOCO 4 — O Que Está Incluído (Produto Detalhado)

> **O que faz:** o emocional já decidiu comprar. Este bloco é o racional confirmando que a decisão faz sentido. Liste o que está incluído com o benefício de cada item — não só o nome.

```markdown
## O que você recebe em {{PRODUTO}}

**[Nome do módulo ou entregável 1]**
[Uma frase explicando o que o aluno consegue fazer depois deste módulo]

**[Nome do módulo ou entregável 2]**
[Uma frase explicando o resultado prático]

**[Nome do módulo ou entregável 3]**
[Uma frase explicando o resultado prático]

[Continue para todos os módulos/entregáveis]

---

**Bônus incluídos:**

**{{BONUS}}**
[Valor percebido e por que está incluído]
```

**Anti-padrões:**
- Listar só o nome sem o benefício ("Módulo 3: Precificação") — não vende
- Lista de 20 itens sem destaque — ninguém lê tudo, priorize os 5 mais fortes
- Bônus sem valor percebido claro — bônus que não tem valor não convence

---

## BLOCO 5 — Leque de Preços (IC_DH_003)

> **O que faz:** produto com preço único perde vendas na faixa de cima e na faixa de baixo. Três faixas captura quem não pagaria o preço único mas paga a faixa de entrada, e quem pagaria mais por uma entrega premium.

```markdown
## Escolha como você quer entrar

---

### Faixa 1 — [Nome da faixa de entrada]
**{{PRECO_1}}**

- [O que está incluído — versão essencial]
- [O que está incluído]

[Botão] Quero essa opção

---

### Faixa 2 — [Nome da faixa intermediária] ← MAIS POPULAR
**{{PRECO_2}}**

- [Tudo da faixa 1, mais:]
- [Entregável adicional]
- [Entregável adicional]

[Botão] Quero essa opção

---

### Faixa 3 — [Nome da faixa premium]
**{{PRECO_3}}**

- [Tudo da faixa 2, mais:]
- [Acesso exclusivo / mentoria / acompanhamento]

[Botão] Quero essa opção

---
```

**Lógica do leque (IC_DH_003):**
- Faixa 1: entrada acessível; converte quem quer mas não pode pagar o preço cheio
- Faixa 2: proposta principal; deve ser a mais popular — posicione assim visualmente
- Faixa 3: ancora o preço da faixa 2 como "razoável" e captura quem quer o máximo

**Anti-padrões:**
- Faixas sem diferença real — o visitante não sabe por que pagar mais
- Mais de três faixas — paralisia de escolha
- Faixa 3 sem entregável de alto valor percebido — não justifica o salto de preço

---

## BLOCO 6 — Depoimentos e Prova Social

> **O que faz:** elimina o risco percebido. O visitante pensa "se funcionou para alguém parecido comigo, pode funcionar para mim."

```markdown
## O que dizem quem já passou por isso

---

**[Nome do cliente], [contexto em uma linha]**
"[Depoimento com resultado específico — número, mudança concreta, situação antes e depois]"

---

**[Nome do cliente], [contexto em uma linha]**
"[Depoimento com resultado específico]"

---

**[Nome do cliente], [contexto em uma linha]**
"[Depoimento com resultado específico]"

---
```

**Regras para depoimentos que convertem:**
- Resultado específico bate elogio genérico ("aprendi muito" não convence)
- Identificação com o visitante: o cliente deve ter o mesmo perfil do público-alvo
- Foto real aumenta credibilidade — avatar ou iniciais diminuem

**Anti-padrões:**
- "Adorei o curso, recomendo muito!" — sem resultado específico não é prova
- Depoimentos de pessoas muito diferentes do público-alvo
- Bloco de 15 depoimentos mediocres — prefira 3 depoimentos fortes

---

## BLOCO 7 — FAQ (Manejo de Objeções)

> **O que faz:** cada pergunta no FAQ é uma objeção disfarçada. Resolva aqui antes que o visitante feche a página para "pensar melhor."

```markdown
## Perguntas frequentes

**Para quem é {{PRODUTO}}?**
[Descreva o cliente ideal — seja específico. Quem não é o cliente ideal também deve estar aqui.]

**Para quem NÃO é {{PRODUTO}}?**
[Honestidade sobre quem não vai se beneficiar aumenta credibilidade com quem vai]

**Preciso de [pré-requisito comum] para aproveitar?**
[Elimine a barreira de entrada se ela for falsa]

**Como funciona o acesso?**
[Formato, plataforma, duração do acesso]

**E se eu não gostar?**
[Política de garantia — se tiver, detalhe aqui]

**Por que {{PRECO_2}} e não [preço mais baixo]?**
[Justifique com o valor entregue, não com custo de produção]
```

**Objeções mais comuns para cobrir:**
1. "Não tenho tempo" — quanto tempo por semana é necessário?
2. "Já tentei algo parecido e não funcionou" — o que é diferente aqui?
3. "Não sei se é para mim" — descreva o cliente ideal com precisão
4. "Está caro" — compare com o custo de não resolver o problema

---

## BLOCO 8 — CTA Final com Urgência

> **O que faz:** fecha o ciclo. Repete a proposta emocional, reforça urgência real e oferece um único caminho.

```markdown
---

## {{PROPOSTA}} começa aqui

[Repetição da headline ou variação com mais urgência]

{{PRODUTO}} está disponível até {{PRAZO}}.

[Motivo real da urgência — turma limitada, prazo de oferta, encerramento de acesso]

[Botão principal] {{CTA}} → {{LINK_COMPRA}}

[Linha abaixo do botão:]
Acesso imediato após a confirmação do pagamento.
```

**Anti-padrões:**
- "Não perca essa oportunidade" — clichê que não gera urgência real
- Urgência sem justificativa ("oferta por tempo limitado" sem dizer quanto tempo) — destrói confiança
- Dois botões com CTAs diferentes — o visitante precisa de uma direção clara

---

## Proporção Recomendada por Bloco

| Bloco | Importância | Tamanho |
|-------|-------------|---------|
| Hero | Crítico | Curto — máximo 2 frases + botão |
| Causa | Alto | 3 a 4 parágrafos |
| Storytelling | Alto | 1 história forte ou 2 casos curtos |
| O que está incluído | Médio | Lista com benefícios, não só nomes |
| Leque de preços | Crítico | 3 faixas, comparação visual clara |
| Prova social | Alto | 3 a 5 depoimentos com resultado específico |
| FAQ | Médio | 5 a 8 perguntas — objeções reais |
| CTA final | Crítico | Curto — uma frase, um botão |

---

## Checklist Final Antes de Publicar

- [ ] A headline é a proposta emocional — não o nome do produto
- [ ] Existe apenas um CTA por bloco
- [ ] O leque de preços tem três faixas com diferença real entre elas
- [ ] Cada depoimento tem resultado específico (número ou mudança concreta)
- [ ] A venda está explícita desde o hero — não há disfarce
- [ ] A urgência tem justificativa real
- [ ] Reli a página em voz alta — soa como {{NOME_CRIADOR}} ou como copy genérico?

---

*Framework: Ícaro de Carvalho — Produto / Proposta / Personalidade + IC_DH_003 (Leque de Preços)*
*Templates compilados para o squad icaro-de-carvalho*
