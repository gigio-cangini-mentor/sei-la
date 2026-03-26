# upgrade-existing-claw

> **Brownfield Upgrade: Auditar Openclaw existente + Pipeline de complementos**

## Purpose

Conectar via SSH a um Openclaw que já está rodando, auditar a estrutura completa,
identificar gaps, e gerar/executar pipeline de remediação para o que falta.

## Agent

`@openclaw-chief` (orquestra) → `@claw-provisioner` (executa SSH + auditoria)

## Trigger

`*upgrade {claw-name}` ou `*audit-claw {claw-name}`

## Input

```yaml
input:
  required:
    claw_name: "nome do claw (pra registro no fleet)"
    ssh_host: "IP ou hostname da VPS"
    ssh_user: "usuario SSH (geralmente root)"
    ssh_auth: "password OU path da chave SSH"
  optional:
    ssh_port: "porta SSH (default 22)"
    gateway_port: "porta do gateway (default 18789)"
    workspace_path: "path do workspace (auto-detectado se nao informado)"
```

## Execution

### Phase 1: Connect & Validate SSH

```yaml
phase_1:
  name: "Conectar e validar acesso SSH"
  commands:
    - test: "ssh -o ConnectTimeout=10 {user}@{host} 'echo OK'"
      expect: "OK"
      on_fail: "HALT — SSH inacessivel. Verificar IP, usuario, credenciais."

    - test: "ssh {user}@{host} 'whoami'"
      store_as: "ssh_user_confirmed"

    - test: "ssh {user}@{host} 'uname -a'"
      store_as: "system_info"

  gate: "SSH conecta com sucesso?"
  on_fail: "HALT — resolver acesso antes de auditar"
```

### Phase 2: Audit — 6 Dimensões

Executar via SSH e coletar resultados de cada dimensão:

#### 2.1 Gateway & Infraestrutura

```bash
# Gateway status
openclaw gateway status 2>&1 || echo "GATEWAY_NOT_FOUND"

# Health check
curl -s -o /dev/null -w "%{http_code}" http://localhost:18789/health 2>/dev/null || \
curl -s -o /dev/null -w "%{http_code}" http://localhost:3339/health 2>/dev/null || echo "HEALTH_FAIL"

# Node version
node --version 2>/dev/null || echo "NODE_NOT_FOUND"

# Systemd
systemctl is-active openclaw 2>/dev/null || echo "SERVICE_NOT_FOUND"

# Uptime e recursos
uptime
df -h /
free -m
```

**Checklist:**
- [ ] Gateway rodando (status = running)
- [ ] Health check retorna 200
- [ ] Node.js >= 18
- [ ] Systemd service ativo (ou screen session)
- [ ] Disco >= 20% livre
- [ ] RAM >= 256MB livre

#### 2.2 Segurança

```bash
# Config critica
cat ~/.openclaw/openclaw.json 2>/dev/null | jq '{
  dmPolicy_telegram: .channels.telegram.dmPolicy,
  dmPolicy_whatsapp: .channels.whatsapp.dmPolicy,
  bind: .gateway.bind,
  restrictToWorkspace: .tools.filesystem.restrictToWorkspace
}' 2>/dev/null || echo "CONFIG_NOT_FOUND"

# Firewall
sudo ufw status 2>/dev/null || echo "UFW_NOT_FOUND"

# Fail2ban
sudo fail2ban-client status sshd 2>/dev/null || echo "FAIL2BAN_NOT_FOUND"

# .env permissions
stat -c '%a' ~/.openclaw/workspace*/.env 2>/dev/null || \
stat -f '%Lp' ~/aiosbot/.env 2>/dev/null || echo "ENV_NOT_FOUND"
```

**Checklist:**
- [ ] dmPolicy = "allowlist" (CRITICO — se "open", qualquer um comanda o bot)
- [ ] Gateway bind = "loopback" ou "127.0.0.1"
- [ ] restrictToWorkspace = true
- [ ] UFW ativo com apenas portas necessarias
- [ ] Fail2ban rodando
- [ ] .env com permissao 600

#### 2.3 Identidade (Workspace Files)

```bash
# Auto-detectar workspace
WORKSPACE=$(cat ~/.openclaw/openclaw.json 2>/dev/null | jq -r '.agents.defaults.workspace // empty')
[ -z "$WORKSPACE" ] && WORKSPACE=$(find /home /root -name "SOUL.md" -path "*/aiosbot/*" 2>/dev/null | head -1 | xargs dirname 2>/dev/null)
[ -z "$WORKSPACE" ] && WORKSPACE=$(find /home /root -name "SOUL.md" -path "*/.openclaw/*" 2>/dev/null | head -1 | xargs dirname 2>/dev/null)
echo "WORKSPACE=$WORKSPACE"

# Checar arquivos obrigatorios
for FILE in SOUL.md USER.md IDENTITY.md AGENTS.md BOOT.md MEMORY.md HEARTBEAT.md TOOLS.md; do
  if [ -f "$WORKSPACE/$FILE" ]; then
    LINES=$(wc -l < "$WORKSPACE/$FILE")
    echo "✅ $FILE ($LINES lines)"
  else
    echo "❌ $FILE MISSING"
  fi
done
```

