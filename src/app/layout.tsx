import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ================================================================
// Fuentes (cargadas y optimizadas por Next.js)
// ================================================================
// Cada fuente expone una CSS variable que luego usamos en globals.css:
//   --font-geist     → titulares y texto de énfasis
//   --font-inter     → cuerpo del texto
//   --font-jetbrains → código, labels, monoespaciado
// ================================================================

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// ================================================================
// Metadata (aparece en la pestaña del navegador, Google, redes)
// ================================================================
export const metadata: Metadata = {
  title: "Juana González · Desarrolladora Frontend",
  description:
    "Juana González — Desarrolladora Frontend en Bogotá, Colombia. Convierto ideas dispersas en interfaces que se ven bien y van rápido.",
  metadataBase: new URL("https://juanagonzalez.dev"),
  openGraph: {
    title: "Juana González · Desarrolladora Frontend",
    description:
      "Convierto ideas dispersas en interfaces que se ven bien y van rápido.",
    url: "https://juanagonzalez.dev",
    siteName: "juanagonzalez.dev",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juana González · Desarrolladora Frontend",
    description:
      "Convierto ideas dispersas en interfaces que se ven bien y van rápido.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
  <html
    lang="es"
    data-theme="dark"
    className={`${geist.variable} ${inter.variable} ${jetbrains.variable}`}
  >
    <body>{children}</body>
  </html>
);
}
