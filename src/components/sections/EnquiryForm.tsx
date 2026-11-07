"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, enquiryToText, roomPreferences, type Enquiry, type EnquiryInput } from "@/lib/enquiry";
import { business, whatsappHref } from "@/content/business";

type Result = { kind: "sent" } | { kind: "handoff"; text: string } | { kind: "error"; message: string } | null;

const today = () => new Date().toISOString().slice(0, 10);

export function EnquiryForm() {
  const [result, setResult] = useState<Result>(null);
  const params = useSearchParams();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput, unknown, Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { adults: 2, children: 0, room: "No preference", message: "", company: "" },
  });

  useEffect(() => {
    const room = params.get("room");
    const match = roomPreferences.find((r) => r === room || (room && r === room.replace(/s$/, "")));
    if (match) setValue("room", match);
  }, [params, setValue]);

  const onSubmit = async (data: Enquiry) => {
    setResult(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; handoff?: boolean; error?: string };
      if (res.ok && json.ok) {
        setResult({ kind: "sent" });
        reset();
      } else if (json.handoff) {
        // Email delivery not configured — hand off to WhatsApp / email with the details prefilled.
        setResult({ kind: "handoff", text: enquiryToText(data) });
      } else {
        setResult({ kind: "error", message: json.error || "Something went wrong. Please try WhatsApp or email instead." });
      }
    } catch {
      setResult({ kind: "handoff", text: enquiryToText(data) });
    }
  };

  const field = (name: keyof EnquiryInput) => ({
    id: `f-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `e-${name}` : undefined,
  });
  const Err = ({ name }: { name: keyof EnquiryInput }) =>
    errors[name] ? (
      <p id={`e-${name}`} className="mt-2 text-xs text-[#a1442f]">
        {String(errors[name]?.message)}
      </p>
    ) : null;
  const Label = ({ name, children }: { name: string; children: React.ReactNode }) => (
    <label htmlFor={`f-${name}`} className="eyebrow block !text-[0.62rem] text-charcoal/75">
      {children}
    </label>
  );

  if (result?.kind === "sent") {
    return (
      <div role="status" className="border border-lagoon/30 bg-ivory p-8 md:p-12">
        <p className="eyebrow text-lagoon">Enquiry received</p>
        <h3 className="mt-4 text-3xl">Thank you, we&apos;ll be in touch.</h3>
        <p className="mt-4 max-w-md leading-relaxed text-charcoal/75">
          We&apos;ve received your enquiry and will reply with availability and rates. Your stay is not reserved until
          we confirm it with you directly.
        </p>
        <button type="button" onClick={() => setResult(null)} className="link-underline mt-8 text-sm font-semibold text-lagoon">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Label name="name">Full name</Label>
        <input {...register("name")} {...field("name")} autoComplete="name" className="field" />
        <Err name="name" />
      </div>
      <div>
        <Label name="email">Email</Label>
        <input {...register("email")} {...field("email")} type="email" autoComplete="email" className="field" />
        <Err name="email" />
      </div>
      <div>
        <Label name="phone">Contact number</Label>
        <input {...register("phone")} {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" className="field" />
        <Err name="phone" />
      </div>
      <div>
        <Label name="checkIn">Check-in</Label>
        <input {...register("checkIn")} {...field("checkIn")} type="date" min={today()} className="field" />
        <Err name="checkIn" />
      </div>
      <div>
        <Label name="checkOut">Check-out</Label>
        <input {...register("checkOut")} {...field("checkOut")} type="date" min={today()} className="field" />
        <Err name="checkOut" />
      </div>
      <div>
        <Label name="adults">Adults</Label>
        <input {...register("adults")} {...field("adults")} type="number" min={1} max={20} inputMode="numeric" className="field" />
        <Err name="adults" />
      </div>
      <div>
        <Label name="children">Children</Label>
        <input {...register("children")} {...field("children")} type="number" min={0} max={20} inputMode="numeric" className="field" />
        <Err name="children" />
      </div>
      <div className="sm:col-span-2">
        <Label name="room">Accommodation preference</Label>
        <select {...register("room")} {...field("room")} className="field">
          {roomPreferences.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <Label name="message">Additional requests (optional)</Label>
        <textarea {...register("message")} {...field("message")} rows={4} className="field resize-y" placeholder="Arrival time, transfers, dietary needs, boat trip interest…" />
        <Err name="message" />
      </div>
      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="f-company">Company</label>
        <input {...register("company")} id="f-company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-charcoal/75">
          This is an enquiry, not a reservation. We&apos;ll reply with current availability and rates. Your details are
          only used to respond.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center bg-lagoon px-8 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-lagoon-deep disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </button>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {result?.kind === "error" && <p className="text-sm text-[#a1442f]">{result.message}</p>}
        {result?.kind === "handoff" && (
          <div className="border border-champagne/60 bg-sand/50 p-6">
            <p className="font-serif text-2xl">Almost there: send it to us directly</p>
            <p className="mt-2 text-sm text-charcoal/70">
              Your enquiry is ready. Choose how you&apos;d like to send it and we&apos;ll reply as soon as we can.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={whatsappHref(result.text)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-lagoon px-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ivory">
                Send via WhatsApp
              </a>
              <a
                href={`mailto:${business.contact.email}?subject=${encodeURIComponent("Booking enquiry")}&body=${encodeURIComponent(result.text)}`}
                className="inline-flex min-h-11 items-center border border-charcoal/30 px-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em]"
              >
                Send via email
              </a>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
