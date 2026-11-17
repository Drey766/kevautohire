"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Hide the heading visually but keep it for screen readers. */
  hideTitle?: boolean;
  tone?: "light" | "night";
  variant?: "bottom" | "full";
  className?: string;
  children: ReactNode;
}

/** Modal sheet on the native <dialog>: focus trap, Escape and inert page come from the browser. */
export function Sheet({ open, onClose, title, hideTitle, tone = "light", variant = "bottom", className, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    return () => {
      if (d.open) d.close();
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(variant === "bottom" ? "sheet" : "sheet-full", tone === "night" && "sheet-night night-scope", className)}
    >
      <div className={cn("flex items-center justify-between gap-4 px-5 pt-4 pb-2", hideTitle && "justify-end")}>
        {!hideTitle && <h2 className={cn("text-xl", tone === "night" && "text-white")}>{title}</h2>}
        <button type="button" onClick={onClose} aria-label="Close" className={cn("flex h-11 w-11 items-center justify-center rounded-full", tone === "night" ? "text-white" : "text-ink")}>
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
