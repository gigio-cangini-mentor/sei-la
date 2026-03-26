---
task-id: add-avatar
name: Add Lip-Sync Avatar to Video
agent: director
version: 1.0.0
purpose: Add a lip-synced AI avatar layer to an existing video via HeyGen

inputs:
  - name: video_path
    type: path
    description: Path to the source video file
    required: true
  - name: script
    type: string
    description: Script for the avatar to speak
    required: true
  - name: avatar_id
    type: string
    description: HeyGen avatar ID (uses default if not specified)
    required: false

outputs:
  - path: "{video_path with avatar layer}"
    format: mp4
    description: Video with composited lip-sync avatar

acceptance_criteria:
  - "Avatar generated via HeyGen (ai-reels squad pipeline)"
  - "Lip-sync matches script audio"
  - "Avatar composited cleanly over brand video"
  - "Final video plays without visual artifacts"
---

# add-avatar

## Overview

Adds a lip-synced AI avatar to an existing video. The agent delegates avatar generation to the ai-reels squad (which handles HeyGen), then composites the avatar layer over the brand video. Like having a virtual presenter appear inside your branded content — talking, gesturing, and matching the script.

## Steps

1. **Validate inputs** — Verify video file exists, script is non-empty
2. **Generate avatar video** — Delegate to ai-reels squad for HeyGen avatar generation with the script and optional avatar_id
3. **Composite avatar** — Layer the avatar video over the brand video at the designated position
4. **Merge layers** — Combine all layers (brand video + avatar + audio) into final output
5. **Save** — Export merged video

## Veto Conditions

- HeyGen API unavailable or key not configured → HALT, escalate to user
- Video file not found or corrupt → HALT
- Script empty → HALT

## Handoff

on_complete: pass to quality-validator
on_fail: escalate to brandcraft-chief
