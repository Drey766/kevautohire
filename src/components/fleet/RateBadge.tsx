import { Crown } from "lucide-react";
import { brand } from "@/config/brand";
import { AccentRing } from "@/components/brand/AccentRing";
import { formatKes } from "@/lib/format";
import type { Car } from "@/types";

/** The accent-ring rate badge. Sits on dark backgrounds. */
export function RateBadge({ car }: { car: Pick<Car, "dailyRateKes" | "rateOnRequest"> }) {
  const onRequest = car.rateOnRequest || car.dailyRateKes === null;
  return (
    <p className="rate-badge">
      <AccentRing size={60} className="text-accent">
        {onRequest ? <Crown size={22} strokeWidth={1.4} aria-hidden="true" /> : <span className="text-xs font-medium tracking-wider">KES</span>}
      </AccentRing>
      {onRequest ? (
        <span className="display text-2xl text-white">{brand.copy.rateOnRequest}</span>
      ) : (
        <span className="leading-tight">
          <span className="block text-sm">from</span>
          <span className="text-2xl font-medium text-white">{formatKes(car.dailyRateKes as number)}</span>
          <span className="text-base"> / day</span>
        </span>
      )}
    </p>
  );
}
