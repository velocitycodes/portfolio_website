"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll } from "framer-motion";

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
  onMenuItemClick // New prop for handling menu item clicks
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' }
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback(opening => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
    } else {
      spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
    }
  }, []);

  const animateColor = useCallback(
    opening => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback(opening => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);

    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
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
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  // Handle menu item click
  const handleMenuItemClick = useCallback((sectionId) => {
    // Close the menu
    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);

    // Call the parent handler to scroll to section
    if (onMenuItemClick) {
      onMenuItemClick(sectionId);
    }
  }, [onMenuClose, playClose, animateIcon, animateColor, animateText, onMenuItemClick]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = event => {
      if (
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
  }, [closeOnClickAway, open, closeMenu]);

  // Inline CSS to avoid import issues
  const inlineStyles = `
    .staggered-menu-wrapper {
      position: relative;
      width: 0;
      height: 0;
      z-index: 40;
      pointer-events: none;
    }

    .staggered-menu-wrapper.fixed-wrapper {
      padding: 1.5rem 1.5rem 1rem 1.5rem;
      top: -20px;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 40;
      overflow: hidden;
    }

    .staggered-menu-header {
      
      top: 0;
      left: auto;
      width: auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0;
      background: transparent;
      pointer-events: none;
      z-index: 20;
    }

    .staggered-menu-header > * {
      pointer-events: auto;
    }

    .sm-logo {
      display: flex;
      top:-10px;
      align-items: center;
      user-select: none;
    }

    .sm-logo-img {
      display: block;
      height: 32px;
      width: auto;
      object-fit: contain;
    }

    .sm-toggle {
      position: absolute
      top: 2rem;
      left: 2rem;;
      display: inline-flex;
      align-items: center;
      background: transparent;
      border: none;
      cursor: pointer;
      color: #e9e9ef;
      font-weight: 500;
      line-height: 1;
      overflow: visible;
    }

    .sm-toggle:focus-visible {
      outline: 2px solid #ffffffaa;
      outline-offset: 4px;
      border-radius: 4px;
    }

    .sm-toggle-textWrap {
      position: relative;
      display: inline-block;
      height: 1em;
      overflow: hidden;
      white-space: nowrap;
      width: var(--sm-toggle-width, auto);
      min-width: var(--sm-toggle-width, auto);
    }

    .sm-toggle-textInner {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .sm-toggle-line {
      display: block;
      height: 1em;
      line-height: 1;
    }

    .sm-icon {
      position: relative;
      top:20px;
      width: 14px;
      height: 14px;
      flex: 0 0 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      will-change: transform;
    }

    .sm-panel-itemWrap {
      position: relative;
      overflow: hidden;
      line-height: 1;
    }

    .sm-icon-line {
      position: absolute;
      left: 80%;
      top: -80%;
      width: 100%;
      height: 2px;
      background: currentColor;
      border-radius: 2px;
      transform: translate(-50%, -50%);
      will-change: transform;
    }

    .staggered-menu-panel {
      position: absolute;
      top: 0;
      right: 0;
      width: clamp(260px, 38vw, 420px);
      height: 100vh;
      background: white;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      flex-direction: column;
      padding: 6em 2em 2em 2em;
      overflow-y: auto;
      z-index: 10;
      pointer-events: auto;
      visibility: hidden; /* Hide when closed */
      transform: translateX(100%); /* Move off-screen when closed */   
    }
    .sm-prelayers {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: clamp(260px, 38vw, 420px);
      pointer-events: none;
      z-index: 5;
    }

    [data-position='left'] .sm-prelayers {
      right: auto;
      left: 0;
       transform: translateX(-100%);
    }

    .staggered-menu-wrapper[data-open] .staggered-menu-panel {
         visibility: visible;
        transform: translateX(0);
    }

    .sm-prelayer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: clamp(260px, 38vw, 420px);
      pointer-events: none;
      z-index: 5;
      visibility: hidden; /* Hide when closed */
      transform: translateX(100%); /* Move off-screen when closed */
    }

    [data-position='left'] .sm-prelayers {
      right: auto;
      left: 0;
      transform: translateX(-100%); /* Move off-screen when closed for left position */
    }

    /* Show prelayers when open */
      .staggered-menu-wrapper[data-open] .sm-prelayers {
      visibility: visible;
      transform: translateX(0);
    }

    .sm-panel-inner {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .sm-socials {
      margin-top: auto;
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .sm-socials-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
      color: var(--sm-accent, #ff0000);
    }

    .sm-socials-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .sm-socials-list .sm-socials-link {
      opacity: 1;
    }

    .sm-socials-list:hover .sm-socials-link {
      opacity: 0.35;
    }

    .sm-socials-list:hover .sm-socials-link:hover {
      opacity: 1;
    }

    .sm-socials-link:focus-visible {
      outline: 2px solid var(--sm-accent, #ff0000);
      outline-offset: 3px;
    }

    .sm-socials-list:focus-within .sm-socials-link {
      opacity: 0.35;
    }

    .sm-socials-list:focus-within .sm-socials-link:focus-visible {
      opacity: 1;
    }

    .sm-socials-link {
      font-size: 1.2rem;
      font-weight: 500;
      color: #111;
      text-decoration: none;
      position: relative;
      padding: 2px 0;
      display: inline-block;
      transition: color 0.3s ease, opacity 0.3s ease;
    }

    .sm-socials-link:hover {
      color: var(--sm-accent, #ff0000);
    }

    .sm-panel-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .sm-panel-item {
      position: relative;
      color: #000;
      font-weight: 600;
      font-size: 3.5rem;
      cursor: pointer;
      line-height: 1;
      letter-spacing: -2px;
      text-transform: uppercase;
      transition: background 0.25s, color 0.25s;
      display: inline-block;
      text-decoration: none;
      padding-right: 1.4em;
      background: none;
      border: none;
      text-align: left;
      width: 100%;
      font-family: inherit;
    }

    .staggered-menu-panel .sm-socials-list .sm-socials-link {
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    .staggered-menu-panel .sm-socials-list:hover .sm-socials-link:not(:hover) {
      opacity: 0.35;
    }

    .staggered-menu-panel .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) {
      opacity: 0.35;
    }

    .staggered-menu-panel .sm-socials-list .sm-socials-link:hover,
    .staggered-menu-panel .sm-socials-list .sm-socials-link:focus-visible {
      opacity: 1;
    }

    .sm-panel-itemLabel {
      display: inline-block;
      will-change: transform;
      transform-origin: 50% 100%;
    }

    .sm-panel-item:hover {
      color: var(--sm-accent, #5227ff);
    }

    .sm-panel-list[data-numbering] {
      counter-reset: smItem;
    }

    .sm-panel-list[data-numbering] .sm-panel-item::after {
      counter-increment: smItem;
      content: counter(smItem, decimal-leading-zero);
      position: absolute;
      top: 0.1em;
      right: 2.8em;
      font-size: 18px;
      font-weight: 400;
      color: var(--sm-accent, #5227ff);
      letter-spacing: 0;
      pointer-events: none;
      user-select: none;
      opacity: var(--sm-num-opacity, 0);
    }

    @media (max-width: 1024px) {
      .staggered-menu-panel {
        width: 100%;
        left: 0;
        right: 0;
      }
    }

    @media (max-width: 640px) {
      .staggered-menu-panel {
        width: 100%;
        left: 0;
        right: 0;
      }
    }
  `;

  return (
    <>
      <style jsx>{inlineStyles}</style>
      <div
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
        style={accentColor ? { ['--sm-accent']: accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
          })()}
        </div>
        <header className="staggered-menu-header" aria-label="Main navigation header">

          <button
            ref={toggleBtnRef}
            className="sm-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
              <span ref={textInnerRef} className="sm-toggle-textInner">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line" key={i}>
                    {l}
                  </span>
                ))}
              </span>
            </span>
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span ref={plusHRef} className="sm-icon-line" />
              <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
            </span>
          </button>
        </header>

        <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
          <div className="sm-panel-inner">
            <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
              {items && items.length ? (
                items.map((it, idx) => (
                  <li className="sm-panel-itemWrap" key={it.label + idx}>
                    <button
                      className="sm-panel-item"
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      onClick={() => handleMenuItemClick(it.sectionId)}
                    >
                      <span className="sm-panel-itemLabel">{it.label}</span>
                    </button>
                  </li>
                ))
              ) : (
                <>
                  <li className="sm-panel-itemWrap">
                    <button
                      className="sm-panel-item"
                      data-index={1}
                      onClick={() => handleMenuItemClick('hero')}
                    >
                      <span className="sm-panel-itemLabel">Home</span>
                    </button>
                  </li>
                  <li className="sm-panel-itemWrap">
                    <button
                      className="sm-panel-item"
                      data-index={2}
                      onClick={() => handleMenuItemClick('services')}
                    >
                      <span className="sm-panel-itemLabel">Services</span>
                    </button>
                  </li>
                  <li className="sm-panel-itemWrap">
                    <button
                      className="sm-panel-item"
                      data-index={3}
                      onClick={() => handleMenuItemClick('portfolio')}
                    >
                      <span className="sm-panel-itemLabel">Portfolio</span>
                    </button>
                  </li>
                  <li className="sm-panel-itemWrap">
                    <button
                      className="sm-panel-item"
                      data-index={4}
                      onClick={() => handleMenuItemClick('about')}
                    >
                      <span className="sm-panel-itemLabel">About</span>
                    </button>
                  </li>
                  <li className="sm-panel-itemWrap">
                    <button
                      className="sm-panel-item"
                      data-index={5}
                      onClick={() => handleMenuItemClick('contact')}
                    >
                      <span className="sm-panel-itemLabel">Contact</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials" aria-label="Social links">
                <h3 className="sm-socials-title">Socials</h3>
                <ul className="sm-socials-list" role="list">
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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

  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const menuItems = [
    {
      label: "Home",
      sectionId: "hero",
      ariaLabel: "Scroll to Home section"
    },
    {
      label: "Services",
      sectionId: "services",
      ariaLabel: "Scroll to Services section"
    },
    {
      label: "Portfolio",
      sectionId: "portfolio",
      ariaLabel: "Scroll to Portfolio section"
    },
    {
      label: "About",
      sectionId: "about",
      ariaLabel: "Scroll to About section"
    },
    {
      label: "Contact",
      sectionId: "contact",
      ariaLabel: "Scroll to Contact section"
    },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com/VeLocityCodes" },
    { label: "GitHub", link: "https://github.com/velocitycodes" },
    { label: "LinkedIn", link: "https://linkedin.com/company/velocitycodes" },
    { label: "Instagram", link: "https://instagram.com/velocity.codes" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-colors duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
          }`}
      >
        {/* Left: Staggered Menu */}
        <div className="flex items-center w-1/3">
          <StaggeredMenu
            position="left"
            items={menuItems}
            socialItems={socialItems}
            accentColor="#B19EEF"
            menuButtonColor="#fff"
            openMenuButtonColor="#fff"
            changeMenuColorOnOpen={false}
            onMenuItemClick={scrollToSection}
          />
        </div>

        {/* Center: Logo - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:flex justify-center w-1/3 text-center">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <span className="text-purple-700 font-serif italic text-4xl mr-1">V</span>
            ELOCITY
            <span className="text-purple-700 font-serif italic text-4xl ml-2 mr-1">C</span>
            ODES
          </button>
        </div>

        {/* Right: Hire Us */}
        <div className="flex justify-end w-1/3">
          <button
            onClick={() => scrollToSection('contact')}
            className="rounded-full border border-white px-8 py-2 text-sm font-medium text-white transition-all hover:bg-white hover:text-black uppercase tracking-widest"
          >
            Hire Us
          </button>
        </div>
      </motion.header>
    </>
  );
}