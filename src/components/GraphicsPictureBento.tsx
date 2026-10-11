import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Eye,
  Check,
  Send,
  ArrowUpRight,
  Sparkles,
  Maximize2,
  Tag,
} from 'lucide-react';
import { ThemeMode } from '../types';

export interface GraphicPhotoItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  imageAlt: string;
  caption: string;
  subtitle: string;
  description: string;
  highlights: string[];
  deliverables: string[];
  colors?: string[];
  // Bento grid spans for the mosaic layout
  gridSpan: string;
  aspectRatio: string;
}

const GRAPHIC_GALLERY: GraphicPhotoItem[] = [
  {
    id: 'g1-brandmark',
    title: 'Minimalist Vector Brandmark & Monogram',
    category: 'Brand Identity',
    client: 'Aura Design Studio',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Geometric vector logo mark and foil stationery',
    caption: 'Vector Logo Mark',
    subtitle: 'Precision geometric identity mark crafted on a 1:1.618 golden ratio grid.',
    description: 'Developed a comprehensive vector identity system engineered to scale seamlessly from 16px digital favicons to massive outdoor metal storefront signs. The emblem combines geometric balance with custom serif typography to convey craftsmanship and understated luxury.',
    highlights: [
      'Engineered on modular vector grid with strict safe clearance boundaries',
      'Included monochrome black, pure white, and hot-foil metallic versions',
      'Delivered fully responsive logo lockups (horizontal, stacked, submark)',
      'Vector master files in SVG, EPS, AI, and CMYK 300 DPI PDF formats',
    ],
    deliverables: ['Vector Logo Suite', 'Golden Ratio Grid Specs', 'Monogram Stamp', 'Brand Guidelines'],
    colors: ['#F97316', '#1C1917', '#EDEAE1', '#78716C'],
    gridSpan: 'col-span-1 sm:col-span-1 lg:col-span-3 lg:row-span-2',
    aspectRatio: 'aspect-3/4 sm:aspect-auto h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[460px]',
  },
  {
    id: 'g2-palette',
    title: 'Color Authority & Typography Pairings',
    category: 'Design System',
    client: 'Velour Roasters',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Pantone color swatches and editorial typography sheet',
    caption: 'Color Palette & Type Specimen',
    subtitle: 'Curated CMYK formulas, digital sRGB tokens, and high-contrast typography matrix.',
    description: 'Constructed an authoritative color system pairing earthy terracotta accents with deep obsidian and tactile alabaster paper tones. Formatted with exact Pantone spot color matches, CMYK print percentages, and accessible digital contrast ratios verified against WCAG AAA standards.',
    highlights: [
      'Exact Pantone Solid Coated / Uncoated formulas for commercial print',
      'Tested contrast matrix ensuring effortless legibility in dim ambient dining',
      'Carefully paired editorial modern serif headlines with clean geometric sans body copy',
      'Exportable CSS design tokens and Figma styles for instant developer handoff',
    ],
    deliverables: ['Pantone & CMYK Formulas', 'Accessible Contrast Matrix', 'Type Pairing Guide', 'Digital Design Tokens'],
    colors: ['#F97316', '#1C1917', '#EDEAE1', '#C2410C'],
    gridSpan: 'col-span-1 sm:col-span-1 lg:col-span-3',
    aspectRatio: 'aspect-4/3 min-h-[200px] sm:min-h-[220px]',
  },
  {
    id: 'g3-packaging',
    title: 'Specialty Coffee Foil Pouch Packaging',
    category: 'Packaging Design',
    client: 'Highland Peaberry',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Artisan retail coffee bag packaging with foil stamped label',
    caption: 'Foil Packaging Labels',
    subtitle: 'Luxury retail coffee pouch labels engineered with gold foil stamping and tamper seals.',
    description: 'Designed press-ready product packaging for a specialty coffee roaster. Features custom die-cut label geometries, metallic hot-foil brand emblems, strict legal FDA nutritional typography, and single-origin roast elevation indicators that heightened retail shelf impact.',
    highlights: [
      'Commercial die-line templates for front & back pouch application',
      'Hot foil stamping layer separated on dedicated vector vector plate',
      'Tamper-evident tear seal sticker pattern for safety and premium feel',
      'Batch number and roast date customizable variable-data layout',
    ],
    deliverables: ['Die-Cut Packaging Labels', 'Foil Stamping Plates', 'Retail Pouch Mockups', 'Tamper Seal Stickers'],
    colors: ['#C2410C', '#1C1917', '#FDE047', '#EDEAE1'],
    gridSpan: 'col-span-2 sm:col-span-1 lg:col-span-3',
    aspectRatio: 'aspect-4/3 min-h-[200px] sm:min-h-[220px]',
  },
  {
    id: 'g4-stationery',
    title: 'Architectural Studio Letterpress Collateral',
    category: 'Brand Collateral',
    client: 'Archform Architecture',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Letterpress stationery, business cards and envelope suite',
    caption: 'Letterpress Stationery Suite',
    subtitle: 'Tactile blind-embossed stationery suite printed on heavy 600gsm cotton card.',
    description: 'Created an understated corporate stationery identity for a boutique architecture studio. The package includes double-sided letterpress business cards with painted terracotta edges, custom C5 envelopes with watermark interior patterns, and press-ready letterhead.',
    highlights: [
      'Blind debossing vector plates optimized for ultra-thick cotton paper stocks',
      'Custom envelope lining pattern echoing the building facade geometry',
      'Edge-painting color specification matched to Pantone 1655 C',
      'Digital interactive PDF letterhead template for daily client invoicing',
    ],
    deliverables: ['Letterpress Business Cards', 'Custom Envelope Dies', 'Digital Letterhead Template', 'Blind Emboss Dies'],
    colors: ['#1C1917', '#F97316', '#EDEAE1', '#A8A29E'],
    gridSpan: 'col-span-2 sm:col-span-2 lg:col-span-3',
    aspectRatio: 'aspect-4/3 min-h-[200px] sm:min-h-[220px]',
  },
  {
    id: 'g5-menu',
    title: 'Fine Dining Editorial Tasting Menu',
    category: 'Print Design',
    client: 'Aura Bistro & Bar',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Editorial dine-in restaurant menu layout on textured paper',
    caption: 'Dine-In Editorial Menu',
    subtitle: 'High-tactile dining menus with strict typography hierarchy designed for dim ambient light.',
    description: 'Typeset a seasonal dining menu with high-contrast layout, elegant section dividers, and allergy indicators. Prepared as 300 DPI press-ready CMYK files with 3mm bleed margins, optimized for textured cotton paper that resists spills and wear.',
    highlights: [
      'High-contrast typography tested under dim 2700K dining room lighting',
      'Press-ready CMYK files with 3mm bleed and printer crop marks',
      'Modular layout enabling kitchen staff to swap daily tasting dishes in 5 minutes',
      'Coordinating cocktail, dessert, and wine list card templates',
    ],
    deliverables: ['A4 & Bi-Fold Print Menus', 'Cocktail Card Layouts', 'Print Bleed & Crop Specs', 'Editable InDesign Source'],
    colors: ['#1C1917', '#F97316', '#EDEAE1', '#15803D'],
    gridSpan: 'col-span-1 sm:col-span-1 lg:col-span-3',
    aspectRatio: 'aspect-4/3 min-h-[200px] sm:min-h-[220px]',
  },
  {
    id: 'g6-social',
    title: 'Instagram Campaign & Moodboard Kit',
    category: 'Social Media Design',
    client: 'Velour Studio',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Instagram 9-grid campaign templates and aesthetic story covers',
    caption: 'Instagram 18-Post Grid Kit',
    subtitle: 'Modular social media campaign templates built in Figma for consistent brand voice.',
    description: 'Designed an 18-template social media kit featuring promotional announcements, product closeups, quote cards, and story highlights. Built with modular component tokens in Figma so internal marketing staff can publish on-brand content in seconds.',
    highlights: [
      'Cohesive 9-grid puzzle layout for seasonal product release',
      '18 reusable story, carousel, and feed post templates',
      'Exportable story highlight icon covers with vector line icons',
      'Typography and sticker overlay pack for high organic engagement',
    ],
    deliverables: ['18 Reusable Figma Templates', 'Story Highlight Covers', 'Sticker Overlay Library', 'Campaign Asset Kit'],
    colors: ['#F97316', '#1C1917', '#EDEAE1', '#FB923C'],
    gridSpan: 'col-span-1 sm:col-span-1 lg:col-span-3',
    aspectRatio: 'aspect-4/3 min-h-[200px] sm:min-h-[220px]',
  },
  {
    id: 'g7-bottle',
    title: 'Botanical Craft Beverage Bottle Label',
    category: 'Packaging Design',
    client: 'Botanica Elixirs',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Artisan glass beverage bottle packaging with die-cut label',
    caption: 'Glass Bottle Label Design',
    subtitle: 'Die-cut glass bottle wrap label with vintage botanical illustrations and metallic foil.',
    description: 'Crafted artisanal wrap-around bottle labels for an organic beverage line. Includes hand-rendered botanical vector illustrations, batch stamping windows, proof badges, and water-resistant matte varnish specifications.',
    highlights: [
      'Waterproof synthetic paper substrate specs for chilled refrigeration',
      'Curved neck label collar matching main bottle wrap geometry',
      'Hand-crafted vector botanical linework scalable without pixelation',
      'Strict legal volume, alcohol by volume, and barcode compliance',
    ],
    deliverables: ['Bottle Wrap Die-Lines', 'Neck Collar Label', 'Botanical Vector Art', '3D Photorealistic Render'],
    colors: ['#15803D', '#1C1917', '#FDE047', '#EDEAE1'],
    gridSpan: 'col-span-2 sm:col-span-2 lg:col-span-3',
    aspectRatio: 'aspect-4/3 min-h-[200px] sm:min-h-[220px]',
  },
  {
    id: 'g8-poster',
    title: 'Swiss Typographic Exhibition Poster',
    category: 'Editorial & Poster',
    client: 'Modern Typography Biennial',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Large-format graphic design exhibition poster on gallery wall',
    caption: 'Exhibition Poster System',
    subtitle: 'Large-format silkscreen poster celebrating geometric typography and asymmetrical grid rhythm.',
    description: 'An exhibition poster exploring dynamic asymmetrical grid systems, oversized negative space, and bold geometric numerals. Designed for 24x36 inch silkscreen print runs on archival museum-grade paper stock.',
    highlights: [
      '2-color spot silkscreen separation for hand-pulled print editions',
      'Mathematical grid column layout influenced by Josef Müller-Brockmann',
      'High-impact street poster format readable from 30 feet away',
      'High-resolution vector artwork scalable to building facade banners',
    ],
    deliverables: ['24x36 Silkscreen Spot Separations', 'Digital Billboard Resizes', 'Exhibition Flyer Suite', 'Archival PDF Proofs'],
    colors: ['#1C1917', '#F97316', '#EDEAE1', '#FFFFFF'],
    gridSpan: 'col-span-1 sm:col-span-1 lg:col-span-4',
    aspectRatio: 'aspect-4/3 min-h-[200px] sm:min-h-[220px]',
  },
  {
    id: 'g9-icons',
    title: 'Custom Vector UI Icon System (24px)',
    category: 'Digital Assets',
    client: 'Nexus Digital Platform',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Clean digital vector iconography and app symbols on screen',
    caption: '24px Vector Icon Suite',
    subtitle: 'A pixel-perfect library of 48 vector icons crafted on strict 24px coordinate grids.',
    description: 'Engineered an icon system built specifically for responsive web applications. All glyphs share consistent 1.5px stroke weights, rounded caps, optical center balance, and streamlined SVG code under 1KB per icon for instantaneous web page load times.',
    highlights: [
      'Strict 24x24 pixel grid alignment eliminating fuzzy blurry sub-pixel strokes',
      'Clean hand-optimized SVG code with minimal path coordinates',
      'Exported in line, solid, and dual-tone terracotta fill styles',
      'Compatible with React Lucide and standard SVG symbol sprites',
    ],
    deliverables: ['48 Scalable SVG Icons', 'React Component Package', 'Figma Icon Component Set', 'Icon Font (WOFF2)'],
    colors: ['#F97316', '#1C1917', '#0284C7', '#EDEAE1'],
    gridSpan: 'col-span-1 sm:col-span-1 lg:col-span-4',
    aspectRatio: 'aspect-4/3 min-h-[200px] sm:min-h-[220px]',
  },
  {
    id: 'g10-hangtags',
    title: 'Luxury Garment Hangtags & Packaging',
    category: 'Merch & Retail',
    client: 'Velour Atelier Garments',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Embossed clothing hangtag with brass eyelet on fabric',
    caption: 'Die-Cut Garment Hangtags',
    subtitle: 'High-tactile retail hangtags featuring metallic brass eyelets and blind embossing.',
    description: 'Created retail hangtag suites for an artisanal clothing brand. Built on duplexed 700gsm recycled stock with antique brass eyelets, custom cotton twill cords, and foil-embossed brand marks that elevate the in-store tactile unboxing experience.',
    highlights: [
      'Die-cut rounded-corner geometry with reinforced brass eyelet punches',
      'Duplexed color construction: terracotta front facing deep black reverse',
      'Barcode, sizing matrix, and garment care instructions typography',
      'Sustainable recycled paper substrate specification',
    ],
    deliverables: ['Garment Hangtag Die-Lines', 'Brass Eyelet Production Specs', 'Retail Care Labels', 'Packaging Tissue Pattern'],
    colors: ['#1C1917', '#F97316', '#EDEAE1', '#78716C'],
    gridSpan: 'col-span-2 sm:col-span-2 lg:col-span-4',
    aspectRatio: 'aspect-4/3 min-h-[200px] sm:min-h-[220px]',
  },
];

