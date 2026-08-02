# core

Habits worth having in every repository.

| Kind | Name | What it does |
|------|------|--------------|
| Skill | `explore` | Maps the code a change will touch into `.scratch/<slug>/notes.md`. |
| Skill | `plan` | Turns the notes into an approach with runnable acceptance criteria in `plan.md`. |
| Skill | `ship` | Builds the plan, verifies it against those criteria, keeps `state.md` current. |
| Skill | `review-diff` | Reviews the working diff or branch before commit or PR. |
| Skill | `to-issues` | Breaks a plan or spec into independently-grabbable vertical-slice issues. |
| Skill | `grill-me` | Interrogates a plan or decision one question at a time until the thinking holds. |
| Skill | `handoff` | Compacts the conversation into a handoff document for a fresh agent. Slash command only. |
| Skill | `research` | Sends a background agent to answer a question from primary sources and write up the findings. |
| Skill | `house-rules` | Writes the standing coding rules into a project's `CLAUDE.md`, once per repository. Slash command only. |

The first three are one loop: **map → decide → build and prove**. State lives in files under `.scratch/<slug>/`, so the chain survives a lost context instead of relying on the model to remember where it was. The other six plug into that loop or stand alone.

```
/explore <task> → /plan → /ship → /review-diff
```

Enter mid-chain whenever the earlier artifact already exists. Skip the loop entirely for a one-or-two-file fix whose cause you already know — that is what `review-diff` alone is for.

**[Read WORKFLOW.md](WORKFLOW.md)** for the artifact contract, when each tier of process is worth it, worked examples, and where it will let you down.

## Install

```
/plugin marketplace add ok2ju/ai-dev-toolkit
/plugin install core@ai-dev-toolkit
```

Nothing here hardcodes a language, a test runner, or a directory layout — per-project facts belong in that project's `CLAUDE.md`.

No hooks, no MCP servers, so nothing here executes code on your machine.
