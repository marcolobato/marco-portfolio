/**
 * Code Connect mapping: Figma "Button" -> src/components/Button.astro
 *
 * STATUS: documentation artifact. Code Connect *publishing* requires a Figma
 * Organization or Enterprise seat. On the current Professional plan this file documents
 * the intended Figma -> code mapping and prop translation, rather than activating live in
 * Dev Mode. (Variable code syntax + matching names already give agents most of the benefit.)
 *
 * To make it live on an Org seat:
 *   npm i -D @figma/code-connect
 *   npx @figma/code-connect publish
 * The HTML parser is auto-detected for non-React projects like Astro.
 *
 * This file is not imported by the app, so it does not affect `npm run build`.
 */
import figma, { html } from "@figma/code-connect/html"

figma.connect(
  "https://www.figma.com/design/piK6KA4emFU2V2ihNcM2Mh?node-id=20-22",
  {
    props: {
      // Figma "Label text" (TEXT) -> Astro `label`
      label: figma.string("Label text"),

      // Figma "Variant" (VARIANT) -> Astro `variant`
      variant: figma.enum("Variant", {
        Primary: "primary",
        Secondary: "secondary",
      }),

      // Figma "Show icon" (BOOLEAN) -> presence of the trailing arrow.
      // In code the arrow renders by default; passing `icon` (a raw SVG string) swaps it
      // for a leading icon. Documented here for parity with the Figma panel.
      showIcon: figma.boolean("Show icon"),

      // Figma "State" (VARIANT: Enabled/Hovered/Focused/Pressed/Disabled) is mostly a CSS
      // pseudo-state in code (:hover, :focus-visible, :disabled), not a prop. Only Disabled
      // maps to a real prop; the rest resolve to undefined and are omitted.
      disabled: figma.enum("State", { Disabled: true }),
    },

    // The snippet a developer writes to use this component:
    example: ({ label, variant }) =>
      html`<Button label="${label}" variant="${variant}" />`,
  },
)
