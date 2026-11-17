"use client";

import { useRef, useState, type ReactNode } from "react";
import { brand as brandConfig } from "@/config/brand";
import type { Filters } from "@/lib/filters";
import type { Car, CarClass, DriveOption } from "@/types";

function Group({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line py-4 first:border-t-0 first:pt-0">
      <legend className="float-left mb-2 w-full text-sm font-medium text-ink">{legend}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

function Option({ type, name, checked, onChange, label, count }: { type: "checkbox" | "radio"; name: string; checked: boolean; onChange: () => void; label: string; count?: number }) {
  return (
    <label className="flex min-h-11 items-center gap-3 text-[0.9375rem] font-normal text-ink lg:min-h-9">
      <input type={type} name={name} checked={checked} onChange={onChange} className="h-[18px] w-[18px] flex-none accent-(--brand-purple)" />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="tabular text-sm text-slate">{count}</span>}
    </label>
  );
}

function RateRange({ filters, update }: { filters: Filters; update: (patch: Partial<Filters>) => void }) {
  const [min, setMin] = useState(filters.min === null ? "" : String(filters.min));
  const [max, setMax] = useState(filters.max === null ? "" : String(filters.max));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typing is debounced so the URL and results settle once the visitor pauses.
  function commit(nextMin: string, nextMax: string) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      update({ min: nextMin === "" ? null : Number(nextMin), max: nextMax === "" ? null : Number(nextMax) });
    }, 350);
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <label className="text-sm">
        <span className="mb-1 block">From (KES)</span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          step={1000}
          className="input tabular"
          value={min}
          onChange={(e) => {
            setMin(e.target.value);
            commit(e.target.value, max);
          }}
        />
      </label>
      <label className="text-sm">
        <span className="mb-1 block">To (KES)</span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          step={1000}
          className="input tabular"
          value={max}
          onChange={(e) => {
            setMax(e.target.value);
            commit(min, e.target.value);
          }}
        />
      </label>
    </div>
  );
}

interface FilterPanelProps {
  cars: Car[];
  filters: Filters;
  update: (patch: Partial<Filters>) => void;
  /** Keeps radio groups separate between the sidebar and the sheet. */
  scope: string;
  /** Changes when filters are cleared, so the typed rate range resets. */
  resetKey: number;
}

const toggleIn = <T,>(list: T[], item: T) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

export function FilterPanel({ cars, filters, update, scope, resetKey }: FilterPanelProps) {
  const brands = [...new Set(cars.map((c) => c.brand))].sort((a, b) => a.localeCompare(b));
  const countBrand = (b: string) => cars.filter((c) => c.brand === b).length;
  const drives: { value: DriveOption | null; label: string }[] = [
    { value: null, label: "Any" },
    { value: "self-drive", label: "Self-drive available" },
    { value: "chauffeur", label: "Chauffeur" },
  ];

  return (
    <div>
      <Group legend="Class">
        {(Object.entries(brandConfig.classes) as [CarClass, { label: string }][]).map(([id, c]) => (
          <Option key={id} type="checkbox" name={`${scope}-class`} label={c.label} checked={filters.classes.includes(id)} onChange={() => update({ classes: toggleIn(filters.classes, id) })} count={cars.filter((x) => x.class === id).length} />
        ))}
      </Group>
      <Group legend="Drive">
        {drives.map((d) => (
          <Option key={d.label} type="radio" name={`${scope}-drive`} label={d.label} checked={filters.drive === d.value} onChange={() => update({ drive: d.value })} />
        ))}
      </Group>
      <Group legend="Body">
        {["Sedan", "SUV"].map((b) => (
          <Option key={b} type="checkbox" name={`${scope}-body`} label={b} checked={filters.bodies.includes(b)} onChange={() => update({ bodies: toggleIn(filters.bodies, b) })} />
        ))}
      </Group>
      <Group legend="Seats">
        {[
          { value: null, label: "Any" },
          { value: 5, label: "5 or more" },
          { value: 7, label: "7 or more" },
        ].map((s) => (
          <Option key={s.label} type="radio" name={`${scope}-seats`} label={s.label} checked={filters.seats === s.value} onChange={() => update({ seats: s.value })} />
        ))}
      </Group>
      <Group legend="Daily rate">
        <RateRange key={resetKey} filters={filters} update={update} />
      </Group>
      <Group legend="Brand">
        {brands.map((b) => (
          <Option key={b} type="checkbox" name={`${scope}-brand`} label={b} checked={filters.brands.includes(b)} onChange={() => update({ brands: toggleIn(filters.brands, b) })} count={countBrand(b)} />
        ))}
      </Group>
    </div>
  );
}
