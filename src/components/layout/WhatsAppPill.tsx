"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { MessageCircle } from "lucide-react";
import { brand } from "@/config/brand";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

/** Desktop only: phones have the sticky action bar. Waits for a scroll so it never covers the hero console. */
export function WhatsAppPill() {
  const shown = useSyncExternalStore(subscribeScroll, () => window.scrollY > 480, () => false);
  // Car pages and the booking page carry their own WhatsApp button.
  const hidden = /^\/(fleet\/[^/]+|book)$/.test(usePathname());
  if (hidden) return null;
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={shown ? undefined : -1}
      aria-hidden={shown ? undefined : true}
      className={cn("night-scope btn fixed right-6 bottom-6 z-30 hidden border-lavender/40 bg-aubergine px-5 text-white shadow-[0_12px_32px_var(--shadow-tint)] hover:bg-aubergine-raised lg:inline-flex", shown ? "opacity-100" : "pointer-events-none opacity-0")}
    >
      <MessageCircle size={18} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
      {brand.copy.whatsappCta}
    </a>
  );
}
