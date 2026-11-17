"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { brand } from "@/config/brand";
import { DateTimeField, Field } from "@/components/forms/Field";
import { EstimatePanel } from "@/components/fleet/EstimatePanel";
import { Tabs } from "@/components/ui/Tabs";
import { rangeErrorText, validateRange, type RangeError } from "@/lib/booking";
import { carMessage, waLink } from "@/lib/whatsapp";
import type { Car, DriveOption } from "@/types";

const LABELS: Record<DriveOption, string> = { "self-drive": "Self-drive", chauffeur: "Chauffeur" };

export function BookingCard({ car }: { car: Car }) {
  const router = useRouter();
  const sp = useSearchParams();
  const asked = sp.get("service");
  const initial = car.driveOptions.includes(asked as DriveOption) ? (asked as DriveOption) : car.driveOptions[0];
  const [service, setService] = useState<DriveOption>(initial);
  const [from, setFrom] = useState(sp.get("from") ?? "");
  const [to, setTo] = useState(sp.get("to") ?? "");
  const [pickup, setPickup] = useState<string>("office");
  const [area, setArea] = useState("");
  const [error, setError] = useState<RangeError | null>(null);

  const tabs = car.driveOptions.map((d) => ({ id: d, label: LABELS[d] }));
  const isPickupError = error === "pickup-required" || error === "pickup-past";

  function request() {
    if (from || to) {
      const problem = validateRange(from, to);
      setError(problem);
      if (problem) return;
    }
    const q = new URLSearchParams({ car: car.slug, service, pickup });
    if (from) q.set("from", from);
    if (to) q.set("to", to);
    if (pickup === "deliver" && area) q.set("area", area);
    router.push(`/book?${q}`);
  }

  return (
    <div id="book" className="panel-light p-5 sm:p-6">
      <h2 className="text-2xl">Book this car</h2>

      {tabs.length > 1 ? (
        <Tabs tabs={tabs} value={service} onChange={setService} idBase="car" label="How would you like to ride" className="mt-3 border-b border-line" />
      ) : (
        <p className="mt-1 text-sm text-purple">{LABELS[service]} only</p>
      )}

      <div {...(tabs.length > 1 ? { role: "tabpanel", id: `car-panel-${service}`, "aria-labelledby": `car-tab-${service}` } : {})} className="mt-4 space-y-3">
        <DateTimeField label="Pick-up date and time" value={from} onChange={setFrom} error={isPickupError && error ? rangeErrorText[error] : undefined} />
        <DateTimeField label="Return date and time" value={to} onChange={setTo} min={from || undefined} error={!isPickupError && error ? rangeErrorText[error] : undefined} />
        <Field label="Pick-up">
          {(p) => (
            <select {...p} className="input" value={pickup} onChange={(e) => setPickup(e.target.value)}>
              <option value="office">{brand.copy.officeOption}</option>
              <option value="deliver">{brand.copy.deliverOption}</option>
              <option value="airport">{brand.copy.airportOption}</option>
            </select>
          )}
        </Field>
        {pickup === "deliver" && <Field label="Delivery area">{(p) => <input {...p} className="input" value={area} maxLength={120} onChange={(e) => setArea(e.target.value)} />}</Field>}
        <EstimatePanel car={car} from={from} to={to} />
      </div>

      <button type="button" onClick={request} className="btn btn-primary mt-4 w-full">
        Request booking
      </button>
      <a href={waLink(carMessage({ name: car.name, ref: car.ref, from: from || undefined, to: to || undefined, service }))} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-2 w-full">
        <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
        {brand.copy.whatsappCta}
      </a>
    </div>
  );
}
