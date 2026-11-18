---
name: prove-it
description: Prove that a claim about the code actually holds by checking the real thing — run the feature, read the actual value, inspect the real output — never a proxy like "it compiles", an unrelated green test, or a self-report. Use when the user says "prove it works", "prove X", "does X actually work", "show me X works", "verify X", or before declaring a task done.
argument-hint: "What claim should be proven?"
---

Prove the claim in `$ARGUMENTS`. If no claim is given, take the last thing this session said was done or working. If there is none, ask for one. Ask nothing else.

This skill proves; it does not fix. If the claim fails, report it and offer the fix. Change code only when the user asks.

## 1. Pin the claim

Rewrite the claim as one falsifiable sentence: **when I do A, I observe B**. "Login works" becomes "POST `/login` with valid credentials returns 200 and sets the `session` cookie".

- Take the most literal reading of the claim. Ask only if two readings need different checks.
- A claim with several parts gets one sentence per part. Each part is proven or not on its own.

## 2. Pick the real artifact

Observe the thing the user will actually rely on, as close to it as this environment allows:

1. Run the feature end to end: the CLI command, the HTTP request, the page in a browser, the job on real input.
2. Call the real code path with real input and read what comes back.
3. Read the actual result: the row in the database, the file on disk, the rendered output, the diff.

These do **not** count as proof:

- It compiles, lints, or type-checks.
- A test passed that does not exercise the claim.
- A file's mtime changed, or a log line says "success".
- Cached or old output, from before the change.
- A subagent, a tool, or this session saying it is done.
- Having written the code. Writing it is not running it.

## 3. Make sure the check can fail

A check that cannot fail proves nothing. Before you run it, write down the output that would mean the claim is false.

Where cheap, show the check tells the two states apart: run it against the old code (`git stash`), a bad input, or a missing dependency, and see it fail there.

## 4. Script it

Write the check as a command or a small script that anyone can rerun, with a deterministic result. Prefer this over a one-time look.

- Put it in the scratchpad directory, or the current directory if there is none.
- Suggest committing it as a regression test only when the claim is worth guarding later. Commit only if the user agrees.

## 5. Run it and read the output

Run the check. Read the actual output, not only the exit code. Find the one line that decides the claim.

## 6. When the check fails, suspect the observation first

Rule out the check before you blame the system: stale build, wrong environment, wrong branch, cache, wrong port, wrong file, wrong account. Fix the observation and run it again.

Do not explain a real failure away. If the observation is sound and the result is wrong, the claim is false.

## 7. Report

One verdict per claim sentence:

- **Proven** — the command, and the decisive output line quoted exactly.
- **Not proven** — the command, the actual output, and what was expected instead.
- **Cannot prove here** — what is missing (credentials, a service, a device), and the exact command the user can run to prove it themselves.

Then one line on what the check does **not** cover: other inputs, other environments, concurrency, load. Never report "proven" for a check you did not run.
