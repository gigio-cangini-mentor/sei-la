Ao receber este comando, siga EXATAMENTE estes passos:

1. **Atualize o catálogo** rodando `node scripts/generate-catalog.js` via Bash

2. **Confirme ao usuário** apenas com as contagens do output do script (ex: "Catálogo atualizado — 50 squads, 35 skills, 7 tools, 12 agents"). NÃO liste nomes, NÃO leia o catalog.md. Apenas confirme e PARE.

3. **Aguarde instrução** — o usuário pode pedir para ativar qualquer squad, skill, tool ou agent listado. Para ativar:
   - **Squad:** Leia o arquivo `squads/{nome}/README.md` e siga as instruções
   - **Skill:** Leia o arquivo `.aios/skills/{nome}/SKILL.md` e siga as instruções
   - **Agent:** Leia o arquivo `.aios-core/development/agents/{nome}.md` e ative
   - **Task específica de squad:** Leia `squads/{nome}/tasks/{task}.md` e execute
