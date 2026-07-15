"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Reveal
 * ------
 * Wraps children and adds the `in` class when the element enters the viewport.
 * The CSS defined in globals.css handles the actual animation:
 *   .reveal    → fades + slide up
 *   .reveal-l  → fades + slide from left
 *   .reveal-r  → fades + slide from right
 *
 * Usage:
 *   <Reveal>...content...</Reveal>
 *   <Reveal variant="left" delay={200}>...</Reveal>
 *
 * The IntersectionObserver disconnects after the first reveal so the animation
 * doesn't retrigger every time the user scrolls up and down.
 */

type Variant = "up" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number; // in milliseconds
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const variantClass: Record<Variant, string> = {
  up: "reveal",
  left: "reveal-l",
  right: "reveal-r",
};

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect users who prefer reduced motion — reveal immediately, no animation
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      el.classList.add("in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add("in");
            }, delay);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const finalClass = `${variantClass[variant]} ${className}`.trim();

  return (
    // @ts-expect-error - dynamic Tag element from JSX intrinsic
    <Tag ref={ref} className={finalClass}>
      {children}
    </Tag>
  );
}
