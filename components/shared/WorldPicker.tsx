"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { WORLDS, type WorldId } from "@/lib/worlds";
import { useLang } from "@/components/providers/LanguageProvider";

/**
 * The picker — but now it navigates between four genuinely different sites.
 * Consistent "system chrome" (recolored per world via tokens) so the foundation
 * always finds it in the same spot. Left: ES/EN. Right: the four worlds.
 */
export function WorldPicker({ current }: { current: WorldId }) {
  const { lang, setLang, tr } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cur = WORLDS.find((w) => w.id === current) ?? WORLDS[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="fixed right-3 top-3 z-[100] flex items-center gap-2 sm:right-5 sm:top-5">
      {/* language */}
      <div className="flex items-center rounded-full border border-line bg-surface/90 p-0.5 text-xs font-semibold shadow-[0_6px_20px_-8px_var(--shadow)] backdrop-blur">
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

      {/* world picker */}
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={tr({ es: "Cambiar el estilo del sitio", en: "Change the site style" })}
          className="flex items-center gap-2 rounded-full border border-line bg-surface/90 py-1.5 pl-2.5 pr-3 text-xs font-semibold shadow-[0_6px_20px_-8px_var(--shadow)] backdrop-blur"
        >
          <span className="flex -space-x-1">
            {cur.swatches.map((c, i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-full ring-1 ring-surface"
                style={{ background: c }}
              />
            ))}
          </span>
          <span className="hidden text-muted sm:inline">
            {tr({ es: "Estilo", en: "Style" })}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 mt-2 w-[18rem] origin-top-right overflow-hidden rounded-2xl border border-line bg-surface/97 p-2 shadow-[0_24px_60px_-24px_var(--shadow)] backdrop-blur"
            >
              <div className="px-2 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted">
                {tr({ es: "Cuatro estilos · un mismo propósito", en: "Four styles · one purpose" })}
              </div>
              <div className="grid gap-1">
                {WORLDS.map((w) => {
                  const isActive = w.id === current;
                  return (
                    <Link
                      key={w.id}
                      href={w.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-2 py-2 transition-colors ${
                        isActive ? "bg-surface-2" : "hover:bg-surface-2"
                      }`}
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-line"
                        style={{ background: w.swatches[0] }}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: w.swatches[1] }}
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {tr(w.label)}
                        </span>
                        <span className="block truncate text-[0.7rem] text-muted">
                          {tr(w.feel)}
                        </span>
                      </span>
                      {isActive && (
                        <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-accent">
                          {tr({ es: "Activo", en: "Active" })}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
