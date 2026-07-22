import type { Metadata, Viewport } from "next";
import { Poppins, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { CinematicProvider } from "@/components/providers/CinematicProvider";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { LanguageToggle } from "@/components/shared/LanguageToggle";

/* The three faces the Signature design uses — all preloaded, since there is
   only one design left. (This was eight fonts across five worlds until the
   foundation picked this one on 2026-07-22.) */

/** Didone serif headings — the brand-manual look. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
/** Body copy. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
/** ALL-CAPS letter-spaced labels and section numbers. */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const fontVars = [playfair.variable, poppins.variable, jetbrains.variable].join(" ");

const SITE = "https://mia-foundation.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title:
    "MÍA — Mujer Influencia Actual Foundation · La influencia que transforma vidas",
  description:
    "MÍA Foundation empodera a mujeres, hombres y jóvenes mediante programas de educación, liderazgo y acción humanitaria. Organización sin fines de lucro registrada en Florida. #JuntosSomosMásFuertes",
  openGraph: {
    title: "MÍA — Mujer Influencia Actual Foundation",
    description:
      "Construimos una comunidad global que inspira liderazgo, crea oportunidades y transforma influencia en legado.",
    type: "website",
    locale: "es_ES",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f2f2",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={fontVars}>
      <body className="font-body antialiased">
        <LanguageProvider>
          <CinematicProvider>
            <SmoothScroll />
            <LanguageToggle />
            {children}
          </CinematicProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
