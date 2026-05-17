# NEXT STEPS: Finishing the Portfolio Archive

**Branch:** `portfolio-archive`
**State:** pushed to GitHub. Not merged to `main`. Live site is unchanged.
**Companion doc:** [PRD-portfolio-cms.md](PRD-portfolio-cms.md) has the original architecture and decisions.

This file is the punch list for finishing the archive and merging to `main`. Work through it top to bottom. Each section explains *why* the step matters so a fresh chat (or future-you) can pick it up cold.

---

## 1. Where you left off

**Articles already ported on this branch (6 — all done):**
- [src/content/projects/ds-a11y-program.mdx](src/content/projects/ds-a11y-program.mdx) → `/work/ds-a11y-program`
- [src/content/projects/mobile-device-integration.mdx](src/content/projects/mobile-device-integration.mdx) → `/work/mobile-device-integration`
- [src/content/projects/future-of-mobility.mdx](src/content/projects/future-of-mobility.mdx) → `/work/future-of-mobility`
- [src/content/projects/digital-auto-services.mdx](src/content/projects/digital-auto-services.mdx) → `/work/digital-auto-services`
- [src/content/projects/mobility-agent.mdx](src/content/projects/mobility-agent.mdx) → `/work/mobility-agent`
- [src/content/projects/vw-meets-alexa.mdx](src/content/projects/vw-meets-alexa.mdx) → `/work/vw-meets-alexa`

**New shared components built along the way:**
- [src/components/project/ProjectGallery.astro](src/components/project/ProjectGallery.astro) — image carousel for project bodies (used in `mobile-device-integration`, `digital-auto-services`).
- [src/components/project/FeatureRow.astro](src/components/project/FeatureRow.astro) — 1/3 + 2/3 row layout for "feature spotlight" sections (used in `vw-meets-alexa`).

**Project-page CSS / template tweaks made along the way (in [src/pages/work/[slug].astro](src/pages/work/[slug].astro)):**
- Added `h4` and `h5` margin rules so section subheadings have breathing room.
- Added `:has()` rule that gives extra space when an `h2` follows a captioned image.
- Outcome descriptions now render via `<Fragment set:html={item.description} />` so they can contain inline links and emphasis (used by the `vw-meets-alexa` press outcome).

**Decisions locked in this session:**
- Archive articles stay **off the home carousel**. The carousel slides are hardcoded in [src/components/Carousel.astro](src/components/Carousel.astro), so doing nothing keeps them off.
- All archive articles will be **password protected** before merging to `main`.
- A **hidden archive index page** will exist as the only navigation surface for these articles. Direct URL only, no link from the nav or home page.

---

## 2. Port the remaining 3 articles ✅

All six archive articles are ported and pushed. Closing this section as done.

- [x] Article 4: Digital Automotive Services → [src/content/projects/digital-auto-services.mdx](src/content/projects/digital-auto-services.mdx)
- [x] Article 5: Volkswagen Mobility Agent → [src/content/projects/mobility-agent.mdx](src/content/projects/mobility-agent.mdx)
- [x] Article 6: Volkswagen meets Alexa → [src/content/projects/vw-meets-alexa.mdx](src/content/projects/vw-meets-alexa.mdx)

---

## 3. Build the PasswordGate component

This is the gate that hides article content until a visitor enters the right password. The schema already accepts `locked: true` on every project; right now nothing reads it.

**Why now and not earlier:** the cleanest moment to build it is when all six articles exist and we know the password story is the same for all of them. Building it once and applying it everywhere is faster than retrofitting.

**Decision still open from the original PRD:** one shared password for all archive articles, or one password per article? The PRD leans per-project. Discuss in the chat that builds this.

**Files to touch:**
- New: `src/components/project/PasswordGate.astro` — Alpine.js, `sessionStorage`, password hash compared client-side.
- Modify: [src/pages/work/[slug].astro](src/pages/work/[slug].astro) — wrap `<Content />` so when `data.locked === true`, the body and outcomes render inside `<PasswordGate>`. Hero, overview, and contributions probably stay visible above the gate (this is a design call to make in that chat).
- Modify: build config or env file — store the password hash in an env var at build time, not in the `.mdx` file. The PRD calls this out for security.

**Acceptance criteria:**
- [ ] Visiting a locked project shows a password prompt instead of content.
- [ ] Entering the correct password reveals the content and stores the unlock in `sessionStorage` so refresh works.
- [ ] Wrong password shows a clear, polite error.
- [ ] Public projects (e.g. Voice Access, Lookout, Magnifier) are unaffected.

---

## 4. Build the portfolio index page — PRD

### Purpose

A single shareable surface that lists the portfolio's projects in one place. Acts as a "table of contents" for anyone who needs to browse beyond what's featured on the home page. Lives at a hidden URL — never linked from nav, home, or footer — but discoverable to anyone you send the link to.

### URL

`/work/archive` (sits next to the existing `/work/[slug]` route).

### Scope: which projects show up?

Decide in the chat that builds this:

- **A) Archive only** — the six older projects ported on this branch, plus any future archive additions.
- **B) Everything (archive + public)** — one comprehensive index of all nine project pages.
- **C) Both, sectioned** — public projects in one section, archive in another, on the same page.

**Default if undecided: A.** Keeps the home page's narrative intact and reserves the index as an archive-specific surface.

### Page content

For each project row:
- **Title** — linked to `/work/<slug>`
- **Year** — right-aligned, muted
- **One-line description** — pulled from the `brand` field (already exists on every project)
- **Lock indicator** — small icon next to locked projects so visitors know a password gate is coming

