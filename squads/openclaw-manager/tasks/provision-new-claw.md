# provision-new-claw

> **Pipeline E2E: Onboarding → Credentials → Setup → Skills → Go-Live**

## Purpose

Provisionar um novo OpenClaw do zero ate operacional. Pipeline completo com gates que impedem pular etapas.

## Agent

`@openclaw-chief` (orquestra) → `@claw-provisioner` (executa phases 0-1.5) → `openclaw-setup` (phases 2-8) → `openclaw-skill-factory` (phase 9) → `@fleet-monitor` (phase 10)

## Trigger

`*provision {claw-name}`

## Execution

### Phase 0: Intake

```yaml
phase_0:
  name: "Intake — Quem e este claw?"
  agent: "@openclaw-chief"
  elicit: true
  questions:
    - "Nome do claw (ex: 'claw-pablo', 'claw-gabi')"
    - "Quem e o dono? (nome completo)"
    - "Qual o proposito principal? (AI COO, assistente, ops, etc)"
    - "Quais integracoes precisa? (Supabase, ClickUp, WhatsApp, etc)"
  output:
    intake_data:
      claw_name: "{name}"
      owner_name: "{name}"
      purpose: "{description}"
      integrations: ["{list}"]
  gate: "Todos os campos preenchidos?"
  on_pass: "→ Phase 1.5"
```

### Phase 1.5: Credential Collection

```yaml
phase_1_5:
  name: "Credential Collection & Validation"
  agent: "@claw-provisioner"
  task: "tasks/credential-collection.md"
  elicit: true
  gate: "CP-CRED — Todas credenciais obrigatorias validadas?"
  on_pass: "→ Phase 2 (delega pra openclaw-setup)"
  on_fail: "HALT — resolver credenciais"
  veto: "VT-OC-007"
```

### Phase 2-8: Setup (Delegated)

```yaml
phase_2_to_8:
  name: "Full Setup — 7 Estacoes da Linha de Montagem"
  delegate_to: "openclaw-setup squad"
  workflow: "wf-openclaw-full-setup.yaml"
  inject:
    - credential_report: "da Phase 1.5"
    - intake_data: "da Phase 0"
    - user_profile_yaml: "da Phase 0.5 (Memory Extraction)"

  # FIX F1: Logica de skip Discovery
  discovery_handling:
    if_profile_score_gte_0_7:
      action: "PULAR Phase 1/Discovery do setup"
      reason: "user-profile.yaml ja esta completo (score >= 0.7)"
      inject: "user-profile.yaml direto na Phase 2/Identity"
    if_profile_score_0_6_to_0_7:
      action: "RODAR Discovery como gap-fill"
      reason: "Perfil parcial — Discovery pergunta SO campos faltantes"
    if_no_profile:
      action: "RODAR Discovery completo (22 perguntas)"
      reason: "Memory Extraction foi pulada — fluxo classico"

  phases:
    - "Phase 1/Discovery (SKIP se profile score >= 0.7, gap-fill se 0.6-0.7)"
    - "Phase 2/Identity"
    - "Phase 3/Security"
    - "Phase 4/Memory"
    - "Phase 5/Capabilities"
    - "Phase 6/Immune System"
    - "Phase 7/Validation"
  gate: "Setup completo — SETUP-REPORT.md gerado?"
  on_pass: "→ Phase 9 (auto-handoff)"
  on_fail: "Resolver com openclaw-setup"
```

### Phase 9: First Skills

```yaml
phase_9:
  name: "First Skills — Skills iniciais baseadas no perfil"
  delegate_to: "openclaw-skill-factory squad"
  agent_bridge: "@skill-ops"
  input:
    from_setup: "SOUL.md + user-profile.yaml + capabilities list"
  actions:
    - "Identificar 2-3 skills iniciais baseadas no perfil do dono"
    - "Criar cada skill via skill-factory pipeline"
    - "Deployar no VPS"
    - "Registrar no skill registry"
  gate: "Pelo menos 1 skill ativa?"
  on_pass: "→ Phase 10"
  on_fail: "Skills podem ser adicionadas depois — nao bloqueia go-live"
  note: "Skills sao opcionais no go-live — claw pode operar sem elas"
```

### Phase 10: Go-Live

```yaml
phase_10:
  name: "Go-Live — Registrar e ativar monitoramento"
  agent: "@fleet-monitor"
  actions:
    - action: "Registrar no fleet registry"
      details: |
        INSERT into openclaw_fleet:
        - claw_name, owner_name, status='active'
        - supabase_project, setup_completed_at
        - skills_count, created_at

    - action: "Executar primeiro health check"
      details: "Rodar checklist completo do fleet-monitor"

    - action: "Ativar monitoramento continuo"
      details: "Adicionar ao cron de health check diario"

    - action: "Gerar provisioning report"
      details: |
        PROVISIONING REPORT — {claw-name}
        ├── Owner: {name}
        ├── Purpose: {description}
        ├── Credentials: {count} validated
        ├── Setup: Complete (7/7 phases)
        ├── Skills: {count} active
        ├── Fleet Registry: Registered
        ├── Health Check: {status}
        ├── Monitoring: Active (daily 06:00)
        └── Go-Live: {timestamp}

  gate: "Fleet registry entry exists AND first health check passed?"
  on_pass: "✅ CLAW OPERACIONAL"
  on_fail: "Resolver issues antes de declarar go-live"
```

## Output

```yaml
output:
  files:
    - "~/.openclaw/{claw-name}/.env (credentials)"
    - "SOUL.md, USER.md, IDENTITY.md, etc (via setup)"
    - "SETUP-REPORT.md (via setup)"
    - "PROVISIONING-REPORT.md (final)"
  registry:
    - "openclaw_fleet entry"
    - "openclaw_skills entries (if skills created)"
  monitoring:
    - "Daily health check activated"
```

## Veto Summary

| Gate | Veto | What Happens |
|------|------|-------------|
| Phase 0 | Dados incompletos | Pergunta novamente |
| Phase 1.5 | Credenciais invalidas | HALT total |
| Phase 2-8 | Setup incompleto | Resolver com setup squad |
| Phase 9 | Skills falharam | NAO bloqueia (opcional) |
| Phase 10 | Health check falhou | Resolver antes de go-live |
