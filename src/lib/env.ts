import { brand } from "@/config/brand";

// Demo mode stays on unless it is explicitly switched off, so the sample
// fleet can never be published and indexed by accident.
export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
export const showDraftFlags = process.env.NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true";

/**
 * The public address used for canonical links, link previews, the sitemap and JSON-LD.
 * NEXT_PUBLIC_SITE_URL wins, unless it is a localhost value that leaked into a Vercel build.
 * Vercel preview builds point at their own deployment; production falls back to brand.siteUrl.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const onVercel = Boolean(process.env.VERCEL_ENV);
  if (explicit && !(onVercel && /localhost|127\.0\.0\.1/.test(explicit))) return explicit;
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (onVercel || process.env.NODE_ENV === "production") return brand.siteUrl;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, "");
