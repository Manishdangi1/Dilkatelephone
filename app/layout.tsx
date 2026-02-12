import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Poppins, Hind } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const hind = Hind({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "DilKaTelephone",
  description: "Dil se baat, bina judgement.",
  metadataBase: new URL("https://dilakatelephone.com"),
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable} ${hind.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
