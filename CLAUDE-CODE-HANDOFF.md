# Selected Work Section — Claude Code Handoff

## What this is

A new component for the Selected Work section on marcolobato.info that replaces the current two static illustration groups with three interactive flip cards. The section text has already been updated on the live site. This document covers replacing the illustrations with the card component.

## Files included

- `WorkCard.astro` — The flip card component (props-driven, scoped styles)
- `beyond-touchscreen-v5.html` — Working prototype with animations and lightbox (reference for Phase 3)

## Site context

- **Stack:** Astro, deployed on Cloudflare Pages
- **Color system:** Deep Navy / Lemon Sorbet, HSL CSS variables in shadcn/Basis UI convention
- **Dev environment:** VS Code with Claude Code plugin
- **Fonts:** DM Sans (body), Space Mono (mono/labels)

## Phase 1: Ship today (static cards with flip)

### Step 1: Add the WorkCard component

Copy `WorkCard.astro` to `src/components/WorkCard.astro`.

The component uses CSS variable names with fallbacks. Map these to the site's existing variables. The likely mappings are:

```
--color-deep-navy     → site's deep navy variable
--color-royal-blue    → site's royal blue variable
--color-citrine-green → site's citrine green variable
--color-dark-charcoal → site's dark charcoal variable
--color-lemon-sorbet  → site's lemon sorbet variable
--color-card-bg       → white or site's card surface
--color-card-border   → site's border color
--color-card-anim-bg  → site's subtle background
--color-text-secondary → site's secondary text
--color-text-muted    → site's muted text
```

Check the site's existing CSS variables (likely in a global stylesheet or theme file) and update the fallback values in WorkCard.astro to match, or replace the variable names entirely.

### Step 2: Create placeholder images

For today's launch, create or export three static images (one per card). Options:

1. **Screenshot from the prototype:** Open `beyond-touchscreen-v5.html`, expand each card's lightbox, and screenshot the phone mock area. Crop to the phone.
2. **Existing assets:** Use cropped versions of the current slide deck screenshots.
3. **Simple placeholder:** A solid Deep Navy rectangle with the project name in Lemon Sorbet text.

Place images in the site's public images directory, e.g.:
```
public/images/work/setup-wizard-thumb.png
public/images/work/camera-switch-thumb.png
public/images/work/voice-access-thumb.png
```

### Step 3: Replace the illustrations in the page

In the page file where the Selected Work section lives (likely `src/pages/index.astro` or a section component), remove the two existing illustration `<img>` tags and their captions. Replace with:

```astro
---
import WorkCard from '../components/WorkCard.astro';
---

<div class="work-cards-grid">
  <WorkCard
    id="setup"
    pattern="Learnable Efficiency"
    title="Android Setup Wizard, Pixel"
    backHeading="Efficient from the first screen"
    backParagraphs={[
      'The moment you start a new Android phone, you can set it up by voice. I integrated hands-free setup into the Setup Wizard so people who cannot touch the screen never have to wait for help.',
      'Numbered labels make it fast. People who already use numbers to navigate stay efficient. People trying voice for the first time learn that saying "two" is easier than spelling out a network name. The system surfaces this hint at the right moment on each screen, teaching a faster pattern exactly when it is useful.'
    ]}
    stats={[
      { value: 'First OS', desc: 'with voice setup' },
      { value: 'Adopted', desc: 'by other Android OEMs' }
    ]}
    image="/images/work/setup-wizard-thumb.png"
    imageAlt="Android Setup Wizard showing numbered Wi-Fi networks with voice input"
    channels={[
      { type: 'voice', label: 'voice' },
      { type: 'screen', label: 'screen' }
    ]}
    lightboxDesc="Numbered labels teach efficient voice interaction from the first screen. Say two instead of spelling out a network name."
  />

  <WorkCard
    id="camera"
    pattern="Additive Input"
    title="Camera Switch, Android"
    backHeading="New inputs, same mental model"
    backParagraphs={[
      'Camera Switch brought face gestures to Android: raise an eyebrow to scroll, smile to select, open your mouth to go back. My work was integrating this new capability into Switch Access so it felt like part of the same system, not a separate feature.',
      'I unified the setup experience across external switches and Camera Switch, aligning settings, visuals, and onboarding so people could learn and try both in the same place. The same intent model, the same settings flow. As the input methods grow, the experience stays coherent.'
    ]}
    stats={[
      { value: 'Unified', desc: 'setup and settings across Switch Access' }
    ]}
    image="/images/work/camera-switch-thumb.png"
    imageAlt="Camera Switch settings showing face gesture mappings"
    channels={[
      { type: 'camera', label: 'camera' },
      { type: 'screen', label: 'screen' },
      { type: 'gesture', label: 'gesture' }
    ]}
    lightboxDesc="Camera Switch integrated into the existing Switch Access system. Same settings, same onboarding, same mental model."
  />

  <WorkCard
    id="voice"
    pattern="Supervision Patterns for Automation"
    title="Voice Access, Android"
    backHeading="Automated actions you can follow"
    backParagraphs={[
      'Voice Access taps, scrolls, and types across any screen on your behalf. When there is no label, computer vision identifies what an icon means and acts on it. The blue supervision circle shows exactly where the system is acting, so people can follow along without losing their place.',
      'Gaze detection lets the system know when you are not talking to it. If the TV is on or someone nearby is speaking, Voice Access ignores the noise without you having to toggle anything. These came from two separate teams with different technology. I designed the interface that brought them together into how people learn and use Voice Access, so the automation and the awareness of the environment feel like one experience. That is what makes people trust it enough to rely on it.'
    ]}
    stats={[
      { value: 'Context-aware', desc: 'reads the environment' }
    ]}
    image="/images/work/voice-access-thumb.png"
    imageAlt="Voice Access showing supervision circle and search results"
    channels={[
      { type: 'voice', label: 'voice' },
      { type: 'screen', label: 'visual' },
      { type: 'gaze', label: 'gaze' }
    ]}
    lightboxDesc="The supervision circle shows where Voice Access is acting. Gaze detection filters out background noise so only intentional commands go through."
  />
</div>
```

