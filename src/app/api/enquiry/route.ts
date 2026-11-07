import { NextResponse } from "next/server";
import { enquirySchema, enquiryToText } from "@/lib/enquiry";

export const runtime = "nodejs";

/* Simple in-memory rate limit: 5 requests / 10 min per IP (per server instance).
   For multi-instance deployments, swap for a shared store (e.g. Upstash Redis). */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many enquiries. Please try again later or message us on WhatsApp." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields." }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot filled → pretend success, drop silently.
  if (data.company) return NextResponse.json({ ok: true });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!key || !to || !from) {
    // No delivery backend configured: the client hands the enquiry off to WhatsApp / email.
    return NextResponse.json({ ok: false, handoff: true }, { status: 503 });
  }

  const text = enquiryToText(data);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Booking enquiry: ${data.name} (${data.checkIn} → ${data.checkOut})`,
        text,
        html: `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] delivery failed", (err as Error).message);
    return NextResponse.json({ ok: false, handoff: true }, { status: 502 });
  }
}
