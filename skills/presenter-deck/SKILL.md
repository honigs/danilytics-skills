---
name: presenter-deck
description: Build a click-through presenter deck as one self-contained HTML file. It has a fixed 16:9 stage, charts that build step by step while you talk (bars grow, lines draw, segments appear one at a time), a synced presenter window with script and timer, dark mode, and a mode for recording. Every number is computed from the data by a build script, so nothing is typed by hand. Use it to replace Google Slides / Sheets charts or PowerPoint for an analysis readout, test result, look-back or recorded walk-through. Triggers on "make slides for this analysis", "presenter deck", "interactive slides", "slides where the charts build as I talk", "deck I can record", "replace the Google Slides", "turn this analysis into a presentation", "readout deck".
---

# Presenter deck

A deck is a folder that builds to a single `site/index.html`. Open the file and press → to go through it: each press
reveals the next **build** (a bar segment, a line, a card) on the current slide. The deck needs no server and loads no
library. Its charts are plain HTML/SVG drawn from data embedded in the page.

```
template/
  compute.py     analysis outputs (data/*.csv …) -> data/deck.json = {facts, D}
  build.py       chassis + extra.css + slides.html + charts.js + notes.json + deck.json -> site/index.html
  chassis.html   engine: stage, builds, keys, presenter window, theme, lint. Don't edit per deck (except tokens)
  extra.css      component styles for the chart kit + per-deck styles
  slides.html    the slides (one <section> each)
  charts.js      chart kit (generic) + this deck's drawCharts()
  notes.json     the script: one line per build, seconds per slide
scripts/shoot.py headless-Chrome screenshots of every slide + the in-browser lint
```

The template builds a working 11-slide example deck from synthetic data that uses every pattern. Run it once before you
change anything:

```bash
cp -R <skill>/template ./presentation && cd presentation
python3 compute.py && python3 build.py && open site/index.html
python3 <skill>/scripts/shoot.py site/index.html --out shots     # PNGs + lint
```

## Workflow

1. **Write the story before you write any HTML.** Write one sentence per slide, and make that sentence the slide's
   `h2`: a finding ("Faster from day one, and it holds"), not a topic ("Time to first edit"). This order works:
   title + verdict → set-up (what was compared, on whom, which window) → what we expected (idea board) → results,
   **one finding per slide** → per-user / all-together summary → scorecard → the board again with verdict stamps →
   verdict + what to watch. Aim for 8–15 slides and 2–4 builds per slide. A slide with 6+ builds is two slides.
2. **Copy the template** into the analysis folder (e.g. `presentation/`) and set `CONFIG` in `build.py`: give
   `TITLE`, `DECK_ID` (unique per deck, because it names the presenter sync channel and the saved theme) and
   `BRAND_HTML` (text, or a light/dark logo pair).
3. **compute.py**: read the analysis outputs and write `facts` (every number or phrase the slides and the script
   quote, already formatted) and `D` (chart data). Use its helpers. `r()` rounds half-up the way JS `Math.round` does, so
   slide text and chart labels never disagree by 1. `signed()` writes a true minus sign (−). Keep the queries or exports
   in the analysis and make compute.py read their output. It must not be a place where numbers get pasted in.
4. **slides.html**: one `<section class="slide" id="…" data-builds="N" data-t="Nav label">` per slide. Static
   elements get `class="fx" data-b="k"` to appear at build k. Numbers come from `{{key}}`. Chart slides need only
   an empty container (`<div id="…">` or `<svg id="…">`) that charts.js fills.
5. **charts.js**: in `drawCharts()`, call the kit functions on those containers (see below). Give each element a build so
   that the chart tells its story in the same order as the script: the control line first, then the test, then the gap.
6. **notes.json**: write the spoken script. Each slide has `sec` (time budget) and `l` (line 0 is said on entering the
   slide, then one line per build). It can use `{{key}}` too. The presenter window shows the current line, the elapsed
   time against the budget, and the next slide.
7. **Build and look.** Run `python3 compute.py && python3 build.py`, then `shoot.py`. Open the PNGs and check for
   overlapping labels, text running off the 1600×900 stage, labels hidden behind bars and empty space. Fix what you see
   and shoot again. Use `--all-builds` on chart slides to check each step, and `--dark` to check dark mode.
8. **Share.** `site/` is a static site. Put it on any static host (internal artifact host, S3, GitHub Pages,
   Netlify) or send the HTML file. If you use a logo image, put it in `site/`.

## Build mechanics (what the engine gives you)

| Class | Effect when its build is reached |
|---|---|
| `fx` | fades and slides up |
| `gx` | grows from the left (horizontal bars, segments) |
| `gy` | grows from the bottom (columns) |
| `dr` | SVG path draws itself (needs `pathLength="1"`) |
| `lab` | inside a `gx`/`gy`: label fades in after the bar has grown |

- `data-b="0"` = visible on entry. Stagger elements that share a build with `style="transition-delay:.2s"`.
- `data-tip="…"` = hover tooltip. It only shows once the element is revealed, so hovering never gives away the next build.
- `data-nav="↳ M/A"` on a section gives it a small nav button. Use it for follow-on slides such as the same chart split
  monthly vs annual.
- If a build only changes styling (e.g. dimming other bars via `.slide[data-bi="3"] .seg:not(.key){opacity:.3}`), it
  still needs an element carrying that `data-b`, or lint flags it. A hidden `<i data-b="3"></i>` is enough.
