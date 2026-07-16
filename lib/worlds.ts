import type { Bi } from "@/components/providers/LanguageProvider";

/**
 * The four "worlds" — each a separate route with its OWN layout, structure,
 * typography, and UI (not just a recolor). The picker navigates between them.
 * `theme` is the [data-theme] value WorldShell stamps for the palette/fonts.
 */
export type WorldId = "editorial" | "poster" | "organic" | "dashboard" | "dossier";

export type World = {
  id: WorldId;
  path: string;
  theme: "gold" | "violet" | "rose" | "emerald" | "paper";
  label: Bi;
  feel: Bi;
  /** [accent, accent-2, ink] swatch chip */
  swatches: [string, string, string];
};

export const WORLDS: World[] = [
  {
    id: "dossier",
    path: "/",
    theme: "paper",
    label: { es: "Insignia", en: "Signature" },
    feel: { es: "Institucional", en: "Institutional" },
    swatches: ["#dc0708", "#593622", "#1c1a17"],
  },
  {
    id: "editorial",
    path: "/revista",
    theme: "gold",
    label: { es: "Revista", en: "Editorial" },
    feel: { es: "Reporte editorial", en: "Magazine report" },
    swatches: ["#dc0708", "#593622", "#23150e"],
  },
  {
    id: "poster",
    path: "/manifiesto",
    theme: "violet",
    label: { es: "Manifiesto", en: "Manifesto" },
    feel: { es: "Cartel / campaña", en: "Poster / campaign" },
    swatches: ["#dc0708", "#d99f7e", "#111111"],
  },
  {
    id: "organic",
    path: "/organico",
    theme: "rose",
    label: { es: "Humano", en: "Human" },
    feel: { es: "Orgánico / cálido", en: "Organic / warm" },
    swatches: ["#dc0708", "#bfbebd", "#4a2f22"],
  },
  {
    id: "dashboard",
    path: "/panel",
    theme: "emerald",
    label: { es: "Panel", en: "Dashboard" },
    feel: { es: "Impacto / datos", en: "Impact / data" },
    swatches: ["#dc0708", "#bfbebd", "#1a1a1e"],
  },
];

export function getWorld(id: WorldId): World {
  return WORLDS.find((w) => w.id === id) ?? WORLDS[0];
}
