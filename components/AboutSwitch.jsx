"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Feature Card Component for Why Choose Us
const FeatureCard = ({ icon, title, description, delay }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        gsap.fromTo(card,
            {
                y: 60,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "top 60%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <motion.div
            ref={cardRef}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-md overflow-hidden"
        >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50">
                    <div className="w-full h-full rounded-2xl bg-black/80" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="w-10 h-10 md:w-14 md:h-14 mb-3 md:mb-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl md:text-3xl">{icon}</span>
                </div>
                <h3
                    className="text-sm md:text-xl font-bold text-white mb-2 md:mb-3 uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                >
                    {title}
                </h3>
                <p
                    className="text-white/50 text-xs md:text-sm leading-relaxed font-light"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                    {description}
                </p>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 transform rotate-45 translate-x-5 -translate-y-5" />
            </div>
        </motion.div>
    );
};

// Floating Particles Background
const FloatingParticles = () => {
    const containerRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create particles
        particlesRef.current = [];
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 rounded-full bg-white/20';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            container.appendChild(particle);
            particlesRef.current.push(particle);

            // Animate particle
            gsap.to(particle, {
                y: -100 - Math.random() * 200,
                x: (Math.random() - 0.5) * 100,
                opacity: 0,
                duration: 3 + Math.random() * 4,
                repeat: -1,
                ease: "none",
                delay: Math.random() * 2
            });
        }

        return () => {
            particlesRef.current.forEach(p => p.remove());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        />
    );
};

export default function AboutSwitch() {
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile to disable complex animations
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const features = [
        {
            icon: "⚡",
            title: "Lightning Fast",
            description: "Performance-optimized websites that load in milliseconds, ensuring your users never wait."
        },
        {
            icon: "🎨",
            title: "Pixel Perfect",
            description: "Meticulous attention to detail with designs that are visually stunning across all devices."
        },
        {
            icon: "🛡️",
            title: "Secure & Scalable",
            description: "Enterprise-grade security with architecture built to scale alongside your business growth."
        },
        {
            icon: "🚀",
            title: "Innovation",
            description: "Cutting-edge technology integration that keeps your digital presence ahead of the curve."
        }
    ];

    const aboutText = "Velocity Codes represents moving at the speed of thought, building with the precision of physics. We build high-performance websites, apps, and UI/UX with expert SEO.";
    const whyText = "We combine cutting-edge technology with creative design to deliver solutions that not only look stunning but perform exceptionally. Our approach ensures your digital presence stands out.";

    return (
        <section id="about" className="relative bg-black">
            {/* Mobile Layout - Stacked Sections */}
            {isMobile ? (
                <div className="relative w-full flex flex-col gap-20 py-20">
                    {/* About Us Section */}
                    <div className="relative w-full flex flex-col items-center justify-center px-4 py-10">
                        <FloatingParticles />

                        {/* Header */}
                        <div className="relative z-10 mb-8 text-center">
                            <div className="inline-flex items-center gap-3 mb-4">
                                <div className="h-px w-8 bg-gradient-to-r from-transparent to-purple-500" />
                                <span
                                    className="text-xs uppercase tracking-[0.4em] text-purple-400"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    The Story
                                </span>
                                <div className="h-px w-8 bg-gradient-to-l from-transparent to-purple-500" />
                            </div>

                            <h2
                                className="text-3xl font-bold uppercase tracking-tight text-white"
                                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                            >
                                About <span className="text-white/30">Us</span>
                            </h2>
                        </div>

                        {/* Glassmorphism Card */}
                        <div className="relative z-10 max-w-4xl w-full mx-4">
                            {/* Gradient border frame */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-30 blur-sm" />
                            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50" />

                            {/* Main card */}
                            <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                                {/* Content */}
                                <div className="text-center">
                                    <div
                                        className="text-base leading-relaxed text-white/70 font-light"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        {aboutText}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="relative w-full flex flex-col items-center justify-center px-4 py-10">
                        {/* Header */}
                        <div className="relative z-10 mb-8 text-center">
                            <div className="inline-flex items-center gap-3 mb-4">
                                <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500" />
                                <span
                                    className="text-xs uppercase tracking-[0.4em] text-blue-400"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    The Vision
                                </span>
                                <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500" />
                            </div>

                            <h2
                                className="text-2xl font-bold uppercase tracking-tight text-white"
                                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                            >
                                Why <span className="text-white/30">Choose Us</span>
                            </h2>

                            {/* Description */}
                            <div
                                className="mt-4 text-white/50 max-w-2xl mx-auto font-light text-sm"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                {whyText}
                            </div>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="relative z-10 grid grid-cols-2 gap-3 max-w-5xl w-full">
                            {features.map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            ))}
                        </div>

                        {/* Bottom decorative line */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                    </div>
                </div>
            ) : (
                /* Desktop Layout - Simple Stacked Sections with Better Spacing */
                <div className="relative w-full min-h-screen py-20 md:py-32">
                    {/* About Us Section */}
                    <div className="relative w-full flex flex-col items-center justify-center mb-20 md:mb-32 px-4 md:px-8">
                        <FloatingParticles />

                        {/* Header */}
                        <div className="relative z-10 mb-12 text-center">
                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
                                <span
                                    className="text-xs uppercase tracking-[0.4em] text-purple-400"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    The Story
                                </span>
                                <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
                            </div>

                            <h2
                                className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white"
                                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                            >
                                About <span className="text-white/30">Us</span>
                            </h2>
                        </div>

                        {/* Glassmorphism Card */}
                        <div className="relative z-10 max-w-4xl w-full">
                            {/* Gradient border frame */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-30 blur-sm" />
                            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50" />

                            {/* Main card */}
                            <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
                                {/* Content */}
                                <div className="text-center">
                                    <div
                                        className="text-lg md:text-xl leading-relaxed text-white/70 font-light"
                                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                    >
                                        {aboutText}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="relative w-full flex flex-col items-center justify-center px-4 md:px-8">
                        {/* Header */}
                        <div className="relative z-10 mb-12 text-center">
                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
                                <span
                                    className="text-xs uppercase tracking-[0.4em] text-blue-400"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    The Vision
                                </span>
                                <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500" />
                            </div>

                            <h2
                                className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white"
                                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                            >
                                Why <span className="text-white/30">Choose Us</span>
                            </h2>

                            {/* Description */}
                            <div
                                className="mt-6 text-white/50 max-w-2xl mx-auto font-light text-base md:text-lg"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                {whyText}
                            </div>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="relative z-10 grid grid-cols-2 gap-6 max-w-5xl w-full">
                            {features.map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            ))}
                        </div>

                        {/* Bottom decorative line */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                    </div>
                </div>
            )}
        </section>
    );
}