# Task: Analyze Prospects

## Task Anatomy
- **task_name:** analyze-prospects
- **status:** active
- **responsible_executor:** prospect-analyst (Minerva)
- **execution_type:** Agent
- **input:**
  - Parsed contacts from chat-parser (with resolved phone numbers from resolve-phone-numbers)
  - Ensinio KB (pillars, solutions) from ensinio-mind
  - Scoring criteria from ensinio-mind/data/scoring-criteria.md (v3.0 — dual scoring)
  - ICP profiles from ensinio-mind/data/ensinio-icps.md
  - Red flags from ensinio-mind/data/ensinio-red-flags.md
  - Sales arguments from ensinio-mind/data/ensinio-arguments.md
- **output:**
  - Dual-scored and classified prospect list (JSON)
  - Filtered list (client_score >= 3 OR partner_score >= 4)
  - Sorted by classification priority (EMBAIXADOR > ESTRATÉGICO > CANAL > PURO > ...)
  - Red-flagged prospects listed separately with reason

## Action Items

### Step 1: Load Context
1. Load parsed contacts data (with resolved phone numbers)
2. Load Ensinio solutions KB from `ensinio-mind/data/ensinio-solutions-kb.md`
3. Load scoring criteria from `ensinio-mind/data/scoring-criteria.md` (v3.0)
4. Load ICP profiles from `ensinio-mind/data/ensinio-icps.md`
5. Load red flags from `ensinio-mind/data/ensinio-red-flags.md`
6. Load sales arguments from `ensinio-mind/data/ensinio-arguments.md`

### Step 2: Red Flag Pre-Screen
For EACH contact, FIRST check for BLOQUEADOR red flags (from ensinio-mind/data/ensinio-red-flags.md):
- Wants to sell physical products (ele mesmo, não ensinar) → client_score = 0
- Only wants to sell ebook/PDF → client_score = 0
- Wants to be affiliate/reseller only → client_score = 0
- "Manage everything for me" attitude → client_score = 0

**IMPORTANTE:** Bloqueadores zeram APENAS o client_score. O partner_score é avaliado independentemente. Alguém que ensina a vender produto físico (ex: mentoria sobre Amazon) NÃO é bloqueado — precisa de LMS para a mentoria.

Also check for ALERTA red flags (apply penalties to client_score):
- Zero revenue (starting from scratch) → -2
- Obsessed with "zero fees" → -2
- Needs international checkout (USD/EUR) → -1
- Needs podcast/live events (feature gap) → -1

### Step 3: Dual Scoring — EIXO 1 (Client Score)
For EACH non-blocked contact with meaningful messages:

1. **Read all messages** to understand:
   - What is their project/business?
   - What are their pain points?
   - What solutions are they looking for?

2. **Choose score base** (HOT=8, WARM=6, MODERATE=4, COOL=2, COLD=0)

3. **Apply bonuses** (ICP match, frustration, urgency, etc.)

4. **Apply penalties** (old messages, vague, red flags, nicho não identificado)

5. **Cap at 10, floor at 0**

6. **REGRA NICHO:** Se nicho = "não especificado", client_score max = 6

7. **Document score_breakdown** with full calculation

### Step 4: Dual Scoring — EIXO 2 (Partner Score)
For EACH contact (including those with client_score = 0):

1. **Assess multiplier potential:**
   - Does this person teach/train/consult others in the niche?
   - Does this person lead a community or group?
   - Does this person set up tech stacks for clients?
   - Does this person have audience in relevant niches?

2. **Choose partner base:**
   - Formador de formadores = 6
   - Líder de comunidade = 5
   - Integrador técnico = 4
   - Influenciador = 3
   - Sem potencial = 0

3. **Apply bonuses** (recommends tools, volume, frustration with current tools, events)

4. **Apply penalties** (no active clients, off-niche audience)

5. **Cap at 10, floor at 0**

6. **Estimate multiplier** (how many clients/year this person could bring)

7. **Document partner_score_breakdown** with full calculation

### Step 5: Classify Using Matrix
Cross client_score x partner_score to determine classification:

