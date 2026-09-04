"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getSceneProgress, smoothProgress as ease } from "./scene-progress";

const objectSelector = ".hero-inner, .hero-stage, .scroll-ind, .section-head, .about-copy > *, .about-deco, .do-card, .project-media, .project-body, .tl-item, .c2-head, .c2-mailcard, .c2-socials";

/** Native document scrolling drives a shared stage; no wheel interception. */
export default function SceneFlow({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(root.querySelectorAll<HTMLElement>(":scope > .scroll-scene"));
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link"));
    const scenes = sections.map((section) => ({
      section,
      panel: section.querySelector<HTMLElement>(".scene-panel")!,
      content: section.querySelector<HTMLElement>(".scene-content")!,
      objects: Array.from(section.querySelectorAll<HTMLElement>(objectSelector)).map((element, index) => ({
        element, index, top: 0,
        originalTransform: element.style.transform,
        originalOpacity: element.style.opacity,
      })),
      start: 0, duration: 0, overflow: 0,
    }));
    let frame = 0;
    let viewport = innerHeight;
    let disposed = false;
    let needsMeasure = true;
    let initial = true;

    const reset = () => {
      delete root.dataset.enhanced;
      scenes.forEach(({ section, panel, content, objects }) => {
        section.style.removeProperty("--scene-height");
        panel.style.removeProperty("visibility");
        panel.style.removeProperty("pointer-events");
        panel.inert = false;
        content.style.removeProperty("transform");
        objects.forEach(({ element, originalTransform, originalOpacity }) => {
          element.style.transform = originalTransform;
          element.style.opacity = originalOpacity;
        });
      });
    };

    const measure = () => {
      viewport = innerHeight;
      if (motion.matches || viewport < 500) { reset(); return; }
      root.dataset.enhanced = "true";
      let start = root.getBoundingClientRect().top + scrollY;
      // Layout reads are done only on resize/content changes, never per scroll.
      scenes.forEach((scene) => {
        scene.content.style.transform = "none";
        scene.objects.forEach(({ element }) => { element.style.transform = "none"; });
      });
      scenes.forEach((scene) => {
        scene.start = start;
        scene.overflow = Math.max(0, scene.content.offsetHeight - viewport);
        scene.duration = scene.overflow + viewport * 1.2;
        const top = scene.content.getBoundingClientRect().top;
        scene.objects.forEach((object) => { object.top = object.element.getBoundingClientRect().top - top; });
        start += scene.duration;
      });
      scenes.forEach(({ section, duration }) => section.style.setProperty("--scene-height", `${duration}px`));
      if (initial) {
        const target = scenes.find(({ section }) => `#${section.id}` === location.hash);
        if (target) scrollTo({ top: target.start, behavior: "instant" });
        initial = false;
      }
    };

    const render = () => {
      frame = 0;
      if (disposed) return;
      if (needsMeasure) { measure(); needsMeasure = false; }
      if (!root.dataset.enhanced) return;
      const y = scrollY;
      let current = scenes[0].section.id;
      scenes.forEach((scene, index) => {
        const { enter, exit, visible, interactive, offset } = getSceneProgress(
          y, scene.start, scene.duration, scene.overflow, viewport, index === 0, index === scenes.length - 1,
        );
        scene.panel.style.visibility = visible ? "visible" : "hidden";
        scene.panel.style.pointerEvents = interactive ? "auto" : "none";
        scene.panel.inert = !interactive;
        if (enter >= .5) current = scene.section.id;
        if (!visible) return;
        scene.content.style.transform = `translate3d(0, ${-offset}px, 0)`;
        scene.objects.forEach(({ element, index: order, top }) => {
          const stagger = (order % 3) * .06;
          const arrival = ease((enter - stagger) / (1 - stagger));
          const inView = ease((viewport * .98 - (top - offset)) / (viewport * .18));
          const amount = arrival * inView;
          const direction = element.classList.contains("reveal-l") || element.classList.contains("project-media") ? -1 : 1;
          const x = (1 - arrival) * 65 * direction - exit * 25 * direction;
          const shift = (1 - amount) * 40 - exit * 45;
          element.style.opacity = `${amount * (1 - exit)}`;
          element.style.transform = `translate3d(${x}px, ${shift}px, 0)`;
        });
      });
      // Services share the About entry in the existing navigation.
      if (current === "lo-que-hago") current = "sobre-mi";
      links.forEach((link) => {
        const active = link.hash === `#${current}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const resize = () => { needsMeasure = true; schedule(); };
    const revealFocus = (event: FocusEvent) => {
      if (!root.dataset.enhanced || !(event.target instanceof HTMLElement)) return;
      const scene = scenes.find(({ panel }) => panel.contains(event.target as Node));
      if (!scene) return;
      const rect = event.target.getBoundingClientRect();
      const adjustment = rect.bottom > viewport - 40 ? rect.bottom - viewport + 40 : rect.top < 90 ? rect.top - 90 : 0;
      if (adjustment) scrollTo({
        top: Math.max(scene.start, Math.min(scene.start + viewport * .2 + scene.overflow, scrollY + adjustment)),
        behavior: "instant",
      });
    };
    const observer = new ResizeObserver(resize);
    scenes.forEach(({ content }) => observer.observe(content));
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", resize);
    motion.addEventListener("change", resize);
    root.addEventListener("focusin", revealFocus);
    render();
    // Fonts can change section heights after the first layout.
    void document.fonts.ready.then(() => { if (!disposed) resize(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", resize);
      motion.removeEventListener("change", resize);
      root.removeEventListener("focusin", revealFocus);
      reset();
    };
  }, []);

  return <main className="scene-flow" ref={rootRef}>{children}</main>;
}
