# Chart & Map Selection — Master Reference

Choose the chart by **the message / question**, not the data type (Wilke). Two factors drive every choice (Dougherty): (1) the **format of your data** and (2) the **kind of story you want to tell**.

Quick principle hierarchy when in doubt:
- **Position beats length beats angle beats area beats color-shade** for reading quantitative values. Prefer encodings high on that list.
- If a chart doesn't make a pattern clearer than a table or a sentence would, **use the table or the sentence**.

---

## Master selection table (by purpose)

### Amounts / comparing categories

| Chart | Use when | Rules & reasoning |
|---|---|---|
| **Bar / column** | Comparing a value across categories | **Must start at zero.** Order by value unless the category is naturally ordered (age bands, time). Bars wider than the gaps between them. |
| **Horizontal bar** | Long category names, or many categories | Knaflic's go-to: easy to read, labels fit, eyes hit the label before the value. Use instead of rotating x-axis labels. |
| **Grouped bars** | A value across two categorical variables | OK for a moderate number of groups; cross-group comparison is harder. Each series = its own color. |
| **Stacked bars** | Totals **and** subcomponents | Only when the **sum is itself meaningful** (counts/totals, not medians/means). Best with ≤2 stacks — internal segments have shifting baselines and are hard to compare. |
| **Dot plot (Cleveland)** | Bars would be impractical | When the axis needn't start at zero, or values are large and similar (long bars draw the eye to the middle, not the endpoints). |
| **Heatmap** | A category × category grid of magnitudes | Map categories to x & y, value to color **saturation of a single hue** (not rainbow). For large grids where bars/dots get busy. Always include a legend. Ordering of rows/cols matters as much as bar ordering. |
| **Big number (text)** | One or two numbers | Make it prominent with a few words. A chart/table robs single numbers of impact. |

### Change over time / trends

| Chart | Use when | Rules & reasoning |
|---|---|---|
| **Line chart** | Continuous data, usually over time | **No zero-baseline requirement** (encodes position/angle). x-axis intervals must be evenly spaced. The connecting line implies connection — don't use for unconnected categories. Fill under the line only if y starts at 0. |
| **Multiple lines** | Several series over time | Emphasize one line + grey the rest, OR use **small multiples** with identical axes. Avoid the "spaghetti graph." |
| **Slopegraph** | Two time points (or two conditions) across categories | Shows absolute values (points) + rate of change (slope) at once. Best when lines don't all overlap. Can extend to a few time points. |
| **Stacked area** | Part-to-whole **over time** | Shows each component and the combined total. Watch shifting baselines on inner bands. |
| **Connected scatter / phase portrait** | Two response variables over time | Reveals cycles/spirals. **Must** show direction & time (arrows or color gradient) or it's a "meaningless scribble" (Wilke). |
| **Sparklines** | Trend per row in a table | Word-sized charts (Tufte); blend table lookup with trend scanning. |

### Part-to-whole / proportions

| Chart | Use when | Rules & reasoning |
|---|---|---|
| **100% stacked horizontal bar** | Part-to-whole, esp. survey/Likert | Consistent baseline on far left AND far right — easy to compare end segments. Keep axis labels to read either direction. |
| **Side-by-side bars** | Comparing the fractions directly, or many pieces | Best for comparison; loses the part-to-whole feel. |
| **Stacked bars** | Proportions across multiple sets / time series | Good for time series; awkward for a single set. |
| **Pie chart** | A single, simple set, ≤5 slices, where parts-of-a-whole / a simple fraction (½, ⅓) is the point | **Contested.** Knaflic: "evil," replace with a bar. Wilke/Dougherty: acceptable in narrow cases. Slices **must sum to 100%**. Sort largest→smallest, start at 12 o'clock clockwise. Never for comparison, many slices, or time series. |
| **Donut** | — | Worse than pie (compares arc lengths). Knaflic: don't use. |
| **Treemap** | Nested proportions, subdivisions distinct per group | Better space use than nested pies; labels fit inside. Show actual counts/percentages (areas are hard to judge). |
| **Mosaic plot** | Two orthogonal categoricals, each level combines with each | Both width & height vary. Requires full coverage of observations. |
| **Stacked density** | Proportions changing along a continuous variable | — |

### Distributions

