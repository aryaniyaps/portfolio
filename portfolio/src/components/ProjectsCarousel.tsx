"use client";

import { useEffect, useRef } from "react";
import { PROJECTS } from "@/lib/constants";
import ProjectCard from "@/components/ProjectCard";
import styles from "@/app/page.module.css";

export default function ProjectsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    function onMouseDown(e: MouseEvent) {
      isDragging.current = true;
      startX.current = e.pageX - el!.offsetLeft;
      scrollLeftStart.current = el!.scrollLeft;
      el!.style.cursor = "grabbing";
      el!.style.userSelect = "none";
    }

    function onMouseMove(e: MouseEvent) {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el!.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      el!.scrollLeft = scrollLeftStart.current - walk;
    }

    function onMouseUp() {
      isDragging.current = false;
      el!.style.cursor = "grab";
      el!.style.userSelect = "";
    }

    function onMouseLeave() {
      isDragging.current = false;
      el!.style.cursor = "grab";
      el!.style.userSelect = "";
    }

    el.style.cursor = "grab";
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={carouselRef}
      className={styles.projectCarousel}
      data-anim="projects"
      data-carousel
    >
      {PROJECTS.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}