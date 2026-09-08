# Portfolio brief: marcolobato.info

Living document. Drop in the repo root. Claude Code reads this at the start of every session.

---

## Positioning

Marco Lobato, staff-level product designer, 12 years.

**The claim:** helps people adopt new technology, especially where reliability is non-negotiable.
**Not the claim:** accessibility specialist, multimodal input specialist. Those are the evidence.

Live targets are wellness and consumer companies plus AI labs. The nearest one names design system
ownership across product, brand, and marketing as a core responsibility.

## Guardrails (apply to every change)

- No em dashes anywhere. Hard rule.
- Never invent or approximate a metric. If a number is not sourced, cut it.
- Keep "delightfully ordinary". It is the throughline and it works.
- Short declarative sentences. No corporate abstraction.
- Edit existing markup. Do not regenerate sections from scratch.
- One item per branch. One branch per session.

## Source of truth

Code is the source of truth. Figma is documentation.

- Change a component's variants, props, or tokens: update `/playground` in the same branch.
- Change a page layout or section structure: batch the Figma update at a milestone, not per commit.
- Never try to sync both directions. That is how the afternoon disappears.

---

## The session loop

Aim for 30 to 45 minutes. One item. Ship it.

1. `git checkout main && git pull && git checkout -b <item-slug>`
2. Tell Claude Code to read this brief and the current markup for the section in question, before
   proposing anything.
3. Make the change. Review in the browser.
4. If a component changed, update `/playground`.
5. Commit, merge, deploy.
6. Log one line in the Change log at the bottom of this file.

**Trigger rule:** every application or interview generates exactly one portfolio item. Thistle
generated the design systems card. Whatever comes next generates the next one. This is how the
site improves without a separate portfolio project competing with the job search.

---

## Backlog, in priority order

### 1. Reframe the Selected Work intro

Current headline: "Multimodal Interaction: Beyond the Touchscreen"

The thesis already exists on the page, at the bottom of the section:

> "My experience is helping people adapt, evolve, and adopt, especially when reliability is
> non-negotiable."

Promote it to the headline. The three supporting bullets stay but reframe what they are evidence of:

- Learnable from first interaction becomes: how people are taught a faster path at the moment it helps
- Automated actions stay visible becomes: how people come to trust a system acting for them
- New inputs are additive becomes: how new capability lands inside an existing mental model

Do NOT rename the three cards. "Learnable Efficiency", "Additive Input", and "Supervision
Patterns" are working.

Cost: copy only. Highest value, lowest risk. Do this first.

### 2. Field Note: designing with coaches

Draft is in `FIELD_NOTES_DRAFTS.md`. No artifacts required, no confidentiality problem. This is
the Motus story in publishable form and it serves every wellness target at once.

### 3. Field Note: PAIR feedback and controls

Draft is in `FIELD_NOTES_DRAFTS.md`. Two existing slides with animations. Frame around authoring
principles and documentation others apply, not around the animations themselves. This is the same
claim as the date picker consolidation. Place them near each other.

### 4. Add a design systems card to Selected Work

The gap. `/playground` is currently a footer link only.

Anchor: date picker consolidation, 73 variants down to 1.

Open questions to resolve before building:
- Existing cards carry channel tags (voice, screen, gesture, camera, gaze). A systems card has no
  channel. Different tag treatment, or break the pattern deliberately?
- Inside Selected Work, or its own short section beneath it?
- Does `/playground` become the case detail or stay separate?

### 5. Field Note: TRMNL plugin

E-ink Boulder Flatirons plugin. Field Note, not a new Prototyping section. One item under a new
heading looks thin, and "rough edges included" is the right register.

The argument: four shades, no motion, no interaction, refresh in minutes. Everything else on the
site is dynamic and multimodal. This is the opposite, which is why it is worth publishing.

Second argument: generative AI with no chat interface. A model writes a line telling you to go
outside and it lands on a physical object on a shelf. That is "delightfully ordinary" made literal.

