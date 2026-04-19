# Blog Writing Style Guide — Aryan Iyappan

Extracted from analysis of 5 published posts. This is the single source of truth for writing style.

---

## Voice & Tone

**Profile: Approachably Technical.** Write like a senior engineer explaining to a peer over coffee — confident, clear, occasionally opinionated, never condescending.

- **Semi-formal.** Complete sentences, proper grammar, but avoid academic stiffness.
- **Occasional casual phrasing** is natural: "This is not very efficient and won't scale after a point", "Let's dive into the setup"
- **Humor is dry and sparse**, deployed through memes/images rather than written comedy.
- **Pragmatist first.** Always ground theory in practical implementation. "Here's how to actually do this" over "here's why this is cool."
- **Honest about trade-offs.** Never present a solution as perfect. Always show limitations.
- **Iterative thinker.** Show progressive refinement — naive approach → identify flaws → improved version.

### Pronoun Rules
- **Technical/tutorials (most posts):** Use "we" — "We can also read these cookies", "Let us implement..."
- **Opinion/tech-stack posts:** Use "I" — "I use", "My go-to", "I'm eager to explore"
- **Never use second person ("you should")** — always "we can" or stay in third person.

### Tone Calibration
| Post Type | Tone | Pronouns | Example |
|-----------|------|----------|---------|
| Deep technical tutorial | Direct, impersonal | "we" | Sessions, Dataloader, Relay-SSR |
| Opinion / tech-stack | Personal, opinionated | "I" | Lean-mean |
| Integration guide | Tutorial-like, step-by-step | "we" | Persisted-queries |

---

## Structure

### Universal Template

```
1. Frontmatter (title, date, tags, summary)
2. Opening paragraph — direct problem statement
3. [Optional: Meme/image after bold claim]
4. Conceptual background ("What is X?", "The N+1 Problem", "How RSC Work")
5. [Optional: Trade-off analysis with ✅/❌]
6. Implementation sections (often iterative: naive → v1 → v2 → v3)
7. [Optional: Bonus section for advanced content]
8. Conclusion / References
```

### Opening Rules
- **Open with a direct problem statement.** Never "In this post we will cover..." or "Hello readers!"
- Problem-statement patterns that work:
  - "Implementing secure session management requires careful consideration..."
  - "Dataloaders are a necessary abstraction for efficient data fetching in GraphQL."
  - "When it comes to building lightweight and efficient HTTP APIs..."
- The summary in frontmatter serves as the abstract. The opening line does NOT repeat it.

### Closing Rules
- **Never:** "Thanks for reading!", "If you have questions, reach out!", CTAs to subscribe/follow.
- **Two valid closing styles:**
  1. **Summary + Recommendation** — Recap trade-offs, deliver final recommendation (sessions, lean-mean)
  2. **Brief achievement + references** — "You've now set up X!" + links for further reading (persisted-queries, dataloading)
- Reference section format: `## References/ Read more` or `## Resources- Further Learning`

### Section Flow
- Always explain **why** before **how**.
- Sections flow logically from concept to implementation.
- Headers are either **question-based** ("Should session cookies be readable outside the backend?") or **topic-named** ("Json Web Signature (JWS) Sessions").
- **Staircase pattern:** Each section assumes knowledge from the previous. Progressive disclosure.

### Header Hierarchy
- `##` for major sections
- `###` for sub-sections
- `####` only for deeply nested items (rare)
- Headers are **descriptive and specific**: "Iteration 1- Directly injecting into the load function", not "Implementation"

### Iterative Numbering
- Iteration pattern: "Naive attempt" → "Iteration 1" → "Iteration 2" → "Iteration 3"
- Approach pattern: named approaches ("Opaque Token Sessions" → "JWS" → "JWE")
- Tutorial pattern: "Step 1", "Step 2", etc.

### Bonus Sections
- Label as "Bonus" when content is advanced/optional: "## Bonus: Key Rotation for JWS and JWE", "## Bonus- Transforming dataloader keys"
- Horizontal rules (`---`) only for major topic transitions.

---

