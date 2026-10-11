import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { AshLogo } from './AshLogo';
import { ImagePlus, RotateCcw } from 'lucide-react';

interface AshPortraitProps {
  theme: ThemeMode;
  className?: string;
  onOpenContact?: () => void;
}

export const AshPortrait: React.FC<AshPortraitProps> = ({ theme, className = '' }) => {
  const isLight = theme === 'monochrome-light';

  // State to support user loading their exact raw photo if desired
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhotoUrl(url);
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-end select-none ${className}`}>
      {/* Background radial glow */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isLight ? 'bg-zinc-400' : 'bg-zinc-100'
        }`}
        style={{ transform: 'scale(0.85) translateY(12%)' }}
      />

      {/* Portrait frame container */}
      <div className="relative w-full max-w-[420px] sm:max-w-[460px] flex items-end justify-center">
        {customPhotoUrl ? (
          /* User-Uploaded Photo Render */
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-end justify-center">
            <img
              src={customPhotoUrl}
              alt="Ash — Full Stack Developer & UI/UX Designer"
              referrerPolicy="no-referrer"
              className="max-h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </div>
        ) : (
          /* 
            High-Fidelity Artistic Illustration of Ash (me-removebg-preview.png):
            - Clean neat textured black bangs/fringe
            - Double-bridge aviator silver glasses
            - Focused calm expression
            - Black button-up collared shirt
          */
          <svg
            viewBox="0 0 500 580"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[85vh] drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)] object-contain origin-bottom"
          >
            <defs>
              <linearGradient id="ashSkin" x1="250" y1="160" x2="250" y2="400" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f3c9b0" />
                <stop offset="40%" stopColor="#eab59a" />
                <stop offset="100%" stopColor="#cf967b" />
              </linearGradient>

              <linearGradient id="ashNeck" x1="250" y1="340" x2="250" y2="450" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#d89f84" />
                <stop offset="100%" stopColor="#aa6d53" />
              </linearGradient>

              <linearGradient id="ashShirt" x1="250" y1="410" x2="250" y2="580" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1e1e24" />
                <stop offset="40%" stopColor="#121216" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>

              <linearGradient id="metalWire" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e4e4e7" />
                <stop offset="50%" stopColor="#a1a1aa" />
                <stop offset="100%" stopColor="#52525b" />
              </linearGradient>

              <linearGradient id="glassGlare" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
              </linearGradient>

              <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* --- Shirt Body & Shoulders (Black Button-Down Collared Shirt) --- */}
            <path
              d="M 60 580 
                 C 80 470, 150 430, 210 420 
                 L 220 460 
                 L 280 460 
                 L 290 420 
                 C 350 430, 420 470, 440 580 
                 Z"
              fill="url(#ashShirt)"
            />

            {/* Shirt Placket (Center vertical button strip) */}
            <path
              d="M 235 440 L 235 580 L 265 580 L 265 440 Z"
              fill="#18181b"
            />
            {/* Center seam */}
            <line x1="250" y1="440" x2="250" y2="580" stroke="#09090b" strokeWidth="2" />

            {/* Shirt Buttons */}
            <circle cx="250" cy="465" r="4.5" fill="#27272a" stroke="#52525b" strokeWidth="1" />
            <circle cx="250" cy="515" r="4.5" fill="#27272a" stroke="#52525b" strokeWidth="1" />
            <circle cx="250" cy="565" r="4.5" fill="#27272a" stroke="#52525b" strokeWidth="1" />

            {/* Shirt Collar Left & Right */}
            {/* Left Collar flap */}
            <path
              d="M 210 415 L 250 450 L 210 465 L 185 435 Z"
              fill="#27272a"
              stroke="#09090b"
              strokeWidth="2"
            />
            {/* Right Collar flap */}
            <path
              d="M 290 415 L 250 450 L 290 465 L 315 435 Z"
              fill="#27272a"
              stroke="#09090b"
              strokeWidth="2"
            />

            {/* Dark inner crewneck / undershirt visible at collar notch */}
            <path
              d="M 225 415 Q 250 432, 275 415 Q 250 445, 225 415 Z"
              fill="#09090b"
            />

            {/* --- Neck & Throat --- */}
            <path
              d="M 215 320 C 215 370, 220 410, 225 425 C 240 430, 260 430, 275 425 C 280 410, 285 370, 285 320 Z"
              fill="url(#ashNeck)"
            />
            {/* Neck contour shadows */}
            <path
              d="M 235 345 Q 235 390, 240 415"
              stroke="#bb7e65"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 265 345 Q 265 390, 260 415"
              stroke="#bb7e65"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* --- Ears --- */}
            {/* Left Ear */}
            <path
              d="M 180 250 C 165 250, 160 275, 162 295 C 165 315, 175 322, 185 318 Z"
              fill="#eab59a"
            />
            <path
              d="M 175 265 C 168 275, 168 295, 175 305"
              stroke="#cf967b"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Ear */}
            <path
              d="M 320 250 C 335 250, 340 275, 338 295 C 335 315, 325 322, 315 318 Z"
              fill="#eab59a"
            />
            <path
              d="M 325 265 C 332 275, 332 295, 325 305"
              stroke="#cf967b"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* --- Head Base / Facial Oval --- */}
            <path
              d="M 182 220 
                 C 178 280, 185 330, 215 355 
                 C 235 372, 265 372, 285 355 
                 C 315 330, 322 280, 318 220 
                 C 315 150, 185 150, 182 220 Z"
              fill="url(#ashSkin)"
            />

            {/* Jaw and Chin highlights */}
            <path
              d="M 230 355 Q 250 365, 270 355"
              stroke="#fbe0d0"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Cheeks subtle soft shadow */}
            <ellipse cx="205" cy="290" rx="15" ry="12" fill="#e29e80" opacity="0.25" />
            <ellipse cx="295" cy="290" rx="15" ry="12" fill="#e29e80" opacity="0.25" />

            {/* --- Nose --- */}
            <g id="nose">
              <path
                d="M 247 235 L 246 280 Q 242 292, 250 294 Q 258 292, 254 280 Z"
                fill="#d89b80"
                opacity="0.7"
              />
              {/* Nose tip bridge highlight */}
              <line x1="250" y1="245" x2="250" y2="282" stroke="#fce5d8" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
              {/* Nostril curves */}
              <path d="M 240 286 Q 242 292, 246 292" stroke="#9e5e46" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 260 286 Q 258 292, 254 292" stroke="#9e5e46" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* --- Mouth & Lips --- */}
            <g id="mouth">
              {/* Cupid's bow / upper lip */}
              <path
                d="M 234 322 Q 244 319, 250 321 Q 256 319, 266 322"
                stroke="#c47768"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Mouth line */}
              <path
                d="M 234 324 Q 250 326, 266 324"
                stroke="#8c473c"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Full lower lip */}
              <path
                d="M 238 327 Q 250 336, 262 327"
                stroke="#c97c6c"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* --- Eyes & Eyebrows (Behind Glasses) --- */}
            <g id="eyes">
              {/* Eyebrows (Neat natural straight-angled black brows) */}
              <path d="M 198 220 Q 215 214, 230 218" stroke="#18181b" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 302 220 Q 285 214, 270 218" stroke="#18181b" strokeWidth="5.5" strokeLinecap="round" />

              {/* Left Eye */}
              <ellipse cx="218" cy="235" rx="11" ry="7" fill="#ffffff" />
              <ellipse cx="218" cy="235" rx="6.5" ry="6.5" fill="#18181b" />
              <circle cx="216.5" cy="233" r="2" fill="#ffffff" />
              {/* Eyelid line */}
              <path d="M 207 232 Q 218 228, 229 232" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Right Eye */}
              <ellipse cx="282" cy="235" rx="11" ry="7" fill="#ffffff" />
              <ellipse cx="282" cy="235" rx="6.5" ry="6.5" fill="#18181b" />
              <circle cx="280.5" cy="233" r="2" fill="#ffffff" />
              {/* Eyelid line */}
              <path d="M 271 232 Q 282 228, 293 232" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* --- Double-Bridge Wireframe Aviator Glasses --- */}
            <g id="glasses" filter="url(#subtleGlow)">
              {/* Top Straight Brow Bar (Distinctive aviator feature in photo!) */}
              <line
                x1="205"
                y1="216"
                x2="295"
                y2="216"
                stroke="url(#metalWire)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Lower Curved Nose Bridge */}
              <path
                d="M 240 230 Q 250 226, 260 230"
                stroke="url(#metalWire)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Left Lens Frame (Rounded aviator-square) */}
              <rect
                x="195"
                y="218"
                width="46"
                height="38"
                rx="10"
                fill="url(#glassGlare)"
                stroke="url(#metalWire)"
                strokeWidth="3.5"
              />

              {/* Right Lens Frame (Rounded aviator-square) */}
              <rect
                x="259"
                y="218"
                width="46"
                height="38"
                rx="10"
                fill="url(#glassGlare)"
                stroke="url(#metalWire)"
                strokeWidth="3.5"
              />

              {/* Glasses Temples extending to ears */}
              <line x1="195" y1="225" x2="175" y2="245" stroke="url(#metalWire)" strokeWidth="3" strokeLinecap="round" />
              <line x1="305" y1="225" x2="325" y2="245" stroke="url(#metalWire)" strokeWidth="3" strokeLinecap="round" />

              {/* Diagonal Lens Reflections */}
              <line x1="202" y1="224" x2="225" y2="250" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="266" y1="224" x2="289" y2="250" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* --- Hair (Ash's textured black hair with fringe bangs) --- */}
            <g id="hair" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.5))">
              {/* Back Hair Volume */}
              <path
                d="M 180 230 
                   C 160 170, 180 90, 250 85 
                   C 320 90, 340 170, 320 230 
                   C 310 215, 305 190, 290 180 
                   C 260 175, 240 175, 210 180 
                   C 195 190, 190 215, 180 230 Z"
                fill="#121214"
              />

              {/* Top and Front Bangs / Fringe Over Forehead */}
              <path
                d="M 182 175 
                   C 185 140, 210 100, 250 98 
                   C 290 100, 315 140, 318 175 
                   C 310 190, 298 205, 285 208 
                   C 275 195, 270 206, 260 210 
                   C 252 198, 248 208, 238 210 
                   C 228 196, 222 208, 212 208 
                   C 198 205, 190 190, 182 175 Z"
                fill="#1c1c20"
              />

              {/* Individual Hair Strands / Texture for Realism */}
              <path d="M 215 140 Q 220 185, 212 205" stroke="#27272a" strokeWidth="4" strokeLinecap="round" />
              <path d="M 238 130 Q 242 180, 236 208" stroke="#27272a" strokeWidth="4" strokeLinecap="round" />
              <path d="M 262 130 Q 258 180, 264 208" stroke="#27272a" strokeWidth="4" strokeLinecap="round" />
              <path d="M 285 140 Q 280 185, 288 205" stroke="#27272a" strokeWidth="4" strokeLinecap="round" />

              {/* Soft hair rim highlights */}
              <path
                d="M 195 115 C 220 95, 280 95, 305 115"
                stroke="#3f3f46"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* --- Branded Lapel / Chest Logo Badge: "use this logo to put on the picture" --- */}
            <g id="brandedEmblem" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.6))">
              {/* Badge backplate on left chest */}
              <rect
                x="310"
                y="485"
                width="48"
                height="48"
                rx="12"
                fill={isLight ? '#09090b' : '#ffffff'}
                stroke={isLight ? '#27272a' : '#d4d4d8'}
                strokeWidth="1.5"
              />
              {/* Embedded Ash Orbital Monogram */}
              <g transform="translate(316, 491) scale(0.18)">
                <AshLogo variant={isLight ? 'light' : 'dark'} />
              </g>
            </g>
          </svg>
        )}

        {/* 
          Floating Branded Stamp Overlay on the Picture (Requested by user: "use this logo to put on the picture")
        */}
        <div 
          className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2.5 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-xl transition-all ${
            isLight
              ? 'bg-white/90 border-zinc-200 text-zinc-900'
              : 'bg-black/80 border-white/20 text-white'
          }`}
        >
          <AshLogo className="w-5 h-5 text-current" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider leading-none">
              ASH · VERIFIED
            </span>
            <span className="text-[8px] font-mono text-zinc-500 leading-tight">
              Full Stack & UI/UX
            </span>
          </div>
        </div>

        {/* Photo Switcher / Upload affordance (Lets user drop their me-removebg-preview.png directly!) */}
        <div className="absolute bottom-2 left-2 z-20">
          <label
            title="Load your custom photo (e.g. me-removebg-preview.png)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-tight bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white border border-white/10 cursor-pointer backdrop-blur-sm transition-all"
          >
            <ImagePlus className="w-3 h-3" />
            <span>{customPhotoUrl ? 'Photo Loaded' : 'Use Photo'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {customPhotoUrl && (
            <button
              onClick={() => setCustomPhotoUrl(null)}
              className="ml-1 px-1.5 py-1 rounded-md text-[10px] bg-black/60 hover:bg-black/80 text-zinc-400 hover:text-white border border-white/10 transition-all inline-flex items-center"
              title="Reset to default portrait"
            >
              <RotateCcw className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
