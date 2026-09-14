# Evidence base

Why the calibration targets in SKILL.md are what they are, and where the popular advice is wrong.
Read this when the user questions a rule, when two rules seem to conflict, or when deciding how hard
to push a correction.

## The measured differences

**Lexical richness is the one signal that generalizes.** A 2026 study from the University of
Stuttgart (El Attar et al., arXiv:2606.04177) tested 284 interpretable linguistic features across
27 models and ten text domains under cross-model and cross-domain conditions. Most previously
proposed indicators turned out to be strongly context-dependent. Measures of lexical richness were
the exception, holding across model families and text types. Removing them from the classifier
caused the largest single performance drop of any feature group.

The direction is counterintuitive and matters for editing. AI text carries the *higher* type-token
ratio and the higher lexical density: a concentrated but less varied vocabulary. Human texts are
longer and repeat words naturally; AI continuations are shorter. Words appearing exactly once are
more common in human writing, but they come from concrete detail rather than from synonym
substitution.

**Consequences for editing:**
- Repeating a noun is correct, not lazy. Synonym cycling is the tell.
- Function words are load-bearing. Stripping them raises lexical density toward the AI range.
- New rare words should come from specifics (names, numbers, places), not from a thesaurus.

**Emotion is compressed toward neutral.** The same study's qualitative analysis of restaurant
reviews found human text carried higher anger and disgust intensity and more low-valence tokens,
while AI versions drifted toward elevated valence and produced no anger signal at all, even when
describing the same negative experience. A 2025 study on 483,360 essays put numbers on the range:
human sentiment polarity spanned −0.625 to +0.817, AI only −0.376 to +0.70.

Consequence: do not soften negatives, and do not append a consoling clause after a complaint.

**AI text is harder to read, not easier.** The same essay corpus: AI averaged Gunning Fog 11.54
versus 10.24 for humans, and Flesch Reading Ease 53.6 versus 69.69. AI texts were also shorter
(345 words versus 422) and used fewer punctuation marks (46 versus 49, with a much lower maximum).
A separate finding in that literature: AI essays contained no grammatical errors at all, unlike the
human ones.

Consequence: simplify. Complexity reads as machine-generated, not as competent. And human
punctuation carries emotion and emphasis; AI punctuation follows a template.

**Predictability and burstiness.** Zero-shot detectors work because humans choose more surprising
continuations than a model does. Burstiness, meaning variability in sentence complexity and word
choice, is consistently higher in human writing; AI writes at a stable, even level.

**Late-stage flattening.** A 2026 analysis of over 120,000 samples found that AI text stabilizes as
generation proceeds: log-probability volatility drops 24 to 32 percent in the second half of a
sequence, while human writing stays variable throughout.

Consequence: check the back half of anything long. If it reads smoother and safer than the opening,
it's the machine settling in.

**What makes text belong to a person.** Forensic authorship work identifies individuals by phrasal
verbs, modal verbs, punctuation habits, rare words, affixes, quantity expressions, humor, sarcasm,
typos, and misspellings. When an LLM is prompted to reason with these features explicitly, its
authorship-attribution accuracy jumps sharply, from roughly 37% to 84% weighted F1 in one blog
corpus test. Humor, sarcasm, and colloquialism dominate the features it relies on.

Consequence: voice is not decoration. It is the thing that makes a text attributable to a person.

## Where the popular advice is wrong

**Em dashes.** The panic is overstated. Em dashes are a marker of edited, formal English, which is
why models produce them. On its own the em dash is weak evidence, and a wave of false accusations
has followed from treating it as proof. The rule in this skill is a hard ban anyway, for a different
reason: it costs nothing, and in client-facing and public writing the *social* cost of triggering
someone's em-dash heuristic is real even when the heuristic is bad.

**"Cut everything" compression.** The stop-slop approach, kill all adverbs, demand a human subject
in every sentence, compress hard, fixes slop but pushes the text toward high lexical density and
short uniform sentences. Both of those move it *toward* the measured AI profile. Note that stop-slop's
own example rewrites ("Move faster. Your competition is.") are exactly what humanizer's pattern 31
flags as manufactured staccato. Resolve the conflict in favour of the measurements: cut the slop,
keep the connective tissue, and let sentences run long when they want to.

**Detectors are not the target.** Detection accuracy collapses on short texts, which lack the
stylistic signal, and false positives are common, in one evaluation of commercial tools, several
human-written control passages were flagged as likely AI. Detectors also over-flag non-native English
writers. Writing to beat a detector is a bad objective; writing something a person would want to
read is the achievable one, and it happens to produce the same edits.

**Isolated markers mean nothing.** Clusters are the signal. A single "moreover," one curly quote,
one short punchy sentence, or clean grammar prove nothing on their own. Over-correcting on isolated
markers destroys real writing, which is why SKILL.md carries an explicit false-positive list.

## Sources

- El Attar, Dönmez, Maurer & Falenska (2026). *A Systematic Analysis of Linguistic Features in
  AI-Generated Text Detection Across Domains and Models.* arXiv:2606.04177.
- Rujeedawa, Pudaruth & Malele (2025). *Unmasking AI-Generated Texts Using Linguistic and Stylistic
  Features.* IJACSA 16(3).
- Stachura (2025). *Perplexity-Driven Contrastive Scoring for Unsupervised Detection of
  AI-Generated Texts in Polish.* PolEval 2025.
- Huang, Chen & Shu (2024). *Can Large Language Models Identify Authorship?* Findings of EMNLP 2024.
- Sun, Bao, Cui & Zhang (2026). *When AI Settles Down: Late-Stage Stability as a Signature of
  AI-Generated Text Detection.* arXiv:2601.04833.
- Malviya et al. (2025). *SKDU at De-Factify 4.0: Natural Language Features for AI-Generated
  Text-Detection.* arXiv:2503.22338.
- Fu & Yang (2025). *Linguistic Markers of AI-Generated Text: A Comparative Analysis of
  Machine-Identified and Human-Inferred Predictors.* AMCIS 2025 TREOs.
- *Wikipedia:Signs of AI writing*, WikiProject AI Cleanup.