## Engagement Patterns

### ✅/❌ Benefits/Limitations
This is the **signature pattern**. Use it for every approach, technology, or method evaluated.

```mdx
### ✅ Benefits
- Benefit one
- Benefit two

### ❌ Limitations
- Limitation one
- Limitation two
```

Rules:
- Benefits always listed before limitations.
- Both are **complete sentences**, not fragments (mostly).
- Limitations are **honest and specific**: "Static type checkers are not happy"
- When limitations lead to the next iteration, explicitly state this connection.

### Callout Directives
Use these GitHub-flavored admonitions:

```mdx
> [!NOTE]
> Important implementation detail or aside.

> [!IMPORTANT]
> Critical gotcha or warning (used sparingly).

> [!TIP]
> Helpful suggestion or alternative approach.

> [!WARNING]
> Things that will break if done wrong.
```

Rules:
- `[!NOTE]` is the most common, used for important asides about implementation details.
- `[!IMPORTANT]` is rare, for critical gotchas.
- Place callouts AFTER the code or concept they annotate, not before.

### TLDR Blocks
Use sparingly (at most once per post):
```mdx
> TLDR: Use `@inline` fragments to load data for metadata generation and server-side logic, alongside view data.
```

### Meme Placement
- Memes placed **after a bold claim or at section transitions** — they serve as comedic punctuation.
- Technical diagrams placed **before detailed explanation** — visual overview first.
- Screenshots placed when **referencing real-world UI examples**.

---

## Code Blocks

### Mandatory Conventions
- **Always specify filename** using `:filename` syntax: ````py:app/middleware.py`
- **Complete, production-quality code.** No hello-world, no `foo`/`bar` placeholder names. Realistic names like `AccountRepo`, `JWSSessionMiddleware`.
- **No incremental "typing along"** — show the final version of a file, not keystroke-by-keystroke.
- When code evolves across iterations, show the **entire new version** with changed lines highlighted.
- **Line highlighting** for incremental changes: ````py:app/context.py {8,23-28}`
- **Sparse, purposeful comments** that explain **why**, not **what**.
- Type annotations are documentation — use them heavily. Comments are supplementary.

### Language Distribution
- **Python (3.10+)**: ~60% of code. Use `|` union types, `type` aliases, `Annotated`, `async`/`await`.
- **TypeScript**: ~30% of code. Full type annotations, modern syntax.
- **GraphQL**: In relay/dataloader posts.
- **Bash**: Brief `pip install` / `npm i` commands only.
- **JSON**: For configuration blocks.

### Comment Style
```python
# Try to get the session from the cookie.  ← Explains why, good
initial_session_was_empty = True

# Set x to 5  ← Explains what, bad (avoid)
x = 5
```

---

## Memes & Images

### Image Format in MDX
Always use the `MemeImage` component:
```mdx
<MemeImage
  src="/images/blog/{slug}/{descriptive-name}.png"
  alt="Brief description of the meme content"
/>
```

For posts not yet using the component, the HTML fallback is:
```html
<p align="left">
  <img src="/images/blog/{slug}/{descriptive-name}.png" />
</p>
```

### File Naming
- Store at `portfolio/public/images/blog/{slug}/`
- Use descriptive kebab-case: `tradeoffs-meme.png`, `ssr-diagram.png`, `type-hints-everywhere.jpg`
- Memes: humor or relatability → `*-meme.*` or descriptive name
- Diagrams: technical flow → `*-diagram.*` or `*-uml.*`
- Screenshots: real UI → descriptive name like `job-board-screen-1.png`

### Meme Sourcing Rules
When suggesting memes:
1. **Describe the meme concept** — what template, what text, what point it makes.
2. **Specify placement** — after which paragraph/claim it should appear.
3. **Provide search keywords** for finding the meme.
4. **Never fabricate meme URLs** — either suggest the concept or find a real source.

Template for meme suggestions:
```
<MemeImage
  src="/images/blog/{slug}/meme-description.png"
  alt="[Meme concept: X. Shows Y doing Z. Caption: '...']"
/>
```

