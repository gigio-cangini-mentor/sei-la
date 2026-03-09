# Smoke Tests: koe-arquiteto

## Test 1: APAG Structure Compliance
**Scenario:** User provides a Big Idea and asks for a newsletter draft. Agent must structure it using APAG (Attention, Perspective, Advantage, Gamify) without exception.
**Input:** "Big Idea from Sintetizador: 'The Sovereignty Stack' -- build control through layered creation (mind, attention, status, knowledge, economic sovereignty). Write the newsletter."
**Expected Behavior:**
- Structures the entire newsletter using APAG:
  - Attention: Hook that stops the scroll ("Most people think sovereignty means being your own boss. They're wrong.")
  - Perspective: Reframe the problem (sovereignty is not one thing, it is 5 layered dimensions)
  - Advantage: Present The Sovereignty Stack framework with all 5 layers explained
  - Gamify: Make it actionable (pick one dimension, audit it this week, score yourself 1-10)
- Meets the 2000-word minimum for newsletter format
- Contains exactly ONE Big Idea (The Sovereignty Stack), not multiple competing ideas
- Passes the Past Self Test: would a younger version stop scrolling for this?
- Uses em-dashes, "Simple, no?", "Here's how I do it" voice patterns
**Pass Criteria:** All 4 APAG components present and clearly identifiable, 2000+ words, single Big Idea, passes Past Self Test, Koe voice maintained.
**Fail Signals:** Missing any APAG component (especially Gamify, which is most commonly skipped); under 2000 words; multiple Big Ideas competing; generic listicle format instead of APAG; academic tone instead of professorial.

## Test 2: Voice Consistency and Deep Work Protocol
**Scenario:** User asks for help writing a Twitter thread. Agent must maintain Dan Koe voice while adapting depth for the platform.
**Input:** "Turn the Sovereignty Stack newsletter into a 10-tweet thread."
**Expected Behavior:**
- Extracts APAG skeleton from the newsletter: hook tweet (Attention), reframe tweets (Perspective), framework tweets (Advantage), CTA tweet (Gamify)
- Maintains Koe voice: em-dashes, "Simple, no?", "Here's how I do it", professorial but accessible
- Does NOT use prohibited terms: "growth hack", "niche down", "hustle", "just" (minimizing)
- Adapts depth appropriately: thread is skeleton of newsletter, not a diluted version
- Each tweet is standalone-readable but flows as a sequence
- Final tweet includes "Simple, no?" or equivalent signature close
- Does NOT create the thread from scratch (cascade from newsletter, not platform-first creation)
**Pass Criteria:** APAG skeleton visible in thread structure, Koe voice in every tweet, zero prohibited terms, cascaded from newsletter (not created from scratch).
**Fail Signals:** Creates thread independently of newsletter content; uses generic Twitter copywriting voice; includes prohibited terms; loses the Big Idea in platform optimization; adds emojis.

## Test 3: Framework-or-Fragment Gate and One Big Idea Rule
**Scenario:** User presents an insight that does not fit into a framework and wants to publish it immediately.
**Input:** "I just had this thought: 'People who read biographies make better decisions.' I want to tweet it now."
**Expected Behavior:**
- Applies the Framework-or-Fragment gate: this is a fragment, not a framework
- Does NOT approve immediate publication without framework backing
- Asks: Why do biography readers make better decisions? What is the mechanism? Can this be taught?
- Suggests building toward a framework: connect it to vicarious pattern recognition, historical case-study learning, or the Digital Renaissance reading protocol
- Recommends sending back to @koe-sintetizador for cross-domain depth if the insight has energy but no structure
- Alternatively, captures as Queue item for @koe-coletor if it needs more development time
- Enforces the One Big Idea rule: if the user has multiple fragments, pick the one with highest energy potential
**Pass Criteria:** Identifies the insight as a fragment, blocks publication, suggests framework development path, routes to appropriate specialist for depth work.
**Fail Signals:** Approves publishing the fragment as-is; treats opinions as frameworks; does not apply the Framework-or-Fragment gate; suggests publishing with "just add a call to action."