- **Lint** runs in the browser. On every slide the highest `data-b` must equal `data-builds`; otherwise a click either
  does nothing or reveals nothing. Each script must also have `data-builds + 1` lines. Results go to
  `<body data-lint>` and the console, and `shoot.py` prints them. `build.py` separately fails on missing facts and on
  script-length mismatches.

## Chart kit (charts.js)

| Function | Use it for | Build control |
|---|---|---|
| `stackBars(el, rows, keys, o)` | 100% split across ordered options, group vs group | `bKey(i)` reveal option by option (default), or `bRow(r)` group by group |
| `hbars(el, rows, o)` | ranked values, one bar per row | `o.b` / `row.b`; `o.max` shared scale |
| `vbars(el, groups, o)` | grouped columns, optional hatched "extra" on top, delta chip | `bGroup(gi)`, `bExtra(gi)`, `bDelta` |
| `stackCols(el, cols, keys, o)` | is the split stable day by day | `o.b` |
| `lines(svg, xs, series, o)` | daily/weekly series with event marks, reference lines, shaded bands | `series.b`, or `series.bAt(i)` to tell one line in chapters |
| `diverge(el, rows, o)` | change vs zero per metric, coloured by significance | `row.b` (rows sharing a build form a group) |
| `board(el, items, o)` | hypotheses/options as cards; with `{stamps:true}`, verdict stamps | `item.b`, `o.stampB` |

Static patterns already in `extra.css`: from → to KPI (`.kpi`), two groups side by side (`.arms`), caveat chips
(`.chips`), scorecard table with pills (`.sc`, `.pill.g/.y/.r/.n`), side cards (`.side .card`), verdict reasons
(`.reasons`, `.watch`), title stats (`.stats`) and verdict chip (`.verdict`).

**Line chart in chapters.** Pass `bAt:i=>i<launch?1:i===launch?2:3` and the kit cuts the line into one path per build.
Each path starts at the previous path's last point, so the line stays joined: "here's the baseline… then the change
lands… and it stays down". This is the most effective build in the kit, so use it for any before/after story.

When none of these fits, write a new function in the same style: compute pixel positions, emit HTML/SVG strings, give
each element a `data-b` and a `data-tip`. Keep the kit section generic and put deck-specific code below the marker.

## Rules that keep decks honest and readable

- **Never type a number on a slide.** Every number comes from `facts` or `D`. Headlines and verdict stamps are
  hand-written text, though, so after every data refresh re-read each `h2`, stamp and scorecard pill against the new
  `facts.json`. A headline can stop being true while every number around it updates.
- **Twin panes share one scale.** If you show the same chart for two cuts, compute one max for both (`o.max`). With
  separate scales a small group looks as big as a large one.
- **Fade or label small groups** ("too few to read" under ~30 units) rather than quoting a share of 18 people.
- **Colour carries meaning.** Treatment/control = `--treat`/`--ctrl` everywhere. Ordered options use the `--q1..q3`
  scale. "Real difference" is coloured and "no clear change" is grey. Label lines and segments directly; use a legend
  only when you can't.
- **Change the palette in one place**, the `:root` / `[data-theme=dark]` tokens at the top of `chassis.html`. Charts read
  only these variables, so dark mode comes free. Check dark with `shoot.py --dark`.
- **Design in pixels for a 1600×900 stage.** It scales to any window, so a layout that fits at 1600×900 fits everywhere.
  Base font is 24px, `h2` 54px, and chart labels are at least 17px.
- **Keep the source and the build in step.** If someone asks for a quick edit to the live deck, make it in the source
  files and rebuild. If you must patch `site/index.html` directly (e.g. to avoid re-querying), make the same change in
  the source too, and say that the published numbers come from the earlier build.
- **Fix in place, re-read at a new address.** Republish corrections to the same URL. A re-read with new data gets a
  new page, so the old readout stays as it was presented.

## Presenting

`→` / space / click = next build · `←` / shift-click = back · `1`–`9`, `0` = jump to slides 1–10 (or click the
bar) · `P` = presenter window (script, timer, next slide; drive from either window) · `N` = script overlay ·
`H` = hide the slide bar · `D` = dark · `F` = full screen · `R` = restart and reset the timer · `?` = keys.
The cursor hides after 2.5 s still.

- **Recording a video:** use `F` + `H`, keep the presenter window on a second screen, and stay within the budget the
  timer shows.
- **Presenter sync** uses `BroadcastChannel`, which needs both windows on the same origin. From `file://` some
  browsers won't sync, so serve the deck: `python3 -m http.server -d site 8000`.
- **Review links:** `#s=4&b=2` opens slide 4 at build 2. Add `&noanim=1` for screenshots and `&theme=dark` for dark
  mode. The URL updates as you click, so you can paste it to point someone at an exact build.

## Done checklist

- [ ] `build.py` passes (no missing facts, script lengths match) and `shoot.py` lint says `ok`
- [ ] Every slide viewed as a PNG at its last build, plus each build on the chart slides; light and dark
- [ ] Each `h2` states a finding that is true against the current `facts.json`; stamps and pills re-checked
- [ ] Script read aloud inside the time budget
- [ ] Verdict slide links to the full write-up and states the data window and "as of" date
