"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }) {
    return (
        <ReactLenis root options={{ 
            lerp: 0.07,           // Lower value = smoother, more momentum
            duration: 1.2,         // Slower duration for elegant scroll
            smoothWheel: true,     // Smooth mouse wheel
            wheelMultiplier: 1,    // Wheel sensitivity
            touchMultiplier: 2,    // Touch gesture sensitivity
            infinite: false,       // No infinite scroll
            smoothTouch: true,     // Smooth touch scrolling
            touchLerp: 0.1,        // Touch lerp value
        }}>
            {children}
        </ReactLenis>
    );
}
