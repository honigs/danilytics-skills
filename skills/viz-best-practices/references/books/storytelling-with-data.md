# Storytelling with Data (Cole Nussbaumer Knaflic) — Full Distillation

## The Core Premise
- There is a difference between **showing data** and **storytelling with data**. Tools (Excel) don't know your story — you must bring it visually and contextually to life.
- "Simple beats sexy" and "don't be a data fashion victim" (lose the clipart, fancy graphics, fonts — focus on the message).
- Data visualization sits at the intersection of **science and art**. There are best practices/guidelines (science) plus an artistic component. There is rarely a single "right" answer — there are "flavors of good."

## The 6 Lessons (the book's framework)
1. **Understand the context** — who/what/how
2. **Choose an appropriate visual display**
3. **Eliminate clutter**
4. **Focus attention where you want it**
5. **Think like a designer**
6. **Tell a story**

---

## LESSON 1 — Understand the Context

**Exploratory vs. explanatory analysis:** Exploratory = opening 100 oysters to find 2 pearls (understanding the data). Explanatory = communicating those 2 pearls. *Don't make your audience reopen all the oysters.* When communicating, you should be in the explanatory space. Resist the urge to show everything as "evidence of all your work."

**Who / What / How (in this order):**
- **Who:** Be as specific as possible about your audience. Avoid general audiences ("internal and external stakeholders," "anyone interested") — you can't communicate effectively to everyone at once. Identify the decision maker. Consider your relationship with them and whether you need to establish credibility.
- **What:** What do you need the audience to **know or do**? Always want them to know or do something — if you can't articulate it, reconsider whether to communicate at all. Take a confident stance: recommend an action. If you only present data, the audience says "interesting" and moves on; if you ask for action, they must decide.
- **Mechanism:** Communication continuum from **live presentation (left)** to **written document/email (right)**.
  - Live presentation: *you* control what's seen and when; less detail needed on slides because you're there to fill gaps. Keep slides sparse — **don't use slides as a teleprompter.**
  - Written/email: audience controls consumption; needs more detail because you aren't there.
  - The **"slideument"** (one doc serving both needs) is a compromise that satisfies neither well.
- **Tone:** What emotion/tone do you want? Affects design choices.

**Don't ignore non-supporting data** — showing only data that backs your point is misleading and risky; a discerning audience will poke holes and discredit you.

**Tools for boiling down the message:**
- **3-minute story:** if you had only 3 minutes, what would you say?
- **Big Idea (Nancy Duarte):** a single sentence that (1) articulates your unique point of view, (2) conveys what's at stake, and (3) is a complete sentence.
- **Storyboarding:** "perhaps the single most important thing you can do up front." Start low-tech (whiteboard, Post-it notes, paper) so you don't form attachment to content that should be cut.

---

## LESSON 2 — Choosing an Effective Visual

She uses only ~12 chart types. Tables interact with the **verbal system** (we read them); graphs interact with the **visual system** (faster).

### Chart Selection Table

| Chart type | Use it when... | Key notes |
|---|---|---|
| **Simple text** | Just one or two numbers | Make the number prominent + a few supporting words. |
| **Table** | Mixed audience seeking their own row; multiple units | Light/minimal borders; let data take center stage. Rarely good in a live presentation. |
| **Heatmap** | A table where you want visual cues for magnitude | Color **saturation** of a single color. Include a legend. |
| **Scatterplot** | Relationship between two variables | Common in science; use sparingly in business. |
| **Line graph** | **Continuous data**, usually over time | Consistent x-axis intervals. Can show a range (min/avg/max). |
| **Slopegraph** | Two time periods/comparison points across categories | Shows absolute values + rate of change. |
| **Vertical bar (column)** | Categorical data | **Must have a zero baseline.** Multiple-series with caution. |
| **Stacked vertical bar** | Compare totals + see subcomponents | Limited use; only the bottom series has a consistent baseline. |
| **Waterfall** | Start → increases/decreases → end | E.g., headcount math. |
| **Horizontal bar** | Her **go-to for categorical data** | "Extremely easy to read." Great for long names. |
| **Stacked horizontal bar** | Totals + subcomponents; **100%/Likert** | Consistent baseline left and right. |
| **Square area graph** | Numbers of **vastly different magnitudes** | The one area-graph exception she allows. |

