import type { Metadata } from "next";
import { Inria_Serif, Instrument_Sans, Playfair_Display } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600", "700"],
});

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  variable: "--font-inria-serif",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} | Handcrafted & personalised leather bags`,
  description:
    "Your vision, our creation. Handcrafted and personalised leather bags by Casa Pelle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${instrumentSans.variable} ${inriaSerif.variable}`}
    >
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
