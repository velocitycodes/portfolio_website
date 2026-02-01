"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
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
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-md overflow-hidden"
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
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{icon}</span>
                </div>
                <h3 
                    className="text-xl font-bold text-white mb-3 uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                >
                    {title}
                </h3>
                <p 
                    className="text-white/50 text-sm leading-relaxed font-light"
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

// Stats Component
const StatItem = ({ value, label, delay }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.fromTo(el,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
                {value}
            </div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                {label}
            </div>
        </div>
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

const BlurText = ({
    text = '',
    delay = 200,
    className = '',
    animateBy = 'words',
    direction = 'top',
    threshold = 0.1,
    rootMargin = '0px',
    animationFrom,
    animationTo,
    easing = t => t,
    onAnimationComplete,
    stepDuration = 0.35,
    isReversed = false
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const [inView, setInView] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    setShouldAnimate(true);
                    observer.unobserve(ref.current);
                } else {
                    setShouldAnimate(false);
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const defaultFrom = useMemo(
        () => direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
        [direction]
    );

    const defaultTo = useMemo(
        () => [
            { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
            { filter: 'blur(0px)', opacity: 1, y: 0 }
        ],
        [direction]
    );

    const fromSnapshot = animationFrom ?? defaultFrom;
    const toSnapshots = animationTo ?? defaultTo;

    const buildKeyframes = (from, steps) => {
        const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
        const keyframes = {};
        keys.forEach(k => {
            keyframes[k] = [from[k], ...steps.map(s => s[k])];
        });
        return keyframes;
    };

    const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
    const stepCount = toSnapshots.length + 1;
    const totalDuration = stepDuration * (stepCount - 1);
    const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

    const getInitialState = () => {
        return isReversed ? buildKeyframes(fromSnapshot, toSnapshots)[0] : fromSnapshot;
    };

    return (
        <div ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', transition: 'none' }}>
            {elements.map((segment, index) => {
                const spanTransition = {
                    duration: totalDuration,
                    times,
                    delay: (index * delay) / 1000
                };
                spanTransition.ease = easing;

                return (
                    <motion.span
                        className="inline-block will-change-[transform,filter,opacity]"
                        key={index}
                        style={{ transition: 'none' }}
                        initial={getInitialState()}
                        animate={shouldAnimate ? (isReversed ? fromSnapshot : animateKeyframes) : getInitialState()}
                        transition={spanTransition}
                        onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
                    >
                        {segment === ' ' ? '\u00A0' : segment}
                        {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                    </motion.span>
                );
            })}
        </div>
    );
};

export default function AboutSwitch() {
    const containerRef = useRef(null);
    const aboutSectionRef = useRef(null);
    const whySectionRef = useRef(null);
    const [scrollDirection, setScrollDirection] = useState('down');
    const lastScrollY = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Animation values for sections
    const aboutOpacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);
    const aboutY = useTransform(scrollYProgress, [0, 0.35, 0.45], [0, 0, -100]);
    const aboutScale = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0.95]);

    const whyOpacity = useTransform(scrollYProgress, [0.55, 0.65, 1], [0, 1, 1]);
    const whyY = useTransform(scrollYProgress, [0.55, 0.65, 1], [100, 0, 0]);
    const whyScale = useTransform(scrollYProgress, [0.55, 0.65, 1], [0.95, 1, 1]);

    // Track scroll direction
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY.current) {
                setScrollDirection('up');
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Features data
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
        <section id="about" ref={containerRef} className="relative h-[300vh] bg-black" style={{ transition: 'none' }}>
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden" style={{ transition: 'none' }}>

                {/* About Us Section */}
                <motion.div
                    ref={aboutSectionRef}
                    style={{ opacity: aboutOpacity, y: aboutY, scale: aboutScale, transition: 'none' }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-20 py-20"
                >
                    <FloatingParticles />

                    {/* Header */}
                    <div className="relative z-10 mb-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="inline-flex items-center gap-3 mb-6"
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
                            <span 
                                className="text-xs uppercase tracking-[0.4em] text-purple-400"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                The Story
                            </span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white"
                            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                        >
                            About <span className="text-white/30">Us</span>
                        </motion.h2>
                    </div>

                    {/* Glassmorphism Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative z-10 max-w-4xl w-full"
                    >
                        {/* Gradient border frame */}
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-30 blur-sm" />
                        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50" />
                        
                        {/* Main card */}
                        <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <div className="absolute top-4 right-4 w-20 h-20">
                                <div className="w-full h-full border border-white/10 rounded-full" />
                                <div className="absolute inset-2 border border-white/10 rounded-full" />
                            </div>

                            {/* Content */}
                            <div className="text-center">
                                <div 
                                    className="text-lg md:text-xl leading-relaxed text-white/70 font-light"
                                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                >
                                    <BlurText
                                        text={aboutText}
                                        delay={25}
                                        className="inline"
                                        animateBy="words"
                                        direction="top"
                                        stepDuration={0.4}
                                    />
                                </div>

                                {/* Stats */}
                                
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Why Choose Us Section */}
                <motion.div
                    ref={whySectionRef}
                    style={{ opacity: whyOpacity, y: whyY, scale: whyScale, transition: 'none' }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-20 py-20"
                >
                    {/* Header */}
                    <div className="relative z-10 mb-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-3 mb-6"
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
                            <span 
                                className="text-xs uppercase tracking-[0.4em] text-blue-400"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                            >
                                The Vision
                            </span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500" />
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white"
                            style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                        >
                            Why <span className="text-white/30">Choose Us</span>
                        </motion.h2>

                        {/* Description */}
                        <div
                            className="mt-6 text-white/50 max-w-2xl mx-auto font-light"
                            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                        >
                            <BlurText
                                text={whyText}
                                delay={20}
                                className="inline"
                                animateBy="words"
                                direction="top"
                                stepDuration={0.3}
                            />
                        </div>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                delay={0.3 + index * 0.1}
                            />
                        ))}
                    </div>

                    {/* Bottom decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                    />
                </motion.div>

            </div>
        </section>
    );
}