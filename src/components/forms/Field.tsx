"use client";

import { useId, type ReactNode } from "react";
import { useNairobiNow } from "@/lib/useNairobiNow";

interface FieldShellProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: (props: { id: string; "aria-invalid"?: true; "aria-describedby"?: string; required?: boolean }) => ReactNode;
  className?: string;
}

/** Label, control and error, wired together for assistive technology. */
export function Field({ label, error, required, hint, children, className }: FieldShellProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children({ id, required, ...(error ? { "aria-invalid": true as const } : {}), ...(describedBy ? { "aria-describedby": describedBy } : {}) })}
      {hint && (
        <p id={hintId} className="mt-1.5 text-sm">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

interface DateTimeFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  /** Earliest selectable value. Defaults to the current Nairobi time. */
  min?: string;
  name?: string;
  className?: string;
}

export function DateTimeField({ label, value, onChange, error, required, min, name, className }: DateTimeFieldProps) {
  const now = useNairobiNow();
  return (
    <Field label={label} error={error} required={required} className={className}>
      {(props) => <input {...props} name={name} type="datetime-local" className="input tabular" value={value} min={min ?? now} step={60} onChange={(e) => onChange(e.target.value)} />}
    </Field>
  );
}
