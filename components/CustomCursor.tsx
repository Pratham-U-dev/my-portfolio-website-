'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const ringPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Trail state
  const trail = useRef<{x: number, y: number}[]>([]);
  const numNodes = 20;

  useEffect(() => {
    // Init trail array
    trail.current = Array.from({ length: numNodes }, () => ({ x: -100, y: -100 }));
    
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Check for hover
      const target = e.target as HTMLElement;
      const isLinkOrBtn = target.closest('a') !== null || target.closest('button') !== null || target.classList.contains('btn-custom') || target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea';
      setIsHovering(isLinkOrBtn);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    
    const onMouseLeave = () => {
      setIsVisible(false);
    };
    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  useEffect(() => {
    let hue = 0;

    const update = () => {
      // Lerp ring
      ringPos.current.x += (position.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (position.y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Physics trail
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx && canvasRef.current) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        hue += 2;
        if (hue > 360) hue = 0;

        let lastX = position.x;
        let lastY = position.y;

        for (let i = 0; i < numNodes; i++) {
          const node = trail.current[i];
          
          if (node.x === -100) {
            node.x = lastX;
            node.y = lastY;
          }

          node.x += (lastX - node.x) * 0.4;
          node.y += (lastY - node.y) * 0.4;

          // Draw segment
          if (i > 0 && isVisible) {
            const prev = trail.current[i - 1];
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `hsla(${hue + i * 5}, 50%, 50%, ${0.2 * (1 - i / numNodes)})`;
            ctx.lineWidth = 14 * (1 - i / numNodes);
            ctx.lineCap = 'round';
            ctx.globalCompositeOperation = 'lighter';
            ctx.stroke();
          }

          lastX = node.x;
          lastY = node.y;
        }
      }

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isVisible]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9997,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isClicking ? '20px' : isHovering ? '60px' : '36px',
          height: isClicking ? '20px' : isHovering ? '60px' : '36px',
          border: isHovering ? 'none' : '1.5px solid rgba(96,165,250,0.5)',
          backgroundColor: isHovering ? 'rgba(96,165,250,0.08)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, background 0.2s, background-color 0.2s, opacity 0.3s',
          transform: 'translate(-50%, -50%)',
          willChange: 'width, height, transform',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: isHovering ? '14px' : '10px',
          height: isHovering ? '14px' : '10px',
          backgroundColor: '#60a5fa',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s, height 0.15s, opacity 0.3s',
          willChange: 'width, height, top, left'
        }}
      />
    </>
  );
}
