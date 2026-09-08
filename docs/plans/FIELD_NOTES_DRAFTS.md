# Field Note drafts

Two drafts to react to. Both in your voice, no em dashes. Bracketed spots are where you need to
confirm facts before publishing. Do not fill them from memory of how you told the story in an
interview.

---

## Draft 1: What the coaches taught me about counting

**Suggested title options**
- What the coaches taught me about counting
- The rep counter was never for the user
- Measuring is easy. Deciding what to measure is not.

---

For a few years my 20% time at Google went to an internal fitness platform. We worked with real
coaches, and the thing I remember most is that they pushed back on the feature I was most excited
about.

I wanted to count reps. Computer vision could do it. It was a satisfying problem. Detect the
movement, count the repetition, show the number.

The coaches asked why.

Not rhetorically. They wanted to know what the person was supposed to do differently because of
that number. Their position was that you should not measure something just because you can, and
that a lot of fitness software measures in order to look serious rather than to help anyone.

I did not have a good answer at first. So we went looking.

**What the research says**

Monitoring your progress does work. There is a large meta-analysis, Harkin and colleagues in 2016,
that pooled 138 experiments covering about twenty thousand people. Prompting people to monitor
progress toward a goal made them more likely to reach it. Not a huge effect, but a real one. The
detail I found most useful is what made it stronger: the effect was larger when the information was
physically recorded, and larger again when it was visible to someone else.

The problem is that people stop. In dietary self-monitoring studies, fewer than half the
participants are still logging by week ten, and that holds across every method researchers have
tried. Early adherence runs on novelty. Novelty is not a plan.

So both things are true. Measuring helps. Asking people to measure reliably fails. That gap is the
design problem, and most fitness software pretends it is not there.

**Where the coaches were pointing**

The thing the coaches actually cared about was people getting stuck. Somebody starts a program,
does it faithfully, and stays at the same effort for weeks without realizing it.

I had assumed that was a motivation problem. It is mostly not. When you give people who are new to
training a free choice of load, they systematically pick something too light to drive adaptation.
One review put self-selected loads at around 53% of one-rep max on average. In a study of untrained
women, the loads they chose for themselves were lighter and felt easier than what a prescribed
protocol asked for, and were not sufficient for meaningful strength gains.

They are not slacking. They do not yet know what harder is supposed to feel like. That is a
calibration problem, and calibration is something a system can actually help with.

**What that changed about the design**

The rep counter stopped being a score and became a signal for the system.

Counting is cognitively expensive during a hard set. You are managing form, breathing, and the
clock, and holding a number on top of that is a real cost. Spending that cost so someone can watch
a number go up is a bad trade. Spending it so the product can notice you are ready for more, and
say so at the right moment, is a good one.

[Describe what you actually built here. Be precise about what shipped versus what was still in
flight when you left. Do not round up.]

**What I took from it**

The useful question is not what can we measure. It is what is the smallest measurement that earns
its cost, and who is it for.

Most of the time the answer is that the person should not be doing the measuring at all.

---

## Draft 2: Feedback is not a thank you note

**Suggested title options**
- Feedback is not a thank you note
- Writing the rules instead of the screens
- What we wrote down about feedback and controls

---

[Short opening: your role on the PAIR Guidebook, specifically that you co-authored the feedback and
controls sections. One or two sentences, plain.]

Most products treat feedback as a receipt. You tell the system something is wrong, the system says
thank you for your feedback, and nothing observable happens. The person learns that the control is
decorative and stops using it.

That is a bad outcome for any product and a worse one for a product that learns. If the feedback
loop is where the model gets better, then a decorative feedback control is not just rude. It is a
broken input.

[Insert the two animations here.]

[For each animation: what the pattern is, and what it is doing differently. The contrast you
described is the useful frame. A system that shows you a more fun run versus a system that says
thank you for your feedback. Say plainly what changes for the person in each case.]

**Why this was documentation and not a screen**

The part of this work I am most attached to is that it was not a design. It was a principle plus
enough documentation that other teams could apply it without me in the room.

That is a different skill from designing the thing once. You are writing for people whose product
you have never seen, whose constraints you do not know, and who will read one section and then go
build. The writing has to survive that.

[One or two sentences on how you tested or refined that. Reviews, teams that picked it up,
questions that came back. Only what you can actually verify.]

It is the same instinct behind consolidating 73 date picker variants into one. The output is not a
screen. The output is a decision other people no longer have to make badly.

---

## Publishing checklist

- Read once out loud. Anything you would not say, cut.
- Search for em dashes before committing.
- Every number traceable to a source or removed.
- Motus draft: verify shipped versus in flight before this goes public. It will get read back to
  you in an interview.
- Alt text on all images and animations. It is your field.
