"use client";

import { useState, type FormEvent } from "react";
import { brand } from "@/config/brand";
import { ContactInputs } from "@/components/forms/ContactInputs";
import { DateTimeField, Field } from "@/components/forms/Field";
import { ConsentField, ErrorSummary, FormFallback, FormNotice, FormSuccess, Honeypot, SubmitButton } from "@/components/forms/FormParts";
import { useRequestForm } from "@/components/forms/useRequestForm";
import { EstimatePanel } from "@/components/fleet/EstimatePanel";
import { NOTES_MAX, PURPOSES } from "@/lib/forms";
import { carMessage, waLink } from "@/lib/whatsapp";
import type { Car, DriveOption } from "@/types";

export type BookableCar = Pick<Car, "slug" | "name" | "ref" | "driveOptions" | "dailyRateKes" | "rateOnRequest">;

export interface BookingInitial {
  car?: string;
  service?: string;
  from?: string;
  to?: string;
  pickup?: string;
  area?: string;
  purpose?: string;
}

const LABELS: Record<DriveOption, string> = { "self-drive": "Self-drive", chauffeur: "Chauffeur" };

export function BookingForm({ cars, initial = {} }: { cars: BookableCar[]; initial?: BookingInitial }) {
  const { status, errors, submit, company, setCompany } = useRequestForm("booking");
  const [slug, setSlug] = useState(cars.some((c) => c.slug === initial.car) ? (initial.car as string) : "");
  const [requested, setRequested] = useState<DriveOption>(initial.service === "self-drive" ? "self-drive" : "chauffeur");
  const [from, setFrom] = useState(initial.from ?? "");
  const [to, setTo] = useState(initial.to ?? "");
  const [pickup, setPickup] = useState(["office", "deliver", "airport"].includes(initial.pickup ?? "") ? (initial.pickup as string) : "office");
  const [area, setArea] = useState(initial.area ?? "");
  const [purpose, setPurpose] = useState<string>(PURPOSES.includes(initial.purpose as (typeof PURPOSES)[number]) ? (initial.purpose as string) : "");
  const [passengers, setPassengers] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const car = cars.find((c) => c.slug === slug);
  const options: DriveOption[] = car ? car.driveOptions : ["self-drive", "chauffeur"];
  // The chosen car decides what's on offer; fall back to the option it actually has.
  const service = options.includes(requested) ? requested : options[0];

  if (status === "success") return <FormSuccess />;
  if (status === "fallback") return <FormFallback whatsappMessage={car ? carMessage({ name: car.name, ref: car.ref, from: from || undefined, to: to || undefined, service }) : brand.copy.whatsappPrefill} />;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit({ car: slug, service, from, to, pickup, area, purpose, passengers, name, phone, email, notes, consent });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Car" required error={errors.car}>
          {(p) => (
            <select {...p} className="input" value={slug} onChange={(e) => setSlug(e.target.value)}>
              <option value="">Choose a car</option>
              {cars.map((c) => (
                <option key={c.ref} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Service" required error={errors.service}>
          {(p) => (
            <select {...p} className="input" value={service} onChange={(e) => setRequested(e.target.value as DriveOption)}>
              {options.map((o) => (
                <option key={o} value={o}>
                  {LABELS[o]}
                </option>
              ))}
            </select>
          )}
        </Field>
        <DateTimeField label="Pick-up date and time" required value={from} onChange={setFrom} error={errors.from} />
        <DateTimeField label="Return date and time" required value={to} onChange={setTo} min={from || undefined} error={errors.to} />
        <Field label="Pick-up" required error={errors.pickup}>
          {(p) => (
            <select {...p} className="input" value={pickup} onChange={(e) => setPickup(e.target.value)}>
              <option value="office">{brand.copy.officeOption}</option>
              <option value="deliver">{brand.copy.deliverOption}</option>
              <option value="airport">{brand.copy.airportOption}</option>
            </select>
          )}
        </Field>
        {pickup === "deliver" && (
          <Field label="Delivery area" required error={errors.area}>
            {(p) => <input {...p} className="input" maxLength={120} value={area} onChange={(e) => setArea(e.target.value)} />}
          </Field>
        )}
        <Field label="Purpose (optional)" error={errors.purpose}>
          {(p) => (
            <select {...p} className="input" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              <option value="">Select</option>
              {PURPOSES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Passengers (optional)" error={errors.passengers}>
          {(p) => <input {...p} className="input tabular" type="number" min={1} max={60} inputMode="numeric" value={passengers} onChange={(e) => setPassengers(e.target.value)} />}
        </Field>
      </div>

      {car && <EstimatePanel car={car} from={from} to={to} />}

      <ContactInputs name={name} phone={phone} email={email} onName={setName} onPhone={setPhone} onEmail={setEmail} errors={errors} />
      <Field label="Notes (optional)" error={errors.notes}>
        {(p) => <textarea {...p} className="input" maxLength={NOTES_MAX} value={notes} onChange={(e) => setNotes(e.target.value)} />}
      </Field>

      <Honeypot value={company} onChange={setCompany} />
      <FormNotice />
      <ConsentField checked={consent} onChange={setConsent} error={errors.consent} />
      <ErrorSummary count={Object.keys(errors).length} />
      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton status={status} label={brand.copy.bookCta} />
        <a href={waLink(car ? carMessage({ name: car.name, ref: car.ref, from: from || undefined, to: to || undefined, service }) : brand.copy.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">
          {brand.copy.whatsappCta}
        </a>
      </div>
    </form>
  );
}
