"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

export default function Torch({ as: Tag, className, radius, children }: {
  as: "h1" | "figure";
  className: string;
  radius: number;
  children: ReactNode;
}) {
  const frame = useRef<number | null>(null);

  const reset = (element: HTMLElement) => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    element.style.setProperty("--r", "0px");
  };

  useEffect(() => () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
  }, []);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--mx", `${x}px`);
      element.style.setProperty("--my", `${y}px`);
      element.style.setProperty("--r", `${radius}px`);
      frame.current = null;
    });
  };

  return (
    <Tag className={className} onPointerMove={move} onPointerLeave={(event) => reset(event.currentTarget)} onPointerCancel={(event) => reset(event.currentTarget)}>
      {children}
    </Tag>
  );
}
