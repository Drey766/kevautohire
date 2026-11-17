// Dates are handled as "YYYY-MM-DDTHH:mm" strings in Africa/Nairobi time.
// Nairobi is UTC+3 all year (no daylight saving), so parsing is a fixed offset.
import { brand } from "@/config/brand";
import { formatKes } from "@/lib/format";
import type { Car } from "@/types";

const DAY_MS = 86_400_000;
const LOCAL_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

export function parseNairobi(value: string | null | undefined): number | null {
  if (!value || !LOCAL_RE.test(value)) return null;
  const ms = Date.parse(`${value}:00+03:00`);
  return Number.isNaN(ms) ? null : ms;
}

/** Current Nairobi wall-clock time as "YYYY-MM-DDTHH:mm". */
export function nairobiNow(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

export function nairobiToday(now: Date = new Date()): string {
  return nairobiNow(now).slice(0, 10);
}

/** Rental length: rounded up, minimum 1. */
export function rentalDays(from: string, to: string): number | null {
  const a = parseNairobi(from);
  const b = parseNairobi(to);
  if (a === null || b === null || b <= a) return null;
  return Math.max(1, Math.ceil((b - a) / DAY_MS));
}

export type RangeError = "pickup-required" | "pickup-past" | "return-required" | "return-before";

export const rangeErrorText: Record<RangeError, string> = {
  "pickup-required": "Choose a pick-up date and time.",
  "pickup-past": "Choose a pick-up time that hasn't passed yet (Nairobi time).",
  "return-required": "Choose a return date and time.",
  "return-before": "Choose a return time after your pick-up.",
};

export function validatePickup(from: string, now: Date = new Date()): RangeError | null {
  const a = parseNairobi(from);
  if (a === null) return "pickup-required";
  // Compare to the start of the current minute: the inputs have minute precision.
  if (a < Math.floor(now.getTime() / 60_000) * 60_000) return "pickup-past";
  return null;
}

export function validateRange(from: string, to: string, now: Date = new Date()): RangeError | null {
  const pickup = validatePickup(from, now);
  if (pickup) return pickup;
  const b = parseNairobi(to);
  if (b === null) return "return-required";
  if (b <= (parseNairobi(from) as number)) return "return-before";
  return null;
}

export interface Estimate {
  days: number;
  rate: number;
  total: number;
  line: string;
}

/** No estimate for rate-on-request cars. Airport transfers never call this. */
export function estimateFor(car: Pick<Car, "dailyRateKes" | "rateOnRequest">, from: string, to: string): Estimate | null {
  if (car.rateOnRequest || car.dailyRateKes === null) return null;
  const days = rentalDays(from, to);
  if (days === null) return null;
  const total = car.dailyRateKes * days;
  return {
    days,
    rate: car.dailyRateKes,
    total,
    line: `${days} ${days === 1 ? "day" : "days"} × ${formatKes(car.dailyRateKes)}`,
  };
}

export function formatDateTime(value: string): string {
  const ms = parseNairobi(value);
  if (ms === null) return value;
  const d = new Date(ms);
  const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Nairobi" }).format(d);
  return `${date} ${value.slice(11)}`;
}

export function formatDateOnly(value: string): string {
  const ms = Date.parse(`${value}T12:00:00+03:00`);
  if (Number.isNaN(ms)) return value;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Nairobi" }).format(new Date(ms));
}

export const estimateNotice = brand.legal.estimateNotice;
