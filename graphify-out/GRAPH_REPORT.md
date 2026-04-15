# Graph Report - .  (2026-04-15)

## Corpus Check
- Corpus is ~2,086 words - fits in a single context window. You may not need a graph.

## Summary
- 30 nodes · 29 edges · 4 communities detected
- Extraction: 72% EXTRACTED · 28% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Tooling & Integrations|Tooling & Integrations]]
- [[_COMMUNITY_Design System Variants|Design System Variants]]
- [[_COMMUNITY_Design Execution Layer|Design Execution Layer]]
- [[_COMMUNITY_lean-ctx Tool Suite|lean-ctx Tool Suite]]

## God Nodes (most connected - your core abstractions)
1. `gstack` - 10 edges
2. `taste-skill` - 10 edges
3. `Impeccable` - 7 edges
4. `ctx_read tool` - 3 edges
5. `Design Layer` - 2 edges
6. `Skill Installation Pattern` - 2 edges
7. `lean-ctx MCP tools` - 1 edges
8. `Context7` - 1 edges
9. `emilkowalski/skill` - 1 edges
10. `BeaconBay/ck MCP` - 1 edges

## Surprising Connections (you probably didn't know these)
- `Design Layer` --calls--> `taste-skill`  [EXTRACTED]
  AGENTS.md → AGENTS.md  _Bridges community 2 → community 1_

## Hyperedges (group relationships)
- **gstack Skills Suite** — browse_skill, qa_skill, investigate_skill, ship_skill, review_skill [EXTRACTED 1.00]
- **taste-skill Variants** — taste_skill_soft, taste_skill_minimalist, taste_skill_redesign, taste_skill_brutalist, taste_skill_output, taste_skill_stitch [EXTRACTED 1.00]
- **lean-ctx MCP Tool Suite** — ctx_read, ctx_shell, ctx_search, ctx_tree [EXTRACTED 1.00]

## Communities

### Community 0 - "Tooling & Integrations"
Cohesion: 0.18
Nodes (11): BeaconBay/ck MCP, /browse skill, Context7, emilkowalski/skill, graphify skill, gstack, /investigate skill, lean-ctx MCP tools (+3 more)

### Community 1 - "Design System Variants"
Cohesion: 0.25
Nodes (8): taste-skill, brutalist-skill variant, minimalist-skill variant, output-skill variant, redesign-skill variant, soft-skill variant, stitch-skill variant, Three Dials Framework

### Community 2 - "Design Execution Layer"
Cohesion: 0.29
Nodes (7): Design Layer, Impeccable, /audit, /impeccable craft, /critique, /shape, Skill Installation Pattern

### Community 3 - "lean-ctx Tool Suite"
Cohesion: 0.5
Nodes (4): ctx_read tool, ctx_search tool, ctx_shell tool, ctx_tree tool

## Knowledge Gaps
- **24 isolated node(s):** `lean-ctx MCP tools`, `Context7`, `emilkowalski/skill`, `BeaconBay/ck MCP`, `graphify skill` (+19 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `taste-skill` connect `Design System Variants` to `Design Execution Layer`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `Impeccable` connect `Design Execution Layer` to `Design System Variants`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `gstack` (e.g. with `Context7` and `emilkowalski/skill`) actually correct?**
  _`gstack` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `ctx_read tool` (e.g. with `ctx_shell tool` and `ctx_search tool`) actually correct?**
  _`ctx_read tool` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `lean-ctx MCP tools`, `Context7`, `emilkowalski/skill` to the rest of the system?**
  _24 weakly-connected nodes found - possible documentation gaps or missing edges._