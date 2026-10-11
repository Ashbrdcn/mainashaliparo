import React from 'react';
import { ThemeMode } from '../types';
import { AshLogo } from './AshLogo';

interface ZentixArtworkProps {
  theme: ThemeMode;
  onClick?: () => void;
  className?: string;
}

export const ZentixArtwork: React.FC<ZentixArtworkProps> = ({ theme, onClick, className = '' }) => {
  const isLight = theme === 'monochrome-light';

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`group cursor-pointer p-2.5 sm:p-3 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1.5 select-none border ${
        isLight
          ? 'bg-white text-zinc-950 border-zinc-200/90 shadow-[0_20px_40px_rgba(0,0,0,0.08)]'
          : 'bg-[#121216] text-white border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]'
      } ${className}`}
      aria-label="View Zentix Full-Stack & Industrial Design case study"
    >
      {/* Top artwork container */}
      <div className={`relative aspect-square w-40 sm:w-48 md:w-52 overflow-hidden rounded-lg ${
        isLight 
          ? 'bg-zinc-100' 
          : 'bg-zinc-900'
      } flex items-center justify-center`}>
        {/* Gallery lighting gradient */}
        <div 
          className={`absolute inset-0 ${
            isLight
              ? 'bg-gradient-to-tr from-zinc-200 via-zinc-100 to-zinc-50'
              : 'bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800'
          }`} 
        />

        {/* Podium base */}
        <div className={`absolute bottom-3 inset-x-4 h-9 rounded-md backdrop-blur-[1px] transform -skew-x-12 ${
          isLight ? 'bg-zinc-300/40' : 'bg-black/30'
        }`} />

        {/* Ash Logo Watermark Stamp on Artwork Picture (Requested by user) */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white">
          <AshLogo className="w-3.5 h-3.5" />
          <span className="text-[9px] font-mono tracking-wider font-bold">ASH.DEV</span>
        </div>

        {/* Minimalist circular sculpture representing tactile geometry */}
        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="ringGradAsh" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#e4e4e7" />
                <stop offset="70%" stopColor="#a1a1aa" />
                <stop offset="100%" stopColor="#52525b" />
              </linearGradient>
            </defs>

            {/* Torus ring */}
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="url(#ringGradAsh)"
              strokeWidth="16"
            />
            {/* Highlight rim */}
            <path
              d="M 24 35 A 34 34 0 0 1 76 35"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Interactive hover hint */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <span className="text-[11px] tracking-widest uppercase font-mono font-bold text-white px-3 py-1.5 bg-black/80 rounded-md border border-white/20 shadow-lg">
            Inspect Case Study ↗
          </span>
        </div>
      </div>

      {/* Card Caption / Metadata with high-contrast text in all modes */}
      <div className="mt-3 px-1 pb-0.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-zinc-950' : 'bg-white'}`} />
          <span className={`text-xs font-mono font-bold tracking-wider ${isLight ? 'text-zinc-950' : 'text-white'}`}>
            ZENTIX
          </span>
        </div>
        <span className={`text-xs font-mono ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
          Full-Stack & UX
        </span>
      </div>
    </div>
  );
};
