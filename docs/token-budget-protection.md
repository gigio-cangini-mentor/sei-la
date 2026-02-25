# 🛡️ Token Budget Protection - Global Configuration

**Data:** 24 de fevereiro de 2026
**Status:** ✅ ATIVO
**Aplicado a:** Todos os agentes, todas as tarefas, todos os squads

---

## 📊 POLÍTICA GLOBAL DE PROTEÇÃO

### Limite Crítico: 95% de Uso

```
┌─────────────────────────────────────────────┐
│ TOKEN BUDGET: 200,000 tokens                │
│ Limite Crítico: 95% = 190,000 tokens        │
│ Zona de Segurança: 5% = 10,000 tokens       │
└─────────────────────────────────────────────┘
```

### Ações Automáticas

| Uso | Ação | Responsável | Urgência |
|-----|------|-------------|----------|
| **< 90%** | ✅ Continuar | (nenhuma) | Normal |
| **90-94%** | ⚠️ Aviso | Agent/User | Média |
| **95%+** | 🛑 PAUSA | Sistema | **CRÍTICA** |

---

## 🛑 O QUE ACONTECE QUANDO ATINGIR 95%

### AVISO OBRIGATÓRIO (Será exibido)

```
╔════════════════════════════════════════════════════════════╗
║  ⚠️  ALERTA CRÍTICO - TOKEN BUDGET 95%+                   ║
╠════════════════════════════════════════════════════════════╣
║  Uso Atual:        190,000 / 200,000 tokens (95%)         ║
║  Tokens Restantes: ~10,000 tokens                         ║
║  Ação Necessária:  PAUSA IMEDIATA                         ║
╠════════════════════════════════════════════════════════════╣
║  📋 INSTRUÇÕES:                                           ║
║  1. Salve o estado atual (commits, snapshots)             ║
║  2. Documente progresso em task files                     ║
║  3. PAUSE qualquer nova tarefa/agent spawning             ║
║  4. Avise o usuário (@projonx)                            ║
║  5. Aguarde nova sessão (contexto será comprimido)        ║
╚════════════════════════════════════════════════════════════╝
```

### COMPORTAMENTO EM CASCATA

**Quando atingir 95%:**

1. **Imediatamente:**
   - [ ] Nenhuma nova Task/Agent será criada
   - [ ] Nenhuma operação de longa duração
   - [ ] Nenhum WebFetch/WebSearch novo
   - [ ] Nenhum arquivo grande será lido

2. **Próximo:**
   - [ ] Todos os agentes em execução recebem sinal de parada
   - [ ] Tasks em `in_progress` recebem checkpoint automático
   - [ ] Sistema aguarda finalização de operações críticas

3. **Finalização:**
   - [ ] Status de todas as tasks atualizado
   - [ ] Documentação salva em `output_summary.md`
   - [ ] Git commit com checkpoint
   - [ ] Usuário informado com resumo completo

---

## 📋 MONITORAMENTO CONTÍNUO

### Check Points Obrigatórios

```yaml
Checkpoints:
  - Antes de cada Task launch: Verificar uso
  - Antes de cada Agent spawn: Verificar uso
  - A cada 10 chamadas de ferramenta: Log de tokens
  - A cada 1 hora de sessão: Resumo de consumo
```

### Responsabilidades

| Papel | Ação |
|------|------|
| **Claude Code** | Rastreia uso em tempo real |
| **Agents** | Param imediatamente ao receber sinal |
| **Squad Master** | Notifica @projonx e agenda continuação |
| **Você (@projonx)** | Aguarda nova sessão ou nova conversa |

---

## 🔄 CONTINUAÇÃO APÓS PAUSA

### Como Retomar

**Quando iniciar nova sessão/conversa:**

1. **Você diz:**
   ```
   "Continua do checkpoint de [data/hora]"
   ```

2. **Sistema retorna:**
   - Contexto da session anterior (comprimido)
   - Status de todas as tasks
   - Próximos passos alinhados
   - Agentes prontos para continuar

3. **Retomada sem perda:**
   - Todos os arquivos salvos
   - Commits feitos
   - Estado das tasks preservado
   - Progresso não é perdido

---

## 📍 CHECKPOINTS E RESUMOS

### Antes da Pausa (95%+)

Arquivo: `.claude/checkpoints/session-{YYYYMMDD-HHMMSS}.md`

```markdown
# Session Checkpoint

**Data/Hora:** 2026-02-24 14:35
**Tokens Usados:** 190,000 / 200,000 (95%)

## ✅ Completado
- [ ] Squad dual-pilar criado
- [ ] Config.yaml finalizado
- [ ] Backlog gerado

## 🔄 Em Progresso
- [ ] Task: [nome]
  Status: [in_progress/blocked/pending]
  Progresso: [%]

## ⏳ Próximos Passos
1. Chamar @squad-master daily-standup
2. Ativar @architect validation
3. Começar Sprint 1

## 📊 Métricas
- Arquivos Criados: 14
- Tasks Geradas: 60+
- Agentes Prontos: 11
```

---

## ⚙️ CONFIGURAÇÃO TÉCNICA

### Para Agentes (quando implementado)

```python
# Pseudo-código para proteção automática
class TokenBudgetGuard:
    BUDGET = 200_000
    CRITICAL_THRESHOLD = 0.95
    WARNING_THRESHOLD = 0.90

    def check_budget(current_tokens):
        usage_percent = current_tokens / BUDGET

        if usage_percent >= CRITICAL_THRESHOLD:
            PAUSE_ALL_OPERATIONS()
            EMIT_CRITICAL_ALERT()
            SAVE_CHECKPOINT()
            return False  # Stop new operations

        elif usage_percent >= WARNING_THRESHOLD:
            EMIT_WARNING()
            return True  # Continue but be careful

        return True  # All good
```

---

## 📢 COMUNICAÇÃO

### Aviso ao Usuário (95%+)

**Será enviado automaticamente:**

```
🛑 PAUSA CRÍTICA - Token Budget Atingido 95%

Olá @projonx,

Sua sessão atingiu o limite crítico de 95% do token budget.

✅ O que foi salvo:
- Todos os arquivos criados
- Estado de todas as tasks
- Commits automaticamente feitos
- Configurações preservadas

⏸️ O que foi pausado:
- Nenhuma nova task
- Nenhum novo agent
- Nenhuma operação pesada

🔄 Como continuar:
Comece uma nova conversa e diga:
"Continua do checkpoint do dual-pillar squad"

📊 Resumo desta sessão:
[Estatísticas completas]
```

---

## 🎯 METAS DESTA CONFIGURAÇÃO

✅ **Nunca** deixar contexto corrompido
✅ **Sempre** preservar progresso
✅ **Sempre** avisar antes de parar
✅ **Sempre** permitir retomada limpa
✅ **Nunca** perder trabalho

---

## 📌 APLICAÇÃO IMEDIATA

Esta configuração entra em vigor AGORA:

- ✅ Será respeitada por Claude Code
- ✅ Será respeitada por todos os agents
- ✅ Será respeitada em todas as tasks
- ✅ Será respeitada em todos os squads

**Não há exceções. Esta é a política.**

---

**Criado:** 24 de fevereiro de 2026
**Versão:** 1.0
**Status:** 🟢 ATIVO E MONITORADO
