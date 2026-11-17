import { cn } from "@/lib/cn";

/** The wedding-car ribbon: two soft, crossing lines used as a divider. */
export function Ribbon({ className, tone = "soft" }: { className?: string; tone?: "soft" | "accent" }) {
  return (
    <svg viewBox="0 0 1200 64" preserveAspectRatio="none" aria-hidden="true" className={cn("block w-full h-10", tone === "accent" ? "text-accent" : "text-soft", className)}>
      <path d="M0 40 C 200 2, 400 62, 600 32 S 1000 4, 1200 36" fill="none" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      <path d="M0 24 C 220 62, 380 4, 600 32 S 980 62, 1200 22" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
