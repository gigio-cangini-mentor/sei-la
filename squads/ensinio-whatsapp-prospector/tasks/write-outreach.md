# Task: Write Outreach Messages

## Task Anatomy
- **task_name:** write-outreach
- **status:** active
- **responsible_executor:** outreach-writer (Velvet)
- **execution_type:** Agent
- **input:**
  - Analyzed prospect data from prospect-analyst (v3.0 — dual scoring + classification)
  - Message rules from data/message-rules.md
  - Sales arguments from ensinio-mind/data/ensinio-arguments.md
- **output:**
  - Personalized messages with WhatsApp links (JSON)
  - URL-encoded message text
  - Valid WhatsApp links
  - approach_type based on 7 classifications (not binary client/partner)

## Action Items

### Step 1: Load Rules
Load message rules from `data/message-rules.md`:
- Sender is always Antonio
- Sent on behalf of Fosc (socio fundador da Ensinio)
- Must feel 100% human-written
- Must be personalized per prospect

### Step 2: Route by Classification
For EACH qualified prospect, determine message structure based on classification:

#### CLIENTE_PURO (client 7-10, partner 0-3)
**Estrutura:** Venda direta clássica
1. Greeting casual (primeiro nome)
2. Introdução Antonio
3. Fosc viu mensagem/projeto no grupo
4. Descrever projeto DELES especificamente
5. Conectar dor à solução Ensinio
6. Contextualizar temporalmente se necessário
7. CTA: demo/papo rápido
8. Fechamento quente

#### CLIENTE_INDICADOR (client 7-10, partner 4-6)
**Estrutura:** Venda direta + menção de indicação
1-7: Igual CLIENTE_PURO
8. Adicionar: "A gente também tem um programa de indicação pra quem conhece outras pessoas do nicho"
9. Fechamento quente

#### CLIENTE_EMBAIXADOR (client 7-10, partner 7-10)
**Estrutura:** Venda direta (como CLIENTE_PURO) + menção leve de parceria no final
**Objetivo:** Fechar como cliente primeiro — gerar receita. A parceria é bônus.
1. Greeting casual (primeiro nome)
2. Introdução Antonio
3. Fosc viu mensagem/projeto no grupo
4. Descrever projeto DELES especificamente (igual CLIENTE_PURO)
5. Conectar dor à solução Ensinio (foco em resolver o problema DELE)
6. Contextualizar temporalmente se necessário
7. CTA: demo/papo rápido (venda direta)
8. Menção leve: "Ah, e a gente também tem um programa de parceiros que pode ser interessante pra quem trabalha com [formação/consultoria]"
9. Fechamento quente

#### PARCEIRO_TÁTICO (client 4-6, partner 4-6)
**Estrutura:** Soft approach duplo
1. Greeting casual
2. Introdução Antonio
3. Referência ao trabalho/projeto deles
4. Menção leve da Ensinio como possível ferramenta
5. CTA suave: "Se fizer sentido, posso te mostrar rapidinho"
6. Fechamento

#### PARCEIRO_ESTRATÉGICO (client 4-6, partner 7-10) — ALTA PRIORIDADE
**Estrutura:** Proposta de parceria estratégica
1. Greeting casual
2. Introdução Antonio
3. Reconhecer posição de influência/formação
4. Proposta: "A Ensinio pode ser a plataforma oficial do seu [método/grupo/programa]"
5. Benefício multiplicador: "Seus [alunos/clientes] ganham acesso com condições especiais"
6. CTA: "Queria te apresentar o programa de parceiros premium"
7. Fechamento quente

#### AFILIADO_PURO (client 0-3, partner 4-6)
**Estrutura:** Programa de afiliados simples
1. Greeting casual
2. Introdução Antonio
3. Referência ao trabalho/audiência deles
4. Programa de afiliados: "comissão por cada indicação"
5. CTA: "Posso te explicar como funciona?"
6. Fechamento

#### CANAL_PREMIUM (client 0-3, partner 7-10) — ALTA PRIORIDADE
**Estrutura:** Parceria formal
1. Greeting casual
2. Introdução Antonio
3. Reconhecer influência/comunidade
4. Proposta formal: "Parceria onde você ganha acesso gratuito à plataforma em troca de [recomendação/review/canal]"
5. Prova social: mencionar outros parceiros se relevante
6. CTA: "Queria te mostrar a proposta"
7. Fechamento quente

