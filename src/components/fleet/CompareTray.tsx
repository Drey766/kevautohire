"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCompare } from "@/lib/useCompare";

export function CompareTray({ cars }: { cars: { slug: string; name: string }[] }) {
  const { slugs, remove, clear } = useCompare();
  const picked = slugs.map((s) => cars.find((c) => c.slug === s)).filter((c): c is { slug: string; name: string } => Boolean(c));
  if (picked.length === 0) return null;

  return (
    <div role="region" aria-label="Compare tray" className="night-scope fixed inset-x-3 bottom-[calc(68px+env(safe-area-inset-bottom))] z-30 animate-tray rounded-2xl border border-soft/25 bg-night p-3 shadow-[0_16px_40px_var(--shadow-tint)] lg:bottom-6 lg:left-6 lg:right-auto lg:w-[min(620px,calc(100vw-20rem))]">
      <div className="flex items-center gap-3">
        <ul className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto">
          {picked.map((c) => (
            <li key={c.slug} className="flex flex-none items-center gap-1 rounded-full bg-night-raised py-0.5 pr-0.5 pl-3 text-sm whitespace-nowrap text-white">
              {c.name}
              <button type="button" onClick={() => remove(c.slug)} aria-label={`Remove ${c.name} from compare`} className="flex h-11 w-11 items-center justify-center rounded-full text-soft hover:text-white">
                <X size={15} strokeWidth={1.75} />
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={clear} className="hidden min-h-11 px-2 text-sm text-soft hover:text-white sm:block">
          Clear
        </button>
        <Link href="/compare" className="btn btn-accent min-h-11 flex-none px-5">
          Compare
        </Link>
      </div>
    </div>
  );
}
