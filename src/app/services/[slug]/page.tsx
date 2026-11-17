import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { ArrivalLine } from "@/components/brand/ArrivalLine";
import { Glow } from "@/components/brand/Glow";
import { AccentRing } from "@/components/brand/AccentRing";
import { Ribbon } from "@/components/brand/Ribbon";
import { Swoosh } from "@/components/brand/Swoosh";
import { FaqList } from "@/components/faq/FaqList";
import { ServiceForm } from "@/components/services/ServiceForm";
import { SmartImage } from "@/components/ui/SmartImage";
import { DraftBadge } from "@/components/ui/Tags";
import { classStats, getService, services, steps } from "@/lib/data";
import { formatKes } from "@/lib/format";

// Every valid page is known at build time; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({ path: `/services/${service.slug}`, title: service.title, description: service.summary });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const isWedding = slug === "weddings";
  const isAirport = slug === "airport-transfers";

  return (
    <>
      <section className="night overflow-hidden pt-32 pb-14 lg:flex lg:min-h-[560px] lg:flex-col lg:justify-end lg:pt-40">
        {service.image && (
          <>
            <div className="absolute inset-0 -z-20">
              <SmartImage src={service.image} alt="" sizes="100vw" className="object-[35%_center]" eager />
            </div>
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-night via-night/70 to-night/50 lg:bg-linear-to-r lg:from-night lg:via-night/70 lg:to-night/10" />
          </>
        )}
        {!service.image && <Swoosh className="absolute -top-24 -right-40 -z-10 w-[110vw] max-w-none opacity-80 sm:-right-24 sm:w-[70vw] lg:w-[46vw]" />}
        <Glow at="hero" className={service.image ? "opacity-50" : undefined} />
        <div className="container-site">
          <p className="eyebrow">{service.eyebrow}</p>
          <h1 className="display mt-3 max-w-3xl text-[clamp(2.75rem,1.4rem+4.4vw,5.25rem)]">{service.title}</h1>
          <p className="lede mt-5 max-w-xl text-white">{service.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#request" className="btn btn-accent">
              {brand.copy.bookCta}
            </a>
          </div>
          {isAirport && <ArrivalLine className="mt-10 h-20 max-w-4xl sm:h-28" />}
        </div>
      </section>

      <section className="section section-white">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            {service.quote && <blockquote className="display text-[clamp(1.625rem,1.2rem+1.5vw,2.5rem)] leading-tight text-primary">{service.quote}</blockquote>}
            {isWedding && <Ribbon className="mt-6 w-56" tone="accent" />}
            <div className="mt-7 max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl">What&apos;s involved</h2>
                <DraftBadge status={service.status} />
              </div>
              {service.body.map((para) => (
                <p key={para.slice(0, 30)} className="text-lg">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <h2 className="text-2xl">Suitable classes</h2>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {service.classes.map((c) => {
                const { from } = classStats(c);
                return (
                  <li key={c}>
                    <Link href={`/fleet?class=${c}`} className="flex min-h-14 items-center justify-between gap-4 py-2 font-normal text-ink hover:text-primary">
                      {brand.classes[c].label}
                      {from !== null && <span className="tabular text-sm text-primary">from {formatKes(from)}/day</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-[0.9375rem]">{brand.copy.coverageNote}</p>
          </aside>
        </div>
      </section>

      <section className="night section overflow-hidden">
        <Glow at="right" />
        <div className="container-site">
          <h2 className="h-section">How it works</h2>
          <ol className="mt-9 grid gap-8 md:grid-cols-3">
            {steps.slice(0, 3).map((s, i) => (
              <li key={s.index}>
                <AccentRing size={52} className="display text-lg text-accent">
                  {i + 1}
                </AccentRing>
                <h3 className="mt-4 text-[1.375rem]">{s.title}</h3>
                <p className="mt-2 text-base">{s.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/how-it-works" className="link mt-8 inline-flex min-h-11 items-center">
            See every step
          </Link>
        </div>
      </section>

      <section id="request" className="section section-mist scroll-mt-16">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="h-section">Questions</h2>
            <div className="mt-6">
              <FaqList items={service.faqs} />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="panel-light p-5 sm:p-8">
              <h2 className="text-3xl">Send your request</h2>
              <div className="mt-5">
                <ServiceForm service={service} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
