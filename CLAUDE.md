# MÍA Foundation — landing page

Landing page for **MÍA — Mujer Influencia Actual Foundation, Inc.** (a Florida nonprofit, 501(c)(3) pending). Audience: donors, sponsors, allies, grant/funding orgs. Bilingual **ES/EN**. Portfolio-grade volunteer work. Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 3.4 · framer-motion 11 · lenis**. Deploys to Vercel.

The content brief is `LANDING PAGE FOUNDATION.md` (Spanish) — the original spec for section copy. **Superseded in part by the foundation's corrections pass (2026-07-22)** — see "Corrections pass" below; when the two disagree, the corrections win.

## The core idea: five "worlds"

The site presents the **same content** as **five genuinely different designs** — each its own layout, structure, typography, and UI (NOT a recolor of one design). Each world is a **separate route**; a floating picker (top-right) navigates between them. This exists because the foundation wants to see distinct directions and pick one.

> Design note (2026-07-15): an earlier version reskinned the user's mother's site (`~/Desktop/NinoskaWebsite`) too closely. That repo is a **reference for stack/architecture only** — never for visual design. Do not reintroduce its signatures (centered-serif hero, ambient orbs, film grain, custom cursor).

> Brand palette (2026-07-16): the site uses the real MÍA kit — **red `#dc0708` + off-white `#f2f2f2`** as the shared thread on every world, each world leaning into one brand **secondary** (brown `#593622` · clay `#d99f7e` · gray `#bfbebd` · gray `#d9d9d9`). Source of truth: `LANDING PAGE MIA FOUNDATION/MIA Foundation marca .pdf`. **The `data-theme` keys (`gold`/`violet`/`rose`/`emerald`) are now just historical names — they no longer describe their colors** (all worlds are red-accented). Don't "fix" the names to match; renaming touches every route + component + `WorldShell` for zero visual gain.

| World | Route | `data-theme` | Fonts | Design language |
|---|---|---|---|---|
| **Signature / Dossier** *(default)* | `/` | `paper` | Playfair Display + Poppins | Refined institutional: Didone serif heads under short red rules, red icon badges, red-hairline two-column text, hero + photo plates w/ circular badge. Public-facing — **brand-manual meta was removed** (no logo-specimen tiles, no palette page). |
| **Editorial** | `/revista` | `gold` | Fraunces + Inter | Magazine: masthead, asymmetric print grid, drop caps, pull quotes, ruled dividers, contents index |
| **Poster / Manifiesto** | `/manifiesto` | `violet` | Anton + Space Grotesk | Activist: giant type, full-bleed color blocks, marquees, sticker badges, sharp corners |
| **Organic / Human** | `/organico` | `rose` | Poppins + Nunito | Soft: blob shapes, pastel gradients, whitespace, floating pill-cards, wave dividers, circular avatars |
| **Dashboard** | `/panel` | `emerald` | Space Grotesk + Inter + JetBrains Mono | App-shell: sidebar TOC, KPI tiles, progress meters, tabbed program explorer, mono accents |

## Commands

```bash
npm run dev      # dev (Turbopack) → http://localhost:3000  ·  worlds: / (Signature, default) /revista /manifiesto /organico /panel
npm run build    # production build (run before every deploy)
npm start        # serve the build
```
No test framework, no ESLint (scaffolded `--no-eslint` on purpose — see Deploy).

## Architecture

`app/layout.tsx` = the 8 world fonts (via `next/font/google`, each exposing a `--font-*` var on `<html>`; only Fraunces+Inter preload — Playfair Display drives the Dossier world), providers (`LanguageProvider` → `CinematicProvider`), and global `SmoothScroll`. It holds **no** visual chrome.

Each route: `app/<route>/page.tsx` renders `<WorldShell world="…"><XWorld/></WorldShell>`.
- **`components/shared/WorldShell.tsx`** wraps a world in `<div data-theme="…">` (SSR-static → no flash) and mounts the picker. The `data-theme` block in `app/globals.css` supplies that world's palette + fonts + `--radius` (corner feel). Semantic Tailwind utilities (`bg-ground`, `text-ink`, `text-accent`, `font-display`, `font-mono`, `rounded-token`…) read those vars, so a world's components stay palette-agnostic. **Load-bearing: keep worlds using semantic classes, not hardcoded hexes.**
- **`components/shared/WorldPicker.tsx`** — the floating control; `WORLDS`-driven `<Link>`s that navigate between routes + an ES/EN toggle. Consistent "system chrome" across all worlds (recolored via tokens).
- **`components/worlds/<world>/XWorld.tsx`** — one self-contained client component per world, holding that world's entire bespoke layout (its own header, sections, footer).

