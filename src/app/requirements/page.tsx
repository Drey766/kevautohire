import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Check } from "lucide-react";
import { brand } from "@/config/brand";
import { FaqList } from "@/components/faq/FaqList";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { DraftBadge } from "@/components/ui/Tags";
import { faqs, requirements } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  path: "/requirements",
  title: "Requirements & FAQs",
  description: "What to have ready for chauffeur-driven hire, airport transfers, weddings and road trips, and answers to common questions.",
});

export default function RequirementsPage() {
  return (
    <>
      <PageHero title="Requirements & FAQs" lede="What to have ready, and answers to what people ask most." />
      <section className="section section-white">
        <div className="container-site">
          <div className="flex items-center gap-3">
            <h2 className="h-section">What you&apos;ll need</h2>
            <DraftBadge />
          </div>
          <p className="mt-3 max-w-2xl">These are general guidelines. The full requirements for your booking are confirmed when we reply. {brand.legal.formNotice}</p>
          <div className="mt-9 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {requirements.map((g) => (
              <div key={g.id} className="border-t border-line pt-6">
                <h3 className="text-[1.625rem]">{g.title}</h3>
                <ul className="mt-3 space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={18} strokeWidth={1.5} className="mt-1 flex-none text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-mist">
        <div className="container-site max-w-4xl">
          <div className="flex items-center gap-3">
            <h2 className="h-section">Frequently asked</h2>
            <DraftBadge />
          </div>
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
