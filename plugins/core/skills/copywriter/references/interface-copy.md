# Interface copy: text inside a product

Read this for any string a user will see inside software: buttons, labels, headings, error
messages, empty states, confirmations, onboarding, notifications, tooltips, helper text, settings
descriptions, status messages.

Interface copy is the genre where the general prose rules least apply and consistency matters most.
Nobody reads a settings screen for voice. They read it to find the thing and do the thing. The
product's copy is a single system, and the job is to make each string fit the system.

**Contents**

- [What changes here](#what-changes-here)
- [The system first](#the-system-first)
- [Buttons and actions](#buttons-and-actions)
- [Labels, headings, and field names](#labels-headings-and-field-names)
- [Error messages](#error-messages)
- [Empty states](#empty-states)
- [Confirmations and destructive actions](#confirmations-and-destructive-actions)
- [Success and status messages](#success-and-status-messages)
- [Helper text, tooltips, placeholders](#helper-text-tooltips-placeholders)
- [Onboarding and notifications](#onboarding-and-notifications)
- [Regulated and financial products](#regulated-and-financial-products)
- [Delivery format](#delivery-format)
- [Exit check for interface copy](#exit-check-for-interface-copy)

## What changes here

**Repetition is the design.** SKILL.md says repeat your nouns. Here it is mandatory. One object has
one name in every screen, every message, every tooltip. If the navigation says "Portfolio," the
error message does not say "your holdings." Keep a glossary as you go and check every string against
it.

**The voice is the product's.** No first-person opinion, no asides, no rhythm games. If the product
has an established tone (existing strings, a style guide, a brand voice document), that overrides
every default in this file. Ask for existing strings before writing new ones.

**Length is a hard constraint.** A button has room for two or three words. A toast has one line. A
tooltip has two. Write to the space; if you don't know the space, ask or state your assumption.

**The reader is mid-task and slightly stressed.** Every word costs them attention they wanted to
spend on their own goal. Cut to what they need to continue.

**Em dashes: zero.** Also en dashes in ranges where a plain "to" fits ("1 to 5 days"). Numeric
ranges in tables may keep the en dash if the product already does.

## The system first

Before writing any string:

1. Collect the terms already in use: object names, action names, status names. Use them.
2. Establish capitalization once. Default: sentence case everywhere (buttons, headings, labels,
   menu items). Title Case only if the product already uses it.
3. Establish person once. Default: address the user as "you"; the product speaks as "we" only when
   an organisation is genuinely acting ("We've sent you a code"). Never "I" for the product unless
   it is a named assistant (then see `dialogue.md`).
4. Establish punctuation once. Default: no terminal period on labels, buttons, headings, or
   single-sentence tooltips; period on multi-sentence body text. No exclamation marks anywhere.
5. Decide the terminology for the recurring hard cases: sign in / log in, remove / delete, cancel /
   close, save / done. Then never vary.

## Buttons and actions

**Verb plus object.** "Save changes," "Add account," "Send code." The user should know what will
happen from the button alone, without reading the surrounding text. "OK," "Submit," "Continue," and
"Yes" fail this test; they are acceptable only when the question directly above them is unambiguous
and short.

**The button says what it does, not how the user feels.** "Get started" and "Let's go" are
marketing. "Create account" is a button.

**Primary and secondary pairs are parallel and honest.** "Delete account" / "Keep account." Not
"Delete account" / "Cancel," because "cancel" is ambiguous when the action is itself a cancellation.
Not "Yes" / "No."

**Never a button that lies about state.** "Saved" on a button that saves when clicked is wrong.
"Save" before, "Saved" after, and the change must actually have happened.

**Avoid:** click here, learn more (name what they'll learn), submit, proceed, go, do it, confirm
(unless followed by the object: "Confirm transfer").

## Labels, headings, and field names

- Nouns or noun phrases. "Account number," not "Enter your account number" (that is placeholder or
  helper text, not the label).
- Sentence case. "Date of birth," not "Date Of Birth."
- No colon after a label unless the platform convention requires it.
- The label matches the term used everywhere else, including the API error that might surface.
- Required/optional: mark the exception, not the rule. If most fields are required, mark
  "(optional)" on the few that aren't.
- Headings on a screen state where the user is or what they're doing: "Transfer to another bank,"
  not "Transfer" alone if there are three kinds of transfer.

## Error messages

The most important strings in the product, and the most often written last and badly. An error
message has three parts, in order. Drop a part only when it is obvious.

1. **What happened.** In the user's terms, not the system's. "We couldn't send the code" not
   "SMS gateway timeout."
2. **Why, if the user can do something about it.** "The phone number ends in 4421, which isn't a
   Swiss or EU mobile number." Skip the why when it's internal and the user can't act on it.
3. **What to do next.** "Check the number, or use the authenticator app instead." With a button
   that does it, when possible.

Before: Error 422: Validation failed. Please try again later.

After: We couldn't save the transfer. The amount is above your daily limit of CHF 50,000. You can
schedule it for tomorrow or split it into two transfers.

**Rules:**

- **No blame.** "Invalid input" and "You entered an incorrect password" put the user in the wrong.
  "That password doesn't match" states the fact.
- **No apology theatre.** "Oops!" "Uh oh!" "Something went wrong" say nothing. If the product is
  genuinely at fault and the user has lost work, one plain "Sorry" is appropriate. Otherwise none.
- **No error codes in the user's line.** Put the code in smaller text below, or behind "Details,"
  for support to use.
- **No "please try again" without saying when or what to change.** If retrying will help, say
  "Try again in a minute." If it won't, don't suggest it.
- **Say what is still safe.** If a payment failed, the user's first question is whether money left
  the account. Answer it: "Nothing was transferred."
- **One message, one problem.** If three fields are wrong, three inline messages, not one summary.
- **Match the severity to the problem.** A missing optional field is not an error. A failed transfer
  is.

## Empty states

An empty state is the first thing a new user sees and the last thing a lapsed user sees. It has two
jobs: say what would be here, and give the first action.

Before: No data available.

After: No transactions yet. Once you make your first deposit, it will appear here.

Before: Your watchlist is empty. Start adding assets to keep track of the ones you care about!

After: Nothing on your watchlist. Add an asset to follow its price here.

- State the object by its name. "No transactions," "No documents," not "Nothing here."
- One next action, as a button where possible.
- No exclamation marks, no "Start your journey," no encouragement. The user knows the list is
  empty; they need to know what to do.
- Distinguish "empty because new" from "empty because filtered." "No transactions match these
  filters" with a "Clear filters" action is a different string.

## Confirmations and destructive actions

**Ask a real question and name the consequence.** "Delete this beneficiary? You'll need to add
them again to send money to this account." The user should be able to decide from the dialog
without remembering what they clicked.

**Buttons repeat the verb.** "Delete beneficiary" / "Keep beneficiary." Never "Yes" / "No" or
"OK" / "Cancel" on a destructive action.

**Say whether it's reversible, in either direction.** "You can restore it from Archive for 30
days" or "This can't be undone." Never leave it implied.

**Don't confirm what doesn't need confirming.** A confirmation on every action trains users to click
through. Confirm only destructive, irreversible, or expensive actions.

**For money:** repeat the amount, the currency, and the recipient in the confirmation. "Send CHF
12,000 to Maria Keller, IBAN ending 8834?" Every one of those is a field the user might have got
wrong.

## Success and status messages

- **Confirm the object and the fact.** "Transfer scheduled for 10 September" not "Success!" or
  "Done." The user wants to know what happened, not that something did.
- **"Successfully" is always deletable.** "Saved successfully" is "Saved."
- **Progress states name what's happening.** "Verifying your document…" not "Loading…" when you
  know. Give a time if you know it: "This usually takes under a minute."
- **Toasts are one line and disappear.** Put anything the user might need later in the object
  itself, not only in the toast.

## Helper text, tooltips, placeholders

**Helper text** sits under a field and answers the question the user is about to ask. "We'll send a
code to this number" under a phone field. Not a repetition of the label.

**Placeholders** show format, not instruction. "CH93 0076 2011 6238 5295 7" in an IBAN field. Never
use the placeholder as the label; it disappears when the user starts typing.

**Tooltips** explain a term or a control that can't be made self-explanatory. Two lines maximum. If
the tooltip is essential to using the control, it shouldn't be a tooltip; put it on the screen.

**Don't explain what the label already says.** A tooltip on "Email" that says "Enter your email
address" is noise.

## Onboarding and notifications

**Onboarding screens** say what the user can do here and get out of the way. One idea per screen,
one sentence per idea, one action. "Add your first account to see your total balance" beats a
paragraph about the product's vision. Let the user skip.

**Notifications** are interruptions. Each one must be worth it: what happened, to what, and (if
needed) what to do. "CHF 4,200 arrived from Lukas Brunner" is a notification. "You have a new
transaction" makes the user open the app to find out what you already know.

- No marketing in transactional notifications.
- Name the object and the amount, not "an item" or "an update."
- Push notification: one line, under about 60 characters if possible. Email subject: same rule.

## Regulated and financial products

The tone that suits a note-taking app is wrong here. Clients moving money want to be told exactly
what is happening, in the terms the regulator and their statements use.

- **Precision over friendliness.** "Your order was executed at CHF 61,240.50" not "Nice! Your
  purchase went through."
- **Required wording stays.** Risk warnings, "not investment advice," custody disclaimers. Do not
  rephrase them for rhythm. Place them where they're required and keep the surrounding copy plain.
- **Never imply certainty the product doesn't have.** "Usually arrives within one business day," not
  "Arrives tomorrow," unless the product guarantees it.
- **Amounts always carry currency.** "12,000" is not an amount. "CHF 12,000" is.
- **Status vocabulary matches the back office.** If operations say "pending settlement," the app
  says "pending settlement" with a plain gloss, not "on its way."
- **Fees are stated, not softened.** "Fee: CHF 25" not "a small processing charge applies."

## Delivery format

When delivering interface copy, give the user something they can paste into a spec or a design
tool:

- A table with columns for location (screen / component), string, and notes (character limit,
  when it shows, variables). Keep notes short.
- Variables in a consistent placeholder syntax, `{amount}`, `{recipient}`, and say what each is.
- Group by screen or flow, in the order the user meets them.
- If several strings are alternatives, label them and say which you'd ship.
- Include the glossary of terms you fixed, so the next person keeps them.

Do not deliver interface copy as prose paragraphs. Nobody can copy a string out of a paragraph
safely.

## Exit check for interface copy

In addition to the SKILL.md exit check:

1. Every object called by exactly one name across all strings?
2. Capitalization, person, and terminal punctuation consistent throughout?
3. Every button a verb plus object, honest about what it does?
4. Every error: what happened, why (if actionable), what to do next?
5. Any "Oops," "Something went wrong," "Invalid," "Please try again" without a when?
6. Any exclamation mark? Any "successfully"?
7. Any destructive action with Yes/No or OK/Cancel buttons?
8. Any string over its space budget?
9. Every amount with a currency? Every money confirmation repeating amount and recipient?
10. Any required legal wording altered?
11. Any state claimed ("Saved," "Sent") that the copy alone can't guarantee?
12. Delivered as a table with locations, not as paragraphs?
