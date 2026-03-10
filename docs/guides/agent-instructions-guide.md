# Agent Instructions Guide — CLAUDE.md, AGENTS.md, GEMINI.md

Reference guide for writing effective instruction files across all 3 coding agent harnesses.
Based on [HumanLayer's "Writing a Good CLAUDE.md"](https://www.humanlayer.dev/blog/writing-a-good-claude-md) and extended for multi-harness usage.

---

## Equivalence Table

| Concept | Claude Code | Codex (OpenAI) | Gemini CLI |
|---------|-------------|-----------------|------------|
| Main instructions file | `CLAUDE.md` | `AGENTS.md` | `GEMINI.md` |
| Project-level | `.claude/CLAUDE.md` | `AGENTS.md` (root) | `GEMINI.md` (root) |
| Global (user-level) | `~/.claude/CLAUDE.md` | `~/.codex/instructions.md` | `~/.gemini/GEMINI.md` |
| Conditional rules | `.claude/rules/*.md` with `paths:` | N/A (manual) | N/A (manual) |
| Slash commands | `.claude/commands/*.md` | N/A | N/A |
| Hooks (pre/post actions) | `.claude/settings.json` hooks | N/A | N/A |
| Memory | `memory/MEMORY.md` | N/A (stateless) | N/A (stateless) |

**Key insight:** The principles below apply to ALL three. The file name changes, the rules don't.

---

## Core Principles

### 1. LLMs Are (Almost) Stateless

LLMs don't learn over time. The only thing the model knows about your codebase are the tokens you put into it. The instructions file is the only file that enters EVERY session by default.

**Implications:**
- The agent knows nothing about your codebase at session start
- You must inform it about everything important each session
- The instructions file is the primary way to do this

### 2. What to Include: WHY + WHAT + HOW

| Dimension | What to write | Example |
|-----------|---------------|---------|
| **WHY** | Purpose of the project | "AI-orchestrated system for full-stack development" |
| **WHAT** | Tech stack, project structure, codebase map | Tree diagram with labels |
| **HOW** | How to work in the project | Essential commands, verification steps |

### 3. Less Is More

Research indicates:
- Frontier thinking models can follow **~150-200 instructions** reliably
- Smaller models degrade **exponentially** with more instructions
- Claude Code's system prompt already contains **~50 instructions**
- As instruction count increases, compliance drops **uniformly** (not just for new instructions)

**Target:** < 300 lines for the instructions file. Ideally < 100.

### 4. Universal Applicability

The instructions file enters EVERY session. Only include what applies to EVERY task.

**Include:** project purpose, codebase map, essential commands, critical constraints
**Exclude:** database schema details, specific workflow rules, code style guides

### 5. Progressive Disclosure

Instead of putting everything in the instructions file, keep detailed docs in separate files and add pointers:

```markdown
## Detailed Documentation
| Document | When to consult |
|----------|----------------|
| `docs/workflows.md` | When working with stories |
| `docs/agent-authority.md` | When delegating between agents |
| `docs/database-schema.md` | When modifying database |
```

**Prefer pointers over copies.** Don't include code snippets — they go stale. Use `file:line` references.

### 6. Don't Be an Expensive Linter

Never put code style guidelines in the instructions file.

- LLMs are expensive and slow compared to linters
- Style rules add irrelevant instructions that degrade overall compliance
- **LLMs are in-context learners** — they follow existing patterns naturally

**Instead:**
- Use ESLint/Prettier/Biome with auto-fix
- Configure a stop hook that runs the linter and feeds errors back
- Create a slash command for formatting reviews (separate from implementation)

### 7. Never Auto-Generate

The instructions file is the **highest-leverage point** in the harness. A bad line here affects every phase of every workflow. Craft it carefully.

---

## Harness-Specific Notes

### Claude Code

**Unique advantage:** `rules/` with `paths:` frontmatter for conditional loading.

```yaml
---
paths:
  - docs/stories/**
  - .aiox-core/development/tasks/**
---
# This rule only loads when working on matching files
```

**System reminder:** Claude Code wraps CLAUDE.md content with:
```
IMPORTANT: this context may or may not be relevant to your tasks.
You should not respond to this context unless it is highly relevant to your task.
```
This means Claude will **actively ignore** content it deems irrelevant. More non-universal content = more ignored instructions.

**Progressive Disclosure tools:**
- `rules/*.md` with `paths:` frontmatter (conditional)
- `.claude/commands/*.md` (slash commands, loaded on demand)
- Hooks in `settings.json` (pre/post tool actions)
- `memory/MEMORY.md` (persistent across sessions)

### Codex (OpenAI)

**No conditional loading.** Everything in `AGENTS.md` loads every session.

**Compensate by:**
- Keeping `AGENTS.md` extremely concise (< 80 lines)
- Using "read this file when needed" pointers aggressively
- Relying on Codex's codebase indexing for context discovery

**Codex sandbox:** Runs in a sandboxed environment. Include setup commands if dependencies need installation.

### Gemini CLI

**No conditional loading.** Everything in `GEMINI.md` loads every session.

**Compensate by:**
- Same strategy as Codex — concise + pointers
- Gemini has large context windows but the same instruction-following limits apply
- Include tool/function availability notes if using extensions

---

## Audit Checklist

Use this checklist periodically to validate your instructions files:

### Size & Structure
- [ ] Main instructions file is < 300 lines (ideally < 100)
- [ ] Total always-loaded context (instructions + rules + memory) < 500 lines
- [ ] Every section is universally applicable to all tasks
- [ ] No duplicated content between instructions file and rules/docs

### Content Quality
- [ ] Has WHY (project purpose in 1-2 sentences)
- [ ] Has WHAT (codebase map/tree)
- [ ] Has HOW (essential commands to build/test/verify)
- [ ] No code style rules (handled by linter)
- [ ] No code snippets (they go stale)
- [ ] Uses pointers to detailed docs, not inline content

### Progressive Disclosure
- [ ] Detailed rules are in separate files, not in the main instructions
- [ ] Conditional loading is used where available (Claude: `paths:` frontmatter)
- [ ] "Detailed Documentation" section with pointers and "when to consult"
- [ ] Slash commands for task-specific workflows

### Anti-Patterns
- [ ] No motivational text or role-play preambles
- [ ] No instructions the LLM system prompt already covers
- [ ] No "always do X" for things the model does naturally
- [ ] No auto-generated content
- [ ] No environment details the model can discover (reading package.json, etc.)

---

## Template: Minimal Instructions File

Works for any harness (rename to CLAUDE.md, AGENTS.md, or GEMINI.md):

```markdown
# Project Name

Brief description of what this project does and why it exists.

## Structure

\`\`\`
project/
├── src/           # Application source
├── tests/         # Test suites
├── docs/          # Documentation
└── scripts/       # Build and utility scripts
\`\`\`

## Essential Commands

\`\`\`bash
npm test           # Run tests
npm run lint       # Lint check
npm run build      # Production build
\`\`\`

## Key Constraints

- [Most important constraint]
- [Second most important constraint]
- [Third most important constraint]

## Detailed Documentation

| Document | When to consult |
|----------|----------------|
| `docs/architecture.md` | Architectural decisions |
| `docs/workflows.md` | Development workflows |
| `docs/database.md` | Database changes |
```

---

*Reference: [HumanLayer Blog](https://www.humanlayer.dev/blog/writing-a-good-claude-md)*
*Maintained by: AIOX Core Team*
*Last audit: 2026-03-09*
