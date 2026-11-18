import { brand } from "@/lib/content";

/** Branded "we got your message" email sent back to the person who wrote in. */
export type ConfirmationCopy = { preheader: string; body: string; sub: string };

export function confirmationHtml(
  firstName: string,
  lang: "es" | "en",
  origin: string,
  /** Optional per-form wording; defaults to the contact-form copy. */
  copy?: Partial<Record<"es" | "en", Partial<ConfirmationCopy>>>,
) {
  const base =
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
  const t = { ...base, ...(copy?.[lang] ?? {}) };

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

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
