"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scenes = document.querySelectorAll('[data-scene]');
      if (scenes.length === 0) return;

      // Hero fade-out
      const hero = scenes[0]?.querySelector('[data-anim="hero"]');
      if (hero && scenes[0]) {
        requestAnimationFrame(() => hero.classList.add("visible"));
        gsap.to(hero, {
          opacity: 0,
          y: -60,
          ease: "power2.in",
          scrollTrigger: {
            trigger: scenes[0],
            start: "top top",
            end: "20% top",
            scrub: true,
          },
        });
      }

      // Scene 2: About - text reveal + skill bars
      const scene2 = scenes[1];
      if (scene2) {
        const tw = scene2.querySelector('[data-anim="slide"]');
        const creativeLeft = scene2.querySelector('[data-anim="creative"]');
        const skillBars = creativeLeft
          ? creativeLeft.querySelectorAll('[data-skill-bar]')
          : [];

        if (tw) {
          ScrollTrigger.create({
            trigger: scene2,
            start: "top 72%",
            end: "bottom 25%",
            onEnter: () => tw.classList.add("visible"),
            onLeave: () => tw.classList.remove("visible"),
            onEnterBack: () => tw.classList.add("visible"),
            onLeaveBack: () => tw.classList.remove("visible"),
          });
        }

        if (creativeLeft && skillBars.length) {
          const leftTl = gsap.timeline({
            scrollTrigger: {
              trigger: scene2,
              start: "top 68%",
              end: "bottom 25%",
              onEnter: () => creativeLeft.classList.add("visible"),
              onLeave: () => creativeLeft.classList.remove("visible"),
              onEnterBack: () => {
                creativeLeft.classList.add("visible");
                leftTl.restart();
              },
              onLeaveBack: () =>
                creativeLeft.classList.remove("visible"),
            },
          });

          skillBars.forEach((bar, i) => {
            leftTl.to(
              bar,
              { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
              i * 0.12
            );
          });
        }
      }

      // U-shape animation
      const uShapeSection = document.getElementById("uShapeSection");
      if (uShapeSection && scenes[2]) {
        const uWords = uShapeSection.querySelectorAll('[data-u-word]');
        const uBody = uShapeSection.querySelector('[data-u-body]');
        let uPlayed = false;

        ScrollTrigger.create({
          trigger: scenes[2],
          start: "top 72%",
          end: "bottom 25%",
          onEnter: () => {
            if (!uPlayed) {
              uPlayed = true;
              gsap.fromTo(
                uWords[0],
                { opacity: 0, x: -80, rotateZ: -5 },
                { opacity: 1, x: 0, rotateZ: 0, duration: 0.6, ease: "power3.out" }
              );
              gsap.fromTo(
                uWords[1],
                { opacity: 0, x: 80, rotateZ: 5 },
                {
                  opacity: 1,
                  x: 0,
                  rotateZ: 0,
                  duration: 0.6,
                  ease: "power3.out",
                  delay: 0.06,
                }
              );
              if (uBody) {
                gsap.fromTo(
                  uBody,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.12 }
                );
              }
              if (uWords[2]) {
                gsap.fromTo(
                  uWords[2],
                  { opacity: 0, y: -30 },
                  { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.18 }
                );
              }
              if (uWords[3]) {
                gsap.fromTo(
                  uWords[3],
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.24 }
                );
              }
              if (uWords[4]) {
                gsap.fromTo(
                  uWords[4],
                  { opacity: 0, scale: 0.9, rotateZ: -12 },
                  {
                    opacity: 1,
                    scale: 1,
                    rotateZ: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    delay: 0.30,
                  }
                );
              }
            }
          },
          onLeave: () => {
            const els = Array.from(uWords).concat(uBody ? [uBody] : []);
            gsap.to(els, { opacity: 0, duration: 0.3 });
            uPlayed = false;
          },
          onEnterBack: () => {
            const els = Array.from(uWords).concat(uBody ? [uBody] : []);
            gsap.to(els, { opacity: 1, duration: 0.35 });
          },
          onLeaveBack: () => {
            const els = Array.from(uWords).concat(uBody ? [uBody] : []);
            gsap.to(els, { opacity: 0, duration: 0.25 });
            uPlayed = false;
          },
        });
      }

      // Text reveal for Conviction Casseroles and Contact
      function setupTextReveal(sceneEl: Element, viewportPct: number = 75) {
        const tw = sceneEl.querySelector('[data-anim="slide"]');
        if (!tw) return;
        ScrollTrigger.create({
          trigger: sceneEl,
          start: `top ${viewportPct}%`,
          end: "bottom 25%",
          onEnter: () => tw.classList.add("visible"),
          onLeave: () => tw.classList.remove("visible"),
          onEnterBack: () => tw.classList.add("visible"),
          onLeaveBack: () => tw.classList.remove("visible"),
        });
      }

      if (scenes[4]) setupTextReveal(scenes[4], 75);
      if (scenes[5]) setupTextReveal(scenes[5], 72);
      if (scenes[6]) setupTextReveal(scenes[6], 72);

// Project cards stagger animation (scene 4 → scenes[3])
      const projectsScene = scenes[3];
      if (projectsScene) {
        const projectCards = projectsScene.querySelectorAll('[data-project-card]');
        const tw4 = projectsScene.querySelector('[data-anim="slide"]');

        if (tw4) {
          ScrollTrigger.create({
            trigger: projectsScene,
            start: "top 72%",
            end: "bottom 25%",
            onEnter: () => tw4.classList.add("visible"),
            onLeave: () => tw4.classList.remove("visible"),
            onEnterBack: () => tw4.classList.add("visible"),
            onLeaveBack: () => tw4.classList.remove("visible"),
          });
        }

        if (projectCards.length) {
          let projectsPlayed = false;
          ScrollTrigger.create({
            trigger: projectsScene,
            start: "top 65%",
            end: "bottom 25%",
            onEnter: () => {
              if (!projectsPlayed) {
                projectsPlayed = true;
                projectCards.forEach((card, i) => {
                  gsap.fromTo(
                    card,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: i * 0.08 }
                  );
                });
              }
            },
            onLeave: () => {
              gsap.to(projectCards, { opacity: 0, duration: 0.3 });
              projectsPlayed = false;
            },
            onEnterBack: () => {
              gsap.to(projectCards, { opacity: 1, duration: 0.35 });
            },
            onLeaveBack: () => {
              gsap.to(projectCards, { opacity: 0, duration: 0.25 });
              projectsPlayed = false;
            },
          });
        }
      }

// Contact handled by setupTextReveal(scenes[6])
     },
    { scope: containerRef }
  );

  return <div ref={containerRef} style={{ display: "none" }} />;
}