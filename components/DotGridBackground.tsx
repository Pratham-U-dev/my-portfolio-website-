'use client';

import React, { useEffect, useRef } from 'react';

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return; // Optional logic for mobile

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    
    // Config
    const SPACING = 25;
    const RADIUS = 1.2;
    const COLOR = 'rgba(57, 94, 139, 1)';
    
    let dots: {x: number, y: number, phase: number}[] = [];
    let mouse = { x: -1000, y: -1000 };
    let ripples: {x: number, y: number, time: number, intensity: number}[] = [];

    const initGrid = () => {
      dots = [];
      for (let x = 0; x < width; x += SPACING) {
        for (let y = 0; y < height; y += SPACING) {
          dots.push({
            x,
            y,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initGrid();
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const onMouseDown = (e: MouseEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, time: performance.now(), intensity: 2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    let reqId: number;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Clean old ripples (older than 3000ms)
      ripples = ripples.filter(r => time - r.time < 3000);

      dots.forEach(dot => {
        let size = 0.5 + Math.sin(time * 0.001 + dot.phase) * 0.3;
        let opacity = 0.2 + Math.abs(Math.sin(time * 0.0005 + dot.phase)) * 0.1;

        // Mouse influence
        const dist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
        if (dist < 150) {
          const influence = 1 - dist / 150;
          size += influence * 1.5;
          opacity += influence * 0.5;
        }

        // Ripples
        ripples.forEach(r => {
          const age = time - r.time;
          const ringRadius = (age / 3000) * 300;
          const distToRipple = Math.hypot(dot.x - r.x, dot.y - r.y);
          
          if (Math.abs(distToRipple - ringRadius) < 30) {
            // Inside the 60px ring
            const rippleInfluence = 1 - Math.abs(distToRipple - ringRadius) / 30;
            size += rippleInfluence * r.intensity;
            opacity += rippleInfluence * 0.3;
          }
        });

        if (opacity > 1) opacity = 1;
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size * RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 94, 139, ${opacity})`;
        ctx.fill();
      });

      reqId = requestAnimationFrame(draw);
    };

    reqId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
