'use client';

import React, { useEffect, useState, useRef } from 'react';

const greetings = ["HELLO", "HOLA", "BONJOUR", "NAMASTE"];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exitAnim, setExitAnim] = useState(false);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [catFrame, setCatFrame] = useState(0);
  const [catState, setCatState] = useState<'sitting' | 'walking'>('sitting');
  const [catPos, setCatPos] = useState(0); // Offset X
  
  useEffect(() => {
    // Progress
    const startTime = performance.now();
    const duration = 6500;
    
    let reqId: number;
    const updateProgress = (time: number) => {
      let p = ((time - startTime) / duration) * 100;
      if (p >= 100) {
        setProgress(100);
        setTimeout(() => {
          setExitAnim(true);
          setTimeout(() => setVisible(false), 800);
        }, 400);
      } else {
        setProgress(p);
        reqId = requestAnimationFrame(updateProgress);
      }
    };
    reqId = requestAnimationFrame(updateProgress);
    
    return () => cancelAnimationFrame(reqId);
  }, []);

  useEffect(() => {
    // Typewriter
    let timeoutId: any;
    let isDeleting = false;
    let text = "";
    
    const type = () => {
      const word = greetings[currentWordIdx % greetings.length];
      if (!isDeleting) {
        text = word.substring(0, text.length + 1);
        setDisplayedText(text);
        if (text === word) {
          isDeleting = true;
          timeoutId = setTimeout(type, 900);
        } else {
          timeoutId = setTimeout(type, 80);
        }
      } else {
        text = word.substring(0, text.length - 1);
        setDisplayedText(text);
        if (text === "") {
          isDeleting = false;
          setCurrentWordIdx(c => c + 1);
          timeoutId = setTimeout(type, 300);
        } else {
          timeoutId = setTimeout(type, 50);
        }
      }
    };
    timeoutId = setTimeout(type, 500);
    return () => clearTimeout(timeoutId);
  }, [currentWordIdx]);

  useEffect(() => {
    // Cat logic
    const stateTimer = setTimeout(() => {
      setCatState('walking');
    }, 2500);

    const animTimer = setInterval(() => {
      setCatFrame(f => (f + 1) % 4);
      if (catState === 'walking') {
        setCatPos(p => p + 4);
      }
    }, 80);

    return () => {
      clearTimeout(stateTimer);
      clearInterval(animTimer);
    };
  }, [catState]);

  if (!visible) return null;

  return (
    <div
      suppressHydrationWarning
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, background: '#000000',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: exitAnim ? 0 : 1, transition: 'opacity 0.8s ease',
        backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px', borderRadius: '50%', filter: 'blur(120px)',
        background: 'radial-gradient(ellipse, rgba(96,165,250,0.12), transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ animation: 'fadeUp 1s ease 0.3s both' }} className="flex flex-col items-center z-10">
        <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, textShadow: '0 0 40px rgba(96,165,250,0.3), 0 0 80px rgba(96,165,250,0.1)' }}>
          Pratham U
        </h1>
        <div style={{ height: '30px', marginTop: '10px' }} className="text-zinc-400 font-mono text-lg flex items-center">
          {displayedText}<span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse" />
        </div>
      </div>

      <div className="absolute bottom-32 w-[280px] z-10" style={{ animation: 'fadeUp 1s ease 0.6s both' }}>
        <div className="flex justify-between text-xs text-zinc-600 font-mono mb-2">
          <span>LOADING</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="w-full h-[1px] bg-zinc-900 rounded-full relative">
          <div className="absolute inset-y-0 left-0 bg-blue-400" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, rgba(96,165,250,0.6), rgba(96,165,250,1))', boxShadow: '0 0 8px rgba(96,165,250,0.6)' }} />
        </div>
      </div>
      
      {/* Walking Cat */}
      <div className="absolute bottom-16 z-10" style={{ left: '50%', transform: `translateX(calc(-50% + ${catPos}px))` }}>
        <svg width="80" height="70" viewBox="0 0 80 70">
           {catState === 'sitting' ? (
             <g>
               {/* Body */}
               <path d="M30 40 Q40 30 50 40 Q55 50 50 60 L30 60 Q25 50 30 40 Z" fill="#1e293b"/>
               {/* Ears */}
               <path d="M32 25 L38 28 L35 35 Z" fill="#1e293b"/>
               <path d="M48 25 L42 28 L45 35 Z" fill="#1e293b"/>
               {/* Head */}
               <circle cx="40" cy="35" r="8" fill="#1e293b"/>
               {/* Eyes */}
               <path d="M36 33 Q38 31 39 33" stroke="#60a5fa" strokeWidth="1" fill="none" />
               <path d="M44 33 Q42 31 41 33" stroke="#60a5fa" strokeWidth="1" fill="none" />
               {/* Tail */}
               <path d="M50 55 Q60 50 65 40" stroke="#1e293b" strokeWidth="4" fill="none" style={{ transformOrigin: '50px 55px', transform: `rotate(${Math.sin(catFrame/2)*20}deg)` }}/>
             </g>
           ) : (
             <g>
               {/* Walking pose */}
               {/* Body */}
               <ellipse cx="40" cy="45" rx="15" ry="8" fill="#1e293b" />
               {/* Head */}
               <circle cx="55" cy="40" r="6" fill="#1e293b" />
               {/* Ears */}
               <path d="M53 34 L56 37 L58 35 Z" fill="#1e293b"/>
               {/* Legs */}
               <line x1="30" y1="50" x2={30 + (catFrame%2===0?2:-2)} y2="60" stroke="#1e293b" strokeWidth="3" />
               <line x1="35" y1="50" x2={35 + (catFrame%2===0?-2:2)} y2="60" stroke="#1e293b" strokeWidth="3" />
               <line x1="48" y1="50" x2={48 + (catFrame%2===0?2:-2)} y2="60" stroke="#1e293b" strokeWidth="3" />
               <line x1="53" y1="50" x2={53 + (catFrame%2===0?-2:2)} y2="60" stroke="#1e293b" strokeWidth="3" />
               {/* Tail */}
               <path d="M25 45 Q15 40 10 50" stroke="#1e293b" strokeWidth="3" fill="none" />
             </g>
           )}
        </svg>
      </div>

      <button onClick={() => { setExitAnim(true); setTimeout(() => setVisible(false), 600); }} className="absolute bottom-6 text-xs text-zinc-700 hover:text-zinc-400 cursor-pointer z-20">
        SKIP
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px) scale(0.7); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
}
