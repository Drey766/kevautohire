import { useId, type CSSProperties } from "react";
import { brand } from "@/config/brand";
import { LOGO_TAGLINE, LOGO_WORDMARK } from "./logo-paths";

const VIEWS = {
  full: [0, 0, 1128, 672],
  wordmark: [0, 0, 1128, 470],
  // The ringed "i": the left of the wordmark, cropped by the viewBox.
  emblem: [42, 18, 172, 412],
} as const;

interface LogoProps {
  variant?: keyof typeof VIEWS;
  /** "dark" = placed on a dark background (white tagline). */
  tone?: "dark" | "light";
  className?: string;
  decorative?: boolean;
}

export function Logo({ variant = "full", tone = "dark", className, decorative }: LogoProps) {
  const gradientId = `imtalii-gold-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [x, y, w, h] = VIEWS[variant];
  const style = { "--logo-tagline": tone === "dark" ? "var(--brand-white)" : "var(--brand-ink)" } as CSSProperties;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${x} ${y} ${w} ${h}`}
      width={w}
      height={h}
      className={className}
      style={style}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": brand.copy.logoAlt })}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--logo-gold-from)" />
          <stop offset="1" stopColor="var(--logo-gold-to)" />
        </linearGradient>
      </defs>
      <path fill={`url(#${gradientId})`} fillRule="evenodd" d={LOGO_WORDMARK} />
      <circle cx="128" cy="104" r="80" fill="none" stroke={`url(#${gradientId})`} strokeWidth="11" />
      {variant === "full" && <path fill="var(--logo-tagline)" fillRule="evenodd" d={LOGO_TAGLINE} />}
    </svg>
  );
}
