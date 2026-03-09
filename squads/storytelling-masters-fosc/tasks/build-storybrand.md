---
task: Build StoryBrand BrandScript
responsavel: donald-miller
secondary: chip-dan-heath
model: sonnet
elicit: true
Entrada: |
  - business: Name, industry, core product/service
  - customer: Who they serve (demographics, psychographics)
  - current_messaging: Existing website copy, tagline, or pitch (if any)
Saida: |
  - brandscript: Complete 7-part SB7 BrandScript
  - one_liner: Elevator pitch formula (problem + solution + result)
  - website_wireframe: Above-the-fold messaging structure
  - stickiness_audit: SUCCESs score of the brandscript (Heath layer)
veto_conditions:
  - "No business/customer defined → ASK before proceeding"
  - "B2C with no customer persona → BUILD persona first"
  - "No clear hero (customer is not positioned as hero) → BLOCK"
  - "No problem articulated (external, internal, philosophical) → BLOCK"
  - "No guide positioning (empathy + authority missing) → BLOCK"
  - "No plan of action (steps unclear or >5 steps) → BLOCK"
  - "No brand differentiation from competitors → BLOCK"
sla:
  target_duration: "25-35 min"
  max_duration: "50 min"
  warning_threshold: "45 min"
---

# *build-storybrand

Create a complete StoryBrand BrandScript using Miller's SB7 framework + Heath's stickiness layer.

## When to Use

- User needs brand messaging that converts
- Website copy isn't generating leads
- Pitch/elevator speech feels flat
- User needs to clarify "what we do" for any audience

## Workflow

### Step 1: SB7 Framework (Miller)

Activate `donald-miller` to build the BrandScript:

**The 7 Elements:**

1. **CHARACTER** (Customer-Hero): Who is your customer and what do they want?
2. **PROBLEM**: External problem, internal problem, philosophical problem, villain
3. **GUIDE** (Brand): How do you show empathy + authority?
4. **PLAN**: What 3-4 step process do you offer?
5. **CALL TO ACTION**: Direct CTA + transitional CTA
6. **FAILURE**: What happens if they don't act?
7. **SUCCESS**: What does their life look like after?

### Step 2: One-Liner Formula

```
[PROBLEM] + [SOLUTION] + [RESULT]

Example: "Most small business owners waste money on confusing
marketing. We help you clarify your message so customers listen.
Schedule a free call and stop losing sales."
```

### Step 3: Stickiness Layer (Heath)

Activate `chip-dan-heath` to audit the BrandScript:

- Is the messaging **Simple** enough? (Can a 12-year-old understand it?)
- Is there **Unexpected** contrast? (Not just "we're great")
- Is it **Concrete**? (Specific outcomes, not vague promises)

### Step 4: Website Above-the-Fold

Apply BrandScript to website structure:
```
ABOVE THE FOLD:
├── Header: One sentence that says what you offer
├── Sub-header: How it makes their life better
├── CTA Button: Direct call to action
└── Image: Hero using product/service successfully
```

### Step 5: Present Complete Package

## Inline Checklist

Execute each item during the task:

- [ ] **Hero Identified**: Customer (not company) is the hero
- [ ] **Problem External**: Tangible, external problem identified
- [ ] **Problem Internal**: Internal frustration/feeling identified
- [ ] **Problem Philosophical**: Deeper "why" problem identified
- [ ] **Guide Empathy**: Brand shows understanding of customer pain
- [ ] **Guide Authority**: Brand demonstrates competence/credentials
- [ ] **Plan Clear**: 3-4 step process defined (not >5 steps)
- [ ] **CTA Defined**: Both direct and transitional CTAs present
- [ ] **Failure Stakes**: Consequences of inaction articulated
- [ ] **Success Vision**: Clear picture of life after solution
- [ ] **Brand Differentiation**: Competitive advantage clear

## Error Handling

### Auto-Heal Conditions

| Error | Detection | Auto-Heal Action |
|-------|-----------|-----------------|
| Hero = company (not customer) | Step 1 | Force perspective flip: rewrite with customer as protagonist |
| Problem too surface-level | Step 1 | Dig into internal/philosophical layers with "why does this matter?" prompts |
| No brand differentiation | Step 1 | Prompt competitive analysis: "What do competitors say? How are you different?" |
| Plan >5 steps | Step 2 | Consolidate steps or chunk into phases |
| Vague success vision | Step 1 | Force concrete sensory details: "What does their day look like?" |

### Escalation Triggers

- Customer refuses to be positioned as hero after explanation → Escalate to storytelling-masters-chief
- No differentiator exists (commodity product) → Escalate with recommendation to find unique process/guarantee
- Multiple audiences with conflicting needs → Escalate to create separate BrandScripts per segment

## Output Example

```
📋 StoryBrand BrandScript — "FitCoach Pro"

1. CHARACTER (Customer-Hero):
   Busy professionals who want to get fit but don't have
   time to figure out what workout to do each day.

2. PROBLEM:
   - External: No time to plan workouts
   - Internal: Feel guilty about neglecting health
   - Philosophical: "Staying healthy shouldn't require
     a PhD in exercise science"
   - Villain: Information overload in the fitness industry

3. GUIDE (FitCoach Pro):
   - Empathy: "We know what it's like to stare at a gym
     full of equipment and not know where to start."
   - Authority: 50,000+ users, designed by certified trainers

4. PLAN:
   Step 1: Take 2-minute fitness quiz
   Step 2: Get your personalized daily workout
   Step 3: Follow along in the app (15-30 min/day)

5. CALL TO ACTION:
   - Direct: "Start Your Free Week"
   - Transitional: "Download the 5-Minute Morning Routine PDF"

6. FAILURE:
   Continue wasting time googling workouts, feeling guilty,
   watching health decline while life gets busier.

7. SUCCESS:
   Feel confident in your body, have energy for family,
   never wonder "what should I do today?" again.

ONE-LINER:
"Most busy professionals waste hours figuring out workouts.
FitCoach Pro gives you a personalized 15-minute plan every day.
Start your free week and stop guessing."

STICKINESS AUDIT (Heath):
  Simple: 9/10 — Clear and compact
  Concrete: 8/10 — "15-minute plan" is tangible
  Emotional: 7/10 — Guilt + relief cycle works
  Overall: 8.0/10 ✅
```

## Related

- **Primary Agent:** donald-miller (Tier 3)
- **Secondary Agent:** chip-dan-heath (Tier 2 — stickiness audit)
- **Template:** storybrand-brandscript-tmpl.md
- **Previous Tasks:** build-story-structure (if needed first)
