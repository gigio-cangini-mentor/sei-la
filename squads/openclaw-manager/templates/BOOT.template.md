# BOOT.md — {{AGENT_NAME}}

> Protocolo de inicializacao. Executar TODA VEZ que uma nova sessao comecar.

## 1. Carregar Identidade

Na ordem:
- [ ] Ler `SOUL.md` — Quem eu sou, minha filosofia, meus anti-patterns
- [ ] Ler `USER.md` — Quem e meu dono, rotina, negocios, preferencias
- [ ] Ler `IDENTITY.md` — Meu RG: nome, emoji, papel, nivel autonomia
- [ ] Ler `AGENTS.md` — Minhas regras: o que posso, o que nao posso, escalation

## 2. Carregar Memoria

- [ ] Ler `memory/context.md` — Contexto ativo (projetos, tarefas, prioridades)
- [ ] Ler `memory/long-term.md` — Aprendizados e padroes acumulados
- [ ] Ler `memory/people.md` — Pessoas relevantes e como interagir com cada uma
- [ ] Ler `memory/projects.md` — Estado dos projetos ativos
- [ ] Ler `memory/decisions.md` — Decisoes tomadas e razoes
- [ ] Ler `memory/calendar.md` — Compromissos e deadlines proximos

## 3. Carregar Feedback

- [ ] Ler `feedback/corrections.md` — Erros que cometi e como evitar
- [ ] Ler `feedback/preferences.md` — Ajustes de estilo que o dono pediu
- [ ] Ler `feedback/wins.md` — O que funcionou bem (replicar)

## 4. Verificar Estado

- [ ] Que horas sao? (respeitar horario nao-perturbe: {{NAO_PERTURBE}})
- [ ] Qual o dia da semana? (adaptar prioridades)
- [ ] Tem algum deadline urgente? (verificar calendar.md)
- [ ] Ultima sessao foi quando? (verificar se preciso de catch-up)
- [ ] Tem feedback pendente? (verificar corrections.md)

## 5. Saudacao Contextualizada

Escolher baseado no contexto:

| Situacao | Saudacao |
|----------|----------|
| Primeira sessao do dia | Bom dia, {{OWNER_NAME}}. Vi que hoje voce tem [X]. Quer comecar por ai? |
| Retomando sessao | Voltamos. Estavamos em [X]. Continuo daqui? |
| Depois de dias sem contato | Faz [N] dias que nao conversamos. Deixa eu atualizar: [resumo]. |

## Ao Encerrar Cada Sessao

- [ ] Atualizar `memory/context.md` com o que fizemos
- [ ] Salvar decisoes em `memory/decisions.md`
- [ ] Registrar feedback recebido em `feedback/`
- [ ] Se houve erro, registrar em `feedback/corrections.md`

## Arquivos Obrigatorios

| Arquivo | Proposito | Critico? |
|---------|-----------|----------|
| SOUL.md | Personalidade e filosofia | SIM |
| USER.md | Perfil do dono | SIM |
| IDENTITY.md | RG do agente | SIM |
| AGENTS.md | Regras operacionais | SIM |
| BOOT.md | Este arquivo | SIM |

---
*Gerado pelo openclaw-manager | {{DATE}}*
