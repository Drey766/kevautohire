import { brand } from "@/config/brand";
import { estimateFor } from "@/lib/booking";
import { formatKes } from "@/lib/format";
import type { Car } from "@/types";

/** Live estimate. Rate-on-request cars never show a figure. */
export function EstimatePanel({ car, from, to }: { car: Pick<Car, "dailyRateKes" | "rateOnRequest">; from: string; to: string }) {
  if (car.rateOnRequest || car.dailyRateKes === null) {
    return (
      <div className="rounded-xl bg-mist p-4">
        <p className="display text-xl text-ink">{brand.copy.quoteOnRequest}</p>
        <p className="mt-1 text-sm">Send your dates and we will confirm availability and your quote.</p>
      </div>
    );
  }
  const estimate = estimateFor(car, from, to);
  return (
    <div aria-live="polite" className="rounded-xl bg-mist p-4">
      {estimate ? (
        <>
          <p className="tabular text-sm">{estimate.line}</p>
          <p className="tabular text-2xl font-medium text-primary">{formatKes(estimate.total)}</p>
          <p className="mt-2 text-sm leading-snug">
            {brand.legal.estimateNotice} {brand.legal.estimateSmallPrint}
          </p>
        </>
      ) : (
        <p className="text-sm">Choose your dates to see an indicative estimate.</p>
      )}
    </div>
  );
}
