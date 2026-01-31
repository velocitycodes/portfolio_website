"use client";

import { useState, useEffect, useRef } from "react";

const TallOuterContainer = ({ dynamicHeight, children }) => (
  <div 
    style={{ height: `${dynamicHeight}px` }}
    className="relative w-full"
  >
    {children}
  </div>
);

const StickyInnerContainer = ({ children, containerRef }) => (
  <div 
    ref={containerRef}
    className="sticky top-0 h-screen w-full overflow-x-hidden"
  >
    {children}
  </div>
);

const HorizontalTranslateContainer = ({ translateX, children, objectRef }) => (
  <div 
    ref={objectRef}
    style={{ transform: `translateX(${translateX}px)` }}
    className="absolute h-full will-change-transform"
  >
    {children}
  </div>
);

const calcDynamicHeight = (objectWidth) => {
  if (typeof window === 'undefined') return 0;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return objectWidth - vw + vh + 150;
};

export default function HorizontalScroll({ children }) {
  const [dynamicHeight, setDynamicHeight] = useState(null);
  const [translateX, setTranslateX] = useState(0);

  const containerRef = useRef(null);
  const objectRef = useRef(null);

  const resizeHandler = () => {
    const objectWidth = objectRef.current.scrollWidth;
    const dynamicHeight = calcDynamicHeight(objectWidth);
    setDynamicHeight(dynamicHeight);
  };

  useEffect(() => {
    // Calculate initial height
    const objectWidth = objectRef.current.scrollWidth;
    const dynamicHeight = calcDynamicHeight(objectWidth);
    setDynamicHeight(dynamicHeight);

    // Add scroll listener
    const handleScroll = () => {
      if (containerRef.current) {
        const offsetTop = -containerRef.current.offsetTop;
        setTranslateX(offsetTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <TallOuterContainer dynamicHeight={dynamicHeight}>
      <StickyInnerContainer containerRef={containerRef}>
        <HorizontalTranslateContainer translateX={translateX} objectRef={objectRef}>
          {children}
        </HorizontalTranslateContainer>
      </StickyInnerContainer>
    </TallOuterContainer>
  );
}