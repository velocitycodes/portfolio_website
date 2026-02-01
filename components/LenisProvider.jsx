"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";

export default function LenisProvider({ children }) {
    const pathname = usePathname();

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Butter-smooth easing
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 0.7,
            smoothTouch: false,
            touchMultiplier: 1.5,
            infinite: false,
        });

        // Animation frame loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Reset scroll on route change
        const handleRouteChange = () => {
            lenis.scrollTo(0, { immediate: true });
        };

        handleRouteChange(); // Reset on initial load

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, [pathname]); // Re-initialize on route change

    return <>{children}</>;
}