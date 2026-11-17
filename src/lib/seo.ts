import type { Metadata } from "next";
import { brand } from "@/config/brand";

// The 1200×630 share image made by rebrand/scripts/logo-prep.mjs. Set here because a page-level
// openGraph block replaces the inherited one, image included.
const SHARE_IMAGE = { url: "/brand/og-image.jpg", width: 1200, height: 630, alt: brand.fullName };

interface PageMetaInput {
  /** Route path, for example "/fleet". Resolved against metadataBase (the site URL). */
  path: string;
  title?: string;
  description?: string;
  type?: "website" | "article";
}

/** Per-page metadata with a canonical URL and full Open Graph and Twitter tags. */
export function pageMeta({ path, title, description = brand.seo.description, type = "website" }: PageMetaInput): Metadata {
  const fullTitle = title ? brand.seo.titleTemplate.replace("%s", title) : brand.seo.defaultTitle;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { siteName: brand.fullName, locale: "en_KE", type, url: path, title: fullTitle, description, images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [SHARE_IMAGE.url] },
  };
}
