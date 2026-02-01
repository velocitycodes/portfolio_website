"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const StaggeredMenu = ({
  position = 'left',
  colors = ['#1e1e22', '#35353c'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  onMenuItemClick
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    gsap.set(panel, { xPercent: offscreen });
    gsap.set(layers, { xPercent: offscreen });

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((layer, i) => {
      tl.to(layer, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const panelInsertTime = (layers.length * 0.07) + 0.05;
    tl.to(panel, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, panelInsertTime);

    if (itemEls.length) {
      tl.to(itemEls, {
        yPercent: 0,
        rotate: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.1
      }, panelInsertTime + 0.2);
    }

    if (numberEls.length) {
      tl.to(numberEls, {
        '--sm-num-opacity': 1,
        duration: 0.5,
        stagger: 0.08
      }, panelInsertTime + 0.3);
    }

    if (socialTitle || socialLinks.length) {
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.4 }, panelInsertTime + 0.4);
      if (socialLinks.length) tl.to(socialLinks, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 }, panelInsertTime + 0.45);
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => { busyRef.current = false; });
      tl.play();
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const offscreen = position === 'left' ? -100 : 100;
    gsap.to([panel, ...layers], {
      xPercent: offscreen,
      duration: 0.4,
      ease: 'power3.in',
      stagger: 0.05,
      onComplete: () => { busyRef.current = false; }
    });
  }, [position]);

  const toggleMenu = () => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
  };

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
    }
  }, [onMenuClose, playClose]);

  React.useEffect(() => {
    if (!closeOnClickAway) return;

    const handleClickOutside = (event) => {
      if (
        openRef.current &&
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, closeMenu]);

  const handleMenuItemClick = (sectionId) => {
    closeMenu();
    onMenuItemClick?.(sectionId);
  };

  return (
    <>
      <style jsx>{`
        .staggered-menu-wrapper { position: relative; z-index: 100; pointer-events: none; }
        .sm-toggle { 
          pointer-events: auto; background: none; border: none; cursor: pointer; 
          display: flex; flex-direction: column; gap: 6px; padding: 10px;
        }
        .sm-line { width: 30px; height: 2px; bg: white; border-radius: 2px; transition: 0.3s; background: white; }
        .sm-line.open:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .sm-line.open:nth-child(2) { opacity: 0; }
        .sm-line.open:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
        
        .staggered-menu-panel {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: #111; padding: 100px 30px; z-index: 90; pointer-events: auto;
          display: flex; flex-direction: column; gap: 40px;
        }
        @media (min-width: 768px) {
          .staggered-menu-panel { width: clamp(300px, 40vw, 500px); padding: 100px 50px; }
        }
        .sm-prelayers { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 80; pointer-events: none; }
        @media (min-width: 768px) {
          .sm-prelayers { width: clamp(300px, 40vw, 500px); }
        }
        .sm-prelayer { position: absolute; inset: 0; }
        
        .sm-panel-list { list-style: none; padding: 0; margin: 0; }
        .sm-panel-item { 
          background: none; border: none; color: white; font-size: 2rem; font-weight: 800; 
          text-transform: uppercase; cursor: pointer; text-align: left; padding: 10px 0;
          overflow: hidden; display: block; width: 100%;
          font-family: var(--font-jakarta), sans-serif;
          letter-spacing: -0.02em;
        }
        @media (min-width: 768px) {
          .sm-panel-item { font-size: 3.5rem; }
        }
        .sm-panel-itemLabel { display: block; transition: color 0.3s; }
        .sm-panel-item:hover .sm-panel-itemLabel { color: #a22ce6ff; }
        
        .sm-socials { margin-top: auto; }
        .sm-socials-title { 
            color: #555; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 3px; margin-bottom: 20px; 
            font-family: var(--font-inter), sans-serif; font-weight: 600;
        }
        .sm-socials-list { display: flex; gap: 20px; list-style: none; padding: 0; }
        .sm-socials-link { color: white; text-decoration: none; font-size: 0.9rem; transition: color 0.3s; }
        .sm-socials-link:hover { color: #B19EEF; }
      `}</style>

      <div className="staggered-menu-wrapper">
        <button ref={toggleBtnRef} className="sm-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          <div className={`sm-line ${open ? 'open' : ''}`} />
          <div className={`sm-line ${open ? 'open' : ''}`} />
          <div className={`sm-line ${open ? 'open' : ''}`} />
        </button>

        <div ref={preLayersRef} className="sm-prelayers">
          {colors.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />)}
        </div>

        <aside ref={panelRef} className="staggered-menu-panel">
          <ul className="sm-panel-list">
            {items.map((it, idx) => (
              <li key={idx}>
                <button className="sm-panel-item" onClick={() => handleMenuItemClick(it.sectionId)}>
                  <span className="sm-panel-itemLabel">{it.name}</span>
                </button>
              </li>
            ))}
          </ul>
          {displaySocials && (
            <div className="sm-socials">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list">
                {socialItems.map((s, i) => (
                  <li key={i}><a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">{s.label}</a></li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </>
  );
};

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const router = useRouter();

  const scrollToSection = (id) => {
    if (id === 'contact') {
      router.push('/contact');
      return;
    }
    if (id === 'templates') {
      router.push('/templates');
      return;
    }

    // If we're not on the home page, go to home first then scroll? 
    // For now, assume home page or simple redirect
    if (window.location.pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { name: "Home", sectionId: "hero" },
    { name: "Services", sectionId: "services" },
    { name: "Portfolio", sectionId: "portfolio" },
    { name: "About", sectionId: "about" },
    { name: "Contact", sectionId: "contact" },
    { name: "Templates", sectionId: "templates" },

  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com/VelocityCodes" },
    { label: "GitHub", link: "https://github.com/velocitycodes" },
    { label: "LinkedIn", link: "https://linkedin.com" },
    { label: "Instagram", link: "https://instagram.com/velocity.codes" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent"
        }`}
    >
      {/* Left: Hamburger Menu */}
      <div className="flex items-center w-1/3">
        <StaggeredMenu
          items={menuItems}
          socialItems={socialItems}
          onMenuItemClick={scrollToSection}
          colors={['#1e1e22', '#35353c']}
        />
      </div>

      {/* Center: Logo */}
      <div className="flex justify-center w-1/3">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <span className="text-purple-700 font-serif italic text-3xl md:text-4xl mr-1.5">V</span>
          <span className="font-sans">ELOCITY</span>
          <span className="text-purple-700 font-serif italic text-3xl md:text-4xl ml-1.5 mr-1.5">C</span>
          <span className="font-sans">ODES</span>
        </button>
      </div>

      {/* Right: Hire Us */}
      <div className="flex justify-end lg:w-1/3">
        <button
          onClick={() => scrollToSection('contact')}
          className="hidden md:block rounded-full border border-white/20 px-8 py-2 text-[10px] font-bold text-white transition-all hover:bg-white hover:text-black uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-inter), sans-serif', cursor: 'pointer' }}
        >
          Hire Us
        </button>
      </div>
    </motion.header>
  );
}