import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Sun, Moon, Copy, Check, Mail, FolderKanban, X, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface CommandItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords?: string[];
}

interface QuickCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
  onNavigateSection: (sectionId: string) => void;
  onFilterProjects: (filter: 'all' | 'fullstack' | 'uiux' | 'graphic') => void;
  onOpenContact: () => void;
}

export const QuickCommandPalette: React.FC<QuickCommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpen,
  theme,
  onThemeToggle,
  onNavigateSection,
  onFilterProjects,
  onOpenContact
}) => {
  const isLight = theme === 'monochrome-light';
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const copyEmail = () => {
    navigator.clipboard.writeText('ashaliparo@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1800);
  };

  const commandItems: CommandItem[] = useMemo(() => [
    {
      id: 'contact',
      category: 'Direct Inquiries',
      title: 'Send Project Inquiry to Ash',
      subtitle: 'Open direct message dialog with instant response tracking',
      icon: Mail,
      action: () => {
        onOpenContact();
        onClose();
      },
      keywords: ['hire', 'message', 'email', 'chat', 'book']
    },
    {
      id: 'copy-email',
      category: 'Direct Inquiries',
      title: 'Copy Email Address (ashaliparo@gmail.com)',
      subtitle: 'Copy verified direct contact to your clipboard',
      icon: copiedEmail ? Check : Copy,
      action: copyEmail,
      keywords: ['copy', 'email', 'address', 'clipboard']
    },
    {
      id: 'filter-fullstack',
      category: 'Projects',
      title: 'Filter Projects: Full-Stack Web Development',
      subtitle: 'View database portals, SQL inventory systems, and Python/Flask apps',
      icon: FolderKanban,
      action: () => {
        onFilterProjects('fullstack');
        onNavigateSection('works');
        onClose();
      },
      keywords: ['fullstack', 'python', 'flask', 'mysql', 'sql', 'php']
    },
    {
      id: 'filter-uiux',
      category: 'Projects',
      title: 'Filter Projects: UI/UX & Figma Prototypes',
      subtitle: 'View clickable phone prototypes, booking flows, and wireframes',
      icon: FolderKanban,
      action: () => {
        onFilterProjects('uiux');
        onNavigateSection('works');
        onClose();
      },
      keywords: ['figma', 'mobile', 'prototype', 'ui', 'ux', 'wireframe']
    },
    {
      id: 'filter-graphic',
      category: 'Projects',
      title: 'Filter Projects: Graphic Design & Branding',
      subtitle: 'View vector logo marks, restaurant menus, and brand guidelines',
      icon: FolderKanban,
      action: () => {
        onFilterProjects('graphic');
        onNavigateSection('works');
        onClose();
      },
      keywords: ['branding', 'logo', 'menu', 'flyer', 'packaging', 'vector']
    },
    {
      id: 'filter-all',
      category: 'Projects',
      title: 'Show All Selected Projects',
      subtitle: 'View the complete multidisciplinary works gallery',
      icon: FolderKanban,
      action: () => {
        onFilterProjects('all');
        onNavigateSection('works');
        onClose();
      },
      keywords: ['all', 'reset', 'works', 'portfolio']
    },
    {
      id: 'sec-services',
      category: 'Navigation',
      title: 'Jump to: What I Can Build For You (Services)',
      subtitle: 'View client solutions for web apps, prototypes, and branding',
      icon: ArrowRight,
      action: () => {
        onNavigateSection('services');
        onClose();
      },
      keywords: ['services', 'solutions', 'offerings']
    },
    {
      id: 'sec-about',
      category: 'Navigation',
      title: 'Jump to: About Jhon Bon Ashley Aliparo',
      subtitle: 'Background, triple-threat multidisciplinary skillset & portrait',
      icon: ArrowRight,
      action: () => {
        onNavigateSection('about');
        onClose();
      },
      keywords: ['about', 'bio', 'ash', 'background', 'photo']
    },
    {
      id: 'toggle-theme',
      category: 'Preferences',
      title: isLight ? 'Switch to Dark Mode (Obsidian Stealth)' : 'Switch to Light Mode (Gallery Bone)',
      subtitle: 'Toggle global color palette theme',
      icon: isLight ? Moon : Sun,
      action: () => {
        onThemeToggle();
        onClose();
      },
      keywords: ['theme', 'dark', 'light', 'mode', 'color']
    }
  ], [isLight, copiedEmail, onOpenContact, onFilterProjects, onNavigateSection, onThemeToggle, onClose]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return commandItems;
    const q = query.toLowerCase();
    return commandItems.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords?.some((k) => k.includes(q))
    );
  }, [commandItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <>
      {/* Floating Quick Dock Trigger Pill in bottom right */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={onOpen}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-xl backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 ${
            isLight
              ? 'bg-white/95 border-[#ded8cc] text-[#0c0a09] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:border-[#d95d39]'
              : 'bg-[#101015]/95 border-zinc-800 text-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-zinc-600'
          }`}
          title="Open Quick Command Palette (Cmd + K / Ctrl + K)"
          aria-label="Open Quick Command Palette"
        >
          <Search className="w-3.5 h-3.5 text-[#d95d39]" />
          <span className="text-xs font-mono font-bold">Quick Menu</span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase ${
              isLight ? 'bg-[#f8f5ee] border-[#ded8cc] text-[#44403c]' : 'bg-zinc-900 border-zinc-700 text-zinc-400'
            }`}
          >
            ⌘K
          </span>
        </button>
      </div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />

            {/* Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`relative z-10 w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden ${
                isLight
                  ? 'bg-white border-[#ded8cc] text-[#0c0a09]'
                  : 'bg-[#121218] border-zinc-800 text-white'
              }`}
            >
              {/* Search Header */}
              <div
                className={`flex items-center gap-3 px-4 py-3.5 border-b ${
                  isLight ? 'border-[#ded8cc] bg-[#fdfbf7]' : 'border-zinc-800 bg-zinc-950/60'
                }`}
              >
                <Search className="w-4 h-4 text-[#d95d39] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command, jump to a section, or search projects..."
                  className={`w-full bg-transparent text-sm focus:outline-none font-mono ${
                    isLight ? 'text-[#0c0a09] placeholder:text-[#78716c]' : 'text-white placeholder:text-zinc-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={onClose}
                  className={`p-1 rounded-md transition-colors ${
                    isLight ? 'hover:bg-[#ded8cc] text-[#78716c]' : 'hover:bg-zinc-800 text-zinc-400'
                  }`}
                  aria-label="Close command palette"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredItems.length === 0 ? (
                  <div className="py-8 text-center text-xs font-mono opacity-60">
                    No matching commands found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-3 transition-colors cursor-pointer border ${
                          isSelected
                            ? isLight
                              ? 'bg-[#f8f5ee] border-[#d95d39]/40 text-[#0c0a09]'
                              : 'bg-zinc-900 border-zinc-700 text-white'
                            : 'border-transparent text-inherit'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-[#d95d39] text-white border-[#d95d39]'
                                : isLight
                                  ? 'bg-white border-[#ded8cc] text-[#44403c]'
                                  : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-display font-bold truncate">
                              {item.title}
                            </div>
                            <div
                              className={`text-[11px] truncate ${
                                isLight ? 'text-[#78716c]' : 'text-zinc-400'
                              }`}
                            >
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono shrink-0 uppercase tracking-wider ${
                            isLight ? 'text-[#a8a29e]' : 'text-zinc-500'
                          }`}
                        >
                          {item.category}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer Helper */}
              <div
                className={`px-4 py-2 border-t text-[11px] font-mono flex items-center justify-between ${
                  isLight
                    ? 'border-[#ded8cc] bg-[#f8f5ee] text-[#78716c]'
                    : 'border-zinc-800 bg-zinc-950/40 text-zinc-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
                <span>ASH Portfolio 2026</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
