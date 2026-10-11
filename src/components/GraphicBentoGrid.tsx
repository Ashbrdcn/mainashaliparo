import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Diamond,
  Palette,
  Instagram,
  Image as ImageIcon,
  AppWindow,
  Tag,
  ArrowUpRight,
  Eye,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { ThemeMode } from '../types';
import { GraphicSampleShowcase } from './GraphicSampleShowcase';

interface GraphicBentoGridProps {
  theme: ThemeMode;
  onOpenContact?: () => void;
}

interface BentoItem {
  id: string;
  icon: typeof Diamond;
  iconColor: string;
  badgeText: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  image: string;
  aspectDesc: string;
  bgDark: string;
  bgLight: string;
  borderDark: string;
  borderLight: string;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: 'brandmark',
    icon: Diamond,
    iconColor: 'text-blue-400',
    badgeText: 'Primary Brandmark',
    title: 'Precision Vector Logo System',
    subtitle: 'Scalable vector marks engineered with geometric balance from mobile icons to building signage.',
    description: 'A comprehensive vector logo suite built on a rigorous modular grid. Includes primary horizontal mark, stacked vertical emblem, monochrome stamps for hot-foil embossing, and responsive favicon variants tested across all pixel densities.',
    deliverables: ['Vector SVG & EPS Files', 'Responsive App Icon Suite', 'Clearance & Safe-Zone Specs', 'Monochrome Emboss Stamps'],
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    aspectDesc: 'Geometric Vector Construction & Identity Mark',
    bgDark: 'bg-[#091526]/90 hover:bg-[#0c1d35]',
    bgLight: 'bg-[#eef2f7] hover:bg-[#e6ecf4]',
    borderDark: 'border-blue-500/25 group-hover:border-blue-400/60',
    borderLight: 'border-blue-300/60 group-hover:border-blue-400',
  },
  {
    id: 'palette',
    icon: Palette,
    iconColor: 'text-orange-400',
    badgeText: 'Design System',
    title: 'Color Swatches & Typography Hierarchy',
    subtitle: 'Curated CMYK print formulas, digital sRGB tokens, and high-contrast typographic pairings.',
    description: 'Complete color authority with precise Pantone, CMYK, and digital hex mappings. Accompanied by strict typographic hierarchies combining modern display serif titles with highly legible sans-serif body styles for effortless readability.',
    deliverables: ['Pantone & CMYK Formulas', 'Accessible Contrast Matrix', 'Headline & Body Type Spec', 'Digital Design Tokens'],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    aspectDesc: 'Color Swatches, Pantone Formulas & Typography Tokens',
    bgDark: 'bg-[#15131c]/90 hover:bg-[#1a1724]',
    bgLight: 'bg-[#f5f0eb] hover:bg-[#ece5dc]',
    borderDark: 'border-orange-500/25 group-hover:border-orange-400/60',
    borderLight: 'border-orange-300/60 group-hover:border-orange-400',
  },
  {
    id: 'social',
    icon: Instagram,
    iconColor: 'text-amber-400',
    badgeText: 'Social Media Kit',
    title: 'Instagram & Marketing Campaign Templates',
    subtitle: 'Ready-to-post story kits, promotional flyers, and carousel layouts designed for high organic engagement.',
    description: 'A cohesive 18-template social media kit created in Figma. Features modular layouts for weekly announcements, product launches, customer testimonials, and seasonal promotions formatted for Instagram, Facebook, and LinkedIn.',
    deliverables: ['18 Reusable Story & Post Layouts', 'Figma Template Components', 'Typography & Sticker Overlays', 'Exportable Story Highlight Covers'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    aspectDesc: 'Instagram Grid & Campaign Marketing Collateral',
    bgDark: 'bg-[#211508]/90 hover:bg-[#2c1c0a]',
    bgLight: 'bg-[#f9f3eb] hover:bg-[#f3ebd9]',
    borderDark: 'border-amber-500/25 group-hover:border-amber-400/60',
    borderLight: 'border-amber-300/60 group-hover:border-amber-400',
  },
  {
    id: 'print',
    icon: ImageIcon,
    iconColor: 'text-emerald-400',
    badgeText: 'Print Collateral',
    title: 'Dine-In Menus & Event Posters',
    subtitle: 'Press-ready editorial layouts designed for dim dining lighting and high-tactile paper stocks.',
    description: 'Carefully typeset dining menus featuring elegant dish hierarchies, allergen indicators, and cocktail lists. Delivered as 300 DPI press-ready CMYK PDFs with 3mm bleed margins, optimized for textured cotton and recycled kraft paper.',
    deliverables: ['Press-Ready CMYK 300 DPI PDFs', 'A4 & Bi-Fold Menu Layouts', 'Large-Format Event Posters', 'Full Bleed & Crop Mark Specs'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    aspectDesc: 'High-Resolution Printed Menu & Editorial Layout',
    bgDark: 'bg-[#091a10]/90 hover:bg-[#0c2416]',
    bgLight: 'bg-[#edf5f0] hover:bg-[#e2ece5]',
    borderDark: 'border-emerald-500/25 group-hover:border-emerald-400/60',
    borderLight: 'border-emerald-300/60 group-hover:border-emerald-400',
  },
  {
    id: 'digital',
    icon: AppWindow,
    iconColor: 'text-purple-400',
    badgeText: 'Digital Assets',
    title: 'Web Graphics & SVG Icon System',
    subtitle: 'Crisp vector assets, custom web banners, and cohesive custom iconography.',
    description: 'Handcrafted SVG icon library tailored to the brand identity. Clean 24px stroke grid lines, optimized code footprint, and seamless rendering on both light and dark backgrounds.',
    deliverables: ['Custom 24px Vector Icon Set', 'Responsive Web Hero Banners', 'Favicon & PWA Icons', 'SVG Code Asset Library'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    aspectDesc: 'Web Vector Graphics & UI Iconography',
    bgDark: 'bg-[#160f26]/90 hover:bg-[#1d1433]',
    bgLight: 'bg-[#f4eff8] hover:bg-[#eae3f0]',
    borderDark: 'border-purple-500/25 group-hover:border-purple-400/60',
    borderLight: 'border-purple-300/60 group-hover:border-purple-400',
  },
  {
    id: 'merch',
    icon: Tag,
    iconColor: 'text-rose-400',
    badgeText: 'Packaging & Merch',
    title: 'Foil-Stamped Tags & Packaging Labels',
    subtitle: 'Luxury retail hangtags, custom packaging tape, and embossed product pouch stickers.',
    description: 'Physical packaging solutions that elevate retail unboxing. Features die-cut hangtags with metallic foil finishes, tamper-evident product seal stickers, and custom tissue paper patterns.',
    deliverables: ['Die-Cut Garment Hangtags', 'Specialty Coffee Bag Labels', 'Foil Stamping Die Line Files', 'Custom Retail Tissue Patterns'],
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80',
    aspectDesc: 'Retail Packaging, Die-Cut Labels & Foil Hangtags',
    bgDark: 'bg-[#240b0b]/90 hover:bg-[#300f0f]',
    bgLight: 'bg-[#f8edee] hover:bg-[#f0e1e2]',
    borderDark: 'border-rose-500/25 group-hover:border-rose-400/60',
    borderLight: 'border-rose-300/60 group-hover:border-rose-400',
  },
];

export const GraphicBentoGrid: React.FC<GraphicBentoGridProps> = ({ theme, onOpenContact }) => {
  const [selectedBento, setSelectedBento] = useState<BentoItem | null>(null);
  const isLight = theme === 'monochrome-light';

  const itemMap = Object.fromEntries(BENTO_ITEMS.map((item) => [item.id, item]));
  const brandmark = itemMap['brandmark'];
  const palette = itemMap['palette'];
  const social = itemMap['social'];
  const print = itemMap['print'];
  const digital = itemMap['digital'];
  const merch = itemMap['merch'];

  return (
    <div className="w-full space-y-8">
      {/* 
        Sample Image Showcase:
        Interactive flagship vector brand identity, editorial dining menu, and packaging system
      */}
      <GraphicSampleShowcase theme={theme} onOpenContact={onOpenContact} />

      {/* Bento Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <h3 className={`font-display font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
            Modular Brand Deliverables & Assets
          </h3>
          <span className={`text-xs sm:text-sm font-mono px-2.5 py-0.5 rounded-full border ${
            isLight ? 'bg-[#edeae1] border-[#ded9cb] text-[#292524] font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
          }`}>
            6 Modular Deliverables
          </span>
        </div>
        <div className={`text-xs sm:text-sm font-mono ${isLight ? 'text-[#383530]' : 'text-zinc-400'}`}>
          Click any card to inspect full high-resolution specs
        </div>
      </div>

      {/* 
        The Bento Grid matching user's layout:
        Left Column: Large Brandmark Card + Bottom Wide Palette Strip
        Right Column: Top Wide Instagram Card + Middle Print Card + Stacked Digital & Merch Cards
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* ================= LEFT COLUMN (Col Span 7) ================= */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
          {/* TILE 1: Primary Brandmark (Gem Icon) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedBento(brandmark)}
            role="button"
            tabIndex={0}
            className={`group cursor-pointer relative rounded-3xl border overflow-hidden p-6 sm:p-8 md:p-9 flex flex-col justify-between min-h-[320px] sm:min-h-[360px] transition-all duration-300 ${
              isLight ? `${brandmark.bgLight} ${brandmark.borderLight}` : `${brandmark.bgDark} ${brandmark.borderDark}`
            }`}
          >
            {/* Background Image with subtle atmospheric gradient */}
            <div className="absolute inset-0 z-0">
              <img
                src={brandmark.image}
                alt={brandmark.title}
                className="w-full h-full object-cover opacity-35 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className={`absolute inset-0 ${
                isLight
                  ? 'bg-gradient-to-t from-[#eef2f7] via-[#eef2f7]/85 to-[#eef2f7]/50'
                  : 'bg-gradient-to-t from-[#091526] via-[#091526]/85 to-[#091526]/50'
              }`} />
            </div>

            {/* Top Bar: Centered/Top Gem Icon & Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md transition-transform duration-300 group-hover:scale-110 ${
                  isLight
                    ? 'bg-blue-600/10 border-blue-400/40 text-blue-600'
                    : 'bg-blue-500/20 border-blue-400/30 text-blue-400'
                }`}>
                  <Diamond className="w-6 h-6" />
                </div>
                <span className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${
                  isLight ? 'bg-white/90 border-blue-300 text-blue-900' : 'bg-black/60 border-blue-400/30 text-blue-300'
                }`}>
                  {brandmark.badgeText}
                </span>
              </div>

              <div className={`p-2.5 rounded-xl border opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs sm:text-sm font-mono ${
                isLight ? 'bg-white border-blue-300 text-blue-700' : 'bg-black/80 border-white/20 text-white'
              }`}>
                <Eye className="w-4 h-4" />
                <span>Quick Look</span>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 mt-12 sm:mt-16">
              <h4 className={`text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight ${
                isLight ? 'text-[#1c1917]' : 'text-white'
              }`}>
                {brandmark.title}
              </h4>
              <p className={`text-base sm:text-lg md:text-xl lg:text-[1.25rem] mt-2.5 leading-relaxed font-normal ${
                isLight ? 'text-[#1c1917]' : 'text-zinc-200'
              }`}>
                {brandmark.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3.5 border-t border-blue-500/20">
                {brandmark.deliverables.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className={`text-xs sm:text-sm font-mono px-3 py-1 rounded-md border ${
                      isLight ? 'bg-white/90 border-blue-200 text-blue-950 font-medium' : 'bg-blue-950/60 border-blue-800/60 text-blue-200'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* TILE 2: Color Palette Strip (Palette Icon) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedBento(palette)}
            role="button"
            tabIndex={0}
            className={`group cursor-pointer relative rounded-2xl border p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 ${
              isLight ? `${palette.bgLight} ${palette.borderLight}` : `${palette.bgDark} ${palette.borderDark}`
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                isLight
                  ? 'bg-orange-500/10 border-orange-400/40 text-orange-600'
                  : 'bg-orange-500/20 border-orange-400/30 text-orange-400'
              }`}>
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-500">
                    {palette.badgeText}
                  </span>
                </div>
                <h4 className={`text-lg sm:text-xl md:text-2xl font-display font-extrabold tracking-tight ${
                  isLight ? 'text-[#1c1917]' : 'text-white'
                }`}>
                  {palette.title}
                </h4>
                <p className={`text-sm sm:text-base md:text-lg mt-1 line-clamp-2 ${
                  isLight ? 'text-[#1c1917]' : 'text-zinc-200'
                }`}>
                  {palette.subtitle}
                </p>
              </div>
            </div>

            {/* Visual Swatch Chips Preview */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <span className="w-6 h-6 rounded-full bg-[#1c1917] border border-white/20 shadow-xs" title="#1C1917 Deep Obsidian" />
              <span className="w-6 h-6 rounded-full bg-[#f97316] border border-white/20 shadow-xs" title="#F97316 Terracotta Accent" />
              <span className="w-6 h-6 rounded-full bg-[#edeae1] border border-zinc-400/40 shadow-xs" title="#EDEAE1 Warm Alabaster" />
              <span className="w-6 h-6 rounded-full bg-[#0c1829] border border-white/20 shadow-xs" title="#0C1829 Midnight Blue" />
              <span className="text-sm font-mono font-bold text-orange-500 ml-1">→</span>
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT COLUMN (Col Span 5) ================= */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
          {/* TILE 3: Social Media (Instagram Icon) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedBento(social)}
            role="button"
            tabIndex={0}
            className={`group cursor-pointer relative rounded-2xl border p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
              isLight ? `${social.bgLight} ${social.borderLight}` : `${social.bgDark} ${social.borderDark}`
            }`}
          >
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${
                  isLight
                    ? 'bg-amber-500/10 border-amber-400/40 text-amber-600'
                    : 'bg-amber-500/20 border-amber-400/30 text-amber-400'
                }`}>
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500 block">
                    {social.badgeText}
                  </span>
                  <h4 className={`text-lg sm:text-xl md:text-2xl font-display font-extrabold tracking-tight ${
                    isLight ? 'text-[#1c1917]' : 'text-white'
                  }`}>
                    {social.title}
                  </h4>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-amber-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
              isLight ? 'text-[#1c1917]' : 'text-zinc-200'
            }`}>
              {social.subtitle}
            </p>
          </motion.div>

          {/* LOWER SUB-GRID: Left Tall Photo + Right 2 Stacked Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1">
            {/* TILE 4: Print Menus (Landscape Photo Icon) */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedBento(print)}
              role="button"
              tabIndex={0}
              className={`group cursor-pointer relative rounded-2xl border p-5 sm:p-6 flex flex-col justify-between overflow-hidden min-h-[220px] transition-all duration-300 ${
                isLight ? `${print.bgLight} ${print.borderLight}` : `${print.bgDark} ${print.borderDark}`
              }`}
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${
                  isLight
                    ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-600'
                    : 'bg-emerald-500/20 border-emerald-400/30 text-emerald-400'
                }`}>
                  <ImageIcon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
                  {print.badgeText}
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <h4 className={`text-base sm:text-lg md:text-xl font-display font-extrabold tracking-tight ${
                  isLight ? 'text-[#1c1917]' : 'text-white'
                }`}>
                  {print.title}
                </h4>
                <p className={`text-xs sm:text-sm md:text-base mt-1.5 leading-snug line-clamp-2 ${
                  isLight ? 'text-[#1c1917]' : 'text-zinc-200'
                }`}>
                  {print.subtitle}
                </p>
              </div>
            </motion.div>

            {/* RIGHT SUB-COLUMN: Tiles 5 & 6 Stacked */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* TILE 5: Digital Assets (Window/Browser Icon) */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedBento(digital)}
                role="button"
                tabIndex={0}
                className={`group cursor-pointer relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 flex-1 ${
                  isLight ? `${digital.bgLight} ${digital.borderLight}` : `${digital.bgDark} ${digital.borderDark}`
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                    isLight
                      ? 'bg-purple-500/10 border-purple-400/40 text-purple-600'
                      : 'bg-purple-500/20 border-purple-400/30 text-purple-400'
                  }`}>
                    <AppWindow className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-purple-500">
                    {digital.badgeText}
                  </span>
                </div>
                <div className="mt-3">
                  <h4 className={`text-base font-display font-extrabold tracking-tight ${
                    isLight ? 'text-[#1c1917]' : 'text-white'
                  }`}>
                    {digital.title}
                  </h4>
                  <p className={`text-xs sm:text-sm mt-1 line-clamp-2 ${
                    isLight ? 'text-[#1c1917]' : 'text-zinc-300'
                  }`}>
                    SVG Vectors & App Icons
                  </p>
                </div>
              </motion.div>

              {/* TILE 6: Packaging & Merch (Tag Icon) */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedBento(merch)}
                role="button"
                tabIndex={0}
                className={`group cursor-pointer relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 flex-1 ${
                  isLight ? `${merch.bgLight} ${merch.borderLight}` : `${merch.bgDark} ${merch.borderDark}`
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                    isLight
                      ? 'bg-rose-500/10 border-rose-400/40 text-rose-600'
                      : 'bg-rose-500/20 border-rose-400/30 text-rose-400'
                  }`}>
                    <Tag className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
                    {merch.badgeText}
                  </span>
                </div>
                <div className="mt-3">
                  <h4 className={`text-base font-display font-extrabold tracking-tight ${
                    isLight ? 'text-[#1c1917]' : 'text-white'
                  }`}>
                    {merch.title}
                  </h4>
                  <p className={`text-xs sm:text-sm mt-1 line-clamp-2 ${
                    isLight ? 'text-[#1c1917]' : 'text-zinc-300'
                  }`}>
                    Foil Hangtags & Stickers
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal for any clicked Bento Tile */}
      <AnimatePresence>
        {selectedBento && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBento(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className={`relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border ${
                isLight ? 'bg-[#f7f5ee] border-[#ded9cb] text-[#1c1917]' : 'bg-[#121216] border-zinc-800 text-white'
              }`}
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-700/30">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    isLight ? 'bg-orange-500/10 border-orange-300 text-orange-600' : 'bg-orange-500/20 border-orange-500/30 text-orange-400'
                  }`}>
                    <selectedBento.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-500">
                      {selectedBento.badgeText}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
                      {selectedBento.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBento(null)}
                  className={`p-2 rounded-full cursor-pointer transition-colors ${
                    isLight ? 'bg-[#e7e2d6] hover:bg-[#ded9cb] text-[#1c1917]' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo Preview Container */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden my-5 border border-zinc-700/30">
                <img
                  src={selectedBento.image}
                  alt={selectedBento.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                  {selectedBento.aspectDesc}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className={`text-xs sm:text-sm uppercase font-mono tracking-wider font-bold mb-2 ${
                    isLight ? 'text-[#57534e]' : 'text-zinc-400'
                  }`}>
                    Deliverable Scope
                  </h4>
                  <p className={`text-base sm:text-lg md:text-xl lg:text-[1.25rem] leading-relaxed font-normal ${isLight ? 'text-[#1c1917]' : 'text-zinc-100'}`}>
                    {selectedBento.description}
                  </p>
                </div>

                <div>
                  <h4 className={`text-xs sm:text-sm uppercase font-mono tracking-wider font-bold mb-2.5 ${
                    isLight ? 'text-[#57534e]' : 'text-zinc-400'
                  }`}>
                    Assets Provided in Kit
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedBento.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs sm:text-sm font-medium ${
                          isLight ? 'bg-[#edeae1] border-[#ded9cb] text-[#1c1917]' : 'bg-zinc-900 border-zinc-800 text-zinc-200'
                        }`}
                      >
                        <Check className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-700/30 flex items-center justify-between">
                <span className={`text-xs font-mono ${isLight ? 'text-[#78716c]' : 'text-zinc-400'}`}>
                  Custom Brand Design Services
                </span>
                <button
                  onClick={() => {
                    setSelectedBento(null);
                    onOpenContact?.();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  <span>Request Similar Kit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
