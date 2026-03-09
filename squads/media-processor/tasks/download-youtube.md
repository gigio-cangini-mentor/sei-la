# Task: Download from YouTube

**Version:** 1.0.0
**Status:** Active
**Owner:** @downloader (Downloader)
**Created:** 2026-02-23
**Last Updated:** 2026-02-23

---

## Purpose

Download videos or playlists from YouTube using the `video-transcriber` CLI tool. **IMPORTANT:** The `video-transcriber process` command performs download + transcription + cleanup + chunking in a single step, making it the optimal choice for YouTube content. Handles single videos and playlists with automatic quality selection and transcription integration.

---

## Executor Type

**Agent:** @downloader (Downloader)
**Mode:** YOLO (deterministic download + transcription process)
**Estimated Duration:** 10-90 minutes (depends on video length and playlist size)
**Complexity:** STANDARD (score: 11/20)

---

## Inputs

| Input | Type | Required | Source | Example |
|-------|------|----------|--------|---------|
| `source_url` | string | YES | Classification or user | "https://youtube.com/watch?v=xxx" |
| `source_type` | string | YES | Classification | "youtube" or "youtube_playlist" |
| `output_dir` | string | NO | Default or user | "<PROJECT_ROOT>/squads/media-processor/transcriptions/youtube/" |
| `model` | string | NO | User preference | "medium" (default), "small", "large" |
| `language` | string | NO | User preference | "pt" (default), "en", "auto" |
| `quality` | string | NO | User preference | "best" (default), "1080p", "720p" |
| `keep_video` | boolean | NO | User preference | false (default, saves space) |
| `dry_run` | boolean | NO | Testing flag | false (default) |

---

## Preconditions

- [ ] `video-transcriber` CLI is installed at `<PROJECT_ROOT>/tools/video-transcriber/.venv/bin/video-transcriber`
- [ ] Virtual environment is activated or path is absolute
- [ ] Output directory is writable
- [ ] Sufficient disk space (video downloads can be large)
- [ ] FFmpeg is installed (required for audio extraction)
- [ ] Whisper model is available (downloaded on first run)

---

## Steps

### Step 1: Validate Prerequisites

```bash
# Check video-transcriber installation
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber --version

# Check FFmpeg
which ffmpeg

# Check disk space
df -h {output_dir}
```

**Expected Output:**
```
video-transcriber 1.0.0
/opt/homebrew/bin/ffmpeg
Filesystem      Size   Used  Avail Capacity
/dev/disk1     500Gi  250Gi  248Gi    51%
```

**Action:**
1. Verify video-transcriber is installed
2. Verify FFmpeg is available
3. Check available disk space (warn if < 5GB)
4. If any prerequisite missing, halt and notify user

**Validation:**
- [ ] video-transcriber executable exists
- [ ] FFmpeg is available
- [ ] Disk space >= 5GB

---

### Step 2: Get Video/Playlist Metadata

For single video:
```bash
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber info "{source_url}"
```

For playlist:
```bash
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber playlist-info "{source_url}"
```

**Expected Output (single video):**
```json
{
  "video_id": "dQw4w9WgXcQ",
  "title": "Rick Astley - Never Gonna Give You Up",
  "duration_seconds": 212,
  "duration_formatted": "03:32",
  "estimated_size_mb": 15,
  "has_captions": true,
  "language": "en"
}
```

**Expected Output (playlist):**
```json
{
  "playlist_id": "PLxxxxxxxxxx",
  "title": "Marketing Digital 2024",
  "total_videos": 15,
  "total_duration_minutes": 180,
  "estimated_size_gb": 2.5,
  "videos": [
    {
      "video_id": "xxx",
      "title": "Aula 1 - Introdução",
      "duration_seconds": 600
    }
  ]
}
```

**Action:**
1. Run info command to retrieve metadata
2. Parse JSON output
3. Display summary to user:
   - Video/playlist title
   - Total duration
   - Estimated download size
   - Caption availability
4. Ask for confirmation if playlist > 10 videos or size > 5GB

**Output:** Video/playlist metadata object

---

### Step 3: Construct Process Command

**IMPORTANT:** The `process` command does download + transcription + cleanup in one step.

#### Single Video:

```bash
cd <PROJECT_ROOT>/tools/video-transcriber

# Full command
.venv/bin/video-transcriber process "{source_url}" \
  -o "{output_dir}" \
  -m {model} \
  -l {language} \
  --quality {quality}
```

#### Playlist (Batch Mode):

```bash
cd <PROJECT_ROOT>/tools/video-transcriber

# Batch playlist command
.venv/bin/video-transcriber batch-playlist "{source_url}" \
  -o "{output_dir}" \
  -m {model} \
  -l {language} \
  --quality {quality}
```

