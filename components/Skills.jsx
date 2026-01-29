"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

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

    const radius = 250; // Radius of the circle

    return (
        <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white">
            <h2 className="absolute z-10 text-5xl font-black uppercase tracking-widest font-sans">OUR SKILLS</h2>

            {/* Rotating Container */}
            <motion.div
                className="relative flex items-center justify-center size-[600px]"
                animate={{ rotate: selectedId ? 0 : 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                {SKILLS.map((skill, index) => {
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
                        <motion.h3 className="mb-2 text-2xl font-black uppercase tracking-wide text-purple-400">
                            {SKILLS.find((s) => s.id === selectedId)?.name}
                        </motion.h3>
                        <motion.p className="text-gray-400 text-sm">
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
        </section>
    );
}