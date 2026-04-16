import { SECTIONS, SKILL_BARS } from "@/lib/constants";
import Loader from "@/components/Loader";
import FrameCanvas from "@/components/FrameCanvas";
import Navigation from "@/components/Navigation";
import ScrollAnimator from "@/components/ScrollAnimator";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Loader />
      <FrameCanvas />
      <Navigation />
      <ScrollAnimator />

      <main className={styles.sections}>
        {/* ── Hero ── */}
        <section className={styles.scene} data-scene="1">
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
        <section className={styles.scene} data-scene="2" id="about">
          <div className={styles.sceneContent}>
            <div className={styles.sceneSplit}>
              <div className={styles.creativeLeft} data-anim="creative">
                {SKILL_BARS.filter((_, i) => i < 2).map((bar) => (
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
                {SKILL_BARS.filter((_, i) => i >= 2 && i < 4).map((bar) => (
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
                {SKILL_BARS.filter((_, i) => i >= 4).map((bar) => (
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
                <p className={styles.chapter}>{SECTIONS.about.chapter}</p>
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
        <section className={styles.scene} data-scene="3" id="work">
          <div className={styles.sceneContent}>
            <div className={styles.uShapeWrap} id="uShapeSection">
              <div className={styles.uShape}>
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

        {/* ── What I've Built ── */}
        <section className={styles.scene} data-scene="4">
          <div className={styles.sceneContent}>
            <div
              className={`${styles.textWrap} ${styles.textCenter}`}
              data-anim="slide"
            >
              <p className={styles.chapter}>{SECTIONS.built.chapter}</p>
              <h2 className={styles.heading}>
                {SECTIONS.built.heading[0]}
                <br />
                {SECTIONS.built.heading[1]}
              </h2>
              <p className={styles.body}>{SECTIONS.built.body}</p>
            </div>
          </div>
        </section>

        {/* ── First Principles ── */}
        <section className={styles.scene} data-scene="5">
          <div className={styles.sceneContent}>
            <div
              className={`${styles.textWrap} ${styles.textRight}`}
              data-anim="slide"
            >
              <p className={styles.chapter}>{SECTIONS.principles.chapter}</p>
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

        {/* ── Let's Build ── */}
        <section className={styles.scene} data-scene="6" id="contact">
          <div className={styles.sceneContent}>
            <div
              className={`${styles.textWrap} ${styles.textCenter}`}
              data-anim="slide"
            >
              <p className={styles.chapter}>{SECTIONS.contact.chapter}</p>
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