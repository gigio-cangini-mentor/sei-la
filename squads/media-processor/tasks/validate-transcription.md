# Task: Validate Transcription (QG-002)

**Status:** Active
**Version:** 1.0
**Last Updated:** 2026-02-23
**Owner:** @media-processor

---

## Purpose

Quality Gate 002 validates transcription outputs to ensure they are complete, readable, and contain meaningful content. This gate runs immediately after transcription completes and prevents low-quality or incomplete transcriptions from entering the sculpting phase.

**Constitutional Reference:** Article V - Quality First (MUST)

---

## Inputs

| Input | Source | Format | Required |
|-------|--------|--------|----------|
| Transcription directory | Pipeline manifest | Absolute path | Yes |
| Item metadata | Processing manifest | JSON object | Yes |
| Expected language | Source configuration | ISO 639-1 code | No |
| Minimum word count | Configuration | Integer | No (default: 100) |

**Example Input:**
```json
{
  "transcription_dir": "/path/to/sessions/session-123/transcriptions/item-001",
  "item_id": "item-001",
  "item_name": "Module 1 - Introduction",
  "expected_language": "pt",
  "min_word_count": 100
}
```

---

## Steps

### 1. Locate Transcription Artifacts

Expected file structure:
```
transcriptions/item-001/
├── transcription_clean.md       # Required: cleaned transcription
├── transcription_raw.txt        # Optional: raw Whisper output
├── chunks/                      # Required: chunked segments
│   ├── chunk_001.md
│   ├── chunk_002.md
│   └── ...
├── stats.json                   # Optional: transcription statistics
└── metadata.json                # Optional: Whisper metadata
```

**Validation:**
```bash
# Check required files exist
required_files=(
  "transcription_clean.md"
  "chunks"
)

for file in "${required_files[@]}"; do
  if [ ! -e "$transcription_dir/$file" ]; then
    echo "ERROR: Required file missing: $file"
    exit 1
  fi
done
```

### 2. Validate transcription_clean.md

#### Check File Exists and Non-Empty

```bash
clean_file="$transcription_dir/transcription_clean.md"

if [ ! -f "$clean_file" ]; then
  echo "ERROR: transcription_clean.md not found"
  return "RETRY"
fi

# Check file size > 0 bytes
file_size=$(stat -f%z "$clean_file" 2>/dev/null || stat -c%s "$clean_file" 2>/dev/null)
if [ "$file_size" -eq 0 ]; then
  echo "ERROR: transcription_clean.md is empty"
  return "RETRY"
fi
```

#### Count Words

```bash
# Count words in clean transcription
word_count=$(wc -w < "$clean_file" | tr -d ' ')

# Apply threshold (default: 100 words)
min_words=${min_word_count:-100}

if [ "$word_count" -lt "$min_words" ]; then
  echo "WARN: Low word count ($word_count words, expected >= $min_words)"
  echo "Possible causes: silent video, corrupt audio, wrong language"
fi
```

**Word Count Thresholds:**

| Duration | Minimum Words | Warning Threshold |
|----------|--------------|-------------------|
| < 5 min | 50 | 200 |
| 5-30 min | 100 | 500 |
| 30-60 min | 500 | 2000 |
| > 60 min | 1000 | 5000 |

**Decision Matrix:**
- Word count >= warning threshold → **PASS**
- Word count >= minimum but < warning → **WARN** (continue)
- Word count < minimum → **RETRY** (likely transcription failure)
- Word count == 0 → **RETRY** (complete failure)

#### Check Content Quality

```bash
# Sample first 500 characters for quality check
sample=$(head -c 500 "$clean_file")

# Check for signs of poor transcription
if echo "$sample" | grep -qE "\[BLANK_AUDIO\]|\[INAUDIBLE\]|\[NOISE\]"; then
  echo "WARN: Transcription contains quality markers"
fi

# Check for excessive repetition (same phrase 5+ times)
repeated_phrases=$(echo "$sample" | tr ' ' '\n' | sort | uniq -c | sort -rn | head -1 | awk '{print $1}')
if [ "$repeated_phrases" -gt 10 ]; then
  echo "WARN: Excessive repetition detected (possible transcription loop)"
fi
```

**Quality Indicators:**

