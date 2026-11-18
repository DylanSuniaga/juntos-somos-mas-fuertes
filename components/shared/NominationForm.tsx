"use client";

import { useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { content } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Nominee registration form. Posts to /api/nomination, which emails the
 * foundation via Resend. Same never-a-dead-end fallback as ContactForm.
 */
export function NominationForm() {
  const { tr, lang } = useLang();
  const n = content.nomination;
  const [status, setStatus] = useState<Status>("idle");
  const galaOptions = n.galas.map((g) => tr(g));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // captured before the await (see ContactForm)
    setStatus("sending");
    const fd = new FormData(form);
    const payload = {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      gala: fd.get("gala"),
      bio: fd.get("bio"),
      lang,
      company_website: fd.get("company_website"), // honeypot
    };
    try {
      const res = await fetch("/api/nomination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
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
        <p className="font-display text-xl font-bold text-ink">{tr(n.success)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-token border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="nf-first">{tr(n.fields.firstName)}</label>
          <input id="nf-first" name="firstName" required autoComplete="given-name" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="nf-last">{tr(n.fields.lastName)}</label>
          <input id="nf-last" name="lastName" required autoComplete="family-name" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="nf-email">{tr(n.fields.email)}</label>
          <input id="nf-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="nf-gala">{tr(n.fields.gala)}</label>
          <select id="nf-gala" name="gala" required defaultValue="" className={field}>
            <option value="" disabled>—</option>
            {galaOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="nf-bio">{tr(n.fields.bio)}</label>
          <textarea
            id="nf-bio"
            name="bio"
            required
            rows={6}
            maxLength={5000}
            placeholder={tr(n.bioHint)}
            className={`${field} resize-y`}
          />
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
          {status === "sending" ? tr(n.sending) : tr(n.submit)}
          <span aria-hidden>→</span>
        </button>
        {status === "error" && (
          <p className="text-[0.85rem] text-muted">
            {tr(n.error)}{" "}
            <a href={`mailto:${n.fallbackEmail}`} className="text-accent underline">
              {n.fallbackEmail}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
