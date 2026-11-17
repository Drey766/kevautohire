import { ChevronDown } from "lucide-react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="display flex min-h-14 list-none items-center justify-between gap-4 py-3 text-[1.25rem] leading-snug text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown size={20} strokeWidth={1.5} className="flex-none text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="max-w-2xl pb-5">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
