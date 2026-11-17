import { brand } from "@/config/brand";
import type { Car, CarClass } from "@/types";

const kes = new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 });

export function formatKes(amount: number) {
  return `KES ${kes.format(amount)}`;
}

/** "from KES 30,000 / day", or "Rate on request" for cars without a published rate. */
export function formatRate(car: Pick<Car, "dailyRateKes" | "rateOnRequest">) {
  if (car.rateOnRequest || car.dailyRateKes === null) return brand.copy.rateOnRequest;
  return `from ${formatKes(car.dailyRateKes)} / day`;
}

export function classLabel(c: CarClass) {
  return brand.classes[c].label;
}

/** "Kev Auto Hire, <building>, <street>, ..., Nairobi, Kenya", skipping anything not provided. */
export function formatFullAddress() {
  const a = brand.address;
  return [brand.fullName, a.building, a.street, a.area || brand.city, a.postalCode, a.country].filter(Boolean).join(", ");
}

export function formatPostDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Nairobi" }).format(new Date(iso));
}