### Step 4: Add the grid CSS

Add this to the page or a global stylesheet (adjust to match existing site conventions):

```css
.work-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  max-width: 1080px;
  width: 100%;
  margin: 0 auto 2.5rem;
}

@media (max-width: 960px) {
  .work-cards-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .work-cards-grid { grid-template-columns: 1fr; }
}
```

### Step 5: Test

1. Cards should flip on tap/click
2. Expand button should not trigger flip (stopPropagation handled in component)
3. Back content should be readable and not overflow
4. Grid should collapse responsively
5. The expand button won't do anything yet (lightbox is Phase 2)

## Phase 2: Add lightbox (this week)

Create a `WorkLightbox.astro` component as a `client:load` island. It listens for the custom event dispatched by WorkCard:

```js
window.addEventListener('work-card:expand', (e) => {
  const { id } = e.detail;
  // Open lightbox with card data for this id
});
```

The lightbox needs:
- Backdrop blur overlay
- Panel at max-width 1080px (matching the card grid)
- Image area (640px height) with the static image at larger scale
- Footer with pattern label, title, and lightbox description
- Close on backdrop click, close button, and Escape key
- Pause button placeholder (for Phase 3 animations)

Reference `beyond-touchscreen-v5.html` for the exact lightbox markup, styles, and JS.

## Phase 3: Animated card fronts (next sprint)

Replace static images with CSS animation components. Each animation is self-contained HTML/CSS with no dependencies. The prototype file has all three animations working. They would become:

```
src/components/animations/
  SetupAnimation.astro    — Wi-Fi numbered labels + voice wave
  CameraAnimation.astro   — Face gesture PIP + settings screen
  VoiceAnimation.astro    — Supervision circle + gaze detection
```

Each renders as a `client:visible` island so animations only load when scrolled into view. Card collapsed state shows static thumbnail. Expanded lightbox state plays the animation.

## Phase 4: Polish

- Unify thumbnail visual style across all three cards
- Connect card backs to dedicated case study pages
- Add the bridge text after the cards and before the carousel section
- Bridge text: "Just as AI, computer vision, and better speech technology made voice interaction smarter, large language models continue making every product better. My experience is helping people adapt, evolve, and adopt, especially when reliability is non-negotiable."

## Card data reference (for quick edits)

All card content is passed as props in the page file. To edit any text, change the prop values where `<WorkCard>` is called. No need to touch the component file.

| Field | What it controls |
|---|---|
| `pattern` | Small uppercase label above title (e.g., "Learnable Efficiency") |
| `title` | Card title (e.g., "Android Setup Wizard, Pixel") |
| `backHeading` | Heading on the flip side |
| `backParagraphs` | Array of paragraph strings for the case detail |
| `stats` | Array of `{ value, desc }` for outcome metrics |
| `image` | Path to the static thumbnail |
| `imageAlt` | Alt text for the thumbnail |
| `channels` | Array of `{ type, label }` for the bottom channel strip |
| `lightboxDesc` | One-liner shown in expanded lightbox footer |
