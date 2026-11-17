import Link from "next/link";
import { brand } from "@/config/brand";
import { SmartImage } from "@/components/ui/SmartImage";
import { CarTag } from "@/components/ui/Tags";
import { CLASS_ORDER, carsInClass, classStats } from "@/lib/data";
import { formatKes } from "@/lib/format";

export function ClassTiles() {
  return (
    <section className="section section-white">
      <div className="container-site">
        <h2 className="h-section max-w-xl">Choose by class</h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-5 lg:gap-x-5">
          {CLASS_ORDER.map((c, i) => {
            const { count, from } = classStats(c);
            const cover = carsInClass(c).find((x) => x.featured && x.sample) ?? carsInClass(c)[0];
            return (
              <li key={c} className={i === 4 ? "col-span-2 lg:col-span-1" : undefined}>
                <Link href={`/fleet?class=${c}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist">
                    <SmartImage src={cover?.images[0]} alt="" sizes="(min-width: 1024px) 20vw, 50vw" className="transition-transform duration-700 group-hover:scale-[1.04]" />
                    {cover && (
                      <span className="absolute top-2.5 left-2.5">
                        <CarTag sample={cover.sample} />
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-[1.3125rem] group-hover:text-purple">{brand.classes[c].label}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-snug">{brand.classes[c].line}</p>
                  <p className="tabular mt-2 text-sm font-normal text-purple">
                    {from !== null && `from ${formatKes(from)}/day · `}
                    {count} {count === 1 ? "car" : "cars"}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
