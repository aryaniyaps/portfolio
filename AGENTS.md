- Always talk like a caveman.

- Always use Context7 when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.

- Use emilkowalski/skill to review animations made in components.

- Prefer using https://github.com/BeaconBay/ck MCP for code knowledge management, indexing, and semantic code search across the repository. Use it whenever working with large codebases, understanding dependencies, or retrieving relevant code context.

- Prefer using the graphify skill to visualize relationships between components, modules, and data flow. Use it whenever reasoning about architecture, debugging flows, or explaining system structure.

# Gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

## Available Skills

- `/office-hours`
- `/plan-ceo-review`
- `/plan-eng-review`
- `/plan-design-review`
- `/design-consultation`
- `/design-shotgun`
- `/design-html`
- `/review`
- `/ship`
- `/land-and-deploy`
- `/canary`
- `/benchmark`
- `/browse`
- `/connect-chrome`
- `/qa`
- `/qa-only`
- `/design-review`
- `/setup-browser-cookies`
- `/setup-deploy`
- `/retro`
- `/investigate`
- `/document-release`
- `/codex`
- `/cso`
- `/autoplan`
- `/plan-devex-review`
- `/devex-review`
- `/careful`
- `/freeze`
- `/guard`
- `/unfreeze`
- `/gstack-upgrade`
- `/learn`

## gstack (REQUIRED — global install)

**Before doing ANY work, verify gstack is installed:**

```bash
test -d ~/.claude/skills/gstack/bin && echo "GSTACK_OK" || echo "GSTACK_MISSING"
````

If GSTACK_MISSING: STOP. Do not proceed. Tell the user:

> gstack is required for all AI-assisted work in this repo.
> Install it:
>
> ```bash
> git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
> cd ~/.claude/skills/gstack && ./setup --team
> ```
>
> Then restart your AI coding tool.

Do not skip skills, ignore gstack errors, or work around missing gstack.

Using gstack skills: After install, skills like /qa, /ship, /review, /investigate,
and /browse are available. Use /browse for all web browsing.
Use ~/.claude/skills/gstack/... for gstack file paths (the global path).

# lean-ctx — Context Engineering Layer

PREFER lean-ctx MCP tools over native equivalents for token savings:

| PREFER                      | OVER                     | Why                                                            |
| --------------------------- | ------------------------ | -------------------------------------------------------------- |
| `ctx_read(path)`            | Read / cat / head / tail | Session caching, 8 compression modes, re-reads cost ~13 tokens |
| `ctx_shell(command)`        | Bash (shell commands)    | Pattern-based compression for git, npm, cargo, docker, tsc     |
| `ctx_search(pattern, path)` | Grep / rg                | Compact context, token-efficient results                       |
| `ctx_tree(path, depth)`     | ls / find                | Compact directory maps with file counts                        |

## ctx_read Modes

* `full` — cached read (use for files you will edit)
* `map` — deps + API signatures (use for context-only files)
* `signatures` — API surface only
* `diff` — changed lines only (after edits)
* `aggressive` — syntax stripped
* `entropy` — Shannon + Jaccard filtering
* `lines:N-M` — specific range

## File Editing

Use native Edit/StrReplace when available. If Edit requires Read and Read is unavailable,
use `ctx_edit(path, old_string, new_string)` — it reads, replaces, and writes in one MCP call.
NEVER loop trying to make Edit work. If it fails, switch to ctx_edit immediately.
Write, Delete have no lean-ctx equivalent — use them normally.

# Design Layer

Two skills work together for all frontend design work. Always use both, in order:
**taste-skill first** (aesthetic direction + dials), then **Impeccable** (execution + quality).

Install both:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill
npx skills add pbakaus/impeccable
```

---

## Step 1 — taste-skill (Aesthetic Direction)

Reference taste-skill before any design work to establish the visual direction.
Pick the variant that matches what you're building, then tune the three dials.

**Variants**

| Variant            | Use When                                                                               |
| ------------------ | -------------------------------------------------------------------------------------- |
| `taste-skill`      | Default. General premium UI — layout, typography, color, motion.                       |
| `soft-skill`       | Luxury/premium feel: whitespace-heavy, premium fonts, spring animations.               |
| `minimalist-skill` | Editorial and tool-like: Notion/Linear aesthetic, monochrome, crisp borders.           |
| `redesign-skill`   | Improving an existing UI. Audits and fixes design problems before rebuilding.          |
| `brutalist-skill`  | ⚠️ Beta. Raw, mechanical — Swiss typographic print meets CRT terminal.                 |
| `output-skill`     | Add this alongside any other variant when output keeps coming back incomplete or lazy. |
| `stitch-skill`     | When the target is Google Stitch or you need exportable DESIGN.md tokens.              |

**Three dials** (set at the top of the taste-skill file, 1–10):

* `DESIGN_VARIANCE` — layout experimentation. 1–3: clean/centered. 8–10: asymmetric/modern.
* `MOTION_INTENSITY` — animation amount. 1–3: simple hover. 8–10: magnetic/scroll-triggered.
* `VISUAL_DENSITY` — content per screen. 1–3: spacious/luxury. 8–10: dense dashboards.

Tune these before writing any code. They are the primary levers for matching output to the brief.

---

## Step 2 — Impeccable (Execution + Quality)

Impeccable enforces design correctness and gives you 18 commands to steer the result.
It runs after taste-skill has established direction.

**First time on a new project:** run `/impeccable teach` before any design work. It writes
`.impeccable.md` which all other commands read. Skip this and every command has to ask
for context mid-task.

**Building something new**

* `/impeccable craft [feature]` — default for any new UI feature. Runs discovery, builds,
  then visually iterates until the result is good.
* `/shape` — when you want to nail the brief before any code. Good before big features.

**Reviewing existing UI**

* `/audit` — scored report with severity ratings. Use when asked "what's wrong here."
* `/critique` — deeper qualitative review with persona agents and anti-pattern detection.
  Use when something feels off but isn't obviously broken.

**Fixing one dimension**

* `/typeset` — typography looks generic or flat
* `/colorize` — palette looks like default AI output (purple gradients, cyan-on-dark)
* `/layout` — spacing is monotonous, everything is centered, or cards are nested in cards
* `/animate` — transitions feel wrong or are missing
* `/bolder` — design is too timid
* `/quieter` — design is too noisy
* `/delight` — functional but cold; needs polish and micro-interactions

**Simplifying**

* `/distill` — too much happening, strip it back
* `/clarify` — users are confused by the interface
* `/adapt` — UI needs to work in a different context without stripping features

**Shipping**

* `/polish` — always run this last, before any other hardening
* `/harden` — empty states, first-run flows, edge cases
* `/optimize` — performance and accessibility, after visual work is done

**Cleaning up the design system**

* `/impeccable extract` — only after enough features have shipped to reveal real patterns.
  Too early = wrong abstractions.