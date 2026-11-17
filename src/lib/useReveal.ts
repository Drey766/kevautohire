"use client";

import { useEffect, useRef } from "react";

/**
 * Marks an element as revealed when it scrolls into view. Elements start visible and are only
 * "armed" (hidden) if they are below the fold once JS runs, so content never depends on JS and
 * above-the-fold content never flashes. Does nothing under prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.shown = "";
      return;
    }
    if (el.getBoundingClientRect().top > window.innerHeight * 0.92) el.dataset.armed = "";
    else {
      el.dataset.shown = "";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          delete el.dataset.armed;
          el.dataset.shown = "";
          io.disconnect();
        }
      },
      { threshold },
    );
    // A fully clipped element never reports as intersecting, so watch the drawing's parent instead.
    io.observe(el.classList.contains("draw") && el.parentElement ? el.parentElement : el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
