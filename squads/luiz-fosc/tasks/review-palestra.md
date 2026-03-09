---
type: task
elicit: true
agent: luiz-fosc
squad: luiz-fosc
description: "Revisar e diagnosticar uma palestra existente"
---

# review-palestra

Revisar e diagnosticar uma palestra existente.

## Instructions

### Input necessário

Peça ao usuário:
1. Roteiro/transcrição da palestra (ou descrição detalhada)
2. Público-alvo
3. Objetivo (vender? inspirar? educar? posicionar?)
4. Duração desejada

### Checklist de revisão (Cinema-Mágica Framework)

Avalie cada elemento de 1-10:

1. **Premissa** — A palestra tem UMA ideia central clara?
2. **Universo/Diegese** — O contexto está bem delimitado?
3. **Protagonista** — Quem é o herói? (o palestrante? o público?)
4. **Conflitos** — Tem complicações progressivas? Ou é linear/monótona?
5. **Final Memorável** — O encerramento é inesquecível ou só "obrigado"?

### Ferramentas de diagnóstico

- **Verossimilhança**: A história é crível? Tem provas?
- **Suspensão da descrença**: O público aceita o universo proposto?
- **Pista/Recompensa**: Plantou sementes que pagam depois?
- **Surpresa vs Suspense**: Está usando Hitchcock ou M. Night?

### Entregáveis

- Score de cada elemento (1-10) com justificativa
- Top 3 pontos fortes
- Top 3 melhorias urgentes
- Roteiro revisado com sugestões em comentários
- "Momentos mágicos" marcados (onde inserir impacto)

### Tom

Use tom de `mentoria_1_1`. Seja honesto mas construtivo.
"Sinceramente... eu compraria essa palestra? Deixa eu te falar o porquê."

## Veto Conditions

```yaml
veto_conditions:
  - trigger: "Avaliou sem ler/ouvir a palestra completa"
    severity: BLOCKING
    action: "Solicitar material completo antes de continuar"
  - trigger: "Deu só elogios sem apontar melhorias reais"
    severity: HIGH
    action: "Recalibrar — 'Sinceramente... eu compraria essa palestra?'"
  - trigger: "Sugeriu mudanças que destroem a autenticidade do palestrante"
    severity: HIGH
    action: "A palestra precisa ser DELE, não minha. Ajustar sugestões."
  - trigger: "Ignorou análise de pontos de impacto"
    severity: HIGH
    action: "Marcar onde o público vai RIR, CHORAR ou se ARREPIAR"
```

## Completion Criteria

1. ✅ Score de cada elemento (5 dimensões, 1-10) com justificativa
2. ✅ Top 3 pontos fortes identificados
3. ✅ Top 3 melhorias urgentes com ação concreta
4. ✅ Pelo menos 1 trecho reescrito como "antes e depois"
5. ✅ "Momentos mágicos" marcados no roteiro

## Output Example

```markdown
# Review de Palestra — "{Título}"
> Palestrante: {Nome} | Revisor: Luiz Fosc | Data: {data}

## Score Cinema-Mágica Framework

| Dimensão | Score | Justificativa |
|----------|-------|---------------|
| Premissa | 7/10 | Ideia central clara, mas compete com 2 sub-temas |
| Universo/Diegese | 5/10 | Contexto vago — público não sabe "onde está" |
| Protagonista | 8/10 | Herói claro, mas falta vulnerabilidade |
| Conflitos | 4/10 | Linear — sem complicações progressivas |
| Final Memorável | 3/10 | Termina com "obrigado" — desperdiça o clímax |

**Score geral: 5.4/10**

## Top 3 Pontos Fortes
1. {Ponto forte 1}
2. {Ponto forte 2}
3. {Ponto forte 3}

## Top 3 Melhorias Urgentes
1. **{Melhoria 1}** — {O que mudar e por quê}
2. **{Melhoria 2}** — {O que mudar e por quê}
3. **{Melhoria 3}** — {O que mudar e por quê}

## Antes e Depois

**ANTES:** "{trecho original}"
**DEPOIS:** "{trecho reescrito com a correção aplicada}"
**Por quê:** {explicação da melhoria}

## Momentos Mágicos Sugeridos
- Min 3: 🎯 {Inserir humor aqui}
- Min 12: 🎯 {Inserir vulnerabilidade aqui}
- Min 22: 🎯 {Inserir plot twist aqui}
```
