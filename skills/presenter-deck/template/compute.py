"""Turn the analysis outputs in data/*.csv into data/deck.json = {"facts": {...}, "D": {...}}.

facts = every number or phrase the slides and the script quote ({{key}} placeholders), already formatted.
D     = the chart data, embedded as JSON and read by charts.js.
Nothing on a slide is typed by hand: if a number changes, it changes here. Re-run after every data refresh.

    python3 compute.py && python3 build.py

This example uses synthetic data. Replace the readers below with your own (CSV exports, a SQL client, a DataFrame…).
"""
import csv, json, os, datetime as dt
from collections import defaultdict
from decimal import Decimal, ROUND_HALF_UP

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")


def rows(name):
    with open(os.path.join(DATA, name)) as f:
        return list(csv.DictReader(f))


def r(x, d=0):
    """Round half-up, like JavaScript's Math.round, so slide text and chart labels never disagree by one."""
    q = Decimal(1).scaleb(-d)
    return float(Decimal(str(x)).quantize(q, rounding=ROUND_HALF_UP))


def pct(x, d=0):
    return f"{r(x, d):.{d}f}%"


def signed(x, d=0, unit="%"):
    return ("−" if x < 0 else "+") + f"{abs(r(x, d)):.{d}f}" + unit  # true minus sign


facts, D = {}, {}

# ---------------------------------------------------------------- window and headline counts
daily = rows("daily.csv")
days = sorted({x["DAY"] for x in daily})
LAUNCH = days[7]  # first day with the new default on; the 7 days before are an A/A check
d0, d1 = dt.date.fromisoformat(days[0]), dt.date.fromisoformat(days[-1])
facts["window"] = f"{d0.day} {d0:%b} – {d1.day} {d1:%b} {d1.year}"
facts["ndays"] = str(len(days))
facts["weekdays"] = str(sum((d0 + dt.timedelta(i)).weekday() < 5 for i in range((d1 - d0).days + 1)))
facts["restart"] = f"{dt.date.fromisoformat(LAUNCH).day} {dt.date.fromisoformat(LAUNCH):%b}"
facts["asof"] = f"{d1.day} {d1:%b} {d1.year}"
facts["sessions"] = f"{sum(int(x['SESSIONS']) for x in daily):,}"

sess = rows("sessions.csv")
users = defaultdict(int)
for x in sess:
    users[x["ARM"]] += int(x["USERS"])
facts["users_t"], facts["users_c"] = f"{users['test']:,}", f"{users['control']:,}"
facts["users"] = f"{users['test'] + users['control']:,}"

# ---------------------------------------------------------------- split by layout
sp = defaultdict(dict)
for x in rows("split.csv"):
    sp[x["ARM"]][x["LAYOUT"]] = x
D["split"] = []
for arm, name, sub in (("test", "Test", "compact default"), ("control", "Control", "standard default")):
    tot = sum(int(v["SESSIONS"]) for v in sp[arm].values())
    D["split"].append(dict(name=name, sub=sub, v={k: r(100 * int(v["SESSIONS"]) / tot, 1) for k, v in sp[arm].items()}))
facts["split_t_low"] = pct(D["split"][0]["v"]["low"])
low = sp["test"]["low"]
facts["untouched"] = pct(100 * int(low["UNTOUCHED"]) / int(low["SESSIONS"]))

# ---------------------------------------------------------------- time to first edit, daily
by = {(x["DAY"], x["ARM"]): float(x["TTFE_MIN"]) for x in daily}
D["days"] = days
D["dailyT"] = [r(by[(d, "test")], 2) for d in days]
D["dailyC"] = [r(by[(d, "control")], 2) for d in days]
D["launchIdx"] = days.index(LAUNCH)
pre = [by[(d, "test")] for d in days[: D["launchIdx"]]]
D["baseline"] = r(sum(pre) / len(pre), 2)
post_t = [by[(d, "test")] for d in days[D["launchIdx"]:]]
post_c = [by[(d, "control")] for d in days[D["launchIdx"]:]]
facts["ttfe_rel"] = signed(100 * (sum(post_t) / sum(post_c) - 1))

# ---------------------------------------------------------------- edits per session by plan (+ monthly vs annual twin)
def eps(plan=None, billing=None):
    out = {}
    for arm in ("test", "control"):
        sel = [x for x in sess if x["ARM"] == arm and (plan is None or x["PLAN"] == plan) and (billing is None or x["BILLING"] == billing)]
        n = sum(int(x["USERS"]) for x in sel)
        out[arm] = (sum(float(x["EDITS_PER_SESSION"]) * int(x["USERS"]) for x in sel) / n,
                    sum(float(x["FOLLOW_ON"]) * int(x["USERS"]) for x in sel) / n)
    return out

PLANS = ["Free", "Pro", "Team"]
D["sess"] = []
for g in [None] + PLANS:
    e = eps(g)
    D["sess"].append(dict(name=g or "All users", sub="edits per session",
                          delta=r(100 * (sum(e["test"]) / sum(e["control"]) - 1), 1),
                          bars=[dict(label=lab, v=r(e[a][0], 2), extra=r(e[a][1], 2), col=col)
                                for a, lab, col in (("test", "Test", "var(--treat)"), ("control", "Control", "var(--ctrl)"))]))
allv = eps()
facts["eps_rel"] = signed(100 * (sum(allv["test"]) / sum(allv["control"]) - 1))

D["twin"] = {}
for bill, key in (("monthly", "m"), ("annual", "y")):
    D["twin"][bill] = []
    for p in PLANS:
        e = eps(p, bill)
        D["twin"][bill].append(dict(name=p, v=r(100 * (sum(e["test"]) / sum(e["control"]) - 1), 1)))
    facts[f"{key}_users"] = f"{sum(int(x['USERS']) for x in sess if x['BILLING'] == bill):,}"
D["twin"]["max"] = max(v["v"] for b in ("monthly", "annual") for v in D["twin"][b]) * 1.1  # one scale for both panes

# ---------------------------------------------------------------- per-user summary
D["perUser"] = []
for x in rows("per_user.csv"):
    D["perUser"].append(dict(label=x["METRIC"], rel=float(x["REL_PCT"]), real=float(x["P_VALUE"]) < 0.05, b=int(x["GROUP"])))
exp = next(x for x in D["perUser"] if x["label"] == "Exports per user")
facts["exp_rel"] = signed(exp["rel"], 1)

# ---------------------------------------------------------------- ideas board: text, written by you. Re-check every stamp after a refresh.
D["ideas"] = [
    dict(tag="Idea 1", title="Compact is faster to start", desc="Less chrome on screen, so people reach the canvas sooner.", b=1, kind="yes", stamp="YES · " + facts["ttfe_rel"]),
    dict(tag="Idea 2", title="People will switch back", desc="Most users will change the default to standard.", b=1, kind="no", stamp="NO · " + facts["untouched"] + " KEEP IT"),
    dict(tag="Idea 3", title="Smaller preview, fewer exports", desc="A smaller preview might make people export less.", b=1, kind="part", stamp="NOT YET CLEAR"),
]

facts["reread"] = f"{(d1 + dt.timedelta(14)).day} {(d1 + dt.timedelta(14)):%b}"
facts["writeup_url"] = "#"

json.dump(dict(facts=facts, D=D), open(os.path.join(DATA, "deck.json"), "w"), indent=1, ensure_ascii=False)
print(f"data/deck.json: {len(facts)} facts, {len(D)} chart datasets")
