import type { Bi } from "@/components/providers/LanguageProvider";

export type Person = {
  name: string;
  role: Bi;
  country?: Bi;
  /** path under /public/images/team/… */
  photo?: string;
};

/**
 * Names, roles, and countries verbatim from the foundation brief, in the
 * display order the foundation asked for: Karen · Claudia · Francilenny on
 * the top row, Annelys · Ninoska below.
 */

const karen: Person = {
  name: "Karen Gisella Mairena",
  role: { es: "Fundadora y Presidenta", en: "Founder & President" },
  country: { es: "Canadá", en: "Canada" },
  photo: "/images/team/karen.jpg",
};

const claudia: Person = {
  name: "Claudia Lozano",
  role: { es: "Socia Fundadora", en: "Founding Partner" },
  country: { es: "Canadá", en: "Canada" },
  photo: "/images/team/claudia.jpg",
};

const francilenny: Person = {
  name: "Francilenny Gonzalez",
  role: { es: "Socia Fundadora y Vicepresidenta", en: "Founding Partner & Vice President" },
  country: { es: "EE. UU.", en: "USA" },
  photo: "/images/team/francilenny.jpg",
};

const annelys: Person = {
  name: "Annelys Taveras",
  role: { es: "Secretaria", en: "Secretary" },
  photo: "/images/team/annelys.jpg",
};

const ninoska: Person = {
  name: "Ninoska Suniaga",
  role: { es: "Tesorera", en: "Treasurer" },
  photo: "/images/team/ninoska.jpg",
};

export const leadership: Person[] = [karen, claudia, francilenny, annelys, ninoska];
