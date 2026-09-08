# TRMNL Field Note — source notes

Raw material for the TRMNL Field Note described in `PORTFOLIO_BRIEF.md` item 5.

**Why this file exists.** The two plugins live in a different repo
(`~/Documents/1.Projects/src/trmnl-projects`). A session opened only in the
portfolio cannot see them. This file carries across everything the article
needs, so the piece can be revised later without the other repo open.

This is **source material, not prose**. The article is the separate draft at
`src/content/drafts/trmnl-art-plugin.md`.

**Anything in `[brackets]` is unverified — ask Marco, never fill it from
memory.** Same rule as `FIELD_NOTES_DRAFTS.md`.

---

## Where things live

| What | Path (in `trmnl-projects`) |
|---|---|
| Act one, the Met plugin | `art-dashboard/` |
| Act two, the Flatirons plugin | `flatirons/` |
| Why every decision was made | `flatirons/DECISIONS.md` — 14 numbered entries |
| Current state of the plugin | `flatirons/STATUS.md` |
| The twelve pictures | `images/flatirons/*.png` |
| Live | https://flatirons.marcolobato-ux.workers.dev |

Both run as Cloudflare Workers. Nothing is stored anywhere.

---

## The spine: what actually changed between the two

The brief calls this the spine — *"The first was a display. The second has a
point of view about the person looking at it."* Here is what backs that up.

| | Act one — The Met | Act two — Flatirons |
|---|---|---|
| Screen mode | 1-bit, pure black and white | 4-bit, eight greys |
| Where the image comes from | Fetched from a museum API each day | Marco's own photograph, cut into twelve versions ahead of time |
| What decides what you see | The date | The actual position of the sun, plus a weather mood |
| The text | The painting's museum label | A line telling you to go outside |
| Who turns it into dots | TRMNL's `image-dither` class does it on the fly | Baked into the picture ahead of time — act two deliberately opts out of the framework |
| If the internet fails | Nothing to show | Still correct — the screen is computed from the clock |

Two rows are worth more than they look.

