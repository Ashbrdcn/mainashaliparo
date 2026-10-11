import React from 'react';

interface AshLogoProps {
  className?: string;
  color?: string; // If specified, overrides default currentColor
  variant?: 'dark' | 'light' | 'auto';
  size?: number | string;
}

export const AshLogo: React.FC<AshLogoProps> = ({
  className = 'w-8 h-8',
  color,
  variant = 'auto',
  size,
}) => {
  // Variant color resolution
  const fillColor = color 
    ? color 
    : variant === 'dark' 
      ? '#09090b' 
      : variant === 'light' 
        ? '#ffffff' 
        : 'currentColor';

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Ash Monogram Logo"
    >
      {/* 
        Stylized Geometric "A" with Orbital Celestial Ring:
        Exact reproduction of the user's uploaded logo (favicon_logo_black.jpg / favicon_logo_white.jpg)
      */}
      
      {/* 1. Back part of the orbital ring (behind the apex of "A") */}
      <path
        d="M 125 86 C 148 83, 172 87, 185 96 C 195 103, 192 112, 178 120 C 168 126, 150 131, 130 135 L 126 122 C 144 118, 160 114, 168 109 C 174 105, 174 101, 166 97 C 156 92, 138 90, 118 91 Z"
        fill={fillColor}
        opacity="0.95"
      />

      {/* 2. Main Stylized Letter "A" */}
      <g>
        {/* Left Leg & Apex */}
        <path
          d="M 100 24 
             L 58 138 
             L 86 138 
             L 100 94 
             L 109 94 
             L 100 60 
             Z"
          fill={fillColor}
        />

        {/* Right Leg & Crossbar Base */}
        <path
          d="M 100 24 
             L 115 68 
             L 125 94 
             L 142 138 
             L 114 138 
             L 108 120 
             L 94 120 
             L 88 138 
             L 58 138 
             L 100 24 Z
             M 100 66 
             L 88 105 
             L 112 105 
             Z"
          fill={fillColor}
        />
      </g>

      {/* 3. Front Swoop of Orbital Ring (cuts in front of the letter "A") */}
      <path
        d="M 22 136 
           C 16 132, 16 124, 25 116 
           C 40 102, 75 92, 118 86 
           C 138 83, 155 83, 166 86 
           L 161 97 
           C 152 95, 137 94, 119 97 
           C 81 102, 50 111, 38 122 
           C 32 127, 34 131, 42 133 
           C 54 136, 75 137, 102 134 
           L 100 146 
           C 70 149, 44 148, 30 144 
           C 25 142, 23 139, 22 136 Z"
        fill={fillColor}
      />
    </svg>
  );
};
