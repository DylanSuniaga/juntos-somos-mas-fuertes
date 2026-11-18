import { NextResponse } from "next/server";
import { Resend } from "resend";
import { confirmationHtml, escapeHtml } from "@/lib/email";

/**
 * Nominee registration form → email, via Resend (same account and sender as
 * /api/contact). Sends the registration to the foundation and a confirmation
 * to the applicant; the confirmation is best-effort.
 *
 * Env: RESEND_API_KEY and CONTACT_FROM are shared with the contact form.
 *   NOMINATION_TO   where registrations land; defaults to the inbox below.
 */

// Inbox the foundation asked for (Karen, 2026-11-17).
const FALLBACK_TO = "oficial@miainfluencia.com";
const FALLBACK_FROM = "MÍA Foundation <onboarding@resend.dev>";

const MAX_BIO = 5000;

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const gala = String(body.gala ?? "").trim();
  const bio = String(body.bio ?? "").trim().slice(0, MAX_BIO);
  const lang = body.lang === "en" ? "en" : "es";
  const trap = String(body.company_website ?? "").trim(); // honeypot

  if (trap) return NextResponse.json({ ok: true });
  if (!firstName || !lastName || !isEmail(email) || !gala || !bio) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM || FALLBACK_FROM;
  const to = process.env.NOMINATION_TO || FALLBACK_TO;
  const origin =
    req.headers.get("origin") ||
    (req.headers.get("host") ? `https://${req.headers.get("host")}` : "");
  const fullName = `${firstName} ${lastName}`;

  // ---- 1. Registration to the foundation (critical) ----
  const rows = [
    ["Nombre", firstName],
    ["Apellido", lastName],
    ["Email", email],
    ["Gala / país", gala],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("");

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nueva inscripción (${gala}) — ${fullName}`,
      html: `
        <div style="font-family:system-ui,sans-serif;font-size:14px;color:#111;line-height:1.5">
          <p>Nueva inscripción de nominado desde el sitio de MÍA Foundation:</p>
          <table style="border-collapse:collapse;margin:12px 0">${rows}</table>
          <p style="color:#666;margin:0 0 4px">Biografía:</p>
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(bio)}</p>
        </div>`,
    });
    if (error) {
      console.error("Resend (nomination) error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Nomination route error:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  // ---- 2. Confirmation to the applicant (best-effort) ----
  try {
    await resend.emails.send({
      from,
      to: email,
      replyTo: to,
      subject:
        lang === "en"
          ? "We received your registration — MÍA Foundation"
          : "Recibimos tu inscripción — MÍA Foundation",
      html: confirmationHtml(firstName, lang, origin, {
        es: {
          preheader: "Recibimos tu inscripción a la Gala de Reconocimiento MÍA.",
          body: "Recibimos tu inscripción a la Gala de Reconocimiento MÍA. Nuestro equipo la revisará y te contactará pronto.",
        },
        en: {
          preheader: "We received your registration for the MÍA Recognition Gala.",
          body: "We received your registration for the MÍA Recognition Gala. Our team will review it and contact you soon.",
        },
      }),
    });
  } catch (err) {
    console.error("Nomination route (confirmation) error:", err);
  }

  return NextResponse.json({ ok: true });
}
