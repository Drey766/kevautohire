"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { Lightbox } from "@/components/fleet/Lightbox";
import { cn } from "@/lib/cn";

export function CarGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setOpen(true)} aria-label={`View larger photos of ${name}`} aria-haspopup="dialog" className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-mist">
        <SmartImage src={images[index]} alt={`${name}, photo ${index + 1}`} sizes="(min-width: 1024px) 58vw, 100vw" eager />
        <span className="absolute right-3 bottom-3 flex h-11 w-11 items-center justify-center rounded-full bg-night/75 text-white">
          <Expand size={18} strokeWidth={1.5} aria-hidden="true" />
        </span>
      </button>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-3 gap-3">
          {images.map((src, i) => (
            <li key={src}>
              <button type="button" onClick={() => setIndex(i)} aria-label={`Show photo ${i + 1} of ${name}`} aria-pressed={i === index} className={cn("relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-mist ring-offset-2 ring-offset-night transition", i === index ? "ring-2 ring-accent" : "opacity-75 hover:opacity-100")}>
                <SmartImage src={src} alt="" sizes="20vw" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Lightbox open={open} onClose={() => setOpen(false)} images={images} name={name} index={index} onIndex={setIndex} />
    </div>
  );
}
