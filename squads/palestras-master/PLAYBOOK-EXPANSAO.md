# Playbook de Expansão — Palestras Master

Guia operacional para evoluir o `palestras-master` com novos squads, agentes, fontes e mind clones sem perder consistência.

## Princípio central
- `palestras-master` é **federador**.
- Não duplica conhecimento profundo dos especialistas.
- Faz 4 coisas: **diagnosticar, rotear, compor, validar**.

## Arquitetura (o que pode mudar)
1. Satélites (novos especialistas): `squads/<novo-squad>/...`
2. Roteamento: `agents/palestras-method-router.md`
3. Contrato de integração: `data/README.md`
4. Qualidade: `checklists/multi-clone-quality-checklist.md`
5. Fluxo: `workflows/master-speaking-orchestration-flow.yaml`

---

## SOP 1 — Adicionar novo squad especialista

### Objetivo
Conectar um novo squad satélite ao `palestras-master`.

### Pré-requisitos mínimos do satélite
- `config.yaml` válido
- `entry_agent` definido
- pelo menos 1 agente e 1 task executável
- `README.md` com escopo (in/out)

### Passos
1. Criar/atualizar squad satélite em `squads/<nome>/`.
2. Atualizar o registry:
```bash
python3 squads/squad-creator/scripts/refresh-registry.py
```
3. Adicionar satélite em `data/README.md` do `palestras-master`.
4. Incluir regra de roteamento em `palestras-method-router.md`.
5. Revisar checklist de qualidade para cobrir novos riscos.

### Critérios de aceite
- Squad aparece no `squad-registry.yaml`.
- `palestras-method-router` consegue rotear para o novo satélite.
- Estratégia final continua passando no quality gate.

---

## SOP 2 — Adicionar novo agente ao palestras-master

### Quando fazer
Apenas se houver nova responsabilidade de **orquestração**.

### Não fazer
- Não criar agente para “copiar” expert já existente em satélite.

### Passos
1. Criar agente em `agents/<novo-agente>.md`.
2. Incluir no `config.yaml` em `agents:`.
3. Se tiver comando executável, adicionar task correspondente.
4. Atualizar `README.md` com o novo papel.

### Critério de veto
- Se o agente fizer trabalho de especialista satélite, **não entra**.

---

## SOP 3 — Incluir novas fontes (curso, transcrição, etc.)

### Regra
Fonte nova entra primeiro no **squad especialista**, não no federador.

### Passos
1. Processar fonte no pipeline do especialista (ex.: Tathi, Renner, novo clone).
2. Atualizar DNA/knowledge do satélite.
3. Validar outputs no satélite.
4. Só então ajustar roteamento no `palestras-master`.

### Resultado esperado
- `palestras-master` passa a usar a nova inteligência sem ficar inchado.

---

## SOP 4 — Atualizar matriz de roteamento

Arquivo: `agents/palestras-method-router.md`

### Regra prática
- Definir `intent`, `prefer`, `fallback`.
- Toda intenção nova deve ter fallback.

### Exemplo
```yaml
- intent: "narrativa_emocional_alto_impacto"
  prefer: "renner-silva"
  fallback: "tathi-deandhela"
```

### Checklist de roteamento
- [ ] intenção está clara e não ambígua
- [ ] especialista primário existe
- [ ] fallback existe
- [ ] critério de escolha está explícito

---

## SOP 5 — Expandir quality gate

Arquivo: `checklists/multi-clone-quality-checklist.md`

Sempre que entrar novo satélite/metodologia, revisar:
1. conflito de mensagem
2. conflito de CTA
3. excesso de complexidade
4. consistência ética da persuasão

Se algum risco novo surgir, incluir item obrigatório no checklist.

---

## Cadência recomendada de evolução
1. Mudança no satélite
2. `refresh-registry`
3. ajuste de roteamento
4. ajuste de checklist
5. piloto rápido com caso real

---

## Comandos úteis
```bash
# Atualizar registry global de squads
python3 squads/squad-creator/scripts/refresh-registry.py

# Ver estrutura do palestras-master
find squads/palestras-master -maxdepth 3 -type f | sort

# Inspecionar roteador
sed -n '1,220p' squads/palestras-master/agents/palestras-method-router.md
```

---

## Anti-padrões (não fazer)
1. Duplicar mind clone de satélite dentro do `palestras-master`.
2. Criar task no federador para trabalho profundo de especialista.
3. Adicionar satélite sem fallback de roteamento.
4. Evoluir arquitetura sem atualizar checklist de qualidade.

---

## Definição de pronto (DoD)
- Registry atualizado
- Contrato de integração atualizado
- Roteamento atualizado
- Quality gate atualizado
- Piloto validado com saída utilizável
