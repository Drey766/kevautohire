import { ArrivalLine } from "@/components/brand/ArrivalLine";
import { AccentRing } from "@/components/brand/AccentRing";
import type { Step } from "@/types";

/** The six steps, strung along the arrival line. */
export function Stepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative">
      <ArrivalLine orientation="vertical" className="absolute top-8 bottom-8 left-[31px] w-px sm:left-[35px]" />
      {steps.map((s) => (
        <li key={s.index} className="relative grid grid-cols-[64px_1fr] gap-5 pb-11 last:pb-0 sm:grid-cols-[72px_1fr] sm:gap-8">
          <AccentRing size={64} className="display bg-white text-xl text-ink sm:!h-[72px] sm:!w-[72px]">
            {s.index}
          </AccentRing>
          <div className="pt-1.5 sm:pt-3">
            <h3 className="text-[1.5rem] lg:text-[1.875rem]">{s.title}</h3>
            <p className="mt-2 max-w-xl">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
