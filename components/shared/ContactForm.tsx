"use client";

import { useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { content, brand } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Small contact form. Posts to /api/contact, which emails the foundation via
 * Resend. Until RESEND_API_KEY is set the endpoint returns 503 and we fall back
 * to showing the direct email address — the form is never a dead end.
 */
export function ContactForm() {
  const { tr } = useLang();
  const c = content.contact;
  const [status, setStatus] = useState<Status>("idle");

  const interestOptions = [
    tr(c.interests.gala),
    tr(c.interests.ally),
    tr(c.interests.donate),
    tr(c.interests.other),
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      org: fd.get("org"),
      interest: fd.get("interest"),
      message: fd.get("message"),
      company_website: fd.get("company_website"), // honeypot
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-token border border-line bg-ground px-4 py-3 text-[0.92rem] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent";
  const label =
    "mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted";

  if (status === "success") {
    return (
      <div className="rounded-token border border-line bg-surface p-8 text-center">
        <p className="font-display text-xl font-bold text-ink">{tr(c.success)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-token border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="cf-name">{tr(c.fields.name)}</label>
          <input id="cf-name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="cf-email">{tr(c.fields.email)}</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="cf-phone">{tr(c.fields.phone)}</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="cf-org">{tr(c.fields.org)}</label>
          <input id="cf-org" name="org" autoComplete="organization" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="cf-interest">{tr(c.fields.interest)}</label>
          <select id="cf-interest" name="interest" defaultValue={interestOptions[0]} className={field}>
            {interestOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="cf-message">{tr(c.fields.message)}</label>
          <textarea id="cf-message" name="message" required rows={4} className={`${field} resize-y`} />
        </div>
      </div>

      {/* Honeypot — hidden from humans, catches bots. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-token bg-accent px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-surface transition-colors hover:bg-accent-deep disabled:opacity-60"
        >
          {status === "sending" ? tr(c.sending) : tr(c.submit)}
          <span aria-hidden>→</span>
        </button>
        {status === "error" && (
          <p className="text-[0.85rem] text-muted">
            {tr(c.error)}{" "}
            <a href={`mailto:${brand.email}`} className="text-accent underline">
              {brand.email}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
