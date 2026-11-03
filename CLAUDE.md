# MÍA Foundation — landing page

Landing page for **MÍA — Mujer Influencia Actual Foundation, Inc.** (a Florida nonprofit, 501(c)(3) pending). Audience: donors, sponsors, allies, grant/funding orgs. Bilingual **ES/EN**. Portfolio-grade volunteer work. Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 3.4 · framer-motion 11 · lenis**. Deploys to Vercel.

One page, one design. Content spec: `LANDING PAGE FOUNDATION.md` (Spanish) — the original brief, **superseded in part by the corrections pass** below; when the two disagree, the corrections win.

## Commands

```bash
npm run dev      # dev (Turbopack) → http://localhost:3000
npm run build    # production build (run before every deploy)
npm start        # serve the build
```
No test framework, no ESLint (scaffolded `--no-eslint` on purpose — see Deploy).

## Architecture

```
app/layout.tsx     fonts + providers + ES/EN toggle  →  app/page.tsx  →  DossierWorld
                          ↕                                                   ↕
                   app/globals.css (:root tokens)  ←──  semantic Tailwind classes
```

- **`app/layout.tsx`** — the 3 fonts (Playfair Display · Poppins · JetBrains Mono, each exposing a `--font-*` var on `<html>`), providers (`LanguageProvider` → `CinematicProvider`), global `SmoothScroll`, and the floating `LanguageToggle`.
- **`app/globals.css`** — the design tokens on `:root` (palette, `--radius`, `--font-*`). Semantic Tailwind utilities (`bg-ground`, `text-ink`, `text-accent`, `font-display`, `font-mono`, `rounded-token`…) read them. **Load-bearing: keep components on semantic classes, never hardcoded hexes** — recoloring the site should mean editing `:root` only.
- **`components/worlds/dossier/DossierWorld.tsx`** — one self-contained client component holding the entire page: masthead, sections 01–09, closing CTA, volunteer block, footer. Section order and the 01–09 numbering are what the foundation reviews against; don't renumber casually.
- **`components/shared/LanguageToggle.tsx`** — the only persistent chrome (top-right ES/EN).
- Primitives: `components/primitives/{Reveal, PlaceholderImage}.tsx`. Providers: `components/providers/{LanguageProvider, CinematicProvider}.tsx`.

> Brand palette: the real MÍA kit — **red `#dc0708` + off-white `#f2f2f2`**, brown `#593622` secondary. Source of truth: `LANDING PAGE MIA FOUNDATION/MIA Foundation marca .pdf`.

> Design note (2026-07-15): an earlier version reskinned the user's mother's site (`~/Desktop/NinoskaWebsite`) too closely. That repo is a **reference for stack/architecture only** — never for visual design. Do not reintroduce its signatures (centered-serif hero, ambient orbs, film grain, custom cursor).

## Content & i18n

- **`lib/content.ts`** — every string as bilingual `{ es, en }` leaves. Resolve with `tr()` from `LanguageProvider` (`const { tr } = useLang(); tr(content.hero.title)`). **Components never hardcode copy.** Also exports `links` (CTA destinations) and `brand`.
- **`lib/team.ts`** — the three people, in the display order the foundation specified (Karen · Claudia · Ninoska). Two former members were removed at the foundation's request (2026-09-22, and Francilenny Gonzalez 2026-11-03 — no longer part of the team since 2026-09-17) — don’t re-add either from the Drive kit or git history.

## Images

Real assets are wired: brand logos (`public/images/logo-red.png`, `logo-black.png`) and photos from the Drive kit — portraits in `public/images/team/` (set via `photo` in `lib/team.ts`) plus `hero` / `why-mia` / `why-matters` / `campaign-1..3`. Sources live in `LANDING PAGE MIA FOUNDATION/`. `PlaceholderImage` renders a labeled placeholder wherever no `src` is passed; swap/add by dropping a file in `public/images/` and passing `src`. Slot map + re-export command in `public/images/README.md`.

> **The Nigeria / "MÍA GOODHEART" photos are gone (2026-07-22)** — the foundation found them too harsh and supplied replacements. Don't reintroduce them. The campaign triptych is AI-generated *on purpose* (copyright safety on relief imagery).

## CTAs

