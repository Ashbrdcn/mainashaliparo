import React, { useEffect } from 'react';
import { X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../types';
import { AshLogo } from './AshLogo';

interface MobileSlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenContact: () => void;
}

export const MobileSlideMenu: React.FC<MobileSlideMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
  theme,
  onThemeChange,
  onOpenContact,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const navLinks = [
    { id: 'hero', label: 'Home', number: '01' },
    { id: 'about', label: 'About & Skills', number: '02' },
    { id: 'works', label: 'Selected Works', number: '03' },
    { id: 'services', label: 'Services & Stack', number: '04' },
    { id: 'contact', label: 'Contact', number: '05' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Navigation Menu">
      {/* 
        Faded black backdrop overlay:
        Turns the screen faded black with smooth opacity transition and blur 
      */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        aria-hidden="true"
      />

      {/* Slide-out Menu Panel */}
      <div 
        className="relative z-10 w-full max-w-sm sm:max-w-md h-full bg-[#0a0a0c] text-white border-l border-zinc-800 shadow-2xl flex flex-col justify-between p-6 sm:p-8 transform transition-transform duration-300 ease-out overflow-y-auto"
      >
        {/* Top Header of slide-out menu */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <AshLogo className="w-7 h-7 text-white" />
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white block leading-none">
                ASH
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                Full-Stack · UI/UX · Graphic Design
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear, Easy-to-Tap Navigation Links */}
        <nav className="py-8 flex flex-col gap-2.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onSelectSection(link.id);
                  onClose();
                }}
                className={`group w-full min-h-[60px] px-4 py-3.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-zinc-950 font-bold shadow-md'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900/90 active:bg-zinc-800'
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={`text-xs font-mono tabular-nums ${
                      isActive ? 'text-zinc-600' : 'text-zinc-500 group-hover:text-zinc-400'
                    }`}
                  >
                    {link.number}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold tracking-tight">
                    {link.label}
                  </span>
                </div>

                <ArrowUpRight
                  className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isActive ? 'text-zinc-950' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions: Prominent CTA & Palette Switcher */}
        <div className="pt-6 border-t border-zinc-800/80 space-y-5">
          {/* Prominent CTA Button */}
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="w-full min-h-[52px] px-6 py-3.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 active:scale-[0.98] font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>Start a Project with Ash</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Palette Switcher */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Color Theme Mode
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onThemeChange('monochrome-dark')}
                className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                  theme === 'monochrome-dark'
                    ? 'bg-zinc-800 border-white text-white font-semibold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="text-[10px]">Noir Dark</span>
              </button>

              <button
                onClick={() => onThemeChange('monochrome-light')}
                className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                  theme === 'monochrome-light'
                    ? 'bg-zinc-800 border-white text-white font-semibold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="text-[10px]">Pure Light</span>
              </button>
            </div>
          </div>

          {/* Quick Contact Info */}
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>ashaliparo@gmail.com</span>
            <span>©2026 ASH</span>
          </div>
        </div>
      </div>
    </div>
  );
};
