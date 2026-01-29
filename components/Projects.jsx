
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
        name: "RUAIRE-ECOMMERCE", 
        desc: "In Progress", 
        color: "bg-[#1a1a1a]",
        link: "Not-Available",
        images: [
            { src: "/projects/in progress.jpg", alt: "Ruaire Ecommerce Homepage" },
            { src: "/projects/in progress.jpg", alt: "Ruaire Product Page" },
            { src: "/projects/in progress.jpg", alt: "Ruaire Dashboard" }
        ],
        description: "A modern e-commerce platform with advanced features like real-time inventory, AI recommendations, and seamless checkout.",
        tech: [""]
    },
    { 
        id: "02", 
        name: "CHANDRESHWAR PROPERTIES", 
        desc: "Live Project", 
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
        desc: "Uttarakhand's Special Website", 
        color: "bg-[#333333]",
        link: "https://mountainflashes.com",
        images: [
            { src: "/projects/mountain-flashes-home-img.png", alt: "Mountain Flashes Home " },
            { src: "/projects/mountain-flashes-tours-img.png", alt: "Adventures Page" },
            { src: "/projects/mountain-flashes-adventure-img.png", alt: "Tours Packages Page" }
        ],
        description: "AI-powered fitness application with workout tracking, nutrition planning, and progress analytics.",
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
                <h2 ref={titleRef} className="text-center text-4xl md:text-5xl font-black uppercase tracking-widest text-white">
                    OUR PROJECTS
                </h2>
                <p ref={subtitleRef} className="mt-4 text-center text-white/60 text-lg">
                    Showcasing our innovative digital solutions
                </p>
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
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl font-black text-white">{project.id}</span>
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black uppercase tracking-wide text-white/90">
                                                {project.name}
                                            </span>
                                            <p className="mt-2 text-sm text-white/60 max-w-lg">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="rounded-full border border-white/30 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                                            {project.desc}
                                        </span>
                                        <Link 
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
                                        >
                                            View Live Project →
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
                                                className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20"
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
                    className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
                >
                    <span>View All Projects</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </motion.div>
        </section>
    );
}