**"Who turns it into dots"** (`DECISIONS.md` #6) is the clearest evidence of
having learned the platform. Act one hands the image to TRMNL and lets the
framework dither it. Act two does its own dithering in advance and switches
the framework's off, because running an error-diffusion pass over an already
patterned image beats one pattern against the other. This is the single place
the plugin deliberately refuses the framework, and it is a considered refusal
rather than ignorance of it.

**"If the internet fails"** is the sharpest contrast and the easiest to
under-sell. Act one *needs* a museum to answer. Act two needs nothing but the
time.

---

## Act two: the material, with the design point of each

Ordered by how well each one carries an argument, not by chronology.

### 1. The headline mechanic got cut — `DECISIONS.md` #11

The plugin was designed around a reveal: the picture arrives as twelve tiles
in a 4×3 grid, one uncovered every 75 minutes between 06:00 and 21:00, so the
image completes over a day. That was *the* idea.

It was cut after seeing it on the wall. Over a composed photograph the grid
did not read as anticipation — it read as **a broken image**. Someone
glancing at the panel saw a render fault, not a picture arriving. Fatal for an
object meant to sit on a wall unexplained.

Two things make this the best story in the repo:

- It was solving a problem that no longer existed. The reveal was invented to
  make each day look different. Time-of-day and weather already do that, and
  do it *without spending the image*.
- The mechanic depended on the underlying image being **graphic**. A
  photograph doesn't grant that. The same idea over the Met's flat engravings
  might have worked — which ties act two back to act one.

The code is parked, not deleted (`REVEAL_ENABLED = false`), with the old
template kept verbatim.

### 2. "Golden hour won't wait" — `DECISIONS.md` #13

Reported from the device: the plugin said *golden hour* after dark.

The phase boundaries were fixed clock hours — dusk was 17:00 to 20:30. But
sunset in Boulder swings from about **16:40 in December to 20:30 in June**,
nearly four hours. A fixed window is roughly right for one month a year and
wrong for the rest.

It now computes sunrise and sunset from the sun's actual position for
Boulder's latitude. **No API and no dependency** — the sun's position is a
function of date and place, exactly the kind of thing this plugin already
computes rather than fetches. Checked against reality:

    Dec 21   computed 16:39   actual 16:38
    Jun 21   computed 20:33   actual 20:32
    Aug 25   computed 19:45   actual 19:47

Six phases, all measured against the sun rather than the clock: night,
firstlight, morning, midday, afternoon, golden.

This is the cleanest "delightfully ordinary" example on the site. The device
knows what time the light will go, and nobody had to tell it.

### 3. Dusk rendered as midday — `DECISIONS.md` #12

Reported from the device: a 6:43pm preview looked like noon.

It was not a clock bug — 18:43 resolved correctly. The fault was in the
**tuning**. Dusk sky sat at 67.5% brightness against day's 72.6%. Five points
apart. Invisible on a thumbnail, obvious once measured.

    sky brightness:  dawn 53.3%   day 72.6%   dusk 43.1%   night 14.2%

The insight worth writing: twilight is mostly a *sky* event. The land holds
its warmth longer than the sky holds its light, so the sky drops hard and the
land barely moves. And the numbers had to be **measured, not eyeballed** —
the gap was real but too small to see.

### 4. The photograph beat the procedural version — `DECISIONS.md` #2

There was a generative renderer that drew the Flatirons procedurally. It lost
to Marco's own 2912×1632 photograph. Two reasons: it was asked for
(*"even if generative, I prefer my image of the Flatirons"*), and the
renderer's slabs came out as an evenly spaced sawtooth. The real formation is
irregular.

Good counterweight to a portfolio full of generative work.

### 5. The white band — `DECISIONS.md` #14

Shipped with a bug: a white band down the left of the photo, the picture
sitting off-centre, and 10px of the right-hand edge quietly cut off.

Cause: the template declared its own page wrapper, but TRMNL already supplies
one. Two wrappers, each with 10px of padding, so the art started 20px in on
the left and ran off the right edge.

Two earlier attempts made it worse, because both aimed at the layout box —
which was never at fault. The damage was done two levels above it.

Found by rendering the real markup against TRMNL's real stylesheet and
**measuring**, instead of looking at it. Same lesson as #3: the eye could see
something was wrong and could not see what.

This is the "rough edges included" material the brief asks for.

### 6. The weather is invented — `DECISIONS.md` / `STATUS.md`

Three moods — clear, sunbreak, stormlight — chosen by hashing the date, twice
a day. **There is no weather service.** The picture does not need to be
accurate; it needs each day to have its own character.

Clear is weighted to about half the slots on purpose: *"Storm light is
striking, and striking every day is just the new normal."*

Honest framing, and it makes the "scope it honestly, this is a prototype for
myself" register the brief asks for.

---

## How it works, in one paragraph

Twelve pictures, cut from one photograph: four times of day × three weather
moods. Each is pre-dithered to eight greys and cut to the exact pixel size of
the space TRMNL gives it, so the screen never has to resize it — resizing a
dot pattern turns it to mush. When the device asks what to show, the plugin
works out where the sun is, picks one of the twelve, picks a line of text, and
sends both. Nothing is stored. Ask it the same question tomorrow and you get a
different answer only because the sun moved.

---

## ⚠️ Two claims in the brief that do not match what was built

**1. "Generative AI with no chat interface. A model writes a line telling you
to go outside."**

Not what the code does. The lines are **18 hand-written strings** in six
pools, one pool per sun phase, picked by hashing the date. No model runs at
any point.

The underlying argument still stands if reworded — the system composes a line
for *this* moment without being asked, and it lands on a shelf rather than in
a chat window. But "a model writes a line" is not accurate as written.

**RESOLVED 2026-09-08 — reword the argument.** Marco's call. Drop the "a model
writes it" framing entirely. Argue the accurate and stronger version instead:

> The system composes a line for *this* moment without being asked. No prompt,
> no chat window, no waiting for a response. It arrives on a shelf.

Do not describe the lines as generated. They are written, and chosen.

**2. "Four shades, no motion."**

Neither plugin uses four. Act one is **1-bit** — two shades, pure black and
white. Act two is **4-bit**, and the pictures are quantized to **eight** greys.

The contrast is actually better than the brief remembers: the first plugin had
two shades, the second has eight. `[Confirm which number Marco wants to use.]`

---

## Facts to verify before publishing

- [ ] Is the Flatirons plugin published to the TRMNL store, or private?
      The Met one has a marketplace image (`07-marketplace-chair.png`), so
      `[check whether act two ever shipped publicly]`.
- [ ] Is the device actually running this on a wall or shelf today, and for
      how long?
- [ ] The 2912×1632 photograph — `[when and where was it taken?]` A line about
      the actual walk would earn its place.
- [ ] `[Does Marco still have the procedural renderer output to show?]` A
      side-by-side of the sawtooth version against the photograph would make
      point 4 land visually.

---

## Assets

The brief's Materials table flagged this: **"TRMNL device photos in a real
setting — Needed."** Plus: *"Do not screenshot the render."*

**The hard requirement is now met.** Marco shot the device on a windowsill,
2026-08-31. Two files are in place:

| File | Size | Use |
|---|---|---|
| `public/images/writing/trmnl-art-plugin/08-flatirons-device.jpg` | 395 KB, 1840×1301 | The act-two hero image |
| `public/images/field-notes/trmnl-flatirons-artifact.jpg` | 156 KB, 1080×608 | Candidate Field Note card image |

Both were resized and re-encoded from a 1,836 KB original. The original stays
on Marco's Desktop as `IMG_2820.jpg` — that is the master, do not delete it.

The shot is better than it needed to be: the device is centred and the whole
screen is legible, and **the real Boulder landscape is visible, blurred,
through the window behind the rendered mountains.** Worth a caption that
points at it — the picture on the shelf and the thing it is a picture of, in
one frame. The screen reads *"Get outside, the light's getting good"* —
the afternoon pool — with the date, Monday, August 31, 2026.

### The act-two image set — all in place

From Marco's `~/Desktop/flatiron-plugin/` process folder, 2026-09-08. All in
`public/images/writing/trmnl-art-plugin/`. **996 KB for all six** — less than
one of the site's existing PNGs.

| File | Size | What it shows | Which section it serves |
|---|---|---|---|
| `08-flatirons-device.jpg` | 396 KB, 1840×1301 | The device on the windowsill, real Boulder blurred behind it | Opens act two, or closes the piece |
| `09-procedural-seeds.png` | 124 KB, 1042×746 | Four seeds of the procedural renderer | **#4** — the renderer that lost |
| `10-tone-study.png` | 284 KB, 1226×1162 | 11-panel dither study, 2 to 16 tones | The eight-greys decision |
| `11-zone-mask.png` | 20 KB, 800×480 | Sky/massif/pasture as flat red, green, blue | **#6** — how the weather is faked |
| `12-weather-on-plate.png` | 140 KB, 1042×746 | Weather × hour, four states, each labelled with its ink % | **#6** + the ink budget |
| `13-reveal-ghost.png` | 32 KB, 800×480 | The tile reveal mid-uncover, with a "RUNNING CLUB THU 18:00" card | **#1** — the mechanic that got cut |

Three of these are better than expected:

- **`09-procedural-seeds.png` settles #4 visually.** Four different seeds all
  produce the same evenly spaced sawtooth ridge. You do not need the sentence
  about the real formation being irregular — the picture argues it.
- **`12-weather-on-plate.png` labels night overcast at ink 79%**, the exact
  figure `DECISIONS.md` records as reading "as mud on reflective e-ink." It is
  a *rejected* state, captured. Caption it as one.
- **`13-reveal-ghost.png` carries two parked ideas in one frame** — the tile
  grid *and* the original reminder card the brief specified ("Running club,
  Thursday 6 PM", `DECISIONS.md` #8). It is also the best evidence for why the
  reveal was cut: it genuinely reads as a broken image.

Still wanted:

| Shot | Why |
|---|---|
| The same device at two different times of day | Would carry the whole sun argument in one pair. The strongest remaining gap. |
| A close-up of the dither at a raking angle | Shows the eight greys are *dots*, not grey ink |
| The original photograph the plates were cut from | Source and treatment, side by side |

Act-two images live in the existing `trmnl-art-plugin/` folder, since the two
plugins ship as one article. `[If the slug is ever renamed, seven act-one
images and their references move too.]`

### ⚠️ These five PNGs must stay PNG

The format rule below says photographs ship as `.jpg`. **These are the
exception, and it matters.** They are flat graphics carrying ordered dither —
hard-edged black and white dot patterns. JPEG is built to discard exactly that
kind of high-frequency detail, so re-encoding any of them would smear the dots
into grey mush and destroy the thing they exist to show. They were copied
across untouched, and they are already small.

Related: the article template has **no `image-rendering` rule**, so the browser
smooth-resamples these. Article images render at 920px, so `11-zone-mask.png`
and `13-reveal-ghost.png` (800px native) get upscaled 1.15× and will look
slightly soft. `[Consider adding image-rendering: pixelated for dithered
images — same reasoning as the plugin's own CSS. Not done.]`

### A note on image format for this site

`public/` is served **as-is** — `astro.config.mjs` has no image integration,
so nothing there is optimised at build time. Whatever is committed is what
visitors download.

The site currently ships some very heavy files, all photographs saved as PNG:
`pharm-assist-storyboard.png` is 5,279 KB, `ai-and-design-theory/01-cover.png`
is 3,583 KB. PNG is lossless and right for screenshots, UI and line art. It is
the wrong tool for a photograph.

**Rule going forward: photographs ship as `.jpg`, screenshots and renders stay
`.png`.** Article images render at 920px wide and the lightbox goes to 1200px,
so 1840px wide covers retina properly — the existing 1080px files are actually
under-resolved. `[Worth a separate pass to re-encode the heavy PNGs; not done
yet.]`

---

## Change log

- 2026-09-08 — Created. Distilled from `flatirons/DECISIONS.md` (14 entries)
  and `flatirons/STATUS.md` at commit `5fb3ca2`.
