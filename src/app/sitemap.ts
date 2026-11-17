import type { MetadataRoute } from "next";
import { cars, posts, services } from "@/lib/data";
import { isDemoMode, siteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/fleet", "/compare", "/services", "/how-it-works", "/requirements", "/about", "/blog", "/book", "/contact", "/privacy", "/terms"];
  // Sample cars come from another company's site and must never be listed.
  const listedCars = cars.filter((c) => !isDemoMode || !c.sample);
  return [...pages, ...services.map((s) => `/services/${s.slug}`), ...listedCars.map((c) => `/fleet/${c.slug}`), ...posts.map((p) => `/blog/${p.slug}`)].map((path) => ({ url: `${siteUrl}${path}` }));
}
