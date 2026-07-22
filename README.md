# #JuntosSomosMásFuertes — MÍA Foundation

Landing page for **MÍA — Mujer Influencia Actual Foundation, Inc.**, a Florida nonprofit (501(c)(3) pending) that empowers women, men, and youth through education, leadership, and humanitarian action.

Bilingual **ES/EN**. Built with **Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion**.

## Develop

```bash
npm install
npm run dev      # → http://localhost:3000
```

## Build & deploy

```bash
npm run build
```

Deploys to **Vercel** with zero configuration (Next.js App Router).

## Structure

- `app/page.tsx` — the single page; `app/layout.tsx` loads fonts, providers, and the ES/EN toggle.
- `app/globals.css` — the design tokens every component reads (`--accent`, `--ink`, `--font-display`…).
- `components/worlds/dossier/DossierWorld.tsx` — the whole page layout, section by section.
- `lib/content.ts` — all copy as bilingual `{ es, en }` leaves, plus `links` (CTA destinations). Single source of truth.
- `lib/team.ts` — founders and board.
- `public/images/` — image slots (see the README there to add photos).

> The site was originally built as **five** parallel designs on separate routes so the foundation could compare directions. They chose the Signature design on 2026-07-22; the other four were removed. They're in the git history if you ever need them back.

See `CLAUDE.md` for the full architecture notes.

---

*#JuntosSomosMásFuertes*
