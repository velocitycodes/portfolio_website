"use client";

import { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  isFadingOut: boolean;
  completeLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  isFadingOut: false,
  completeLoading: () => {},
});

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Check if loading was already shown
    const hasSeenLoading = sessionStorage.getItem('velocity_codes_loading_seen');
    
    if (hasSeenLoading) {
      // Already visited - skip loading immediately
      setIsLoading(false);
    }
    
    setHasInitialized(true);
  }, []);

  const completeLoading = () => {
    // Start fade out
    setIsFadingOut(true);
    
    // Wait for fade animation to complete
    setTimeout(() => {
      setIsLoading(false);
      setIsFadingOut(false);
      sessionStorage.setItem('velocity_codes_loading_seen', 'true');
    }, 800);
  };

  if (!hasInitialized) {
    return null;
  }

  return (
    <LoadingContext.Provider value={{ isLoading, isFadingOut, completeLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}