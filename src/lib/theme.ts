import type { CSSProperties } from "react";
import { brand } from "@/config/brand";

const kebab = (key: string) => key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

// brand.colors → CSS variables on <html>; globals.css maps them into the Tailwind theme.
export const themeVars = {
  ...Object.fromEntries(Object.entries(brand.colors).map(([k, v]) => [`--brand-${kebab(k)}`, v])),
  "--logo-gold-from": brand.colors.goldFrom,
  "--logo-gold-to": brand.colors.goldTo,
  "--logo-tagline": brand.colors.white,
} as CSSProperties;
