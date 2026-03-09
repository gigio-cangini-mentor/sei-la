# word-mapping

## Metadata
```yaml
task_id: CE_COPY_001
agent: tessman-copy
type: research
complexity: medium
estimated_time: 30-45min
source: "Conversão Extrema - Mapa das Palavras"
```

## Purpose

Executar o processo de Word Mapping (Mapa das Palavras) para coletar as palavras e frases EXATAS que o público-alvo usa para descrever dores, desejos e objeções.

> **"As palavras são a ferramenta mais poderosa no marketing. Falar a linguagem do CLIENTE, não a SUA."** — Eban Pagan (citado por Tessman)

---

## Executor

**Agent:** `tessman-copy`
**Model:** `sonnet`

---

## Elicit

**TRUE** - Processo colaborativo com usuário para identificar fontes e coletar palavras.

---

## Veto Conditions

```yaml
veto_conditions:
  - condition: "Público-alvo não definido"
    action: "HALT - Executar diagnose-business.md primeiro"

  - condition: "Sem acesso a fontes de dados (comentários, mensagens, reviews)"
    action: "WARNING - Mapa será limitado, começar com entrevistas diretas"
```

---

## Steps

### STEP 1: Explicar o Conceito

```markdown
## O que é Word Mapping?

É uma lista de palavras e frases RETIRADAS DO PÚBLICO para usar na sua comunicação.

**Por quê isso funciona?**

Você fala "otimização de ROI em campanhas digitais"
Seu cliente fala "ganhar mais do que gasto em anúncio"

Quando você usa as palavras DELE, ele pensa: "Esse cara me entende!"

**Onde usar:**
- Anúncios (Google, Facebook, Instagram)
- Landing pages
- Emails
- Posts orgânicos
- Scripts de vídeo
- Mensagens de vendas
```

### STEP 2: Identificar Fontes de Dados

**Elicitar do usuário: Quais dessas fontes você tem acesso?**

```yaml
fontes_dados:
  tier_1_ouro:
    - nome: "Comentários em posts seus (Instagram/Facebook)"
      valor: "Altíssimo - linguagem natural, dores reais"
      como_coletar: "Copiar comentários dos últimos 30 posts"

    - nome: "Mensagens no Direct/WhatsApp"
      valor: "Altíssimo - perguntas e objeções reais"
      como_coletar: "Print de conversas (remover dados pessoais)"

    - nome: "Reviews/depoimentos de clientes"
      valor: "Alto - resultado na linguagem deles"
      como_coletar: "Copiar depoimentos existentes"

  tier_2_prata:
    - nome: "Comentários em posts de concorrentes"
      valor: "Alto - público similar"
      como_coletar: "Buscar 5-10 concorrentes, copiar comentários"

    - nome: "Reviews de produtos similares (Amazon, Reclame Aqui)"
      valor: "Médio - linguagem do mercado"
      como_coletar: "Buscar produto similar, ler reviews"

    - nome: "Grupos do Facebook/WhatsApp do nicho"
      valor: "Médio - perguntas e discussões"
      como_coletar: "Entrar em grupos, observar conversas"

  tier_3_bronze:
    - nome: "Perguntas em stories/enquetes"
      valor: "Médio - interação direta"
      como_coletar: "Fazer perguntas abertas, salvar respostas"

    - nome: "Formulários de captura (campo aberto)"
      valor: "Médio - motivação para buscar solução"
      como_coletar: "Adicionar campo: 'Qual seu maior desafio com [tema]?'"
```

**Priorização:**

```yaml
se_tem_poucos_dados:
  acao: "Começar com Tier 1 (comentários + DMs próprios)"
  backup: "Se não tem, usar Tier 2 (concorrentes)"

se_tem_muitos_dados:
  acao: "Combinar Tier 1 + Tier 2 (mínimo 100 frases coletadas)"
```

### STEP 3: Processo de Coleta

**Instruções ao usuário:**

```markdown
## Como Coletar

1. **Abra um Google Doc ou arquivo de texto**

2. **Vá em cada fonte e COPIE exatamente como está escrito:**

   Exemplo de comentários no Instagram:
   ```
   "Gasto muito em anúncio mas não vendo nada 😞"
   "Como faço pra aparecer no Google?"
   "Vale a pena investir em tráfego pago?"
   "Tá difícil vender sem gastar uma fortuna"
   ```

3. **NÃO corrija erros, NÃO mude palavras**
   - Copie EXATAMENTE (inclusive emojis, gírias)

4. **Categorize enquanto coleta:**
   - DORES: O que incomoda
   - DESEJOS: O que querem alcançar
   - OBJEÇÕES: Por que não compram
   - PERGUNTAS: Dúvidas frequentes

5. **Meta: Mínimo 50 frases, ideal 100+**
```

