---
name: explore
description: Map the code a change will touch and write the findings to .scratch/<slug>/notes.md. Use before planning a change, or when the user asks how something works, where a feature lives, or what a change would affect.
argument-hint: "What task or area should be mapped?"
---

# Explore

Answer one question: **what exists today, and what will the change have to touch?**

No solutions here. Proposing a fix while still reading is how you end up planning against code you imagined instead of code that is there.

## 1. Claim a directory

Derive a short kebab-case slug from the task and use `.scratch/<slug>/`. If a directory for this task already exists, read what is in it and extend rather than overwrite.

If it holds a `state.md`, this task is already in flight: say so and run `ship` instead. Re-mapping ground that is half-built is the most expensive mistake available here, and it is invisible — the second attempt looks like progress right up to the point it collides with the first.

If `.scratch/` is not already ignored by git, add it to `.gitignore` — these are working notes, not repository history.

## 2. Know what has to come back

Depth beats breadth. Five things have to come back, in this order of value:

1. **A trace of one real input, end to end.** One request, one command, one event — from entry point to the side effect it produces, with `file:line` at every hop. A trace of one path teaches more than a summary of ten.
2. **The blast radius, counted.** `grep` the symbols and signatures the change will touch, and count the call sites. "grepped `resolveUser`: 7 call sites" is a fact; "used in a few places" is a guess wearing a fact's clothes.
3. **What already exists.** The helper, type, validator, or pattern this repo already uses for this job. Most of the code a task appears to need is already a few files over — finding it is the single highest-value thing in this phase.
4. **The checks.** The test command, the lint command, how they run in CI, and which existing tests cover the area. `ship` needs this, and guessing it wastes a whole cycle.
5. **The constraints.** Conventions the repo actually follows (read a neighbouring file, do not trust the style guide), `CLAUDE.md`, ADRs, public interfaces that cannot move, migration rules.

## 3. Fan out the reading

The raw reading does not belong in this conversation. Its output is `notes.md`; every file opened here is context spent on something that ends up on disk anyway — and spent at the start of a task, so the shortage lands on `plan` and `ship`.

**Decide whether to fan out at all.** Two or three files you can already name: read them yourself. Spawning an agent to open one config file costs more than opening it. Fan out when the area is unknown, spans a subsystem, or the blast radius is a number you would otherwise guess.

**Spawn the agents in one message** so they run in parallel. Three jobs, because none of them needs another's output:

| Agent | Brings back | From the list above |
|-------|-------------|---------------------|
| Trace | Numbered hops, `file:line — what happens at this hop` | 1 |
| Blast radius | Call sites per symbol, with counts | 2 |
| Ground rules | Reuse candidates, test and lint commands, covering tests, conventions and contracts | 3, 4, 5 |

Each one gets: the task in one sentence, its own job and no other, and three standing rules — **read-only**, **return `file:line` evidence rather than prose**, **propose no solutions**. Tell every agent to name what it could not read; that list becomes **Open questions**, and an agent that was not asked for it will quietly return a confident gap instead.

Use a read-only agent — the harness's `Explore`, or any equivalent locator. Not a general-purpose agent holding write tools: this phase changes nothing, and an agent that can edit will eventually decide to.

Two things stay here:

- **The file the decision hinges on.** When a report makes a design question concrete, open that file yourself. One or two files, read closely, by the thread that has the whole task in view.
- **`notes.md`.** You write it. The agents report; deciding what the reports mean is not delegable.

When a question is about an external library, API, or spec rather than this repo, delegate it to `research` so a background agent reads the primary sources while you keep going.

## 4. Write the notes

One file, `.scratch/<slug>/notes.md`:

```markdown
# <task> — notes

## Task
One sentence, in the repo's own vocabulary.

## Entry points
- path/to/file.ts:42 — what happens here

## Flow
A numbered trace of one real input, end to end, with file:line at each hop.

## Reuse
Helpers, types, patterns already in this repo that the change should use instead of new code.

## Blast radius
Every caller and consumer affected, with counts: "grepped <symbol>: N call sites".

## Checks
Test command, lint command, which existing tests cover this area.

## Constraints
Conventions, ADRs, contracts that cannot move, migration rules, anything with a hard edge.

## Open questions
Decisions that belong to the user. Each with your recommended answer.
```

## 5. Do not fill gaps with plausible text

Anything nobody read goes in **Open questions**, not in **Flow** — yours and the agents' gaps alike. A note that says "not read: the retry path in worker.ts" is useful; a confident description of a file you skimmed is worse than no note at all, because the next phase cannot tell the difference.

A subagent report is evidence, not a finished note. Where a report reads as prose rather than `file:line`, it is telling you what the agent inferred; carry it over as an open question, not as flow.

Finish by reporting the slug, the blast-radius number, and the open questions — in a few lines, not a re-run of the file.
