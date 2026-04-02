# PRD: Portfolio CMS — Migrating Projects from Framer to marcolobato.info

**Status:** Draft
**Author:** Marco Lobato
**Date:** April 2026
**Goal:** Replace the Framer portfolio with self-hosted project pages on this Astro site, without adding a CMS subscription, a separate directory page, or any new infrastructure.

---

## 1. The Problem

The portfolio currently lives at `lobato.framer.website` and is linked from this site's hero section. This creates two problems:

1. **Fragmentation.** Visitors land on this site, then get bounced to Framer. There is no continuity of design, voice, or navigation.
2. **Cost and ownership.** Framer charges to keep projects live. The content, layout, and assets are locked inside Framer's editor — you do not own them the way you own a file.

The goal is to bring those ~10 project pages onto this site, make them maintainable without editing layout code every time, and connect them naturally to the home page sections that already exist.

---

## 2. What "CMS" Means Here

A CMS (Content Management System) is just a way to separate content (the words, images, and data) from layout (the HTML and CSS that structures the page).

On a site like this — 10 static projects, one author, no publishing workflow — a full CMS (Contentful, Sanity, Decap, etc.) would add login screens, API keys, external dependencies, and infrastructure you do not need.

**The right CMS for this site is the file system itself**, using a feature Astro already has built in: **Content Collections**.

You already use this for the Writing section. Every `.md` file in `src/content/writing/` is a "post" in the CMS. You edit the file, save, and the site updates. The same exact pattern — extended — is the answer for projects.

---

## 3. Recommended Architecture

### 3a. The Content Model (your "table")

Each project will be a single `.mdx` file in `src/content/projects/`. The top of the file — called **frontmatter** — is where all structured/repeatable data lives. Think of it as a form you fill out per project. The body of the file — Markdown with optional components — holds the narrative sections.

Here is what one project file would look like:

```yaml
---
# Hero
title: "User Onboarding: Setting Up Android Your Way"
subtitle: "How do you design an experience people trust before they trust the phone?"
heroImage: "/projects/android-onboarding/hero.png"
appLink: "https://..."
year: 2022
client: "Google"
slug: "android-onboarding"

# Overview
overview:
  what: "A complete redesign of the Android setup flow."
  objective: "Make the out-of-box experience feel personal, not procedural."
  differentiator: "First Android setup that adapts to the user's prior device and accessibility needs."

# Contributions — this is the accordion table
contributions:
  - label: "Strategy"
    content: "Defined the product vision with the PM team. Mapped the full setup journey across 14 device states and 3 user archetypes."
  - label: "Research"
    content: "Conducted 8 contextual inquiry sessions. Synthesized 200+ data points into 4 key insight themes."
  - label: "Interaction Design"
    content: "Designed 60+ screens across setup, recovery, and edge cases. Ran 3 rounds of usability testing."
  - label: "Documentation"
    content: "Authored the design spec and handoff package used by 3 engineering teams across 2 time zones."

# Outcomes — the 4 key metrics
outcomes:
  - metric: "23%"
    label: "drop in setup abandonment"
  - metric: "4.6★"
    label: "average App Store rating for setup flow"
  - metric: "2.1M"
    label: "users in first 3 months"
  - metric: "8 min"
    label: "average time to complete setup (down from 14)"

# Home page card — what shows in the carousel and featured cards
card:
  category: "User-Centric 0 to 1 Product Design"
  thumbnail: "/carousel/slide-1.png"
  featured: true   # if true, appears in the "Beyond the Touchscreen" featured cards
---
```

Then the MDX body holds the narrative — free-form writing with optional components dropped in:

```mdx
import Quote from '../../components/project/Quote.astro';
import UserJourney from '../../components/project/UserJourney.astro';

<Quote
  text="I've never set up a new phone and actually felt like it knew me."
  attribution="Participant 04, Contextual Inquiry Study"
/>

## The Problem and Context

The Android setup flow had not been substantially redesigned in four years...

## Key Insights

...
```

---

### 3b. Why MDX, not pure YAML?

The structured/repeatable data (contributions, metrics, hero fields) lives in frontmatter YAML because it is always the same shape — you fill in the same fields for each project. That is the "table" you asked for.

But the narrative sections are different for every project. Some projects have user journey maps. Some have prototype video embeds. Some start with a blockquote. This content is too varied to fit in YAML, so it lives as Markdown in the body, with Astro components you can drop in wherever you need a specific visual treatment.

This is exactly how your writing articles work — and it already handles images, lightboxes, and rich typography well.

---

### 3c. Home Page Changes (minimal)

No new directory page is needed. The two home page sections already serve as the entry point:

| Home section | Current state | Change needed |
|---|---|---|
| **Featured cards** (Beyond the Touchscreen) | Two `<ProjectCard>` with hardcoded titles and images | Add an `href` prop to `ProjectCard.astro` so clicking links to the project page |
| **Carousel** | Hardcoded `slides` array in `Carousel.astro` | Data-drive the slides from the `projects` Content Collection — no more hardcoded array |

That is it. The home page structure stays exactly the same. Carousel items become links. Featured cards become links.

---

### 3d. New Components Needed

These are reusable components that will be used inside project `.mdx` files. They live in a new folder: `src/components/project/`.

| Component | What it does | Effort |
|---|---|---|
| `ProjectAccordion.astro` | Renders the contributions array from frontmatter as expand/collapse rows. Uses Alpine.js (already on the site) — no new dependencies. | Medium |
| `MetricsGrid.astro` | Renders the 4 outcomes as a 2×2 grid of big number + label | Small |
| `Quote.astro` | Full-width pullquote with attribution. Used for opening user quotes and mid-page quotes | Small |
| `ProjectHero.astro` | Hero image + title + subtitle + optional app link | Small |

