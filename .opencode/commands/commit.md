---
description: Create a git commit with proper formatting and co-author attribution
agent: build
---

You are creating a git commit. Follow these steps:

1. **Stage changes**: Review `git status` and `git diff` to understand what changed. Stage the appropriate files with `git add`.

2. **Analyze changes**: Look at the diff carefully to understand what was done and why. Write a commit message that focuses on the **why**, not just the **what**.

3. **Get git user info**: Run `git config user.name` and `git config user.email` to get the current user's details.

4. **Format the commit message** using these rules:
   - Use Conventional Commits format: `type(scope): description`
   - Type must be one of: feat, fix, refactor, docs, style, test, chore, perf, ci, build, revert
   - Subject line must be 50 characters or less
   - Use imperative mood in subject (e.g., "add feature" not "added feature")
   - Only include a body if the "why" isn't obvious from the subject
   - Body should wrap at 72 characters

5. **Always include BOTH co-authors** at the end of the commit message:
   ```
   Co-Authored-By: <git user name> <git user email>
   Co-Authored-By: opencode <noreply@opencode.ai>
   ```

6. **Create the commit** with the formatted message using `git commit -m`.

7. **Verify** by running `git log -1` to confirm the commit looks correct.

If the user provided arguments (`$ARGUMENTS`), use that as context for what the commit should focus on or what type of commit it should be. For example:
- `/commit feat` → create a feat commit
- `/commit fix: login bug` → create a fix commit about a login bug
- `/commit` → auto-detect the commit type from the changes

Current context/priority: $ARGUMENTS