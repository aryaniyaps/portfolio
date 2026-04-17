"use client";

import { useState, useCallback, useRef } from "react";
import ProceduralCanvas from "./ProceduralCanvas";
import styles from "@/app/page.module.css";

interface Project {
  readonly title: string;
  readonly company: string;
  readonly date: string;
  readonly summary: string;
  readonly description: string;
  readonly github: string;
}

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const clickStartRef = useRef({ x: 0, y: 0 });

  const handleClick = useCallback((e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - clickStartRef.current.x);
    const dy = Math.abs(e.clientY - clickStartRef.current.y);
    if (dx > 5 || dy > 5) return;
    setExpanded((prev) => !prev);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    clickStartRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  return (
    <div
      className={styles.projectCard}
      data-project-card
      data-expanded={expanded || undefined}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded((prev) => !prev);
        }
      }}
    >
      <div className={styles.projectThumb}>
        <ProceduralCanvas
          seed={project.title}
          width={320}
          height={192}
          hoverIntensity={hovered ? 1 : 0}
        />
      </div>
      <div className={styles.projectInfo}>
        <div className={styles.projectHeaderGroup}>
          <div className={styles.projectHeader}>
            <span className={styles.projectTitle}>{project.title}</span>
            {!expanded && (
              <svg
                className={styles.projectChevron}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 5L6 8L9 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div className={styles.projectMeta}>
            <span className={styles.projectCompany}>{project.company}</span>
            {project.date && (
              <>
                <span className={styles.projectSep}>·</span>
                <span className={styles.projectDate}>{project.date}</span>
              </>
            )}
          </div>
        </div>
        <p className={styles.projectSummary}>{project.summary}</p>
        <div
          className={styles.projectExpandWrap}
          data-expanded={expanded || undefined}
        >
          <div className={styles.projectExpandInner}>
            <p className={styles.projectDescription}>
              {project.description}
            </p>
            {project.github && (
              <a
                className={styles.projectLink}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}