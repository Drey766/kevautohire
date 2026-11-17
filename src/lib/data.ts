import fleetJson from "@/data/fleet.json";
import servicesJson from "@/data/services.json";
import stepsJson from "@/data/steps.json";
import requirementsJson from "@/data/requirements.json";
import faqsJson from "@/data/faqs.json";
import blogJson from "@/data/blog.json";
import type { BlogPost, Car, CarClass, FAQ, FleetFile, RequirementGroup, Service, Step } from "@/types";

const fleet = fleetJson as unknown as FleetFile;

export const CLASS_ORDER: CarClass[] = ["premium-comfort", "executive", "vip-flagship", "luxury-suv", "safari-4x4"];

export const cars: Car[] = fleet.cars;

export function getCar(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}

export function featuredCars(): Car[] {
  const own = cars.filter((c) => !c.sample);
  return [...own, ...cars.filter((c) => c.sample && c.featured)];
}

export function carsInClass(c: CarClass): Car[] {
  return cars.filter((car) => car.class === c);
}

export function classStats(c: CarClass) {
  const list = carsInClass(c);
  const rates = list.map((x) => x.dailyRateKes).filter((r): r is number => r !== null);
  return { count: list.length, from: rates.length ? Math.min(...rates) : null };
}

export function similarCars(car: Car, limit = 3): Car[] {
  return cars
    .filter((c) => c.slug !== car.slug && c.class === car.class)
    .sort((a, b) => Math.abs((a.dailyRateKes ?? 0) - (car.dailyRateKes ?? 0)) - Math.abs((b.dailyRateKes ?? 0) - (car.dailyRateKes ?? 0)))
    .slice(0, limit);
}

export const services = servicesJson as unknown as Service[];
export const steps = stepsJson as unknown as Step[];
export const requirements = requirementsJson as unknown as RequirementGroup[];
export const faqs = faqsJson as unknown as FAQ[];
export const posts = (blogJson as unknown as BlogPost[]).filter((p) => p.published);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function carByRef(ref: string | null): Car | undefined {
  return ref ? cars.find((c) => c.ref === ref) : undefined;
}
