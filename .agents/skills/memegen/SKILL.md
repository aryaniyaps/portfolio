---
name: memegen
description: Generate memes using the memegen.link API. Downloads the generated meme and saves it locally to the project for future proofing.
version: 1.0.0
user-invocable: true
argument-hint: "[template] [top text] [bottom text]"
---

# Memegen Skill

You are a skill that generates memes using the `memegen.link` API and saves them locally.

## How to use

When asked to generate a meme:
1. Identify the template name (e.g., `doge`, `drake`, `fine`, `sad-biden`, `yall-got-any-more-of-that`). You can fetch `https://api.memegen.link/templates` to see available templates if unsure.
2. Identify the top text and bottom text. Use underscores `_` for spaces, and standard memegen URL encoding for special characters (e.g. `~q` for `?`, `~p` for `#`, `''` for `"`).
3. Construct the image URL: `https://api.memegen.link/images/{template}/{top_text}/{bottom_text}.png`
   (Omit bottom text if only top text is needed, e.g., `https://api.memegen.link/images/{template}/{top_text}.png`)
4. Decide on a local save path, usually within `public/images/memes/` or `public/images/blog/{slug}/`. Ensure the directory exists.
5. Use the `bash` tool to download the image: `curl -sL "URL" -o "LOCAL_PATH"`
6. Return the local path to the user or the calling agent so it can be embedded in markdown/MDX (e.g., `![Meme](/images/memes/filename.png)`).

### Example Bash Command
```bash
mkdir -p public/images/blog/my-post
curl -sL "https://api.memegen.link/images/buzz/memes/memes_everywhere.png" -o "public/images/blog/my-post/buzz-memes.png"
```

## Integration with Blog Writer
This skill is meant to be called autonomously by the `blog-writer` skill to replace placeholder memes with actual downloaded meme images.
