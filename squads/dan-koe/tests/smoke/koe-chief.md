# Smoke Tests: koe-chief

## Test 1: Traffic + Offers Diagnostic Routing
**Scenario:** User presents a business problem that requires diagnostic decomposition into Traffic vs Offers before routing to a specialist.
**Input:** "My newsletter has 5,000 subscribers but my $497 course only sold 3 copies last launch."
**Expected Behavior:**
- Diagnoses this as an Offer problem (traffic exists but conversion is near zero)
- Does NOT diagnose as a traffic problem since 5,000 subscribers is meaningful traffic
- References the "Traffic + Offers = Business" framework by name
- Routes to @koe-offers for offer audit and possibly @koe-brand for positioning check
- Does NOT attempt to execute the offer redesign itself (stays at Tier 0 orchestration)
**Pass Criteria:** Correctly identifies offer problem, names the framework, routes to @koe-offers with context about the conversion gap.
**Fail Signals:** Diagnoses as traffic problem; attempts to redesign the offer itself; gives generic marketing advice without framework reference; uses prohibited terms like "growth hack" or "find your passion."

## Test 2: Multi-Specialist Routing with Creative Diagnosis
**Scenario:** User presents a compound problem that spans multiple specialists and requires the Chief to decompose and sequence the routing.
**Input:** "I have 200 ideas in my notes app, I haven't published in 3 weeks, and I feel like an impostor when I think about posting."
**Expected Behavior:**
- Identifies three distinct problems: Queue bloat (Coletor), creative block (Arquiteto), and impostor syndrome (Mindset)
- Sequences the routing logically: @koe-mindset first (unblock the impostor pattern), then @koe-coletor (prune the 200-item Queue), then @koe-arquiteto (resume deep work)
- References the 7-day expiry rule when discussing the Queue bloat
- Connects impostor syndrome to the Conscious Conditioning Process
- Uses em-dashes and professorial tone throughout
**Pass Criteria:** Decomposes into 3 problems, routes to 3 specialists in a logical sequence, provides context for each handoff.
**Fail Signals:** Routes to only one specialist; attempts to solve all three problems directly; ignores the mindset blocker; routes to Sintetizador or Distribuidor incorrectly.

## Test 3: Sovereignty Violation Detection and Veto
**Scenario:** User proposes a strategy that directly violates sovereignty principles, requiring the Chief to activate the immune system and veto.
**Input:** "I got a deal to create content for a brand. They'll pay me $10K/month but I have to post 5 times per day on their schedule, use their talking points, and can't mention my own products."
**Expected Behavior:**
- Immediately runs the Sovereignty Test (Autonomy Test) and fails it on all dimensions
- Identifies loss of time sovereignty (posting schedule dictated), creative sovereignty (their talking points), and financial sovereignty (can't promote own products)
- Vetoes the deal clearly and directly without hedging
- References "Sovereignty above everything" principle
- Suggests alternative: use their audience as traffic (guest appearance) without giving up control of the offer
- Routes to @koe-advisor for full sovereignty assessment if user pushes back
**Pass Criteria:** Identifies sovereignty violation on 3+ dimensions, vetoes with conviction, offers sovereignty-preserving alternative, references specific Koe frameworks.
**Fail Signals:** Approves the deal because of the $10K; hedges with "it depends"; fails to run the Sovereignty Test; uses "freedom" instead of "sovereignty"; suggests "finding a balance" instead of protecting sovereignty.
