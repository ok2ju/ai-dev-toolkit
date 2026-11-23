---
name: review-mr
description: Review an existing GitLab merge request or GitHub pull request — intent first, code only once the intent holds, with parallel finders and independent verifiers — and post the findings to it as review comments. Use when the user says "review MR !123", "review PR #45", "review this MR <url>", or /review-mr. For local changes not yet pushed, use review-diff.
---

# Review MR

Delegate the reading to `mr-reviewer` agents, which hold the two-phase checklist and the report format, and the checking to `finding-verifier` agents. This conversation orchestrates, relays the findings, and posts them; it never reads the diff itself. The find → verify → tag pipeline is the one in `review-diff`; this file names only what differs for an MR.

## 1. Fix the target

The user gives an MR number or URL. None given → find the MR for the current branch (`glab mr list --source-branch "$(git branch --show-current)"` / `gh pr list --head "$(git branch --show-current)"`). No match → ask for one and stop.

Host comes from the URL's hostname, or from whichever CLI answers for this directory:

```bash
glab api projects/:id 2>/dev/null | jq -r .path_with_namespace
gh api repos/:owner/:repo 2>/dev/null --jq .full_name
```

Then fetch the MR once, here, into named refs. Every agent below runs in parallel and reads these SHAs; none of them fetches, because a fetch rewrites the one shared `FETCH_HEAD`.

```bash
glab mr view <iid> -F json | jq '{title, target_branch, sha, diff_refs}'
gh pr view <n> --json title,baseRefName,headRefOid

git fetch origin <target_branch>
git fetch origin +refs/merge-requests/<iid>/head:refs/review/mr-<iid>   # GitLab
git fetch origin +pull/<n>/head:refs/review/pr-<n>                      # GitHub
head=$(git rev-parse refs/review/mr-<iid>)       # or refs/review/pr-<n>
base=$(git merge-base origin/<target_branch> "$head")
git diff --stat "$base" "$head"
```

Check `$head` matches the head SHA from the view. `--stat` only — the size and the file list, nothing more. If the MR belongs to another repository than this clone, the fetch fails: give the agents the MR ref alone and let them fall back to the API.

**Round.** State file is `.scratch/mr-<iid>/review.md` (GitHub: `pr-<n>`), same block format as `review-diff`, with `snapshot:` the reviewed head and `base:` the merge-base. Pick the round:

- No file, or the user said `full` → round 1, whole MR.
- Round 2 or 3 → pass the last head to the finders as a **delta**. Review the whole MR instead, still deduplicated against the file, when the head was rebased (`git merge-base --is-ancestor <last_head> "$head"` fails) or the base moved (`$base` differs from the recorded one — the target branch was merged in).
- Three rounds done → do not run a fourth. List the findings recorded in the file and tell the user the approach needs another look.

**Tier.** As in `review-diff`: the user's choice, else `quick` under 50 changed lines or docs-only, `deep` when a changed path matches **Deep paths** in `git show "$head":REVIEW.md`, `standard` otherwise.

## 2. Find

Spawn the finders in one message. Each gets the MR ref, the host, `<head>` and `<base>`, the delta when there is one, its lens, and anything the user said about what to focus on.

| Tier | Finders |
|------|---------|
| `quick` | 1, no lens |
| `standard` | 3: `correctness`, `failure`, `security` |
| `deep` | 6, two per lens |

Only one finder judges intent: the first `correctness` one (or the only one). Tell every other finder **skip intent**.

Large MR (roughly 20+ files or a few thousand changed lines) → split the file list from `--stat` into coherent slices — by subsystem, so a changed signature and its callers land in the same slice — at most 6, one finder per slice and no lens. Tell each one its slice is a slice; only the first judges intent.

The agent is `core:mr-reviewer` where another installed plugin also defines an `mr-reviewer`, and `mr-reviewer` otherwise. If no agent can be spawned, read `agents/mr-reviewer.md` from this plugin, work that checklist inline, skip step 3, and say in step 4 that the findings are unverified.

