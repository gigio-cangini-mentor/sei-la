---
task-id: route-request
name: Route Request
agent: brandcraft-chief
version: 1.0.0
purpose: Classify user intent and dispatch to the correct workflow

inputs:
  - name: request
    type: string
    description: Raw user request to be classified and routed
    required: true

outputs:
  - path: "(internal dispatch — no file output)"
    format: workflow-trigger
    description: Dispatches to the appropriate workflow's first agent

acceptance_criteria:
  - "Intent classified into one of: extract, doc, pptx, video, improve"
  - "Brand resolved from context or user input"
  - "Correct workflow triggered with all required params"
  - "Ambiguous requests trigger Discovery Mode (ask user)"
---

# route-request

## Overview

Entry point for every BrandCraft interaction. The chief receives a raw user request, parses the intent, resolves which brand to use, and dispatches execution to the correct workflow.

Think of it as a receptionist — listens to what you need, figures out who can help, and sends you to the right desk.

## Steps

1. **Parse intent** — Extract action keywords from the request (e.g., "extract", "create doc", "presentation", "video", "improve")
2. **Classify workflow** — Map to one of: `extract-design-system`, `generate-doc`, `generate-pptx`, `generate-video`, `improve-output`
3. **Resolve brand** — Check if brand is specified; if not, check `data/brands/` for a single brand or ask user
4. **Validate inputs** — Ensure the workflow has all required inputs before dispatching
5. **Dispatch** — Hand off to the workflow's first agent with structured params

## Veto Conditions

- Request is empty or unintelligible → HALT, ask user to clarify
- Multiple conflicting intents detected → HALT, ask user to pick one
- No brand available and workflow requires one → HALT, ask user to provide brand or URL

## Handoff

on_complete: pass to the first agent of the resolved workflow
on_fail: escalate to user with classification options (1, 2, 3 format)
