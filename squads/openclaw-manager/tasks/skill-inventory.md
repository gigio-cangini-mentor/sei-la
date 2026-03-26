# skill-inventory

> **Skill Registry Sync** | Inventario centralizado de todas as skills

## Purpose

Manter inventario atualizado de todas as skills deployadas em todos os claws. Fonte da verdade para o que esta rodando onde.

## Agent

`@skill-ops`

## Trigger

- `*inventory` (manual — listar tudo)
- `*inventory {claw-name}` (manual — skills de um claw)
- Post-deploy automatico (apos skill-factory deployar)

## Execution

### Step 1: Query Registry

```sql
SELECT s.skill_name, s.skill_type, s.status, s.version,
       s.deployed_at, s.last_execution, s.error_count,
       f.claw_name, f.owner_name
FROM openclaw_skills s
JOIN openclaw_fleet f ON s.claw_id = f.claw_id
WHERE f.status = 'active'
ORDER BY f.claw_name, s.skill_name;
```

### Step 2: Generate Inventory Report

```
🛠️ SKILL INVENTORY — {timestamp}
═══════════════════════════════════

claw-pablo (3 skills):
  ├── flight-monitor    | heartbeat | v1.2 | ✅ active | last: 2h ago
  ├── daily-digest      | cron      | v1.0 | ✅ active | last: 6h ago
  └── task-creator      | on-demand | v1.1 | ✅ active | last: 1d ago

claw-gabi (2 skills):
  ├── content-scheduler | cron      | v1.0 | ✅ active | last: 12h ago
  └── meeting-prep      | on-demand | v0.9 | ⚠️ 3 errors | last: 3d ago

TOTAL: 5 skills across 2 claws | 4 healthy | 1 with errors
```

### Step 3: Detect Anomalies

```yaml
anomaly_checks:
  - "Skill com error_count > 10 em 24h → FLAG"
  - "Skill sem execucao > 30 dias → FLAG como idle"
  - "Skill com versao < claw minimum → FLAG como outdated"
  - "Claw ativo com 0 skills → WARNING"
```

## Output

```yaml
output:
  inventory_report: "table format (console)"
  anomalies: "{list if any}"
  total_skills: "{count}"
  healthy_skills: "{count}"
```
