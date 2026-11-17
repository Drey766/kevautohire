import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { CompareTable } from "@/components/compare/CompareTable";
import { cars } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  path: "/compare",
  title: "Compare cars",
  description: "Compare up to three cars side by side: class, seats, drive options, rates and features.",
});

export default function ComparePage() {
  return (
    <>
      <PageHero title="Compare cars" lede="Side by side, up to three at a time." />
      <section className="section-white pt-10 pb-28">
        <div className="container-site">
          <CompareTable cars={cars} />
        </div>
      </section>
    </>
  );
}
