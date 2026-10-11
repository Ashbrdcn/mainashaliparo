import React from 'react';
import { ThemeMode } from '../types';

interface DesignerPortraitProps {
  theme: ThemeMode;
  className?: string;
}

export const DesignerPortrait: React.FC<DesignerPortraitProps> = ({ theme, className = '' }) => {
  const isLight = theme === 'monochrome-light';
  const isTerracotta = false;

  // Base palette for the portrait based on theme
  const skinBase = isLight ? '#27272a' : '#d4d4d8';
  const skinShadow = isLight ? '#18181b' : '#71717a';
  const skinHighlight = isLight ? '#52525b' : '#ffffff';
  const hairColor = isLight ? '#09090b' : '#18181b';
  const hairHighlight = isLight ? '#27272a' : '#3f3f46';
  const glassesFrame = isLight ? '#000000' : '#09090b';
  const shirtColor = isLight ? '#3f3f46' : '#27272a';

  return (
    <div className={`relative flex items-end justify-center select-none pointer-events-none ${className}`}>
      {/* Background radial glow */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isTerracotta ? 'bg-amber-500' : isLight ? 'bg-zinc-400' : 'bg-zinc-100'
        }`}
        style={{ transform: 'scale(0.8) translateY(10%)' }}
      />

      <svg
        viewBox="0 0 500 580"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[85vh] drop-shadow-2xl object-contain origin-bottom"
        style={{ filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.45))' }}
      >
        <defs>
          <linearGradient id="skinGrad" x1="160" y1="180" x2="350" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={skinHighlight} />
            <stop offset="55%" stopColor={skinBase} />
            <stop offset="100%" stopColor={skinShadow} />
          </linearGradient>

          <linearGradient id="neckGrad" x1="200" y1="360" x2="320" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={skinBase} />
            <stop offset="70%" stopColor={skinShadow} />
            <stop offset="100%" stopColor={isTerracotta ? '#8a3c1f' : '#3f3f46'} />
          </linearGradient>

          <linearGradient id="hairGrad" x1="120" y1="50" x2="380" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={hairHighlight} />
            <stop offset="60%" stopColor={hairColor} />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>

          <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <linearGradient id="shirtGrad" x1="250" y1="460" x2="250" y2="580" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={shirtColor} />
            <stop offset="100%" stopColor={isTerracotta ? '#853e24' : '#18181b'} />
          </linearGradient>
        </defs>

        {/* --- Shirt / Torso --- */}
        <path
          d="M 120 580 C 130 520, 160 480, 210 470 C 230 475, 270 475, 290 470 C 340 480, 370 520, 380 580 Z"
          fill="url(#shirtGrad)"
        />
        {/* Collar line */}
        <path
          d="M 210 470 C 235 490, 265 490, 290 470"
          stroke={isTerracotta ? '#632e19' : '#09090b'}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* --- Neck & Adams Apple --- */}
        <path
          d="M 210 330 C 205 380, 205 440, 210 475 C 240 482, 270 482, 295 470 C 305 420, 310 370, 305 330 Z"
          fill="url(#neckGrad)"
        />
        {/* Neck tendon & shadow */}
        <path
          d="M 235 370 Q 230 420, 222 465"
          stroke={skinShadow}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 270 380 Q 275 425, 280 460"
          stroke={skinShadow}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* --- Ear --- */}
        <g id="ear">
          <path
            d="M 300 245 C 322 245, 332 265, 330 295 C 328 320, 312 332, 298 330 Z"
            fill={skinBase}
          />
          <path
            d="M 305 260 C 316 260, 320 275, 318 295 C 316 308, 308 316, 302 318"
            stroke={skinShadow}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 304 285 C 310 285, 312 292, 310 300"
            stroke={skinShadow}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* --- Head Base / Jaw / Face Profile --- */}
        <path
          d="M 210 150 
             C 170 170, 160 210, 165 240
             C 160 248, 155 258, 160 268
             C 162 272, 175 272, 178 275
             C 172 285, 170 295, 175 305
             C 172 315, 175 330, 185 342
             C 195 352, 215 365, 235 365
             C 270 365, 300 340, 305 320
             C 308 260, 305 200, 290 160
             Z"
          fill="url(#skinGrad)"
        />

        {/* Detailed Nose profile */}
        <path
          d="M 172 230 
             L 155 258 
             Q 153 265, 162 268 
             L 175 268"
          fill={skinBase}
          stroke={skinShadow}
          strokeWidth="1.5"
        />

        {/* Nostril */}
        <ellipse cx="168" cy="265" rx="3.5" ry="2" fill={hairColor} opacity="0.8" />

        {/* Lips */}
        {/* Upper lip */}
        <path
          d="M 172 284 Q 182 284, 188 288"
          stroke={skinShadow}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Mouth line */}
        <path
          d="M 170 292 Q 180 293, 192 291"
          stroke={isTerracotta ? '#45190b' : '#18181b'}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Lower lip */}
        <path
          d="M 173 300 Q 183 304, 191 298"
          stroke={skinShadow}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* --- Beard & Stubble Texture --- */}
        <g id="beard" opacity={isTerracotta ? 0.75 : 0.85}>
          {/* Jawline shadow + beard field */}
          <path
            d="M 175 298 
               C 170 320, 185 350, 210 360 
               C 240 370, 280 355, 300 320 
               L 302 300 
               C 290 320, 260 340, 230 340 
               C 195 340, 180 310, 175 298 Z"
            fill={hairColor}
            opacity="0.35"
          />
          {/* Stubble dashes */}
          {[
            [180, 310], [185, 318], [195, 325], [205, 335], [215, 345], [225, 350], [240, 350],
            [182, 322], [190, 332], [200, 342], [210, 352], [220, 355], [235, 355], [250, 348],
            [260, 340], [270, 332], [280, 320], [288, 305], [292, 290],
            [175, 278], [182, 280], [186, 282], [178, 284],
            [188, 302], [198, 312], [208, 320], [225, 330], [245, 335], [265, 325]
          ].map(([x, y], idx) => (
            <line
              key={idx}
              x1={x}
              y1={y}
              x2={x + 3}
              y2={y + 3}
              stroke={hairColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* --- Eye & Eyebrow (Behind Glasses) --- */}
        <g id="eye">
          {/* Eyebrow */}
          <path
            d="M 170 198 Q 195 192, 222 195"
            stroke={hairColor}
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Eyelid and eye */}
          <path
            d="M 180 215 Q 195 210, 210 216"
            stroke={isTerracotta ? '#3d1c10' : '#18181b'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="195" cy="217" r="4.5" fill={isTerracotta ? '#2c140b' : '#09090b'} />
          <circle cx="193.5" cy="215.5" r="1.5" fill="#ffffff" />
        </g>

        {/* --- Stylish Black Acetate Glasses --- */}
        <g id="glasses" filter="drop-shadow(2px 4px 6px rgba(0,0,0,0.5))">
          {/* Temple Arm (running to ear) */}
          <path
            d="M 218 214 L 305 250"
            stroke={glassesFrame}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Temple arm hinge accent */}
          <circle cx="218" cy="214" r="3" fill="#a1a1aa" />

          {/* Left Lens Frame (Front Lens) */}
          <rect
            x="166"
            y="198"
            width="56"
            height="46"
            rx="14"
            fill="url(#glassReflection)"
            stroke={glassesFrame}
            strokeWidth="7"
          />
          {/* Bridge */}
          <path
            d="M 166 215 Q 158 214, 152 216"
            stroke={glassesFrame}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Nose pad hint */}
          <path
            d="M 164 220 Q 160 228, 164 234"
            stroke={glassesFrame}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Glass glare line */}
          <path
            d="M 175 204 L 205 238"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* --- Hair (Messy, Voluminous, Curly Wavy Hair) --- */}
        <g id="hair" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.4))">
          {/* Main Hair Mass */}
          <path
            d="M 180 170 
               C 150 160, 130 130, 140 100 
               C 145 80, 170 65, 195 70 
               C 210 50, 240 40, 275 45 
               C 310 50, 335 70, 350 95 
               C 375 110, 395 140, 385 180 
               C 375 210, 350 230, 330 240 
               C 315 235, 305 210, 305 180 
               C 305 150, 275 140, 250 145 
               C 220 150, 200 165, 180 170 Z"
            fill="url(#hairGrad)"
          />

          {/* Dynamic Messy Curls / Locks (Foreground Strands) */}
          {/* Lock 1: Left front fringe curving over forehead */}
          <path
            d="M 185 160 C 160 140, 150 110, 175 95 C 195 85, 205 115, 190 140"
            fill={hairHighlight}
            stroke={hairColor}
            strokeWidth="2"
          />
          {/* Lock 2: Top curly plume */}
          <path
            d="M 220 70 C 205 40, 225 20, 250 30 C 265 38, 255 60, 240 68"
            fill={hairHighlight}
            stroke={hairColor}
            strokeWidth="2"
          />
          {/* Lock 3: Wild top-right crest */}
          <path
            d="M 265 50 C 275 25, 310 20, 325 45 C 335 60, 320 75, 300 70"
            fill={hairColor}
          />
          {/* Lock 4: Side flick over ear */}
          <path
            d="M 330 110 C 365 115, 385 135, 375 165 C 365 190, 345 195, 335 180"
            fill={hairHighlight}
          />
          {/* Lock 5: Crown texture loops */}
          <path
            d="M 200 100 Q 220 80, 245 95 T 280 90"
            stroke={hairHighlight}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 225 120 Q 250 100, 270 115 T 310 110"
            stroke={hairHighlight}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 175 130 Q 190 115, 210 125"
            stroke={hairHighlight}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Stray strands extending into space */}
          <path
            d="M 235 32 Q 225 15, 240 10"
            stroke={hairHighlight}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 290 40 Q 305 25, 320 28"
            stroke={hairHighlight}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 360 90 Q 385 85, 395 105"
            stroke={hairHighlight}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 145 95 Q 130 90, 135 110"
            stroke={hairHighlight}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Rim Light / Highlights on Hair and Shoulder Edge */}
        <path
          d="M 140 105 C 145 80, 175 65, 205 70 C 235 48, 275 45, 310 50 C 345 60, 365 85, 380 120 C 390 150, 385 180, 375 200"
          stroke={skinHighlight}
          strokeWidth="2"
          strokeDasharray="4 8"
          strokeLinecap="round"
          opacity="0.35"
          fill="none"
        />
      </svg>
    </div>
  );
};
