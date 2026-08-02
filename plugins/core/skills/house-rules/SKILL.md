---
name: house-rules
description: Write the coding house rules into this project's CLAUDE.md — assumptions stated, least code, surgical diffs, verifiable goals. Use when setting up a repository, or when the user asks to add coding principles or behavioural guidelines to CLAUDE.md.
disable-model-invocation: true
---

# House rules

Put the standing behavioural rules into this project's memory, where they are in context on every request. Touch nothing else.

These are guidelines, not a generator: this skill writes one marked block and stops. Auditing or restructuring the rest of the file is `claude-md-improver`'s job, and discovering the project's actual facts is `/init`'s.

## Process

1. **Find the project's root `CLAUDE.md`.**

   - It exists → append the block below, preserving everything already in the file.
   - The markers are already there → replace what is between them and say the block was refreshed. This is safe to run twice.
   - No `CLAUDE.md` → create one holding only this block, then tell the user to run `/init` for the project-specific facts. Do not invent those facts. A `CLAUDE.md` padded with generic prose costs context on every request and teaches nothing.

2. **Do not reformat, reorder, or improve the rest of the file.** If existing content contradicts a rule below, say so and let the user decide — do not silently resolve it.

3. **Add `.scratch/` to `.gitignore`** if it is not ignored already.

4. **Report** which file changed, whether the block was added or refreshed, and any contradiction found.

## The block

```markdown
<!-- core:house-rules -->
## House rules

These bias toward caution over speed. On a trivial task, use judgement — they are not a reason to ceremonialise a one-line fix.

**Say what you assumed.** State assumptions before implementing, not after. Where the request has two readings, present both instead of silently picking one. Where something is genuinely unclear, stop and name it rather than building past it.

**Least code that works.** Nothing speculative: no feature that was not asked for, no abstraction with a single caller, no configurability nobody requested, no error handling for states that cannot occur. Two hundred lines that could have been fifty is a rewrite, not a diff. Before writing new code, look for what already does the job in this repo, then in the standard library, then in an installed dependency.

**Surgical diffs.** Every changed line traces to the request. Do not improve adjacent code, comments, or formatting, and match the existing style even where you would choose differently. Unrelated dead code gets mentioned, not deleted — but imports and helpers that *your* change orphaned are yours to remove.

**Verifiable goals.** Turn the task into a check before writing code: "add validation" becomes "tests for invalid input, then make them pass"; "fix the bug" becomes "a test that reproduces it, then make it pass". Weak criteria — "make it work" — cost a clarification round later.

**Fix causes, not symptoms.** A report names a symptom. Before editing, grep the callers of the function you are about to touch: one guard in the shared path is a smaller diff than a guard in every caller, and patching only the path the report named leaves its siblings broken.

Task artifacts live in `.scratch/<slug>/` — see the `explore`, `plan`, and `ship` skills. Anything touching auth, money, migrations, or data deletion gets `explore` and `plan` first, whatever its size.
<!-- /core:house-rules -->
```

## Why this is memory and not a skill

Behavioural rules have to be in context *before* anyone knows they are needed — the moment they would help is the moment the model is already writing the wrong thing. A skill loads on invocation, so rules shipped as a skill are rules that fire after the mistake. Hence: one skill that writes memory, once per repository, instead of rules that wait to be summoned.

That memory is charged on every request in the project, so keep the block short. Adding to it is a real cost, and the file that gets skimmed instead of followed is the file that grew.
