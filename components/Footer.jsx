"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function Footer() {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: false, amount: 0.2 });
    const [isVisible, setIsVisible] = useState(false);

    // Track scroll position for image animation
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    // Transform scroll progress to image animation values
    const imageY = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.5, 1]);

    useEffect(() => {
        setIsVisible(isInView);
    }, [isInView]);

    // Animation variants for footer sections
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: 50,
            transition: {
                duration: 0.4,
                ease: "easeIn",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    const brandVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "backOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.4,
                ease: "backIn"
            }
        }
    };

    return (
        <footer
            ref={footerRef}
            className="relative bg-[#e6e6e6] px-6 pt-32 pb-20 text-black mt-40 md:px-20 overflow-hidden"
        >
            {/* Animated Container */}
            <motion.div
                className="relative z-10 flex flex-col items-start justify-between gap-10 md:flex-row"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                exit="exit"
            >
                {/* Left Column */}
                <div className="flex flex-col gap-8">
                    <motion.div variants={itemVariants}>
                        <h3 className="mb-4 font-bold uppercase">Socials</h3>
                        <ul className="flex flex-col gap-2 text-sm text-purple-700">
                            <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                                <Link href="https://www.instagram.com/velocity.codes" className="block hover:text-purple-900 transition-colors">Instagram</Link>
                            </motion.li>

                            <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                                <Link href="#" className="block hover:text-purple-900 transition-colors">Facebook</Link>
                            </motion.li>
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="mb-4 font-bold uppercase">Contact us</h3>
                        <ul className="flex flex-col gap-2 text-sm text-purple-700">
                            <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                                <Link href="mailto:velocitycodes.web@gmail.com" className="block hover:text-purple-900 transition-colors">Email</Link>
                            </motion.li>
                            <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                                <Link href="https://wa.me/919258976261" className="block hover:text-purple-900 transition-colors">Whatsapp</Link>
                            </motion.li>
                            <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                                <Link href="tel:919258976261" className="block hover:text-purple-900 transition-colors">Phone no.</Link>
                            </motion.li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="mt-8 text-xs text-gray-500"
                        variants={itemVariants}
                    >
                        <p>Got a project in mind?</p>
                        <p>Let's make something happen together</p>
                    </motion.div>
                </div>

                {/* Center Text */}
                <motion.div
                    className="max-w-md text-sm text-gray-700 leading-relaxed md:mr-auto md:ml-20"
                    variants={itemVariants}
                >
                    <p>
                        As designers, We believe in service above self. Being a designer is about serving user needs. It's dedicating yourself to finding the right balance between user needs and business goals.
                    </p>
                </motion.div>

                {/* Brand */}
                <motion.div
                    className="relative right-140 mt-80 md:mt-55 "
                    variants={brandVariants}
                >
                    <h1 className="text-8xl font-bold tracking-widest uppercase">
                        <span className="text-purple-700 font-serif italic text-9xl mr-1">V</span>
                        ELOCITY
                        <span className="text-purple-700 font-serif italic text-9xl ml-2 mr-1">C</span>
                        ODES
                    </h1>
                </motion.div>
            </motion.div>

            {/* Person Image with Scroll-based Animation */}
            <motion.div
                className="absolute right-0 bottom-0 z-0 h-[600px] w-[500px] pointer-events-none hidden md:block overflow-visible"
                style={{
                    y: imageY,
                    opacity: imageOpacity
                }}
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
                    style={{ transform: "translateY(0%) scale(1.1)" }}
                />
            </motion.div>

            {/* Bottom Decorative Line */}
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