"use client";

import type { ReactNode } from "react";
import { Sheet } from "@/components/ui/Sheet";

export function FilterSheet({ open, onClose, resultCount, onClear, children }: { open: boolean; onClose: () => void; resultCount: number; onClear: () => void; children: ReactNode }) {
  return (
    <Sheet open={open} onClose={onClose} title="Filters">
      <div className="px-5 pb-28">{children}</div>
      <div className="sticky bottom-0 flex items-center gap-3 border-t border-line bg-white px-5 py-3">
        <button type="button" onClick={onClear} className="link min-h-12 px-2">
          Clear all
        </button>
        <button type="button" onClick={onClose} className="btn btn-primary tabular flex-1">
          Show {resultCount} {resultCount === 1 ? "car" : "cars"}
        </button>
      </div>
    </Sheet>
  );
}
