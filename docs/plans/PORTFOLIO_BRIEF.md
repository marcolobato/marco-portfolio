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