**Action:**
1. Determine command type (process vs batch-playlist)
2. Build command string with all flags
3. Log full command to `.aios-core/logs/media-processor/download-youtube.log`
4. Display command to user for review
5. Await confirmation if not in YOLO mode

**Output:** Complete CLI command string

---

### Step 4: Execute Download + Transcription

**Single Video:**
```bash
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber process "{source_url}" -o "{output_dir}" -m medium -l pt
```

**Playlist:**
```bash
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber batch-playlist "{source_url}" -o "{output_dir}" -m medium -l pt
```

**Action:**
1. Execute process command
2. Monitor progress (video-transcriber shows progress bars):
   - Download progress
   - Transcription progress
   - Cleanup status
3. Log all output to `.aios-core/logs/media-processor/download-youtube.log`
4. Handle interruptions (Ctrl+C) gracefully:
   - Save partial download state
   - Offer resume option
5. Track progress in real-time

**What video-transcriber does automatically:**
1. **Download:** Uses yt-dlp to download video in specified quality
2. **Extract Audio:** Uses FFmpeg to extract audio from video
3. **Transcribe:** Uses Whisper to transcribe audio
4. **Clean:** Generates cleaned transcript
5. **Chunk:** Splits transcript into semantic chunks
6. **Cleanup:** Deletes video file (unless `--keep-video` flag used)

**Expected Output Structure:**
```
{output_dir}/
├── {VideoTitle}/
│   ├── original.txt          # Raw Whisper output
│   ├── cleaned.txt           # Cleaned transcript
│   ├── chunks/               # Semantic chunks
│   │   ├── chunk_001.txt
│   │   ├── chunk_002.txt
│   │   └── ...
│   ├── metadata.json         # Video metadata + transcription stats
│   └── {VideoTitle}.mp4      # (only if --keep-video flag used)
└── ...
```

**Progress Tracking:**
- Current video (for playlists)
- Download progress (%)
- Transcription progress (%)
- ETA

---

### Step 5: Verify Output

```bash
# Check transcription files
find "{output_dir}" -name "cleaned.txt" | wc -l
find "{output_dir}" -name "metadata.json" | wc -l
find "{output_dir}" -type d -name "chunks" | wc -l
```

**Action:**
1. Count cleaned transcripts
2. Count metadata files
3. Count chunk directories
4. Compare counts with metadata from Step 2
5. Check for incomplete transcriptions (empty files)
6. Verify metadata.json content

**Validation Criteria:**
- [ ] One cleaned.txt per video
- [ ] One metadata.json per video
- [ ] Chunks directory exists per video
- [ ] Chunks directory is not empty
- [ ] No 0-byte files

**Output:** Verification report

---

### Step 6: Generate Download + Transcription Report

Create comprehensive report:

```markdown
# YouTube Download + Transcription Report

**Source:** {source_url}
**Type:** {single video|playlist}
**Date:** {timestamp}
**Duration:** {total_duration_minutes} minutes

## Summary

- **Total Videos:** {video_count}
- **Total Duration:** {total_duration_formatted}
- **Transcriptions:** {transcription_count}
- **Total Chunks:** {total_chunks}
- **Model Used:** {model}
- **Language:** {language}

## Videos Processed

### {Video_1_Title}
- **Duration:** {duration}
- **Transcription:** ✓ cleaned.txt
- **Chunks:** {chunk_count} chunks
- **Size:** {file_size_mb} MB

### {Video_2_Title}
- **Duration:** {duration}
- **Transcription:** ✓ cleaned.txt
- **Chunks:** {chunk_count} chunks
- **Size:** {file_size_mb} MB

## Output Location

**Directory:** `{output_dir}/`

## Performance

- **Average Download Speed:** {avg_download_speed_mbps} Mbps
- **Average Transcription Time:** {avg_transcription_time_per_minute} seconds/minute
- **Total Processing Time:** {total_time_minutes} minutes

## Verification

- [x] All videos downloaded
- [x] All transcriptions completed
- [x] Chunks generated for all videos
- [x] Video files cleaned up (if --keep-video not used)

## Next Steps

1. Review transcriptions in `{output_dir}/`
2. (Optional) Run `sculpt-transcript` task for content extraction
3. (Optional) Use chunks for downstream tasks (summarization, Q&A, etc.)
```

**Action:**
1. Render report template with actual data
2. Save report to `{output_dir}/YOUTUBE-DOWNLOAD-REPORT.md`
3. Display summary to user
4. Update `.synapse/metrics/media-processor-metrics.json` with stats

**Output:** Download + Transcription report (markdown)

---

### Step 7: Quality Gate Validation (QG-001 + QG-002)

Run both QG-001 (download) and QG-002 (transcription) validations:

