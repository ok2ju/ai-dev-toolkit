# core

Habits worth having in every repository.

| Kind | Name | What it does |
|------|------|--------------|
| Skill | `explore` | Maps the code a change will touch into `.scratch/<slug>/notes.md`. |
| Skill | `plan` | Turns the notes into an approach with runnable acceptance criteria in `plan.md`. |
| Skill | `ship` | Builds the plan, checks it against those criteria, keeps `state.md` current. |
| Skill | `review-diff` | Reviews the working diff or branch before commit or PR: parallel finders, then verifiers vote (except the `quick` tier). |
| Skill | `review-mr` | Reviews an existing MR or PR, intent first, verifies the findings, and posts them to it. |
| Skill | `to-issues` | Breaks a plan or spec into independently-grabbable vertical-slice issues. |
| Skill | `grill-me` | Interrogates a plan or decision one question at a time until the thinking holds. |
| Skill | `handoff` | Compacts the conversation into a handoff document for a fresh agent. Slash command only. |
| Skill | `research` | Sends a background agent to answer a question from primary sources and write up the findings. |
| Skill | `house-rules` | Writes the standing coding rules into a project's `CLAUDE.md`, once per repository. Slash command only. |
| Skill | `copywriter` | Writes and edits prose in any language so it reads as written by a person, not generated. |
| Skill | `eli5` | Explains any topic to a total beginner as one HTML page of big pictures and few words. |
| Skill | `prove-it` | Proves a claim works by running the real thing and quoting the output, never a proxy like "it compiles". |
| Skill | `statechart` | Draws how a system moves between states from the real code, and finds dead ends and paths that break a rule. |
| Skill | `automate-me` | Turns the user's own working conventions into a personal `-mode` skill. Slash command only. |
| Agent | `diff-reviewer` | Reads a diff in its own context and returns tagged findings. Spawned by `review-diff`. |
| Agent | `mr-reviewer` | Reviews an existing MR or PR: intent first, code only once the intent holds. Spawned by `review-mr`. |
| Agent | `finding-verifier` | Checks candidate findings against the code and votes `important`, `nit`, `pre-existing`, or `drop`. Spawned three at a time by both review skills. |

The first three are one loop: **map → decide → build and prove**. State lives in files under `.scratch/<slug>/`, so the chain survives a lost context instead of relying on the model to remember where it was. The other eleven plug into that loop or stand alone. Reading-heavy work is delegated: `explore` fans the codebase reading out to read-only subagents, `review-diff` hands the diff to `diff-reviewer` finders and their findings to `finding-verifier`, and `research` sends a background agent to primary sources — so the conversation keeps its room for deciding and building.

```
/explore <task> → /plan → /ship → /review-diff
```

Enter mid-chain whenever the earlier artifact already exists. Skip the loop entirely for a one-or-two-file fix whose cause you already know — that is what `review-diff` alone is for.

**[Read WORKFLOW.md](WORKFLOW.md)** for the artifact contract, when each tier of process is worth it, worked examples, and where it will let you down.

## REVIEW.md

Optional file at a repository's root, written by its code owners. `review-diff`, `review-mr`, and their agents read it next to `CLAUDE.md`. Keep it short: every finder and verifier loads it.

```markdown
# Review rules

## What failure looks like here
- docs/: it lies — a command or flag that does not exist.
- config/: it misroutes — traffic or a job goes to the wrong place.
- migrations/: it cannot be rolled back.

## Skip
- generated/, vendor/, *.lock

## Deep paths
- billing/, auth/, .github/workflows/

## Nit cap
3
```

**Skip** paths get no findings. A change under a **Deep paths** entry runs the `deep` tier. **Nit cap** limits `nit` lines per report (default 3). When the same finding keeps coming back across reviews, write the rule here or in `CLAUDE.md` instead of fixing it again each round.

## Install

```
/plugin marketplace add ok2ju/ai-dev-toolkit
/plugin install core@ai-dev-toolkit
```

Nothing here hardcodes a language, a test runner, or a directory layout — per-project facts belong in that project's `CLAUDE.md`.

No hooks, no MCP servers, so nothing here executes code on your machine.
