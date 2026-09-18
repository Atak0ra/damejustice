import type { Metadata } from "next";
import { Libre_Caslon_Text, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caslon",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dame Justice : le droit togolais, interrogé sans jamais être inventé",
  description:
    "Dame Justice indexe le droit togolais et les actes uniformes OHADA applicables au Togo, et répond en citant précisément la source et son rang dans la hiérarchie des normes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${caslon.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="font-plex antialiased">{children}</body>
    </html>
  );
}
