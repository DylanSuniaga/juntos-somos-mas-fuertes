"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { content, brand } from "@/lib/content";
import { foundingTeam, board } from "@/lib/team";
import { useLang, type Bi } from "@/components/providers/LanguageProvider";
import { CountUp } from "@/components/primitives/CountUp";

/* ---- dashboard atoms ---- */

function Tile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-token border border-line bg-surface p-5 ${className}`}>
      {children}
    </div>
  );
}

function SectionCode({ code, label }: { code: string; label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
      <span className="text-accent">// {code}</span>
      <span className="h-px flex-1 bg-line" />
      <span>{label}</span>
    </div>
  );
}

function Meter({
  value,
  label,
  tone = "accent",
}: {
  value: number;
  label: string;
  tone?: "accent" | "gold" | "accent-2";
}) {
  const bar =
    tone === "gold" ? "bg-gold" : tone === "accent-2" ? "bg-accent-2" : "bg-accent";
  return (
    <div>
      <div className="flex justify-between font-mono text-[0.7rem] text-muted">
        <span>{label}</span>
        <span className="text-ink">{value}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

/* ---- the world ---- */

export function DashboardWorld() {
  const { tr } = useLang();
  const [tab, setTab] = useState(0);

  const nav: { code: string; label: Bi; href: string }[] = [
    { code: "01", label: { es: "Resumen", en: "Overview" }, href: "#d-resumen" },
    { code: "02", label: content.mission.chapter, href: "#d-mision" },
    { code: "03", label: content.programs.chapter, href: "#d-programas" },
    { code: "04", label: content.campaign.chapter, href: "#d-campana" },
    { code: "05", label: content.timeline.chapter, href: "#d-historia" },
    { code: "06", label: content.leadership.chapter, href: "#d-equipo" },
    { code: "07", label: content.governance.chapter, href: "#d-transparencia" },
    { code: "08", label: content.collaborate.chapter, href: "#colaborar" },
  ];

  return (
    <div className="font-body text-ink lg:grid lg:grid-cols-[248px_1fr]">
      {/* ===== SIDEBAR ===== */}
      <aside className="sticky top-0 z-30 hidden h-screen flex-col border-r border-line bg-surface/70 px-5 py-6 backdrop-blur lg:flex">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-red.png"
            alt="MÍA Foundation"
            width={40}
            height={40}
            className="h-10 w-10 rounded-token"
          />
          <div>
            <div className="font-display text-2xl font-bold leading-none tracking-tight">MÍA</div>
            <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-wider text-muted">
              {tr({ es: "Panel de impacto", en: "Impact panel" })}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-wider text-accent">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          {tr({ es: "Registrada · Florida", en: "Registered · Florida" })}
        </div>
        <nav className="mt-8 flex-1">
          <ul className="space-y-0.5">
            {nav.map((n) => (
              <li key={n.code}>
                <a
                  href={n.href}
                  className="flex items-center gap-3 rounded-token px-3 py-2 font-mono text-[0.78rem] text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <span className="text-accent">{n.code}</span>
                  {tr(n.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/70">
          © 2026 · v01
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="min-w-0">
        {/* topbar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-ground/85 px-5 py-3 backdrop-blur sm:px-8">
          <div className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-wider">
            <span className="lg:hidden">MÍA ·</span>
            <span className="text-accent">●</span>
            {tr({ es: "Impacto en vivo", en: "Live impact" })}
          </div>
          <div className="hidden font-mono text-[0.68rem] text-muted sm:block">
            Miami · 2026
          </div>
        </div>

        {/* 01 RESUMEN / HERO */}
        <section id="d-resumen" className="scroll-mt-16 px-5 py-10 sm:px-8">
          <SectionCode code="01" label={tr({ es: "Resumen", en: "Overview" })} />
          <p className="font-mono text-[0.72rem] uppercase tracking-wider text-accent">
            {content.hero.hashtag}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            {tr(content.hero.title)}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {tr(content.hero.subtitle)}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Tile>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                {tr({ es: "Comunidad", en: "Community" })}
              </div>
              <div className="mt-2 font-display text-4xl font-bold text-accent-deep">
                <CountUp to={5000} prefix="+" />
              </div>
            </Tile>
            <Tile>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                {tr({ es: "Países", en: "Countries" })}
              </div>
              <div className="mt-2 font-display text-4xl font-bold text-accent-deep">
                <CountUp to={24} />
              </div>
            </Tile>
            <Tile>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                {tr({ es: "Operando desde", en: "Operating since" })}
              </div>
              <div className="mt-2 font-display text-4xl font-bold text-accent-deep">
                2020
              </div>
            </Tile>
            <Tile>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                501(c)(3)
              </div>
              <div className="mt-2 font-mono text-sm font-bold uppercase text-accent">
                {tr({ es: "En proceso", en: "Pending" })}
              </div>
              <div className="mt-3">
                <Meter value={65} label={tr({ es: "Solicitud", en: "Application" })} />
              </div>
            </Tile>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#colaborar"
              className="inline-flex items-center gap-2 rounded-token bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              {tr(content.hero.donate)} <span aria-hidden>→</span>
            </a>
            <a
              href="#colaborar"
              className="inline-flex items-center gap-2 rounded-token border border-line bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:border-accent"
            >
              {tr(content.hero.ally)}
            </a>
          </div>
        </section>

        {/* 02 MISION */}
        <section id="d-mision" className="scroll-mt-16 border-t border-line px-5 py-10 sm:px-8">
          <SectionCode code="02" label={tr(content.mission.chapter)} />
          <p className="max-w-2xl font-display text-2xl font-semibold text-accent-deep">
            {tr(content.mission.motto)}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { l: content.mission.missionLabel, b: content.mission.mission },
              { l: content.mission.visionLabel, b: content.mission.vision },
            ].map((c, i) => (
              <Tile key={i}>
                <div className="font-mono text-[0.62rem] uppercase tracking-wider text-accent">
                  {tr(c.l)}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tr(c.b)}</p>
              </Tile>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {content.mission.values.map((v, i) => (
              <span
                key={i}
                className="rounded-token border border-line bg-surface px-3 py-1.5 font-mono text-[0.72rem] text-ink"
              >
                {tr(v)}
              </span>
            ))}
          </div>
        </section>

        {/* 03 PROGRAMAS — tabbed */}
        <section id="d-programas" className="scroll-mt-16 border-t border-line px-5 py-10 sm:px-8">
          <SectionCode code="03" label={tr(content.programs.chapter)} />
          <div className="flex flex-wrap gap-2">
            {content.programs.items.map((it, i) => (
              <button
                key={i}
                onClick={() => setTab(i)}
                className={`rounded-token px-4 py-2 font-mono text-[0.76rem] transition-colors ${
                  tab === i
                    ? "bg-accent text-white"
                    : "border border-line bg-surface text-muted hover:text-ink"
                }`}
              >
                {tr(it.tag)} · {tr(it.title)}
              </button>
            ))}
          </div>
          <Tile className="mt-4">
            <h3 className="font-display text-2xl font-bold">
              {tr(content.programs.items[tab].title)}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {tr(content.programs.items[tab].body)}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Meter value={[82, 74, 68][tab]} label={tr({ es: "Alcance", en: "Reach" })} />
              <Meter value={[70, 88, 60][tab]} label={tr({ es: "Actividad", en: "Activity" })} tone="gold" />
              <Meter value={[64, 71, 90][tab]} label={tr({ es: "Impacto", en: "Impact" })} tone="accent-2" />
            </div>
          </Tile>
        </section>

        {/* 04 CAMPANA */}
        <section id="d-campana" className="scroll-mt-16 border-t border-line px-5 py-10 sm:px-8">
          <SectionCode code="04" label={tr(content.campaign.chapter)} />
          <div className="rounded-token border border-accent/40 bg-accent/5 p-6 sm:p-8">
            <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-wider text-accent">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              {tr({ es: "Campaña activa", en: "Active campaign" })}
            </div>
            <h3 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
              {tr(content.campaign.title)}
            </h3>
            <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-wider text-accent-deep">
              {tr(content.campaign.kicker)}
            </p>
            <div className="mt-4 grid gap-4 text-sm leading-relaxed text-muted lg:grid-cols-2">
              {content.campaign.paragraphs.slice(0, 2).map((p, i) => (
                <p key={i}>{tr(p)}</p>
              ))}
            </div>
            <a
              href="#colaborar"
              className="mt-6 inline-flex items-center gap-2 rounded-token bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              {tr(content.campaign.button)} <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* 05 HISTORIA — progress track */}
        <section id="d-historia" className="scroll-mt-16 border-t border-line px-5 py-10 sm:px-8">
          <SectionCode code="05" label={tr(content.timeline.chapter)} />
          <div className="grid gap-4 sm:grid-cols-4">
            {content.timeline.milestones.map((m, i) => (
              <Tile key={i}>
                <div className="font-mono text-[0.7rem] text-accent">{`0${i + 1}`}</div>
                <div className="mt-1 font-display text-xl font-bold text-accent-deep">
                  {tr(m.year)}
                </div>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">
                  {tr(m.text)}
                </p>
                <div className="mt-3 h-1 rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${((i + 1) / content.timeline.milestones.length) * 100}%` }}
                  />
                </div>
              </Tile>
            ))}
          </div>
          <p className="mt-6 font-mono text-sm text-muted">{tr(content.numbers.quote)}</p>
        </section>

        {/* 06 EQUIPO — roster */}
        <section id="d-equipo" className="scroll-mt-16 border-t border-line px-5 py-10 sm:px-8">
          <SectionCode code="06" label={tr(content.leadership.chapter)} />
          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-muted">
            {tr(content.leadership.intro)}
          </p>
          <div className="overflow-hidden rounded-token border border-line">
            {[...foundingTeam.map((p) => ({ p, g: content.leadership.foundingLabel })),
              ...board.map((p) => ({ p, g: content.leadership.boardLabel }))].map(
              ({ p, g }, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line bg-surface px-5 py-3 last:border-b-0 sm:grid-cols-[1.4fr_1fr_auto]"
                >
                  <span className="font-display font-semibold">{p.name}</span>
                  <span className="hidden font-mono text-[0.72rem] uppercase tracking-wider text-accent sm:block">
                    {tr(g)}
                  </span>
                  <span className="text-right font-mono text-[0.72rem] text-muted">
                    {tr(p.role)}
                    {p.country ? ` · ${tr(p.country)}` : ""}
                  </span>
                </div>
              ),
            )}
          </div>
        </section>

        {/* 07 TRANSPARENCIA — compliance */}
        <section id="d-transparencia" className="scroll-mt-16 border-t border-line px-5 py-10 sm:px-8">
          <SectionCode code="07" label={tr(content.governance.chapter)} />
          <div className="grid gap-4 lg:grid-cols-3">
            {content.governance.items.map((it, i) => (
              <Tile key={i}>
                <div className="flex items-center justify-between font-mono text-[0.64rem] uppercase tracking-wider">
                  <span className="text-muted">{`ITEM-0${i + 1}`}</span>
                  <span className="text-accent">
                    {i === 1 ? tr({ es: "PENDIENTE", en: "PENDING" }) : "OK ✓"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{tr(it)}</p>
              </Tile>
            ))}
          </div>
        </section>

        {/* 08 COLABORAR */}
        <section id="colaborar" className="scroll-mt-16 border-t border-line px-5 py-10 sm:px-8">
          <SectionCode code="08" label={tr(content.collaborate.chapter)} />
          <p className="mb-5 max-w-2xl font-display text-2xl font-bold">
            {tr(content.collaborate.lede)}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.collaborate.items.map((it, i) => (
              <Tile
                key={i}
                className={`transition-colors hover:border-accent ${
                  i === 0 ? "border-accent bg-accent/5" : ""
                }`}
              >
                <div className="font-mono text-[0.7rem] text-accent">{`0${i + 1}`}</div>
                <h3 className="mt-2 font-display text-lg font-bold">{tr(it.title)}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">
                  {tr(it.body)}
                </p>
              </Tile>
            ))}
          </div>

          {/* closing */}
          <div className="mt-8 rounded-token border border-line bg-ink p-8 text-center text-surface sm:p-12">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-accent-soft">
              {content.hero.hashtag}
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-bold leading-snug sm:text-3xl">
              {tr(content.closing.quote)}
            </h2>
            <a
              href="#colaborar"
              className="mt-8 inline-flex items-center gap-2 rounded-token bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-soft"
            >
              {tr(content.closing.button)} <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* footer status bar */}
        <footer className="border-t border-line px-5 py-6 sm:px-8">
          <div className="flex flex-col justify-between gap-2 font-mono text-[0.7rem] text-muted sm:flex-row">
            <span>
              {brand.legalName} · {tr(brand.jurisdiction)}
            </span>
            <span>{brand.email} · Instagram · Facebook · LinkedIn</span>
            <span>© 2026 · {tr(content.footer.rights)}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
