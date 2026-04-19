import { getBlogPost, getAllSlugs, getBlogPosts } from "@/lib/blog";
import { extractToc } from "@/lib/toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx-components";
import TableOfContents from "@/components/TableOfContents";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeCodeMeta from "@/lib/rehype-code-meta";
import styles from "./post.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.meta.title} — Aryan Iyappan`,
    description: post.meta.summary,
    openGraph: {
      title: post.meta.title,
      description: post.meta.summary,
      type: "article",
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
  };
}

function filterCodeMeta(str: string): string {
  return str.replace(/^:([^\s]+)/, (_match: string, filename: string) => " title=\"" + filename + "\"");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxOptions: Record<string, any> = {
  mdxOptions: {
    rehypePlugins: [
      rehypeCodeMeta,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          keepBackground: true,
          filterMetaString: filterCodeMeta,
        },
      ],
    ],
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const allPosts = getBlogPosts();
  const postIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? allPosts[postIndex - 1] : null;

  const headings = extractToc(post.content);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <TableOfContents headings={headings} />
          </aside>

          <article className={styles.article}>
            <header className={styles.header}>
              <div className={styles.meta}>
                <time className={styles.date}>
                  {new Date(post.meta.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className={styles.reading}>{post.meta.readingTime}</span>
              </div>
              <h1 className={styles.title}>{post.meta.title}</h1>
              {post.meta.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.meta.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className={styles.prose}>
<MDXRemote
                source={post.content}
                components={getMDXComponents()}
                options={mdxOptions}
              />
            </div>
          </article>
        </div>

        {(prevPost || nextPost) && (
          <nav className={styles.pagination}>
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className={styles.pageLink}>
                <span className={styles.pageLinkLabel}>← Previous</span>
                <span className={styles.pageLinkTitle}>{prevPost.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className={`${styles.pageLink} ${styles.pageLinkNext}`}
              >
                <span className={styles.pageLinkLabel}>Next →</span>
                <span className={styles.pageLinkTitle}>{nextPost.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </div>
    </main>
  );
}