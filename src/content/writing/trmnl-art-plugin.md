---
title: "My first TRMNL plugins: Art from The Met and Get Outside"
date: 2026-09-08
description: "Two plugins for a small e-ink screen. A painting a day from The Met, then my own photograph of the Flatirons, changing with the light and the weather."
image: "/images/writing/trmnl-art-plugin/08-flatirons-device.jpg"
cardSummary: |-
  A reminder on my desk to get outside, on a screen that does not distract me.

  I wanted to design for hardware. The first plugin was a hello world: get a picture on the screen, a different public-domain painting from The Met each day. <a href="https://trmnl.com/recipes/363349?ref=search">One already existed</a>. I built mine to learn how their API works. The second one is my own, Get Outside, Flatirons Edition, with my photograph changing through the light and the weather.

  The <a href="https://trmnl.com/">TRMNL OG</a> has no colour, no animation, and redraws every 15 minutes at most. I learned how to make a real photograph look good in eight greys.
tools:
  - label: "Claude Code in VS"
  - label: "TRMNL"
  - label: "Cloudflare Workers"
  - label: "Met Collection API"
artifact:
  image: "/images/field-notes/trmnl-flatirons-artifact.jpg"
  caption: "The Flatirons plugin on my TRMNL device, on my kitchen windowsill"
  # Empty string = plain caption, no link. The card already links to this
  # article through "Explore experiment", so a second link is redundant.
  href: ""
---

