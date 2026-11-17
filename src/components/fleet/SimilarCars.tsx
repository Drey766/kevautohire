import { CarCard } from "@/components/fleet/CarCard";
import { similarCars } from "@/lib/data";
import type { Car } from "@/types";

export function SimilarCars({ car }: { car: Car }) {
  const list = similarCars(car);
  if (list.length === 0) return null;
  return (
    <section className="section section-mist">
      <div className="container-site">
        <h2 className="h-section">In the same class</h2>
        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <li key={c.ref}>
              <CarCard car={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
