"use client";

import { useEffect, useState } from "react";
import styles from "@/components/components.module.css";

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.loader} ${done ? styles.done : ""}`}>
      <div className={styles.loaderInner}>
        <div className={styles.loaderBrand}>
          <span className={styles.foldLetter}>A</span>
          <span className={styles.foldLetter}>R</span>
          <span className={styles.foldLetter}>Y</span>
          <span className={styles.foldLetter}>A</span>
          <span className={styles.foldLetter}>N</span>
        </div>
      </div>
    </div>
  );
}