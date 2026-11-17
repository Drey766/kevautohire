import Link from "next/link";
import { GoldRing } from "@/components/brand/GoldRing";
import { Glow } from "@/components/brand/Glow";
import { Reveal } from "@/components/ui/Reveal";
import { getService } from "@/lib/data";

const TRIO = ["airport-transfers", "chauffeur-services", "self-drive"];

export function ServicesTrio() {
  return (
    <section className="night section overflow-hidden">
      <Glow at="left" />
      <div className="container-site">
        <h2 className="h-section max-w-2xl">Three ways to ride</h2>
        <ol className="mt-12 grid md:grid-cols-3">
          {TRIO.map((slug, i) => {
            const s = getService(slug);
            if (!s) return null;
            return (
              <li key={slug} className="border-t border-lavender/20 py-8 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:px-8 md:py-0 md:first:border-l-0 md:first:pl-0 md:last:pr-0">
                <Reveal delay={i * 110}>
                  <GoldRing size={64} className="display text-[1.375rem] text-gold">
                    {`0${i + 1}`}
                  </GoldRing>
                  <h3 className="mt-6 text-[1.875rem]">{s.title}</h3>
                  <p className="mt-3">{s.summary}</p>
                  <Link href={`/services/${s.slug}`} className="link mt-5 inline-flex min-h-11 items-center">
                    About {s.title.toLowerCase()}
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
