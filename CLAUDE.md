# Project Instructions

## Always Read Before Building

Before writing any HTML, CSS, or component for this project, you MUST read and reference these files:

1. `src/styles/styleguide.astro` — source of truth for all UI components. If a component exists here, reuse its exact structure and class names.
2. `src/styles/global.css` — main stylesheet with all existing rules. Do not add styles that already exist here.
3. `src/styles/tokens.css` — color and spacing tokens based on the Marco Lobato brand palette. All colors MUST come from tokens — never hardcode hex values.

## Color Tokens
- `--color-navy: #081F5D`
- `--color-royal-blue: #1350C5`
- `--color-lemon: #F1F11C`
- `--color-citrine: #CCD418`
- `--color-slate: #A0AFB5`
- `--color-charcoal: #3C2F39`

## Missing Component Check

If a task requires a component that does NOT exist in the styleguide, you must:

1. Stop and flag it clearly:
   > ⚠️ Missing Component: `[component name]` is not yet in the styleguide. Do you want me to build it and add it there first?
2. Wait for confirmation before proceeding.
3. If yes, build it in the styleguide first, then use it in the project.

## Git Workflow

- Commit after each meaningful, working change — not at the end of a long session.
- Remind Marco to commit if several changes have been made without a commit.
- Keep commit messages short and descriptive in plain English.

## Rules

- Never introduce a new component without checking the styleguide first.
- Never use a color that isn't a token.
- Never duplicate styles that already exist in global.css.
- Always keep the styleguide up to date — it is a living document.
- The styleguide itself is a featured project on the portfolio.