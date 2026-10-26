"""Assemble the deck: chassis.html + extra.css + slides.html + charts.js + notes.json + data/deck.json -> site/index.html.

Fails the build (exit 1) when
  - a {{key}} in the slides or the script has no value in facts,
  - a slide has no script, or its script doesn't have data-builds + 1 lines.
The browser runs one more check at load (highest data-b on each slide == data-builds); see scripts/shoot.py.

    python3 compute.py && python3 build.py
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
rd = lambda p: open(os.path.join(HERE, p), encoding="utf-8").read()

# ---------------------------------------------------------------- deck settings
CONFIG = {
    "TITLE": "Should the editor open in the compact layout? · Test readout",
    "DECK_ID": "compact-default",  # unique per deck: names the presenter sync channel and the saved theme
    # Top-right mark. Plain text, or an image that swaps with the theme:
    # '<img src="logo-light.png" data-light="logo-light.png" data-dark="logo-dark.png" alt="">' (put the files in site/)
    "BRAND_HTML": "Product Analytics",
}

deck = json.load(open(os.path.join(HERE, "data", "deck.json"), encoding="utf-8"))
facts, D = deck["facts"], deck["D"]
NOTES = {k: v for k, v in json.loads(rd("notes.json")).items() if not k.startswith("_")}
slides = rd("slides.html")

problems = []
for sid, n in re.findall(r'<section class="slide[^"]*" id="([^"]+)" data-builds="(\d+)"', slides):
    if sid not in NOTES:
        problems.append(f"no script for slide '{sid}'")
    elif len(NOTES[sid]["l"]) != int(n) + 1:
        problems.append(f"script for '{sid}': {len(NOTES[sid]['l'])} lines, expected {int(n) + 1} (data-builds + 1)")

html = rd("chassis.html")
for k, v in CONFIG.items():
    html = html.replace("{{" + k + "}}", v)
html = html.replace("{{CSS_EXTRA}}", rd("extra.css")).replace("{{SLIDES}}", slides).replace("{{CHARTS}}", rd("charts.js"))
html = html.replace("{{NOTES}}", json.dumps(NOTES, ensure_ascii=False)).replace("{{DATA}}", json.dumps(D, separators=(",", ":"), ensure_ascii=False))

missing = set()
def sub(m):
    if m.group(1) not in facts:
        missing.add(m.group(1))
        return m.group(0)
    return str(facts[m.group(1)])
for _ in range(2):  # a fact may itself contain a placeholder
    html = re.sub(r"\{\{(\w+)\}\}", sub, html)
if missing:
    problems.append("missing facts: " + ", ".join(sorted(missing)))
if problems:
    sys.exit("build failed:\n  " + "\n  ".join(problems))

os.makedirs(os.path.join(HERE, "site"), exist_ok=True)
open(os.path.join(HERE, "site", "index.html"), "w", encoding="utf-8").write(html)
json.dump(facts, open(os.path.join(HERE, "facts.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)  # what the deck says, for review/diffs
n_s = len(re.findall(r'<section class="slide[^"]*" id=', slides))
n_b = sum(int(n) for n in re.findall(r'data-builds="(\d+)"', slides))
budget = sum(v["sec"] for v in NOTES.values())
print(f"site/index.html written ({len(html) // 1024} KB): {n_s} slides, {n_b} builds, script ~{budget // 60}:{budget % 60:02d}, {len(facts)} facts")
