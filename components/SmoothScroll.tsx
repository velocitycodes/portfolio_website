"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    let styleElement: HTMLStyleElement | null = null;

    try {
      // Add CSS for smooth scrolling
      styleElement = document.createElement('style');
      styleElement.id = 'smooth-scroll-styles';
      styleElement.textContent = `
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 1rem; /* Prevents content from being hidden under fixed headers */
        }
        
        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          
          * {
            scroll-behavior: auto !important;
          }
        }
        
        /* Ensure smooth scrolling for anchor links */
        [id] {
          scroll-margin-top: 2rem;
        }
      `;
      
      // Only add if not already present
      if (!document.getElementById('smooth-scroll-styles')) {
        document.head.appendChild(styleElement);
      }

      // Reset scroll on route change with better timing
      const resetScroll = () => {
        try {
          // Use setTimeout to ensure the scroll happens after the route change
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          }, 10);
        } catch (error) {
          console.warn('Error during smooth scroll reset:', error);
          // Fallback to instant scroll if smooth fails
          window.scrollTo(0, 0);
        }
      };

      resetScroll();

    } catch (error) {
      console.warn('Error setting up smooth scroll:', error);
    }

    // Cleanup function
    return () => {
      try {
        if (styleElement && document.head.contains(styleElement)) {
          document.head.removeChild(styleElement);
        }
      } catch (error) {
        console.warn('Error during smooth scroll cleanup:', error);
      }
    };
  }, [pathname]);

  return <>{children}</>;
}