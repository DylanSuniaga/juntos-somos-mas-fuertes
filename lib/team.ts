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
 * display order the foundation asked for: Karen · Claudia · Ninoska.
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

const ninoska: Person = {
  name: "Ninoska Suniaga",
  role: { es: "Tesorera", en: "Treasurer" },
  photo: "/images/team/ninoska.jpg",
};

export const leadership: Person[] = [karen, claudia, ninoska];
