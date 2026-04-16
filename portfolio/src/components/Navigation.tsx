"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import styles from "@/components/components.module.css";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navLeft}>
        <a href="#" className={styles.navBrand}>
          ARYAN IYAPPAN
        </a>
        <span className={styles.navTagline}>Technical Founder</span>
      </div>
      <div className={styles.navCard}>
        {NAV_LINKS.map((link, i) => (
          <div key={link.href} style={{ display: "contents" }}>
            {i > 0 && <div className={styles.navDivider} />}
            <a href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
}