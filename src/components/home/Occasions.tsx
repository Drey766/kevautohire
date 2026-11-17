import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/config/brand";
import { SmartImage } from "@/components/ui/SmartImage";
import { Glow } from "@/components/brand/Glow";
import { Ribbon } from "@/components/brand/Ribbon";
import { Reveal } from "@/components/ui/Reveal";

const PHOTO = "/fleet/im-001/prado-wedding-convoy.jpg";

function More({ label }: { label: string }) {
  return (
    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-normal">
      {label}
      <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
}

export function Occasions() {
  return (
    <section className="section section-white">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <h2 className="h-section">{brand.voice.elegance}</h2>
          <Ribbon className="mt-5 w-48" tone="gold" />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          {/* Weddings: the signature tile, with their own photograph */}
          <Link href="/services/weddings" className="night group overflow-hidden rounded-2xl lg:col-span-7 lg:row-span-2">
            <div className="flex min-h-[440px] h-full flex-col justify-end p-6 sm:p-9 lg:min-h-[600px]">
              <div className="absolute inset-0 -z-20 transition-transform duration-700 group-hover:scale-[1.03]">
                <SmartImage src={PHOTO} alt={brand.copy.photoAlt} sizes="(min-width: 1024px) 58vw, 100vw" className="object-[25%_center]" />
              </div>
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-aubergine via-aubergine/55 to-transparent" />
              <h3 className="display text-[2.5rem] sm:text-5xl">Weddings</h3>
              <p className="mt-3 max-w-lg text-white">{brand.voice.weddingGlam}</p>
              <More label="Plan your wedding cars" />
            </div>
          </Link>

          {/* VIP: the same convoy, cropped to the dark cars behind */}
          <Link href="/services/vip-executive" className="night group overflow-hidden rounded-2xl lg:col-span-5">
            <div className="flex h-full min-h-[290px] flex-col justify-end p-6 sm:p-8">
              <div className="absolute inset-0 -z-20 transition-transform duration-700 group-hover:scale-[1.03]">
                <SmartImage src={PHOTO} alt="A line of dark Land Cruiser Prado TX cars on the road" sizes="(min-width: 1024px) 60vw, 100vw" className="origin-[100%_38%] scale-[2] object-right" />
              </div>
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-aubergine via-aubergine/65 to-aubergine/10" />
              <h3 className="display text-[2rem] sm:text-[2.5rem]">VIP Events</h3>
              <p className="mt-2 text-white">{brand.voice.prestige}</p>
              <More label="VIP and executive" />
            </div>
          </Link>

          <Link href="/services/chauffeur-services" className="night group overflow-hidden rounded-2xl lg:col-span-5">
            <div className="flex h-full min-h-[290px] flex-col justify-end p-6 sm:p-8">
              <Glow at="right" />
              <h3 className="display text-[2rem] sm:text-[2.5rem]">Business & Executive</h3>
              <p className="mt-2 text-white">
                {brand.voice.business} {brand.voice.sealTheDeal}
              </p>
              <More label="Chauffeur services" />
            </div>
          </Link>

          <Link href="/services/self-drive" className="group rounded-2xl bg-lavender transition-colors hover:bg-mist lg:col-span-12">
            <div className="grid gap-4 p-6 sm:p-9 lg:grid-cols-12 lg:items-end">
              <h3 className="display text-[2rem] sm:text-[2.5rem] lg:col-span-4">Weekend Escapes</h3>
              <div className="text-aubergine lg:col-span-8">
                <p className="display text-[1.5rem] leading-snug sm:text-[1.75rem]">{brand.voice.standOut}</p>
                <p className="mt-2 font-normal">{brand.voice.weekend}</p>
                <More label="Take the keys" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
