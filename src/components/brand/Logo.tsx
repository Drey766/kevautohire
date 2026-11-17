import Image from "next/image";
import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";

// The client's logo is a small (150px) raster on white, so it is shown no taller than 75px.
// On dark backgrounds it sits on a white disc, which suits its round emblem.
// Replace public/brand/logo@2x.png when the official vector arrives.
const SRC = "/brand/logo@2x.png";
const W = 248;
const H = 240;

interface LogoProps {
  /** "dark" = placed on a dark background (shown on a white disc). */
  tone?: "dark" | "light";
  /** Display height in px (max 75). */
  size?: number;
  /** Above the fold (the navbar): load eagerly. */
  priority?: boolean;
  className?: string;
  decorative?: boolean;
}

export function Logo({ tone = "dark", size = 52, priority, className, decorative }: LogoProps) {
  const h = Math.min(size, 75);
  const img = <Image src={SRC} width={W} height={H} alt={decorative ? "" : brand.copy.logoAlt} style={{ height: tone === "dark" ? Math.round(h * 0.82) : h, width: "auto" }} priority={priority} />;
  if (tone === "light") return <span className={cn("inline-flex", className)}>{img}</span>;
  return (
    <span className={cn("logo-disc", className)} style={{ width: h, height: h }}>
      {img}
    </span>
  );
}
