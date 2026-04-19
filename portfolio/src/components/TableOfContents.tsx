"use client";

import { useEffect, useRef, useState } from "react";
import type { TocEntry } from "@/lib/toc";
import styles from "./table-of-contents.module.css";

interface TableOfContentsProps {
  headings: TocEntry[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <button
        className={styles.mobileToggle}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-expanded={mobileOpen}
        aria-controls="toc-nav"
      >
        <span className={styles.mobileToggleIcon}>{mobileOpen ? "−" : "+"}</span>
        <span>Table of Contents</span>
        <span className={styles.mobileToggleCount}>{headings.length}</span>
      </button>

      <nav
        ref={navRef}
        id="toc-nav"
        className={`${styles.nav} ${mobileOpen ? styles.navOpen : ""}`}
        aria-label="Table of contents"
      >
        <ul className={styles.list}>
          {headings.map((h) => (
            <li
              key={h.id}
              className={`${styles.item} ${h.level === 3 ? styles.itemH3 : ""} ${
                activeId === h.id ? styles.itemActive : ""
              }`}
            >
              <button
                className={styles.link}
                onClick={() => handleClick(h.id)}
                aria-current={activeId === h.id ? "true" : undefined}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}