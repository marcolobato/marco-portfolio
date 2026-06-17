# Design System Rules (AI-ready)

Guidance for AI coding agents (Claude Code, Cursor, Copilot) and developers working on
marcolobato.info, so generated code stays on-system. This is portable across tools and
complements `CLAUDE.md`.

Companion Figma library: **Marco Lobato Design System**
(https://www.figma.com/design/piK6KA4emFU2V2ihNcM2Mh). Every variable there carries
`var(--token)` code syntax, so Figma Dev Mode and this file describe the same system.

## Source of truth

- The file that actually renders the site is **`src/styles/global.css`**. Read token values
  from it.
- **Do not** read values from `src/styles/globals.css`. It is currently orphaned (imported by
  no page) even though some older docs and comments point to it. (Tracked in the audit below.)
- Never hardcode hex values. Always reference a token, e.g. `hsl(var(--primary))`, or a Tailwind
  utility that maps to one.

## Theming (light / dark)

- Dark mode is driven by `data-theme="dark"` on `<html>` (set by `ThemeToggle.astro`).
- Tailwind dark variant: `@custom-variant dark (&:is([data-theme="dark"] *))`.
- Semantic tokens flip automatically between modes. Build with semantic tokens, not raw ramp
  values, so theming keeps working.

## Color tokens (semantic)

HSL, space-separated, used as `hsl(var(--token))`:

- `--primary` / `--primary-foreground` (Deep Navy `#081F5D` / white, flips in dark)
- `--accent` / `--accent-foreground` (Lemon `#F1F11C` / black)
- `--background` / `--foreground`
- `--card` / `--card-foreground`
- `--secondary` / `--secondary-foreground`
- `--muted` / `--muted-foreground`
- `--border`, `--input`, `--ring`

Brand ramps (primitives): `--navy-900` to `--navy-50`, `--lemon-900` to `--lemon-100`. Neutral
greys are expressed inside the semantic tokens rather than as named `--neutral-*` variables.

## Typography

- Display and headings: **Fraunces** (`--font-display`). Bold for h1/h2/display, SemiBold for
  h3/h4.
- Body and UI: **Geist** (`--font-body`).
- Code and labels: **Geist Mono** (`--font-mono`).
- Scale: `--text-xs` (12px) to `--text-6xl` (80px). Line heights: `--leading-tight`,
  `--leading-normal`, `--leading-relaxed`, `--leading-loose`. Weights: `--weight-regular` (400),
  `--weight-medium` (500), `--weight-bold` (700).

## Spacing and radius

- Spacing: `--space-2xs` (4px) to `--space-4xl` (96px), a base-4 scale.
- Radius: `--radius` (16px) for Basis components. The custom Button is a pill
  (`border-radius: 100px`).

## Components

- Custom site components live in `src/components/` (Button, Nav, Footer, Carousel, cards, and
  more). Prefer these.
- **Button** (`src/components/Button.astro`). Props:
  - `label` (string), `href` (string, renders an `<a>` when set, a `<button>` otherwise),
  - `variant` (`"primary"` | `"secondary"`, default `primary`),
  - `icon` (raw SVG string, leading icon that replaces the trailing arrow),
  - `disabled`, `external`, `download` (booleans).
  - Primary is a navy fill, secondary is a surface fill with an outline. The trailing arrow
    rests at the up-right angle and straightens to point right on hover.
- **Basis UI** (`src/components/ui/`) is **Legacy**. Do not build new UI on it. Use it only where
  it already appears.

## Conventions

- Token and variable names: kebab-case, lowercase.
- Mobile-first. The site is read primarily on phones.
- No gradients, glows, or decorative effects. Flat, warm, calm.
- Alpine.js only for interactivity. No React.

## Known issues and migration (from the design-system audit)

1. `globals.css` is orphaned. Reconcile the docs to `global.css` and retire `globals.css`.
2. The custom Button is styled with legacy `--color-*` aliases (`--color-navy`,
   `--color-royal-blue`, `--color-slate`), not the semantic `--primary` / `--secondary` tokens.
   Migrate it to the semantic tokens.
3. Two color systems coexist (semantic tokens plus the legacy `--color-*` aliases). Consolidate
   on the semantic layer.
4. Interaction states (hover, pressed) are not tokenized in code. Consider state-layer opacity
   tokens. The Figma library already models these with Material 3 state layers.

## Figma to code

- The design system is documented in the Figma library linked above. Variables carry
  `var(--token)` code syntax for Dev Mode.
- The Button has a Code Connect mapping in `src/components/Button.figma.ts` (activates on a Figma
  Organization seat; on Professional it serves as the documented mapping artifact).
