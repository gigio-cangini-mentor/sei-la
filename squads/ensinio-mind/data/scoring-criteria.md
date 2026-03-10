# Scoring Criteria - WhatsApp Prospector Ensinio

> v3.0 — Dual Scoring (Cliente x Parceiro) + Matriz de Classificação + Modelo de Permuta
> Source of truth: `squads/ensinio-mind/data/` (ICPs, red flags, arguments, sales playbook)
> Breaking change: substitui classificação binária (client/partner) por matriz 2 eixos

## Modelo Dual Scoring

Cada prospect recebe **dois scores independentes**:
- **client_score (0-10):** Quanto essa pessoa precisa da Ensinio para o próprio negócio
- **partner_score (0-10):** Quanto essa pessoa pode trazer clientes para a Ensinio

Uma pessoa pode pontuar alto nos dois eixos simultaneamente.

---

## EIXO 1 — Client Score (0-10)

### Cálculo Obrigatório

O score DEVE ser calculado matematicamente. Comece pelo **score base** da faixa e aplique modificadores.

#### Score Base (escolher UM)

| Faixa | Condição | Base |
|-------|----------|------|
| HOT | Menciona necessidade explícita de LMS/plataforma, dor com plataforma atual, migração | 8 |
| WARM | Tem curso/conteúdo online, menciona produtos digitais, negócio educacional claro | 6 |
| MODERATE | Negócio que poderia usar LMS, audiência sem produto digital, automação genérica | 4 |
| COOL | Menções tangenciais, negócio físico com potencial digital | 2 |
| COLD | Nenhuma menção a educação/cursos/conteúdo, apenas interações sociais | 0 |

#### Bônus (somar ao base)

| Critério | Bônus | Signal no chat |
|----------|-------|---------------|
| Frustração com plataforma atual | +1 | "Cademi tá bugando", "Hotmart é limitado" |
| Orçamento disponível | +1 | Menciona faturamento, equipe, investimento |
| Urgência temporal | +1 | "Preciso resolver essa semana", deadline |
| Conteúdo pronto para hospedar | +1 | "Já tenho 50 aulas gravadas" |
| Equipe dedicada | +1 | Menciona time, social mídia, dev |
| Usa concorrente (Hotmart, Memberkit, Cademi) | +1 | Menciona por nome |
| Quer app mobile | +0.5 | Menciona app, celular, iOS/Android |
| ICP demográfico (idade 26-45) | +0.5 | Profissional maduro |
| ICP demográfico (grandes centros) | +0.5 | DDD 11, 21, 61 |
| ICP comportamental (faturamento R$20-100k) | +1 | Menciona faturamento/escala |
| ICP comportamental (audiência 10-50k) | +1 | Menciona seguidores, base |
| ICP comportamental (usa 2+ plataformas) | +1 | Menciona Hotmart + outra |
| ICP nicho top 5 | +0.5 | Negócios, Educação, Saúde, Finanças, Tech |
| Situação: "Quero monetizar conteúdo" | +1 | Match direto |
| Situação: "Quero área de membros" | +1 | Match direto |
| Situação: "Preciso de app" | +0.5 | Match direto |
| Situação: Cansado de integrações | +1 | Problemas entre plataformas |

#### Penalidades (subtrair do base)

| Critério | Penalidade | Signal no chat |
|----------|-----------|---------------|
| Mensagem muito antiga (> 6 meses) | -1 | Temporal context |
| Apenas 1 mensagem no grupo | -1 | Dados insuficientes |
| Mensagem vaga sem detalhes | -1 | Sem projeto claro |
| Red flag: zero faturamento | -2 | Começando do zero absoluto |
| Red flag: "taxa zero" obsessivo | -2 | Insiste em custo zero |
| Red flag: checkout internacional | -1 | Precisa USD/EUR (limitação) |
| Red flag: podcast/evento ao vivo | -1 | Feature inexistente |
| **Nicho não identificado** | **-2** | Se não identificou nicho específico, score max = 6 |

#### Cap e Floor

- **Cap:** 10 (nunca acima)
- **Floor:** 0 (nunca abaixo)
- **Regra nicho:** Se nicho = "não especificado", client_score max = 6

