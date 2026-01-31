"use client";

import { useState, useEffect, ReactNode } from 'react';
import LoadingScreen from './LoadingScreen';

interface LoadingManagerProps {
  children: ReactNode;
  onLoadingComplete?: () => void;
}

export default function LoadingManager({ children, onLoadingComplete }: LoadingManagerProps) {
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
      // Notify parent that loading is complete
      if (onLoadingComplete) {
        onLoadingComplete();
      }
      // Dispatch event for Locomotive Scroll initialization
      setTimeout(() => {
        window.dispatchEvent(new Event('loadingComplete'));
      }, 100);
    } else {
      // New visitor - show loading
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
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
      // Restore body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  const handleComplete = () => {
    setIsLoading(false);

    // Notify parent component about loading completion
    if (onLoadingComplete) {
      onLoadingComplete();
    }

    // Wait 500ms before showing content to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
      // Restore body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      
      // Mark as seen in session storage
      sessionStorage.setItem('hasSeenLoading', 'true');
      
      // Dispatch event for Locomotive Scroll initialization
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.dispatchEvent(new Event('loadingComplete'));
        
        // Additional event for Locomotive Scroll update after animations
        setTimeout(() => {
          const updateEvent = new CustomEvent('locomotiveUpdate', {
            detail: { type: 'loadingComplete' }
          });
          window.dispatchEvent(updateEvent);
        }, 300);
      }, 100);
    }, 500);
  };

  // Handle Locomotive Scroll updates on route changes
  useEffect(() => {
    if (!showContent) return;

    const handleRouteChange = () => {
      // Dispatch event to update Locomotive Scroll
      setTimeout(() => {
        const updateEvent = new CustomEvent('locomotiveUpdate', {
          detail: { type: 'routeChange' }
        });
        window.dispatchEvent(updateEvent);
      }, 100);
    };

    // Listen to popstate for browser back/forward
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [showContent]);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleComplete} />}

      {/* Content with locomotive scroll section */}
      <div
        data-scroll-section
        className={`transition-all duration-700 ease-out ${
          showContent
            ? 'opacity-100'
            : 'opacity-0'
        }`}
        style={{
          display: showContent ? 'block' : 'none',
          minHeight: '100vh',
          willChange: 'opacity'
        }}
      >
        {children}
      </div>

      {/* Global styles for locomotive scroll during loading */}
      <style jsx global>{`
        /* Prevent scroll during loading */
        body.loading-active {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
          height: 100% !important;
        }

        /* Ensure locomotive scroll container is properly sized */
        [data-scroll-container] {
          min-height: 100vh;
        }

        /* Smooth opacity transitions */
        .loading-transition {
          transition: opacity 0.7s ease-out;
        }

        /* Hide scrollbar during loading */
        body:has(.loading-active) .c-scrollbar {
          opacity: 0 !important;
        }
      `}</style>
    </>
  );
}