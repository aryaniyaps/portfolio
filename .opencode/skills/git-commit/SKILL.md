---
name: git-commit
description: Helps with git commit messages formatting, ensuring proper co-author attribution for both the OpenCode bot and the human user.
---

## When to use
Use this skill when the user asks for help with this task.
## Git Commit Guidelines

### Co-Author Attribution (REQUIRED)

**ALWAYS include BOTH co-authors on every git commit:**

1. **OpenCode bot** - Always include:
```
Co-Authored-By: opencode <noreply@opencode.ai>
```

2. **Human author (me)** - Always include:
```
Co-Authored-By: Current git user name <current git user email>
```


### How to determine the human author:
- Run `git config user.name` and `git config user.email` to get the current user's details
- Use those values in the Co-Authored-By line

### Commit message format:

```
<commit message>

Co-Authored-By: Current git user name <current git user email>
Co-Authored-By: opencode <noreply@opencode.ai>
```