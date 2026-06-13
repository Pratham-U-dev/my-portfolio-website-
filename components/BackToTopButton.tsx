'use client';

import React, { useEffect, useState } from 'react';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && (scrollY / docHeight) > 0.3) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-[9000] border cursor-pointer border-blue-400/30 bg-blue-400/15 backdrop-blur-md shadow-lg text-blue-400 hover:bg-blue-400/25 hover:scale-110 hover:shadow-[0_0_15px_rgba(96,165,250,0.5)] transition-all duration-300 pointer-events-auto"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.5)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.3, 0.64, 1)'
      }}
    >
      ↑
    </button>
  );
}
