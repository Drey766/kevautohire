import { brand } from "@/config/brand";
import { Glow } from "@/components/brand/Glow";
import { Reveal } from "@/components/ui/Reveal";

export function StandOutBand() {
  return (
    <section className="night section overflow-hidden text-center">
      <Glow at="center" />
      <Reveal className="container-site">
        <p className="display mx-auto max-w-4xl text-[clamp(2.5rem,1rem+5.2vw,5.25rem)] text-white">{brand.voice.standOut}</p>
        <p className="lede mx-auto mt-6 max-w-xl">{brand.voice.experience}</p>
        <p className="display mt-6 text-xl text-gold">{brand.voice.driveAway}</p>
      </Reveal>
    </section>
  );
}
