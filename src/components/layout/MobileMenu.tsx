"use client";

import Link from "next/link";
import { brand } from "@/config/brand";
import { Sheet } from "@/components/ui/Sheet";
import { Glow } from "@/components/brand/Glow";
import { useCompare } from "@/lib/useCompare";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { slugs } = useCompare();
  const items = [...brand.nav, { label: slugs.length ? `Compare (${slugs.length})` : "Compare", href: "/compare" }];

  return (
    <Sheet open={open} onClose={onClose} title="Menu" hideTitle tone="night" variant="full">
      <div className="relative isolate">
        <Glow at="right" />
        <nav aria-label="Mobile" className="px-6 pb-10">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-b border-lavender/15">
                <Link href={item.href} onClick={onClose} className="display flex min-h-16 items-center text-[1.75rem] text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/book" onClick={onClose} className="btn btn-gold mt-8 w-full">
            {brand.copy.bookCta}
          </Link>
          <div className="mt-8 space-y-1 text-base">
            {brand.phones.map((p) => (
              <a key={p.href} href={p.href} className="tabular block py-1.5 text-lavender">
                {p.display}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </Sheet>
  );
}
