import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/config/brand";
import { Glow } from "@/components/brand/Glow";
import { Ribbon } from "@/components/brand/Ribbon";
import { Swoosh } from "@/components/brand/Swoosh";
import { Reveal } from "@/components/ui/Reveal";
import { getService } from "@/lib/data";

function More({ label }: { label: string }) {
  return (
    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-normal">
      {label}
      <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
}

export function Occasions() {
  const airport = getService("airport-transfers");
  const corporate = getService("corporate-travel");
  return (
    <section className="section section-white">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <h2 className="h-section">{brand.voice.priority}</h2>
          <Ribbon className="mt-5 w-48" tone="accent" />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          {/* Weddings: the signature tile */}
          <Link href="/services/weddings" className="night group overflow-hidden rounded-2xl lg:col-span-7 lg:row-span-2">
            <div className="flex h-full min-h-[400px] flex-col justify-end p-6 sm:p-9 lg:min-h-[600px]">
              <Swoosh className="absolute -top-16 -right-24 -z-10 w-[130%] max-w-none transition-transform duration-700 group-hover:scale-[1.03] sm:w-[90%]" />
              <Glow at="left" />
              <h3 className="display text-[2.5rem] sm:text-5xl">Weddings</h3>
              <p className="mt-3 max-w-lg text-white">{brand.voice.vans}</p>
              <More label="Plan your wedding transport" />
            </div>
          </Link>

          <Link href="/services/airport-transfers" className="night group overflow-hidden rounded-2xl lg:col-span-5">
            <div className="flex h-full min-h-[260px] flex-col justify-end p-6 sm:p-8">
              <Glow at="right" />
              <h3 className="display text-[2rem] sm:text-[2.5rem]">Airport Transfers</h3>
              {airport && <p className="mt-2 text-white">{airport.summary}</p>}
              <More label="Arrange a transfer" />
            </div>
          </Link>

          <Link href="/services/corporate-travel" className="night group overflow-hidden rounded-2xl lg:col-span-5">
            <div className="flex h-full min-h-[260px] flex-col justify-end p-6 sm:p-8">
              <Glow at="hero" />
              <h3 className="display text-[2rem] sm:text-[2.5rem]">Corporate Travel</h3>
              {corporate && <p className="mt-2 text-white">{corporate.summary}</p>}
              <More label="Business trips and teams" />
            </div>
          </Link>

          <Link href="/services/family-road-trips" className="group rounded-2xl bg-soft transition-colors hover:bg-mist lg:col-span-12">
            <div className="grid gap-4 p-6 sm:p-9 lg:grid-cols-12 lg:items-end">
              <h3 className="display text-[2rem] sm:text-[2.5rem] lg:col-span-4">Family Trips & Road Trips</h3>
              <div className="text-night lg:col-span-8">
                <p className="display text-[1.5rem] leading-snug sm:text-[1.75rem]">{brand.voice.wherever}</p>
                <p className="mt-2 font-normal">{brand.voice.handle}</p>
                <More label="Plan a road trip" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
