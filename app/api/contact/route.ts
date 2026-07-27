import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form → email, via Resend. Low volume, so the free tier is plenty.
 *
 * Env (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   required — from resend.com/api-keys
 *   CONTACT_FROM     the verified "from" address, e.g.
 *                    "MÍA Foundation <formulario@mujerinfluenciaactualfoundation.org>".
 *                    The DOMAIN must be verified in Resend first (DNS records).
 *                    Falls back to Resend's shared "onboarding@resend.dev",
 *                    which only delivers to your own Resend account email — fine
 *                    for a quick test, not for production.
 *   CONTACT_TO       where leads land; defaults to the foundation inbox below.
 *
 * The visitor's own email is set as replyTo, so hitting "Reply" in the inbox
 * answers the lead directly.
 */

// Where leads land right now (client's choice, 2026-07-27). Override anytime
// with the CONTACT_TO env var — no code change needed.
const FALLBACK_TO = "mia.events.franci@gmail.com";
const FALLBACK_FROM = "MÍA Foundation <onboarding@resend.dev>";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not wired yet — tell the client to show the "email us directly" fallback.
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const org = String(body.org ?? "").trim();
  const message = String(body.message ?? "").trim();
  const interest = String(body.interest ?? "").trim();
  // Honeypot: real users leave this hidden field empty; bots fill it.
  const trap = String(body.company_website ?? "").trim();

  if (trap) return NextResponse.json({ ok: true }); // silently drop bots
  if (!name || !isEmail(email) || !message) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const resend = new Resend(apiKey);
  const subject = interest
    ? `Nuevo contacto (${interest}) — ${name}`
    : `Nuevo contacto — ${name}`;

  const rows = [
    ["Nombre", name],
    ["Email", email],
    ["Teléfono", phone || "—"],
    ["Empresa / organización", org || "—"],
    ["Interés", interest || "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("");

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || FALLBACK_FROM,
      to: process.env.CONTACT_TO || FALLBACK_TO,
      replyTo: email,
      subject,
      html: `
        <div style="font-family:system-ui,sans-serif;font-size:14px;color:#111;line-height:1.5">
          <p>Nuevo mensaje desde el sitio de MÍA Foundation:</p>
          <table style="border-collapse:collapse;margin:12px 0">${rows}</table>
          <p style="color:#666;margin:0 0 4px">Mensaje:</p>
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
        </div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
