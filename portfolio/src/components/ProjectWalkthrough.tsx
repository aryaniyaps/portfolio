"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Project } from "@/lib/constants";
import WalkthroughVisual from "./WalkthroughVisual";
import styles from "@/app/page.module.css";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectWalkthrough({ project, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const total = project.innovations.length;
  const innovation = project.innovations[step];
  const panelRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    if (step < total - 1) {
      setDirection("next");
      setStep((s) => s + 1);
    }
  }, [step, total]);

  const goPrev = useCallback(() => {
    if (step > 0) {
      setDirection("prev");
      setStep((s) => s - 1);
    }
  }, [step]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.focus();
    }
  }, []);

  if (!innovation) return null;

  const stepNum = step + 1;

  return (
    <div
      className={styles.walkthroughOverlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.walkthroughPanel}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className={styles.walkthroughHeader}>
          <div className={styles.walkthroughProjectInfo}>
            <span className={styles.walkthroughProjectTitle}>
              {project.title}
            </span>
            <span className={styles.walkthroughProjectMeta}>
              {project.company}
              {project.date && (
                <>
                  <span className={styles.walkthroughSep}>·</span>
                  {project.date}
                </>
              )}
            </span>
          </div>
          <button
            className={styles.walkthroughClose}
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 3L13 13M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.walkthroughStepIndicator}>
          <span className={styles.walkthroughStepCurrent}>
            {String(stepNum).padStart(2, "0")}
          </span>
          <span className={styles.walkthroughStepSep}>/</span>
          <span className={styles.walkthroughStepTotal}>
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div
          className={`${styles.walkthroughContent} ${
            direction === "next"
              ? styles.walkthroughSlideRight
              : styles.walkthroughSlideLeft
          }`}
          key={step}
        >
          <div className={styles.walkthroughVisual}>
            <WalkthroughVisual visual={innovation.visual} active={true} />
          </div>

          <div className={styles.walkthroughText}>
            <h3 className={styles.walkthroughInnovationTitle}>
              {innovation.title}
            </h3>
            <p className={styles.walkthroughInnovationDesc}>
              {innovation.description}
            </p>
            {innovation.tags && innovation.tags.length > 0 && (
              <div className={styles.walkthroughInnovationTags}>
                {innovation.tags.map((tag) => (
                  <span key={tag} className={styles.walkthroughTag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.walkthroughNav}>
          <button
            className={`${styles.walkthroughNavBtn} ${
              step === 0 ? styles.walkthroughNavBtnDisabled : ""
            }`}
            onClick={goPrev}
            disabled={step === 0}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12 4L6 10L12 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className={styles.walkthroughDots}>
            {project.innovations.map((_, i) => (
              <button
                key={i}
                className={`${styles.walkthroughDot} ${
                  i === step ? styles.walkthroughDotActive : ""
                }`}
                onClick={() => {
                  setDirection(i > step ? "next" : "prev");
                  setStep(i);
                }}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>

          <button
            className={`${styles.walkthroughNavBtn} ${
              step === total - 1 ? styles.walkthroughNavBtnDisabled : ""
            }`}
            onClick={goNext}
            disabled={step === total - 1}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M8 4L14 10L8 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}