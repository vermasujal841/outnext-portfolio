import { NextResponse } from "next/server";
import { normalize, projectTypes, validate } from "@/lib/contact-schema";

/**
 * Contact form endpoint.
 * Spam protection: honeypot field, minimum fill time, per-IP rate limit,
 * payload size cap, and server-side validation of every field.
 * Delivery: Resend (https://resend.com) when RESEND_API_KEY, CONTACT_TO_EMAIL
 * and CONTACT_FROM_EMAIL are set.
 */

const MAX_BODY_BYTES = 12_000;
const MIN_FILL_MS = 3_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort in-memory rate limit (per server instance).
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Send the form as JSON." }, { status: 415 });
  }

  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "The message is too long. Shorten the description and try again." }, { status: 413 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "The form data couldn't be read. Reload the page and try again." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots learn nothing.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Time trap: forms submitted faster than a person could type are rejected.
  const startedAt = Number(raw.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ error: "That was very fast. Wait a moment and send the form again." }, { status: 429 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: "Too many messages from this connection. Try again in 10 minutes." }, { status: 429 });
  }

  const data = normalize(raw);
  const errors = validate(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Some fields need attention.", fields: errors }, { status: 422 });
  }

  const typeLabel = projectTypes.find((p) => p.value === data.projectType)?.label ?? data.projectType;
  const subject = `New project enquiry: ${typeLabel} (${data.name})`.replace(/[\r\n]+/g, " ");
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Company: ${data.company || "-"}`,
    `Project type: ${typeLabel}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    "",
    "Project description:",
    data.description,
  ].join("\n");

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email delivery not configured. Enquiry received:\n" + body);
      return NextResponse.json({ ok: true, delivered: false });
    }
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is missing.");
    return NextResponse.json(
      { error: "The form can't send messages right now. Contact us directly using the details on this page." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: data.email,
        subject,
        text: body,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return NextResponse.json(
        { error: "The message didn't send. Try again, or contact us directly using the details on this page." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Delivery failed", err);
    return NextResponse.json(
      { error: "The message didn't send. Try again, or contact us directly using the details on this page." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
