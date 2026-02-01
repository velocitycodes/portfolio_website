
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
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
    const projectRefs = useRef([]);
    const buttonRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Initialize GSAP animations
    useEffect(() => {
        if (!sectionRef.current) return;

        // Create GSAP timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "top 20%",
                scrub: 1,
                markers: false,
                onEnter: () => {
                    console.log("Entered Projects Section with GSAP!");
                }
            }
        });

        // Title animation
        tl.fromTo(titleRef.current,
            {
                y: 80,
                opacity: 0,
                scale: 0.8,
                filter: "blur(10px)"
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out"
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
                duration: 0.8,
                ease: "power2.out"
            },
            0.2
        );

        // Projects animation (staggered with different effects)
        projectRefs.current.forEach((project, index) => {
            if (!project) return;

            tl.fromTo(project,
                {
                    y: 150,
                    opacity: 0,
                    scale: 0.85,
                    rotation: index % 2 === 0 ? -3 : 3
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1,
                    ease: "back.out(1.2)",
                    delay: index * 0.1
                },
                0.4 + (index * 0.15)
            );
        });

        // View All button animation
        tl.fromTo(buttonRef.current,
            {
                y: 60,
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            },
            0.8 + (PROJECTS.length * 0.15)
        );

        // Add subtle parallax effect to images on scroll
        const images = sectionRef.current.querySelectorAll('img');
        images.forEach(img => {
            gsap.to(img, {
                y: -30,
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });
        });

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, []);

    return (
        <section id="portfolio" ref={sectionRef} className="relative bg-black px-4 md:px-20 py-20">
            <div className="mb-20">
                <h2 ref={titleRef} className="text-center text-5xl md:text-8xl font-bold tracking-[-0.04em] text-white" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
                    OUR <span className="opacity-40">PROJECTS</span>
                </h2>
                <div ref={subtitleRef} className="mt-8 flex flex-col items-center gap-6">
                    <p className="text-center text-white/30 text-sm md:text-base tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                        Digital Excellence
                    </p>
                    <div className="w-10 h-[1px] bg-white/20" />
                </div>
            </div>

            <div ref={containerRef} className="flex flex-col items-center gap-10 pb-40">
                {PROJECTS.map((project, index) => {
                    // Calculate top offset for stacking effect
                    const top = 100 + index * 40;

                    return (
                        <motion.div
                            key={index}
                            ref={el => projectRefs.current[index] = el}
                            className={`sticky flex h-[600px] w-full max-w-5xl flex-col rounded-3xl border border-white/20 p-8 md:flex-row md:items-center md:justify-between ${project.color}`}
                            style={{ top: `${top}px` }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex h-full w-full flex-col justify-between">
                                {/* Header with ID, Name, and Live Tag */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                    <div className="flex items-center gap-6">
                                        <span className="text-6xl font-bold text-white/5 tracking-tighter" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>{project.id}</span>
                                        <div className="flex flex-col">
                                            <span className="text-2xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
                                                {project.name}
                                            </span>
                                            <p className="mt-3 text-[15px] md:text-base text-white/40 max-w-lg leading-relaxed font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-4">
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
                                <div className="mt-6 flex h-full gap-6">
                                    {/* Main Image */}
                                    <div className="h-full w-3/5 rounded-2xl overflow-hidden relative group">
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
                                    <div className="flex h-full w-2/5 flex-col gap-6">
                                        <div className="h-1/2 rounded-2xl overflow-hidden relative group">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                                            <Image
                                                src={project.images[1].src}
                                                alt={project.images[1].alt}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="h-1/2 rounded-2xl overflow-hidden relative group">
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
                    );
                })}
            </div>

            {/* View All Projects Button */}
            <motion.div
                ref={buttonRef}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center mt-10"
            >
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-6 px-12 py-5 border border-white/5 text-[11px] uppercase tracking-[0.3em] text-white/30 font-bold rounded-full hover:bg-white/5 hover:text-white transition-all duration-500 hover:scale-[1.02]"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                    <span>View All Work</span>
                    <div className="w-8 h-[1px] bg-white/20 group-hover:bg-white transition-colors" />
                </Link>
            </motion.div>
        </section>
    );
}
