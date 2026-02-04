"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
    {
        id: "01",
        name: "RUAIRE",
        desc: "In Progress",
        color: "bg-[#1a1a1a]",
        link: "Not-Available",
        images: [
            { src: "/projects/in progress.jpg", alt: "Ruaire Ecommerce Homepage" },
            { src: "/projects/in progress.jpg", alt: "Ruaire Product Page" },
            { src: "/projects/in progress.jpg", alt: "Ruaire Dashboard" }
        ],
        description: "The Project is Currently in Developement Process...",
        tech: [""]
    },
    {
        id: "02",
        name: "CHANDRESHWAR PROPERTIES",
        desc: "Real-Estate Website",
        color: "bg-[#252525]",
        link: "https://chandreshwarproperties.in",
        images: [
            { src: "/projects/chandreshwar-properties-home-img.png", alt: "Chandreswari Properties Home" },
            { src: "/projects/chandreshwar-properties-property-list-img.png", alt: "Property Listings" },
            { src: "/projects/chandreshwar-properties-about-img.png", alt: "Virtual Tour" }
        ],
        description: "Real estate platform with virtual property tours, interactive maps, and CRM integration.",
        tech: ["HTML5", "TAILWIND", "MYSQL", "PHP"]
    },
    {
        id: "03",
        name: "MOUNTAIN FLASHES",
        desc: "Tours and Adventure Website",
        color: "bg-[#333333]",
        link: "https://mountainflashes.com",
        images: [
            { src: "/projects/mountain-flashes-home-img.png", alt: "Mountain Flashes Home " },
            { src: "/projects/mountain-flashes-tours-img.png", alt: "Adventures Page" },
            { src: "/projects/mountain-flashes-adventure-img.png", alt: "Tours Packages Page" }
        ],
        description: "A vibrant travel and adventure portal for Mountain Flashes, a premier tour operator specializing in Adventure Sports and Uttarakhand tourism.",
        tech: ["HTML5", "TAILWIND", "MYSQL", "PHP"]
    },
];

