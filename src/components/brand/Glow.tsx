import { cn } from "@/lib/cn";

const POSITIONS = {
  hero: "radial-gradient(60% 70% at 78% 30%, color-mix(in srgb, var(--brand-primary) 55%, transparent) 0%, transparent 70%), radial-gradient(40% 50% at 10% 90%, color-mix(in srgb, var(--brand-soft) 16%, transparent) 0%, transparent 70%)",
  center: "radial-gradient(55% 70% at 50% 58%, color-mix(in srgb, var(--brand-primary) 60%, transparent) 0%, transparent 72%), radial-gradient(28% 42% at 50% 58%, color-mix(in srgb, var(--brand-soft) 22%, transparent) 0%, transparent 70%)",
  left: "radial-gradient(50% 80% at 8% 20%, color-mix(in srgb, var(--brand-primary) 50%, transparent) 0%, transparent 70%)",
  right: "radial-gradient(50% 80% at 92% 80%, color-mix(in srgb, var(--brand-primary) 50%, transparent) 0%, transparent 70%)",
} as const;

/** Soft-green night-sky light. Sits behind content inside a `.night` section. */
export function Glow({ at = "center", className }: { at?: keyof typeof POSITIONS; className?: string }) {
  return <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10", className)} style={{ backgroundImage: POSITIONS[at] }} />;
}
