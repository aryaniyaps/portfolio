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
                { opacity: 1, x: 0, rotateZ: 0, duration: 0.8, ease: "power3.out" }
              );
              gsap.fromTo(
                uWords[1],
                { opacity: 0, x: 80, rotateZ: 5 },
                {
                  opacity: 1,
                  x: 0,
                  rotateZ: 0,
                  duration: 0.8,
                  ease: "power3.out",
                  delay: 0.1,
                }
              );
              if (uBody) {
                gsap.fromTo(
                  uBody,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.32 }
                );
              }
              if (uWords[2]) {
                gsap.fromTo(
                  uWords[2],
                  { opacity: 0, y: -50 },
                  { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.44 }
                );
              }
              if (uWords[3]) {
                gsap.fromTo(
                  uWords[3],
                  { opacity: 0, y: 60 },
                  { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.52 }
                );
              }
              if (uWords[4]) {
                gsap.fromTo(
                  uWords[4],
                  { opacity: 0, scale: 0.3, rotateZ: -180 },
                  {
                    opacity: 1,
                    scale: 1,
                    rotateZ: 0,
                    duration: 1,
                    ease: "elastic.out(1,0.5)",
                    delay: 0.58,
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

      // Text reveal for scenes 3, 4, 5, 6
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

      if (scenes[3]) setupTextReveal(scenes[3], 75);
      if (scenes[5]) setupTextReveal(scenes[5], 75);
      if (scenes[6]) setupTextReveal(scenes[6], 72);

      // Books stagger animation (scene 4)
      const booksScene = scenes[4];
      if (booksScene) {
        const bookItems = booksScene.querySelectorAll('[data-book-item]');
        const tw4 = booksScene.querySelector('[data-anim="slide"]');

        if (tw4) {
          ScrollTrigger.create({
            trigger: booksScene,
            start: "top 72%",
            end: "bottom 25%",
            onEnter: () => tw4.classList.add("visible"),
            onLeave: () => tw4.classList.remove("visible"),
            onEnterBack: () => tw4.classList.add("visible"),
            onLeaveBack: () => tw4.classList.remove("visible"),
          });
        }

        if (bookItems.length) {
          let booksPlayed = false;
          ScrollTrigger.create({
            trigger: booksScene,
            start: "top 65%",
            end: "bottom 25%",
            onEnter: () => {
              if (!booksPlayed) {
                booksPlayed = true;
                bookItems.forEach((item, i) => {
                  gsap.fromTo(
                    item,
                    { opacity: 0, x: -60 },
                    { opacity: 1, x: 0, duration: 0.5, ease: "power3.out", delay: i * 0.12 }
                  );
                });
              }
            },
            onLeave: () => {
              gsap.to(bookItems, { opacity: 0, duration: 0.3 });
              booksPlayed = false;
            },
            onEnterBack: () => {
              gsap.to(bookItems, { opacity: 1, duration: 0.35 });
            },
            onLeaveBack: () => {
              gsap.to(bookItems, { opacity: 0, duration: 0.25 });
              booksPlayed = false;
            },
          });
        }
      }

// Contact is already handled above by setupTextReveal(scenes[6])
     },
    { scope: containerRef }
  );

  return <div ref={containerRef} style={{ display: "none" }} />;
}