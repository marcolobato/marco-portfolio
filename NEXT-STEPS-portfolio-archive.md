# NEXT STEPS: Finishing the Portfolio Archive

**Branch:** `portfolio-archive`
**State:** pushed to GitHub. Not merged to `main`. Live site is unchanged.
**Companion doc:** [PRD-portfolio-cms.md](PRD-portfolio-cms.md) has the original architecture and decisions.

This file is the punch list for finishing the archive and merging to `main`. Work through it top to bottom. Each section explains *why* the step matters so a fresh chat (or future-you) can pick it up cold.

---

## 1. Where you left off

**Articles already ported on this branch (3):**
- [src/content/projects/ds-a11y-program.mdx](src/content/projects/ds-a11y-program.mdx) → `/work/ds-a11y-program`
- [src/content/projects/mobile-device-integration.mdx](src/content/projects/mobile-device-integration.mdx) → `/work/mobile-device-integration`
- [src/content/projects/future-of-mobility.mdx](src/content/projects/future-of-mobility.mdx) → `/work/future-of-mobility`

**New shared component built along the way:**
- [src/components/project/ProjectGallery.astro](src/components/project/ProjectGallery.astro) — image carousel for project bodies (used in `mobile-device-integration`).

**Project-page CSS tweaks made along the way (in [src/pages/work/[slug].astro](src/pages/work/[slug].astro)):**
- Added `h4` and `h5` margin rules so section subheadings have breathing room.
- Added `:has()` rule that gives extra space when an `h2` follows a captioned image.

**Decisions locked in this session:**
- Archive articles stay **off the home carousel**. The carousel slides are hardcoded in [src/components/Carousel.astro](src/components/Carousel.astro), so doing nothing keeps them off.
- All archive articles will be **password protected** before merging to `main`.
- A **hidden archive index page** will exist as the only navigation surface for these articles. Direct URL only, no link from the nav or home page.

---

## 2. Port the remaining 3 articles

Same playbook as the three already done.

- [ ] Article 4: ____________
- [ ] Article 5: ____________
- [ ] Article 6: ____________

For each one, in a fresh chat:
1. Drop the source PDF in chat, give the slug, year, and any image notes.
2. Claude creates `src/content/projects/<slug>.mdx`, the `public/projects/<slug>/` folder, and lists image filenames at the spec (1080×608 PNG).
3. You drop in optimized images, preview at `localhost:4321/work/<slug>`, iterate.
4. Commit each article as its own commit on `portfolio-archive`. Push with `git push`.

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

## 4. Build the hidden archive index page

The archive needs **one** discoverable surface so you can share an index URL with anyone who needs it. It must not be linked from the nav, the home page, or the sitemap.

**Suggested URL:** `/work/archive` (lives next to the existing `/work/[slug]` route).

**Files to touch:**
- New: `src/pages/work/archive.astro` — lists every project in the `projects` collection, grouped or sorted however reads best (probably by year, descending). Each row links to `/work/<slug>`.
- Optional but recommended: add `<meta name="robots" content="noindex,nofollow" />` to that page's head and to each locked project page to keep them out of search engines even if the URL leaks.
- Optional: edit `astro.config.mjs` (or wherever the sitemap integration lives) to exclude `/work/archive` and the locked project URLs.

**Decision to make in that chat:** does the index page itself sit behind the password gate, or is it just an unlisted URL?

---

## 5. Lock the archive articles

Once the gate component works, flip the switch on each archive `.mdx`:

- [ ] `ds-a11y-program.mdx` → `locked: true`
- [ ] `mobile-device-integration.mdx` → `locked: true`
- [ ] `future-of-mobility.mdx` → `locked: true`
- [ ] Article 4 → `locked: true`
- [ ] Article 5 → `locked: true`
- [ ] Article 6 → `locked: true`

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