### Layout & visual treatment

- **Vertical stacked list**, not a card grid. The archive is a reference document, not a marketing surface. Lists read faster and align with the "broken-in denim" tone in [CLAUDE.md](CLAUDE.md).
- **Grouped by year, descending** with a soft year heading per group. Years over categories — the `card.category` values are heterogeneous and would create odd singleton groups.
- **Reuse existing tokens and type scale.** No new visual primitives. Page header uses the same heading treatment as other interior pages.

### Sort & grouping

- Primary: **year, descending** (newest first).
- Within a year: **alphabetical by title.**

### Visibility & SEO

- Add `<meta name="robots" content="noindex,nofollow" />` to the index page's `<head>`.
- Add the same meta to **each locked project page** so leaked URLs don't get indexed.
- If a sitemap integration exists, exclude `/work/archive` and all locked project URLs.

### Auth: gate the index too?

- **A) Index unlisted but ungated** — anyone with the URL sees titles and clicks through; each locked project then prompts for its password.
- **B) Index sits behind the same PasswordGate** — must unlock once to see the list at all.

**Default if undecided: A.** Titles and one-line descriptions are low-sensitivity. Gating the index would add an extra step to the one surface you're most likely to share.

### Files to touch

- **New:** `src/pages/work/archive.astro` — reads the `projects` collection, groups by year, renders the list.
- **Modify:** [src/pages/work/[slug].astro](src/pages/work/[slug].astro) — conditionally render `<meta name="robots" content="noindex,nofollow" />` when `data.locked === true`.
- **Optional:** edit `astro.config.mjs` (or sitemap integration) to exclude `/work/archive` and locked project URLs from the sitemap.

### Acceptance criteria

- [ ] Visiting `/work/archive` shows all in-scope projects grouped by year.
- [ ] Each title links to the correct project page.
- [ ] Locked projects render with a visible lock indicator.
- [ ] The page is not reachable from any other surface (nav, home, footer, sitemap).
- [ ] View-source confirms `noindex,nofollow` on the index page and on all locked project pages.

---

## 5. Lock the archive articles

Once the gate component works, flip the switch on each archive `.mdx`:

- [ ] `ds-a11y-program.mdx` → `locked: true`
- [ ] `mobile-device-integration.mdx` → `locked: true`
- [ ] `future-of-mobility.mdx` → `locked: true`
- [ ] `digital-auto-services.mdx` → `locked: true`
- [ ] `mobility-agent.mdx` → `locked: true`
- [ ] `vw-meets-alexa.mdx` → `locked: true`

Public projects (Voice Access, Lookout, Magnifier) keep `locked: false` (or omit the field).

---

## 6. Final sweep before merging

- [ ] Walk every archive URL on desktop and mobile. Make sure the gate appears and unlocks cleanly.
- [ ] Walk the three public project URLs. Make sure they did not pick up any password gate by accident.
- [ ] Walk the home page. Confirm the carousel still shows the original three slides only, with no archive items leaking in.
- [ ] Click through the hidden archive index URL. Confirm every link works and the page is not linked from anywhere else.
- [ ] Run `npm run build` locally. If it succeeds with no warnings, the production build is good.
- [ ] Optional: in Cloudflare Pages dashboard, disable preview deploys for non-`main` branches so future archive work does not get a public preview URL. (One-time setting.)

---

## 7. Merge and clean up

- [ ] Open a PR from `portfolio-archive` → `main` on GitHub. Title: "Add portfolio archive with password protection." Body: short summary of the 6 articles, the new PasswordGate component, and the hidden index URL.
- [ ] Review the diff one more time. Confirm no `locked: false` slipped in by accident on archive articles.
- [ ] Merge the PR.
- [ ] Pull `main` locally. Delete the local `portfolio-archive` branch and the remote one.
- [ ] Verify the live site at marcolobato.info: public projects look unchanged, archive URLs prompt for password, archive index URL works.

---

## 8. Then (and only then) cancel Framer

Once the live site has the archive working, you can stop paying for the Framer site without losing access to those projects. The whole point.

- [ ] Export anything from Framer that did not make it into the ported articles (raw assets, unused images).
- [ ] Cancel Framer subscription.
- [ ] Update any external links pointing at `lobato.framer.website` to point at the new `/work/<slug>` URLs.

---

## 9. Polish pass

Small things noticed while porting, deferred so they do not block the merge.

- [ ] **Add poster images for the two videos in [digital-auto-services.mdx](src/content/projects/digital-auto-services.mdx).** Both `<video>` tags currently show a black frame until the user hits play. Export a still from each video at the same dimensions and add `poster="/projects/digital-auto-services/<filename>.png"` to the `<video>` tag.
- [ ] **Fix the gallery top band in light mode** for the 3-slide `ProjectGallery` in the Design section of `digital-auto-services.mdx`. A thin white band shows above the image in light mode only. Dark mode renders cleanly. Already tried: matching `aspectRatio` on the `<img>` to the image (1080/705), then moving `aspect-ratio` to the `.carousel-slide` wrapper with the image filling via `object-fit` and `height: 100%`. Band still present in light mode after re-cropping the source PNGs. Likely a `--color-white` token mismatch or a stretching issue with `.carousel-viewport` vs `.carousel-slide` background. See [src/components/project/ProjectGallery.astro](src/components/project/ProjectGallery.astro) and `src/styles/global.css` section 16.
