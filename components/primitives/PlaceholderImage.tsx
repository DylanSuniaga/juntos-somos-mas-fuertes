"use client";

import Image from "next/image";
import { useLang, type Bi } from "@/components/providers/LanguageProvider";

/**
 * A tasteful, clearly-labeled image slot. When `src` is set it renders a
 * cropped next/image; otherwise a styled placeholder carrying the brief's
 * guidance (subject + orientation). Drop a file in /public/images and pass its
 * path to `src` to swap — one line, no layout change.
 */
export function PlaceholderImage({
  src,
  label,
  alt,
  aspect = "4 / 3",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src?: string;
  /** guidance text shown in the empty state (bilingual ok) */
  label: Bi | string;
  alt?: Bi | string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { tr } = useLang();
  const guidance = tr(label);
  const altText = alt ? tr(alt) : guidance;

  return (
    <div
      className={`group relative overflow-hidden rounded-token-lg border border-line bg-surface-2 shadow-luxe ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        <Image
          src={src}
          alt={altText}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          {/* accent sheen so the empty state still feels designed */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(120% 80% at 100% 0%, var(--glow), transparent 55%), radial-gradient(120% 90% at 0% 100%, var(--glow), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-deep)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="opacity-80"
            >
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <circle cx="8.5" cy="10" r="1.6" />
              <path d="M21 16l-5-5L5 19" />
            </svg>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-accent-deep">
              Imagen · Foto
            </span>
            <span className="max-w-[38ch] text-sm leading-relaxed text-muted">
              {guidance}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
