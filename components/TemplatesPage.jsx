"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TEMPLATES = [
    {
        id: 1,
        name: "Lumina Sapiens",
        category: "E-Commerce",
        price: "$49",
        description: "A high-end minimal shop for luxury goods and artisanal products.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        previewLink: "#",
        buyLink: "#"
    },
    {
        id: 2,
        name: "Aetheria Port",
        category: "Creative Portfolio",
        price: "$39",
        description: "Dark, immersive portfolio with fluid animations for creative professionals.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2370&auto=format&fit=crop",
        previewLink: "#",
        buyLink: "#"
    },
    {
        id: 3,
        name: "Vector SaaS",
        category: "Corporate / SaaS",
        price: "$59",
        description: "High-performance dashboard and landing page for modern tech startups.",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2370&auto=format&fit=crop",
        previewLink: "#",
        buyLink: "#"
    },
    {
        id: 4,
        name: "Archo Studio",
        category: "Architecture",
        price: "$45",
        description: "Clean, structured layout designed for architectural and interior design firms.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2370&auto=format&fit=crop",
        previewLink: "#",
        buyLink: "#"
    }
];

export default function TemplatesPage() {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-8 md:px-20 overflow-hidden relative">
            {/* Background Gradient Accents */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span
                        className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6 block"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                        Premium Digital Assets
                    </span>
                    <h1
                        className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-[-0.04em] leading-[0.9] text-white mb-8"
                        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                    >
                        DESIGNED FOR <br />
                        <span className="opacity-40">DOMINANCE.</span>
                    </h1>
                    <p
                        className="max-w-2xl text-white/50 text-base md:text-lg leading-relaxed font-medium"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                        Explore our curated selection of high-performance website templates,
                        architected by our lead designers to accelerate your digital presence.
                    </p>
                </motion.div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {TEMPLATES.map((template, index) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="group relative"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5 border border-white/10 mb-8">
                            <img
                                src={template.image}
                                alt={template.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                <Link
                                    href={template.previewLink}
                                    className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    Preview
                                </Link>
                                <Link
                                    href={template.buyLink}
                                    className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    Buy Now
                                </Link>
                            </div>

                            {/* Category Tag */}
                            <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] text-white/60" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                {template.category}
                            </div>

                            {/* Price Tag */}
                            <div className="absolute top-6 right-6 px-5 py-2.5 bg-white text-black rounded-xl flex items-baseline gap-1 shadow-[0_8px_30px_rgb(255,255,255,0.2)]" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
                                <span className="text-[10px] font-bold uppercase tracking-tight opacity-40">USD</span>
                                <span className="text-xl font-bold tracking-tighter leading-none">{template.price.replace('$', '')}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-2">
                            <h3
                                className="text-2xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors"
                                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                            >
                                {template.name}
                            </h3>
                            <p
                                className="text-white/40 text-sm leading-relaxed max-w-md font-medium"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                {template.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto mt-32 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="p-10 md:p-20 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col items-center text-center"
                >
                    <h2
                        className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
                        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                    >
                        Need a custom <span className="opacity-40">solution?</span>
                    </h2>
                    <br></br>
                    <p
                        className="text-white/40 text-base md:text-lg mb-10 max-w-2xl font-medium"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                        If our pre-built templates don't fit your needs, our team can architect a bespoke platform from scratch.
                    </p>
                    <br></br>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-4 px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.3em] rounded-full transition-all duration-300 hover:scale-105"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                        Talk to an Architect
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
