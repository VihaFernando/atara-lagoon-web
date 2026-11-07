import { z } from "zod";

export const roomPreferences = [
  "No preference",
  "Standard Double",
  "Deluxe Double",
  "Quadruple Room",
  "Garden Cabana",
] as const;

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date");

export const enquirySchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name").max(80),
    email: z.string().trim().email("Enter a valid email address").max(120),
    phone: z
      .string()
      .trim()
      .min(7, "Enter a contact number")
      .max(20)
      .regex(/^[+()\d\s-]+$/, "Use digits, spaces, + or -"),
    checkIn: isoDate,
    checkOut: isoDate,
    adults: z.coerce.number().int().min(1, "At least 1 adult").max(20),
    children: z.coerce.number().int().min(0).max(20),
    room: z.enum(roomPreferences),
    message: z.string().trim().max(1000, "Please keep it under 1000 characters").optional().or(z.literal("")),
    /** Honeypot — must stay empty. */
    company: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((d) => d.checkOut > d.checkIn, { path: ["checkOut"], message: "Check-out must be after check-in" });

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

export function enquiryToText(d: Enquiry) {
  return [
    `Booking enquiry — Atara Lagoon`,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Dates: ${d.checkIn} → ${d.checkOut}`,
    `Guests: ${d.adults} adult(s), ${d.children} child(ren)`,
    `Room preference: ${d.room}`,
    d.message ? `Requests: ${d.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
