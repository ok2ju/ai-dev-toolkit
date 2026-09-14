# Dialogue: conversation that sounds like people talking

Read this for anything written as turns between speakers: chatbot and assistant replies, support
chat scripts, demo scripts, user-test moderation scripts, persona conversations, dialogue inside
scenarios, case studies, and stories.

Dialogue fails differently from prose. It can pass every tell check and still be wrong, because the
tells in dialogue are about what people *would not say*, not about vocabulary. The test is a single
one, applied to every line: would this person say this, in this situation, to this listener?

**Contents**

- [Three kinds of dialogue](#three-kinds-of-dialogue)
- [How real speech behaves](#how-real-speech-behaves)
- [The tells specific to dialogue](#the-tells-specific-to-dialogue)
- [Assistant and chatbot turns](#assistant-and-chatbot-turns)
- [Support and service scripts](#support-and-service-scripts)
- [Demo and user-test scripts](#demo-and-user-test-scripts)
- [Persona and scenario dialogue](#persona-and-scenario-dialogue)
- [Formatting dialogue](#formatting-dialogue)
- [Exit check for dialogue](#exit-check-for-dialogue)

## Three kinds of dialogue

They share the speech rules and differ in who is talking.

1. **A product talking to a user.** Assistant replies, chatbot flows, in-app conversational UI. One
   side is scripted and must sound like a competent person; the other side is real and unpredictable.
   The voice is the product's and must be consistent across thousands of turns.
2. **A person talking for a purpose.** Support agent scripts, sales calls, demo walkthroughs,
   user-test moderation. The speaker is real, the lines are prepared, and the listener must not
   feel the script.
3. **Two or more people in a scene.** Persona roleplay, scenario walkthroughs, case-study dialogue,
   fiction. Nobody is scripted in-world; everything is invented, and the invented people must differ
   from each other.

## How real speech behaves

Write toward these. They are what a transcript looks like, and what generated dialogue lacks.

**People don't say each other's names.** In a two-person conversation, names appear at the start,
when getting attention, and almost never otherwise. "Well, Viktor, that's a good question" is a
tell in one line.

**People answer the question they heard, not the question asked.** They answer a related one,
answer too much, answer too little, or ask one back. A conversation where every reply addresses
exactly the previous line is a tennis match, not talk.

**Turns are uneven.** Someone says three words. Someone says eighty. Two consecutive turns of equal
length are fine; six are a tell.

**Contractions, always.** "I don't think that's right" not "I do not think that is right." The
uncontracted form is for emphasis or for a character who speaks that way, and then it's a trait, not
a default.

**Fragments are normal.** "The fee?" "Every month." "Even if I don't trade?" "Even then." Full
sentences every turn is written language, not spoken. (Contractions are an English mechanism; in
other languages the equivalent is the colloquial particle, the dropped pronoun, the short form. See
`languages.md`.)

**People interrupt, trail off, restart.** Sparingly on the page (a little goes a long way), but a
transcript with zero of these is not a transcript.

**People don't explain what both of them know.** "As you know, we launched the staking product in
March" is exposition wearing a costume. If both speakers know it, one of them refers to it without
explaining: "Since the staking launch."

**People have something they want.** In every exchange each speaker is after something: information,
reassurance, to end the call, to be right, to not look stupid. If a speaker has no want, they have
no lines.

**People don't summarise at the end.** Real conversations end on a logistical note ("okay, send it
over"), a trail-off, or an abrupt topic change. They do not end with one speaker restating what was
agreed unless that is literally their job (a support agent closing a ticket).

**Disagreement is normal and stays unresolved.** Two people who reach perfect agreement in six turns
were written by one person. Let something stay open.

## The tells specific to dialogue

Beyond the general catalog in `patterns.md`:

- **The acknowledgement opener.** "That's a great question." "I completely understand." "I
  appreciate you sharing that." "Absolutely!" Real people acknowledge by answering.
- **The echo.** Repeating the user's words back before responding. "So you'd like to know about the
  fee structure. Let me explain the fee structure." Answer the question.
- **The name drop.** See above.
- **The therapist reflect.** "It sounds like you're feeling frustrated about the delay." In a support
  context this reads as a script. State what you'll do about the delay.
- **The menu reply.** Every answer offers three options in parallel. People suggest one thing, maybe
  two, and say which they'd pick.
- **The lecture.** A reply that runs five sentences when the question needed one. Especially in
  assistant turns, the user asked a question, not for a briefing.
- **The bow.** Closing every turn with "Let me know if there's anything else!" or "Is there anything
  else I can help you with?" Once, at a genuine end, is fine. Every turn is a robot.
- **Perfect grammar from everyone.** All speakers producing complete, correctly punctuated, evenly
  paced sentences. Give each speaker a different rhythm.
- **Same voice, different labels.** If you swap the speaker names and nothing reads wrong, the
  characters aren't distinct.
- **Stage-direction emotion.** "(laughs)" "(pauses thoughtfully)" carrying the feeling the words
  should carry. Use stage directions for action, rarely for emotion.
- **The convenient question.** The user asks exactly the question that lets the product explain its
  best feature. Real users ask about the fee, the delay, and whether they can get their money back.

## Assistant and chatbot turns

The product is speaking. It must sound like one competent, consistent person who respects the user's
time.

**Answer first.** The first sentence of the reply is the answer or the action. Not an
acknowledgement, not a restatement, not "Sure!"

Before: Great question! I'd be happy to help you understand the fee structure. Our fees are
designed to be transparent and competitive. For custody, we charge 0.3% per year on your holdings.

After: Custody costs 0.3% a year on what you hold. On CHF 200,000 that's CHF 600, billed monthly.

**One question per turn.** If you need two things from the user, ask the first. If you must ask
two, make it clear they're two and number them.

**Short by default, longer when the content requires.** A one-line question gets a one- or two-line
answer. Don't pad to look thorough.

**Say what you don't know or can't do, plainly and once.** "I can't see your transaction history
from here. The Transactions tab has it, or I can connect you to someone who can." Not three
sentences of apology.

**Don't perform empathy. Do the thing.** If the user is annoyed about a delay, the empathetic move is
to say when it will be resolved and what you've done. "I understand your frustration" without an
action is worse than nothing.

**Consistency across turns.** The assistant has one name for every object (see
`interface-copy.md`), one level of formality, and one attitude. It does not become chirpy when the
news is good and formal when it's bad.

**No exclamation marks.** An assistant that is pleased about everything is pleased about nothing.

**Escalation and handover lines say what happens next.** "I'm passing this to the payments team.
They'll reply here within two hours, and you'll get an email when they do." Not "Let me transfer
you."

**The user's message is not a prompt to be complimented.** No "That's a smart approach" about the
user's plan. Engage with it.

**Regulated context.** Where the product is a financial or medical service, the assistant does not
speculate, does not give the impression of advice it isn't licensed to give, and uses the exact
status terms the back office uses. "Pending settlement" with a one-line gloss, not "on its way."

## Support and service scripts

A real person will read these lines to a real customer, or adapt them in chat. The script must
survive contact with someone who did not read the script.

- **Write the opening and the closing; leave the middle as prompts.** A fully scripted middle
  breaks the moment the customer says something unexpected. Give the agent the facts they need
  and two or three phrasings, not a paragraph to recite.
- **Write for the ear.** Read every line aloud. If it has a subordinate clause the agent will
  stumble on, split it.
- **Branch on what the customer actually says**, not on what you'd like them to say. "If they ask
  whether the money left the account" is a branch that must exist for any payment script.
- **State the bad news, then the next step.** "The transfer was rejected by the receiving bank.
  Nothing left your account. I can resend it with the corrected IBAN now." Not a preamble about
  how sorry we are.
- **Give the agent the permission lines.** What they can offer (refund the fee, escalate, call
  back), in plain words, so they don't improvise promises.
- **No script phrases the customer has learned to hear as script.** "I completely understand your
  frustration." "Thank you for your patience." "Is there anything else I can assist you with
  today?" These announce that the person is reading.

## Demo and user-test scripts

**Demo scripts** are speech about a product to an audience that is looking at the screen, not at the
speaker.

- Say what the audience is about to see, then do it, then say what it meant. "I'm going to add a
  beneficiary. [does it] That took three fields. The old flow had eleven."
- Speaker notes rules from `presentations.md` apply: contractions, uneven sentences, mixed feelings
  allowed.
- Plan the failure. Write the line for when the demo doesn't work: "That's the staging environment
  timing out. In production this comes back in about a second. Let me show you the result from
  yesterday."
- No "Now let's take a look at" on every step. Vary: "Next up," "Here's the part I wanted you to
  see," or just do it.

**User-test moderation scripts** must not lead the participant.

- Tasks are goals, not instructions. "You want to send CHF 500 to a friend in Germany. Go ahead."
  Not "Click Transfer, then choose International."
- Never name the feature you're testing in the task. If the task says "use the quick transfer
  button," you've told them where it is.
- Questions are open and non-evaluative. "What did you expect to happen there?" Not "Was that
  easy?" Not "Did you like that?"
- Write the silence in. "[wait; do not help for 10 seconds]" is a legitimate script line.
- Write the neutral responses the moderator falls back on. "Mm-hm." "Tell me more about that." "What
  are you looking at right now?"
- The script includes what to say when the participant asks for help: "What would you do if I
  weren't here?" and the point at which to actually help.

## Persona and scenario dialogue

When writing invented people (persona roleplay, scenario walkthroughs, case-study exchanges), the
job is to make them differ from each other and from the narrator.

**Each speaker has one or two verbal habits**, used lightly. A tendency to answer with a question. A
habit of understating. Long sentences with short ones. Financial vocabulary used precisely, or used
wrongly. Not a catchphrase; a pattern.

**Each speaker has a want in this scene**, and it is usually not the same as the other speaker's.
The client wants to know if their money is safe; the RM wants to explain the product. That gap is the
scene.

**Give them things to be wrong about.** A persona who is always correct is a spokesperson. Real
clients misremember the fee, confuse two products, and are sure about things that aren't so.

**Let the scene do work the prose can't.** If a scenario document already says "the client was
confused by the fee display," the dialogue should show the confusion, not restate it. If the
dialogue and the surrounding prose say the same thing, cut one.

**When the persona is testing a prototype**, the persona reacts
to what is actually on the screen: reads the label aloud, misreads it, asks what a term means,
ignores the thing the designer cared about. The persona does not deliver a usability review in
paragraph form. That is the analyst's job afterwards.

**Emotion in the words, not in the brackets.** A client who is angry says a short thing. "So where
is it." A client who is nervous asks the same question twice in different words. "(angrily)" is
the writer giving up.

**End before the resolution.** Cut the last two lines of any scene you write and see if it's better.
It usually is.

Before:

> **Client:** Hello, I have a question about my recent transaction.
> **Assistant:** Of course! I'd be happy to help you with your recent transaction. Could you please
> provide more details about which transaction you're referring to?
> **Client:** I sent 5,000 francs to my daughter yesterday and it hasn't arrived yet. I'm concerned
> about this delay.
> **Assistant:** I completely understand your concern. Transfers to other banks typically take one to
> two business days to process. Your transfer should arrive by tomorrow. Is there anything else I can
> help you with today?

After:

> **Client:** I sent my daughter five thousand yesterday. Nothing's arrived.
> **Assistant:** It left your account at 16:40 yesterday and the receiving bank has it. Transfers to
> UBS usually post by the next morning, so it should be in her account within a couple of hours. If
> it isn't by noon, tell me and I'll trace it.
> **Client:** Yesterday afternoon, though. That's not exactly instant.
> **Assistant:** No. Same-day only works for transfers within Switzerland before 14:00. You'd hit the
> cutoff yesterday by about three hours.
> **Client:** Nobody told me that.
> **Assistant:** It's under the amount field, in small text. I've flagged it. Want me to set a
> reminder for noon?

## Formatting dialogue

- Speaker label, colon, line. Bold labels if the destination renders markdown; plain otherwise.
- One turn per paragraph. No two speakers in one paragraph.
- Stage directions in square brackets, sparingly, present tense: "[reads the screen]."
- For chatbot flows, mark branches clearly and number them. Give the trigger condition for each
  branch in plain words, not in code.
- For scripts an agent will read, mark what is said verbatim and what is a prompt to improvise:
  verbatim in quotes, prompts in italics or brackets.
- For user-test scripts, mark moderator lines, task cards, and observation notes as three distinct
  things.
- Timing annotations, if the user wants them, at the right margin or in brackets: "[~30 s]".

## Exit check for dialogue

In addition to the SKILL.md exit check:

1. Read every line aloud. Any line nobody would say?
2. Any speaker using the other's name mid-conversation without a reason?
3. Any "Great question," "I understand," "Absolutely," "Of course!" opener?
4. Any turn that echoes the previous turn before answering?
5. Do all replies address exactly the previous line? Break one.
6. Turn lengths: any run of four or more similar-length turns?
7. Contractions throughout, unless a character specifically doesn't?
8. Any "as you know" exposition?
9. Swap the speaker labels. Does anything read wrong? If not, the voices aren't distinct.
10. Any exclamation mark in an assistant or agent turn?
11. Any "Is there anything else I can help you with?" not at a genuine end?
12. Any emotion carried by a stage direction instead of the words?
13. Does the scene end on a summary or a full resolution? Cut the last lines.
14. In assistant turns: is the first sentence the answer?
15. In moderation scripts: does any task or question name the feature or lead the participant?
16. Any status, fee, or product fact the user didn't supply? `[CLARIFY: ...]` it.
