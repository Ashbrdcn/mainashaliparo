import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Maximize2,
  ZoomIn,
  Download,
  Eye,
  Palette,
  Diamond,
  FileText,
  Layers,
  Check,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { ThemeMode } from '../types';

interface GraphicSampleShowcaseProps {
  theme: ThemeMode;
  onOpenContact?: () => void;
}

type ShowcaseTab = 'board' | 'brandmark' | 'menu' | 'packaging' | 'palette';

export const GraphicSampleShowcase: React.FC<GraphicSampleShowcaseProps> = ({ theme, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('board');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const isLight = theme === 'monochrome-light';

  const handleCopyColor = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className={`w-full rounded-3xl border transition-all duration-300 overflow-hidden shadow-xl ${
      isLight
        ? 'bg-[#f7f5ee] border-[#ded9cb]'
        : 'bg-[#101014] border-zinc-800'
    }`}>
      {/* Top Showcase Navigation Bar */}
      <div className={`p-4 sm:p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isLight ? 'bg-[#edeae1] border-[#ded9cb]' : 'bg-[#141418] border-zinc-800/80'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-orange-500">
              Flagship Graphic Design Showcase
            </span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
              isLight ? 'bg-white border-[#ded9cb] text-[#292524]' : 'bg-black border-zinc-700 text-zinc-300'
            }`}>
              Vector & Print Collateral
            </span>
          </div>
          <h3 className={`text-xl sm:text-2xl md:text-3xl font-display font-extrabold tracking-tight ${
            isLight ? 'text-[#1c1917]' : 'text-white'
          }`}>
            AURA & VELOUR · Complete Brand Identity System
          </h3>
          <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
            isLight ? 'text-[#383530]' : 'text-zinc-300'
          }`}>
            Click the tabs below to explore vector brandmark construction, editorial dining menus, luxury packaging labels, and Pantone color specs.
          </p>
        </div>

        {/* Tab Switcher Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none shrink-0">
          {[
            { id: 'board' as ShowcaseTab, label: 'Brand Board', icon: Layers },
            { id: 'brandmark' as ShowcaseTab, label: 'Vector Mark & Grid', icon: Diamond },
            { id: 'menu' as ShowcaseTab, label: 'Dining Menu', icon: FileText },
            { id: 'packaging' as ShowcaseTab, label: 'Packaging Labels', icon: Compass },
            { id: 'palette' as ShowcaseTab, label: 'Color Specs', icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border shrink-0 ${
                  isActive
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md scale-105'
                    : isLight
                    ? 'bg-white/80 text-[#383530] border-[#ded9cb] hover:bg-white hover:text-[#1c1917]'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Showcase Canvas Area */}
      <div className="p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {/* TAB 1: Master Brand Board */}
          {activeTab === 'board' && (
            <motion.div
              key="board"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Primary Interactive Artwork Showcase */}
              <div className={`relative rounded-2xl border overflow-hidden p-6 sm:p-10 transition-colors shadow-inner ${
                isLight ? 'bg-gradient-to-br from-[#fbf9f4] via-[#f5f1e8] to-[#eee8dc] border-[#ded9cb]' : 'bg-gradient-to-br from-[#121217] via-[#0d0d11] to-[#08080a] border-zinc-800'
              }`}>
                {/* SVG Visual Composition of Graphic Design Showcase */}
                <svg
                  viewBox="0 0 1000 600"
                  className="w-full h-auto max-h-[580px] drop-shadow-2xl select-none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="terracottaGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#c2410c" />
                    </linearGradient>
                    <linearGradient id="goldFoil" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="50%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                    <linearGradient id="darkCard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1c1917" />
                      <stop offset="100%" stopColor="#0c0a09" />
                    </linearGradient>
                    <linearGradient id="lightCard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#f5f1ea" />
                    </linearGradient>
                    <filter id="shadowHeavy" x="-10%" y="-10%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="16" stdDeviation="16" floodOpacity="0.25" />
                    </filter>
                    <filter id="shadowSoft" x="-10%" y="-10%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.18" />
                    </filter>
                  </defs>

                  {/* Background Geometric Grid & Measurement Rules */}
                  <g opacity={isLight ? "0.35" : "0.2"}>
                    <line x1="40" y1="40" x2="960" y2="40" stroke="#f97316" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="40" y1="560" x2="960" y2="560" stroke="#f97316" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="40" y1="40" x2="40" y2="560" stroke="#f97316" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="960" y1="40" x2="960" y2="560" stroke="#f97316" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="500" y1="40" x2="500" y2="560" stroke="#f97316" strokeDasharray="2 6" strokeWidth="1" />
                  </g>

                  {/* LEFT HERO PANEL: Vector Logo Mark & Monogram on Textured Business Card */}
                  <g filter="url(#shadowHeavy)">
                    {/* Shadow & Angle Rotated Business Card 1 (Dark Velvet Finish) */}
                    <rect x="70" y="80" width="400" height="240" rx="16" fill="url(#darkCard)" stroke="#383530" strokeWidth="1.5" />
                    
                    {/* Embossed Vector Geometric Emblem */}
                    <g transform="translate(130, 140)">
                      {/* Geometric Diamond Star Logo */}
                      <path d="M70 10 L130 70 L70 130 L10 70 Z" stroke="url(#terracottaGrad)" strokeWidth="4" fill="none" />
                      <circle cx="70" cy="70" r="45" stroke="#f97316" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="70" cy="70" r="24" fill="url(#terracottaGrad)" />
                      {/* Monogram A */}
                      <path d="M62 82 L70 56 L78 82 M64 74 L76 74" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </g>

                    {/* Brand Typography Title on Card */}
                    <text x="240" y="175" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="26" letterSpacing="3">
                      AURA
                    </text>
                    <text x="240" y="200" fill="#f97316" fontFamily="monospace" fontWeight="700" fontSize="12" letterSpacing="4">
                      STUDIO & ROASTERY
                    </text>
                    <text x="240" y="228" fill="#a8a29e" fontFamily="monospace" fontSize="11" letterSpacing="1">
                      EST. 2024 · VECTOR BRANDMARK
                    </text>
                    <line x1="240" y1="242" x2="430" y2="242" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.6" />
                    <text x="240" y="262" fill="#78716c" fontFamily="monospace" fontSize="9">
                      300 DPI · FOIL-STAMPED COTTON STOCK
                    </text>
                  </g>

                  {/* LOWER LEFT CARD: Reverse Light Alabaster Embossed Card */}
                  <g filter="url(#shadowSoft)">
                    <rect x="100" y="340" width="370" height="200" rx="14" fill="url(#lightCard)" stroke="#ded9cb" strokeWidth="1.5" />
                    
                    <text x="135" y="385" fill="#1c1917" fontFamily="serif" fontWeight="800" fontSize="20" fontStyle="italic">
                      The Artisan Dine-In Identity
                    </text>
                    <text x="135" y="410" fill="#57534e" fontFamily="sans-serif" fontSize="11" letterSpacing="0.5">
                      Vector assets calibrated for outdoor signs, laser cut metal & paper.
                    </text>

                    {/* Color Swatch Circles on Card */}
                    <g transform="translate(135, 435)">
                      <circle cx="16" cy="16" r="14" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="56" cy="16" r="14" fill="#1c1917" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="96" cy="16" r="14" fill="#edeae1" stroke="#ded9cb" strokeWidth="2" />
                      <circle cx="136" cy="16" r="14" fill="#15803d" stroke="#ffffff" strokeWidth="2" />
                      <text x="170" y="22" fill="#1c1917" fontFamily="monospace" fontSize="11" fontWeight="700">
                        Pantone 1655 C / 7527 C
                      </text>
                    </g>

                    <rect x="135" y="485" width="300" height="28" rx="6" fill="#f4efe4" stroke="#ded9cb" />
                    <text x="150" y="503" fill="#c2410c" fontFamily="monospace" fontSize="10" fontWeight="bold">
                      SVG 24px Grid · Strict Safe Clearance Standards
                    </text>
                  </g>

                  {/* RIGHT PANEL: The High-Resolution Editorial Dining Menu Mockup */}
                  <g filter="url(#shadowHeavy)">
                    <rect x="520" y="70" width="410" height="470" rx="16" fill={isLight ? "#ffffff" : "#18181b"} stroke={isLight ? "#ded9cb" : "#27272a"} strokeWidth="2" />

                    {/* Decorative Header Border on Menu */}
                    <rect x="535" y="85" width="380" height="440" rx="10" fill="none" stroke={isLight ? "#ded9cb" : "#27272a"} strokeWidth="1" strokeDasharray="3 3" />
                    
                    {/* Menu Header */}
                    <g transform="translate(560, 110)">
                      {/* Mini Emblem */}
                      <path d="M165 5 L175 15 L165 25 L155 15 Z" fill="#f97316" />
                      <text x="165" y="50" fill={isLight ? "#1c1917" : "#ffffff"} fontFamily="serif" fontSize="24" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                        AURA BISTRO
                      </text>
                      <text x="165" y="68" fill="#f97316" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="3">
                        SPRING / SUMMER TASTING MENU
                      </text>
                      <line x1="60" y1="80" x2="270" y2="80" stroke="#f97316" strokeWidth="1" />
                    </g>

                    {/* Menu Section 1: Starters */}
                    <g transform="translate(560, 210)">
                      <text x="0" y="0" fill="#f97316" fontFamily="monospace" fontSize="10" fontWeight="bold" letterSpacing="2">
                        01 · CRAFT STARTERS
                      </text>
                      <text x="0" y="24" fill={isLight ? "#1c1917" : "#ffffff"} fontFamily="sans-serif" fontSize="13" fontWeight="bold">
                        Charred Heirloom Burrata
                      </text>
                      <text x="310" y="24" fill="#f97316" fontFamily="monospace" fontSize="13" fontWeight="bold">
                        $18
                      </text>
                      <text x="0" y="40" fill="#78716c" fontFamily="sans-serif" fontSize="10">
                        Wild thyme reduction, pistachio crumb, grilled sourdough.
                      </text>

                      <text x="0" y="66" fill={isLight ? "#1c1917" : "#ffffff"} fontFamily="sans-serif" fontSize="13" fontWeight="bold">
                        Wood-Fired Octopus Carpaccio
                      </text>
                      <text x="310" y="66" fill="#f97316" fontFamily="monospace" fontSize="13" fontWeight="bold">
                        $24
                      </text>
                      <text x="0" y="82" fill="#78716c" fontFamily="sans-serif" fontSize="10">
                        Smoked paprika oil, caper berries, micro celery.
                      </text>
                    </g>

                    {/* Menu Section 2: Mains */}
                    <g transform="translate(560, 325)">
                      <text x="0" y="0" fill="#f97316" fontFamily="monospace" fontSize="10" fontWeight="bold" letterSpacing="2">
                        02 · MAIN PLATES
                      </text>
                      <text x="0" y="24" fill={isLight ? "#1c1917" : "#ffffff"} fontFamily="sans-serif" fontSize="13" fontWeight="bold">
                        Dry-Aged Wagyu Striploin
                      </text>
                      <text x="310" y="24" fill="#f97316" fontFamily="monospace" fontSize="13" fontWeight="bold">
                        $54
                      </text>
                      <text x="0" y="40" fill="#78716c" fontFamily="sans-serif" fontSize="10">
                        Truffled bone marrow glaze, roasted shallot puree.
                      </text>

                      <text x="0" y="66" fill={isLight ? "#1c1917" : "#ffffff"} fontFamily="sans-serif" fontSize="13" fontWeight="bold">
                        Pan-Seared Line-Caught Seabass
                      </text>
                      <text x="310" y="66" fill="#f97316" fontFamily="monospace" fontSize="13" fontWeight="bold">
                        $38
                      </text>
                      <text x="0" y="82" fill="#78716c" fontFamily="sans-serif" fontSize="10">
                        Saffron fennel nage, crispy leeks, samphire.
                      </text>
                    </g>

                    {/* Menu Footer Stamp */}
                    <g transform="translate(560, 440)">
                      <line x1="0" y1="0" x2="330" y2="0" stroke={isLight ? "#ded9cb" : "#27272a"} strokeWidth="1" />
                      <text x="165" y="22" fill="#78716c" fontFamily="monospace" fontSize="9" textAnchor="middle" letterSpacing="1">
                        PRESS-READY CMYK 300 DPI · 3MM FULL BLEED SPEC
                      </text>
                      <text x="165" y="38" fill="#f97316" fontFamily="monospace" fontSize="9" textAnchor="middle" fontWeight="bold">
                        TYPESET IN MODERN DISPLAY SERIF + GEOMETRIC SANS
                      </text>
                    </g>
                  </g>
                </svg>

                {/* Floating Quick Feature Pills */}
                <div className="mt-6 pt-5 border-t border-orange-500/20 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className={`p-3 rounded-xl border ${
                    isLight ? 'bg-white/80 border-[#ded9cb]' : 'bg-zinc-900/60 border-zinc-800'
                  }`}>
                    <span className="text-[10px] font-mono text-orange-500 font-bold block">01 / VECTOR LOGO</span>
                    <span className={`text-xs sm:text-sm font-bold ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                      Scalable SVG & EPS
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border ${
                    isLight ? 'bg-white/80 border-[#ded9cb]' : 'bg-zinc-900/60 border-zinc-800'
                  }`}>
                    <span className="text-[10px] font-mono text-orange-500 font-bold block">02 / PRINT MENUS</span>
                    <span className={`text-xs sm:text-sm font-bold ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                      300 DPI Press-Ready CMYK
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border ${
                    isLight ? 'bg-white/80 border-[#ded9cb]' : 'bg-zinc-900/60 border-zinc-800'
                  }`}>
                    <span className="text-[10px] font-mono text-orange-500 font-bold block">03 / LUXURY PACKAGING</span>
                    <span className={`text-xs sm:text-sm font-bold ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                      Foil Embossing Die Lines
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border ${
                    isLight ? 'bg-white/80 border-[#ded9cb]' : 'bg-zinc-900/60 border-zinc-800'
                  }`}>
                    <span className="text-[10px] font-mono text-orange-500 font-bold block">04 / COLOR MATRIX</span>
                    <span className={`text-xs sm:text-sm font-bold ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                      Pantone & Hex Tokens
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Vector Brandmark & Construction Grid */}
          {activeTab === 'brandmark' && (
            <motion.div
              key="brandmark"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Construction Grid Visual */}
              <div className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border ${
                isLight ? 'bg-white border-[#ded9cb]' : 'bg-zinc-950 border-zinc-800'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider">
                    Geometric Grid Construction Lines
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-orange-500/30 text-orange-500">
                    Ratio 1:1.618
                  </span>
                </div>

                <div className="relative aspect-4/3 flex items-center justify-center border border-dashed border-orange-500/30 rounded-xl overflow-hidden bg-black/5 dark:bg-black/40">
                  <svg viewBox="0 0 400 300" className="w-full h-full p-4">
                    {/* Construction Circles & Grid Tangents */}
                    <circle cx="200" cy="150" r="110" stroke="#f97316" strokeOpacity="0.3" strokeDasharray="3 3" fill="none" />
                    <circle cx="200" cy="150" r="75" stroke="#f97316" strokeOpacity="0.4" strokeDasharray="2 2" fill="none" />
                    <circle cx="200" cy="150" r="45" stroke="#f97316" strokeOpacity="0.6" strokeDasharray="4 4" fill="none" />
                    <line x1="50" y1="150" x2="350" y2="150" stroke="#f97316" strokeOpacity="0.35" strokeDasharray="2 4" />
                    <line x1="200" y1="20" x2="200" y2="280" stroke="#f97316" strokeOpacity="0.35" strokeDasharray="2 4" />
                    <line x1="90" y1="40" x2="310" y2="260" stroke="#f97316" strokeOpacity="0.25" strokeDasharray="2 4" />
                    <line x1="90" y1="260" x2="310" y2="40" stroke="#f97316" strokeOpacity="0.25" strokeDasharray="2 4" />
                    
                    {/* The Primary Vector Mark */}
                    <path d="M200 65 L270 150 L200 235 L130 150 Z" stroke="#f97316" strokeWidth="5" fill="none" />
                    <path d="M200 95 L245 150 L200 205 L155 150 Z" stroke={isLight ? "#1c1917" : "#ffffff"} strokeWidth="3" fill="none" />
                    <circle cx="200" cy="150" r="22" fill="#f97316" />
                    
                    {/* Tangent points */}
                    <circle cx="200" cy="65" r="4" fill="#3b82f6" />
                    <circle cx="270" cy="150" r="4" fill="#3b82f6" />
                    <circle cx="200" cy="235" r="4" fill="#3b82f6" />
                    <circle cx="130" cy="150" r="4" fill="#3b82f6" />
                  </svg>
                </div>
              </div>

              {/* Responsive Lockups & File Deliverables */}
              <div className="lg:col-span-5 space-y-4">
                <div className={`p-5 rounded-2xl border ${
                  isLight ? 'bg-white border-[#ded9cb]' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <h4 className={`text-base font-bold mb-2 ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                    Responsive Scaled Lockups
                  </h4>
                  <p className={`text-xs sm:text-sm mb-4 leading-relaxed ${isLight ? 'text-[#383530]' : 'text-zinc-300'}`}>
                    Designed to retain instant recognition whether rendered as an oversized outdoor billboard or an ultra-small 16px browser favicon.
                  </p>

                  <div className="space-y-3">
                    <div className={`p-3 rounded-xl border flex items-center justify-between ${
                      isLight ? 'bg-[#f7f5ee] border-[#ded9cb]' : 'bg-black/50 border-zinc-800'
                    }`}>
                      <span className="text-xs font-mono font-bold">1. Primary Horizontal Mark</span>
                      <span className="text-[11px] font-mono text-orange-500 font-bold">Websites & Signage</span>
                    </div>
                    <div className={`p-3 rounded-xl border flex items-center justify-between ${
                      isLight ? 'bg-[#f7f5ee] border-[#ded9cb]' : 'bg-black/50 border-zinc-800'
                    }`}>
                      <span className="text-xs font-mono font-bold">2. Stacked Emblem Stamp</span>
                      <span className="text-[11px] font-mono text-orange-500 font-bold">Labels & Coasters</span>
                    </div>
                    <div className={`p-3 rounded-xl border flex items-center justify-between ${
                      isLight ? 'bg-[#f7f5ee] border-[#ded9cb]' : 'bg-black/50 border-zinc-800'
                    }`}>
                      <span className="text-xs font-mono font-bold">3. Submark Favicon (16-64px)</span>
                      <span className="text-[11px] font-mono text-orange-500 font-bold">PWA & Social Avatars</span>
                    </div>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border ${
                  isLight ? 'bg-[#f4efe4] border-[#ded9cb]' : 'bg-orange-500/10 border-orange-500/20'
                }`}>
                  <h5 className="text-xs font-mono uppercase tracking-wider text-orange-500 font-bold mb-2">
                    Included Source Formats
                  </h5>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-orange-500 text-white font-bold">SVG</span>
                    <span className="px-2.5 py-1 rounded-md bg-orange-500 text-white font-bold">EPS</span>
                    <span className="px-2.5 py-1 rounded-md bg-orange-500 text-white font-bold">AI Vector</span>
                    <span className="px-2.5 py-1 rounded-md bg-orange-500 text-white font-bold">PDF (CMYK)</span>
                    <span className="px-2.5 py-1 rounded-md bg-orange-500 text-white font-bold">PNG (Transparent)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Dining Menu & Editorial Print */}
          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className={`lg:col-span-8 p-6 sm:p-10 rounded-2xl border ${
                isLight ? 'bg-white border-[#ded9cb]' : 'bg-zinc-950 border-zinc-800'
              }`}>
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="text-center space-y-1 pb-4 border-b border-orange-500/30">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-500">
                      Editorial Dine-In Menu Typography
                    </span>
                    <h3 className={`text-2xl sm:text-3xl font-serif font-bold ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                      AURA BISTRO & TASTING ROOM
                    </h3>
                    <p className="text-xs font-mono text-zinc-500">
                      HIGH-CONTRAST TYPOGRAPHY SPECIFIED FOR AMBIENT DINING ILLUMINATION
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-baseline justify-between border-b border-dashed border-zinc-400/30 pb-1">
                        <span className={`font-serif font-bold text-base sm:text-lg ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                          Hokkaido Scallop Crudo
                        </span>
                        <span className="font-mono font-bold text-orange-500 text-base">$22</span>
                      </div>
                      <p className={`text-xs mt-1 ${isLight ? 'text-[#57534e]' : 'text-zinc-400'}`}>
                        Calamansi ponzu, finger lime pearls, crispy shiso leaf, cold-pressed olive oil.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between border-b border-dashed border-zinc-400/30 pb-1">
                        <span className={`font-serif font-bold text-base sm:text-lg ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                          Smoked Duck Breast & Foie Gras
                        </span>
                        <span className="font-mono font-bold text-orange-500 text-base">$42</span>
                      </div>
                      <p className={`text-xs mt-1 ${isLight ? 'text-[#57534e]' : 'text-zinc-400'}`}>
                        Black mission fig glaze, roasted parsnip puree, toasted hazelnuts.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between border-b border-dashed border-zinc-400/30 pb-1">
                        <span className={`font-serif font-bold text-base sm:text-lg ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                          Valrhona Dark Chocolate Ganache
                        </span>
                        <span className="font-mono font-bold text-orange-500 text-base">$16</span>
                      </div>
                      <p className={`text-xs mt-1 ${isLight ? 'text-[#57534e]' : 'text-zinc-400'}`}>
                        Maldon sea salt, espresso caramel, smoked vanilla bean gelato.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className={`p-5 rounded-2xl border ${
                  isLight ? 'bg-white border-[#ded9cb]' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <h4 className={`text-base font-bold mb-2 ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                    Print Specifications
                  </h4>
                  <ul className={`space-y-2.5 text-xs sm:text-sm ${isLight ? 'text-[#383530]' : 'text-zinc-300'}`}>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>300 DPI high-resolution output</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>3mm standard press bleed margins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>Optimized for tactile 350gsm linen card</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>Zero-glare matte lamination resistant to spills</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Packaging & Luxury Foil Labels */}
          {activeTab === 'packaging' && (
            <motion.div
              key="packaging"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border flex flex-col items-center justify-center ${
                isLight ? 'bg-white border-[#ded9cb]' : 'bg-zinc-950 border-zinc-800'
              }`}>
                {/* Coffee Bag Foil Label Mockup */}
                <div className="w-full max-w-sm rounded-xl p-6 border-2 border-orange-500/40 bg-zinc-950 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
                  
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                    <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                      VELOUR ROASTERY CO.
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      NET WT 12 OZ (340G)
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl tracking-tight text-white">
                    HIGHLAND PEABERRY
                  </h3>
                  <p className="text-xs font-mono text-orange-400 mt-0.5 font-bold">
                    WASHED PROCESS · ELEVATION 1,850M
                  </p>

                  <div className="my-4 p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>TASTING NOTES:</span>
                      <span className="text-white font-bold">Bergamot, Honeycomb, Dark Cocoa</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>ROAST PROFILE:</span>
                      <span className="text-white font-bold">Medium-Light Espresso</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-[10px] font-mono text-zinc-500">
                    <span>HOT-FOIL GOLD STAMP</span>
                    <span className="text-orange-400 font-bold">BATCH #042 · SINGLE ORIGIN</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className={`p-5 rounded-2xl border ${
                  isLight ? 'bg-white border-[#ded9cb]' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <h4 className={`text-base font-bold mb-2 ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                    Packaging Collateral Scope
                  </h4>
                  <p className={`text-xs sm:text-sm mb-4 leading-relaxed ${isLight ? 'text-[#383530]' : 'text-zinc-300'}`}>
                    Full die-line engineering for physical consumer packaging, retail shelf presence, and hot-foil stamping.
                  </p>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg border border-orange-500/20 bg-orange-500/5 text-orange-400 font-bold">
                      ✓ Front & Back Coffee Bag Labels (CMYK + Metallic Foil)
                    </div>
                    <div className="p-2.5 rounded-lg border border-orange-500/20 bg-orange-500/5 text-orange-400 font-bold">
                      ✓ Tamper-Evident Retail Seal Stickers
                    </div>
                    <div className="p-2.5 rounded-lg border border-orange-500/20 bg-orange-500/5 text-orange-400 font-bold">
                      ✓ Custom Branded Shipping Box Tape Pattern
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: Color Swatches & Typographic Specs */}
          {activeTab === 'palette' && (
            <motion.div
              key="palette"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {[
                  { name: 'Terracotta Accent', hex: '#F97316', pantone: '1655 C', cmyk: '0 / 65 / 100 / 0', desc: 'Primary signature brand accent' },
                  { name: 'Deep Obsidian', hex: '#1C1917', pantone: 'Black 7 C', cmyk: '65 / 60 / 60 / 80', desc: 'Authoritative headline contrast' },
                  { name: 'Warm Alabaster', hex: '#EDEAE1', pantone: '7527 C', cmyk: '4 / 4 / 9 / 0', desc: 'Glare-free tactile canvas' },
                  { name: 'Mineral Slate', hex: '#78716C', pantone: 'Cool Gray 8 C', cmyk: '25 / 20 / 20 / 50', desc: 'Technical secondary copy' },
                  { name: 'Forest Evergreen', hex: '#15803D', pantone: '356 C', cmyk: '85 / 20 / 100 / 10', desc: 'Organic sustainability mark' },
                ].map((color) => (
                  <div
                    key={color.hex}
                    onClick={() => handleCopyColor(color.hex)}
                    className={`group cursor-pointer p-4 rounded-2xl border transition-all hover:scale-105 ${
                      isLight ? 'bg-white border-[#ded9cb] shadow-xs' : 'bg-zinc-950 border-zinc-800 shadow-md'
                    }`}
                  >
                    <div
                      className="w-full h-20 rounded-xl mb-3 shadow-inner flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: color.hex }}
                    >
                      {copiedColor === color.hex && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-mono font-bold gap-1">
                          <CheckCircle2 className="w-4 h-4 text-orange-400" />
                          <span>Copied!</span>
                        </div>
                      )}
                    </div>
                    <h5 className={`font-bold text-sm ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                      {color.name}
                    </h5>
                    <div className="mt-1 space-y-0.5 text-[11px] font-mono text-zinc-500">
                      <div className="font-bold text-orange-500">{color.hex}</div>
                      <div>Pantone: {color.pantone}</div>
                      <div>CMYK: {color.cmyk}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Action Strip */}
        <div className={`mt-6 pt-5 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isLight ? 'border-[#ded9cb]' : 'border-zinc-800'
        }`}>
          <div className="text-xs font-mono text-zinc-500">
            Need custom vector branding or print collateral for your business?
          </div>
          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commission a Brand Identity System</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
