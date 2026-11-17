"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { KeyboardEvent } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { SmartImage } from "@/components/ui/SmartImage";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  images: string[];
  name: string;
  index: number;
  onIndex: (i: number) => void;
}

export function Lightbox({ open, onClose, images, name, index, onIndex }: LightboxProps) {
  const step = (d: number) => onIndex((index + d + images.length) % images.length);
  const onKey = (e: KeyboardEvent) => {
    if (images.length < 2) return;
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };
  const arrow = "flex h-12 w-12 items-center justify-center rounded-full bg-aubergine-raised text-white";

  return (
    <Sheet open={open} onClose={onClose} title={`${name} photos`} hideTitle tone="night" variant="full" className="bg-aubergine">
      <div onKeyDown={onKey} className="flex h-[calc(100dvh-4.5rem)] flex-col px-4 pb-6">
        <div className="relative min-h-0 flex-1">{open && <SmartImage src={images[index]} alt={`${name}, photo ${index + 1} of ${images.length}`} sizes="100vw" className="object-contain" />}</div>
        {images.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-5">
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={arrow}>
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <p aria-live="polite" className="tabular min-w-12 text-center text-white">
              {index + 1} / {images.length}
            </p>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className={arrow}>
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </Sheet>
  );
}
