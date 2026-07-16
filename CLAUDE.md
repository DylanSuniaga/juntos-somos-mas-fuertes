# MÍA Foundation — landing page

Landing page for **MÍA — Mujer Influencia Actual Foundation, Inc.** (a Florida nonprofit, 501(c)(3) pending). Audience: donors, sponsors, allies, grant/funding orgs. Bilingual **ES/EN**. Portfolio-grade volunteer work. Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 3.4 · framer-motion 11 · lenis**. Deploys to Vercel.

The content brief is `LANDING PAGE FOUNDATION.md` (Spanish) — the source spec for section copy.

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
- **`lib/team.ts`** — founders + board (names/roles/countries from the brief).
- Shared primitives: `components/primitives/{Reveal, KineticText, CountUp, PlaceholderImage}.tsx`. `components/providers/{LanguageProvider, CinematicProvider}.tsx`.

## Images

Real assets are wired (2026-07-16): brand logos (`public/images/logo-red.png`, `logo-black.png`) and photos from the Drive kit — board portraits in `public/images/team/` (set via `photo` in `lib/team.ts`) plus `hero` / `hero-wide` / `why-mia` / `why-matters` / `campaign` / `closing`. Source files live in `LANDING PAGE MIA FOUNDATION/`. `PlaceholderImage` still renders a labeled placeholder wherever no `src` is passed; swap/add by dropping a file in `public/images/` and passing `src`. Slot map in `public/images/README.md`. **Open items:** Claudia Lozano has no portrait (initials fallback); the relief photos are Nigeria / "MÍA GOODHEART" while the campaign copy references the Venezuela earthquake — a content mismatch to resolve with the foundation.

## CTAs

Donate/Ally buttons are **smart placeholders** → `#colaborar` (in-world anchor). Change the `href` on the CTA calls in each `XWorld.tsx` when a real donation URL exists. No payment processor wired.

## Deploy (Vercel) + gotchas

- `npm run build` locally first, then deploy. No ESLint on purpose → no `eslint-config-next` → no `unrs-resolver` → dodges the `npm error Invalid Version` Vercel lockfile crash (the `vercel-npm-invalid-version` gotcha).
- **Never run `next build` while `next dev` is running** on this project — the build overwrites `.next` and the dev server dies with `Error: Manifest file is empty`. Fix: stop dev, `rm -rf .next`, restart.
- A **full-page screenshot shows below-the-fold sections blank** — expected. `whileInView` (Reveal) keeps them at `opacity:0` until scrolled into view; a no-scroll capture never triggers them. Scroll to verify.
