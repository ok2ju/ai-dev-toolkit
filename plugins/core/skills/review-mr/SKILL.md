---
name: review-mr
description: Review an existing GitLab merge request or GitHub pull request — intent first, code only once the intent holds — and post the findings to it as review comments. Use when the user says "review MR !123", "review PR #45", "review this MR <url>", or /review-mr. For local changes not yet pushed, use review-diff.
---

# Review MR

Delegate the reading to the `mr-reviewer` agent, which holds the two-phase checklist and the report format. This conversation relays the findings and posts them; it never reads the diff itself.

## 1. Fix the target

The user gives an MR number or URL. None given → find the MR for the current branch (`glab mr list --source-branch "$(git branch --show-current)"` / `gh pr list --head "$(git branch --show-current)"`). No match → ask for one and stop.

Host comes from the URL's hostname, or from whichever CLI answers for this directory:

```bash
glab api projects/:id 2>/dev/null | jq -r .path_with_namespace
gh api repos/:owner/:repo 2>/dev/null --jq .full_name
```

Then get the size, nothing more:

```bash
glab mr view <iid> -F json | jq '{title, changes_count, diff_refs}'
gh pr view <n> --json title,changedFiles,additions,deletions,headRefOid
```

## 2. Spawn the reviewer

One agent for an ordinary MR: pass it the MR ref, the host, and anything the user said about what to focus on.

Large MR (roughly 20+ files or a few thousand changed lines) → split the file list (`gh pr view <n> --json files` / `glab mr diff <iid> --raw | grep '^diff --git'`) into coherent slices — by subsystem, so a changed signature and its callers land in the same slice — and spawn one agent per slice in a single message. Tell each one its slice is a slice: only the first judges intent, and cross-slice callers get reported as `risk`.

The agent is `core:mr-reviewer` where another installed plugin also defines an `mr-reviewer`, and `mr-reviewer` otherwise. If no agent can be spawned, read `agents/mr-reviewer.md` from this plugin and work that checklist inline.

## 3. Relay

Show the findings worst first, in the agent's own format: intent verdict, then `MR:` lines, then `path:line` lines. Merged into one list when there were several agents; drop exact duplicates.

Do not re-review. Verify only a load-bearing finding the agent could not make concrete: that one file at that one line.

## 4. Post

Posting is outward-facing: it notifies the author and stays in the MR history. Post only when the user asked for it in the request ("review and post"), or confirms after seeing the findings. Nothing found → offer to post nothing, or a one-line "reviewed, no findings" note.

Write comments in plain English for the author, not in the agent's compressed format. One comment per finding:

```
**bug**: <problem, with the input or state that triggers it>.

<fix>.
```

Never approve, request changes, resolve threads, or merge. Comments only.

**Where each finding goes**

- `MR:` findings, and the intent verdict → one summary comment.
- Intent `wrong` → the summary comment only, saying why the approach should be revisited. No inline comments; the agent did not review the code.
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
