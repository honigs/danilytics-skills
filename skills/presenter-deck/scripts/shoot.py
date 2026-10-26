"""Screenshot a built deck with headless Chrome and report the in-browser lint.

    python3 shoot.py path/to/site/index.html [--out shots] [--all-builds] [--dark] [--slides 3,5]

Writes one PNG per slide at its last build (or one per build with --all-builds), at 1600x900, animations off
(#noanim=1). Then loads the deck once with --dump-dom and prints <body data-lint>: "ok", or every slide whose
highest data-b doesn't match data-builds / whose script length is wrong. Exits 1 on lint problems.
Look at the PNGs: that is how you catch overlaps, overflow off the 1600x900 stage, and labels hidden behind bars.
"""
import argparse, os, re, shutil, subprocess, sys

CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "msedge",
]


def chrome():
    for c in CANDIDATES:
        p = c if os.path.isabs(c) else shutil.which(c)
        if p and os.path.exists(p):
            return p
    sys.exit("No Chrome/Chromium/Edge found; install one or add its path to CANDIDATES.")


def run(args):
    return subprocess.run(args, capture_output=True, text=True, timeout=60)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("index")
    ap.add_argument("--out", default="shots")
    ap.add_argument("--all-builds", action="store_true")
    ap.add_argument("--dark", action="store_true")
    ap.add_argument("--slides", help="comma-separated 1-based slide numbers (default: all)")
    a = ap.parse_args()

    path = os.path.abspath(a.index)
    html = open(path, encoding="utf-8").read()
    builds = [int(n) for n in re.findall(r'<section class="slide[^"]*"[^>]*data-builds="(\d+)"', html)]
    if not builds:
        sys.exit("no slides found (expected <section class=\"slide\" … data-builds=\"n\">)")
    want = set(int(s) for s in a.slides.split(",")) if a.slides else set(range(1, len(builds) + 1))
    os.makedirs(a.out, exist_ok=True)
    exe, url = chrome(), "file://" + path
    common = [exe, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1600,900",
              "--force-device-scale-factor=1", "--virtual-time-budget=2500"]
    theme = "&theme=dark" if a.dark else ""

    n = 0
    for s, nb in enumerate(builds, 1):
        if s not in want:
            continue
        for b in (range(nb + 1) if a.all_builds else [nb]):
            png = os.path.join(a.out, f"s{s:02d}_b{b}{'_dark' if a.dark else ''}.png")
            run(common + [f"--screenshot={os.path.abspath(png)}", f"{url}#s={s}&b={b}&noanim=1{theme}"])
            n += 1
    print(f"{n} screenshots in {a.out}/")

    dom = run(common + ["--dump-dom", url + "#noanim=1"]).stdout
    m = re.search(r'<body[^>]*data-lint="([^"]*)"', dom)
    lint = m.group(1) if m else "(no data-lint attribute: did the page throw before lint() ran? open it and check the console)"
    print("lint:", lint.replace(" | ", "\n      "))
    sys.exit(0 if lint == "ok" else 1)


if __name__ == "__main__":
    main()
