---
task-id: pipeline-status
name: Pipeline Status
agent: brandcraft-chief
version: 1.0.0
purpose: Show current pipeline execution status

inputs: []

outputs:
  - path: "(stdout — no file output)"
    format: markdown-table
    description: Status summary of active workflow and agent progress

acceptance_criteria:
  - "Active workflow identified or 'idle' reported"
  - "Each agent's status shown (pending, running, done, failed)"
  - "Output includes elapsed time and next step"
---

# pipeline-status

## Overview

Diagnostic task that reports the current state of any active BrandCraft workflow. Useful for checking progress mid-execution or debugging stuck pipelines.

Like checking the order status on a delivery app — where is my stuff and what's next.

## Steps

1. **Check active workflow** — Look for in-progress workflow state in `data/` or session context
2. **List agents involved** — Show each agent in the workflow chain and their current status
3. **Show progress** — Display completed steps, current step, and remaining steps
4. **Report timing** — Include when the workflow started and estimated remaining time
5. **Surface errors** — If any agent failed, show the error summary

## Veto Conditions

- None — this is a read-only diagnostic task

## Handoff

on_complete: return status to user (no further dispatch)
on_fail: report "unable to determine status" with troubleshooting hints
