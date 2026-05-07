# Article migration playbook

Move case studies from the legacy Framer site (`lobato.framer.website`) into this Astro portfolio. Run these steps once per article. Eight articles total. Once all are ported, the Framer site can be decommissioned.

The first article ported with this playbook was Voice Access (May 2026). Update this doc whenever a step is missing or wrong.

## When to use this

For any case study currently hosted on Framer that needs a permanent home on `marcolobato.info`. Not for new case studies written from scratch, since those don't need a "migration" framing, they just need an `.mdx` file.

## Prerequisites

Before starting an article, you should have:

- The full body copy in a Google Doc (text only, since formatting will be re-applied via Markdown and MDX components)
- Access to the original Framer page for screenshots, layout reference, and pulling exact values
- Source images organized in a Figma file or local folder, ready for re-export at the standard sizes
- Decided which homepage carousel slide will link to the new page (it usually already exists and currently points to a Framer URL)

## Step 0. Inventory and PRD

Before any code or images, write the article-specific PRD at `docs/migration/prds/{slug}.md`. Use the Voice Access PRD as a template.

The PRD should answer:

- What is the slug? Kebab-case, used everywhere (folder name, route, MDX filename).
- Where is the source content? (Google doc link, Framer URL.)
- Where are the source images? (Figma file URL, local folder path.)
- What sections does the article have, and which existing component fits each one?
- Are there sections that don't fit any existing component? Flag them, since they're build-first work (see Step 4).

## Step 1. Branch

Create a per-article branch off `main`:

```
git checkout main
git pull
git checkout -b port-{slug}
```

One branch per article keeps PRs small and reviewable. Delete the branch after the PR merges.

## Step 2. Image preparation

This is the most time-consuming step and the easiest to rush. Done well, every article looks consistent. Done poorly, the site looks patchwork.

### 2a. Re-export from Figma

Set up a "Migration exports" page in your Figma file. Place every image on a frame at the export size below, which guarantees consistency across articles.

| Type        | Source size       | Format | Notes                                                |
|-------------|-------------------|--------|------------------------------------------------------|
| Hero        | 2000 × 1125 px    | PNG    | 16:9. One per project. Used in frontmatter.          |
| Body image  | 1600 px wide      | PNG    | Height variable.                                     |
| Photo       | 1600 px wide      | JPG    | ~80% quality. Photos compress better as JPG.        |
| GIF         | 1200 px wide max  | GIF    | Avoid if possible (see 2c).                          |
| Video       | 1080p (1920×1080) | MP4    | H.264, ≤ 10 MB, ≤ 30s for inline demos.              |

These sizes are roughly 2× the maximum CSS display width, so they look crisp on retina screens without bloating the build. Actual on-page sizing is handled by CSS in `src/pages/work/[slug].astro`.

### 2b. Naming

Filenames use a two-part pattern: **`{project-prefix}-{section-prefix}-{name}.{ext}`**

The project prefix is a 2 to 3 letter abbreviation unique to the article. It makes search trivial: typing `va-` in your editor's file finder shows only Voice Access assets.

| Project              | Prefix |
|----------------------|--------|
| Voice Access         | `va-`  |
| Lookout              | `lo-`  |
| Pixel 8 Magnifier    | (existing assets keep their current names, no retroactive renames) |
| (assign per article) | …      |

Section prefixes match the role of the image:

| Prefix         | Used by                    | Example                          |
|----------------|----------------------------|----------------------------------|
| `hero`         | frontmatter `heroImage`    | `va-hero.png`                    |
| `overview-`    | inline body images         | `va-overview-context.png`        |
| `journey-`     | user journey artifacts     | `va-journey-storyboard.png`      |
| `need-`        | `<DesignIntent>`           | `va-need-frame.png`              |
| `problem-`     | `<ProblemCarousel>`        | `va-problem-blurry-text.png`     |
| `solution-`    | `<SolutionBlock>`          | `va-solution-quick-access.png`   |
| `demo-`        | inline videos / GIFs       | `va-demo-voice-shortcut.mp4`     |

