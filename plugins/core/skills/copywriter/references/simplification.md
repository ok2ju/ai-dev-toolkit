# Simplification: making dense text readable without losing it

Read this when the request is "make this simpler," "clearer," "shorter," "for a non-technical
reader," "plain English," "простым языком," or when the source is legal, regulatory, academic, or engineering prose
that a wider audience has to act on.

Simplification is the task most likely to trigger both machine failures at once: cut too hard and
the text turns into a telegram (flatness); explain too eagerly and it fills with "in simple terms"
scaffolding (slop). The target is text a specific reader can act on after one reading, that still
says exactly what the original said.

**Contents**

- [First: who is this for and what will they do](#first-who-is-this-for-and-what-will-they-do)
- [Sentence-level moves](#sentence-level-moves)
- [Word-level moves](#word-level-moves)
- [Structure-level moves](#structure-level-moves)
- [What must not change](#what-must-not-change)
- [What simplification is not](#what-simplification-is-not)
- [Two worked examples](#two-worked-examples)
- [Exit check for simplified text](#exit-check-for-simplified-text)

## First: who is this for and what will they do

Before touching the text, fix two things. If the user hasn't said, ask, or state your assumption in
one line and proceed.

**The reader.** "Non-technical" is not a reader. A private client reading a fee schedule, a new
engineer reading a runbook, a regulator reading a policy, and a support agent reading a procedure
all need different simplifications of the same source. Name the reader to yourself.

**The action.** What will the reader do with this? Decide, comply, configure, explain to someone
else. Every sentence that does not help with that action is a candidate for deletion. Every fact
that the action depends on is protected, however technical.

The same source simplified for two readers should produce two different texts. If it wouldn't, the
reader hasn't been named.

## Sentence-level moves

**One idea per sentence.** Split at "and," "which," "whereas," and at any semicolon. Then check
whether the pieces need to be joined again to keep a dependency clear (see below).

**Name the actor.** Dense text hides who does what. "Documents must be submitted within 30 days"
leaves open who submits and to whom. "You send us the documents within 30 days" or "We send the
regulator the documents within 30 days" are different obligations. Passive is acceptable only when
the actor genuinely does not matter to the reader.

**Verbs, not nominalizations.** "Perform a verification of" is "verify." "Make a determination" is
"decide." "Effect a transfer" is "transfer." "Is applicable to" is "applies to." The noun form adds
a verb that does nothing and a preposition that does less.

**Conditions before consequences.** "If you hold more than CHF 100,000, we charge 0.3%" reads
faster than "A fee of 0.3% is charged where holdings exceed CHF 100,000." Put the reader's situation
first; they can stop reading if it isn't theirs.

**Keep the dependency when there is one.** Splitting "You may withdraw, provided that the lock-up
period has expired" into "You may withdraw. The lock-up period must have expired." loses the fact
that the second sentence is a condition on the first. Split, then re-join with "if," "only if,"
"unless," "after." Those words are short and carry meaning; do not cut them.

**Don't compress to a telegram.** Function words stay. "You can close the account at any time, and
we'll return the balance within five days" is simpler than "Account closure: anytime. Balance
returned: 5 days," even though the second is shorter. Shorter and simpler are different axes.

## Word-level moves

**Short word for long word, when the meaning is the same.** Use for utilize, help for facilitate,
start for commence, end for terminate, buy for acquire, about for approximately, before for prior
to, if for in the event that. The catalog in `patterns.md` section 6.4 has more.

**Jargon: define, replace, or keep. Decide per term.**

- *Replace* when a plain word means the same thing to this reader. "Counterparty" becomes "the
  other party" for a client; stays "counterparty" for a trader.
- *Define once and keep* when the term is the one the reader will meet everywhere else. If every
  form they sign says "beneficial owner," teach them "beneficial owner (the person the money really
  belongs to)" and then use it. Replacing it protects them from the term for one document and
  abandons them at the next.
- *Keep without defining* when the reader is the audience the term was made for.

**Numbers.** Write them the way the reader will use them. "0.3% per year" not "30 basis points
annually" for a client. "30 bps" for a portfolio manager. Give the concrete example if the rule is
abstract: "0.3% a year. On CHF 200,000, that's CHF 600."

**Cut the meta-language.** "In simple terms," "to put it plainly," "basically," "essentially,"
"what this means is." If the text is simple, it does not need to announce it. If it isn't, the
announcement doesn't help.

**Do not swap in a friendlier synonym for a precise one.** "Penalty" and "fee" are not the same
thing. "Delete" and "archive" are not the same thing. Simplify the sentence around the precise word.

## Structure-level moves

**Lead with what the reader needs to know or do.** Background goes after, or goes away.

**Headings as the reader's questions**, when the document is something they'll scan for their case:
"What happens if I miss a payment?" over "Late payment provisions." For reference documents the
neutral heading is fine.

**Lists for genuine lists.** Steps, options, criteria. Not for three related sentences that were a
paragraph. A four-item list of one-clause items is usually a sentence.

**Examples over abstractions.** One concrete case does more than a paragraph of general rule. Put
the example right after the rule it illustrates, and mark it as an example.

**Cut the parts the reader will not act on.** Preambles, history of the policy, restatements of the
legal basis. If the reader must be able to find them, link or footnote; do not make them read them.

## What must not change

Simplification is rewriting, not editing the substance. Preserve:

- **Every condition, exception, threshold, and deadline.** These are the meaning. A simplified
  contract clause that drops "unless notified in writing" is wrong, not simpler.
- **Legally or regulatorily required wording.** Risk warnings, disclaimers, defined terms in a
  contract, quoted regulation. Leave the formula intact; simplify around it and, if useful, add a
  plain explanation next to it clearly marked as an explanation.
- **Modal strength.** "Must," "should," "may," and "can" are different commitments. Do not upgrade
  "may" to "will" or downgrade "must" to "should" for rhythm.
- **Proper names, product names, and official terms** as their owners spell them.
- **Negatives.** If the source says the reader is not covered, the simplified version says so as
  plainly. Do not soften a bad outcome into a neutral one.
- **Uncertainty that is real.** "Typically within five days" is not "within five days."

When simplifying loses something and you cannot find a plain way to keep it, keep the original
sentence and flag it: `[KEPT: could not simplify without changing meaning]`.

## What simplification is not

- Not dumbing down. The reader is capable; they lack context or time, not intelligence. Avoid the
  register that explains what a bank is.
- Not adding warmth. "Don't worry, this is easy!" is not simplification. Neither is an exclamation
  mark.
- Not summarising. A summary drops content on purpose. Simplification keeps the content and changes
  the words. If the user wants both, do them as two steps and say which is which.
- Not translation into marketing. "Our transparent, client-first fee structure" is a different
  document from the fee schedule.

## Two worked examples

**Source (policy):** Clients are required to notify the Bank in writing of any change to their
residential address or tax residency status within thirty (30) days of such change taking effect,
failing which the Bank reserves the right to suspend outgoing transfers until updated documentation
has been received and verified.

**For a private client:** If your home address or tax residency changes, tell us in writing within 30
days. If you don't, we can block outgoing transfers until we've received and checked your new
documents.

**For a relationship manager (procedure):** Address or tax-residency change: client must notify in
writing within 30 days. If they don't, we can suspend outgoing transfers until updated documents are
received and verified. Suspension is at the bank's discretion, not automatic.

Note the second version keeps "at the bank's discretion, not automatic," which the client version
doesn't need but the RM does. Same source, different readers, different texts.

**Source (engineering):** The service implements an exponential backoff retry strategy with jitter
for transient upstream failures, capping at three attempts before the message is routed to the
dead-letter queue for manual inspection.

**For a support agent:** If the upstream system fails, the service retries up to three times,
waiting a bit longer each time. After the third failure, the message goes to a holding queue (the
"dead-letter queue") and someone has to look at it by hand.

For the reader-first method behind these moves (context, the reader's worry, facts over evaluation,
structure for the scanner), read `infostyle.md`.

## Exit check for simplified text

In addition to the SKILL.md exit check:

1. Who is the reader, in one phrase? Would a different reader need a different text?
2. Every condition, exception, threshold, deadline from the source still present?
3. Every "must / should / may / can" at the same strength as the source?
4. Any actor still hidden behind a passive that matters?
5. Any nominalization left ("perform a review," "make a payment")?
6. Any "in simple terms," "basically," "essentially"?
7. Any legally required wording altered?
8. Did the text turn into a telegram? Read it aloud.
9. Any exclamation mark or reassurance that the source didn't have?
10. Would the reader know what to do next after one reading?
