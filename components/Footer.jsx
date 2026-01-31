"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
    const footerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (footerRef.current) {
            observerRef.current.observe(footerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <footer
            ref={footerRef}
            className="relative bg-[#e6e6e6] text-black overflow-hidden"
        >
            {/* Main Content Container */}
            <div
                className="container mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-16 md:pt-32 md:pb-20"
            >
                {/* Grid Layout */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {/* Column 1: Socials */}
                    <motion.div
                        className="md:col-span-3"
                        variants={itemVariants}
                    >
                        <h3 className="mb-6 font-bold uppercase text-lg tracking-wide">SOCIALS</h3>
                        <ul className="space-y-4">
                            <motion.li
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <Link
                                    href="https://www.instagram.com/velocity.codes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg text-purple-700 hover:text-purple-900 transition-colors duration-300 block"
                                >
                                    Instagram
                                </Link>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <Link
                                    href="#"
                                    className="text-lg text-purple-700 hover:text-purple-900 transition-colors duration-300 block"
                                >
                                    Facebook
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Column 2: Contact */}
                    <motion.div
                        className="md:col-span-3"
                        variants={itemVariants}
                    >
                        <h3 className="mb-6 font-bold uppercase text-lg tracking-wide">CONTACT US</h3>
                        <ul className="space-y-4">
                            <motion.li
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <Link
                                    href="mailto:velocitycodes.web@gmail.com"
                                    className="text-lg text-purple-700 hover:text-purple-900 transition-colors duration-300 block"
                                >
                                    Email
                                </Link>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <Link
                                    href="https://wa.me/919258976261"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg text-purple-700 hover:text-purple-900 transition-colors duration-300 block"
                                >
                                    WhatsApp
                                </Link>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <Link
                                    href="tel:919258976261"
                                    className="text-lg text-purple-700 hover:text-purple-900 transition-colors duration-300 block"
                                >
                                    Phone no.
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Column 3: Center Text */}
                    <motion.div
                        className="md:col-span-4 md:col-start-7"
                        variants={itemVariants}
                    >
                        <p className="text-base text-gray-700 leading-relaxed mb-6">
                            As designers, We believe in service above self. Being a designer is about serving user needs. It's dedicating yourself to finding the right balance between user needs and business goals.
                        </p>
                        <div className="text-sm text-gray-500">
                            <p>Got a project in mind?</p>
                            <p>Let's make something happen together</p>
                        </div>
                    </motion.div>

                    {/* Column 4: Brand - Full width on mobile, specific column on desktop */}
                    <motion.div
                        className="md:col-span-12 mt-12 md:mt-20"
                        variants={itemVariants}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight uppercase text-center md:text-left">
                            <span className="text-purple-700 font-serif italic ml-2.5">V</span>
                            ELOCITY
                            <span className="text-purple-700 font-serif italic ml-2">C</span>
                            ODES
                        </h1>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Image - Only on desktop */}
            <motion.div
                className="hidden md:block absolute right-0 bottom-0 z-0 h-[500px] lg:h-[600px] w-[400px] lg:w-[500px] pointer-events-none"
                initial={{ y: 100, opacity: 0 }}
                animate={isVisible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                transition={{
                    y: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        duration: 0.8
                    },
                    opacity: {
                        duration: 0.6,
                        ease: "easeOut"
                    }
                }}
            >
                <Image
                    src="/images/footer-back.png"
                    alt="Team Member"
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                    priority={false}
                    loading="lazy"
                />
            </motion.div>

            {/* Bottom Line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.3
                }}
            />
        </footer>
    );
}