Rules:

- All lowercase, kebab-case
- No spaces, no version suffixes (`-v2`, `-FINAL`, `-FINAL2`)
- Filename describes content, not source. Use "storyboard.png" rather than "screenshot-2.png"

### 2c. Optimize

After export, run every PNG and JPG through [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app). Typical savings: 50 to 70 percent. The site is hosted on Cloudflare Pages, so small files mean fast loads.

For GIFs: prefer MP4 instead. A 5-second GIF is often 5 to 10 MB. The same content as MP4 is 200 to 500 KB. If you must use a GIF (e.g. tiny micro-interaction loops), keep it under 1 MB.

For MP4: the `ffmpeg` command below produces a small, web-friendly file. Run it from the folder containing the source video:

```
ffmpeg -i source.mov -vcodec h264 -acodec aac -b:v 1500k -movflags +faststart output.mp4
```

`+faststart` matters, because it puts the video metadata at the front of the file so browsers can start playing before the whole file downloads.

### 2d. Drop into the project

Place all files into `public/projects/{slug}/`. The `public/` folder is served as-is at the site root, so `public/projects/voice-access/va-hero.png` becomes `/projects/voice-access/va-hero.png` in `src` attributes.

## Step 3. Video and GIF support

Inline `<video>` is **not** a first-class component on this site yet. If your article has demo videos:

1. **First, ask if a still image plus caption would do the job.** Often it does, and it loads faster.
2. If video is essential, you have two options:
   - **Plain `<video>` tag inline in the MDX.** Quick, no new component. Looks like:
     ```
     <video src="/projects/voice-access/va-demo-voice-shortcut.mp4" autoplay muted loop playsinline />
     ```
     Caveat: no lightbox, no caption styling, no rounded corners by default. Fine for a small demo.
   - **Build a `<VideoEmbed>` component.** Consistent styling, caption support, can match `<SolutionBlock>` aesthetics. Per `CLAUDE.md`, flag this as a missing component first and review before building.
3. **For long videos** (over ~30 seconds), prefer a YouTube or Vimeo embed. Keeps the build small and gives the user playback control.

## Step 4. Content scaffolding

### Guiding rule: reuse first

Before reaching for a new component or new styles, **assume the answer is to reuse what already exists**. The order of preference, strictest to most permissive:

1. **Reuse an existing component as-is.** Most sections will fit one of the six in `src/components/project/`.
2. **Restructure the content to fit an existing component.** Splitting one long section into two `<SolutionBlock>`s, or rewriting a list into the `<InsightGrid>` shape, is almost always preferable to building something new.
3. **Reuse an existing style or token.** Check `src/styles/global.css` and `src/styles/globals.css` before adding any new CSS.
4. **Only as a last resort, build a new component.** Stop and flag it per `CLAUDE.md`. Review together before any code is written. Three similar one-off uses don't justify a new component. Three identical patterns across multiple articles do.

This keeps the codebase small, the visual language consistent, and reviews fast.

### 4a. Create the .mdx file

Path: `src/content/projects/{slug}.mdx`

Copy the frontmatter from `magnifier.mdx` as a starting point and replace each value. The schema is in `src/content.config.ts`. Every required field must be present or the build will fail with a clear error.

**Required fields** (build fails if missing):

- `title`, `client`, `year`, `heroImage`
- `overview.{what, objective, differentiator}`
- `contributions[]` (at least one entry)
- `outcomes[]` (at least one entry)
- `card.{category, thumbnail}`

**Optional but recommended:**

- `brand` for the soft subtitle below the title
- `appLink` and `appLinkLabel` for the CTA button at the top of the page
- `outcomesQuote` for a pullquote in the outcomes section
- `reflection.{title, body}` for the closing section

### 4b. Match content sections to components

Walk the Google doc section by section. For each section, pick the best-fitting component from `src/components/project/`:

| Content type                                        | Component             |
|-----------------------------------------------------|-----------------------|
| Pull quote (user testimonial, statement)            | `<Quote>`             |
| 2 to 4 short insights with emoji + title + body     | `<InsightGrid>`       |
| Sequenced problem statements with images            | `<ProblemCarousel>`   |
| Design intent + 2 to 4 numbered user needs          | `<DesignIntent>`      |
| Single solution: problem, solution, outcome         | `<SolutionBlock>`     |
| Plain heading + paragraph                           | Markdown `##` and prose |
| Inline image with caption                           | `![alt](path)\n*caption*` (no blank line between image and caption) |

If a section doesn't fit any of these and isn't plain prose: **stop and flag a missing component** per `CLAUDE.md`. Either build the new component (review together first) or restructure the content to fit existing ones.

### 4c. Section-by-section walkthrough

The first time, walk every section together (Marco + Claude). Don't batch all sections at once. Review one, commit it, then move to the next. Small commits make it easy to revert just one section if it doesn't land.

## Step 5. Carousel link swap

Open `src/components/Carousel.astro`. Find the slide for this article. Two changes:

1. Change `href` from the Framer URL to `/work/{slug}`
2. Remove `external: true`, since the link is now internal and shouldn't open a new tab

Before:

```
{ image: "/carousel/slide-2.png", title: "Assistive Technology", subtitle: "Voice Access for Android", href: "https://lobato.framer.website/voice-access", external: true },
```

After:

```
{ image: "/carousel/slide-2.png", title: "Assistive Technology", subtitle: "Voice Access for Android", href: "/work/voice-access" },
```

Commit this change separately from the content commit so it's easy to roll back if the page isn't ready yet.

## Step 6. Local QA

Run `npm run dev` and walk through this checklist:

- [ ] `/work/{slug}` loads with no console errors
- [ ] Hero image displays at expected size, not stretched or pixelated
- [ ] All inline images load (no broken-image icons)
- [ ] Light mode looks correct
- [ ] Dark mode looks correct (toggle via the theme button in the nav)
- [ ] Mobile layout works (resize browser to ~375 px wide)
- [ ] Lightbox opens on inline image click, closes on Escape and outside-click
- [ ] All in-body links work and open the right URLs
- [ ] Carousel link from the homepage navigates correctly
- [ ] "← Work" back link returns to `/#work`

If anything fails: fix, re-test, commit. Don't merge a broken page.

## Step 7. PR and merge

Push the branch and open a PR. The PR description should include:

- Before and after for the carousel link
- A screenshot of the new `/work/{slug}` page in light and dark mode
- A note flagging anything skipped or deferred

Merge to `main`. Cloudflare Pages auto-deploys from `main`. Confirm the live page works before deleting the branch.

## Step 8. Decommission Framer (only after all 8 are ported)

**Do not start this until every article has a live page on `marcolobato.info`.**

When all 8 are migrated:

1. Add 301 redirects from each Framer URL to the new internal URL. The site already has `public/_redirects` for Cloudflare Pages, so add entries there.
2. Update external references to the Framer site (LinkedIn, resume, business cards, email signature) to point at `marcolobato.info`.
3. Pause (don't yet cancel) the Framer subscription. Keep the project file ~30 days as a safety net.
4. Cancel the Framer subscription.
5. Update this playbook with anything you learned along the way.

## Appendix. Known gaps

These are things this playbook can't fully handle yet. Update this list as new ones are found.

- **No `<VideoEmbed>` component.** Articles needing inline MP4 demos use a plain `<video>` tag for now (Step 3). Build the component if 3+ articles end up needing it.
- **No automated image optimization.** Manual TinyPNG or Squoosh step. If we port many more articles after the initial 8, this is the first thing to automate.
- **No section template generator.** The `.mdx` is hand-written. Could be a script that scaffolds frontmatter from a YAML config, but probably overkill for 8 articles.