| Client \ Partner | 0-3 | 4-6 | 7-10 |
|------------------|-----|-----|------|
| **7-10** | CLIENTE_PURO | CLIENTE_INDICADOR | CLIENTE_EMBAIXADOR |
| **4-6** | NURTURE | PARCEIRO_TATICO | PARCEIRO_ESTRATEGICO |
| **0-3** | DESCARTE | AFILIADO_PURO | CANAL_PREMIUM |

### Step 6: Determine Prospect Type
Based on evidence in messages, assign one of:
- `direct_client` — Has business that uses Ensinio directly
- `channel_multiplier` — Teaches/serves people who need platforms
- `tech_integrator` — Sets up tech stacks for clients
- `audience_amplifier` — Has relevant audience for promotion
- `community_leader` — Leads group/community with prospects

### Step 7: Assign Permuta Level
For classifications that involve partnership (EMBAIXADOR, ESTRATÉGICO, CANAL_PREMIUM):
- Estimate `multiplicador_estimado` (clients/year)
- Assign `permuta_level`:
  - 3-5 clients/year → bronze (30% desconto)
  - 6-15 clients/year → prata (50% desconto)
  - 16-30 clients/year → ouro (plano grátis)
  - 30+ clients/year → diamante (plano grátis + revenue share)
- For other classifications: `permuta_level = null`

### Step 8: Generate Project Description & Unique Quote
For each qualified prospect:
1. Write a concise name for their project/niche
2. Write a detailed description of what they do (2-3 sentences)
3. Note the temporal context (when they posted, how recent)
4. **Select a unique_quote fingerprint** — a distinctive phrase this person said that can be searched in WhatsApp. Criteria:
   - Must be unique within the group
   - Prefer phrases with proper nouns, specific numbers, or niche terms
   - Avoid generic phrases
   - Prefer 8+ words for search accuracy

### Step 9: Select Recommended Argument
Based on classification (not just client_score):

| Classification | Argument |
|---------------|----------|
| CLIENTE_PURO | All-in-One or Premium Experience |
| CLIENTE_INDICADOR | All-in-One + "programa de indicação" |
| CLIENTE_EMBAIXADOR | Venda direta (All-in-One ou Premium) + menção leve: "temos programa de parceiros também" |
| PARCEIRO_TATICO | "Conhecer Ensinio + oportunidade de afiliação" |
| PARCEIRO_ESTRATEGICO | "Ensinio como plataforma oficial do seu método" |
| AFILIADO_PURO | "Programa de afiliados com comissão" |
| CANAL_PREMIUM | "Parceria formal: plataforma grátis = canal exclusivo" |
| NURTURE | Educacional — conteúdo da Ensinio |

### Step 10: Filter and Sort
1. Include contacts with client_score >= 3 OR partner_score >= 4
2. Sort by **score dominante** (o maior entre client_score e partner_score), descendente
3. Desempate: score secundário (o menor dos dois) descendente
4. Os dois eixos são independentes — um CLIENTE_PURO nota 10 é tão prioritário quanto um CANAL_PREMIUM nota 10

### Step 11: Output
Generate prospect analysis for each qualified contact in JSON format per scoring-criteria.md v3.0 schema.

## Acceptance Criteria
- All contacts with meaningful messages analyzed on BOTH axes
- Each prospect has client_score AND partner_score with breakdown
- Each prospect has classification from the 7x matrix
- Each prospect has prospect_type assigned
- EMBAIXADOR/ESTRATÉGICO/CANAL prospects have permuta_level
- Results sorted by classification priority
- score_breakdown documented for both axes

## Veto Conditions
- **BLOCKING:** Parsed contacts data not available
- **BLOCKING:** Ensinio KB not loaded
- **BLOCKING:** Scoring criteria not loaded (must be v3.0)
- **WARNING:** Contact has < 3 messages (insufficient data for accurate scoring)
- **WARNING:** > 50% of contacts have no phone number

## Output Example

