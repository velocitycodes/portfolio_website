"use client";

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

export default function LoadingManager({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Check if loading was shown before
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');

    if (hasSeenLoading === 'true') {
      // Already shown - skip loading
      setIsLoading(false);
      setShowContent(true);
    } else {
      // New visitor - show loading
      document.body.style.overflow = 'hidden';
    }

    setHasMounted(true);

    // Safety timeout - hide loading after 10s max
    const timeout = setTimeout(() => {
      if (isLoading) {
        handleComplete();
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = '';
    };
  }, []);

  const handleComplete = () => {
    setIsLoading(false);

    // Wait 300ms before showing content to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
      document.body.style.overflow = '';
      sessionStorage.setItem('hasSeenLoading', 'true');
    }, 300);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleComplete} />}

      {/* Content with fade-in animation */}
      <div
        className={`transition-all duration-1000 ease-out ${showContent
            ? 'opacity-100'
            : 'opacity-0 transform translate-y-4'
          }`}
        style={{
          display: showContent ? 'block' : 'none'
        }}
      >
        {children}
      </div>
    </>
  );
}