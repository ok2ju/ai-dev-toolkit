---
name: plan
description: Turn explored notes into an approach with runnable acceptance criteria at .scratch/<slug>/plan.md. Use after exploring, or when the user asks for a plan, an approach, or a design for a change.
argument-hint: "Which task should be planned?"
---

# Plan

Decide the shape of the change, and write down what will prove it works.

## 1. Read the map first

Read `.scratch/<slug>/notes.md`. If it is missing, run `explore` — for a small task, reading the two files yourself is enough, but read them. Planning against a remembered codebase produces a plan that is internally consistent and wrong.

Answer the **Open questions** from the notes before writing the plan. Facts you can look up, look up. Decisions belong to the user: put each one to them with your recommended answer, and wait. If the decisions are load-bearing enough that the plan collapses when one flips, use `grill-me` instead of asking them one by one yourself.

## 2. Pick the smallest shape that works

Stop at the first option that holds:

1. Does this need to exist at all? Speculative need — say so and stop.
2. Does the repo already do this somewhere? Reuse it. This is what the **Reuse** section of the notes is for.
3. Does the standard library or the platform cover it?
4. Does an already-installed dependency cover it? Never add a new one for what a few lines can do.
5. Only then: the least code that works.

Write down the options you rejected and why, one line each. This is the section that stops a future session — or a future you — re-opening a settled question and burning an hour on it.

## 3. Make the acceptance criteria runnable

This is the load-bearing part of the whole workflow. Verification is not a phase that happens later; it is this list, written before the code, and `ship` executes it.

A criterion is a check another person could run without asking you what you meant:

- Good: `POST /orders with an expired token returns 401 and writes no row` — `npm test -- orders.auth`
- Good: `npm run lint passes with no new warnings`
- Bad: "auth works correctly", "no regressions", "code is clean"

If a criterion cannot be run, either turn it into an observable behaviour with an expected result, or move it out of the list and into **Risks** where its unverifiability is visible.

## 4. Order the steps so the repo is never broken

Each step should leave the repository in a state that builds and passes its checks. A plan whose step 3 is the first point at which anything runs is a plan with no resume point — and the context will run out at step 2.

## 5. Write the plan

One file, `.scratch/<slug>/plan.md`:

```markdown
# <task> — plan

## Goal
What is true when this is done. One or two sentences.

## Approach
The chosen shape, in prose. Name each file that changes and what its change does.

## Acceptance criteria
- [ ] A check with a command or an observable behaviour, and its expected result.

## Steps
1. Ordered. Each leaves the repo building and green.

## Rejected
- Option — why not. One line each.

## Risks
- Risk — the signal that it went wrong, and the fallback.

## Out of scope
What a reader would reasonably assume is included and is not.
```

Keep it shorter than the diff it describes. A plan longer than its own implementation is a document that will be skimmed instead of followed.

## 6. Freeze it

Once `ship` starts, `plan.md` stops changing. Reality diverging from the plan is normal and gets recorded in `state.md` under **Deviations** — that way the plan stays a record of what was decided and why, rather than being quietly edited until it agrees with whatever was built.

Rewrite the plan only when the **Goal** or the acceptance criteria change. That is a new decision, so put it to the user.

Finish by showing the acceptance criteria and asking whether they are the right bar. Suggest `to-issues` when the work spans sessions or people.
