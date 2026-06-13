'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function TiltCard({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ gx: 50, gy: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Safe, doesn't trigger cascade if we check carefully, actually we can just use matchMedia
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = cursorX - centerX;
    const dy = cursorY - centerY;
    
    const rotateX = -(dy / rect.height) * 10;
    const rotateY = (dx / rect.width) * 10;
    
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    
    setGlowPos({
      gx: 50 + (dx / rect.width) * 60,
      gy: 50 + (dy / rect.height) * 60,
    });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)`;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative transform-style-3d will-change-transform ${className}`}
      style={{ ...style, transition: isHovered ? 'width 0.65s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.3s, border-color 0.3s' : 'transform 0.15s ease-out, width 0.65s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.3s, border-color 0.3s' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow Layer */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-inherit z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${glowPos.gx}% ${glowPos.gy}%, rgba(96,165,250,0.15), transparent 70%)`
        }}
      />
      {/* Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
}
