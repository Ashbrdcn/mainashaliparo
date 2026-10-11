import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Send, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';
import { AshLogo } from './AshLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, theme }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Full-Stack Web Development');
  const [message, setMessage] = useState('');

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

  const copyEmail = () => {
    navigator.clipboard.writeText('ashaliparo@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const isLight = theme === 'monochrome-light';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog with High-Contrast Colors in all modes */}
      <div
        className={`relative z-10 w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border ${
          isLight
            ? 'bg-white text-[#0c0a09] border-[#ded8cc]'
            : 'bg-[#0f0f12] text-white border-zinc-800'
        }`}
      >
        <div className={`flex items-start justify-between pb-4 border-b ${isLight ? 'border-[#ded8cc]' : 'border-zinc-800'}`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${isLight ? 'text-[#44403c]' : 'text-zinc-400'}`}>
                Available for Projects & Collaborations
              </span>
            </div>
            <div className="flex items-center gap-2.5 mt-1">
              <AshLogo className={`w-6 h-6 ${isLight ? 'text-[#0c0a09]' : 'text-white'}`} />
              <h2 id="contact-modal-title" className={`text-2xl sm:text-3xl font-display font-extrabold tracking-tight ${isLight ? 'text-[#0c0a09]' : 'text-white'}`}>
                Let&apos;s Build Together
              </h2>
            </div>
            <p className={`text-xs mt-1 font-medium ${isLight ? 'text-[#292524]' : 'text-zinc-400'}`}>
              Full-Stack Web Development · UI/UX Design · Graphic & Visual Identity
            </p>
          </div>

          <button
            onClick={onClose}
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              isLight
                ? 'bg-[#f0ebe1] hover:bg-[#ded8cc] text-[#0c0a09]'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Email Bar */}
        <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between ${
          isLight ? 'bg-[#f8f5ee] border-[#ded8cc]' : 'bg-zinc-900/60 border-zinc-800'
        }`}>
          <div className={`text-xs font-mono font-bold ${isLight ? 'text-[#0c0a09]' : 'text-zinc-200'}`}>
            ashaliparo@gmail.com
          </div>
          <button
            onClick={copyEmail}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-[#ded8cc] text-[#0c0a09] border border-[#ded8cc] shadow-xs'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#d95d39]" />
                <span className="text-[#d95d39] font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-[#0c0a09]' : 'text-white'}`}>
              Message Received
            </h3>
            <p className={`text-xs max-w-xs mx-auto font-medium ${isLight ? 'text-[#292524]' : 'text-zinc-400'}`}>
              Thank you, {name || 'there'}. Ash has received your message and will follow up within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className={`mt-4 px-6 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isLight ? 'bg-[#0c0a09] text-white hover:bg-[#292524]' : 'bg-white text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1.5 ${isLight ? 'text-[#0c0a09] font-bold' : 'text-zinc-400'}`}>
                Project Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Full-Stack Web Development',
                  'UI/UX Interface Design',
                  'Graphic Design & Visual Identity',
                  'AI-Assisted Development',
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`px-3 py-2 rounded-lg text-xs text-left transition-all border cursor-pointer ${
                      projectType === type
                        ? isLight
                          ? 'bg-[#0c0a09] text-white font-bold border-[#0c0a09]'
                          : 'bg-white text-zinc-950 font-bold border-white'
                        : isLight
                          ? 'bg-[#f8f5ee] text-[#0c0a09] border-[#ded8cc] hover:border-[#d95d39]/50 font-medium'
                          : 'bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${isLight ? 'text-[#0c0a09] font-bold' : 'text-zinc-400'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Taylor Chen"
                  className={`w-full px-3 py-2.5 rounded-lg text-sm border focus:outline-none transition-colors ${
                    isLight
                      ? 'bg-[#fcfbf9] border-[#ded8cc] text-[#0c0a09] focus:border-[#d95d39] placeholder:text-[#a8a29e]'
                      : 'bg-zinc-900/60 border-zinc-800 text-white focus:border-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${isLight ? 'text-[#0c0a09] font-bold' : 'text-zinc-400'}`}>
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="taylor@company.com"
                  className={`w-full px-3 py-2.5 rounded-lg text-sm border focus:outline-none transition-colors ${
                    isLight
                      ? 'bg-[#fcfbf9] border-[#ded8cc] text-[#0c0a09] focus:border-[#d95d39] placeholder:text-[#a8a29e]'
                      : 'bg-zinc-900/60 border-zinc-800 text-white focus:border-white'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${isLight ? 'text-[#0c0a09] font-bold' : 'text-zinc-400'}`}>
                Project Scope & Timeline
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your product goals, stack requirements, and timeline for Ash..."
                className={`w-full px-3 py-2.5 rounded-lg text-sm border focus:outline-none transition-colors resize-none ${
                  isLight
                    ? 'bg-[#fcfbf9] border-[#ded8cc] text-[#0c0a09] focus:border-[#d95d39] placeholder:text-[#a8a29e]'
                    : 'bg-zinc-900/60 border-zinc-800 text-white focus:border-white'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer bg-[#d95d39] hover:bg-[#c24e2b] text-white active:scale-[0.99]"
            >
              <span>Send Project Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