The Met version to Flatirons version progression is the spine. The first was a display. The second
has a point of view about the person looking at it.

Assets: photograph the physical device in a real setting. Do not screenshot the render.

Scope honestly. A plugin prototype built for yourself. That framing is more charming than inflating it.

### 6. Raise Field Notes

AI Speedbumps and the broken-in denim piece are the most differentiated things on the site and they
sit last. Consider a pointer from higher up, or moving the section above More Projects.

---

## Materials

| Item | For | Status |
|---|---|---|
| Date picker consolidation: before/after visuals, the 73 count, what it unblocked, who adopted it | Item 4 | Needed |
| PAIR Guidebook feedback and controls slides | Item 3 | Have |
| TRMNL device photos in a real setting | Item 5 | Needed |
| Pixel Magnifier 45% battery figure | Existing case study | Unsourced. Source or cut. |
| Resume Drive link | Everything | Verify public in a private window |

---

## Research backing the coaches Field Note

Use these to keep the piece defensible. Cite loosely in prose, do not turn it into a lit review.

**Monitoring works, and the effect is quantified.** Harkin et al. 2016, Psychological Bulletin,
142(2), 198-229. Meta-analysis of 138 experimental studies, N = 19,951. Progress monitoring raised
goal attainment at d+ = 0.40. Effects were larger when the information was physically recorded and
when outcomes were reported or made public.

**Adherence to self-monitoring collapses.** In mobile dietary self-monitoring studies, fewer than
half the sample was still tracking after week 10, across every method tested. Initial adherence is
driven by novelty and tailored feedback and fades as perceived benefit drops.

**The plateau is a calibration problem, not a motivation problem.** Untrained women given free
choice did not self-select an intensity sufficient to stimulate meaningful strength or hypertrophy
gains, and lifted lighter with lower perceived exertion than under a prescribed protocol (Focht,
J Strength Cond Res, 2007). A scoping review found self-selected loads averaged around 53% of 1RM,
which may be too light for optimal strength development.

**Do not claim a three-week trigger.** No support found for a fixed calendar interval. Progression
in the literature is autoregulated off performance. Say "progress when the signal says so."

---

## Change log

Append one line per merged item. Date, branch, what changed.


2026-09-08 | reframe-selected-work-intro | Item 1 done. Promoted the adoption claim to the Selected
Work headline, reframed the three bullets from design properties to how adoption happens, added a
sentence naming new technology as the channel rather than the claim, and changed the prescriptive
"Adoption comes down to three things" to the experiential "Three things I have seen make that
happen". Added text-wrap: balance to .area-heading so long headlines break evenly.

2026-09-08 | design-systems-card | Item 4 done. Added a fourth WorkCard, Accessible Date Picker,
Material Design, linking to the locked ds-a11y-program case study. Added an optional href prop to
WorkCard so the back of a card can link out, plus keyboard/screen reader/switch channel types sharing
one token colour. Fixed the channel strip clipping long labels (now wraps). Unified the whole
Selected Work section for four projects: added the systems layer to the intro, a fourth bullet about
shared patterns, and updated every "three projects" count. NOTE: the brief's "73 variants down to 1"
is not what the case study says. The sourced figure is 34 of 73 pickers adopted it, and it is
deliberately NOT published on the card.

2026-09-08 | tighten-selected-work | Skimmability pass. Deleted the closing paragraph after the
cards (47 words): it stacked three transitions, made an unsourced LLM claim, and duplicated both the
bridge paragraph and the More Projects intro below it. Halved the four bullets, which were restating
the four card pattern labels in prose. Section went from 287 words to 204. Still open for a design
pass: .work-desc is 72ch while the rest of the site is 65ch, bolding the bullet ledes, and making
the card flip affordance clearer than 12px "Tap for details".

2026-09-08 | measure-65ch | Narrowed the homepage prose measure from 72ch to 65ch. NOTE: 72ch was
the homepage convention across four rules (.work-desc, .work-desc-list, .expertise-desc, .now-text),
not a Selected Work anomaly, so all four changed together. Changing one alone would have made that
section wrap differently from its neighbours. Selected Work now matches the 65ch used for article
prose site-wide.

