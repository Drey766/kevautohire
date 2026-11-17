"use client";

import { Plane } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/cn";

interface ArrivalLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/** The fine dashed flight path from the brand's posts. Draws itself in when scrolled to. */
export function ArrivalLine({ orientation = "horizontal", className }: ArrivalLineProps) {
  const ref = useReveal<HTMLDivElement>(0.2);

  if (orientation === "vertical") {
    return (
      <div className={cn("pointer-events-none", className)} aria-hidden="true">
        <div ref={ref} className="draw draw-y h-full w-px mx-auto" style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--brand-accent) 0 6px, transparent 6px 14px)" }} />
      </div>
    );
  }

  return (
    <div className={cn("pointer-events-none relative text-accent", className)} aria-hidden="true">
      <div ref={ref} className="draw draw-x h-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0 104 C 260 110, 520 112, 760 84 S 1090 24, 1176 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeDasharray="5 9" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        </svg>
        <Plane size={20} strokeWidth={1.5} className="plane absolute right-0 top-[3%] rotate-[8deg]" />
      </div>
    </div>
  );
}
