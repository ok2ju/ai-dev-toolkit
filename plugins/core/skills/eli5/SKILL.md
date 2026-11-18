---
name: eli5
description: Explain any topic as if to a five-year-old, as one HTML page of big hand-drawn pictures and very few words. Use when the user says "eli5", "explain like I'm five", "explain it simply", "I know nothing about X", or asks for a picture explanation of a topic.
argument-hint: "What topic should be explained?"
---

Explain the topic in `$ARGUMENTS` to someone who knows **nothing** about it. Treat the reader as a curious five-year-old: smart, but with no vocabulary for the subject. The output is one HTML page where the **pictures carry the meaning** and the words only label them.

If no topic is given, ask for one. Ask nothing else; pick sensible defaults.

## 1. Find the one idea

Before drawing anything, answer for yourself:

- **What is it, in one sentence a child would follow?** No term from the topic itself in that sentence.
- **Which everyday thing works the same way?** Toys, food, kitchen, playground, post office, a road with cars, a box with things in it. One main analogy, reused through the whole page. Do not switch analogies halfway.
- **Is the analogy true where it matters?** Simple is fine; wrong is not. If the analogy implies something false about the core mechanism, pick another one. Leave out detail; never invent it.

## 2. Plan the panels

4 to 7 panels, one idea each, in this order:

1. **What is it** — the analogy, drawn. The topic's name appears once, as a label on the picture.
2. **How it works** — 2 to 4 panels, one step each. Show cause and effect with arrows, motion, or before/after.
3. **Why it matters** — what would go wrong, or what we could not do, without it.
4. **Remember** — one picture and one short sentence that sums up the page.

Cut any panel that does not teach something new. Fewer panels beat more.

## 3. Words

- At most **12 words per panel**, counting the caption and all labels in the picture.
- Short everyday words. One idea per sentence. Present tense.
- No jargon. When a real term must appear, put it on the picture of the thing it names, so the picture defines it.
- Same word for the same thing on every panel.
- Write in the user's language.

## 4. Pictures

- Draw each picture as **inline SVG**, by hand. No external images, no icon fonts, no emoji as the main picture.
- **Big**: each picture takes most of the panel width, at least half the screen height on a laptop.
- Simple flat shapes, thick outlines, a few bright colors. Friendly faces on characters are welcome.
- Keep the visual language consistent: the same thing has the same shape and color in every panel.
- Show change and movement: arrows, dashed paths, numbered steps, before/after side by side.
- Every SVG gets a `<title>` and `role="img"` with an `aria-label` that says what the picture shows, so the page works for screen readers too.

## 5. Page

- One self-contained `.html` file. All CSS inline; no external scripts, fonts, or images.
- One panel per screen-high section, scrolled top to bottom. Large type: caption text at least `2rem`.
- Works on a phone: pictures scale with `width: 100%`, no horizontal scroll.
- Light and dark mode via `prefers-color-scheme`, with an explicit page background.
- `<title>`: the topic name, two to four words.

## 6. Deliver

- If an Artifact tool is available, publish the page with it and follow that tool's own rules (it may ask you to load a design skill first). Give the user the link.
- Otherwise, write the file to the scratchpad directory (or the current directory if there is none) and give the user its full absolute path to open in a browser.

Reply in one or two lines: the link or path, and the analogy used. Do not repeat the page in chat.

If the user asks a follow-up ("what about X?", "go deeper"), add panels to the same page and republish it, in the same style and with the same analogy.
