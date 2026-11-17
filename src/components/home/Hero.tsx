import { brand } from "@/config/brand";
import { Glow } from "@/components/brand/Glow";
import { SmartImage } from "@/components/ui/SmartImage";
import { BookingConsole } from "@/components/home/BookingConsole";

const HERO_IMAGE = "/fleet/im-001/prado-wedding-convoy.jpg";

export function Hero() {
  return (
    <section className="night flex flex-col justify-end overflow-hidden lg:min-h-[calc(100svh-2rem)]">
      {/* The convoy emerges from the night on the right; on phones it sits above the headline. */}
      <div className="absolute inset-x-0 top-0 -z-20 h-[68vw] min-h-[320px] overflow-hidden lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[74%]">
        <div className="absolute inset-0 origin-[35%_65%] motion-safe:animate-kenburns">
          <SmartImage src={HERO_IMAGE} alt={brand.copy.photoAlt} sizes="(min-width: 1024px) 74vw, 100vw" className="object-[30%_center]" eager />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[68vw] min-h-[320px] bg-linear-to-b from-aubergine/45 via-aubergine/40 via-45% to-aubergine to-85% lg:inset-y-0 lg:h-auto lg:from-aubergine/55 lg:via-transparent lg:via-50% lg:to-aubergine/90 lg:to-100%" />
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-[74%] bg-linear-to-r from-aubergine via-aubergine/50 to-transparent lg:block" />
      <Glow at="hero" className="opacity-70" />

      <div className="container-site pt-[calc(68vw-2rem)] pb-6 min-[471px]:pt-[290px] lg:pt-32 lg:pb-8">
        <div className="max-w-3xl">
          <p className="eyebrow motion-safe:animate-rise">{brand.copy.heroEyebrow}</p>
          <h1 className="display mt-3 text-[clamp(3.25rem,1rem+7.2vw,7rem)] motion-safe:animate-rise [animation-delay:90ms]">{brand.copy.heroHeadline}</h1>
          <p className="lede mt-4 text-white motion-safe:animate-rise [animation-delay:180ms]">{brand.voice.unforgettable}</p>
        </div>
        <div className="mt-7 motion-safe:animate-rise [animation-delay:280ms] lg:mt-10">
          <BookingConsole />
        </div>
      </div>
    </section>
  );
}
