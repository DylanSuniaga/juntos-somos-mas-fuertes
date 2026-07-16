"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { content, brand } from "@/lib/content";
import { foundingTeam, board } from "@/lib/team";
import { useLang } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/primitives/CountUp";
import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";

/* ---- organic atoms ---- */

function SoftBtn({
  href = "#colaborar",
  children,
  tone = "accent",
}: {
  href?: string;
  children: ReactNode;
  tone?: "accent" | "ghost";
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5 ${
        tone === "accent"
          ? "bg-accent text-white shadow-[0_14px_30px_-10px_var(--glow)]"
          : "border-2 border-accent/30 bg-white text-ink hover:border-accent"
      }`}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-deep">
      <span className="h-2 w-2 rounded-full bg-accent" />
      {children}
    </span>
  );
}

function Wave({ tone = "text-surface" }: { tone?: string }) {
  return (
    <svg
      viewBox="0 0 1440 110"
      preserveAspectRatio="none"
      className={`block h-[70px] w-full ${tone}`}
      aria-hidden
    >
      <path
        d="M0,64 C240,120 480,8 720,40 C960,72 1200,116 1440,68 L1440,110 L0,110 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ---- the world ---- */

export function OrganicWorld() {
  const { tr } = useLang();

  return (
    <div className="font-body text-ink">
      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden px-5 pb-4 pt-24 text-center sm:px-8 sm:pt-28"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, var(--surface-2), transparent 60%), radial-gradient(90% 70% at 100% 0%, var(--glow), transparent 55%)",
        }}
      >
        {/* soft blobs */}
        <span
          className="pointer-events-none absolute -left-16 top-24 h-64 w-64 opacity-60 blur-2xl"
          style={{ background: "var(--glow)", borderRadius: "42% 58% 63% 37% / 45% 45% 55% 55%" }}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -right-10 top-40 h-52 w-52 opacity-60 blur-2xl"
          style={{ background: "var(--accent-2)", borderRadius: "58% 42% 37% 63% / 55% 48% 52% 45%" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <Image
              src="/images/logo-red.png"
              alt="MÍA — Mujer Influencia Actual Foundation"
              width={88}
              height={88}
              priority
              className="mx-auto mb-6 h-20 w-20 rounded-3xl shadow-[0_18px_40px_-16px_var(--shadow)]"
            />
          </Reveal>
          <Reveal>
            <Eyebrow>{content.hero.hashtag}</Eyebrow>
          </Reveal>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            {tr(content.hero.title)}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {tr(content.hero.subtitle)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <SoftBtn>{tr(content.hero.donate)}</SoftBtn>
            <SoftBtn tone="ghost">{tr(content.hero.ally)}</SoftBtn>
          </div>
        </div>

        <Reveal className="relative mx-auto mt-12 max-w-4xl">
          <div className="overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-30px_var(--shadow)]">
            <PlaceholderImage
              src="/images/hero-wide.jpg"
              label={content.hero.imageLabel}
              aspect="16 / 9"
              priority
              sizes="100vw"
              className="!rounded-none !border-0 !shadow-none"
            />
          </div>
        </Reveal>

        {/* trust chips */}
        <div className="relative mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {content.hero.trust.map((t, i) => (
            <span
              key={i}
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-muted shadow-[0_10px_24px_-14px_var(--shadow)]"
            >
              {tr(t)}
            </span>
          ))}
        </div>
      </section>
      <Wave tone="text-surface" />

      {/* ===== WHY + MISSION ===== */}
      <section className="bg-surface px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-[2.5rem] shadow-[0_24px_60px_-28px_var(--shadow)]">
                <PlaceholderImage
                  src="/images/why-mia.jpg"
                  label={content.why.imageLabel}
                  aspect="4 / 5"
                  className="!rounded-none !border-0 !shadow-none"
                />
              </div>
            </Reveal>
            <div>
              <Eyebrow>{tr(content.why.chapter)}</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-bold leading-snug sm:text-4xl">
                {tr(content.why.title)}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                {content.why.paragraphs.slice(0, 2).map((p, i) => (
                  <p key={i}>{tr(p)}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-[2.5rem] bg-surface-2 p-8 text-center shadow-[0_20px_50px_-30px_var(--shadow)] sm:p-12">
            <p className="mx-auto max-w-3xl font-display text-2xl font-semibold leading-snug text-accent-deep sm:text-3xl">
              {tr(content.mission.motto)}
            </p>
            <div className="mt-8 grid gap-6 text-left md:grid-cols-2">
              {[
                { l: content.mission.missionLabel, b: content.mission.mission },
                { l: content.mission.visionLabel, b: content.mission.vision },
              ].map((c, i) => (
                <div key={i} className="rounded-3xl bg-white p-6 shadow-[0_16px_40px_-28px_var(--shadow)]">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-accent-deep">
                    {tr(c.l)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{tr(c.b)}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {content.mission.values.map((v, i) => (
                <span
                  key={i}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-[0_10px_24px_-16px_var(--shadow)]"
                >
                  {tr(v)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>{tr(content.programs.chapter)}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl font-bold leading-snug sm:text-4xl">
            {tr(content.programs.title)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            {tr(content.programs.lede)}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.programs.items.map((it, i) => (
              <Reveal
                key={i}
                delay={0.08 * i}
                className="rounded-[2rem] bg-surface p-7 text-left shadow-[0_20px_50px_-30px_var(--shadow)] transition-transform hover:-translate-y-1.5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 font-display text-xl font-bold text-accent">
                  {tr(it.tag)}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug">
                  {tr(it.title)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {tr(it.body)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CAMPAIGN ===== */}
      <Wave tone="text-surface-2" />
      <section id="campana" className="bg-surface-2 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] shadow-[0_24px_60px_-28px_var(--shadow)]">
              <PlaceholderImage
                src="/images/campaign.jpg"
                label={content.campaign.imageLabel}
                aspect="4 / 3"
                className="!rounded-none !border-0 !shadow-none"
              />
            </div>
          </Reveal>
          <div>
            <Eyebrow>{tr(content.campaign.chapter)}</Eyebrow>
            <p className="mt-4 text-sm font-bold uppercase tracking-wider text-accent-deep">
              {tr(content.campaign.kicker)}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-snug sm:text-4xl">
              {tr(content.campaign.title)}
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
              {content.campaign.paragraphs.slice(0, 2).map((p, i) => (
                <p key={i}>{tr(p)}</p>
              ))}
            </div>
            <p className="mt-5 font-display text-lg font-semibold text-ink">
              {tr(content.campaign.invite)}
            </p>
            <div className="mt-7">
              <SoftBtn>{tr(content.campaign.button)}</SoftBtn>
            </div>
          </div>
        </div>
      </section>
      <Wave tone="text-surface-2" />

      {/* ===== NUMBERS ===== */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {content.numbers.stats.map((s, i) => (
              <Reveal
                key={i}
                delay={0.08 * i}
                className="rounded-[2.5rem] bg-gradient-to-br from-surface to-surface-2 p-10 text-center shadow-[0_24px_60px_-32px_var(--shadow)]"
              >
                <div className="font-display text-6xl font-bold leading-none text-accent-deep sm:text-7xl">
                  <CountUp to={s.value} prefix={s.prefix} />
                </div>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-muted">
                  {tr(s.label)}
                </p>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl font-medium italic leading-snug text-accent-deep sm:text-2xl">
            {tr(content.numbers.quote)}
          </p>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <Eyebrow>{tr(content.timeline.chapter)}</Eyebrow>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.timeline.milestones.map((m, i) => (
              <Reveal
                key={i}
                delay={0.05 * i}
                className="flex items-start gap-4 rounded-[1.75rem] bg-surface p-6 shadow-[0_16px_44px_-30px_var(--shadow)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-bold text-accent">
                  {tr(m.year)}
                </span>
                <p className="text-sm leading-relaxed text-muted">{tr(m.text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <Wave tone="text-surface" />
      <section className="bg-surface px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>{tr(content.leadership.chapter)}</Eyebrow>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {tr(content.leadership.intro)}
          </p>
          {[
            { label: content.leadership.foundingLabel, people: foundingTeam },
            { label: content.leadership.boardLabel, people: board },
          ].map((grp, gi) => (
            <div key={gi} className="mt-10">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-accent-deep">
                {tr(grp.label)}
              </h3>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
                {grp.people.map((p, i) => {
                  const initials = p.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("");
                  return (
                    <div key={`${p.name}-${i}`} className="w-36 text-center">
                      {p.photo ? (
                        <Image
                          src={p.photo}
                          alt={p.name}
                          width={96}
                          height={96}
                          className="mx-auto h-24 w-24 rounded-full object-cover shadow-[0_16px_36px_-18px_var(--shadow)] ring-4 ring-white"
                        />
                      ) : (
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-surface-2 to-white text-2xl font-bold text-accent shadow-[0_16px_36px_-18px_var(--shadow)] ring-4 ring-white">
                          {initials}
                        </div>
                      )}
                      <h4 className="mt-3 font-display text-sm font-semibold text-ink">
                        {p.name}
                      </h4>
                      <p className="mt-0.5 text-xs font-semibold text-accent-deep">
                        {tr(p.role)}
                      </p>
                      {p.country ? (
                        <p className="text-[0.7rem] text-muted">{tr(p.country)}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Wave tone="text-surface" />

      {/* ===== GOVERNANCE ===== */}
      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-surface-2 p-8 shadow-[0_20px_50px_-32px_var(--shadow)] sm:p-12">
          <div className="text-center">
            <Eyebrow>{tr(content.governance.chapter)}</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-2xl font-bold leading-snug sm:text-3xl">
              {tr(content.governance.title)}
            </h2>
          </div>
          <ul className="mt-8 space-y-3">
            {content.governance.items.map((it, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-2xl bg-white p-5 text-sm leading-relaxed text-muted shadow-[0_12px_30px_-24px_var(--shadow)]"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[0.6rem] font-bold text-white">
                  ✓
                </span>
                {tr(it)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== COLLABORATE ===== */}
      <section id="colaborar" className="scroll-mt-6 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>{tr(content.collaborate.chapter)}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-lg font-display text-3xl font-bold leading-snug sm:text-4xl">
            {tr(content.collaborate.lede)}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.collaborate.items.map((it, i) => (
              <Reveal
                key={i}
                delay={0.06 * i}
                className={`rounded-[1.75rem] p-6 text-left shadow-[0_18px_44px_-28px_var(--shadow)] transition-transform hover:-translate-y-1.5 ${
                  i === 0 ? "bg-accent text-white" : "bg-surface"
                }`}
              >
                <h3 className={`font-display text-lg font-semibold ${i === 0 ? "text-white" : "text-ink"}`}>
                  {tr(it.title)}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? "text-white/85" : "text-muted"}`}>
                  {tr(it.body)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING ===== */}
      <Wave tone="text-accent" />
      <section className="bg-accent px-5 py-20 text-center text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-white/80">
            {content.hero.hashtag}
          </p>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">
            {tr(content.closing.quote)}
          </h2>
          <div className="mt-10 flex justify-center">
            <a
              href="#colaborar"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-accent-deep transition-transform hover:-translate-y-0.5"
            >
              {tr(content.closing.button)}
              <span aria-hidden>→</span>
            </a>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-sm leading-relaxed text-white/80">
            {tr(content.closing.institutional)}
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-surface px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <Image
            src="/images/logo-red.png"
            alt="MÍA Foundation"
            width={64}
            height={64}
            className="h-16 w-16 rounded-2xl shadow-[0_14px_30px_-16px_var(--shadow)]"
          />
          <p className="text-sm text-muted">
            {brand.legalName} · {tr(brand.jurisdiction)}
          </p>
          <p className="text-sm text-muted">
            {brand.email} · Instagram · Facebook · LinkedIn
          </p>
          <p className="text-xs text-muted/70">{tr(content.footer.placeholderNote)}</p>
          <p className="font-display text-sm font-semibold italic text-accent-deep">
            {brand.hashtag}
          </p>
          <p className="text-xs text-muted">
            © 2026 {brand.legalName} · {tr(content.footer.rights)}
          </p>
        </div>
      </footer>
    </div>
  );
}
