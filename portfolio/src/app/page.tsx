import { SECTIONS, SKILL_BARS_GROUP_1, SKILL_BARS_GROUP_2, SKILL_BARS_GROUP_3 } from "@/lib/constants";
import { getBlogPosts } from "@/lib/blog";
import Loader from "@/components/Loader";
import FrameCanvas from "@/components/FrameCanvas";
import HeroInteraction from "@/components/HeroInteraction";
import Navigation from "@/components/Navigation";
import ScrollAnimator from "@/components/ScrollAnimator";
import Footer from "@/components/Footer";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import styles from "./page.module.css";

export default async function Home() {
  const latestPosts = getBlogPosts().slice(0, 3);

  return (
    <>
      <Loader />
      <FrameCanvas />
      <HeroInteraction />
      <Navigation />
      <ScrollAnimator />

      <main className={styles.sections}>
        {/* ── Hero ── */}
        <section className={styles.scene} data-scene="1" aria-label="Introduction">
          <div className={styles.sceneContent}>
            <div
              className={`${styles.textWrap} ${styles.textCenter}`}
              data-anim="hero"
            >
              <p className={styles.eyebrow}>{SECTIONS.hero.eyebrow}</p>
              <h1 className={styles.display}>
                {SECTIONS.hero.heading[0]}
                <br />
                {SECTIONS.hero.heading[1]}
              </h1>
              <p className={styles.tagline}>{SECTIONS.hero.tagline}</p>
            </div>
          </div>
        </section>

        {/* ── The Builder ── */}
        <section className={styles.scene} data-scene="2" id="about" aria-label="About Aryan Iyappan">
          <div className={styles.sceneContent}>
            <div className={styles.sceneSplit}>
              <div className={styles.creativeLeft} data-anim="creative" aria-hidden="true">
                {SKILL_BARS_GROUP_1.map((bar) => (
                  <div
                    key={bar.label}
                    className={styles.skillBar}
                    data-skill-bar
                  >
                    <span className={styles.skillDot} />
                    <div
                      className={styles.skillLine}
                      style={{ width: `${bar.width}px` }}
                    />
                    <span className={styles.skillLabel}>{bar.label}</span>
                  </div>
                ))}
                <div className={styles.skillAccent}>&#9670;</div>
                {SKILL_BARS_GROUP_2.map((bar) => (
                  <div
                    key={bar.label}
                    className={styles.skillBar}
                    data-skill-bar
                  >
                    <span className={styles.skillDot} />
                    <div
                      className={styles.skillLine}
                      style={{ width: `${bar.width}px` }}
                    />
                    <span className={styles.skillLabel}>{bar.label}</span>
                  </div>
                ))}
                <div className={styles.skillAccent}>&#8734;</div>
                {SKILL_BARS_GROUP_3.map((bar) => (
                  <div
                    key={bar.label}
                    className={styles.skillBar}
                    data-skill-bar
                  >
                    <span className={styles.skillDot} />
                    <div
                      className={styles.skillLine}
                      style={{ width: `${bar.width}px` }}
                    />
                    <span className={styles.skillLabel}>{bar.label}</span>
                  </div>
                ))}
              </div>
              <div
                className={`${styles.textWrap} ${styles.textRight}`}
                data-anim="slide"
              >
                <span className={styles.chapter}>{SECTIONS.about.chapter}</span>
                <h2 className={styles.heading}>
                  {SECTIONS.about.heading[0]}
                  <br />
                  {SECTIONS.about.heading[1]}
                </h2>
                <p className={styles.body}>{SECTIONS.about.body1}</p>
                <p className={styles.body} style={{ marginTop: "0.8rem" }}>
                  {SECTIONS.about.body2}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Philosophy (U-Shape) ── */}
        <section className={styles.scene} data-scene="3" id="work" aria-label="Work philosophy">
          <div className={styles.sceneContent}>
            <div className={styles.uShapeWrap} id="uShapeSection">
              <div className={styles.uShape} role="heading" aria-level={2}>
                <div className={`${styles.uWord} ${styles.uTopLeft}`} data-u-word>
                  {SECTIONS.philosophy.topLeft}
                </div>
                <div className={`${styles.uWord} ${styles.uTopRight} ${styles.accent}`} data-u-word>
                  {SECTIONS.philosophy.topRight}
                </div>
                <div className={styles.uBody} data-u-body>
                  {SECTIONS.philosophy.body}
                </div>
                <div className={`${styles.uWord} ${styles.uMidRight}`} data-u-word>
                  {SECTIONS.philosophy.midRight}
                </div>
                <div className={`${styles.uWord} ${styles.uBotLeft}`} data-u-word>
                  {SECTIONS.philosophy.botLeft}
                </div>
                <div className={`${styles.uWord} ${styles.uBotRight} ${styles.accent}`} data-u-word>
                  {SECTIONS.philosophy.botRight}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section className={styles.scene} data-scene="4" id="projects" aria-label="Projects">
          <div className={styles.projectsScene}>
            <div className={styles.projectsHeader} data-anim="slide">
              <span className={styles.chapter}>{SECTIONS.projects.chapter}</span>
              <h2 className={styles.heading}>
                {SECTIONS.projects.heading[0]}
              </h2>
            </div>
            <ProjectsCarousel />
          </div>
        </section>

        {/* ── Conviction Casseroles ── */}
        <section className={styles.scene} data-scene="5" aria-label="Principles and convictions">
          <div className={styles.sceneContent}>
            <div
              className={`${styles.textWrap} ${styles.textEdgeRight}`}
              data-anim="slide"
            >
              <span className={styles.chapter}>{SECTIONS.principles.chapter}</span>
              <h2 className={styles.heading}>
                {SECTIONS.principles.heading[0]}
                <br />
                {SECTIONS.principles.heading[1]}
              </h2>
              <p className={styles.body}>{SECTIONS.principles.body1}</p>
              <p className={styles.body} style={{ marginTop: "0.8rem" }}>
                {SECTIONS.principles.body2}
              </p>
            </div>
          </div>
        </section>

        {/* ── Latest Writing ── */}
        <section className={styles.scene} data-scene="6" id="blog" aria-label="Latest blog posts">
          <div className={styles.sceneContent}>
            <div className={styles.blogWrap} data-anim="slide">
              <span className={styles.chapter}>{SECTIONS.blog.chapter}</span>
              <h2 className={styles.heading}>
                {SECTIONS.blog.heading[0]}
                <br />
                {SECTIONS.blog.heading[1]}
              </h2>
              <div className={styles.blogGrid}>
                {latestPosts.map((post) => (
                  <a key={post.slug} href={`/blog/${post.slug}`} className={styles.blogCard}>
                    <span className={styles.blogCardDate}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <h3 className={styles.blogCardTitle}>{post.title}</h3>
                    <p className={styles.blogCardSummary}>
                      {post.summary.length > 120
                        ? `${post.summary.slice(0, 120)}…`
                        : post.summary}
                    </p>
                    <span className={styles.blogCardLink}>Read →</span>
                  </a>
                ))}
              </div>
              <a href="/blog" className={styles.blogMore}>
                View all posts →
              </a>
            </div>
          </div>
        </section>

        {/* ── Let's Build ── */}
        <section className={styles.scene} data-scene="7" id="contact" aria-label="Contact">
          <div className={styles.sceneContent}>
            <div
              className={`${styles.textWrap} ${styles.textCenter}`}
              data-anim="slide"
            >
              <span className={styles.chapter}>{SECTIONS.contact.chapter}</span>
              <h2 className={styles.heading}>
                {SECTIONS.contact.heading[0]}
                <br />
                {SECTIONS.contact.heading[1]}
              </h2>
              <p className={styles.body}>{SECTIONS.contact.body}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}