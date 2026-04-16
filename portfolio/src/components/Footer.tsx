import styles from "@/components/components.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>&#9670; ARYAN IYAPPAN</span>
          <span className={styles.footerCopy}>
            &copy; 2026 &middot; All rights reserved
          </span>
        </div>
        <div className={styles.footerLinks}>
          <a href="https://github.com/aryaniyaps">GitHub</a>
          <a href="https://linkedin.com/in/aryaniyaps">LinkedIn</a>
          <a href="mailto:aryaniyaps@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}