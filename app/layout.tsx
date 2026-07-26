import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "New Punjab Glass House | Precision Glass & Wholesale Aluminium — Ludhiana",
  description:
    "New Punjab Glass House (NPGH) — three decades of precision in wholesale aluminium sections, stained glass, decorative glass, air-brushed & sand-blasted artistry, and bevelled edge-polished glass. Dugri Road, Ludhiana, Punjab.",
  keywords: [
    "glass house Ludhiana",
    "wholesale aluminium Ludhiana",
    "stained glass Punjab",
    "decorative glass",
    "bevelled glass",
    "sand blasted glass",
    "New Punjab Glass House",
  ],
  openGraph: {
    title: "New Punjab Glass House | Precision Glass & Wholesale Aluminium",
    description: "Customer's Satisfaction Is Our Moto — Dugri Road, Ludhiana, Punjab.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-obsidian text-white antialiased">{children}</body>
    </html>
  );
}
