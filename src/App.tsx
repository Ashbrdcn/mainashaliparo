import { useState, useEffect } from 'react';
import { ArrowUpRight, Sun, Moon, Code, Layout, Palette, Eye, Mail, MessageSquare, Check, Sparkles, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeMode, Project } from './types';
import { FullScreenNav } from './components/FullScreenNav';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { SectionDivider } from './components/SectionDivider';
import { GraphicsPictureBento } from './components/GraphicsPictureBento';
import { ServiceModal, ClientService } from './components/ServiceModal';
import { QuickCommandPalette } from './components/QuickCommandPalette';

// Curated 3-4 High-Impact Case Studies focused on business RESULTS rather than tech-jargon
const CURATED_PROJECTS: Project[] = [
  {
    id: 'zentix',
    title: 'Business Portal & Stock Management',
    subtitle: 'Replaced manual clipboards and Excel sheets with a web system that updates stock levels in real time and prevents stockouts.',
    category: 'Web Application',
    disciplineId: 'fullstack',
    year: '2026',
    client: 'Commercial Retail Client',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Business Portal and Inventory Management System with Analytics Dashboard',
    previewCaption: 'Online Inventory & Automated Stock Tracking',
    description: 'A practical, reliable web application built to solve daily operational bottlenecks. Staff can sign into a password-protected dashboard to record stock transfers, audit counts instantly, and generate sales reports in seconds without spreadsheet errors.',
    highlights: [
      'Eliminated manual inventory counting errors with live SQL stock validation',
      'Secure password-protected login with separate views for cashiers and managers',
      'Clean interface that works smoothly on warehouse tablets and phones',
      'Fast search that pulls up product records in under 1 second'
    ],
    deliverables: ['Python & Flask', 'MySQL Database', 'Responsive Web UI', 'User Logins'],
    role: 'Full-Stack Developer'
  },
  {
    id: 'lumina',
    title: 'Client Ordering & Delivery Tracking System',
    subtitle: 'Enabled a regional distributor to take customer orders online 24/7 and give buyers live order status updates.',
    category: 'Online Ordering',
    disciplineId: 'fullstack',
    year: '2025',
    client: 'Distribution & Wholesale',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'PHP and MySQL Operations Order Management System Screen',
    previewCaption: '24/7 Digital Ordering & Workflow Pipeline',
    description: 'Designed and built an end-to-end ordering portal that lets wholesale buyers browse catalogs, submit orders after hours, and track deliveries automatically, cutting phone inquiry volume by more than half.',
    highlights: [
      'Allowed clients to submit wholesale orders online 24 hours a day',
      'Automatic order status stages (Received, Packed, In Transit, Delivered)',
      'Protected order history database with fast exportable invoices',
      'Works seamlessly on mobile web browsers without installing extra apps'
    ],
    deliverables: ['PHP & MySQL', 'SQL Database', 'Client Portal', 'Automated Tracking'],
    role: 'Full-Stack Developer'
  },
  {
    id: 'monolith',
    title: 'Appointment Booking Experience for Mobile',
    subtitle: 'Redesigned a service business booking flow to make reserving a time slot frictionless in under 60 seconds.',
    category: 'UI/UX Interface Design',
    disciplineId: 'uiux',
    year: '2025',
    client: 'Service & Booking Network',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mobile-First Figma UI/UX Wireframe & Booking Interface Mockup',
    previewCaption: 'Thumb-Friendly Mobile Booking Prototype',
    description: 'Mapped the complete customer journey from discovering services to confirmation. Designed clickable phone prototypes focused on large tap areas, clear calendar date selectors, and zero confusing checkout steps.',
    highlights: [
      'Reduced average booking completion steps from 7 screens down to 3 simple taps',
      'Thumb-zone friendly mobile layouts tested with real customer user journeys',
      'Clear calendar selection preventing accidental double-booking',
      'Ready-to-code design system handoff with typography and component tokens'
    ],
    deliverables: ['Figma Prototype', 'Mobile-First Wireframes', 'Customer Journey Mapping', 'Design Tokens'],
    role: 'UI/UX Interface Designer'
  },
  {
    id: 'aura',
    title: 'Storefront Brand Identity & Dine-In Menu',
    subtitle: 'Crafted a memorable visual identity, storefront logo mark, and printed dining menus that attract walk-in diners.',
    category: 'Brand & Visual Identity',
    disciplineId: 'graphic',
    year: '2024',
    client: 'Artisan Bistro & Studio',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Artisan Bistro Vector Logo and Dining Menu Collateral',
    previewCaption: 'Complete Brand Identity, Logo Mark & Print Menus',
    description: 'Helped a new local business stand out from competitors with an authentic visual identity. Created vector logo files for signs and uniforms, press-ready dining menus with clean typography, and promotional social media templates.',
    highlights: [
      'Custom vector logo scalable from business cards to outdoor building signs',
      'High-contrast, easy-to-read printed menu layouts designed for dim restaurant lighting',
      'Ready-to-use social media templates for weekly specials and announcements',
      'Full brand asset kit with color palettes and font guides for consistent marketing'
    ],
    deliverables: ['Logo & Brand Guidelines', 'Printed Menus', 'Social Media Graphics', 'Marketing Assets'],
    role: 'Graphic & Brand Designer'
  },
  {
    id: 'pulse',
    title: 'Delivery & Logistics Mobile App Flow',
    subtitle: 'Designed a thumb-friendly driver workflow that reduced delivery log errors and expedited route stops.',
    category: 'Mobile UX & Prototype',
    disciplineId: 'uiux',
    year: '2025',
    client: 'Metro Express Logistics',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Logistics Mobile App Figma UI/UX Prototype Flow and Map Interface',
    previewCaption: 'Ergonomic Driver Handheld Prototype in Figma',
    description: 'Designed a complete mobile driver application focused on one-handed operation during deliveries. Included high-contrast navigation stops, oversized tap buttons for confirmation, and an offline parcel barcode scanner interface.',
    highlights: [
      'Engineered one-handed thumb-zone interface for couriers on the move',
      'High-contrast sunlight readability mode for outdoor glare',
      'Step-by-step parcel handover verification flow preventing missed deliveries',
      'Clickable prototype tested with real drivers across 5 route cycles'
    ],
    deliverables: ['Figma Mobile Prototype', 'Ergonomic Driver UX', 'Sunlight Mode UI', 'Design System'],
    role: 'UI/UX Interface Designer'
  },
  {
    id: 'velour',
    title: 'Artisan Roast Packaging & Visual Guidelines',
    subtitle: 'Developed an authoritative brandmark and press-ready coffee bag packaging labels for a specialty roastery.',
    category: 'Brand & Packaging Design',
    disciplineId: 'graphic',
    year: '2024',
    client: 'Velour Specialty Coffee',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Specialty Coffee Packaging and Vector Brandmark Collateral',
    previewCaption: 'Vector Brand Identity, Packaging Labels & Social Kit',
    description: 'Crafted a cohesive visual identity for an artisanal coffee roaster. Delivered vector logo assets, foil-stamped retail packaging label layouts, and an Instagram launch kit that boosted retail shelf appeal.',
    highlights: [
      'Scalable vector logo mark engineered for hot foil stamping and web',
      'Press-ready CMYK product label packaging with strict legal typography',
      'Cohesive 12-post social media launch template kit in Figma',
      'Comprehensive brand guideline booklet specifying colors and typography'
    ],
    deliverables: ['Vector Logo Mark', 'Retail Product Packaging', 'Brand Guidelines', 'Social Media Templates'],
    role: 'Graphic & Brand Designer'
  }
];

