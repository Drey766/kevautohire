"use client";

import Link from "next/link";
import { useId } from "react";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { RingLoader } from "@/components/brand/AccentRing";
import { waLink } from "@/lib/whatsapp";
import type { FormStatus } from "@/components/forms/useRequestForm";

/** Hidden from people; automated form-fillers tend to complete it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

export function ConsentField({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex min-h-11 items-start gap-3 text-[0.9375rem] font-normal text-ink">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={error ? true : undefined} className="mt-1 h-[18px] w-[18px] flex-none accent-(--brand-primary)" />
        <span>
          I agree to {brand.name} using these details to reply to this request. See the{" "}
          <Link href="/privacy" className="link">
            privacy notice
          </Link>
          .
        </span>
      </label>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export function FormNotice() {
  return <p className="text-sm">{brand.legal.formNotice}</p>;
}

export function SubmitButton({ status, label }: { status: FormStatus; label: string }) {
  const sending = status === "sending";
  return (
    <button type="submit" disabled={sending} aria-busy={sending} className="btn btn-primary w-full sm:w-auto">
      {sending ? <RingLoader size={20} label="Sending" /> : null}
      {sending ? "Sending" : label}
    </button>
  );
}

export function ErrorSummary({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <p role="alert" className="field-error font-medium">
      Please check the {count === 1 ? "field" : `${count} fields`} marked above.
    </p>
  );
}

export function FormSuccess() {
  return (
    <div role="status" className="py-6 text-center">
      <CheckCircle2 size={36} strokeWidth={1.25} className="mx-auto text-primary" aria-hidden="true" />
      <p className="display mt-3 text-2xl text-ink">{brand.copy.formSuccess}</p>
    </div>
  );
}

/** Shown whenever the email could not be sent. Hands the request over to WhatsApp or a call. */
export function FormFallback({ whatsappMessage }: { whatsappMessage: string }) {
  return (
    <div role="alert" className="py-2">
      <p className="display text-2xl text-ink">{brand.copy.formFallback}</p>
      <a href={waLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 w-full sm:w-auto">
        <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
        {brand.copy.whatsappCta}
      </a>
      <ul className="mt-4 flex flex-wrap gap-x-6">
        {brand.phones.map((p) => (
          <li key={p.href}>
            <a href={p.href} className="link tabular inline-flex min-h-11 items-center gap-2">
              <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
              {p.display}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