---

## Frontmatter Template

```yaml
---
title: [Clear, specific title — not clickbait]
date: '[YYYY-MM-DD]'
tags: ['tag1', 'tag2', 'tag3']  # lowercase, kebab-case
draft: false
layout: PostSimple
images: []
summary: [2-3 sentence summary. State the problem, what the post covers, and key takeaways.]
---
```

### Tag Conventions
- Use lowercase, kebab-case tags
- Include the primary technology tags: `'python'`, `'fastapi'`, `'typescript'`, `'next.js'`, `'graphql'`, `'react'`
- Include the domain tags: `'backend'`, `'frontend'`, `'authentication'`
- Keep to 5-8 tags maximum

### Title Conventions
- Descriptive and specific: "Secure Session Management with JWE/JWS in FastAPI and Next.js"
- Not vague: ~~"Sessions in Web Apps"~~
- Not clickbait: ~~"You Won't Believe This Session Hack"~~
- Title case with proper nouns preserved

---

## Prohibited Patterns

**NEVER do any of these:**
1. Start with "In this blog post, we will cover..." or "Hello readers!"
2. End with "Thanks for reading!" or any CTA to subscribe/follow.
3. Use decorative emojis in body text (✅/❌ in headers are the only exception).
4. Use hello-world or toy examples (`foo`, `bar`, `example.com/api`).
5. Use hedging language ("this might work", "you could possibly consider").
6. Explain basic concepts that the target audience (senior-mid engineers) would already know.
7. Use `---` horizontal rules for minor section transitions (only for major topic splits).
8. Write conclusion paragraphs starting with "In conclusion..." or "To summarize...".
9. Place images inline within deep code explanations (place at section transitions).
10. Use second person ("You should...") — use "We can..." or stay impersonal.

**ALWAYS do these:**
1. Open with a direct problem statement.
2. Use the ✅/❌ Benefits/Limitations pattern for every approach evaluated.
3. Show progressive complexity — naive first, then refined.
4. Link to official docs on first mention of libraries/tools: `[FastAPI](https://fastapi.tiangolo.com)`.
5. Include complete, production-quality code blocks with filename annotations.
6. Be honest about limitations — every approach has them.
7. Use `> [!NOTE]` callouts for important implementation details.
8. Suggest meme placements after bold claims or at section transitions.
9. Write for a senior-mid engineer who knows the ecosystem but may not know this specific integration.
10. Use type annotations heavily in code — they serve as documentation.

---

## Research Protocol

When writing a blog post, follow this research sequence:

### 1. Library/Tool Documentation
Use the `find-docs` skill to pull current API docs for all referenced libraries. Never rely on training data for:
- Function signatures
- Configuration options
- Version-specific behaviors
- Breaking changes

### 2. Prior Art
Search existing blog posts in `portfolio/src/content/blog/` to:
- Avoid duplicating topics already covered
- Cross-reference related posts (but don't link to them — cross-post linking is not a current pattern)
- Maintain consistent terminology across posts

### 3. Meme Research
For each suggested meme:
- Describe the concept and point it makes
- Provide 2-3 search keyword suggestions
- Specify the exact placement in the post
- Keep meme count proportional: ~1 meme per 500-800 words of tutorial content

### 4. Technical Accuracy
- Verify all code examples compile/run against current library versions
- Test import paths and function signatures against docs
- Ensure type annotations match current Python/TypeScript versions
- Check that middleware/hook patterns match current framework versions

---

## Post Type Taxonomy

| Type | Description | Depth | Voice | Examples |
|------|-------------|-------|-------|---------|
| Deep Dive | Exhaustive exploration of a specific integration/pattern | Very deep | Impersonal "we" | Sessions, Dataloader, Relay-SSR |
| Tutorial | Step-by-step guide to setting up a technology | Medium | "we", tutorial framing | Persisted-queries |
| Tech Stack | Opinionated overview of chosen tools | Medium | Personal "I" | Lean-mean |
| Pattern | Explores a design pattern across multiple tools | Deep | Impersonal "we" | — |