// Reworded Services: "What I can build for you" focused on client needs
const CLIENT_SERVICES: ClientService[] = [
  {
    id: '01',
    number: '01',
    headline: 'Custom Web Applications & Portals',
    clientGoal: 'Turn manual paperwork or spreadsheets into a secure website your team or customers can use.',
    description: 'I build practical, login-protected systems where you can store data safely, manage customer records, and automate daily tasks without paying expensive monthly SaaS fees.',
    whatYouGet: [
      'Secure login pages and role-based staff permissions',
      'Fast, reliable database for customer & inventory data',
      'Clean screens that work reliably on phones and laptops',
      'Direct code ownership with zero lock-in'
    ],
    techTags: ['Python & Flask', 'PHP & MySQL', 'SQL Database', 'Bootstrap', 'JavaScript']
  },
  {
    id: '02',
    number: '02',
    headline: 'Mobile-Friendly Interface & Prototype Design',
    clientGoal: 'See and test how your app or website will look and work before writing any code.',
    description: 'I design intuitive phone and desktop layouts in Figma so your customers never get confused or drop off before finishing an order or booking.',
    whatYouGet: [
      'Clickable phone prototypes you can test on real devices',
      'Step-by-step user flow mapping to minimize abandoned checkouts',
      'Ergonomic, easy-to-tap layouts designed phone-first',
      'Clear developer handoff files with all typography and colors'
    ],
    techTags: ['Figma Prototyping', 'Wireframing', 'Mobile-First Layouts', 'Usability Testing']
  },
  {
    id: '03',
    number: '03',
    headline: 'Logo, Menus & Visual Branding',
    clientGoal: 'Give your business an authoritative, cohesive look that makes clients trust you immediately.',
    description: 'From your primary vector logo mark to printed restaurant menus, promotional posters, and social media flyers, I create assets that look sharp everywhere you show them.',
    whatYouGet: [
      'Vector logo files ready for storefront signs, stickers, and uniforms',
      'High-resolution, press-ready dining menus and event posters',
      'Social media graphics sized for Instagram and Facebook feeds',
      'Brand guideline cheat sheet for fonts and signature colors'
    ],
    techTags: ['Logo & Brand Identity', 'Print Menus', 'Social Media Flyers', 'Typography']
  },
  {
    id: '04',
    number: '04',
    headline: 'Rapid Modernization & AI-Assisted Builds',
    clientGoal: 'Get your website or web tool launched quickly and reviewed for quality.',
    description: 'I leverage modern AI engineering tools (ChatGPT, Claude, Gemini) to write boilerplate and audit code faster, while personally verifying every system for security and clean architecture.',
    whatYouGet: [
      'Faster turnaround times on revisions and updates',
      'Thorough code audits and schema verification',
      'Modern, lightweight code with zero bloated libraries',
      'Currently learning React, TypeScript, and Node.js for upcoming builds'
    ],
    techTags: ['AI Code Review', 'Fast Turnaround', 'Clean Architecture', 'React/TS Learning']
  }
];

export const SECTION_METADATA: Record<string, { label: string; number: string; title: string }> = {
  hero: { label: 'Home', number: '01', title: 'Overview' },
  works: { label: 'Projects', number: '02', title: 'Selected Works' },
  services: { label: 'Services', number: '03', title: 'What I Build' },
  about: { label: 'About Me', number: '04', title: 'Bio & Approach' },
  contact: { label: 'Contact', number: '05', title: 'Get In Touch' },
};

