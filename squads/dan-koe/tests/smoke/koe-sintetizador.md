# Smoke Tests: koe-sintetizador

## Test 1: Cross-Domain Synthesis with 3+ Domain Minimum
**Scenario:** User provides Queue items from multiple domains that need to be synthesized into a Big Idea with a named framework.
**Input:** "Top Queue items from Coletor: 1) Marcus Aurelius on controlling only your responses, 2) How Spotify's recommendation algorithm creates filter bubbles, 3) James Clear's identity-based habits, 4) The concept of 'skin in the game' from Taleb."
**Expected Behavior:**
- Identifies the universal principle connecting all four: identity shapes behavior shapes outcomes (or similar cross-cutting insight)
- Synthesizes across minimum 3 domains: philosophy (Aurelius), technology/marketing (Spotify), psychology (Clear), risk/economics (Taleb)
- Creates a NAMED framework (e.g., "The Identity Leverage Stack" or "Sovereign Identity Protocol")
- Builds Iceberg depth: surface is the simple Big Idea, depth includes the research connections
- Does NOT just summarize each item separately (that is collection, not synthesis)
- References "Innovation happens at intersections, not in the middle of well-trodden paths"
**Pass Criteria:** Universal principle extracted across 3+ domains, framework named, Iceberg Model applied (surface + depth), synthesis goes beyond summarization.
**Fail Signals:** Summarizes each item individually without finding connections; stays in a single domain; produces a pattern without naming it as a framework; creates surface-only Big Idea without archaeological depth.

## Test 2: Framework Naming and Iceberg Model Depth
**Scenario:** User has a half-formed Big Idea that is surface-level only and needs depth construction.
**Input:** "I have this idea: 'Your brand is your resume 2.0.' It feels catchy but shallow. How do I make it deeper?"
**Expected Behavior:**
- Acknowledges the surface is catchy but diagnoses missing Iceberg depth
- Asks the archaeologist questions: Why does this work? (philosophy), What cognitive bias supports this? (psychology), What historical precedent exists? (evolution/history)
- Builds depth layers beneath the surface: personal brand as trust signal (evolutionary psychology), resume as credentialism vs brand as demonstrated competence (philosophy), network effects of content vs static document (systems thinking)
- Renames or refines the framework: elevates from catchy phrase to named framework with structure (e.g., "The Trust Architecture" with layers)
- Provides the Smart Notes Hybrid process: Select, Relevance, Expand, Condense, Connect
- Distinguishes between surface (tweet/thread) and depth (newsletter/course) applications
**Pass Criteria:** Identifies missing depth, builds 3+ domain archaeological research, names/refines the framework, distinguishes surface vs depth applications per Iceberg Model.
**Fail Signals:** Accepts "brand is resume 2.0" as sufficient; adds only marketing examples (single-domain); does not name a framework; skips Iceberg Model entirely; provides tips without archaeological depth.

## Test 3: Rejection of Single-Domain and Premature Specialization
**Scenario:** User wants to synthesize but is working entirely within one domain, violating the Digital Renaissance mandate.
**Input:** "I want to create a Big Idea about email marketing. I've read 5 books on email marketing, studied 10 email funnels, and analyzed 20 subject lines. Ready to synthesize."
**Expected Behavior:**
- Diagnoses the Digital Renaissance violation: consumption is entirely within one domain (marketing)
- Does NOT proceed with synthesis from single-domain material
- Applies the T-Shaped Knowledge intervention: vertical depth in marketing is fine, but horizontal breadth is missing
- Recommends specific cross-domain reading: philosophy (Stoic dichotomy of control applied to open rates), psychology (Cialdini's reciprocity, Kahneman's System 1/2 for subject lines), evolution (status signaling in communication)
- Provides a Cross-Pollination Recipe: read one marketing chapter + one philosophy chapter + one psychology chapter, then ask "What universal principle connects all three?"
- References "Specialization is for insects" and "You are the niche"
**Pass Criteria:** Refuses to synthesize from single-domain material, diagnoses the problem as premature specialization, prescribes cross-domain reading, provides Cross-Pollination Recipe.
**Fail Signals:** Proceeds with single-domain synthesis; produces an email marketing framework without cross-domain inputs; does not challenge the narrow reading diet; uses "niche down" language instead of "you are the niche."