No new packages. No React. All Alpine.js or pure HTML/CSS.

---

## 4. Migration Plan from Framer

### What you need to extract

| Asset | Where to find it | Difficulty |
|---|---|---|
| **Copy (text)** | Open each Framer project page, select all text, paste into a text document | Low — 30–60 min per project |
| **Images** | Right-click images in Framer → "Copy image" or export via the Assets panel | Low |
| **Hero images** | Export at 2x from Framer — JPEG at 85% quality is fine for web | Low |
| **Video embeds** | Note the embed URL — you will re-embed the same video on the new page | Trivial |

### What Framer cannot export

Framer does **not** have a "Export to HTML" feature that gives you clean, portable code. If you try to export, you get Framer's proprietary bundle — not useful here.

The honest answer is: **manual copy-paste is the right migration strategy for 10 projects.** This is a few focused hours of work (1–2 hours per project including writing the MDX and organizing assets), not a weeks-long migration. The content is not complex — it is text, images, and structured data.

### Asset naming convention

Use this structure so assets are easy to find later:

```
public/
└── projects/
    └── android-onboarding/
        ├── hero.png
        ├── user-journey.png
        ├── prototype-v1.png
        └── ...
```

---

## 5. Pilot Project Plan

Start with one project to validate that the system works before committing to all ten. If the first one feels right, the rest will be mechanical.

**Recommended pilot:** The Android Onboarding project — it is one of the two featured cards on the home page, so it also immediately tests the home page linking.

### Pilot phases

**Phase 1 — Schema and template (1 session)**
- Define the `projects` collection schema in `content.config.ts`
- Create the dynamic route `src/pages/work/[slug].astro` (mirrors `writing/[slug].astro`)
- Build `ProjectHero.astro` and `MetricsGrid.astro`
- Test with a single project file that has placeholder text

**Phase 2 — Accordion (1 session)**
- Build `ProjectAccordion.astro` using Alpine.js
- Test with a few dummy contributions
- Decide on open/closed default behavior (first item open, rest closed)

**Phase 3 — Pilot content (1–2 sessions)**
- Extract copy and assets from Framer for the Android Onboarding project
- Write the `.mdx` file, filling in all frontmatter fields
- Build out the narrative sections using `Quote.astro` and freeform Markdown

**Phase 4 — Home page wiring (1 session)**
- Add `href` prop to `ProjectCard.astro`
- Data-drive the Carousel from the `projects` collection
- Update the two featured cards on the home page to link to the pilot project
- Remove the Framer link from the hero button (or keep it until all projects are migrated)

**Phase 5 — Review and decide (30 min)**
- Walk through the pilot on desktop and mobile
- Decide if the structure, pacing, and accordion behavior feel right before building the remaining 9 projects
- This is the checkpoint before committing to the full migration

---

## 6. Effort Summary

| Phase | What happens | Sessions |
|---|---|---|
| Schema + template | Define data model, build page shell | 1 |
| Accordion component | Build the contributions expand/collapse | 1 |
| Pilot content entry | One project fully written and styled | 1–2 |
| Home page wiring | Carousel + cards → link to projects | 1 |
| Pilot review | Verify on desktop + mobile, adjust | 0.5 |
| Remaining 9 projects | Content entry only — template is done | 1–1.5 per project |

**Total to pilot:** 4–5 sessions
**Total to full migration:** 15–20 sessions (most of which is content work, not code)

---

## 7. Decision Log

| Decision | Rationale |
|---|---|
| Content Collections over headless CMS | No subscriptions, no API keys, no auth — files ARE the CMS. Works identically to the Writing section already on the site. |
| MDX with frontmatter over pure Markdown | Frontmatter handles structured/repeatable fields (contributions, metrics). MDX body handles narrative variety. Neither format alone can do both well. |
| No directory page | The home page carousel + featured cards already serve this purpose. Adding a `/work` index page would be redundant with the home page, splitting the user's attention. |
| Alpine.js for accordion | Already installed on the site. Zero additional dependencies. Accessible and lightweight. |
| Manual copy-paste migration | Framer has no clean export path. For 10 projects, manual is faster and more reliable than attempting to parse Framer's proprietary output. |
| Start with Android Onboarding | It is already a featured card on the home page, so the pilot immediately tests the full link chain: home → project page. |

---

## 8. Decisions Made

| Decision | Choice | Notes |
|---|---|---|
| URL path | `/work/[slug]` | e.g. `/work/android-onboarding` |
| Nav "Work" link | `/#work` (existing placeholder) | Already in the nav. Points to the home page work section for now. Will stay as-is until project pages are built. |
| Branch strategy | `portfolio-work` branch | All project page work lives here. Merge to `main` when migration is complete and approved. The Framer portfolio link stays active on `main` during the transition. |

## 9. Open Questions (to resolve before Phase 1)

1. **Do projects need a back-navigation link?** (e.g., "← Work" back to the home page `#work` anchor, like how Writing uses "← Notes")
2. **Should the carousel on the home page show ALL projects, or only the non-featured ones?** (Currently the two featured cards and the carousel are separate — this could stay the same, or the carousel could show all projects including featured ones.)
3. **Are any Framer projects password-protected or client-confidential?** Those would need a decision on whether they appear at all, or appear as locked/redacted.
