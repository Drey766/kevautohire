import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight, Crown, Gem, KeyRound, Plane, UserRound, type LucideIcon } from "lucide-react";
import { brand } from "@/config/brand";
import { GoldRing } from "@/components/brand/GoldRing";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { DraftBadge } from "@/components/ui/Tags";
import { services } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  path: "/services",
  title: "Services",
  description: "Airport transfers, chauffeur services, self-drive hire, weddings, VIP events and executive transfers from Nairobi CBD.",
});

const ICONS: Record<string, LucideIcon> = { "airport-transfers": Plane, "chauffeur-services": UserRound, "self-drive": KeyRound, weddings: Gem, "vip-executive": Crown };

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services" lede={brand.voice.bio} />
      <section className="section section-white">
        <div className="container-site">
          <ul className="divide-y divide-line border-y border-line">
            {services.map((s) => {
              const Icon = ICONS[s.slug];
              return (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group grid items-center gap-x-8 gap-y-3 py-7 md:grid-cols-12 lg:py-9">
                    <span className="flex items-center gap-5 md:col-span-6">
                      <GoldRing size={60} className="text-purple">
                        <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
                      </GoldRing>
                      <span className="display text-[1.75rem] leading-tight text-ink transition-colors group-hover:text-purple lg:text-[2.25rem]">{s.title}</span>
                    </span>
                    <span className="md:col-span-5">
                      {s.summary} <DraftBadge status={s.status} />
                    </span>
                    <ArrowUpRight size={24} strokeWidth={1.25} aria-hidden="true" className="hidden justify-self-end text-purple md:block" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
