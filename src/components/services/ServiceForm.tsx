import { AirportForm } from "@/components/forms/AirportForm";
import { BookingForm } from "@/components/forms/BookingForm";
import { WeddingForm } from "@/components/forms/WeddingForm";
import { GeneralForm } from "@/components/forms/GeneralForm";
import { cars } from "@/lib/data";
import type { Service } from "@/types";

const bookable = cars.map(({ slug, name, ref, driveOptions, dailyRateKes, rateOnRequest }) => ({ slug, name, ref, driveOptions, dailyRateKes, rateOnRequest }));

const PRESETS: Record<string, { service?: string; purpose?: string; car?: string }> = {
  "chauffeur-services": { service: "chauffeur" },
  "corporate-travel": { service: "chauffeur", purpose: "Corporate travel" },
  "family-road-trips": { service: "chauffeur", purpose: "Family trip" },
};

export function ServiceForm({ service }: { service: Service }) {
  if (service.formKind === "airport") return <AirportForm />;
  if (service.formKind === "wedding") return <WeddingForm />;
  if (service.formKind === "general") return <GeneralForm />;
  return <BookingForm cars={bookable} initial={PRESETS[service.slug]} />;
}
