import type { Metadata } from "next";
import { Outfit, Kaushan_Script, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import LoadingManager from "@/components/LoadingManager";
import SmoothScroll from "@/components/SmoothScroll";
import LenisWrapper from "@/components/LenisWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kaushan",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Velocity Codes",
  description: "Designing Platforms That Define You",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
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
      <body className={`${outfit.variable} ${kaushan.variable} ${jakarta.variable} ${inter.variable} antialiased bg-black text-white`}>
        {/* LenisWrapper will add smooth scrolling without affecting existing components */}
        <LenisWrapper>
          <SmoothScroll>
            <LoadingManager>
              {children}
            </LoadingManager>
          </SmoothScroll>
        </LenisWrapper>
      </body>
    </html>
  );
}