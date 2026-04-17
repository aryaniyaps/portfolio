"use client";

import { useEffect, useRef, useCallback } from "react";
import { NAV_LINKS } from "@/lib/constants";
import styles from "@/components/components.module.css";

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);

  const onScroll = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const scrolled = window.scrollY > 100;
    nav.classList.toggle(styles.scrolled, scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <nav ref={navRef} className={styles.nav}>
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
            <a
              href={link.href}
              className={styles.navLink}
              {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {link.label}
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
}