| Indicator | Check | Action |
|-----------|-------|--------|
| Blank audio markers | `grep "\[BLANK_AUDIO\]"` | WARN (silent segments expected) |
| Excessive repetition | Same word/phrase 10+ times | WARN (possible loop) |
| Non-text characters | `grep -P "[^\p{L}\p{N}\p{P}\p{Z}]"` | WARN (encoding issue) |
| Language mismatch | Detect language ≠ expected | WARN (wrong language model) |

### 3. Validate Chunks Directory

```bash
chunks_dir="$transcription_dir/chunks"

# Check directory exists
if [ ! -d "$chunks_dir" ]; then
  echo "ERROR: chunks/ directory not found"
  return "RETRY"
fi

# Count chunk files
chunk_count=$(find "$chunks_dir" -type f -name "chunk_*.md" | wc -l | tr -d ' ')

if [ "$chunk_count" -eq 0 ]; then
  echo "ERROR: No chunk files found"
  return "RETRY"
fi

if [ "$chunk_count" -lt 2 ]; then
  echo "WARN: Only 1 chunk found (expected multiple for normal-length content)"
fi
```

**Chunk Validation:**
```javascript
// For each chunk file
const chunkFiles = fs.readdirSync(chunksDir)
  .filter(f => f.startsWith('chunk_') && f.endsWith('.md'))
  .sort();

let totalChunkWords = 0;
const emptyChunks = [];

for (const chunkFile of chunkFiles) {
  const content = fs.readFileSync(path.join(chunksDir, chunkFile), 'utf-8');
  const words = content.split(/\s+/).length;

  totalChunkWords += words;

  if (words < 10) {
    emptyChunks.push(chunkFile);
  }
}

// Validation
if (emptyChunks.length > chunkFiles.length * 0.5) {
  console.warn(`WARN: ${emptyChunks.length} chunks are nearly empty`);
}

// Chunk word count should match clean file word count (within 5%)
const cleanWords = fs.readFileSync(cleanFile, 'utf-8').split(/\s+/).length;
const wordDiff = Math.abs(totalChunkWords - cleanWords);
const diffPercent = (wordDiff / cleanWords) * 100;

if (diffPercent > 5) {
  console.warn(`WARN: Chunk word count mismatch (${diffPercent.toFixed(1)}% difference)`);
}
```

### 4. Validate stats.json (Optional)

```bash
stats_file="$transcription_dir/stats.json"

if [ -f "$stats_file" ]; then
  # Validate JSON syntax
  if ! jq empty "$stats_file" 2>/dev/null; then
    echo "WARN: stats.json is malformed JSON"
  else
    # Extract and validate statistics
    word_count_stats=$(jq -r '.word_count' "$stats_file")
    duration=$(jq -r '.duration_seconds' "$stats_file")

    # Check words per minute (normal speech: 130-160 WPM)
    if [ "$duration" -gt 0 ]; then
      wpm=$(echo "scale=2; $word_count_stats * 60 / $duration" | bc)
      echo "Words per minute: $wpm"

      if (( $(echo "$wpm < 50" | bc -l) )); then
        echo "WARN: Very low WPM ($wpm), possible long pauses or slow speech"
      fi

      if (( $(echo "$wpm > 250" | bc -l) )); then
        echo "WARN: Very high WPM ($wpm), possible transcription error"
      fi
    fi
  fi
else
  echo "WARN: stats.json not found (optional, but recommended)"
fi
```

**Expected stats.json Schema:**
```json
{
  "version": "1.0",
  "item_id": "item-001",
  "transcription_started": "2026-02-23T10:35:00Z",
  "transcription_completed": "2026-02-23T10:45:00Z",
  "duration_seconds": 3600,
  "word_count": 7800,
  "chunk_count": 15,
  "language_detected": "pt",
  "model_used": "whisper-large-v3",
  "confidence_avg": 0.89
}
```

### 5. Check Language Detection (Optional)

If `expected_language` provided:

```bash
# Use simple heuristic: check for language-specific characters/words
if [ "$expected_language" = "pt" ]; then
  # Portuguese indicators: ã, õ, ç, common words
  pt_indicators=$(grep -oE "(ção|não|são|também|português)" "$clean_file" | wc -l)

  if [ "$pt_indicators" -lt 5 ]; then
    echo "WARN: Few Portuguese indicators found, possible language mismatch"
  fi
fi

# Alternative: use external language detection tool
# lang_detected=$(python3 -c "from langdetect import detect; print(detect(open('$clean_file').read()))")
```

