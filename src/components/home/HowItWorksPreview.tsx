import Link from "next/link";
import { GoldRing } from "@/components/brand/GoldRing";
import { DraftBadge } from "@/components/ui/Tags";
import { steps } from "@/lib/data";

export function HowItWorksPreview() {
  const preview = [steps[0], steps[1], steps[2], steps[4]];
  return (
    <section className="section section-white">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="h-section">How it works</h2>
          <DraftBadge />
        </div>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((s, i) => (
            <li key={s.index}>
              <GoldRing size={52} className="display text-lg text-ink">
                {i + 1}
              </GoldRing>
              <h3 className="mt-4 text-[1.3125rem]">{s.title}</h3>
              <p className="mt-2 text-base">{s.text}</p>
            </li>
          ))}
        </ol>
        <Link href="/how-it-works" className="link mt-9 inline-flex min-h-11 items-center">
          See every step
        </Link>
      </div>
    </section>
  );
}
