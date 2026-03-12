// content.config.ts — Content Collections schema (Astro 5+)
// In Astro 6 this file lives at src/content.config.ts, not src/content/config.ts.
// It defines the shape of every post in the "writing" collection.
// Astro validates each .md file against this schema at build time.

import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// glob() is the Astro 5+ way to load a folder of Markdown files.
// pattern: matches all .md files inside the writing folder.
// base: the folder to scan, relative to the project root.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),

  schema: z.object({
    title:       z.string(),            // shown on the card and the post page
    date:        z.date(),              // used for sorting posts chronologically
    description: z.string(),            // shown on the card as a subtitle
    image:       z.string().optional(), // path to a cover image — optional for now
  }),
});

export const collections = { writing };
