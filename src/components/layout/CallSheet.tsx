"use client";

import { Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { Sheet } from "@/components/ui/Sheet";
import { GoldRing } from "@/components/brand/GoldRing";

export function CallSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} onClose={onClose} title={brand.copy.callCta} tone="night">
      <ul className="space-y-2 px-5 pb-8 pt-2">
        {brand.phones.map((p) => (
          <li key={p.href}>
            <a href={p.href} className="flex min-h-16 items-center gap-4 rounded-2xl bg-aubergine-raised px-4 py-3 text-lg font-normal text-white tabular">
              <GoldRing size={40} className="text-gold">
                <Phone size={16} strokeWidth={1.5} />
              </GoldRing>
              {p.display}
            </a>
          </li>
        ))}
      </ul>
    </Sheet>
  );
}
