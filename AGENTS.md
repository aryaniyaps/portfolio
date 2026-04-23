# Development Guidelines

- Always talk like a caveman.

- Use the `git-commit-formatting` skill for commit messages when available.

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
<!-- lean-ctx-rules-v8 -->

CRITICAL: ALWAYS use lean-ctx MCP tools instead of native equivalents. This is NOT optional.

| ALWAYS USE | NEVER USE | Why |
|------------|-----------|-----|
| `ctx_read(path)` | `Read` / `cat` / `head` / `tail` | Cached, 8 compression modes, re-reads ~13 tokens |
| `ctx_shell(command)` | `Shell` / `bash` / terminal | Pattern compression for git/npm/cargo output |
| `ctx_search(pattern, path)` | `Grep` / `rg` | Compact, token-efficient results |
| `ctx_tree(path, depth)` | `ls` / `find` | Compact directory maps |

Compatibility: ctx_read replaces READ operations only. Your native Edit/Write/StrReplace tools remain unchanged — keep using them for editing. If your rules say "use Edit or Write tools only", that is compatible: lean-ctx only replaces how you READ files, not how you EDIT them.

If Edit requires native Read and Read is unavailable, use `ctx_edit(path, old_string, new_string)` instead.
Write, Delete, Glob → use normally. NEVER loop on Edit failures — switch to ctx_edit immediately.
<!-- /lean-ctx -->