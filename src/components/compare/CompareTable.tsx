"use client";

import Link from "next/link";
import { Check, Minus, X } from "lucide-react";
import { brand } from "@/config/brand";
import { SmartImage } from "@/components/ui/SmartImage";
import { CarTag } from "@/components/ui/Tags";
import { classLabel, formatRate } from "@/lib/format";
import { COMPARE_MAX, useCompare } from "@/lib/useCompare";
import { cn } from "@/lib/cn";
import type { Car } from "@/types";

const driveText = (c: Car) => c.driveOptions.map((d) => (d === "self-drive" ? "Self-drive" : "Chauffeur")).join(" and ");

export function CompareTable({ cars }: { cars: Car[] }) {
  const { slugs, toggle, remove, clear } = useCompare();
  const picked = slugs.map((s) => cars.find((c) => c.slug === s)).filter((c): c is Car => Boolean(c));
  const addable = cars.filter((c) => !slugs.includes(c.slug));

  const addPicker =
    picked.length < COMPARE_MAX ? (
      <label className="block max-w-sm text-sm">
        <span className="mb-1.5 block font-normal text-ink">Add a car</span>
        <select
          className="input"
          value=""
          onChange={(e) => {
            if (e.target.value) toggle(e.target.value);
          }}
        >
          <option value="">Choose from the fleet</option>
          {addable.map((c) => (
            <option key={c.ref} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    ) : null;

  if (picked.length === 0) {
    return (
      <div className="rounded-2xl bg-mist px-6 py-14 text-center">
        <h2 className="text-2xl">Nothing to compare yet</h2>
        <p className="mx-auto mt-2 max-w-md">Add up to {COMPARE_MAX} cars and see how they differ.</p>
        <div className="mx-auto mt-6 max-w-sm text-left">{addPicker}</div>
        <Link href="/fleet" className="btn btn-primary mt-6">
          {brand.copy.fleetCta}
        </Link>
      </div>
    );
  }

  const rows: { label: string; values: string[] }[] = [
    { label: "Class", values: picked.map((c) => classLabel(c.class)) },
    { label: "Body", values: picked.map((c) => c.bodyType) },
    { label: "Seats", values: picked.map((c) => (c.seats ? String(c.seats) : "To confirm")) },
    { label: "Drive", values: picked.map(driveText) },
    { label: "Daily rate", values: picked.map(formatRate) },
    { label: "Ideal for", values: picked.map((c) => c.idealFor.join(", ") || "To confirm") },
  ];
  const features = [...new Set(picked.flatMap((c) => c.features))];
  const differs = (values: string[]) => picked.length > 1 && new Set(values).size > 1;
  const cell = "border-b border-line p-3 align-top text-[0.9375rem] sm:p-4";
  const head = "sticky left-0 z-10 border-b border-line p-3 text-left align-top text-sm font-medium text-ink sm:p-4";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        {addPicker ?? <p>You are comparing the maximum of {COMPARE_MAX} cars.</p>}
        <button type="button" onClick={clear} className="link min-h-11">
          Clear all
        </button>
      </div>
      <p className="mb-3 inline-flex items-center gap-2 text-sm">
        <span aria-hidden="true" className="h-4 w-4 rounded bg-mist" />
        Shaded rows differ between cars
      </p>
      <div tabIndex={0} role="region" aria-label="Car comparison table" className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <td className="sticky left-0 z-10 w-36 border-b border-line bg-white" />
              {picked.map((c) => (
                <th key={c.ref} scope="col" className="min-w-52 border-b border-line p-3 text-left align-top font-normal sm:p-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-mist">
                    <SmartImage src={c.images[0]} alt="" sizes="280px" />
                    <span className="absolute top-2 left-2">
                      <CarTag sample={c.sample} />
                    </span>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <Link href={`/fleet/${c.slug}`} className="display inline-flex min-h-11 items-center text-xl leading-tight text-ink hover:text-purple">
                      {c.name}
                    </Link>
                    <button type="button" onClick={() => remove(c.slug)} aria-label={`Remove ${c.name}`} className="flex h-11 w-11 flex-none items-center justify-center rounded-full text-slate hover:text-purple">
                      <X size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className={cn(differs(r.values) && "bg-mist")}>
                <th scope="row" className={cn(head, differs(r.values) ? "bg-mist" : "bg-white")}>
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={picked[i].ref} className={cn(cell, "tabular font-normal text-ink")}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
            {features.map((f) => {
              const has = picked.map((c) => c.features.includes(f));
              const diff = picked.length > 1 && new Set(has).size > 1;
              return (
                <tr key={f} className={cn(diff && "bg-mist")}>
                  <th scope="row" className={cn(head, "font-normal", diff ? "bg-mist" : "bg-white")}>
                    {f}
                  </th>
                  {has.map((yes, i) => (
                    <td key={picked[i].ref} className={cell}>
                      {yes ? <Check size={18} strokeWidth={1.75} className="text-purple" aria-label="Yes" /> : <Minus size={18} strokeWidth={1.5} className="text-slate" aria-label="Not listed" />}
                    </td>
                  ))}
                </tr>
              );
            })}
            <tr>
              <td className="sticky left-0 z-10 bg-white" />
              {picked.map((c) => (
                <td key={c.ref} className="p-3 sm:p-4">
                  <Link href={`/book?car=${c.slug}`} className="btn btn-primary w-full px-4">
                    Request
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm">{brand.legal.rateNote}</p>
    </div>
  );
}
