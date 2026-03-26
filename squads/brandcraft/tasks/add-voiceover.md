---
task-id: add-voiceover
name: Add AI Voiceover to Video
agent: director
version: 1.0.0
purpose: Add AI-generated voiceover to an existing video via ElevenLabs TTS

inputs:
  - name: video_path
    type: path
    description: Path to the source video file
    required: true
  - name: script
    type: string
    description: Voiceover script text to be spoken
    required: true

outputs:
  - path: "{video_path with voiceover layer}"
    format: mp4
    description: Video with synchronized AI voiceover audio layer

acceptance_criteria:
  - "Voice generated via ElevenLabs TTS (ai-reels squad pipeline)"
  - "Audio synced to video timeline"
  - "Audio levels balanced (voice clear over background)"
  - "Final merged video plays without artifacts"
---

# add-voiceover

## Overview

Adds an AI-generated voiceover to an existing video. The agent delegates voice generation to the ai-reels squad (which handles ElevenLabs TTS), then syncs the audio to the video timeline and merges layers. Think of it as dubbing a video — the voice needs to match the pacing and feel natural.

## Steps

1. **Validate inputs** — Verify video file exists and is a supported format
2. **Generate voice** — Delegate to ai-reels squad for ElevenLabs TTS generation using the script
3. **Sync audio** — Align generated audio to the video timeline, adjusting for scene cuts
4. **Merge layers** — Combine original video + voiceover audio into final output
5. **Save** — Export merged video

## Veto Conditions

- ElevenLabs API unavailable or key not configured → HALT, escalate to user
- Video file not found or corrupt → HALT
- Script empty → HALT

## Handoff

on_complete: pass to quality-validator
on_fail: escalate to brandcraft-chief