interface GraphicsPictureBentoProps {
  theme: ThemeMode;
  onOpenContact?: () => void;
}

export const GraphicsPictureBento: React.FC<GraphicsPictureBentoProps> = ({
  theme,
  onOpenContact,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GraphicPhotoItem | null>(null);
  const isLight = theme === 'monochrome-light';

  return (
    <div className="w-full">
      {/* Gallery Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d95d39]" />
          <h3 className={`font-display font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight ${
            isLight ? 'text-[#0c0a09]' : 'text-white'
          }`}>
            Visual Identity & Graphic Design Showcase
          </h3>
          <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
            isLight
              ? 'bg-[#f4efe4] border-[#ded8cc] text-[#0c0a09] font-bold'
              : 'bg-zinc-900 border-zinc-800 text-zinc-300'
          }`}>
            {GRAPHIC_GALLERY.length} Works
          </span>
        </div>
        <div className={`text-xs sm:text-sm font-mono font-medium ${isLight ? 'text-[#292524]' : 'text-zinc-400'}`}>
          Click any picture to view full specs & 2-column details
        </div>
      </div>

      {/* 
        PICTURES-ONLY BENTO GRID (MOSAIC LAYOUT MATCHING USER REFERENCE IMAGE)
        - Pure image-first layout with clean rounded corners
        - Varying aspect ratios and interlocking spans
        - Smooth hover zoom and minimal caption pill
      */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-4.5">
        {GRAPHIC_GALLERY.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15, margin: '-40px' }}
            transition={{
              duration: 0.55,
              delay: (index % 4) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4, transition: { duration: 0.22 } }}
            whileTap={{ scale: 0.985 }}
            onClick={() => setSelectedPhoto(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedPhoto(item);
              }
            }}
            className={`group cursor-pointer relative overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
              item.gridSpan
            } ${
              isLight
                ? 'bg-white border-[#ded8cc] hover:border-[#d95d39]/40 shadow-xs hover:shadow-md'
                : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700 shadow-lg'
            }`}
          >
            {/* The Image Container */}
            <div className={`relative w-full ${item.aspectRatio} overflow-hidden`}>
              <img
                src={item.image}
                alt={item.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Subtle Atmospheric Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Minimal Hover Caption & Inspection Badge */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="space-y-0.5 max-w-[80%]">
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-orange-400 block drop-shadow">
                    {item.category}
                  </span>
                  <h4 className="text-xs sm:text-sm md:text-base font-display font-extrabold text-white leading-tight drop-shadow truncate">
                    {item.title}
                  </h4>
                </div>

                <div className="p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-md shrink-0">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Subtle Top-Left Category Tag (Always visible, minimal) */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-mono text-zinc-200">
                {item.caption}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 
        2-COLUMN INTERACTIVE DETAIL MODAL:
        - User requested: "when i click the image, it will show the image and description, 2 colum imagre left description right"
        - "when i clck the image, i need to scroll it just to see the image, i dont want that. I want short and full view of image"
      */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="graphic-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog: Compact & Short height so entire modal fits on screen without scrolling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`relative z-10 w-full max-w-4xl lg:max-w-5xl h-auto max-h-[85vh] md:max-h-[76vh] overflow-hidden rounded-2xl sm:rounded-3xl border shadow-2xl flex flex-col ${
                isLight
                  ? 'bg-white border-[#ded8cc] text-[#0c0a09]'
                  : 'bg-[#101015] border-zinc-800 text-white'
              }`}
            >
              {/* Compact Top Modal Bar */}
              <div className={`px-4 sm:px-5 py-2 sm:py-2.5 border-b flex items-center justify-between gap-3 shrink-0 ${
                isLight ? 'bg-[#f8f5ee] border-[#ded8cc]' : 'bg-[#14141a] border-zinc-800'
              }`}>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono truncate">
                  <span className="font-bold text-[#d95d39] uppercase tracking-wider shrink-0">
                    {selectedPhoto.category}
                  </span>
                  <span aria-hidden="true" className="opacity-40">·</span>
                  <span className={`truncate font-medium ${isLight ? 'text-[#292524]' : 'text-zinc-300'}`}>
                    {selectedPhoto.client} ({selectedPhoto.year})
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPhoto(null)}
                  className={`p-1.5 rounded-full cursor-pointer transition-colors shrink-0 ${
                    isLight
                      ? 'bg-[#f0ebe1] hover:bg-[#ded8cc] text-[#0c0a09]'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                  aria-label="Close image details"
                >
                  <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              </div>

              {/* 
                2-Column Layout (Image Left, Description Right):
                - Left column: Short & Full View of Image (uncropped, zero scroll needed to see the entire artwork)
                - Right column: Compact description (with smooth internal scroll if text overflows on tiny screens)
              */}
              <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
                {/* ================= LEFT COLUMN: SHORT & FULL VIEW IMAGE ================= */}
                <div className="md:col-span-6 lg:col-span-7 p-2.5 sm:p-4 flex flex-col justify-center items-center bg-black/5 dark:bg-black/50 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 shrink-0 h-auto md:h-full overflow-hidden">
                  {/* Image View Canvas: object-contain guarantees 100% full view without cropping or scrolling */}
                  <div className="relative w-full h-[200px] xs:h-[230px] sm:h-[260px] md:h-full max-h-[58vh] flex items-center justify-center p-2 rounded-xl bg-black/5 dark:bg-black/40 overflow-hidden shadow-inner">
                    <img
                      src={selectedPhoto.image}
                      alt={selectedPhoto.imageAlt}
                      className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg drop-shadow-md select-none"
                    />

                    {/* Unobtrusive Full View Badge */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-zinc-200 border border-white/10">
                      <Eye className="w-3 h-3 text-[#d95d39]" />
                      <span>Full View</span>
                    </div>

                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10">
                      {selectedPhoto.caption}
                    </div>
                  </div>

                  {/* Compact Color Specs below Image */}
                  {selectedPhoto.colors && (
                    <div className="w-full flex items-center justify-between gap-2 mt-2 px-1 shrink-0">
                      <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
                        Palette Specs:
                      </span>
                      <div className="flex items-center gap-2">
                        {selectedPhoto.colors.map((hex, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono">
                            <span
                              className="w-3 h-3 rounded-full border border-black/20 dark:border-white/20 shadow-xs"
                              style={{ backgroundColor: hex }}
                            />
                            <span className={`font-bold ${isLight ? 'text-[#0c0a09]' : 'text-zinc-300'}`}>
                              {hex}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ================= RIGHT COLUMN: COMPACT DESCRIPTION ================= */}
                <div className="md:col-span-6 lg:col-span-5 p-3.5 sm:p-5 flex flex-col justify-between overflow-y-auto max-h-[42vh] md:max-h-full space-y-3">
                  <div className="space-y-2.5">
                    {/* Title & Subtitle */}
                    <div>
                      <h3
                        id="graphic-modal-title"
                        className={`text-lg sm:text-xl font-display font-extrabold tracking-tight leading-snug ${
                          isLight ? 'text-[#0c0a09]' : 'text-white'
                        }`}
                      >
                        {selectedPhoto.title}
                      </h3>
                      <p className={`text-xs sm:text-[13px] mt-0.5 leading-relaxed font-medium ${
                        isLight ? 'text-[#292524]' : 'text-zinc-200'
                      }`}>
                        {selectedPhoto.subtitle}
                      </p>
                    </div>

                    {/* Compact Overview */}
                    <div className="pt-0.5">
                      <h4 className={`text-[10px] sm:text-[11px] uppercase font-mono tracking-wider font-bold mb-0.5 ${
                        isLight ? 'text-[#44403c]' : 'text-zinc-400'
                      }`}>
                        Overview & Visual Thinking
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed font-normal ${
                        isLight ? 'text-[#1c1917]' : 'text-zinc-100'
                      }`}>
                        {selectedPhoto.description}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="pt-0.5">
                      <h4 className={`text-[10px] sm:text-[11px] uppercase font-mono tracking-wider font-bold mb-1 ${
                        isLight ? 'text-[#44403c]' : 'text-zinc-400'
                      }`}>
                        Key Production Highlights
                      </h4>
                      <div className="space-y-1">
                        {selectedPhoto.highlights.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs leading-snug">
                            <Check className="w-3.5 h-3.5 text-[#d95d39] shrink-0 mt-0.5" />
                            <span className={`font-medium ${isLight ? 'text-[#1c1917]' : 'text-zinc-200'}`}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables Tags */}
                    <div className="pt-0.5">
                      <h4 className={`text-[10px] sm:text-[11px] uppercase font-mono tracking-wider font-bold mb-1 ${
                        isLight ? 'text-[#44403c]' : 'text-zinc-400'
                      }`}>
                        Deliverables Provided
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedPhoto.deliverables.map((item, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded border font-semibold ${
                              isLight
                                ? 'bg-[#f4efe4] border-[#ded8cc] text-[#0c0a09]'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-200'
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Compact Bottom Action Strip */}
                  <div className={`pt-2.5 border-t flex items-center justify-between gap-2 shrink-0 ${
                    isLight ? 'border-[#ded8cc]' : 'border-zinc-800'
                  }`}>
                    <span className={`text-[10px] sm:text-[11px] font-mono font-medium ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
                      Custom Visual Commissions
                    </span>

                    {onOpenContact && (
                      <button
                        onClick={() => {
                          setSelectedPhoto(null);
                          onOpenContact();
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#d95d39] hover:bg-[#c24e2b] text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                      >
                        <Send className="w-3 h-3" />
                        <span>Let&apos;s Talk</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
