---
name: viz-best-practices
description: Data-visualization best practices and chart-selection guidance distilled from four authoritative books (Knaflic "Storytelling with Data", Wilke "Fundamentals of Data Visualization", Dougherty "Hands-On Data Visualization", Steele & Iliinsky "Beautiful Visualization"). Use whenever building, reviewing, or advising on a chart, dashboard, map, table, or report — to pick the RIGHT chart for the data/message, declutter, choose color, avoid deceptive/ineffective designs, and tell a clear story. Triggers on "which chart should I use", "what's the best way to visualize X", "review this chart/dashboard for best practices", "how do I show this data", "make this chart clearer", "is this chart misleading".
---

# Data Visualization Best Practices

A working reference for choosing and designing visualizations, distilled faithfully from four books:

- **Knaflic — *Storytelling with Data*** (business communication, decluttering, narrative)
- **Wilke — *Fundamentals of Data Visualization*** (the most systematic chart-by-purpose taxonomy)
- **Dougherty & Ilyankou — *Hands-On Data Visualization*** (practical chart/map decision rules, deception detection)
- **Steele & Iliinsky (eds.) — *Beautiful Visualization*** (design philosophy, perception, when richness helps)

Use this skill to **make a decision and justify it from the source authors**, not to give generic advice. When the four books agree, state it as a rule. When they differ (e.g., pie charts), say so and give the trade-off.

## How to use this skill

1. **Start with the decision tree below** to land on a chart family fast.
2. **Open the relevant reference file** for the detailed when-to-use rules, do/don'ts, and the authors' reasoning:
   - [references/chart-selection.md](references/chart-selection.md) — the master chart & map chooser (every chart type, when to use it, the cross-book selection tables)
   - [references/design-principles.md](references/design-principles.md) — decluttering, color, preattentive attributes, typography, layout, accessibility
   - [references/avoid-and-deceive.md](references/avoid-and-deceive.md) — charts to avoid, and how charts/maps lie (axis truncation, dual axes, 3D, map class breaks, raw counts) so you can detect & avoid it
   - [references/storytelling.md](references/storytelling.md) — context/audience, narrative structure, annotation, the "tell-show-why" frame
   - [references/tableau-playbook.md](references/tableau-playbook.md) — how to apply all of the above in Tableau
3. For full fidelity to a single author, the complete per-book distillations are in [references/books/](references/books/).

Then **apply it**: recommend or build the chart, and where useful cite the principle ("bars must start at zero — Wilke's proportional-ink rule; Dougherty calls a truncated bar baseline *wrong*").

## The decision tree — what is the message?

Pick the chart by **the question you're answering**, not by the data type (Wilke's central principle).

- **One or two numbers?** → Big **scaled number** as text with a few supporting words. Don't bury it in a chart/table. (Knaflic)
- **A lookup table where readers find their own row, or precise values matter, or mixed units?** → A **clean table** (light shading, left-align text, right-align numbers, no vertical rules). Add a **heatmap** overlay if magnitude pattern matters; **sparklines** per row for trends.
- **Comparing amounts across categories?** → **Bar chart** (horizontal if labels are long or many categories). Must start at zero. Order by value unless the category has a natural order. Use a **dot plot** if the axis shouldn't start at zero or bars would be long-and-similar.
- **Change over time / continuous trend?** → **Line chart** (no zero-baseline requirement). Many series → emphasize one + grey the rest, or use **small multiples**. Two time points across many categories → **slopegraph**.
- **Part-to-whole?** → **100% stacked bar** (esp. survey/Likert) or **side-by-side bars** for comparison. Pie only for ≤5 slices and a single simple set — and even then most authors prefer a bar. Stacked area for part-to-whole *over time*.
- **Distribution of one variable?** → **Histogram** (try several bin widths). Many groups → **boxplot / violin / sina / ridgeline**. Faithful/parameter-free → **ECDF**.
- **Relationship between two variables?** → **Scatter** (add trend line for large n). 3rd–4th variable → **bubble** (size) + color. Don't use a two-variable map — use a scatter.
- **Geographic pattern across regions?** → **Choropleth** — but **normalize to a rate, never raw counts** (raw counts just re-draw the population map). Bin into 4–6 classes; make a histogram first to pick breaks.
- **Specific locations?** → **Point map** (symbol/proportional-symbol map if each point carries a value).
- **Flow / running total (start + ins/outs + end)?** → **Waterfall**.

## The non-negotiable rules (all four books agree)

1. **Bar, column, and area charts must start at zero.** Truncating the baseline is *wrong*/misleading — it exaggerates differences. (Line charts are exempt — they encode position, not length.)
2. **Pie slices must sum to 100%**, and use pie sparingly (≤5 slices, single set).
3. **Never use 3D** to dress up 2D data — it distorts values. (Knaflic: "never use 3D"; Wilke: "unequivocally bad".)
4. **Normalize geographic data** — choropleths show rates, not counts.
5. **Every chart needs a title; every axis needs a title with units** (rare exceptions only).
6. **Declutter**: remove borders, gridlines, redundant labels, decoration. Maximize data-ink. Every element must earn its place.
7. **Use color sparingly and intentionally** — grey everything, then one accent color for what matters. Design for color-blindness (~8% of men); never rely on red/green alone.
8. **Don't use a dual/secondary y-axis** — it confuses and implies false relationships. Use two stacked charts or direct labels instead.
9. **Label directly** instead of forcing readers to a legend, whenever you can.
10. **Don't deceive** — manipulating scale, breaks, or aspect ratio to push a conclusion destroys credibility the moment one viewer notices.
11. **The plot must fill its frame, and you only know by looking at the rendered file.** Dead white space beside the axes almost always means a text element overflowed the axes and the save padded the image out to fit it. The usual culprit is a long left-anchored title or subtitle combined with `bbox_inches="tight"`: the text is not clipped, so the PNG simply grows to the right and the plot ends up stranded in the left two-thirds. Prevent it by wrapping titles and subtitles to the final axes width before saving (e.g. `textwrap.fill` sized to the figure width). **Always open the PNG before shipping it** — this class of defect is invisible in the code and obvious in the image.

When asked to review an existing chart, walk these rules plus the chart-specific ones in the references and report concrete fixes.
