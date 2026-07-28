---
name: review-diff
description: Review the working diff before commit or PR — correctness, security, leftovers. Use when the user says "review my diff", "review my changes", or "check before commit".
---

# Review diff

Read the whole change before judging any part of it.

## Get the diff

```bash
git status --short
git diff HEAD          # staged + unstaged vs last commit
git diff main...HEAD   # whole branch, when reviewing a PR
```

If the diff exceeds what you can hold, review file by file, largest first.

## What to look for, in this order

1. **Correctness** — trace one real input through each changed path. Off-by-one, inverted condition, `null` reaching a `.field`, an `await` that is missing.
2. **Callers** — for every changed signature or behaviour, `grep` the callers. A fix applied to one call site and not its siblings is half a fix.
3. **Errors and data loss** — new `catch` that swallows, retry without a limit, a write with no rollback path.
4. **Secrets and inputs** — tokens, keys, internal URLs, customer names in fixtures. Unvalidated input crossing a trust boundary.
5. **Leftovers** — debug prints, commented-out code, `TODO` with no owner, a dependency added for three lines.
6. **Tests** — does any changed branch have a check that fails when the logic breaks? If not, name the missing case.

## Report

One line per finding, worst first:

```
path/to/file.ts:42: <severity>: <problem>. <fix>.
```

Severity is `bug`, `risk`, or `nit`. Skip formatting nits unless they change meaning. Say "nothing found" plainly when nothing is found — inventing a finding to look thorough wastes the next reader's time.
