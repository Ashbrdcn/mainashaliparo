import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Code, Layout, Palette, CheckCircle2, Eye, Sparkles, Layers } from 'lucide-react';
import { ThemeMode, Project } from '../types';

interface DisciplineShowcaseProps {
  theme: ThemeMode;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenContact: () => void;
}

type DisciplineKey = 'fullstack' | 'uiux' | 'graphic';

interface DisciplineMeta {
  id: DisciplineKey;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  badge: string;
  icon: typeof Code;
  accentColor: string;
  borderActiveLight: string;
  borderActiveDark: string;
  glowColor: string;
  accentText: string;
  summary: string;
  keySkills: string[];
  deliverablesList: string[];
  samplePhoto: string;
  photoAlt: string;
  previewLabel: string;
}

const DISCIPLINES: DisciplineMeta[] = [
  {
    id: 'fullstack',
    number: '01',
    title: 'Full-Stack Web Development',
    shortTitle: 'Full-Stack Web',
    tagline: 'Database-driven web applications built from backend storage to responsive screen.',
    badge: 'Code & Systems',
    icon: Code,
    accentColor: 'orange',
    borderActiveLight: 'border-orange-500',
    borderActiveDark: 'border-orange-500',
    glowColor: 'rgba(249, 115, 22, 0.25)',
    accentText: 'text-orange-500',
    summary: 'Practical, production-engineered systems for real businesses. I design relational database schemas, implement secure session and role-based authentication, and construct fast, responsive frontend layouts tested across mobile and desktop.',
    keySkills: ['Python & Flask', 'PHP & MySQL', 'Database Design & SQL', 'HTML, CSS & JavaScript', 'Bootstrap UI'],
    deliverablesList: [
      'Relational SQL schemas & normalized database tables',
      'Secure login-protected authentication & role permissions',
      'Mobile-first responsive Bootstrap interface',
      'AI-accelerated code review (Claude, ChatGPT, Gemini)'
    ],
    samplePhoto: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    photoAlt: 'Full-Stack Web Application Database Dashboard and Inventory Analytics',
    previewLabel: 'Live Web Portal · Database Analytics & Authentication UI'
  },
  {
    id: 'uiux',
    number: '02',
    title: 'UI/UX Interface Design',
    shortTitle: 'UI/UX Design',
    tagline: 'Human-centered wireframes, ergonomic mobile flows, and clickable Figma prototypes.',
    badge: 'Figma & Flows',
    icon: Layout,
    accentColor: 'cyan',
    borderActiveLight: 'border-cyan-500',
    borderActiveDark: 'border-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    accentText: 'text-cyan-500 dark:text-cyan-400',
    summary: 'Interfaces engineered for frictionless usability. I wireframe mobile-first layouts to optimize thumb-zone interaction, craft cohesive design token hierarchies, and build interactive clickable Figma prototypes before writing a single line of frontend code.',
    keySkills: ['Figma Prototyping', 'Wireframing', 'Mobile-First Layouts', 'Responsive Design', 'Design Systems'],
    deliverablesList: [
      'Interactive Figma prototypes with clickable user flows',
      'Mobile-first wireframes validated for usability',
      'Ergonomic touch targets & responsive viewport scaling',
      'Comprehensive design token and component specs handoff'
    ],
    samplePhoto: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    photoAlt: 'Interactive Mobile Figma Prototype and UX Wireframe Screens',
    previewLabel: 'Figma Prototype · Mobile-First Booking Interface Flow'
  },
  {
    id: 'graphic',
    number: '03',
    title: 'Graphic Design & Visual Identity',
    shortTitle: 'Graphic Design',
    tagline: 'Distinctive vector logo marks, restaurant dining menus, event posters, and brand kits.',
    badge: 'Brand & Print',
    icon: Palette,
    accentColor: 'amber',
    borderActiveLight: 'border-amber-500',
    borderActiveDark: 'border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    accentText: 'text-amber-500 dark:text-amber-400',
    summary: 'Commercial branding that ensures businesses look authoritative and memorable. From precision vector logo marks to high-resolution print menus, promotional event posters, and coordinated social media campaigns, every asset follows a unified aesthetic.',
    keySkills: ['Logo & Brand Identity', 'Posters & Menus', 'Social Media Graphics', 'Marketing Materials', 'Typography'],
    deliverablesList: [
      'Custom vector logo mark & complete brand guidelines',
      'Press-ready high-resolution dining menus & event posters',
      'Modular social media templates (Instagram, Facebook)',
      'Unified commercial typography and color schemes'
    ],
    samplePhoto: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    photoAlt: 'Artisan Brand Identity Package with Vector Logo and Printed Dining Menu',
    previewLabel: 'Commercial Branding · Vector Logo Mark & Print Dining Menu'
  }
];