### 6. Write Validation Report

Create `transcription-validation.json`:

```json
{
  "version": "1.0",
  "timestamp": "2026-02-23T10:50:00Z",
  "item_id": "item-001",
  "verdict": "PASS",
  "checks": {
    "clean_file": {
      "status": "PASS",
      "exists": true,
      "size_bytes": 52428,
      "word_count": 7800,
      "min_threshold": 500,
      "threshold_met": true
    },
    "chunks": {
      "status": "PASS",
      "directory_exists": true,
      "chunk_count": 15,
      "total_words": 7850,
      "empty_chunks": 0,
      "word_count_match": true
    },
    "stats": {
      "status": "PASS",
      "exists": true,
      "valid_json": true,
      "words_per_minute": 130,
      "wpm_normal": true
    },
    "language": {
      "status": "PASS",
      "expected": "pt",
      "indicators_found": 45,
      "likely_match": true
    },
    "quality": {
      "status": "WARN",
      "blank_markers": 3,
      "repetition_score": 2.1,
      "encoding_issues": false
    }
  },
  "warnings": [
    "3 blank audio markers found (silent segments)",
    "stats.json not found (optional)"
  ],
  "errors": [],
  "metadata": {
    "validation_duration_ms": 1234,
    "validator_version": "1.0"
  }
}
```

---

## Outputs

| Output | Format | Location | Purpose |
|--------|--------|----------|---------|
| Validation report | JSON | `{transcription_dir}/transcription-validation.json` | Detailed check results |
| Gate decision | String | Return value | PASS \| RETRY \| SKIP |
| Quality metrics | JSON | Embedded in report | WPM, chunk distribution, etc. |

---

## Decision Matrix

### PASS (Continue to Sculpting)

**All conditions met:**
- ✓ `transcription_clean.md` exists and non-empty
- ✓ Word count >= minimum threshold
- ✓ `chunks/` directory exists with >= 1 chunk
- ✓ Chunk word count matches clean file (within 5%)
- ✓ No critical quality issues

**Action:** Update manifest with `transcription_validated: true`, proceed to sculpting phase.

### WARN (Continue with Warnings)

**Warnings that don't block progress:**
- Word count below warning threshold but above minimum
- stats.json missing (optional)
- Few language indicators (but content seems valid)
- Blank audio markers present (expected for silent segments)
- Only 1-2 chunks (short content)

**Action:** Log warnings, update manifest, proceed to sculpting phase.

### RETRY (Attempt Transcription Again)

**Conditions triggering retry:**
- Word count < minimum threshold (likely failure)
- No chunks found or chunks directory missing
- Chunk word count mismatch > 20% (chunking failed)
- Excessive repetition (transcription loop)
- Empty or corrupt clean file

**Retry Strategy:**
```javascript
// Model degradation: try smaller/faster model
const models = ['large-v3', 'medium', 'small', 'base'];
const currentModelIndex = models.indexOf(currentModel);

if (retry_count === 0 && currentModelIndex < models.length - 1) {
  // First retry: downgrade model
  nextModel = models[currentModelIndex + 1];
  return { action: 'RETRY_TRANSCRIPTION', model: nextModel };
}

if (retry_count === 1) {
  // Second retry: retry chunking only (if clean file is OK)
  if (cleanFileValid && chunksInvalid) {
    return { action: 'RETRY_CHUNKING_ONLY' };
  }
}

// Max retries exceeded
return { action: 'SKIP' };
```

**Retry Logic:**
1. **Retry 1:** Downgrade Whisper model (large → medium)
2. **Retry 2:** Retry chunking step only (if clean file OK)
3. **After 2 retries:** SKIP item

### SKIP (Abandon Item)

**Terminal conditions:**
- 2 retries exhausted
- Audio file corrupt (detected in previous gate)
- Persistent transcription failure (0 words after retry)

**Action:** Mark item as `failed` in manifest, log failure reason, continue to next item.

---

## Validation

### Self-Validation Checklist

- [ ] Transcription validation report created
- [ ] All 4 core checks executed (clean file, word count, chunks, stats)
- [ ] Decision matrix followed
- [ ] Warnings/errors logged
- [ ] Manifest updated with validation status
- [ ] Pipeline status updated

### Quality Metrics

