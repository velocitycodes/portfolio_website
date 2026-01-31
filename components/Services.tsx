"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom web applications built with modern technologies.",
    icon: "🌐",
    color: "#3B82F6",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Intuitive and beautiful interfaces designed for engagement.",
    icon: "🎨",
    color: "#8B5CF6",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Mobile Apps",
    description: "Cross-platform mobile applications for any device.",
    icon: "📱",
    color: "#10B981",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "E-commerce Solutions",
    description: "Complete e-commerce platforms with secure payments.",
    icon: "🛒",
    color: "#F97316",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "SEO Optimization",
    description: "Boost your online visibility with comprehensive SEO.",
    icon: "🔍",
    color: "#F59E0B",
    gradient: "from-yellow-500 to-amber-500"
  },
  {
    id: 6,
    title: "Brand Identity",
    description: "Create a strong brand presence with complete branding.",
    icon: "🏷️",
    color: "#6366F1",
    gradient: "from-indigo-500 to-violet-500"
  }
]

const ITEM_WIDTH = 400
const GAP = 30

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Calculate total horizontal distance
  const totalDistance = (services.length - 1) * (ITEM_WIDTH + GAP)
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

  // State for tracking which cards are active
  const [activeCard, setActiveCard] = useState<number | null>(null)

  // Performance optimizations
  useEffect(() => {
    // Enable GPU acceleration for smoother animations
    const cards = document.querySelectorAll('.neon-card')
    cards.forEach(card => {
      (card as HTMLElement).style.transformStyle = 'preserve-3d'
        ; (card as HTMLElement).style.backfaceVisibility = 'hidden'
    })
  }, [])

  return (
    <section id="services" className="relative bg-black min-h-screen overflow-hidden">
      {/* Subtle background gradient - localized to section */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/40 to-black pointer-events-none" />

      {/* Top Section */}
      <div className="intro-section py-32 px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="section-header-wrap">
            <span className="section-tag">Capabilities</span>
            <div className="accent-line-heading"></div>
          </div>
          <motion.h1
            className="mb-4"
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            OUR <span className="text-stroke">SERVICES</span>
          </motion.h1>

        </motion.div>
      </div>

      {/* Horizontal Scroll Section */}
      <div ref={containerRef} className="scroll-container relative z-10">
        <div className="sticky-wrapper">
          <motion.div className="gallery" style={{ x }}>
            {services.map((service, index) => {
              const isActive = activeCard === service.id

              return (
                <motion.div
                  key={service.id}
                  className="gallery-item neon-card"
                  style={
                    {
                      "--service-color": service.color,
                    } as React.CSSProperties
                  }
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    rotateY: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                    margin: "-100px"
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  whileHover={{
                    scale: 1.03,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut"
                    }
                  }}
                  onHoverStart={() => setActiveCard(service.id)}
                  onHoverEnd={() => setActiveCard(null)}
                >
                  {/* Card Background with Gradient */}
                  <div className="card-bg absolute inset-0 overflow-hidden rounded-2xl">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, ${service.color}40, transparent 50%)`
                      }}
                    />

                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      style={{
                        background: `linear-gradient(45deg, ${service.color}, transparent)`
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>

                  {/* Subtle border glow */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-2xl pointer-events-none"
                    style={{ borderColor: service.color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 0.3 : 0.1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Floating particles (simplified for performance) */}
                  <div className="particles absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4 rounded-full"
                        style={{ background: service.color, opacity: 0.15 }}
                        initial={{
                          x: `${Math.random() * 100}%`,
                          y: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`
                          ],
                          x: [
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`
                          ],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 8 + Math.random() * 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    ))}
                  </div>

                  {/* Card Content */}
                  <div className="card-content relative z-20 p-8 h-full flex flex-col justify-between">
                    {/* Service Number */}
                    <div className="flex justify-between items-start mb-6">
                      <motion.span
                        className="item-number text-xl font-mono font-bold"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                        style={{ color: service.color }}
                      >
                        0{service.id}
                      </motion.span>

                      <motion.div
                        className="text-4xl"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: index * 0.1 + 0.3
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        {service.icon}
                      </motion.div>
                    </div>

                    {/* Title */}
                    <motion.h2
                      className="text-3xl font-bold text-white mb-4 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                    >
                      {service.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      className="text-white/70 text-lg mb-8 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                    >
                      {service.description}
                    </motion.p>

                    {/* Button */}
                    <motion.button
                      className="relative overflow-hidden group rounded-lg px-6 py-3 font-semibold"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                        border: `1px solid ${service.color}30`,
                        color: 'white'
                      }}
                    >
                      <span className="relative z-10 flex items-center">
                        Explore Service
                        <motion.span
                          className="ml-2"
                          animate={{
                            x: isActive ? [0, 5, 0] : 0
                          }}
                          transition={{
                            duration: 1,
                            repeat: isActive ? Infinity : 0
                          }}
                        >
                          →
                        </motion.span>
                      </span>

                      {/* Button hover effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${service.color}20, transparent)`
                        }}
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>

                    {/* Decorative elements */}
                    <motion.div
                      className="absolute bottom-4 right-4 w-12 h-px"
                      style={{ background: service.color }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.7 }}
                    />
                    <motion.div
                      className="absolute top-4 left-4 w-px h-12"
                      style={{ background: service.color }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
                    />
                  </div>

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 0.15 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(45deg, transparent 30%, ${service.color}80 50%, transparent 70%)`,
                        transform: 'translateX(-100%)',
                      }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="outro-section py-32 px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to build something amazing?
          </motion.h2>

        </motion.div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        body {
          overflow-x: hidden;
          background: #000;
        }

        #services {
          height: auto;
          overflow: visible;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .intro-section {
          height: 50vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          text-align: center;
          padding-bottom: 40px;
        }

        .scroll-container {
          height: 300vh;
          position: relative;
          will-change: transform;
        }

        .sticky-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: visible;
          padding-left: calc(50vw - 200px);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .gallery {
          display: flex;
          gap: 30px;
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        .gallery-item.neon-card {
          flex-shrink: 0;
          width: 400px;
          height: 500px;
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          will-change: transform, opacity;
        }

        .gallery-item.neon-card:hover {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(var(--service-color, 59, 130, 246), 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .card-bg {
          transform: translateZ(-1px);
          -webkit-transform: translateZ(-1px);
        }

        .card-content {
          transform: translateZ(10px);
          -webkit-transform: translateZ(10px);
        }

        .particles {
          transform: translateZ(1px);
          -webkit-transform: translateZ(1px);
        }

        .outro-section {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .outro-section h2 {
          font-size: clamp(2rem, 8vw, 5rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 1;
          margin: 0;
          color: #fff;
          text-shadow: 0 0 40px rgba(255,255,255,0.2);
        }

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

        .intro-section h1 {
          font-size: clamp(3rem, 12vw, 9rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 0.9;
          margin: 0;
          color: #fff;
        }

        .text-stroke {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
          color: transparent;
        }

        /* Performance optimizations */
        .neon-card * {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }

        @media (max-width: 768px) {
          .sticky-wrapper {
            padding-left: 5vw;
            width: 90vw;
          }
          
          .gallery-item.neon-card {
            width: 320px;
            height: 420px;
          }
          
          .card-content {
            padding: 24px;
          }
          
          .gallery-item h2 {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .sticky-wrapper {
            padding-left: 5vw;
          }
          
          .gallery-item.neon-card {
            width: 280px;
            height: 380px;
          }
          
          .gallery {
            gap: 20px;
          }
          
          .card-content {
            padding: 20px;
          }
          
          .gallery-item h2 {
            font-size: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery {
            transform: none !important;
          }
          .scroll-container {
            height: auto;
          }
          .sticky-wrapper {
            position: relative;
            height: auto;
            width: 100%;
            overflow-x: auto;
            padding: 50px 20px;
            justify-content: flex-start;
            -webkit-overflow-scrolling: touch;
          }
          .gallery-item {
            flex-shrink: 0;
          }
        }

        /* Force GPU acceleration */
        .gallery,
        .gallery-item,
        .sticky-wrapper,
        .card-content {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          perspective: 1000;
          -webkit-transform: translate3d(0,0,0);
          transform: translate3d(0,0,0);
        }
      `}</style>
    </section>
  )
}