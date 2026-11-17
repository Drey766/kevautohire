import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { brand } from "@/config/brand";
import { PageHero } from "@/components/ui/PageHero";
import { DraftBadge } from "@/components/ui/Tags";
import { isDemoMode } from "@/lib/env";

export const metadata: Metadata = pageMeta({
  path: "/terms",
  title: "Terms",
  description: `The terms for using the ${brand.name} website and sending a booking request.`,
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Website terms" lede="The basics of using this website and sending a request.">
        <div className="mt-5">
          <DraftBadge />
        </div>
      </PageHero>
      <section className="section section-white">
        <div className="prose-blog container-site mx-auto">
          <h2>Bookings are requests</h2>
          <p>Sending a form, WhatsApp message or email is a request. A booking is only in place once {brand.name} has confirmed it with you. This website does not take payments.</p>
          <h2>Rates and estimates</h2>
          <p>{brand.legal.rateNote}</p>
          <p>{brand.legal.estimateNotice}</p>
          <p>{brand.legal.estimateSmallPrint}</p>
          <h2>Your booking terms</h2>
          <p>The terms that apply to your rental are confirmed with you when you book. Please read them and ask about anything that is unclear.</p>
          {isDemoMode && (
            <>
              <h2>Preview site</h2>
              <p>{brand.copy.demoNotice}</p>
            </>
          )}
          <h2>General information</h2>
          <p>{brand.legal.articleNotice}</p>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
