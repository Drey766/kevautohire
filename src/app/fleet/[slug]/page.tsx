import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Check } from "lucide-react";
import { Glow } from "@/components/brand/Glow";
import { BookingCard } from "@/components/fleet/BookingCard";
import { CarGallery } from "@/components/fleet/CarGallery";
import { CompareToggle } from "@/components/fleet/CompareToggle";
import { CompareTray } from "@/components/fleet/CompareTray";
import { RateBadge } from "@/components/fleet/RateBadge";
import { SimilarCars } from "@/components/fleet/SimilarCars";
import { SpecRow } from "@/components/fleet/SpecRow";
import { CarTag } from "@/components/ui/Tags";
import { cars, getCar } from "@/lib/data";
import { classLabel } from "@/lib/format";
import { isDemoMode } from "@/lib/env";

// Every valid page is known at build time; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/fleet/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return {};
  const meta = pageMeta({ path: `/fleet/${car.slug}`, title: car.name, description: car.summary });
  // Sample cars use another company's photos and rates: keep them out of search results.
  return isDemoMode && car.sample ? { ...meta, robots: { index: false, follow: true } } : meta;
}

export default async function CarPage({ params }: PageProps<"/fleet/[slug]">) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  return (
    <>
      <section className="night overflow-hidden pt-28 pb-12 lg:pt-32 lg:pb-16">
        <Glow at="hero" />
        <div className="container-site grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <CarGallery images={car.images} name={car.name} />
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">{classLabel(car.class)}</p>
              <CarTag sample={car.sample} />
            </div>
            <h1 className="display mt-3 text-[clamp(2.5rem,1.6rem+2.6vw,3.75rem)]">{car.name}</h1>
            <p className="lede mt-4">{car.summary}</p>
            <div className="mt-6">
              <RateBadge car={car} />
            </div>
            <SpecRow car={car} className="mt-6 text-[0.9375rem]" />
            <div className="night-scope mt-3">
              <CompareToggle slug={car.slug} name={car.name} tone="dark" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="max-w-2xl space-y-4">
              {car.description.split("\n\n").map((para) => (
                <p key={para.slice(0, 32)} className="text-lg">
                  {para}
                </p>
              ))}
            </div>

            {car.features.length > 0 && (
              <>
                <h2 className="mt-12 text-3xl">Features</h2>
                <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {car.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 font-normal text-ink">
                      <Check size={18} strokeWidth={1.5} className="mt-1 flex-none text-purple" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {car.idealFor.length > 0 && (
              <>
                <h2 className="mt-12 text-3xl">Ideal for</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {car.idealFor.map((x) => (
                    <li key={x} className="chip">
                      {x}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {!car.sample && (
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/services/weddings" className="btn btn-ghost">
                  Weddings
                </Link>
                <Link href="/services/vip-executive" className="btn btn-ghost">
                  VIP & Executive
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Suspense fallback={<div className="panel-light min-h-96" />}>
                <BookingCard car={car} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <SimilarCars car={car} />
      <CompareTray cars={cars.map((c) => ({ slug: c.slug, name: c.name }))} />
    </>
  );
}
