---
name: open-mr
description: Open a merge or pull request from the current branch, filled from this project's own template. Detects GitLab or GitHub from the remote and uses glab or gh. Use when the user says open an MR, create a PR, raise a merge request, or /open-mr.
argument-hint: "Which base branch, if not the repository default?"
---

# Open MR

One skill for both hosts, because the difference between GitLab and GitHub here is one CLI name, one flag name, and one template path. Two skills would be the same instructions twice.

Nothing below reads the full diff. The description comes from the decisions, and those are already written down.

## 1. Confirm the branch is already pushed

**This skill does not push.** Pushing is the author's call, and it happens before this runs.

Ask the remote, not the local config:

```bash
branch=$(git branch --show-current)
git ls-remote --heads origin "$branch"   # empty output = the remote has no such branch
git rev-parse HEAD
```

`git status -sb`, `git rev-parse @{u}` and `@{u}..HEAD` all report **local tracking config**, not the remote. A branch pushed without `-u` is on the remote with no upstream set, and those checks call it "never pushed". Do not use them for this. `git ls-remote` queries the remote itself and is correct either way.

- **`ls-remote` printed nothing** → the branch really is not on the remote. Say so, give the exact command, stop:
  `git push -u origin $(git branch --show-current)`
- **Remote SHA ≠ `HEAD`** → say which way. `git merge-base --is-ancestor <remote-sha> HEAD` succeeds → local commits are unpushed: name them (`git log <remote-sha>..HEAD --oneline`) and stop. An MR opened now describes work the host cannot see. Fails, or the SHA is unknown locally (`git cat-file -e <remote-sha>^{commit}`) → the remote has commits you do not: `git fetch origin "$branch"` and re-check.
- **Uncommitted changes in the working tree** → one line of warning, not a stop. They are simply not in the MR.
- **Remote SHA == `HEAD`** → continue.

Then check the branch does not already have one: `glab mr view "$branch"` / `gh pr view "$branch"`. It does → report the URL and stop. Rewriting an existing description is `glab mr update` / `gh pr edit`, and it is the author's decision, not this skill's.

## 2. Pick the host

```bash
git remote get-url origin
```

Hostname says gitlab → `glab`. Says github → `gh`. **Self-hosted GitLab will say neither** — the hostname is the company's. Then ask the CLIs which host they are authenticated for:

```bash
glab auth status 2>&1 | head -5
gh auth status 2>&1 | head -5
```

Whichever is authenticated against the remote's hostname wins. Neither is installed or authenticated → say which one is missing for this host and stop.

## 3. Find the template

The template belongs to the project, so it gets read, not carried here.

```bash
ls .gitlab/merge_request_templates/ .github/PULL_REQUEST_TEMPLATE/ 2>/dev/null
ls .gitlab/merge_request_template.md .github/PULL_REQUEST_TEMPLATE.md \
   .github/pull_request_template.md PULL_REQUEST_TEMPLATE.md \
   docs/PULL_REQUEST_TEMPLATE.md 2>/dev/null
```

Several templates in a directory → ask which one. One → use it. None → a minimal three-heading body, nothing more: **What**, **Why**, **How to verify**.

Filling a template found on disk:

- **Keep every heading**, in its order. A heading with no answer gets an explicit `n/a — <reason>`, never deletion; a reviewer checking the template is complete reads a missing section as a skipped one.
- **Answer the checkboxes** rather than leaving them all unticked, and tick only what is actually true.
- **Remove the HTML comments** once they are answered. They are instructions to the author, and the author is done.

## 4. Fill it from the decisions, not the diff

In this order, stopping as soon as the section has an answer:

1. `.scratch/<slug>/plan.md` — the approach, the options rejected and why, the acceptance criteria. This is the *why*, already written, already signed off.
2. `.scratch/<slug>/state.md` — deviations from the plan, and each criterion with the actual result it produced. This is the *how it was verified*, and it is the section reviewers trust least when it is invented.
3. `git log <base>..HEAD --format='%s%n%n%b'` — when there are no artifacts. The commit bodies carry the reasoning if `commit` did its job.
4. `git diff --stat <base>...HEAD` — scope and blast radius only.

Reading the whole diff to describe a change the commits already describe is the expensive way round.

Ticket reference: take it from the branch name when the project links them — check whether recent commit subjects or MR titles carry keys before adding one.

## 5. Write it for the person who has to review it

Hand the prose to `copywriter`. It is the skill that already owns text leaving the session for a human reader, and a description is exactly that.

What the reviewer needs, in this order:

- **Why this change exists.** One or two sentences. Not the ticket title restated.
- **What to look at first**, and what is mechanical. A reviewer deciding where to spend attention is the whole audience.
- **How it was verified** — the criteria and their real results, including the ones that failed and what was done about them.

Not: a bullet per changed file, a restatement of the diff, `comprehensive`, or a list of every file touched. The file list is a tab in the UI.

## 6. Create it as a draft

```bash
# GitLab
glab mr create --draft --target-branch <base> --title "<title>" \
  --description "$(cat <<'EOF'
<body>
EOF
)"

# GitHub
gh pr create --draft --base <base> --title "<title>" \
  --body "$(cat <<'EOF'
<body>
EOF
)"
```

Base branch: the repository default unless the user named one.

**Draft by default.** This is outward-facing — it can notify a team — and marking it ready is one click the author owns. Do not use `--fill`: it generates the description from commit subjects, which is the work this skill exists to do properly.

Do not assign reviewers and do not @mention anyone unless asked. That pages real people.

Report the URL and whether a template was found, on one line each.
