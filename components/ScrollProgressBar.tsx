'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setWidth(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-[2px] z-[9999]"
      style={{
        width: `${width}%`,
        background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
        boxShadow: width > 0 ? '0 0 6px rgba(96,165,250,0.6)' : 'none',
        transition: 'width 0.1s ease-out'
      }}
    />
  );
}