export const DESKTOP_NAV_LINKS = [
  { id: 'works', label: 'Projects', number: '02' },
  { id: 'services', label: 'Services', number: '03' },
  { id: 'about', label: 'About Me', number: '04' },
];

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('monochrome-dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavIconAnimating, setIsNavIconAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<ClientService | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [scopeForInquiry, setScopeForInquiry] = useState<string | undefined>(undefined);
  const [categoryForInquiry, setCategoryForInquiry] = useState<string | undefined>(undefined);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectDisciplineFilter, setProjectDisciplineFilter] = useState<'all' | 'fullstack' | 'uiux' | 'graphic'>('all');

  const handleNavIconClick = () => {
    setIsNavIconAnimating(true);
    setIsMobileMenuOpen(true);
    setTimeout(() => setIsNavIconAnimating(false), 600);
  };

  const handleOpenInquiryWithScope = (scopeSummary: string, category: string) => {
    setScopeForInquiry(scopeSummary);
    setCategoryForInquiry(category);
    setIsContactOpen(true);
  };

  const handleOpenNormalContact = () => {
    setScopeForInquiry(undefined);
    setCategoryForInquiry(undefined);
    setIsContactOpen(true);
  };

  // Track window scroll progress for top indicator bar and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Check top of page
      if (window.scrollY < 180) {
        setActiveSection('hero');
        return;
      }

      // Check bottom of page
      const scrollBottom = window.innerHeight + window.scrollY;
      if (scrollBottom >= document.documentElement.scrollHeight - 140) {
        setActiveSection('contact');
        return;
      }

      // Track active section in order: hero -> works -> services -> about -> contact
      const sections = ['hero', 'works', 'services', 'about', 'contact'];
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = theme === 'monochrome-light';
  const fade = 'transition-colors duration-500 ease-in-out';

  // Crisp, high-contrast, editorial gallery light palette + stealth obsidian dark palette
  const themeClasses = {
    fade,
    bg: `${isLight ? 'bg-[#fcfbf9]' : 'bg-[#09090b]'} ${fade}`,
    text: `${isLight ? 'text-[#0c0a09]' : 'text-white'} ${fade}`,
    gridLine: `${isLight ? 'border-[#ded8cc]/60' : 'border-white/[0.07]'} ${fade}`,
    crosshair: `${isLight ? 'text-[#78716c]' : 'text-zinc-600'} ${fade}`,
    bgText: `${isLight ? 'text-[#e5e0d3]' : 'text-white/[0.08] text-stroke-subtle'} ${fade}`,
    fgHeading: `${isLight ? 'text-[#0c0a09]' : 'text-white'} ${fade}`,
    navText: `${isLight ? 'text-[#292524] hover:text-[#d95d39] font-semibold' : 'text-zinc-400 hover:text-[#d95d39]'} ${fade}`,
    ctaBadge: `${isLight ? 'bg-white border-[#ded8cc] text-[#0c0a09] shadow-md' : 'bg-[#141418] border-zinc-800 text-white shadow-2xl'} ${fade}`,
    ctaBadgeTitle: `${isLight ? 'text-[#0c0a09]' : 'text-white'} ${fade}`,
    ctaBadgeSub: `${isLight ? 'text-[#292524]' : 'text-zinc-300'} ${fade}`,
    ctaBtn: `${isLight ? 'bg-[#0c0a09] text-[#faf9f5] hover:bg-[#292524]' : 'bg-white text-zinc-950 hover:bg-zinc-200'} ${fade}`,
    sectionSub: `${isLight ? 'text-[#44403c] font-semibold' : 'text-zinc-400'} ${fade}`,
    heading: `${isLight ? 'text-[#0c0a09]' : 'text-white'} ${fade}`,
    bodyText: `${isLight ? 'text-[#1c1917]' : 'text-zinc-200'} ${fade}`,
    metricNum: `${isLight ? 'text-[#0c0a09]' : 'text-white'} ${fade}`,
    card: `${isLight ? 'bg-white border-[#ded8cc] text-[#0c0a09] shadow-xs hover:border-[#d95d39]/40 hover:shadow-md' : 'bg-[#121216] border-zinc-800 text-white hover:border-zinc-700'} ${fade}`,
    cardTitle: `${isLight ? 'text-[#0c0a09]' : 'text-white'} ${fade}`,
    cardSub: `${isLight ? 'text-[#292524]' : 'text-zinc-200'} ${fade}`,
    serviceTitle: `${isLight ? 'text-[#0c0a09]' : 'text-white'} ${fade}`,
    serviceDesc: `${isLight ? 'text-[#1c1917]' : 'text-zinc-200'} ${fade}`,
    serviceTag: `${isLight ? 'bg-[#f4efe4] border-[#ded8cc] text-[#0c0a09] font-semibold' : 'bg-zinc-900 border-zinc-800 text-zinc-300'} ${fade}`,
    contactBanner: `${isLight ? 'bg-[#18181b] text-white border-[#27272a] shadow-xl' : 'bg-zinc-950/90 border-zinc-800 text-white'} ${fade}`,
    divider: `${isLight ? 'border-[#ded8cc]' : 'border-zinc-800/80'} ${fade}`,
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementPosition - navOffset),
          behavior: 'smooth',
        });
      }
    }
  };

  const getBgAshStyle = () => {
    if (isLight) {
      return {
        color: 'transparent',
        WebkitTextStroke: '2px rgba(28, 25, 23, 0.12)',
        letterSpacing: '0.06em',
      };
    }
    return {
      color: 'rgba(255, 255, 255, 0.08)',
      WebkitTextStroke: '0px transparent',
      letterSpacing: '0.06em',
    };
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} transition-colors duration-500 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden`}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
        <div
          className={`h-full transition-all duration-75 ease-out ${
            isLight
              ? 'bg-zinc-950 shadow-[0_0_8px_rgba(0,0,0,0.3)]'
              : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]'
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 
        ========================================================================
        STICKY FLOATING FROSTED CAPSULE HEADER
        Includes DIRECT "Contact" Button so clients never need to hunt for it
        ========================================================================
      */}
      <header className="fixed top-3 sm:top-5 inset-x-0 z-40 w-full px-4 sm:px-6 md:px-8 pointer-events-none">
        <div
          className={`pointer-events-auto max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border backdrop-blur-md transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 shadow-lg ${
            isLight
              ? 'bg-white/95 border-[#ded8cc] text-[#0c0a09] shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
              : 'bg-[#09090b]/85 border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          }`}
        >
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
              className="font-display font-extrabold tracking-tight text-xl sm:text-2xl whitespace-nowrap shrink-0 group select-none cursor-pointer transition-transform duration-300 hover:scale-105"
              aria-label="Ash - Home"
            >
              <span className="leading-none group-hover:text-[#d95d39] transition-colors">ASH</span>
            </a>
          </div>

          {/* Quick Nav Links (Desktop) with Terracotta Orange Hover & Active Indicators */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-mono" aria-label="Main Navigation">
            {DESKTOP_NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`group relative py-1 transition-colors duration-200 cursor-pointer font-bold flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#d95d39]'
                      : isLight
                        ? 'text-[#292524] hover:text-[#d95d39]'
                        : 'text-zinc-400 hover:text-[#d95d39]'
                  }`}
                  title={`Navigate to ${link.label}${isActive ? ' (Current page location)' : ''}`}
                >
                  {/* Active Section Indicator Dot */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d95d39] animate-pulse shrink-0 shadow-[0_0_6px_rgba(217,93,57,0.8)]" />
                  )}
                  <span className="transition-transform duration-200 group-hover:scale-105">{link.label}</span>

                  {/* Active bottom line indicator or terracotta hover expansion underline */}
                  {isActive ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#d95d39] rounded-full shadow-[0_0_8px_rgba(217,93,57,0.6)]" />
                  ) : (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#d95d39]/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Direct Contact CTA Button + Theme Switcher + Nav Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Prominent Direct Contact Button in the Navbar */}
            <button
              onClick={handleOpenNormalContact}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-mono font-bold bg-[#d95d39] hover:bg-[#c24e2b] text-white shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
              title="Get in touch with Ash"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>

            {/* Theme Toggle Capsule */}
            <div
              className={`flex items-center gap-1 p-1 rounded-full border transition-all shadow-md ${
                isLight
                  ? 'bg-zinc-100 border-[#ded8cc] shadow-[0_2px_10px_rgba(0,0,0,0.06)] ring-1 ring-zinc-950/5'
                  : 'bg-zinc-900 border-zinc-700/80 shadow-[0_2px_12px_rgba(0,0,0,0.6)] ring-1 ring-white/10'
              }`}
              role="radiogroup"
              aria-label="Theme selection"
            >
              <button
                onClick={() => setTheme('monochrome-dark')}
                title="Monochrome Noir Dark"
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all cursor-pointer font-medium text-xs ${
                  theme === 'monochrome-dark'
                    ? 'bg-white text-zinc-950 shadow-md ring-2 ring-white/90 scale-105'
                    : isLight
                      ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/80'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Monochrome Dark Theme"
                aria-checked={theme === 'monochrome-dark'}
                role="radio"
              >
                <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <button
                onClick={() => setTheme('monochrome-light')}
                title="Monochrome Pure Light"
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all cursor-pointer font-medium text-xs ${
                  theme === 'monochrome-light'
                    ? 'bg-[#0c0a09] text-white shadow-md ring-2 ring-[#0c0a09] scale-105'
                    : isLight
                      ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/80'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Monochrome Light Theme"
                aria-checked={theme === 'monochrome-light'}
                role="radio"
              >
                <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>

            {/* Nav Menu Icon */}
            <button
              onClick={handleNavIconClick}
              className={`relative group p-2 rounded-full flex flex-col justify-center items-end gap-1.5 focus:outline-none cursor-pointer transition-all duration-300 ${
                isLight
                  ? 'hover:bg-zinc-100 active:bg-zinc-200 text-[#0c0a09] hover:text-[#d95d39]'
                  : 'hover:bg-white/10 active:bg-white/20 text-white hover:text-[#d95d39]'
              } ${isNavIconAnimating ? 'scale-90' : 'hover:scale-105 active:scale-95'}`}
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`h-[2px] bg-current rounded-full transition-all duration-300 ease-out group-hover:bg-[#d95d39] ${
                  isNavIconAnimating
                    ? 'w-6 -translate-x-1 rotate-6'
                    : 'w-5 sm:w-6 group-hover:w-6'
                }`}
              />
              <span
                className={`h-[2px] bg-current rounded-full transition-all duration-300 ease-out group-hover:bg-[#d95d39] ${
                  isNavIconAnimating
                    ? 'w-6 translate-x-0.5 -rotate-6'
                    : 'w-3.5 sm:w-4 group-hover:w-6'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* 
        ========================================================================
        1. HERO SECTION
        Now includes a prominent "Let's Talk" contact button directly in the hero stage
        ========================================================================
      */}
      <section
        id="hero"
        className={`relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden border-b ${themeClasses.divider}`}
      >
        {/* Subtle Editorial Grid */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute inset-y-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-4 sm:grid-cols-6 h-full">
            <div className={`h-full border-r ${themeClasses.gridLine}`} />
            <div className={`h-full border-r ${themeClasses.gridLine}`} />
            <div className={`h-full border-r ${themeClasses.gridLine} hidden sm:block`} />
            <div className={`h-full border-r ${themeClasses.gridLine} hidden sm:block`} />
            <div className={`h-full border-r ${themeClasses.gridLine}`} />
            <div className={`h-full border-r ${themeClasses.gridLine}`} />
          </div>
          <div className={`absolute top-24 inset-x-0 border-b ${themeClasses.gridLine}`} />
          <div className={`absolute top-1/2 inset-x-0 border-b ${themeClasses.gridLine}`} />
          <div className={`absolute bottom-28 inset-x-0 border-b ${themeClasses.gridLine}`} />
        </div>

        {/* Top Spacer */}
        <div className="h-16 sm:h-20" aria-hidden="true" />

        {/* Hero Main Stage */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 sm:px-10 py-8 sm:py-12">
          {/* Faded Background Typography ASH */}
          <div className="absolute inset-x-0 top-[10%] sm:top-[14%] flex justify-center pointer-events-none select-none z-0">
            <h1
              className="font-display font-extrabold text-[22vw] sm:text-[25vw] leading-none tracking-normal uppercase text-center transition-all duration-500 select-none"
              style={getBgAshStyle()}
            >
              ASH
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col justify-center min-h-[380px] sm:min-h-[440px] max-w-4xl"
          >
            <div className="flex flex-col justify-center space-y-6 sm:space-y-7">
              {/* Main Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.2] tracking-normal ${themeClasses.heading} max-w-3xl`}
              >
                I build full-stack web applications, intuitive interfaces, and distinctive visual identities.
              </motion.h2>

              {/* Disciplines Kicker */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-mono tracking-wider ${themeClasses.sectionSub}`}
              >
                <span className={`font-medium ${themeClasses.heading}`}>Full-Stack Web</span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span className={`font-medium ${themeClasses.heading}`}>UI/UX</span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span className={`font-medium ${themeClasses.heading}`}>Graphic Design</span>
              </motion.div>

              {/* Hero Action Buttons: Direct Contact Button + Jump to Projects */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#d95d39] hover:bg-[#c24e2b] text-white font-mono font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-[#d95d39]/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Let&apos;s Talk About Your Project</span>
                </button>

                <button
                  onClick={() => scrollToSection('works')}
                  className={`px-5 py-3 rounded-xl border text-sm font-mono font-semibold transition-all cursor-pointer ${
                    isLight
                      ? 'bg-white border-[#ded8cc] text-[#0c0a09] hover:border-[#d95d39] hover:bg-[#faf6f0] shadow-xs'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <span>See Curated Projects ↓</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Hero Bottom Row: ©2026 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-6 sm:pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4"
        >
          <div className="flex flex-col">
            <span className={`text-xs sm:text-sm font-mono tracking-wider font-semibold ${isLight ? 'text-[#292524]' : 'text-zinc-300'}`}>
              ©2026 ASH · JHON BON ASHLEY ALIPARO
            </span>
          </div>
          <div className={`text-xs font-mono font-medium ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
            Available for new projects · Fast async communication
          </div>
        </motion.div>
      </section>

      {/* 
        ========================================================================
        2. PROJECTS SECTION (Curated 3-4 Projects with Business Results)
        ========================================================================
      */}
      <SectionDivider
        theme={theme}
        label="01 // SELECTED WORK"
        badge="CURATED PROJECTS"
        subtitle="3-4 PROVEN RESULTS"
        indexCode="SEC.01"
      />

      <section id="works" className={`relative py-12 sm:py-16 md:py-20 border-b ${themeClasses.divider} px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto`}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className={`text-xs font-mono uppercase tracking-widest ${themeClasses.sectionSub}`}>
                01 · Projects by Discipline
              </span>
            </div>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight ${themeClasses.heading}`}>
              Curated Systems Built for Real Businesses
            </h2>
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.25rem] mt-2.5 leading-relaxed font-normal ${themeClasses.bodyText}`}>
              Explore projects by discipline or view all curated systems. Click any of the 3 buttons below to filter.
            </p>
          </motion.div>

          {/* All Projects Filter Button (Larger, No 2-Stack / Matrix text) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setProjectDisciplineFilter('all')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer border shadow-xs hover:scale-[1.02] active:scale-[0.98] ${
                projectDisciplineFilter === 'all'
                  ? 'bg-[#d95d39] text-white border-[#d95d39] shadow-md shadow-[#d95d39]/25 ring-2 ring-[#d95d39]/20'
                  : isLight
                  ? 'bg-white text-[#0c0a09] border-[#ded8cc] hover:border-[#d95d39] hover:bg-[#faf6f0]'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              All Projects
            </button>
          </div>
        </div>

        {/* 
          ========================================================================
          THE 3 INTERACTIVE DISCIPLINE BUTTONS (Compact & Refined Terracotta Outline)
          1. Full Stack
          2. UI/UX
          3. Graphics Design
          ========================================================================
        */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
          {/* Button 01: Full Stack */}
          <motion.button
            whileHover={{ y: -2, scale: 1.008 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setProjectDisciplineFilter('fullstack')}
            className={`relative p-3 sm:p-3.5 md:p-4 rounded-xl text-left transition-all duration-250 cursor-pointer overflow-hidden group ${
              projectDisciplineFilter === 'fullstack'
                ? isLight
                  ? 'bg-white text-[#0c0a09] border-2 border-[#d95d39] shadow-md shadow-[#d95d39]/15 ring-2 ring-[#d95d39]/20'
                  : 'bg-[#181820] text-white border-2 border-[#e05a36] shadow-lg shadow-[#e05a36]/15 ring-2 ring-[#e05a36]/25'
                : isLight
                ? 'bg-white text-[#0c0a09] border border-[#ded8cc] hover:border-[#d95d39]/50 hover:bg-[#faf6f0]'
                : 'bg-[#121217] text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:bg-[#15151b]'
            }`}
          >
            {/* Ambient Terracotta Glow Accent */}
            {projectDisciplineFilter === 'fullstack' && (
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-[#d95d39]/20 to-transparent rounded-full blur-xl pointer-events-none" />
            )}

            <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className={`font-mono font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-md border ${
                    projectDisciplineFilter === 'fullstack'
                      ? 'bg-[#d95d39] text-white border-[#d95d39] shadow-xs'
                      : isLight
                      ? 'bg-[#f4efe4] text-[#0c0a09] border-[#ded8cc]'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}
                >
                  01
                </span>
                {projectDisciplineFilter === 'fullstack' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold text-[#d95d39]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d95d39] animate-pulse" />
                    Active
                  </span>
                )}
              </div>
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  projectDisciplineFilter === 'fullstack'
                    ? 'bg-[#d95d39]/15 text-[#d95d39]'
                    : isLight
                    ? 'bg-[#f4efe4] text-[#292524] group-hover:text-[#d95d39]'
                    : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'
                }`}
              >
                <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <h3 className={`font-display font-bold text-sm sm:text-base md:text-lg tracking-tight ${
              projectDisciplineFilter === 'fullstack'
                ? isLight ? 'text-[#0c0a09]' : 'text-white'
                : isLight ? 'text-[#0c0a09]' : 'text-zinc-200'
            }`}>
              Full Stack
            </h3>
            <p className={`text-[11px] sm:text-xs md:text-sm mt-0.5 line-clamp-1 font-medium ${
              projectDisciplineFilter === 'fullstack'
                ? isLight ? 'text-[#292524]' : 'text-zinc-300'
                : isLight ? 'text-[#44403c]' : 'text-zinc-400'
            }`}>
              Python, Flask, PHP & SQL Databases
            </p>
          </motion.button>

          {/* Button 02: UI/UX */}
          <motion.button
            whileHover={{ y: -2, scale: 1.008 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setProjectDisciplineFilter('uiux')}
            className={`relative p-3 sm:p-3.5 md:p-4 rounded-xl text-left transition-all duration-250 cursor-pointer overflow-hidden group ${
              projectDisciplineFilter === 'uiux'
                ? isLight
                  ? 'bg-white text-[#0c0a09] border-2 border-[#d95d39] shadow-md shadow-[#d95d39]/15 ring-2 ring-[#d95d39]/20'
                  : 'bg-[#181820] text-white border-2 border-[#e05a36] shadow-lg shadow-[#e05a36]/15 ring-2 ring-[#e05a36]/25'
                : isLight
                ? 'bg-white text-[#0c0a09] border border-[#ded8cc] hover:border-[#d95d39]/50 hover:bg-[#faf6f0]'
                : 'bg-[#121217] text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:bg-[#15151b]'
            }`}
          >
            {/* Ambient Terracotta Glow Accent */}
            {projectDisciplineFilter === 'uiux' && (
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-[#d95d39]/20 to-transparent rounded-full blur-xl pointer-events-none" />
            )}

            <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className={`font-mono font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-md border ${
                    projectDisciplineFilter === 'uiux'
                      ? 'bg-[#d95d39] text-white border-[#d95d39] shadow-xs'
                      : isLight
                      ? 'bg-[#f4efe4] text-[#0c0a09] border-[#ded8cc]'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}
                >
                  02
                </span>
                {projectDisciplineFilter === 'uiux' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold text-[#d95d39]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d95d39] animate-pulse" />
                    Active
                  </span>
                )}
              </div>
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  projectDisciplineFilter === 'uiux'
                    ? 'bg-[#d95d39]/15 text-[#d95d39]'
                    : isLight
                    ? 'bg-[#f4efe4] text-[#292524] group-hover:text-[#d95d39]'
                    : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'
                }`}
              >
                <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <h3 className={`font-display font-bold text-sm sm:text-base md:text-lg tracking-tight ${
              projectDisciplineFilter === 'uiux'
                ? isLight ? 'text-[#0c0a09]' : 'text-white'
                : isLight ? 'text-[#0c0a09]' : 'text-zinc-200'
            }`}>
              UI/UX
            </h3>
            <p className={`text-[11px] sm:text-xs md:text-sm mt-0.5 line-clamp-1 font-medium ${
              projectDisciplineFilter === 'uiux'
                ? isLight ? 'text-[#292524]' : 'text-zinc-300'
                : isLight ? 'text-[#44403c]' : 'text-zinc-400'
            }`}>
              Figma Prototyping & Mobile Usability
            </p>
          </motion.button>

          {/* Button 03: Graphics Design */}
          <motion.button
            whileHover={{ y: -2, scale: 1.008 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setProjectDisciplineFilter('graphic')}
            className={`relative p-3 sm:p-3.5 md:p-4 rounded-xl text-left transition-all duration-250 cursor-pointer overflow-hidden group ${
              projectDisciplineFilter === 'graphic'
                ? isLight
                  ? 'bg-white text-[#0c0a09] border-2 border-[#d95d39] shadow-md shadow-[#d95d39]/15 ring-2 ring-[#d95d39]/20'
                  : 'bg-[#181820] text-white border-2 border-[#e05a36] shadow-lg shadow-[#e05a36]/15 ring-2 ring-[#e05a36]/25'
                : isLight
                ? 'bg-white text-[#0c0a09] border border-[#ded8cc] hover:border-[#d95d39]/50 hover:bg-[#faf6f0]'
                : 'bg-[#121217] text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:bg-[#15151b]'
            }`}
          >
            {/* Ambient Terracotta Glow Accent */}
            {projectDisciplineFilter === 'graphic' && (
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-[#d95d39]/20 to-transparent rounded-full blur-xl pointer-events-none" />
            )}

            <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className={`font-mono font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-md border ${
                    projectDisciplineFilter === 'graphic'
                      ? 'bg-[#d95d39] text-white border-[#d95d39] shadow-xs'
                      : isLight
                      ? 'bg-[#f4efe4] text-[#0c0a09] border-[#ded8cc]'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}
                >
                  03
                </span>
                {projectDisciplineFilter === 'graphic' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold text-[#d95d39]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d95d39] animate-pulse" />
                    Active
                  </span>
                )}
              </div>
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  projectDisciplineFilter === 'graphic'
                    ? 'bg-[#d95d39]/15 text-[#d95d39]'
                    : isLight
                    ? 'bg-[#f4efe4] text-[#292524] group-hover:text-[#d95d39]'
                    : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <h3 className={`font-display font-bold text-sm sm:text-base md:text-lg tracking-tight ${
              projectDisciplineFilter === 'graphic'
                ? isLight ? 'text-[#0c0a09]' : 'text-white'
                : isLight ? 'text-[#0c0a09]' : 'text-zinc-200'
            }`}>
              Graphics Design
            </h3>
            <p className={`text-[11px] sm:text-xs md:text-sm mt-0.5 line-clamp-1 font-medium ${
              projectDisciplineFilter === 'graphic'
                ? isLight ? 'text-[#292524]' : 'text-zinc-300'
                : isLight ? 'text-[#44403c]' : 'text-zinc-400'
            }`}>
              Pictures Bento · Logos, Menus & Packaging
            </p>
          </motion.button>
        </div>

        {/* 
          If Graphics Design is selected: Render the Pictures-Only Bento Gallery (Mosaic style from user reference image)!
          Otherwise: Render the Curated Projects 2-column Grid (strictly 2 stack max)
        */}
        {projectDisciplineFilter === 'graphic' ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <GraphicsPictureBento theme={theme} onOpenContact={() => setIsContactOpen(true)} />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {(projectDisciplineFilter === 'all'
              ? CURATED_PROJECTS.slice(0, 4)
              : CURATED_PROJECTS.filter((p) => p.disciplineId === projectDisciplineFilter)
            ).map((proj, index) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 45, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15, margin: '-40px' }}
                transition={{
                  duration: 0.65,
                  delay: (index % 2) * 0.14,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setSelectedProject(proj)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(proj);
                  }
                }}
                className={`group cursor-pointer p-5 sm:p-6 lg:p-7 rounded-2xl border transition-all duration-300 ${themeClasses.card} flex flex-col justify-between`}
              >
                <div>
                  {/* Visual Project Photo Container - Compact height to eliminate excessive scroll */}
                  <div className="relative h-40 sm:h-48 md:h-52 lg:h-56 w-full rounded-xl overflow-hidden mb-4 bg-zinc-950/40 border border-zinc-800/40 group-hover:border-zinc-700 transition-colors">
                    <img
                      src={proj.image}
                      alt={proj.imageAlt || proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Category Pill */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-mono text-white">
                      {proj.disciplineId === 'fullstack' && <Code className="w-3.5 h-3.5 text-orange-400" />}
                      {proj.disciplineId === 'uiux' && <Layout className="w-3.5 h-3.5 text-cyan-400" />}
                      {proj.disciplineId === 'graphic' && <Palette className="w-3.5 h-3.5 text-amber-400" />}
                      <span className="truncate max-w-[140px] sm:max-w-none">{proj.category}</span>
                    </div>

                    {/* Quick Look Photo badge */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-zinc-200 group-hover:text-white group-hover:border-white/50 transition-colors shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick Look</span>
                    </div>

                    {/* Year & Client stamp */}
                    <div className="absolute bottom-2.5 left-2.5 text-xs sm:text-sm font-mono text-zinc-300 drop-shadow flex items-center gap-2">
                      <span className="font-bold text-white">{proj.year}</span>
                      <span>·</span>
                      <span className="truncate max-w-[140px] sm:max-w-[200px]">{proj.client}</span>
                    </div>
                  </div>

                  {/* Project Result Headline - Enlarged for Large Screen Legibility */}
                  <h3 className={`text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-[1.95rem] font-display font-extrabold tracking-tight transition-colors line-clamp-2 ${themeClasses.cardTitle} group-hover:text-[#d95d39]`}>
                    {proj.title}
                  </h3>

                  {/* Plain-English Business Result Description - Enlarged font for Large Screen Legibility */}
                  <p className={`text-base sm:text-lg md:text-xl lg:text-[1.25rem] xl:text-[1.35rem] mt-3 leading-relaxed font-normal ${themeClasses.cardSub}`}>
                    {proj.subtitle}
                  </p>

                  {/* Tech Tags - top 3 with clearer text */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {proj.deliverables.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-xs sm:text-sm font-mono px-3 py-1 rounded-md border ${
                          isLight
                            ? 'bg-[#f4efe4] border-[#ded8cc] text-[#0c0a09] font-semibold'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`mt-5 pt-4 border-t ${themeClasses.divider} flex items-center justify-between text-xs sm:text-sm md:text-base`}>
                  <span className={`text-xs sm:text-sm md:text-base font-mono truncate max-w-[200px] font-medium ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
                    Role: <strong className={isLight ? 'text-[#0c0a09]' : 'text-zinc-200'}>{proj.role}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold font-mono text-xs sm:text-sm md:text-base group-hover:translate-x-1 transition-transform text-[#d95d39] shrink-0">
                    Inspect Results
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 
          CTA Strip right after Projects:
          "Want something like this? Let's talk." Catches clients when interest peaks
        */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-8 sm:mt-10 p-4 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
            isLight
              ? 'bg-white border-[#ded8cc] shadow-sm'
              : 'bg-gradient-to-r from-[#171412] via-[#1a1714] to-[#141210] border-orange-500/30'
          }`}
        >
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d95d39]" />
              <h4 className={`text-base sm:text-lg font-display font-extrabold tracking-tight ${isLight ? 'text-[#0c0a09]' : 'text-white'}`}>
                Want something like this built for your business?
              </h4>
            </div>
            <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-[#292524]' : 'text-zinc-300'}`}>
              Tell me what manual process is slowing you down or what website you need launched. Let&apos;s map out a solution.
            </p>
          </div>

          <button
            onClick={() => setIsContactOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs shrink-0 flex items-center gap-2 shadow-md hover:shadow-orange-500/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Let&apos;s Talk</span>
          </button>
        </motion.div>
      </section>

      {/* 
        ========================================================================
        2. SERVICES / WHAT I CAN BUILD FOR YOU SECTION
        Reworded so clients understand outcomes, keeping tech names as small tags
        ========================================================================
      */}
      <SectionDivider
        theme={theme}
        label="02 // WHAT I CAN BUILD FOR YOU"
        badge="SERVICES"
        subtitle="CLIENT SOLUTIONS"
        indexCode="SEC.02"
      />

      <section id="services" className={`relative py-20 sm:py-28 border-b ${themeClasses.divider} px-6 sm:px-10 max-w-7xl mx-auto`}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 sm:mb-18 max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className={`text-xs font-mono uppercase tracking-widest ${themeClasses.sectionSub}`}>
              02 · What I Can Build For You
            </span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-display font-extrabold tracking-tight ${themeClasses.heading}`}>
            Services Built Around Your Goals
          </h2>
          <p className={`text-base sm:text-lg mt-3.5 leading-relaxed ${themeClasses.sectionSub}`}>
            You don&apos;t need to worry about databases or code syntax. Tell me the business result you want, and I&apos;ll handle everything from architecture to design.
          </p>
        </motion.div>

        {/* 2x2 Services Cards - Compact & Scannable with "More Info" Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
          {CLIENT_SERVICES.map((srv, index) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group p-6 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between ${themeClasses.card}`}
            >
              <div>
                {/* Header: Service Number and Goal */}
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${themeClasses.serviceTag} font-bold`}>
                    SERVICE {srv.number}
                  </span>
                  <span className="text-[11px] font-mono text-[#d95d39] font-bold uppercase tracking-wider">
                    Client Solution
                  </span>
                </div>

                {/* Headline */}
                <h3 className={`text-xl sm:text-2xl md:text-3xl font-display font-extrabold tracking-tight group-hover:translate-x-0.5 transition-transform duration-200 ${themeClasses.serviceTitle}`}>
                  {srv.headline}
                </h3>

                {/* Plain-English Goal Banner: The primary thing the client cares about */}
                <div className={`mt-3.5 p-3.5 rounded-xl border text-xs sm:text-sm font-mono leading-relaxed ${
                  isLight 
                    ? 'bg-[#f8f5ee] border-[#ded8cc] text-[#1c1917]' 
                    : 'bg-[#161620] border-orange-500/20 text-zinc-200'
                }`}>
                  <span className="font-bold uppercase tracking-wider text-[11px] block mb-0.5 text-[#d95d39]">
                    The Goal:
                  </span>
                  <span className="font-medium">{srv.clientGoal}</span>
                </div>

                {/* Key Deliverables at a Glance (2 punchy points) */}
                <div className="mt-3.5 space-y-1.5">
                  {srv.whatYouGet.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <Check className="w-3.5 h-3.5 text-[#d95d39] shrink-0 mt-0.5" />
                      <span className={`font-medium ${isLight ? 'text-[#1c1917]' : 'text-zinc-200'}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Strip: Primary Tech Tag + Prominent "More Info" Button */}
              <div className={`mt-5 pt-3.5 border-t flex items-center justify-between gap-3 ${themeClasses.divider}`}>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {srv.techTags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border ${themeClasses.serviceTag}`}
                    >
                      {tag}
                    </span>
                  ))}
                  {srv.techTags.length > 2 && (
                    <span className={`text-[10px] font-mono font-bold ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
                      +{srv.techTags.length - 2} more
                    </span>
                  )}
                </div>

                {/* The More Info Button */}
                <button
                  onClick={() => setSelectedService(srv)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer hover:scale-105 active:scale-95 bg-[#d95d39] hover:bg-[#c24e2b] text-white border-[#d95d39] shadow-xs hover:shadow-md hover:shadow-[#d95d39]/20 shrink-0"
                >
                  <span>More Info</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 
        ========================================================================
        3. ABOUT ME SECTION (3-4 Sentences - Clean Editorial Layout)
        ========================================================================
      */}
      <SectionDivider
        theme={theme}
        label="03 // ABOUT ME"
        badge="BACKGROUND"
        subtitle="WHO YOU WORK WITH"
        indexCode="SEC.03"
      />

      <section id="about" className={`relative py-20 sm:py-28 border-b ${themeClasses.divider} px-6 sm:px-10 max-w-5xl mx-auto`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#d95d39] animate-pulse" />
              <span className={`text-xs font-mono uppercase tracking-widest ${themeClasses.sectionSub}`}>
                03 · About Jhon Bon Ashley Aliparo
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight ${themeClasses.heading} max-w-3xl`}>
              Engineering Precision Meets Distinctive Visual Design
            </h2>
          </div>

          {/* Exactly 3-4 Punchy Sentences */}
          <div className={`space-y-5 text-base sm:text-lg md:text-xl leading-relaxed font-normal max-w-3xl ${themeClasses.bodyText}`}>
            <p>
              I am <strong className={isLight ? 'text-[#0c0a09] font-bold' : 'text-white'}>Jhon Bon Ashley Aliparo (Ash)</strong> — a full-stack web developer and designer based in the Philippines, working with businesses worldwide.
            </p>
            <p>
              Instead of hiring separate agencies for backend coding and visual design, I handle the complete pipeline: from relational database architecture and secure logins, to interactive mobile interfaces in Figma, and custom vector logos.
            </p>
            <p>
              My focus is building practical, zero-fluff software and clear brand looks that help your business make sales and run smoother every day.
            </p>
          </div>

          {/* Quick Credentials Strip */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t ${themeClasses.divider} max-w-3xl`}>
            <div>
              <div className={`text-xl sm:text-2xl font-bold font-display tracking-tight ${themeClasses.metricNum}`}>
                Full-Stack
              </div>
              <div className={`text-xs mt-1 font-mono ${themeClasses.sectionSub}`}>
                Python, PHP & SQL
              </div>
            </div>
            <div>
              <div className={`text-xl sm:text-2xl font-bold font-display tracking-tight ${themeClasses.metricNum}`}>
                UI/UX & Figma
              </div>
              <div className={`text-xs mt-1 font-mono ${themeClasses.sectionSub}`}>
                Mobile-First Prototypes
              </div>
            </div>
            <div>
              <div className={`text-xl sm:text-2xl font-bold font-display tracking-tight ${themeClasses.metricNum}`}>
                Direct
              </div>
              <div className={`text-xs mt-1 font-mono ${themeClasses.sectionSub}`}>
                No Agency Middlemen
              </div>
            </div>
          </div>

          {/* Direct Contact Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3 rounded-xl font-mono font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer shadow-md bg-[#d95d39] hover:bg-[#c24e2b] text-white hover:scale-105 active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Start a Project with Ash</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* 
        ========================================================================
        4. CONTACTS / COLLABORATE SECTION
        ========================================================================
      */}
      <SectionDivider
        theme={theme}
        label="04 // CONTACT"
        badge="LET'S TALK"
        subtitle="PROJECT INQUIRIES OPEN"
        indexCode="SEC.04"
      />

      <section id="contact" className="relative py-20 sm:py-28 px-6 sm:px-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={`relative rounded-3xl p-8 sm:p-14 border overflow-hidden ${themeClasses.contactBanner}`}
        >
          <div className="absolute inset-0 editorial-grid opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xs text-white tracking-wider">ASH</span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-medium">
                Ready to build together?
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
              Let&apos;s build something that moves your business forward.
            </h2>

            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-xl font-medium">
              Whether you need a custom database portal, a clickable mobile prototype, or a distinctive brand identity, I&apos;m ready to help. Fast async communication across worldwide timezones.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setIsContactOpen(true)}
                className="min-h-[54px] px-8 rounded-xl bg-[#d95d39] hover:bg-[#c24e2b] text-white font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-[#d95d39]/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Send Project Inquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText('ashaliparo@gmail.com');
                  setIsContactOpen(true);
                }}
                className="min-h-[54px] px-6 rounded-xl border border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:text-white hover:bg-zinc-800 text-sm font-mono flex items-center justify-center transition-all cursor-pointer"
                title="Click to copy email and message Ash"
              >
                ashaliparo@gmail.com
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Editorial Footer */}
      <footer className={`border-t ${themeClasses.divider} py-10 px-6 sm:px-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono ${isLight ? 'text-[#44403c] font-medium' : 'text-zinc-400'}`}>
        <div className="flex items-center gap-2.5">
          <span className="font-display font-extrabold text-sm text-current tracking-wider">ASH</span>
          <span>·</span>
          <span className={`font-display font-bold text-sm ${themeClasses.heading}`}>Jhon Bon Ashley Aliparo</span>
          <span>·</span>
          <span>Full-Stack · UI/UX · Graphic Design</span>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => scrollToSection('hero')} className="hover:text-[#d95d39] font-bold transition-colors cursor-pointer">
            Back to Top ↑
          </button>
          <span>All Rights Reserved © 2026 ASH</span>
        </div>
      </footer>

      {/* Modals & Full-Screen Nav */}
      <FullScreenNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onSelectSection={scrollToSection}
        theme={theme}
        onThemeChange={setTheme}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        theme={theme}
        onContactClick={() => setIsContactOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => {
          setIsContactOpen(false);
          setScopeForInquiry(undefined);
          setCategoryForInquiry(undefined);
        }}
        theme={theme}
        initialScopeDetails={scopeForInquiry}
        initialCategory={categoryForInquiry}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        theme={theme}
        onContactClick={() => setIsContactOpen(true)}
      />

      {/* Quick Command Palette (Cmd+K / Ctrl+K & Floating Dock) */}
      <QuickCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpen={() => setIsCommandPaletteOpen(true)}
        theme={theme}
        onThemeToggle={() =>
          setTheme(theme === 'monochrome-dark' ? 'monochrome-light' : 'monochrome-dark')
        }
        onNavigateSection={scrollToSection}
        onFilterProjects={(filter) => {
          setProjectDisciplineFilter(filter);
        }}
        onOpenContact={handleOpenNormalContact}
      />
    </div>
  );
}
