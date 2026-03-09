# Smoke Tests: APAG Structure Validation

> Cross-cutting validation: ensures koe-arquiteto outputs follow Dan Koe's APAG
> (Attention → Problem → Agitate → Guide) writing framework consistently.
> Tests structural compliance, not just content quality.

## Test 1: APAG Structure Completeness
**Scenario:** Request a newsletter draft and verify it contains all 4 APAG sections in the correct order.
**Input to koe-arquiteto:** "Write a newsletter about why most creators fail in their first year."
**Expected Behavior:**
- Output contains clearly identifiable ATTENTION section (hook that stops the scroll)
- Followed by PROBLEM section (names the specific problem creators face)
- Followed by AGITATE section (deepens the pain, makes it personal, shows consequences)
- Followed by GUIDE section (framework-based solution, clear next step)
- Sections appear in A → P → A → G order (not scrambled)
- Uses Dan Koe's voice: em-dashes, philosophical grounding, framework references
- Includes at least 1 Big Idea that challenges conventional wisdom
**Pass Criteria:** All 4 APAG sections present in correct order; each section serves its function; Big Idea present; Dan Koe voice maintained throughout.
**Fail Signals:** Missing any of the 4 sections; sections out of order; Guide section is generic ("just keep going!") instead of framework-based; no Big Idea; sounds like generic copywriting.

## Test 2: APAG Attention Hook Quality
**Scenario:** Provide a boring topic and verify the Attention hook is genuinely compelling, not clickbait.
**Input to koe-arquiteto:** "Write the opening of a newsletter about email list management."
**Expected Behavior:**
- Hook is provocative or counterintuitive (Dan Koe style: "The conventional wisdom is wrong")
- Does NOT use clickbait ("You won't BELIEVE what happened...")
- Does NOT use question-only hooks ("Want to know the secret?")
- Uses a statement that challenges assumptions or reveals a hidden truth
- First 2 sentences make reader stop scrolling
- References a specific framework or personal experience
**Pass Criteria:** Opening challenges conventional wisdom; avoids clickbait patterns; creates genuine curiosity through insight, not manipulation; aligns with Dan Koe's anti-conformity principle.
**Fail Signals:** Generic hook; clickbait pattern; question-only opening; starts with "In this newsletter..."; no connection to a framework or insight.

## Test 3: APAG Guide Section Framework Integration
**Scenario:** Verify the Guide section prescribes a specific Dan Koe framework, not generic advice.
**Input to koe-arquiteto:** "Write the Guide section for a newsletter about overcoming creative blocks."
**Expected Behavior:**
- References a SPECIFIC Dan Koe framework (e.g., Conscious Conditioning, Focus Funnel, Creative Energy Management)
- Provides actionable steps from the framework (not "just believe in yourself")
- Includes a clear next step the reader can take TODAY
- Framework reference is natural (woven into the narrative, not forced)
- Ends with either a call to action or a philosophical closer (Dan Koe style)
**Pass Criteria:** Names at least 1 Dan Koe framework; provides 3+ actionable steps from it; includes "do this today" action; framework feels organic, not bolted on.
**Fail Signals:** Generic advice ("find your why", "stay consistent"); no framework reference; steps are vague ("think about what inspires you"); ends without clear action; sounds like any other productivity writer.
