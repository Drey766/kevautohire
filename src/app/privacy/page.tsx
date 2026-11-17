import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { brand } from "@/config/brand";
import { PageHero } from "@/components/ui/PageHero";
import { DraftBadge } from "@/components/ui/Tags";

export const metadata: Metadata = pageMeta({
  path: "/privacy",
  title: "Privacy",
  description: `How ${brand.name} handles the details you share, under Kenya's ${brand.legal.privacyLaw}.`,
});

export default function PrivacyPage() {
  const { privacyLaw, privacyRegulator } = brand.legal;
  return (
    <>
      <PageHero title="Privacy notice" lede={`How ${brand.name} handles the details you share with us.`}>
        <div className="mt-5">
          <DraftBadge />
        </div>
      </PageHero>
      <section className="section section-white">
        <div className="prose-blog container-site mx-auto">
          <h2>What we collect</h2>
          <p>When you send a request, we receive what you enter on the form: your name, phone number, email address if you give one, and the details of your trip, such as dates, places, flight number and notes.</p>
          <p>We never ask for ID, driving licence or passport numbers on this website.</p>
          <h2>How we use it</h2>
          <p>We use your details only to reply to your request, confirm availability and your quote, and arrange your booking.</p>
          <h2>How forms work</h2>
          <p>Your request is sent to {brand.name} by email using an email delivery service. This website does not keep a database of requests. If you choose WhatsApp or a phone call instead, your conversation takes place on that service.</p>
          <h2>Cookies and analytics</h2>
          <p>This website does not use analytics. If you use Compare, the cars you choose are saved in your own browser so the list is still there when you return. That list is not sent to us, and you can clear it at any time.</p>
          <h2>Your rights</h2>
          <p>
            Under Kenya&apos;s {privacyLaw}, you may ask to see the personal data we hold about you, ask us to correct or delete it, and object to how it is used. To make a request, email <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </p>
          <p>If you are not satisfied with our response, you can complain to the {privacyRegulator}.</p>
          <h2>Contact</h2>
          <p>
            {brand.fullName}, {brand.address.building}, {brand.address.street}, {brand.address.area}, {brand.address.postalCode}.
          </p>
        </div>
      </section>
    </>
  );
}
