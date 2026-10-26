# Applying the Best Practices in Tableau

How the four books' principles translate into concrete Tableau actions. Applies to .twb/.twbx workbooks on any data source.

---

## Chart-type → Tableau mark/setup

| Want | In Tableau |
|---|---|
| Horizontal bar | Dimension on Rows, measure on Columns, Bar mark. Sort descending by the measure (or keep natural order for ordinal dims). |
| Line / time series | Continuous date (green pill) on Columns, measure on Rows, Line mark. Don't force a zero axis. |
| Slopegraph | Two date points or two conditions on Columns, measure on Rows, Line mark, label both ends. |
| 100% stacked bar | Stacked Bar + Quick Table Calc → Percent of Total along the right axis. |
| Histogram | Use the Histogram "Show Me" / create a bin from the measure. Try several bin sizes. |
| Boxplot | Disaggregate marks, then add a Box Plot from the Analytics pane. |
| Scatter | Measure on Columns and Rows, dimension on Detail; add a Trend Line from Analytics. |
| Choropleth | Geographic role on the dimension → filled map; **put a RATE on Color, not a raw count**; bin color into 4–6 steps (stepped color). |
| Proportional-symbol map | Symbol map; measure on Size (Tableau scales by area by default — keep it). |
| Heatmap table | Dims on Rows/Columns, measure on Color (single-hue sequential), Square mark. |
| Big number (BAN) | A worksheet with just the measure as Text; large font; supporting label. |

---

## Decluttering a Tableau worksheet (the default-killing checklist)

Tableau defaults are far from ideal — change them every time:
1. **Format → Lines:** turn OFF gridlines, zero lines, axis rulers you don't need; set kept gridlines to light grey, thin.
2. **Remove borders:** Format → Borders → none on rows/columns/panes. Remove the worksheet/dashboard border.
3. **Axis ticks/labels:** Edit Axis → drop the redundant axis title if you direct-label; format numbers to kill trailing zeros/decimals; keep $, %, thousands separators (Format → Numbers).
4. **Direct labels instead of legends:** turn on Mark Labels for the relevant marks (Label → "Most Recent" / "Line Ends" for lines); hide the color legend when ≤ a few series, or when you've labeled directly. With ≥ ~8 categories, always direct-label.
5. **Color:** start greyscale, one accent. Set a custom palette; use a sequential single-hue palette for quantitative color (never the default rainbow-ish "Spectrum"); set CVD-safe colors; reserve a color's meaning consistently across the workbook.
6. **Tooltips:** put only nice-to-have detail there — essential info must be visible on the chart (tooltips are invisible in print/PDF export).
7. **Titles:** give every sheet an **action title** (the insight), not just the field name. Use a worksheet caption for the "why it matters."
8. **Fonts/sizes:** bump axis & label font sizes up (Wilke's #1 fix — defaults are too small); preview at the size it'll actually be viewed.

---

## Tableau-specific gotchas (from Dougherty + practice)

- **Choropleth color defaults to a continuous linear scale and Tableau has no one-click quantile option** → it can over-highlight outliers. Use **stepped color (4–6 steps)**, and for quantile/Jenks-style breaks compute the bucket with a calculated field or table calc. Make a histogram of the measure first to choose breaks.
- **Unwanted SUM aggregation** on a map/scatter → drag the identifying dimension to Detail (or Color) to break the aggregation to the right grain.
- **Tableau Public is fully public** — never publish confidential data there. Use Tableau Server/Cloud or deliver the .twbx directly.
- **Dual axis** — Tableau makes it one click, but avoid it (see avoid-and-deceive.md). If you need two measures, use two stacked sheets sharing the x-axis, or a combined dashboard, not a synchronized secondary axis — unless it's a genuine combo (e.g., bar + reference line) where both share meaning.
- **Keep the data layer separate** — the .twbx embeds an extract, but keep the source SQL/extract reproducible so the viz is future-proof (matches the local pattern of versioned extract .sql files).

---

## A review pass for an existing Tableau dashboard

When asked to review/improve a workbook, walk these in order and report concrete fixes per sheet:
1. **Right chart?** Does each sheet's chart match its message (chart-selection.md)? Flag pies >5 slices, dual axes, 3D, raw-count maps.
2. **Honest?** Zero baselines on bars/areas; no truncated/warped axes; choropleth normalized to rates; sensible color meanings (avoid-and-deceive.md).
3. **Decluttered?** Run the checklist above.
4. **Color?** Sparing, consistent, CVD-safe, greyscale-legible (design-principles.md).
5. **Labels & titles?** Action titles, axis titles with units, direct labels over legends.
6. **Story?** Does the dashboard layout lead the eye top-left → through a narrative, with the key insight first? Tell-show-why (storytelling.md).

Steps 3–5 are mechanical and can be scripted or done in one pass; steps 1–2 and 6 need judgment about the message.
