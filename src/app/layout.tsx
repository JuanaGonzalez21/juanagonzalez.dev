import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

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

export const metadata: Metadata = {
  title: "Juana González · Frontend Developer",
  description:
    "Juana González — Frontend Developer based in Bogotá, Colombia. I turn scattered ideas into interfaces that look good and load fast.",
  metadataBase: new URL("https://juanagonzalez.dev"),
  openGraph: {
    title: "Juana González · Frontend Developer",
    description: "I turn scattered ideas into interfaces that look good and load fast.",
    url: "https://juanagonzalez.dev",
    siteName: "juanagonzalez.dev",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juana González · Frontend Developer",
    description: "I turn scattered ideas into interfaces that look good and load fast.",
  },
};

/**
 * Inline script that runs synchronously BEFORE React hydrates.
 * Reads the persisted theme/lang preference from localStorage and sets
 * the html attributes accordingly, preventing "flash of wrong theme".
 */
const noFlashScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', (t === 'light' || t === 'dark') ? t : 'dark');
    var l = localStorage.getItem('lang');
    document.documentElement.setAttribute('lang', (l === 'en' || l === 'es') ? l : 'es');
  } catch(e) {}
})();
`;

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
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
