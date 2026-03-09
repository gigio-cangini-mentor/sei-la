---
task: Validate Storytelling Quality
responsavel: storytelling-masters-chief
model: sonnet
elicit: false
Entrada: |
  - output: Any deliverable from squad tasks (story spine, sparkline, brandscript, etc.)
  - task_origin: Which task generated this output
Saida: |
  - quality_score: 0-10 overall score
  - tier_scores: Score per tier checklist section
  - pass_fail: PASS (>= 7.0) | CONDITIONAL (5.0-6.9) | FAIL (< 5.0)
  - fixes: Specific items to fix if not PASS
veto_conditions:
  - "No output to validate → BLOCK"
  - "Output is from another squad → REDIRECT"
  - "No scoring rubric applied → BLOCK"
  - "Score <5.0 without improvement plan → BLOCK"
  - "Validation skipped for any applicable tier → BLOCK"
  - "Output delivered without validation → BLOCK"
  - "Ethical concerns not addressed → BLOCK"
sla:
  target_duration: "10-15 min"
  max_duration: "20 min"
  warning_threshold: "18 min"
---

# *validate

Validate any storytelling output against the quality checklist.

## When to Use

- After any task produces a deliverable
- As the final phase of the wf-storytelling-consultation workflow
- When user wants quality assurance on storytelling content

## Workflow

### Step 1: Identify Applicable Sections

Based on `task_origin`, determine which checklist sections apply:

| Task Origin | Applicable Sections |
|-------------|-------------------|
| build-story-structure | Estrutura Narrativa (Tier 0) + Meta-Qualidade |
| design-keynote-sparkline | Apresentação (Tier 1) + Meta-Qualidade |
| make-it-stick | Persuasão (Tier 2) + Meta-Qualidade |
| craft-persuasive-talk | Persuasão (Tier 2) + Meta-Qualidade |
| build-storybrand | Especializado (Tier 3) + Meta-Qualidade |
| engineer-personal-story | Apresentação (Tier 1) + Meta-Qualidade |
| design-beat-sheet | Estrutura Narrativa (Tier 0) + Especializado (Tier 3) |

### Step 2: Run Checklist

Use `checklists/storytelling-quality-checklist.md` and score each applicable item:

- ✅ = 1 point (item satisfied)
- ⚠️ = 0.5 points (partially satisfied)
- ❌ = 0 points (not satisfied)

### Step 3: Calculate Score

```
score = (points_earned / max_possible_points) × 10
```

### Step 4: Generate Verdict

| Score | Verdict | Action |
|-------|---------|--------|
| >= 7.0 | PASS | Deliver to user |
| 5.0-6.9 | CONDITIONAL | List fixes, offer rework |
| < 5.0 | FAIL | Must rework, identify which agent fixes what |

### Step 5: Output Report

## Inline Checklist

Execute each item during the task:

- [ ] **Structure Score**: Narrative structure scored ≥7/10
- [ ] **Presentation Score**: Presentation elements scored ≥7/10 (if applicable)
- [ ] **Persuasion Score**: Persuasion architecture scored ≥7/10 (if applicable)
- [ ] **Stickiness Score**: SUCCESs dimensions scored ≥7/10 (if applicable)
- [ ] **Overall Score**: Combined score ≥7.0
- [ ] **Ethical Check**: No manipulation, transparency confirmed
- [ ] **Improvement Plan**: Specific fixes listed if score <7.0
- [ ] **Tier Coverage**: All applicable tiers validated

## Error Handling

### Auto-Heal Conditions

| Error | Detection | Auto-Heal Action |
|-------|-----------|-----------------|
| Score <5.0 | After Step 3 | Return to responsible agent with specific feedback on weakest dimensions |
| Score 5.0-6.9 | After Step 3 | Offer optional iteration with focused improvements |
| Score <5.0 after 2 iterations | After re-validation | Escalate to storytelling-masters-chief |
| Missing applicable tier | After Step 1 | Re-run checklist with correct tier coverage |
| Ethical concerns detected | Step 2 | Block delivery, return to responsible agent with ethical feedback |

### Escalation Triggers

- Score <5.0 after 2 iterations → Escalate to storytelling-masters-chief with full diagnostic
- Ethical violation that cannot be fixed → Refuse delivery, escalate to chief
- User demands delivery of failing output → Escalate with documentation of quality issues

## Output Example

```
✅ Quality Validation — PASS (8.2/10)

Estrutura Narrativa: 9/10 (4.5/5 items)
Meta-Qualidade: 7.5/10 (3.75/5 items)

Issues:
- ⚠️ Call to action could be more specific (Meta-Qualidade #5)

Verdict: PASS — Ready for delivery.
```

## Related

- **Agent:** storytelling-masters-chief (orchestrator)
- **Checklist:** storytelling-quality-checklist.md
- **Workflow:** wf-storytelling-consultation (phase 4: validate)
