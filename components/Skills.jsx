"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Using simpleicons.org for consistent tech logos
const SKILLS = [
    { id: 1, name: "HTML5", desc: "Markup Language", icon: "https://cdn.simpleicons.org/html5/E34F26" },
    { id: 2, name: "Tailwind CSS", desc: "Utility-first CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { id: 3, name: "React", desc: "UI Library", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { id: 4, name: "MySQL", desc: "Relational Database", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
    { id: 5, name: "Next.js", desc: "React Framework", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
    { id: 6, name: "Figma", desc: "Design Tool", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
    { id: 7, name: "Node.js", desc: "JS Runtime", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { id: 8, name: "PHP", desc: "Server-side Scripting", icon: "https://cdn.simpleicons.org/php/777BB4" },
    { id: 9, name: "JavaScript", desc: "Programming Language", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    { id: 10, name: "CodeIgniter", desc: "PHP Framework", icon: "https://cdn.simpleicons.org/codeigniter/EF4223" },
    { id: 11, name: "TypeScript", desc: "Superset of JS", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
];

export default function Skills() {
    const [selectedId, setSelectedId] = useState(null);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
            }
        });

        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 }
        );

        tl.fromTo(containerRef.current,
            { scale: 0.8, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "back.out(1.2)" },
            0.2
        );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white">
            <div ref={titleRef} className="absolute top-20 text-center z-10">
                <div className="section-header-wrap">
                    <span className="section-tag">Technical Stack</span>
                    <div className="accent-line-heading"></div>
                </div>
                <h2 className="text-5xl font-bold uppercase tracking-tight text-white md:text-8xl" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
                    OUR <span className="opacity-40">SKILLS</span>
                </h2>

            </div>

            {/* Rotating Container */}
            <motion.div
                ref={containerRef}
                className="relative flex items-center justify-center size-[300px] md:size-[600px]"
                animate={{ rotate: selectedId ? 0 : 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                {SKILLS.map((skill, index) => {
                    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 250;
                    const angle = (index / SKILLS.length) * 2 * Math.PI;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <motion.div
                            layoutId={`skill-card-${skill.id}`}
                            key={skill.id}
                            onClick={() => setSelectedId(skill.id)}
                            className="absolute flex size-16 p-3 cursor-pointer items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all hover:border-purple-500/50"
                            style={{ x, y }}
                            whileHover={{ scale: 1.2 }}
                        >
                            <div className="relative size-full">
                                <Image
                                    src={skill.icon}
                                    alt={skill.name}
                                    fill
                                    className="object-contain"
                                    unoptimized // Allow external URLs without config
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Expanded Card Modal */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        layoutId={`skill-card-${selectedId}`}
                        className="absolute z-50 flex h-72 w-72 flex-col items-center justify-center rounded-3xl bg-zinc-900 border border-white/20 p-6 text-center shadow-2xl"
                        onClick={() => setSelectedId(null)}
                    >
                        <div className="relative mb-4 size-20">
                            <Image
                                src={SKILLS.find((s) => s.id === selectedId)?.icon}
                                alt={SKILLS.find((s) => s.id === selectedId)?.name}
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        <motion.h3 className="mb-2 text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
                            {SKILLS.find((s) => s.id === selectedId)?.name}
                        </motion.h3>
                        <motion.p className="text-white/50 text-sm font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                            {SKILLS.find((s) => s.id === selectedId)?.desc}
                        </motion.p>
                        <motion.button className="mt-4 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">
                            CLICK ANYWHERE TO CLOSE
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay to dim background when selected */}
            {selectedId && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 bg-black"
                    onClick={() => setSelectedId(null)}
                />
            )}

            <style>{`
                .section-header-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .section-tag {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                    text-transform: uppercase;
                    letter-spacing: 0.4em;
                    color: #B19EEF;
                    font-size: 14px;
                }

                .accent-line-heading {
                    height: 1px;
                    width: 50px;
                    background: rgba(177, 158, 239, 0.4);
                }

                .text-stroke {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.4);
                    color: transparent;
                }

                @media (max-width: 768px) {
                    .text-stroke {
                        -webkit-text-stroke: 0.5px rgba(255,255,255,0.4);
                    }
                }
            `}</style>
        </section>
    );
}