### Charts to AVOID
- **Pie charts — "evil."** Eye is bad at judging 2D area/angles. Replace with a horizontal bar ordered greatest→least.
- **Donut charts — worse than pies** (compares arc lengths). "Don't use donut charts."
- **3D — never use it.** "One of the golden rules." Distorts/skews; adds junk. Only exception: genuinely plotting a third dimension.
- **Secondary y-axis — generally avoid.** Takes time to map data to axis; implies a relationship. Instead: label points directly, or pull graphs apart vertically (both y-axes on the left, shared x-axis).

**General rules:**
- **Bar charts must have a zero baseline.** Doesn't apply to line graphs (relative position) but still be cautious.
- **Bar width:** wider than the gaps, not so wide you compare areas.
- **Logical ordering:** natural order if one exists; otherwise biggest-first.
- **Axis vs direct labels:** big-picture trends → keep axis (grey); specific values → label directly, omit axis.
- **Ethics:** manipulating scale is not OK.
- The right graph is "whatever will be easiest for your audience to read." Test it on a colleague.

---

## LESSON 3 — Clutter Is Your Enemy

**Cognitive load** = mental effort to process. Minimize **perceived** cognitive load. Related: Tufte's **data-ink ratio**, Duarte's **signal-to-noise ratio**. **Clutter** = elements that take space but don't add understanding.

### The 6 Gestalt Principles
1. **Proximity** — close objects seen as a group.
2. **Similarity** — similar color/shape/size seen as related.
3. **Enclosure** — enclosed objects seen as a group (light shading is enough).
4. **Closure** — eyes fill gaps → borders/backgrounds are unnecessary.
5. **Continuity** — eyes seek smooth paths → can remove the y-axis line.
6. **Connection** — connected objects (lines) seen as a group; stronger than similar color/size (but not stronger than enclosure).

### Visual order
- **Alignment:** left-justify (center looks sloppy). Top-left-justify titles/axis/legend (Z-reading).
- **Avoid diagonal elements** — 45° rotated text read ~52% slower; 90° ~205% slower.
- **White space:** don't fear it; never add data just to fill space; use it strategically for emphasis.
- **Contrast (Ware):** "easy to spot a hawk in a sky full of pigeons" — the more things you make different, the less any stands out.
- Keep **$ % ,** signs in numbers.

### The 6-step declutter sequence
1. Remove the chart border. 2. Remove gridlines (or thin grey). 3. Remove redundant data markers. 4. Clean axis labels (drop trailing zeros; abbreviate to avoid diagonal text). 5. Label data directly (proximity). 6. Consistent color between data and labels (similarity).

---

## LESSON 4 — Focus Your Audience's Attention

Three memory types: **iconic** (super fast, preattentive), **short-term** (~4 chunks), **long-term**.

**Preattentive attributes** (Few): orientation, shape, line length/width, size, curvature, added marks, enclosure, hue, intensity, spatial position, motion.
- Some carry **quantitative** meaning (length, position; weakly width/size/intensity). Hue does NOT — use as a categorical differentiator.
- Used **sparingly**, they draw attention and create a visual hierarchy.
- Audiences give **3–8 seconds** to decide whether to keep looking.
- **Strategy: "push everything to the background first"** (grey it out), then bring forward what matters.

### Size
**Relative size = relative importance.** Make the one important thing BIG.

