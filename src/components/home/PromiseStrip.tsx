import { Briefcase, Crown, Gem, Headset, MapPinned, Mountain, UserRound, type LucideIcon } from "lucide-react";
import { brand } from "@/config/brand";
import { GoldRing } from "@/components/brand/GoldRing";

// In the same order as brand.voice.promises.
const ICONS: LucideIcon[] = [Gem, Mountain, Headset, Crown, UserRound, Briefcase, MapPinned];

export function PromiseStrip() {
  return (
    <section aria-label="Our promises" className="night">
      <div className="container-site">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-lavender/15 py-8 md:grid-cols-4 xl:flex xl:justify-between">
          {brand.voice.promises.map((promise, i) => {
            const Icon = ICONS[i];
            return (
              <li key={promise} className="flex items-center gap-3 text-[0.9375rem] leading-tight text-white">
                <GoldRing size={46} className="text-gold">
                  <Icon size={18} strokeWidth={1.4} aria-hidden="true" />
                </GoldRing>
                {promise}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
