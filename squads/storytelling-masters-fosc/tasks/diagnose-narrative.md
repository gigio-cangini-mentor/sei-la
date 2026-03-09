---
task: Diagnose Narrative Need
responsavel: storytelling-masters-chief
model: sonnet
elicit: true
sla:
  target: 5-10 min
  max: 15 min
  description: "Quick diagnostic routing - should not require deep analysis"
Entrada: |
  - user_request: Descrição da necessidade narrativa do usuário
Saida: |
  - intent_type: STRUCTURE | PRESENTATION | PERSUASION | SPECIALIZED
  - primary_agent: Agent recomendado
  - secondary_agent: Agent complementar (opcional)
  - reasoning: Por que este roteamento
veto_conditions:
  input:
    - "No content or request provided by user → ASK for clarification"
    - "Objective/goal not stated → ASK what they want to achieve"
  process:
    - "Language not supported (non-pt-BR/en) → REDIRECT or request translation"
    - "Audience undefined and critical for routing → ASK for audience details"
  output:
    - "Topic too vague to route confidently → ASK for specifics"
  ethical:
    - "Request involves misleading/manipulative content → DECLINE with explanation"
  performance:
    - "Necessidade não envolve storytelling → REDIRECT to appropriate squad"
    - "Usuário pede expert de outro squad → REDIRECT para palestras-master"
---

# *diagnose

Diagnostica a necessidade narrativa do usuário e recomenda o(s) expert(s) adequado(s).

## Workflow

1. Ouvir o request do usuário
2. Classificar em: STRUCTURE, PRESENTATION, PERSUASION, SPECIALIZED
3. Consultar routing matrix do orchestrator
4. Recomendar primary agent + secondary (se aplicável)
5. Apresentar opções ao usuário

## Inline Checklist

Before presenting diagnosis, verify:
- [ ] **Core problem identified** — Understand what user is trying to achieve
- [ ] **Intent mapped to tier** — Classified as STRUCTURE, PRESENTATION, PERSUASION, or SPECIALIZED
- [ ] **Primary expert selected** — Chosen based on routing matrix
- [ ] **Routing rationale provided** — Clear explanation of why this expert fits
- [ ] **Next action clarified** — User knows what happens if they accept recommendation

## Error Handling

### Auto-Heal Conditions

| Condition | Recovery Strategy |
|-----------|------------------|
| Low-confidence routing | Present 2 options with trade-offs, let user choose |
| Multiple equally-valid experts | Explain differences, recommend primary with secondary as alternative |
| No matching tier | Escalate to storytelling-masters-chief for manual routing |
| Ambiguous request | Ask 2-3 clarifying questions before diagnosis |

### Escalation Rules

Escalate to `storytelling-masters-chief` (human review) when:
1. Request involves ethical concerns (manipulation, misleading content)
2. No expert in squad can address the need (redirect to another squad)
3. User explicitly requests a second opinion on routing
4. Confidence score < 6/10 after clarification attempts

## Output Example

```
Diagnóstico: Sua necessidade é de PRESENTATION (criar keynote para conferência)

Recomendação:
- Primary: Nancy Duarte (Sparkline, design de apresentação)
- Secondary: Carmine Gallo (delivery TED-style)

Quer que eu inicie a consulta com Duarte?
```