| Metric | Target | Measured By |
|--------|--------|-------------|
| Validation success rate | >= 90% | Passed items / Total items |
| False positive rate | < 10% | Items passing but producing poor masterpieces |
| Average validation time | < 5 seconds | Timestamp diff in validation report |
| Retry success rate | >= 50% | Retries passing / Total retries |

---

## Error Handling

### File Not Found Errors

```bash
if [ ! -f "$clean_file" ]; then
  echo "ERROR: transcription_clean.md not found"
  echo "Expected: $clean_file"
  echo "Check transcription task completed successfully"
  return "RETRY"
fi
```

**Recovery:** Check transcription logs, retry transcription task.

### Encoding Issues

```bash
# Check file encoding is UTF-8
encoding=$(file -b --mime-encoding "$clean_file")

if [ "$encoding" != "utf-8" ] && [ "$encoding" != "us-ascii" ]; then
  echo "WARN: Non-UTF-8 encoding detected: $encoding"
  # Convert to UTF-8
  iconv -f "$encoding" -t UTF-8 "$clean_file" > "${clean_file}.utf8"
  mv "${clean_file}.utf8" "$clean_file"
fi
```

**Recovery:** Convert to UTF-8, re-validate.

### JSON Parse Errors

```bash
# Validate stats.json syntax
if ! jq empty "$stats_file" 2>/dev/null; then
  echo "ERROR: stats.json is malformed"
  # Try to repair or regenerate
  echo '{}' > "$stats_file"  # Fallback to empty object
fi
```

**Recovery:** Regenerate stats.json from clean file if possible.

---

## Integration

### Called By

- `transcribe-audio.md` task (after transcription completes)
- `retry-failed-transcriptions.md` task (after retry)

### Calls

- `update-status.md` task (to update pipeline-status.json)
- `sculpt-transcript.md` task (on PASS verdict)
- `transcribe-audio.md` task (on RETRY with model downgrade)

### Status Updates

```javascript
// Update pipeline-status.json
{
  "current_phase": "transcription",
  "current_item": "item-001",
  "phases_status": {
    "transcription": {
      "status": "validating",
      "items_validated": 8,
      "items_passed": 7,
      "items_failed": 1,
      "items_retried": 2
    }
  },
  "quality_gates": {
    "QG-002-transcription": {
      "last_run": "2026-02-23T10:50:00Z",
      "verdict": "PASS",
      "warnings": 2,
      "word_count": 7800,
      "chunks": 15
    }
  }
}
```

---

## Advanced Validation (Optional)

### Semantic Quality Check

For high-value content, optionally run semantic validation:

```javascript
// Check for coherence (simple heuristic: sentence count vs word count)
const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
const words = content.split(/\s+/).length;
const avgWordsPerSentence = words / sentences.length;

// Normal speech: 15-25 words per sentence
if (avgWordsPerSentence < 5) {
  console.warn('WARN: Very short sentences (fragmented transcription)');
}
if (avgWordsPerSentence > 50) {
  console.warn('WARN: Very long sentences (missing punctuation)');
}
```

### Confidence Score Analysis

If Whisper provides confidence scores:

```javascript
// Parse metadata.json for per-segment confidence
const metadata = JSON.parse(fs.readFileSync('metadata.json', 'utf-8'));
const confidenceScores = metadata.segments.map(s => s.confidence);

const avgConfidence = confidenceScores.reduce((a, b) => a + b) / confidenceScores.length;
const lowConfSegments = confidenceScores.filter(c => c < 0.5).length;

if (avgConfidence < 0.7) {
  console.warn(`WARN: Low average confidence (${avgConfidence.toFixed(2)})`);
}

if (lowConfSegments > confidenceScores.length * 0.2) {
  console.warn(`WARN: ${lowConfSegments} segments with low confidence`);
}
```

---

## Notes

- **Word count is primary quality indicator** - More reliable than file size or duration
- **Chunks validation prevents pipeline breaks** - Sculptor expects valid chunks
- **Retry with model downgrade saves cost** - smaller models still useful for clear audio
- **Language detection is optional** - Only needed for multi-language sources
- **stats.json recommended but not required** - Provides useful metrics for monitoring

---

**Task Execution Mode:** Automated (called by pipeline orchestrator)
**Estimated Duration:** 2-10 seconds per item
**Dependencies:** jq (for JSON parsing), bc (for calculations), basic UNIX tools
**Constitutional Compliance:** Quality First (Article V) - MUST validate before sculpting