**Action:**
1. Execute all QG-001 checks (download completeness)
2. Execute all QG-002 checks (transcription quality)
3. Generate validation report
4. If FAIL, log issues and notify user
5. If PASS, mark task as complete

---

## Outputs

### Primary Output

**Transcriptions:**
- **Location:** `{output_dir}/{VideoTitle}/`
- **Files:**
  - `original.txt` — Raw Whisper output
  - `cleaned.txt` — Cleaned transcript
  - `chunks/chunk_*.txt` — Semantic chunks
  - `metadata.json` — Video + transcription metadata

### Secondary Outputs

1. **Download Report:** `{output_dir}/YOUTUBE-DOWNLOAD-REPORT.md`
2. **Download Log:** `.aios-core/logs/media-processor/download-youtube.log`
3. **Metrics Update:** `.synapse/metrics/media-processor-metrics.json`

```json
{
  "downloads": {
    "youtube": {
      "total_videos": 42,
      "total_playlists": 3,
      "total_duration_hours": 28.5,
      "total_transcriptions": 42,
      "last_download": "2026-02-23T16:20:00Z"
    }
  }
}
```

---

## Validation

### QG-001: Download Completeness

**Criteria:**
- [ ] All videos downloaded (count matches metadata)
- [ ] No failed downloads
- [ ] Audio extracted successfully for all videos

**Method:** Automated file count verification

**Threshold:** 100% download success

**Severity:** CRITICAL

---

### QG-002: Transcription Quality

**Criteria:**
- [ ] All videos transcribed (one cleaned.txt per video)
- [ ] Chunks generated for all transcriptions
- [ ] Metadata.json exists and valid for all videos
- [ ] No empty transcription files
- [ ] Average transcription confidence >= 0.7 (from Whisper metadata)

**Method:** Automated quality checks on transcription outputs

**Threshold:** 100% transcription completeness, >= 95% confidence

**Severity:** CRITICAL

---

### QG-003: Cleanup Verification

**Criteria:**
- [ ] Video files deleted (unless --keep-video flag used)
- [ ] Audio files deleted (intermediate cleanup)
- [ ] Only transcriptions remain

**Method:** File system verification

**Threshold:** 100% cleanup (unless --keep-video)

**Severity:** MEDIUM (disk space management)

---

## Quality Threshold

**Minimum Acceptable:**
- Download completeness: 100%
- Transcription completeness: 100%
- Transcription confidence: >= 70%
- Cleanup: >= 90%

**Target:**
- Download completeness: 100%
- Transcription completeness: 100%
- Transcription confidence: >= 85%
- Cleanup: 100%
- Average processing speed: <= 2x real-time (e.g., 10-min video processed in <= 20 min)

---

## Error Handling

### Common Errors

| Error Code | Cause | Recovery |
|------------|-------|----------|
| `VIDEO_UNAVAILABLE` | Video is private, deleted, or geo-blocked | Notify user, skip if playlist |
| `DOWNLOAD_FAILED` | Network error or yt-dlp failure | Retry up to 3 times with 30s delay |
| `AUDIO_EXTRACTION_FAILED` | FFmpeg error | Check FFmpeg installation, retry |
| `TRANSCRIPTION_FAILED` | Whisper error (OOM, model not found) | Check resources, download model, retry |
| `DISK_FULL` | Insufficient disk space | Free space, resume download |
| `NETWORK_ERROR` | Connection timeout | Retry with exponential backoff |
| `PLAYLIST_EMPTY` | Playlist has no videos | Notify user, exit gracefully |

### Recovery Strategies

1. **Video Unavailable (Playlist Context):**
   ```bash
   # Skip unavailable video, continue with playlist
   # Log skipped video to report
   ```

2. **Network Error:**
   ```bash
   # Retry with exponential backoff (30s, 60s, 120s)
   # If still fails after 3 retries, halt and notify
   ```

3. **Disk Space:**
   ```bash
   # Check available space before each video
   # If space < 1GB, pause and notify user
   # Offer to cleanup old downloads
   ```

4. **Transcription OOM:**
   ```bash
   # Suggest using smaller model (large → medium → small)
   # Retry with reduced model
   ```

---

## Integration

### Feeds To

- **sculpt-transcript** — Cleaned transcripts ready for content extraction
- **chunk-processor** — Semantic chunks ready for downstream tasks
- **organize-content** — Transcriptions ready for organization

### Depends On

- **classify-request** — Receives `source_url`, `source_type`, and parameters from classification

### Observability

**Metrics Tracked:**
- Total videos downloaded
- Total playlists processed
- Total duration transcribed (hours)
- Average transcription confidence
- Success rate (% successful downloads + transcriptions)
- Average processing speed (real-time ratio)

