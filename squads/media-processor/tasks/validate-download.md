# Task: Validate Download (QG-001)

**Status:** Active
**Version:** 1.0
**Last Updated:** 2026-02-23
**Owner:** @media-processor

---

## Purpose

Quality Gate 001 validates downloaded media files to ensure they are complete, valid, and ready for transcription. This gate runs immediately after each download completes and prevents corrupt or incomplete files from entering the pipeline.

**Constitutional Reference:** Article V - Quality First (MUST)

---

## Inputs

| Input | Source | Format | Required |
|-------|--------|--------|----------|
| Download directory path | Pipeline manifest | Absolute path | Yes |
| Expected media type | Source configuration | video \| audio | Yes |
| Expected subtitle presence | Source configuration | boolean | No |
| Item metadata | Processing manifest | JSON object | Yes |

**Example Input:**
```json
{
  "download_dir": "/path/to/sessions/session-123/downloads/item-001",
  "media_type": "video",
  "expect_subtitles": true,
  "item_id": "item-001",
  "item_name": "Module 1 - Introduction"
}
```

---

## Steps

### 1. Locate Media Files

```bash
# Find all media files in download directory
find "$download_dir" -type f \( \
  -iname "*.mp4" -o \
  -iname "*.mkv" -o \
  -iname "*.webm" -o \
  -iname "*.m4a" -o \
  -iname "*.mp3" -o \
  -iname "*.wav" \
) -print
```

**Validation:**
- At least 1 media file exists
- If 0 files found → **RETRY download**
- If multiple files found → Use largest file by size

### 2. Check File Size

```bash
# Get file size in bytes
file_size=$(stat -f%z "$media_file" 2>/dev/null || stat -c%s "$media_file" 2>/dev/null)
```

**Thresholds:**

| Media Type | Minimum Size | Warning Threshold |
|------------|-------------|-------------------|
| Video | 1 MB (1048576 bytes) | 10 MB |
| Audio | 100 KB (102400 bytes) | 1 MB |

**Decision Matrix:**
- Size < minimum → **RETRY download** (likely corrupt/incomplete)
- Size < warning threshold → **WARN** (continue but log warning)
- Size >= warning threshold → **PASS**

### 3. Validate File Extension

```bash
# Extract extension (case-insensitive)
extension="${media_file##*.}"
extension_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
```

**Valid Extensions:**

| Media Type | Valid Extensions |
|------------|-----------------|
| Video | mp4, mkv, webm, avi, mov, flv |
| Audio | m4a, mp3, wav, aac, ogg, flac |

**Validation:**
- Extension must be in valid list for media type
- If invalid → **RETRY download** (wrong format)

### 4. Probe Media Metadata with ffprobe

```bash
# Run ffprobe and capture JSON metadata
ffprobe \
  -v quiet \
  -print_format json \
  -show_format \
  -show_streams \
  "$media_file" > "$download_dir/ffprobe.json" 2>&1
```

**Validation Checks:**

```javascript
// Parse ffprobe output
const metadata = JSON.parse(fs.readFileSync('ffprobe.json', 'utf-8'));

// Required fields
const checks = {
  has_format: metadata.format !== undefined,
  has_duration: metadata.format?.duration > 0,
  has_streams: metadata.streams?.length > 0,
  has_audio: metadata.streams?.some(s => s.codec_type === 'audio'),
  has_video: metadata.streams?.some(s => s.codec_type === 'video')
};

// Decision
if (!checks.has_format || !checks.has_duration || !checks.has_streams) {
  return 'RETRY'; // Corrupt file
}

if (media_type === 'video' && !checks.has_video) {
  return 'WARN'; // Video expected but missing (audio-only file)
}

if (!checks.has_audio) {
  return 'RETRY'; // No audio stream (cannot transcribe)
}
```

**ffprobe Output Example:**
```json
{
  "format": {
    "filename": "lecture.mp4",
    "nb_streams": 2,
    "format_name": "mov,mp4,m4a,3gp,3g2,mj2",
    "duration": "3600.123",
    "size": "524288000",
    "bit_rate": "1162240"
  },
  "streams": [
    {
      "index": 0,
      "codec_type": "video",
      "codec_name": "h264",
      "width": 1920,
      "height": 1080
    },
    {
      "index": 1,
      "codec_type": "audio",
      "codec_name": "aac",
      "sample_rate": "48000",
      "channels": 2
    }
  ]
}
```

### 5. Validate Subtitles (Optional)

If `expect_subtitles: true`:

```bash
# Find subtitle files
find "$download_dir" -type f \( \
  -iname "*.srt" -o \
  -iname "*.vtt" -o \
  -iname "*.ass" -o \
  -iname "*.ssa" \
) -print
```

**Validation:**
- If subtitles expected but not found → **WARN** (continue without subtitles)
- If subtitles found → Validate format (non-empty, valid encoding)

```bash
# Check subtitle file is non-empty and readable
if [ -f "$subtitle_file" ]; then
  lines=$(wc -l < "$subtitle_file")
  if [ "$lines" -lt 5 ]; then
    echo "WARN: Subtitle file too short ($lines lines)"
  fi
fi
```

### 6. Write Validation Report

Create `download-validation.json` in download directory:

