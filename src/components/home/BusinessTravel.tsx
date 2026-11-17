import Link from "next/link";
import { brand } from "@/config/brand";
import { ArrivalLine } from "@/components/brand/ArrivalLine";
import { Glow } from "@/components/brand/Glow";

// Draft stops along the line.
const STOPS = ["Airport pickup", "Business meeting", "Back to the hotel"];

export function BusinessTravel() {
  return (
    <section className="section section-mist">
      <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <h2 className="h-section">Airport and corporate travel</h2>
          <p className="lede mt-5 text-ink">{brand.voice.whether}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/services/airport-transfers" className="btn btn-primary">
              Airport Transfers
            </Link>
            <Link href="/services/corporate-travel" className="btn btn-ghost">
              Corporate Travel
            </Link>
          </div>
        </div>

        <div className="night overflow-hidden rounded-2xl p-7 sm:p-10 lg:col-span-7">
          <Glow at="hero" />
          <ArrivalLine className="h-24 sm:h-32" />
          <ol className="mt-4 grid gap-5 sm:grid-cols-3">
            {STOPS.map((stop) => (
              <li key={stop} className="display border-l border-accent/60 pl-4 text-[1.5rem] leading-tight text-white">
                {stop}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[0.9375rem]">{brand.copy.coverageNote}</p>
        </div>
      </div>
    </section>
  );
}
