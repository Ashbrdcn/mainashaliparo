import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, ArrowUpRight, Calculator, Clock, DollarSign, Layers, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface ProjectEstimatorProps {
  theme: ThemeMode;
  onOpenInquiryWithScope: (scopeSummary: string, category: string) => void;
}

interface ProjectTypeOption {
  id: string;
  name: string;
  category: string;
  baseWeeks: number;
  baseMinPrice: number;
  baseMaxPrice: number;
  desc: string;
  defaultModules: string[];
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'webapp',
    name: 'Web App & Database Portal',
    category: 'Full-Stack Web Development',
    baseWeeks: 3,
    baseMinPrice: 1200,
    baseMaxPrice: 1900,
    desc: 'Secure login-protected web application to manage inventory, customer data, and daily workflows.',
    defaultModules: ['auth', 'database', 'responsive']
  },
  {
    id: 'uiux',
    name: 'Mobile UI/UX & Figma Prototype',
    category: 'UI/UX Interface Design',
    baseWeeks: 2,
    baseMinPrice: 850,
    baseMaxPrice: 1400,
    desc: 'High-fidelity clickable Figma prototype tested with real customer user flows before writing code.',
    defaultModules: ['prototype', 'responsive']
  },
  {
    id: 'branding',
    name: 'Logo, Menus & Visual Identity',
    category: 'Graphic Design & Visual Identity',
    baseWeeks: 1.5,
    baseMinPrice: 650,
    baseMaxPrice: 1100,
    desc: 'Authoritative vector logo mark, press-ready print menus/flyers, and cohesive brand guidelines.',
    defaultModules: ['print']
  },
  {
    id: 'turnkey',
    name: 'Full Turnkey Suite (Code + Design)',
    category: 'Full-Stack Web Development',
    baseWeeks: 4,
    baseMinPrice: 2200,
    baseMaxPrice: 3400,
    desc: 'Complete end-to-end execution: database architecture, frontend app, UI/UX prototype, and branding.',
    defaultModules: ['auth', 'database', 'responsive', 'prototype', 'ai_speed']
  }
];

interface ModuleOption {
  id: string;
  label: string;
  desc: string;
  additionalWeeks: number;
  additionalMinPrice: number;
  additionalMaxPrice: number;
}

