---
title: "Art from The Met: designing a plugin for an e-ink device"
date: 2026-07-27
description: "A day spent learning to design for a 1-bit screen, ending with a working plugin deployed to real hardware."
image: "/images/writing/trmnl-art-plugin/01-cover.png"
cardSummary: |-
  A wall display that shows a different public-domain painting from The Met each day, with the date in the corner so it earns its place. Built, deployed and running in a day.

  I wanted to design for a physical object rather than another browser window. A 1-bit e-ink screen has no colour, no animation, no hover state, and redraws every 15 minutes, so every habit from web design either transfers or gets in the way. I designed four layouts with a rule for what gets cut as space shrinks, then found the real bugs by rendering it and looking: a painting squeezed to zero width, dark oils turning to mud, type that vanished on the larger device. It started as a prototype and ended as a functional plugin.
tools:
  - label: "Claude Code in VS"
  - label: "TRMNL"
  - label: "Cloudflare Workers"
  - label: "Met Collection API"
artifact:
  image: "/images/field-notes/trmnl-art-plugin-artifact.png"
  caption: "A painting a day on your own device. Get my TRMNL plugin."
  # Placeholder: points at the TRMNL store index until the plugin is published.
  # Swap for the plugin's own recipe URL once the publishing licence arrives.
  href: "https://trmnl.com/integrations"
---

I've wanted to design for a physical device for a while. Not another screen in a browser, but an object that sits on a shelf and quietly tells you something.

TRMNL is a small e-ink display that runs custom plugins, and it turns out anyone can write one. So I picked something I actually wanted on my wall: a frame that shows a different public-domain painting from The Met each day, with the date in the corner so it earns its place.

Learning to design for this thing was the fun part. A 1-bit screen has no colour, no animation, no hover state, and it redraws every 15 minutes. Every habit from web design either transfers or gets in the way, and finding out which is which took the whole day.

What excites me is bigger than the plugin. The distance between *"I know what this should look like"* and *"it runs on the device"* used to need a developer. Working with Claude Code I designed, built, deployed and tested a real interface for consumer hardware in a day, having never shipped to hardware before. The design decisions stayed mine. The part that used to be a wall stopped being one.

This is what I built today.

---

*What follows is the end-of-day note I wrote for myself. I work asynchronously by default, a habit from Q.ai where my colleagues in Israel were asleep while I worked, so an update had to stand on its own or wait a day. The principle holds anywhere: write it so someone picking it up cold can act on it, or disagree with a decision, without needing a call.*

**Status:** Deployed and rendering. One delivery step still pending.
**Needs input:** hardware choice (bottom of this note)

## Where it landed

Live on Cloudflare Workers, rendering through TRMNL's pipeline.

Where it started this morning: a plain web page in flat grayscale, no date.

![The first prototype: a Gauguin painting in flat grayscale with a simple caption underneath, no date and no dithering](/images/writing/trmnl-art-plugin/02-first-prototype.png)
*The first prototype. Recognisably the same idea, but a web page pretending to be a device.*

Where it ended: the same idea, dithered, running through the real pipeline.

![The finished plugin in the TRMNL playlist: an 1840 engraving of Sintra rendered in halftone dots, with its museum label and the date along the bottom](/images/writing/trmnl-art-plugin/01-cover.png)
*The same concept, running through the device pipeline. Understanding why the first version was the wrong thing to build took most of the day.*

## The thing I had wrong at the start

I assumed the device asks my server for a page and displays it. It doesn't:

```
Platform servers  →  ask my URL for data
                  →  render it to a 1-bit image
Device            →  wakes, downloads the image, sleeps
```

**The device never runs my code.** No CSS, no API calls, no browser. It downloads a finished picture and sleeps. That is why the battery lasts months, and why the screen only updates every 15 minutes.

Flagging it because it reframed everything downstream. If you're picking this up, start here.

## Decisions I made (push back if you disagree)

**1. A plugin gets four layouts, not one.** It depends on how much screen it shares with other plugins.

![Four renders of the same plugin side by side at different sizes: full screen, half horizontal, half vertical, and quadrant](/images/writing/trmnl-art-plugin/03-four-layouts.png)
*The same plugin at four sizes. You don't design one and hope.*

So I wrote a content gradient, showing what gets cut as space shrinks:

| Layout | Painting | Title | Artist · date | Date |
|---|---|---|---|---|
| Full | ✅ | ✅ | ✅ | ✅ |
| Half horizontal | ✅ | ✅ | ✅ | ✅ |
| Half vertical | ✅ | ✅ | ❌ | ✅ |
| Quadrant | ✅ | ❌ | ❌ | ✅ |

**2. The date never gets cut.** In any layout, including the failure state. Reasoning: a frame that can't tell you the day has failed at its second job. Everything else is negotiable.

