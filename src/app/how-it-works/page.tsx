import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
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
  description: "From choosing your car to the final drop-off: how booking with us works, step by step.",
});

const AIRPORT_FLOW = [
  { title: "Share your flight", text: "Your airport, date and time, flight number, passengers and bags." },
  { title: "We confirm your quote", text: "We come back with the car, the arrangements and your quote." },
  { title: "Your ride is ready", text: "How the pickup works is confirmed before you fly." },
  { title: "Keep us posted", text: "If your flight changes, contact us. Support is available 24/7." },
];

export default function HowItWorksPage() {
  const selfDrive = requirements.find((r) => r.id === "self-drive");
  return (
    <>
      <PageHero title="How it works" lede="A short request, a clear quote, and a car waiting when you need it." />

      <section className="section section-white">
        <div className="container-site max-w-4xl">
          <div className="mb-8 flex justify-end">
            <DraftBadge />
          </div>
          <Stepper steps={steps} />
        </div>
      </section>

      <section className="section section-mist">
        <div className="container-site">
          <h2 className="h-section">Self-drive or chauffeur</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <div className="panel-light p-6 sm:p-8">
              <h3 className="text-[1.75rem]">Self-drive</h3>
              <p className="mt-3">You take the wheel and set your own schedule. Choose a car marked for self-drive, then collect it or ask for delivery.</p>
              <Link href="/services/self-drive" className="link mt-5 inline-flex min-h-11 items-center">
                About self-drive hire
              </Link>
            </div>
            <div className="panel-light p-6 sm:p-8">
              <h3 className="text-[1.75rem]">Chauffeur</h3>
              <p className="mt-3">We provide the driver and you enjoy the journey. Suited to meetings, events, airport transfers and visiting guests.</p>
              <Link href="/services/chauffeur-services" className="link mt-5 inline-flex min-h-11 items-center">
                About chauffeur services
              </Link>
            </div>
          </div>

          {selfDrive && (
            <div className="mt-14 max-w-2xl">
              <h2 className="text-3xl">What to bring</h2>
              <p className="mt-3">For self-drive, please bring the following. Requirements are confirmed when you book.</p>
              <ul className="mt-4 space-y-2">
                {selfDrive.items.slice(0, 2).map((item) => (
                  <li key={item} className="chip mr-2">
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
              <li key={s.title} className="border-l border-gold/60 pl-4">
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
