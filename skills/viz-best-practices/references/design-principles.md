# Design Principles — Declutter, Color, Perception, Layout

Synthesized from Knaflic (decluttering, preattentive attention), Wilke (color, proportional ink, balance), Steele & Iliinsky (perception, encoding).

---

## 1. Declutter — clutter is the enemy

Every element on a page costs the audience cognitive load. **Clutter = visual elements that take space but don't add understanding.** Maximize the data-ink ratio (Tufte) / signal-to-noise (Duarte).

**The declutter sequence (Knaflic), apply in order:**
1. Remove the **chart border** (use white space to separate).
2. Remove **gridlines** — or make them thin and light grey so they don't compete.
3. Remove default **data markers** (the line already shows the data; use markers on purpose).
4. Clean up **axis labels** — drop trailing zeros/decimals that add nothing; abbreviate to avoid rotated/diagonal text.
5. **Label data directly** (leverage proximity) — kill the back-and-forth to a legend.
6. Use **consistent color** between data and its labels.

**More declutter rules:**
- For each element ask: *would removing this change anything?* No → remove it. Don't keep things because they're cute or you worked hard on them.
- Push necessary-but-secondary elements to the **background** (light grey). Each de-emphasis makes what remains stand out more.
- **Avoid diagonal/rotated text** — 45° rotation is read ~52% slower, 90° ~205% slower. Switch to horizontal bars instead of rotating labels.
- **Left-justify / align** elements — clean horizontal and vertical lines. Center-alignment looks sloppy. Top-left-justify titles/legends (readers scan in a Z from top-left).
- **White space is not wasted space** — don't stretch graphics to fill it, don't add data to fill it. Use it for emphasis.
- Keep **$ , %** signs and thousands separators — don't strip them just because the title says "dollars."
- **Avoid line drawings / open shapes** (Wilke): prefer solid filled bars, filled (not open) scatter points, shaded boxplots, semi-transparent filled density areas. Solid shapes read as coherent objects.

**Gestalt principles** (why decluttering works — Knaflic): *Proximity, Similarity, Enclosure, Closure* (borders/backgrounds are unnecessary — the eye completes the shape), *Continuity* (you can drop the axis line), *Connection* (lines group points). Use light shading (enclosure) instead of borders to group; use color (similarity) to link data and its label.

---

## 2. Focus attention — preattentive attributes

You see with your brain. Short-term memory holds only **~4 chunks** of visual info — a 10-color, 10-marker, side-legend chart overloads it.

**Preattentive attributes** (processed pre-consciously, in ~200ms): position, length, size, color/hue, intensity, orientation, shape, enclosure, added marks, line width, curvature, motion. Used **sparingly**, they (1) draw the eye where you want and (2) create a visual hierarchy.

- Some attributes carry **quantitative** meaning (position, length; weakly size/intensity) → use to encode values. Others (hue/color, shape) are **categorical** → use to differentiate, not to encode magnitude.
- **Strategy: "push everything to the background first"** (grey it all out), then deliberately bring forward only what matters.
- **Relative size = relative importance.** Make the one important thing big.
- Audiences give you **3–8 seconds** to decide whether to keep looking — make the gist instant.
- The hawk-in-pigeons rule (Colin Ware): the more things you make different, the less any one stands out. Strategic contrast > making everything different.

---

## 3. Color — the most powerful tool, used sparingly

**The three fundamental uses of color (Wilke):**
| Use | Scale | Requirement |
|---|---|---|
| Distinguish groups (unordered categories) | **Qualitative** | Distinct AND equivalent (none stands out). Best for 3–5 categories; beyond ~8, switch to **direct labeling**. |
| Represent values (quantitative) | **Sequential** or **diverging** | Must vary uniformly; clearly show larger/smaller. Diverging needs a meaningful midpoint (0, 50%) and must be balanced. |
| Highlight | **Accent** | Subdued base colors + one stronger accent. Base colors must NOT compete — grey them out. |

