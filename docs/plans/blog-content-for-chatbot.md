# Blog Content Index for AI Chatbot

Author: Marco Lobato — Interaction Designer
Site: marcolobato.info
Email: marcolobato.ux@gmail.com

Marco is an interaction designer who works at the intersection of multimodal AI, voice systems, accessibility, and physical computing. He calls himself a "tech weaver" — someone who weaves technology into physical spaces so interfaces become invisible. His writing is personal essay, technically fluent, never flashy.

---

## Theme 1: Privacy, Context & Multimodal AI

These three posts form a connected series. The essay introduces the philosophy, then two prototypes test the ideas in practice.

---

### Multimodal AI should fit like broken-in denim

- **Date:** 2026-03-20
- **Slug:** /writing/ai-broken-in-denim
- **Summary:** A design essay arguing that multimodal AI should feel like peripheral vision — present but not staring. Draws on Marco's years designing assistive technology at Google (Voice Access for Android) to propose that the best AI companions reduce friction without asking, know when silence builds more trust than any response, and treat restraint as a design decision. Uses Google's Project Astra as a lens.
- **Topics:** multimodal AI, Project Astra, assistive technology, accessibility, privacy, contextual AI, Google Voice Access, peripheral vision, restraint in design

**Key ideas:**
- Multimodal interaction only matters if it creates less friction. Capability is not the same as value.
- The design question is not what the assistant can do — it is what it should choose not to do. Restraint is the hardest interaction to ship.
- The bus scenario: an AI companion reads directions out loud and every person on the bus now knows where you are going. The AI answered correctly but never asked whether speaking aloud was the right choice.
- Screen privacy is a design problem — who can see the screen without permission is part of the experience. Marco's team at Google explored this 9 years ago for Voice Access; Samsung now ships Privacy Display as a flagship feature.
- Pre-washed denim metaphor: technology usually requires you to adapt to it before it adapts to you. Multimodal AI can offer the opposite — arriving already fitted to your context.
- Four pharmacy scenarios sketch how an AI companion would perceive, decide, and hold back in a single real-world trip.

---

### PharmAssist: Show, Don't Speak

- **Date:** 2026-03-25
- **Slug:** /writing/pharmassist
- **Summary:** A working prototype built in Voiceflow that explores what happens when your phone becomes the private channel at a pharmacy counter. The screen carries specifics (name, insurance, medication) and your voice stays social and vague. Introduces "deictic privacy" — coaching people to speak in words that communicate with the pharmacist while meaning nothing to bystanders.
- **Topics:** privacy, voice UI, Voiceflow, deictic privacy, channel splitting, default-private design, pharmacy UX, accessibility, multimodal AI, cooperative recording
- **Prototype link:** https://creator.voiceflow.com/share/69c42fb2bfd66a6ff39d6c1a/development

**Key ideas:**
- Three channels, one interaction: the screen carries specifics (private data on phone cards), your voice stays vague ("it's right here," "here's my info"), and a text message arrives later with full details.
- Deictic privacy: coaching people to use deictic expressions ("that," "there," "those") — words that only resolve if you share context with the listener. Linguistics concept applied as a privacy pattern for AI assistants.
- Default-private: privacy is on before you ask. The system assumes bystanders exist. Opting out ("I'm with a caregiver") is warmer than opting in ("enable privacy mode").
- Channel splitting: screen for specifics, voice for social, text for follow-up. Each channel carries what it is best at based on who can perceive it.
- Context-released information: the system knows everything from the QR scan but releases details only through the right channel at the right time.
- Cooperative recording: the patient asks, the pharmacist answers, the system records. The system does not replace the human expert — it makes the conversation more valuable.
- Built using Voiceflow Workflows (deterministic, step-by-step) rather than Playbooks (AI reasons freely), because prescription pickup is a regulated process where order matters.
- The pharmacist is still the expert — the system gives patients permission to ask questions and keeps a record.
- Designed for: a woman who would rather not say her medication name, a person whose friend (not caregiver) drove them, a patient too uncomfortable to hold up the line with questions, people with disabilities who cannot always control who is nearby.

---

### PrivacySim: Practice at the Counter

