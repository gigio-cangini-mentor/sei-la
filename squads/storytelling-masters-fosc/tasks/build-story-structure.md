---
task: Build Story Structure
responsavel: robert-mckee
secondary: joseph-campbell
model: sonnet
elicit: true
sla:
  target: 20-30 min
  max: 45 min
  description: "Structural analysis + spine building - iterative but bounded"
Entrada: |
  - raw_content: Text, outline, or description of what the user wants to narrate
  - context: Audience, format (keynote, script, marketing, personal), time constraint
Saida: |
  - story_spine: Complete story spine with inciting incident, complications, crisis, climax, resolution
  - value_changes: Map of value changes per beat
  - controlling_idea: One sentence expressing the story's meaning
  - structure_type: 3-act | monomyth | beat-sheet (with justification)
veto_conditions:
  input:
    - "No raw content provided → ASK user before proceeding"
    - "Content is pure data/report with no narrative potential → REDIRECT to @analyst"
  process:
    - "No controlling idea emerges after analysis → ASK user what the story means to them"
    - "No inciting incident identifiable → GUIDE user to find the triggering event"
  output:
    - "No gap/conflict detected → WARN that story lacks tension, suggest adding stakes"
    - "No climax resolution → BLOCK delivery, structure is incomplete"
    - "No character transformation → REDIRECT to Campbell monomyth or ask for personal journey element"
  ethical:
    - "Story vilifies real people without context → WARN about ethical storytelling"
  performance:
    - "Structure complexity exceeds format constraints → SUGGEST simplification or format change"
---

# *build-story-structure

Build a complete story structure from raw content using Tier 0 experts (McKee + Campbell).

## When to Use

- User has raw material (ideas, outline, transcript) and needs structural architecture
- Existing narrative "doesn't work" and needs structural diagnosis + rebuild
- User wants to transform a flat presentation into a story arc

## Workflow

### Step 1: Structural Analysis (McKee)

Activate `robert-mckee` to analyze the raw content:

1. **Identify the Core**: What is the controlling idea? What value is at stake?
2. **Map the Gap**: Where is the gap between expectation and result?
3. **Diagnose Conflict Levels**: Inner, personal, social, extra-personal
4. **Assess Genre**: What genre conventions apply? (If applicable)

Output: Structural diagnosis with specific problems identified.

### Step 2: Archetypal Mapping (Campbell — optional)

If the content has a journey/transformation element, activate `joseph-campbell`:

1. **Map to Monomyth**: Which stages of the Hero's Journey are present/missing?
2. **Identify Archetypes**: Hero, mentor, threshold guardian, shadow, trickster
3. **Threshold Moments**: Where are the key crossings?

Output: Archetypal overlay with enhancement suggestions.

### Step 3: Build Story Spine

Combine McKee's structural diagnosis + Campbell's archetypal mapping:

```
STORY SPINE
├── Setup (Ordinary World)
│   └── Value at stake: ___
├── Inciting Incident
│   └── Gap: Expected ___ but got ___
├── Progressive Complications
│   ├── Complication 1: ___
│   ├── Complication 2: ___
│   └── Turning Point: ___
├── Crisis (Dilemma)
│   └── Choice between ___ and ___
├── Climax (Action taken)
│   └── Value change: ___ → ___
└── Resolution (New equilibrium)
    └── Controlling Idea: ___
```

### Step 4: Present to User

Present the story spine with options:

1. Accept structure → proceed to Tier 1 (presentation) or Tier 2 (persuasion)
2. Adjust specific elements → iterate
3. Try alternative structure (monomyth vs 3-act vs beat sheet)

## Output Example

```
📖 Story Structure — Built

**Controlling Idea:** Persistence in the face of expert dismissal
leads to breakthrough innovation.

**Structure:** 3-Act (McKee) with Monomyth overlay (Campbell)

STORY SPINE:
1. SETUP: Founder with unconventional idea in traditional industry
2. INCITING INCIDENT: First investor meeting — rejected for being "naive"
3. COMPLICATIONS:
   - Team member quits (personal conflict)
   - Competitor launches similar product (social conflict)
   - Running out of money (extra-personal pressure)
4. CRISIS: Accept acquisition offer (safety) OR bet everything on pivot
5. CLIMAX: Chooses pivot — launches redesigned product at conference
6. RESOLUTION: Product becomes industry standard. Controlling idea confirmed.

**Value Changes:** hope → despair → determination → triumph
**Archetypal Elements:** Threshold crossing at pivot decision, Mentor appears
as unexpected advisor, Shadow = traditional industry mindset

Next step: *design-keynote-sparkline (Tier 1) or *make-it-stick (Tier 2)?
```

## Inline Checklist

Before delivering story spine, verify:
- [ ] **Controlling idea present** — One-sentence meaning of the story exists and is clear
- [ ] **Inciting incident clear** — The triggering event that disrupts equilibrium is identified
- [ ] **Progressive complications** — At least 2-3 escalating obstacles or reversals present
- [ ] **Crisis/climax** — Dilemma forces a choice, action taken produces value change
- [ ] **Resolution transforms protagonist** — Character/situation is different at end than beginning
- [ ] **Value arc mapped** — Can trace the emotional/thematic journey from start to finish
- [ ] **Structure type justified** — Explained why 3-act, monomyth, or beat-sheet was chosen

## Error Handling

### Auto-Heal Conditions

| Condition | Recovery Strategy |
|-----------|------------------|
| Empty controlling idea | Re-execute Step 1 with specific prompt: "What does this story prove or reveal?" |
| No transformation arc | Trigger Campbell monomyth as fallback - look for internal journey |
| Structure score < 6/10 | Iterate with focused feedback on weakest element (gap, stakes, resolution) |
| Flat value arc (no change) | Ask user: "What changes between beginning and end?" to find the shift |
| Missing inciting incident | Prompt: "What event forced the protagonist to take action?" |

### Escalation Rules

Escalate to `storytelling-masters-chief` when:
1. Raw content has no narrative potential after 2 iterations (truly just data)
2. User rejects all structure suggestions and requests non-standard approach
3. Ethical concerns arise (harmful stereotypes, misleading framing)
4. McKee + Campbell both fail to find structure (rare edge case)

## Related

- **Primary Agent:** robert-mckee (Tier 0)
- **Secondary Agent:** joseph-campbell (Tier 0)
- **Template:** story-spine-tmpl.md
- **Next Tasks:** design-keynote-sparkline, make-it-stick, build-storybrand
