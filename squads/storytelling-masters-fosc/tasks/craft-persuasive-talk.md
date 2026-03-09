---
task: Craft Persuasive Talk
responsavel: robert-cialdini
secondary: jay-heinrichs
model: sonnet
elicit: true
Entrada: |
  - objective: What you want the audience to do/believe after
  - audience: Who you're persuading (demographics, current position, resistance level)
  - format: talk | pitch | negotiation | meeting | written-argument
  - content: Draft or outline (if exists)
Saida: |
  - persuasion_architecture: Which principles + rhetorical appeals to use and in what order
  - ethical_check: Confirmation all influence is transparent and ethical
  - argument_structure: Complete argument with ethos/pathos/logos balance
  - objection_map: Anticipated objections with pre-suasion responses
veto_conditions:
  - "Manipulation intent detected → REFUSE and educate on ethical persuasion"
  - "No clear objective → ASK what outcome user wants"
  - "Audience without context (demographics, position, resistance level) → BLOCK"
  - "Conflicting persuasion principles used → BLOCK"
  - "Emotional appeal >70% without logical backing → BLOCK"
  - "No objection map when resistance level is HIGH → BLOCK"
sla:
  target_duration: "30-45 min"
  max_duration: "60 min"
  warning_threshold: "55 min"
---

# *craft-persuasive-talk

Engineer a persuasive communication using Cialdini's influence principles + Heinrichs' classical rhetoric.

## When to Use

- User needs to persuade an audience to take action
- User has a pitch or proposal that needs persuasion architecture
- User faces resistance/objections and needs strategic argumentation
- User wants to make an existing talk more convincing

## Workflow

### Step 1: Persuasion Analysis (Cialdini)

Activate `robert-cialdini`:

1. **Map the 7 Principles** relevant to this situation:
   - Reciprocity: Can you give before you ask?
   - Commitment/Consistency: What small yes leads to the big yes?
   - Social Proof: Who else has done this?
   - Authority: What credentials establish trust?
   - Liking: What creates rapport?
   - Scarcity: What makes this urgent/exclusive?
   - Unity: What shared identity can you invoke?

2. **Pre-Suasion Setup**: What context/framing primes the audience before the ask?

3. **Ethical Gate**: Is each principle being used transparently? (Cialdini is strict about this)

### Step 2: Rhetorical Architecture (Heinrichs)

Activate `jay-heinrichs`:

1. **Choose the Appeal Balance:**
   - **Ethos** (character/credibility) — How much? When?
   - **Pathos** (emotion) — Which emotions? How to trigger?
   - **Logos** (logic/evidence) — What proof structure?

2. **Argument Structure:**
   - **Future-focus**: Steer to deliberative rhetoric (what should we do?)
   - **Concession strategy**: What to concede to gain credibility
   - **Common ground**: Where do you and audience already agree?

3. **Objection Handling:**
   - Map anticipated objections
   - Design pre-suasion responses (address before they arise)
   - Use "reluctant conclusion" technique where appropriate

### Step 3: Integrate Architecture

Combine Cialdini's influence principles with Heinrichs' rhetorical structure:

```
PERSUASION ARCHITECTURE
├── PRE-SUASION (before the talk)
│   └── Context/framing that primes receptivity
├── OPENING — Ethos + Liking + Unity
│   └── Establish credibility and shared identity
├── PROBLEM — Pathos + Scarcity
│   └── Emotional connection to the problem's urgency
├── SOLUTION — Logos + Authority + Social Proof
│   └── Evidence-based case with expert backing
├── OBJECTION HANDLING — Concession + Reciprocity
│   └── Address resistance, give ground strategically
├── CALL TO ACTION — Commitment/Consistency
│   └── Small yes → medium yes → big yes sequence
└── CLOSE — Unity + future vision
    └── Shared identity reinforcement
```

### Step 4: Present to User

## Inline Checklist

Execute each item during the task:

- [ ] **Ethos**: Credibility and authority established
- [ ] **Pathos**: Emotional appeal calibrated to audience
- [ ] **Logos**: Logical structure with evidence
- [ ] **Influence Principle**: At least one Cialdini principle selected and applied
- [ ] **Ethical Check**: All persuasion is transparent (no manipulation)
- [ ] **Objection Map**: Anticipated objections mapped with responses
- [ ] **Pre-Suasion**: Context/framing designed to prime audience
- [ ] **Balance**: Emotional appeal <70% or balanced with logic

## Error Handling

### Auto-Heal Conditions

| Error | Detection | Auto-Heal Action |
|-------|-----------|-----------------|
| Manipulation detected | Step 1 ethical gate | Refuse task, educate on ethical influence, offer redesign |
| Conflicting principles | Step 1 principle mapping | Warn user, redesign with coherent principle set |
| Objection map empty but resistance HIGH | Step 2 | Block and request more audience data or research objections |
| Emotional >70% without logic | Step 2 balance check | Auto-add logos layer (data, case study, or expert quote) |
| No pre-suasion when resistance HIGH | Step 1 | Auto-generate context framing question |

### Escalation Triggers

- Manipulation intent persists after education → Refuse task entirely
- User insists on conflicting principles after warning → Escalate to storytelling-masters-chief
- Audience data insufficient after 2 requests → Escalate with recommendation to conduct research

## Output Example

```
🎯 Persuasion Architecture — "Board Approval for AI Investment"

AUDIENCE: 7 board members (3 skeptics, 2 neutral, 2 supportive)
OBJECTIVE: Approve $2M AI pilot program
RESISTANCE LEVEL: High (budget concerns + AI skepticism)

PRE-SUASION:
Send 1-week prior: Case study from competitor's AI success (Social Proof)
Prime with question: "What would it mean if we could do X in half the time?"

PERSUASION FLOW:
1. [Ethos + Liking] Open with shared pain point all board members
   experienced last quarter (rapport)
2. [Pathos + Scarcity] "Three of our top 5 competitors launched AI
   pilots last quarter. We have a 6-month window."
3. [Logos] Data: ROI projections from industry benchmarks + our
   internal pilot results (3 slides max)
4. [Concession] "I know the budget is tight. That's exactly why
   we're proposing a pilot, not a full rollout." (builds ethos)
5. [Social Proof + Authority] "Gartner reports 73% of companies in
   our sector have active AI programs."
6. [Commitment/Consistency] "You approved the digital transformation
   charter in Q2. This is the next step of that commitment."
7. [Call to Action] "I'm asking for $2M and 6 months. If metrics
   don't hit target, we stop. Zero risk."

OBJECTION MAP:
- "Too expensive" → [Scarcity] Cost of NOT doing it
- "AI is hype" → [Authority] McKinsey data + peer examples
- "Team isn't ready" → [Concession + Plan] "Fair point.
  That's why Phase 1 includes training."

ETHICAL CHECK: ✅ All principles transparent. No manipulation.
```

## Related

- **Primary Agent:** robert-cialdini (Tier 2)
- **Secondary Agent:** jay-heinrichs (Tier 2)
- **Next Tasks:** design-keynote-sparkline (for presentation layer)
