import { NextResponse } from "next/server";
import { Resend } from "resend";
import { brand } from "@/lib/content";

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

/** Branded "we got your message" email sent back to the person who wrote in. */
function confirmationHtml(firstName: string, lang: "es" | "en", origin: string) {
  const t =
    lang === "en"
      ? {
          preheader: "Thank you for reaching out — we'll be in touch soon.",
          heading: `Thank you, ${escapeHtml(firstName)}!`,
          body: "We've received your message and our team will get back to you very soon.",
          sub: "In the meantime, we invite you to follow our journey and learn more about the cause.",
          cta: "Follow us on Instagram",
          signoff: "Warmly,",
          team: "The MÍA — Mujer Influencia Actual Foundation team",
          auto: "This is an automated confirmation — no need to reply.",
        }
      : {
          preheader: "Gracias por escribirnos — pronto estaremos en contacto.",
          heading: `¡Gracias, ${escapeHtml(firstName)}!`,
          body: "Recibimos tu mensaje y nuestro equipo te responderá muy pronto.",
          sub: "Mientras tanto, te invitamos a seguir nuestro camino y conocer más sobre la causa.",
          cta: "Síguenos en Instagram",
          signoff: "Con cariño,",
          team: "El equipo de MÍA — Mujer Influencia Actual Foundation",
          auto: "Esta es una confirmación automática — no es necesario responder.",
        };

  const logo = origin
    ? `<img src="${origin}/images/logo-red.png" alt="MÍA Foundation" width="72" height="72" style="display:block;border-radius:16px" />`
    : "";

  return `
  <!-- preheader --><div style="display:none;max-height:0;overflow:hidden;opacity:0">${t.preheader}</div>
  <div style="background:#f2f2f2;padding:32px 16px;font-family:Georgia,'Times New Roman',serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e6e6e6">
      <tr><td style="height:6px;background:#dc0708"></td></tr>
      <tr><td style="padding:36px 40px 8px;text-align:center">${logo}</td></tr>
      <tr><td style="padding:12px 40px 0;text-align:center">
        <h1 style="margin:0;font-size:26px;line-height:1.2;color:#1a1a1a;font-weight:800">${t.heading}</h1>
        <div style="width:44px;height:3px;background:#dc0708;margin:18px auto"></div>
      </td></tr>
      <tr><td style="padding:0 40px;text-align:center;font-family:Helvetica,Arial,sans-serif">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333">${t.body}</p>
        <p style="margin:0 0 26px;font-size:14px;line-height:1.6;color:#666">${t.sub}</p>
        <a href="${escapeHtml(brand.socials.instagram)}" style="display:inline-block;background:#dc0708;color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:13px 26px;border-radius:10px">${t.cta}</a>
      </td></tr>
      <tr><td style="padding:34px 40px 8px;text-align:center;font-family:Helvetica,Arial,sans-serif">
        <p style="margin:0;font-size:14px;color:#333">${t.signoff}</p>
        <p style="margin:4px 0 0;font-size:14px;color:#1a1a1a;font-weight:700">${t.team}</p>
      </td></tr>
      <tr><td style="padding:20px 40px 36px;text-align:center;font-family:Helvetica,Arial,sans-serif">
        <p style="margin:0 0 6px;font-size:15px;color:#dc0708;font-style:italic;font-family:Georgia,serif">${escapeHtml(brand.hashtag)}</p>
        <p style="margin:0;font-size:11px;color:#999">${t.auto}</p>
      </td></tr>
    </table>
  </div>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
