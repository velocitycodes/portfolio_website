"use client";

import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasCompletedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-play video
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
    
    // Auto complete after 8 seconds (safety)
    const timeout = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        startFadeOut();
      }
    }, 8000);
    
    return () => clearTimeout(timeout);
  }, []);

  const startFadeOut = () => {
    setIsVisible(false);
    // Wait for fade animation to complete (500ms)
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const handleVideoEnd = () => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      startFadeOut();
    }
  };

  const handleSkip = () => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      startFadeOut();
    }
  };

  if (!isVisible) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-black transition-opacity duration-500 ease-out"
        style={{ opacity: 0 }}
      />
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black transition-opacity duration-500 ease-out"
      style={{ opacity: 1 }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      >
        <source src="/animations/loading-animation.mp4" type="video/mp4" />
        <source src="/animations/loading-animation.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      
      
      
    </div>
  );
}