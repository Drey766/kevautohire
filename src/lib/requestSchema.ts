// Shared by the forms (for instant feedback) and /api/booking (the real check).
import { z } from "zod";
import { nairobiToday, rangeErrorText, validatePickup, validateRange } from "@/lib/booking";
import { AIRPORTS, MAX_WEDDING_CARS, MESSAGE_MAX, NOTES_MAX, PURPOSES } from "@/lib/forms";
import type { FormKind } from "@/types";

const name = z.string().trim().min(2, "Enter your name.").max(80, "Keep your name under 80 characters.");
const phone = z
  .string()
  .trim()
  .regex(/^[+\d][\d\s()-]{6,19}$/, "Enter a valid phone number.");
const email = z.union([z.literal(""), z.email("Enter a valid email address, or leave this empty.")]).optional();
const consent = z.literal(true, { error: "Please agree so we can reply to your request." });
const optionalText = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters.`).optional();
const requiredText = (message: string, max = 120) => z.string().trim().min(2, message).max(max, `Keep this under ${max} characters.`);
const count = (min: number, max: number, message: string) => z.coerce.number({ error: message }).int(message).min(min, message).max(max, message);

export const bookingSchema = z
  .object({
    car: z.string().trim().min(1, "Choose a car."),
    service: z.enum(["chauffeur"], { error: "Choose a service." }),
    from: z.string(),
    to: z.string(),
    pickup: z.enum(["area", "airport"], { error: "Choose where we should pick you up." }),
    area: optionalText(120),
    purpose: z.union([z.literal(""), z.enum(PURPOSES)]).optional(),
    passengers: z.union([z.literal(""), count(1, 60, "Enter the number of passengers.")]).optional(),
    name,
    phone,
    email,
    notes: optionalText(NOTES_MAX),
    consent,
  })
  .superRefine((v, ctx) => {
    const problem = validateRange(v.from, v.to);
    if (problem) {
      const path = problem.startsWith("pickup") ? "from" : "to";
      ctx.addIssue({ code: "custom", path: [path], message: rangeErrorText[problem] });
    }
    if (v.pickup === "area" && !v.area?.trim()) ctx.addIssue({ code: "custom", path: ["area"], message: "Tell us the pick-up area." });
  });

export const airportSchema = z
  .object({
    direction: z.enum(["pickup", "dropoff"], { error: "Choose pickup or drop-off." }),
    airport: z.enum(AIRPORTS, { error: "Choose an airport." }),
    flight: optionalText(12),
    datetime: z.string(),
    passengers: count(1, 60, "Enter the number of passengers."),
    bags: z.union([z.literal(""), count(0, 99, "Enter the number of bags.")]).optional(),
    area: requiredText("Enter the pick-up or drop-off area."),
    preferred: optionalText(80),
    name,
    phone,
    email,
    notes: optionalText(NOTES_MAX),
    consent,
  })
  .superRefine((v, ctx) => {
    const problem = validatePickup(v.datetime);
    if (problem) ctx.addIssue({ code: "custom", path: ["datetime"], message: problem === "pickup-past" ? rangeErrorText[problem] : "Choose a date and time." });
    if (v.direction === "pickup" && !v.flight?.trim()) ctx.addIssue({ code: "custom", path: ["flight"], message: "Enter your flight number." });
  });

export const weddingSchema = z
  .object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose your wedding date."),
    venue: requiredText("Enter your venue or area."),
    cars: count(1, MAX_WEDDING_CARS, `Enter a number from 1 to ${MAX_WEDDING_CARS}.`),
    preferred: optionalText(80),
    timing: optionalText(NOTES_MAX),
    name,
    phone,
    email,
    consent,
  })
  .superRefine((v, ctx) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(v.date) && v.date < nairobiToday()) ctx.addIssue({ code: "custom", path: ["date"], message: "Choose a date that hasn't passed yet." });
  });

export const generalSchema = z.object({
  name,
  phone,
  email,
  message: z.string().trim().min(2, "Tell us how we can help.").max(MESSAGE_MAX, `Keep this under ${MESSAGE_MAX} characters.`),
  consent,
});

export const requestSchemas = { booking: bookingSchema, airport: airportSchema, wedding: weddingSchema, general: generalSchema } satisfies Record<FormKind, z.ZodType>;

export type FieldErrors = Record<string, string>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
