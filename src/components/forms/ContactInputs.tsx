"use client";

import { Field } from "@/components/forms/Field";
import type { FieldErrors } from "@/lib/requestSchema";

interface ContactInputsProps {
  name: string;
  phone: string;
  email: string;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
  onEmail: (v: string) => void;
  errors: FieldErrors;
}

export function ContactInputs({ name, phone, email, onName, onPhone, onEmail, errors }: ContactInputsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Your name" required error={errors.name}>
        {(p) => <input {...p} className="input" autoComplete="name" value={name} onChange={(e) => onName(e.target.value)} />}
      </Field>
      <Field label="Phone or WhatsApp" required error={errors.phone}>
        {(p) => <input {...p} className="input tabular" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => onPhone(e.target.value)} />}
      </Field>
      <Field label="Email (optional)" error={errors.email} className="sm:col-span-2">
        {(p) => <input {...p} required={false} className="input" type="email" autoComplete="email" value={email} onChange={(e) => onEmail(e.target.value)} />}
      </Field>
    </div>
  );
}