### CLIENTE_EMBAIXADOR (client 9 + partner 10)
```json
{
  "name": "Katia",
  "phone": "+5521987654321",
  "group_origin": "MENTORIA 50K",
  "project_name": "Criação de Infoprodutos",
  "project_description": "Katia ensina especialistas e professores a criar infoprodutos e mentorias. Já está vendendo ativamente. Usa Cademi + Asaas e teve problemas com bugs e integrações.",
  "client_score": 9,
  "client_score_breakdown": "base: 8 (HOT - vende mentoria, precisa LMS+checkout)\n+ frustração: +1 (bugs Cademi)\n+ concorrente: +1 (usa Cademi+Asaas)\n- cap: 10 → 9 (ajuste conservador)\n= 9",
  "partner_score": 10,
  "partner_score_breakdown": "base: 6 (formador de formadores)\n+ recomenda ferramentas: +2 (indica Cademi)\n+ volume 50+: +2 (turma grande)\n+ frustração ferramenta: +1 (bugs)\n= 11 → cap 10",
  "classification": "CLIENTE_EMBAIXADOR",
  "prospect_type": "channel_multiplier",
  "primary_pillar": "LMS / Area de Membros",
  "matching_pillars": ["LMS", "Pagamentos", "CRM"],
  "matching_solutions": ["Módulos e aulas", "Checkout integrado", "Certificados"],
  "pain_points": ["Bugs na Cademi", "Integração Typebot+Kommo quebrou", "Suporte lento"],
  "temporal_context": "Ativa nov/2025 - mar/2026",
  "icp_match": {
    "demographic_match": true,
    "behavioral_match": ["uses_2_plus_platforms"],
    "niche_match": "Educação",
    "situation_match": "wants_to_monetize_content"
  },
  "red_flags": [],
  "multiplicador_estimado": "20-50 clientes/ano",
  "recommended_argument": "All-in-One (venda direta) + menção de programa de parceiros",
  "permuta_level": "ouro",
  "unique_quote": "Registrei 2 vendas no primeiro sábado depois que entrei na mentoria",
  "analysis_notes": "Valor duplo. Como CLIENTE: precisa de LMS+checkout, frustrada com Cademi — abordar como venda direta. Como PARCEIRA: cada aluno cria infoproduto e precisa de plataforma. Estratégia: fechar como cliente primeiro (receita), depois propor programa de parceiros quando ela já estiver usando o produto."
}
```

### CANAL_PREMIUM (client 0 + partner 9)
```json
{
  "name": "Diego",
  "phone": "+5531996543210",
  "group_origin": "Influencers Educação",
  "project_name": "Canal YouTube Educação",
  "project_description": "Diego tem canal de YouTube com 50k inscritos sobre educação. Promove ferramentas educacionais para sua audiência.",
  "client_score": 2,
  "client_score_breakdown": "base: 0 (COLD - não tem curso/produto digital)\n+ audiência relevante: +1\n+ nicho top 5: +0.5\n= 2 (arredondado)",
  "partner_score": 9,
  "partner_score_breakdown": "base: 3 (influenciador)\n+ audiência 50k+: +2\n+ já promove ferramentas: +1\n+ audiência no nicho: +1\n+ engajamento: +1\n+ recomenda tools: +1\n= 9",
  "classification": "CANAL_PREMIUM",
  "prospect_type": "audience_amplifier",
  "primary_pillar": null,
  "matching_pillars": [],
  "matching_solutions": [],
  "pain_points": [],
  "temporal_context": "Mensagens de jan/2026",
  "icp_match": {
    "demographic_match": false,
    "behavioral_match": [],
    "niche_match": "Educação",
    "situation_match": null
  },
  "red_flags": [],
  "multiplicador_estimado": "10-30 leads/ano via audiência",
  "recommended_argument": "Parceria formal: plataforma grátis = canal exclusivo",
  "permuta_level": "prata",
  "unique_quote": "Testei 5 plataformas de curso e nenhuma me convenceu para recomendar",
  "analysis_notes": "Não é cliente direto (não tem curso próprio), mas canal de alto valor. Audiência de 50k no nicho certo. Proposta: plano gratuito em troca de review/recomendação para audiência."
}
```

## Error Handling
- **No contacts with meaningful messages:** Report summary and exit gracefully
- **KB not found:** HALT and request KB loading via load-ensinio-kb task
- **Scoring criteria version mismatch:** HALT if not v3.0 (dual scoring required)
- **Invalid phone numbers:** Flag in output but continue analysis

## Completion Criteria
All contacts analyzed on both axes, classified via matrix, sorted by priority, ready for outreach