export default function Projects() {
    const containerRef = useRef(null);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Check for mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initialize GSAP animations
    useEffect(() => {
        if (!sectionRef.current) return;

        // Context for GSAP animations
        const ctx = gsap.context(() => {
            // Header animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "top 20%",
                    scrub: 1,
                    markers: false
                }
            });

            tl.fromTo(titleRef.current,
                { y: 80, opacity: 0, scale: 0.8, filter: "blur(10px)" },
                { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
                0
            );

            tl.fromTo(subtitleRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
                0.2
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animation values for desktop stacking effect
    const yTransforms = PROJECTS.map((_, index) => {
        return useTransform(
            scrollYProgress,
            [0, 1],
            [index * 40, index * -40]
        );
    });

    const opacityTransforms = PROJECTS.map((_, index) => {
        return useTransform(
            scrollYProgress,
            [0, 0.2 + index * 0.2, 0.5 + index * 0.2],
            [1, 1, 0.3]
        );
    });

    const scaleTransforms = PROJECTS.map((_, index) => {
        return useTransform(
            scrollYProgress,
            [0, 0.3 + index * 0.2],
            [1, 0.95]
        );
    });

    return (
        <section id="portfolio" ref={sectionRef} className="relative bg-black px-4 md:px-20 py-20 min-h-screen overflow-hidden">
            <div className="mb-16 md:mb-20">
                <h2 ref={titleRef} className="text-center text-4xl md:text-8xl font-bold tracking-[-0.04em] text-white" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
                    OUR <span className="opacity-40">PROJECTS</span>
                </h2>
                <div ref={subtitleRef} className="mt-6 md:mt-8 flex flex-col items-center gap-4 md:gap-6">
                    <p className="text-center text-white/30 text-xs md:text-base tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                        Digital Excellence
                    </p>
                    <div className="w-8 md:w-10 h-[1px] bg-white/20" />
                </div>
            </div>

            {/* Mobile Layout - Simple Stack */}
            {isMobile ? (
                <div className="flex flex-col gap-12 md:gap-24 pb-20">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                            className={`relative rounded-3xl border border-white/20 p-6 ${project.color} shadow-2xl`}
                        >
                            <div className="flex flex-col">
                                {/* Header with ID, Name, and Live Tag */}
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6">
                                    <div className="flex items-start md:items-center gap-4 md:gap-6">
                                        <span className="text-3xl md:text-6xl font-bold text-white/5 tracking-tighter" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>{project.id}</span>
                                        <div className="flex flex-col">
                                            <span className="text-lg md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
                                                {project.name}
                                            </span>
                                            <p className="mt-2 md:mt-3 text-xs md:text-base text-white/40 max-w-lg leading-relaxed font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start md:items-end gap-3 mt-4 md:mt-0 md:min-w-max md:pl-4">
                                        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                            {project.desc}
                                        </span>
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/30 hover:text-white text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-300 flex items-center gap-2 group/link border-b border-transparent hover:border-white/20 pb-1"
                                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                        >
                                            View Project <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Project Images Grid - Mobile Vertical Layout */}
                                <div className="mt-6 flex flex-col h-full gap-4">
                                    {/* Main Image */}
                                    <div className="h-48 w-full rounded-2xl overflow-hidden relative group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                            <button className="px-4 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm">
                                                View Project
                                            </button>
                                        </div>
                                        <Image
                                            src={project.images[0].src}
                                            alt={project.images[0].alt}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Side Images Row */}
                                    <div className="flex h-32 gap-4">
                                        <div className="h-full w-1/2 rounded-2xl overflow-hidden relative group">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                                            <Image
                                                src={project.images[1].src}
                                                alt={project.images[1].alt}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="h-full w-1/2 rounded-2xl overflow-hidden relative group">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                                            <Image
                                                src={project.images[2].src}
                                                alt={project.images[2].alt}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Stack & Bottom Bar */}
                                <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/10 pt-6 gap-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-white/5 rounded-full text-[8px] font-bold uppercase tracking-widest text-white/40 border border-white/10"
                                                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
                                    >
                                        <span>Visit Site</span>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                /* Desktop Layout - Sticky Stacking Cards */
                <div ref={containerRef} className="relative pb-60">
                    {/* Spacer for scroll effect */}
                    <div className="h-[400px]" />

                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            style={{
                                y: yTransforms[index],
                                opacity: opacityTransforms[index],
                                scale: scaleTransforms[index],
                            }}
                            className="sticky top-20 md:top-40 mb-8"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-10%" }}
                                className={`flex h-[500px] md:h-[600px] w-full max-w-5xl mx-auto flex-col rounded-3xl border border-white/20 p-8 md:flex-row md:items-center md:justify-between ${project.color} shadow-2xl`}
                            >
                                <div className="flex h-full w-full flex-col justify-between">
                                    {/* Header with ID, Name, and Live Tag */}
                                    <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                        <div className="flex items-center gap-6">
                                            <span className="text-4xl md:text-6xl font-bold text-white/5 tracking-tighter" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>{project.id}</span>
                                            <div className="flex flex-col">
                                                <span className="text-xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
                                                    {project.name}
                                                </span>
                                                <p className="mt-3 text-[13px] md:text-base text-white/40 max-w-lg leading-relaxed font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-4 min-w-max pl-4">
                                            <span className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                {project.desc}
                                            </span>
                                            <Link
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/30 hover:text-white text-[11px] uppercase font-bold tracking-[0.2em] transition-all duration-300 flex items-center gap-2 group/link border-b border-transparent hover:border-white/20 pb-1"
                                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                            >
                                                View Project <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Project Images Grid */}
                                    <div className="mt-6 flex flex-col md:flex-row h-full gap-6">
                                        {/* Main Image */}
                                        <div className="h-[200px] md:h-full w-full md:w-3/5 rounded-2xl overflow-hidden relative group">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                                <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors">
                                                    View Project
                                                </button>
                                            </div>
                                            <Image
                                                src={project.images[0].src}
                                                alt={project.images[0].alt}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Side Images */}
                                        <div className="flex h-[100px] md:h-full w-full md:w-2/5 flex-row md:flex-col gap-6">
                                            <div className="h-full md:h-1/2 w-1/2 md:w-full rounded-2xl overflow-hidden relative group">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                                                <Image
                                                    src={project.images[1].src}
                                                    alt={project.images[1].alt}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="h-full md:h-1/2 w-1/2 md:w-full rounded-2xl overflow-hidden relative group">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                                                <Image
                                                    src={project.images[2].src}
                                                    alt={project.images[2].alt}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech Stack & Bottom Bar */}
                                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/40 border border-white/10"
                                                    style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
                                        >
                                            <span>Visit Site</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* Spacer for scroll effect */}
                    <div className="h-[400px]" />
                </div>
            )}

            {/* View All Projects Button */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center mt-10 md:mt-20"
            >
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-4 md:gap-6 px-8 md:px-12 py-4 md:py-5 border border-white/5 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/30 font-bold rounded-full hover:bg-white/5 hover:text-white transition-all duration-500 hover:scale-[1.02]"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                    <span>View All Work</span>
                    <div className="w-6 md:w-8 h-[1px] bg-white/20 group-hover:bg-white transition-colors" />
                </Link>
            </motion.div>
        </section>
    );
}