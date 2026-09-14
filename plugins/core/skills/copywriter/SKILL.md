---
name: copywriter
description: >
  Copywriting layer for any language: writes prose that reads as human-written and edits existing
  text to strip AI tells and the subtler failures that survive a tell check. USE THIS SKILL EVERY
  TIME the user asks for text in any language (English, Russian, German, or other) to be written,
  rewritten, shortened, simplified, polished, translated, or made to sound less like AI. Core
  territory: slide and presentation copy (titles, bullets, speaker notes, executive summaries),
  plain-language simplification of dense text, interface copy (buttons, labels, errors, empty states,
  notifications), and live dialogue (chatbot and assistant turns, support, demo and user-test scripts,
  persona conversations). Also essays, posts, landing pages, docs, emails. Russian triggers: "напиши
  текст", "упрости", "текст для слайдов", "текст для интерфейса", "напиши диалог", "перепиши",
  "звучит как ИИ", "сделай человечнее". Applies at draft time, not only as post-processing. Skip for
  code, structured data, short chat replies.
---

# Copywriter

A style layer for any text produced for the user, in whatever language the user needs. It has one job: make the text read as if
a specific competent person wrote it, not as if a model generated it.

Three things make text read as generated, and they need different fixes:

1. **Slop**: inflated significance, formulaic structure, stock phrases, mechanical formatting.
   Fix by cutting and rewriting.
2. **Statistical flatness**: even sentence lengths, synonym cycling, compressed lexical density,
   emotion flattened to neutral. Fix by *loosening*, not by cutting harder.
3. **Passes every check and still reads wrong**: filler sentences, an insight in every paragraph,
   contrarian setups, hedges carried in from speech, facts that don't earn their place. Fix by
   asking what each sentence tells the reader that they didn't already know.

Aggressive de-slopping alone produces the second problem. Text that has been sanded into short
declarative fragments scores *more* machine-like on the measures that actually generalize. And a
text that has been given "more personality" to fix flatness usually lands in the third. All three
passes are required.

## When it fires

Every request for text that leaves the conversation, in any language: slides, speaker notes, UI strings,
dialogue scripts, documents, emails, posts, copy, essays. Also when the user pastes text and asks to
improve, shorten, simplify, rewrite, translate, or de-AI it.

