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

## 2. Read the real thing

Depth beats breadth. In order:

1. **Trace one real input end to end.** One request, one command, one event — from entry point to the side effect it produces. Record `file:line` at every hop. A trace of one path teaches more than a summary of ten.
2. **Count the blast radius.** `grep` the symbols and signatures the change will touch, and count the call sites. Write the number down. "grepped `resolveUser`: 7 call sites" is a fact; "used in a few places" is a guess wearing a fact's clothes.
3. **Find what already exists.** The helper, type, validator, or pattern that this repo already uses for this job. Most of the code a task appears to need is already a few files over — finding it is the single highest-value thing in this phase.
4. **Find the checks.** The test command, the lint command, how they are run in CI, and which existing tests cover the area. `ship` needs this, and guessing it wastes a whole cycle.
5. **Find the constraints.** Conventions the repo actually follows (read a neighbouring file, do not trust the style guide), `CLAUDE.md`, ADRs, public interfaces that cannot move, migration rules.

When a question is about an external library, API, or spec rather than this repo, delegate it to `research` so a background agent reads the primary sources while you keep going.

## 3. Write the notes

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

## 4. Do not fill gaps with plausible text

Anything you did not read goes in **Open questions**, not in **Flow**. A note that says "not read: the retry path in worker.ts" is useful; a confident description of a file you skimmed is worse than no note at all, because the next phase cannot tell the difference.

Finish by reporting the slug, the blast-radius number, and the open questions — in a few lines, not a re-run of the file.
