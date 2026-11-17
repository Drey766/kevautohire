import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { CarTag } from "@/components/ui/Tags";
import { SpecRow } from "@/components/fleet/SpecRow";
import { CompareToggle } from "@/components/fleet/CompareToggle";
import { classLabel, formatKes, formatRate } from "@/lib/format";
import type { Estimate } from "@/lib/booking";
import type { Car } from "@/types";

interface CarCardProps {
  car: Car;
  /** Pass only inside a list that shows legal.estimateNotice alongside the results. */
  estimate?: Estimate | null;
  /** Carries dates and service through to the car page. */
  query?: string;
  sizes?: string;
}

export function CarCard({ car, estimate, query = "", sizes }: CarCardProps) {
  const href = `/fleet/${car.slug}${query}`;
  return (
    <article className="card-car">
      <div className="stage">
        <SmartImage src={car.images[0]} alt={car.name} sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} />
        <span className="absolute top-3 left-3">
          <CarTag sample={car.sample} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[0.6875rem]">{classLabel(car.class)}</p>
        <h3 className="mt-1.5 text-[1.4375rem]">
          <Link href={href} className="hover:text-purple">
            {car.name}
          </Link>
        </h3>
        <SpecRow car={car} className="mt-3" />
        <div className="mt-auto pt-4">
          <p className="tabular font-medium text-purple">{formatRate(car)}</p>
          {estimate && (
            <p className="tabular mt-0.5 text-sm">
              {estimate.line} = <strong className="font-medium text-ink">{formatKes(estimate.total)}</strong>
            </p>
          )}
          <div className="mt-2 flex items-center justify-between border-t border-line pt-1">
            <Link href={href} className="link inline-flex min-h-11 items-center text-sm" aria-label={`Details for ${car.name}`}>
              Details
            </Link>
            <CompareToggle slug={car.slug} name={car.name} />
          </div>
        </div>
      </div>
    </article>
  );
}
