"use client";

import { useSearchParams } from "next/navigation";
import { GeneralForm } from "@/components/forms/GeneralForm";

export function ContactClient() {
  const message = useSearchParams().get("message")?.slice(0, 600) ?? "";
  return <GeneralForm key={message} initialMessage={message} />;
}
