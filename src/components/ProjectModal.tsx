import React, { useEffect } from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
import { Project, ThemeMode } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  theme: ThemeMode;
  onContactClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  theme,
  onContactClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isLight = theme === 'monochrome-light';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog (2 Column: Left Full-View Image, Right Description) */}
      <div
        className={`relative z-10 w-full max-w-4xl lg:max-w-5xl h-auto max-h-[86vh] md:max-h-[78vh] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border flex flex-col ${
          isLight
            ? 'bg-white text-[#0c0a09] border-[#ded8cc]'
            : 'bg-[#101015] text-white border-zinc-800'
        }`}
      >
        {/* Compact Top Header Bar */}
        <div className={`px-4 sm:px-5 py-2 sm:py-2.5 border-b flex items-center justify-between gap-3 shrink-0 ${
          isLight ? 'bg-[#f8f5ee] border-[#ded8cc]' : 'bg-[#14141a] border-zinc-800'
        }`}>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono truncate">
            <span className="font-bold text-[#d95d39] uppercase tracking-wider shrink-0">
              {project.category}
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className={`truncate font-medium ${isLight ? 'text-[#292524]' : 'text-zinc-300'}`}>
              {project.client} ({project.year})
            </span>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors cursor-pointer shrink-0 ${
              isLight
                ? 'bg-[#f0ebe1] hover:bg-[#ded8cc] text-[#0c0a09]'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>

        {/* 
          2-Column Body:
          - Left Column: Short & Full View Image (Uncropped, zero scrolling required to see the project image)
          - Right Column: Title, Results, Overview, Deliverables
        */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* ================= LEFT COLUMN: SHORT & FULL VIEW IMAGE ================= */}
          <div className="md:col-span-6 lg:col-span-7 p-2.5 sm:p-4 flex flex-col justify-center items-center bg-black/5 dark:bg-black/50 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 shrink-0 h-auto md:h-full overflow-hidden">
            {project.image && (
              <div className="relative w-full h-[200px] xs:h-[230px] sm:h-[260px] md:h-full max-h-[58vh] flex items-center justify-center p-2 rounded-xl bg-black/5 dark:bg-black/40 overflow-hidden shadow-inner group">
                <img
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg drop-shadow-md select-none"
                  loading="lazy"
                />

                {/* Full View Stamp Badge */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-zinc-200 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d95d39]" />
                  <span>Full View · High Resolution</span>
                </div>

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10">
                  {project.previewCaption || project.category}
                </div>
              </div>
            )}

            {/* Quick Spec Strip */}
            <div className="w-full flex items-center justify-between gap-2 mt-2 px-1 shrink-0">
              <span className={`text-[10px] sm:text-[11px] font-mono ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
                Role: <strong className={isLight ? 'text-[#0c0a09]' : 'text-zinc-200'}>{project.role}</strong>
              </span>
              <span className={`text-[10px] sm:text-[11px] font-mono ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
                Discipline: <strong className="text-[#d95d39] uppercase">{project.disciplineId}</strong>
              </span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: DESCRIPTION & BUSINESS OUTCOMES ================= */}
          <div className="md:col-span-6 lg:col-span-5 p-3.5 sm:p-5 flex flex-col justify-between overflow-y-auto max-h-[42vh] md:max-h-full space-y-3">
            <div className="space-y-2.5">
              {/* Title & Subtitle */}
              <div>
                <h2 id="modal-title" className={`text-lg sm:text-xl font-display font-extrabold tracking-tight leading-snug ${isLight ? 'text-[#0c0a09]' : 'text-white'}`}>
                  {project.title}
                </h2>
                <p className={`text-xs sm:text-[13px] mt-0.5 leading-relaxed font-medium ${isLight ? 'text-[#292524]' : 'text-zinc-200'}`}>
                  {project.subtitle}
                </p>
              </div>

              {/* Architecture & Overview */}
              <div className="pt-0.5">
                <h3 className={`text-[10px] sm:text-[11px] uppercase font-mono tracking-wider font-bold mb-0.5 ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
                  Architecture & Overview
                </h3>
                <p className={`text-xs sm:text-[13px] leading-relaxed font-normal ${isLight ? 'text-[#1c1917]' : 'text-zinc-100'}`}>
                  {project.description}
                </p>
              </div>

              {/* Highlights & Impact */}
              <div className="pt-0.5">
                <h3 className={`text-[10px] sm:text-[11px] uppercase font-mono tracking-wider font-bold mb-1 ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
                  Key Outcomes & Business Impact
                </h3>
                <div className="space-y-1">
                  {project.highlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs leading-snug">
                      <Check className="w-3.5 h-3.5 text-[#d95d39] shrink-0 mt-0.5" />
                      <span className={`font-medium ${isLight ? 'text-[#1c1917]' : 'text-zinc-200'}`}>
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Deliverables */}
              <div className="pt-0.5">
                <h3 className={`text-[10px] sm:text-[11px] uppercase font-mono tracking-wider font-bold mb-1 ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
                  Technologies & Deliverables
                </h3>
                <div className="flex flex-wrap gap-1">
                  {project.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded border font-mono font-semibold ${
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

            {/* Bottom Actions */}
            <div className={`pt-2.5 border-t flex items-center justify-between gap-2 shrink-0 ${isLight ? 'border-[#ded8cc]' : 'border-zinc-800'}`}>
              <button
                onClick={onClose}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  isLight ? 'bg-[#e8e2d4] text-[#0c0a09] hover:bg-[#ded8cc]' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                Close
              </button>

              <button
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#d95d39] hover:bg-[#c24e2b] text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
              >
                <span>Build with Ash</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