```json
{
  "version": "1.0",
  "timestamp": "2026-02-23T10:30:00Z",
  "item_id": "item-001",
  "verdict": "PASS",
  "checks": {
    "files_found": {
      "status": "PASS",
      "count": 1,
      "files": ["lecture.mp4"]
    },
    "file_size": {
      "status": "PASS",
      "size_bytes": 524288000,
      "size_human": "500 MB",
      "threshold_met": true
    },
    "extension": {
      "status": "PASS",
      "extension": "mp4",
      "valid": true
    },
    "ffprobe": {
      "status": "PASS",
      "duration_seconds": 3600.123,
      "has_audio": true,
      "has_video": true,
      "audio_codec": "aac",
      "video_codec": "h264"
    },
    "subtitles": {
      "status": "WARN",
      "expected": true,
      "found": false,
      "message": "Subtitles expected but not found"
    }
  },
  "warnings": [
    "Subtitles expected but not found"
  ],
  "errors": []
}
```

---

## Outputs

| Output | Format | Location | Purpose |
|--------|--------|----------|---------|
| Validation report | JSON | `{download_dir}/download-validation.json` | Detailed check results |
| ffprobe metadata | JSON | `{download_dir}/ffprobe.json` | Media technical details |
| Gate decision | String | Return value | PASS \| RETRY \| SKIP |

---

## Decision Matrix

### PASS (Continue to Transcription)

**All conditions met:**
- ✓ At least 1 media file found
- ✓ File size >= minimum threshold
- ✓ Valid extension for media type
- ✓ ffprobe returns valid metadata
- ✓ Audio stream present
- ✓ Duration > 0

**Action:** Update manifest with `download_validated: true`, proceed to transcription phase.

### WARN (Continue with Warnings)

**Warnings that don't block progress:**
- File size between minimum and warning threshold
- Video stream missing but audio present (for video type)
- Subtitles expected but not found
- Multiple media files found (used largest)

**Action:** Log warnings, update manifest, proceed to transcription phase.

### RETRY (Attempt Download Again)

**Conditions triggering retry:**
- No media files found
- File size < minimum threshold (corrupt/incomplete)
- ffprobe fails (corrupt file)
- No audio stream (cannot transcribe)

**Retry Logic:**
```javascript
if (retry_count < 2) {
  retry_count++;
  // Delete corrupt files
  await fs.remove(download_dir);
  // Retry download task
  return 'RETRY_DOWNLOAD';
} else {
  // Max retries exceeded
  return 'SKIP';
}
```

**Action:** Delete download directory, re-run download task, increment retry counter.

### SKIP (Abandon Item)

**Terminal conditions:**
- 2 retries exhausted
- Source URL invalid/deleted
- Persistent download failure

**Action:** Mark item as `failed` in manifest, log failure reason, continue to next item.

---

## Validation

### Self-Validation Checklist

- [ ] Download validation report created
- [ ] ffprobe metadata saved
- [ ] All 5 checks executed (files, size, extension, ffprobe, subtitles)
- [ ] Decision matrix followed
- [ ] Warnings/errors logged
- [ ] Manifest updated with validation status
- [ ] Pipeline status updated

### Quality Metrics

| Metric | Target | Measured By |
|--------|--------|-------------|
| Validation success rate | >= 95% | Passed items / Total items |
| False positive rate | < 5% | Items passing gate but failing transcription |
| Average validation time | < 10 seconds | Timestamp diff in validation report |

---

## Error Handling

### ffprobe Not Installed

```bash
if ! command -v ffprobe &> /dev/null; then
  echo "ERROR: ffprobe not installed. Install via: brew install ffmpeg"
  exit 1
fi
```

**Recovery:** Install ffmpeg package, retry validation.

### Permission Errors

```bash
if [ ! -r "$media_file" ]; then
  echo "ERROR: Cannot read media file (permission denied)"
  chmod 644 "$media_file" 2>/dev/null || exit 1
fi
```

**Recovery:** Fix permissions, retry validation.

### Disk Space Issues

```bash
# Check available disk space before validation
available=$(df -k "$download_dir" | awk 'NR==2 {print $4}')
if [ "$available" -lt 1048576 ]; then  # Less than 1GB
  echo "WARN: Low disk space ($available KB available)"
fi
```

**Recovery:** Clean old sessions, warn user.

---

## Integration

### Called By

- `download-video.md` task (after download completes)
- `download-audio.md` task (after download completes)
- `retry-failed-downloads.md` task (after retry)

### Calls

- `update-status.md` task (to update pipeline-status.json)
- `transcribe-audio.md` task (on PASS verdict)

### Status Updates

```javascript
// Update pipeline-status.json
{
  "current_phase": "download",
  "current_item": "item-001",
  "phases_status": {
    "download": {
      "status": "validating",
      "items_validated": 5,
      "items_passed": 4,
      "items_failed": 1
    }
  },
  "quality_gates": {
    "QG-001-download": {
      "last_run": "2026-02-23T10:30:00Z",
      "verdict": "PASS",
      "warnings": 1
    }
  }
}
```

---

## Notes

- **Retry strategy:** Exponential backoff not needed (downloads are idempotent)
- **Parallel validation:** Safe to validate multiple items in parallel
- **Subtitle handling:** Subtitles are optional; absence only triggers warning
- **ffprobe timeout:** Add 30-second timeout for large files

---

**Task Execution Mode:** Automated (called by pipeline orchestrator)
**Estimated Duration:** 5-15 seconds per item
**Dependencies:** ffmpeg/ffprobe installed, download directory writable
**Constitutional Compliance:** Quality First (Article V) - MUST validate before proceeding
