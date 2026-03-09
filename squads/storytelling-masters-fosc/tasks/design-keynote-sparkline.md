---
task: Design Keynote Sparkline
responsavel: nancy-duarte
secondary: carmine-gallo
model: sonnet
elicit: true
sla:
  target: 25-40 min
  max: 60 min
  description: "Full presentation design with sparkline, S.T.A.R. moments, and delivery layer"
Entrada: |
  - content: Story spine, outline, or raw talk content
  - audience: Who will attend (role, knowledge level, expectations)
  - duration: Time available (minutes)
  - format: keynote | conference talk | TED-style | workshop
Saida: |
  - sparkline: Complete Sparkline with "what is" / "what could be" oscillation
  - star_moments: S.T.A.R. moments designed and positioned
  - audience_journey: Emotional arc map from opening to call-to-action
  - delivery_notes: TED-style delivery recommendations (Gallo)
veto_conditions:
  input:
    - "No audience defined → ASK before designing (audience is the hero, not the presenter)"
    - "Content provided but no clear thesis/message → ASK what transformation user wants audience to experience"
  process:
    - "No 'what is' vs 'what could be' contrast emerging → GUIDE user to find the gap"
    - "No S.T.A.R. moment identifiable → BRAINSTORM with user (demo, prop, story, visual)"
  output:
    - "Sparkline is flat (no oscillation) → BLOCK delivery, redesign with contrast"
    - "Presentation > 60 slides without justification → WARN about attention limits and suggest reduction"
    - "No call to action → WARN that audience needs a next step, suggest adding one"
  ethical:
    - "S.T.A.R. moment relies on shock value without substance → REDIRECT to meaningful dramatization"
  performance:
    - "Duration > 60 min without workshop format → WARN about cognitive overload, suggest breaks or modular design"
---

# *design-keynote-sparkline

Design a complete presentation using Duarte's Sparkline + Gallo's TED delivery principles.

## When to Use

- User needs to create a keynote or conference presentation
- Existing presentation is flat and needs narrative architecture
- User wants TED-style impact in a talk

## Workflow

### Step 1: Audience Analysis (Duarte)

Activate `nancy-duarte`:

1. **Who is the hero?** Define the audience (not the presenter)
2. **What is their "what is"?** Current reality, pain points, status quo
3. **What is the "what could be"?** The transformation you offer
4. **What is the "new bliss"?** The world after adoption

### Step 2: Design the Sparkline

Build the oscillation between "what is" and "what could be":

```
SPARKLINE FORM
├── BEGINNING
│   ├── "What is" — Current reality (audience's world)
│   └── "What could be" — First glimpse of possibility
├── MIDDLE (contrasts)
│   ├── "What is" — Problem/pain deepened
│   ├── "What could be" — Solution introduced
│   ├── "What is" — Objection/complication
│   ├── "What could be" — Evidence/proof
│   └── S.T.A.R. Moment — Something They'll Always Remember
├── END
│   ├── Call to Action — Specific next step
│   └── "New Bliss" — Vision of transformed world
```

### Step 3: S.T.A.R. Moments (Duarte)

Design at least one S.T.A.R. moment:
- **Memorable Dramatization** — Live demo, physical prop, unexpected reveal
- **Repeatable Sound Bite** — Phrase the audience will quote
- **Evocative Visual** — Image that captures the thesis
- **Emotional Story** — Personal or case story at the peak

### Step 4: TED Delivery Layer (Gallo)

Activate `carmine-gallo` to add delivery excellence:

1. **18-Minute Rule**: Structure within attention limits
2. **Rule of Three**: Group ideas in threes
3. **Jaw-Dropping Moment**: Position for maximum impact
4. **Master the Opening**: First 18 seconds hook
5. **Multisensory Experience**: Engage sight, sound, emotion

### Step 5: Present to User

Deliver complete keynote architecture with:
1. Sparkline visual map
2. S.T.A.R. moments positioned
3. Delivery notes per section
4. Estimated timing per section

## Output Example

```
✨ Keynote Sparkline — Designed

**Talk:** "Why Your Best Ideas Die in Meetings"
**Audience:** 200 mid-level managers, annual leadership summit
**Duration:** 20 min (TED format)

SPARKLINE:
[0-2min] WHAT IS: "You've all had that moment. You present an idea,
         and it dies in silence." (personal story)
[2-5min] WHAT COULD BE: "What if your ideas had armor?"
         (introduce SUCCESs as metaphor)
[5-8min] WHAT IS: "The Curse of Knowledge kills more ideas than
         any competitor." (data + example)
[8-12min] WHAT COULD BE: "Three companies that cracked the code."
          (case studies with concrete outcomes)
[12-15min] ⭐ S.T.A.R. MOMENT: Live demo — take an audience
           member's idea and make it stick in 60 seconds
[15-18min] WHAT COULD BE: "Your next meeting could be different."
[18-20min] CALL TO ACTION: "Tomorrow morning, before your first
           meeting, write your idea in 10 words or less."
           NEW BLISS: "A world where the best ideas win."

DELIVERY NOTES (Gallo):
- Open with 18-second personal failure story (vulnerability)
- Use Rule of Three for case studies
- S.T.A.R. moment at 60% mark (attention valley)
- Close standing center stage, no slides, eye contact
```

## Inline Checklist

Before delivering keynote design, verify:
- [ ] **Audience profiled** — Defined who they are, what they know, what they need
- [ ] **"What is" established** — Current reality/pain/status quo articulated clearly
- [ ] **"What could be" contrasted** — Future possibility shown as distinct from present
- [ ] **Sparkline oscillates** — At least 3 contrasts between "what is" and "what could be"
- [ ] **S.T.A.R. moments placed** — At least 1 memorable moment positioned strategically (usually 60% mark)
- [ ] **Call to action defined** — Specific next step for audience
- [ ] **"New bliss" ending** — Vision of transformed world after adoption
- [ ] **Delivery notes included** — TED-style guidance for opening, pacing, emotion

## Error Handling

### Auto-Heal Conditions

| Condition | Recovery Strategy |
|-----------|------------------|
| Flat sparkline (no contrast) | Re-analyze "what is" gap - ask: "What frustrates your audience about today?" |
| No S.T.A.R. moment identified | Trigger Gallo TED method as supplement - suggest live demo, prop, or jaw-dropping stat |
| Audience mismatch detected | Restart with audience re-profiling - ask about their expertise level and goals |
| Weak call to action | Strengthen with Carnegie specificity: "Tomorrow morning, do X" |
| Opening lacks hook | Apply Gallo's 18-second rule - redesign with story, stat, or question |

### Escalation Rules

Escalate to `storytelling-masters-chief` when:
1. Content has no inherent contrast (pure information dump, no transformation offered)
2. User rejects sparkline approach and requests alternative structure
3. Duration constraints impossible (90-min keynote with no breaks requested)
4. Audience is hostile/adversarial and user needs persuasion strategy (redirect to Tier 2)

## Related

- **Primary Agent:** nancy-duarte (Tier 1)
- **Secondary Agent:** carmine-gallo (Tier 1)
- **Template:** keynote-sparkline-tmpl.md
- **Previous Task:** build-story-structure (Tier 0)
- **Next Tasks:** make-it-stick, craft-persuasive-talk