- **Date:** 2026-03-30
- **Slug:** /writing/privacysim
- **Summary:** A virtual human built on Tavus that coaches pharmacists to protect personal information at the counter. The AI plays the customer; Marco plays the pharmacist. When he says a medication name aloud, the face tells him what he just gave away. Flips the PharmAssist concept: instead of coaching the patient, it trains the person behind the counter.
- **Topics:** virtual humans, Tavus, privacy simulation, pharmacist training, deictic privacy, channel splitting, default-private, conversational AI, accessibility

**Key ideas:**
- The virtual human made corrections stick faster than text. A face saying "you just told everyone my medication" is harder to dismiss than a chat message.
- Barge-in capability: unlike training videos, a virtual human lets you interrupt, retry, and get feedback on your second attempt in the same breath. Correction loops took about 10 seconds.
- Training the pharmacist changes the power dynamic. The pharmacist has the screen. The pharmacist decides whether to read information aloud. The customer should never have to ask them to stop.
- Four channels expanded from PharmAssist's two: voice stays vague, screen confirms without naming, the face holds emotional weight, text delivers private details later (designed for Apple Watch).
- The face did not break the "peripheral vision" metaphor from the denim essay — it sharpened it. Quiet when things went well, present when Marco slipped.
- Stakes beyond discomfort: people leaving domestic violence situations, managing mental health conditions, or living with disabilities pay the highest price when clerks read information aloud.
- Built with Tavus free tier: stock replica, custom persona system prompt, knowledge base document. No code beyond a curl request.
- System prompt placement matters — first instruction sticks hardest. Prompt handles personality; knowledge base handles scenario details.

---

## Theme 2: AI as a Design Collaborator

These three posts form a series about using AI tools to learn, explore, and make — "tiny experiments" done in public.

---

### Learning in Public: Why I'm Sharing a Week of Tiny Experiments

- **Date:** 2025-05-14
- **Slug:** /writing/learning-in-public
- **Summary:** The series introduction. Inspired by Anne-Laure Le Cunff's book Tiny Experiments, Marco frames a hypothesis: using AI to explore design areas where he wants to deepen his understanding could accelerate discovery. Over one week, he explores five tech products and designs an improvement for each.
- **Topics:** learning in public, tiny experiments, AI tools, creative process, design practice, PACT goals

**Key ideas:**
- Hypothesis: using AI to explore design areas of interest could accelerate discovery of products and industries to contribute to.
- PACT goal: explore five tech products in one week, design an improvement for each.
- Themes explored: semiotics, AI interaction patterns, 3D/drawing tools, growth and onboarding.
- Tools used: ChatGPT (ideation, transcription), MidJourney Draft + Conversational Mode (rapid visual design), Firebase Studio (low-fi functional prototyping), mind maps.
- These are working notes, not case studies. Shared to learn in public, connect with others, and build a writing habit.
- Background: years working on complex products — Android System UI, assistive technology, accessibility of design systems across Google products. Now craving the joy of learning for its own sake.

---

### My First Tiny Experiment: Digitizing Physical Spaces

- **Date:** 2025-05-19
- **Slug:** /writing/digitizing-physical-spaces
- **Summary:** Marco explores Matterport's mobile 3D scanning app, focusing on onboarding friction. He redesigns the home screen and tutorial flow to prioritize getting users to their first digital twin capture faster. Inspired by Halide's focused, one-step-at-a-time tutorial approach.
- **Topics:** 3D scanning, digital twins, Matterport, onboarding UX, mobile UX, iOS design, AR, tutorial design

**Key ideas:**
- Matterport's onboarding had three different tutorial UI patterns (checklist, modal cards, full-page walkthrough) — inconsistency added friction.
- Redesigned to one unified layout with iOS-native navigation, progress indicators, and in-context guidance.
- Key improvements: persistent list actions (visible but disabled before first job), light theme for bright environments, action-oriented copy ("Create your first digital twin"), iOS-native button styles.
- Reduced onboarding to 3 essential steps. Removed the checklist that relied on strikethrough text.
- Created a clickable prototype walkthrough.
- Learning approach inspired by a college architecture course: "Pensando con arquitectura" — thinking through making, reconstructing flows from scratch to understand craft decisions.
- Deepened interest in tools that bridge the physical and digital — 3D spaces and digital twins.

---

### Can AI Teach Design Theory? Designing Strain and Recovery Icons for my Fitness Wearable