### Color — used sparingly
- **Design in grey, pick one bold accent.** Base is grey (not black) — color pops more against grey. Blue is a good default (CVD-safe, prints in B&W).
- **Use sparingly** — avoid "rainbowland." Prefer varying saturation of a single color.
- **Use consistently** — a color change signals a change in topic. Reserve a color's meaning.
- **Design for the colorblind** (~8% men, ~0.5% women, red/green). Avoid red+green; add another cue. She uses blue=positive, orange=negative.
- **Tone:** color evokes emotion; consider cultural connotations.
- **Brand colors:** pick one or two as look-here cues; keep the rest muted.

### Position on page
Audiences start **top-left**, scan in **Z/zigzag**. Put the most important thing top-left.

**"Where are your eyes drawn?" test:** look away, look back, note where your eyes land first.

---

## LESSON 5 — Think Like a Designer

**Form follows function:** decide what the audience should *do*, then build the form that enables it.

### Affordances
1. **Highlight the important stuff** (≤~10% of the visual). Bold > italics/underline. UPPERCASE for short labels. Color sparingly, usually with another technique. Size signals importance. Layer attributes. Avoid blinking.
2. **Eliminate distractions.** "Would eliminating this change anything?" No → remove. Summarize when detail isn't needed. Push secondary items to the background (grey); detail to an appendix.
3. **Create a clear visual hierarchy.** Super-categories ease interpretation.

### Accessibility
- "It shouldn't take an engineering degree to understand your graph." Bad design is the designer's fault, not the user's.
- "If it's hard to read, it's hard to do" (Song & Schwarz). Legible consistent font, plain language, define jargon.
- **Text is your friend.** Every chart needs a title; every axis a title. State the conclusion in words. Use **action titles** ("Estimated 2015 spending is above budget"). Annotate important points directly.

### Aesthetics — "make it pretty?" YES
- People perceive prettier designs as easier to use, tolerate flaws, use them longer.
- Three levers: smart color, alignment, white space.

### Acceptance
People resist the new. Articulate benefits; show before/after; offer options + seek input; get an influential person on board.

---

## LESSON 6 — Tell a Story

**Why story:** stories stick (McKee — people aren't inspired by reason alone; story unites idea + emotion). Story = balance → upset → struggle → resolution.

**Narrative structure (3-act):**
- **Beginning** — setup, main character (= the audience), imbalance, desired state. Conflict = "what is vs what could be" (Duarte).
- **Middle** — convince of the need for action.
- **End** — **call to action**; tie back to the beginning.

**Narrative flow:** chronological (credibility) or lead-with-the-ending (trust established).

**Repetition** → long-term memory. **Bing, Bang, Bongo:** tell them what you'll tell them → tell them → recap.

**Clarity checks:** horizontal logic (titles tell the story), vertical logic (slide self-reinforcing), reverse storyboarding, fresh perspective.

---

## Case Study Strategies
- **White backgrounds** preferred. If dark required, black is baseline and white/yellow pop.
- **Animation:** start with a blank graph and reveal/highlight as you narrate; circulate a single annotated version. Use only Appear/Disappear.
- **Spaghetti graphs:** emphasize one line at a time; separate spatially (small multiples) with identical axes; or both. Consider showing less data.
- **Pie alternatives:** show the numbers; simple bar; 100% stacked horizontal bar; slopegraph.

## Where to Go From Here
- **Practice.** Learn your tools (examples built in Excel; Tableau great for exploratory + Story Points). Iterate on paper; use the "optometrist approach" (change one thing, compare A/B). Devote real time — the communication step is the only part the audience sees. Build a visual library from good examples. Find your style.

## Memorable Verbatim Principles
- "Pie charts are evil." / "Never use 3D." / "Don't use donut charts."
- "Clutter is your enemy: ban it from your visuals!"
- Hawk-in-pigeons (Ware); data-ink ratio (Tufte).
- "Preattentive attributes can help our audience see what we want them to see before they even know they're seeing it."
- "Relative size denotes relative importance… make it BIG!"
- "If it's hard to read, it's hard to do." / "Perfection… when you have nothing to take away."
- "The story is not for you; the story is for them."
- "There is a story in your data. But your tools don't know what that story is."
