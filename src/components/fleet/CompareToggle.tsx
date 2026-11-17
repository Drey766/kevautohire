"use client";

import { Check, Plus } from "lucide-react";
import { useCompare } from "@/lib/useCompare";
import { cn } from "@/lib/cn";

export function CompareToggle({ slug, name, tone = "light" }: { slug: string; name: string; tone?: "light" | "dark" }) {
  const { slugs, toggle, isFull } = useCompare();
  const active = slugs.includes(slug);
  const disabled = !active && isFull;
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from compare` : `Add ${name} to compare`}
      title={disabled ? "You can compare up to 3 cars" : undefined}
      disabled={disabled}
      onClick={() => toggle(slug)}
      className={cn("inline-flex min-h-11 items-center gap-1 text-sm font-normal transition-colors disabled:opacity-50", tone === "dark" ? "text-soft hover:text-white" : active ? "text-primary" : "text-body hover:text-primary")}
    >
      {active ? <Check size={16} strokeWidth={1.75} aria-hidden="true" /> : <Plus size={16} strokeWidth={1.75} aria-hidden="true" />}
      {active ? "Comparing" : "Compare"}
    </button>
  );
}
