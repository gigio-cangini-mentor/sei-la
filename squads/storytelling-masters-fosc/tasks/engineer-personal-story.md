---
task: Engineer Personal Story
responsavel: matthew-dicks
secondary: dale-carnegie
model: sonnet
elicit: true
sla:
  target: 15-25 min
  max: 35 min
  description: "Personal story crafting with 5-Second Moment + delivery confidence"
Entrada: |
  - raw_material: Life experience, anecdote, or memory to craft into a story
  - purpose: keynote | opening | vulnerability-moment | case-study | teaching
  - audience: Who will hear this (size, context, relationship)
Saida: |
  - story: Complete personal story with 5-Second Moment identified
  - stakes_map: What was at risk, why audience should care
  - delivery_notes: How to tell it (pacing, pauses, emotion calibration)
  - confidence_coaching: Stage presence notes (Carnegie layer)
veto_conditions:
  input:
    - "No personal material provided → ASK user to share a memory/moment"
    - "Story is about someone else entirely → REDIRECT to build-story-structure"
  process:
    - "No 5-Second Moment identifiable → USE Dicks' 'Homework for Life' prompt to find one"
    - "Story not personal/authentic (reads like a parable) → GUIDE user to real experience"
  output:
    - "No vulnerability shown → WARN that personal stories need emotional honesty"
    - "Story > 10 min without clear structure → SUGGEST trimming or breaking into segments"
    - "No connection to talk's theme → ITERATE with explicit bridge statement"
  ethical:
    - "Story exploits others' pain without permission → DECLINE and suggest reframing"
  performance:
    - "Story has no transformation (same person at end) → GUIDE to find what changed internally"
---

# *engineer-personal-story

Transform a personal experience into a crafted story using Dicks' Storyworthy method + Carnegie's delivery confidence.

## When to Use

- User needs to tell a personal story in a presentation
- User has a raw experience but doesn't know how to structure it
- User wants to open or close a talk with vulnerability
- User is afraid of sharing personal stories on stage

## Workflow

### Step 1: Find the 5-Second Moment (Dicks)

Activate `matthew-dicks`:

1. **Identify the Moment**: The story is NOT about the event. It's about the 5-second moment of realization/change within you.
2. **What Changed?** You must be different at the end than the beginning.
3. **What Was at Stake?** Stories need stakes — emotional, relational, existential.

### Step 2: Craft with Storyworthy Principles

Apply Dicks' storytelling rules:

- **Start as close to the end as possible** — No backstory dumps
- **But/Therefore, not And/Then** — Every beat shifts, never just adds
- **Present tense for the core moment** — Immediacy
- **Location details anchor the story** — Where were you standing?
- **Humor serves the story, not the ego** — Self-deprecation, not performance
- **The ending must be earned** — Plant seeds early

### Step 3: Stakes Engineering

Map why the audience should care:

| Stake Type | Description | Present? |
|-----------|-------------|----------|
| Emotional | Fear, love, loss, hope | ___ |
| Identity | Who am I? Am I enough? | ___ |
| Relational | Connection at risk | ___ |
| Professional | Career/reputation | ___ |
| Existential | Life direction/meaning | ___ |

### Step 4: Delivery Confidence (Carnegie)

Activate `dale-carnegie`:

1. **Preparation beats talent**: Know your opening and closing cold
2. **Speak from experience**: Authenticity > polish
3. **Vulnerability is strength**: The audience connects with imperfection
4. **Pause at the moment**: The 5-second moment needs silence, not words
5. **Practice the emotional arc**: Know where you'll feel it

### Step 5: Present Complete Story

## Output Example

```
🎤 Personal Story — "The Wrong Stage"

5-SECOND MOMENT: The instant I realized the audience didn't need
my expertise — they needed my honesty.

STORY:
"I'm standing backstage at a 500-person conference. My slides are
perfect. Thirty-seven of them. Data on every one.

But I can hear the speaker before me. She's crying on stage.
Not performing crying. Actually crying. Telling a story about
her first failed product. The audience is silent. Then applause
so loud the floor shakes.

My turn. I walk out. Open my laptop. Thirty-seven slides stare
back at me. And I close it.

I say: 'I was going to show you data about why storytelling
matters in business. But the woman before me just showed you.
So let me tell you about the time I tanked a pitch so badly
the investor actually laughed.'

Twenty minutes. No slides. Just the truth about my three biggest
failures. When I finish, the silence is different from before.
It's the silence of people seeing themselves in your story.

That was the 5-second moment: the click of closing the laptop.
The decision that my real story was more valuable than my
polished deck."

STAKES: Identity (Am I a fraud if I don't use slides?),
Professional (What if this tanks?), Relational (Trust with audience)

DELIVERY NOTES:
- Pause 3 seconds after "I close it"
- Lower volume at "the truth about my three biggest failures"
- Make eye contact with one person during the 5-second moment
- Don't rush the ending — let the silence land
```

## Inline Checklist

Before delivering personal story, verify:
- [ ] **5-Second Moment identified** — The instant of realization/change is clear
- [ ] **Stakes established** — Audience knows what was at risk (emotional, identity, relational, etc.)
- [ ] **Location/time grounded** — Story has specific details (where were you standing, what did you see)
- [ ] **Vulnerability present** — Story shows imperfection, fear, or uncertainty authentically
- [ ] **Transformation clear** — User is different at end than beginning
- [ ] **Connected to main message** — Story serves the talk's theme, not just entertainment
- [ ] **Delivery notes included** — Guidance on pauses, pacing, emotional calibration
- [ ] **Carnegie confidence layer** — Stage presence coaching for authentic delivery

## Error Handling

### Auto-Heal Conditions

| Condition | Recovery Strategy |
|-----------|------------------|
| No 5-Second Moment found | Use Dicks' "Homework for Life" prompt: "Think of a moment where you realized something about yourself" |
| Story feels generic/inauthentic | Dig deeper with: "What changed in you? How were you different after this moment?" |
| Connection to theme weak | Iterate with explicit bridge: "This story matters because it proves [talk's thesis]" |
| Too much backstory | Apply Dicks' rule: Start as close to the end as possible, cut everything before the inciting incident |
| No stakes apparent | Ask: "What would have happened if you made a different choice?" to surface the risk |

### Escalation Rules

Escalate to `storytelling-masters-chief` when:
1. User has no personal stories to share (redirect to build-story-structure with case studies)
2. Story involves trauma that needs professional framing (beyond storytelling scope)
3. User is afraid of vulnerability and needs deeper coaching (redirect to Carnegie full confidence workshop)
4. Story is legally sensitive (NDA, privacy concerns) and needs vetting

## Related

- **Primary Agent:** matthew-dicks (Tier 1)
- **Secondary Agent:** dale-carnegie (Tier 3)
- **Previous Tasks:** build-story-structure (optional)
- **Next Tasks:** design-keynote-sparkline (to incorporate into talk)
