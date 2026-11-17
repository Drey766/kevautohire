import { Car as CarIcon, KeyRound, UserRound, Users } from "lucide-react";
import type { Car } from "@/types";
import { cn } from "@/lib/cn";

export function SpecRow({ car, className }: { car: Car; className?: string }) {
  const specs = [
    { icon: CarIcon, text: car.bodyType },
    car.seats ? { icon: Users, text: `${car.seats} seats` } : null,
    car.driveOptions.includes("self-drive") ? { icon: KeyRound, text: "Self-drive" } : null,
    car.driveOptions.includes("chauffeur") ? { icon: UserRound, text: "Chauffeur" } : null,
  ].filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1 text-sm", className)}>
      {specs.map(({ icon: Icon, text }) => (
        <li key={text} className="inline-flex items-center gap-1.5">
          <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  );
}
