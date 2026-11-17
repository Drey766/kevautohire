import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Suspense } from "react";
import { brand } from "@/config/brand";
import { PageHero } from "@/components/ui/PageHero";
import { CarCard } from "@/components/fleet/CarCard";
import { FleetExplorer } from "@/components/fleet/FleetExplorer";
import { cars } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  path: "/fleet",
  title: "Fleet",
  description: "Browse sedans, SUVs and 4x4s by class, brand and rate. Every booking comes with a professional driver.",
});

function FleetFallback() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cars.slice(0, 8).map((car) => (
        <li key={car.ref}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}

export default function FleetPage() {
  return (
    <>
      <PageHero title={brand.copy.fleetCta} lede={brand.voice.chauffeurLine} />
      <section className="section-white pt-8 pb-24 lg:pt-12">
        <div className="container-site">
          <Suspense fallback={<FleetFallback />}>
            <FleetExplorer cars={cars} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
