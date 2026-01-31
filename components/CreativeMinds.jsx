
"use client";

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from "framer-motion";
import './PixelTransition.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// PixelTransition component - defined as a separate function
const PixelTransition = ({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = 'currentColor',
  animationStepDuration = 0.3,
  once = false,
  aspectRatio = '100%',
  className = '',
  style = {}
}) => {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  const isTouchDevice =
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = activate => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: 'none' });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? 'block' : 'none';
      activeEl.style.pointerEvents = activate ? 'none' : '';
    });

    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });
  };

  const handleEnter = () => {
    if (!isActive) animatePixels(true);
  };
  const handleLeave = () => {
    if (isActive && !once) animatePixels(false);
  };
  const handleClick = () => {
    if (!isActive) animatePixels(true);
    else if (isActive && !once) animatePixels(false);
  };

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
      onFocus={!isTouchDevice ? handleEnter : undefined}
      onBlur={!isTouchDevice ? handleLeave : undefined}
      tabIndex={0}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default" aria-hidden={isActive}>
        {firstContent}
      </div>
      <div className="pixelated-image-card__active" ref={activeRef} aria-hidden={!isActive}>
        {secondContent}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
};

// TEAM_MEMBERS data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Saral Jain",
    role: "Director/Developer",
    image: "/images/saral-jain-img.jpeg",
    hoverBg: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    name: "Aditya Kumar",
    role: "Chief Developer",
    image: "/images/Aditya_img.jpg",
    hoverBg: "from-green-500 to-teal-600"
  },
  {
    id: 3,
    name: "Vicky Ranjan",
    role: "Manager",
    image: "/images/vickyranjan-img.png",
    hoverBg: "from-orange-500 to-red-600"
  },
  {
    id: 4,
    name: "Chirag Jain",
    role: "Designing Engineer",
    image: "/images/chirag-jain-img.png",
    hoverBg: "from-pink-500 to-rose-600"
  }
];

// Main CreativeMinds component
export default function CreativeMinds() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const teamRefs = useRef([]);

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
      }
    });

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
      0
    );

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
      0.2
    );

    // Team member cards animation (staggered)
    tl.fromTo(teamRefs.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotation: 5
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.1
      },
      0.4
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Add Google Font in the head section for Next.js */}
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <section ref={sectionRef} className="bg-black pt-24 pb-0 px-4 md:px-20">
        <div className="mb-16 text-center">
          <div className="section-header-wrap">
            <span
              ref={subtitleRef}
              className="section-tag"
            >
              Our Team
            </span>
            <div className="accent-line-heading"></div>
          </div>
          <h2
            ref={titleRef}
            className="mt-2 text-5xl font-bold uppercase tracking-wide text-white md:text-7xl"
          >
            CREATIVE <span className="text-stroke">MINDS</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              ref={el => teamRefs.current[index] = el}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center"
            >
              <PixelTransition
                style={{
                  width: '100%',
                  maxWidth: '280px',
                  height: '400px',
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  borderRadius: '24px',
                  overflow: 'hidden'
                }}
                firstContent={
                  <div className="w-full h-full">
                    {/* Image appears here before hover animation */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover rounded-3xl"
                    />
                  </div>
                }
                secondContent={
                  <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr ${member.hoverBg} p-6 rounded-3xl`}>
                    <div className="text-white text-center">
                      <h1
                        className="text-3xl mb-2 font-bold"
                        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                      >
                        {member.name}
                      </h1>
                      <p
                        className="text-sm font-semibold opacity-90"
                        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                }
                gridSize={10}
                pixelColor="#ffffff"
                animationStepDuration={0.5}
              />
            </motion.div>
          ))}
        </div>
      </section>

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
    </>
  );
}