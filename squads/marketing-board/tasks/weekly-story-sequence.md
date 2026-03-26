# Task: Weekly Story Sequence — OPES Marketing Arm

**Task ID**: weekly-story-sequence
**Agent**: @marketing-ideation-ig (lead) + @marketing-cmo + @marketing-production + @marketing-designer
**Version**: 1.0.0
**Methodology**: Holistic Story Sequence Strategy (Nicolas Clay)
**Reference**: `outputs/research/biblioteca-maas/holistic-story-sequence-nicolas-clay.md`
**Workflow**: `workflows/story-sequence-pipeline.md`

---

## Purpose

Gerar 7 sequências completas de Instagram Stories para a semana inteira, cada dia com framework psicológico diferente, seguindo a Holistic Story Sequence Strategy. Output: scripts de copy + composição de camadas + preview para aprovação.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `semana` | date | No | Data da segunda-feira (default: próxima segunda) |
| `foco` | string | No | Foco da semana: "perpetuo", "lancamento", "aquecimento" |
| `dia` | string | No | Se informado, regera apenas 1 dia específico |

---

## Workflow

### Step 1: Contexto Estratégico (@marketing-cmo)

```
1. Ler data/story-sequence-bank.yaml
   - Verificar objeções já abordadas (objection_tracker)
   - Identificar provas disponíveis (proof_bank)
   - Listar histórias não usadas recentemente (story_bank)

2. Definir foco da semana:
   - Lançamento? → Stories mais agressivos, CTAs diretos
   - Perpétuo? → Balanço padrão Heavy/Light
   - Aquecimento? → Foco em educação + conexão

3. Selecionar 2-3 objeções prioritárias para quinta-feira
4. Definir qual oferta/CTA será usada no ciclo

OUTPUT: Brief estrategico semanal
```

### Step 2: Ideação das 7 Sequências (@marketing-ideation-ig)

```
Para CADA dia da semana, aplicar o framework correspondente:

SEGUNDA — PAIN SEQUENCE (Light)
├── Bloco 1: Pain Hook — gancho na dor principal do avatar OPES
├── Bloco 2: Agitate — consequencias de nao resolver
├── Bloco 3: Proof — screenshot/dado que comprova o problema
├── Bloco 4: Desire — visao do estado desejado
└── Bloco 5: Break Objection — quebra barreira de entrada

TERCA — YOUR PROOF SEQUENCE (Heavy)
├── Bloco 1: Personal Win Hook — vitoria pessoal de Jose
├── Bloco 2: Pain — dificuldade que Jose enfrentou
├── Bloco 3: Agitate — profundar a dificuldade
├── Bloco 4: Proof — resultado inegavel de Jose
└── Bloco 5: Relatability Hook — "você também pode"

QUARTA — CLIENT PROOF SEQUENCE (Heavy)
├── Bloco 1: Client Win Hook — resultado expressivo de cliente
├── Bloco 2: Relatability — quem e o cliente (identificacao)
├── Bloco 3: Pain — situacao antes do OPES
├── Bloco 4: Agitate — sofrimento que causava
└── Bloco 5: Proof — resultado final apos OPES

QUINTA — BREAK OBJECTION SEQUENCE (Heavy)
├── Bloco 1: Curiosity Hook — mito/duvida comum
├── Bloco 2: Break Obj — quebra direta da objecao
├── Bloco 3: Storytelling — historia de alguem que superou
├── Bloco 4: Shift Mind — nova verdade / mudanca de paradigma
└── Bloco 5: Action CTA — proximo passo concreto

SEXTA — EDUCATION SEQUENCE (Light)
├── Bloco 1: Pain Hook — problema que sera resolvido
├── Bloco 2: Educate — micro-ensinamento de alto valor
├── Bloco 3: Proof — prova que funciona
├── Bloco 4: Desire — desejo de ter a solucao completa
└── Bloco 5: Desire CTA — CTA baseado no desejo

SABADO — DIFFERENTIATION SEQUENCE (Light)
├── Bloco 1: Storytelling Hook — narrativa envolvente
├── Bloco 2: Different — Unique Mechanism do OPES
├── Bloco 3: Proof — resultado superior vs alternativas
├── Bloco 4: Desire — desejo pelo método exclusivo
└── Bloco 5: Break Objection — "será que é para mim?"

DOMINGO — CONNECTION SEQUENCE (Light)
├── Bloco 1: Authentic Hook — pessoal, vulneravel, bastidores
├── Bloco 2: Storytelling — desenvolvimento da historia
├── Bloco 3: Storytelling — climax
├── Bloco 4: Proof — congruencia (vive o que fala)
└── Bloco 5: CTA — convite suave para semana juntos

Para cada sequência:
- Definir conceito do hook (1 frase)
- Selecionar prova do proof_bank
- Selecionar história do story_bank (se aplicável)
- Marcar objeção do tracker (se quinta)
- Definir tom (Heavy ou Light)

OUTPUT: 7 conceitos de sequencia
```

### Step 3: Gate 1 — Validação CMO (@marketing-cmo)

```
elicit: false (automatico)

Para CADA dia, verificar:
☐ Framework correto aplicado? (5 blocos na ordem certa)
☐ SVA premium servida? (fala com quem fatura R$30-200k)
☐ Ritmo Heavy/Light respeitado?
☐ Proof existe no banco? (não é inventada)
☐ História é real? (não é fabricada)
☐ Objeção de quinta não foi abordada recentemente?

Score: ___/5 por dia
Se algum dia < 4/5 → devolver para @ideation-ig (max 2 loops)
Se todos ≥ 4/5 → APROVADO

OUTPUT: 7 sequências aprovadas
```

