import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { brand } from "@/config/brand";
import { Glow } from "@/components/brand/Glow";
import { ArrivalLine } from "@/components/brand/ArrivalLine";
import { FinalCta } from "@/components/home/FinalCta";
import { Stepper } from "@/components/steps/Stepper";
import { PageHero } from "@/components/ui/PageHero";
import { DraftBadge } from "@/components/ui/Tags";
import { requirements, steps } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  path: "/how-it-works",
  title: "How It Works",
  description: "From choosing your vehicle to the final drop-off: how booking with us works, step by step.",
});

const AIRPORT_FLOW = [
  { title: "Share your flight", text: "Your airport, date and time, flight number, passengers and bags." },
  { title: "We confirm your quote", text: "We come back with the vehicle, the arrangements and your quote." },
  { title: "Your ride is ready", text: "How the pickup works is confirmed before you fly." },
  { title: "Keep us posted", text: "If your flight changes, call or message us." },
];

export default function HowItWorksPage() {
  const chauffeur = requirements.find((r) => r.id === "chauffeur");
  return (
    <>
      <PageHero title="How it works" lede="A short request, a clear quote, and a driver waiting when you need one." />

      <section className="section section-white">
        <div className="container-site max-w-4xl">
          <div className="mb-8 flex justify-end">
            <DraftBadge />
          </div>
          <Stepper steps={steps} />
        </div>
      </section>

      <section className="section section-mist">
        <div className="container-site grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="h-section">Chauffeur-driven, every time</h2>
            <p className="lede mt-5">{brand.voice.enjoy}</p>
            <Link href="/services/chauffeur-services" className="link mt-5 inline-flex min-h-11 items-center">
              About chauffeur-driven hire
            </Link>
          </div>

          {chauffeur && (
            <div className="panel-light p-6 sm:p-8">
              <h3 className="text-[1.75rem]">What to tell us</h3>
              <p className="mt-3">A few details are enough to begin. The rest is confirmed when you book.</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {chauffeur.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="night section overflow-hidden">
        <Glow at="left" />
        <div className="container-site">
          <h2 className="h-section">Airport transfers</h2>
          <ArrivalLine className="mt-6 h-20 sm:h-28" />
          <ol className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {AIRPORT_FLOW.map((s) => (
              <li key={s.title} className="border-l border-accent/60 pl-4">
                <h3 className="text-[1.375rem]">{s.title}</h3>
                <p className="mt-2 text-base">{s.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/services/airport-transfers" className="btn btn-ghost mt-9">
            Request a transfer
          </Link>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
