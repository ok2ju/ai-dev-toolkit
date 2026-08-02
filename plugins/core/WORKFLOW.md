# The workflow

Nine skills, one loop: **map the code, decide the approach, build it, prove it.**

Install once, use in every repository. Nothing here is specific to a project, a language, or a stack — see [Using this in every project](#using-this-in-every-project).

---

## Why it is built this way

A skill is a set of instructions loaded into the model's context. There is no pipeline engine, no scheduler, no guarantee that step 3 runs after step 2. That single constraint decides the whole design, so it is worth stating plainly.

Three ways to chain skills exist, and only two of them work:

1. **You run them in order.** Reliable, and it costs a little discipline.
2. **Each skill leaves a file the next one reads.** Reliable, because the state is on disk and survives a lost context, a crashed session, or a different machine.
3. **Each skill's text asks the model to please call the next one.** This is the one that reads well in a README and drops steps in practice.

So this workflow is built on **artifacts, not intentions**. Every phase reads the previous phase's file and writes its own. If a file is missing, the phase says so instead of inventing what it would have contained. The chain is enforced by the filesystem, which does not get distracted.

There is deliberately **no router skill**. An earlier version had one — a skill that sized the task and picked the route for you. It was cut, because sizing a task is the one decision in this workflow that a human makes better: you know the roadmap, the deadline, and how much this area has burned you before. A model sizing from a prompt has none of that. What is left of it is the [tier table](#the-tiers) below, which you read once and then apply from memory.

Two more things this deliberately does **not** do:

- **No separate "tasks" phase.** A plan that does not contain its own ordered steps is not a plan. Splitting work into tickets matters when the work leaves your session for other people or other days — that is `to-issues`, called when it is needed, not a mandatory stop for everyone.
- **No separate "verification" phase at the end.** The last step of a linear pipeline is the step that gets skipped when the session is running out of room. Instead, verification is written down *before* the code as the plan's acceptance criteria, and `ship` executes that list. Same work, ordered so that skipping it is visible.

---

## The artifacts

Everything lives in one directory per task, named by a kebab-case slug:

```
.scratch/<slug>/
├── notes.md    # explore  → what exists today
├── plan.md     # plan     → the approach and its acceptance criteria
├── state.md    # ship     → what is built, what is next, what deviated
└── issues/     # to-issues → vertical slices, for L-tier work only
```

| File | Written by | Read by | Lifecycle |
|------|-----------|---------|-----------|
| `notes.md` | `explore` | `plan`, `ship` | Append-only once `plan` starts. |
| `plan.md` | `plan` | `ship` | **Frozen** once `ship` starts. |
| `state.md` | `ship` | `explore`, `ship`, `handoff` | Rewritten continuously. The resume point. |

The immutability split is the part that earns its keep. `plan.md` frozen means it stays a record of *what was decided and why*, including the options rejected — so a later session cannot quietly re-open a settled question. `state.md` mutable means reality has somewhere to go: deviations get recorded rather than back-fitted into the plan until the plan agrees with whatever got built.

`.scratch/` is git-ignored. These are working notes; the durable output is the diff, the commits, and whatever ADRs the decisions deserve.

---

## The tiers

Size the task yourself, then run that much process and no more.

| Tier | Looks like | What you run |
|------|-----------|--------------|
| **S** | Cause already known, one or two files, no new interface | Nothing. Ask for the fix, then `review-diff`. No artifacts. |
| **M** | Three to ten files, one subsystem, real unknowns | `explore` → `plan` → `ship` → `review-diff` |
| **L** | New subsystem, migration, schema or contract change, multi-session | `explore` → `plan` → `grill-me` → `to-issues` → `ship` per issue |

Four rules, because this is where the workflow actually succeeds or fails:

- **When two tiers fit, take the lower one.** A task can be promoted the moment it outgrows its tier — `notes.md` survives a re-plan. Process spent on a task that never needed it is not refundable.
- **Size by blast radius, not by how the request was worded.** "Just add a field" that lands in a migration, an API response, and three clients is **L** in an **S** costume.
- **Unknowns count.** Two files you have never read is not **S**.
- **Auth, money, migrations, and anything that deletes data is at least M**, whatever its line count. Those are the changes where being wrong is expensive to undo.

That last rule is the one worth pinning where it will actually fire — see the `CLAUDE.md` line under [Using this in every project](#using-this-in-every-project).

---

## The phases

### `explore` → `notes.md`

Answers one question: what exists today, and what will the change have to touch? It traces one real input end to end with `file:line` at each hop, counts the call sites with a number rather than an adjective, finds the code that already does this job, and finds the test command.

It does not propose solutions. Reading and deciding at the same time produces a plan aimed at code you imagined.

Anything unread goes in **Open questions**, not into a confident paragraph. That distinction is the whole value of the file: the next phase has to be able to tell what was verified from what was assumed.

It also checks whether `.scratch/<slug>/` already exists. If there is a `state.md` there, the task is in flight and it sends you to `ship` rather than re-mapping half-built ground.

For questions about an external library, API, or spec, it hands off to `research`, which sends a background agent to primary sources while you keep working.

### `plan` → `plan.md`

Reads `notes.md`, resolves the open questions — facts by looking them up, decisions by asking you — then picks the smallest shape that works: does this need to exist, does the repo already do it, does the standard library, does an installed dependency, and only then new code.

It writes down the options it rejected with one line each, orders the steps so every step leaves the repo green, and writes acceptance criteria that are actually runnable:

- `POST /orders with an expired token returns 401 and writes no row` — `npm test -- orders.auth`
- not `auth works correctly`

Then it freezes. It ends by suggesting `grill-me` when the decisions are load-bearing, and `to-issues` when the work spans sessions or people.

### `ship` → `state.md`

Reads state, then plan, then notes. Builds one step, runs the checks, updates `state.md`, then starts the next step — in that order, because a state file written at the end of the session is a state file that never gets written.

Then it works the acceptance criteria one by one, running each and recording the actual output. It never ticks a box it did not run. A failing criterion is a reported result, not something to smooth over.

When the plan turns out to be wrong: tactical deviations get recorded and the work continues; structural ones — the goal moves, a criterion becomes wrong — stop and come back to you. `plan.md` is never edited to match what was built.

Finishes with `review-diff`, then reports criteria met, criteria not met, and anything still blocked.

---

## Calling order

```
# S — no skills
say the task → /review-diff → commit

# M
/explore <task>   → notes.md
/plan             → plan.md      (asks you to sign off the criteria)
/ship             → state.md     (updated after every step)
                  → /review-diff → commit

# L
/explore → /plan → /grill-me → /to-issues → /ship per issue → /review-diff per issue

# resuming after a break, a crash, or a new session
/ship <slug>      → reads state.md, continues from Next
```

Enter mid-chain whenever the earlier artifact already exists: `/plan` when `notes.md` is there, `/ship` when `plan.md` is. The phases do not need to be invoked by anything but you.

Off the line, by trigger rather than by order:

| Skill | When |
|-------|------|
| `research` | During `explore`, for anything outside this repo — library behaviour, an API contract, a spec. Runs as a background agent, so it costs you almost no context. |
| `grill-me` | After `plan`, before `ship`, when the plan rests on decisions that would collapse if one flipped. |
| `to-issues` | After `plan`, for **L** only, when slices leave your session for other people or other days. |
| `review-diff` | At the end of `ship`, before every commit or PR. Also the entire process for **S**. |
| `handoff` | Any time the context is running out. `notes.md` + `plan.md` + `state.md` + a handoff document beats a full context guessing at its own earlier reasoning. |
| `house-rules` | Once, when a repository first starts using any of this. Writes the standing rules into that project's `CLAUDE.md`, so they are in context before they are needed rather than after. |

---

## Three walkthroughs

**S — a bug with a known cause.**

> the date filter drops the last day of the month

One comparison using `<` where it needs `<=`. Fix it, add the failing case as a test, `/review-diff`. No `.scratch/` directory, because nothing here needs to survive the session. Reaching for `explore` on this is the mistake the tier table exists to prevent.

**M — a feature inside one subsystem.**

```
/explore add pagination to the orders list endpoint
```

Eight files, unknowns in how the existing list query is built. `explore` traces `GET /orders` from route to SQL, greps the response shape and counts four consumers, records the test command. `/plan` reuses the repo's existing cursor helper found in the notes rather than writing an offset scheme, rejects offset pagination in one line, and writes four runnable criteria. `/ship` builds four steps, updating `state.md` after each, runs all four criteria, and reports one failing on empty result sets — then fixes that and re-runs.

**L — a change with a contract in it.**

```
/explore move from API keys to short-lived tokens
```

`explore` maps every auth entry point and counts 31 call sites. `/plan` proposes a dual-accept window, rejects a hard cutover with the reason, and names the rollback. `/grill-me` walks the decision tree — token lifetime, refresh, revocation, what happens to existing integrations — one question at a time. `/to-issues` cuts six vertical slices, each demoable. `/ship` runs per issue, each with its own state, each ending in `review-diff`. `/handoff` fires twice along the way, and both times the next session starts cold and productive.

---

## Using this in every project

These skills carry no project knowledge, which is what makes them portable:

- **No hardcoded commands.** `explore` reads the test and lint commands out of the repo and writes them into `notes.md`; `ship` uses what it finds there. Nothing assumes npm, pytest, cargo, or make.
- **No hardcoded layout.** `.scratch/<slug>/` is the only path the skills own, and it is the convention `to-issues` already used.
- **No hooks, no MCP servers, no scripts.** Nothing in this plugin executes code on your machine. Installing it changes what Claude Code knows, not what it can run.
- **Per-project facts belong in that project's `CLAUDE.md`.** Test command, conventions, ADR locations, deploy rules. The skills read it; they never carry a copy of it.

Install:

```
/plugin marketplace add ok2ju/ai-dev-toolkit
/plugin install core@ai-dev-toolkit
```

Then `/explore <task>` in any repository, or nothing at all for an **S**. Names collide across plugins, so if another installed plugin also defines `plan` or `ship`, address them as `core:plan` and `core:ship`.

**Once per repository, run `/house-rules`.** It writes a marked block into that project's `CLAUDE.md` holding the standing rules — assumptions stated, least code, surgical diffs, verifiable goals, causes over symptoms — plus the one sizing rule worth enforcing, and it ignores `.scratch/`. Rules kept in a document are rules nobody re-reads; rules in `CLAUDE.md` are in context before the mistake instead of after it.

That block is charged on every request in the project, which is the reason it is short. It is also the only durable way to share any of this with teammates: `~/.claude/CLAUDE.md` is per-machine, and a plugin cannot ship memory — a committed `CLAUDE.md` travels with the clone.

Everything else stays per-project: test command, conventions, ADR locations. Run `/init` for those, and `claude-md-improver` when the file needs an audit.

---

## Where this will let you down

Stated up front, because a workflow that only documents its happy path is advertising.

| Failure | What actually happens | What contains it |
|---------|----------------------|------------------|
| Sizing is yours now | An **L** gets treated as **M**, and the plan has to be redone mid-flight | Cheap to promote, and `notes.md` survives the re-plan. Bias low, and keep the auth/money/migrations rule in `CLAUDE.md`. |
| Skills are model-invoked | The model may not pick a phase up from a phrasing you thought was obvious | Type the slash command. That is the whole fix. |
| Criteria can be theatre | Criteria written vaguely enough to always pass | Every criterion needs a command or an observable result. Vague ones are the smell. |
| Verification is instruction, not enforcement | Nothing physically stops a run from skipping the checks | Add a `Stop` or `PostToolUse` hook that runs your test command. This plugin ships none on purpose — a hook executes code on your machine, and that call is yours to make per project. |
| `.scratch/` accumulates | Directories for tasks that shipped months ago | Delete them. They are notes, not history. |
| Plans go stale | A frozen `plan.md` and a repo that moved on | `state.md` holds the drift; if the goal itself moved, re-plan rather than patch. |

The honest summary: this buys **resumability** and **a verification contract written before the code**. It does not buy correctness, and it does not remove the need to read the diff.
