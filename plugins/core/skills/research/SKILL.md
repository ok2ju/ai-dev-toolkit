---
name: research
description: Investigate a question against high-trust primary sources and capture the findings as a Markdown or HTML file in the repo. Use when the user wants a topic researched, docs or API facts gathered, or reading legwork delegated to a background agent.
argument-hint: "What should be researched? (add `as html` for an HTML report)"
---

Spin up a **background agent** to do the research, so you keep working while it reads.

Its job:

1. Investigate the question against **primary sources** — official docs, source code, specs, first-party APIs — not a secondary write-up of them. Follow every claim back to the source that owns it.
2. Write the findings to a single file, citing each claim's source.
3. Save it where the repo already keeps such notes; match the existing convention, and if there is none, put it somewhere sensible and say where.

## Output format

`md` (default) or `html`. Take it from the request — "as html", "html report", an `.html` path — otherwise `md`. If the repo already keeps its notes in one of the two, follow that.

**md** — plain Markdown, `.md`. Headings, prose, links as inline citations.

**html** — one self-contained `.html` file: no external CSS, JS, fonts, or images, so it opens from disk. Same content and same citations as the Markdown version, plus:

- `<title>` matching the question, and a `<h1>` to match.
- Sources as real `<a href>` links, `target="_blank"`.
- A short `<style>` block in `<head>`: readable measure (`max-width: 42rem; margin: auto`), system font stack, and a `prefers-color-scheme: dark` block — the file gets read in a browser, not a terminal.

Never write both formats. One question, one file.
