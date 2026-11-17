import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Suspense } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { RingLoader } from "@/components/brand/AccentRing";
import { BookClient } from "@/components/forms/BookClient";
import { PageHero } from "@/components/ui/PageHero";
import { cars } from "@/lib/data";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = pageMeta({
  path: "/book",
  title: "Request a Booking",
  description: "Request a chauffeur-driven vehicle, an airport transfer or wedding transport. We confirm availability and your quote.",
});

const bookable = cars.map(({ slug, name, ref, driveOptions, dailyRateKes, rateOnRequest }) => ({ slug, name, ref, driveOptions, dailyRateKes, rateOnRequest }));

export default function BookPage() {
  return (
    <>
      <PageHero title={brand.copy.bookCta} lede={brand.voice.trio.join(". ") + "."} />
      <section className="section-mist pt-8 pb-24 lg:pt-12">
        <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-12">
          <div className="panel-light min-w-0 p-5 sm:p-8 lg:col-span-8">
            <Suspense
              fallback={
                <div className="flex min-h-96 items-center justify-center">
                  <RingLoader />
                </div>
              }
            >
              <BookClient cars={bookable} />
            </Suspense>
          </div>
          <aside className="lg:col-span-4">
            <div className="night overflow-hidden rounded-2xl p-6 sm:p-7 lg:sticky lg:top-24">
              <h2 className="text-2xl">Rather talk to us?</h2>
              <p className="mt-2 text-base">Call, text or WhatsApp us.</p>
              <ul className="mt-4">
                {brand.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="tabular inline-flex min-h-11 items-center gap-2.5 text-white hover:text-soft">
                      <Phone size={16} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                      {p.display}
                    </a>
                  </li>
                ))}
              </ul>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-4 w-full">
                <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
                {brand.copy.whatsappCta}
              </a>
              <p className="mt-5 text-sm">{brand.copy.coverageNote}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
