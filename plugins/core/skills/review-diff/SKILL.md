---
name: review-diff
description: Review the working diff before commit or PR — correctness, security, leftovers. Use when the user says "review my diff", "review my changes", or "check before commit".
---

# Review diff

Delegate the reading to the `diff-reviewer` agent, which holds the checklist and the report format. The diff never has to enter this conversation's context, which matters most at the end of a long `ship` — the moment the review is needed and the room for it is gone.

## 1. Fix the scope

```bash
git status --short
git diff --stat HEAD          # staged + unstaged vs last commit
git diff --stat main...HEAD   # whole branch, when reviewing a PR
```

`--stat` only. Reading the diff here is the cost this skill exists to avoid.

Default scope is `HEAD`. Use the branch range when the user says PR, branch, or names a base. Empty scope — say so and stop.

## 2. Spawn the reviewer

One agent for an ordinary change: pass it the range, the changed-file list from `--stat`, and anything it would otherwise have to guess — the task this diff implements, and `.scratch/<slug>/plan.md` when one exists, so it can judge the change against what was decided rather than against its own idea of the goal.

When `--stat` is large (roughly 20+ files or a few thousand changed lines), split the file list into coherent slices — by subsystem, not alphabetically, so that a changed signature and its callers land in the same slice — and spawn one agent per slice in a single message so they run in parallel. Tell each one its slice is a slice: cross-slice callers get reported as `risk`, not as confirmed bugs.

The agent is `core:diff-reviewer` where another installed plugin also defines a `diff-reviewer`, and `diff-reviewer` otherwise. If no agent can be spawned, read `agents/diff-reviewer.md` from this plugin and work that checklist inline.

## 3. Relay, do not re-review

Pass the findings through worst first, in the agent's own format, merged into one list when there were several agents. Drop exact duplicates; keep both lines when two agents found different problems on the same line.

Do not re-derive a finding to check it — that reads the diff you just paid an agent to read. Verify only when a finding is load-bearing and the agent could not make it concrete: open that one file at that one line, nothing more.

Then say what happens next: fix, or commit. Nothing found is a complete answer — report it plainly and stop.
