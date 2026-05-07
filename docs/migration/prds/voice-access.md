# PRD. Voice Access for Android (Framer to Astro)

- **Date:** 2026-05-06
- **Author:** Marco Lobato
- **Status:** In progress
- **Slug:** `voice-access`
- **Project prefix:** `va-`
- **Target route:** `/work/voice-access`
- **Branch:** `port-voice-access`

## Summary

Port the Voice Access for Android case study from the legacy Framer site (`lobato.framer.website/voice-access`) into this Astro portfolio. This is the first article migrated using the new playbook (`docs/migration/playbook.md`) and the pilot for porting the remaining seven.

## Goals

1. Stand up a permanent, owned home for the Voice Access case study at `marcolobato.info/work/voice-access`.
2. Match the structural pattern of the Pixel 8 Magnifier page: same hero, overview, contributions accordion, outcomes, reflection. Section-level content will differ.
3. Update the homepage carousel slide 2 to link to the new internal page instead of Framer.
4. Validate the playbook end to end. Anything that doesn't work for Voice Access gets fixed in the playbook before the next article.

## Non-goals (out of scope today)

- Porting the other seven articles. Each will get its own PRD on its own day.
- Decommissioning the Framer site. That happens only after all eight are ported.
- Visual redesign of the project page template. Reuse the Magnifier template as-is. Improvements come in a separate pass after content is live.
- Building new components unless absolutely required. Adapt content to existing components first.

## Source material

- **Body copy:** Google Doc (Marco has the link)
- **Reference site:** https://lobato.framer.website/voice-access
- **Source images:** local folder + open Figma file (re-export per playbook Step 2)
- **Reference template:** `src/content/projects/magnifier.mdx`

## Section mapping

To be filled in during the section-by-section walkthrough. Each row maps a section in the Google doc to a component on the Astro page.

| # | Doc section | Component | Image filename(s) | Status |
|---|-------------|-----------|-------------------|--------|
| 0 | Frontmatter (header, overview, contributions, outcomes, reflection) | Schema-driven, no MDX body | `va-hero.png` | ✅ Done |
| 1 | The opportunity | Plain `##` + paragraph + image | `va-overview-item-recognition.png` | ✅ Done |
| 2 | Problem | Plain markdown + 2 images | `va-problem-comparison.png`, `va-problem-dictation.png` | Pending |
| 3 | Why it mattered | Plain `##` + paragraph + image | `va-why-dictation.png` | Pending |
| 4 | Understanding user needs (Sarah) | Plain markdown + `<Quote variant="light">` | `va-overview-sarah.png` | Pending |
| 5 | User Interface Redesign | Plain markdown + composite image | `va-overview-ui-redesign.png` | Pending |
| 6 | Five-feature composite | Plain markdown image + caption | `va-overview-features.png` | Pending |
| 7 | "Blue circle" pullquote | `<Quote variant="dark">` | (none) | Pending |
| 8 | Solutions (intro + 4 sub-features + outro) | Plain markdown sections | `va-solution-basic-commands.png`, `va-solution-contextual-help.png`, `va-solution-timely-learning.png`, `va-solution-preventing-errors.png` | Pending |

Image filenames above are proposals based on each section's role. Adjust at export time if a different name is clearer.

## Success criteria

- [ ] `/work/voice-access` builds with no errors
- [ ] Page loads with all images, in light and dark mode, on mobile and desktop
- [ ] Lightbox works on inline images
- [ ] Homepage carousel slide 2 links to `/work/voice-access` (not Framer) and no longer opens in a new tab
- [ ] All section content from the Google doc is present, in the same order, with no copy lost in translation
- [ ] No raw hex values in any new file (token-only, per `CLAUDE.md`)
- [ ] All image filenames use the `va-` prefix and live in `public/projects/voice-access/`

## Risks and open questions

- **Sections that don't fit existing components.** The Magnifier template covers most patterns, but Voice Access content is different. *Mitigation:* flag during walkthrough; build a new component only if restructuring the content first doesn't work.
- **Inline videos or GIFs.** Voice Access demonstrations may rely on demo footage from the Framer site. If so, see Step 3 of the playbook. The plain `<video>` tag is the quick path; `<VideoEmbed>` component is the polished path.
- **Image quantity.** Voice Access likely has 10 to 20+ images. Re-exporting and optimizing is the longest single step. Plan 1 to 2 hours for asset prep alone.
- **Asset rights.** Confirm any third-party screenshots, logos, or device mockups are OK to host on a personal site.
- **Copy length.** The Framer page may have longer prose than Magnifier. If a section runs past ~3 short paragraphs, consider tightening before porting. Long blocks of prose are the easiest thing to lose readers on.

## Out-of-scope notes (parking lot)

Captured here so they don't get lost. Pull into a future PRD when they become relevant.

- Long-term: tags or category system across `/work/*` pages
- Long-term: structured "next case study" links at the bottom of each page
- Long-term: Open Graph image generation per case study
- Long-term: search across writing + work