#### Documentação obrigatória

O campo `score_breakdown` DEVE conter o cálculo:
```
base: 6 (WARM - tem mentoria online)
+ frustração: +1 (reclama do Cademi)
+ concorrente: +1 (usa Cademi + Asaas)
+ ICP faturamento: +1 (menciona 40k/mês)
- msg antiga: -1 (nov/2025)
= client_score: 8
```

---

## EIXO 2 — Partner Score (0-10)

### Cálculo Obrigatório

Avalia o **potencial multiplicador** — quantos clientes essa pessoa pode trazer para a Ensinio.

#### Score Base (escolher UM)

| Perfil | Condição | Base |
|--------|----------|------|
| **Formador de formadores** | Ensina pessoas a criar negócio digital/infoproduto/mentoria | 6 |
| **Líder de comunidade** | Administra grupo/comunidade com membros do nicho | 5 |
| **Integrador técnico** | Monta stack/funil para clientes (agência, freelancer) | 4 |
| **Influenciador** | Tem audiência relevante no nicho de educação/negócios | 3 |
| **Sem potencial** | Não tem alcance, não trabalha com pessoas do nicho | 0 |

#### Bônus (somar ao base)

| Critério | Bônus | Signal no chat |
|----------|-------|---------------|
| Já recomenda ferramentas para alunos/clientes | +2 | "Eu uso X e recomendo", "usem Y" |
| Volume de alunos/clientes (10-49) | +1 | Menciona turmas, grupos, lotes |
| Volume de alunos/clientes (50+) | +2 | Menciona centenas, escala grande |
| Stack dele vira padrão para alunos (efeito cascata) | +1 | "Todo mundo da turma usa Cademi" |
| Frustração com ferramenta que recomenda hoje | +1 | "Cademi tá falhando para meus alunos" |
| Faz eventos/masterminds/workshops | +1 | Menciona encontros, lives do grupo |
| Audiência 10k-49k (para influenciadores) | +1 | Menciona seguidores |
| Audiência 50k+ (para influenciadores) | +2 | Número expressivo |
| Audiência no nicho certo (educação/negócios) | +1 | Conteúdo relevante |
| Engajamento alto (conversões, não só views) | +1 | Menciona vendas, resultados |

#### Penalidades

| Critério | Penalidade | Signal no chat |
|----------|-----------|---------------|
| Não tem alunos/clientes ativos | -2 | Ainda planejando |
| Audiência fora do nicho | -2 | Conteúdo sem relação com educação/negócios |
| Apenas 1 menção, sem evidência concreta | -1 | Vago sobre alcance |

#### Cap e Floor

- **Cap:** 10 (nunca acima)
- **Floor:** 0 (nunca abaixo)

#### Documentação obrigatória

```
base: 6 (formador de formadores - ensina criar infoprodutos)
+ recomenda ferramentas: +2 (indica Cademi para alunos)
+ volume 50+: +2 (turma de 80 alunos)
+ frustração ferramenta: +1 (bugs no Cademi)
= partner_score: 10 (cap)
multiplicador_estimado: 30-50 clientes/ano
```

---

## Red Flags — Desqualificação (mantido de v2.1)

### BLOQUEADORES (client_score automático = 0, excluir do pipeline de venda direta)

**NOTA:** Um bloqueador no client_score NÃO zera o partner_score. A pessoa pode não ser cliente mas ser excelente parceira.

| Red Flag | Sinal no Chat | Ação |
|----------|--------------|------|
| Produto físico (vende ele mesmo) | Fala sobre vender roupas, canecas, produtos tangíveis | client_score = 0 |
| Apenas ebook | Quer "vitrine" para PDF/ebook simples | client_score = 0 |
| Quer ser afiliado apenas | Quer revender, não criar conteúdo | client_score = 0 |
| "Gerenciem tudo pra mim" | Quer terceirização total | client_score = 0 |

**Exceção importante:** Se alguém ENSINA a vender produto físico (ex: mentoria sobre Amazon), o bloqueador NÃO se aplica — a pessoa precisa de LMS para a mentoria dela.

### ALERTAS (penalidade no client_score)

