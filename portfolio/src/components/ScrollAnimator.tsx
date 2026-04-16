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
            end: "35% top",
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
            start: "top 75%",
            end: "55% top",
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
              start: "top 70%",
              end: "50% top",
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
          start: "35% top",
          end: "95% top",
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
                  delay: 0.15,
                }
              );
              if (uBody) {
                gsap.fromTo(
                  uBody,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.3 }
                );
              }
              if (uWords[2]) {
                gsap.fromTo(
                  uWords[2],
                  { opacity: 0, y: -50 },
                  { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.4 }
                );
              }
              if (uWords[3]) {
                gsap.fromTo(
                  uWords[3],
                  { opacity: 0, y: 60 },
                  { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.55 }
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
                    delay: 0.65,
                  }
                );
              }
            }
          },
          onLeave: () => {
            const els = Array.from(uWords).concat(uBody ? [uBody] : []);
            gsap.to(els, { opacity: 0, duration: 0.4 });
            uPlayed = false;
          },
          onEnterBack: () => {
            const els = Array.from(uWords).concat(uBody ? [uBody] : []);
            gsap.to(els, { opacity: 1, duration: 0.4 });
          },
          onLeaveBack: () => {
            const els = Array.from(uWords).concat(uBody ? [uBody] : []);
            gsap.to(els, { opacity: 0, duration: 0.3 });
            uPlayed = false;
          },
        });
      }

      // Text reveal for scenes 3, 4, 5
      function setupTextReveal(sceneEl: Element, startPct: number) {
        const tw = sceneEl.querySelector('[data-anim="slide"]');
        if (!tw) return;
        ScrollTrigger.create({
          trigger: sceneEl,
          start: `${startPct}% top`,
          end: "95% top",
          onEnter: () => tw.classList.add("visible"),
          onLeave: () => tw.classList.remove("visible"),
          onEnterBack: () => tw.classList.add("visible"),
          onLeaveBack: () => tw.classList.remove("visible"),
        });
      }

      if (scenes[3]) setupTextReveal(scenes[3], 35);
      if (scenes[4]) setupTextReveal(scenes[4], 35);
      if (scenes[5]) setupTextReveal(scenes[5], 30);
    },
    { scope: containerRef }
  );

  return <div ref={containerRef} style={{ display: "none" }} />;
}