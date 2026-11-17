import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/config/brand";
import { ArrivalLine } from "@/components/brand/ArrivalLine";
import { Glow } from "@/components/brand/Glow";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="night flex min-h-[80svh] flex-col justify-center overflow-hidden pt-32 pb-20">
      <Glow at="center" />
      <div className="container-site text-center">
        <h1 className="display mx-auto max-w-3xl text-[clamp(2.75rem,1.4rem+4.6vw,5.25rem)]">{brand.copy.notFoundTitle}</h1>
        <p className="lede mt-5 text-white">{brand.copy.notFoundBody}</p>
        <ArrivalLine className="mx-auto mt-8 h-20 max-w-xl" />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-accent">
            Back to home
          </Link>
          <Link href="/fleet" className="btn btn-ghost">
            {brand.copy.fleetCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