export const DisciplineShowcase: React.FC<DisciplineShowcaseProps> = ({
  theme,
  projects,
  onSelectProject,
  onOpenContact,
}) => {
  const [activeTab, setActiveTab] = useState<DisciplineKey>('fullstack');
  const isLight = theme === 'monochrome-light';

  const currentDiscipline = DISCIPLINES.find((d) => d.id === activeTab) || DISCIPLINES[0];
  const disciplineProjects = projects.filter((p) => p.disciplineId === activeTab);

  return (
    <div className="w-full">
      {/* 
        Interactive Alive 01 - 03 Discipline Switcher Bar
        Card-style tabs with active glow indicator, animated pill number, and hover interactions
      */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-8 sm:mb-12">
        {DISCIPLINES.map((disc) => {
          const Icon = disc.icon;
          const isActive = disc.id === activeTab;
          const projectCount = projects.filter((p) => p.disciplineId === disc.id).length;

          return (
            <motion.button
              key={disc.id}
              onClick={() => setActiveTab(disc.id)}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group ${
                isActive
                  ? isLight
                    ? 'bg-white border-zinc-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12)] ring-2 ring-zinc-950/80'
                    : 'bg-[#15151b] border-white/90 shadow-[0_12px_32px_-8px_rgba(255,255,255,0.15)] ring-2 ring-white/30'
                  : isLight
                    ? 'bg-white/70 border-zinc-200/90 text-zinc-700 hover:border-zinc-400 hover:bg-white shadow-xs'
                    : 'bg-[#101014] border-zinc-800/90 text-zinc-400 hover:border-zinc-700 hover:bg-[#141418] hover:text-zinc-200'
              }`}
            >
              {/* Subtle alive glow gradient on active state */}
              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}

              {/* Top row: Interactive 01/02/03 Number Stamp & Icon */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono font-extrabold text-sm sm:text-base px-2.5 py-1 rounded-lg border transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? isLight
                          ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                          : 'bg-white text-zinc-950 border-white shadow-sm'
                        : isLight
                          ? 'bg-zinc-100 text-zinc-600 border-zinc-200 group-hover:bg-zinc-200'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 group-hover:border-zinc-700 group-hover:text-zinc-200'
                    }`}
                  >
                    <span>{disc.number}</span>
                    <span className="text-[10px] opacity-60 font-sans tracking-normal font-normal">/ 03</span>
                  </span>

                  {isActive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold text-orange-500"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                      Active
                    </motion.span>
                  )}
                </div>

                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? isLight
                        ? 'bg-zinc-950 text-white'
                        : 'bg-white text-zinc-950'
                      : isLight
                        ? 'bg-zinc-100 text-zinc-500 group-hover:text-zinc-950 group-hover:bg-zinc-200'
                        : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-200 group-hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>

              {/* Title & Micro-kicker */}
              <div>
                <h3
                  className={`text-base sm:text-lg font-display font-bold tracking-tight transition-colors duration-200 ${
                    isActive
                      ? isLight
                        ? 'text-zinc-950'
                        : 'text-white'
                      : isLight
                        ? 'text-zinc-800 group-hover:text-zinc-950'
                        : 'text-zinc-300 group-hover:text-white'
                  }`}
                >
                  {disc.shortTitle}
                </h3>
                <p
                  className={`text-xs mt-1 line-clamp-1 transition-colors duration-200 ${
                    isActive
                      ? isLight
                        ? 'text-zinc-600'
                        : 'text-zinc-400'
                      : 'text-zinc-500'
                  }`}
                >
                  {disc.badge} · {projectCount} Project{projectCount === 1 ? '' : 's'}
                </p>
              </div>

              {/* Interactive bottom hairline indicator */}
              <div
                className={`absolute bottom-0 inset-x-0 h-1 transition-all duration-300 ${
                  isActive
                    ? 'bg-orange-500 opacity-100 shadow-[0_-2px_8px_rgba(249,115,22,0.6)]'
                    : 'bg-transparent group-hover:bg-zinc-400/40 opacity-0 group-hover:opacity-100'
                }`}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Main Discipline Spotlight Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDiscipline.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-3xl border overflow-hidden transition-all duration-300 ${
            isLight
              ? 'bg-white border-zinc-200 shadow-xl'
              : 'bg-[#121216] border-zinc-800/80 shadow-2xl'
          }`}
        >
          {/* Top Split Layout: Sample Photo (Left/Top) & Architectural Overview (Right/Bottom) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-zinc-200 dark:border-zinc-800">
            {/* Visual Photo Showcase with High-Res Sample */}
            <div className="lg:col-span-7 relative overflow-hidden group bg-zinc-950 min-h-[320px] sm:min-h-[420px] flex items-center justify-center">
              <img
                src={currentDiscipline.samplePhoto}
                alt={currentDiscipline.photoAlt}
                className="w-full h-full object-cover min-h-[320px] sm:min-h-[420px] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Sleek Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Top Photo Overlay Stamp */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span>DISCIPLINE {currentDiscipline.number} // SAMPLE PHOTO</span>
              </div>

              {/* Bottom Caption Pill on Photo */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-zinc-200 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                  {currentDiscipline.previewLabel}
                </span>

                {disciplineProjects[0] && (
                  <button
                    onClick={() => onSelectProject(disciplineProjects[0])}
                    className="text-xs font-bold font-mono text-white bg-black/80 hover:bg-black/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/25 flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:scale-105"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Look Project</span>
                  </button>
                )}
              </div>
            </div>

            {/* Discipline Summary & Deliverables Pane */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-[11px] font-mono tracking-widest uppercase font-bold ${
                      isLight ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  >
                    Discipline Overview
                  </span>
                </div>

                <h3
                  className={`text-2xl sm:text-3xl font-display font-extrabold tracking-tight ${
                    isLight ? 'text-zinc-950' : 'text-white'
                  }`}
                >
                  {currentDiscipline.title}
                </h3>

                <p
                  className={`text-sm sm:text-base mt-3 leading-relaxed ${
                    isLight ? 'text-zinc-700' : 'text-zinc-300'
                  }`}
                >
                  {currentDiscipline.summary}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800/80">
                  <h4
                    className={`text-xs font-mono uppercase tracking-wider mb-3 font-semibold ${
                      isLight ? 'text-zinc-600' : 'text-zinc-400'
                    }`}
                  >
                    Core Capabilities & Deliverables
                  </h4>
                  <div className="space-y-2">
                    {currentDiscipline.deliverablesList.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span className={isLight ? 'text-zinc-800' : 'text-zinc-200'}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies Pill Suite */}
              <div className="mt-8 pt-5 border-t border-zinc-200 dark:border-zinc-800/80">
                <div
                  className={`text-[10px] font-mono uppercase tracking-wider mb-2.5 ${
                    isLight ? 'text-zinc-500' : 'text-zinc-400'
                  }`}
                >
                  Verified Tooling Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentDiscipline.keySkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                        isLight
                          ? 'bg-zinc-100 border-zinc-200 text-zinc-800'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Projects under this discipline */}
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h4
                  className={`text-base sm:text-lg font-display font-bold ${
                    isLight ? 'text-zinc-950' : 'text-white'
                  }`}
                >
                  Featured {currentDiscipline.shortTitle} Projects
                </h4>
                <p
                  className={`text-xs mt-0.5 ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}
                >
                  Click any case study below to inspect architectural details, deliverables, and role highlights.
                </p>
              </div>

              <button
                onClick={onOpenContact}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  isLight
                    ? 'bg-zinc-950 text-white hover:bg-zinc-800'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                <span>Hire for {currentDiscipline.shortTitle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grid of Projects for this discipline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {disciplineProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject(proj);
                    }
                  }}
                  className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isLight
                      ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-sm'
                      : 'bg-[#15151a] border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    {/* Small Photo Preview */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-3 bg-zinc-950">
                      <img
                        src={proj.image}
                        alt={proj.imageAlt || proj.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white font-mono">
                        <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                          {proj.year}
                        </span>
                        <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1">
                          <Eye className="w-3 h-3" /> Quick Look
                        </span>
                      </div>
                    </div>

                    <h4
                      className={`text-lg sm:text-xl font-display font-bold tracking-tight group-hover:text-orange-500 transition-colors ${
                        isLight ? 'text-zinc-950' : 'text-white'
                      }`}
                    >
                      {proj.title}
                    </h4>
                    <p
                      className={`text-xs mt-1 line-clamp-2 ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}
                    >
                      {proj.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
                    <span
                      className={`text-[11px] font-mono ${
                        isLight ? 'text-zinc-500' : 'text-zinc-500'
                      }`}
                    >
                      {proj.client}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold group-hover:translate-x-1 transition-transform">
                      Inspect Details
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
