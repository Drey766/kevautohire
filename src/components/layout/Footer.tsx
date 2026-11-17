import Link from "next/link";
import { brand } from "@/config/brand";
import { Logo } from "@/components/brand/Logo";
import { Glow } from "@/components/brand/Glow";
import { waLink } from "@/lib/whatsapp";

const socials = Object.entries(brand.social).filter(([, url]) => url);

export function Footer() {
  const a = brand.address;
  return (
    <footer className="night overflow-hidden pb-24 lg:pb-0">
      <Glow at="left" />
      <div className="container-site grid gap-12 pt-16 pb-10 md:grid-cols-12 lg:pt-20">
        <div className="md:col-span-5">
          <Logo className="h-24 w-auto" />
          <p className="display mt-7 max-w-sm text-2xl text-white">{brand.voice.elegance}</p>
          <p className="mt-3 max-w-sm text-base">{brand.voice.promises.join(" · ")}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow">Explore</p>
          <ul className="mt-4">
            {[...brand.nav, { label: "Requirements & FAQs", href: "/requirements" }, { label: "Compare", href: "/compare" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-9 items-center text-base hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-base md:col-span-4">
          <p className="eyebrow">Reach us, 24/7</p>
          <ul className="mt-4">
            {brand.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="tabular inline-flex min-h-9 items-center text-white hover:text-lavender">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center hover:text-white">
                {brand.copy.whatsappCta}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className="inline-flex min-h-9 items-center break-all hover:text-white">
                {brand.email}
              </a>
            </li>
          </ul>
          <address className="mt-4 not-italic">
            {a.building}, {a.street}
            <br />
            {a.area}, {a.postalCode}
          </address>
          {socials.length > 0 && (
            <ul className="mt-4 flex gap-4">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="link capitalize">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="container-site flex flex-col gap-3 border-t border-lavender/15 py-6 text-sm md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl">{brand.legal.rateNote}</p>
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-white">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-white">
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
