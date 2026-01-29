
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import LightRays from "./LightRays";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Hero() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!titleRef.current || !subtitleRef.current || !containerRef.current) return;

        // Create GSAP timeline for hero animations
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        // Title animation
        tl.fromTo(titleRef.current,
            {
                y: 100,
                opacity: 0,
                scale: 0.8,
                filter: "blur(10px)"
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.2
            },
            0
        );

        // Subtitle animation
        tl.fromTo(subtitleRef.current,
            {
                y: 50,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "back.out(1.2)"
            },
            0.3
        );

        // Cleanup
        return () => {
            tl.kill();
        };
    }, []);

    return (
        <>
            {/* Add Lobster Google Font */}
            <link
                href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
                rel="stylesheet"
            />
            
            <section id="hero" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
                {/* Light Rays Background Animation */}
                <div className="absolute inset-0 z-0">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#a456d6" // Purple color matching your theme
                        raysSpeed={1.2}
                        lightSpread={1.2}
                        rayLength={6.0}
                        pulsating={false}
                        fadeDistance={1.7}
                        saturation={1.2}
                        followMouse={true}
                        mouseInfluence={0.15}
                        noiseAmount={0.05}
                        distortion={0}
                    />
                    
                    {/* Semi-transparent overlay to make text more readable */}
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Enhanced gradient for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/30" />
                </div>

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                    <h1
                        ref={titleRef}
                        className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight text-white drop-shadow-xl"
                        style={{ fontFamily: "'Lobster', cursive" }}
                    >
                        Designing Platforms
                        <br />
                        <span className="block mt-2 md:mt-4">That Define You</span>
                    </h1>

                    {/* Optional: Add a subtitle with Lobster font */}
                    <p
                        ref={subtitleRef}
                        className="mt-8 text-lg md:text-xl text-white/95 max-w-2xl drop-shadow-lg"
                        style={{ fontFamily: "'Lobster', cursive" }}
                    >
                        Creating digital experiences that elevate your brand
                    </p>
                    
                    {/* HIRE US Button */}
                    
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="animate-bounce">
                        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>
        </>
    );
}