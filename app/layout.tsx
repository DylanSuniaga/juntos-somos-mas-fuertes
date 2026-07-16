import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Inter,
  Anton,
  Space_Grotesk,
  Poppins,
  Nunito,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { CinematicProvider } from "@/components/providers/CinematicProvider";
import { SmoothScroll } from "@/components/shared/SmoothScroll";

/* Editorial world (default) — preloaded. */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Other worlds — loaded when their route is visited. */
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
  preload: false,
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  preload: false,
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  preload: false,
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});
/* Dossier world — Didone serif for the brand-manual look. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

const fontVars = [
  fraunces.variable,
  inter.variable,
  anton.variable,
  space.variable,
  poppins.variable,
  nunito.variable,
  jetbrains.variable,
  playfair.variable,
].join(" ");

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
            {children}
          </CinematicProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
