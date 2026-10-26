# Fundamentals of Data Visualization (Claus O. Wilke) — Full Distillation

Wilke's organizing principle: group charts **by the message they convey** (how large, how composed of parts, how related), NOT by number/type of variables. A visualization must first be accurate ("must not mislead or distort") and second be aesthetically pleasing.

---

## 1. The "Ugly / Bad / Wrong" Framework

| Label | Meaning | Nature |
|---|---|---|
| **Ugly** | Aesthetic problems, otherwise clear | Taste (bad colors, prominent grid, three fonts, rotated labels, misalignment) |
| **Bad** | **Perception** problems | Unclear/confusing/deceiving (each bar its own y-scale; alphabetical ordering of amounts) |
| **Wrong** | **Math** problems | Objectively incorrect (no y-scale; pie slices summing to >100%) |

---

## 2. Foundations: Aesthetics, Scales, Coordinates

- **Aesthetics** = features data maps onto: position, shape, size, color, line width, line type. Position/size/color/line-width can encode continuous; shape/line-type only discrete.
- **Scales must be one-to-one.** Typical figure uses ~3 scales (2 position + color); up to 5 feasible.
- **Axes/Scales:** same units both axes → square grid. Log scale: natural for ratios and many-orders-of-magnitude data; midpoint is **1**, 0 is at −∞; axis title is the variable name (not "log of"), specify the base; **ratios should never be on a linear scale**. Square-root scale: natural for areas (allows 0). Polar/curved: for periodic data.

---

## 3. Color — The Three Fundamental Uses

| Use | Scale | Requirements |
|---|---|---|
| **Distinguish groups** | **Qualitative** | Distinct AND equivalent (none stands out). Best for 3–5 categories. |
| **Represent values** | **Sequential / Diverging** | Perceived to vary uniformly. Multihue follows natural dark→light gradients. |
| **Highlight** | **Accent** | Subdued base + stronger accents; base colors must not compete. |

- Diverging = two sequential scales joined at a light midpoint; must be balanced; use with a meaningful midpoint.
- **Pitfalls:** don't encode >8 categories in color (use direct labeling); no color for its own sake; avoid large over-saturated areas; **never use rainbow/jet to encode values** (nonmonotonic lightness; check in greyscale).
- **CVD** (~8% males, 0.5% females): red–green dangerous for deutans/protans; blue–green for tritans. Sequential scales generally safe. Test in a simulator. Recommended palette: **Okabe-Ito** 8-color.

---

## 4. Directory of Visualizations — Taxonomy by Purpose

### Master selection table

| Purpose | Chart | Guidance |
|---|---|---|
| **Amounts** | Bar (vert/horiz) | Start at 0; horizontal for long labels. |
| | Grouped bars | Two categoricals; comparison across groups hard. |
| | Stacked bars | Only when the **sum is meaningful**; best ≤2 stacks. |
| | Dot plot | When axis needn't start at 0, or values large & similar. |
| | Heatmap | Large category×category sets. |
| **Distributions** | Histogram | **Try multiple bin widths**; equal width. |
| | Density | Kernel/bandwidth-dependent; better for multiple distributions; verify tails. |
| | ECDF | Faithful, no parameters; descending for heavy tails. |
| | Q-Q | Tests fit to a reference distribution. |
| | Boxplot | Many distributions; won't show bimodality. |
| | Violin | Shows full shape incl. bimodality; need enough points. |
| | Strip/jitter | Sparse data; don't over-jitter. |
| | Sina | Violin + jitter (points + shape). |
| | Ridgeline | Many distributions or trends over time (~100). |
| **Proportions** | Pie | Parts-of-whole, simple fractions, very small data; bad for many slices/comparison/time. |
| | Side-by-side bars | Best for direct comparison; loses part-to-whole. |
| | Stacked bars | Good for multiple sets/time series; clean only with 2 stacks. |
| | Stacked densities | Proportions along a continuous variable. |
| **Nested proportions** | Mosaic | Two orthogonal categoricals, full coverage. |
| | Treemap | Subdivisions distinct per group; labels fit inside. |
| | Parallel sets | >2 grouping variables. |
| **x–y** | Scatter | Two quantitative variables. |
| | Bubble | 3rd var via size; size hard to perceive. |
| | Scatterplot matrix | All pairwise (≤3–4 vars); position beats size. |
| | Correlogram | >4 vars; abstract, hides raw data. |
| | Paired scatter (x=y line) | Paired data, many points. |
| | Slopegraph | Paired data, few observations; care about identity. |
| | Line graph | x is time/ordered; line = "guide to the eye." |
| | Connected scatter | Two responses over time; must show direction/time. |
| **Geospatial** | Choropleth | Best for **densities**; 4–6 discrete bins. |
| | Cartogram | Distort area ∝ another quantity. |
| **Uncertainty** | Error bars | State what they represent. |
| | Graded error bars | Multiple confidence levels. |
| | Confidence band | Uncertainty of a fitted curve. |
| | Quantile dot plot | Frequency framing; few dots. |

---