| Red Flag | Sinal no Chat | Penalidade |
|----------|--------------|-----------|
| Zero faturamento | Começando do zero absoluto | -2 |
| "Taxa zero" obsessivo | Insiste em custo zero | -2 |
| Checkout internacional | Precisa vender em USD/EUR | -1 |
| Podcast/evento ao vivo | Precisa de feature inexistente | -1 |

---

## Matriz de Classificação

Cruza os dois eixos para gerar a classificação final:

```
                    PARTNER SCORE
                    Baixo (0-3)    Médio (4-6)    Alto (7-10)
                  +==============+==============+==============+
   Alto (7-10)    | CLIENTE      | CLIENTE +    | CLIENTE +    |
                  | PURO         | INDICADOR    | EMBAIXADOR   |
 C                +==============+==============+==============+
 L  Médio (4-6)   | NURTURE      | PARCEIRO     | PARCEIRO     |
 I                |              | TÁTICO       | ESTRATÉGICO  |
 E                +==============+==============+==============+
 N  Baixo (0-3)   |              | AFILIADO     | CANAL        |
 T                | DESCARTE     | PURO         | PREMIUM      |
   SCORE          +==============+==============+==============+
```

### As 7 classificações

| Classificação | Client | Partner | Abordagem | Proposta comercial |
|--------------|:------:|:-------:|-----------|-------------------|
| **CLIENTE_PURO** | 7-10 | 0-3 | Venda direta | Plano Professional/Business |
| **CLIENTE_INDICADOR** | 7-10 | 4-6 | Venda + afiliados | Plano normal + comissão por indicação |
| **CLIENTE_EMBAIXADOR** | 7-10 | 7-10 | Venda direta (primário) + menção de parceria (secundário) | Plano normal como cliente, depois programa de parceiros |
| **PARCEIRO_TATICO** | 4-6 | 4-6 | Afiliação + trial | Trial gratuito + comissão |
| **PARCEIRO_ESTRATEGICO** | 4-6 | 7-10 | Permuta + co-marketing | Plano grátis/reduzido se trouxer X clientes |
| **AFILIADO_PURO** | 0-3 | 4-6 | Programa de afiliados | Comissão por indicação (sem uso próprio) |
| **CANAL_PREMIUM** | 0-3 | 7-10 | Parceria formal | Permuta total: plataforma grátis = canal exclusivo |
| **NURTURE** | 4-6 | 0-3 | Educacional | Conteúdo + warming para futuro |
| **DESCARTE** | 0-3 | 0-3 | Não abordar | — |

---

## Modelo de Permuta

Para classificações que envolvem parceria (EMBAIXADOR, ESTRATÉGICO, CANAL_PREMIUM):

| Nível | Condição | Benefício Ensinio | Entrega do Parceiro |
|-------|----------|-------------------|---------------------|
| **Bronze** | Traz 3-5 clientes/ano | 30% desconto no plano | Indicação informal |
| **Prata** | Traz 6-15 clientes/ano | 50% desconto no plano | Recomendação ativa + case |
| **Ouro** | Traz 16-30 clientes/ano | Plano gratuito | Canal exclusivo + co-marketing |
| **Diamante** | Traz 30+ clientes/ano | Plano gratuito + revenue share | Parceria formal + embaixador oficial |

### Estimativa de multiplicador

O `multiplicador_estimado` deve ser calculado com base em:
- Volume de alunos/clientes ativos
- Frequência de novas turmas/lotes
- Taxa de conversão estimada (10-30% dos alunos precisam de plataforma)
- Sazonalidade (lançamentos, eventos)

---

## Argumentos por Classificação

| Classificação | Argumento Primário | Fonte |
|--------------|-------------------|-------|
| CLIENTE_PURO (7-10) | All-in-One ou Premium Experience | ensinio-arguments.md |
| CLIENTE_INDICADOR | All-in-One + "programa de indicação" | ensinio-arguments.md |
| CLIENTE_EMBAIXADOR | **Venda direta** (All-in-One ou Premium) + menção leve de parceria | Fechar como cliente primeiro, parceria depois |
| PARCEIRO_TÁTICO | "Conhecer a Ensinio + oportunidade de afiliação" | Soft approach |
| PARCEIRO_ESTRATÉGICO | **"Ensinio como plataforma oficial do seu método"** | Proposta de permuta |
| AFILIADO_PURO | "Programa de afiliados com comissão" | Afiliação simples |
| CANAL_PREMIUM | **"Parceria formal: plataforma grátis = canal exclusivo"** | Proposta de permuta |
| NURTURE | Educacional — conteúdo da Ensinio | Minimal outreach |

