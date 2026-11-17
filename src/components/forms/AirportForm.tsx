"use client";

import { useState, type FormEvent } from "react";
import { brand } from "@/config/brand";
import { ContactInputs } from "@/components/forms/ContactInputs";
import { DateTimeField, Field } from "@/components/forms/Field";
import { ConsentField, ErrorSummary, FormFallback, FormNotice, FormSuccess, Honeypot, SubmitButton } from "@/components/forms/FormParts";
import { useRequestForm } from "@/components/forms/useRequestForm";
import { AIRPORTS, DIRECTIONS, NOTES_MAX } from "@/lib/forms";
import { airportMessage, waLink } from "@/lib/whatsapp";

export interface AirportInitial {
  direction?: string;
  airport?: string;
  datetime?: string;
  passengers?: string;
}

export function AirportForm({ initial = {} }: { initial?: AirportInitial }) {
  const { status, errors, submit, company, setCompany } = useRequestForm("airport");
  const [direction, setDirection] = useState(initial.direction === "dropoff" ? "dropoff" : "pickup");
  const [airport, setAirport] = useState<string>(AIRPORTS.includes(initial.airport as (typeof AIRPORTS)[number]) ? (initial.airport as string) : AIRPORTS[0]);
  const [flight, setFlight] = useState("");
  const [datetime, setDatetime] = useState(initial.datetime ?? "");
  const [passengers, setPassengers] = useState(initial.passengers ?? "1");
  const [bags, setBags] = useState("");
  const [area, setArea] = useState("");
  const [preferred, setPreferred] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const summary = airportMessage({ direction, flight, airport, datetime, passengers, bags, area });
  const isPickup = direction === "pickup";

  if (status === "success") return <FormSuccess />;
  if (status === "fallback") return <FormFallback whatsappMessage={summary} />;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit({ direction, airport, flight, datetime, passengers, bags, area, preferred, name, phone, email, notes, consent });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Direction" required error={errors.direction}>
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
        <Field label="Airport" required error={errors.airport}>
          {(p) => (
            <select {...p} className="input" value={airport} onChange={(e) => setAirport(e.target.value)}>
              {AIRPORTS.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label={isPickup ? "Flight number" : "Flight number (optional)"} required={isPickup} error={errors.flight}>
          {(p) => <input {...p} className="input uppercase" maxLength={12} autoCapitalize="characters" value={flight} onChange={(e) => setFlight(e.target.value)} />}
        </Field>
        <DateTimeField label={isPickup ? "Arrival date and time" : "Departure date and time"} required value={datetime} onChange={setDatetime} error={errors.datetime} />
        <Field label="Passengers" required error={errors.passengers}>
          {(p) => <input {...p} className="input tabular" type="number" min={1} max={60} inputMode="numeric" value={passengers} onChange={(e) => setPassengers(e.target.value)} />}
        </Field>
        <Field label="Bags (optional)" error={errors.bags}>
          {(p) => <input {...p} className="input tabular" type="number" min={0} max={99} inputMode="numeric" value={bags} onChange={(e) => setBags(e.target.value)} />}
        </Field>
        <Field label={isPickup ? "Drop-off area" : "Pick-up area"} required error={errors.area}>
          {(p) => <input {...p} className="input" maxLength={120} value={area} onChange={(e) => setArea(e.target.value)} />}
        </Field>
        <Field label="Preferred class or car (optional)" error={errors.preferred}>
          {(p) => <input {...p} className="input" maxLength={80} value={preferred} onChange={(e) => setPreferred(e.target.value)} />}
        </Field>
      </div>
      <div className="rounded-xl bg-mist p-4">
        <p className="display text-xl text-ink">{brand.copy.quoteOnRequest}</p>
        <p className="mt-1 text-sm">{brand.legal.estimateNotice}</p>
      </div>
      <ContactInputs name={name} phone={phone} email={email} onName={setName} onPhone={setPhone} onEmail={setEmail} errors={errors} />
      <Field label="Notes (optional)" error={errors.notes}>
        {(p) => <textarea {...p} className="input" maxLength={NOTES_MAX} value={notes} onChange={(e) => setNotes(e.target.value)} />}
      </Field>
      <Honeypot value={company} onChange={setCompany} />
      <FormNotice />
      <ConsentField checked={consent} onChange={setConsent} error={errors.consent} />
      <ErrorSummary count={Object.keys(errors).length} />
      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton status={status} label="Request transfer" />
        <a href={waLink(summary)} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">
          {brand.copy.whatsappCta}
        </a>
      </div>
    </form>
  );
}
