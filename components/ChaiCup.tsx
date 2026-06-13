'use client';

import React from 'react';

export default function ChaiCup({ submitted }: { submitted: boolean }) {
  const strokeColor = submitted ? 'rgba(96,165,250,0.5)' : 'rgba(96,165,250,0.1)';
  const cupFill = submitted ? 'rgba(96,165,250,0.18)' : 'rgba(96,165,250,0.08)';
  const cupStroke = submitted ? 'rgba(96,165,250,0.7)' : 'rgba(96,165,250,0.35)';

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Orbit Ring on Submit */}
      {submitted && (
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            width: '210px', height: '210px',
            border: '1px solid rgba(96, 165, 250, 0.25)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'axisRotate 3s linear infinite'
          }}
        />
      )}

      <svg 
        viewBox="0 0 150 150" 
        width="100%" 
        height="100%"
        style={{
          animation: submitted ? 'axisRotate 1.1s cubic-bezier(0.4, 0, 0.2, 1) once' : 'none',
          filter: submitted ? 'drop-shadow(0 0 10px rgba(96,165,250,0.4))' : 'none',
          transition: 'all 0.5s ease'
        }}
      >
        <defs>
          {/* Steam Wavy Paths */}
          <path id="steam-path-1" d="M 65 50 Q 60 40 65 30 T 65 10" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path id="steam-path-2" d="M 75 50 Q 80 40 75 30 T 75 10" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path id="steam-path-3" d="M 85 50 Q 80 40 85 30 T 85 10" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </defs>

        <style>
          {`
            @keyframes axisRotate {
              from { transform: rotateY(0deg); }
              to { transform: rotateY(360deg); }
            }
            @keyframes steamFade {
              0% { opacity: 0; }
              50% { opacity: 0.6; }
              100% { opacity: 0; }
            }
            .steam-1 { animation: steamFade 2s infinite; animation-delay: 0s; }
            .steam-2 { animation: steamFade 2.4s infinite; animation-delay: 0.4s; }
            .steam-3 { animation: steamFade 2.2s infinite; animation-delay: 0.8s; }
          `}
        </style>

        {/* Mandala Rings */}
        <circle cx="75" cy="75" r="68" stroke={strokeColor} strokeWidth="1" fill="none" className="transition-colors duration-500" />
        <circle cx="75" cy="75" r="55" stroke={strokeColor} strokeWidth="1" fill="none" className="transition-colors duration-500" />
        <circle cx="75" cy="75" r="42" stroke={strokeColor} strokeWidth="1" fill="none" className="transition-colors duration-500" />
        
        {/* Spokes (12 of them) */}
        {Array.from({length: 12}).map((_, i) => (
          <line 
            key={i}
            x1="75" y1="33" x2="75" y2="7" 
            stroke={strokeColor} strokeWidth="1"
            transform={`rotate(${i * 30} 75 75)`}
            className="transition-colors duration-500"
          />
        ))}

        {/* Orbit Dots (8) */}
        {Array.from({length: 8}).map((_, i) => (
          <circle 
            key={i}
            cx="75" cy="4" r="2" 
            fill={strokeColor}
            transform={`rotate(${i * 45} 75 75)`}
            className="transition-colors duration-500"
          />
        ))}

        {/* Steam */}
        <use href="#steam-path-1" className="steam-1" style={{ opacity: submitted ? 1 : undefined }} />
        <use href="#steam-path-2" className="steam-2" style={{ opacity: submitted ? 1 : undefined }} />
        <use href="#steam-path-3" className="steam-3" style={{ opacity: submitted ? 1 : undefined }} />

        {/* Cup Handle */}
        <path d="M 90 75 Q 120 75 110 100 Q 100 115 88 105" fill="none" stroke={cupStroke} strokeWidth="4" strokeLinecap="round" className="transition-colors duration-500" />
        
        {/* Cup Body (Trapezoid) */}
        <path d="M 50 60 L 100 60 L 92 115 C 90 120 60 120 58 115 Z" fill={cupFill} stroke={cupStroke} strokeWidth="2" className="transition-colors duration-500" />
        
        {/* Cup Rim top */}
        <ellipse cx="75" cy="60" rx="25" ry="8" fill={cupFill} stroke={cupStroke} strokeWidth="2" className="transition-colors duration-500" />
        
        {/* Tea Surface inside */}
        <ellipse cx="75" cy="62" rx="20" ry="5" fill="#453127" opacity="0.8" />

        {/* Cup Center Mandala */}
        <circle cx="75" cy="90" r="8" stroke={strokeColor} strokeWidth="1" fill="none" />
        <circle cx="75" cy="90" r="2" fill={strokeColor} />
        {Array.from({length: 6}).map((_, i) => (
          <line 
            key={i}
            x1="75" y1="84" x2="75" y2="82" 
            stroke={strokeColor} strokeWidth="1.5"
            transform={`rotate(${i * 60} 75 90)`}
          />
        ))}

      </svg>
    </div>
  );
}
