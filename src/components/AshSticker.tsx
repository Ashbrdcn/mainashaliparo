import React from 'react';

interface AshStickerProps {
  className?: string;
  size?: number | string;
}

export const AshSticker: React.FC<AshStickerProps> = ({
  className = 'w-full h-auto',
  size,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 520 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)]"
      >
        <defs>
          <filter id="stickerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.3" />
          </filter>

          {/* Skin tones */}
          <linearGradient id="stSkinBase" x1="260" y1="180" x2="260" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffdfcf" />
            <stop offset="100%" stopColor="#f7c8b0" />
          </linearGradient>

          {/* Hair gradients */}
          <linearGradient id="stHair" x1="260" y1="80" x2="260" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2e3138" />
            <stop offset="60%" stopColor="#1e2025" />
            <stop offset="100%" stopColor="#121316" />
          </linearGradient>

          {/* Shirt gradients */}
          <linearGradient id="stShirt" x1="260" y1="360" x2="260" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2a2c31" />
            <stop offset="100%" stopColor="#18191d" />
          </linearGradient>
        </defs>

        {/* 
          1. THICK WHITE DIE-CUT STICKER BORDER (Exact sticker silhouette)
        */}
        <path
          d="M 260 55
             C 325 55, 385 95, 400 155
             C 415 175, 410 215, 385 240
             C 395 260, 395 295, 375 315
             C 385 330, 420 370, 435 410
             C 450 445, 440 480, 400 505
             C 340 540, 180 540, 120 505
             C 80 480, 70 445, 85 410
             C 100 370, 135 330, 145 315
             C 125 295, 125 260, 135 240
             C 110 215, 105 175, 120 155
             C 135 95, 195 55, 260 55 Z"
          fill="#ffffff"
          filter="url(#stickerShadow)"
        />

        {/* Inner sticker border styling */}
        <g transform="translate(10, 10) scale(0.96)">
          {/* 
            2. CLOTHING (Black button-up shirt with collar and inner tee)
          */}
          {/* Shoulders / Shirt Base */}
          <path
            d="M 125 470 
               C 150 405, 200 365, 260 360 
               C 320 365, 370 405, 395 470 
               C 350 500, 170 500, 125 470 Z"
            fill="url(#stShirt)"
            stroke="#121316"
            strokeWidth="5"
          />

          {/* Inner dark undershirt crewneck */}
          <path
            d="M 235 385 C 245 415, 275 415, 285 385 Z"
            fill="#121316"
          />

          {/* Left Collar flap */}
          <path
            d="M 215 365 L 260 415 L 210 440 L 180 405 Z"
            fill="#23252a"
            stroke="#121316"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Right Collar flap */}
          <path
            d="M 305 365 L 260 415 L 310 440 L 340 405 Z"
            fill="#23252a"
            stroke="#121316"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Shirt fold lines */}
          <path d="M 180 445 L 215 480" stroke="#18191d" strokeWidth="4" strokeLinecap="round" />
          <path d="M 340 445 L 305 480" stroke="#18191d" strokeWidth="4" strokeLinecap="round" />
          <path d="M 260 425 L 260 495" stroke="#121316" strokeWidth="5" strokeLinecap="round" />

          {/* 
            3. NECK & SHADOWS
          */}
          <path
            d="M 225 310 L 225 385 C 240 395, 280 395, 295 385 L 295 310 Z"
            fill="#ffdfcf"
          />
          {/* Shadow under chin on neck */}
          <path
            d="M 225 310 C 240 345, 280 345, 295 310 L 295 355 C 280 365, 240 365, 225 355 Z"
            fill="#e29b80"
          />
          {/* Clavicle / Neck notch */}
          <path d="M 255 355 L 260 368 L 265 355" stroke="#cf856b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* 
            4. EARS
          */}
          {/* Left Ear */}
          <path
            d="M 195 240 C 170 240, 168 285, 192 295 Z"
            fill="#ffdfcf"
            stroke="#121316"
            strokeWidth="5"
          />
          <path d="M 185 255 C 178 262, 180 278, 188 282" stroke="#e29b80" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Right Ear */}
          <path
            d="M 325 240 C 350 240, 352 285, 328 295 Z"
            fill="#ffdfcf"
            stroke="#121316"
            strokeWidth="5"
          />
          <path d="M 335 255 C 342 262, 340 278, 332 282" stroke="#e29b80" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* 
            5. HEAD & JAWLINE
          */}
          <path
            d="M 190 220 
               C 188 280, 205 325, 260 345 
               C 315 325, 332 280, 330 220 
               C 330 160, 190 160, 190 220 Z"
            fill="url(#stSkinBase)"
            stroke="#121316"
            strokeWidth="5"
          />

          {/* 
            6. MOUTH & NOSE
          */}
          {/* Charismatic Anime Smirk */}
          <path
            d="M 245 295 Q 262 296, 280 292"
            stroke="#121316"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Lower lip shadow hint */}
          <path d="M 258 304 Q 265 306, 272 304" stroke="#d5866d" strokeWidth="3" strokeLinecap="round" />

          {/* Anime Nose */}
          <path
            d="M 260 262 L 262 274 L 257 277"
            stroke="#121316"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 
            7. EYES & CONFIDENT BROWS (Under/Through Glasses)
          */}
          {/* Confident Sharp Eyebrows */}
          <path
            d="M 205 210 Q 225 198, 242 208"
            stroke="#121316"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 315 210 Q 295 198, 278 208"
            stroke="#121316"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Left Eye */}
          <path
            d="M 210 228 Q 226 218, 242 228"
            stroke="#121316"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <ellipse cx="227" cy="235" rx="9" ry="11" fill="#18191d" />
          {/* Specular highlights */}
          <circle cx="224" cy="231" r="3.5" fill="#ffffff" />
          <circle cx="230" cy="239" r="1.8" fill="#ffffff" />
          {/* Lower eyelid */}
          <path d="M 218 245 Q 227 248, 236 245" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Eye */}
          <path
            d="M 310 228 Q 294 218, 278 228"
            stroke="#121316"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <ellipse cx="293" cy="235" rx="9" ry="11" fill="#18191d" />
          {/* Specular highlights */}
          <circle cx="290" cy="231" r="3.5" fill="#ffffff" />
          <circle cx="296" cy="239" r="1.8" fill="#ffffff" />
          {/* Lower eyelid */}
          <path d="M 302 245 Q 293 248, 284 245" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" />

          {/* 
            8. DOUBLE-BRIDGE WIREFRAME AVIATOR GLASSES
          */}
          {/* Top Straight Brow Bar */}
          <line
            x1="205"
            y1="214"
            x2="315"
            y2="214"
            stroke="#18191d"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Lower Curved Nose Bridge */}
          <path
            d="M 248 228 Q 260 222, 272 228"
            stroke="#18191d"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Lens Frame (Aviator Rounded-Square) */}
          <rect
            x="196"
            y="214"
            width="54"
            height="46"
            rx="14"
            fill="rgba(255,255,255,0.12)"
            stroke="#18191d"
            strokeWidth="5"
          />
          {/* Lens reflection glare */}
          <path d="M 205 222 L 235 252" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Lens Frame (Aviator Rounded-Square) */}
          <rect
            x="270"
            y="214"
            width="54"
            height="46"
            rx="14"
            fill="rgba(255,255,255,0.12)"
            stroke="#18191d"
            strokeWidth="5"
          />
          {/* Lens reflection glare */}
          <path d="M 279 222 L 309 252" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Glasses temple arms extending to ears */}
          <line x1="196" y1="222" x2="175" y2="242" stroke="#18191d" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="324" y1="222" x2="345" y2="242" stroke="#18191d" strokeWidth="4.5" strokeLinecap="round" />

          {/* 
            9. TEXTURED ANIME BLACK HAIR (Spiky Locks & Bangs)
          */}
          {/* Back hair silhouette */}
          <path
            d="M 180 230 
               C 150 170, 160 100, 240 80 
               C 270 70, 310 75, 345 105 
               C 375 135, 375 190, 340 240 
               L 330 200 
               C 310 180, 210 180, 190 200 Z"
            fill="url(#stHair)"
            stroke="#121316"
            strokeWidth="5"
          />

          {/* Front anime fringe bangs covering forehead */}
          <path
            d="M 175 180 
               C 190 150, 220 130, 260 130 
               C 300 130, 335 150, 345 180 
               C 335 200, 318 200, 310 185 
               C 300 215, 280 220, 275 195 
               C 268 228, 252 232, 245 198 
               C 238 224, 220 224, 215 192 
               C 205 212, 190 205, 185 185 Z"
            fill="url(#stHair)"
            stroke="#121316"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Dynamic Anime Spikes (Top, Sides, Texture) */}
          <path d="M 230 85 L 240 68 L 252 82" fill="url(#stHair)" stroke="#121316" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 265 78 L 280 62 L 290 80" fill="url(#stHair)" stroke="#121316" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 305 85 L 325 75 L 325 98" fill="url(#stHair)" stroke="#121316" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 195 105 L 180 92 L 195 125" fill="url(#stHair)" stroke="#121316" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 170 145 L 150 140 L 168 165" fill="url(#stHair)" stroke="#121316" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 345 145 L 368 140 L 350 168" fill="url(#stHair)" stroke="#121316" strokeWidth="5" strokeLinejoin="round" />

          {/* Hair shine highlights */}
          <path
            d="M 215 145 Q 235 135, 250 142"
            stroke="#474c56"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 275 142 Q 290 135, 310 145"
            stroke="#474c56"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};
