const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join('/home/aryaniyaps/web-projects/portfolio/portfolio/src/content/blog');
const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
const posts = files.map((filename) => {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data } = matter(raw);
  return { slug, title: data.title, draft: data.draft };
});
console.log(posts);
