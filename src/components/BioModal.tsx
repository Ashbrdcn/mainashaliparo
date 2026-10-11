import React, { useEffect } from 'react';
import { X, ArrowUpRight, Check, Code, Palette, Layout } from 'lucide-react';
import { ThemeMode } from '../types';
import { AshLogo } from './AshLogo';
import { AshSticker } from './AshSticker';

interface BioModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onOpenContact: () => void;
}

export const BioModal: React.FC<BioModalProps> = ({
  isOpen,
  onClose,
  theme,
  onOpenContact,
}) => {
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

  if (!isOpen) return null;

  const isLight = theme === 'monochrome-light';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bio-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className={`relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 shadow-2xl border ${
          isLight
            ? 'bg-[#f7f5ee] text-[#1c1917] border-[#ded9cb]'
            : 'bg-[#0f0f12] text-white border-zinc-800'
        }`}
      >
        {/* Header */}
        <div className={`flex items-start justify-between pb-5 border-b ${isLight ? 'border-[#ded9cb]' : 'border-zinc-800'}`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/20 shrink-0 flex items-center justify-center p-0.5 shadow-md">
              <AshSticker className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${isLight ? 'text-[#78716c]' : 'text-zinc-400'}`}>
                  Verified Creator Profile
                </span>
              </div>
              <h2 id="bio-modal-title" className={`text-2xl sm:text-3xl font-display font-extrabold tracking-tight mt-0.5 ${isLight ? 'text-[#1c1917]' : 'text-white'}`}>
                Jhon Bon Ashley Aliparo
              </h2>
              <p className={`text-xs font-mono mt-0.5 ${isLight ? 'text-[#78716c]' : 'text-zinc-400'}`}>
                Known as &quot;Ash&quot; · Full-Stack Web Developer, UI/UX & Graphic Designer
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isLight
                ? 'bg-[#e7e2d6] hover:bg-[#ded9cb] text-[#1c1917]'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
            aria-label="Close profile modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6">
          <div>
            <h3 className={`text-xs sm:text-sm uppercase font-mono tracking-wider mb-2 font-bold ${isLight ? 'text-[#57534e]' : 'text-zinc-400'}`}>
              About Jhon
            </h3>
            <p className={`text-base sm:text-lg md:text-xl leading-relaxed font-normal ${isLight ? 'text-[#1c1917]' : 'text-zinc-100'}`}>
              Jhon Bon Ashley Aliparo is a multidisciplinary digital builder. Operating at the intersection of high-performance web engineering and high-end visual systems, Jhon takes projects from raw concepts into deployed production web applications, bespoke design systems, and memorable brand identities.
            </p>
          </div>

          {/* Three Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className={`p-4 rounded-xl border ${isLight ? 'bg-[#edeae1] border-[#ded9cb]' : 'bg-zinc-900/60 border-zinc-800'}`}>
              <Code className="w-5 h-5 text-orange-500 mb-2" />
              <div className="text-sm font-bold font-mono">Full-Stack</div>
              <p className={`text-xs sm:text-sm mt-1 leading-snug ${isLight ? 'text-[#1c1917]' : 'text-zinc-300'}`}>
                React, Next.js, TypeScript, Node.js, REST & SQL
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isLight ? 'bg-[#edeae1] border-[#ded9cb]' : 'bg-zinc-900/60 border-zinc-800'}`}>
              <Layout className="w-5 h-5 text-blue-500 mb-2" />
              <div className="text-sm font-bold font-mono">UI/UX Design</div>
              <p className={`text-xs sm:text-sm mt-1 leading-snug ${isLight ? 'text-[#1c1917]' : 'text-zinc-300'}`}>
                User flows, mobile interfaces, Figma systems
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isLight ? 'bg-[#edeae1] border-[#ded9cb]' : 'bg-zinc-900/60 border-zinc-800'}`}>
              <Palette className="w-5 h-5 text-purple-500 mb-2" />
              <div className="text-sm font-bold font-mono">Graphic Design</div>
              <p className={`text-xs sm:text-sm mt-1 leading-snug ${isLight ? 'text-[#1c1917]' : 'text-zinc-300'}`}>
                Vector logos, typography, visual monograms
              </p>
            </div>
          </div>

          {/* Credentials */}
          <div className="space-y-2">
            {[
              'Available for contract builds, technical consulting, and advisory',
              'Fast async communication across worldwide timezones',
              'Clean, maintainable, production-ready codebases with zero bloat',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <Check className="w-4 h-4 text-orange-500 shrink-0" />
                <span className={isLight ? 'text-[#292524]' : 'text-zinc-300'}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`pt-4 border-t flex items-center justify-between gap-3 ${isLight ? 'border-[#ded9cb]' : 'border-zinc-800'}`}>
          <span className={`text-xs font-mono ${isLight ? 'text-[#78716c]' : 'text-zinc-400'}`}>
            ashaliparo@gmail.com
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                isLight ? 'bg-[#e7e2d6] text-[#292524] hover:bg-[#ded9cb]' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer ${
                isLight ? 'bg-[#1c1917] text-[#f7f5ee] hover:bg-[#292524]' : 'bg-white text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              <span>Work with Jhon</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
