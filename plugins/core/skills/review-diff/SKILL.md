---
name: review-diff
description: Review the working diff before commit or PR — correctness, security, leftovers — with parallel finders and independent verifiers, so only findings most voters agree are real come back (the quick tier skips the verifiers). Use when the user says "review my diff", "review my changes", or "check before commit". Takes an optional tier (quick, standard, deep) and "full" to restart the round count.
---

# Review diff

Finders read the diff in parallel, each through one lens. Verifiers then check every candidate against the code, and only the ones most of them agree on come back. The diff never enters this conversation: the agents read it, and only short finding lines pass through here. That matters most at the end of a long `ship` — the moment the review is needed and the room for it is gone.

Subagents cannot spawn subagents, so this skill does the orchestration and nothing else.

## 1. Fix the scope and the round

```bash
git status --short
git diff --stat HEAD          # staged + unstaged vs last commit
git diff --stat main...HEAD   # whole branch, when reviewing a PR
```

`--stat` only. Reading the diff here is the cost this skill exists to avoid.

Default scope is `HEAD`. Use the branch range when the user says PR, branch, or names a base. Empty scope — say so and stop.

**State file.** `.scratch/<slug>/review.md`, where `<slug>` is the task whose `.scratch/<slug>/plan.md` this branch implements, and otherwise `review-<branch>` with `/` replaced by `-`. It holds one block per round:

```markdown
## Round 2 — standard — 2026-11-23
scope: main...HEAD (delta since 3f9c2e1)
snapshot: 8a41d07
base: 51be0c4
- src/orders.ts:42: important: ...
```

Take this round's snapshot first — what the round reviews — before spawning anything:

| Scope | Snapshot | Base | Delta since the last snapshot |
|-------|----------|------|-------------------------------|
| `HEAD` | `git stash create` (a commit of the working tree that changes nothing); empty output means a clean tree, then `git rev-parse HEAD` | none | `git diff <last_snapshot>` |
| branch (`main...HEAD`) | `git rev-parse HEAD` — uncommitted edits are outside this scope | `git merge-base main HEAD` | `git diff <last_snapshot> HEAD -- $(git diff --name-only main...HEAD)` |

Untracked files are in no snapshot — the same as `git diff HEAD`. List them from `git status --short` so the user knows they were not reviewed.

Read the state file if it exists, then pick the round:

- **No state file, or the user said `full`** → round 1. Full scope. A `full` request starts a new file; rename the old one to `review.<YYYYMMDD-HHMM>.md`.
- **Round 2 or 3** → review only the delta. Review the full scope instead, still deduplicated against the file, when the last snapshot is gone (`git cat-file -e <last_snapshot>` fails) or the base moved (rebased onto a new `main`).
- **Three rounds already done** → do not run a fourth. Say that the findings keep coming, list the findings recorded in the file, and tell the user to reconsider the approach. Rounds that never converge are mostly finding older bugs, not new ones. `full` overrides.

## 2. Pick the tier

The user named one → use it. Otherwise:

- `quick` — under 50 changed lines, or only docs and comments.
- `deep` — any changed path matches a **Deep paths** entry in `REVIEW.md`.
- `standard` — everything else.

**Risk.** Set it from the changed-file list, never from who wrote the change. It is the number of human approvals the change deserves:

- `high` — a changed path matches **Deep paths** in `REVIEW.md`, or is a CI/CD pipeline file (`.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`). Suggests 2 approvals.
- `low` — every changed path is docs, comments, or tests. Suggests none once the review is clean.
- `medium` — everything else. Suggests 1 approval.

The reason names the path that decided it. The risk is advice: CODEOWNERS and branch protection enforce approvals, not this skill. It reads paths only, so an additive change behind a flag still shows as `medium`.

## 3. Find

Spawn the finders in one message so they run in parallel. Each gets the scope (the delta range on round 2+, with the full scope named for context), the changed-file list, its lens, and anything it would otherwise guess — the task this diff implements, and `.scratch/<slug>/plan.md` when one exists, so it judges the change against what was decided rather than its own idea of the goal.

| Tier | Finders |
|------|---------|
| `quick` | 1, no lens (all checks) |
| `standard` | 3, one per lens: `correctness`, `failure`, `security` |
| `deep` | 6, two per lens |

**Large diff** (roughly 20+ files or a few thousand changed lines): split by slice instead of by lens. Cut the file list by subsystem, not alphabetically, so a changed signature and its callers land in the same slice. At most 6 slices; each finder gets one slice and no lens. Tell each its slice is a slice.

The agent is `core:diff-reviewer` where another installed plugin also defines a `diff-reviewer`, and `diff-reviewer` otherwise. If no agent can be spawned, read `agents/diff-reviewer.md` from this plugin and work that checklist inline, then skip step 4 and say the findings are unverified.

## 4. Verify

`quick` skips this step. Its findings come back tagged as the finder tagged them.

Otherwise merge the finder lines into one list. Drop exact duplicates and any finding already in the state file. Number the rest `F1..Fn`. Nothing left → skip to step 5.

Spawn 3 `finding-verifier` agents in one message (`core:finding-verifier` on a name clash). Give each the full scope, the delta on round 2+, and the same full numbered list. The full scope is what they judge `pre-existing` against: code round 1's change introduced is still the author's on round 3. Each votes on every candidate: `important`, `nit`, `pre-existing`, or `drop`.

Count the votes per candidate:

- Fewer than 2 of 3 votes are something other than `drop` → discard it.
- Otherwise keep it, tagged with its most common non-`drop` vote. Tie → `important` over `pre-existing` over `nit`.

Do not re-derive a vote to check it. That reads the diff you just paid the agents to read.

## 5. Report

Runs on every tier, `quick` and the inline fallback included. Drop any finding already recorded in the state file — step 4 did this for the other tiers. Then start with the count, then the risk line, then the findings worst first — `important`, then `pre-existing`, then `nit` — in the finder's line format. Keep at most 3 `nit` lines, or the cap `REVIEW.md` sets; say how many were cut.

```
2 findings (1 important, 1 pre-existing) — round 2, standard, delta since 3f9c2e1. 4 candidates dropped by verifiers.
risk: medium — product code in src/orders.ts, no Deep path or pipeline file. Suggests 1 approval.
src/orders.ts:42: important: ...
src/cart.ts:88: pre-existing: ...
```

Append this round's block to the state file: round, tier, scope, snapshot, base, kept findings.

Then say what happens next: fix, or commit. Nothing found is a complete answer — report it plainly and stop.

## REVIEW.md

Optional, at the repo root, written by the code owners. Finders and verifiers read it next to `CLAUDE.md`. This skill reads only **Deep paths** and **Nit cap** from it. The format is in this plugin's README. When the same kind of finding keeps coming back across reviews, the fix belongs there, in `CLAUDE.md`, or in a lint rule — not in another round.
