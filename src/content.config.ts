// content.config.ts — Content Collections schema (Astro 5+)
// In Astro 6 this file lives at src/content.config.ts, not src/content/config.ts.
// It defines the shape of every post in the "writing" collection.
// Astro validates each .md file against this schema at build time.

import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// glob() is the Astro 5+ way to load a folder of Markdown files.
// pattern: matches both .md and .mdx files inside the writing folder.
// .mdx files are identical to .md except they allow Astro components inside them.
// base: the folder to scan, relative to the project root.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),

  schema: z.object({
    title:       z.string(),            // shown on the card and the post page
    date:        z.date(),              // used for sorting posts chronologically
    description: z.string(),            // shown on the card as a subtitle
    image:       z.string().optional(), // path to a cover image — optional for now
  }),
});

// ---------------------------------------------------------------------------
// Projects collection — one .mdx file per portfolio project.
//
// Frontmatter handles all structured/repeatable data (hero fields, overview,
// contributions, outcomes). The MDX body handles narrative sections (quotes,
// user journeys, prototypes, reflection) that vary project to project.
// ---------------------------------------------------------------------------
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),

  schema: z.object({
    // ── Hero ────────────────────────────────────────────────────────────────
    title:     z.string(),              // large heading on the project page
    client:    z.string(),              // e.g. "Google"
    brand:     z.string().optional(),   // e.g. "Made by Google" — shown below title
    appLink:   z.string().optional(),   // URL for the "Download / View" CTA button
    appLinkLabel: z.string().optional(), // label for the CTA button, e.g. "Download Magnifier"
    heroImage: z.string().optional(),   // path to the hero image in /public
    year:      z.number(),              // e.g. 2023 — shown in the hero

    // ── Access ──────────────────────────────────────────────────────────────
    // locked: true hides the page content behind a password gate.
    // Omit this field (or set false) for public projects.
    locked:    z.boolean().optional().default(false),

    // ── Project Overview ────────────────────────────────────────────────────
    overview: z.object({
      what:           z.string(), // one sentence: what is this product?
      objective:      z.string(), // what were you trying to achieve?
      differentiator: z.string(), // what made it different?
    }),

    // ── Contributions accordion ──────────────────────────────────────────────
    // Each item becomes one row in the accordion.
    // content can be an empty string "" — those rows show as label-only (no expand).
    contributions: z.array(z.object({
      label:   z.string(), // e.g. "Role", "Research", "Visual Design"
      content: z.string(), // detail text — leave empty "" for label-only rows
    })),

    // ── Outcomes & Impact ───────────────────────────────────────────────────
    // A flexible bullet list — mix of metrics, milestones, and qualitative wins.
    outcomes: z.array(z.object({
      text: z.string(), // e.g. "4.8★ rating at launch — users praised clarity."
    })),

    // ── Project Reflection ───────────────────────────────────────────────────
    // Closing section, always at the end of the page after Outcomes.
    // title: a soft, project-specific heading (e.g. "Future Vision: Multimodal AI Assistants")
    // body:  one or two paragraphs as a single string. Use \n\n to separate paragraphs.
    // Optional — omit the entire field for projects that don't have a reflection yet.
    reflection: z.object({
      title: z.string(),
      body:  z.string(),
    }).optional(),

    // ── Home page card ───────────────────────────────────────────────────────
    // Controls how this project appears in the carousel and featured cards.
    card: z.object({
      category:  z.string(),                    // carousel slide title
      thumbnail: z.string(),                    // path to carousel image in /public
      featured:  z.boolean().optional().default(false), // true = appears in featured cards above carousel
    }),
  }),
});

export const collections = { writing, projects };
