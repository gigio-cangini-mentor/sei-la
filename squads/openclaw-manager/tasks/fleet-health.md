# fleet-health

> **Multi-Claw Health Check** | Monitora toda a frota

## Purpose

Executar health check de todos os claws ativos no fleet registry. Gerar report consolidado e disparar alertas.

## Agent

`@fleet-monitor`

## Trigger

- `*health-check` (manual — todos os claws)
- `*health-check {claw-name}` (manual — claw especifico)
- Cron diario 06:00 UTC (automatico)

## Execution

### Step 1: Query Fleet Registry

```sql
SELECT claw_id, claw_name, owner_name, status, last_health_check
FROM openclaw_fleet
WHERE status IN ('active', 'degraded')
ORDER BY claw_name;
```

### Step 2: Per-Claw Health Check

Para cada claw ativo:

| # | Check | Method | Timeout | Critical? |
|---|-------|--------|---------|-----------|
| 1 | Gateway reachable | SSH ping / HTTP endpoint | 10s | YES |
| 2 | Agent loop running | Process check | 5s | YES |
| 3 | Skills responding | Query agent status | 15s | NO |
| 4 | Memory accessible | Read test | 5s | NO |
| 5 | Last interaction | Timestamp check | instant | NO |

### Step 3: Update Fleet Registry

```sql
UPDATE openclaw_fleet
SET last_health_check = NOW(),
    last_health_status = '{status}'
WHERE claw_id = '{id}';
```

### Step 4: Generate Report

```
📡 FLEET HEALTH REPORT — {timestamp}
═══════════════════════════════════════

| Claw        | Owner   | Status  | Skills | Last Check | Last Use  |
|-------------|---------|---------|--------|------------|-----------|
| claw-pablo  | Pablo   | 🟢 OK  | 3/3    | just now   | 2h ago    |
| claw-gabi   | Gabi    | 🟡 DEG | 2/3    | just now   | 1d ago    |
| claw-carlos | Carlos  | 🔴 OFF | 0/2    | just now   | 5d ago    |

Summary: 3 claws | 1 healthy | 1 degraded | 1 offline
Alerts: 1 critical (claw-carlos offline)
```

### Step 5: Trigger Alerts (if needed)

Per alert rules defined in `fleet-monitor.md`.

## Output

```yaml
output:
  fleet_report: "table format (console)"
  registry_updated: true
  alerts_triggered: "{count}"
```
