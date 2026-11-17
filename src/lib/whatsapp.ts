// WhatsApp hand-offs. Prefills never contain a phone number or email address.
import { brand } from "@/config/brand";
import { formatDateOnly, formatDateTime } from "@/lib/booking";

export function waLink(message: string = brand.copy.whatsappPrefill, phoneIndex = 0) {
  const phone = brand.phones[phoneIndex] ?? brand.phones[0];
  return `https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function carMessage(input: { name: string; ref: string; from?: string; to?: string; service?: string }) {
  let msg = `Hello ${brand.name}, I'd like the ${input.name} (${input.ref})`;
  if (input.from && input.to) msg += ` from ${formatDateTime(input.from)} to ${formatDateTime(input.to)}`;
  if (input.service === "chauffeur") msg += ", chauffeur-driven";
  return `${msg}.`;
}

export function airportMessage(input: {
  direction: string;
  flight?: string;
  airport: string;
  datetime?: string;
  passengers?: string | number;
  bags?: string | number;
  area?: string;
}) {
  const isDropoff = input.direction === "dropoff";
  const parts = [input.flight, input.airport, input.datetime ? formatDateTime(input.datetime) : ""].filter(Boolean);
  let msg = `${isDropoff ? "Airport drop-off" : "Airport pickup"}: ${parts.join(", ")}`;
  if (input.passengers) msg += `, ${input.passengers} passenger${String(input.passengers) === "1" ? "" : "s"}`;
  if (input.bags) msg += `, ${input.bags} bag${String(input.bags) === "1" ? "" : "s"}`;
  if (input.area) msg += `, ${isDropoff ? "from" : "to"} ${input.area}`;
  return `${msg}.`;
}

export function weddingMessage(input: { date?: string; cars?: string | number; venue?: string }) {
  let msg = "Wedding";
  if (input.date) msg += ` on ${formatDateOnly(input.date)}`;
  if (input.venue) msg += ` at ${input.venue}`;
  if (input.cars) msg += `, ${input.cars} car${String(input.cars) === "1" ? "" : "s"}`;
  return `${msg}.`;
}
