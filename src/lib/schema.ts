import { brand } from "@/config/brand";
import { siteUrl } from "@/lib/env";
import type { BlogPost } from "@/types";

/** Serialise JSON-LD safely for an inline <script>. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export function autoRentalSchema() {
  const a = brand.address;
  const socialLinks = Object.values(brand.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: brand.fullName,
    url: siteUrl,
    telephone: brand.phones.map((p) => p.href.replace("tel:", "")),
    ...(brand.email ? { email: brand.email } : {}),
    address: {
      "@type": "PostalAddress",
      ...(a.street ? { streetAddress: [a.building, a.street].filter(Boolean).join(", ") } : {}),
      addressLocality: brand.city,
      ...(a.postalCode ? { postalCode: a.postalCode } : {}),
      addressCountry: "KE",
    },
    areaServed: brand.country,
    ...(socialLinks.length ? { sameAs: socialLinks } : {}),
    ...(brand.hours ? { openingHours: brand.hours } : {}),
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    author: { "@type": "Organization", name: post.author_name },
    publisher: { "@type": "Organization", name: brand.fullName },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };
}
