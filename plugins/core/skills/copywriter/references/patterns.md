# Pattern catalog

Full list of AI tells with fixes. SKILL.md carries the high-frequency ones; this is the long tail.

**Contents**

- [1. Content patterns](#1-content-patterns): inflation, notability, -ing tails, promo language, weasel words, challenges sections, speculative gap-filling
- [2. Sentence patterns](#2-sentence-patterns): copula avoidance, negative parallelism, rule of three, synonym cycling and repeated openings, false ranges, passive voice, wh- starters, false agency, phantom objections, fake alternatives
- [3. Vocabulary](#3-vocabulary): the flagged word set, business jargon, adverbs, hyphenated pairs
- [4. Rhetorical scaffolding](#4-rhetorical-scaffolding): throat-clearing, signposting, emphasis crutches, rhetorical setups, authority tropes, aphorism formulas, fake-candid openers
- [5. Structure and formatting](#5-structure-and-formatting): dashes, bold lead-ins, boldface, headings, emoji, quotes, fragmented headers, generic conclusions
- [6. Register and tone](#6-register-and-tone): chatbot residue, sycophancy, hedging, filler, manufactured punchlines, distant narrator

---

## 1. Content patterns

### 1.1 Significance inflation

The most consistent single marker. The text keeps explaining that its subject matters, in language
borrowed from press releases.

Watch: *stands as, serves as, is a testament to, a vital / crucial / pivotal / key role, marks a
turning point, underscores the importance of, reflects a broader, symbolizing its enduring, setting
the stage for, evolving landscape, indelible mark, deeply rooted, cornerstone of.*

Before: The team adopted trunk-based development in 2021, marking a pivotal shift in how the
organization approaches delivery and underscoring its commitment to engineering excellence.

After: The team moved to trunk-based development in 2021. Release frequency went from monthly to
roughly twice a week.

### 1.2 Notability padding

Listing coverage, follower counts, and credentials instead of saying what the person did or said.

Before: Her work has been featured in major industry publications and she maintains an active
presence across professional networks.

After: In a 2024 talk at SREcon she argued that on-call rotations should be capped at four people.

### 1.3 The -ing tail

A present participle clause bolted onto a complete sentence to simulate analysis. It carries no new
information; it gestures at meaning.

Watch: *highlighting…, underscoring…, ensuring…, reflecting…, symbolizing…, contributing to…,
fostering…, showcasing…, paving the way for…, allowing for…*

Before: The company opened a second warehouse in Rotterdam, reflecting its commitment to European
expansion and highlighting the growing importance of regional logistics.

After: The company opened a second warehouse in Rotterdam. Delivery times to Germany dropped from
four days to two.

### 1.4 Promotional language

Watch: *boasts, vibrant, rich (figurative), profound, breathtaking, stunning, renowned, nestled, in
the heart of, must-visit, seamless, groundbreaking, cutting-edge, state-of-the-art, world-class,
best-in-class, transformative.*

Before: Nestled in the heart of the old town, this world-class restaurant boasts a rich culinary
heritage and offers a truly seamless dining experience.

After: The restaurant is on Bäckerstrasse, has eleven tables, and has been run by the same family
since 1978.

### 1.5 Vague attribution

Watch: *experts argue, studies show, research suggests, industry reports indicate, observers have
noted, it is widely believed, many would say, critics point out, some argue.*

Either name the source with enough detail that it can be checked, or delete the claim. Do not
replace a vague attribution with an invented specific one.

Before: Experts agree that remote work has fundamentally changed hiring.

After: In its 2024 workforce survey, Stack Overflow found that 42% of respondents worked fully
remotely, down from 46% the year before.

### 1.6 "Challenges and future prospects" sections

Formulaic balance sections that concede difficulty and then dismiss it.

Watch: *Despite these challenges…, faces several challenges including…, Challenges and Legacy,
Future Outlook, Looking ahead.*

Before: Despite these challenges, with its strong fundamentals and ongoing investment, the region
continues to thrive.

After: The 2023 flood closed the northern road for six weeks. The canton approved drainage work in
March 2024; it hasn't started.

### 1.7 Speculative gap-filling

When the facts aren't available, models write a paragraph about the facts not being available and
then invent plausible filler.

Watch: *while specific details are limited, based on available information, not publicly available,
maintains a low profile, keeps personal details private, likely began / studied / grew up, it is
believed that, appears to have.*

Say what isn't known, or cut the section. Do not dress a guess as a fact.

Before: Details of his early career are not widely documented, suggesting he preferred to stay out
of the spotlight. He likely began in a junior engineering role before moving into management.

After: His career before 2011 isn't documented in the sources available. (Or omit.)

---

## 2. Sentence patterns

### 2.1 Copula avoidance

Models substitute elaborate verbs for *is* and *has*.

Watch: *serves as, stands as, represents, marks, constitutes, boasts, features, offers, provides,
encompasses.*

Before: The document serves as a reference for new contributors and features a comprehensive
overview of the build system.

After: The document is a reference for new contributors. It covers the build system.

### 2.2 Negative parallelism

Watch: *not only… but also…, it's not just X, it's Y, not because X, because Y, this isn't about X,
it's about Y.* Also clipped tailing negations: *no guesswork, no wasted effort, no surprises.*

The construction corrects a misconception nobody held. State the positive claim.

Before: This isn't just a scheduling tool, it's a way of thinking about time. No friction, no
guesswork.

After: The tool schedules meetings and shows where your week is already committed before you accept
a new one.

### 2.3 Rule of three

Three parallel items, especially three adjectives, is the most recognizable rhythm in AI prose.
Two items are usually enough, and unequal items are better than parallel ones.

Before: The platform is fast, reliable, and secure. Teams can plan, execute, and measure their work
in one place.

After: The platform is fast and hasn't had an outage since 2023. Teams plan and track work in the
same view.

### 2.4 Synonym cycling (elegant variation)

Repetition penalties push models to rename the same thing every time it appears. Human writers
repeat the noun. This is one of the strongest measurable differences between human and AI text, so
treat repetition as correct.

Before: The migration took four months. The transition surfaced several issues. The move was
completed in June, and the changeover is now considered stable.

After: The migration took four months, surfaced two data-loss bugs, and finished in June. It's been
stable since.

The mirror image is repeated sentence openings: "She noted… She noted… She filed…" or three
consecutive sentences starting with "The team." Merge the sentences or vary the subject. Deliberate
anaphora for effect is fine once; a paragraph of it is a tell.

### 2.5 False ranges

*From X to Y* where X and Y are not endpoints of any actual scale.

Before: Our work spans everything from early-stage discovery to long-term stakeholder alignment,
from technical architecture to user empathy.

After: We do discovery research and system design, mostly for teams under twenty people.

### 2.6 Passive voice and dropped subjects

Watch: *mistakes were made, it was decided, the results are preserved automatically, no
configuration needed.*

Name the actor. Passive is fine when the actor is genuinely unknown or irrelevant, this is a
default, not a ban.

Before: The deadline was missed and the scope was subsequently reduced.

After: We missed the deadline in March, then cut the reporting module to ship in April.

### 2.7 Wh- sentence starters

*What makes this hard is…, What's interesting is…, Why this matters is…*, scaffolding that delays
the subject.

Before: What makes onboarding difficult is the number of systems a new hire needs access to.

After: A new hire needs access to nine systems, and four of them require a manager's ticket.

### 2.8 False agency

Inanimate subjects performing human actions. It hides who did the thing.

Before: The retrospective surfaced the problem and the roadmap adjusted accordingly.

After: Priya raised it in the retrospective, and we dropped two features from the Q3 roadmap.

### 2.9 Answering objections nobody raised

*This isn't mainly about X…, Some will say…, It would be easy to assume…, Contrary to what you might
think…* The text defends against a criticism that appears nowhere in the reader's head. Usually a
leftover from the drafting process. Remove the phantom objection; keep any real claim it was
guarding.

Before: This isn't mainly a question of prompt length. The real issue is context ordering.

After: Context ordering matters more than prompt length here: moving the schema above the examples
cut error rates by a third.

If a real objection exists and the reader will actually raise it, name whose objection it is and
answer it. The tell is the anonymous strawman, not the act of rebutting.

### 2.10 Rejecting fake alternatives

*A tempting option would be to…, but. One might consider…, however. The obvious approach is X; the
better approach is Y.* An alternative invented so it can be knocked down, giving the chosen option
the appearance of having won a comparison. Cut the fake option and state the real choice. If there
was a real alternative that was actually considered, say what it was and why it lost, with the
specific.

Before: A tempting option would be to rewrite the service from scratch, but that would introduce
unnecessary risk. Instead, we chose incremental migration.

After: We migrated incrementally, one endpoint a week, because the payments team could not take a
release freeze longer than two days.

---

## 3. Vocabulary

### 3.1 The flagged set

These appear far more often in post-2023 text and tend to cluster. One is nothing; four in a page
is a signature.

*delve, tapestry, testament, landscape (abstract), realm, pivotal, crucial, key (adj), vital,
robust, seamless, leverage (verb), utilize, foster, garner, underscore, highlight (verb), showcase,
elevate, unlock, harness, navigate (abstract), intricate, nuanced, multifaceted, holistic,
comprehensive, meticulous, myriad, plethora, resonate, align with, embark, journey (abstract),
transformative, innovative, dynamic, vibrant, enduring, profound, interplay, ever-evolving,
rapidly-changing, in the realm of, a wide array of.*

Replacements are usually the plainest available word: *use* for *leverage* and *utilize*, *build*
for *foster*, *show* for *showcase* and *highlight*, *deal with* for *navigate*, *many* for *myriad*
and *plethora*.

### 3.2 Business jargon

*Circle back, deep dive, move the needle, low-hanging fruit, boil the ocean, drink from the
firehose, north star, double-click on, table stakes, bandwidth (as time), take this offline,
synergy, alignment (as a goal), best practices, mission-critical, value-add, actionable insights,
learnings, ideate, operationalize, socialize (an idea).*

Say the plain thing: *return to, analysis, help, easy wins, goal, discuss further, agree, capacity.*

### 3.3 Adverbs and intensifiers

Cut most of them: *really, very, quite, just, simply, literally, genuinely, actually, truly,
incredibly, remarkably, notably, arguably, essentially, fundamentally, ultimately, effectively,
significantly, substantially, seamlessly, effortlessly.*

This is a strong default rather than an absolute. An adverb that changes the meaning stays; an
adverb that only adds warmth goes. Do not strip so thoroughly that the prose turns into a telegram
see the density note in SKILL.md.

### 3.4 Hyphenated pairs

*Data-driven, cross-functional, client-facing, decision-making, real-time, end-to-end, high-quality,
long-term, well-known, best-in-class.*

Models hyphenate these uniformly, including after the noun. Keep the hyphen before a noun ("a
data-driven approach"), drop it after ("the approach is data driven"). Better still: use fewer of
them.

---

## 4. Rhetorical scaffolding

### 4.1 Throat-clearing openers

*Here's the thing. It turns out. The reality is. The truth is. What's interesting is. Believe it or
not. In today's fast-paced world. In an era of. As we all know. It's worth noting that. It is
important to understand that.*

Delete and start with the content.

### 4.2 Signposting

*Let's dive in. Let's explore. Let's break this down. Here's what you need to know. Now let's look
at. In this section we'll. First, let's establish. Without further ado.*

Announcing what you're about to do instead of doing it. Delete and do it.

### 4.3 Emphasis crutches

*Full stop. Period. Let that sink in. Make no mistake. And that's okay. Read that again. Yes,
really. I'll say it louder for the people in the back.*

Delete entirely; they add no information.

### 4.4 Rhetorical setups

*What if I told you…? Sound familiar? Here's the kicker. The catch? Plot twist. Think about it.*

Socratic posturing before an ordinary claim. Make the claim.

### 4.5 Authority tropes

*The real question is. At its core. Fundamentally. In reality. What really matters is. The deeper
issue. The heart of the matter. Here's what nobody tells you.*

These promise to cut through noise and then restate an ordinary point with ceremony.

### 4.6 Aphorism formulas

*X is the Y of Z. X becomes a trap. X is not a tool but a mirror. The language of X. The currency of
X. The architecture of X.*

Ordinary claims dressed as reusable wisdom. Replace with the concrete claim underneath.

Before: Documentation is the memory of an engineering team.

After: When the two people who built the ingestion service left, nobody could say why it retried
three times.

### 4.7 Fake-candid openers

*Honestly? Look. Here's the thing. The thing is. Let's be honest. Real talk.*, used as standalone
theatrical pauses before a routine point.

The tell is the pause-and-reveal structure, not the words. Mid-sentence "honestly" is ordinary human
writing and should be left alone.

Before: Is it worth switching? Honestly? It depends on your team size.

After: Whether it's worth switching depends mostly on team size.

---

## 5. Structure and formatting

### 5.0 Em and en dashes

The hard constraint from SKILL.md, restated here so the catalog is complete: no `—`, no `–`, no
`--`, no spaced hyphen used as a dash. Replace with a period, comma, colon, or parentheses. On its
own a weak signal (it marks edited formal English, which is why models produce it); in practice a
socially loaded one that costs nothing to avoid.

Exempt: inline code and code blocks, command-line flags (`--force`), identifiers and file names,
numeric and date ranges (2020–2024, pages 12–18), the minus sign, and a numeric range in a table
where the destination style already uses the en dash. Editing a dash inside a command or a range
breaks it.

Before: The rollout—which took three weeks—was delayed twice, once by legal and once by us.

After: The rollout took three weeks and was delayed twice, once by legal and once by us.

### 5.1 Bold lead-in lists

A bolded term, a colon, then a sentence restating the bolded term. This barely occurs in natural
writing.

Before:
- **Performance:** Performance has improved significantly.
- **Security:** Security has been strengthened with encryption.

After: The update cuts page load time by about half and adds end-to-end encryption.

### 5.2 Excessive boldface

Bolding product names, key terms, and phrases mechanically throughout. Bold is for genuine
emphasis, a few times per document at most.

### 5.3 Title Case headings

Use sentence case. "Strategic negotiations and global partnerships," not "Strategic Negotiations And
Global Partnerships."

### 5.4 Emoji in headings and bullets

Remove, unless the user's own established style uses them or the channel demands it (some Slack and
social contexts genuinely do).

### 5.5 Curly quotes

Prefer straight quotes where the destination allows. Weak signal on its own, most editors auto-curl
so never treat it as the sole reason to change a document.

### 5.6 Fragmented headers

A heading, then a one-line paragraph restating the heading, then the real content. Delete the
restatement.

### 5.7 Generic conclusions

*The future looks bright. Exciting times ahead. This marks an important step forward. Only time will
tell. One thing is certain. As we move forward.*

End on a fact, a real opinion, or nothing.

### 5.8 Over-structuring

Lists where prose would do. A four-item list of one-clause items is usually a sentence. Headings on
a 400-word piece. Summary sections that restate what was just said.

---

## 6. Register and tone

### 6.1 Chatbot residue

*I hope this helps. Of course! Certainly! Great question. You're absolutely right. Let me know if
you'd like me to expand. Would you like me to. Here is a. Feel free to.*

Never inside a deliverable.

### 6.2 Sycophancy

*That's an excellent point. Great question. You're absolutely right that this is complex.*

Applies to the text and to the conversation around it.

### 6.3 Excessive hedging

*It could potentially be argued that. Some might say. It's possible that in certain cases.*

One hedge is fine when the uncertainty is real. Stacked hedges signal an unwillingness to claim
anything.

Before: It could potentially be argued that the change might have some positive effect.

After: The change probably helped, though we didn't measure it.

### 6.4 Filler phrases

- *in order to* → to
- *due to the fact that* → because
- *at this point in time* → now
- *in the event that* → if
- *has the ability to* → can
- *it is important to note that* → (delete)
- *a wide range of* → (name them, or say how many)
- *when it comes to* → (delete, restructure)
- *the fact that* → (usually deletable)

### 6.5 Manufactured punchlines and staccato drama

Every sentence engineered to land like a quote, or a run of short fragments stacked for effect.

Before: Then the audit came. No warnings. No grace period. No appeal. The rules had changed.

After: The audit arrived in November with no warning and no appeal process, which surprised
everyone, since the previous version of the policy had a thirty-day window.

Note the direction of the fix: the human version is *longer and messier*, not shorter and punchier.
This is where stop-slop-style compression advice goes wrong if applied without judgment.

### 6.6 Narrator from a distance

*Nobody designed this. People often struggle with. One might find that.*

Put a specific person in the scene, or address the reader as "you" where the genre allows it.

### 6.7 Diff-anchored writing

Text that narrates a change rather than describing the thing. Unless the document is inherently
version-scoped (changelog, release notes, migration guide), it should read coherently without
knowing what the previous version said.

Before: This section was rewritten to clarify the earlier confusing explanation of retries.

After: The client retries three times with exponential backoff, then drops the message.
