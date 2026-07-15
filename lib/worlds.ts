import type { Bi } from "@/components/providers/LanguageProvider";

/**
 * The four "worlds" — each a separate route with its OWN layout, structure,
 * typography, and UI (not just a recolor). The picker navigates between them.
 * `theme` is the [data-theme] value WorldShell stamps for the palette/fonts.
 */
export type WorldId = "editorial" | "poster" | "organic" | "dashboard";

export type World = {
  id: WorldId;
  path: string;
  theme: "gold" | "violet" | "rose" | "emerald";
  label: Bi;
  feel: Bi;
  /** [accent, accent-2, ink] swatch chip */
  swatches: [string, string, string];
};

export const WORLDS: World[] = [
  {
    id: "editorial",
    path: "/",
    theme: "gold",
    label: { es: "Revista", en: "Editorial" },
    feel: { es: "Reporte editorial", en: "Magazine report" },
    swatches: ["#b8791b", "#7a6a58", "#211d18"],
  },
  {
    id: "poster",
    path: "/manifiesto",
    theme: "violet",
    label: { es: "Manifiesto", en: "Manifesto" },
    feel: { es: "Cartel / campaña", en: "Poster / campaign" },
    swatches: ["#6a2bd9", "#ff5da2", "#1c1230"],
  },
  {
    id: "organic",
    path: "/organico",
    theme: "rose",
    label: { es: "Humano", en: "Human" },
    feel: { es: "Orgánico / cálido", en: "Organic / warm" },
    swatches: ["#e0698a", "#b98bc0", "#4a2b33"],
  },
  {
    id: "dashboard",
    path: "/panel",
    theme: "emerald",
    label: { es: "Panel", en: "Dashboard" },
    feel: { es: "Impacto / datos", en: "Impact / data" },
    swatches: ["#12805c", "#3f8f7a", "#10231b"],
  },
];

export function getWorld(id: WorldId): World {
  return WORLDS.find((w) => w.id === id) ?? WORLDS[0];
}
