---
name: ship
description: Build what plan.md describes, verify it against the plan's acceptance criteria, and keep .scratch/<slug>/state.md current. Use when the user says ship it, implement the plan, or continue an in-progress task.
argument-hint: "Which task or step should be built?"
---

# Ship

Build the plan, one step at a time, and prove it against the criteria the plan already committed to.

## 1. Load the state

Read `.scratch/<slug>/state.md`, then `plan.md`, then `notes.md` for the check commands. Where state and plan disagree, **state wins** — it is the newer truth.

No `state.md` yet? Create it before writing any code, with **Next** pointing at step 1. A state file created at the end of the work is a state file that never gets created, because the run that needed it is the run that was interrupted.

## 2. Build one step, then check it

Work the plan's **Steps** in order. After each step, run the test and lint commands from the notes. Do not stack three steps and then debug the pile — the whole point of ordered steps is that a failure has one obvious cause.

Keep each step to a commit-sized unit of work.

## 3. Update state.md after every step

Before starting the next step, not at the end of the session:

```markdown
# <task> — state

Updated: <today's date>  |  Plan: ./plan.md

## Done
- Step 1 — <commit sha, or "uncommitted">

## Next
The single next action, concrete enough for a cold start.

## Blocked
What is stopping it and who can unblock it. "Nothing" is a valid entry.

## Deviations from plan
- What changed, and why.

## Criteria
- [x] Criterion — how it was checked, and the actual result.
```

**Next** is the field that matters. Write it so a fresh session with no memory of this conversation can act on it without re-deriving anything.

## 4. Verify against the criteria, not against your impression

Walk the plan's **Acceptance criteria** one at a time. For each: run the check, and record the actual output in `state.md`.

- Never tick a box you did not run. A ticked box is a claim that someone else will rely on.
- A criterion that turns out to be unrunnable stays unticked and gets a note saying why.
- A failing criterion is a result, not an embarrassment. Report it with the output.

## 5. When the plan is wrong

It will be, somewhere. Handle it by size:

- **Tactical** — a different helper, a different file, an extra guard: do it, record it under **Deviations** with the reason, keep going.
- **Structural** — the goal moves, a criterion becomes wrong, the approach does not survive contact: stop and put it to the user. Do not silently redesign and hand back something that passes a different bar than the one that was agreed.

Never edit `plan.md` to match what was built. That erases the fact that something changed, which is exactly the fact the next session needs.

## 6. Finish honestly

Run `review-diff` before the commit or PR.

Then report: criteria met, criteria not met and why, deviations, and anything left in **Blocked**. "Done" means every criterion ran and passed. Anything else gets named — a task reported as finished that is not is worse than a task reported as blocked, because nobody goes looking for it.