**Elicitar:**

```yaml
questoes_guia:
  - q1: "De qual fonte você vai começar?"
    opcoes:
      - "Meus comentários Instagram/Facebook"
      - "Mensagens DM/WhatsApp"
      - "Comentários de concorrentes"
      - "Reviews de produtos similares"
      - "Outras (especificar)"

  - q2: "Quantas frases você conseguiu coletar até agora?"
    validacao:
      minimo: 30
      ideal: 50
      excelente: 100+
```

### STEP 4: Categorização e Análise

**Após coleta, categorizar em 4 grupos:**

```yaml
categoria_1_dores:
  definicao: "O que incomoda, frustra, causa dor"
  exemplos:
    - "Gasto muito e não vendo"
    - "Não sei se está funcionando"
    - "Perco dinheiro todo mês"
    - "Ninguém clica nos meus anúncios"

  como_usar:
    - "Headlines de anúncios (agitar dor)"
    - "Primeira seção da landing page"
    - "Emails de conexão (empatia)"

categoria_2_desejos:
  definicao: "O que querem alcançar, resultado ideal"
  exemplos:
    - "Quero vender todo dia"
    - "Ter anúncios que dão lucro"
    - "Faturar R$10k/mês"
    - "Viver de vendas online"

  como_usar:
    - "Títulos de landing pages"
    - "CTAs (calls-to-action)"
    - "Promessas em anúncios"

categoria_3_objecoes:
  definicao: "Por que NÃO compram, resistências"
  exemplos:
    - "É muito caro"
    - "Já tentei e não funcionou"
    - "Não tenho tempo pra aprender"
    - "Tenho medo de gastar e perder"

  como_usar:
    - "Seção de FAQ na landing page"
    - "Scripts de vendas (antecipação)"
    - "Emails de aquecimento (quebrar objeção)"

categoria_4_perguntas:
  definicao: "Dúvidas frequentes, o que querem saber"
  exemplos:
    - "Quanto preciso investir por mês?"
    - "Funciona para iniciante?"
    - "Quanto tempo leva pra ter resultado?"
    - "Precisa de site?"

  como_usar:
    - "FAQ completo"
    - "Conteúdo educativo (blog, vídeos)"
    - "Scripts de atendimento"
```

### STEP 5: Criar Biblioteca de Palavras

**Output Format:**

```yaml
word_map_library:
  dores:
    - frase: "Gasto muito em anúncio mas não vendo nada"
      fonte: "Comentário Instagram @usuario123"
      frequencia: "Alta (apareceu 8x)"
      intensidade: "Crítica"

    - frase: "Perco dinheiro todo mês com anúncio"
      fonte: "DM usuário"
      frequencia: "Média (3x)"
      intensidade: "Alta"

  desejos:
    - frase: "Quero vender todo dia pelo Instagram"
      fonte: "Comentário Facebook"
      frequencia: "Alta (12x)"

    - frase: "Ter anúncios que dão lucro"
      fonte: "Story pergunta"
      frequencia: "Alta (9x)"

  objecoes:
    - frase: "É muito caro, não tenho dinheiro"
      fonte: "DM"
      frequencia: "Altíssima (15x)"
      resposta_sugerida: "Parcelamento em até 12x, investimento se paga"

  perguntas:
    - pergunta: "Quanto preciso investir por mês?"
      fonte: "Comentário"
      frequencia: "Altíssima (20x)"
      resposta: "A partir de R$300/mês você já consegue resultados"
```

### STEP 6: Aplicação Prática

**Transformar Mapa em Copy:**

```yaml
exemplo_aplicacao:
  antes_sem_mapa:
    headline: "Curso de Marketing Digital com ROI Garantido"
    problema: "Linguagem técnica, distante do público"

  depois_com_mapa:
    headline: "Pare de Gastar em Anúncio Sem Vender - Comece a Lucrar em 30 Dias"
    porque_funciona: "Usa as PALAVRAS EXATAS do público (gasto, vender, lucrar)"

  exemplo_2:
    antes: "Otimização de campanhas de tráfego pago"
    depois: "Faça seus anúncios darem lucro ao invés de apenas gastar"

  exemplo_3:
    antes: "Metodologia validada cientificamente"
    depois: "Método testado por 5.000 pessoas que estavam onde você está"
```

