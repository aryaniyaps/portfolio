"use client";

import type { ThumbnailAccent } from "@/lib/constants";
import styles from "@/app/page.module.css";

interface ProjectThumbnailProps {
  lines: readonly string[];
  accent: ThumbnailAccent;
  metric?: string;
  hovered: boolean;
}

const ACCENT_MAP: Record<ThumbnailAccent, { cssClass: string; color: string }> = {
  cyan: { cssClass: styles.thumbnailGlowCyan, color: "var(--color-arc-reactor)" },
  red: { cssClass: styles.thumbnailGlowRed, color: "var(--color-repulsor)" },
  gold: { cssClass: styles.thumbnailGlowGold, color: "var(--color-gold)" },
};

export default function ProjectThumbnail({
  lines,
  accent,
  metric,
  hovered,
}: ProjectThumbnailProps) {
  const { cssClass: glowClass, color } = ACCENT_MAP[accent];
  const lineCount = lines.length;

  return (
    <div className={`${styles.projectThumbnail} ${glowClass}`}>
      <div className={styles.thumbnailContent}>
        {lines.map((line, i) => (
          <span
            key={i}
            className={styles.thumbnailTitleLine}
            style={{
              color,
              fontSize:
                lineCount === 1
                  ? "clamp(1.6rem, 3vw, 2.2rem)"
                  : lineCount === 2
                    ? "clamp(1.3rem, 2.5vw, 1.8rem)"
                    : "clamp(1.1rem, 2vw, 1.5rem)",
            }}
          >
            {line}
          </span>
        ))}
        {metric && (
          <span className={styles.thumbnailMetric} style={{ color }}>
            {metric}
          </span>
        )}
      </div>
      {hovered && <div className={styles.thumbnailScanLine} />}
    </div>
  );
}