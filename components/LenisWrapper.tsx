"use client";

import { ReactLenis } from 'lenis/react';

interface LenisWrapperProps {
  children: React.ReactNode;
}

export default function LenisWrapper({ children }: LenisWrapperProps) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}