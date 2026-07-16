"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { content, brand } from "@/lib/content";
import { foundingTeam, board } from "@/lib/team";
import { useLang, type Bi } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/primitives/CountUp";
import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";

/* =========================================================================
   DOSSIER WORLD — the foundation content styled as its own BRAND MANUAL,
   mirroring "MIA Foundation marca.pdf": Didone serif headings each underlined
   by a short red rule, ALL-CAPS mono/sans labels, red circular icon badges,
   two-column text split by a thin red hairline, logo tiles, photo plates with
   a circular MÍA badge, and a real palette strip. Off-white paper throughout.
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
  href = "#colaborar",
  children,
  solid = true,
}: {
  href?: string;
  children: ReactNode;
  solid?: boolean;
}) {
  return (
    <a
      href={href}
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

  const symbol: { icon: ReactNode; lead: Bi; body: Bi }[] = [
    {
      icon: Icons.person,
      lead: { es: "El nombre", en: "The name" },
      body: {
        es: "“MÍA” es la abreviatura de Mujer Influencia Actual. Impulsamos el liderazgo, la educación y el impacto social para transformar la influencia en oportunidades, sin distinción de género.",
        en: "“MÍA” stands for Mujer Influencia Actual. We drive leadership, education, and social impact to turn influence into opportunity — without distinction of gender.",
      },
    },
    {
      icon: Icons.wing,
      lead: { es: "El ala", en: "The wing" },
      body: {
        es: "Representa elevación, libertad y esperanza. Simboliza nuestro propósito de acompañar a las personas a elevarse, romper límites y alcanzar su máximo potencial.",
        en: "Represents elevation, freedom, and hope. It symbolizes our purpose to help people rise, break limits, and reach their full potential.",
      },
    },
    {
      icon: Icons.heart,
      lead: { es: "El color rojo", en: "The color red" },
      body: {
        es: "Pasión, acción, valentía y compromiso. Es el color de la fuerza interior que nos motiva a transformar vidas y construir un futuro más justo, solidario e inclusivo.",
        en: "Passion, action, courage, and commitment. The color of the inner strength that moves us to transform lives and build a fairer, more caring future.",
      },
    },
  ];

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
            <Kicker tone="muted">{tr({ es: "Mujer Influencia Actual", en: "Mujer Influencia Actual" })}</Kicker>
          </div>
          <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted sm:block">
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
            <div className="mt-8 flex flex-wrap gap-3">
              <DossierBtn>{tr(content.hero.donate)}</DossierBtn>
              <DossierBtn solid={false}>{tr(content.hero.ally)}</DossierBtn>
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
        <div className="mt-14 grid gap-px overflow-hidden rounded-token border border-line bg-line sm:grid-cols-4">
          {content.hero.trust.map((t, i) => (
            <div key={i} className="bg-ground px-4 py-4 text-center">
              <span className="font-mono text-[0.72rem] font-medium leading-snug text-ink">{tr(t)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EL SÍMBOLO ===== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="01" kicker={tr({ es: "Nuestra esencia", en: "Our essence" })}>
            {tr({ es: "El símbolo", en: "The symbol" })}
          </SectionHead>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {symbol.map((s, i) => (
              <Reveal key={i} delay={0.06 * i} className="flex flex-col gap-4">
                <IconBadge>{s.icon}</IconBadge>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">{tr(s.lead)}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{tr(s.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ¿POR QUÉ MÍA? ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="02" kicker={tr(content.why.chapter)}>
            {tr(content.why.title)}
          </SectionHead>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-4 text-[0.92rem] leading-relaxed text-muted">
                <p>{tr(content.why.paragraphs[0])}</p>
                <p>{tr(content.why.paragraphs[1])}</p>
              </div>
              <div className="space-y-4 text-[0.92rem] leading-relaxed text-muted sm:border-l sm:border-accent/30 sm:pl-8">
                <p>{tr(content.why.paragraphs[2])}</p>
                <blockquote className="font-display text-lg font-medium italic leading-snug text-ink">
                  <span className="text-accent">“</span>
                  {tr(content.why.quote)}
                </blockquote>
              </div>
            </div>
            <Reveal>
              <Plate src="/images/why-mia.jpg" label={content.why.imageLabel} aspect="4 / 5" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== MISIÓN / VISIÓN / VALORES ===== */}
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

      {/* ===== ¿POR QUÉ IMPORTA? ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="04" kicker={tr(content.matters.chapter)}>
            {tr(content.matters.title)}
          </SectionHead>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
            <Reveal className="lg:order-2">
              <Plate src="/images/why-matters.jpg" label={content.matters.imageLabel} aspect="1 / 1" />
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

      {/* ===== PROGRAMAS ===== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="05" kicker={tr(content.programs.lede)}>
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

      {/* ===== CAMPAÑA ===== */}
      <section id="campana" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div>
              <SectionHead index="06" kicker={tr(content.campaign.kicker)}>
                {tr(content.campaign.title)}
              </SectionHead>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <p className="text-[0.92rem] leading-relaxed text-muted">{tr(content.campaign.paragraphs[0])}</p>
                <p className="text-[0.92rem] leading-relaxed text-muted sm:border-l sm:border-accent/30 sm:pl-6">
                  {tr(content.campaign.paragraphs[1])}
                </p>
              </div>
              <p className="mt-6 font-display text-xl font-medium italic leading-snug text-ink">
                {tr(content.campaign.invite)}
              </p>
              <div className="mt-8">
                <DossierBtn>{tr(content.campaign.button)}</DossierBtn>
              </div>
            </div>
            <Reveal>
              <Plate src="/images/campaign.jpg" label={content.campaign.imageLabel} aspect="4 / 5" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== NÚMEROS ===== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="07" kicker={tr(content.numbers.chapter)} center>
            {tr({ es: "Comunidad en números", en: "Community in numbers" })}
          </SectionHead>
          <div className="mx-auto mt-10 grid max-w-4xl gap-px overflow-hidden rounded-token border border-line bg-line sm:grid-cols-2">
            {content.numbers.stats.map((s, i) => (
              <div key={i} className="bg-ground px-8 py-12 text-center">
                <div className="font-display text-6xl font-black leading-none text-accent sm:text-7xl">
                  <CountUp to={s.value} prefix={s.prefix} />
                </div>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                  {tr(s.label)}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center font-display text-lg font-medium italic leading-snug text-ink sm:text-xl">
            {tr(content.numbers.quote)}
          </p>
        </div>
      </section>

      {/* ===== HISTORIA ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="08" kicker={tr(content.timeline.chapter)}>
            {tr(content.timeline.title)}
          </SectionHead>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-token border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {content.timeline.milestones.map((m, i) => (
              <li key={i} className="bg-ground p-6">
                <span className="font-mono text-[0.66rem] tracking-[0.2em] text-accent">{`0${i + 1}`}</span>
                <div className="mt-2 font-display text-3xl font-black text-ink">{tr(m.year)}</div>
                <span className="mt-3 block h-[2px] w-8 bg-accent" />
                <p className="mt-3 text-[0.86rem] leading-relaxed text-muted">{tr(m.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== EQUIPO ===== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="09" kicker={tr(content.leadership.chapter)}>
            {tr({ es: "Fundadoras y Junta", en: "Founders & Board" })}
          </SectionHead>
          <p className="mt-6 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
            {tr(content.leadership.intro)}
          </p>
          {[
            { label: content.leadership.foundingLabel, people: foundingTeam },
            { label: content.leadership.boardLabel, people: board },
          ].map((grp, gi) => (
            <div key={gi} className="mt-10">
              <div className="mb-6 flex items-center gap-3">
                <Kicker>{tr(grp.label)}</Kicker>
                <span className="h-px flex-1 bg-line" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {grp.people.map((p, i) => {
                  const initials = p.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
                  return (
                    <div key={`${p.name}-${i}`}>
                      <div className="overflow-hidden rounded-token border border-line bg-ground" style={{ aspectRatio: "1 / 1" }}>
                        {p.photo ? (
                          <Image
                            src={p.photo}
                            alt={p.name}
                            width={320}
                            height={320}
                            className="h-full w-full object-cover"
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
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRANSPARENCIA ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div>
              <SectionHead index="10" kicker={tr(content.governance.chapter)}>
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

      {/* ===== COLABORAR ===== */}
      <section id="colaborar" className="scroll-mt-6 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHead index="11" kicker={tr(content.collaborate.lede)}>
            {tr(content.collaborate.chapter)}
          </SectionHead>
          <div className="mt-10 grid gap-px overflow-hidden rounded-token border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {content.collaborate.items.map((it, i) => (
              <div key={i} className="bg-ground p-6">
                <span className="font-mono text-[0.66rem] tracking-[0.2em] text-accent">{`0${i + 1}`}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{tr(it.title)}</h3>
                <span className="mt-3 block h-[2px] w-8 bg-accent" />
                <p className="mt-3 text-[0.86rem] leading-relaxed text-muted">{tr(it.body)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <DossierBtn>{tr(content.hero.donate)}</DossierBtn>
          </div>
        </div>
      </section>

      {/* ===== CIERRE ===== */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Kicker>{content.hero.hashtag}</Kicker>
          <blockquote className="mx-auto mt-6 max-w-3xl font-display text-3xl font-black leading-[1.06] tracking-[-0.01em] text-ink sm:text-5xl">
            {tr(content.closing.quote)}
          </blockquote>
          <span className="mx-auto mt-6 block h-[3px] w-16 bg-accent" />
          <div className="mt-9 flex justify-center">
            <DossierBtn>{tr(content.closing.button)}</DossierBtn>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-[0.9rem] leading-relaxed text-muted">
            {tr(content.closing.institutional)}
          </p>
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
            <p className="mt-2">{brand.email}</p>
            <p>Instagram · Facebook · LinkedIn</p>
            <p className="mt-2 text-[0.7rem] text-muted/70">{tr(content.footer.placeholderNote)}</p>
          </div>
          <div className="text-[0.8rem] text-muted sm:text-right">
            <p>{tr(content.footer.privacy)}</p>
            <p>{tr(content.footer.terms)}</p>
            <p className="mt-3 font-display font-semibold italic text-accent">{brand.hashtag}</p>
          </div>
        </div>
        <div className="border-t border-line py-4 text-center font-mono text-[0.64rem] uppercase tracking-[0.18em] text-muted">
          © 2026 {brand.legalName} · {tr(content.footer.rights)}
        </div>
      </footer>
    </div>
  );
}
