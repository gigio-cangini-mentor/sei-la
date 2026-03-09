---
task: Design Beat Sheet
responsavel: blake-snyder
secondary: robert-mckee
model: sonnet
elicit: true
Entrada: |
  - content: Story idea, outline, or concept to structure
  - format: screenplay | marketing-video | course-module | presentation-narrative | vsl
  - length: Approximate duration/length
Saida: |
  - beat_sheet: Complete 15-beat BS2 structure
  - genre_classification: Genre + conventions (Snyder's 10 genres)
  - structural_notes: McKee layer for scene-level depth
veto_conditions:
  - "Content is pure data/report → REDIRECT to make-it-stick"
  - "No narrative element → ASK what story the user wants to tell"
  - "Missing Opening Image → BLOCK"
  - "No Catalyst moment (inciting incident) → BLOCK"
  - "No Midpoint shift (false victory/defeat) → BLOCK"
  - "No All Is Lost beat (darkest moment) → BLOCK"
  - "No Final Image contrast with Opening Image → BLOCK"
sla:
  target_duration: "30-40 min"
  max_duration: "55 min"
  warning_threshold: "50 min"
---

# *design-beat-sheet

Structure any narrative using Snyder's Save the Cat 15-beat sheet + McKee's scene-level depth.

## When to Use

- User needs cinematic structure for video content (VSL, course, marketing video)
- User wants to plan a narrative arc with precise beat timing
- User has a story concept and needs a complete structural blueprint
- User wants to apply film structure to business content

## Workflow

### Step 1: Genre Classification (Snyder)

Activate `blake-snyder`:

1. Classify the story into one of Snyder's 10 genres
2. Identify genre conventions and expectations
3. Map the primal drive (what makes this type of story work)

### Step 2: Build the 15-Beat Sheet (BS2)

```
THE 15 BEATS (BS2):

 1. Opening Image (1%)     — Snapshot of "before"
 2. Theme Stated (5%)      — Someone says what the story is about
 3. Setup (1-10%)          — Status quo, introduce world and characters
 4. Catalyst (10%)         — The event that changes everything
 5. Debate (10-20%)        — Should I? Can I? What if?
 6. Break into Two (20%)   — Decision to act (threshold crossing)
 7. B Story (22%)          — The "love story" / secondary theme
 8. Fun and Games (20-50%) — The promise of the premise
 9. Midpoint (50%)         — False victory or false defeat
10. Bad Guys Close In (50-75%) — Complications intensify
11. All Is Lost (75%)      — Darkest moment
12. Dark Night of the Soul (75-80%) — Why should I go on?
13. Break into Three (80%) — Solution discovered
14. Finale (80-99%)        — Execute the plan, climactic sequence
15. Final Image (99-100%)  — Snapshot of "after" (mirrors Opening Image)
```

### Step 3: Scene Depth (McKee)

For key beats (Catalyst, Midpoint, All Is Lost, Finale), activate `robert-mckee`:
- Identify the value change in the scene
- Ensure the gap between expectation and result
- Check that no scene is "flat" (no turning point)

### Step 4: Present Beat Sheet

Deliver with timing markers appropriate to the format:
- For 3-min video: Each beat = ~12 seconds
- For 20-min presentation: Each beat = ~1.3 minutes
- For course module: Each beat = concept/section

## Inline Checklist

Execute each item during the task:

- [ ] **Opening Image**: "Before" snapshot present
- [ ] **Theme Stated**: Theme articulated early (by 5%)
- [ ] **Set-Up**: Status quo established
- [ ] **Catalyst**: Inciting incident identified
- [ ] **Debate**: Decision tension present
- [ ] **Break into Two**: Threshold crossing moment
- [ ] **B Story**: Secondary theme/relationship layer
- [ ] **Fun and Games**: Promise of premise delivered
- [ ] **Midpoint**: False victory or defeat at 50%
- [ ] **Bad Guys Close In**: Complications intensify
- [ ] **All Is Lost**: Darkest moment identified
- [ ] **Dark Night of Soul**: Existential questioning
- [ ] **Break into Three**: Solution/insight discovered
- [ ] **Finale**: Climactic sequence structured
- [ ] **Final Image**: "After" snapshot mirrors Opening Image

## Error Handling

### Auto-Heal Conditions

| Error | Detection | Auto-Heal Action |
|-------|-----------|-----------------|
| Beats feel formulaic | After Step 2 | Add McKee "gap" analysis to each beat (expectation vs. result) |
| Missing beats | After Step 2 | Flag missing beats, suggest narrative alternatives |
| Pacing issues (beats too fast/slow) | After Step 4 | Re-sequence with timing markers based on format |
| No emotional arc | After Step 3 | Overlay value changes (McKee) to create rise/fall |
| Weak Catalyst | Step 2 | Strengthen inciting incident: "What event forces a decision?" |

### Escalation Triggers

- Story fundamentally non-narrative (no arc possible) → Escalate to storytelling-masters-chief with recommendation
- User rejects beat structure after education → Offer simpler 3-act alternative
- Genre classification unclear after analysis → Escalate to robert-mckee for deeper diagnostic

## Output Example

```
🎬 Beat Sheet — VSL "From Burnout to 6-Figure Coaching Business"

Genre: Rite of Passage (Snyder) — Pain → Growth → Transformation

 1. OPENING IMAGE [0:00-0:10]: Exhausted employee staring at
    laptop at 11pm. "This was me 18 months ago."
 2. THEME STATED [0:10-0:15]: "What if the thing you're best at
    is the thing you should be selling?"
 3. SETUP [0:15-0:45]: Day job, bills, dream of freedom, fear
 4. CATALYST [0:45-1:00]: Laid off. "Best worst day of my life."
 5. DEBATE [1:00-1:30]: Can I really start a business? Doubt.
 6. BREAK INTO TWO [1:30-1:45]: First client says yes. Decision made.
 7. B STORY [1:45-2:00]: Mentor appears (establishes authority)
 8. FUN AND GAMES [2:00-3:30]: Quick wins, testimonials, results
 9. MIDPOINT [3:30-3:45]: First $10K month (false victory)
10. BAD GUYS [3:45-4:30]: Burnout again. Old patterns returning.
11. ALL IS LOST [4:30-4:45]: "I almost went back to a job."
12. DARK NIGHT [4:45-5:00]: Realizes the system was wrong, not her.
13. BREAK INTO THREE [5:00-5:15]: New system discovered (the offer)
14. FINALE [5:15-6:30]: Results with new system + social proof
15. FINAL IMAGE [6:30-6:45]: Same laptop, but now coaching a client.
    Smiling. "This could be you."

[CTA at 6:45]
```

## Related

- **Primary Agent:** blake-snyder (Tier 3)
- **Secondary Agent:** robert-mckee (Tier 0 — scene depth)
- **Template:** beat-sheet-tmpl.md
- **Previous Tasks:** build-story-structure (optional foundation)