---

## Output Example

```yaml
word_mapping_output:
  date: "2026-03-02"
  nicho: "Tráfego Pago para Infoprodutores"
  total_frases_coletadas: 127

  top_10_dores:
    - "Gasto muito mas não vendo" (18 menções)
    - "Não sei se está funcionando" (15 menções)
    - "Perco dinheiro todo mês" (12 menções)
    - "Ninguém clica nos meus anúncios" (10 menções)
    - "Meus anúncios não aprovam" (9 menções)
    - "Não entendo nada de Facebook Ads" (8 menções)
    - "Tentei sozinho e não consegui" (7 menções)
    - "É muito complicado" (7 menções)
    - "Tenho medo de gastar e perder" (6 menções)
    - "Não sei por onde começar" (6 menções)

  top_10_desejos:
    - "Vender todo dia" (22 menções)
    - "Ter anúncios que dão lucro" (18 menções)
    - "Faturar R$10k/mês" (15 menções)
    - "Viver de vendas online" (12 menções)
    - "Ganhar mais do que gasto" (11 menções)
    - "Escalar as vendas" (9 menções)
    - "Ter previsibilidade de vendas" (8 menções)
    - "Conseguir clientes todo dia" (7 menções)
    - "Saber se vai dar lucro antes de gastar" (6 menções)
    - "Dominar tráfego pago" (6 menções)

  top_10_objecoes:
    - "É muito caro" (25 menções)
    - "Já tentei e não funcionou" (18 menções)
    - "Não tenho tempo" (12 menções)
    - "Tenho medo de gastar e perder" (10 menções)
    - "Precisa de muito dinheiro pra começar?" (9 menções)
    - "É difícil demais" (8 menções)
    - "Não funciona pro meu nicho" (7 menções)
    - "Não sei mexer no computador" (5 menções)

  top_10_perguntas:
    - "Quanto preciso investir por mês?" (32 menções)
    - "Funciona para iniciante?" (24 menções)
    - "Quanto tempo leva pra ter resultado?" (18 menções)
    - "Precisa de site?" (15 menções)
    - "Funciona pra produto físico/digital/serviço?" (12 menções)
    - "Quanto custa um clique?" (10 menções)
    - "Como sei se está dando certo?" (9 menções)
    - "Qual melhor: Google ou Facebook?" (8 menções)

  aplicacoes_imediatas:
    headlines_sugeridos:
      - "Pare de Gastar em Anúncio Sem Vender"
      - "Comece a Ter Lucro com Seus Anúncios em 30 Dias"
      - "Do Zero ao Primeiro Anúncio que Dá Lucro"

    faqs_criar:
      - "Quanto preciso investir?"
      - "Funciona para iniciante?"
      - "Quanto tempo leva?"
      - "Precisa de site?"

    objecoes_tratar:
      - Preço: "Parcelamento 12x + ROI compensa investimento"
      - "Já tentei": "Método diferente, validado por 5.000 alunos"
      - Tempo: "Apenas 1h/dia, passo a passo guiado"
```

---

## Completion Criteria

```yaml
word_mapping_complete_when:
  - [ ] Mínimo 50 frases coletadas (ideal 100+)
  - [ ] Categorização em 4 grupos (dores, desejos, objeções, perguntas)
  - [ ] Top 10 identificados por categoria
  - [ ] Frequência registrada (quantas vezes apareceu)
  - [ ] Aplicações imediatas sugeridas (headlines, FAQs)
  - [ ] Biblioteca organizada em formato reutilizável
```

---

## Handoff To

```yaml
handoff:
  agent: "tessman-copy"
  task: "create-ad-copy.md" (usar mapa para criar anúncios)
  when: "Imediatamente após word mapping"
  data: "word_map_library.yaml"
```

---

## Quality Gate

```yaml
word_map_quality:
  - [ ] Palavras coletadas são LITERAIS (não editadas)
  - [ ] Fonte registrada para cada frase
  - [ ] Categorização clara (dores vs desejos vs objeções)
  - [ ] Aplicação prática demonstrada (antes/depois)
  - [ ] Biblioteca reutilizável criada
```

---

*Task: CE_COPY_001 | Agent: tessman-copy | Version: 1.0*
*Source: Conversão Extrema - Mapa das Palavras*
