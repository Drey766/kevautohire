import { brand } from "@/config/brand";
import { Glow } from "@/components/brand/Glow";
import { Swoosh } from "@/components/brand/Swoosh";
import { SmartImage } from "@/components/ui/SmartImage";
import { BookingConsole } from "@/components/home/BookingConsole";

export function Hero() {
  const photo = brand.heroImage;
  return (
    <section className="night flex flex-col justify-end overflow-hidden lg:min-h-[calc(100svh-2rem)]">
      {photo ? (
        <>
          {/* Their photo emerges from the night on the right; on phones it sits above the headline. */}
          <div className="absolute inset-x-0 top-0 -z-20 h-[68vw] min-h-[320px] overflow-hidden lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[74%]">
            <div className="absolute inset-0 origin-[35%_65%] motion-safe:animate-kenburns">
              <SmartImage src={photo} alt="" sizes="(min-width: 1024px) 74vw, 100vw" className="object-[30%_center]" eager />
            </div>
          </div>
          <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[68vw] min-h-[320px] bg-linear-to-b from-night/45 via-night/40 via-45% to-night to-85% lg:inset-y-0 lg:h-auto lg:from-night/55 lg:via-transparent lg:via-50% lg:to-night/90 lg:to-100%" />
          <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-[74%] bg-linear-to-r from-night via-night/50 to-transparent lg:block" />
        </>
      ) : (
        // No photo yet: the logo's swoosh ring sweeps across the night instead.
        <Swoosh className="absolute -top-[18vw] -right-[30vw] -z-10 w-[120vw] max-w-none sm:-right-[18vw] sm:w-[90vw] lg:-top-[12vw] lg:-right-[8vw] lg:w-[62vw]" />
      )}
      <Glow at="hero" className="opacity-70" />

      <div className={photo ? "container-site pt-[calc(68vw-2rem)] pb-6 min-[471px]:pt-[290px] lg:pt-32 lg:pb-8" : "container-site pt-[calc(var(--nav-h)+4.5rem)] pb-6 sm:pt-[calc(var(--nav-h)+7rem)] lg:pt-32 lg:pb-8"}>
        <div className="max-w-3xl">
          <p className="eyebrow motion-safe:animate-rise">{brand.copy.heroEyebrow}</p>
          <h1 className="display mt-3 text-[clamp(3rem,1rem+6.4vw,6.5rem)] motion-safe:animate-rise [animation-delay:90ms]">{brand.copy.heroHeadline}</h1>
          <p className="lede mt-4 max-w-2xl text-white motion-safe:animate-rise [animation-delay:180ms]">{brand.voice.enjoy}</p>
        </div>
        <div className="mt-7 motion-safe:animate-rise [animation-delay:280ms] lg:mt-10">
          <BookingConsole />
        </div>
      </div>
    </section>
  );
}
