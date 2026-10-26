# Hands-On Data Visualization (Dougherty & Ilyankou) — Full Distillation

Overarching philosophy: data visualization is an **interpretive skill, not a science** — few rigid rules; most cases have several plausible solutions. Mantra: **"never blindly accept the default; explore how different designs affect the appearance of your interpretation; use your best judgment to tell true and meaningful data stories."**

---

## 1. Core Framing & Decision Logic
- **"Compared to what?"** (Tufte) — every visualization is fundamentally a comparison; make it fair.
- **Two factors drive every choice:** (1) the **format of your data**, (2) the **kind of story** you want to tell.
- **Just because data CAN be charted doesn't mean it SHOULD.** Sometimes a table or plain text is better.
- **Truthfulness model:** **Wrong** (misstates evidence / breaks a rigid rule) → **Misleading** (follows rules but twists the data) → **Truthful** (accurate + follows rules; still a quality spectrum). Two different visualizations of the same data can both be truthful.

---

## 2. Chart Selection Decision Rules (their Table 6.1)

| Story / Data goal | Chart | Key rule |
|---|---|---|
| Compare categories side-by-side | Grouped bar/column | Each series = its own color. |
| Compare categories in separate clusters | Split bar/column | Leave cells blank where comparison isn't appropriate. |
| Compare sub-categories / parts of a whole | Stacked bar/column | Often better than multiple pies (rectangles read more precisely than slices). |
| Show margin of error | Error bars | (Google Sheets: per-series only.) |
| Distribution of raw data | Histogram | Continuous data, **no gaps**; adjustable buckets; precursor to choropleth design. |
| Parts of a whole | Pie | Caution; ≤5 slices. |
| Continuous data / change over time | Line | Encodes by **position and angle**, not height. |
| Add context/notes | Annotated line | Annotations answer "so what?"; avoid chart junk. |
| Many lines users can toggle | Filtered line | Show only some on startup. |
| Parts of a whole + over time | Stacked area | Components + combined total. |
| Gaps / inequalities | Range chart (dot) | Emphasizes distance between two values. |
| Relationship between two variables | Scatter | Correlation ≠ causation. |
| Relationship among 3–4 variables | Bubble | Size (3rd, numeric) + color (4th, categorical); time via animation. |
| Compare trends across many rows | Sparklines in a table | Word-sized charts. |

**Key contrasts:** line (continuous change) vs range (inequality gaps); histogram (continuous, no gaps) vs column (categorical, gaps); stacked bar > multiple pies; horizontal bar when labels are long; scatter (not a two-variable map) when relationship is the story; table when readers look up a row / need precise values / there's no spatial pattern.

---

## 3. Map / Geospatial Selection (their Table 7.1)

| Goal | Map | Rule |
|---|---|---|
| Specific locations, categories | Point map with icons | Point data; popups. |
| Locations with a data value | Symbol / proportional-symbol | Encode value via circle size/color. |
| Patterns across regions | Choropleth | **Requires normalized values.** |
| Density / clusters | Heat map | Hotspots. |
| Guided tour | Story map | Scrolling narrative. |
| Routes | Polyline | Colors for categories. |
| Most current data | Live map (open-data) | Auto-updates; breaks if feed stops. |

**Point vs polygon:** specific locations → point/symbol map; boundaries → choropleth. Points can be pivoted into polygon data (sum per county).

**Map design rules:**
- Does location really matter? A chart/table may be better.
- **Map ONE variable, not two.** Don't overlay symbols on a choropleth. If relationship is the story → scatter, or pair choropleth beside a scatter.
- **Smaller geographies** reveal sub-patterns (MAUP) — but too granular becomes noise.

### Choropleth color & intervals
- Palette type (ColorBrewer): **sequential** (low→high), **diverging** (around a midpoint), **qualitative** (categories). Same data, different story: sequential emphasizes the high extreme; diverging emphasizes the division.
- Intervals: **steps** (thresholds, easy legend match) vs **continuous** (subtle neighbor differences). 4–6 classes; too many makes differences invisible.
- Interpolation — **make a histogram first**: **linear** (evenly distributed / extremes), **quantiles** (skewed / middle diversity), **natural breaks (Jenks)** (compromise). **Avoid custom manual breaks** (most likely to mislead). Use the full color range.

### Normalize — the #1 map rule
- **Show rates, not raw counts.** Raw counts just re-create a map of population centers. (COVID cases per state → just the populous states; per 100k → the true epicenter.)
- Measured variables already on a common scale (median age/income) don't need normalizing.

---

## 4. How to Lie with Charts & Maps

### Charts
- **DON'T truncate the bar/column/area baseline — must start at zero.** *Wrong.*
- **Line charts do NOT require a zero baseline** (encode position/angle) — no uniform rule, which is why they're manipulable.
- **DON'T lengthen the vertical axis to flatten a line** (misleading).
- **DON'T warp the aspect ratio.** Cairo's rough guideline: aspect ratio ~ matches percent change.
- **DON'T use dual vertical axes** — confusing, don't show the relationship, invite mischief. Use a scatter instead.
- **DON'T compare non-inflation-adjusted dollars across time.**
- Watch wrong-message colors; avoid 3D and tilted perspectives.

