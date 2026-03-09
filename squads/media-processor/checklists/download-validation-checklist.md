# Checklist: Download Validation (QG-001)

**Quality Gate:** QG-001
**Type:** Blocking — item nao avanca se falhar
**Applies to:** Each downloaded item individually

---

## Checks

### File Existence
- [ ] At least 1 media file exists in item download directory
- [ ] File has supported extension (`.mp4`, `.mkv`, `.webm`, `.m4a`, `.mp3`, `.wav`)
- [ ] File is not a 0-byte placeholder

### File Integrity
- [ ] File size > 1MB (video) or > 100KB (audio)
- [ ] `ffprobe -v quiet -print_format json -show_format "{file}"` returns valid JSON
- [ ] Duration field exists and > 0 seconds
- [ ] Format name recognized by ffprobe

### Platform-Specific
- [ ] **Hotmart:** Lesson metadata matches downloaded file count
- [ ] **Cademi:** Module structure preserved in directory
- [ ] **YouTube:** Video ID matches requested URL

---

## Fail Actions

| Check Failed | Action | Max Retries |
|-------------|--------|-------------|
| No file exists | RETRY download | 2 |
| File too small | WARN, verify manually | 0 |
| Invalid extension | FAIL, report format | 0 |
| ffprobe fails | RETRY download | 2 |
| Duration = 0 | SKIP item, log reason | 0 |

---

## Pass Criteria

**PASS:** All mandatory checks (file existence + integrity) pass.
**WARN:** File size below threshold but ffprobe validates.
**FAIL:** No valid media file after retries.

---

## Manifest Update on Completion

```json
{
  "item_id": "{item}",
  "phases": {
    "download": {
      "status": "completed|failed|skipped",
      "gate": "QG-001",
      "verdict": "PASS|WARN|FAIL",
      "file_path": "{path}",
      "file_size_mb": 0,
      "duration_seconds": 0
    }
  }
}
```
