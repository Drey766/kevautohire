import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { Glow } from "@/components/brand/Glow";
import { waLink } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="night section overflow-hidden text-center">
      <Glow at="center" />
      <div className="container-site">
        <p className="eyebrow">{brand.voice.trio.join(" · ")}</p>
        <h2 className="h-section mt-4">{brand.copy.finalCtaTitle}</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/book" className="btn btn-accent">
            {brand.copy.bookCta}
          </Link>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
            {brand.copy.whatsappCta}
          </a>
        </div>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8">
          {brand.phones.map((p) => (
            <li key={p.href}>
              <a href={p.href} className="tabular inline-flex min-h-11 items-center gap-2 text-white hover:text-soft">
                <Phone size={16} strokeWidth={1.5} aria-hidden="true" className="text-accent" />
                {p.display}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
