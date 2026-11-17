"use client";

import { useState, type FormEvent } from "react";
import { brand } from "@/config/brand";
import { ContactInputs } from "@/components/forms/ContactInputs";
import { Field } from "@/components/forms/Field";
import { ConsentField, ErrorSummary, FormFallback, FormNotice, FormSuccess, Honeypot, SubmitButton } from "@/components/forms/FormParts";
import { useRequestForm } from "@/components/forms/useRequestForm";
import { MESSAGE_MAX } from "@/lib/forms";

export function GeneralForm({ initialMessage = "" }: { initialMessage?: string }) {
  const { status, errors, submit, company, setCompany } = useRequestForm("general");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [consent, setConsent] = useState(false);

  if (status === "success") return <FormSuccess />;
  if (status === "fallback") return <FormFallback whatsappMessage={brand.copy.whatsappPrefill} />;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit({ name, phone, email, message, consent });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <ContactInputs name={name} phone={phone} email={email} onName={setName} onPhone={setPhone} onEmail={setEmail} errors={errors} />
      <Field label="How can we help?" required error={errors.message}>
        {(p) => <textarea {...p} className="input" maxLength={MESSAGE_MAX} value={message} onChange={(e) => setMessage(e.target.value)} />}
      </Field>
      <Honeypot value={company} onChange={setCompany} />
      <FormNotice />
      <ConsentField checked={consent} onChange={setConsent} error={errors.consent} />
      <ErrorSummary count={Object.keys(errors).length} />
      <SubmitButton status={status} label="Send message" />
    </form>
  );
}
