import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Suspense } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { GoldRing, GoldRingLoader } from "@/components/brand/GoldRing";
import { FaqList } from "@/components/faq/FaqList";
import { ContactClient } from "@/components/forms/ContactClient";
import { PageHero } from "@/components/ui/PageHero";
import { faqs } from "@/lib/data";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = pageMeta({
  path: "/contact",
  title: "Contact",
  description: `Call or WhatsApp us, 24/7. Find us at ${brand.seo.openingNote}.`,
});

function Row({ icon: Icon, children }: { icon: typeof Phone; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4 border-t border-line py-5 first:border-t-0 first:pt-0">
      <GoldRing size={48} className="text-purple">
        <Icon size={18} strokeWidth={1.4} aria-hidden="true" />
      </GoldRing>
      <div className="min-w-0 pt-0.5">{children}</div>
    </li>
  );
}

export default function ContactPage() {
  const a = brand.address;
  return (
    <>
      <PageHero title={brand.copy.callCta} lede={brand.copy.support247Note} />
      <section className="section section-white">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <ul>
              <Row icon={Phone}>
                <h2 className="text-xl">Call</h2>
                {brand.phones.map((p) => (
                  <a key={p.href} href={p.href} className="link tabular flex min-h-11 items-center">
                    {p.display}
                  </a>
                ))}
              </Row>
              <Row icon={MessageCircle}>
                <h2 className="text-xl">WhatsApp</h2>
                {brand.phones.map((p, i) => (
                  <a key={p.whatsapp} href={waLink(undefined, i)} target="_blank" rel="noopener noreferrer" className="link tabular flex min-h-11 items-center">
                    {p.display}
                  </a>
                ))}
              </Row>
              <Row icon={Mail}>
                <h2 className="text-xl">Email</h2>
                <a href={`mailto:${brand.email}`} className="link flex min-h-11 items-center break-all">
                  {brand.email}
                </a>
              </Row>
              <Row icon={MapPin}>
                <h2 className="text-xl">Visit</h2>
                <address className="mt-1 not-italic">
                  {a.building}, {a.street}
                  <br />
                  {a.area}, {a.postalCode}
                </address>
                {brand.mapUrl && (
                  <a href={brand.mapUrl} target="_blank" rel="noopener noreferrer" className="link mt-1 inline-flex min-h-11 items-center">
                    Open in maps
                  </a>
                )}
              </Row>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="panel-light p-5 sm:p-8">
              <h2 className="text-3xl">Send a message</h2>
              <div className="mt-5">
                <Suspense fallback={<GoldRingLoader />}>
                  <ContactClient />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container-site max-w-4xl">
          <h2 className="h-section">Before you ask</h2>
          <div className="mt-7">
            <FaqList items={faqs.slice(0, 3)} />
          </div>
          <Link href="/requirements" className="link mt-6 inline-flex min-h-11 items-center">
            See all questions
          </Link>
        </div>
      </section>
    </>
  );
}
