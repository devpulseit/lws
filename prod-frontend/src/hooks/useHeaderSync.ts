import { useState, useEffect } from 'react';

export const useHeaderSync = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      // Calculate offset based on header height change
      // Header changes from h-24 (96px) to h-16 (64px) = 32px difference
      const maxOffset = 32;
      const scrollProgress = Math.min(window.scrollY / 50, 1);
      setHeaderOffset(scrollProgress * maxOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrolled, headerOffset };
};