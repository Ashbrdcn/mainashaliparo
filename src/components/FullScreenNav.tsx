import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, Sun, Moon, Copy, Check, Github, Facebook, Linkedin, Instagram } from 'lucide-react';
import { ThemeMode } from '../types';

interface FullScreenNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenContact: () => void;
}

export const FullScreenNav: React.FC<FullScreenNavProps> = ({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
  theme,
  onThemeChange,
  onOpenContact,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimated, setIsAnimated] = useState(false);

  const isLight = theme === 'monochrome-light';

  // Handle enter and exit animation lifecycle
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setIsRendered(true);
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsAnimated(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    } else {
      setIsAnimated(false);
      timer = setTimeout(() => {
        setIsRendered(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Lock body scroll and handle Escape key
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

  const copyEmail = () => {
    navigator.clipboard.writeText('ashaliparo@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navItems = [
    { id: 'hero', number: '01', label: 'HOME' },
    { id: 'works', number: '02', label: 'PROJECTS' },
    { id: 'services', number: '03', label: 'SERVICES' },
    { id: 'about', number: '04', label: 'ABOUT ME' },
    { id: 'contact', number: '05', label: 'CONTACT' },
  ];

  if (!isRendered) return null;

  // Dynamic hover colors per theme
  const getHoverClasses = (isActive: boolean) => {
    if (isLight) {
      return isActive
        ? 'text-white font-black drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'
        : 'text-zinc-200 hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]';
    }
    return isActive
      ? 'text-white font-black drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]'
      : 'text-zinc-300 hover:text-white hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]';
  };

  const getCrosshairColor = (isActive: boolean) => {
    if (isLight) return isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white';
    return isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white';
  };

  return (
    <div
      onClick={(e) => {
        // Close if user clicks the backdrop background itself
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={`fixed inset-0 z-50 overflow-y-auto flex flex-col justify-between transition-all duration-500 ease-out ${
        isAnimated
          ? 'bg-black/65 backdrop-blur-md opacity-100'
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Overlay"
    >
      {/* 
        ========================================================================
        TOP HEADER: BRAND LOGO + THEME TOGGLE + CLOSE BUTTON
        ========================================================================
      */}
      <header
        className={`w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between gap-6 transition-all duration-500 ease-out ${
          isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        {/* Brand Lockup - Just ASH */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white leading-none">
            ASH
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-300/80 pl-3 border-l border-zinc-700/80">
            Jhon Bon Ashley Aliparo
          </span>
        </div>

        {/* Controls: Mode Switcher + Close Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Color Mode Switcher - High visibility (Noir Dark vs Pure Light) */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-900/90 border border-zinc-700 shadow-xl ring-1 ring-white/10 backdrop-blur-md">
            <button
              onClick={() => onThemeChange('monochrome-dark')}
              title="Monochrome Noir Dark"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                theme === 'monochrome-dark'
                  ? 'bg-white text-zinc-950 shadow-md ring-2 ring-white/90 scale-105'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Monochrome Dark Mode"
              aria-checked={theme === 'monochrome-dark'}
              role="radio"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onThemeChange('monochrome-light')}
              title="Monochrome Pure Light"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                theme === 'monochrome-light'
                  ? 'bg-zinc-100 text-zinc-950 shadow-md ring-2 ring-zinc-300 scale-105 font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Monochrome Light Mode"
              aria-checked={theme === 'monochrome-light'}
              role="radio"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Close Button (✕) with animated rotation on hover */}
          <button
            onClick={onClose}
            className="group w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-500 active:scale-95 transition-all cursor-pointer shadow-lg"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>
      </header>

      {/* 
        ========================================================================
        MAIN STAGE: NAV ITEMS (SLIDE IN 1 BY 1) & CONTACT INFO CARD
        ========================================================================
      */}
      <main className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-12 flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">
        
        {/* Left Column: Navigation links - Staggered 1 by 1 entrance */}
        <div className="w-full lg:max-w-md xl:max-w-lg flex-1 flex flex-col space-y-2 sm:space-y-3">
          <div
            className={`text-[11px] font-mono uppercase tracking-widest text-zinc-300 mb-2 flex items-center gap-2 transition-all duration-500 ${
              isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Directory Navigation
          </div>

          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            // 1-by-1 staggered slide calculation
            const itemDelayMs = index * 90 + 120; // 120ms, 210ms, 300ms, 390ms, 480ms

            return (
              <div
                key={item.id}
                style={{
                  transitionDelay: isAnimated ? `${itemDelayMs}ms` : '0ms',
                }}
                className={`group flex items-center justify-between cursor-pointer py-2 px-3.5 -mx-3.5 rounded-2xl hover:bg-white/[0.08] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isAnimated
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-16 sm:translate-x-24'
                }`}
                onClick={() => {
                  onSelectSection(item.id);
                  onClose();
                }}
              >
                {/* Left Label with Index Prefix */}
                <div className="flex items-baseline gap-3.5 sm:gap-5 transition-transform duration-300 ease-out group-hover:translate-x-3">
                  <span className="font-mono text-xs sm:text-sm text-zinc-400 font-semibold tracking-wider">
                    {item.number}
                  </span>
                  <span
                    className={`font-display tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-none transition-all duration-300 select-none ${getHoverClasses(
                      isActive
                    )}`}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Crosshairs (+) Indicator */}
                <span
                  className={`font-mono text-xl sm:text-2xl font-light transition-all duration-300 ease-out transform group-hover:rotate-90 group-hover:scale-125 select-none ${getCrosshairColor(
                    isActive
                  )}`}
                >
                  +
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dedicated Contact Info Card (Updated: No work hours, No Q2/Q3, New Phone, Facebook) */}
        <div
          style={{
            transitionDelay: isAnimated ? '400ms' : '0ms',
          }}
          className={`w-full lg:w-[350px] xl:w-[390px] shrink-0 p-6 sm:p-7 rounded-3xl bg-zinc-950/75 border border-white/10 backdrop-blur-xl shadow-2xl space-y-5 sm:space-y-6 transition-all duration-600 ease-out ${
            isAnimated
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-12'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-300">
              Direct Contact
            </span>
          </div>

          {/* Contact Details Stack */}
          <div className="space-y-4">
            {/* Phone (+63 9517878785) */}
            <div>
              <div className="text-[11px] uppercase font-mono tracking-widest text-zinc-400 mb-1">
                Contact Phone
              </div>
              <a
                href="tel:+639517878785"
                className="text-base sm:text-lg font-bold font-mono text-white hover:text-zinc-300 transition-colors tracking-wide"
              >
                +63 9517878785
              </a>
            </div>

            {/* Email with copy button */}
            <div>
              <div className="text-[11px] uppercase font-mono tracking-widest text-zinc-400 mb-1">
                Contact Mail
              </div>
              <div className="flex items-center justify-between gap-3 bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                <a
                  href="mailto:ashaliparo@gmail.com"
                  className="text-xs sm:text-sm font-mono text-white hover:underline truncate"
                >
                  ashaliparo@gmail.com
                </a>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer shrink-0"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Consultation Button */}
          <div>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl bg-white text-zinc-950 hover:bg-zinc-200 transition-all cursor-pointer"
            >
              <span>Start Project Consultation</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Social Links & Copyright (Facebook included, Twitter removed) */}
          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3.5 text-zinc-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <span className="text-[11px] font-mono text-zinc-400">
              ©2026 ASH
            </span>
          </div>
        </div>
      </main>

      {/* Bottom subtle bar */}
      <footer className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-6 flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <span>Click outside or press ESC to close</span>
        <span className="hidden sm:inline">Portfolio System · Ash Aliparo</span>
      </footer>
    </div>
  );
};

