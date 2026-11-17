// Booking requests: validated, emailed, never stored. Nothing here logs request bodies or personal data.
import { Resend } from "resend";
import { brand } from "@/config/brand";
import { formatDateOnly, formatDateTime } from "@/lib/booking";
import { getCar } from "@/lib/data";
import { MIN_SUBMIT_MS } from "@/lib/forms";
import { requestSchemas, toFieldErrors } from "@/lib/requestSchema";
import type { FormKind } from "@/types";

const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 10;
const MAX_BODY_BYTES = 16_000;
const hits = new Map<string, number[]>();

/** Best effort: per-instance memory only, cleared as windows expire. */
function isRateLimited(ip: string, now: number) {
  for (const [key, times] of hits) {
    if (times.every((t) => now - t > RATE_WINDOW_MS)) hits.delete(key);
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t <= RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

const notSent = () => Response.json({ ok: false });
const oneLine = (v: unknown) => String(v ?? "").replace(/[\r\n]+/g, " ").trim();
const KIND_LABEL: Record<FormKind, string> = { booking: "Booking", airport: "Airport transfer", wedding: "Wedding", general: "General" };

function buildEmail(kind: FormKind, v: Record<string, unknown>) {
  const line = (label: string, value: unknown) => (value === undefined || value === "" ? null : `${label}: ${oneLine(value)}`);
  const contact = [line("Name", v.name), line("Phone", v.phone), line("Email", v.email)];
  let topic = "";
  let details: (string | null)[] = [];

  if (kind === "booking") {
    const car = getCar(String(v.car));
    topic = car ? `${car.name} (${car.ref})` : oneLine(v.car);
    details = [
      line("Car", topic),
      line("Service", v.service),
      line("From", formatDateTime(String(v.from))),
      line("Until", formatDateTime(String(v.to))),
      line("Pick-up", v.pickup === "area" ? oneLine(v.area) : brand.copy.airportOption),
      line("Purpose", v.purpose),
      line("Passengers", v.passengers),
      line("Notes", v.notes),
    ];
  } else if (kind === "airport") {
    topic = oneLine(v.flight) || `${oneLine(v.airport)} ${formatDateTime(String(v.datetime))}`;
    details = [
      line("Direction", v.direction === "dropoff" ? "Drop-off to airport" : "Pickup from airport"),
      line("Airport", v.airport),
      line("Flight", v.flight),
      line("Date and time", formatDateTime(String(v.datetime))),
      line("Passengers", v.passengers),
      line("Bags", v.bags),
      line("Area", v.area),
      line("Preferred", v.preferred),
      line("Notes", v.notes),
    ];
  } else if (kind === "wedding") {
    topic = formatDateOnly(String(v.date));
    details = [line("Wedding date", topic), line("Venue or area", v.venue), line("Number of cars", v.cars), line("Preferred car", v.preferred), line("Timing notes", v.timing)];
  } else {
    topic = "Website enquiry";
    details = [line("Message", v.message)];
  }

  return {
    subject: `${KIND_LABEL[kind]} request — ${topic} — ${oneLine(v.name)}`.slice(0, 180),
    text: [...details, "", ...contact, "", "Consent given to reply to this request."].filter((l) => l !== null).join("\n"),
  };
}

/** Optional owner alert. Carries the request type only, never personal details. */
async function alertOwner(kind: FormKind) {
  const { WHATSAPP_API_TOKEN: token, WHATSAPP_PHONE_NUMBER_ID: phoneId, WHATSAPP_TEMPLATE_NAME: template, OWNER_WHATSAPP_NUMBER: to } = process.env;
  if (!token || !phoneId || !template || !to) return;
  try {
    await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: { name: template, language: { code: "en" }, components: [{ type: "body", parameters: [{ type: "text", text: KIND_LABEL[kind] }] }] },
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // The email already went out; a missed alert is not a failed request.
  }
}

export async function POST(request: Request) {
  const now = Date.now();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip, now)) return notSent();

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return notSent();

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return notSent();
    body = JSON.parse(raw);
  } catch {
    return notSent();
  }

  const kind = body.kind as FormKind;
  if (typeof kind !== "string" || !Object.hasOwn(requestSchemas, kind)) return notSent();

  // Automated submissions get the same quiet fallback response as any unsent request.
  if (body.company || typeof body.elapsedMs !== "number" || body.elapsedMs < MIN_SUBMIT_MS) return notSent();

  const parsed = requestSchemas[kind].safeParse(body);
  if (!parsed.success) return Response.json({ ok: false, errors: toFieldErrors(parsed.error) }, { status: 400 });
  const values = parsed.data as Record<string, unknown>;

  if (kind === "booking") {
    const car = getCar(String(values.car));
    if (!car) return Response.json({ ok: false, errors: { car: "Choose a car." } }, { status: 400 });
    if (!car.driveOptions.includes(values.service as "self-drive" | "chauffeur")) return Response.json({ ok: false, errors: { service: "This car isn't offered that way. Choose the other option." } }, { status: 400 });
  }

  const { RESEND_API_KEY: apiKey, BOOKING_EMAIL_TO: to, BOOKING_FROM_EMAIL: from } = process.env;
  if (!apiKey || !to || !from) return notSent();

  try {
    const { subject, text } = buildEmail(kind, values);
    const email = oneLine(values.email);
    const { error } = await new Resend(apiKey).emails.send({ from, to, subject, text, ...(email ? { replyTo: email } : {}) });
    if (error) return notSent();
  } catch {
    return notSent();
  }

  await alertOwner(kind);
  return Response.json({ ok: true });
}
