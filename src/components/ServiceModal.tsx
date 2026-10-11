import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowUpRight, Sparkles, Send, Layers } from 'lucide-react';
import { ThemeMode } from '../types';

export interface ClientService {
  id: string;
  number: string;
  headline: string;
  clientGoal: string;
  description: string;
  whatYouGet: string[];
  techTags: string[];
  keyBenefits?: string[];
}

interface ServiceModalProps {
  service: ClientService | null;
  onClose: () => void;
  theme: ThemeMode;
  onContactClick: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  theme,
  onContactClick,
}) => {
  const isLight = theme === 'monochrome-light';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && service) {
        onClose();
      }
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-2xl sm:rounded-3xl border shadow-2xl flex flex-col ${
            isLight
              ? 'bg-white border-[#ded8cc] text-[#0c0a09]'
              : 'bg-[#101015] border-zinc-800 text-white'
          }`}
        >
          {/* Top Bar */}
          <div className={`px-5 sm:px-7 py-3 sm:py-3.5 border-b flex items-center justify-between gap-4 shrink-0 ${
            isLight ? 'bg-[#f8f5ee] border-[#ded8cc]' : 'bg-[#14141a] border-zinc-800'
          }`}>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono truncate">
              <span className="font-bold text-[#d95d39] uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#d95d39]/10 border border-[#d95d39]/30">
                SERVICE {service.number}
              </span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className={`font-semibold ${isLight ? 'text-[#0c0a09]' : 'text-zinc-300'}`}>
                Full Scope & Specifications
              </span>
            </div>

            <button
              onClick={onClose}
              className={`p-1.5 sm:p-2 rounded-full cursor-pointer transition-colors shrink-0 ${
                isLight
                  ? 'bg-[#f0ebe1] hover:bg-[#ded8cc] text-[#0c0a09]'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
              aria-label="Close service modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Body Content (Scrollable if text exceeds height) */}
          <div className="p-5 sm:p-7 md:p-8 overflow-y-auto space-y-6">
            {/* Headline */}
            <div>
              <span className="text-[11px] font-mono text-[#d95d39] font-bold uppercase tracking-wider block mb-1">
                Client Solution
              </span>
              <h2
                id="service-modal-title"
                className={`text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight ${
                  isLight ? 'text-[#0c0a09]' : 'text-white'
                }`}
              >
                {service.headline}
              </h2>
            </div>

            {/* The Goal Banner */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${
              isLight
                ? 'bg-[#f8f5ee] border-[#ded8cc] text-[#1c1917]'
                : 'bg-[#171720] border-orange-500/25 text-zinc-200'
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-[#d95d39]" />
                <span className="font-mono font-bold text-xs uppercase tracking-wider text-[#d95d39]">
                  The Business Goal
                </span>
              </div>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                {service.clientGoal}
              </p>
            </div>

            {/* Full Detailed Description */}
            <div>
              <h3 className={`text-xs uppercase font-mono tracking-wider font-bold mb-2 ${
                isLight ? 'text-[#44403c]' : 'text-zinc-400'
              }`}>
                How I Deliver This For You
              </h3>
              <p className={`text-sm sm:text-base md:text-lg leading-relaxed font-normal ${
                isLight ? 'text-[#1c1917]' : 'text-zinc-200'
              }`}>
                {service.description}
              </p>
            </div>

            {/* What You Get Checklist */}
            <div>
              <h3 className={`text-xs uppercase font-mono tracking-wider font-bold mb-3 ${
                isLight ? 'text-[#44403c]' : 'text-zinc-400'
              }`}>
                What You Get (Deliverables Included)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.whatYouGet.map((deliverable, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition-colors ${
                      isLight
                        ? 'bg-[#f8f5ee] border-[#ded8cc] text-[#1c1917]'
                        : 'bg-zinc-900/70 border-zinc-800 text-zinc-200'
                    }`}
                  >
                    <Check className="w-4 h-4 text-[#d95d39] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium leading-snug">
                      {deliverable}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Under the Hood (Tech Tags) */}
            <div className={`pt-4 border-t ${isLight ? 'border-[#ded8cc]' : 'border-zinc-800'}`}>
              <div className="flex items-center gap-2 mb-2.5">
                <Layers className="w-4 h-4 text-[#d95d39]" />
                <h3 className={`text-xs font-mono uppercase tracking-wider font-bold ${
                  isLight ? 'text-[#44403c]' : 'text-zinc-400'
                }`}>
                  Under the Hood (Tech Tags)
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.techTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-xs sm:text-sm font-mono px-3 py-1 rounded-lg border font-semibold ${
                      isLight
                        ? 'bg-[#f4efe4] border-[#ded8cc] text-[#0c0a09]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-200'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className={`px-5 sm:px-7 py-3.5 sm:py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 ${
            isLight ? 'bg-[#f8f5ee] border-[#ded8cc]' : 'bg-[#14141a] border-zinc-800'
          }`}>
            <span className={`text-xs font-mono font-medium ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
              Zero vendor lock-in · Full code & asset ownership
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onClose}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  isLight
                    ? 'bg-[#e8e2d4] text-[#0c0a09] hover:bg-[#ded8cc]'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-[#d95d39] hover:bg-[#c24e2b] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-[#d95d39]/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Discuss This Service</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
