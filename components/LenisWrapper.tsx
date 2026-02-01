"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface LenisWrapperProps {
  children: ReactNode;
}

export default function LenisWrapper({ children }: LenisWrapperProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Simple smooth scroll implementation without external dependencies
    const initSmoothScroll = () => {
      let targetScrollY = window.scrollY;
      let currentScrollY = window.scrollY;
      let animationFrameId: number;
      let isScrolling = false;

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const smoothScroll = () => {
        currentScrollY += (targetScrollY - currentScrollY) * 0.1;
        
        if (Math.abs(targetScrollY - currentScrollY) < 0.5) {
          currentScrollY = targetScrollY;
          window.scrollTo(0, currentScrollY);
          cancelAnimationFrame(animationFrameId);
          isScrolling = false;
          return;
        }
        
        window.scrollTo(0, currentScrollY);
        animationFrameId = requestAnimationFrame(smoothScroll);
      };

      const handleWheel = (e: WheelEvent) => {
        if (e.ctrlKey || e.metaKey) return; // Allow zoom
        
        e.preventDefault();
        targetScrollY += e.deltaY * 0.5;
        targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));
        
        if (!isScrolling) {
          isScrolling = true;
          smoothScroll();
        }
      };

      const handleTouchStart = (e: TouchEvent) => {
        const touchY = e.touches[0].clientY;
        let lastTouchY = touchY;

        const handleTouchMove = (e: TouchEvent) => {
          const currentTouchY = e.touches[0].clientY;
          const deltaY = lastTouchY - currentTouchY;
          lastTouchY = currentTouchY;
          
          targetScrollY += deltaY * 1.5;
          targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));
          
          if (!isScrolling) {
            isScrolling = true;
            smoothScroll();
          }
        };

        const handleTouchEnd = () => {
          document.removeEventListener("touchmove", handleTouchMove);
          document.removeEventListener("touchend", handleTouchEnd);
        };

        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", handleTouchEnd);
      };

      // Add event listeners
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: false });

      // Reset scroll on route change
      targetScrollY = 0;
      currentScrollY = 0;
      window.scrollTo(0, 0);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
      };
    };

    const cleanup = initSmoothScroll();

    return cleanup;
  }, [pathname]);

  return <>{children}</>;
}