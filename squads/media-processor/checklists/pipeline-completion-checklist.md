# Checklist: Pipeline Completion (QG-003)

**Quality Gate:** QG-003
**Type:** Blocking — pipeline nao pode ser marcado como completo sem passar
**Applies to:** Entire pipeline session

---

## Checks

### Item Accounting
- [ ] `items_completed + items_skipped + items_failed == total_items`
- [ ] No items stuck in `running` status (indicates crash)
- [ ] No items stuck in `pending` status after pipeline run

### Success Rate
- [ ] `items_completed / total_items >= 0.5` (at least 50% success rate)
- [ ] `items_failed <= 0.3 * total_items` (max 30% failure rate)
- [ ] If 100% failed → pipeline verdict = FAILED

### Output Integrity
- [ ] For each completed item: expected output files exist on filesystem
- [ ] Manifest `file_path` entries point to real files
- [ ] No orphan files (files not tracked in manifest)

### Masterpiece Existence (if sculpt phase ran)
- [ ] Each item that completed sculpt has a `*-masterpiece.md` file
- [ ] Masterpiece files are non-empty
- [ ] Masterpiece word count > 500 (non-trivial content)

### Knowledge Base (if KB phase ran)
- [ ] Knowledge base directory exists
- [ ] At least 1 knowledge artifact generated
- [ ] Cross-references between items present

---

## Verdicts

| Condition | Verdict | Action |
|-----------|---------|--------|
| All items completed, all gates passed | **PASS** | Mark pipeline completed |
| >= 80% completed, minor warnings | **PASS with WARNINGS** | Mark completed, list warnings |
| 50-79% completed | **PARTIAL** | Mark partial, list failures |
| < 50% completed | **FAIL** | Mark failed, full error report |
| 0% completed | **CRITICAL FAIL** | Investigate systemic issue |

---

## Final Summary Format

```
Pipeline Complete: {session_id}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source:     {platform} - {source_name}
Duration:   {total_time}
Verdict:    {PASS|PARTIAL|FAIL}

Items:      {completed}/{total} completed
            {failed} failed, {skipped} skipped

Phases:
  Download:    {N} OK, {M} failed
  Transcribe:  {N} OK, {M} failed
  Sculpt:      {N} OK, {M} skipped
  Distill:     {N} OK, {M} skipped
  KB Build:    {status}

Output:     {session_dir}/
Dashboard:  open squads/media-processor/dashboard/index.html
```

---

## Manifest Final State

```json
{
  "session_id": "mp-YYYY-MMDD-NNN",
  "pipeline": {
    "status": "completed|partial|failed",
    "verdict": "PASS|PARTIAL|FAIL",
    "started_at": "ISO8601",
    "completed_at": "ISO8601",
    "duration_seconds": 0
  },
  "statistics": {
    "total_items": 0,
    "items_completed": 0,
    "items_failed": 0,
    "items_skipped": 0,
    "total_word_count": 0,
    "total_masterpieces": 0
  }
}
```
