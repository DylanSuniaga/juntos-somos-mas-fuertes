"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { content, brand } from "@/lib/content";
import { foundingTeam, board } from "@/lib/team";
import { useLang } from "@/components/providers/LanguageProvider";
import { CountUp } from "@/components/primitives/CountUp";

/* ---- poster atoms ---- */

function Marquee({
  items,
  className = "",
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const row = (
    <div
      className="flex shrink-0 items-center gap-6 pr-6"
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-6 whitespace-nowrap">
          {t}
          <span aria-hidden>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`flex w-full overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}

function Sticker({
  children,
  rotate = "-3deg",
  tone = "gold",
  className = "",
}: {
  children: ReactNode;
  rotate?: string;
  tone?: "gold" | "pink" | "ink";
  className?: string;
}) {
  const bg =
    tone === "pink"
      ? "bg-accent-2 text-ink"
      : tone === "ink"
        ? "bg-ink text-surface"
        : "bg-gold text-ink";
  return (
    <span
      className={`inline-block ${bg} px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  );
}

function PosterBtn({
  href = "#colaborar",
  children,
  tone = "pink",
}: {
  href?: string;
  children: ReactNode;
  tone?: "pink" | "gold" | "ink" | "surface";
}) {
  const bg =
    tone === "pink"
      ? "bg-accent-2 text-ink"
      : tone === "gold"
        ? "bg-gold text-ink"
        : tone === "surface"
          ? "bg-surface text-ink"
          : "bg-ink text-surface";
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 ${bg} px-7 py-4 text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-1 hover:translate-x-1`}
    >
      {children}
      <span aria-hidden>▸</span>
    </a>
  );
}

/* ---- the world ---- */

export function PosterWorld() {
  const { tr } = useLang();
  const trust = content.hero.trust.map((t) =>
    `${tr(t.value)} · ${tr(t.label)}`.toUpperCase(),
  );

  return (
    <div className="font-body uppercase-none text-ink">
      {/* top marquee */}
      <div className="border-b-2 border-ink bg-accent-2 py-2 text-sm font-bold uppercase tracking-wider text-ink">
        <Marquee
          items={Array(4).fill(content.hero.hashtag)}
        />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-accent px-5 pb-16 pt-20 text-surface sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sticker tone="gold" rotate="-4deg">
                {tr({ es: "Fundación · Desde 2020", en: "Foundation · Since 2020" })}
              </Sticker>
              <Sticker tone="pink" rotate="3deg">
                {tr({ es: "24 países", en: "24 countries" })}
              </Sticker>
            </div>
            <Image
              src="/images/logo-black.png"
              alt="MÍA Foundation"
              width={72}
              height={72}
              priority
              className="hidden h-16 w-16 border-2 border-surface sm:block"
            />
          </div>
          <h1 className="mt-6 font-display text-[3.4rem] font-normal uppercase leading-[0.86] tracking-tight sm:text-[6rem] lg:text-[8.5rem]">
            {tr({ es: "La influencia", en: "The influence" })}
            <br />
            {tr({ es: "que transforma", en: "that transforms" })}
            <br />
            <span className="text-gold">{tr({ es: "vidas.", en: "lives." })}</span>
          </h1>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <p className="max-w-xl text-lg font-medium leading-snug text-surface/90 sm:text-xl">
              {tr(content.hero.subtitle)}
            </p>
            <div className="flex flex-wrap gap-3">
              <PosterBtn tone="gold">{tr(content.hero.donate)}</PosterBtn>
              <PosterBtn tone="surface">{tr(content.hero.ally)}</PosterBtn>
            </div>
          </div>
        </div>
      </section>

      {/* trust marquee */}
      <div className="border-y-2 border-ink bg-ink py-3 text-lg font-bold uppercase tracking-wide text-gold">
        <Marquee items={trust} />
      </div>

      {/* ===== MISSION / MANIFESTO ===== */}
      <section className="bg-ground px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Sticker tone="ink" rotate="-2deg">
            {tr(content.mission.chapter)}
          </Sticker>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-normal uppercase leading-[0.92] sm:text-6xl lg:text-7xl">
            {tr(content.mission.motto)}
          </h2>
          <div className="mt-10 grid gap-8 border-t-2 border-ink pt-8 md:grid-cols-2">
            {[
              { l: content.mission.missionLabel, b: content.mission.mission },
              { l: content.mission.visionLabel, b: content.mission.vision },
            ].map((c, i) => (
              <div key={i}>
                <h3 className="mb-3 font-display text-2xl uppercase text-accent">
                  {tr(c.l)}
                </h3>
                <p className="text-base font-medium leading-relaxed text-ink/80">
                  {tr(c.b)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {content.mission.values.map((v, i) => (
              <Sticker key={i} tone={i % 2 ? "pink" : "gold"} rotate={`${(i % 2 ? 1 : -1) * 2}deg`}>
                {tr(v)}
              </Sticker>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS — big blocks ===== */}
      <section className="bg-ground px-5 pb-4 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Sticker tone="ink">{tr(content.programs.chapter)}</Sticker>
        </div>
        <div className="mx-auto mt-6 max-w-6xl">
          {content.programs.items.map((it, i) => {
            const tones = ["bg-accent text-surface", "bg-gold text-ink", "bg-accent-2 text-ink"];
            return (
              <div
                key={i}
                className={`${tones[i % 3]} mb-4 grid gap-4 border-2 border-ink p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 sm:p-10`}
              >
                <span className="font-display text-6xl uppercase leading-none sm:text-8xl">
                  {tr(it.tag)}
                </span>
                <div>
                  <h3 className="font-display text-3xl uppercase leading-none sm:text-4xl">
                    {tr(it.title)}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed sm:text-base">
                    {tr(it.body)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== NUMBERS — giant ===== */}
      <section className="bg-ink px-5 py-16 text-surface sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2">
          {content.numbers.stats.map((s, i) => (
            <div key={i} className="border-2 border-surface/30 p-8 text-center">
              <div className="font-display text-[5rem] uppercase leading-none text-gold sm:text-[8rem]">
                <CountUp to={s.value} prefix={s.prefix} />
              </div>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-surface/70">
                {tr(s.label)}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center font-display text-2xl uppercase leading-tight text-surface sm:text-3xl">
          {tr(content.numbers.quote)}
        </p>
      </section>

      {/* ===== CAMPAIGN ===== */}
      <section id="campana" className="bg-accent-2 px-5 py-16 text-ink sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Sticker tone="ink" rotate="-3deg">
            {tr(content.campaign.chapter)}
          </Sticker>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-normal uppercase leading-[0.9] sm:text-6xl">
            {tr(content.campaign.title)}
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {content.campaign.paragraphs.map((p, i) => (
              <p key={i} className="text-sm font-medium leading-relaxed sm:text-base">
                {tr(p)}
              </p>
            ))}
          </div>
          <p className="mt-8 font-display text-2xl uppercase leading-tight sm:text-3xl">
            {tr(content.campaign.invite)}
          </p>
          <div className="mt-8">
            <PosterBtn tone="ink">{tr(content.campaign.button)}</PosterBtn>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="bg-ground px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Sticker tone="gold">{tr(content.timeline.chapter)}</Sticker>
          <div className="mt-8 grid gap-0 sm:grid-cols-4">
            {content.timeline.milestones.map((m, i) => (
              <div
                key={i}
                className="border-2 border-ink p-5 sm:-ml-[2px] sm:first:ml-0"
              >
                <div className="font-display text-3xl uppercase text-accent sm:text-4xl">
                  {tr(m.year)}
                </div>
                <p className="mt-3 text-sm font-medium leading-snug text-ink/80">
                  {tr(m.text)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section className="bg-accent px-5 py-16 text-surface sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Sticker tone="gold">{tr(content.leadership.chapter)}</Sticker>
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-surface/85">
            {tr(content.leadership.intro)}
          </p>
          {[
            { label: content.leadership.foundingLabel, people: foundingTeam },
            { label: content.leadership.boardLabel, people: board },
          ].map((grp, gi) => (
            <div key={gi} className="mt-8">
              <h3 className="mb-3 font-display text-xl uppercase text-gold">
                {tr(grp.label)}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {grp.people.map((p, i) => (
                  <div key={`${p.name}-${i}`} className="border-2 border-surface/40 p-4">
                    <div className="font-display text-lg uppercase leading-tight">
                      {p.name}
                    </div>
                    <div className="mt-1 text-[0.72rem] font-bold uppercase tracking-wide text-gold">
                      {tr(p.role)}
                      {p.country ? ` · ${tr(p.country)}` : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GOVERNANCE ===== */}
      <section className="bg-ground px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3">
            <Sticker tone="ink">{tr(content.governance.chapter)}</Sticker>
            <Sticker tone="gold" rotate="2deg">Florida Nonprofit</Sticker>
            <Sticker tone="pink" rotate="-2deg">501(c)(3) Pending</Sticker>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {content.governance.items.map((it, i) => (
              <li key={i} className="border-2 border-ink p-5 text-sm font-medium leading-relaxed">
                {tr(it)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== COLLABORATE ===== */}
      <section id="colaborar" className="scroll-mt-6 bg-ground px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Sticker tone="ink">{tr(content.collaborate.chapter)}</Sticker>
          <h2 className="mt-5 max-w-3xl font-display text-3xl uppercase leading-[0.95] sm:text-5xl">
            {tr(content.collaborate.lede)}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.collaborate.items.map((it, i) => (
              <div key={i} className="flex flex-col border-2 border-ink bg-surface p-5">
                <span className="font-display text-4xl uppercase text-accent/40">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display text-xl uppercase">{tr(it.title)}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink/75">
                  {tr(it.body)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING ===== */}
      <section className="bg-accent px-5 py-20 text-surface sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-display text-lg uppercase tracking-widest text-gold">
            {content.hero.hashtag}
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-normal uppercase leading-[0.9] sm:text-7xl">
            {tr(content.closing.quote)}
          </h2>
          <div className="mt-10 flex justify-center">
            <PosterBtn tone="gold">{tr(content.closing.button)}</PosterBtn>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-sm font-medium leading-relaxed text-surface/80">
            {tr(content.closing.institutional)}
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-ink px-5 py-12 text-surface sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row">
          <div>
            <Image
              src="/images/logo-red.png"
              alt="MÍA Foundation"
              width={72}
              height={72}
              className="h-16 w-16"
            />
            <p className="mt-3 text-sm text-surface/70">{brand.legalName}</p>
            <p className="text-sm text-surface/70">{tr(brand.jurisdiction)}</p>
          </div>
          <div className="text-sm text-surface/70">
            <p className="font-bold uppercase tracking-wider text-gold">
              {tr(content.footer.contactLabel)}
            </p>
            <p className="mt-2">{brand.email}</p>
            <p>Instagram · Facebook · LinkedIn</p>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-xs uppercase tracking-widest text-surface/50">
          © 2026 {brand.legalName} · {tr(content.footer.rights)}
        </p>
      </footer>
    </div>
  );
}