**Checklist (com mínimos):**
- [ ] SOUL.md existe (>= 100 linhas, sem frases genericas)
- [ ] USER.md existe (>= 200 linhas)
- [ ] IDENTITY.md existe (>= 30 linhas)
- [ ] AGENTS.md existe (>= 60 linhas)
- [ ] MEMORY.md existe
- [ ] HEARTBEAT.md existe
- [ ] TOOLS.md existe

#### 2.4 Memória

```bash
# Estrutura de memoria
ls -la "$WORKSPACE/memory/" 2>/dev/null || echo "MEMORY_DIR_MISSING"

# Arquivos de memoria recentes
find "$WORKSPACE/memory/" -name "*.md" -mtime -7 2>/dev/null | wc -l

# Feedback system
ls -la "$WORKSPACE/memory/feedback/" 2>/dev/null || echo "FEEDBACK_DIR_MISSING"

# Compactacao configurada?
cat ~/.openclaw/openclaw.json 2>/dev/null | jq '.compaction // "NOT_CONFIGURED"'
```

**Checklist:**
- [ ] Pasta memory/ existe
- [ ] Memoria sendo criada (arquivos recentes < 7 dias)
- [ ] Feedback system configurado (memory/feedback/)
- [ ] Compactação ativa no config
- [ ] Lessons extraídas antes de compactar

#### 2.5 Skills & Crons

```bash
# Skills instaladas
openclaw skill list --enabled 2>/dev/null || echo "SKILLS_CMD_NOT_FOUND"

# Crons ativos
openclaw cron list 2>/dev/null || echo "CRONS_CMD_NOT_FOUND"

# Verificar configuracao de crons
cat ~/.openclaw/openclaw.json 2>/dev/null | jq '.crons // []' 2>/dev/null

# Skills custom (pasta de skills)
ls -la ~/.openclaw/skills/ 2>/dev/null || echo "CUSTOM_SKILLS_DIR_MISSING"
```

**Checklist:**
- [ ] Pelo menos 2 skills ativas
- [ ] Pelo menos 1 cron configurado
- [ ] Crons usam sessionTarget: "isolated" (NUNCA "main")
- [ ] Crons usam agentTurn (NUNCA systemEvent sozinho)
- [ ] Pasta de skills custom existe

#### 2.6 Integrações & Canais

```bash
# Canais configurados
openclaw channels status 2>/dev/null || echo "CHANNELS_CMD_NOT_FOUND"

# Telegram ativo?
cat ~/.openclaw/openclaw.json 2>/dev/null | jq '.channels.telegram // "NOT_CONFIGURED"'

# WhatsApp ativo?
cat ~/.openclaw/openclaw.json 2>/dev/null | jq '.channels.whatsapp // "NOT_CONFIGURED"'

# MCP servers
cat ~/.openclaw/openclaw.json 2>/dev/null | jq '.mcpServers // {}' | jq 'keys'

# Tailscale
tailscale status 2>/dev/null || echo "TAILSCALE_NOT_FOUND"
```

**Checklist:**
- [ ] Pelo menos 1 canal ativo (Telegram ou WhatsApp)
- [ ] Canal responde a probe
- [ ] Tailscale conectado (se usa bridge local)

### Phase 3: Generate Audit Report

Consolidar todos os resultados num relatório:

```yaml
audit_report:
  claw_name: "{name}"
  ssh_host: "{host}"
  audited_at: "{timestamp}"
  system_info: "{uname output}"

  scores:
    infrastructure: "{0-100}%"
    security: "{0-100}%"
    identity: "{0-100}%"
    memory: "{0-100}%"
    skills: "{0-100}%"
    integrations: "{0-100}%"
    overall: "{0-100}%"

  status: "healthy | needs_work | critical"

  findings:
    critical: []     # Precisa corrigir AGORA
    high: []         # Corrigir em breve
    medium: []       # Melhorar quando puder
    low: []          # Nice to have

  missing_files: []  # Arquivos que nao existem
  weak_files: []     # Arquivos que existem mas estao abaixo do minimo
  missing_configs: [] # Configuracoes faltantes
```

**Formato visual pro usuario:**