| Chart | Use when | Rules & reasoning |
|---|---|---|
| **Histogram** | Distribution of one continuous variable | Intuitive but **bin-width-dependent — always try several bin widths.** Equal-width bins. No gaps between bars (vs. column chart). Great precursor to designing choropleth breaks. |
| **Density plot** | Smoother view; comparing several distributions | Depends on kernel/bandwidth. Tails can run into impossible regions — verify. Unreliable for few points. |
| **Boxplot** | Many distributions at once, compactly | Median, IQR box, whiskers to 1.5×IQR, outliers beyond. **Won't reveal bimodality.** |
| **Violin / sina** | Like a boxplot but want the full shape | Shows bimodality. Sina = violin + jittered points (each point + the shape). Check enough points per group first. |
| **Strip / jitter** | Raw points, sparse data | Jitter to fight overplotting — but don't over-jitter (misrepresents data). |
| **Ridgeline** | Many distributions, or distributions over time | Staggered densities; scales to ~100. Use densities, not overlapping histograms. |
| **ECDF** | Faithful, parameter-free view | Shows all data, no bin/bandwidth choice. Descending ECDF for heavy tails (power laws → straight line on log-log). Less intuitive. |
| **Q-Q plot** | Does data follow a reference (usually normal) distribution | Points on the x=y line ⇒ good fit. |

### Relationships (x–y)

| Chart | Use when | Rules & reasoning |
|---|---|---|
| **Scatterplot** | Two quantitative variables | The archetype. Add a **trend line** (LOESS/linear) for large n. Correlation ≠ causation. |
| **Bubble chart** | 3rd (size) and 4th (color) variable | Size is hard to perceive — small differences vanish; **scale by area (radius ∝ √value), never by radius.** |
| **Scatterplot matrix** | All pairwise relationships, ≤3–4 variables | Position beats bubble-size; prefer over bubbles. |
| **Correlogram** | >4 variables | Show correlation coefficients as colored/size-scaled tiles. Abstract — hides raw data; prefer raw data when feasible. |
| **Paired scatter (x=y line)** | Paired data, many points | Points scatter symmetrically around x=y if only noise. |
| **Range / dumbbell** | Gap between two values per category (inequality) | Emphasizes the distance between two points. |

### Geospatial (see also avoid-and-deceive.md for map deception)

| Chart | Use when | Rules & reasoning |
|---|---|---|
| **Point map** | Specific locations / categories | Custom icons; popups for detail. |
| **Symbol / proportional-symbol map** | Locations each carrying a value | Encode value via circle **size** (scale by area) and/or color. |
| **Choropleth** | Pattern across regions (polygons) | **Normalize — show rates/densities, NOT raw counts** (raw counts re-draw the population map). Bin into **4–6 classes**; make a **histogram first** to choose breaks. Choose smaller geographies to avoid hiding sub-patterns (MAUP). |
| **Heat map (density)** | Clusters/density of points | Hotspots for high frequency. |
| **Cartogram / hex / square map** | Avoid area & projection bias | Size regions by population/electoral weight so big empty regions don't dominate. |

### Uncertainty

| Chart | Use when | Rules & reasoning |
|---|---|---|
| **Error bars** | Show a range/margin | **State what they are** (SD vs SE vs CI level). Don't judge significance by overlap — check the CI of the *difference*. |
| **Graded error bars** | Multiple confidence levels | Thicker/darker = lower confidence; combats reading bars as hard limits. |
| **Confidence band** | Uncertainty of a fitted curve/line | Even a straight-line fit gives a curved band. |
| **Quantile dot plot** | Communicate a distribution to non-experts | Frequency framing — countable dots; use few (~10 beats 50). |
| Solid vs **dashed** line | Observed vs projected/forecast data | Simple, honest distinction. |

---

## When NOT to make a chart

- **One/two numbers** → text. **Lookup / precise values / no spatial-visual pattern** → table.
- **Geographic data but location isn't the story** → a bar/line/scatter or table may be better. Don't map by reflex.
- **The relationship between two variables is the story** → scatter, not a two-variable map.
- Before building anything: *does this visualized pattern actually matter to the story?* A good chart costs real time — only build it if it earns its keep.

## Choosing map color intervals (Dougherty)

1. Make a **histogram** of the values first.
2. Pick palette type via ColorBrewer: **sequential** (low→high), **diverging** (around a meaningful midpoint), **qualitative** (categories).
3. Pick interpolation: **linear** (evenly distributed data / emphasize extremes), **quantile** (skewed data / emphasize middle diversity), **natural breaks/Jenks** (compromise). **Avoid arbitrary custom breaks** — most likely to mislead.
4. Steps vs continuous: steps for thresholds and easy legend-matching; continuous for subtle neighbor differences. 4–6 classes is the sweet spot.

See [books/](books/) for each author's full taxonomy and reasoning.