The [TRMNL](https://trmnl.com/) is built to not distract you. I wanted to build something that agreed with it.

That turned out to be a good design exercise for me. I wanted to design for hardware, and I was excited to get my hands on one of these devices and spend real time with it.

So I started with a quick hello world. Get one picture on the screen, learn the platform fast, and then make the plugin I actually wanted.

Working with Claude Code I designed, built, deployed and tested both on real hardware, each in a day. I had never shipped to hardware before. The design decisions stayed mine. The part that used to be a barrier for me stopped being one.

---

## The hello world: a painting a day from The Met

A frame that shows a different public-domain painting each day, with the date in the corner so it earns its place.

One of these [already existed](https://trmnl.com/recipes/363349?ref=search) in TRMNL's recipe list when I started. I built mine anyway. The point was learning how their API and framework fit together, and you do not learn that by installing someone else's plugin.

![An 1840 engraving of Sintra rendered in halftone dots, with its museum label and the date along the bottom](/images/writing/trmnl-art-plugin/01-cover.png)
*Running through the real pipeline. The date never gets cut, in any layout. A frame that cannot tell you the day has failed at its second job.*

The thing I had wrong at the start: I assumed the device asks my server for a page and displays it. It does not. The platform asks my server for data, renders it to a picture, and the device downloads that picture and goes back to sleep. **The device never runs my code.** That is why the battery lasts months. Anyone building on the platform learns this in the first hour, but it changed how I thought about everything after it.

### Line work survives. Dark oils do not.

This is the part I am proud of solving, and it is a design problem more than a technical one.

A 1-bit screen has two values, black and white. Prints and engravings are line work already, so they come through beautifully. Dark Baroque oils turn into a near-black rectangle.

![A dark Baroque oil painting rendered on the 1-bit screen as a near-black rectangle with almost no detail](/images/writing/trmnl-art-plugin/05-dark-painting.png)
*The painting is in there. You cannot see it.*

I spent an hour tuning contrast, which makes it worse. Pushing contrast on a dark image forces more pixels to black. The fix was not CSS. It was dithering, which scatters black and white dots in a pattern your eye reads as grey, the way newspapers printed photographs.

What I took from it is that the content has to be part of the design. Some paintings belong on this screen and some do not. I would rather change what the plugin asks for than pretend every image survives it.

### One for the group chat

I generated the marketplace preview for the plugin, ready for publishing. For a project about beautiful paintings, the API handed me an armchair.

![The plugin's auto-generated preview showing a dithered eighteenth-century upholstered armchair with its museum label](/images/writing/trmnl-art-plugin/07-marketplace-chair.png)
*An armchair. Working exactly as designed.*

It works. It pulls a random object, and The Met's collection is furniture and armour and pottery as well as paintings. I was just hoping for a beautiful painting and got a chair.

A real question rather than a joke: do I narrow the search to paintings and prints, or is a chair on a Tuesday part of the charm? I lean toward keeping it.

---

## My first plugin: Get Outside, Flatirons Edition

The Met plugin put a picture on a wall. It did not know anything about the room or the hour.

For the second one I wanted a picture of my mountains on my desk, telling me to go outside. Something that changes when it gets dark, or when the weather turns. It does not need a fast refresh, because it has nothing urgent to say.

This is where I got to spend time on visual design, which was the part I was looking forward to. Making graphics for an e-ink screen is its own craft, and I wanted to learn it.

The picture is my own photograph of the Flatirons, retouched and simplified down to three things: the mountains in the distance, the trees, and the meadow in front.

There was also a version that drew the Flatirons procedurally, and I kept it around to compare.

![Four seeds of the procedural Flatirons renderer, each producing an evenly spaced sawtooth ridge](/images/writing/trmnl-art-plugin/09-procedural-seeds.png)
*Four different seeds from the generated version. Every one gives the same evenly spaced sawtooth. The real formation is not evenly spaced.*

I wanted my own photograph on it, and it held up better than the generated one.

### Making a photograph look good in eight greys

A photograph has millions of tones. The screen has a handful.

This part was fun. I could try a study, have Claude search out different approaches for me, and then compare the results side by side straight away. That speed is what let me find the right one instead of guessing.

![An eleven-panel study of the same photograph dithered at increasing tone counts, from two up to sixteen](/images/writing/trmnl-art-plugin/10-tone-study.png)
*The same photograph at two through sixteen tones. Past eight, the returns stop.*

The first plugin had two shades. This one has eight. At the end of the first one I thought the answer was a 2-bit mode, which would have given four. The screen turned out to do 4-bit, which gives eight, and the mud I had been fighting was recoverable after all.

The pictures are dithered ahead of time and cut to the exact pixel size of the space they land in. Resizing a dot pattern destroys it.

### Masking the photograph to simulate the weather

This was the technique I most wanted to learn, and it turned out to be the part of the build I enjoyed most.

The approach is a mask: split the photograph into zones and treat each one separately. What I did not expect is that I did not have to draw it. I gave Claude the picture and it worked the zones out on its own, following the ridgeline and the treeline and handing back a mask with sky, mountain and meadow separated.

![The photograph split into three flat zones, sky in red, mountain in green, meadow in blue](/images/writing/trmnl-art-plugin/11-zone-mask.png)
*The mask. Three flat values: sky, mountain, meadow.*

![The mask laid over the photograph, sky tinted teal and meadow tinted blue, the mountain left untinted](/images/writing/trmnl-art-plugin/14-zone-mask-overlay.png)
*The same mask over the picture, so you can see where the zones land.*

The edges are softened by different amounts on purpose. Rock against sky is a hard edge. Forest against meadow is not.

Then the whole photograph gets processed three times, once for each zone's brightness and contrast, and the three versions are stacked back together through the mask. It is not one picture being brightened. It is three, blended along soft edges, which is why the treeline never looks cut out.

Time of day moves the zones **together**. The sky carries the hour, because that is what happens outside. The sky loses its light before the land loses its warmth, so at dusk the sky drops hard and the meadow barely moves.

Weather moves the zones **apart**. Storm light means the mountain keeps its sun while the meadow falls into shadow. One dial only makes a picture lighter or darker. Two dials give a day its character.

![A grid of the photograph under four combinations of weather and hour, each labelled with its ink coverage](/images/writing/trmnl-art-plugin/12-weather-on-plate.png)
*Weather against hour. Each panel is labelled with how much black it uses.*

Every picture gets checked for how much black it uses before it ships. The bottom right panel is 79% and it did not make it. On a screen with no backlight, that much ink reads as mud rather than weather.

Four times of day, three weathers, twelve pictures. All made in advance, so the device only downloads a finished one.

There is no weather service behind it. The three moods are picked from the date, twice a day. The picture does not need to be accurate. It needs each day to feel like its own day.

### Working out where the sun is

The device told me it was golden hour. It was dark outside.

The boundaries were fixed clock hours. But sunset in Boulder moves from about 16:40 in December to 20:30 in June, nearly four hours. A fixed window is right for one month a year and wrong for the other eleven.

It now works out sunrise and sunset from the sun's position at Boulder's latitude. There is no service to call, because the sun's position is just a function of the date and where you are.

```
Dec 21   computed 16:39   actual 16:38
Jun 21   computed 20:33   actual 20:32
Aug 25   computed 19:45   actual 19:47
```

This is my favourite part of the whole thing. The device works out what time the light will go on its own.

### The feature I cut

The plugin was designed around a reveal. The picture would arrive as twelve tiles, one uncovered every 75 minutes, so the image completed over a day. That was the original idea.

![The Flatirons image partly uncovered in a tile grid, with a card reading RUNNING CLUB THU 18:00](/images/writing/trmnl-art-plugin/13-reveal-ghost.png)
*The reveal, mid-uncover. On the wall it does not read as anticipation. It reads as a broken image.*

I cut it after seeing it on the wall. Someone glancing at it saw a render fault, not a picture arriving, and that is no good for an object meant to sit in a room without explanation.

It was also solving a problem that had gone away. The reveal was there to make each day look different, and the light and the weather already do that.

The code is parked behind a flag rather than deleted.

### The words

The lines on the screen are not generated. They are eighteen short strings I wrote, one set for each phase of the sun, picked by the date. "Get outside, golden hour won't wait." At night it says something else, because telling someone to go outside at 11pm is advice they know is wrong.

I wanted to be precise about that. The system puts a line in front of me for this moment without me asking for it. No prompt, no chat window, no waiting. It just arrives, next to the date.

---

## Calm tech I can build myself

![The TRMNL device on a kitchen windowsill showing the dithered Flatirons, with the real Boulder landscape blurred through the glass behind it](/images/writing/trmnl-art-plugin/08-flatirons-device.jpg)
*Boulder, 31 August 2026. The screen reads "Get outside, the light's getting good." The real mountains are behind it, out of focus, through the glass.*

It is powerful to be able to make the screens I want in my home, and to build the technology myself instead of taking whatever is on offer.

It sits in the kitchen next to a [Brick](https://getbrick.com/), a small puck you tap your phone against to shut off the apps you have decided you do not want. Both are there for the same reason. I would rather choose what comes into the kitchen than let it arrive by default.

I like the retro pixel art on it. It is not distracting, it still tells me something, and it changes through the day. That is the kind of screen I want near a dinner table, instead of the ones I keep being offered with microphones and more screens on them.

It is a prototype I built for myself, on a device I bought for myself, showing a photograph I took.

## What I want to try next

It is still on the windowsill and it is still private. I have not put it in the store, because I am not finished with it.

**Your reminder, not my encouragement.** The card is already measured, a rectangle that sits inside the meadow, the brightest and least detailed part of the frame, so text lands at full contrast and covers nothing worth seeing. The picture further up shows it holding RUNNING CLUB THU 18:00. The seam is built. Nothing is wired to it yet.

**Your mountain, not mine.** The mask that makes the weather work fits this photograph and no other. But it was worked out from the picture rather than drawn by hand, so doing the same for someone else's photograph looks possible. The open question is whether it holds up on a picture that is not a clean ridgeline against sky. That is the next thing I want to test.

**Better phrases.** Eighteen strings is not many. This is the honest place for a model to come in. Not writing into a chat window, but putting together one line for a particular hour, a particular light, and a particular reason to go outside.

I am enjoying this. Prototyping an interaction that asks less of me, playing with pixel art on e-ink, and taking more control over what I bring into my home. I want to keep sharing it, and to bring what I learn here back into my design work.

So, which of those would you want on your shelf? And if you have a mountain, or a coastline, or one particular tree you would put behind the glass instead of mine, show me. I want to know what it looks like where you are when the light goes.
