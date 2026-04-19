import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import styles from "./blog.module.css";

export const metadata = {
  title: "Blog — Aryan Iyappan",
  description:
    "Writing about full-stack engineering, GraphQL, AI, and building things that last.",
};

export const dynamic = "force-dynamic";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.chapter}>II</span>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Writing about engineering, architecture, and building things that
            last.
          </p>
        </div>

        <div className={styles.grid}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardDate}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className={styles.cardReading}>{post.readingTime}</span>
              </div>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardSummary}>{post.summary}</p>
              {post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span className={styles.cardLink}>Read post →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}