`lib/worlds.ts` = the registry (id, path, theme, labels, swatches) that drives the picker and shell.

## Content, i18n & shared bits

- **`lib/content.ts`** — every string as bilingual `{ es, en }` leaves. Resolve with `tr()` from `LanguageProvider` (`const { tr } = useLang(); tr(content.hero.title)`). Worlds never hardcode copy.
- **`lib/team.ts`** — five people defined once. `leadership` is the canonical single grid the Signature world renders (Karen · Claudia · Francilenny · Annelys · Ninoska, that order); `foundingTeam` / `board` are the split views the other four worlds still use.
- **`links` in `lib/content.ts`** — the one place CTA destinations live. See CTAs below.
- Shared primitives: `components/primitives/{Reveal, KineticText, CountUp, PlaceholderImage}.tsx`. `components/providers/{LanguageProvider, CinematicProvider}.tsx`.

## Images

Real assets are wired: brand logos (`public/images/logo-red.png`, `logo-black.png`) and photos from the Drive kit — portraits in `public/images/team/` (set via `photo` in `lib/team.ts`) plus `hero` / `hero-wide` / `why-mia` / `why-matters` / `campaign-1..3`. Source files live in `LANDING PAGE MIA FOUNDATION/`. `PlaceholderImage` still renders a labeled placeholder wherever no `src` is passed; swap/add by dropping a file in `public/images/` and passing `src`. Slot map + re-export command in `public/images/README.md`.

> **The Nigeria / "MÍA GOODHEART" photos are gone (2026-07-22)** — the foundation found them too harsh and supplied replacements. Don't reintroduce them. The campaign triptych is AI-generated *on purpose* (copyright safety on relief imagery).

## CTAs

All CTA destinations resolve from **`links` in `lib/content.ts`** — never hardcode an `href` in a world.
- `links.gala` — every "Sé parte de este legado" / "Conviértete en aliado" button. Dubraska's Gala sales landing isn't live yet, so this is a **pre-filled `mailto:`** (the foundation chose email over a PDF so they can actually talk to the donor). **Set `GALA_LANDING_URL` at the top of `lib/content.ts` when the landing ships — that one line switches all of them, and `links.galaIsLive` flips the buttons to `target="_blank"`.**
- `links.volunteer` — the foundation's Google Form. Live.
- No payment processor wired; there is no "Donar" button on the Signature world any more (the foundation collapsed it into the single gala CTA).
- The four non-default worlds still point their CTAs at their own `#colaborar` section — they keep the "¿Cómo puedes colaborar?" block the Signature world dropped.

## Corrections pass (2026-07-22)

The foundation returned an annotated `CORRECCIONES.md` (screenshots + replacement copy) plus voice notes. Applied to `lib/content.ts` + the Signature world:
- **History starts in 2012, not 2020** — 14 years of trajectory, not 6. This changed the hero trust bar, section 02, the timeline, and the `numbers` quote. If you see "2020" anywhere describing MÍA's origin, it's stale.
- Section 02 is now **Nuestra Historia**; section 07 is **Nuestra Trayectoria** (a horizontal 5-node timeline: 2012 · 2015 · 2019 · 2023–2025 · 2026).
- **Two sections were deleted** from the Signature world: "Comunidad en números" (duplicated the trust bar) and "¿Cómo puedes colaborar?". Their content keys (`content.numbers`, `content.collaborate`) are **intentionally kept** — the other four worlds still render them.
- A **Voluntariado** section was added after the closing CTA.
- `content.why.video` holds copy for a founder-story video the foundation hasn't filmed. `embedUrl` is `null` → renders an inert placeholder plate. Set it to swap in the embed.
- Contact is confirmed: `info@mujerinfluenciaactualfoundation.org`, Instagram + LinkedIn linked. **Facebook is deliberately plain text, not a link** — the foundation has no page yet. `brand.phone` is `null` pending Karen's answer; set it to a string and the footer row appears.

## Deploy (Vercel) + gotchas

- `npm run build` locally first, then deploy. No ESLint on purpose → no `eslint-config-next` → no `unrs-resolver` → dodges the `npm error Invalid Version` Vercel lockfile crash (the `vercel-npm-invalid-version` gotcha).
- **Never run `next build` while `next dev` is running** on this project — the build overwrites `.next` and the dev server dies with `Error: Manifest file is empty`. Fix: stop dev, `rm -rf .next`, restart.
- A **full-page screenshot shows below-the-fold sections blank** — expected. `whileInView` (Reveal) keeps them at `opacity:0` until scrolled into view; a no-scroll capture never triggers them. Scroll to verify.
