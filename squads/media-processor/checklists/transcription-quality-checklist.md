# Checklist: Transcription Quality (QG-002)

**Quality Gate:** QG-002
**Type:** Blocking — item nao avanca se falhar
**Applies to:** Each transcribed item individually

---

## Checks

### Output Files
- [ ] `transcription.json` exists (raw Whisper output)
- [ ] `transcription_clean.md` exists and is non-empty
- [ ] `chunks/` directory exists and has >= 1 file

### Content Quality
- [ ] Word count > 100 words (minimum viable transcription)
- [ ] Word count > 50 words per minute of audio (quality threshold)
- [ ] No excessive repetition (same sentence > 5x = likely Whisper hallucination)
- [ ] Text contains actual words, not just timestamps or noise markers

### Language
- [ ] Detected language matches expected language (from user config or source metadata)
- [ ] If multilingual content: primary language covers > 70% of text

### Chunks
- [ ] Each chunk file is non-empty
- [ ] Chunks follow naming convention: `chunk_NNN.md`
- [ ] Total chunk content approximately matches `transcription_clean.md` length

---

## Fail Actions

| Check Failed | Action | Max Retries |
|-------------|--------|-------------|
| No output files | FAIL, reprocess with same model | 1 |
| Word count < 100 | WARN, likely silence or corrupt audio | 0 |
| Hallucination detected | RETRY with `--condition_on_previous_text False` | 1 |
| Language mismatch | RETRY with explicit language flag `-l {lang}` | 1 |
| Empty chunks | FAIL, re-run chunking only | 1 |

---

## Pass Criteria

**PASS:** Output files exist, word count adequate, no hallucination.
**WARN:** Low word count but files valid (short audio source).
**FAIL:** Missing output files or hallucination after retry.

---

## Whisper Model Fallback Chain

If transcription fails or OOM:
1. `medium` (default) → retry
2. `small` → retry
3. `base` → final attempt
4. SKIP item if base also fails

---

## Manifest Update on Completion

```json
{
  "item_id": "{item}",
  "phases": {
    "transcribe": {
      "status": "completed|failed|skipped",
      "gate": "QG-002",
      "verdict": "PASS|WARN|FAIL",
      "model_used": "medium|small|base",
      "word_count": 0,
      "chunk_count": 0,
      "duration_seconds": 0,
      "language_detected": "pt"
    }
  }
}
```
