# Charts to Avoid & How Charts/Maps Lie

Use this to **detect deception in others' charts** and **avoid it in your own**. Dougherty's truthfulness model: **Wrong** (violates a rigid rule / misstates evidence) → **Misleading** (follows rules but unreasonably twists the data) → **Truthful** (accurate + follows rules; still has a quality spectrum). Wilke's parallel labels: **Wrong** (math error), **Bad** (perception problem), **Ugly** (aesthetic only).

---

## Charts & elements to avoid (or use with great care)

| Avoid | Why | Use instead |
|---|---|---|
| **Pie charts** (beyond ≤5 slices / single simple set) | Eyes judge angles/areas poorly; can't compare close slices | Horizontal bar ordered greatest→least; 100% stacked bar if part-to-whole matters; slopegraph for change |
| **Donut charts** | Worse than pie — compares arc lengths | Bar |
| **3D anything** (3D pie/bar/line) | Projection distorts values; front looks bigger; you read height off an invisible plane | 2D. Only true x/y/z data justifies 3D, and even then small multiples or color usually beat it |
| **Secondary / dual y-axis** | Confuses which series maps to which axis; implies a false relationship; invites scale manipulation | Two stacked charts sharing the x-axis (both y-axes on left); or direct-label the second series; or a scatter for the actual relationship |
| **Rainbow / jet color scale for values** | Nonmonotonic in lightness; emphasizes arbitrary features; fails in greyscale | Sequential or diverging perceptually-uniform scale |
| **Rotated / diagonal axis labels** | Read up to ~205% slower | Horizontal bar chart |
| **Open/outline shapes** (empty bars, open points, dashed density outlines) | Weak presence, optical illusions, can't tell inside from outside | Solid fills, light shading |
| **Stacked or overlapping histograms** | Unclear baselines; transparency reads as a third color | Age-pyramid (2 groups), parts-of-total, density plots, faceting |
| **Bubble chart for ≤3–4 variables** | Size is hard to perceive | Scatterplot matrix (position beats size) |
| **Correlograms when raw data fits** | Hides the actual data | Plot the raw data |
| **Glyph shapes to encode categories** | Requires a non-preattentive decode step | Color or small multiples |
| **Legends with many entries** | Overloads short-term memory (~4 chunks) | Direct labeling (≥~8 categories: always direct-label) |
| **Tooltips for essential info** | Invisible in print, hard on phones | Put essential info directly on the chart; tooltips for nice-to-have only |

---

## How charts lie (detect & avoid)

- **Truncated bar baseline** — bars/areas must start at zero; a non-zero baseline makes a small difference look huge. *Wrong.* (The classic Fox-News "460% visual increase for a 13% real change.")
- **Lengthened axis to flatten a line** — e.g., a ±5° scale hiding a 1° climate rise. *Misleading.*
- **Warped aspect ratio** — stretching wide flattens a rising trend; tall-narrow exaggerates it. Cairo's rough guideline: aspect ratio ~ matches the percent change. Use judgment.
- **Dual axes** — scaling each axis independently to manufacture or hide a relationship.
- **3D / tilted perspective** — distorts perceived height/area.
- **Improper log scale** — a log scale on ordinary data with no exponential reason smooths away real differences (and on bars implies wrong magnitudes — log bars must start at 1, or use dots).
- **Cherry-picked range / time window** — choosing start/end points to support a narrative.
- **Non-inflation-adjusted dollars across time** — compares incomparable units.
- **Colors that send the wrong message** — "cool" blue for rising temperature; red for something good.

## How maps lie (detect & avoid)

- **Raw counts on a choropleth** — re-draws the population map, not the phenomenon. **Normalize to rates** (per capita / %). (Measured variables already on a common scale — median age/income — don't need normalizing.)
- **Manipulated class breaks / interpolation** — the same data can put a region "mid-pack" (continuous + linear) or "top tier" (3 steps + Jenks). Both can be truthful if honestly labeled; the lie is choosing breaks to push a preconceived view. **Always make a histogram first.**
- **Modifiable Areal Unit Problem (MAUP)** — the geographic unit you choose changes the pattern; larger units hide sub-patterns. Choose the level that honestly tells the story (smaller usually wins, but not to the point of noise).
- **Map area bias** — big regions grab the eye (election maps over-weight empty rural states). Use cartograms / hex / population-square maps.
- **Projection bias** — Mercator inflates high-latitude countries. Use equal-area or compromise projections, or cartograms.
- **Exclusion bias** — omitting DC, Puerto Rico, territories erases millions; call it out or include them.
- **Don't scale Alaska down** to fit — misleading; move without scaling.

## Statistics & comparison traps (Dougherty)

- **Mean vs median** — prefer median for comparisons; it resists outliers.
- **Percent change vs percentage-point difference** — a tax 5%→6% is a *20% increase* OR a *1 percentage-point* rise, never "1% increase."
- **Correlation ≠ causation** — needs correlation + a mechanism + ruling out confounders.
- **Sampling bias** — selection, non-response, self-selection. Don't compare volunteers vs non-volunteers; randomize within volunteers.
- **Normalize before comparing** — per-capita, constant dollars, seasonal adjustment, index, z-score. Compare apples to apples.
- **Framing bias** — "5% mortality" feels worse than "95% survival"; raw counts ("20 of 400 died") amplify perceived risk.

## The ethics bottom line

Manipulating scale, breaks, or aspect ratio to reinforce your point is not OK — **one discerning viewer noticing it throws out your entire argument and your credibility.** Two different honest visualizations of the same data can both be truthful; the line is crossed when a choice is made specifically to push a conclusion the data doesn't support. Acknowledge limitations, show uncertainty (error bars; solid vs dashed for observed vs projected), and cite your sources.
