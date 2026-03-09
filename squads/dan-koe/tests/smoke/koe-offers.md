# Smoke Tests: koe-offers

## Test 1: Offer Stack Completeness (Godfather Offer Construction)
**Scenario:** User wants to build a digital product offer. Agent must construct a complete Godfather Offer with all required components.
**Input:** "I want to create a course teaching people how to build a one-person content business. I've helped 12 clients do this via coaching at $3K each. What should the offer look like?"
**Expected Behavior:**
- Validates that Stage 1 (Service) is complete: 12 clients at $3K = proven demand
- Identifies current Revenue Path position: transitioning from Stage 1 (Service) to Stage 3 (Framework)
- Constructs complete Godfather Offer with ALL components:
  - Core Transformation: specific measurable outcome (e.g., "Launch your content business generating $5K/month in 90 days")
  - Value Stack: modules that deliver the transformation (not random content volume)
  - Strategic Bonuses: accelerators that enhance the outcome (not unrelated extras)
  - Risk Reversal: quantifiable guarantee with conditional refund
  - Urgency Mechanism: authentic scarcity (not fake countdown timers)
  - Social Proof: references the 12 clients as case studies
- Prices based on transformation value, NOT content length
- Targets 98% margin (digital delivery, near-zero marginal cost)
- References "sell transformation, not information"
**Pass Criteria:** All 6 Godfather Offer components present, Revenue Path position identified, pricing based on transformation value, 98% margin target, authentic urgency mechanism.
**Fail Signals:** Missing Risk Reversal or Urgency; prices based on hours of content; suggests discounting; includes fake scarcity (countdown timers that reset); sells information instead of transformation.

## Test 2: Risk Reversal Tier Validation
**Scenario:** User has an existing offer with a weak guarantee. Agent must diagnose the weakness and design a proper Risk Reversal.
**Input:** "My course is $997. My guarantee says 'Satisfaction guaranteed or your money back within 7 days.' But no one is buying."
**Expected Behavior:**
- Diagnoses the guarantee as weak on multiple dimensions:
  - "Satisfaction guaranteed" is vague (not quantifiable)
  - 7-day window is too short (shows low confidence in the product)
  - No implementation condition (opens door to abuse and shows no accountability structure)
- Redesigns with proper Risk Reversal components:
  - Quantifiable outcome: "Get X result in Y timeframe"
  - Conditional refund: requires proof of implementation (prevents abuse, filters serious buyers)
  - Extended timeline: 30-60-90 days (shows confidence)
  - Clear process: simple, no-shame refund request
- Example output: "Complete all 6 modules and implement the framework. If you don't land your first $2K client in 60 days, full refund."
- Explains that the guarantee should be scarier for YOU than for the buyer
- Notes that strong Risk Reversal actually reduces refund rates because it filters for committed buyers
**Pass Criteria:** Diagnoses all 3 weaknesses of current guarantee, redesigns with quantifiable outcome + conditional refund + extended timeline, guarantee is specific and measurable.
**Fail Signals:** Accepts "satisfaction guaranteed" as adequate; suggests removing the guarantee entirely; shortens the timeline further; creates guarantee without implementation condition; uses generic language.

## Test 3: Value Hierarchy Position and "Stack Don't Discount" Rule
**Scenario:** User is competing on price and considers lowering their course price from $497 to $97 to match competitors.
**Input:** "My competitors sell similar courses for $97-$197. Should I drop my price to $197 to be competitive?"
**Expected Behavior:**
- Immediately invokes "Stack Don't Discount" rule: never lower price, add value instead
- Diagnoses the real problem: user is positioned at Information level (selling knowledge), needs to move to Transformation level (selling outcomes)
- Maps the Value Hierarchy: Entertainment ($0) < Information ($7-$497) < Transformation ($1K-$10K) < Implementation ($10K-$100K+)
- Recommends moving UP the hierarchy, not competing at the same level:
  - Add implementation support (office hours, community)
  - Add accountability mechanism
  - Add bonus that accelerates results
  - Create payment plan if price barrier exists
- Explains that discounting destroys perceived value and trains buyers to wait for sales
- Provides pricing formula: price at 10-30% of transformation value to customer
- References "$997 course that generates $10K is worth more than $47 course that generates $0"
**Pass Criteria:** Rejects discounting, invokes Stack Don't Discount rule, maps current Value Hierarchy position, recommends moving up (not competing at same level), provides specific value-adding alternatives.
**Fail Signals:** Recommends lowering price; competes on features or content volume; does not reference Value Hierarchy; suggests "matching the market"; treats price as the problem instead of positioning.
