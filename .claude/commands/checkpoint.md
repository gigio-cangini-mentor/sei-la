Contexto acabando ou usuario pediu checkpoint. Execute TODOS os passos abaixo SEM carregar squads/skills:

## Passo 0: Mudancas nao commitadas
- Rode `git diff --stat` via Bash
- Se houver mudancas nao commitadas, pergunte ao usuario: "Quer fazer commit ou stash antes do checkpoint?"
- Se sim, faca commit com mensagem `chore: checkpoint session` ou `git stash`
- Se nao, apenas registre os arquivos modificados no session file

## Passo 1: Identificar projeto ativo
- Rode `git log --oneline -5` via Bash
- Analise o contexto da conversa para identificar o projeto ativo
- Se trabalhou em mais de 1 projeto, pergunte qual e o foco principal

## Passo 2: Atualizar INDEX.md do projeto
- Leia `docs/projects/{projeto}/INDEX.md`
- Extraia o campo **Project Path** (se existir) — sera usado no Passo 4
- Atualize as secoes:
  - **Estado Atual**: reflita o estado real agora
  - **Ultima Sessao**: data/hora agora, agente/squad usado, o que foi feito (detalhado)
  - **Proximo Passo**: acao concreta para retomar
  - **Historico**: adicione 1 linha com data e resumo
- Se INDEX.md nao existe, crie seguindo o padrao dos existentes (leia `docs/projects/ensinio/INDEX.md` como referencia)

## Passo 3: Atualizar ACTIVE.md
- Leia `docs/projects/ACTIVE.md`
- Atualize a row do projeto: status, agente/squad, ultima sessao, proximo passo
- Se o projeto nao esta na tabela, adicione uma nova row

## Passo 4: Salvar session file
- Crie `docs/projects/{projeto}/sessions/YYYY-MM-DD.md` com:

```markdown
# Session {data}

## Projeto
- **Nome:** {nome do projeto}
- **INDEX.md:** `docs/projects/{projeto}/INDEX.md`
```

Se o projeto tem **Project Path** externo (extraido no Passo 2), adicione:

```markdown
## Working Directory
- **Path:** `{project path}`
- Arquivos do projeto real vivem neste diretorio, fora de aios-core.
```

Restante do session file:

```markdown
## O que foi feito
{descricao detalhada com contexto suficiente para retomar}

## Agente/Squad em uso
{agente ou squad ativo nesta sessao}

## Arquivos para contexto (proximo Claude DEVE ler)
- `{arquivo 1}`
- `{arquivo 2}`
- `{arquivo 3}`
```

Se o projeto tem Project Path externo, use paths absolutos para arquivos que vivem fora de aios-core (ex: `~/CODE/Projects/meu-app/src/index.ts`).

```markdown
## Decisoes tomadas
- {decisao 1 — para nao refazer}
- {decisao 2}

## Proximo passo exato
{comando ou acao especifica}

## Arquivos modificados nao commitados
{lista ou "Nenhum — tudo commitado"}
```

## Passo 5: Health check rapido dos instruction files
- Conte as linhas de: `~/.claude/CLAUDE.md`, `.claude/CLAUDE.md`, MEMORY.md do projeto
- Conte as linhas dos rules always-on (sem `paths:` frontmatter) em `.claude/rules/`
- Some tudo = **total always-loaded**
- Se total > 500 linhas, mostre WARNING:

```
⚠️ Instruction files cresceram: {total} linhas (limite: 500)
   Rode `/audit-instructions` para diagnostico completo.
```

- Se total <= 500, mostre apenas: `Instructions: {total}/500 linhas — OK`

## Passo 6: Confirmacao
Mostre ao usuario:
- ✅/❌ INDEX.md atualizado
- ✅/❌ ACTIVE.md atualizado
- ✅/❌ Session file salvo em `docs/projects/{projeto}/sessions/YYYY-MM-DD.md`
- Instructions health: {total}/500

Ao final, SEMPRE mostre a dica de retomada:

```
Para retomar este projeto na proxima sessao, digite:
/resume {projeto}
```

Onde `{projeto}` e o nome exato da pasta em `docs/projects/`.
