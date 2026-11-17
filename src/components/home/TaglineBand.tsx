import { brand } from "@/config/brand";
import { Glow } from "@/components/brand/Glow";
import { Reveal } from "@/components/ui/Reveal";

/** The logo's tagline, large, on the night sky. */
export function TaglineBand() {
  return (
    <section className="night section overflow-hidden text-center">
      <Glow at="center" />
      <Reveal className="container-site">
        <p className="display mx-auto max-w-4xl text-[clamp(2.5rem,1rem+5.2vw,5.25rem)] text-white">{brand.voice.tagline}</p>
        <p className="lede mx-auto mt-6 max-w-2xl">{brand.voice.premiumSeaters}. {brand.voice.chauffeurLine}.</p>
        <p className="display mt-6 text-xl text-accent">{brand.voice.reach}</p>
      </Reveal>
    </section>
  );
}
