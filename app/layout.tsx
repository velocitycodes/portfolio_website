import type { Metadata } from "next";
import { Outfit, Kaushan_Script, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import LoadingManager from "@/components/LoadingManager";
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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${outfit.variable} ${kaushan.variable} ${jakarta.variable} ${inter.variable} antialiased bg-black text-white overflow-x-hidden`}>
        {/* Remove SmoothScroll and use only LenisWrapper for smooth scrolling */}
        {/* LenisWrapper handles both the smooth scrolling functionality and CSS injection */}
        <LenisWrapper>
          <LoadingManager>
            {children}
          </LoadingManager>
        </LenisWrapper>
      </body>
    </html>
  );
}