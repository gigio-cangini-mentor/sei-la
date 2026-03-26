# Qualidade Ortográfica pt-BR — Artigo VII da Constitution (NON-NEGOTIABLE)

## Regra Constitutional (NON-NEGOTIABLE — mesmo nível que Agent Authority)

TODO texto em português brasileiro DEVE seguir normas ortográficas completas:
acentos, cedilhas, tils, crases e pontuação correta. Sem exceção.

**Texto sem acentuação é INACEITÁVEL e constitui VIOLAÇÃO CONSTITUCIONAL.** Isto se aplica a:
- Respostas ao usuário
- Conteúdo de arquivos .md, .html, .txt gerados
- Stories, PRDs, relatórios, análises
- Copy, landing pages, posts, scripts
- Mensagens de commit em português
- Qualquer output voltado para humanos em pt-BR
- **Outputs de TODOS os squads, skills e agentes — sem exceção**

## Enforcement

- TODO agente (dev, sm, po, qa, analyst, architect, etc.) DEVE aplicar esta regra
- TODO squad que gera conteúdo DEVE respeitar pt-BR antes de finalizar output
- Subagents (Agent tool) DEVEM seguir esta regra mesmo sem contexto explícito
- Se o output contiver texto pt-BR sem acentuação: **BLOQUEAR** e corrigir antes de entregar
- Referência completa de palavras e padrões: `skills/pt-br-accentuation/SKILL.md`

**NÃO se aplica a:**
- Comentários em código (que DEVEM ser em inglês)
- Nomes de variáveis, funções, classes (inglês)
- Strings técnicas, IDs, slugs

## Top 20 Erros Fatais (MEMORIZE)

| ERRADO | CORRETO | ERRADO | CORRETO |
|--------|---------|--------|---------|
| nao | não | acao | ação |
| voce | você | funcao | função |
| sao | são | possivel | possível |
| estao | estão | necessario | necessário |
| sera | será | disponivel | disponível |
| tambem | também | experiencia | experiência |
| ja | já | codigo | código |
| ate | até | numero | número |
| esta (verbo) | está | conteudo | conteúdo |
| e (verbo) | é | unico | único |

## Padrões Obrigatórios

| Padrão | Regra | Exemplos |
|--------|-------|----------|
| -ção | SEMPRE til + cedilha | ação, função, solução |
| -ência/-ância | SEMPRE acento | experiência, importância |
| -ível/-ável | SEMPRE acento | possível, responsável |
| -ário/-ório | SEMPRE acento | necessário, relatório |
| -ico/-ica | SEMPRE acento (proparoxítonas) | único, público, lógica |
| Futuro -rá/-rão | SEMPRE acento | será, farão, terá |
| Proparoxítonas | TODAS acentuadas | código, número, página |

## Princípio da Dúvida

Na dúvida entre acentuar ou não: **ACENTUE**. Melhor sobre-acentuar que sub-acentuar.

## Referência Completa

Para lista exaustiva de 100+ palavras e regras detalhadas de crase/cedilha/acentuação:
`skills/pt-br-accentuation/SKILL.md`
