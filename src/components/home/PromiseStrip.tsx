import { BadgeCheck, CircleCheck, MapPinned, ShieldCheck, UserRound, Users, type LucideIcon } from "lucide-react";
import { brand } from "@/config/brand";
import { AccentRing } from "@/components/brand/AccentRing";

// In the same order as brand.voice.promises.
const ICONS: LucideIcon[] = [Users, UserRound, BadgeCheck, ShieldCheck, CircleCheck, MapPinned];

export function PromiseStrip() {
  return (
    <section aria-label="Our promises" className="night">
      <div className="container-site">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-soft/15 py-8 md:grid-cols-3 xl:flex xl:justify-between">
          {brand.voice.promises.map((promise, i) => {
            const Icon = ICONS[i];
            return (
              <li key={promise} className="flex items-center gap-3 text-[0.9375rem] leading-tight text-white">
                <AccentRing size={46} className="text-accent">
                  <Icon size={18} strokeWidth={1.4} aria-hidden="true" />
                </AccentRing>
                {promise}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
