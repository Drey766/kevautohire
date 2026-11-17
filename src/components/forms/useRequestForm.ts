"use client";

import { useEffect, useRef, useState } from "react";
import { requestSchemas, toFieldErrors, type FieldErrors } from "@/lib/requestSchema";
import type { FormKind } from "@/types";

export type FormStatus = "idle" | "sending" | "success" | "fallback";

export function useRequestForm(kind: FormKind) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [company, setCompany] = useState(""); // honeypot
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  /** Validates, then posts. Success is shown only when the server confirms the email was sent. */
  async function submit(values: Record<string, unknown>) {
    const parsed = requestSchemas[kind].safeParse(values);
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...values, company, elapsedMs: Date.now() - startedAt.current }),
      });
      const data: { ok?: boolean; errors?: FieldErrors } = await res.json().catch(() => ({}));
      if (data.ok === true) {
        setStatus("success");
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      setStatus("fallback");
    } catch {
      setStatus("fallback");
    }
  }

  return { status, errors, submit, company, setCompany };
}
