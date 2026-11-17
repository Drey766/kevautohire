"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { brand } from "@/config/brand";
import { Tabs } from "@/components/ui/Tabs";
import { DateTimeField, Field } from "@/components/forms/Field";
import { rangeErrorText, validatePickup, validateRange, type RangeError } from "@/lib/booking";
import { AIRPORTS, DIRECTIONS } from "@/lib/forms";

const TABS = [
  { id: "self-drive", label: "Self-Drive" },
  { id: "chauffeur", label: "Chauffeur" },
  { id: "airport", label: "Airport Transfer" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export function BookingConsole() {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("self-drive");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [carClass, setCarClass] = useState("");
  const [direction, setDirection] = useState<string>(DIRECTIONS[0].value);
  const [airport, setAirport] = useState<string>(AIRPORTS[0]);
  const [datetime, setDatetime] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [error, setError] = useState<RangeError | null>(null);

  const isPickupError = error === "pickup-required" || error === "pickup-past";

  function changeTab(next: TabId) {
    setTab(next);
    setError(null);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (tab === "airport") {
      const problem = validatePickup(datetime);
      setError(problem);
      if (problem) return;
      router.push(`/book?${new URLSearchParams({ service: "airport", direction, airport, datetime, passengers })}`);
      return;
    }
    const problem = validateRange(from, to);
    setError(problem);
    if (problem) return;
    const q = new URLSearchParams({ drive: tab, from, to });
    if (carClass) q.set("class", carClass);
    router.push(`/fleet?${q}`);
  }

  return (
    <form onSubmit={submit} noValidate className="panel-glass night-scope p-4 sm:p-5 lg:p-6">
      <Tabs tabs={TABS} value={tab} onChange={changeTab} idBase="console" label="Choose how you'd like to ride" className="mb-4 border-b border-lavender/20" />

      <div role="tabpanel" id={`console-panel-${tab}`} aria-labelledby={`console-tab-${tab}`}>
        {tab === "airport" ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.3fr_0.7fr_auto] lg:items-start">
            <Field label="Direction">
              {(p) => (
                <select {...p} className="input" value={direction} onChange={(e) => setDirection(e.target.value)}>
                  {DIRECTIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <Field label="Airport">
              {(p) => (
                <select {...p} className="input" value={airport} onChange={(e) => setAirport(e.target.value)}>
                  {AIRPORTS.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              )}
            </Field>
            <DateTimeField label="Date and time" value={datetime} onChange={setDatetime} error={error ? rangeErrorText[error] : undefined} />
            <Field label="Passengers">
              {(p) => <input {...p} type="number" inputMode="numeric" min={1} max={60} className="input tabular" value={passengers} onChange={(e) => setPassengers(e.target.value)} />}
            </Field>
            <button type="submit" className="btn btn-gold w-full lg:mt-[1.625rem] lg:w-auto">
              Request transfer
            </button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.3fr_1fr_auto] lg:items-start">
            <DateTimeField label="Pick-up" value={from} onChange={setFrom} error={isPickupError && error ? rangeErrorText[error] : undefined} />
            <DateTimeField label={tab === "chauffeur" ? "Until" : "Return"} value={to} onChange={setTo} min={from || undefined} error={!isPickupError && error ? rangeErrorText[error] : undefined} />
            <Field label="Class">
              {(p) => (
                <select {...p} className="input" value={carClass} onChange={(e) => setCarClass(e.target.value)}>
                  <option value="">Any class</option>
                  {Object.entries(brand.classes).map(([id, c]) => (
                    <option key={id} value={id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <button type="submit" className="btn btn-gold w-full lg:mt-[1.625rem] lg:w-auto">
              {brand.copy.fleetCta}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
