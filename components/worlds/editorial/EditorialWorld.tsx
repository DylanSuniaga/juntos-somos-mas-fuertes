"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { content, brand } from "@/lib/content";
import { foundingTeam, board } from "@/lib/team";
import { useLang, type Bi } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/primitives/CountUp";
import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";

/* ---- editorial atoms ---- */

function Label({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.28em]">
      <span className="text-accent-deep">{n}</span>
      <span className="h-px w-8 bg-accent-deep/40" />
      <span className="text-muted">{children}</span>
    </div>
  );
}

function EditBtn({
  href = "#colaborar",
  children,
  solid = false,
}: {
  href?: string;
  children: ReactNode;
  solid?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 border px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
        solid
          ? "border-ink bg-ink text-surface hover:bg-transparent hover:text-ink"
          : "border-ink text-ink hover:bg-ink hover:text-surface"
      }`}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[2rem] font-medium leading-[1.02] tracking-tight sm:text-4xl lg:text-5xl">
      {children}
    </h2>
  );
}

/* ---- the world ---- */

export function EditorialWorld() {
  const { tr } = useLang();

  const contents: Bi[] = [
    { es: "Editorial", en: "Editorial" },
    content.mission.chapter,
    content.programs.chapter,
    content.campaign.chapter,
    content.timeline.chapter,
    content.leadership.chapter,
  ];

  return (
    <div className="font-body text-ink">
      {/* ===== MASTHEAD ===== */}
      <header className="border-b-2 border-ink">
        <div className="mx-auto flex max-w-6xl items-end justify-between px-5 pb-4 pt-16 sm:px-8 sm:pt-8">
          <div>
            <div className="font-display text-5xl font-black leading-none tracking-tight sm:text-6xl">
              MÍA
            </div>
            <div className="mt-2 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-muted">
              Mujer Influencia Actual · Foundation
            </div>
          </div>
          <div className="hidden text-right text-[0.6rem] font-semibold uppercase leading-relaxed tracking-[0.2em] text-muted sm:block">
            {tr({ es: "La Revista", en: "The Magazine" })}
            <br />
            {tr({ es: "N.º 01 · Miami · 2026", en: "Issue 01 · Miami · 2026" })}
          </div>
        </div>
        {/* contents strip */}
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-1 px-5 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted sm:px-8">
            <span className="text-accent-deep">{tr({ es: "Índice", en: "Contents" })}</span>
            {contents.map((c, i) => (
              <span key={i}>
                {String(i + 1).padStart(2, "0")} {tr(c)}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ===== 01 · HERO / EDITORIAL ===== */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Label n="01">{content.hero.hashtag}</Label>
            <h1 className="font-display text-[3rem] font-medium leading-[0.94] tracking-tight sm:text-6xl lg:text-7xl">
              {tr(content.hero.title)}
            </h1>
            <p className="mt-7 font-display text-xl italic leading-snug text-muted sm:text-2xl">
              {tr(content.hero.subtitle)}
            </p>
            <p className="mt-6 max-w-prose text-[0.95rem] leading-relaxed text-ink/80 [column-gap:2rem] sm:columns-2 sm:text-base">
              <span className="float-left mr-3 font-display text-6xl font-semibold leading-[0.72] text-accent-deep">
                {tr(content.hero.body).charAt(0)}
              </span>
              {tr(content.hero.body).slice(1)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <EditBtn solid>{tr(content.hero.donate)}</EditBtn>
              <EditBtn>{tr(content.hero.ally)}</EditBtn>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <PlaceholderImage
                src="/images/hero.jpg"
                label={content.hero.imageLabel}
                aspect="4 / 5"
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
              />
            </Reveal>
            <p className="mt-2 border-l-2 border-accent pl-3 text-[0.72rem] italic leading-snug text-muted">
              {tr(content.hero.imageLabel)}
            </p>
          </div>
        </div>

        {/* trust strip */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-ink py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
          {content.hero.trust.map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-accent-deep">/</span>}
              {tr(t)}
            </span>
          ))}
        </div>
      </section>

      {/* ===== 02 · ¿POR QUÉ MÍA? ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Label n="02">{tr(content.why.chapter)}</Label>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <SectionTitle>{tr(content.why.title)}</SectionTitle>
              <Reveal className="mt-6">
                <PlaceholderImage src="/images/why-mia.jpg" label={content.why.imageLabel} aspect="4 / 3" />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-4 text-[0.95rem] leading-relaxed text-ink/80 sm:text-base">
                {content.why.paragraphs.map((p, i) => (
                  <p key={i}>{tr(p)}</p>
                ))}
              </div>
              <blockquote className="my-8 border-y-2 border-ink py-6 font-display text-2xl italic leading-snug sm:text-3xl">
                <span className="mr-1 text-accent">“</span>
                {tr(content.why.quote)}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 03 · MISIÓN / VISIÓN / VALORES ===== */}
      <section className="border-t border-line bg-surface-2/50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Label n="03">{tr(content.mission.chapter)}</Label>
          <p className="max-w-3xl font-display text-2xl italic leading-snug text-accent-deep sm:text-3xl">
            {tr(content.mission.motto)}
          </p>
          <div className="mt-10 grid gap-8 border-t border-ink pt-8 md:grid-cols-2 md:gap-12">
            {[
              { l: content.mission.missionLabel, b: content.mission.mission },
              { l: content.mission.visionLabel, b: content.mission.vision },
            ].map((c, i) => (
              <div key={i}>
                <h3 className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent-deep">
                  {tr(c.l)}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-ink/80 sm:text-base">
                  {tr(c.b)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-line pt-6">
            <h3 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted">
              {tr(content.mission.valuesLabel)}
            </h3>
            <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {content.mission.values.map((v, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3 border-b border-line py-2 font-display text-lg"
                >
                  <span className="text-sm text-accent-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {tr(v)}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== 04 · ¿POR QUÉ IMPORTA? ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Label n="04">{tr(content.matters.chapter)}</Label>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <SectionTitle>{tr(content.matters.title)}</SectionTitle>
              <div className="mt-6 columns-1 gap-8 space-y-4 text-[0.95rem] leading-relaxed text-ink/80 sm:columns-2 sm:text-base">
                {content.matters.paragraphs.map((p, i) => (
                  <p key={i} className="break-inside-avoid">
                    {tr(p)}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <PlaceholderImage src="/images/why-matters.jpg" label={content.matters.imageLabel} aspect="1 / 1" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 05 · PROGRAMAS ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Label n="05">{tr(content.programs.chapter)}</Label>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionTitle>{tr(content.programs.title)}</SectionTitle>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
                {tr(content.programs.lede)}
              </p>
            </div>
            <ol className="lg:col-span-8">
              {content.programs.items.map((it, i) => (
                <li
                  key={i}
                  className="grid gap-4 border-t border-ink py-7 sm:grid-cols-[auto_1fr] sm:gap-8"
                >
                  <span className="font-display text-4xl font-medium text-accent/50">
                    {tr(it.tag)}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-snug">
                      {tr(it.title)}
                    </h3>
                    <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-ink/75">
                      {tr(it.body)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== 06 · CAMPAÑA ===== */}
      <section id="campana" className="border-t border-line bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="mb-5 flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gold">
            <span>06</span>
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-surface/60">{tr(content.campaign.chapter)}</span>
          </div>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-gold">
                {tr(content.campaign.kicker)}
              </p>
              <h2 className="mt-3 font-display text-4xl font-medium leading-[1.02] sm:text-5xl">
                {tr(content.campaign.title)}
              </h2>
              <div className="mt-6 columns-1 gap-8 space-y-4 text-sm leading-relaxed text-surface/75 sm:columns-2">
                {content.campaign.paragraphs.map((p, i) => (
                  <p key={i} className="break-inside-avoid">
                    {tr(p)}
                  </p>
                ))}
              </div>
              <p className="mt-6 font-display text-xl italic text-surface">
                {tr(content.campaign.invite)}
              </p>
              <a
                href="#colaborar"
                className="mt-8 inline-flex items-center gap-2 border border-gold px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                {tr(content.campaign.button)}
                <span aria-hidden>→</span>
              </a>
            </div>
            <div className="lg:col-span-5">
              <PlaceholderImage
                src="/images/campaign.jpg"
                label={content.campaign.imageLabel}
                aspect="4 / 5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 07 · NÚMEROS ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Label n="07">{tr(content.numbers.chapter)}</Label>
          <div className="grid gap-8 border-y-2 border-ink py-10 sm:grid-cols-2">
            {content.numbers.stats.map((s, i) => (
              <div key={i} className={i === 0 ? "sm:border-r sm:border-line sm:pr-8" : "sm:pl-8"}>
                <div className="font-display text-6xl font-medium leading-none tracking-tight sm:text-7xl">
                  <CountUp to={s.value} prefix={s.prefix} />
                </div>
                <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
                  {tr(s.label)}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl font-display text-xl italic leading-snug text-accent-deep sm:text-2xl">
            {tr(content.numbers.quote)}
          </p>
        </div>
      </section>

      {/* ===== 08 · HISTORIA ===== */}
      <section className="border-t border-line bg-surface-2/50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Label n="08">{tr(content.timeline.chapter)}</Label>
          <SectionTitle>{tr(content.timeline.title)}</SectionTitle>
          <ol className="mt-8">
            {content.timeline.milestones.map((m, i) => (
              <li
                key={i}
                className="grid gap-3 border-t border-ink py-5 sm:grid-cols-[140px_1fr] sm:gap-8"
              >
                <span className="font-display text-2xl font-medium text-accent-deep">
                  {tr(m.year)}
                </span>
                <p className="max-w-prose text-[0.95rem] leading-relaxed text-ink/80 sm:text-base">
                  {tr(m.text)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== 09 · EQUIPO (masthead) ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Label n="09">{tr(content.leadership.chapter)}</Label>
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            {tr(content.leadership.intro)}
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            {[
              { label: content.leadership.foundingLabel, people: foundingTeam },
              { label: content.leadership.boardLabel, people: board },
            ].map((grp, gi) => (
              <div key={gi}>
                <h3 className="mb-4 border-b-2 border-ink pb-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent-deep">
                  {tr(grp.label)}
                </h3>
                <ul>
                  {grp.people.map((p, i) => (
                    <li
                      key={`${p.name}-${i}`}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                    >
                      <span className="font-display text-lg">{p.name}</span>
                      <span className="text-right text-[0.72rem] uppercase tracking-[0.12em] text-muted">
                        {tr(p.role)}
                        {p.country ? ` · ${tr(p.country)}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10 · TRANSPARENCIA (colophon) ===== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <Label n="10">{tr(content.governance.chapter)}</Label>
              <SectionTitle>{tr(content.governance.title)}</SectionTitle>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="border border-ink px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em]">
                  Florida Nonprofit
                </span>
                <span className="border border-accent px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-accent-deep">
                  501(c)(3) Pending
                </span>
              </div>
            </div>
            <ol className="space-y-4 self-center">
              {content.governance.items.map((it, i) => (
                <li key={i} className="flex gap-4 border-t border-line pt-4 text-[0.9rem] leading-relaxed text-ink/80">
                  <span className="font-display text-lg text-accent-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{tr(it)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== 11 · COLABORAR ===== */}
      <section id="colaborar" className="scroll-mt-6 border-t border-line bg-surface-2/50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Label n="11">{tr(content.collaborate.chapter)}</Label>
          <p className="max-w-2xl font-display text-2xl italic text-ink sm:text-3xl">
            {tr(content.collaborate.lede)}
          </p>
          <div className="mt-8 grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
            {content.collaborate.items.map((it, i) => (
              <div
                key={i}
                className="border-b border-line px-1 py-6 sm:border-r sm:last:border-r-0 sm:px-5 lg:[&:nth-child(4)]:border-r-0"
              >
                <span className="font-display text-3xl font-medium text-accent/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl">{tr(it.title)}</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                  {tr(it.body)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <EditBtn solid>{tr(content.hero.donate)}</EditBtn>
          </div>
        </div>
      </section>

      {/* ===== 12 · CIERRE ===== */}
      <section className="border-t-2 border-ink">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="font-display text-sm italic tracking-wide text-accent-deep">
            {content.hero.hashtag}
          </p>
          <blockquote className="mx-auto mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            {tr(content.closing.quote)}
          </blockquote>
          <div className="mt-10 flex justify-center">
            <EditBtn solid>{tr(content.closing.button)}</EditBtn>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-sm leading-relaxed text-muted">
            {tr(content.closing.institutional)}
          </p>
        </div>
      </section>

      {/* ===== COLOPHON / FOOTER ===== */}
      <footer className="border-t-2 border-ink">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">
          <div>
            <Image
              src="/images/logo-red.png"
              alt="MÍA — Mujer Influencia Actual Foundation"
              width={64}
              height={64}
              className="h-16 w-16 rounded-[3px] shadow-luxe"
            />
            <p className="mt-3 text-[0.8rem] text-muted">{brand.legalName}</p>
            <p className="text-[0.8rem] text-muted">{tr(brand.jurisdiction)}</p>
          </div>
          <div className="text-[0.8rem] text-muted">
            <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
              {tr(content.footer.contactLabel)}
            </p>
            <p>{brand.email}</p>
            <p>Instagram · Facebook · LinkedIn</p>
            <p className="mt-2 text-[0.7rem] text-muted/70">
              {tr(content.footer.placeholderNote)}
            </p>
          </div>
          <div className="text-[0.8rem] text-muted sm:text-right">
            <p>{tr(content.footer.privacy)}</p>
            <p>{tr(content.footer.terms)}</p>
            <p className="mt-3 font-display italic text-accent-deep">
              {brand.hashtag}
            </p>
          </div>
        </div>
        <div className="border-t border-line py-4 text-center text-[0.68rem] uppercase tracking-[0.15em] text-muted">
          © 2026 {brand.legalName} · {tr(content.footer.rights)}
        </div>
      </footer>
    </div>
  );
}
