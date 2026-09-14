# Languages: applying the skill outside English

Read this before writing or editing in any language other than English. The principles in SKILL.md
come from how language models generate text, not from how English works, so most of them transfer.
The *surface* tells do not: each language has its own flagged vocabulary, its own punctuation norms,
and its own idea of what "plain" sounds like. Applying the English surface rules to Russian produces
text that is wrong in a different way.

**Contents**

- [What is universal](#what-is-universal)
- [What is English-only](#what-is-english-only)
- [Method for any language](#method-for-any-language)
- [Russian](#russian)
- [German](#german)
- [Other languages](#other-languages)
- [Translation tasks](#translation-tasks)
- [Exit check for non-English text](#exit-check-for-non-english-text)

## What is universal

These hold in every language the model writes, because they come from the generation process:

- **Uneven sentence rhythm.** Machine text settles into a mid-length cadence in Russian, German,
  and French just as in English. Break it the same way.
- **Repeat your nouns.** Synonym cycling is a repetition-penalty artefact, not an English habit. In
  Russian the model will cycle "клиент / пользователь / заказчик" for one person; pick one.
- **Keep the connective tissue.** Pronouns, particles, conjunctions. Do not compress to a telegram.
- **Aim easier than feels right.** Machine text reads harder than human text in every measured
  language.
- **Keep the negative pole.** Softening bad news toward neutral is model behaviour, not culture.
- **Hoard specifics; never fabricate.** Names, numbers, dates.
- **Significance inflation, -ing-style tails, "not X but Y", rule of three, copula avoidance,
  vague attribution, throat-clearing, generic uplift endings, chatbot residue, manufactured
  punchlines.** All of these have a direct equivalent in every language; the wording differs, the
  move is the same.
- **Everything in "Beyond the tell check":** the over-correction trap, the insight quota, contrarian
  setups, filler sentences, term coverage, translate-don't-transcribe, verb seniority, order
  carries argument, deduplication.
- **The genre files.** Slide titles as claims, error messages with what/why/next, dialogue where
  people don't say each other's names: none of that is English-specific.

## What is English-only

Do not export these mechanically:

- **The em dash ban.** In English the dash is style. In Russian the тире is grammar (subject and
  predicate, direct speech, ranges) and banning it produces broken text. See the Russian section.
- **The flagged word set** in `patterns.md` §3.1. "Delve," "tapestry," "leverage" are English
  artefacts. Each language has its own set; the Russian and German ones are below.
- **Contractions** as a marker of spoken register. Other languages mark it differently.
- **Title Case vs sentence case.** Irrelevant in languages that don't capitalise titles that way;
  German capitalises nouns regardless.
- **Straight vs curly quotes.** Russian uses «ёлочки», German uses „Anführungszeichen“ or »«, French
  uses « » with spaces. Those are correct, not tells.
- **Serial comma, hyphenated compound rules, the specific filler phrases** in §6.4. Each language
  has its own.
- **Readability indices.** Flesch and Gunning Fog are calibrated on English. Use the target: short
  words, short clauses, one idea per sentence. Do not compute a score.

## Method for any language

When the language isn't covered below, build the surface layer yourself before drafting:

1. **List the language's own AI vocabulary.** Ask: which words does a model produce in this language
   that a person rarely writes? They cluster in the same places as in English: inflated
   significance, abstract landscapes and journeys, "innovative / dynamic / comprehensive," verbs
   meaning "use" that are longer than "use."
2. **List the language's chatbot residue.** The equivalents of "Great question!" and "I hope this
   helps," and the connective openers the model overuses ("Стоит отметить," "Es ist wichtig zu
   beachten," "Il convient de noter").
3. **Fix the punctuation norms.** Quotation marks, dashes, spacing, decimal and thousands
   separators, date formats. Get these from the language's own standard, not from English.
4. **Decide what "plain" is.** In every language there is a bureaucratic register the model drifts
   toward (канцелярит, Beamtendeutsch, langue de bois) and a plain register a competent person
   uses. Name both to yourself.
5. **Match the user's own text** if they have supplied any. This beats every default.

## Russian

### Punctuation and formatting

- **Тире stays where grammar requires it:** between subject and predicate ("Москва — столица"),
  before "это," in direct speech, in ranges, after a list before a summarising word. Cut it where it
  is doing the English job of a parenthetical aside ("Мы запустили продукт — и он сразу нашёл
  аудиторию"). One test: could a Russian schoolteacher point to the rule that requires this тире?
  If not, use a comma, colon, or period. Check that it is a proper тире (—), not a hyphen (-) or an
  en dash (–); the wrong glyph is itself a tell.
- **Quotation marks:** «ёлочки», with „лапки“ for nested quotes. Straight quotes in Russian body
  text read as unedited.
- **Ё:** follow the user's existing text. If they write ё, write ё throughout; if they don't,
  don't. Mixing is the tell.
- **Numbers:** space as thousands separator (12 000), comma as decimal (0,3 %), percent sign with a
  space before it in formal text, currency after the number (12 000 CHF, 500 ₽).
- **Capitalisation:** only the first word of a heading. Не Заглавные Буквы В Каждом Слове.
- **No exclamation marks** in professional text, same as English.

### Flagged vocabulary

Words and phrases that appear far more often in generated Russian than in written Russian. One is
nothing; four in a paragraph is a signature.

*Является* (as a copula where "—" or nothing would do), *осуществлять, реализовывать* (for
"делать"), *в рамках, в условиях, в контексте, в целях, с целью, в части, по вопросу,* *данный*
(for "этот"), *ключевой, важный, значимый, актуальный, эффективный, комплексный, уникальный,
инновационный, современный, динамичный, устойчивый, глубокий, ценный, качественный,* *стремительно
меняющийся, динамично развивающийся, в современном мире, в наше время, на сегодняшний день, в
цифровую эпоху,* *играет ключевую роль, вносит вклад, подчёркивает важность, открывает новые
возможности, выводит на новый уровень, раскрывает потенциал, задаёт тренд, формирует, выстраивает,
трансформирует,* *ландшафт* (abstract), *экосистема, синергия, бесшовный, кастомизированный,
масштабируемый, прозрачный* (as a virtue), *подход, решение, инструмент* (as empty nouns),
*погрузиться, разобраться, окунуться, нырнуть* as invitations, *стоит отметить, важно понимать,
нельзя не отметить, следует подчеркнуть, необходимо учитывать, как известно, не секрет, что,*
*давайте разберёмся, рассмотрим подробнее, перейдём к,* *в заключение, подводя итог, таким образом*
as a closing move, *не просто X, а Y; это не о X, это о Y,* *будущее за..., впереди много
интересного, время покажет.*

Replacements are the plainest word: *делать* for *осуществлять*, *этот* for *данный*, *чтобы* for
*в целях*, *использовать* or a concrete verb for *реализовывать*, nothing for *стоит отметить*.

### Канцелярит

The Russian bureaucratic register is the model's default drift and deserves its own check. Marks:

- **Chains of genitives.** "Повышение эффективности процесса обработки обращений клиентов." Rebuild
  with a verb: "Обрабатывать обращения клиентов быстрее."
- **Nominalised verbs.** "Осуществление контроля" → "контролировать." "Проведение анализа" →
  "проанализировать." "Принятие решения" → "решить."
- **Passive and impersonal constructions hiding the actor.** "Было принято решение" → who decided.
- **Является + noun** where a dash or a plain verb works. "Компания является лидером рынка" →
  "Компания — лидер рынка" or better, the fact that makes it one.
- **Prepositional stacks.** "В целях обеспечения возможности" → "чтобы."
- **Отглагольные существительные на -ание/-ение** in a row. Three in one sentence is the mark.

Plain Russian is not casual Russian. A competent Russian writer at senior level writes short
sentences with real verbs, addresses the reader as вы, and does not drop into разговорный. The
over-correction trap in SKILL.md applies: the thought-leader column in Russian looks like Telegram-
channel prose, with one-line paragraphs, rhetorical questions, and an aphorism per paragraph.

The Russian editorial school for all of this is инфостиль; `infostyle.md` carries its principles in
full, including where this skill deliberately departs from them.

### Register and address

- **Вы / ты.** Decide once from the user's material or the product's existing copy. Default вы for
  clients, professional documents, and interfaces. Lower-case вы in interfaces and most modern
  business writing; capital Вы only in formal personal correspondence.
- **Chatbot residue in Russian:** "Отличный вопрос!", "Конечно!", "С удовольствием помогу",
  "Надеюсь, это поможет", "Если у вас возникнут вопросы, обращайтесь", "Рад был помочь". None of
  these belong in a deliverable or in an assistant turn.
- **Spoken register markers** (the equivalent of English contractions): short sentences, colloquial
  particles used lightly (ну, вот, же, то есть), dropped pronouns, sentence-final "да?" in dialogue.
  Written-Russian markers that make dialogue sound read aloud: full subordinate clauses, причастные
  and деепричастные обороты, "который" chains.

### Interface copy in Russian

- Buttons: infinitive verb plus object ("Сохранить изменения," "Добавить счёт"). Not the noun
  ("Сохранение"), not the imperative ("Сохраните").
- Labels: noun phrases, first word capitalised, no period.
- Error messages: "Не удалось сохранить перевод" (impersonal, no blame) rather than "Вы ввели
  неверные данные."
- Address the user as вы, lower case. Avoid "Пожалуйста" on every line.
- Keep back-office terms exactly as the back office uses them, with a plain gloss where needed.

### Slide copy in Russian

- Titles as claims, same rule. Russian titles run longer than English ones; budget for it and cut
  the adjective before the number.
- Bullets: noun phrases or perfective verbs ("Сократили время онбординга с 9 до 4 дней"). Consistent
  aspect and form across the slide.
- Watch for genitive chains in titles; they are the Russian equivalent of "Strategic Alignment
  Initiative Overview."

## German

### Punctuation and formatting

- **Dashes:** the Gedankenstrich (–, en dash with spaces) is standard German for asides and is not a
  tell on its own. Overuse is; apply the same "cluster" judgment as for English em dashes, and
  prefer commas or a new sentence when the aside is long. Never the English em dash (—) without
  spaces.
- **Quotation marks:** „…“ or »…«. Follow the user's existing material.
- **Numbers:** period as thousands separator (12.000), comma as decimal (0,3 %), space before %,
  currency after the number (12.000 CHF). Swiss German usage differs: apostrophe as thousands
  separator (12'000) and often period as decimal. Match the market.
- **Compound nouns:** the model produces long ones freely. Split where a person would
  ("Kundenonboardingprozessoptimierung" → "schnelleres Onboarding für Kunden").

### Flagged vocabulary

*Innovativ, nachhaltig, ganzheitlich, zukunftsweisend, maßgeschneidert, nahtlos, dynamisch,
effizient, umfassend, vielfältig, spannend, wertvoll,* *im Zuge, im Rahmen, im Hinblick auf, in
Bezug auf, vor dem Hintergrund,* *spielt eine zentrale / entscheidende / wichtige Rolle,
unterstreicht die Bedeutung, eröffnet neue Möglichkeiten, hebt auf ein neues Level, treibt voran,
gestaltet, prägt,* *Landschaft* (abstract), *Ökosystem, Synergie, Mehrwert, Potenzial (as an empty
noun), Lösung, Ansatz,* *es ist wichtig zu beachten, es sei darauf hingewiesen, es gilt, es lohnt
sich, ein Blick auf, tauchen wir ein, werfen wir einen Blick,* *nicht nur X, sondern auch Y; es geht
nicht um X, sondern um Y,* *abschließend, zusammenfassend lässt sich sagen, die Zukunft wird zeigen,
wir dürfen gespannt sein.*

### Register

- **Sie / du.** Decide once. Sie for clients and formal documents; du only if the product already
  uses it.
- **Nominalstil** is the German канцелярит: "Die Durchführung der Überprüfung erfolgt durch..." →
  "Wir prüfen..." Verbs over nouns, active over passive, Verbalstil over Nominalstil.
- **Chatbot residue:** "Gerne helfe ich Ihnen weiter," "Das ist eine gute Frage," "Ich hoffe, das
  hilft," "Zögern Sie nicht, mich zu kontaktieren."
- **Spoken markers for dialogue:** Modalpartikeln (doch, mal, ja, eben, halt) used lightly, Ausklammerung,
  shorter clauses, dropped Vorfeld. Written markers that kill dialogue: long Schachtelsätze, Genitiv
  chains, Partizipialkonstruktionen.

## Other languages

For French, Spanish, Italian, Ukrainian, Polish and anything else, run the [method](#method-for-any-language)
above before drafting, and ask the user whether they have existing material in the language to
match. Common cross-language patterns worth checking first:

- The bureaucratic register (langue de bois, burocratese) and its nominalisations.
- The language's version of "not X but Y" and "plays a key role."
- The correct quotation marks, dash, and number formatting for the market (not the language: Swiss
  French and French French differ, as do Argentine and Castilian Spanish).
- The formal/informal address decision, made once.
- The chatbot openers and closers.

## Translation tasks

When the request is to translate:

- **Translate the facts, not the sentences.** A sentence-by-sentence translation carries the source
  language's rhythm and AI tells into the target. Read the paragraph, then write it in the target
  language as a native writer would, then check nothing was lost.
- **The source may already be machine-written.** Do not translate its tells faithfully. If the
  Russian source says "играет ключевую роль в трансформации ландшафта," the English is not "plays a
  key role in transforming the landscape"; it is whatever concrete thing the sentence was hiding.
  If you can't tell what that is, ask.
- **Keep required wording bilingual where it must match.** Legal names, product names, and defined
  terms keep their official translation if one exists; do not invent a new one.
- **Formatting converts.** Quotation marks, number separators, dates, and currency position change
  with the language. A translated text with the source's punctuation is half-translated.
- **Length changes.** Russian and German run 15 to 30 percent longer than English. For slides and
  interface strings, that breaks the layout; flag it or cut.
- **Register transfers, not words.** English "you" can be вы or ты; decide from the audience, not
  the source.

## Exit check for non-English text

In addition to the SKILL.md exit check:

1. Quotation marks, dashes, number and currency formatting in the target language's norm, not
   English?
2. Any dash used as a stylistic aside rather than grammar? Cut. Any grammatical dash replaced with
   a hyphen? Fix.
3. Four or more items from the language's flagged vocabulary in one page?
4. Bureaucratic register (канцелярит / Nominalstil): any nominalised verb chain or genitive stack?
5. Formal/informal address decided once and consistent?
6. Any chatbot residue in the target language?
7. If translated: does it read as written in the target language, or as converted from the source?
8. If translated: did any tell from the source survive?
9. Dialogue: does it use the target language's spoken markers, not English contractions mapped
   literally?
10. Did correcting the register push it toward the local thought-leader style (Telegram-channel
    Russian, LinkedIn-Deutsch)? Plainer, not punchier.
