"use client";

import { useEffect, ReactNode, useRef } from "react";
import { usePathname } from "next/navigation";

interface LenisWrapperProps {
  children: ReactNode;
}

export default function LenisWrapper({ children }: LenisWrapperProps) {
  const pathname = usePathname();
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Server-side rendering check
    if (typeof window === "undefined") return;

    // Simple smooth scroll implementation without external dependencies
    const initSmoothScroll = () => {
      let targetScrollY = window.scrollY;
      let currentScrollY = window.scrollY;
      let isScrolling = false;

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const smoothScroll = () => {
        if (Math.abs(targetScrollY - currentScrollY) < 0.5) {
          currentScrollY = targetScrollY;
          window.scrollTo({ top: currentScrollY, left: 0 });
          isScrolling = false;
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
          return;
        }

        // Use easing function for smoother animation
        const easing = easeOutCubic(0.1);
        currentScrollY += (targetScrollY - currentScrollY) * easing;
        
        window.scrollTo({ top: currentScrollY, left: 0 });
        animationFrameId.current = requestAnimationFrame(smoothScroll);
      };

      const handleWheel = (e: WheelEvent) => {
        // Allow pinch zoom and trackpad gestures
        if (e.ctrlKey || e.metaKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          return;
        }
        
        e.preventDefault();
        
        // Add momentum and natural feel
        const scrollAmount = e.deltaY * (e.deltaMode === 1 ? 40 : 1) * 0.5;
        targetScrollY += scrollAmount;
        
        // Clamp scroll position
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
        
        if (!isScrolling) {
          isScrolling = true;
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
          }
          animationFrameId.current = requestAnimationFrame(smoothScroll);
        }
      };

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        
        const touchY = e.touches[0].clientY;
        let lastTouchY = touchY;
        let lastTimestamp = Date.now();
        let velocity = 0;

        const handleTouchMove = (e: TouchEvent) => {
          if (e.touches.length !== 1) return;
          
          e.preventDefault();
          const currentTouchY = e.touches[0].clientY;
          const currentTimestamp = Date.now();
          const deltaTime = currentTimestamp - lastTimestamp;
          
          if (deltaTime > 0) {
            const deltaY = lastTouchY - currentTouchY;
            velocity = deltaY / deltaTime;
            lastTouchY = currentTouchY;
            lastTimestamp = currentTimestamp;
            
            targetScrollY += deltaY * 1.2;
            
            // Clamp scroll position
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
            
            if (!isScrolling) {
              isScrolling = true;
              if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
              }
              animationFrameId.current = requestAnimationFrame(smoothScroll);
            }
          }
        };

        const handleTouchEnd = () => {
          // Add momentum based on velocity
          if (Math.abs(velocity) > 0.1) {
            targetScrollY += velocity * 300; // Momentum factor
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
          }
          
          document.removeEventListener("touchmove", handleTouchMove);
          document.removeEventListener("touchend", handleTouchEnd);
        };

        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", handleTouchEnd, { passive: true });
      };

      // Handle keyboard navigation
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || 
            e.target instanceof HTMLTextAreaElement ||
            (e.target as HTMLElement).isContentEditable) {
          return;
        }

        let scrollAmount = 0;
        switch(e.key) {
          case 'ArrowDown':
            scrollAmount = 80;
            break;
          case 'ArrowUp':
            scrollAmount = -80;
            break;
          case 'PageDown':
            scrollAmount = window.innerHeight * 0.9;
            break;
          case 'PageUp':
            scrollAmount = -window.innerHeight * 0.9;
            break;
          case 'Home':
            targetScrollY = 0;
            break;
          case 'End':
            targetScrollY = document.body.scrollHeight - window.innerHeight;
            break;
          default:
            return;
        }

        if (scrollAmount !== 0) {
          e.preventDefault();
          targetScrollY += scrollAmount;
          const maxScroll = document.body.scrollHeight - window.innerHeight;
          targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
          
          if (!isScrolling) {
            isScrolling = true;
            if (animationFrameId.current) {
              cancelAnimationFrame(animationFrameId.current);
            }
            animationFrameId.current = requestAnimationFrame(smoothScroll);
          }
        }
      };

      // Add event listeners with proper options
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: false });
      window.addEventListener("keydown", handleKeyDown, { passive: false });

      // Reset scroll on route change
      targetScrollY = 0;
      currentScrollY = 0;
      window.scrollTo({ top: 0, left: 0 });

      // Cleanup function
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("keydown", handleKeyDown);
      };
    };

    // Initialize with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(initSmoothScroll, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [pathname]);

  return <>{children}</>;
}