# CLI Reference — Media Processor Tools

Quick reference for all CLI tools orchestrated by media-processor.

---

## hotmart-downloader

**Location:** `tools/hotmart-downloader/`
**CLI:** `tools/hotmart-downloader/.venv/bin/hotmart-dl`

```bash
# Check authentication
hotmart-dl auth-check

# List available courses
hotmart-dl courses

# Get course info (modules, lessons count)
hotmart-dl info "{course_subdomain}"

# Download course
hotmart-dl download -c "{course_subdomain}" -q best --subtitles --materials
```

**Auth:** Requires browser cookies. Run `auth-check` first. If expired, user must re-authenticate via browser.

---

## cademi-downloader

**Location:** `tools/cademi-downloader/`
**CLI:** `tools/cademi-downloader/.venv/bin/cademi-dl`

```bash
# Check authentication
cademi-dl auth-check

# List available courses
cademi-dl courses

# Download single course
cademi-dl download -c "{course_url}"

# Download all courses (batch)
cademi-dl download --all --select-all

# Audio-only mode
cademi-dl download -c "{course_url}" --audio-only
```

**Auth:** Uses Playwright for browser-based auth. Cookies stored locally.

---

## video-transcriber

**Location:** `tools/video-transcriber/`
**CLI:** `tools/video-transcriber/.venv/bin/video-transcriber`

```bash
# Full process: download + transcribe + clean + chunk
video-transcriber process "{source}" -o "{output_dir}" -m medium -l pt

# Transcribe existing file
video-transcriber transcribe "{file}" -o "{output.json}" -m medium -l pt

# Clean raw transcription
video-transcriber clean "{input.json}" -o "{output.json}"

# Chunk transcription
video-transcriber chunk "{input.json}" -o "{chunks_dir}"

# Ingest local file (transcribe + clean + chunk)
video-transcriber ingest "{file}" -o "{output_dir}"

# Batch playlist
video-transcriber batch-playlist "{playlist_url}" -o "{output_dir}" -m medium -l pt
```

**Models:** `base`, `small`, `medium`, `large` (default: `medium`)
**Languages:** `-l pt` (portuguese), `-l en` (english), etc.

---

## System Dependencies

```bash
# Required
ffmpeg --version    # Audio/video processing
ffprobe -version    # Media metadata extraction
yt-dlp --version    # YouTube downloads

# Optional
whisper --help      # If using standalone Whisper
```

---

## Validation Commands

```bash
# Check file with ffprobe
ffprobe -v quiet -print_format json -show_format "{file}"

# Word count of transcription
wc -w "{transcription_clean.md}"

# Count chunks
ls "{chunks_dir}" | wc -l

# Check disk space
df -h .
```

---

## Common Flags

| Flag | Tool | Purpose |
|------|------|---------|
| `-m medium` | video-transcriber | Whisper model size |
| `-l pt` | video-transcriber | Language |
| `-o {dir}` | video-transcriber | Output directory |
| `-q best` | hotmart-dl | Quality selection |
| `--subtitles` | hotmart-dl | Download subtitles |
| `--materials` | hotmart-dl | Download materials |
| `--audio-only` | cademi-dl | Audio extraction only |
