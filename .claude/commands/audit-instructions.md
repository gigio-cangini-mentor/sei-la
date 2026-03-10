Audite os instruction files do projeto contra as boas praticas do guia em `docs/guides/agent-instructions-guide.md`.

## Passo 1: Coletar metricas

Leia os seguintes arquivos e conte as linhas de cada um:
- `~/.claude/CLAUDE.md` (global)
- `.claude/CLAUDE.md` (projeto)
- Memory file do projeto (auto memory)
- Todos os rules em `.claude/rules/*.md` — separar em always-on (sem `paths:` frontmatter) e condicionais (com `paths:`)

Calcule:
- **Total always-loaded** = global CLAUDE.md + projeto CLAUDE.md + MEMORY.md + rules always-on
- **Total condicional** = rules com `paths:`

## Passo 2: Rodar checklist

Leia `docs/guides/agent-instructions-guide.md`, secao "Audit Checklist".
Avalie cada item da checklist contra os arquivos lidos no Passo 1.
Marque PASS ou FAIL para cada item.

## Passo 3: Apresentar resultado

Mostre um report compacto:

```
## Audit Report — Agent Instructions

| Arquivo | Linhas | Limite | Status |
|---------|--------|--------|--------|
| Global CLAUDE.md | X | < 100 | OK/WARN |
| Project CLAUDE.md | X | < 300 | OK/WARN |
| MEMORY.md | X | < 200 | OK/WARN |
| Rules always-on (N files) | X | < 200 | OK/WARN |
| **Total always-loaded** | **X** | **< 500** | **OK/WARN** |

### Checklist (X/16 PASS)
- [x] Item que passou
- [ ] Item que falhou — motivo breve

### Recomendacoes
- {acao especifica se houver FAILs}
```

## Passo 4: Sugerir acoes

Se houver FAILs, sugira acoes concretas com opcoes numeradas (1, 2, 3).
NAO execute nada sem confirmacao do usuario.
