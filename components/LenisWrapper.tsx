"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";

interface LenisWrapperProps {
  children: ReactNode;
}

export default function LenisWrapper({ children }: LenisWrapperProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") return;

    try {
      // According to Lenis documentation, the most basic initialization
      // doesn't require any options - it works out of the box
      const lenis = new Lenis();
      
      // Or with minimal options that are known to exist
      // const lenis = new Lenis({
      //   lerp: 0.1
      // });

      // Animation frame loop
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Reset scroll on route change
      lenis.scrollTo(0, { immediate: true });

      // Cleanup function
      return () => {
        lenis.destroy();
      };
    } catch (error) {
      console.warn("Lenis initialization failed:", error);
      // Fallback to normal scrolling
    }
  }, [pathname]); // Re-initialize on route change

  // Return children as-is - Lenis works in the background
  return <>{children}</>;
}