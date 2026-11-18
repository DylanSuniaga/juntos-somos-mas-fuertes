import { NextResponse } from "next/server";
import { Resend } from "resend";
import { confirmationHtml, escapeHtml } from "@/lib/email";

/**
 * Contact form → email, via Resend. Low volume, so the free tier is plenty.
 * Sends TWO emails per submission:
 *   1. Notification to the foundation (CONTACT_TO) — the lead + all fields.
 *   2. Branded auto-confirmation to the visitor ("we got your message").
 * The foundation email is critical (its failure → 502). The confirmation is
 * best-effort — if it fails the lead is still captured, so we still return ok.
 *
 * Env (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   required — from resend.com/api-keys
 *   CONTACT_FROM     verified "from" address, e.g.
 *                    "MÍA Foundation <formulario@mujerinfluenciaactualfoundation.org>".
 *                    The DOMAIN must be verified in Resend first (DNS records).
 *                    Falls back to Resend's shared "onboarding@resend.dev",
 *                    which only delivers to your own Resend account email.
 *   CONTACT_TO       where leads land; defaults to the foundation inbox below.
 *
 * The visitor's own email is set as replyTo on the notification, so hitting
 * "Reply" in the inbox answers the lead directly.
 */

// Where leads land right now (Karen's Gmail, 2026-11-03). Override anytime
// with the CONTACT_TO env var — no code change needed.
const FALLBACK_TO = "miainfluencias@gmail.com";
const FALLBACK_FROM = "MÍA Foundation <onboarding@resend.dev>";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not wired yet — tell the client to show the "email us directly" fallback.
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
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
  const lang = body.lang === "en" ? "en" : "es";
  // Honeypot: real users leave this hidden field empty; bots fill it.
  const trap = String(body.company_website ?? "").trim();

  if (trap) return NextResponse.json({ ok: true }); // silently drop bots
  if (!name || !isEmail(email) || !message) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM || FALLBACK_FROM;
  // Absolute origin for the logo in the confirmation email.
  const origin =
    req.headers.get("origin") ||
    (req.headers.get("host") ? `https://${req.headers.get("host")}` : "");

  // ---- 1. Notification to the foundation (critical) ----
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
      from,
      to: process.env.CONTACT_TO || FALLBACK_TO,
      replyTo: email,
      subject: interest ? `Nuevo contacto (${interest}) — ${name}` : `Nuevo contacto — ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;font-size:14px;color:#111;line-height:1.5">
          <p>Nuevo mensaje desde el sitio de MÍA Foundation:</p>
          <table style="border-collapse:collapse;margin:12px 0">${rows}</table>
          <p style="color:#666;margin:0 0 4px">Mensaje:</p>
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
        </div>`,
    });
    if (error) {
      console.error("Resend (notification) error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact route (notification) error:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  // ---- 2. Branded auto-confirmation to the visitor (best-effort) ----
  try {
    await resend.emails.send({
      from,
      to: email,
      replyTo: process.env.CONTACT_TO || FALLBACK_TO,
      subject:
        lang === "en"
          ? "We received your message — MÍA Foundation"
          : "Recibimos tu mensaje — MÍA Foundation",
      html: confirmationHtml(name.split(" ")[0] || name, lang, origin),
    });
  } catch (err) {
    // Non-fatal: the foundation already has the lead.
    console.error("Contact route (confirmation) error:", err);
  }

  return NextResponse.json({ ok: true });
}
