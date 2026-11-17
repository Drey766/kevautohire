import { useId } from "react";
import { cn } from "@/lib/cn";

/** The logo's swoosh ring: two sweeping accent arcs, drawn large as a backdrop on dark sections. */
export function Swoosh({ className }: { className?: string }) {
  const id = `swoosh-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true" className={cn("pointer-events-none block", className)}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-accent-to)" stopOpacity="0.95" />
          <stop offset="1" stopColor="var(--brand-accent-from)" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {/* Upper sweep, thick to thin, like the logo's top arc */}
      <path d="M92 352 C 70 210, 180 70, 330 58 C 420 51, 500 92, 548 150 C 488 112, 418 92, 340 98 C 210 108, 112 210, 92 352 Z" fill={`url(#${id})`} />
      {/* Lower arc, a fine line */}
      <path d="M150 470 C 230 548, 380 560, 470 482" fill="none" stroke="var(--brand-accent)" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      <circle cx="300" cy="300" r="262" fill="none" stroke="var(--brand-accent)" strokeOpacity="0.12" strokeWidth="1" />
    </svg>
  );
}