- **Date:** 2025-05-20
- **Slug:** /writing/ai-and-design-theory
- **Summary:** Marco uses ChatGPT to learn semiotics theory, then applies it to design icons for WHOOP's strain levels (restorative, optimal, overreaching). Tests metaphors across fidelities — from hand sketches to MidJourney to a Firebase Studio prototype widget.
- **Topics:** semiotics, icon design, WHOOP, fitness wearables, ChatGPT, MidJourney, Firebase Studio, design theory, rapid prototyping, widget design

**Key ideas:**
- WHOOP's iPhone widget shows strain/recovery percentages but lacks icons or labels for glanceable interpretation. A strain score of 18/21 could mean peak performance or overtraining depending on context.
- Used ChatGPT to learn semiotics: signifier vs. signified, semes (underlying themes). Made theory approachable through tables and examples.
- Process: semiotics learning, context input (WHOOP documentation), reference icon creation, thematic divergence, iterative sketching, semiotic mapping table, MidJourney refinement, Firebase Studio prototyping.
- Two metaphor families explored: fitness symbols (feather, target, bicep) and nature/growth (sprout in shield, bonsai, fruiting tree).
- Key insight: stepping back from high fidelity to hand sketches clarified meaning faster. Outline style fit the widget's limited real estate.
- MidJourney's Draft + Conversational Mode felt like sketching with a friend — natural, iterative, flow-preserving.
- Firebase Studio prototype: a widget showing random strain values with dynamic icons, generated from a single text prompt.
- Completed in one day — from curiosity to concept with AI tools.

---

## Cross-cutting Concepts

These ideas appear across multiple posts and represent Marco's core design thinking:

| Concept | Definition | Posts |
|---------|-----------|-------|
| **Deictic privacy** | Coaching people to speak in deictic expressions ("that," "here," "those") that communicate with the intended listener while meaning nothing to bystanders | PharmAssist, PrivacySim |
| **Default-private** | Privacy is on before you ask. The system assumes bystanders exist. No toggle needed | PharmAssist, PrivacySim, Broken-in Denim |
| **Channel splitting** | Each communication channel carries what it does best based on who can perceive it: screen for specifics, voice for social, text for follow-up, face for emotional weight | PharmAssist, PrivacySim |
| **Peripheral vision** | The best multimodal AI should feel like peripheral vision — always building context without demanding attention, present when it matters, quiet when it should be | Broken-in Denim, PrivacySim |
| **Restraint as design** | What the assistant chooses not to do is as important as what it can do. Restraint is the hardest interaction to ship | Broken-in Denim |
| **Cooperative recording** | Three participants: patient asks, pharmacist answers, system records. The AI does not replace the expert — it makes the human conversation more valuable | PharmAssist, PrivacySim |
| **Broken-in denim** | Technology that arrives already fitted to your context — you do not earn the comfort, it comes shaped to you. The opposite of stiff leather that you break in | Broken-in Denim, PharmAssist |
| **Learning in public** | Sharing unfinished work, working notes, and process — not polished case studies | Learning in Public, all posts |

---

## Tools & Platforms Referenced

| Tool | Used for | Posts |
|------|----------|-------|
| ChatGPT | Conversational ideation, semiotics learning, narrative shaping | Learning in Public, AI and Design Theory |
| MidJourney (Draft + Conversational Mode) | Rapid visual design, icon iteration | Learning in Public, AI and Design Theory |
| Firebase Studio | Low-fi functional prototyping (widget prototype) | Learning in Public, AI and Design Theory |
| Voiceflow | Conversational prototype (Workflows, Cards, Buttons) | PharmAssist |
| Tavus | Conversational video AI, virtual human persona | PrivacySim |
| Matterport | 3D scanning app (subject of redesign) | Digitizing Physical Spaces |
| WHOOP | Fitness wearable (subject of icon design) | AI and Design Theory |
| Gemini | Screen-aware coding assistant during Voiceflow learning | PharmAssist |

---

## Marco's Background (from the posts)

- Years designing assistive technology at Google, including Voice Access for Android
- Worked on Android System UI, novel interaction models for assistive technology, accessibility of design systems used across hundreds of Google products
- Deep experience with people with disabilities — caregivers, screen privacy needs, contextual accessibility
- Architecture school background ("Pensando con arquitectura" — thinking through making)
- Uses WHOOP fitness tracker daily
- Based on writing style: thoughtful, technically fluent, draws connections between linguistics, design theory, and real-world interaction