All CTA destinations resolve from **`links` in `lib/content.ts`** — never hardcode an `href`.
- `links.gala` — every "Sé parte de este legado" / "Conviértete en aliado" button. Dubraska's Gala sales landing isn't live yet, so these now **scroll to the on-page `#contacto` form** (2026-07-27), which captures the lead via Resend (was a pre-filled `mailto:` before the form existed). **Set `GALA_LANDING_URL` at the top of `lib/content.ts` when the landing ships — that one line switches all of them, and `links.galaIsLive` flips the buttons to `target="_blank"`.**
- `links.volunteer` — the foundation's Google Form. Live.
- No payment processor wired, and no "Donar" button — the foundation collapsed donation into the single gala CTA on purpose.

## Contact form (2026-07-27)

`#contacto` section (before the footer) → `components/shared/ContactForm.tsx` → `POST app/api/contact/route.ts` → **Resend**. Low volume, free tier.
- Env vars (documented in `.env.example`): `RESEND_API_KEY` (required), `CONTACT_FROM` (verified-domain sender; falls back to `onboarding@resend.dev` which only delivers to the Resend account's own email), `CONTACT_TO` (defaults to `miainfluencias@gmail.com` — Karen's Gmail, set 2026-11-03 after the previous inbox's owner left; the domain has no mailbox yet).
- **Sending from the foundation domain requires DNS verification in Resend.** Until `RESEND_API_KEY` is set the route returns 503 and the form degrades to "email us directly at {brand.email}" — never a dead end. Honeypot field `company_website` drops bots.
- The gala CTAs still use `links.gala` (mailto). **Flip them to `#contacto` only once Resend is confirmed working** — don't route the primary conversion path at a form that can't send yet.

## Deliberate divergences (don't "fix" these back)

- **Facebook is plain text in the footer, not a link** — the foundation has no page yet. Give it an href only when `brand.socials.facebook` gets a URL.
- **`brand.phone` is `null`** — pending Karen's answer on which number to publish. Set it to a string and the footer row renders itself.
- **`content.why.video.embedUrl` is `null`** — the founder-story video isn't filmed. **The whole section-02 video block (title, body, play button) is now hidden while this is null** (2026-07-27) — the play button read as a broken CTA. Set the URL and the block reappears; nothing was deleted.
- **The component/folder is still named `dossier`** while the design is called "Signature" publicly. Renaming buys nothing.

## Corrections pass (2026-07-22)

The foundation returned an annotated `CORRECCIONES.md` (screenshots + replacement copy) plus voice notes. Applied to `lib/content.ts` + the page:
- **History starts in 2012, not 2020** — 14 years of trajectory, not 6. This propagated past the marked spots: hero trust bar, section 02, and the timeline all said 2020. **If you see "2020" anywhere describing MÍA's origin, it's stale.**
- Section 02 is **Nuestra Historia**; section 07 is **Nuestra Trayectoria** (horizontal 5-node timeline: 2012 · 2015 · 2019 · 2023–2025 · 2026).
- Deleted: "Comunidad en números" (duplicated the trust bar) and "¿Cómo puedes colaborar?".
- Added: the **Voluntariado** section after the closing CTA.
- Contact confirmed: `info@mujerinfluenciaactualfoundation.org`, Instagram + LinkedIn linked.

## Design selection (2026-07-22)

The site was built as **five parallel designs** on separate routes (`/revista` `/manifiesto` `/organico` `/panel` + this one) so the foundation could compare directions. **They chose the Signature design; the other four were deleted** along with `lib/worlds.ts`, `WorldShell`, `WorldPicker`, the `CountUp`/`KineticText` primitives, five `[data-theme]` blocks, and five unused Google fonts.

Recover any of it from git history (`git show 6f2af7e:components/worlds/poster/PosterWorld.tsx`). **Don't rebuild the multi-world scaffolding** — the comparison is over.

## Deploy (Vercel) + gotchas

- `npm run build` locally first, then deploy. No ESLint on purpose → no `eslint-config-next` → no `unrs-resolver` → dodges the `npm error Invalid Version` Vercel lockfile crash (the `vercel-npm-invalid-version` gotcha).
- **Never run `next build` while `next dev` is running** — the build overwrites `.next` and the dev server dies with `Error: Manifest file is empty`. Fix: stop dev, `rm -rf .next`, restart.
- **Deleting a route leaves stale types in `.next`** — `tsc --noEmit` then reports "Cannot find module '../../app/<route>/page.js'" from `.next/types/validator.ts`. Not a real error: `rm -rf .next` and rebuild.
- A **full-page screenshot shows below-the-fold sections blank** — expected. `whileInView` (Reveal) keeps them at `opacity:0` until scrolled into view; a no-scroll capture never triggers them. Scroll to verify.
