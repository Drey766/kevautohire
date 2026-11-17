import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

// Open to all crawlers, including the link-preview bots of WhatsApp, Facebook, X and LinkedIn.
// Sample car pages carry their own noindex while demo mode is on.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