---

## Prioridade de Abordagem

Os dois eixos são **independentes**. Um cliente puro nota 10 é tão valioso quanto um canal premium nota 10 — são coisas diferentes, não competem entre si.

Ordenar por **score dominante** (o maior entre client_score e partner_score), descendente. Em caso de empate, o score secundário desempata.

### Regra de ordenação

```
1. Calcular score_dominante = max(client_score, partner_score)
2. Ordenar por score_dominante DESC
3. Desempate: score_secundario = min(client_score, partner_score) DESC
4. Desempate final: CLIENTE_EMBAIXADOR > demais (coincidência de scores altos nos dois)
```

### Exemplo prático de ordenação

| Prospect | Client | Partner | Dominante | Classificação | Posição |
|----------|:------:|:-------:|:---------:|---------------|:-------:|
| Ana | 10 | 2 | 10 | CLIENTE_PURO | 1 |
| Bruno | 3 | 10 | 10 | CANAL_PREMIUM | 2 (empate, sec=3>2) |
| Carla | 9 | 9 | 9 | CLIENTE_EMBAIXADOR | 3 |
| Diego | 2 | 9 | 9 | CANAL_PREMIUM | 4 (empate, sec=2<9) |
| Eva | 8 | 1 | 8 | CLIENTE_PURO | 5 |
| Felipe | 5 | 8 | 8 | PARCEIRO_ESTRATÉGICO | 6 |

### Abordagem por classificação (independente da posição)

Cada classificação tem sua própria lógica de abordagem — nenhuma é "melhor" que outra:

- **CLIENTE_PURO/INDICADOR:** Abordar como venda direta. Valor = 1 cliente.
- **CANAL_PREMIUM/AFILIADO:** Abordar como parceria. Valor = multiplicador de leads.
- **PARCEIRO_ESTRATÉGICO:** Abordar como parceria com potencial de uso próprio.
- **CLIENTE_EMBAIXADOR:** Abordar como **venda direta** (objetivo = fechar como cliente e gerar receita). Mencionar parceria como bônus no final: "e temos um programa de parceiros que pode ser interessante também". A pessoa precisa usar o produto primeiro para recomendar com propriedade.
- **NURTURE:** Warming para futuro, sem pressão.
- **DESCARTE:** Não abordar.

---

## Output Schema (v3.0)

```json
{
  "name": "string",
  "phone": "string",
  "group_origin": "string",
  "project_name": "string",
  "project_description": "string (2-3 frases)",
  "client_score": "number (0-10)",
  "client_score_breakdown": "string (cálculo detalhado)",
  "partner_score": "number (0-10)",
  "partner_score_breakdown": "string (cálculo detalhado)",
  "classification": "CLIENTE_PURO | CLIENTE_INDICADOR | CLIENTE_EMBAIXADOR | PARCEIRO_TATICO | PARCEIRO_ESTRATEGICO | AFILIADO_PURO | CANAL_PREMIUM | NURTURE | DESCARTE",
  "prospect_type": "direct_client | channel_multiplier | tech_integrator | audience_amplifier | community_leader",
  "primary_pillar": "string",
  "matching_pillars": ["string"],
  "matching_solutions": ["string"],
  "pain_points": ["string"],
  "temporal_context": "string",
  "icp_match": {
    "demographic_match": "boolean",
    "behavioral_match": ["string"],
    "niche_match": "string",
    "situation_match": "string"
  },
  "red_flags": ["string"],
  "multiplicador_estimado": "string (ex: '20-50 clientes/ano')",
  "recommended_argument": "string",
  "permuta_level": "null | bronze | prata | ouro | diamante",
  "unique_quote": "string",
  "analysis_notes": "string"
}
```