2026-09-08 | bold-bullet-ledes | Restructured the four bullets to front-load the distinctive phrase
and bolded it, giving a skimmer four anchors instead of four sentences. Bolding the original openings
would have emphasised "People", which started three of four. Also reworded "the same intent model" on
the Camera Switch card: intent model is a term of art in NLU and read as an AI model on this page.
Grepped the rest of the site for the same trap. "Mental model" reads fine because "mental"
disambiguates, and every other hit means a device, business, or 3D model.

2026-09-08 | flip-affordance-copy | Card hints now read "Flip for details" and "Flip back", replacing
"Tap for details" and "Tap to return". "Tap" is wrong on desktop, where portfolios actually get
reviewed, and "details" implied navigation when the card rotates in place. "Flip" is device-neutral
and names the real mechanic. NOTE: this is the copy half only. The card still does not LOOK turnable
before you read 12px of text. A visual cue is still open.

STYLE NOTE for future copy: Marco's preferred voice is plain declarative sentences with a human
subject. "People trust automation they can watch", not "Automation you can watch, so people can trust
it." Complete clauses, one idea per breath, verbs carrying the meaning. Do not convert his sentences
into bolded noun-phrase labels. A reverted attempt is in git history at fb2ed5a.

2026-09-08 | card-flip-affordance | Reworked the WorkCard interaction model after a /design-critique.
Both controls now sit together top-right, magnifier then rotate glyph, with flip rightmost so it
stays put when the card turns and the magnifier disappears. Removed the back face's expand button:
the lightbox only renders the thumbnail plus a one-line caption, which is LESS than the case detail
already on that face, so "expand" returned less than it promised. Replaced the navigation chevron
with a rotate glyph and the fullscreen glyph with a magnifier-and-plus, since the thumbnail is
object-fit: contain and the old icon had no clear referent. Deleted the "Flip for details" and "Flip
back" hint text: an interaction that needs a sentence to explain it is under-designed, and the glyph
is visible at rest so it works on touch. Tooltips and aria-labels cover the gap.

A11y fixes in the same pass: the card was a <div> with a click handler and could not be operated by
keyboard AT ALL. Real <button>s now, with a focus ring. The ring uses box-shadow, NOT outline,
because these buttons sit inside a preserve-3d context where each face composites as its own layer
and outlines fail to paint. The dark-mode ring lives in global.css at (0,4,x) specificity because the
dark override for .work-card__btn sets box-shadow and a scoped rule cannot beat it. Whichever face is
turned away is now marked inert so nobody tabs into invisible controls.

Back-face typography: was four sizes including two raw values (1.05rem, 1.15rem) that existed nowhere
in the type scale. Now three sizes, all tokens. The Outcome block was styled as a metric display but
the content is sentences, so the 18.4px-to-12px jump landed mid-sentence. Value and description are
now one size, stacked one per line, distinguished by weight only, both at full foreground contrast
per Marco's call.

/playground updated in the same branch as the brief requires: href row, new channel types, a variants
demo using assistive channels and href, corrected usage notes, and href in the code sample.

STILL OPEN: the lightbox has no focus trap. Opening it leaves focus on the card behind, so a keyboard
user cannot reach the close button and is stranded. Next branch.

2026-09-08 | uniform-stat-type | Outcome stats now render as one plain sentence: same size, same
weight, same colour. Dropped the medium-weight lede. The content is sentences, not metrics, so
emphasising half of each one was styling the content never asked for, and the "Outcome" label already
does the hierarchy work. Also fixed a real bug Marco spotted: a ::after non-breaking space was
stacking on top of the template's own inter-element whitespace, rendering a visible DOUBLE space.
Removed the ::after, since the newline between the two divs already collapses to one space when they
are inline and it survives the production build (verified in dist). Three CSS rules collapsed to one.
