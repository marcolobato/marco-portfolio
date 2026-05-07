# PRD. Lookout (Framer to Astro)

- **Date:** 2026-05-07
- **Author:** Marco Lobato
- **Status:** In progress
- **Slug:** `lookout`
- **Project prefix:** `lo-`
- **Target route:** `/work/lookout`
- **Branch:** `port-lookout`

## Summary

Port the Lookout assistive technology case study from the legacy Framer site (`lobato.framer.website/lookout`) into this Astro portfolio at `/work/lookout`. Second article migrated using the playbook (`docs/migration/playbook.md`), following the Voice Access pilot.

## Goals

1. Stand up a permanent home for the Lookout case study at `marcolobato.info/work/lookout`.
2. Match the structural pattern of the Magnifier and Voice Access pages: hero, overview, contributions accordion, outcomes, reflection. Section-level content will differ.
3. Update the homepage carousel slide 3 to link to the new internal page instead of Framer.
4. Validate the updated playbook end-to-end. Anything that doesn't work for Lookout gets fixed in the playbook before the next article.

## Non-goals (out of scope today)

- Porting the other six articles. Each will get its own PRD on its own day.
- Decommissioning the Framer site. That happens only after all eight are ported.
- Visual redesign of the project page template. Reuse what's there. Improvements come later.
- Building new components unless absolutely required. Adapt content to existing components first (`<TwoColumn>`, `<Quote>`, `<InsightGrid>`, `<ProblemCarousel>`, `<DesignIntent>`, `<SolutionBlock>`).

## Source material

- **Body copy:** Google Doc (Marco has the link)
- **Reference site:** https://lobato.framer.website/lookout
- **Source images:** local folder + open Figma file (re-export per playbook Step 2)
- **Reference templates:** `src/content/projects/voice-access.mdx` (most recent migration, uses all current patterns) and `src/content/projects/magnifier.mdx`

## Section mapping

To be filled in during the section-by-section walkthrough. Each row maps a section in the Google doc to a component on the Astro page.

| # | Doc section | Component | Image filename(s) | Status |
|---|-------------|-----------|-------------------|--------|
| 0 | Frontmatter (header, overview, contributions, outcomes, reflection) | Schema-driven, no MDX body | `lo-hero.png` | Pending |
| 1 | (TBD) | (TBD) | `lo-…` | Pending |

## Success criteria

- [ ] `/work/lookout` builds with no errors
- [ ] Page loads with all images, in light and dark mode, on mobile and desktop
- [ ] Homepage carousel slide 3 links to `/work/lookout` (not Framer) and no longer opens in a new tab
- [ ] All section content from the Google doc is present, in the same order
- [ ] No raw hex values in any new file (token-only, per `CLAUDE.md`)
- [ ] All image filenames use the `lo-` prefix and live in `public/projects/lookout/`
- [ ] Each section commit includes its image asset (per the playbook checklist)

## Risks and open questions

- **Asset rights.** Lookout features third-party content (book covers, currency, food labels). Confirm what's safe to host on a personal site.
- **Inline videos or GIFs.** If any demo footage is needed, see playbook Step 3 (plain `<video>` wrapped in `<p>` works).
- **Content sections that don't fit existing components.** Mitigation: flag during walkthrough; restructure content before building new components.
- **Image quantity.** Plan 1 to 2 hours for asset prep alone (re-export and optimize).

## Out-of-scope notes (parking lot)

Captured here so they don't get lost. Pull into a future PRD when relevant.

- Long-term: tags or category system across `/work/*` pages
- Long-term: structured "next case study" links wired into the back-to-top slot
- Long-term: Open Graph image generation per case study
