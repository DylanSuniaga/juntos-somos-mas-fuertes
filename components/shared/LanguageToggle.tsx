"use client";

import { useLang } from "@/components/providers/LanguageProvider";

/**
 * Floating ES/EN switch — the only piece of persistent system chrome.
 *
 * This is what's left of the old WorldPicker after the foundation chose the
 * Signature design and the other four worlds were removed (2026-07-22). Same
 * position and styling as before so the control stays where they expect it.
 */
export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="fixed right-3 top-3 z-[100] flex items-center rounded-full border border-line bg-surface/90 p-0.5 text-xs font-semibold shadow-[0_6px_20px_-8px_var(--shadow)] backdrop-blur sm:right-5 sm:top-5">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors ${
            lang === l ? "bg-ink text-surface" : "text-muted hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
