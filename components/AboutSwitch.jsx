"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ScrollFloat Component (from scrollreveal.php)
const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index} style={{ transition: 'none' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');

    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`} style={{ transition: 'none' }}>
      <span className={`scroll-float-text ${textClassName}`} style={{ transition: 'none' }}>{splitText}</span>
    </h2>
  );
};

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
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
          // Reset animation when element leaves view (for scroll up)
          setShouldAnimate(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  // Handle reverse animation
  const getAnimationState = () => {
    if (!inView) return fromSnapshot;
    if (isReversed) return fromSnapshot; // Return to initial state for reverse
    return buildKeyframes(fromSnapshot, toSnapshots);
  };

  const getInitialState = () => {
    return isReversed ? buildKeyframes(fromSnapshot, toSnapshots)[0] : fromSnapshot;
  };

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', transition: 'none' }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

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
    </p>
  );
};

export default function AboutSwitch() {
  const containerRef = useRef(null);
  const aboutCircleRef = useRef(null);
  const whyCircleRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const whyTitleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animation values for sections
  const aboutOpacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);
  const aboutY = useTransform(scrollYProgress, [0, 0.35, 0.45], [0, 0, -100]);

  const whyOpacity = useTransform(scrollYProgress, [0.55, 0.65, 1], [0, 1, 1]);
  const whyY = useTransform(scrollYProgress, [0.55, 0.65, 1], [100, 0, 0]);

  // Track scroll direction for reverse animation
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  // Initialize GSAP animations
  useEffect(() => {
    if (!aboutCircleRef.current || !whyCircleRef.current) return;

    // Create a master timeline
    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 1,
        markers: false,
      }
    });

    // ABOUT SECTION ANIMATION
    // Circle animation
    masterTL.fromTo(aboutCircleRef.current,
      {
        scale: 0.7,
        opacity: 0,
        rotation: -20,
        borderRadius: "30%"
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        borderRadius: "50%",
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      },
      0
    );

    // Title animation
    masterTL.fromTo(aboutTitleRef.current,
      {
        y: -80,
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)"
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out"
      },
      0.3
    );

    // WHY SECTION ANIMATION (delayed)
    // Circle animation
    masterTL.fromTo(whyCircleRef.current,
      {
        scale: 0.7,
        opacity: 0,
        rotation: 20,
        borderRadius: "30%"
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        borderRadius: "50%",
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      },
      0.6
    );

    // Title animation
    masterTL.fromTo(whyTitleRef.current,
      {
        y: -80,
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)"
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out"
      },
      0.9
    );

    // Add subtle glow effects to circles
    masterTL.fromTo([aboutCircleRef.current, whyCircleRef.current],
      {
        boxShadow: "0 0 0px rgba(255,255,255,0)"
      },
      {
        boxShadow: "0 0 40px rgba(255,255,255,0.15)",
        duration: 0.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1
      },
      0
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      masterTL.kill();
    };
  }, []);

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

  const aboutText = "Velocity Codes represents moving at the speed of thought, building with the precision of physics. We build high-performance websites, apps, and UI/UX with expert SEO.";
  const whyText = "We combine cutting-edge technology with creative design to deliver solutions that not only look stunning but perform exceptionally. Our approach ensures your digital presence stands out.";

  return (
    <section id="about" ref={containerRef} className="relative h-[300vh] bg-black" style={{ transition: 'none' }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden" style={{ transition: 'none' }}>

        {/* About Us Section */}
        <motion.div
          style={{ opacity: aboutOpacity, y: aboutY, transition: 'none' }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-20"
        >
          <div className="absolute top-20 left-10 md:left-20 text-left">
            <div className="section-header-wrap">
              <span className="section-tag">The Story</span>
              <div className="accent-line-heading"></div>
            </div>
            <h2 className="text-5xl font-bold uppercase tracking-wide text-white md:text-7xl">
              ABOUT <span className="text-stroke">US</span>
            </h2>
          </div>

          <div
            ref={aboutCircleRef}
            className="relative flex h-[60vh] w-full max-w-5xl items-center justify-center rounded-[50%] border border-white/20 p-10 text-center"
            style={{ transition: 'none' }}
          >
            <div className="max-w-xl" style={{ transition: 'none' }}>
              <h3 className="mb-6 text-3xl font-black uppercase tracking-wider text-white" style={{ transition: 'none' }}>ABOUT</h3>
              <div className="text-lg leading-relaxed text-gray-300" style={{ transition: 'none' }}>
                <BlurText
                  text={aboutText}
                  delay={30}
                  className="text-gray-300"
                  animateBy="words"
                  direction="top"
                  stepDuration={0.5}
                  isReversed={scrollDirection === 'up' && scrollYProgress.get() > 0.1}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          style={{ opacity: whyOpacity, y: whyY, transition: 'none' }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-20"
        >
          <div className="absolute top-20 left-10 md:left-20 text-left">
            <div className="section-header-wrap">
              <span className="section-tag">The Vision</span>
              <div className="accent-line-heading"></div>
            </div>
            <h2 className="text-5xl font-bold uppercase tracking-wide text-white md:text-7xl">
              WHY <span className="text-stroke">CHOOSE</span>
            </h2>
          </div>

          <div
            ref={whyCircleRef}
            className="relative flex h-[60vh] w-full max-w-5xl items-center justify-center rounded-[50%] border border-white/20 p-10 text-center"
            style={{ transition: 'none' }}
          >
            <div className="max-w-xl" style={{ transition: 'none' }}>
              <h3 className="mb-6 text-3xl font-black uppercase tracking-wider text-white" style={{ transition: 'none' }}>WHY CHOOSE</h3>
              <div className="text-lg leading-relaxed text-gray-300" style={{ transition: 'none' }}>
                <BlurText
                  text={whyText}
                  delay={30}
                  className="text-gray-300"
                  animateBy="words"
                  direction="top"
                  stepDuration={0.5}
                  isReversed={scrollDirection === 'up' && scrollYProgress.get() > 0.6}
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      <style>{`
        .section-header-wrap {
          display: flex;
          align-items: center;
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
          .section-header-wrap {
            justify-content: center;
          }
          .text-stroke {
            -webkit-text-stroke: 0.5px rgba(255,255,255,0.4);
          }
        }
      `}</style>
    </section>
  );
}