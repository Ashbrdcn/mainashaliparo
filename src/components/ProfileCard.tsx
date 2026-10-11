import React, { useState, useRef } from 'react';
import { ThemeMode } from '../types';
import { AshLogo } from './AshLogo';
import { AshSticker } from './AshSticker';
import { Upload, RotateCcw } from 'lucide-react';

interface ProfileCardProps {
  theme: ThemeMode;
  onClick?: () => void;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ theme, onClick, className = '' }) => {
  const isLight = theme === 'monochrome-light';

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistent storage for custom uploaded image file
  const [photoUrl, setPhotoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('ash_profile_photo');
    } catch {
      return null;
    }
  });

  const loadFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoUrl(result);
        try {
          localStorage.setItem('ash_profile_photo', result);
        } catch {
          // ignore
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadFile(file);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoUrl(null);
    try {
      localStorage.removeItem('ash_profile_photo');
    } catch {
      // ignore
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

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
      className={`group cursor-pointer p-3 rounded-2xl shadow-2xl transition-all duration-300 hover:-translate-y-2 select-none border ${
        isLight
          ? 'bg-[#f7f5ee] text-[#1c1917] border-[#ded9cb] shadow-[0_20px_40px_rgba(0,0,0,0.04)]'
          : 'bg-[#121216] text-white border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]'
      } ${className}`}
      aria-label="Jhon Bon Ashley Aliparo profile card"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Container Featuring the Die-Cut Sticker */}
      <div
        className={`relative aspect-[4/4.8] w-48 sm:w-56 md:w-64 overflow-hidden rounded-xl ${
          isLight 
            ? 'bg-[#ebe6da]' 
            : 'bg-zinc-900'
        } flex items-center justify-center p-3`}
      >
        {/* Subtle gallery background gradient */}
        <div 
          className={`absolute inset-0 ${
            isLight
              ? 'bg-gradient-to-tr from-[#e3ded2] via-[#ebe6da] to-[#f4f1ea]'
              : 'bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800'
          }`} 
        />

        {/* Ash Logo Watermark Stamp on Picture */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-md">
          <AshLogo className="w-3.5 h-3.5 text-white" />
          <span className="text-[9px] font-mono tracking-wider font-bold">ASH · VERIFIED</span>
        </div>

        {/* Swap / Reset controls */}
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1">
          <button
            onClick={triggerUpload}
            title="Upload custom image file"
            className="px-2 py-1 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 text-[9px] font-mono cursor-pointer backdrop-blur-md transition-all shadow flex items-center gap-1"
          >
            <Upload className="w-2.5 h-2.5" />
            <span>{photoUrl ? 'Swap' : 'Upload'}</span>
          </button>
          {photoUrl && (
            <button
              onClick={handleResetPhoto}
              title="Reset to default sticker"
              className="p-1 rounded-full bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
            </button>
          )}
        </div>

        {/* 
          The Sticker Render (Matches the uploaded sticker: die-cut white border + drop shadow + anime style)
        */}
        <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Jhon Bon Ashley Aliparo Sticker"
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain drop-shadow-[0_16px_25px_rgba(0,0,0,0.5)]"
            />
          ) : (
            <AshSticker className="w-full max-h-full" />
          )}
        </div>

        {/* Hover preview tooltip */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px] pointer-events-none z-10">
          <span className="text-[11px] tracking-widest uppercase font-mono font-bold text-white px-3 py-1.5 bg-black/80 rounded-md border border-white/20 shadow-lg">
            View Bio Modal ↗
          </span>
        </div>
      </div>

      {/* Card Caption / Full Name: Jhon Bon Ashley Aliparo */}
      <div className="mt-3.5 px-1 pb-1 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-[#1c1917]' : 'bg-amber-400'}`} />
            <h3 className={`text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
              Jhon Bon Ashley Aliparo
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className={`${isLight ? 'text-[#57534e]' : 'text-zinc-400'}`}>
            Full-Stack · UI/UX · Graphics
          </span>
          <span className="text-zinc-500 font-semibold">/Ash</span>
        </div>
      </div>
    </div>
  );
};
