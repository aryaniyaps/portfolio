"use client";

import { useState, useCallback, useRef } from "react";
import ProjectThumbnail from "./ProjectThumbnail";
import type { Project } from "@/lib/constants";
import styles from "@/app/page.module.css";

interface Props {
  project: Project;
  onOpenWalkthrough: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenWalkthrough }: Props) {
  const [hovered, setHovered] = useState(false);
  const clickStartRef = useRef({ x: 0, y: 0 });

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const dx = Math.abs(e.clientX - clickStartRef.current.x);
      const dy = Math.abs(e.clientY - clickStartRef.current.y);
      if (dx > 5 || dy > 5) return;
      onOpenWalkthrough(project);
    },
    [onOpenWalkthrough, project],
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    clickStartRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpenWalkthrough(project);
      }
    },
    [onOpenWalkthrough, project],
  );

  return (
    <div
      className={styles.projectCard}
      data-project-card
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.projectThumb}>
        <ProjectThumbnail
          lines={project.thumbnailLines}
          accent={project.thumbnailAccent}
          metric={project.thumbnailMetric}
          image={project.thumbnailImage}
          hovered={hovered}
        />
      </div>
      <div className={styles.projectInfo}>
        {project.thumbnailImage ? (
          <h3 className={styles.projectTitle}>{project.title}</h3>
        ) : (
          <span className={styles.srOnly}>{project.title}</span>
        )}
        <div className={styles.projectMeta}>
          <span className={styles.projectCompany}>{project.company}</span>
          {project.date && (
            <>
              <span className={styles.projectSep}>·</span>
              <span className={styles.projectDate}>{project.date}</span>
            </>
          )}
        </div>
        <p className={styles.projectSummary}>{project.summary}</p>
        <div className={styles.projectTags}>
          {project.innovations
            .filter((inn) => inn.tags && inn.tags.length > 0)
            .slice(0, 3)
            .map((inn) => inn.tags![0])
            .map((tag) => (
              <span key={tag} className={styles.projectTag}>
                {tag}
              </span>
            ))}
        </div>
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
  );
}