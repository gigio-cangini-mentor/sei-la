# Smoke Tests: koe-distribuidor

## Test 1: Content Cascade Ratio (20+ Pieces from One Big Idea)
**Scenario:** User has a completed newsletter from @koe-arquiteto and needs a full Content Cascade mapped out.
**Input:** "Newsletter complete: 'You Are The Niche -- Why Passion Is Backwards' (2500 words, full APAG). Create the cascade."
**Expected Behavior:**
- Maps the complete cascade from Tier 1 (deepest) to Tier 4 (shallowest):
  - Tier 1: Newsletter already published (2500 words)
  - Tier 2: YouTube script (15-20 min adaptation), Blog post (1500 words SEO)
  - Tier 3: Twitter thread (10-15 tweets), LinkedIn article (1000 words)
  - Tier 4: Individual tweets (5-10), short video clips (1-3 min), quote graphics, audio clips
- Total output: 20+ individual content pieces from one core piece
- Maintains Big Idea consistency: every piece says "You Are The Niche" not a diluted variant
- Includes cascade calendar with strategic spacing (not all published on same day)
- Achieves 1h creation to 10h distributed content leverage ratio
- Does NOT create any piece from scratch (all extracted/adapted from newsletter)
**Pass Criteria:** 20+ pieces mapped across 4 tiers, Big Idea consistent across all formats, cascade calendar included, leverage ratio met, zero from-scratch creation.
**Fail Signals:** Fewer than 15 pieces total; Big Idea diluted for platform trends; no calendar/spacing; creates platform-specific content from scratch; ignores the tier system.

## Test 2: Platform-Specific Format Adaptation via Social Matrix
**Scenario:** User asks to adapt a Big Idea for a specific platform. Agent must apply Social Matrix depth levels without diluting the core message.
**Input:** "Adapt the 'You Are The Niche' Big Idea for Instagram. My audience there is more visual."
**Expected Behavior:**
- References the Social Matrix: Instagram = shallow depth level (Iceberg tip)
- Adapts format: quote graphics, carousel summaries, Reels (1-3 min)
- Hook style: visual-first, condensed Big Idea, aesthetic + insight
- Cadence: 1/day mix of formats
- Core Big Idea stays intact: "You Are The Niche" not "How to find your perfect niche"
- Does NOT change the message for the platform, only the depth and format
- Does NOT create from scratch -- extracts from existing newsletter/cascade
- Warns against diluting the message for Instagram trends or engagement bait
**Pass Criteria:** Correct Social Matrix depth level applied, format matches Instagram specs, Big Idea preserved without dilution, content extracted from cascade (not created from scratch).
**Fail Signals:** Creates Instagram-specific content from scratch; dilutes Big Idea to "find your niche" for broader appeal; optimizes for likes/engagement (vanity metrics); ignores Social Matrix framework; suggests following Instagram trends.

## Test 3: Calendar Spacing and Leverage Ratio Audit
**Scenario:** User wants to publish everything from the cascade at once. Agent must enforce strategic distribution spacing.
**Input:** "I have the full cascade ready. Can I just post everything today to maximize reach?"
**Expected Behavior:**
- Rejects the "post everything now" approach as anti-leverage thinking
- Explains: the Content Cascade is a distribution timeline, not a dump
- Provides proper cascade calendar: Newsletter Sunday, Thread Tuesday, Tweets Wed-Fri, YouTube Saturday, next week Shorts and callbacks
- Demonstrates that one cascade should cover 7+ days of omnichannel presence
- Audits the leverage ratio: 1h creation + ~3h distribution = 4h total for 2+ weeks of content
- References "Calendar is cascade schedule, not creation timeline"
- Maintains Big Idea consistency across the week-long distribution
**Pass Criteria:** Rejects same-day dump, provides 7+ day distribution calendar, achieves leverage ratio, references cascade calendar framework, ensures Big Idea coherence across days.
**Fail Signals:** Approves posting everything at once; treats distribution as a quantity game ("more posts = more growth"); does not enforce strategic spacing; ignores leverage ratio; suggests "post 10x per day" hustle approach.