Intent `wrong` → discard every code finding and skip step 3. A change that should be redone gets no line comments.

## 3. Verify

`quick` skips this step. Otherwise do what `review-diff` step 4 does: merge the `path:line` findings, drop exact duplicates and any finding already in the state file, number them, and spawn 3 `finding-verifier` agents (`core:finding-verifier` on a name clash). Give each `<base>`, `<head>`, the delta when there is one, and the numbered list. Keep a finding when 2 of 3 votes are not `drop`; tag it with its most common non-`drop` vote, tie → `important` over `pre-existing` over `nit`.

`MR:` intent findings skip the verifiers: they are judgements about the request, not about a line of code.

Do not re-review. Check it yourself only for a load-bearing finding the agents could not make concrete: that one file at that one line.

## 4. Report

Runs on every tier and every path, including `quick`, the inline fallback, and intent `wrong`.

Drop any finding — `MR:` lines included — already recorded in the state file. Then show: count line first, then the intent verdict, `MR:` lines, and `path:line` lines worst first (`important`, `pre-existing`, `nit`). At most 3 `nit` lines, or the `REVIEW.md` cap; say how many were cut. Append the round to the state file: round, tier, scope, snapshot, base, kept findings.

## 5. Post

Posting is outward-facing: it notifies the author and stays in the MR history. Post only when the user asked for it in the request ("review and post"), or confirms after seeing the findings. Nothing found → offer to post nothing, or a one-line "reviewed, no findings" note.

Write comments in plain English for the author, not in the agent's compressed format. One comment per finding:

```
**important**: <problem, with the input or state that triggers it>.

<fix>.
```

The tag is the finding's: `important`, `nit`, or `pre-existing`. A `pre-existing` comment says the MR did not introduce the bug, so the author is not blamed for it.

Never approve, request changes, resolve threads, or merge. Comments only.

**Where each finding goes**

- `MR:` findings, and the intent verdict → one summary comment.
- Intent `wrong` → the summary comment only, saying why the approach should be revisited. No inline comments; the code findings were discarded.
- `path:line` findings → inline, on that line of the MR head. A line outside every diff hunk cannot take an inline comment on either host: put it in the summary as `path:line — ...`.

Get the hunk ranges from the head side of the diff: each `@@ -a,b +c,d @@` header covers new lines `c` through `c+d-1`.

**GitLab** — one discussion per inline finding, positioned against the MR's `diff_refs`:

```bash
glab api --method POST "projects/:id/merge_requests/<iid>/discussions" \
  -H "Content-Type: application/json" --input - <<'EOF'
{"body": "<comment>",
 "position": {"position_type": "text",
   "base_sha": "<diff_refs.base_sha>", "start_sha": "<diff_refs.start_sha>", "head_sha": "<diff_refs.head_sha>",
   "old_path": "<path>", "new_path": "<path>", "new_line": <line>}}
EOF
glab mr note <iid> -m "<summary>"
```

A position on an unchanged context line also needs `old_line`. When the API rejects a position, do not retry it: move that finding into the summary.

**GitHub** — one review carrying the summary and every inline comment, so the author gets one notification:

```bash
gh api --method POST "repos/:owner/:repo/pulls/<n>/reviews" --input - <<'EOF'
{"commit_id": "<headRefOid>", "event": "COMMENT", "body": "<summary>",
 "comments": [{"path": "<path>", "line": <line>, "side": "RIGHT", "body": "<comment>"}]}
EOF
```

One comment outside the diff fails the whole review with `422`, which is why the hunk filter above runs first. Still `422` → post the summary with every finding in it, inline ones included.

Post against the head SHA the agent reviewed. Head moved since the review → say so and ask before posting; the lines may no longer match.

Report the URL of the summary comment or review, and how many findings went inline versus into the summary.
