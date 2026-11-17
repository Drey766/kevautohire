import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { brand } from "@/config/brand";
import { Ribbon } from "@/components/brand/Ribbon";
import { FinalCta } from "@/components/home/FinalCta";
import { PromiseStrip } from "@/components/home/PromiseStrip";
import { PageHero } from "@/components/ui/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { DraftBadge } from "@/components/ui/Tags";

export const metadata: Metadata = pageMeta({
  path: "/about",
  title: "About",
  description: brand.about.who,
});

export default function AboutPage() {
  const a = brand.about;
  return (
    <>
      <PageHero title={brand.voice.elegance} lede={brand.voice.prestige} />
      <section className="section section-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <h2 className="h-section">Who we are</h2>
              <DraftBadge />
            </div>
            <p className="lede mt-5">{a.who}</p>
            {a.experience && <p className="mt-4">{a.experience}</p>}
            <Ribbon className="mt-7 w-56" tone="gold" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mist lg:col-span-6">
            <SmartImage src="/fleet/im-001/prado-wedding-convoy.jpg" alt={brand.copy.photoAlt} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container-site grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="text-3xl">Mission</h2>
            <p className="display mt-4 text-[1.75rem] leading-snug text-purple">{a.mission}</p>
          </div>
          <div>
            <h2 className="text-3xl">Vision</h2>
            <p className="display mt-4 text-[1.75rem] leading-snug text-purple">{a.vision}</p>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container-site">
          <h2 className="h-section">What we value</h2>
          <dl className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v) => (
              <div key={v.name} className="border-t border-gold pt-5">
                <dt className="display text-[1.625rem] text-ink">{v.name}</dt>
                <dd className="mt-2">{v.text}</dd>
              </div>
            ))}
          </dl>
          {a.team.length > 0 && (
            <ul className="mt-12 grid gap-6 sm:grid-cols-3">
              {a.team.map((m) => (
                <li key={m.name}>
                  <p className="display text-xl text-ink">{m.name}</p>
                  <p>{m.role}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <PromiseStrip />
      <FinalCta />
    </>
  );
}
