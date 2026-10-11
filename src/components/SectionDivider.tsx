import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';

export interface SectionDividerProps {
  theme: ThemeMode;
  label?: string;
  badge?: string;
  subtitle?: string;
  indexCode?: string;
  className?: string;
}

/**
 * Standardized reusable SectionDivider component.
 * Provides a clean editorial grid divider between major page sections
 * ('Projects', 'Services', 'About', 'Contact') with crosshair tick marks (+),
 * technical section labels, and smooth whileInView animations.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  theme,
  label,
  badge,
  subtitle,
  indexCode,
  className = '',
}) => {
  const isLight = theme === 'monochrome-light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: '-20px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full py-8 sm:py-12 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Editorial Horizontal Hairline */}
      <div
        className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-px transition-colors duration-500 ${
          isLight ? 'bg-[#ded8cc]' : 'bg-white/10'
        }`}
      />

      {/* Grid Intersections & Content Row */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Left Anchor: Crosshair + Section Code/Label */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span
            className={`font-mono text-xs transition-colors duration-500 font-bold select-none ${
              isLight ? 'text-[#78716c]' : 'text-white/40'
            }`}
          >
            +
          </span>

          {label && (
            <div
              className={`flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 font-bold ${
                isLight
                  ? 'bg-white border-[#ded8cc] text-[#0c0a09] shadow-xs hover:border-[#d95d39]/40'
                  : 'bg-[#09090b]/90 border-white/10 text-zinc-200 shadow-sm hover:border-white/20'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d95d39] animate-pulse shrink-0" />
              <span>{label}</span>
            </div>
          )}
        </div>

        {/* Center Editorial Pill: Category Badge (Desktop / Tablet) */}
        {badge && (
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-colors duration-300 font-bold ${
              isLight
                ? 'bg-[#f4efe4] border border-[#ded8cc] text-[#44403c]'
                : 'bg-zinc-900/80 border border-zinc-800 text-zinc-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>{badge}</span>
          </div>
        )}

        {/* Right Anchor: Subtitle / Technical Coordinate + Crosshair */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {subtitle && (
            <span
              className={`text-[10px] sm:text-[11px] font-mono tracking-wider uppercase transition-colors duration-300 font-bold ${
                isLight ? 'text-[#44403c]' : 'text-zinc-400'
              }`}
            >
              {subtitle}
            </span>
          )}

          {indexCode && (
            <span
              className={`hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                isLight
                  ? 'bg-[#f4efe4] border-[#ded8cc] text-[#78716c]'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500'
              }`}
            >
              {indexCode}
            </span>
          )}

          <span
            className={`font-mono text-xs transition-colors duration-500 font-bold select-none ${
              isLight ? 'text-[#78716c]' : 'text-white/40'
            }`}
          >
            +
          </span>
        </div>
      </div>
    </motion.div>
  );
};
