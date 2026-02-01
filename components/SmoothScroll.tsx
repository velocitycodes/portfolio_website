"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Add CSS for smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto;
        }
      }
    `;
    document.head.appendChild(style);

    // Reset scroll on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.head.removeChild(style);
    };
  }, [pathname]);

  return <>{children}</>;
}