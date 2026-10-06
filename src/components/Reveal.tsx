"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Fades a block in the first time it scrolls into view. Uses the `.reveal`
 * classes in globals.css, which are neutralised under prefers-reduced-motion.
 *
 * Blocks are rendered visible in the HTML. Only blocks that start below the
 * fold are hidden (after hydration) and faded in on scroll, so above-the-fold
 * text such as the hero paints immediately instead of waiting for JS, which
 * was the main cause of the slow mobile LCP.
 */
type State = "static" | "hidden" | "visible";

export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<State>("static");

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    // Already on screen at load: leave it alone, no animation.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const motion = state === "static" ? "" : `reveal ${state === "visible" ? "is-visible" : ""}`;

  return (
    <Tag
      ref={ref}
      className={`${motion} ${className}`}
      style={delay && state !== "static" ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