### Maps
- DON'T map raw counts where rates belong.
- Manipulating class breaks/interpolation changes the story; both can be truthful if honestly labeled — the lie is choosing breaks to push a view. Make a histogram first.
- Avoid manual settings tuned to a preconceived point.

### Percentages & language
- **Mean vs median** — prefer median (resists outliers).
- **Percent change** vs **percentage-point difference** — 5%→6% is a 20% increase OR 1 pp, never "1% increase."
- **Correlation ≠ causation** (needs mechanism + ruling out confounders).

### Sampling biases
- Selection, non-response, self-selection. Don't compare volunteers vs non-volunteers; randomize within volunteers.

### Cognitive / spatial biases
- Cognitive: confirmation, pattern (brains see patterns in noise), framing (5% mortality vs 95% survival; raw counts amplify risk).
- Spatial: map area bias (use cartograms/hex/square maps), projection bias (Mercator inflates high latitudes), disputed-territory bias, exclusion bias (DC/PR/territories).

---

## 5. Chart & Map Design Principles
- **Title is most important** — short, clear, tells a story ("Pandemic Hits Black and Latino Population Hardest"). Hybrid: story title + technical subtitle.
- Always include **Notes, Data Sources, Credits** beneath.
- Show **uncertainty** (error bars; or state in text; solid vs dashed for observed vs projected).
- **Tooltips for nice-to-have only** — essential info must be visible (invisible in print/phone).

**The two rigid rules:** (1) bar/column/area charts must begin at zero; (2) pie slices must sum to 100%.

**Declutter:** white background; justify every element; avoid chart junk (no 3D, shadows, thick outlines, unnecessary colors).

**Pie:** part-to-whole only, ≤5 slices, sort largest→smallest clockwise from 12 o'clock.

**Labels:** don't make readers tilt their heads (rotate → horizontal bar); order categories logically (alphabetical for lookup, by value for comparison, by time); label directly.

**Axes/numbers:** natural equally-spaced increments; thousands separators; log scale only for genuine exponential growth.

**Color:** monochromatic often suffices; complementary/analogous harmony; avoid pure saturated colors (use earthier); check three ways — no conflicting meaning, colorblind-safe, greyscale-legible.

**Tool selection — 10 factors:** easy-to-learn (top priority), free/affordable, powerful, supported, portable, secure/private, collaborative, cross-platform, open-source, accessible. "The best tool is the one you're already using." Keep data files separate from presentation software.

---

## 6. Table Design (Schwabish)
Use a table when readers look up a row / need precise comparison / no spatial pattern.
1. Headers stand out. 2. Light row/column shading. 3. Left-align text, right-align numbers. 4. Avoid repetition (label once). 5. Group and sort to highlight patterns. 6. Color to highlight outliers.
Cross-tabs: independent variable in column headers; calculate percentages **vertically** so each value of the independent variable totals 100%.

---

## 7. Data Prep
- Time series: in a **table** put dates horizontally; in a **chart tool** put dates vertically (transpose to convert).
- Each series its own column → its own color.
- Sourcing discipline: meaningful filenames (source + topic + date), a notes/metadata tab, a backup of the original.
- Recognize bad data: nulls (0/−1 as "missing"), missing leading zeros (zip 06106→6106), files stopping at 65,536 rows / 255 columns, inconsistent dates, bad geocoding (Null Island 0,0; "Kansas" center-of-US dumping).
- Question the data: full definitions, collection method (ACS margins of error), shifting categories over time.
- **Normalize before comparing** (per capita, constant dollars, seasonal adjustment, index, z-score).

---

## 8. Telling the Story
- **"Tell — Show — Why"**: tell what you found, show the evidence, remind why it matters. "Describe the forest, not every tree — but point out a few special trees."
- Storyboard: problem → question → data → (insight → evidence → why) × N → conclusion.
- One-sentence summary at top of each viz; why-it-matters at bottom. Data visualizations don't speak for themselves.
- Build credibility: truthful representation, cite/source, show your work, disclose uncertainty/limitations.
- Prefer interactive formats where it serves the audience — but tailor to format.

### Tool gotchas
- Google Sheets: no in-chart source links/annotations; per-series error bars only.
- Datawrapper: best for annotations, range/scatter/bubble/choropleth control, sparkline tables; pair with a spreadsheet for joins.
- Tableau Public: all output is public; **defaults to linear choropleth color, no easy quantile** → may over-highlight outliers (compute breaks via table calc); drag dimension to Detail/Color to break unwanted SUM.
- ColorBrewer designed for steps. Socrata live maps break if the feed changes.
