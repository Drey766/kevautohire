"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { brand } from "@/config/brand";
import { CarCard } from "@/components/fleet/CarCard";
import { CompareTray } from "@/components/fleet/CompareTray";
import { FilterPanel } from "@/components/fleet/FilterPanel";
import { FilterSheet } from "@/components/fleet/FilterSheet";
import { estimateFor, formatDateTime } from "@/lib/booking";
import { activeFilterCount, applyFilters, hasDates, parseFilters, serializeFilters, type Filters, type SortKey } from "@/lib/filters";
import type { Car } from "@/types";

export function FleetExplorer({ cars }: { cars: Car[] }) {
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // replaceState keeps the URL shareable without a server round trip; Next syncs useSearchParams.
  const update = useCallback((patch: Partial<Filters>) => {
    const current = parseFilters(new URLSearchParams(window.location.search));
    const qs = serializeFilters({ ...current, ...patch });
    window.history.replaceState(null, "", qs ? `/fleet?${qs}` : "/fleet");
  }, []);

  const clear = useCallback(() => {
    update({ classes: [], brands: [], bodies: [], seats: null, drive: null, min: null, max: null });
    setResetKey((k) => k + 1);
  }, [update]);

  const results = useMemo(() => applyFilters(cars, filters), [cars, filters]);
  const showEstimates = hasDates(filters);
  const active = activeFilterCount(filters);
  const carQuery = showEstimates ? `?${new URLSearchParams({ from: filters.from, to: filters.to, ...(filters.drive ? { service: filters.drive } : {}) })}` : filters.drive ? `?service=${filters.drive}` : "";

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="no-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 pb-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl">Filters</h2>
            {active > 0 && (
              <button type="button" onClick={clear} className="link text-sm">
                Clear all
              </button>
            )}
          </div>
          <FilterPanel cars={cars} filters={filters} update={update} scope="side" resetKey={resetKey} />
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="tabular text-ink">
            {results.length} {results.length === 1 ? "car" : "cars"}
          </p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setSheetOpen(true)} aria-haspopup="dialog" className="btn btn-ghost min-h-11 px-4 lg:hidden">
              <SlidersHorizontal size={16} strokeWidth={1.5} aria-hidden="true" />
              Filters{active > 0 ? ` (${active})` : ""}
            </button>
            <label className="flex items-center gap-2 text-sm">
              <span className="sr-only sm:not-sr-only">Sort</span>
              <select className="input min-h-11 w-auto py-1.5 pr-8" value={filters.sort} onChange={(e) => update({ sort: e.target.value as SortKey })} aria-label="Sort cars">
                <option value="recommended">Recommended</option>
                <option value="rate-asc">Rate: low to high</option>
                <option value="rate-desc">Rate: high to low</option>
              </select>
            </label>
          </div>
        </div>

        {showEstimates && (
          <div className="mt-5 rounded-2xl bg-mist p-4 text-[0.9375rem]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="tabular font-normal text-ink">
                Estimates for {formatDateTime(filters.from)} to {formatDateTime(filters.to)}
              </p>
              <button type="button" onClick={() => update({ from: "", to: "" })} className="link text-sm">
                Remove dates
              </button>
            </div>
            <p className="mt-1 text-sm">
              {brand.legal.estimateNotice} {brand.legal.estimateSmallPrint}
            </p>
          </div>
        )}

        {results.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-mist px-6 py-14 text-center">
            <h2 className="text-2xl">No cars match these filters</h2>
            <p className="mx-auto mt-2 max-w-md">Remove a filter to see more, or tell us what you need and we will look for it.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={clear} className="btn btn-primary">
                Clear filters
              </button>
              <a href="/contact" className="btn btn-ghost">
                Contact us
              </a>
            </div>
          </div>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((car) => (
              <li key={car.ref}>
                <CarCard car={car} estimate={showEstimates ? estimateFor(car, filters.from, filters.to) : null} query={carQuery} sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw" />
              </li>
            ))}
          </ul>
        )}
        <p className="mt-8 text-sm">{brand.legal.rateNote}</p>
      </div>

      <FilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} resultCount={results.length} onClear={clear}>
        <FilterPanel cars={cars} filters={filters} update={update} scope="sheet" resetKey={resetKey} />
      </FilterSheet>
      <CompareTray cars={cars} />
    </div>
  );
}
