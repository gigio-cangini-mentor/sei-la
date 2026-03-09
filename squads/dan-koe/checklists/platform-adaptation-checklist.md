# Platform Adaptation Checklist

> Checklist de validação para `platform-optimization.md`, `video-to-clips.md` (KOE_DIS_002)
> Source: Dan Koe — Content Distribution
> Agent: koe-distribuidor

---

## 1. Character Limits & Format Rules

```yaml
character_limits:
  twitter_x:
    - [ ] Single tweets under 280 characters
    - [ ] Thread tweets individually under 280 characters
    - [ ] Hashtags limited to 0-2 per tweet (Koe style: minimal)
  linkedin:
    - [ ] Post under 3,000 characters
    - [ ] First 2 lines visible in preview — hook is there
    - [ ] No more than 3 hashtags at end
  instagram:
    - [ ] Caption under 2,200 characters
    - [ ] Carousel text per slide under 150 words
    - [ ] Bio link referenced when needed
  youtube:
    - [ ] Title under 60 characters
    - [ ] Description under 5,000 characters
    - [ ] Tags include 5-15 relevant keywords
  newsletter:
    - [ ] Subject line under 50 characters
    - [ ] Body 800-1,500 words (Koe newsletter sweet spot)
    - [ ] Single CTA per email
```

---

## 2. Audience Behavior Alignment

```yaml
audience_behavior:
  consumption_patterns:
    - [ ] Morning content optimized for reflection/philosophy (Twitter, newsletter)
    - [ ] Midday content optimized for tactical/how-to (LinkedIn, YouTube)
    - [ ] Evening content optimized for inspiration/aspiration (Instagram)
  engagement_expectations:
    - [ ] Twitter: conversation-starting, reply-worthy content
    - [ ] LinkedIn: save-worthy, share-with-team content
    - [ ] Instagram: screenshot-worthy, DM-to-friend content
    - [ ] YouTube: binge-worthy, subscribe-triggering content
  audience_sophistication:
    - [ ] Content assumes reader is already past "make money online" basics
    - [ ] Avoids condescending explanations of known concepts
    - [ ] Layers depth — surface readers get value, deep readers get mastery
```

---

## 3. Native Feature Utilization

```yaml
native_features:
  platform_tools:
    - [ ] Twitter polls used for engagement on opinion pieces
    - [ ] LinkedIn document posts used for frameworks/models
    - [ ] Instagram Reels created from long-form video clips
    - [ ] YouTube Shorts created from high-impact 60-second segments
    - [ ] YouTube Community posts used for audience interaction
  algorithmic_optimization:
    - [ ] Content keeps users on-platform (minimal external links in feed)
    - [ ] Posting cadence matches platform algorithm preferences
    - [ ] Content format matches what platform is currently boosting
```

---

## 4. Video-to-Clips Adaptation

```yaml
video_clips:
  clip_selection:
    - [ ] Clips pulled from highest-engagement moments
    - [ ] Each clip has standalone value (no "as I was saying" openings)
    - [ ] Clip length matches platform (15-60s for Shorts/Reels, 2-5min for Twitter)
  clip_formatting:
    - [ ] Vertical format (9:16) for Shorts/Reels/TikTok
    - [ ] Captions burned in with high-contrast text
    - [ ] Hook appears in first 3 seconds
    - [ ] No dead air or filler at start
  clip_metadata:
    - [ ] Title different from source video title
    - [ ] Description includes context but not spoilers
    - [ ] Tags optimized per platform
```

---

## 5. Cross-Platform Coherence

```yaml
cross_platform:
  messaging_consistency:
    - [ ] Same core idea adapted, not different ideas per platform
    - [ ] CTA leads to consistent funnel destination
    - [ ] No contradictory advice between platforms
  timing_coordination:
    - [ ] Content drops coordinated across platforms (cascade, not simultaneous)
    - [ ] Each platform gets content within 48h window of source publish
```

---

## Scoring

| Category | Items | Points Each | Max |
|----------|-------|-------------|-----|
| Critical — Character Limits & Format | 13 | 3 | 39 |
| Critical — Video-to-Clips Adaptation | 10 | 3 | 30 |
| Standard — Audience Behavior Alignment | 10 | 2 | 20 |
| Standard — Native Feature Utilization | 8 | 2 | 16 |
| Bonus — Cross-Platform Coherence | 5 | 1 | 5 |
| **TOTAL** | **46** | | **110** |

### Thresholds
- **PASS**: >= 88 points (80%)
- **CONDITIONAL**: >= 66 points (60%)
- **FAIL**: < 66 points

### If FAIL
1. Audit each platform output against character/format spec — fix all violations
2. For video clips: re-cut with proper hooks, captions, and aspect ratios
3. Verify audience behavior alignment — adjust tone/depth per platform
4. Run cross-platform coherence check — ensure unified message

*Checklist: platform-adaptation-checklist | Version: 1.0*
*Supports: platform-optimization.md, video-to-clips.md (KOE_DIS_002)*
