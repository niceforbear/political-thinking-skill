# political-thinking-skill

[English](./README.md) · [中文](./README.zh-CN.md)

An open-source Agent Skill that gives your agent a **political-thinking lens**: a four-dimension framework for analyzing any problem involving **power, resources, rules, and people** — workplace politics, business battles, and public-sector decisions. Instead of seeing "good guys vs. bad guys", the skill guides the agent to map **who holds what position, controls which resources, wants what, and can bear what cost**, then produce a structured, principled recommendation.

## Why this exists

Two equally capable people get promoted at different speeds; one well-designed initiative hits wall after wall while a mediocre one sails through. Most people sense "an invisible hand" but can't articulate how it moves. This skill turns that intuition into a reproducible analysis workflow:

- **Dimension 1 — Stakeholders**: every decision has winners and losers; draw the interest map (who gains, who loses, who supports, who quietly resists, who waits).
- **Dimension 2 — Real power flow**: the org chart is the surface; actual power flows to those who control budgets, information aggregation, and irreplaceable capabilities.
- **Dimension 3 — Rules as dual-use tools**: rules are both order and weapon — used to protect oneself, constrain opponents, create room to maneuver, or claim fairness through procedure.
- **Dimension 4 — Time variable**: extend the timeline — some games are blitzes, some are wars of attrition; today's concession may be tomorrow's leverage ("better to push a pawn every day than checkmate once in a decade").

## What you get

A 5-phase analysis workflow with a fixed output contract:

| Phase | What happens |
| --- | --- |
| 0 Clarify | Extract scenario, decision, actors, rules, timeline; ask before assuming |
| 1 Four-dimension scan | Interest map, power-flow map, rules-usage inventory, time-axis first read |
| 2 Perspective swap | Write each side's motivation in its own interest terms (no strawmen) |
| 3 Timeline simulation | 2-3 options × 3 time horizons (3 months / 1 year / 3-5 years) |
| 4 Judgment | Structured report: conclusion, interest table, power flow, rules game, timeline, actions, red lines |

Guardrails are built in: the skill analyzes but never coaches manipulation, refuses good/bad labeling, acknowledges gray zones, and always surfaces the user's bottom lines and the worst-case cost of any recommendation.

## Scenario guides (progressive disclosure)

`SKILL.md` loads a scenario-specific reference on demand:

| Scenario | File | Covers |
| --- | --- | --- |
| Workplace | [references/workplace.md](./references/workplace.md) | Promotions, factions, credit disputes, cross-department resource fights, managing up |
| Business | [references/business.md](./references/business.md) | Negotiation, bidding, competitor moves, channel/supplier games, partner conflicts |
| Public sector | [references/government.md](./references/government.md) | Reporting lines, procedure & accountability, meetings & documents, career choices |

## Installation

**Option A — npx installer (recommended)**

```bash
npx political-thinking-skill
```

The installer auto-detects your agent's skills directory (e.g. `~/.qoder/skills`, `~/.claude/skills`, `~/.codex/skills`) and copies the skill there. Useful flags:

```bash
npx political-thinking-skill --list           # show known skills locations
npx political-thinking-skill --target <dir>   # install into a custom directory
npx political-thinking-skill --uninstall      # remove the skill
```

**Option B — git clone**

```bash
git clone https://github.com/niceforbear/political-thinking-skill.git <your-agent-skills-dir>/political-thinking
```

The skill is pure Markdown — no runtime or dependencies required. Any agent that honors `SKILL.md` can pick it up.

## Usage

Tell your agent something like:

> 用政治思维帮我分析一下：我们部门的新方案推行阻力很大，该怎么办？

or in English:

> Use the political-thinking skill to analyze my situation: I'm competing for a promotion against a peer who is closer to our VP.

The agent walks the 5-phase workflow, asks clarifying questions when key facts are missing, and returns the structured report (interest table, power-flow analysis, rules game, timeline simulation, recommended actions, red lines).

## Training mode

Ask "帮我锻炼政治思维" and the skill switches to daily-practice mode with four drills: ask *who benefits* in every meeting, extend the timeline on attitude shifts, write each side's motivation before taking sides, and accept choosing the lesser of two imperfect options.

## Disclaimer

This skill is an analytical framework for clearer judgment, not a manipulation playbook. It deliberately refuses to produce tactics for harming others. Use it to see clearly and stay principled.

## License

MIT — see [LICENSE](./LICENSE).
