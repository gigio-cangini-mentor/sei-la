# Data Contract - palestras-master

## Satélites federados (v3)
- `squads/tathi-deandhela`
- `squads/renner-silva`
- `squads/storytelling-masters-fosc`
- `squads/luiz-fosc`

## Contrato mínimo por satélite
- `config.yaml` válido
- `entry_agent` definido
- tasks executáveis para o domínio
- README com escopo claro

## Política de integração
- O palestras-master não replica DNA dos satélites.
- O roteamento é orientado por intenção da demanda.
- A composição final deve passar no quality gate multi-clone.

## Capacidades por Satélite

| Satélite | Domínio | Agents | Entry |
|----------|---------|--------|-------|
| `tathi-deandhela` | Oratória, palco, persuasão ao vivo | 5 | `tathi-chief` |
| `renner-silva` | Storytelling transformacional, mentoria | 1 | `renner-silva` |
| `storytelling-masters-fosc` | Estrutura narrativa, apresentações, persuasão científica, retórica | 12 | `storytelling-masters-chief` |
| `luiz-fosc` | Mentoria Palestra de Elite, storytelling cinematográfico, pensamento de ilusionista, Fala Magnética, antifragilidade | 1 | `luiz-fosc` |

## Capacidades exclusivas por satélite

| Capacidade | tathi | renner | storytelling-masters | luiz-fosc |
|-----------|-------|--------|---------------------|-----------|
| Storytelling como cinema | - | Parcial | Teórico (McKee) | **Nativo** (Cinema-Mágica) |
| Pensamento de ilusionista | - | - | - | **Exclusivo** |
| Persuasão ética ao vivo | **Core** | Parcial | Cialdini/Heinrichs | - |
| Mentoria prática | Parcial | **Core** | - | **Core** |
| Mágica como ferramenta de palco | - | - | - | **Exclusivo** |
| Antifragilidade aplicada | - | Parcial | - | **Core** |
| Calibração por canal | - | - | - | **6 canais** |
| Autoridade de speaker | **Core** | Parcial | Parcial | Parcial |
| Frameworks teóricos | - | - | **12 experts** | Parcial |

## Roadmap de expansão
1. ~~Adicionar novos mind clones de palestrantes.~~ ✅ storytelling-masters-fosc (11 minds)
2. ~~Adicionar luiz-fosc como satélite.~~ ✅ v3
3. Atualizar matriz de roteamento por especialidade.
4. Criar benchmark comparativo entre métodos.
