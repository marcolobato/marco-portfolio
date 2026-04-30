# Experiment template

A working document for drafting new Field Notes experiments before they appear on /experiments. Keep this file at the project root so it stays close at hand. It does not ship to the live site (Astro's build pipeline ignores files at the project root that aren't in `src/` or `public/`).

When you're ready to surface an experiment publicly, copy the structured content into a writing post (a markdown file in `src/content/writing/`) or into a richer entry on the /experiments page. This template is just the scratchpad.

---

## Template structure

Fill in any combination of the fields below for each new experiment. Skip anything you don't have content for yet. Field names mirror the original PharmAssist accordion structure that was removed from /experiments in commit `d05106d`.

### Title
The name of the experiment. e.g. "PharmAssist: Show, Don't Speak"

### Description (1-2 short paragraphs)
What the experiment is, what it explores, and what was being tested. Treat it like the elevator pitch: someone reading only this paragraph should know what the experiment is and why it exists.

### What I learned (bulleted)
One sentence per learning, focused on insight rather than summary. Things you didn't expect, patterns that surprised you, or design decisions that turned out to matter more than you thought.

### Notes
A paragraph or two of context. Optionally followed by a bulleted list of design concepts the experiment explored (these can map to entries in the Design concept glossary on /experiments).

### Tools
The platforms, libraries, prototyping tools, or hardware used. Worth listing even if a tool was just tried and discarded.

### Links
- Try the prototype: ...
- Read the case study: ...
- Read the related essay: ...

---

## Worked example: PharmAssist

Preserved verbatim from the original /experiments accordion before it was replaced with the cards layout in commit `d05106d`. Keeping the content here so the notes and learnings are not lost.

### Title
PharmAssist: Show, Don't Speak

### Description
A Voiceflow prototype exploring privacy-first prescription pickup. The system helps patients share personal details on screen instead of speaking them aloud, splitting voice, screen, and text into three channels based on who can perceive them. Built to test whether "default-private" can work as a design principle, not just a toggle.

### What I learned
- How to design a conversation where the most important moment is silence.
- How Voiceflow Workflows handle deterministic medical flows while leaving room for open-ended questions.
- How Cards and Messages map to "screen" and "voice" channels.
- How a follow-up text becomes the first private moment in a public interaction.

### Notes
Design concepts explored:
- Default-private (the "broken-in" principle)
- Channel splitting (screen / voice / text)
- Vague grammar as a social protocol
- Context-released information
- Cooperative recording (patient + pharmacist + system)

### Tools
Voiceflow (Workflow, Cards, Buttons, Variables, Conditions)

### Links
- Try the prototype: https://creator.voiceflow.com/share/69c42fb2bfd66a6ff39d6c1a/development
- Read the case study: /writing/pharmassist/
- Read the essay that inspired it: /writing/ai-broken-in-denim/
