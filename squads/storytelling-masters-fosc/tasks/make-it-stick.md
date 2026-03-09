---
task: Make It Stick — SUCCESs Diagnostic & Engineering
responsavel: chip-dan-heath
secondary: matthew-dicks
model: sonnet
elicit: true
Entrada: |
  - content: Message, idea, pitch, or presentation to make sticky
  - audience: Who needs to remember this (role, context)
  - format: presentation | pitch | email | campaign | internal-memo
Saida: |
  - success_diagnostic: Score per SUCCESs dimension (Simple, Unexpected, Concrete, Credible, Emotional, Stories)
  - improvements: Specific rewrites for weak dimensions
  - defining_moments: Engineered peak moments (Elevation, Insight, Pride, Connection)
  - curse_of_knowledge_fixes: Where expert blind spots were detected and fixed
veto_conditions:
  - "Content is already sticky (all 6 dimensions >= 8/10) → CONGRATULATE, suggest refinement only"
  - "Content is pure data with no message → REDIRECT to build-story-structure first"
  - "SUCCESs score <4/10 on any dimension without improvement plan → BLOCK"
  - "No concrete example provided in output → BLOCK"
  - "No unexpected element or hook → BLOCK"
  - "No emotional connection established → BLOCK"
  - "Output is abstract/generic without specifics → BLOCK"
sla:
  target_duration: "20-30 min"
  max_duration: "40 min"
  warning_threshold: "35 min"
---

# *make-it-stick

Diagnose why a message isn't landing and engineer it to stick using SUCCESs framework + Power of Moments.

## When to Use

- User's message/idea isn't being remembered or acted upon
- Presentation content is correct but doesn't "land"
- User needs to make abstract concepts concrete and memorable
- User wants to create defining moments in an experience

## Workflow

### Step 1: SUCCESs Diagnostic (Heath)

Activate `chip-dan-heath` to run the 6-dimension diagnostic:

| Dimension | Question | Score 1-10 |
|-----------|----------|-----------|
| **S**imple | Is the core idea findable in 10 words or less? | ___ |
| **U**nexpected | Does it break a pattern or violate expectations? | ___ |
| **C**oncrete | Can you picture it? Touch it? See a specific example? | ___ |
| **C**redible | Does it have proof, authority, or testable credentials? | ___ |
| **E**motional | Does it make you feel something? (Not just think) | ___ |
| **S**tories | Does it use a story to drive the point? | ___ |

### Step 2: Curse of Knowledge Scan

Identify where the author's expertise is creating blind spots:
- **Tapper/Listener gaps**: Where author assumes shared context
- **Abstraction traps**: Where concrete would beat abstract
- **Jargon detection**: Technical terms that exclude non-experts

### Step 3: Engineer Improvements

For each dimension scoring < 7/10, provide specific rewrite:

```
BEFORE (Abstract, Score: 3/10 Concrete):
"We need to improve our customer experience."

AFTER (Concrete, Score: 9/10):
"When a customer calls, they should hear a human voice
in under 30 seconds, and that human should already know
what the customer bought last."
```

### Step 4: Defining Moments (Power of Moments)

If format allows, engineer peak moments using EPIC:
- **E**levation: Rise above the ordinary (sensory, surprise, stakes)
- **P**ride: Achievement, recognition, courage milestones
- **I**nsight: Trip over the truth, stretch for it
- **C**onnection: Shared experience, synchronized vulnerability

### Step 5: Present Diagnostic + Fixes

## Inline Checklist

Execute each item during the task:

- [ ] **Simple**: Core message distilled to 10 words or less
- [ ] **Unexpected**: Pattern break or curiosity gap identified and implemented
- [ ] **Concrete**: At least one specific, tangible example for each abstract concept
- [ ] **Credible**: Proof points, data, or authority established
- [ ] **Emotional**: Emotional hook present (not just logical appeal)
- [ ] **Stories**: Story vehicle used to carry the message
- [ ] **Curse of Knowledge**: Jargon and expert blind spots identified and fixed
- [ ] **Defining Moment**: At least one EPIC moment engineered (if format allows)

## Error Handling

### Auto-Heal Conditions

| Error | Detection | Auto-Heal Action |
|-------|-----------|-----------------|
| Score <5/10 on 2+ dimensions | After Step 1 diagnostic | Auto-iterate on weakest 2 dimensions with specific rewrites |
| No unexpected element | After Step 3 | Brainstorm 3 "knowledge gap" openings, select strongest |
| Abstract output | After Step 3 | Force concrete example for each abstract point |
| No emotional connection | After Step 1 | Add story or sensory detail to create feeling |
| Jargon overload | After Step 2 | Replace 80%+ jargon with plain language equivalents |

### Escalation Triggers

- SUCCESs score <4/10 on any dimension after 2 auto-heal iterations → Escalate to storytelling-masters-chief
- No concrete examples possible (purely abstract topic) → Escalate to matthew-dicks for story wrapper
- User rejects all unexpected elements → Escalate with recommendation to reconsider or accept lower stickiness

## Output Example

```
🎯 SUCCESs Diagnostic — "Q4 Strategy Presentation"

CURRENT SCORES:
  Simple:     ████████░░ 8/10 ✅ Core is clear
  Unexpected: ███░░░░░░░ 3/10 ❌ No pattern break
  Concrete:   ████░░░░░░ 4/10 ❌ Too abstract
  Credible:   ███████░░░ 7/10 ✅ Data present
  Emotional:  ██░░░░░░░░ 2/10 ❌ Pure logic
  Stories:    █░░░░░░░░░ 1/10 ❌ No story at all

OVERALL: 4.2/10 — Won't stick.

CURSE OF KNOWLEDGE DETECTED:
- Slide 3: "Omnichannel optimization" (jargon — 40% of audience
  won't know this term)
- Slide 7: "NPS improved 15 points" (abstract — what does that
  feel like?)

FIXES:
1. UNEXPECTED: Open with "We almost lost our biggest client
   last quarter." (creates curiosity gap)
2. CONCRETE: Replace "NPS +15" with "Sarah in Kansas City called
   to thank us. That never happened before."
3. EMOTIONAL: Add the Sarah story. Real name, real situation.
4. STORIES: Structure the Q4 results as a 3-act narrative:
   crisis → pivot → triumph

DEFINING MOMENT OPPORTUNITY:
At slide 12 (the pivot), pause and play the actual 30-second
voicemail from Sarah. Let the room hear a real customer. (EPIC:
Elevation + Connection)
```

## Related

- **Primary Agent:** chip-dan-heath (Tier 2)
- **Secondary Agent:** matthew-dicks (Tier 1 — personal stories)
- **Template:** success-diagnostic-tmpl.md
- **Next Tasks:** design-keynote-sparkline, craft-persuasive-talk
