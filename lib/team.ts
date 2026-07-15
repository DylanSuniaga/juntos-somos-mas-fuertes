import type { Bi } from "@/components/providers/LanguageProvider";

export type Person = {
  name: string;
  role: Bi;
  country?: Bi;
  /** path under /public/images/team/… once photos arrive */
  photo?: string;
};

/** Names, roles, and countries verbatim from the foundation brief. */
export const foundingTeam: Person[] = [
  {
    name: "Karen Gisella Mairena",
    role: { es: "Fundadora y Presidenta", en: "Founder & President" },
    country: { es: "Canadá", en: "Canada" },
  },
  {
    name: "Claudia Lozano",
    role: { es: "Socia Fundadora", en: "Founding Partner" },
    country: { es: "Canadá", en: "Canada" },
  },
  {
    name: "Francilenny Gonzalez",
    role: { es: "Socia Fundadora y Vicepresidenta", en: "Founding Partner & Vice President" },
    country: { es: "EE. UU.", en: "USA" },
  },
];

export const board: Person[] = [
  {
    name: "Karen Mairena Mendoza",
    role: { es: "Presidenta", en: "President" },
  },
  {
    name: "Francilenny Gonzalez",
    role: { es: "Vicepresidenta", en: "Vice President" },
  },
  {
    name: "Annelys Taveras",
    role: { es: "Secretaria", en: "Secretary" },
  },
  {
    name: "Ninoska Suniaga",
    role: { es: "Tesorera", en: "Treasurer" },
  },
];
