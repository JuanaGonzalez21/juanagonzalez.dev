"use client";

import { useEffect, useRef } from "react";

const bubbles = [
  { x: .14, phase: .22, radius: 32, speed: 27 },
  { x: .33, phase: .65, radius: 46, speed: 23 },
  { x: .76, phase: .54, radius: 52, speed: 21 },
  { x: .86, phase: .12, radius: 29, speed: 31 },
  { x: .52, phase: .84, radius: 37, speed: 25 },
  { x: .67, phase: .38, radius: 23, speed: 34 },
  { x: .22, phase: .46, radius: 20, speed: 32 },
  { x: .58, phase: .08, radius: 41, speed: 22 },
  { x: .91, phase: .73, radius: 18, speed: 36 },
  { x: .09, phase: .91, radius: 38, speed: 24 },
  { x: .43, phase: .31, radius: 27, speed: 29 },
  { x: .72, phase: .96, radius: 34, speed: 26 },
  { x: .38, phase: .04, radius: 16, speed: 38 },
  { x: .82, phase: .43, radius: 22, speed: 33 },
];

/** One small, shared animation drives the bubbles and both reveal masks. */
export default function HeroBubbles() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const hero = document.getElementById("inicio");
    if (!layer || !hero) return;
    const panel = hero.querySelector<HTMLElement>(".scene-panel");
    const flow = hero.closest<HTMLElement>(".scene-flow");
    const targets = Array.from(hero.querySelectorAll<HTMLElement>(".photo-frame, .h1-torch"));
    const nodes = Array.from(layer.children) as HTMLElement[];
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let bounds = layer.getBoundingClientRect();

    const clear = () => {
      layer.style.opacity = "0";
      targets.forEach((target) => target.style.removeProperty("--ambient-mask"));
      lastTime = 0;
    };
    const isHome = () => {
      if (flow?.dataset.enhanced && panel) return panel.style.visibility === "visible" && !panel.inert;
      const rect = hero.getBoundingClientRect();
      return rect.top < innerHeight * .5 && rect.bottom > innerHeight * .5;
    };

    const paint = (now: number) => {
      frame = 0;
      if (document.hidden || motion.matches || !isHome()) { clear(); return; }
      // Cap mask updates to 30 fps; inactive sections run no animation loop.
      if (lastTime && now - lastTime < 1000 / 30) { frame = requestAnimationFrame(paint); return; }
      elapsed += lastTime ? Math.min(now - lastTime, 100) / 1000 : 0;
      lastTime = now;
      const compact = bounds.width < 600;
      const positions = bubbles.slice(0, compact ? 8 : bubbles.length).map((bubble) => {
        const radius = bubble.radius * (compact ? .72 : 1);
        const travel = bounds.height + radius * 2;
        const distance = (elapsed * bubble.speed + bubble.phase * travel) % travel;
        return {
          radius,
          x: bounds.width * (bubble.x + Math.sin(elapsed * .19 + bubble.phase * Math.PI * 2) * .16),
          y: travel - distance - radius,
        };
      });
      // Read moving target positions before writing transforms and masks.
      const targetBounds = targets.map((target) => target.getBoundingClientRect());
      layer.style.opacity = "1";
      nodes.forEach((node, index) => {
        const bubble = positions[index];
        node.style.display = bubble ? "block" : "none";
        if (!bubble) return;
        node.style.width = `${bubble.radius * 2}px`;
        node.style.height = `${bubble.radius * 2}px`;
        node.style.transform = `translate3d(${bubble.x - bubble.radius}px, ${bubble.y - bubble.radius}px, 0)`;
      });
      targets.forEach((target, index) => {
        const rect = targetBounds[index];
        const masks = positions.flatMap((bubble) => {
          const x = bounds.left + bubble.x - rect.left;
          const y = bounds.top + bubble.y - rect.top;
          if (x + bubble.radius < 0 || y + bubble.radius < 0 || x - bubble.radius > rect.width || y - bubble.radius > rect.height) return [];
          return [`radial-gradient(circle ${bubble.radius}px at ${x}px ${y}px, #000 84%, transparent 100%)`];
        });
        if (masks.length) target.style.setProperty("--ambient-mask", masks.join(","));
        else target.style.removeProperty("--ambient-mask");
      });
      frame = requestAnimationFrame(paint);
    };
    const wake = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const resize = () => { bounds = layer.getBoundingClientRect(); wake(); };
    addEventListener("scroll", wake, { passive: true });
    addEventListener("resize", resize);
    document.addEventListener("visibilitychange", wake);
    motion.addEventListener("change", wake);
    wake();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", wake);
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", wake);
      motion.removeEventListener("change", wake);
      clear();
    };
  }, []);

  return (
    <div className="hero-bubbles" ref={layerRef} aria-hidden="true">
      {bubbles.map((_, index) => <span className="hero-bubble" key={index} />)}
    </div>
  );
}