### Step 4: Produção de Scripts (@marketing-production)

```
Para CADA dia, escrever 5 blocos de copy:

REGRAS GERAIS:
- Voz do José Carlos Amorim (casual, direto, real)
- Cada bloco = 1 story = 2-4 frases curtas MAX
- Hook (bloco 1) = frase única, forte, visual
- Transição natural entre blocos (leitor quer ver o próximo)
- CTA nunca parece propaganda — é convite natural
- Zero palavras da LLM blacklist

REGRAS POR TOM:
- Heavy (ter, qua, qui): Copy afiada, números, resultados, confronto
- Light (seg, sex, sab, dom): Casual, pessoal, como conversa com amigo

FORMATO POR BLOCO:
---
[DIA] — [NOME DA SEQUENCIA] ([TOM])

Story 1/5 — [Nome do Bloco]
Camada L1 (Texto): "[copy aqui]"
Camada L2 (Imagem): [sugestão de background]
Camada L3 (Prova): [screenshot específico se aplicável]
Camada L4 (Visual): [elemento gráfico se aplicável]

Story 2/5 — [Nome do Bloco]
...
---

OUTPUT: 35 blocos de copy (7 dias × 5 stories)
```

### Step 5: Composição Visual (@marketing-designer)

```
Para CADA story (35 total), definir:

1. Background (L2):
   - Selecionar do album "Story Sequences"
   - Regra: NUNCA fundo vazio
   - Heavy days: fotos de resultados, setup, trabalho
   - Light days: fotos de lifestyle, viagem, dia-a-dia

2. Screenshot Overlay (L3):
   - Selecionar do proof_bank em story-sequence-bank.yaml
   - Posição: canto inferior ou lateral
   - Opacidade: 85-95%

3. Elementos Visuais (L4):
   - Setas apontando para números
   - Círculos destacando resultados
   - Gráficos simplificados (se educação)
   - Estilo: Miro-like (rabisco + funcional)

4. Tipografia:
   - Usar brand-guide.yaml
   - Tamanho: legível em mobile sem zoom
   - Destaque: bold nas palavras-chave

OUTPUT: 35 briefs visuais
```

### Step 6: Compilação do Output

```
1. Salvar em: outputs/hubs/marketing/YYYY-WNN-story-sequence/
   ├── plano.md          (resumo da semana)
   ├── segunda.md        (PAIN — 5 stories)
   ├── terca.md          (YOUR PROOF — 5 stories)
   ├── quarta.md         (CLIENT PROOF — 5 stories)
   ├── quinta.md         (BREAK OBJECTION — 5 stories)
   ├── sexta.md          (EDUCATION — 5 stories)
   ├── sabado.md         (DIFFERENTIATION — 5 stories)
   └── domingo.md        (CONNECTION — 5 stories)

2. Usar template: templates/story-sequence-output.md
```

### Step 7: Gate 2 — Preview WhatsApp

```
elicit: true

Enviar para José via WhatsApp (UazAPI):

📱 STORY SEQUENCE — Semana WNN

SEG (Light) — PAIN
Hook: "[hook da segunda]"

TER (Heavy) — YOUR PROOF
Hook: "[hook da terca]"

QUA (Heavy) — CLIENT PROOF
Hook: "[hook da quarta]"

QUI (Heavy) — BREAK OBJECTION
Hook: "[hook da quinta]"
Objecao: "[objecao escolhida]"

SEX (Light) — EDUCATION
Hook: "[hook da sexta]"

SAB (Light) — DIFFERENTIATION
Hook: "[hook do sabado]"

DOM (Light) — CONNECTION
Hook: "[hook do domingo]"

Ritmo: 3H / 4L ✓
Provas: [N] screenshots selecionados
Historias: [N] usadas

✅ GO | ✏️ AJUSTAR | ❌ SKIP

José responde:
- GO → marcar como aprovado, salvar
- AJUSTAR → receber nota, reprocessar Step 4-6
- SKIP → cancelar semana
```

### Step 8: Atualizar Tracker

```
Se aprovado:
1. Atualizar objection_tracker em story-sequence-bank.yaml
   - Marcar objeção de quinta como "abordada" + data
2. Atualizar story_bank
   - Marcar histórias usadas + data
3. Atualizar proof_bank
   - Registrar quais provas foram usadas
```

---

## Output

| Output | Path | Description |
|--------|------|-------------|
| Plano semanal | `outputs/hubs/marketing/YYYY-WNN-story-sequence/plano.md` | Overview 7 dias |
| Scripts (7 files) | `outputs/hubs/marketing/YYYY-WNN-story-sequence/{dia}.md` | Copy + camadas por dia |
| Tracker update | `data/story-sequence-bank.yaml` | Objeções, histórias, provas usadas |

---

## Success Criteria

- [ ] 7 sequencias geradas (seg-dom)
- [ ] Cada sequencia tem 5 blocos na ordem correta do framework
- [ ] Ritmo Heavy/Light respeitado (3H / 4L)
- [ ] Cada story tem 4 camadas definidas (L1-L4)
- [ ] Todas as provas existem no banco (não inventadas)
- [ ] Todas as histórias são reais (não fabricadas)
- [ ] Objeção de quinta não repetida nas últimas 4 semanas
- [ ] CMO aprovou com score ≥ 4/5 por dia
- [ ] José aprovou via WhatsApp
- [ ] Tracker atualizado

---

*Task v1.0.0 — Weekly Story Sequence for OPES Marketing (Nicolas Clay Method)*