**Dashboard Integration:**
- Download + transcription history in `.synapse/metrics/media-processor-metrics.json`
- Real-time progress (via log tailing if dashboard integrated)

---

## Flags Reference

### video-transcriber CLI Flags

| Flag | Description | Example |
|------|-------------|---------|
| `process` | Process single video (download + transcribe) | `process "{url}"` |
| `batch-playlist` | Process playlist (download + transcribe all) | `batch-playlist "{url}"` |
| `-o, --output` | Output directory | `-o /path/to/output` |
| `-m, --model` | Whisper model (tiny, small, medium, large) | `-m medium` |
| `-l, --language` | Audio language (pt, en, auto) | `-l pt` |
| `--quality` | Video quality (best, 1080p, 720p, 480p) | `--quality 720p` |
| `--keep-video` | Keep video file after transcription | `--keep-video` |
| `--dry-run` | Simulate processing (no actual download) | `--dry-run` |
| `info` | Get video metadata | `info "{url}"` |
| `playlist-info` | Get playlist metadata | `playlist-info "{url}"` |

---

## Examples

### Example 1: Single Video (Full Process)

**Input:**
```json
{
  "source_url": "https://youtube.com/watch?v=dQw4w9WgXcQ",
  "source_type": "youtube",
  "model": "medium",
  "language": "en"
}
```

**Command:**
```bash
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber process "https://youtube.com/watch?v=dQw4w9WgXcQ" -o "<PROJECT_ROOT>/squads/media-processor/transcriptions/youtube/" -m medium -l en
```

**Output:**
```
transcriptions/youtube/
└── Rick_Astley_Never_Gonna_Give_You_Up/
    ├── original.txt
    ├── cleaned.txt
    ├── chunks/
    │   ├── chunk_001.txt
    │   ├── chunk_002.txt
    │   └── chunk_003.txt
    └── metadata.json
```

---

### Example 2: Playlist (Batch Processing)

**Input:**
```json
{
  "source_url": "https://youtube.com/playlist?list=PLxxxxxxxxxx",
  "source_type": "youtube_playlist",
  "model": "medium",
  "language": "pt"
}
```

**Command:**
```bash
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber batch-playlist "https://youtube.com/playlist?list=PLxxxxxxxxxx" -o "<PROJECT_ROOT>/squads/media-processor/transcriptions/youtube/" -m medium -l pt
```

**Output:**
```
transcriptions/youtube/
├── Aula_01_Introducao/
│   ├── cleaned.txt
│   ├── chunks/...
│   └── metadata.json
├── Aula_02_Fundamentos/
│   ├── cleaned.txt
│   ├── chunks/...
│   └── metadata.json
├── ...
└── YOUTUBE-DOWNLOAD-REPORT.md
```

---

### Example 3: Keep Video File

**Input:**
```json
{
  "source_url": "https://youtube.com/watch?v=xxx",
  "source_type": "youtube",
  "keep_video": true
}
```

**Command:**
```bash
cd <PROJECT_ROOT>/tools/video-transcriber
.venv/bin/video-transcriber process "https://youtube.com/watch?v=xxx" -o "<PROJECT_ROOT>/squads/media-processor/transcriptions/youtube/" -m medium -l pt --keep-video
```

**Output:**
```
transcriptions/youtube/
└── Video_Title/
    ├── original.txt
    ├── cleaned.txt
    ├── chunks/...
    ├── metadata.json
    └── Video_Title.mp4  # Video kept
```

---

## Notes

- **All-in-One Process:** `video-transcriber process` handles download → transcribe → clean → chunk → cleanup automatically
- **Playlist Handling:** `batch-playlist` processes all videos in sequence with error recovery
- **Whisper Models:** Larger models (medium, large) provide better accuracy but slower processing
- **Cleanup:** Video files are deleted by default to save space (use `--keep-video` to preserve)
- **Resume Support:** Interrupted downloads can resume (yt-dlp handles this automatically)
- **Caption Fallback:** If Whisper transcription fails, video-transcriber attempts to download YouTube captions
- **Language Detection:** `language: "auto"` lets Whisper auto-detect language (less accurate than explicit)

---

## References

- **video-transcriber Documentation:** `<PROJECT_ROOT>/tools/video-transcriber/README.md`
- **Whisper Models:** https://github.com/openai/whisper#available-models-and-languages
- **yt-dlp Documentation:** https://github.com/yt-dlp/yt-dlp
- **FFmpeg Guide:** `<PROJECT_ROOT>/tools/video-transcriber/docs/ffmpeg.md`

---

**Task Classification:** STANDARD
**Estimated Tokens:** ~6000 (download + transcription) + ~1000 (validation) + ~500 (reporting)
**Success Rate:** 88% (based on YouTube availability, network, and transcription accuracy)
