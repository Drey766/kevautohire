import Link from "next/link";
import { brand } from "@/config/brand";
import { CarCard } from "@/components/fleet/CarCard";
import { featuredCars } from "@/lib/data";

export function FeaturedRail() {
  const list = featuredCars();
  return (
    <section className="section section-mist overflow-hidden">
      <div className="container-site flex flex-wrap items-end justify-between gap-4">
        <h2 className="h-section">Featured vehicles</h2>
        <Link href="/fleet" className="link inline-flex min-h-11 items-center">
          {brand.copy.fleetCta}
        </Link>
      </div>
      {/* Native horizontal scroll with snap points. Focusable so keyboard users can scroll it. */}
      <div tabIndex={0} role="region" aria-label="Featured cars" className="no-scrollbar mt-9 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-3 md:scroll-pl-10 md:px-10 min-[1360px]:scroll-pl-[calc((100vw-80rem)/2+2.5rem)] min-[1360px]:px-[calc((100vw-80rem)/2+2.5rem)]">
        {list.map((car) => (
          <div key={car.ref} className="w-[82vw] max-w-[350px] flex-none snap-start">
            <CarCard car={car} sizes="350px" />
          </div>
        ))}
      </div>
    </section>
  );
}
