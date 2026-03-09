# Smoke Tests: Cross-Agent Sovereignty Enforcement

> Cross-cutting validation: ensures ALL koe-* agents enforce sovereignty principles
> as a non-negotiable constraint on every recommendation.
> Sovereignty is the north star of the Koe squad — no agent should ever recommend
> actions that decrease sovereignty without explicitly flagging it.

## Test 1: Sovereignty Violation Detection (Offers Agent)
**Scenario:** User proposes an offer structure that sacrifices time sovereignty for revenue.
**Input to koe-offers:** "I want to offer unlimited 1-on-1 coaching calls for $2,000/month per client. I'll cap it at 20 clients."
**Expected Behavior:**
- Calculates the time cost: 20 clients x weekly calls = 20+ hours/week MINIMUM
- Identifies time sovereignty violation: schedule locked to client availability
- Identifies revenue sovereignty risk: income stops if you stop showing up
- Does NOT simply approve because revenue is high ($40K/month)
- Suggests sovereignty-preserving alternative: group coaching, async support, cohort model
- References "Radical Simplicity" or "Leverage over headcount"
- Runs informal sovereignty check on the proposal
**Pass Criteria:** Identifies time sovereignty violation; does not approve as-is; proposes leverage-based alternative; references specific sovereignty framework.
**Fail Signals:** Approves the model because $40K/month is good revenue; only suggests "raising the price"; ignores the time trap; fails to run sovereignty check; says "it depends on your goals" without framework.

## Test 2: Sovereignty Coherence Across Routing (Chief Agent)
**Scenario:** User asks for help that spans 2 agents, and the routing must preserve sovereignty coherence.
**Input to koe-chief:** "I want to grow my Instagram to 100K followers and create a $5K coaching program."
**Expected Behavior:**
- Diagnoses TWO problems: audience growth (koe-brand/koe-distribuidor) + offer design (koe-offers)
- Routes to koe-brand FIRST (build trust system) before koe-offers (design offer)
- Adds sovereignty coherence check: "Growing Instagram is building on rented land — what's the owned audience capture plan?"
- Ensures koe-brand includes email capture in any Instagram strategy
- Ensures koe-offers sovereignty-checks the coaching model (time cap, leverage design)
- Both routings must align: brand feeds offers, offers respect sovereignty
**Pass Criteria:** Routes to 2 specialists in correct order; adds sovereignty coherence check about "rented land"; ensures email capture is part of the plan; coaching model gets sovereignty scrutiny.
**Fail Signals:** Routes only to one agent; approves Instagram growth without mentioning owned audience; doesn't flag coaching as potential time trap; treats the two goals as unrelated.

## Test 3: Sovereignty as Tiebreaker (Advisor Agent)
**Scenario:** User presents two equally valid business paths, and sovereignty must be the deciding factor.
**Input to koe-advisor:** "Option A: Agency model — $500K/year but I need 5 employees and an office. Option B: One-Person Business — $200K/year but fully remote, 20 hours/week, no employees."
**Expected Behavior:**
- Runs Sovereignty Test on BOTH options explicitly
- Option A scores: Revenue 8, Time 3, Creative 4, Location 2 → Average ~4.25
- Option B scores: Revenue 6, Time 9, Creative 9, Location 10 → Average ~8.5
- Clearly recommends Option B based on sovereignty score
- Does NOT waffle or say "it depends on what you value" — sovereignty IS the value
- Acknowledges the revenue difference and reframes: "$200K with sovereignty > $500K trapped"
- References "Sovereignty above everything" and "Radical Simplicity"
- May use Socratic question: "Which version of you is freer in 10 years?"
**Pass Criteria:** Runs sovereignty test on both; scores both; recommends Option B with conviction; reframes revenue difference through sovereignty lens; does not hedge.
**Fail Signals:** Recommends Option A because higher revenue; says "it depends"; fails to run sovereignty test; hedges with "both have merits"; ignores the time/location/creative dimensions; uses "find what works for you" instead of framework.
