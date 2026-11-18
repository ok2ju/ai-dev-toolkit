---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

Write a handoff document summarising the current conversation so a fresh agent can continue the work. Save to the temporary directory of the user's OS - not the current workspace.

Include a "suggested skills" section in the document, which suggests skills that the agent should invoke.

Do not duplicate content already captured in other artifacts (specs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.

**Write it for an agent.** The next agent reads this document and cannot ask you what you meant. Write in the strict register of ASD-STE100 Simplified Technical English:

- One instruction or one fact per sentence. 25 words max.
- Instructions in the imperative: "Run `npm test`", not "tests should be run".
- Active voice with a named actor: "`ship` writes `state.md`", not "`state.md` is written".
- One term per concept. Pick a name for a thing and use that exact name every time. Do not rotate synonyms for variety.
- Single plain verbs, not phrasal verbs: "start", not "spin up".
- No semicolons. Split the sentence in two.
- State every condition and scope limit. Never shorten a sentence by dropping one.
- Keep a hedge only when the doubt is real, and name what it rests on. One hedge, not a stack.

Code, paths, commands, and quoted errors stay verbatim.
