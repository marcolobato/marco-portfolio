// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import alpinejs from '@astrojs/alpinejs';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  // mdx() lets .mdx files use Astro components inside Markdown.
  // alpinejs() injects Alpine.js globally on every page.
  integrations: [mdx(), alpinejs(), icon()]
});