**3. The artist credit is the first thing to go.** The painting and the date are the point. Debatable. If you think attribution matters more than a slightly larger image, say so and I'll flip it.

**4. Museum tombstone convention:** title in italics, then artist and date. Because that's what the content *is*, and "looks like a museum label" was the goal.

None of these were technical calls. They're the part that needed a designer.

## What I got wrong

Worth writing down so nobody repeats it.

**A fix created a worse bug.** A wide handscroll was cropping, so I added a rule letting the image shrink. That let a long title claim the whole row and squeeze the painting to **zero width**. One layout showed nothing but text.

![A plugin layout containing only a long italic title and the date, with no painting visible at all](/images/writing/trmnl-art-plugin/04-vanished-painting.png)
*The painting is not small here. It is gone, squeezed to zero width by a long title.*

**I spent an hour on the wrong problem.** Dark oil paintings render as mud on a 1-bit screen. I assumed CSS and tuned contrast, which makes it *worse*, because pushing contrast on a dark image forces more pixels to black.

![A dark Baroque oil painting rendered on the 1-bit screen as a near-black rectangle with almost no detail visible](/images/writing/trmnl-art-plugin/05-dark-painting.png)
*Prints and engravings are line work and survive 1-bit beautifully. Dark oils do not.*

The right tool was dithering, which scatters black and white pixels in patterns the eye reads as grey, the way newspapers printed photographs. The deeper answer is that it's partly a **panel capability** question. 1-bit means two values; other configurations do four or sixteen. No CSS closes that.

**Same category error with type.** I hardcoded `20px`. It looked right on the small screen and tiny on one with 3.5× the pixels. The framework had device-adaptive text classes the whole time, the same idea as using a type scale in Figma instead of typing numbers.

![The plugin on the larger device model, where the artist credit line is rendered so small it is barely readable](/images/writing/trmnl-art-plugin/06-type-scale.png)
*Type sized in fixed pixels for the small screen, shown on a device with 3.5× the pixels.*

**Every one of those was found by rendering it and looking.** None showed up in code review. That's the argument for keeping a designer close to the build loop rather than at the start of it.

## Nearly-shipped bug worth flagging

The date was computed server-side, and servers run UTC. I'm in Denver, six hours behind. Every evening after 6pm the frame would have shown **tomorrow's** date, and it looked perfect all day in testing.

```
Real moment:       8:00pm Monday July 27, Denver
WITHOUT timeZone:  Tuesday, July 28   ← wrong
WITH timeZone:     Monday, July 27    ← correct
```

Caught by simulating a UTC clock before deploying rather than after. If you're building anything date-facing across timezones, do that check.

## Still open

**Delivery to a physical screen isn't confirmed yet.** The plugin renders correctly in the platform's own preview, but nothing has reached a display. The log shows check-ins with nothing sent, and I rate-limited myself by testing too eagerly, so I'm waiting it out before debugging further. The order came with a virtual device, so I can keep building while the hardware ships.

**Hardware: decided. I ordered a TRMNL OG.**

I looked at three other routes first. A used Kobo ($20 to $90) needs no jailbreak, just a file copy, and the Aura ONE at 7.8" is closest to the canvas I designed against. An Android e-ink tablet ($150 to $400) runs the official app with the least fiddling and the most cost. An old iPad I already own is free and works today, but it's LCD rather than e-ink, which defeats the point of a thing that should look like paper on a wall.

I went with the OG knowing it's the constrained option. The X has sixteen native grey levels and would handle dark oils better. Two things changed my mind: TRMNL's own dithering turned out to be far better than my local previewer suggested, and the OG supports a 2-bit mode I hadn't switched on, which gives four levels instead of two. Between them, most of the mud I was seeing is recoverable.

What's left is a curation question rather than a hardware one. If dark Baroque oils never render well, I can change what the plugin asks for. That's a design decision I'd rather own than buy my way out of.

Everything up to the order cost nothing. The four layouts, the type scale, the truncation rules and the failure states were all designed and tested before any hardware existed.

## One for the group chat

I generated the marketplace preview image today, ready for when the plugin is published. For a project about beautiful paintings, the API handed me this:

![The plugin's auto-generated marketplace preview showing a dithered eighteenth-century upholstered armchair with its museum label](/images/writing/trmnl-art-plugin/07-marketplace-chair.png)
*An armchair. Working exactly as designed.*

It pulls a random object, and The Met's collection is furniture and armour and pottery as well as paintings. But it's a useful accident: it shows that *"random public-domain artwork"* is a much wider net than *"painting,"* and my search query is doing more work than I'd given it credit for.

Genuine open question rather than a joke: do I narrow the query to paintings and prints, or is a chair on a Tuesday part of the charm? I lean toward keeping it. A frame that occasionally shows you a beautifully dithered eighteenth-century chair is more interesting than one that never surprises you.