## 5. Amounts — Do/Don't
- **Order bars by value** unless the factor is ordered (keep age-band order). Alphabetical/arbitrary = bad.
- Avoid rotated tick labels → use horizontal bars.
- Stack only when the sum is meaningful.
- For few values, print the numbers and drop the axis.
- Dot plot over bars when bars would be too long/similar.

## 6. Distributions
- Histograms/density are interpretations (parameter-dependent); ECDF/Q-Q are parameter-free.
- Don't use stacked or overlapping histograms. For two distributions: age-pyramid or parts-of-total.
- Don't summarize a distribution with a single mean±error bar.
- Heavy-tailed data → log-transform; power laws → straight line on descending log-log ECDF.

## 7. Proportions
- No single ideal. Pie wins for parts-to-whole / majority point; side-by-side for comparison; stacked for 2-category time series. Add a 50% reference line for majority crossover.
- A combined pie summing to >100% is **wrong**.
- Mosaic needs orthogonal full-coverage categories; treemap doesn't. Show actual counts/%.

## 8. x–y, Time Series, Trends
- **Position beats size beats abstract derived quantities.** Prefer scatterplot matrices over bubbles; raw data over correlograms.
- Line graphs: lines are a "guide to the eye." Direct-label lines over legends. Fill under the curve only if y starts at 0.
- **Trends:** smoothing (moving average, LOESS, splines/GAM) vs fitting a functional form (preferred when possible). The same data can be smoothed many ways — be careful. Prefer fitting a line to log-transformed data over an exponential to raw data. Log-linear (exp → straight), log-log (power law → straight). Time-series decomposition: trend + seasonal + remainder.

## 9. Geospatial
- Projection trade-off: conformal (Mercator, area-distorting) vs equal-area vs compromise (Robinson, Winkel tripel).
- Don't scale Alaska down (misleading).
- Add scale bar + north arrow.
- Choropleth best for densities; 4–6 bins; light backgrounds for print, dark for screen.

## 10. Uncertainty
- Readers treat points as exact. **Frequency framing** (quantile dot plots) — humans judge counts better than areas.
- **Don't confuse SD and SE.** 95% CI ≈ ±2 SE. Always state which/what level.
- Don't judge significance by error-bar overlap — check the CI of the difference.
- Even a straight-line fit gives a curved confidence band.

## 11. Proportional Ink
> The area of a shaded region must be proportional to its value.
- Bars on a linear scale must start at 0. Truncation is wrong/misleading.
- Bars for differences (from a baseline) are valid if the baseline is explicit.
- On a log scale, bars represent ratios and must start at 1 — or use dots for amounts.
- Direct-area charts (pie/treemap): humans judge distance better than area — a perceptual cost.

## 12. Overlapping Points
Escalation: partial transparency → jittering (don't over-jitter) → 2D/hex bins → contour lines → facet into small multiples for many groups.

## 13. Redundant Coding
- Encode the same variable in multiple aesthetics (color + shape) to survive CVD/greyscale/small sizes.
- Match legend order to perceived data order.
- **Best: design figures that need no legend** via direct labeling.
- Two shades per hue (light fill, dark line/text).

## 14. Multipanel Figures
- Small multiples: **identical axis ranges**; order panels meaningfully; label (a),(b)… subtly.
- Consistent visual language across panels (one shared legend). Align all panels' axes.

## 15. Titles, Captions, Legends, Tables
- **Every figure needs a title; axes and legends need titles with units.** Don't make readers guess.
- Caption begins with the title (an assertion), not "This figure shows…".
- **Table rules:** no vertical lines; no horizontal lines between data rows; left-align text, right-align numbers with consistent decimals; headers aligned with data. Figure captions below; table captions above.

## 16. Balance Data and Context
- Data-ink minimization "within reason" — both extremes are ugly.
- Remove redundant frames; light-grey major grid lines; **grid lines perpendicular to the key variable are most useful.**
- For paired data, draw the x=y line, not a background grid.

## 17. Use Larger Axis Labels
"If you take away only one lesson" — labels are probably too small; defaults are poor. Preview at realistic print size. You can also overdo it.

## 18. Avoid Line Drawings
Prefer solid filled shapes over outlines (bars, points, boxplots, semi-transparent density fills).

## 19. Don't Go 3D
- Gratuitous 3D is "unequivocally bad" — distorts data.
- 3D position scales require a noninvertible 3D→2D projection — viewers can't recover positions. Use color/size/shape or small multiples.
- Appropriate 3D: interactive/rotatable views, genuine 3D objects.

## 20. Miscellaneous
- File formats: PDF (vector) for publication; PNG for online/line-art; JPEG only for photographs. Store originals at max quality.
- Prefer **programmatic, reproducible** generation. Separate content (data, mappings, scales, plot type) from design (colors, fonts). Avoid manual post-processing.

## 21. Telling a Story
- Supply a story or the audience invents one. Story arc: tension → resolution; usually a sequence of figures.
- **"Make a figure for the generals":** assume a busy audience; **less is more**; never assume they can process complex displays.
- Build up to complexity. Make figures memorable (broad audiences) but weight clarity for technical ones; use images to represent data, not decorate.
