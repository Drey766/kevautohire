"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarCheck, Car, MessageCircle, Phone } from "lucide-react";
import { CallSheet } from "@/components/layout/CallSheet";
import { waLink } from "@/lib/whatsapp";

const item = "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[0.75rem] font-normal text-lavender";

export function MobileActionBar() {
  const pathname = usePathname();
  const [callOpen, setCallOpen] = useState(false);
  const carSlug = pathname.match(/^\/fleet\/([^/]+)$/)?.[1];

  return (
    <>
      <nav aria-label="Quick actions" className="night-scope fixed inset-x-0 bottom-0 z-40 border-t border-lavender/20 bg-aubergine/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden">
        <div className="flex">
          <button type="button" className={item} aria-haspopup="dialog" onClick={() => setCallOpen(true)}>
            <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
            Call
          </button>
          <a className={item} href={waLink()} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
            WhatsApp
          </a>
          {carSlug ? null : (
            <Link className={item} href="/fleet">
              <Car size={20} strokeWidth={1.5} aria-hidden="true" />
              Fleet
            </Link>
          )}
          <Link className={`${item} ${carSlug ? "flex-[1.6]" : ""} text-gold`} href={carSlug ? `/book?car=${carSlug}` : "/book"}>
            <CalendarCheck size={20} strokeWidth={1.5} aria-hidden="true" />
            {carSlug ? "Book this car" : "Book"}
          </Link>
        </div>
      </nav>
      <CallSheet open={callOpen} onClose={() => setCallOpen(false)} />
    </>
  );
}
