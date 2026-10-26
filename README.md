# Danilytics skills

Claude Code skills for data analysts, by [Danilytics](https://danilytics.au). Each one has an interactive walkthrough on the site.

| Skill | What it does | Walkthrough | Download |
|---|---|---|---|
| [**presenter-deck**](skills/presenter-deck) | Turns an analysis into one self-contained HTML deck where charts build as you talk, with a presenter window, script, timer and dark mode. Every number is computed from the data, never typed. | [danilytics.au/skills/presenter-deck](https://danilytics.au/skills/presenter-deck.html) | [presenter-deck.zip](dist/presenter-deck.zip?raw=1) |
| [**viz-best-practices**](skills/viz-best-practices) | Picks the right chart for your message and reviews charts and dashboards for clarity and honesty. | [danilytics.au/skills/viz-best-practices](https://danilytics.au/skills/viz-best-practices.html) | [viz-best-practices.zip](dist/viz-best-practices.zip?raw=1) |

## Install

### Let your agent do it

Paste this into Claude Code (swap the skill name if you want the other one):

```text
Install the "presenter-deck" skill for Claude Code from https://github.com/honigs/Danilytics-skills/tree/main/skills/presenter-deck

1. Download https://github.com/honigs/Danilytics-skills/raw/main/dist/presenter-deck.zip to a temporary folder.
2. Unzip it. It contains one folder, presenter-deck/, with a SKILL.md inside.
3. Copy that folder to ~/.claude/skills/presenter-deck (create ~/.claude/skills if it doesn't exist; if presenter-deck is already there, ask me before replacing it).
4. Delete the temporary files, show me what was installed, and tell me in one line how to use the skill.
```

For Codex, use the same prompt with `~/.codex/skills` instead of `~/.claude/skills`.

### Or by hand

```sh
# Claude Code (use ~/.codex/skills for Codex)
curl -L -o /tmp/presenter-deck.zip https://github.com/honigs/Danilytics-skills/raw/main/dist/presenter-deck.zip
mkdir -p ~/.claude/skills && unzip -o /tmp/presenter-deck.zip -d ~/.claude/skills
```

To install for a single project instead, put the folder in that project's `.claude/skills/`.

## Layout

```
skills/<name>/     the skill itself (SKILL.md plus its files), browsable on GitHub
dist/<name>.zip    the same folder, zipped, for one-click download
```
