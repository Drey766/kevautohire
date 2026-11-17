import { rentalDays } from "@/lib/booking";
import type { Car, CarClass, DriveOption } from "@/types";

export type SortKey = "recommended" | "rate-asc" | "rate-desc";

export interface Filters {
  classes: CarClass[];
  brands: string[];
  bodies: string[];
  seats: number | null;
  drive: DriveOption | null;
  min: number | null;
  max: number | null;
  sort: SortKey;
  from: string;
  to: string;
}

const CLASSES: CarClass[] = ["premium-comfort", "executive", "vip-flagship", "luxury-suv", "safari-4x4"];
const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);
const num = (v: string | null) => {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

export function parseFilters(sp: Pick<URLSearchParams, "get">): Filters {
  const drive = sp.get("drive");
  const sort = sp.get("sort");
  return {
    classes: list(sp.get("class")).filter((c): c is CarClass => CLASSES.includes(c as CarClass)),
    brands: list(sp.get("brand")),
    bodies: list(sp.get("body")),
    seats: num(sp.get("seats")),
    drive: drive === "self-drive" || drive === "chauffeur" ? drive : null,
    min: num(sp.get("min")),
    max: num(sp.get("max")),
    sort: sort === "rate-asc" || sort === "rate-desc" ? sort : "recommended",
    from: sp.get("from") ?? "",
    to: sp.get("to") ?? "",
  };
}

export function serializeFilters(f: Filters): string {
  const q = new URLSearchParams();
  if (f.classes.length) q.set("class", f.classes.join(","));
  if (f.brands.length) q.set("brand", f.brands.join(","));
  if (f.bodies.length) q.set("body", f.bodies.join(","));
  if (f.seats !== null) q.set("seats", String(f.seats));
  if (f.drive) q.set("drive", f.drive);
  if (f.min !== null) q.set("min", String(f.min));
  if (f.max !== null) q.set("max", String(f.max));
  if (f.sort !== "recommended") q.set("sort", f.sort);
  if (f.from) q.set("from", f.from);
  if (f.to) q.set("to", f.to);
  return q.toString();
}

export function activeFilterCount(f: Filters): number {
  return f.classes.length + f.brands.length + f.bodies.length + (f.seats !== null ? 1 : 0) + (f.drive ? 1 : 0) + (f.min !== null || f.max !== null ? 1 : 0);
}

export function applyFilters(cars: Car[], f: Filters): Car[] {
  const filtered = cars.filter((c) => {
    if (f.classes.length && !f.classes.includes(c.class)) return false;
    if (f.brands.length && !f.brands.includes(c.brand)) return false;
    if (f.bodies.length && !f.bodies.includes(c.bodyType)) return false;
    if (f.seats !== null && (c.seats === null || c.seats < f.seats)) return false;
    if (f.drive && !c.driveOptions.includes(f.drive)) return false;
    if (f.min !== null && (c.dailyRateKes === null || c.dailyRateKes < f.min)) return false;
    if (f.max !== null && (c.dailyRateKes === null || c.dailyRateKes > f.max)) return false;
    return true;
  });

  const byRate = (a: Car, b: Car, dir: 1 | -1) => {
    // Cars without a published rate always sit at the end of a rate sort.
    if (a.dailyRateKes === null) return b.dailyRateKes === null ? 0 : 1;
    if (b.dailyRateKes === null) return -1;
    return (a.dailyRateKes - b.dailyRateKes) * dir;
  };

  return [...filtered].sort((a, b) => {
    if (f.sort === "rate-asc") return byRate(a, b, 1);
    if (f.sort === "rate-desc") return byRate(a, b, -1);
    const rank = (c: Car) => (!c.sample ? 0 : c.featured ? 1 : 2);
    return rank(a) - rank(b) || byRate(a, b, 1);
  });
}

export function hasDates(f: Pick<Filters, "from" | "to">) {
  return rentalDays(f.from, f.to) !== null;
}
