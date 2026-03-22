# CLAUDE.md — marcolobato.info portfolio

## Project identity

This is Marco Lobato's personal portfolio site. Marco is an interaction designer who works at the intersection of multimodal AI, voice systems, accessibility, and physical computing. He calls himself a "tech weaver" — someone who weaves technology into physical spaces and artifacts so interfaces become invisible and people can focus on what they're doing.

The site tone is: thoughtful, warm, technically fluent, never flashy. Think Don Norman meets a well-worn notebook. The writing is personal essay, not corporate. The design should feel like broken-in denim — fitted, comfortable, already shaped to the person.

## Stack

- **Framework**: Astro 4+ (static-first, island architecture)
- **Components**: Basis UI (`@basisui/ui`) — shadcn-style copy-paste components for Astro + Alpine.js
- **Styling**: Tailwind CSS 3+ with CSS variable theming
- **Interactivity**: Alpine.js (lightweight, declarative, no build step)
- **Hosting**: Cloudflare Pages (deploy from GitHub)
- **Domain**: marcolobato.info (registered at Network Solutions)

## Color system

All colors are defined as CSS variables in `src/styles/globals.css` using HSL values (space-separated, no `hsl()` wrapper) per the shadcn/Basis UI convention.

### Brand colors

| Token          | Role                        | Hex       | HSL                    |
|----------------|-----------------------------|-----------|------------------------|
| Deep Navy      | `--primary`                 | `#081F5D` | `223.8 84.2% 19.8%`   |
| Lemon Sorbet   | `--accent`                  | `#F1F11C` | `60 88.4% 52.7%`      |

### Navy ramp (primary ramp)

| Stop   | Hex       | HSL                    | Usage                              |
|--------|-----------|------------------------|------------------------------------|
| 900    | `#081F5D` | `223.8 84.2% 19.8%`   | Primary text, headings             |
| 800    | `#0A2872` | `222.7 83.9% 24.3%`   | Dark UI surfaces                   |
| 700    | `#1040A8` | `221.1 82.6% 36.1%`   | Active states, links               |
| 500    | `#2060D0` | `218.2 73.3% 47.1%`   | Interactive elements               |
| 300    | `#6090E0` | `217.5 67.4% 62.7%`   | Hover states, secondary accents    |
| 100    | `#C0D4F4` | `216.9 70.3% 85.5%`   | Light backgrounds, cards           |

### Lemon ramp (accent ramp)

| Stop   | Hex       | HSL                    | Usage                              |
|--------|-----------|------------------------|------------------------------------|
| 900    | `#8A8A0A` | `60 86.5% 29%`        | Accent text on light bg            |
| 700    | `#BFBF12` | `60 82.8% 41%`        | Accent borders, tags               |
| 500    | `#F1F11C` | `60 88.4% 52.7%`      | Primary accent (buttons, badges)   |
| 300    | `#F6F670` | `60 88.2% 70.2%`      | Accent hover states                |
| 100    | `#FAFABC` | `60 86.1% 85.9%`      | Accent backgrounds                 |

### Neutral ramp

| Stop   | Hex       | HSL                    | Usage                              |
|--------|-----------|------------------------|------------------------------------|
| 950    | `#1A1A1A` | `0 0% 10.2%`          | Dark mode background               |
| 800    | `#4D4D4D` | `0 0% 30.2%`          | Secondary text                     |
| 500    | `#808080` | `0 0% 50.2%`          | Muted text, borders                |
| 200    | `#D9D9D9` | `0 0% 85.1%`          | Dividers, subtle borders           |
| 100    | `#F2F2F2` | `0 0% 94.9%`          | Page background, surfaces          |
| 0      | `#FFFFFF` | `0 0% 100%`           | Card backgrounds                   |

## Token mapping rules

- NEVER use raw hex values in components. Always reference CSS variables or Tailwind utilities.
- `--primary` = Deep Navy. Used for: headings, nav, primary buttons, links.
- `--accent` = Lemon Sorbet. Used sparingly: call-to-action highlights, active states, badges. Never as a background for large areas.
- `--background` = White (light) / Gray 950 (dark). The page canvas.
- `--foreground` = Gray 950 (light) / Gray 100 (dark). Default body text.
- `--muted` = Gray 100 (light) / Gray 800 (dark). Secondary surfaces.
- `--muted-foreground` = Gray 500. Placeholder text, captions.
- `--card` = White (light) / Gray 800 (dark). Card surfaces.
- `--border` = Gray 200 (light) / Gray 500 (dark). Default borders.

## Typography

- **Headings**: Use the system's default sans (Basis UI default). Weight 600 for h1-h2, 500 for h3+.
- **Body**: 16px/1.7 line-height for article content. 14px/1.5 for UI elements.
- **Code**: Monospace for inline code references to tools, components, or technical terms.
- Article pages should feel like reading a well-typeset magazine essay — generous margins, comfortable measure (~65ch max-width for prose), clear hierarchy.

## File structure

```
src/
├── components/
│   └── ui/              # Basis UI components (added via CLI)
├── layouts/
│   ├── BaseLayout.astro # Shell: head, nav, footer, global styles
│   └── ArticleLayout.astro # Article-specific: max-width prose, metadata
├── pages/
│   ├── index.astro      # Home
│   ├── writing/
│   │   └── index.astro  # Writing index
│   └── about.astro      # About (placeholder for now)
├── content/
│   └── writing/
│       └── ai-broken-in-denim.md  # First article
├── styles/
│   └── globals.css      # CSS variables, Tailwind base
└── lib/
    └── utils.ts         # cn() helper from Basis UI
```

## Content rules

- Articles are markdown files in `src/content/writing/` with frontmatter (title, date, description, image).
- Use Astro's Content Collections API to type and query articles.
- Article slugs are derived from filename: `ai-broken-in-denim.md` → `/writing/ai-broken-in-denim`

## Component usage

Only add Basis UI components as needed. For experiment 1, the minimum set is:
- `button` — nav links, CTAs
- `card` — article cards on the writing index
- `text` — typography primitives
- `divider` — section breaks in articles
- `navbar` — site navigation (keep it minimal: logo/name + 3 links)

Add more components only when a specific experiment requires them.

## Design principles

1. **Restraint over capability.** The site should do less than it could. Every interactive element must earn its presence.
2. **The interface should recede.** Content comes first. Chrome is minimal. Navigation is obvious without being loud.
3. **Dark mode is a first-class citizen.** Every color token must work in both modes. Test both.
4. **Mobile is the primary context.** Marco's article talks about people on buses. The site should read beautifully on a phone.
5. **Each experiment lives here.** The site grows as prototypes get built. The architecture should make adding a new page trivial.

## What NOT to do

- No gradients, glows, or decorative effects. Flat, clean, warm.
- No stock illustrations or placeholder images. If there's no real image, use whitespace.
- No "hero section" patterns with giant headlines and abstract blobs. The homepage is a quiet introduction.
- No JavaScript frameworks beyond Alpine.js. If it needs React, it's too complex for this site.
- Do not install shadcn/ui for React. This project uses Basis UI for Astro. They share the CSS variable convention but the component implementations are different.
