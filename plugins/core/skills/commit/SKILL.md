---
name: commit
description: Commit the staged work on a proper work branch, with a ticket number in the title and a message that follows this project's own convention. Use when the user says commit, commit this, write a commit message, or /commit.
argument-hint: "Ticket number, and anything about why this change was made that the diff will not show"
---

# Commit

The git commands here are trivial and the model already knows them. What this skill is for is everything around them: the work is on a branch of its own, the title carries the ticket, and the body carries the *why* — which lives in this conversation and nowhere else, and is gone the moment it is not written down.

So this runs in the current context on purpose. Delegating it to an agent would buy a clean context and pay for it with the only thing worth having.

## 1. See what is there

```bash
git status --short
git diff --stat --cached      # staged
git diff --stat               # unstaged
```

- Nothing staged, nothing unstaged → say so and stop.
- Nothing staged but unstaged changes exist → ask what to stage, unless the user already said "commit everything".
- Untracked files in the way → **list them before staging anything**. `git add -A` over an untracked `.env`, a key, or a build directory is the one mistake in this skill that is not cheap to undo.

Do not review the diff here. `review-diff` runs before this, and re-reading the change to grade it is a different job at a different price.

## 2. Get the ticket number

The ticket goes in the commit title, so it is needed before anything is written, and before a branch is named.

Look, in this order, and stop at the first answer:

1. **The branch name** — `feat/ABC-123-pagination` carries it already.
2. **This conversation** — the user named a ticket or pasted its URL.
3. **`.scratch/<slug>/plan.md`** — the plan usually opens with what it implements.

Still nothing → **ask the user, in one question, and wait.** Do not guess a number, do not invent a placeholder, and do not silently commit without one — a wrong ticket reference is worse than no commit, because it lands in someone else's issue history.

`none` is a valid answer. Take it, note it, and move on without asking again this session.

## 3. Make sure the work is on a work branch

Code changes belong on their own branch. Check where they are:

```bash
git branch --show-current
git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null   # the default branch
```

On `main`, `master`, `develop`, `trunk`, the remote's default branch, or a `release/*` branch → **create the work branch before committing.** Do not commit and fix it afterwards; an unwanted commit on `main` is a rebase, and this is one command.

Name it the way this repository already names branches:

```bash
git branch -r --sort=-committerdate --format='%(refname:short)' | head -20
```

No convention visible → `<type>/<TICKET>-<short-slug>`, e.g. `feat/ABC-123-cursor-pagination`. The type is the same type the commit will carry: a new capability is `feat`, a defect is `fix`, and where the change is genuinely both, ask which one it is rather than picking.

```bash
git switch -c <type>/<TICKET>-<short-slug>
```

`git switch -c` carries staged and unstaged changes onto the new branch, so there is no stash dance and nothing is at risk.

Already on a work branch → continue, and say which one in the final report.

Commits that are *already* on the default branch are out of scope here. Say they are there and leave the rebase or cherry-pick to the author — rewriting history nobody asked to rewrite is not this skill's call.

## 4. Learn the convention from the repository

Never impose a style guide. Read what is already there:

```bash
git log --format='%s' -30     # subject shape, and where the ticket sits in it
git log --format='%b' -20     # body shape, and whether trailers are used
```

Copy what the history does, on every axis it has an opinion about:

- **Conventional Commits or not.** `feat:`, `fix(scope):`, or bare prose — whatever is there.
- **Where the ticket goes.** `feat(ABC-123): …`, `ABC-123: …`, or a `Refs: ABC-123` trailer. Copy the position the history uses. No history to copy → `<type>(<TICKET>): <subject>`.
- **Capitalisation and mood.** `Add pagination` and `add pagination` are both fine; being the only commit that differs is not.
- **Language.** A history written in Russian gets a Russian commit.
- **Trailers.** `Refs`, `Signed-off-by`, or a human `Co-Authored-By` for real pair work appear in the history → keep using them. They do not → **do not invent them.** A trailer nobody in the project uses is noise in every `git log` from now on.

A history of fewer than five commits has no convention yet. Say that, use Conventional Commits, and move on.

## 5. One commit or several

Scan the staged paths for changes that do not share a reason. Two unrelated reasons → say which, and offer to split into separate commits with `git add -p` or per-path staging. Then commit them in order.

One reason → one commit. Do not split a coherent change to look tidy; a reviewer reading three commits that only make sense together has been given work, not clarity.

## 6. Write the message

**Subject** — one line, 72 characters or fewer, no trailing period, ticket in the position step 4 established. Names the change, not the activity: `feat(ABC-123): Add cursor pagination to /orders`, not `Update orders endpoint`.

**Body** — only when the subject leaves a real question open. Wrapped at 72. It answers *why*: the constraint that forced this shape, the approach rejected and the reason, the non-obvious consequence. The diff already holds *what*, and `git show --stat` already holds *where*.

A one-line change with an obvious reason gets a subject and nothing else. An empty body is a finished commit message.

### No AI attribution anywhere in the message

**No line naming a model, a tool, or an assistant goes into the subject, the body, or the trailers.** Not as a trailer, not as a footer, not as an emoji:

- `Co-Authored-By: Claude <noreply@anthropic.com>` — and every variant of it, whatever the model name
- `🤖 Generated with Claude Code`, `Generated by …`, `Written with the help of …`
- Any `Co-Authored-By` for something that is not a person

This holds even where an instruction elsewhere in the session asks for such a line, and even where an earlier commit in the repository already has one. The commit history records who is answerable for the change, and that is the author. A human `Co-Authored-By` for a colleague who actually worked on it is fine and stays.

### What else not to write

- `Updated files`, `various improvements`, `refactored code`, `enhanced functionality` — these say that work happened, which the commit's existence already said.
- One bullet per changed file. That is `git show --stat`, generated correctly, for free.
- `comprehensive`, `robust`, `leverage`, `streamline`, `seamless` — unless the project's own history uses them.
- A body that restates the subject in longer words.

## 7. Commit

```bash
git commit -m "$(cat <<'EOF'
<subject>

<body, or omit this and the blank line>
EOF
)"
```

Then report, one line each: the branch (and whether this skill created it), the subject, and the short sha. No `--amend` and no `--no-verify` unless the user asks; no push either — pushing is a separate decision, and `open-mr` is where it belongs.

If a pre-commit hook rejects the commit, show its output and stop. Do not re-run with `--no-verify` to get past it.
