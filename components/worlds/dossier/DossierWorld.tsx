"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { content, brand, links } from "@/lib/content";
import { leadership } from "@/lib/team";
import { useLang, type Bi } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/primitives/Reveal";
import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";
import { ContactForm } from "@/components/shared/ContactForm";

/* =========================================================================
   DOSSIER WORLD — the foundation content styled as its own BRAND MANUAL,
   mirroring "MIA Foundation marca.pdf": Didone serif headings each underlined
   by a short red rule, ALL-CAPS mono/sans labels, red circular icon badges,
   two-column text split by a thin red hairline, logo tiles, photo plates with
   a circular MÍA badge, and a real palette strip. Off-white paper throughout.

   Section order is load-bearing — the foundation numbers them 01–09 in the
   copy deck, and the closing CTA + volunteer call sit after 09 unnumbered.
   ========================================================================= */

/* ---- dossier atoms ---- */

/** ALL-CAPS letter-spaced label. */
function Kicker({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "muted" }) {
  return (
    <span
      className={`block font-mono text-[0.66rem] font-semibold uppercase tracking-[0.32em] ${
        tone === "accent" ? "text-accent" : "text-muted"
      }`}
    >
      {children}
    </span>
  );
}

/** Serif section title with the signature short red underline rule. */
function SectionHead({
  index,
  kicker,
  children,
  center = false,
}: {
  index?: string;
  kicker?: ReactNode;
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {(index || kicker) && (
        <div className={`mb-3 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          {index && <span className="font-mono text-[0.66rem] font-semibold tracking-[0.2em] text-accent">{index}</span>}
          {kicker && <Kicker tone="muted">{kicker}</Kicker>}
        </div>
      )}
      <h2 className="font-display text-[2.1rem] font-black leading-[1.03] tracking-[-0.01em] text-ink sm:text-4xl lg:text-5xl">
        {children}
      </h2>
      <span className={`mt-4 block h-[3px] w-14 bg-accent ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

/** Red circular icon badge (stroke icon inside a solid red disc). */
function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-surface shadow-[0_10px_24px_-12px_var(--glow)]">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
    </span>
  );
}
const Icons = {
  person: (<><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>),
  wing: (<><path d="M3 15c4 1 8-1 11-5 2 4 5 5 7 5" /><path d="M6 15c2 .5 4 0 6-2" /><path d="M11 13c1.5.4 3 0 4-1.5" /></>),
  heart: (<path d="M12 20s-7-4.5-7-9.5A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7-2.5C19 10.5 12 20 12 20Z" />),
  target: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>),
  flag: (<><path d="M6 21V4" /><path d="M6 5h11l-2.2 3.5L17 12H6" /></>),
  gem: (<><path d="M6 4h12l3 5-9 11L3 9Z" /><path d="M3 9h18M9 4 7.5 9 12 20l4.5-11L15 4" /></>),
  check: (<path d="m5 12 4.5 4.5L19 7" />),
  hands: (<><path d="M12 21s-6-3.6-6-8.4A3.1 3.1 0 0 1 12 10a3.1 3.1 0 0 1 6 2.6C18 17.4 12 21 12 21Z" /><path d="M4.5 9 8 5.5M19.5 9 16 5.5" /></>),
} as const;

/** Photo plate carrying a small circular MÍA badge in the corner. */
function Plate({
  src,
  label,
  aspect = "4 / 3",
  priority = false,
  sizes,
}: {
  src?: string;
  label: Bi;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="relative">
      <PlaceholderImage src={src} label={label} aspect={aspect} priority={priority} sizes={sizes} />
      <span className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-surface p-1 shadow-[0_8px_20px_-8px_var(--shadow)] ring-1 ring-line">
        <Image src="/images/logo-red.png" alt="" width={44} height={44} className="h-full w-full rounded-full object-cover" aria-hidden />
      </span>
    </div>
  );
}

function DossierBtn({
  href,
  children,
  solid = true,
  external = false,
}: {
  href: string;
  children: ReactNode;
  solid?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center gap-2 rounded-token px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
        solid
          ? "bg-accent text-surface hover:bg-accent-deep"
          : "border border-ink text-ink hover:bg-ink hover:text-surface"
      }`}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

/* ---- the world ---- */

export function DossierWorld() {
  const { tr } = useLang();

  const essenceIcons = [Icons.person, Icons.wing, Icons.heart];

  const pillars: { icon: ReactNode; label: Bi; body: Bi }[] = [
    { icon: Icons.target, label: content.mission.visionLabel, body: content.mission.vision },
    { icon: Icons.flag, label: content.mission.missionLabel, body: content.mission.mission },
  ];

  return (
    <div className="font-body text-ink">
      {/* ===== MASTHEAD ===== */}
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-red.png" alt="MÍA Foundation" width={40} height={40} className="h-10 w-10 rounded-token" priority />
            <span className="font-mono text-[0.6rem] font-semibold uppercase leading-tight tracking-[0.26em] text-muted sm:text-[0.66rem] sm:tracking-[0.32em]">
              {brand.wordmark}
            </span>
          </div>
          <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted lg:block">
            MÍA · Miami · 2026
          </span>
        </div>
      </header>

      {/* ===== COVER ===== */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Kicker>{content.hero.hashtag}</Kicker>
            <h1 className="mt-5 font-display text-[2.9rem] font-black leading-[0.98] tracking-[-0.015em] text-ink sm:text-6xl lg:text-[4.4rem]">
              {tr(content.hero.title)}
            </h1>
            <span className="mt-6 block h-[3px] w-20 bg-accent" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {tr(content.hero.subtitle)}
            </p>
            <div className="mt-8">
              <DossierBtn href={links.gala} external={links.galaIsLive}>
                {tr(content.hero.ally)}
              </DossierBtn>
            </div>
          </div>
          <Reveal>
            <PlaceholderImage
              src="/images/hero.jpg"
              label={content.hero.imageLabel}
              aspect="4 / 5"
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </Reveal>
        </div>

        {/* trust bar */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-token border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {content.hero.trust.map((t, i) => (
            <div key={i} className="bg-ground px-4 py-5 text-center">
              <div className="font-display text-xl font-black leading-none text-accent">{tr(t.value)}</div>
              <div className="mt-2 font-mono text-[0.62rem] uppercase leading-snug tracking-[0.16em] text-muted">
                {tr(t.label)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 01 · IDENTIDAD ===== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="01" kicker={tr(content.essence.chapter)}>
            {tr(content.essence.title)}
          </SectionHead>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {content.essence.items.map((s, i) => (
              <Reveal key={i} delay={0.06 * i} className="flex flex-col gap-4">
                <IconBadge>{essenceIcons[i]}</IconBadge>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">{tr(s.lead)}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{tr(s.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 02 · NUESTRA HISTORIA ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="02" kicker={tr(content.why.chapter)}>
            {tr(content.why.title)}
          </SectionHead>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-4 text-[0.92rem] leading-relaxed text-muted">
                {content.why.paragraphs.slice(0, 2).map((p, i) => (
                  <p key={i}>{tr(p)}</p>
                ))}
              </div>
              <div className="space-y-4 text-[0.92rem] leading-relaxed text-muted sm:border-l sm:border-accent/30 sm:pl-8">
                {content.why.paragraphs.slice(2).map((p, i) => (
                  <p key={i}>{tr(p)}</p>
                ))}
              </div>
            </div>
            <Reveal>
              <Plate src="/images/why-mia.jpg" label={content.why.imageLabel} aspect="4 / 5" />
            </Reveal>
          </div>

          {/* Founder's story video. Hidden until a URL exists (2026-07-27): the
             block — including the play button — only renders once
             content.why.video.embedUrl is set. Set that one field to bring it
             back; nothing here was deleted. */}
          {content.why.video.embedUrl && (
          <Reveal className="mt-12">
            <div className="grid items-center gap-8 rounded-token border border-line bg-surface p-7 sm:grid-cols-[1fr_auto] sm:p-9">
              <div>
                <h3 className="font-display text-2xl font-bold leading-snug text-ink">
                  {tr(content.why.video.title)}
                </h3>
                <span className="mt-3 block h-[2px] w-10 bg-accent" />
                <p className="mt-4 max-w-xl text-[0.92rem] italic leading-relaxed text-muted">
                  {tr(content.why.video.body)}
                </p>
              </div>
              <div className="flex items-center gap-4 sm:flex-col sm:items-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-surface shadow-[0_12px_28px_-14px_var(--glow)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5.5v13l11-6.5L8 5.5Z" />
                  </svg>
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                  {tr(content.why.video.pending)}
                </span>
              </div>
            </div>
          </Reveal>
          )}
        </div>
      </section>

      {/* ===== 03 · MISIÓN / VISIÓN / VALORES ===== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="03" kicker={tr(content.mission.chapter)}>
            {tr(content.mission.motto)}
          </SectionHead>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
            {pillars.map((p, i) => (
              <Reveal key={i} delay={0.06 * i} className="flex gap-5">
                <IconBadge>{p.icon}</IconBadge>
                <div>
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                    {tr(p.label)}
                  </h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{tr(p.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 border-t border-line pt-8">
            <div className="flex items-center gap-5">
              <IconBadge>{Icons.gem}</IconBadge>
              <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {tr(content.mission.valuesLabel)}
              </h3>
            </div>
            <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.mission.values.map((v, i) => (
                <li key={i} className="flex items-baseline gap-3 border-b border-line pb-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="font-display text-lg font-medium text-ink">{tr(v)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 04 · ¿POR QUÉ IMPORTA? ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="04" kicker={tr(content.matters.chapter)}>
            {tr(content.matters.title)}
          </SectionHead>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
            <Reveal className="lg:order-2">
              <Plate src="/images/why-matters.jpg" label={content.matters.imageLabel} aspect="4 / 3" />
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2 lg:order-1">
              <div className="space-y-4 text-[0.92rem] leading-relaxed text-muted">
                {content.matters.paragraphs.slice(0, 2).map((p, i) => (
                  <p key={i}>{tr(p)}</p>
                ))}
              </div>
              <div className="space-y-4 text-[0.92rem] leading-relaxed text-muted sm:border-l sm:border-accent/30 sm:pl-8">
                {content.matters.paragraphs.slice(2).map((p, i) => (
                  <p key={i}>{tr(p)}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 05 · PROGRAMAS ===== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="05" kicker={tr(content.programs.chapter)}>
            {tr(content.programs.title)}
          </SectionHead>
          <div className="mt-10 grid gap-px overflow-hidden rounded-token border border-line bg-line md:grid-cols-3">
            {content.programs.items.map((it, i) => (
              <Reveal key={i} delay={0.06 * i} className="flex flex-col bg-ground p-7">
                <span className="font-display text-5xl font-black text-accent/25">{tr(it.tag)}</span>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink">{tr(it.title)}</h3>
                <span className="mt-3 block h-[2px] w-10 bg-accent" />
                <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">{tr(it.body)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 06 · LA CAUSA QUE NOS UNE ===== */}
      <section id="campana" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="06" kicker={tr(content.campaign.kicker)}>
            {tr(content.campaign.title)}
          </SectionHead>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <p className="text-[0.92rem] leading-relaxed text-muted">{tr(content.campaign.paragraphs[0])}</p>
            <p className="text-[0.92rem] leading-relaxed text-muted lg:border-l lg:border-accent/30 lg:pl-10">
              {tr(content.campaign.paragraphs[1])}
            </p>
          </div>

          {/* next gala — date, time, venue */}
          <Reveal>
            <div className="mt-12 rounded-token border border-line bg-surface p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">
                {tr(content.campaign.event.name)}
              </h3>
              <span className="mt-3 block h-[2px] w-10 bg-accent" />
              <dl className="mt-6 grid gap-6 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
                    {tr(content.campaign.event.dateLabel)}
                  </dt>
                  <dd className="mt-2 text-[0.95rem] text-ink">{tr(content.campaign.event.date)}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
                    {tr(content.campaign.event.timeLabel)}
                  </dt>
                  <dd className="mt-2 text-[0.95rem] text-ink">{tr(content.campaign.event.time)}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
                    {tr(content.campaign.event.venueLabel)}
                  </dt>
                  <dd className="mt-2 text-[0.95rem] text-ink">
                    {content.campaign.event.venue}
                    <span className="mt-1 block text-[0.85rem] text-muted">{content.campaign.event.address}</span>
                    <a
                      href={links.venueMap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent underline underline-offset-4"
                    >
                      {tr(content.campaign.event.mapCta)} →
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <div className="mt-12 text-center">
            <p className="mx-auto max-w-2xl font-display text-xl font-medium italic leading-snug text-ink sm:text-2xl">
              {tr(content.campaign.invite)}
            </p>
            <div className="mt-7 flex justify-center">
              <DossierBtn href={links.gala} external={links.galaIsLive}>
                {tr(content.campaign.button)}
              </DossierBtn>
            </div>
          </div>

          {/* campaign triptych */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {content.campaign.images.map((img, i) => (
              <Reveal key={img.src} delay={0.06 * i}>
                <PlaceholderImage
                  src={img.src}
                  label={img.label}
                  aspect="3 / 4"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 07 · NUESTRA TRAYECTORIA ===== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="07" kicker={tr(content.timeline.chapter)}>
            {tr(content.timeline.title)}
          </SectionHead>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {content.timeline.milestones.map((m, i) => (
              <Reveal key={m.year} delay={0.06 * i} as="li" className="relative flex flex-col">
                <div className="font-display text-2xl font-black leading-none text-ink lg:text-[1.6rem]">
                  {m.year}
                </div>
                {/* node + connector rail */}
                <div className="relative my-5 h-3">
                  <span
                    aria-hidden
                    className={`absolute left-1.5 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-line lg:block ${
                      i === content.timeline.milestones.length - 1 ? "lg:hidden" : ""
                    }`}
                  />
                  <span className="relative block h-3 w-3 rounded-full bg-accent ring-4 ring-surface" />
                </div>
                <div className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  {tr(m.label)}
                </div>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-muted">{tr(m.text)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== 08 · NUESTRO LIDERAZGO ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="08" kicker={tr(content.leadership.chapter)}>
            {tr(content.leadership.title)}
          </SectionHead>
          <p className="mt-6 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
            {tr(content.leadership.intro)}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((p, i) => {
              const initials = p.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
              return (
                <Reveal key={p.name} delay={0.05 * i}>
                  <div className="overflow-hidden rounded-token border border-line bg-ground" style={{ aspectRatio: "1 / 1" }}>
                    {p.photo ? (
                      <Image
                        src={p.photo}
                        alt={p.name}
                        width={480}
                        height={480}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="h-full w-full object-cover"
                        style={p.name === "Ninoska Suniaga" ? { objectPosition: "center top" } : undefined}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-surface-2 font-display text-3xl font-black text-accent/60">
                        {initials}
                      </div>
                    )}
                  </div>
                  <h4 className="mt-3 font-display text-base font-bold leading-tight text-ink">{p.name}</h4>
                  <span className="mt-1 block h-[2px] w-8 bg-accent" />
                  <p className="mt-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted">
                    {tr(p.role)}
                    {p.country ? ` · ${tr(p.country)}` : ""}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 09 · TRANSPARENCIA ===== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div>
              <SectionHead index="09" kicker={tr(content.governance.chapter)}>
                {tr(content.governance.title)}
              </SectionHead>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-token border border-ink px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em]">
                  Florida Nonprofit
                </span>
                <span className="rounded-token border border-accent px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-accent">
                  501(c)(3) Pending
                </span>
              </div>
            </div>
            <ul className="space-y-4 self-center">
              {content.governance.items.map((it, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-surface">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {Icons.check}
                    </svg>
                  </span>
                  <p className="text-[0.92rem] leading-relaxed text-muted">{tr(it)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== CIERRE ===== */}
      <section id="colaborar" className="scroll-mt-6 border-t border-line">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Kicker>{content.hero.hashtag}</Kicker>
          <blockquote className="mx-auto mt-6 max-w-3xl font-display text-3xl font-black leading-[1.06] tracking-[-0.01em] text-ink sm:text-5xl">
            {tr(content.closing.quote)}
          </blockquote>
          <span className="mx-auto mt-6 block h-[3px] w-16 bg-accent" />
          <div className="mt-9 flex justify-center">
            <DossierBtn href={links.gala} external={links.galaIsLive}>
              {tr(content.closing.button)}
            </DossierBtn>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-[0.9rem] leading-relaxed text-muted">
            {tr(content.closing.institutional)}
          </p>
        </div>
      </section>

      {/* ===== VOLUNTARIADO ===== */}
      <section id="voluntariado" className="scroll-mt-6 border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:gap-12">
            <IconBadge>{Icons.hands}</IconBadge>
            <div>
              <Kicker>{tr(content.volunteer.chapter)}</Kicker>
              <h2 className="mt-3 font-display text-[1.9rem] font-black leading-[1.05] tracking-[-0.01em] text-ink sm:text-4xl">
                {tr(content.volunteer.title)}
              </h2>
              <span className="mt-4 block h-[3px] w-14 bg-accent" />
              <p className="mt-5 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
                {tr(content.volunteer.body)}
              </p>
            </div>
            <div className="lg:justify-self-end">
              <DossierBtn href={links.volunteer} solid={false} external>
                {tr(content.volunteer.button)}
              </DossierBtn>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACTO ===== */}
      <section id="contacto" className="scroll-mt-6 border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <Kicker>{tr(content.contact.chapter)}</Kicker>
            <h2 className="mt-3 font-display text-[1.9rem] font-black leading-[1.05] tracking-[-0.01em] text-ink sm:text-4xl">
              {tr(content.contact.title)}
            </h2>
            <span className="mt-4 block h-[3px] w-14 bg-accent" />
            <p className="mt-5 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
              {tr(content.contact.body)}
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">
          <div>
            <Image src="/images/logo-red.png" alt="MÍA Foundation" width={56} height={56} className="h-14 w-14 rounded-token" />
            <p className="mt-3 text-[0.8rem] text-muted">{brand.legalName}</p>
            <p className="text-[0.8rem] text-muted">{tr(brand.jurisdiction)}</p>
          </div>
          <div className="text-[0.8rem] text-muted">
            <Kicker>{tr(content.footer.contactLabel)}</Kicker>
            <p className="mt-2">
              <a href={`mailto:${brand.email}`} className="break-all transition-colors hover:text-accent">
                {brand.email}
              </a>
            </p>
            {brand.phone && (
              <p className="mt-1">
                <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-accent">
                  {brand.phone}
                </a>
              </p>
            )}
            <p className="mt-2 flex flex-wrap items-center gap-x-2">
              <a href={brand.socials.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                Instagram
              </a>
              <span aria-hidden>·</span>
              {/* No Facebook page yet — deliberately plain text, not a link. */}
              <span>Facebook</span>
              <span aria-hidden>·</span>
              <a href={brand.socials.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                LinkedIn
              </a>
            </p>
          </div>
          <div className="text-[0.8rem] text-muted sm:text-right">
            <p>{tr(content.footer.privacy)}</p>
            <p>{tr(content.footer.terms)}</p>
            <p className="mt-3 font-display font-semibold italic text-accent">{brand.hashtag}</p>
          </div>
        </div>
        <div className="border-t border-line py-6">
          <p className="text-center font-mono text-[0.64rem] uppercase tracking-[0.18em] text-muted">
            © 2026 {brand.legalName} · {tr(content.footer.rights)}
          </p>
          {/* Studio credit — Pryxus double-slit mark + wordmark (accent #C25C79, hardcoded per brand). */}
          <a
            href="https://pryxus.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hecho por Pryxus"
            className="group mx-auto mt-6 flex w-fit flex-col items-center gap-1.5 opacity-70 transition-opacity hover:opacity-100"
          >
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted">
              {tr({ es: "Hecho por", en: "Made by" })}
            </span>
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
              <path d="M2 8 C 10 8, 14 16, 22 16 H 30" stroke="#C25C79" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 24 C 10 24, 14 16, 22 16" stroke="#C25C79" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            </svg>
            <span className="font-pryxus text-lg leading-none tracking-[0.25em] text-ink">
              PRY<span style={{ color: "#C25C79" }}>X</span>US
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
