import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPostMeta {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  slug: string;
  readingTime: string;
  draft?: boolean;
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

export function getBlogPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename): BlogPostMeta | null => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data } = matter(raw);

      if (data.draft === true) return null;

      return {
        title: data.title ?? slug,
        date: data.date ? new Date(data.date).toISOString() : "",
        tags: data.tags ?? [],
        summary: data.summary ?? "",
        slug,
        readingTime: readingTime(raw).text,
        draft: data.draft,
      };
    })
    .filter((p): p is BlogPostMeta => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      title: data.title ?? slug,
      date: data.date ? new Date(data.date).toISOString() : "",
      tags: data.tags ?? [],
      summary: data.summary ?? "",
      slug,
      readingTime: readingTime(raw).text,
      draft: data.draft,
    },
    content,
  };
}

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map((f) => f.replace(/\.mdx$/, ""));
}