"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const backgroundRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (!titleRef.current || !subtitleRef.current || !containerRef.current || !contentRef.current || !backgroundRef.current) return;

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

        // Scroll-triggered zoom-out and fade animation
        const scrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true, // Changed to true to work with Lenis
            }
        });

        // Zoom out and fade the content
        scrollTL.to(contentRef.current, {
            scale: 0.7,
            opacity: 0,
            filter: "blur(20px)",
            ease: "power2.inOut"
        }, 0);

        // Scale down background with parallax
        scrollTL.to(backgroundRef.current, {
            scale: 1.3,
            opacity: 0.5,
            ease: "power2.inOut"
        }, 0);

        // Fade out video slightly on scroll
        scrollTL.to(videoRef.current, {
            opacity: 0.3,
            ease: "power2.inOut"
        }, 0);

        // Cleanup
        return () => {
            tl.kill();
            scrollTL.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            <section id="hero" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
                {/* Video Background */}
                <div ref={backgroundRef} className="absolute inset-0 z-0 transition-transform will-change-transform overflow-hidden">
                    {/* Video Background */}
                    <div className="absolute inset-0">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ filter: 'brightness(0.6) contrast(1.0)' }}
                        >
                            {/* Add your video source here */}
                            <source src="/videos/hero-background (2).mp4" type="video/mp4" />
                            <source src="/videos/hero-background.webm" type="video/webm" />
                            {/* Fallback text if video doesn't load */}
                            Your browser does not support the video tag.
                        </video>

                        {/* Gradient overlays for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-blue-900/10 mix-blend-overlay" />

                        {/* Animated noise texture for cyberpunk effect */}
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 512 512%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url%28%23noiseFilter%29%22/%3E%3C/svg%3E')]"></div>
                        </div>
                    </div>
                </div>

                {/* Content wrapper with ref for scroll animation */}
                <div ref={contentRef} className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center will-change-transform">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="mb-8 px-5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white/50 text-[10px] font-mono tracking-[0.4em] uppercase"
                    >
                        Building Future Systems
                    </motion.div>

                    <h1
                        ref={titleRef}
                        className="text-4xl sm:text-5xl md:text-8xl lg:text-[120px] tracking-[-0.04em] text-white font-bold leading-[0.9]"
                        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                    >
                        Designing <span className="opacity-40">Platforms</span>
                        <br />
                        <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 select-none">That Define You</span>
                    </h1>

                    <div className="mt-12 overflow-hidden">
                        <motion.p
                            ref={subtitleRef}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1.5 }}
                            className="text-lg md:text-xl text-white/40 max-w-2xl font-light tracking-[0.2em] leading-relaxed uppercase"
                            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                        >
                            High-Performance <span className="text-white/80 font-normal">Digital Architecture</span> & Immersive <span className="text-white/80 font-normal">User Experiences</span>.
                        </motion.p>
                    </div>

                </div>

                {/* Cyber Scroll Indicator */}
                <div className="absolute bottom-12 left-12 flex flex-col items-start gap-4 z-10 hidden md:flex">
                    <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
                        <motion.div
                            animate={{ y: [-96, 96] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
                        />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-mono rotate-90 origin-left mt-8">Scroll</span>
                </div>

                {/* Mobile fallback instruction for video (optional) */}
                <div className="absolute bottom-4 right-4 z-10 md:hidden">
                    <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                        <span className="text-xs text-white/50 font-mono">
                            Video: ON
                        </span>
                    </div>
                </div>
            </section >
        </>
    );
}