const AVAILABLE_MODULES: ModuleOption[] = [
  {
    id: 'auth',
    label: 'User Authentication & Role Permissions',
    desc: 'Encrypted login system with separate roles (Admin, Staff, Client).',
    additionalWeeks: 0.5,
    additionalMinPrice: 250,
    additionalMaxPrice: 350
  },
  {
    id: 'database',
    label: 'SQL Database & Data Validation',
    desc: 'Relational MySQL/PostgreSQL schema with fast live search queries.',
    additionalWeeks: 0.5,
    additionalMinPrice: 300,
    additionalMaxPrice: 450
  },
  {
    id: 'responsive',
    label: 'Mobile-First Responsive Layouts',
    desc: 'Ergonomic screen layouts tested for one-handed phone browsing.',
    additionalWeeks: 0.5,
    additionalMinPrice: 200,
    additionalMaxPrice: 300
  },
  {
    id: 'prototype',
    label: 'Clickable Interactive Prototype',
    desc: 'Full Figma user journey map with tap-through screen animations.',
    additionalWeeks: 0.5,
    additionalMinPrice: 250,
    additionalMaxPrice: 380
  },
  {
    id: 'print',
    label: 'Press-Ready Print Assets (Menus / Signage)',
    desc: 'CMYK high-resolution vector print layouts ready for production.',
    additionalWeeks: 0.5,
    additionalMinPrice: 200,
    additionalMaxPrice: 300
  },
  {
    id: 'ai_speed',
    label: 'AI-Assisted Accelerated Workflow',
    desc: 'Rapid scaffolding with manual security & architecture audits.',
    additionalWeeks: -0.5,
    additionalMinPrice: 0,
    additionalMaxPrice: 0
  }
];

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  theme,
  onOpenInquiryWithScope
}) => {
  const isLight = theme === 'monochrome-light';

  const [selectedTypeId, setSelectedTypeId] = useState<string>('webapp');
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([
    'auth',
    'database',
    'responsive'
  ]);
  const [isExpedited, setIsExpedited] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedType = useMemo(
    () => PROJECT_TYPES.find((t) => t.id === selectedTypeId) || PROJECT_TYPES[0],
    [selectedTypeId]
  );

  const handleTypeChange = (type: ProjectTypeOption) => {
    setSelectedTypeId(type.id);
    setSelectedModuleIds(type.defaultModules);
  };

  const toggleModule = (id: string) => {
    setSelectedModuleIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  // Calculations
  const calculation = useMemo(() => {
    let minWeeks = selectedType.baseWeeks;
    let minPrice = selectedType.baseMinPrice;
    let maxPrice = selectedType.baseMaxPrice;

    selectedModuleIds.forEach((modId) => {
      // Don't double count if part of base
      if (!selectedType.defaultModules.includes(modId)) {
        const mod = AVAILABLE_MODULES.find((m) => m.id === modId);
        if (mod) {
          minWeeks += mod.additionalWeeks;
          minPrice += mod.additionalMinPrice;
          maxPrice += mod.additionalMaxPrice;
        }
      }
    });

    if (isExpedited) {
      minWeeks = Math.max(1, Math.round(minWeeks * 0.7 * 10) / 10);
      minPrice = Math.round(minPrice * 1.25);
      maxPrice = Math.round(maxPrice * 1.25);
    }

    const maxWeeks = Math.round((minWeeks + 1) * 10) / 10;

    return {
      minWeeks: Math.max(1, minWeeks),
      maxWeeks: Math.max(1.5, maxWeeks),
      minPrice,
      maxPrice
    };
  }, [selectedType, selectedModuleIds, isExpedited]);

  const scopeSummaryText = useMemo(() => {
    const moduleNames = selectedModuleIds
      .map((id) => AVAILABLE_MODULES.find((m) => m.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    return `Project Scope: ${selectedType.name}
Pacing: ${isExpedited ? 'Expedited Fast-Track' : 'Standard Delivery'}
Estimated Timeline: ${calculation.minWeeks} - ${calculation.maxWeeks} weeks
Estimated Investment: $${calculation.minPrice.toLocaleString()} - $${calculation.maxPrice.toLocaleString()} USD
Selected Capabilities: ${moduleNames}`;
  }, [selectedType, isExpedited, calculation, selectedModuleIds]);

  const handleCopyScope = () => {
    navigator.clipboard.writeText(scopeSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleLaunchInquiry = () => {
    onOpenInquiryWithScope(scopeSummaryText, selectedType.category);
  };

  return (
    <div className="w-full">
      <div className="mb-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#d95d39] animate-pulse" />
          <span
            className={`text-xs font-mono uppercase tracking-widest ${
              isLight ? 'text-[#44403c] font-semibold' : 'text-zinc-400'
            }`}
          >
            Interactive Scope & Turnaround Estimator
          </span>
        </div>
        <h3
          className={`text-2xl sm:text-4xl font-display font-extrabold tracking-tight ${
            isLight ? 'text-[#0c0a09]' : 'text-white'
          }`}
        >
          Configure Your Scope & Timeline
        </h3>
        <p
          className={`text-sm sm:text-base mt-2.5 leading-relaxed ${
            isLight ? 'text-[#292524]' : 'text-zinc-300'
          }`}
        >
          Select what your business needs below to receive an instant scope breakdown,
          estimated turnaround time, and investment baseline with zero guesswork.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Controls (Cols 7) */}
        <div className="lg:col-span-7 space-y-7">
          {/* 1. Project Type Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label
                className={`text-xs font-mono uppercase tracking-wider font-bold ${
                  isLight ? 'text-[#0c0a09]' : 'text-zinc-200'
                }`}
              >
                1. Select Core Deliverable
              </label>
              <span className="text-xs font-mono text-[#d95d39] font-semibold">
                Step 1 of 3
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((type) => {
                const isSelected = selectedTypeId === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? isLight
                          ? 'border-[#d95d39] bg-[#fdf9f4] shadow-sm'
                          : 'border-[#d95d39] bg-orange-950/20 text-white shadow-sm'
                        : isLight
                          ? 'border-[#ded8cc] bg-white hover:border-[#a8a29e]'
                          : 'border-zinc-800 bg-[#121216] text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`font-display font-extrabold text-sm ${
                          isSelected
                            ? isLight
                              ? 'text-[#0c0a09]'
                              : 'text-white'
                            : isLight
                              ? 'text-[#0c0a09]'
                              : 'text-zinc-200'
                        }`}
                      >
                        {type.name}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#d95d39] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                        isLight ? 'text-[#44403c]' : 'text-zinc-400'
                      }`}
                    >
                      {type.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Modules & Capabilities */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label
                className={`text-xs font-mono uppercase tracking-wider font-bold ${
                  isLight ? 'text-[#0c0a09]' : 'text-zinc-200'
                }`}
              >
                2. Key Capabilities & Inclusions
              </label>
              <span
                className={`text-xs font-mono ${
                  isLight ? 'text-[#44403c]' : 'text-zinc-400'
                }`}
              >
                {selectedModuleIds.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_MODULES.map((mod) => {
                const isChecked = selectedModuleIds.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isChecked
                        ? isLight
                          ? 'border-[#0c0a09] bg-white shadow-xs'
                          : 'border-zinc-500 bg-zinc-900/90 text-white'
                        : isLight
                          ? 'border-[#ded8cc] bg-[#f8f5ee]/70 text-[#44403c] hover:border-[#a8a29e]'
                          : 'border-zinc-800/80 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                        isChecked
                          ? 'bg-[#d95d39] border-[#d95d39] text-white'
                          : isLight
                            ? 'border-[#a8a29e] bg-white'
                            : 'border-zinc-700 bg-zinc-900'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-xs font-display font-bold leading-tight ${
                          isChecked
                            ? isLight
                              ? 'text-[#0c0a09]'
                              : 'text-white'
                            : isLight
                              ? 'text-[#1c1917]'
                              : 'text-zinc-300'
                        }`}
                      >
                        {mod.label}
                      </div>
                      <div
                        className={`text-[11px] mt-0.5 leading-snug line-clamp-1 ${
                          isLight ? 'text-[#78716c]' : 'text-zinc-400'
                        }`}
                      >
                        {mod.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Delivery Pace Toggle */}
          <div>
            <label
              className={`block text-xs font-mono uppercase tracking-wider font-bold mb-2.5 ${
                isLight ? 'text-[#0c0a09]' : 'text-zinc-200'
              }`}
            >
              3. Delivery Cadence
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsExpedited(false)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  !isExpedited
                    ? isLight
                      ? 'border-[#0c0a09] bg-white text-[#0c0a09] font-bold shadow-xs'
                      : 'border-zinc-400 bg-zinc-900 text-white font-bold'
                    : isLight
                      ? 'border-[#ded8cc] bg-[#f8f5ee] text-[#44403c]'
                      : 'border-zinc-800 bg-[#121216] text-zinc-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d95d39]" />
                  <span className="text-xs font-display font-bold">Standard Cadence</span>
                </div>
                <p
                  className={`text-[11px] mt-1 ${
                    isLight ? 'text-[#78716c]' : 'text-zinc-400'
                  }`}
                >
                  Balanced schedule with weekly milestone checkpoints.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setIsExpedited(true)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isExpedited
                    ? isLight
                      ? 'border-[#d95d39] bg-[#fdf9f4] text-[#0c0a09] font-bold shadow-xs'
                      : 'border-[#d95d39] bg-orange-950/20 text-white font-bold'
                    : isLight
                      ? 'border-[#ded8cc] bg-[#f8f5ee] text-[#44403c]'
                      : 'border-zinc-800 bg-[#121216] text-zinc-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d95d39]" />
                  <span className="text-xs font-display font-bold">Priority Fast-Track</span>
                </div>
                <p
                  className={`text-[11px] mt-1 ${
                    isLight ? 'text-[#78716c]' : 'text-zinc-400'
                  }`}
                >
                  Expedited delivery with prioritized daily builds.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Summary Dashboard Card (Cols 5) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div
            layout
            className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all shadow-xl ${
              isLight
                ? 'bg-white border-[#ded8cc] text-[#0c0a09]'
                : 'bg-[#121218] border-zinc-800 text-white'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-inherit">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#d95d39]" />
                <span className="text-xs font-mono uppercase font-bold tracking-wider">
                  Live Scope Breakdown
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#d95d39] font-bold uppercase">
                {selectedType.category.split(' ')[0]}
              </span>
            </div>

            {/* Big Metrics */}
            <div className="grid grid-cols-2 gap-4 py-5 border-b border-inherit">
              <div>
                <div
                  className={`text-[11px] font-mono uppercase tracking-wider ${
                    isLight ? 'text-[#78716c]' : 'text-zinc-400'
                  }`}
                >
                  Estimated Timeline
                </div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight mt-1 text-[#d95d39]">
                  {calculation.minWeeks} - {calculation.maxWeeks}
                  <span className="text-sm font-sans font-bold ml-1 text-current">
                    weeks
                  </span>
                </div>
                <div
                  className={`text-[11px] mt-0.5 ${
                    isLight ? 'text-[#44403c]' : 'text-zinc-400'
                  }`}
                >
                  {isExpedited ? 'Priority expedited pace' : 'Standard milestone pace'}
                </div>
              </div>

              <div>
                <div
                  className={`text-[11px] font-mono uppercase tracking-wider ${
                    isLight ? 'text-[#78716c]' : 'text-zinc-400'
                  }`}
                >
                  Budget Range (USD)
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-display font-extrabold tracking-tight mt-1 ${
                    isLight ? 'text-[#0c0a09]' : 'text-white'
                  }`}
                >
                  ${calculation.minPrice.toLocaleString()} - ${calculation.maxPrice.toLocaleString()}
                </div>
                <div
                  className={`text-[11px] mt-0.5 ${
                    isLight ? 'text-[#44403c]' : 'text-zinc-400'
                  }`}
                >
                  Direct pricing · Zero lock-in
                </div>
              </div>
            </div>

            {/* Included Deliverables List */}
            <div className="py-4 space-y-2 border-b border-inherit">
              <div
                className={`text-xs font-mono uppercase tracking-wider font-bold ${
                  isLight ? 'text-[#0c0a09]' : 'text-zinc-200'
                }`}
              >
                Scope Specification:
              </div>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2 text-xs">
                  <Check className="w-3.5 h-3.5 text-[#d95d39] shrink-0 mt-0.5" />
                  <span className="font-semibold">{selectedType.name}</span>
                </div>
                {selectedModuleIds.map((id) => {
                  const m = AVAILABLE_MODULES.find((mod) => mod.id === id);
                  if (!m) return null;
                  return (
                    <div key={id} className="flex items-start gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-[#d95d39] shrink-0 mt-0.5" />
                      <span className={isLight ? 'text-[#292524]' : 'text-zinc-300'}>
                        {m.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 space-y-2.5">
              <button
                type="button"
                onClick={handleLaunchInquiry}
                className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#d95d39] hover:bg-[#c24e2b] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-[#d95d39]/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Launch Inquiry With This Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleCopyScope}
                className={`w-full min-h-[40px] px-4 py-2 rounded-xl border text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isLight
                    ? 'border-[#ded8cc] bg-[#f8f5ee] hover:bg-[#ded8cc] text-[#0c0a09]'
                    : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#d95d39]" />
                    <span className="text-[#d95d39] font-bold">Scope Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Scope Spec Sheet</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
