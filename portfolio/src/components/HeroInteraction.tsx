"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "@/components/components.module.css";

const PARTICLE_COUNT = 120;
const REPULSION_RADIUS = 250;
const REPULSION_FORCE = 1.8;
const SPRING_K = 0.015;
const DAMPING = 0.92;
const CONNECTION_DIST = 70;
const CONNECTION_OPACITY = 0.035;
const CURSOR_CONNECTION_OPACITY = 0.06;
const DRIFT_SPEED = 0.25;
const QUIET_ZONE_X = 0.22;
const QUIET_ZONE_Y = 0.22;
const QUIET_DENSITY_FACTOR = 0.3;
const SCROLL_FADE_START = 0;
const SCROLL_FADE_END = 0.35;

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  phase: number;
  speed: number;
}

function isInQuietZone(nx: number, ny: number): boolean {
  return (
    Math.abs(nx - 0.5) < QUIET_ZONE_X &&
    Math.abs(ny - 0.5) < QUIET_ZONE_Y
  );
}

function shouldDrawConnection(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  w: number,
  h: number
): boolean {
  const midNx = ((x1 + x2) / 2) / w;
  const midNy = ((y1 + y2) / 2) / h;
  return !isInQuietZone(midNx, midNy);
}

export default function HeroInteraction() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef = useRef({ x: -1000, y: -1000, active: false });
  const scrollOpacityRef = useRef(1);
  const rafRef = useRef<number>(0);
  const dimsRef = useRef({ w: 0, h: 0 });
  const heroRef = useRef<HTMLElement | null>(null);
  const isVisibleRef = useRef(true);

  const createParticles = useCallback((w: number, h: number): Particle[] => {
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let nx: number;
      let ny: number;
      const isQuiet = Math.random() < QUIET_DENSITY_FACTOR;

      if (isQuiet) {
        nx = 0.5 + (Math.random() - 0.5) * QUIET_ZONE_X * 2;
        ny = 0.5 + (Math.random() - 0.5) * QUIET_ZONE_Y * 2;
      } else {
        nx = Math.random();
        ny = Math.random();
        if (isInQuietZone(nx, ny)) {
          if (Math.random() < 0.5) {
            nx = nx < 0.5
              ? 0.5 - QUIET_ZONE_X - Math.random() * 0.12
              : 0.5 + QUIET_ZONE_X + Math.random() * 0.12;
          } else {
            ny = ny < 0.5
              ? 0.5 - QUIET_ZONE_Y - Math.random() * 0.12
              : 0.5 + QUIET_ZONE_Y + Math.random() * 0.12;
          }
        }
      }

      const px = nx * w;
      const py = ny * h;
      const edgeFactor = Math.max(
        Math.abs(nx - 0.5) / 0.5,
        Math.abs(ny - 0.5) / 0.5
      );
      const inQuiet = isInQuietZone(nx, ny);
      const baseOpacity = inQuiet
        ? 0.03 + Math.random() * 0.04
        : 0.05 + edgeFactor * 0.06 + Math.random() * 0.03;

      particles.push({
        x: px,
        y: py,
        originX: px,
        originY: py,
        vx: 0,
        vy: 0,
        size: 1 + Math.random() * 1.5,
        baseOpacity,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    heroRef.current = document.querySelector('[data-scene="1"]');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimsRef.current = { w, h };
      particlesRef.current = createParticles(w, h);
    };

    resize();

    if (prefersReducedMotion) {
      const { w, h } = dimsRef.current;
      ctx.clearRect(0, 0, w, h);
      for (const p of particlesRef.current) {
        const inQuiet = isInQuietZone(
          p.originX / w,
          p.originY / h
        );
        const op = inQuiet ? 0.02 : 0.03;
        ctx.beginPath();
        ctx.arc(p.originX, p.originY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${op})`;
        ctx.fill();
      }
      return;
    }

    let running = true;
    let lastTime = 0;

    const onPointerMove = (e: PointerEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const onPointerLeave = () => {
      cursorRef.current.active = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (vh * SCROLL_FADE_END)));
      scrollOpacityRef.current = 1 - progress;
      const inView = rect.bottom > 0 && rect.top < vh * 1.5;
      const wasVisible = isVisibleRef.current;
      isVisibleRef.current = inView;
      if (inView && !wasVisible) {
        if (!running) {
          running = true;
          lastTime = performance.now();
          rafRef.current = requestAnimationFrame(animate);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const animate = (time: number) => {
      if (!running) return;
      if (!isVisibleRef.current) {
        running = false;
        return;
      }

      const dt = Math.min((time - lastTime) / 16.667, 3);
      lastTime = time;

      const { w, h } = dimsRef.current;
      const particles = particlesRef.current;
      const cursor = cursorRef.current;
      const scrollOpacity = scrollOpacityRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      if (scrollOpacity < 0.01) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const cellSize = CONNECTION_DIST;
      const gridCols = Math.ceil(w / cellSize) + 1;
      const gridRows = Math.ceil(h / cellSize) + 1;
      const grid = new Map<number, number[]>();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += p.speed * 0.008 * dt;
        p.x += Math.sin(p.phase) * DRIFT_SPEED * dt;
        p.y += Math.cos(p.phase * 1.3) * DRIFT_SPEED * dt * 0.6;

        const dx = cursor.x - p.x;
        const dy = cursor.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (cursor.active && dist < REPULSION_RADIUS && dist > 0.1) {
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_FORCE * dt;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }

        const ox = p.originX - p.x;
        const oy = p.originY - p.y;
        p.vx += ox * SPRING_K * dt;
        p.vy += oy * SPRING_K * dt;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const col = Math.floor(p.x / cellSize);
        const row = Math.floor(p.y / cellSize);
        const key = row * gridCols + col;
        let cell = grid.get(key);
        if (!cell) {
          cell = [];
          grid.set(key, cell);
        }
        cell.push(i);
      }

      ctx.lineWidth = 0.4;
      for (const [, cellIndices] of grid) {
        for (let ci = 0; ci < cellIndices.length; ci++) {
          const a = particles[cellIndices[ci]];
          for (let cj = ci + 1; cj < cellIndices.length; cj++) {
            const bIdx = cellIndices[cj];
            const b = particles[bIdx];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < CONNECTION_DIST) {
              if (!shouldDrawConnection(a.x, a.y, b.x, b.y, w, h)) continue;
              let lineOp = CONNECTION_OPACITY * (1 - d / CONNECTION_DIST);
              if (cursor.active) {
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2;
                const cmd = Math.sqrt(
                  (cursor.x - mx) ** 2 + (cursor.y - my) ** 2
                );
                if (cmd < REPULSION_RADIUS) {
                  const cf = 1 - cmd / REPULSION_RADIUS;
                  lineOp = CONNECTION_OPACITY + cf * (CURSOR_CONNECTION_OPACITY - CONNECTION_OPACITY);
                }
              }
              lineOp *= scrollOpacity;
              ctx.globalAlpha = lineOp;
              ctx.strokeStyle = "#00D4FF";
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dist = cursor.active
          ? Math.sqrt((cursor.x - p.x) ** 2 + (cursor.y - p.y) ** 2)
          : 9999;
        const proximityBoost = cursor.active && dist < REPULSION_RADIUS
          ? (1 - dist / REPULSION_RADIUS) * 0.18
          : 0;
        const sizeBoost = cursor.active && dist < REPULSION_RADIUS
          ? (1 - dist / REPULSION_RADIUS) * 0.8
          : 0;
        const op = (p.baseOpacity + proximityBoost) * scrollOpacity;
        const sz = p.size + sizeBoost;

        ctx.globalAlpha = op;
        ctx.fillStyle = "#00D4FF";
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fill();

        if (proximityBoost > 0.04 && cursor.active) {
          ctx.globalAlpha = proximityBoost * scrollOpacity * 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, sz + 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.heroInteraction}
      aria-hidden="true"
    />
  );
}