"use client";

import { useRef, useEffect, useCallback } from "react";

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = ((hash << 5) - hash + ch) | 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface ProceduralCanvasProps {
  seed: string;
  width?: number;
  height?: number;
  hoverIntensity?: number;
}

export default function ProceduralCanvas({
  seed,
  width = 320,
  height = 192,
  hoverIntensity = 0,
}: ProceduralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
      const rawSeed = hashString(seed);
      const rand = seededRandom(rawSeed);
      const paletteSeed = rawSeed % 5;

      const bgColors = [
        ["#0d1117", "#0a1628"],
        ["#0f0a18", "#12091a"],
        ["#0a0f0d", "#0a1a14"],
        ["#110d0a", "#1a0f0a"],
        ["#0a0d14", "#0d1020"],
      ];

      const accentColors = [
        ["#00D4FF", "#0088aa"],
        ["#00D4FF", "#66ddff"],
        ["#00e5a0", "#00D4FF"],
        ["#D4A400", "#FF3B3B"],
        ["#00D4FF", "#8855ff"],
      ];

      const [bg1, bg2] = bgColors[paletteSeed];
      const [accent1, accent2] = accentColors[paletteSeed];

      ctx.clearRect(0, 0, w, h);

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, bg1);
      bg.addColorStop(1, bg2);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const patternType = rawSeed % 4;
      const slowTime = time * 0.0003 + hoverIntensity * 0.002;

      ctx.globalAlpha = 0.35 + hoverIntensity * 0.15;

      if (patternType === 0) {
        const gridSize = 24 + (rawSeed % 16);
        const cols = Math.ceil(w / gridSize) + 1;
        const rows = Math.ceil(h / gridSize) + 1;
        ctx.strokeStyle = accent1;
        ctx.lineWidth = 0.5;

        for (let i = 0; i < cols; i++) {
          const phase = slowTime + rand() * Math.PI * 2;
          const offset = Math.sin(phase) * 3;
          ctx.beginPath();
          ctx.moveTo(i * gridSize + offset, 0);
          ctx.lineTo(i * gridSize - offset, h);
          ctx.stroke();
        }
        for (let j = 0; j < rows; j++) {
          const phase = slowTime * 1.3 + rand() * Math.PI * 2;
          const offset = Math.cos(phase) * 3;
          ctx.beginPath();
          ctx.moveTo(0, j * gridSize + offset);
          ctx.lineTo(w, j * gridSize - offset);
          ctx.stroke();
        }

        const nodeCount = 3 + (rawSeed % 4);
        ctx.globalAlpha = 0.6 + hoverIntensity * 0.2;
        for (let n = 0; n < nodeCount; n++) {
          const nx = rand() * w;
          const ny = rand() * h;
          const pulse = Math.sin(slowTime * 2 + n) * 0.5 + 0.5;
          const radius = 3 + pulse * 4;

          ctx.beginPath();
          ctx.arc(nx, ny, radius, 0, Math.PI * 2);
          ctx.fillStyle = accent1;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(nx, ny, radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = accent2;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = 0.2 + pulse * 0.15;
          ctx.stroke();
          ctx.globalAlpha = 0.6 + hoverIntensity * 0.2;
        }
      } else if (patternType === 1) {
        const lineCount = 8 + (rawSeed % 6);
        ctx.lineWidth = 1;

        for (let i = 0; i < lineCount; i++) {
          const startX = rand() * w;
          const startY = rand() * h;
          const segments = 3 + Math.floor(rand() * 4);
          const direction = rand() > 0.5 ? 1 : -1;

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          let px = startX;
          let py = startY;

          for (let s = 0; s < segments; s++) {
            const segLen = 30 + rand() * 80;
            const angle =
              (rand() * Math.PI) / 3 +
              slowTime * 0.5 * direction +
              (Math.PI / 2) * (s % 2 === 0 ? 1 : -1);
            px += Math.cos(angle) * segLen;
            py += Math.sin(angle) * segLen;
            ctx.lineTo(px, py);
          }

          ctx.strokeStyle = i % 2 === 0 ? accent1 : accent2;
          ctx.globalAlpha = 0.25 + rand() * 0.2 + hoverIntensity * 0.1;
          ctx.stroke();
        }

        ctx.globalAlpha = 0.5;
        const junctionCount = 2 + (rawSeed % 3);
        for (let j = 0; j < junctionCount; j++) {
          const jx = w * 0.2 + rand() * w * 0.6;
          const jy = h * 0.2 + rand() * h * 0.6;
          const pulse = Math.sin(slowTime + j * 2) * 0.5 + 0.5;

          ctx.beginPath();
          ctx.arc(jx, jy, 2 + pulse * 3, 0, Math.PI * 2);
          ctx.fillStyle = accent1;
          ctx.fill();
        }
      } else if (patternType === 2) {
        const cellSize = 20 + (rawSeed % 12);
        const cols = Math.ceil(w / cellSize);
        const rows = Math.ceil(h / cellSize);
        ctx.lineWidth = 0.4;

        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const cx = c * cellSize;
            const cy = r * cellSize;
            const v = seededRandom(rawSeed + c * 100 + r * 7)();
            const phase =
              slowTime + (c * 0.3 + r * 0.2) + v * Math.PI * 2;
            const pulse = Math.sin(phase) * 0.5 + 0.5;

            if (v > 0.4) {
              ctx.globalAlpha = 0.15 + pulse * 0.2 + hoverIntensity * 0.1;

              if (v > 0.75) {
                ctx.strokeStyle = accent1;
                ctx.beginPath();
                ctx.arc(
                  cx + cellSize / 2,
                  cy + cellSize / 2,
                  cellSize * 0.3 * (0.5 + pulse * 0.5),
                  0,
                  Math.PI * 2
                );
                ctx.stroke();
              } else if (v > 0.6) {
                ctx.strokeStyle = accent2;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + cellSize, cy + cellSize);
                ctx.stroke();
              } else {
                ctx.strokeStyle = accent1;
                ctx.beginPath();
                ctx.moveTo(cx + cellSize, cy);
                ctx.lineTo(cx, cy + cellSize);
                ctx.stroke();
              }
            }
          }
        }

        ctx.globalAlpha = 0.5 + hoverIntensity * 0.2;
        const hexSize = cellSize * 0.08;
        const hexPoints = 2 + (rawSeed % 3);
        for (let p = 0; p < hexPoints; p++) {
          const hx = rand() * w;
          const hy = rand() * h;
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (Math.PI / 3) * a - Math.PI / 6;
            const px = hx + hexSize * Math.cos(angle);
            const py = hy + hexSize * Math.sin(angle);
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fillStyle = accent1;
          ctx.fill();
        }
      } else {
        const rings = 3 + (rawSeed % 3);
        ctx.lineWidth = 0.6;

        for (let ring = 0; ring < rings; ring++) {
          const cx = w * (0.3 + rand() * 0.4);
          const cy = h * (0.3 + rand() * 0.4);
          const baseRadius = 20 + ring * 25 + rand() * 15;
          const segments = 6 + (rawSeed % 5);

          ctx.beginPath();
          ctx.strokeStyle = ring % 2 === 0 ? accent1 : accent2;
          ctx.globalAlpha =
            0.2 + (0.15 / (ring + 1)) + hoverIntensity * 0.1;

          for (let s = 0; s <= segments; s++) {
            const angle =
              (s / segments) * Math.PI * 2 +
              slowTime * (ring % 2 === 0 ? 1 : -1) * 0.3;
            const wobble =
              Math.sin(slowTime * 2 + s * 0.8 + ring) * 8 +
              Math.sin(slowTime * 1.5 + s * 1.3 + ring * 2) * 4;
            const r = baseRadius + wobble;
            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;

            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();

          if (ring === 0) {
            ctx.beginPath();
            ctx.arc(cx, cy, 2, 0, Math.PI * 2);
            ctx.fillStyle = accent1;
            ctx.globalAlpha = 0.7;
            ctx.fill();
          }
        }

        const spokes = 4 + (rawSeed % 3);
        ctx.globalAlpha = 0.12 + hoverIntensity * 0.05;
        ctx.strokeStyle = accent1;
        ctx.lineWidth = 0.3;
        const scx = w * 0.5;
        const scy = h * 0.5;
        for (let s = 0; s < spokes; s++) {
          const angle =
            (s / spokes) * Math.PI * 2 + slowTime * 0.15;
          ctx.beginPath();
          ctx.moveTo(scx, scy);
          ctx.lineTo(
            scx + Math.cos(angle) * Math.max(w, h),
            scy + Math.sin(angle) * Math.max(w, h)
          );
          ctx.stroke();
        }
      }

      const vignette = ctx.createRadialGradient(
        w / 2,
        h / 2,
        w * 0.2,
        w / 2,
        h / 2,
        w * 0.8
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);
    },
    [seed, hoverIntensity]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function setup() {
      if (!canvas) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    setup();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      draw(ctx, width, height, 0);
      return;
    }

    let running = true;
    function animate() {
      if (!running) return;
      timeRef.current += 16;
      draw(ctx!, width, height, timeRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw, width, height, seed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      draw(ctx, width, height, 0);
    }
  }, [hoverIntensity, draw, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", borderRadius: "4px 4px 0 0" }}
      aria-hidden="true"
    />
  );
}