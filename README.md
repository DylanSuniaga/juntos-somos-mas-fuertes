# #JuntosSomosMásFuertes — MÍA Foundation

Landing page for **MÍA — Mujer Influencia Actual Foundation, Inc.**, a Florida nonprofit (501(c)(3) pending) that empowers women, men, and youth through education, leadership, and humanitarian action.

Bilingual **ES/EN**. Built with **Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion**.

## Four worlds, one purpose

The same content is presented as **four completely different designs** — each with its own layout, typography, and UI. A floating picker (top-right) navigates between them, so the foundation can experience each direction and choose.

| World | Route | Design language |
|---|---|---|
| **Editorial** (default) | `/` | Magazine: masthead, print grid, drop caps, pull quotes, ruled dividers |
| **Manifiesto** | `/manifiesto` | Activist poster: giant type, color blocks, marquees, sticker badges |
| **Humano** | `/organico` | Organic: pastel gradients, blob shapes, floating pill-cards, soft everything |
| **Panel** | `/panel` | Impact dashboard: sidebar, KPI tiles, progress meters, tabbed programs |

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

- `app/` — one route per world; `app/layout.tsx` loads fonts + providers.
- `components/worlds/<world>/` — each world's bespoke layout.
- `components/shared/` — `WorldShell` (theme wrapper) + `WorldPicker` (navigation).
- `lib/content.ts` — all copy as bilingual `{ es, en }` leaves (single source of truth).
- `lib/team.ts`, `lib/worlds.ts` — team roster and world registry.
- `public/images/` — image slots (see the README there to add photos).

See `CLAUDE.md` for the full architecture notes.

---

*#JuntosSomosMásFuertes*
