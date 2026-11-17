"use client";

import Image from "next/image";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

interface SmartImageProps {
  src: string | null | undefined;
  alt: string;
  sizes: string;
  className?: string;
  /** Above-the-fold images: load eagerly at high priority. */
  eager?: boolean;
}

/** Fills its positioned parent. Falls back to a night panel with the logo in an accent ring. */
export function SmartImage({ src, alt, sizes, className, eager }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div role="img" aria-label={alt} className="absolute inset-0 flex items-center justify-center bg-night">
        <span className="accent-ring" style={{ width: 84, height: 84 }}>
          <Logo size={60} decorative />
        </span>
      </div>
    );
  }

  return <Image src={src} alt={alt} fill sizes={sizes} loading={eager ? "eager" : undefined} fetchPriority={eager ? "high" : undefined} className={cn("object-cover", className)} onError={() => setFailed(true)} />;
}
