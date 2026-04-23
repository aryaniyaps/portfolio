"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import styles from "@/components/components.module.css";

interface FrameManifest {
  frameCount: number;
  width: number;
  height: number;
}

const SCENE_CURVES: { t: number; f: number }[][] = [
  [{ t: 0, f: 0 }, { t: 0.2, f: 0.2 }, { t: 0.6, f: 0.625 }, { t: 1, f: 1 }],
  [{ t: 0, f: 0 }, { t: 0.15, f: 0.2 }, { t: 0.65, f: 0.75 }, { t: 1, f: 1 }],
  [{ t: 0, f: 0 }, { t: 0.1, f: 0.125 }, { t: 0.7, f: 0.875 }, { t: 1, f: 1 }],
  [{ t: 0, f: 0 }, { t: 0.15, f: 0.2 }, { t: 0.6, f: 0.7 }, { t: 1, f: 1 }],
  [{ t: 0, f: 0 }, { t: 0.2, f: 0.25 }, { t: 0.65, f: 0.75 }, { t: 1, f: 1 }],
  [{ t: 0, f: 0 }, { t: 0.15, f: 0.2 }, { t: 0.7, f: 0.8 }, { t: 1, f: 1 }],
  [{ t: 0, f: 0 }, { t: 0.15, f: 0.2 }, { t: 0.7, f: 0.8 }, { t: 1, f: 1 }],
];

function remapProgress(sceneIndex: number, progress: number): number {
  const curve = SCENE_CURVES[Math.min(sceneIndex, SCENE_CURVES.length - 1)];
  for (let i = 0; i < curve.length - 1; i++) {
    const a = curve[i];
    const b = curve[i + 1];
    if (progress >= a.t && progress <= b.t) {
      const local = (progress - a.t) / (b.t - a.t);
      const eased = local * local * (3 - 2 * local);
      return a.f + eased * (b.f - a.f);
    }
  }
  return progress;
}

export default function FrameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const manifestRef = useRef<FrameManifest | null>(null);
  const currentFrameRef = useRef(-1);
  const scrollYRef = useRef(0);
  const dimsRef = useRef({ w: 0, h: 0 });
  const vigGradRef = useRef<CanvasGradient | null>(null);
  const [loaded, setLoaded] = useState(false);

  const renderFrame = useCallback((fi: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const { w, h } = dimsRef.current;
    const manifest = manifestRef.current;
    const frames = framesRef.current;
    if (!manifest || frames.length === 0) return;

    const idx = Math.round(Math.max(0, Math.min(fi, manifest.frameCount - 1)));
    const src = frames[idx];
    if (!src) return;

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);

    const sw = src.width;
    const sh = src.height;
    const scale = Math.max(w / sw, h / sh);
    const dw = sw * scale;
    const dh = sh * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;
    ctx.drawImage(src, dx, dy, dw, dh);

    let vig = vigGradRef.current;
    if (!vig) {
      vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.15, w / 2, h / 2, w * 0.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.75)");
      vigGradRef.current = vig;
    }
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);

    currentFrameRef.current = idx;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dimsRef.current = { w, h };
    vigGradRef.current = null;
    if (currentFrameRef.current >= 0) {
      renderFrame(currentFrameRef.current);
    }
  }, [renderFrame]);

  const renderFallback = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const { w, h } = dimsRef.current;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
    g.addColorStop(0, "rgba(0,212,255,0.04)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadFrames() {
      try {
        const res = await fetch("/frames/manifest.json");
        if (!res.ok) throw new Error("No manifest");
        const manifest: FrameManifest = await res.json();
        manifestRef.current = manifest;

        const images: ImageBitmap[] = [];
        const batchSize = 20;

        for (let i = 0; i < manifest.frameCount; i += batchSize) {
          if (cancelled) return;
          const batch = [];
          for (let j = i; j < Math.min(i + batchSize, manifest.frameCount); j++) {
            const padded = String(j + 1).padStart(4, "0");
            batch.push(
              fetch(`/frames/frame_${padded}.webp`)
                .then((r) => r.blob())
                .then((blob) => createImageBitmap(blob))
                .catch(() =>
                  fetch(`/frames/frame_${padded}.png`)
                    .then((r) => r.blob())
                    .then((blob) => createImageBitmap(blob))
                )
            );
          }
          const bitmaps = await Promise.all(batch);
          images.push(...bitmaps);

          if (i === 0 && !cancelled) {
            framesRef.current = images;
            setLoaded(true);
            resize();
            renderFrame(0);
          }
        }

        if (cancelled) return;
        framesRef.current = images;
      } catch {
        if (!cancelled) renderFallback();
      }
    }

    loadFrames();

    return () => {
      cancelled = true;
    };
  }, [resize, renderFrame, renderFallback]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const manifest = manifestRef.current;
    if (!manifest) return;

    const totalFrames = manifest.frameCount;
    const scenes = document.querySelectorAll("[data-scene]");
    const sceneCount = scenes.length;
    if (sceneCount === 0) return;

    const framesPerScene = totalFrames / sceneCount;

    function onScroll() {
      scrollYRef.current = window.scrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    let ticking = false;
    function tick() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = scrollYRef.current;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) {
          ticking = false;
          return;
        }

        let accumulated = 0;
        for (let i = 0; i < sceneCount; i++) {
          const section = scenes[i] as HTMLElement;
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionEnd = sectionTop + sectionHeight;

          if (scrollY >= sectionTop && scrollY < sectionEnd) {
            const sectionProgress = Math.max(
              0,
              Math.min(
                1,
                (scrollY - sectionTop) /
                  (sectionHeight - window.innerHeight)
              )
            );
            const remapped = remapProgress(i, sectionProgress);
            accumulated =
              i * framesPerScene + remapped * framesPerScene;
            break;
          }
          if (scrollY >= sectionEnd) {
            accumulated = (i + 1) * framesPerScene;
          }
        }

        const fi = Math.max(0, Math.min(totalFrames - 1, accumulated));
        if (Math.abs(fi - currentFrameRef.current) >= 0.5) {
          renderFrame(fi);
        }

        ticking = false;
      });
    }

    window.addEventListener("scroll", tick, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", tick);
    };
  }, [loaded, renderFrame]);

  return (
    <div className={styles.frameCanvasWrap}>
      <canvas ref={canvasRef} className={styles.frameCanvas} />
      <div className={styles.frameVignette} />
    </div>
  );
}