The principles are language-independent; the surface tells are not. Before writing in a language
other than English, read `references/languages.md` for what changes (punctuation norms, the
language's own flagged vocabulary, what "plain" means there).

Do not apply to code, code comments, commit messages, structured data (JSON/CSV/config), or a
direct conversational answer that isn't a deliverable. Legal, medical, and regulatory text keeps
its required formulas: apply the vocabulary rules there, not the voice rules.

## Process

Three passes. Do all three internally; deliver only the finished text unless the user asks to see
the reasoning.

1. **Draft.** Write the piece normally, aiming at the calibration targets below and following the
   genre file in `references/` if one applies.
2. **Audit.** Ask two questions. *What in this still reads as AI-generated?* Name the specific
   tells. Then: *which sentences could be deleted without the reader losing anything?* The second
   question catches what the first misses.
3. **Final.** Fix what the audit found, then run the [Exit check](#exit-check).

For anything over ~300 words, or any dialogue or speaker notes, do a fourth pass: read it aloud in
your head. Sentences that are hard to say aloud are usually the machine-written ones. Dialogue that
nobody would actually say aloud is broken by definition.

After correcting for AI voice, check which column of the [over-correction table](#the-over-correction-trap)
you landed in. Fixing one voice problem often creates the opposite one.

## Calibration targets

These come from measured differences between human and LLM text, not from taste. Aim at them.

**Sentence rhythm.** Human writing alternates unevenly; AI writing settles into a mid-length
cadence. No three consecutive sentences within five words of the same length. A four-word sentence
next to a forty-word one is normal, not a flaw.

**Repeat your nouns.** AI over-substitutes synonyms; its type-token ratio runs measurably higher
than a human's. If the subject is a rate limit, call it the rate limit every time. "The
constraint," "the throttle," "the ceiling" across four sentences is a tell, not variety. In
interface copy and slides this is doubly important: one object, one name, everywhere.

**Keep the connective tissue.** AI text is denser in content words and thinner in function words
than human text. Leave in the pronouns, the repeated subjects, the "so," "and," "which," "the
thing about." Do not compress every sentence to its skeleton.

**Aim easier than feels right.** AI prose measures *harder* to read than human prose on standard
indices, not easier. Prefer the short word and the short clause. Complexity is not quality.

**Keep the negative pole.** AI text clusters near neutral-positive sentiment even when the subject
is bad. If something was frustrating, slow, or a mistake, say so plainly and do not append a
consoling clause.

**Don't smooth out toward the end.** AI text becomes measurably more uniform in its second half.
Put something unexpected, a specific, an aside, a short sentence, past the halfway mark.

**Hoard specifics.** Real names, exact numbers, dates, places, tool versions, prices. These are
what make a text unfakeable. Never invent them (see [Never fabricate](#never-fabricate)).

## Core rules

The full catalog is in `references/patterns.md`. Read it when editing someone else's text, doing a
careful pass on a long piece, or when the user asks what specifically is wrong. These are the ones
that carry most of the weight:

**Cut significance inflation.** No "stands as a testament," "plays a crucial role," "marks a
pivotal moment," "underscores the importance of," "in the evolving landscape of." State what the
thing is and what it does.

**Kill the -ing tail.** Present participle clauses tacked onto a finished sentence to simulate
insight: "…, highlighting the need for innovation," "…, reflecting a broader shift." Delete them
or turn them into a real claim with a subject.

**No "not X, but Y."** Also "it's not just about X, it's about Y" and clipped tailing negations
("no guesswork," "no wasted effort"). State Y as a sentence.

**Use `is` and `has`.** Not "serves as," "stands as," "boasts," "features," "represents."

**Break the rule of three.** Two examples are usually enough. Three parallel items in a row, and
especially three adjectives, is the single most recognizable rhythm in AI prose. On slides, where
three bullets is a layout default, make the three items unequal in length and kind.

**Name the source or drop the claim.** "Experts argue," "studies show," "industry reports suggest,"
"it is widely believed": either cite the specific source or cut the sentence.

**Zero em dashes and en dashes.** Replace with a period, comma, colon, or parentheses. This is a
hard constraint, not a preference. It is a weak signal on its own but a socially loaded one, and it
costs nothing to avoid. Also catch `--` and spaced dashes. Scan the final text for `—` and `–`
before delivering.

Exempt, always: anything inside inline code or a code block, command-line flags (`--force`,
`--dry-run`), identifiers and file names, numeric and date ranges (2020–2024, pages 12–18, CHF
10–15k), and the minus sign. Rewrite the prose around such a token; never edit a dash that is part
of a command, a name, or a range, because that breaks the thing it describes.

This is an English rule. In languages where the dash is grammar rather than style (Russian тире
between subject and predicate, for instance) keep the grammatical ones and cut the parenthetical
asides; `references/languages.md` has the per-language version.

**No throat-clearing.** Cut "Here's the thing," "It turns out," "The reality is," "Let's dive in,"
"What's interesting is," "At its core," "The real question is," "In today's fast-paced world."
Start with the content.

**No emphasis crutches.** "Full stop." "Let that sink in." "Make no mistake." "And that's okay."
These add nothing.

**No mechanical formatting.** No bolded lead-ins followed by a colon and a restatement of the bold.
No emoji in headings. Sentence case in headings, not Title Case. Bold sparingly and only for genuine
emphasis. Straight quotes, not curly, in English; in other languages use that language's standard
quotation marks («», „“).

**No generic uplift ending.** "The future looks bright." "This marks an important step forward."
"Exciting times ahead." End on a concrete fact or a real opinion, or just stop.

**No chatbot residue.** "I hope this helps," "Of course!," "Great question," "Let me know if you'd
like me to expand" never belong inside a deliverable. In scripted dialogue for an assistant, this
rule is the whole job: see `references/dialogue.md`.

**Don't manufacture punchlines.** A run of short fragments engineered to land like quotes reads as
constructed. One short sentence for emphasis is fine. Four in a row is a tell. If a line sounds like
a pull-quote, rewrite it as a normal sentence.

## Beyond the tell check

These catch text that passes every rule above and still reads wrong. They come from real failures
in delivered work.

### The over-correction trap

The most expensive failure, because fixing one voice problem creates the opposite one and it takes
another round to see.

| Formal-AI | Correct | Thought-leader-AI |
|---|---|---|
| restates the brief back at the reader | states a fact | opens with a contrarian paradox |
| even paragraph lengths, every sentence lands neatly | uneven, some blunt | punchy fragments everywhere |
| consultant abstractions | plain nouns | metaphors and jokes |
| no contractions, stiff | a few contractions | chatty |
| no opinion | one opinion, stated plainly | an aphorism every paragraph |

A text told "you sound like AI" will, if the writer is not careful, land in the right-hand column:
short contrarian sentences, a memorable metaphor, a rhetorical question, a wry aside. For a senior
audience that is worse than the stiff version, because it signals someone performing rather than
someone reporting.

**The target is not "more personality." It is plainer.** Confident writing at senior level is calm
and specific. The facts carry the interest. The writer does not need to be memorable.

### The insight quota

One genuine observation in a piece reads as authority. Three or four read as performance, no matter
how good each one is individually. Symptoms: more than one sentence built to be quotable, a metaphor
attached to a result that was already clear, "The pattern I keep running into is…," "What most
people miss is…." Keep the strongest one. State it flatly. Delete the rest and let the facts they
were decorating stand on their own.

### Contrarian setups

"Most of the work was not technical. It was…" "The title says X. The mandate underneath is Y."
This "not the obvious thing, the deeper thing" construction is the single most recognizable move in
machine-written essays and slide titles. It is also frequently wrong on the facts: saying the work
"was not technical" diminishes a technical programme. Use it at most once in a piece, and only when
the contrast is the point rather than the decoration.

### Never compliment the reader's material

"Your brief puts the data model first and the AI second. That's the right way round, and rarer than
it should be." This looks like analysis and functions as flattery. Praising the client's strategy,
brief, or deck positions the writer as an approving assessor of someone who has not asked to be
assessed. Show that you read it by engaging with a specific tension inside it, not by awarding it
marks.

### Every fact must earn its place

"…through around 80 people, none of whom reported to me, over about a year." "Over about a year"
adds nothing and invites a question nobody needed to ask: was that fast, slow, why. In persuasive
text a neutral detail is not neutral; it is an opening. Before keeping any specific, ask what it
does. If it does not advance the case, cut it, even when it is true and even when it is interesting.

### Diminishing qualifiers

"I've done the first part, at a smaller scale." "We have some experience with…" Hedges carried in
from speech, where they soften a claim politely. On the page they discount the claim before the
reader has valued it. State the fact and let the reader calibrate.

**This applies to social hedges only.** A qualifier that carries real uncertainty is information,
and cutting it turns an estimate into a promise. Keep every hedge that is load-bearing: the size of
an estimate ("roughly 3 weeks, we haven't scoped the migration"), the limit of what was tested,
the confidence in a diagnosis or a security finding, a caveat a reader needs in order to decide.
The test: if the hedge went away, would the sentence claim more than the facts support? Then it
stays. If it only softens a claim the facts already carry, it goes.

### The filler sentence

A sentence can be grammatical, on-topic, free of every AI tell, and still carry no information. This
is the dominant failure when the writer has vocabulary about a subject but no facts about it. "Pilot
emerging technologies and scale the ones that show measurable value" is a tautology: nobody scales
the worthless ones.

**Test one.** Cover the sentence. What does the reader now know that they did not know from the
heading above it? Nothing means cut.

**Test two.** Could this sentence appear in a competitor's deck, a rival product's interface, or a
different company's document? If yes, it describes the category, not the subject.

Filler is worse than obviously weak writing because it looks finished.

### Term coverage is not a writing target

Checking that required terms appear (brand vocabulary, SEO keywords, a glossary, a compliance list)
is useful. Optimising *toward* that check produces sentences built backwards from a word list, which
is how tautologies get written. Order: gather facts, write from facts, then check which required
terms are absent, then ask whether a fact already in hand says the same thing in different words.
Terms still absent because the substance is absent stay absent.

### Lists wearing a sentence's clothes

"Build agents and workflows on Hugging Face, n8n and Power Automate, delivered on Bedrock and AWS."
Five names in one sentence covering at least three pieces of work. Give each its own sentence with
its own outcome, or put the names in a list where a list belongs. Slides and feature pages produce
this constantly.

### Translate, do not transcribe

When people describe their own work in conversation they hedge, explain, and justify why something
should count. That register belongs to speech. Carried verbatim into a document, "it was my own
company, so in effect I was the process lead, the focus just shifted over the years" reads as
arguing with an objection nobody raised. **The speaker explains. The document asserts.** Take the
facts out of the chat and state them.

### Never describe what the subject does not do

"We set technical direction rather than write the implementation ourselves." Honest, and wrong to
include. A disclaimer invites exactly the doubt it was meant to settle. State the positive; accurate
verbs make the boundary visible without announcing it.

Two exceptions. Wording that is legally or regulatorily required stays verbatim. So does a scope or
coverage limit the reader needs in order to act safely or decide correctly: what an audit did not
examine, what a test did not cover, what a warranty excludes. That is not a disclaimer, it is a
finding.

### Name things the way their owners name them

Products, certifications, standards, regulations, features, screen names. "Databricks certified in
data engineering and machine learning" names no real credential; merging two real ones looks like
holding neither. In interface copy, the name of a screen in a help text must match the name in the
navigation exactly.

### Verb choice carries seniority

| Implies hands-on | Implies direction |
|---|---|
| built, coded, configured, wrote | led delivery of, set direction on, owned, defined |
| managed the database | defined the data model the business worked from |
| ran the analysis | commissioned the analysis and made the call on it |

Inflating in either direction costs. A leader described with hands-on verbs reads as an executor; a
practitioner described with directing verbs cannot answer the follow-up.

### Order carries argument

"Grew recurring revenue 50%, and ran the audits and regulatory sign-off" says results matter and
governance was also handled. "Carried the audits and regulatory sign-off, and the commercial result
followed: recurring revenue up 50%" says governance produced the result. Identical facts. Choose the
order deliberately, especially on slides, where the reader takes the first item as the point.

### Deduplicate across sections

A fact in the summary slide and again in the body is not emphasis. It is thin material stretched.
Decide which section owns each fact: usually the summary takes the outcome and the body takes the
mechanics. Never both.

## Voice

Personality is not universally correct. Match the genre:

- **Essays, opinion, personal writing, talks, speaker notes**: the writer should have opinions,
  mixed feelings, asides, uneven rhythm, and things they'd defend. Sterile and voiceless reads as
  machine-written just as clearly as slop does. But see [the insight quota](#the-insight-quota).
- **Documentation, reference, technical, legal, encyclopedic**: plain and neutral *is* the human
  voice here. Do not inject first person or opinion. Apply the vocabulary and structure rules only.
- **Slide text**: dense, fragmentary, and verb-light is correct on the slide itself. The prose rules
  apply to the speaker notes and the summary, not to the bullets. See `references/presentations.md`.
- **Interface copy**: the voice is the product's, not a person's. Consistent, brief, and neutral,
  with a defined tone the user has specified or the existing product already uses. See
  `references/interface-copy.md`.
- **Dialogue**: each speaker has their own voice, and neither of them is the narrator. See
  `references/dialogue.md`.

If the user has supplied a sample of their own writing anywhere in the conversation, an existing
deck, existing UI strings, or a transcript, match it: sentence length habits, punctuation quirks,
how they open paragraphs, recurring phrases, formality level. Their patterns beat the defaults here.
If they haven't supplied one and the piece is voice-heavy, ask for two or three paragraphs of their
own writing. One short request buys a much better match.

## Genre routing

Read the matching file before drafting. The general rules alone will produce a bad deck, a bad
error message, or a stilted conversation.

| Task | Read |
|---|---|
| Slides, decks, speaker notes, executive summaries, one-pagers | `references/presentations.md` |
| Making dense, technical, legal, or bureaucratic text readable | `references/simplification.md`, then `references/infostyle.md` |
| Explaining something, marketing or product copy, any text the reader has to grasp fast | `references/infostyle.md` |
| Buttons, labels, errors, empty states, onboarding, notifications, tooltips | `references/interface-copy.md` |
| Chatbot or assistant turns, support scripts, demo or user-test scripts, persona conversations, dialogue in scenarios | `references/dialogue.md` |
| Editing someone else's text, or explaining what's wrong with it | `references/patterns.md` |
| The user questions a rule | `references/evidence.md` |
| Writing in Russian, German, or any language other than English | `references/languages.md`; for Russian also `references/infostyle.md` |

## What not to "fix"

Over-correction is its own failure mode. It flattens real writing and strips the specifics that make
a text credible. These are **not** tells on their own:

- Clean grammar and consistent style. Polish is not evidence of AI.
- Formal or academic vocabulary in general. Only the specific overused set matters.
- A single "however," "moreover," or "additionally." One is normal; a pile is a tell.
- One curly quote. Word, Google Docs, and macOS auto-curl by default.
- One short emphatic sentence.
- Constructions from a non-native speaker that are correct but unidiomatic. These are the writer's
  voice. Detectors are documented to over-flag non-native writers, so sanding these down makes the
  text blander without making it safer.
- Punctuation that is standard in the target language even though it would be a tell in English:
  the Russian тире, French spaced punctuation, German comma rules, «guillemets». See
  `references/languages.md`.
- Text inside quotations, titles, proper names, or examples where a watched phrase is being
  discussed rather than used.
- Repetition of a term in interface copy or a glossary. There, repetition is the design.

Look for **clusters**. One em dash means nothing. Em dash plus rule-of-three plus "vibrant tapestry"
plus a "Conclusion" section is a confession.

Preserve, actively: unusual hard-to-fabricate detail, unresolved tension and mixed feelings,
genuine asides and self-corrections, and variety in sentence length. These are the human signal.

## Never fabricate

The rules above are about phrasing. They never license inventing content.

Never add a number, metric, date, client name, credential, feature, or outcome that the user did
not supply. On a slide, an invented "reduced onboarding time 40%" gets presented to a board and has
to be defended there. In interface copy, a message that says "Saved" when the system hasn't saved
is a bug, not a phrasing choice. When a sentence would be stronger with a specific the user hasn't
given, write `[CLARIFY: what exactly was measured?]` in place of it and collect every such marker
into a short question list at the end of the response.

Removing a vague attribution is correct. Replacing it with a plausible-sounding invented citation
is not.

## Exit check

Run before delivering. Any hit means the draft isn't done.

1. Any `—`, `–`, or `--` used as a stylistic aside? Remove. (Grammatical dashes in languages that
   require them stay; see `references/languages.md`. Dashes inside code, CLI flags, identifiers, and
   numeric or date ranges stay untouched.)
2. Three consecutive sentences of similar length? Break one. List the lengths if unsure; real
   writing swings from 5 to 30.
3. Same concept named by three different synonyms? Pick one and repeat it.
4. Any -ing clause tacked onto the end of a sentence to add depth? Cut or rewrite.
5. Any "not X, but Y," or a contrarian "it wasn't A, it was B" setup? Restate directly. One per
   piece at most.
6. Any "serves as," "stands as," "boasts," "represents"? Use `is` or `has`.
7. Any group of three parallel items or adjectives? Make it two, or make them unequal.
8. A colon followed by a three-item list? One per document at most.
9. Any vague attribution without a named source? Cite it or cut it.
10. Any throat-clearing opener or emphasis crutch? Cut.
11. Rhetorical questions in professional text? Usually zero is right. Semicolons? Rare in speech,
    common in generated text.
12. Bolded lead-ins with colons, emoji headings, or Title Case headings? Fix.
13. Four paragraphs of near-identical size? A tell in itself. Merge or split one.
14. Does it end on generic uplift? Replace with something concrete, or stop earlier.
15. Would any sentence fit unchanged into a piece on a completely different topic, or a
    competitor's version of this one? Cut it.
16. Cover each sentence: does the reader learn anything they didn't know from the heading? If not,
    cut.
17. More than one quotable line, metaphor, or aphorism? Keep the strongest, flatten the rest.
18. Any hedge that discounts a claim before the reader has valued it? State the fact. Hedges that
    carry real uncertainty, the width of an estimate, the limit of what was tested, the confidence
    in a finding, stay.
19. Any sentence describing what the subject does *not* do? Cut, unless it is required wording or
    a scope limit the reader needs to act on.
20. Any praise of the reader's own brief, strategy, or material? Replace with engagement.
21. Any number, name, or claim you introduced that the user didn't provide? Remove or mark
    `[CLARIFY: ...]`.
22. Does the second half read smoother and safer than the first? Put something specific in it.
23. Did the correction push the text into the thought-leader column? Plainer, not punchier.

## References

- `references/presentations.md`: slide titles, bullets, speaker notes, executive summaries. Read for
  any deck or one-pager.
- `references/simplification.md`: rewriting dense text for a wider audience without losing meaning.
  Read whenever the request is "make this simpler / clearer / shorter."
- `references/infostyle.md`: reader-first principles from the Russian инфостиль school (facts over
  evaluation, benefit over feature, stop-word categories, structure for the scanning reader, naming
  the reader's worry), adapted so they don't produce a telegram. Read for explanations, product and
  marketing copy, and any Russian text.
- `references/interface-copy.md`: UI strings of every kind. Read for any text a user will see inside
  a product.
- `references/dialogue.md`: conversation that sounds like people talking. Read for chatbot turns,
  scripts, persona roleplay, and dialogue in scenarios.
- `references/patterns.md`: full catalog of AI tells with before/after fixes. Read when editing
  existing text, doing a careful pass, or explaining specifically what's wrong.
- `references/evidence.md`: what the calibration targets are based on, and where the popular
  advice is wrong. Read when the user questions a rule or asks for the reasoning.
- `references/languages.md`: which rules are universal and which are English-only, with the Russian
  and German equivalents of the flagged vocabulary and formatting tells. Read before writing in any
  language other than English.

## Attribution

The pattern catalog draws on two MIT-licensed skills and one Wikipedia project:

- [humanizer](https://github.com/blader/humanizer) by blader: 35 patterns, MIT. All 35 are mapped into
  `references/patterns.md` under this skill's own grouping.
- [stop-slop](https://github.com/hardikpandya/stop-slop) by Hardik Pandya, phrase and structure
  taxonomy, MIT.
- [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing),
  maintained by WikiProject AI Cleanup, which both of the above build on.

`references/infostyle.md` adapts principles from *Пиши, сокращай* (Ilyakhov, Sarycheva) and *Ясно,
понятно* (Ilyakhov); the wording and examples are the skill's own.

The calibration targets are sourced in `references/evidence.md`. The "Beyond the tell check"
section and the genre files were derived from failures in delivered work.
