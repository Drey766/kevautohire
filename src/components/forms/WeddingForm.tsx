"use client";

import { useState, type FormEvent } from "react";
import { brand } from "@/config/brand";
import { ContactInputs } from "@/components/forms/ContactInputs";
import { Field } from "@/components/forms/Field";
import { ConsentField, ErrorSummary, FormFallback, FormNotice, FormSuccess, Honeypot, SubmitButton } from "@/components/forms/FormParts";
import { useRequestForm } from "@/components/forms/useRequestForm";
import { useNairobiNow } from "@/lib/useNairobiNow";
import { MAX_WEDDING_CARS, NOTES_MAX } from "@/lib/forms";
import { waLink, weddingMessage } from "@/lib/whatsapp";

export function WeddingForm() {
  const { status, errors, submit, company, setCompany } = useRequestForm("wedding");
  const now = useNairobiNow();
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [cars, setCars] = useState("1");
  const [preferred, setPreferred] = useState("");
  const [timing, setTiming] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const summary = weddingMessage({ date, venue, cars });

  if (status === "success") return <FormSuccess />;
  if (status === "fallback") return <FormFallback whatsappMessage={summary} />;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit({ date, venue, cars, preferred, timing, name, phone, email, consent });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Wedding date" required error={errors.date}>
          {(p) => <input {...p} type="date" className="input tabular" min={now?.slice(0, 10)} value={date} onChange={(e) => setDate(e.target.value)} />}
        </Field>
        <Field label="Venue or area" required error={errors.venue}>
          {(p) => <input {...p} className="input" maxLength={120} value={venue} onChange={(e) => setVenue(e.target.value)} />}
        </Field>
        <Field label="Number of vehicles" required error={errors.cars}>
          {(p) => <input {...p} className="input tabular" type="number" min={1} max={MAX_WEDDING_CARS} inputMode="numeric" value={cars} onChange={(e) => setCars(e.target.value)} />}
        </Field>
        <Field label="Preferred vehicle (optional)" error={errors.preferred}>
          {(p) => <input {...p} required={false} className="input" maxLength={80} value={preferred} onChange={(e) => setPreferred(e.target.value)} />}
        </Field>
      </div>
      <Field label="Timing notes (optional)" error={errors.timing}>
        {(p) => <textarea {...p} className="input" maxLength={NOTES_MAX} value={timing} onChange={(e) => setTiming(e.target.value)} />}
      </Field>
      <ContactInputs name={name} phone={phone} email={email} onName={setName} onPhone={setPhone} onEmail={setEmail} errors={errors} />
      <Honeypot value={company} onChange={setCompany} />
      <FormNotice />
      <ConsentField checked={consent} onChange={setConsent} error={errors.consent} />
      <ErrorSummary count={Object.keys(errors).length} />
      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton status={status} label="Request wedding transport" />
        <a href={waLink(date ? summary : brand.copy.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">
          {brand.copy.whatsappCta}
        </a>
      </div>
    </form>
  );
}
