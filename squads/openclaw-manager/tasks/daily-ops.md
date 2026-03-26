# daily-ops

> **Daily Fleet Operations** | Rotina diaria automatizada

## Purpose

Executar todas as operacoes diarias da frota de claws: health check, sync, alertas, e report consolidado.

## Agent

`@openclaw-chief` (orquestra) → delega para cada especialista

## Trigger

- `*daily-ops` (manual)
- Cron diario 06:00 UTC (automatico)

## Execution

### Step 1: Fleet Health Check (06:00)

```yaml
delegate_to: "@fleet-monitor"
task: "tasks/fleet-health.md"
output: "fleet_report"
```

### Step 2: Skill Inventory Sync (06:05)

```yaml
delegate_to: "@skill-ops"
task: "tasks/skill-inventory.md"
output: "inventory_report"
```

### Step 3: Context Sync (06:10)

```yaml
delegate_to: "openclaw-ops squad"
action: "Sync context de cada claw ativo com Supabase"
per_claw:
  - "Atualizar memoria compartilhada"
  - "Sincronizar tasks ClickUp (se configurado)"
  - "Verificar crons agendados"
```

### Step 4: Alert Processing (06:15)

```yaml
delegate_to: "@fleet-monitor"
action: "Processar alertas pendentes"
checks:
  - "Claws que ficaram offline durante a noite"
  - "Skills com erros acumulados"
  - "Credenciais proximas de expirar (se aplicavel)"
```

### Step 5: Daily Report (06:20)

```
📊 DAILY OPS REPORT — {date}
═══════════════════════════════

Fleet:    {total} claws | {healthy} ok | {degraded} degraded | {offline} offline
Skills:   {total} skills | {active} active | {errors} with errors
Alerts:   {count} new | {resolved} resolved
Sync:     {synced}/{total} contexts synced

Issues requiring attention:
  {list or "None — all clear"}
```

## Output

```yaml
output:
  daily_report: "consolidated report"
  alerts_sent: "{count}"
  next_run: "tomorrow 06:00 UTC"
```