**Rules:**
- **Default approach (Knaflic): design in grey, add one accent color** for what matters. Grey base (not black) — color pops more against grey. Blue is a safe default (color-blind safe, prints in B&W).
- **Never use a rainbow/jet scale to encode values** (Wilke) — it's nonmonotonic in lightness and emphasizes arbitrary features. Check by converting to greyscale.
- **No color for its own sake.** Rainbow bars create no insight, only distraction.
- **Use color consistently** — a color change signals a meaning change; don't recolor just to avoid boredom. If a color means something (a region, a category), reserve it for that throughout.
- **Color-vision deficiency** (~8% of men, ~0.5% of women, usually red/green): **avoid red+green together**; add a second cue (position, shape, +/− signs, saturation). Use a CVD-safe palette (e.g., Okabe-Ito 8-color) and test in a simulator (Color Oracle, Vischeck). Knaflic often uses **blue=positive, orange=negative**.
- Check every palette three ways (Dougherty): no conflicting cultural meaning (red≠good), color-blind safe, and **distinguishable in greyscale** (readers print).
- **Avoid large areas of over-saturated color** — fatigues the eye, hides labels. Prefer "earthier" tones (navy not neon, olive not lime). Use two shades per hue: light fill, dark outline/text.
- **Luminosity has inherent order** → use it for quantitative dimensions. **Hue has no order** → categorical. (Steele/Iliinsky)
- **Encode at most two data dimensions in color**; for area/circle size, scale by area (radius ∝ √value).

---

## 4. Proportional ink (Wilke)

> When a shaded area represents a value, the area must be proportional to the value.

- **Bars/areas on a linear scale must start at zero.** A truncated baseline exaggerates differences — misleading.
- Bars/areas for **differences** (change from a baseline, negatives going down) are fine if the baseline is explicit.
- **On a log scale, bars represent ratios and must start at 1** — or better, **use dots, not bars, for amounts on a log scale** (label next to the dot).
- Pie/treemap satisfy proportional ink but humans judge **distance better than area**, so the same difference looks smaller — a perceptual cost.

---

## 5. Typography, titles, layout

- **Every chart needs a title; every axis a title with units.** Omit only when self-evident. A figure has one title.
- **Use bigger axis/tick labels** — Wilke's single biggest takeaway: defaults are almost always too small. Preview at realistic size. (You can also overdo it.)
- **Action titles** (Knaflic): "Estimated 2015 spending is above budget," not "2015 Budget." State the conclusion in words.
- **Annotate directly** on the chart at the points that matter.
- Readers scan **top-left first, in a Z**. Put the most important thing there.
- **Table design** (Wilke/Dougherty/Schwabish): no vertical lines; no horizontal lines between data rows (header/frame OK); left-align text, right-align numbers with consistent decimals; light row shading if needed; headers stand out; place repeated labels only once. Figure captions go **below**; table captions go **above**.

---

## 6. Balance data and context (Wilke)

- Data-ink minimization is right **"within reason"** — both extremes are ugly. Don't strip so much that elements float in space.
- **Grid lines perpendicular to the key variable are the most useful** (horizontal lines for a y-trend; vertical for horizontal bars). Draw them light grey. With a full grid, drop the axis lines.
- **Small multiples / facets: use identical axis ranges** across panels (differing scales are misleading — warn in the caption if unavoidable). Order panels meaningfully, never arbitrarily. Label panels (a), (b)… subtly.
- Keep a **consistent visual language** across panels (same color = same thing → one shared legend).

---

## 7. Perception fundamentals (Steele & Iliinsky)

- The core challenge: **projecting high-dimensional data onto a low-dimensional canvas.** Never visualize more dimensions than exist in the data.
- The eye does **color, size, position** effortlessly and preattentively; it labors over **decoding symbols/glyphs** (a second step). Prefer color/small-multiples over glyph-shapes to encode categories.
- **Small multiples** have a long pedigree and work especially well in print (high DPI). **Color is the compensatory strength on screen** (broader gamut, less space).
- **Redundant encoding** (color + position, label + size) speeds perception and aids color-blind readers.
- **Counterintuitively, adding the right information can clarify** a complex diagram (e.g., greyscale age-coloring made a tangled history-flow more legible). But irrelevant data is noise: "if it's not helping, it's probably getting in the way."
- Use **axes to give free information** — define an axis and every mark inherits its value without extra labeling.
- Viewers track only ~4–5 moving objects; beyond that the eye gives up. (Bears on animation — see avoid-and-deceive.md and storytelling.md.)
