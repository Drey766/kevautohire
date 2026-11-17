import type { ReactNode } from "react";
import { Glow } from "@/components/brand/Glow";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lede?: string | null;
  children?: ReactNode;
}

/** The dark band each inner page opens with; the transparent navbar sits over it. */
export function PageHero({ eyebrow, title, lede, children }: PageHeroProps) {
  return (
    <section className="night overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16">
      <Glow at="hero" />
      <div className="container-site">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display mt-3 max-w-4xl text-[clamp(2.5rem,1.4rem+3.8vw,4.5rem)]">{title}</h1>
        {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
