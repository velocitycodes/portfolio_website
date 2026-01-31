import type { Metadata } from "next";
import { Outfit, Kaushan_Script } from "next/font/google";
import "./globals.css";
import LoadingManager from "@/components/LoadingManager";

import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kaushan",
});

export const metadata: Metadata = {
  title: "Velocity Codes",
  description: "Designing Platforms That Define You",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${outfit.variable} ${kaushan.variable} antialiased bg-black text-white`}>
        <SmoothScroll>
          <LoadingManager>
            {children}
          </LoadingManager>
        </SmoothScroll>
      </body>
    </html>
  );
}