```
🔍 AUDIT REPORT — {claw-name} ({host})
══════════════════════════════════════════

Infra:      ████████░░ 80%   Gateway OK, systemd faltando
Segurança:  ██████░░░░ 60%   dmPolicy OK, fail2ban FALTANDO
Identidade: ████░░░░░░ 40%   SOUL.md fraco (32 linhas), USER.md FALTANDO
Memória:    ██░░░░░░░░ 20%   Pasta existe, feedback FALTANDO
Skills:     ██████████ 100%  3 skills ativas, crons OK
Integrações:████████░░ 80%   Telegram OK, WhatsApp nao configurado

OVERALL:    ██████░░░░ 63%   Status: NEEDS WORK

CRITICOS (2):
  🔴 USER.md não existe — agente não conhece o dono
  🔴 Fail2ban não instalado — VPS vulnerável a brute force

ALTOS (3):
  🟡 SOUL.md com 32 linhas (mínimo 100) — personalidade fraca
  🟡 Feedback system não configurado — agente não aprende
  🟡 Compactação não ativa — vai estourar token

MÉDIOS (1):
  🟠 HEARTBEAT.md não existe — sem proatividade
```

### Phase 4: Generate Remediation Pipeline

Baseado nos findings, gerar pipeline priorizado:

```yaml
remediation_pipeline:
  # Wave 1: CRITICOS (bloqueia uso seguro)
  wave_1_critical:
    parallel: false  # Sequencial — seguranca primeiro
    items:
      - id: "REM-SEC-001"
        finding: "fail2ban nao instalado"
        action: "SSH: apt install fail2ban && systemctl enable fail2ban"
        auto_fixable: true
        risk: "baixo"

      - id: "REM-ID-001"
        finding: "USER.md nao existe"
        action: "Rodar Memory Extraction → gerar USER.md via template → SCP pro VPS"
        auto_fixable: true  # Usa memory-extraction.md
        depends_on: "input do usuario (Memory Extraction prompt)"

  # Wave 2: ALTOS (degrada qualidade)
  wave_2_high:
    parallel: true
    items:
      - id: "REM-ID-002"
        finding: "SOUL.md fraco (32 linhas)"
        action: "Expandir SOUL.md usando template + dados do Memory Extraction"
        auto_fixable: true
        depends_on: "REM-ID-001 (precisa do perfil)"

      - id: "REM-MEM-001"
        finding: "Feedback system nao configurado"
        action: "SSH: mkdir -p memory/feedback && criar content.json, tasks.json, recommendations.json"
        auto_fixable: true

      - id: "REM-MEM-002"
        finding: "Compactacao nao ativa"
        action: "SSH: atualizar openclaw.json com config de compaction"
        auto_fixable: true

  # Wave 3: MEDIOS (melhora experiencia)
  wave_3_medium:
    parallel: true
    items:
      - id: "REM-PRO-001"
        finding: "HEARTBEAT.md nao existe"
        action: "Gerar HEARTBEAT.md via template → SCP"
        auto_fixable: true
```

### Phase 5: Execute Remediation

Para cada item do pipeline:

```yaml
execution_rules:
  auto_fixable_true:
    strategy: "Executar automaticamente via SSH"
    confirm_before: true  # Mostrar o que vai fazer, pedir OK
    rollback: "Backup antes de cada mudanca (cp file file.bak)"

  auto_fixable_false:
    strategy: "Gerar instrucoes passo-a-passo pro usuario"
    format: "Markdown com comandos copy-paste"

  file_creation:
    strategy: "SEMPRE criar local + SCP (VT-OC-009)"
    never: "Heredoc via SSH"

  config_changes:
    strategy: "Backup → Patch → Restart gateway"
    rollback: "cp openclaw.json.bak openclaw.json && restart"
```

### Phase 6: Register in Fleet

Após remediação:

```yaml
fleet_registration:
  action: "INSERT into openclaw_fleet"
  fields:
    claw_name: "{name}"
    owner_name: "{from audit or user input}"
    status: "active"
    vps_host: "{ssh_host}"
    last_health_check: "NOW()"
    last_health_status: "{from audit}"
    integrations: "{detected integrations}"
    skills_count: "{detected skills}"
  activate_monitoring: true
```

## Output

```yaml
output:
  audit_report: "AUDIT-REPORT-{claw-name}.md"
  remediation_plan: "REMEDIATION-{claw-name}.yaml"
  execution_log: "EXECUTION-LOG-{claw-name}.md"
  fleet_entry: "registered in openclaw_fleet"
```

## Veto Conditions

| ID | Trigger | Action |
|---|---|---|
| VT-UPG-001 | SSH inacessível | HALT — nao auditar sem acesso |
| VT-UPG-002 | dmPolicy = "open" | CRITICO — corrigir ANTES de qualquer outra coisa |
| VT-UPG-003 | Gateway bind = 0.0.0.0 | CRITICO — exposto publicamente |
| VT-UPG-004 | Criar arquivo via heredoc no VPS | VETO (VT-OC-009) |
| VT-UPG-005 | Remediar sem backup | VETO — sempre cp file file.bak antes |
| VT-UPG-006 | Restart gateway sem confirmar | VETO — mostrar o que muda, pedir OK |
