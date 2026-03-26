# credential-collection

> **Phase 1.5: Collect & Validate Credentials** | Gate obrigatorio antes do setup

## Purpose

Coletar, validar e armazenar credenciais de servicos externos antes de iniciar o setup do claw. Sem credenciais validadas, o setup NAO inicia (VT-OC-007).

## Agent

`@claw-provisioner`

## Trigger

- `*provision {name}` (automatico, Phase 1.5 do pipeline)
- `*credentials {claw-name}` (manual, para recoletar)

## Input

```yaml
input:
  claw_name: "nome do claw sendo provisionado"
  owner_context: "dados basicos do dono (coletados no intake)"
```

## Execution

### Step 1: Explain & Collect

Apresentar ao usuario:

```
🔐 **Fase 1.5 — Coleta de Credenciais**

Antes de configurar o claw, preciso das credenciais dos servicos que ele vai usar.
Isso garante que o setup ja sai conectado — nada de "configura depois".

**OBRIGATORIAS (sem essas, nao prossigo):**
```

Coletar uma por uma, na ordem:

| # | Credencial | Prompt | Validacao |
|---|-----------|--------|-----------|
| 1 | `SUPABASE_URL` | "URL do projeto Supabase (ex: https://xxx.supabase.co)" | starts_with `https://`, contains `.supabase.` |
| 2 | `SUPABASE_ANON_KEY` | "Anon key (comeca com eyJ...)" | starts_with `eyJ`, length > 100 |
| 3 | `SUPABASE_SERVICE_ROLE_KEY` | "Service role key (NUNCA exponha)" | starts_with `eyJ`, length > 100, != anon_key |

```
**OPCIONAIS (melhoram o claw, mas nao bloqueiam):**
```

| # | Credencial | Prompt | Quando pedir |
|---|-----------|--------|-------------|
| 4 | `ANTHROPIC_API_KEY` | "API key Anthropic (sk-ant-...)" | Sempre oferecer |
| 5 | `OPENAI_API_KEY` | "API key OpenAI (sk-...)" | Sempre oferecer |
| 6 | `CLICKUP_API_TOKEN` | "Token ClickUp" | Se dono usa ClickUp |
| 7 | `EVOLUTION_API_URL` | "URL Evolution API" | Se dono quer WhatsApp |
| 8 | `EVOLUTION_API_KEY` | "Key Evolution API" | Se EVOLUTION_API_URL preenchida |

### Step 2: Format Validation

Para cada credencial coletada:
1. Verificar formato (regex/pattern match)
2. Se formato invalido → pedir novamente com mensagem especifica
3. Max 3 tentativas por credencial → depois HALT com instrucoes de onde encontrar

### Step 3: Connection Test

```yaml
connection_tests:
  supabase:
    test: |
      curl -s -o /dev/null -w "%{http_code}" \
        "${SUPABASE_URL}/rest/v1/" \
        -H "apikey: ${SUPABASE_ANON_KEY}" \
        -H "Authorization: Bearer ${SUPABASE_ANON_KEY}"
    expect: "200"
    on_fail: "Supabase inacessivel. Verifique URL e anon key."

  supabase_admin:
    test: |
      curl -s -o /dev/null -w "%{http_code}" \
        "${SUPABASE_URL}/rest/v1/" \
        -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
        -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}"
    expect: "200"
    on_fail: "Service role key invalida."

  anthropic:
    test: |
      curl -s -o /dev/null -w "%{http_code}" \
        "https://api.anthropic.com/v1/messages" \
        -H "x-api-key: ${ANTHROPIC_API_KEY}" \
        -H "anthropic-version: 2023-06-01" \
        -H "content-type: application/json" \
        -d '{"model":"claude-haiku-4-5-20251001","max_tokens":1,"messages":[{"role":"user","content":"ping"}]}'
    expect: "200"
    on_fail: "Anthropic key invalida ou sem billing."

  clickup:
    test: |
      curl -s -o /dev/null -w "%{http_code}" \
        "https://api.clickup.com/api/v2/user" \
        -H "Authorization: ${CLICKUP_API_TOKEN}"
    expect: "200"
    on_fail: "Token ClickUp invalido."
```

### Step 4: Secure Storage

```bash
# Criar diretorio do claw
mkdir -p ~/.openclaw/{claw-name}

# Escrever .env
cat > ~/.openclaw/{claw-name}/.env << 'EOF'
# OpenClaw Credentials — {claw-name}
# Generated: {timestamp}
# WARNING: NEVER commit this file to git

SUPABASE_URL={value}
SUPABASE_ANON_KEY={value}
SUPABASE_SERVICE_ROLE_KEY={value}
ANTHROPIC_API_KEY={value}
OPENAI_API_KEY={value}
CLICKUP_API_TOKEN={value}
EVOLUTION_API_URL={value}
EVOLUTION_API_KEY={value}
EOF

# Proteger
chmod 600 ~/.openclaw/{claw-name}/.env

# Verificar que nao ta em git
git check-ignore ~/.openclaw/{claw-name}/.env || echo "⚠️ ADICIONAR ao .gitignore"
```

### Step 5: Generate Credential Report

```yaml
credential_report:
  claw_name: "{name}"
  collected_at: "{timestamp}"
  required:
    SUPABASE_URL: "✅ validated + connected"
    SUPABASE_ANON_KEY: "✅ validated + connected"
    SUPABASE_SERVICE_ROLE_KEY: "✅ validated + connected"
  optional:
    ANTHROPIC_API_KEY: "✅ validated" | "⏭️ skipped"
    OPENAI_API_KEY: "✅ validated" | "⏭️ skipped"
    CLICKUP_API_TOKEN: "✅ validated" | "⏭️ skipped"
    EVOLUTION_API_URL: "✅ validated" | "⏭️ skipped"
  storage:
    path: "~/.openclaw/{name}/.env"
    permissions: "600 ✅"
    git_ignored: "✅"
  available_integrations:
    supabase: true
    anthropic: true/false
    openai: true/false
    clickup: true/false
    evolution: true/false
```

## Output

```yaml
output:
  file: "~/.openclaw/{claw-name}/.env"
  report: "credential-report.yaml (in memory, passed to next phase)"
  handoff_to: "openclaw-setup (Phase 2)"
```

## Checkpoint

```yaml
checkpoint:
  gate: "CP-CRED"
  criteria:
    - "SUPABASE_URL conecta: SIM"
    - "SUPABASE_ANON_KEY conecta: SIM"
    - "SUPABASE_SERVICE_ROLE_KEY conecta: SIM"
    - ".env salvo com chmod 600: SIM"
    - ".env nao commitado em git: SIM"
  veto: "Credenciais obrigatorias faltando ou invalidas — NAO prosseguir"
  on_pass: "auto-proceed to Setup (openclaw-setup)"
  on_fail: "HALT — resolver credenciais antes de continuar"
```

## Veto Conditions

| ID | Trigger | Action |
|---|---|---|
| VT-CRED-001 | SUPABASE_URL ausente ou invalida | BLOCK — nao prosseguir |
| VT-CRED-002 | Credencial hardcoded em arquivo do squad | FAIL CRITICO |
| VT-CRED-003 | .env sem chmod 600 | BLOCK — corrigir permissoes |
| VT-CRED-004 | .env commitado em git | FAIL CRITICO — remover imediatamente |
| VT-CRED-005 | Service role key == anon key | BLOCK — chaves identicas = erro |