### Step 3: Quality Check per Message
Apply message-quality-checklist:
- [ ] Feels human-written (not AI)
- [ ] No "nome + sobrenome" pattern
- [ ] No corporate language
- [ ] Personalized with prospect's actual project
- [ ] Temporal context included (if message is old)
- [ ] Correct approach for classification (7 types, not 2)
- [ ] Max 5-6 short paragraphs
- [ ] Max 1-2 emojis
- [ ] Natural CTA (not pushy)
- [ ] EMBAIXADOR: mensagem foca em venda direta, parceria é menção leve no final
- [ ] ESTRATÉGICO/CANAL: mensagem foca em parceria como proposta principal

### Step 4: Generate WhatsApp Links
For each message:
1. URL-encode the message text
2. Handle special characters (newlines, accents, emojis)
3. Build link: `https://api.whatsapp.com/send?phone={phone}&text={encoded_message}`
4. Validate the link format

### Step 5: Output
Generate JSON output for each prospect with raw message, WhatsApp link, and classification.

## Acceptance Criteria
- Each message sounds 100% human-written
- No anti-pattern violations
- WhatsApp links correctly URL-encoded
- Classification-based approach correctly applied (7 types)
- EMBAIXADOR/ESTRATÉGICO/CANAL messages mention partnership/permuta
- Each message unique (no copy-paste between prospects)

## Veto Conditions
- **BLOCKING:** Prospect analysis data not available (must be v3.0 with dual scoring)
- **BLOCKING:** Message rules not loaded
- **BLOCKING:** Prospect has no name or phone
- **WARNING:** Prospect has low scores (client < 5 AND partner < 5) - use shorter, softer message
- **WARNING:** No temporal context but messages are > 6 months old

## Output Example

### CLIENTE_EMBAIXADOR
```json
{
  "name": "Katia",
  "phone": "+5521987654321",
  "classification": "CLIENTE_EMBAIXADOR",
  "raw_message": "Oi Katia! Tudo bem?\n\nMeu nome e Antonio, faco parte do time da Ensinio.\n\nO Fosc ta no grupo MENTORIA 50K e viu que voce ensina especialistas a criar infoprodutos. Muito bacana o seu trabalho!\n\nPelo que entendi, voce ta usando Cademi e Asaas e tem tido alguns problemas com bugs e integracao. A gente tem uma plataforma que ja vem com tudo integrado — area de membros, checkout, comunidade — sem precisar ficar juntando varias ferramentas.\n\nSeria bacana bater um papo rapido pra te mostrar como funciona?\n\nAh, e a gente tambem tem um programa de parceiros que pode ser interessante pra quem trabalha formando outros produtores de conteudo.\n\nAbraco!",
  "whatsapp_link": "https://api.whatsapp.com/send?phone=5521987654321&text=...",
  "approach_type": "CLIENTE_EMBAIXADOR"
}
```

### CANAL_PREMIUM
```json
{
  "name": "Diego",
  "phone": "+5531996543210",
  "classification": "CANAL_PREMIUM",
  "raw_message": "Oi Diego! Tudo bem?\n\nAqui e o Antonio, do time da Ensinio.\n\nO Fosc me falou sobre o seu canal de educacao no YouTube — muito bacana o conteudo que voce produz pra essa audiencia.\n\nA gente tem uma proposta de parceria que pode ser interessante: voce ganha acesso gratuito a plataforma e em troca indica pra sua audiencia quando fizer sentido. Varios criadores de conteudo ja estao nesse modelo com a gente.\n\nPosso te explicar melhor como funciona?\n\nAbraco!",
  "whatsapp_link": "https://api.whatsapp.com/send?phone=5531996543210&text=...",
  "approach_type": "CANAL_PREMIUM"
}
```

## Error Handling
- **No prospect data:** HALT and request analyze-prospects task completion
- **Message rules not found:** HALT and request rules file creation
- **URL encoding failure:** Log error, skip prospect, continue with batch
- **Missing phone number:** Skip prospect and flag in error report
- **Classification missing:** HALT — requires v3.0 scoring data

## Completion Criteria
All prospects have personalized messages per classification, quality check passed, WhatsApp links generated
