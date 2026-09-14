# Presentations: slides, speaker notes, executive summaries

Read this for any deck, slide, one-pager, or executive summary. A slide is three texts at once, and
each has different correct behavior: the title (a claim), the body (evidence, compressed), and the
notes (speech). The general prose rules apply to the notes and the summary. On the slide body they
will produce a wall of text.

**Contents**

- [What changes here](#what-changes-here)
- [Titles](#titles)
- [Slide body](#slide-body)
- [Numbers and charts](#numbers-and-charts)
- [Executive summary and one-pagers](#executive-summary-and-one-pagers)
- [Speaker notes](#speaker-notes)
- [Structure across the deck](#structure-across-the-deck)
- [Slides that should not exist](#slides-that-should-not-exist)
- [Exit check for decks](#exit-check-for-decks)

## What changes here

**Density is correct on the slide, wrong in the notes.** SKILL.md warns against compressing prose
into a telegram. On the slide body, telegram is the format: fragments, no articles where they can
go, no full sentences unless one sentence is the whole slide. In speaker notes and the summary,
the warning is back in force.

**The reader is scanning, not reading.** Assume the audience gives each slide four seconds before
the speaker starts talking. Everything must survive that: title first, biggest number second,
nothing else guaranteed.

**One idea per slide.** If the title needs "and," it is two slides. If the body has two unrelated
groups of bullets, it is two slides.

**The em dash rule holds.** Slides get screenshotted and forwarded. Zero em dashes, including in
titles where designers like them as separators. Use a colon or a period.

## Titles

The title states the conclusion of the slide, not its topic. A reader who sees only the titles, in
order, should get the whole argument.

Before: Customer onboarding metrics, Q2

After: Onboarding time fell from 9 days to 4 after we removed the manual KYC step

Before: Market overview

After: Three banks hold 71% of Swiss crypto custody; none offers staking

Rules for titles:

- A full sentence with a verb, or a noun phrase with a number in it. "Market overview" is a folder
  name, not a title.
- One line where the template allows, two at most. Cut the adjective before cutting the number.
- No question titles unless the slide answers the question in its body and the next slide does not
  depend on it. "Why did churn rise?" followed by four bullets of causes is fine. "Where do we go
  from here?" is a stall.
- No contrarian setup as a title ("It's not a pricing problem. It's a trust problem."). One such
  title in a deck is the maximum, and it must be true.
- Sentence case. Title Case On Every Slide reads as template output.
- Do not put the company name or the deck name in every title. The footer does that.

## Slide body

**Bullets are fragments.** Drop the leading article and the subject when the subject is the same as
the title. "Reduced review time to 2 days" not "We have reduced the review time to 2 days."

**Bullets are parallel in grammar, not in length.** Start each with the same part of speech (all
verbs, or all nouns). Then let them be as long or short as the fact requires. Three bullets of
exactly the same length is the layout equivalent of the rule of three.

**Three bullets is a default, not a rule.** Two is fine. Five is too many unless it is a list the
reader needs whole (steps, criteria, team). Never pad to three.

**Every bullet carries something checkable.** A number, a name, a date, a before/after. A bullet
that could sit on a competitor's slide describes the category. Delete it.

Before:
- Enhanced customer experience across digital channels
- Streamlined internal processes for greater efficiency
- Strengthened compliance posture

After:
- App login moved from password + SMS to passkeys; support tickets on login down 60% since March
- Trade confirmations now generated at execution, not end of day
- FINMA audit closed with zero findings for the first time

**Word budget.** Roughly 30 words of body text on a slide the speaker will talk over. Up to 80 on a
slide meant to be read without a speaker (pre-reads, appendices, one-pagers). Above that, split or
move to notes.

**No sub-bullets on a spoken slide.** If a point needs a sub-point, the speaker says it.

**No sentence-then-restatement.** A bold lead-in followed by a colon and a longer version of the same
words is the single most common slide tell. Say it once.

**Verbs on slides.** Plain and past tense for what happened: built, cut, moved, launched, closed,
replaced. Plain and present for what is: is, has, runs, costs. Avoid: leverage, drive, enable,
empower, unlock, transform, streamline, enhance, optimize, deliver value.

## Numbers and charts

**A number needs a comparison.** "CHF 2.4m" is an amount. "CHF 2.4m, up from 1.1m in 2025" is a
fact. Give the baseline, the target, or the peer.

**Round the way the audience thinks.** Board decks: one significant figure past the unit ("about
2.4m," "roughly 60%"). Operational decks: whatever the team tracks. Never five decimal places on a
slide.

**The chart title says what to see.** Not "Revenue by segment 2024-2026" but "Custody revenue
overtook trading revenue in Q3 2025." The axis labels carry the what; the title carries the so-what.

**Never state a number you weren't given.** Mark it `[CLARIFY: what was the baseline?]` and list it
at the end. A number on a slide will be repeated by someone who did not check it.

## Executive summary and one-pagers

This is prose, and the prose rules are fully in force. It is also the only part of the deck many
senior readers will read.

**Shape.** 80 to 150 words. The decision or finding first, in one sentence. Then the two or three
facts that support it. Then what is being asked of the reader, if anything. No preamble about what
the document is.

Before: This document provides a comprehensive overview of the findings from our Q2 usability
research and outlines key recommendations for enhancing the onboarding experience going forward.

After: New private clients abandon onboarding at the document-upload step: 38% in Q2, against 12%
at every other step. The cause is the file-size limit, not the number of documents. We propose
raising the limit and accepting phone photos; engineering estimates two weeks.

**The summary owns the outcome; the body owns the mechanics.** Do not repeat the same sentence in
both. If the summary says "38% abandon at upload," the body slide explains why, and does not
restate the 38% as its title.

**One recommendation, stated as a claim.** "We propose X" beats "There are several options worth
considering." If there are genuinely several options, name them and say which one you'd pick.

## Speaker notes

Notes are speech. Write them the way the speaker would say them, not the way the slide reads.

- Contractions, first person, short and long sentences mixed. "So this one surprised us" is a
  fine opening for a note.
- Do not repeat the slide text. The notes carry what the speaker adds: the story behind the number,
  the caveat, the thing that went wrong, the answer to the obvious question.
- One transition line at the end of each note if the speaker needs it: "Which is why we looked at
  the upload step next." Not every slide needs one.
- Rhetorical questions are acceptable in notes if the speaker will actually pause. They are not
  acceptable as slide titles.
- Mark timing if asked ("~45 s"). Do not pad notes to fill time.
- Notes are where mixed feelings belong. If the result was disappointing, the note says so; the
  slide states the number.

Before (note): This slide shows the reduction in onboarding time achieved through the removal of the
manual KYC step, highlighting the impact of process automation on the client experience.

After (note): We took the manual KYC check out in February. Honestly we expected a couple of days'
improvement. It was five. The caveat is that the compliance team now does the same check after
account opening, so the work moved rather than disappeared. I'll come back to that on slide nine.

## Structure across the deck

**Titles-only read.** Copy every title into a list and read it as a paragraph. If the argument does
not survive, reorder or rewrite titles before touching bodies.

**Order carries the argument.** The first bullet on a slide, and the first slide in a section, is
what the reader takes as the point. If governance produced the commercial result, governance goes
first.

**Deduplicate.** Each fact lives on one slide. If it appears twice, one of them is a summary slide
(allowed, once) or padding (not allowed).

**The back half.** Decks flatten after the midpoint the same way prose does. Check that the last
third has at least one specific, one number, and one thing the audience did not expect.

**Match an existing deck if there is one.** If the user has shared a previous deck or the
organisation's slide library, copy its title style, its bullet grammar, and its number formatting.
Consistency with the house style beats any rule here.

## Slides that should not exist

- "Agenda" as a list of the section titles. Fold it into the summary or cut it. An agenda is fine
  for a workshop with breaks; not for a ten-slide update.
- "Thank you" / "Questions?" as a closer. End on the ask, the recommendation, or the next steps.
- "About us" in an internal deck.
- A slide whose title is a topic and whose body is a definition of the topic.
- A slide that restates the previous slide with a different chart.
- "Key takeaways" that repeat the executive summary verbatim.

## Exit check for decks

In addition to the SKILL.md exit check:

1. Read the titles alone, in order. Is the argument there?
2. Does any title lack both a verb and a number?
3. Any slide body over 30 words that the speaker will talk over?
4. Any bullet that a competitor could use unchanged?
5. Any number without a comparison?
6. Any bold-lead-in-colon-restatement?
7. Any fact appearing on more than one slide (other than the summary)?
8. Do the notes repeat the slide instead of adding to it?
9. Any `—` or `–` anywhere, including titles and chart labels?
10. Any number the user did not supply? `[CLARIFY: ...]` it.
