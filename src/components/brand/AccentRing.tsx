import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AccentRingProps {
  size?: number;
  className?: string;
  children?: ReactNode;
}

/** The logo's ring as a thin double-line frame for numerals and icons. */
export function AccentRing({ size = 56, className, children }: AccentRingProps) {
  return (
    <span className={cn("accent-ring", className)} style={{ width: size, height: size }}>
      {children}
    </span>
  );
}

/** Slow dashed ring, used as the loader. */
export function RingLoader({ size = 28, label = "Loading" }: { size?: number; label?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label={label} className="animate-spin-slow text-accent" style={{ animationDuration: "3s" }}>
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" />
    </svg>
  );
}
