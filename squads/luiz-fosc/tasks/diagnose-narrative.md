---
type: task
elicit: true
agent: luiz-fosc
squad: luiz-fosc
description: "Diagnosticar por que uma narrativa, apresentação ou história não funciona"
---

# diagnose-narrative

Diagnosticar por que uma narrativa, apresentação ou história não funciona.

## Instructions

### Input necessário

Peça:
1. A narrativa/apresentação (texto, roteiro, pitch — qualquer formato)
2. O que não está funcionando? (público desengaja, não converte, etc.)
3. Contexto: onde é apresentado, para quem, com que objetivo

### Framework de diagnóstico

Aplique H005: "IF storytelling fraco → THEN é a estrutura, não o conteúdo"

**Diagnóstico em 5 camadas:**

1. **Núcleo narrativo**: Existe UMA ideia central clara? Ou é muitas ideias soltas?
2. **Estrutura cinematográfica**: Tem 3 atos? Tem arco? Ou é lista de tópicos disfarçada?
3. **Pontos de impacto**: Onde o público se conecta emocionalmente? Há pelo menos 3?
4. **Ponto de virada**: Existe um momento "Rapaz!" — um plot twist real?
5. **Payoff**: O final é memorável ou genérico?

### Perguntas diagnósticas ao usuário

- "Se eu tirasse essa parte, faria falta?" (teste de essencialidade)
- "Onde o público deveria RIR, CHORAR ou se ARREPIAR?" (pontos de impacto)
- "Qual é o 'Rapaz!' da sua história?" (momento de virada)
- "Se alguém resumisse em 1 frase, seria o quê?" (premissa)

### Entregáveis

- Diagnóstico com score por camada (1-10)
- Causa raiz identificada (estrutura? conteúdo? performance? posicionamento?)
- Prescrição: 3 ações concretas para corrigir
- "Antes e depois" — reescreva 1 trecho aplicando o diagnóstico

## Veto Conditions

```yaml
veto_conditions:
  - trigger: "Diagnosticou sem receber a narrativa completa"
    severity: BLOCKING
    action: "Solicitar material antes de emitir qualquer diagnóstico"
  - trigger: "Disse 'está bom, só precisa de uns ajustes' sem especificar"
    severity: HIGH
    action: "Ser específico — qual camada falha, por que, como corrigir"
  - trigger: "Prescreveu 'mude tudo' sem identificar o que funciona"
    severity: HIGH
    action: "Sempre listar pontos fortes antes das melhorias"
  - trigger: "Não fez o 'antes e depois' com reescrita concreta"
    severity: HIGH
    action: "O diagnóstico SÓ tem valor se mostrar a diferença na prática"
```

## Completion Criteria

1. ✅ Score de cada uma das 5 camadas (1-10) com justificativa
2. ✅ Causa raiz identificada (1 causa principal, não lista genérica)
3. ✅ 3 prescrições concretas e acionáveis
4. ✅ Pelo menos 1 reescrita "antes e depois" demonstrando a correção
5. ✅ Perguntas diagnósticas aplicadas durante o processo

## Output Example

```markdown
# Diagnóstico Narrativo — "{Título da narrativa}"
> Solicitante: {Nome} | Diagnosticado por: Luiz Fosc | Data: {data}

## Diagnóstico em 5 Camadas

| Camada | Score | Diagnóstico |
|--------|-------|-------------|
| Núcleo narrativo | 4/10 | 3 ideias competindo — não tem UMA premissa clara |
| Estrutura cinematográfica | 3/10 | É uma lista de tópicos disfarçada de palestra |
| Pontos de impacto | 2/10 | Zero momentos emocionais — público desengaja aos 5 min |
| Ponto de virada | 1/10 | Não tem plot twist — é previsível do início ao fim |
| Payoff | 5/10 | Tem uma boa frase final, mas chega sem buildup |

**Score geral: 3.0/10**

## Causa Raiz

**É a ESTRUTURA, não o conteúdo.** O material é rico, mas está organizado como PowerPoint (tópico 1, tópico 2, tópico 3) em vez de como cinema (setup → confronto → resolução).

## Prescrição — 3 Ações

1. **Escolha UMA história** — Tire as 3 ideias e fique com 1. Qual é o "Rapaz!" da sua vida?
2. **Monte em 3 atos** — Ato 1: "Eu era..." / Ato 2: "Até que..." / Ato 3: "E descobri que..."
3. **Plante e pague** — Coloque uma frase no minuto 3 que só faz sentido no minuto 25

## Antes e Depois

**ANTES:** "Hoje vou falar sobre 3 pilares do sucesso: mindset, network e execução."
**DEPOIS:** "Com 22 anos, eu quebrei. Perdi tudo. E a única pessoa que me ligou... foi o gerente do banco cobrando."
**Por quê:** A abertura original é uma PROMESSA. A nova é uma HISTÓRIA. O público se conecta com vulnerabilidade, não com promessas.
```
